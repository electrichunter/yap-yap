
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ekibimiz - YapYap",
    description: "Tecrübe ve vizyonu birleştiren kadromuz.",
};

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <div className="text-left mb-16 border-b border-border pb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-4">
                        Çekirdek Kadro
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        İki nesil, tek vizyon. Babadan oğula geçen tecrübe teknolojiyle harmanlandı.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Founder */}
                    <div className="flex flex-col md:flex-row gap-8 items-start bg-card p-0 md:p-6 rounded-none">
                        <div className="w-full md:w-48 aspect-[3/4] bg-muted relative grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-4xl bg-primary/10 text-primary font-bold">A</div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Ahmet Usta</h2>
                                <span className="text-primary font-mono text-sm tracking-wider uppercase">Kurucu  </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                35 yıllık sektör deneyimi. Ankara'nın her sokağında izi olan, "sözü senet" eski toprak esnaf kültürünün temsilcisi. Şantiyenin tozunu yutmadan olmaz diyen, işin mutfağındaki isim.
                            </p>
                            <ul className="text-sm space-y-2 text-foreground/80 font-medium">
                                <li>• Saha Yönetimi</li>
                                <li>• Kalite Kontrol</li>
                                <li>• Malzeme Tedarik Ağı</li>
                            </ul>
                        </div>
                    </div>

                    {/* Tech Lead */}
                    <div className="flex flex-col md:flex-row gap-8 items-start bg-card p-0 md:p-6 rounded-none">
                        <div className="w-full md:w-48 aspect-[3/4] bg-muted relative grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center text-4xl bg-primary/10 text-primary font-bold">O</div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Ömer Uysal</h2>
                                <span className="text-primary font-mono text-sm tracking-wider uppercase">Yazılım & Teknoloji Lideri</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                UNIX Felsefesi ekolünden gelen yazılım  vizyonu. İnşaat sektöründeki verimsizliği ve belirsizliği, kod ve veri analitiği ile çözmeyi hedefleyen yeni nesil yönetici.
                            </p>
                            <ul className="text-sm space-y-2 text-foreground/80 font-medium">
                                <li>• Dijital Dönüşüm</li>
                                <li>• Proje Takip Sistemleri</li>
                                <li>• Veri Analitiği</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Field Team Note */}
                <div className="mt-24 bg-secondary/50 p-12 text-center border-t border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Ve Görünmez Kahramanlar</h3>
                    <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                        Arkamızda 20 yılı aşkın süredir birlikte çalıştığımız boya ustasından tesisatçısına, elektrikçisinden mobilyacısına kadar güvenilir bir usta ağı var. Biz sadece bir inşaat şirketi değil, bir aileyiz.
                    </p>
                </div>

            </div>
        </div>
    );
}
