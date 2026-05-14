import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/stripe - Create Stripe payment intent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, payerName, payerEmail, type, metadata } = body;

    if (!amount || !payerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: amount, payerName' },
        { status: 400 }
      );
    }

    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least 1' },
        { status: 400 }
      );
    }

    const result = await paymentService.createStripePaymentIntent({
      amount,
      currency: currency || 'USD',
      payerName,
      payerEmail,
      type,
      metadata
    });

    return NextResponse.json({
      success: true,
      data: {
        payment: result.payment,
        clientSecret: result.clientSecret,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      }
    });

  } catch (error: any) {
    console.error('Stripe payment error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Stripe payment initiation failed' 
      },
      { status: 500 }
    );
  }
}
