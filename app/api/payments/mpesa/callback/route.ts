import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// POST /api/payments/mpesa/callback - M-Pesa callback handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('M-Pesa callback received:', body);

    // Safely extract callback data with error handling
    const stkCallback = body?.Body?.stkCallback;
    
    if (!stkCallback) {
      console.error('Invalid callback format:', body);
      return NextResponse.json({ success: false, error: 'Invalid callback format' }, { status: 400 });
    }

    const { 
      MerchantRequestID, 
      CheckoutRequestID, 
      ResultCode, 
      ResultDesc, 
      CallbackMetadata 
    } = stkCallback;

    if (!CheckoutRequestID) {
      console.error('Missing CheckoutRequestID in callback');
      return NextResponse.json({ success: false, error: 'Missing CheckoutRequestID' }, { status: 400 });
    }

    // Find the payment by checkout request ID
    const payments = await paymentService.getPayments({
      'mpesaDetails.checkoutRequestID': CheckoutRequestID
    });

    if (payments.length === 0) {
      console.error('Payment not found for CheckoutRequestID:', CheckoutRequestID);
      return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
    }

    const payment = payments[0];
    const newStatus = ResultCode === '0' ? 'completed' : 'failed';

    // Update payment status and details
    const updatedPayment = await paymentService.updatePaymentStatus(
      payment._id!,
      newStatus,
      {
        mpesaDetails: {
          ....mpesaDetails,
          resultCode: ResultCode?.toString() || 'unknown',
          resultDesc: ResultDesc || 'No description provided'
        }
      }
    );

    // If payment was successful, extract additional metadata
    if (ResultCode === '0' && CallbackMetadata?.Item && Array.isArray(CallbackMetadata.Item)) {
      try {
        const metadata = CallbackMetadata.Item.reduce((acc: any, item: any) => {
          if (item?.Name && item?.Value !== undefined) {
            acc[item.Name] = item.Value;
          }
          return acc;
        }, {});

        console.log('M-Pesa payment successful:', {
          amount: metadata.Amount,
          mpesaReceiptNumber: metadata.MpesaReceiptNumber,
          transactionDate: metadata.TransactionDate,
          phoneNumber: metadata.PhoneNumber
        });

        // You could send confirmation email/SMS here
        // await sendPaymentConfirmation(updatedPayment);
      } catch (metadataError) {
        console.error('Error processing callback metadata:', metadataError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Callback processed successfully',
      paymentId: payment._id,
      status: newStatus
    });

  } catch (error: any) {
    console.error('M-Pesa callback error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Callback processing failed' 
      },
      { status: 500 }
    );
  }
}
