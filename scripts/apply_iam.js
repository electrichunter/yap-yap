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

        const sqlPath = path.join(__dirname, 'iam_migration.sql');
        console.log(`Reading SQL from ${sqlPath}...`);
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Applying IAM Migration (Destructive)...');
        await client.query(sql);

        console.log('✅ IAM Migration completed successfully!');
    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();
