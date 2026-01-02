import type { Metadata } from "next";
import WizardForm from "@/app/components/WizardForm";

export const metadata: Metadata = {
    title: "Projenizi Başlatın - YapYap",
    description: "Yapay zeka destekli teklif sihirbazı ile projenizi oluşturun.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background py-20 px-4 md:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                        Ücretsiz Dijital Keşif
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
                        Hayalinizdeki Evi <br /> <span className="text-primary">Birlikte Tasarlayalım</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Sadece klasik bir form değil. İhtiyaçlarınızı adım adım belirleyin, size özel "Şeffaf Kasa" deneyimiyle tanışın.
                    </p>
                </div>

                {/* Wizard Component */}
                <div className="mb-20">
                    <WizardForm />
                </div>

                {/* Direct Contact Info (Secondary) */}
                <div className="grid md:grid-cols-3 gap-8 text-center border-t border-border pt-12 animate-fade-in-up delay-200">
                    <div className="space-y-2">
                        <div className="text-3xl mb-2">📍</div>
                        <h3 className="font-bold text-foreground">Ofis</h3>
                        <p className="text-muted-foreground">Çankaya, Ankara<br />Türkiye</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl mb-2">📞</div>
                        <h3 className="font-bold text-foreground">Telefon</h3>
                        <p className="text-muted-foreground">+90 (312) 555 00 00</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl mb-2">📧</div>
                        <h3 className="font-bold text-foreground">E-posta</h3>
                        <p className="text-muted-foreground">info@yapyap.com.tr</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
