// POST /api/quote — recomputes the price server-side (never trusts the client)
// from the same pricing constants and persists a Quote row.
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { calculateQuote } from 'src/lib/pricing';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      uploadId,
      volume = 0,
      material = 'PLA',
      color = 'white',
      quality = '0.4mm',
      infill = 20,
      finish = 'None',
      unit = 'mm',
      quantity = 1,
    } = body ?? {};

    const { unitPrice, total } = calculateQuote({
      volume: Number(volume),
      material,
      quality,
      infill: Number(infill),
      finish,
      quantity: Number(quantity),
    });

    const quote = await prisma.quote.create({
      data: {
        uploadId: uploadId || null,
        material,
        color,
        quality,
        infill: Math.round(Number(infill)),
        finish,
        unit,
        quantity: Math.max(1, Math.round(Number(quantity))),
        unitPrice,
        total,
      },
    });

    return NextResponse.json(quote);
  } catch (err) {
    console.error('POST /api/quote failed', err);
    return NextResponse.json({ error: 'Could not create quote.' }, { status: 500 });
  }
}
