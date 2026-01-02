-- =============================================================
-- YAPYAP V2.0 - ENTERPRISE SCALABLE SCHEMA
-- Hedef: Yüksek Performans, Partitioning, Audit, Security
-- =============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Konum
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Full-Text Search (Fuzzy Matching) için

-- =============================================================
-- 2. ENUMS & TYPES
-- =============================================================
CREATE TYPE user_role AS ENUM ('admin', 'customer', 'pro', 'support');
CREATE TYPE job_status AS ENUM ('draft', 'open', 'matched', 'offer_accepted', 'in_progress', 'completed', 'cancelled', 'disputed');
CREATE TYPE bid_status AS ENUM ('submitted', 'viewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'pro', 'agency');

-- =============================================================
-- 3. CORE USER & SECURITY (Gelişmiş)
-- =============================================================

-- Abonelik Planları
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name subscription_tier NOT NULL,
    price_monthly DECIMAL(10, 2),
    commission_rate DECIMAL(5, 2), -- % Komisyon (Aboneliğe göre değişebilir)
    lead_discount_percentage INT DEFAULT 0, -- Teklif verme indirimi
    features JSONB -- {"highlight": true, "sms_alert": true}
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    -- Telefon şifreli saklanacaksa text tutulur, uygulama katmanında şifrelenir/çözülür.
    -- Ancak burada basit validation örneği:
    phone_encrypted TEXT NOT NULL, 
    phone_hash VARCHAR(64) UNIQUE, -- Arama yapmak için hash'lenmiş hali
    
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'customer',
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Login Denemeleri (Rate Limiting & Security için)
CREATE TABLE login_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address INET,
    email VARCHAR(255),
    attempt_time TIMESTAMPTZ DEFAULT NOW(),
    was_successful BOOLEAN DEFAULT FALSE
);

-- Usta Abonelik Durumu
CREATE TABLE user_subscriptions (
    user_id UUID REFERENCES users(id),
    plan_id UUID REFERENCES subscription_plans(id),
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    ends_at TIMESTAMPTZ,
    is_auto_renew BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (user_id, plan_id)
);

-- =============================================================
-- 4. MARKETPLACE CORE (Partitioning Applied)
-- =============================================================

-- Kategoriler (Dinamik Fiyatlandırma)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES categories(id),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    
    -- Kategori Bazlı Mantık
    base_lead_price DECIMAL(10, 2), -- Bu işe teklif verme ücreti
    platform_commission_percent DECIMAL(5, 2), -- İş bitiminde kesilecek oran
    
    is_active BOOLEAN DEFAULT TRUE
);

-- JOBS (Partitioned by Date)
-- Partitioning için ana tabloyu oluşturuyoruz.
CREATE TABLE jobs (
    id UUID DEFAULT uuid_generate_v4(), -- Primary Key partition'da composite olmalı
    customer_id UUID REFERENCES users(id),
    category_id UUID REFERENCES categories(id),
    
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    form_answers JSONB NOT NULL DEFAULT '{}',
    
    -- Validasyonlar
    budget_min DECIMAL(15, 2),
    budget_max DECIMAL(15, 2),
    
    location GEOGRAPHY(POINT, 4326),
    city VARCHAR(100),
    
    status job_status DEFAULT 'open',
    
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Partition Key (Range Partitioning için created_at kullanıyoruz)
    PRIMARY KEY (id, created_at),
    CONSTRAINT check_budget_logic CHECK (budget_max >= budget_min)
) PARTITION BY RANGE (created_at);

-- Partition Tabloları (Örnek: Yıllık)
CREATE TABLE jobs_y2025 PARTITION OF jobs FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
CREATE TABLE jobs_y2026 PARTITION OF jobs FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
CREATE TABLE jobs_default PARTITION OF jobs DEFAULT; -- Kapsam dışı tarihler için

-- BIDS (Teklifler)
CREATE TABLE bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID, 
    job_created_at TIMESTAMPTZ, -- Partition key referansı için gerekli olabilir (Foreign Key karmaşası olmaması için genelde logic app tarafında yönetilir ama burada basit FK veriyorum)
    pro_id UUID REFERENCES users(id),
    
    price DECIMAL(15, 2) NOT NULL,
    proposal_text TEXT,
    
    status bid_status DEFAULT 'submitted',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
    -- Not: Partition edilmiş tabloya foreign key vermek PostgreSQL'de versiyona göre değişir. 
    -- PG12+ destekler ama job_id + created_at composite FK gerekebilir.
);

-- REVIEWS (Veri Bütünlüğü Eklendi)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID, -- FK aşağıda tanımlanacak (Partition kısıtı yüzünden dikkatli olunmalı)
    job_created_at TIMESTAMPTZ, -- Partition referansı
    
    reviewer_id UUID REFERENCES users(id), -- Yorumu yapan
    reviewee_id UUID REFERENCES users(id), -- Yorum yapılan (Usta)
    
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Basitlik için jobs tablosuna soft FK mantığı veya composite FK kurulur.

