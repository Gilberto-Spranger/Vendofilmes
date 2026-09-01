import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-06-24.dahlia',
});

export async function POST(req: Request) {
  try {
    const { priceId, isSubscription, amount, name } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ url: '/carteira?success=true&mock=true' });
    }

    const isRealSubscription = isSubscription && priceId && priceId.startsWith('price_');

    const lineItems = isRealSubscription 
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: name || 'Assinatura VendoFilmes',
              },
              unit_amount: amount ? amount * 100 : 3990, // in cents
            },
            quantity: 1,
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: isRealSubscription ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/carteira?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/carteira?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
