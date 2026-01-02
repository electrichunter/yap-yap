
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

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">

                    {/* Card 1 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-primary select-none pointer-events-none">1</div>
                        <div className="space-y-4 relative z-10">
                            <h3 className="text-2xl font-bold text-foreground">Uçtan Uca Dijital Yönetim</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Klasik müteahhitlik bitti. Projenizi "Dijital Müteahhit" yönetsin. Malzeme tedariğinden usta koordinasyonuna kadar tüm süreç tek bir panel üzerinden şeffafça yürütülür.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-primary select-none pointer-events-none">2</div>
                        <div className="space-y-4 relative z-10">
                            <h3 className="text-2xl font-bold text-foreground">Şeffaf Kasa (Transparent Vault)</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                "Para nereye gitti?" derdine son. Alınan çimentodan işçilik giderine kadar her kuruşu, faturasıyla birlikte anlık olarak kendi panelinizden takip edin.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-primary select-none pointer-events-none">3</div>
                        <div className="space-y-4 relative z-10">
                            <h3 className="text-2xl font-bold text-foreground">Canlı Saha Akışı</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                İşin başında beklemenize gerek yok. Ustalarımız her aşamayı fotoğraflayıp sisteme yükler. Siz kahvenizi içerken evinizin değişimini timeline üzerinden izleyin.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="group border border-border bg-card hover:bg-muted/30 transition-colors p-8 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-primary select-none pointer-events-none">4</div>
                        <div className="space-y-4 relative z-10">
                            <h3 className="text-2xl font-bold text-foreground">Garantili & Sigortalı</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Platform üzerinden yapılan tüm işler YapYap garantisi altındadır. Sözleşmeye sadık kalınır, zamanında teslim edilir. Sürpriz yok, güven var.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
