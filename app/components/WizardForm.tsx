"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ServiceType = "renovation" | "design" | "consulting" | "other" | null;

export default function WizardForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        serviceType: null as ServiceType,
        propertyType: "",
        size: "",
        budget: "",
        name: "",
        phone: "",
        email: "",
        details: "",
    });

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceType: formData.serviceType,
                    propertyType: formData.propertyType,
                    size: formData.size,
                    details: formData.details,
                    contact: {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/dashboard/${data.project.id}`);
            } else {
                alert("Hata: " + data.error);
            }

        } catch (error) {
            console.error("Submission error", error);
            alert("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-card border border-border p-8 rounded-xl shadow-sm">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>1. Hizmet Seçimi</span>
                    <span className={`text-sm font-medium ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>2. Detaylar</span>
                    <span className={`text-sm font-medium ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>3. İletişim</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Service Type */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-foreground">Ne tür bir hizmete ihtiyacınız var?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: "renovation", label: "Anahtar Teslim Tadilat", icon: "🏠" },
                                { id: "design", label: "İç Mimari Tasarım", icon: "🎨" },
                                { id: "consulting", label: "Proje & Maliyet Danışmanlığı", icon: "📊" },
                                { id: "other", label: "Diğer / Özel Proje", icon: "✨" },
                            ].map((service) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => {
                                        handleChange("serviceType", service.id);
                                        handleNext();
                                    }}
                                    className={`flex items-center gap-4 p-4 border rounded-lg text-left transition-all hover:bg-muted/50 ${formData.serviceType === service.id
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-border"
                                        }`}
                                >
                                    <span className="text-2xl">{service.icon}</span>
                                    <span className="font-semibold text-foreground">{service.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Property Details */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-foreground">Proje Detayları</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Mülk Tipi</label>
                                <select
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground"
                                    value={formData.propertyType}
                                    onChange={(e) => handleChange("propertyType", e.target.value)}
                                >
                                    <option value="">Seçiniz...</option>
                                    <option value="apartment">Daire</option>
                                    <option value="villa">Müstakil / Villa</option>
                                    <option value="office">Ofis / İşyeri</option>
                                    <option value="other">Diğer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Yaklaşık Metrekare (m²)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground"
                                    placeholder="Örn: 120"
                                    value={formData.size}
                                    onChange={(e) => handleChange("size", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Özel İstekler / Notlar</label>
                                <textarea
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground min-h-[100px]"
                                    placeholder="Banyo ve mutfak tamamen değişecek..."
                                    value={formData.details}
                                    onChange={(e) => handleChange("details", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                            >
                                Geri
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!formData.propertyType}
                                className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Devam Et
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-foreground">Son Adım: İletişim Bilgileri</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Adınız Soyadınız</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground"
                                    placeholder="Ad Soyad"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Telefon Numaranız</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground"
                                    placeholder="0555 555 55 55"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder-muted-foreground text-foreground"
                                    placeholder="ornek@email.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-2 text-foreground font-medium hover:bg-muted rounded-lg transition-colors"
                            >
                                Geri
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                            >
                                Teklifi Gönder
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
