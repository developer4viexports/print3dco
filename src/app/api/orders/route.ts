// POST /api/orders — create a guest order with a simulated payment.
// Recomputes the totals server-side from the submitted line items.
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import prisma from 'src/lib/prisma';
import { shippingFor, round2, COUPONS } from 'src/lib/pricing';
import { isValidEmail, required } from 'src/utils/validators';

export const runtime = 'nodejs';

function orderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = randomBytes(2).toString('hex').toUpperCase();
  return `P3D-${stamp}${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, coupon } = body ?? {};

    if (!customer || !required(customer.name) || !isValidEmail(customer.email ?? '') || !required(customer.address)) {
      return NextResponse.json({ error: 'Name, a valid email and address are required.' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 });
    }

    const subtotal = round2(
      items.reduce((sum: number, it: { unitPrice: number; quantity: number }) => {
        return sum + Number(it.unitPrice) * Math.max(1, Number(it.quantity));
      }, 0)
    );
    const shipping = shippingFor(subtotal);
    const discountRate = (coupon && COUPONS[String(coupon).toUpperCase()]) || 0;
    const discount = round2(subtotal * discountRate);
    const total = round2(subtotal + shipping - discount);

    // Simulated payment — always succeeds. No real charge.
    const paymentRef = `SIMPAY-${randomBytes(6).toString('hex').toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone || null,
        address: customer.address,
        city: customer.city || null,
        postal: customer.postal || null,
        country: customer.country || null,
        subtotal,
        shipping,
        discount,
        total,
        status: 'PROCESSING',
        paymentRef,
        items: {
          create: items.map((it: { name: string; config: unknown; quantity: number; unitPrice: number; quoteId?: string }) => ({
            name: it.name,
            config: (it.config ?? {}) as object,
            quantity: Math.max(1, Math.round(Number(it.quantity))),
            unitPrice: round2(Number(it.unitPrice)),
            quoteId: it.quoteId || null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders failed', err);
    return NextResponse.json({ error: 'Could not place order.' }, { status: 500 });
  }
}
