import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

// Role-specific Dashboards (Components)
// In a real app these would be separate files, importing them here for simplicity/consolidation
import AdminDashboard from '@/app/components/Dashboard/AdminDashboard';
import CustomerDashboard from '@/app/components/Dashboard/CustomerDashboard'; // This can be the existing logic

export default async function DashboardRoot() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        redirect('/login');
    }

    const payload = verifyToken(token.value);

    if (!payload) {
        // Invalid token
        redirect('/login');
    }

    const role = payload.role;

    // Render based on Role
    if (role === 'super_admin' || role === 'support') {
        return <AdminDashboard user={payload} />;
    } else if (role === 'customer') {
        // Customers usually have a project ID link, OR we specifically fetch their project here
        // For now, let's redirect them to their specific project page if we can find it, 
        // or show a list of their projects.
        // Simplified: Show a Customer Home
        return (
            <div className="min-h-screen p-8 bg-background">
                <h1 className="text-3xl font-bold mb-4">Hoşgeldin, {payload.email}</h1>
                <p>Aktif projeleriniz aşağıda listelenmiştir.</p>
                {/* Project List Component would go here */}
                <div className="mt-8 p-6 border rounded-xl">
                    <h2 className="text-xl font-bold">Örnek Proje</h2>
                    <a href="/dashboard/1" className="text-primary underline mt-2 block">Projeye Git &rarr;</a>
                </div>
            </div>
        );
    } else {
        return <div className="p-8">Bilinmeyen Rol: {role}</div>;
    }
}
