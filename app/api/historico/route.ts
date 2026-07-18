import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { userMoviesHistory, users } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';

// Mock user for demo purposes
const getOrCreateDefaultUser = async () => {
  const existingUsers = await db.select().from(users).limit(1);
  if (existingUsers.length > 0) return existingUsers[0].id;
  
  const newUser = await db.insert(users).values({
    uid: 'mock_uid_' + Date.now(),
    email: 'user@example.com'
  }).returning();
  return newUser[0].id;
};

export async function POST(req: Request) {
  try {
    const userId = await getOrCreateDefaultUser();
    const { movieId, progress } = await req.json();
    
    // Check if already in history, update watchedAt and progress, else insert
    const existing = await db.select().from(userMoviesHistory)
      .where(and(eq(userMoviesHistory.userId, userId), eq(userMoviesHistory.movieId, movieId)));
      
    if (existing.length > 0) {
      await db.update(userMoviesHistory)
        .set({ watchedAt: new Date(), progress: progress || 0 })
        .where(eq(userMoviesHistory.id, existing[0].id));
    } else {
      await db.insert(userMoviesHistory).values({
        userId,
        movieId,
        progress: progress || 0
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording history:', error);
    return NextResponse.json({ error: 'Failed to record history' }, { status: 500 });
  }
}
