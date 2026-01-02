-- =============================================================
-- ⚠️ TEMİZLİK (CLEANUP)
-- Önce çakışan eski tabloları ve tipleri kaldırıyoruz.
-- CASCADE komutu, users tablosuna bağlı olan verileri de temizler.
-- =============================================================

DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Eski ENUM tipini de kaldırıyoruz (Artık 'roles' tablosunu kullanacağız)
DROP TYPE IF EXISTS user_role CASCADE;

-- =============================================================
-- MODULE: USER IDENTITY & ACCESS MANAGEMENT (IAM)
-- =============================================================

-- 1. USERS (Temel Kimlik Tablosu)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Giriş Bilgileri
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Telefon
    phone_country_code VARCHAR(5) DEFAULT '+90',
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    
    -- Güvenlik & Doğrulama
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    
    -- Hesap Durumu
    is_active BOOLEAN DEFAULT TRUE,
    is_banned BOOLEAN DEFAULT FALSE,
    ban_reason TEXT,
    
    -- Takip
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROLES (Rol Tanımları)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE
);

-- 3. PERMISSIONS (Yetkiler)
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL, 
    description TEXT,
    module VARCHAR(50)
);

-- 4. ROLE_PERMISSIONS (Hangi rol ne yapabilir?)
CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 5. USER_ROLES (Hangi kullanıcının hangi rolleri var?)
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_by UUID REFERENCES users(id),
    PRIMARY KEY (user_id, role_id)
);

-- 6. USER_SESSIONS (Oturum Yönetimi)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address INET,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_revoked BOOLEAN DEFAULT FALSE
);

-- =============================================================
-- DATA SEEDING (Başlangıç Verileri)
-- =============================================================

-- Rolleri Ekle
INSERT INTO roles (name, display_name, description, is_system_role) VALUES 
('super_admin', 'Süper Yönetici', 'Tüm sistem üzerinde tam yetkili', TRUE),
('support', 'Destek Uzmanı', 'Kullanıcı sorunlarını çözer', TRUE),
('customer', 'Müşteri', 'Hizmet alan kullanıcı', TRUE),
('pro', 'Usta/Firma', 'Hizmet veren kullanıcı', FALSE);

-- Örnek Yetkileri Ekle
INSERT INTO permissions (slug, description, module) VALUES
('dashboard.view', 'Paneli görüntüle', 'core'),
('users.manage', 'Kullanıcıları yönet', 'users'),
('jobs.create', 'İş ilanı ver', 'jobs'),
('jobs.bid', 'İş teklifi ver', 'jobs');

-- Rol-Yetki Bağlantıları (Örnek)
-- Admin her şeyi yapar (1 nolu ID admin ise)
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='super_admin'), id FROM permissions;

-- Müşteri iş ilanı verir
INSERT INTO role_permissions (role_id, permission_id)
VALUES (
    (SELECT id FROM roles WHERE name='customer'),
    (SELECT id FROM permissions WHERE slug='jobs.create')
);

-- Usta teklif verir
INSERT INTO role_permissions (role_id, permission_id)
VALUES (
    (SELECT id FROM roles WHERE name='pro'),
    (SELECT id FROM permissions WHERE slug='jobs.bid')
);

-- SEEDING: Default Users (Tests for Login)
-- Password: 'password123' (We will need to hash this manually or in the app logic during insert, but for raw SQL seed let's put a placeholder we can recognize or handling in code)
-- Actually, for now I will insert dummy hash and handling login via 'if password == dummy OR bcrypt check' in the dev phase or just create a user via API later.
-- Better: Let's create one Super Admin with a known harsh (Bcrypt for 'password123')
-- $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj40zJ..5yG. (Example hash)
-- I will leave users empty and create a Seed script in Node.js to use proper hashing.
