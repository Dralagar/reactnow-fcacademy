import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc, name, email } = await req.json();

    // Get credentials from environment variables
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortCode = process.env.MPESA_SHORTCODE || '174379';
    const callbackURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/callback`;

    if (!consumerKey || !consumerSecret || !passkey) {
      console.error('Missing M-Pesa credentials');
      return NextResponse.json(
        { success: false, message: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // Prepare STK Push request
    const stkPushRequest = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: accountReference || 'DONATION',
      TransactionDesc: transactionDesc || 'Donation to React Now FC Academy',
    };

    // Initiate STK Push
    const stkResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Here you would save the transaction to your database
    // await saveTransaction({
    //   checkoutRequestID: stkResponse.data.CheckoutRequestID,
    //   amount,
    //   phoneNumber,
    //   name,
    //   email,
    //   status: 'pending'
    // });

    return NextResponse.json({
      success: true,
      message: 'STK Push sent successfully',
      checkoutRequestID: stkResponse.data.CheckoutRequestID,
      responseCode: stkResponse.data.ResponseCode,
    });

  } catch (error: any) {
    console.error('STK Push error:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        success: false, 
        message: error.response?.data?.errorMessage || 'Payment initiation failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}