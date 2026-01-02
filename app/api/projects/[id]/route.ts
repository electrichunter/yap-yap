import { NextResponse } from 'next/server';
import { getProject } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // Await the params
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }

    const project = await getProject(id);

    if (!project) {
        return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ project });
}
