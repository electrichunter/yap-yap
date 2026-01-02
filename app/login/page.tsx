"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Success
                // Redirect based on role? For now just go to dashboard
                // Store user info in localStorage for simple frontend logic if needed, 
                // but real auth is in cookie
                localStorage.setItem("user_role", data.user.role);
                router.push("/dashboard");
            } else {
                setError(data.error || "Giriş başarısız.");
            }
        } catch (err) {
            setError("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
            <div className="w-full max-w-md bg-background p-8 rounded-xl border border-border shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter text-primary mb-2">YAP<span className="text-foreground">YAP</span></h1>
                    <p className="text-muted-foreground">Admin & Müşteri Girişi</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">E-posta Adresi</label>
                        <input
                            type="email"
                            required
                            className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="ornek@yapyap.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Şifre</label>
                        <input
                            type="password"
                            required
                            className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Henüz hesabınız yok mu? <a href="/iletisim" className="text-primary hover:underline">Hemen Teklif Alın</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
