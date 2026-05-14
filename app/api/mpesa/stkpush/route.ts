import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// Legacy endpoint - redirects to new payment system
export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc, name, email } = await req.json();

    if (!phoneNumber || !amount || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: phoneNumber, amount, name' },
        { status: 400 }
      );
    }

    // Use new payment service
    const result = await paymentService.initiateMpesaPayment({
      phoneNumber,
      amount,
      accountReference: accountReference || 'DONATION',
      transactionDesc: transactionDesc || 'Donation to React Now FC Academy',
      payerName: name,
      payerEmail: email,
      type: 'donation'
    });

    return NextResponse.json({
      success: true,
      message: 'STK Push sent successfully',
      checkoutRequestID: result.stkResponse.CheckoutRequestID,
      responseCode: result.stkResponse.ResponseCode,
      paymentId: result.payment._id
    });

  } catch (error: any) {
    console.error('STK Push error:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Payment initiation failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}