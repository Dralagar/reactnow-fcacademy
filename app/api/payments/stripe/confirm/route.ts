import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/stripe/confirm - Confirm Stripe payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, paymentIntentId } = body;

    if (!paymentId || !paymentIntentId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: paymentId, paymentIntentId' },
        { status: 400 }
      );
    }

    // Verify payment with Stripe (in real implementation)
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    // Update payment status
    const updatedPayment = await paymentService.updatePaymentStatus(
      paymentId,
      'completed',
      {
        stripeDetails: {
          paymentIntentId,
          stripeCustomerId: 'cus_test' // Would come from Stripe
        }
      }
    );

    return NextResponse.json({
      success: true,
      data: updatedPayment
    });

  } catch (error: any) {
    console.error('Stripe payment confirmation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Stripe payment confirmation failed' 
      },
      { status: 500 }
    );
  }
}
