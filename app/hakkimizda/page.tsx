
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ankara Boyacı ve Tadilat Ustası - YapYap Hakkımızda",
    description: "Ankara'da profesyonel boyacı, ev tadilatı ve dekorasyon hizmetleri. 35 yıllık tecrübeyle Çankaya, İncek ve Ümitköy'de en iyi boya badana ustaları.",
    keywords: ["Ankara boyacı", "Ankara tadilat", "ev boyama", "boya ustası", "Çankaya boyacı", "anahtar teslim tadilat"],
};

export default function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HousePainter",
        "name": "YapYap İnşaat & Tadilat",
        "image": "https://yapyap.com.tr/yapyap.png", // Assuming production URL
        "description": "Ankara'nın yeni nesil boya ve tadilat platformu. Teknoloji destekli, garantili ve şeffaf hizmet.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Çankaya",
            "addressLocality": "Ankara",
            "addressRegion": "TR",
            "postalCode": "06000",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.9334,
            "longitude": 32.8597
        },
        "url": "https://yapyap.com.tr",
        "telephone": "+903125550000",
        "priceRange": "₺₺"
    };

    return (
        <div className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mx-auto max-w-4xl space-y-20">

                {/* Header Section */}
                <div className="border-l-4 border-primary pl-6 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Ankara'nın Yeni Nesil Boyacı ve Tadilat Ustaları
                    </h1>
                    <p className="text-2xl font-serif italic text-muted-foreground">
                        "Sözün senet olduğu esnaflıktan, verinin senet olduğu teknolojiye."
                    </p>
                </div>

                {/* Story Section */}
                <section className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                        <p>
                            <strong className="text-foreground">YapYap</strong>, Ankara'nın köklü inşaat geleneğini dijital dönüşümle buluşturan bir platformdur. Bir yanda 35 yıllık şantiye tozu yutmuş "Baba Mesleği", diğer yanda Google teknolojileriyle donanmış "Mühendislik Disiplini".
                        </p>
                        <p>
                            Özellikle <strong>Ankara boyacı</strong> arayışında olanlar için; Çankaya'dan Keçiören'e kadar şehrin her semtinde, en kaliteli malzemeyi en usta ellerle buluşturuyoruz. Sadece duvar boyamıyoruz; evinizin havasını değiştirirken, "acaba ne kadar tutar?" endişesini yapay zeka destekli hesaplamalarımızla siliyoruz.
                        </p>
                        <p>
                            Bizim için inşaat sadece tuğla ve harç değil; bir planlama, veri ve güven işidir. "Göz kararı" değil, milimetrik hesaplarla çalışırız.
                        </p>
                    </div>
                    <div className="bg-muted aspect-square flex items-center justify-center text-muted-foreground bg-[url('/construction-sketch.jpg')] bg-cover opacity-50 contrast-125 grayscale rounded-sm">
                        {/* Image Placeholder - Architectural Sketch feel */}
                        <div className="border-4 border-foreground/10 w-3/4 h-3/4 flex items-center justify-center font-mono">
                            MİMARİ DİSİPLİN
                        </div>
                    </div>
                </section>

                {/* Pillars */}
                <section className="grid gap-8 sm:grid-cols-3">
                    <div className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">1. Şeffaflık</h3>
                        <p className="text-muted-foreground">
                            Süpriz maliyet yok. Dijital paneller üzerinden anlık bütçe ve ilerleme takibi.
                        </p>
                    </div>
                    <div className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">2. Teknoloji</h3>
                        <p className="text-muted-foreground">
                            Lazer ölçüm, BIM entegrasyonu ve yapay zeka destekli maliyet hesaplama.
                        </p>
                    </div>
                    <div className="bg-card p-8 border border-border hover:border-primary/50 transition-colors group">
                        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">3. İşçilik</h3>
                        <p className="text-muted-foreground">
                            Ankara'nın en iyi boyacı ve tesisat ustaları. Usta-çırak okulundan, çekirdekten yetişme kusursuz saha ekibi.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
