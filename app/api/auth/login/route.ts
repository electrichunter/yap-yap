import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { verifyPassword, generateToken } from '@/lib/auth';

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_AGHIZen0WE9v@ep-square-wave-ag0misk8-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email ve şifre gerekli.' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            // 1. Find User
            const userRes = await client.query(`
        SELECT u.id, u.email, u.password_hash, u.is_active, r.name as role_name
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE u.email = $1
      `, [email]);

            if (userRes.rows.length === 0) {
                return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401 });
            }

            const user = userRes.rows[0];

            // 2. Verify Password
            // Note: In a real app we would use bcrypt.compare. 
            // For the seeded admin user, we might need a known hash.
            const isValid = await verifyPassword(password, user.password_hash);

            if (!isValid) {
                return NextResponse.json({ error: 'Geçersiz email veya şifre.' }, { status: 401 });
            }

            if (!user.is_active) {
                return NextResponse.json({ error: 'Hesabınız askıya alınmış.' }, { status: 403 });
            }

            // 3. Create Session / Token
            const token = generateToken({
                userId: user.id,
                email: user.email,
                role: user.role_name
            });

            // 4. Return success (and maybe set cookie)
            const response = NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role_name
                },
                token
            });

            // Set HTTP-only cookie for security
            response.cookies.set('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400 // 1 day
            });

            return response;

        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}
