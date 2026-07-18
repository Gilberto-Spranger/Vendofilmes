import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { userMoviesList } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';

// Get user's list
export async function GET(req: Request) {
  // Mock user for now since auth is not fully hooked in the API
  const userId = 1;
  const list = await db.select().from(userMoviesList).where(eq(userMoviesList.userId, userId));
  return NextResponse.json(list);
}

// Add/Remove from list
export async function POST(req: Request) {
  const userId = 1;
  const { movieId } = await req.json();
  
  const existing = await db.select().from(userMoviesList).where(and(eq(userMoviesList.userId, userId), eq(userMoviesList.movieId, movieId)));
  
  if (existing.length > 0) {
    // Remove
    await db.delete(userMoviesList).where(eq(userMoviesList.id, existing[0].id));
    return NextResponse.json({ added: false });
  } else {
    // Add
    await db.insert(userMoviesList).values({ userId, movieId });
    return NextResponse.json({ added: true });
  }
}
