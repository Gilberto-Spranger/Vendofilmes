import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(movies).where(eq(movies.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
