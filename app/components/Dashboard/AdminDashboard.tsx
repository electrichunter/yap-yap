"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ user }: { user: any }) {
    const [stats, setStats] = useState<any[]>([]);
    const [activity, setActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.status === 401 || res.status === 403) {
                    router.push('/login');
                    return;
                }
                const data = await res.json();
                setStats(data.stats || []);
                setActivity(data.activity || []);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div className="min-h-screen bg-muted/10 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-primary">YAP<span className="text-foreground">YAP</span> <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">ADMIN</span></h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="block px-4 py-2 bg-primary/5 text-primary font-medium rounded-lg">Genel Bakış</a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg">Projeler</a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg">Kullanıcılar</a>
                    <a href="#" className="block px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg">Finans (Kasa)</a>
                </nav>
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Süper Yönetici</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Genel Bakış</h1>
                    <button onClick={() => {
                        document.cookie = 'auth_token=; Max-Age=0; path=/;';
                        router.push('/login');
                    }} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted">Çıkış Yap</button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 bg-card border border-border rounded-xl shadow-sm">
                            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs text-green-600 font-medium mt-1">{stat.trend}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity (Table) */}
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="font-bold text-lg">Son Aktiviteler (Canlı)</h3>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="p-4">Kullanıcı</th>
                                <th className="p-4">İşlem</th>
                                <th className="p-4">Tarih</th>
                                <th className="p-4">Durum</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {activity.length === 0 ? (
                                <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">Henüz bir aktivite yok.</td></tr>
                            ) : (
                                activity.map((act, i) => (
                                    <tr key={i}>
                                        <td className="p-4 font-medium">{act.user}</td>
                                        <td className="p-4">{act.action}</td>
                                        <td className="p-4">{act.time}</td>
                                        <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Yeni</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