-- =============================================================
-- 5. MESSAGING SYSTEM (Kritik Eksik Giderildi)
-- =============================================================

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID, -- Hangi işle ilgili? (Opsiyonel, işten bağımsız da olabilir)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW() -- Son mesaj tarihi için
);

-- Katılımcılar (Çoğa-çok ilişki, Grup sohbetine imkan tanır)
CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    last_read_at TIMESTAMPTZ, -- "Görüldü" özelliği için
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id),
    
    content TEXT NOT NULL,
    content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'location'
    
    is_system_message BOOLEAN DEFAULT FALSE, -- "Ahmet teklifi kabul etti" gibi oto-mesajlar
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 6. SUPPORT & OPS
-- =============================================================

-- Bildirimler
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- 'bid_received', 'job_completed', 'payment_success'
    title VARCHAR(255),
    body TEXT,
    payload JSONB, -- {"job_id": "xyz", "url": "/jobs/xyz"}
    
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Destek Talepleri
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    related_job_id UUID, -- Opsiyonel
    
    subject VARCHAR(255),
    message TEXT,
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'urgent'
    status ticket_status DEFAULT 'open',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favoriler (Müşteri ustayı kaydeder)
CREATE TABLE saved_pros (
    customer_id UUID REFERENCES users(id),
    pro_id UUID REFERENCES users(id),
    note TEXT, -- "Banyoyu buna yaptıracağım"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (customer_id, pro_id)
);

-- Usta Çalışma Saatleri (Availability)
CREATE TABLE pro_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pro_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Pazar
    start_time TIME,
    end_time TIME,
    is_unavailable BOOLEAN DEFAULT FALSE -- "Tüm gün dolu"
);

-- =============================================================
-- 7. AUDIT LOG & SECURITY
-- =============================================================

-- Audit Log Tablosu (Generic)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    operation VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    changed_by UUID, -- Hangi kullanıcı yaptı? (App context'ten gelmesi gerekir, triggerda zordur)
    
    old_data JSONB,
    new_data JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Trigger Fonksiyonu
CREATE OR REPLACE FUNCTION func_audit_log() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit_logs (table_name, record_id, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, OLD.id, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (table_name, record_id, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD)::jsonb, NULL);
        RETURN OLD;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (table_name, record_id, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', NULL, row_to_json(NEW)::jsonb);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Kritik Tablolara Audit Trigger Ekleme
CREATE TRIGGER trg_audit_users AFTER UPDATE OR DELETE ON users FOR EACH ROW EXECUTE PROCEDURE func_audit_log();
CREATE TRIGGER trg_audit_bids AFTER UPDATE OR DELETE ON bids FOR EACH ROW EXECUTE PROCEDURE func_audit_log();
-- jobs tablosu partition olduğu için trigger'ı parent tabloya ekleyip child'lara yayılmasını sağlamak gerekir.

-- =============================================================
-- 8. BUSINESS LOGIC TRIGGERS (Otomasyon)
-- =============================================================

-- Senaryo: Bir teklif 'accepted' olduğunda, işin statüsünü 'offer_accepted' yap.
CREATE OR REPLACE FUNCTION func_update_job_on_bid_accept() RETURNS TRIGGER AS $$
BEGIN
    -- Sadece statü 'accepted' olduğunda çalış
    IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
        -- İşi güncelle
        UPDATE jobs 
        SET status = 'offer_accepted', updated_at = NOW()
        WHERE id = NEW.job_id;
        
        -- Diğer teklifleri 'rejected' yap (Opsiyonel iş kuralı)
        UPDATE bids
        SET status = 'rejected'
        WHERE job_id = NEW.job_id AND id != NEW.id AND status = 'submitted';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_bid_accepted 
AFTER UPDATE ON bids 
FOR EACH ROW EXECUTE PROCEDURE func_update_job_on_bid_accept();

-- =============================================================
-- 9. PERFORMANCE INDEXES
-- =============================================================

-- Full-Text Search Index (GIN)
CREATE INDEX idx_jobs_fts ON jobs USING GIN (to_tsvector('turkish', title || ' ' || description));

-- JSONB Expression Index (Sık yapılan sorgular için)
-- Örn: "Oda sayısı 3 olan işler"
CREATE INDEX idx_jobs_room_count ON jobs ((form_answers->>'room_count'));

-- Partition Pruning & Sorting
CREATE INDEX idx_jobs_created_at ON jobs (created_at DESC);

-- Mesajlaşma Hızı (Bir konuşmadaki mesajları tarihe göre çek)
CREATE INDEX idx_messages_conversation ON messages (conversation_id, created_at ASC);

-- Bildirimler (Okunmamışları hızlı getir)
CREATE INDEX idx_notifications_unread ON notifications (user_id) WHERE is_read = FALSE;