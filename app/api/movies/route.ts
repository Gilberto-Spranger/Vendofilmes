import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allMovies = await db.select().from(movies).orderBy(desc(movies.createdAt));
    return NextResponse.json(allMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await db.insert(movies).values({
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      bannerUrl: data.bannerUrl,
      duration: data.duration,
      year: parseInt(data.year),
      rating: data.rating,
      match: parseInt(data.match) || 85,
      categories: data.categories || [],
    }).returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
