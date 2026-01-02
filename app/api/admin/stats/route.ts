import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_AGHIZen0WE9v@ep-square-wave-ag0misk8-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

export async function GET(request: Request) {
    // 1. Auth Check
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = verifyToken(token.value);
    if (!user || (user.role !== 'super_admin' && user.role !== 'support')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const client = await pool.connect();
    try {
        // 2. Fetch Stats
        // Active Projects
        const projectsRes = await client.query(`SELECT COUNT(*) as count FROM jobs WHERE status IN ('open', 'active', 'offer_accepted', 'in_progress')`);
        const activeProjects = parseInt(projectsRes.rows[0].count);

        // Pending Bids (Total bids submitted but not acted upon? Or jobs with open status?)
        // Let's count jobs in 'open' state as pending requests
        const pendingJobsRes = await client.query(`SELECT COUNT(*) as count FROM jobs WHERE status = 'open'`);
        const pendingJobs = parseInt(pendingJobsRes.rows[0].count);

        // Total Revenue (Sum of expenses? Or sum of accepted bids?)
        // Let's sum validated expenses as a proxy for turnover
        // OR better: sum of 'budget_max' of active jobs as 'Potential Volume' if real data is mostly empty
        // Let's us 'expenses' table sum for "Real Spent"
        const revenueRes = await client.query(`SELECT SUM(amount) as total FROM expenses`);
        const formattedRevenue = revenueRes.rows[0].total
            ? `₺${parseFloat(revenueRes.rows[0].total).toLocaleString('tr-TR')}`
            : '₺0';

        // Total Users
        const usersRes = await client.query(`SELECT COUNT(*) as count FROM users`);
        const totalUsers = parseInt(usersRes.rows[0].count);

        // 3. Fetch Recent Activity
        // We'll join jobs/users to get meaningful logs from 'jobs' table considering created_at
        const activityRes = await client.query(`
            SELECT 
                u.email as user_email,
                'Yeni Proje Talebi' as action,
                j.created_at as date,
                'new' as status_type
            FROM jobs j
            JOIN users u ON j.customer_id = u.id
            ORDER BY j.created_at DESC
            LIMIT 5
        `);

        const recentActivity = activityRes.rows.map(row => ({
            user: row.user_email,
            action: row.action,
            time: new Date(row.date).toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            status: row.status_type
        }));

        return NextResponse.json({
            stats: [
                { label: 'Aktif Projeler', value: activeProjects, trend: 'Canlı' },
                { label: 'Bekleyen Talepler', value: pendingJobs, trend: 'İşlem bekliyor' },
                { label: 'Toplam Harcama', value: formattedRevenue, trend: 'Şeffaf Kasa' },
                { label: 'Kayıtlı Kullanıcı', value: totalUsers, trend: 'Aktif' },
            ],
            activity: recentActivity
        });

    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        client.release();
    }
}
