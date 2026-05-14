import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/mpesa - Initiate M-Pesa payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, accountReference, transactionDesc, payerName, payerEmail, type, metadata } = body;

    if (!phoneNumber || !amount || !payerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: phoneNumber, amount, payerName' },
        { status: 400 }
      );
    }

    if (amount < 1) {
      return NextResponse.json(
        { success: false, error: 'Amount must be at least 1 KES' },
        { status: 400 }
      );
    }

    const result = await paymentService.initiateMpesaPayment({
      phoneNumber,
      amount,
      accountReference,
      transactionDesc,
      payerName,
      payerEmail,
      type,
      metadata
    });

    return NextResponse.json({
      success: true,
      data: {
        payment: result.payment,
        checkoutRequestID: result.stkResponse.CheckoutRequestID,
        merchantRequestID: result.stkResponse.MerchantRequestID,
        responseCode: result.stkResponse.ResponseCode,
        responseMessage: result.stkResponse.ResponseDescription || 'STK Push initiated successfully'
      }
    });

  } catch (error: any) {
    console.error('M-Pesa payment error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'M-Pesa payment initiation failed' 
      },
      { status: 500 }
    );
  }
}
