import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/paypal - Create PayPal payment
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

    const result = await paymentService.createPayPalPayment({
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
        approvalUrl: result.approvalUrl,
        paymentId: result.paymentId
      }
    });

  } catch (error: any) {
    console.error('PayPal payment error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'PayPal payment initiation failed' 
      },
      { status: 500 }
    );
  }
}
