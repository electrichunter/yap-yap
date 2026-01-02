const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = 'postgresql://neondb_owner:npg_AGHIZen0WE9v@ep-square-wave-ag0misk8-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';

async function seedAdmin() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        const email = 'admin@yapyap.com';
        const password = 'admin123'; // Basit şifre
        const hashedPassword = await bcrypt.hash(password, 10);
        const phone = '+905550000000';

        console.log(`Creating Admin User (${email})...`);

        // 1. Insert User
        const userRes = await client.query(`
            INSERT INTO users (email, password_hash, phone_number, is_active)
            VALUES ($1, $2, $3, TRUE)
            ON CONFLICT (email) DO UPDATE SET password_hash = $2
            RETURNING id
        `, [email, hashedPassword, phone]);

        const userId = userRes.rows[0].id;
        console.log('User ID:', userId);

        // 2. Assign 'super_admin' Role
        // Find Role ID
        const roleRes = await client.query(`SELECT id FROM roles WHERE name = 'super_admin'`);
        if (roleRes.rows.length === 0) throw new Error('Role super_admin not found. Run IAM migration first.');
        const roleId = roleRes.rows[0].id;

        // Assign
        await client.query(`
            INSERT INTO user_roles (user_id, role_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, role_id) DO NOTHING
        `, [userId, roleId]);

        console.log('✅ Admin user created and role assigned!');
        console.log(`Login with: ${email} / ${password}`);

    } catch (err) {
        console.error('❌ Seeding failed:', err);
    } finally {
        await client.end();
    }
}

seedAdmin();
