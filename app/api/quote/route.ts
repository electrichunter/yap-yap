import { NextResponse } from 'next/server';
import { addProject } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // In a real app, validate body with Zod
        if (!body.contact?.email || !body.serviceType) {
            return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
        }

        const newProject = await addProject({
            client: body.contact.name,
            email: body.contact.email,
            phone: body.contact.phone,
            serviceType: body.serviceType,
            propertyType: body.propertyType,
            size: body.size,
            details: body.details,
            name: `${body.contact.name} - ${body.serviceType === 'renovation' ? 'Tadilat' : 'Proje'}`, // Auto-generate internal name
        });

        return NextResponse.json({ success: true, project: newProject }, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
