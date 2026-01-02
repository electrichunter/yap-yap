
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İletişim - YapYap",
    description: "Projeleriniz için teklif alın.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background py-24 px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-6">
                        Bize Ulaşın
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Hayalinizdeki proje için ilk adımı atın. Ücretsiz keşif ve teklif için form doldurun.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-card p-8 border border-border h-full">
                            <h3 className="text-2xl font-bold text-foreground mb-6">İletişim Bilgileri</h3>
                            <div className="space-y-6 text-muted-foreground">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <strong className="text-foreground block mb-1">Adres</strong>
                                        <p>Çankaya, Ankara<br />Türkiye</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <strong className="text-foreground block mb-1">Telefon</strong>
                                        <p>+90 (312) 555 00 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <strong className="text-foreground block mb-1">E-posta</strong>
                                        <p>info@yapyap.com.tr</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Placeholder */}
                    <div className="bg-card p-8 border border-border">
                        <h3 className="text-2xl font-bold text-foreground mb-6">Teklif Formu</h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Ad Soyad</label>
                                <input type="text" id="name" className="w-full p-3 bg-muted/20 border border-input rounded-none focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Adınız" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                                <input type="tel" id="phone" className="w-full p-3 bg-muted/20 border border-input rounded-none focus:outline-none focus:ring-2 focus:ring-primary" placeholder="0500..." />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Proje Detayı</label>
                                <textarea id="message" rows={4} className="w-full p-3 bg-muted/20 border border-input rounded-none focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Banyo tadilatı düşünüyorum..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary text-primary-foreground py-4 font-bold hover:opacity-90 transition-opacity">
                                GÖNDER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
