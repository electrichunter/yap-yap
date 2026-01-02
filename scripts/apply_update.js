const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_AGHIZen0WE9v@ep-square-wave-ag0misk8-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';

async function migrate() {
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Connecting to NeonDB...');
        await client.connect();

        const sqlPath = path.join(__dirname, 'update_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Applying schema update...');
        await client.query(sql);

        console.log('✅ Update completed successfully!');
    } catch (err) {
        console.error('❌ Update failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
