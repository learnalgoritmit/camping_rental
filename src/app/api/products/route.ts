export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  try {
    // Drizzle ORM is synchronous for better-sqlite3
    // The DB schema includes the 'key' field, so it will be returned in the API response for translation purposes.
    const allProducts = db.select().from(products).all();
    return NextResponse.json(allProducts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 