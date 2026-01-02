"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CostTracker from "@/app/components/Dashboard/CostTracker";
import Timeline from "@/app/components/Dashboard/Timeline";

export default function DashboardPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!params.id) return;

        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${params.id}`);

                if (res.status === 401 || res.status === 403) {
                    // If secured, redirect. Currently public read-only for demo link, 
                    // but strictly only real data.
                    // router.push('/login'); 
                }

                if (res.ok) {
                    const data = await res.json();
                    setProject(data.project);
                } else {
                    setError("Proje bulunamadı. Lütfen ID'yi kontrol edin veya yeni bir proje oluşturun.");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setError("Sunucu hatası oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [params.id, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

    if (error || !project) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-destructive">Hata</h1>
            <p className="text-muted-foreground">{error || "Proje verisi bulunamadı."}</p>
            <button onClick={() => router.push('/')} className="px-4 py-2 border rounded hover:bg-muted">Ana Sayfaya Dön</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-10 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Project Header */}
                <div className="mb-10 bg-primary/5 border border-primary/20 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${project.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                {project.status === 'active' ? 'Aktif Proje' : 'Beklemede'}
                            </span>
                            <span className="text-muted-foreground text-sm">#{project.id.substring(0, 8)}...</span>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                        <p className="text-muted-foreground">Müşteri: {project.client} • Başlangıç: {project.startDate || 'Henüz başlamadı'}</p>
                    </div>

                    <div className="w-full md:w-auto text-right">
                        <p className="text-sm font-medium text-foreground mb-1">Proje İlerlemesi</p>
                        <div className="flex items-center gap-3">
                            <div className="w-full md:w-32 h-3 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${project.completionPercentage || 0}%` }}></div>
                            </div>
                            <span className="font-bold text-primary text-lg">%{project.completionPercentage || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Cost Tracker (Wider) */}
                    <div className="lg:col-span-2">
                        <CostTracker expenses={project.expenses || []} />
                    </div>

                    {/* Right: Timeline */}
                    <div>
                        <Timeline events={project.timeline || []} />
                    </div>
                </div>

            </div>
        </div>
    );
}
