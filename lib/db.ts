1import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_AGHIZen0WE9v@ep-square-wave-ag0misk8-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    ssl: {
        rejectUnauthorized: false
    }
});

export type Project = {
    id: string;
    name: string;
    client: string;
    email: string;
    phone: string;
    startDate: string;
    status: 'pending' | 'active' | 'completed';
    completionPercentage: number;
    serviceType: string;
    expenses: any[];
    timeline: any[];
};

export async function addProject(projectData: any) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Create User (Customer) if not exists
        // Note: In a real app we would use auth, but here we just store the contact info
        // We look up by email or insert.
        // For simplicity in this demo, we just create a User ID or mock it, 
        // but let's try to be consistent with the Schema.

        // Simple Insert into jobs table directly for now, 
        // assuming we might not have a full user auth flow yet.
        // We'll store contact info in the job description or a separate meta field if strict FK is enforced.
        // Wait, 'jobs' has 'customer_id' FK. We need a user.

        let userId;
        const userRes = await client.query('SELECT id FROM users WHERE email = $1', [projectData.email]);

        if (userRes.rows.length > 0) {
            userId = userRes.rows[0].id;
        } else {
            // Create user
            const newUser = await client.query(
                `INSERT INTO users (email, phone_encrypted, password_hash, role) 
                 VALUES ($1, $2, 'hashed_dummy', 'customer') RETURNING id`,
                [projectData.email, projectData.phone]
            );
            userId = newUser.rows[0].id;
        }

        // 2. Create Job
        const title = `${projectData.client} - ${projectData.serviceType}`;
        const description = `Details: ${projectData.details}, Type: ${projectData.propertyType}, Size: ${projectData.size}`;

        const jobRes = await client.query(
            `INSERT INTO jobs (customer_id, title, description, status, created_at) 
             VALUES ($1, $2, $3, 'open', NOW()) RETURNING id, created_at`,
            [userId, title, description]
        );
        const jobId = jobRes.rows[0].id;

        await client.query('COMMIT');

        return { id: jobId, ...projectData };
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

export async function getProject(id: string) {
    const client = await pool.connect();
    try {
        // Fetch Job Details
        const jobRes = await client.query(
            `SELECT j.id, j.title, j.description, j.status, j.created_at, u.email, u.phone_encrypted as phone
             FROM jobs j
             JOIN users u ON j.customer_id = u.id
             WHERE j.id = $1`,
            [id]
        );

        if (jobRes.rows.length === 0) return null;
        const job = jobRes.rows[0];

        // Fetch Expenses
        const expRes = await client.query('SELECT * FROM expenses WHERE job_id = $1', [id]);

        // Fetch Timeline
        const timeRes = await client.query('SELECT * FROM project_timeline WHERE job_id = $1', [id]);

        return {
            id: job.id,
            name: job.title,
            client: job.email, // Using email as name for now as we don't have name col in users
            email: job.email,
            phone: job.phone,
            startDate: new Date(job.created_at).toLocaleDateString("tr-TR"),
            status: job.status === 'offer_accepted' ? 'active' : 'pending',
            completionPercentage: 0, // Calculate based on timeline count?
            serviceType: 'renovation', // derived
            expenses: expRes.rows.map(r => ({
                id: r.id,
                date: new Date(r.date).toLocaleDateString("tr-TR"), // Format nicely
                item: r.item,
                amount: parseFloat(r.amount),
                category: r.category,
                hasReceipt: r.has_receipt
            })),
            timeline: timeRes.rows.map(r => ({
                id: r.id,
                date: new Date(r.date).toLocaleDateString("tr-TR"),
                title: r.title,
                description: r.description,
                status: r.status,
                photoUrl: r.photo_url
            }))
        };
    } finally {
        client.release();
    }
}
