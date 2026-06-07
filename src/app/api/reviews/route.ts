// GET /api/reviews — list reviews (newest first)
// POST /api/reviews — submit a review
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { required } from 'src/utils/validators';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json(reviews);
  } catch (err) {
    console.error('GET /api/reviews failed', err);
    return NextResponse.json({ error: 'Could not load reviews.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, body: text } = body ?? {};
    const r = Math.round(Number(rating));

    if (!required(name) || !required(text) || !(r >= 1 && r <= 5)) {
      return NextResponse.json({ error: 'Name, body and a 1–5 rating are required.' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { name: String(name).slice(0, 80), rating: r, body: String(text).slice(0, 1000) },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error('POST /api/reviews failed', err);
    return NextResponse.json({ error: 'Could not submit review.' }, { status: 500 });
  }
}
