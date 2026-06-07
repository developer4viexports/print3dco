// GET /api/orders/[id] — fetch an order by id OR orderNumber (for status page).
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await prisma.order.findFirst({
      where: { OR: [{ id }, { orderNumber: id }] },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (err) {
    console.error('GET /api/orders/[id] failed', err);
    return NextResponse.json({ error: 'Could not load order.' }, { status: 500 });
  }
}
