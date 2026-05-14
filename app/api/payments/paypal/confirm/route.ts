import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/paypal/confirm - Confirm PayPal payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, payerId, paymentToken } = body;

    if (!paymentId || !payerId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: paymentId, payerId' },
        { status: 400 }
      );
    }

    // Verify payment with PayPal (in real implementation)
    // const payment = await paypal.payment.execute(paymentId, { payer_id: payerId });
    
    // Update payment status
    const updatedPayment = await paymentService.updatePaymentStatus(
      paymentId,
      'completed',
      {
        paypalDetails: {
          paymentId,
          payerId,
          paymentToken: paymentToken || 'TEST_TOKEN'
        }
      }
    );

    return NextResponse.json({
      success: true,
      data: updatedPayment
    });

  } catch (error: any) {
    console.error('PayPal payment confirmation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'PayPal payment confirmation failed' 
      },
      { status: 500 }
    );
  }
}
