// GET /api/orders/[id] — fetch an order by id OR orderNumber (for status page).
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { getSession } from 'src/lib/auth';

export const runtime = 'nodejs';

const VALID_STATUSES = ['PROCESSING', 'PRINTING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

// PATCH /api/orders/[id] — admin-only order status update.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }
    const { id } = await params;
    const { status } = await req.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    return NextResponse.json(order);
  } catch (err) {
    console.error('PATCH /api/orders/[id] failed', err);
    return NextResponse.json({ error: 'Could not update order.' }, { status: 500 });
  }
}

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
