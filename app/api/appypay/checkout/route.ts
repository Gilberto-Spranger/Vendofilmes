import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { firestore } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { planId, phone, amount, name } = await req.json();

    // In a real scenario, you would call the AppyPay API here:
    // const response = await fetch('https://api.appypay.co.ao/v2.0/payments', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.APPYPAY_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount, phone, method: 'multicaixa_express' })
    // });

    // We simulate a successful API call
    console.log(`Simulating AppyPay Multicaixa Express request for ${phone} - ${amount} Kz`);

    // Create a real notification in Firebase Firestore
    try {
      await addDoc(collection(firestore, 'notifications'), {
        title: 'Pagamento AppyPay Aprovado',
        message: `Sua assinatura ${name} via Multicaixa Express foi ativada com sucesso.`,
        createdAt: new Date().toISOString(),
        type: 'payment',
        read: false
      });
    } catch (e) {
      console.error('Failed to create notification in Firestore:', e);
    }

    return NextResponse.json({ success: true, message: 'Confirme o pagamento no seu aplicativo Multicaixa Express.' });
  } catch (error: any) {
    console.error('Error in AppyPay checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
