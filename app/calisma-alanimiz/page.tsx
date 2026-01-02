
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Çalışma Alanımız - YapYap",
    description: "Neler yapıyoruz? Uzmanlık alanlarımız.",
};

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">

                <div className="mb-20">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        Çalışma Alanımız
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Konuttan ticari alanlara, temelden çatıya, teknolojiden tasarıma.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {/* Card 1 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[300px]">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-2xl">🏠</div>
                            <h3 className="text-2xl font-bold text-foreground">Anahtar Teslim Tadilat</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Evinizi baştan aşağı yeniliyoruz. Yıkım, hafriyat, tesisat, boya ve montaj. Tek muhatap, tam güvence.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[300px]">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-2xl">🏢</div>
                            <h3 className="text-2xl font-bold text-foreground">Eski Daire Yenileme</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Eski daireleri alıp, A'dan Z'ye yenileyerek modern ve güvenli yaşam alanlarına dönüştürüyoruz.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[300px]">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-2xl">💻</div>
                            <h3 className="text-2xl font-bold text-foreground">Proje Danışmanlığı</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                "Bu kaça çıkar?" sorusunun cevabı. U    zman destekli maliyet analizi ve fizibilite raporlaması.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[300px]">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center text-2xl">🛋️</div>
                            <h3 className="text-2xl font-bold text-foreground">İç Mimari Tasarım</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Fonksiyonel ve estetik mekanlar. 3D modelleme ile işe başlamadan sonucunu görün.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
