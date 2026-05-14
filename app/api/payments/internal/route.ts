import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/internal - Create internal donation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, donorName, donorEmail, donorPhone, description, type, metadata } = body;

    if (!amount || !donorName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: amount, donorName' },
        { status: 400 }
      );
    }

    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least 1 KES' },
        { status: 400 }
      );
    }

    const payment = await paymentService.createInternalDonation({
      amount,
      donorName,
      donorEmail,
      donorPhone,
      description,
      type,
      metadata
    });

    // Auto-complete internal donations
    const completedPayment = await paymentService.updatePaymentStatus(
      payment._id!,
      'completed',
      {
        completedAt: new Date().toISOString(),
        description: description || 'Internal donation processed'
      }
    );

    return NextResponse.json({
      success: true,
      data: completedPayment,
      message: 'Internal donation processed successfully'
    });

  } catch (error: any) {
    console.error('Internal donation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal donation processing failed' 
      },
      { status: 500 }
    );
  }
}
