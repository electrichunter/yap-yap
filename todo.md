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
Burada "CRUD" yapmıyoruz, "İş Süreci" yönetiyoruz.

[ ] GET /api/calculate: Frontend'den gelen m2 ve malzeme kalitesine göre (Ankara piyasa verilerini içeren bir JSON ile çarpıp) anlık fiyat dönen logic.

[ ] POST /api/projects: Yeni bir tadilat işi oluşturulduğunda otomatik "Müşteri Erişim Kodu" üreten fonksiyon.

[ ] PATCH /api/admin/update-progress: Babanın şantiyeden fotoğraf yükleyip "Boya %100 bitti" diyebileceği yetkili endpoint'i.

[ ] Webhook Integration: Form doldurulduğunda senin ve babanın WhatsApp'ına "Yeni İş Talebi!" bildirimi düşüren entegrasyon.

4. Faz: Frontend Architecture (Modern UI)
[ ] Shadcn/UI & Tailwind: Kurumsal, ağırbaşlı ama modern bir tema (Slate & Emerald renk paleti güven verir).

[ ] Hybrid Rendering Strategy: - [ ] Landing page & Blog -> ISR (Incremental Static Regeneration) (Hız ve SEO için).

[ ] Müşteri Paneli -> Client-side with SWR/TanStack Query (Anlık veri takibi için).

[ ] Custom Calculator Component: Kullanıcının sürükleyerek oda sayısını seçtiği, fiyatın altta "odometre" gibi döndüğü yüksek UX'li bileşen.

[ ] Image Optimization: Şantiye fotoğrafları büyük olur. next/image ve Cloudinary/Uploadcare kullanarak LCP skorunu koru.

5. Faz: SEO & Ankara Lokalizasyonu
[ ] Dynamic Sitemap: Her biten proje için bir sayfa oluştur (Örn: "Çankaya Villa Tadilatı - YapYap").

[ ] Schema.org Markup: Google'a bu sitenin bir "LocalBusiness" olduğunu anlatan JSON-LD kodlarını ekle.

[ ] Performance Audit: Lighthouse skorlarını 95+ bandına çek.

6. Faz: Müşteri Deneyimi (The "Wow" Factor)
[ ] Live Project Tracker: Müşterinin evinin tadilat aşamasını bir "Progress Bar" ile gördüğü sayfa.

[ ] PDF Generator: Tekliflerin otomatik antetli kağıt şeklinde PDF olarak indirilebilmesi.

🛡️ Senior Tavsiyesi: "Neden Çökeriz?"
State Management: Çok karmaşık bir global state'e girme. Müşteri paneli için URL-based state veya Zustand yeterli.

NeonDB Cold Start: Neon'un ücretsiz sürümünde ilk istek 2-3 saniye gecikebilir. Bunu frontend'de şık bir "Sizin için hesaplanıyor..." skeleton'ı ile gizle.

7. Faz: İçerik ve Marka Entegrasyonu (Content & Branding)
[x] Landing Page Hero Update: "Ankara’nın yapı kültürünü..." özet metnini ekle.
[x] About Page Creation (/hakkimizda): Tam kapsamlı vizyon metnini ve "Neden YapYap?" bölümlerini ekle.
[x] Tech Stack Visualization: Hakkımızda sayfasında teknoloji kullanımını (Yazılım + İnşaat) vurgulayan görsel/ikon seti ekle.