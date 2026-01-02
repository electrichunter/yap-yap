YapYap: Enterprise-Grade Architecture TODO
1. Faz: Dev-Ops ve Core Altyapı (Day 1)
Bir Senior asla kod yazmaya başlamadan önce altyapıyı sağlama alır. herşeyi son sürümde yap

[ ] Next.js 16+ & TS Config: Strict mode açık, path aliases (@/components, @/lib) yapılandırılmış temiz kurulum.

[ ] NeonDB Connection Pool: @neondatabase/serverless kullanarak serverless fonksiyonlarda "connection exhaustion" (bağlantı tükenmesi) hatasını engelleyen yapıyı kur.

[ ] ORM Layer (Drizzle/Prisma): NeonDB ile en performanslı çalışan Drizzle ORM öneririm.

[ ] schema.ts oluştur (Users, Projects, Payments, Tasks, Gallery).

[ ] Zod Validation: API uçlarına gelen verileri (m2, telefon no vb.) hem client hem server tarafında valide edecek şemaları yaz.

[ ] Environment Security: .env.example oluştur, DATABASE_URL ve NEXT_PUBLIC değişkenlerini ayır.

2. Faz: Database Schema & Relations (Data Modeling)
Sıradan bir developer sadece "Project" tablosu açar. Senior, işin mantığını kurar.

[ ] Projects Table: status (keşif, teklif, uygulama, bitti), budget, address_lat_long (Ankara'daki lokasyon verisi için).

[ ] Timeline Table: Tadilatın her aşaması için (Boya, Alçı, Tesisat) start_date, end_date.

[ ] Assets Table: Şantiye fotoğrafları için (S3 veya Supabase Storage linkleri).

[ ] Quotes Table: Dinamik fiyat teklifleri için JSONB kolon yapısı.

3. Faz: Backend API (src/app/api) - Business Logic
Here "Workflows" are managed, not just "CRUD".

[CANSELLED] GET /api/calculate: Automatic pricing is risky for trust. Replaced by "Wizard Quote Form" for personalized service.

[ ] POST /api/projects: Function generating "Customer Access Code" for new jobs.

[ ] PATCH /api/admin/update-progress: Endpoint for uploading photos and updating progress (currently manual/mock).

[ ] Webhook Integration: WhatsApp notification integration (Check detailed feasibility first).

4. Faz: Frontend Architecture (Modern UI)
[ ] Shadcn/UI & Tailwind: Clean, modern corporate theme (Slate & Emerald).

[ ] Hybrid Rendering Strategy: ISR for Landing/Blog, Client-side for Dashboard.

[x] Wizard Quote Form: Multi-step, guiding form replacing the custom calculator component.

[ ] Image Optimization: Critical for site photos.

5. Faz: SEO & Ankara Lokalizasyonu
[ ] Dynamic Sitemap: Pages for completed projects.

[ ] Schema.org Markup: LocalBusiness JSON-LD.

[ ] Performance Audit: Target 95+.

6. Faz: Müşteri Deneyimi (The "Wow" Factor)
[x] Live Project Tracker: "Transparent Vault" Dashboard with Cost & Timeline tracking (Implemented v1).

[ ] PDF Generator: Downloadable quotes.

🛡️ Senior Tavsiyesi: "Neden Çökeriz?"
State Management: Çok karmaşık bir global state'e girme. Müşteri paneli için URL-based state veya Zustand yeterli.

NeonDB Cold Start: Neon'un ücretsiz sürümünde ilk istek 2-3 saniye gecikebilir. Bunu frontend'de şık bir "Sizin için hesaplanıyor..." skeleton'ı ile gizle.

7. Faz: İçerik ve Marka Entegrasyonu (Content & Branding)
[x] Landing Page Hero Update: "Ankara’nın yapı kültürünü..." özet metnini ekle.
[x] About Page Creation (/hakkimizda): Tam kapsamlı vizyon metnini ve "Neden YapYap?" bölümlerini ekle.
[x] Tech Stack Visualization: Hakkımızda sayfasında teknoloji kullanımını (Yazılım + İnşaat) vurgulayan görsel/ikon seti ekle.