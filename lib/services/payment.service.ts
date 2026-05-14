import { createDatabaseService } from './database';
import { PaymentSchema, DonorSchema, PaymentCampaignSchema, Payment, PaymentMethod, PaymentStatus, PaymentType } from '@/lib/schemas/payment';
import { generateTransactionReference, calculateProcessingFee, formatCurrency, sanitizePhoneNumber, validatePhoneNumber } from '@/lib/schemas/payment';

export class PaymentService {
  private paymentDb = createDatabaseService('payments', PaymentSchema);
  private donorDb = createDatabaseService('donors', DonorSchema);
  private campaignDb = createDatabaseService('campaigns', PaymentCampaignSchema);

  // Payment CRUD operations
  async createPayment(paymentData: Omit<Payment, '_id' | 'createdAt' | 'updatedAt' | 'initiatedAt'>): Promise<Payment> {
    // Generate reference if not provided
    const reference = paymentData.reference || generateTransactionReference(paymentData.type);
    
    // Calculate processing fees
    const processingFee = calculateProcessingFee(paymentData.amount, paymentData.paymentMethod);
    
    const payment = await this.paymentDb.create({
      ...paymentData,
      reference,
      fees: {
        processingFee,
        platformFee: 0,
        taxAmount: 0,
        totalFees: processingFee
      }
    });

    // Update donor information if applicable
    if (paymentData.type === 'donation' && !paymentData.payer.isAnonymous) {
      await this.updateDonorHistory(paymentData.payer, payment);
    }

    // Update campaign if applicable
    if (paymentData.metadata.campaignId) {
      await this.updateCampaignProgress(paymentData.metadata.campaignId, payment.amount);
    }

    return payment;
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    return await this.paymentDb.findById(id);
  }

  async getPaymentByReference(reference: string): Promise<Payment | null> {
    return await this.paymentDb.findOne({ reference });
  }

  async updatePayment(id: string, updateData: Partial<Payment>): Promise<Payment | null> {
    return await this.paymentDb.update(id, updateData);
  }

  async updatePaymentStatus(id: string, status: PaymentStatus, additionalData?: Partial<Payment>): Promise<Payment | null> {
    const updateData: Partial<Payment> = {
      status,
      updatedAt: new Date().toISOString()
    };

    if (status === 'completed') {
      updateData.completedAt = new Date().toISOString();
    }

    if (additionalData) {
      Object.assign(updateData, additionalData);
    }

    return await this.updatePayment(id, updateData);
  }

  async getPayments(filter: Partial<Payment> = {}): Promise<Payment[]> {
    return await this.paymentDb.find(filter);
  }

  async getPaymentsWithPagination(
    filter: Partial<Payment> = {},
    page: number = 1,
    limit: number = 20,
    sort: Record<string, 1 | -1> = { createdAt: -1 }
  ) {
    return await this.paymentDb.findWithPagination(filter, page, limit, sort);
  }

  // M-Pesa specific methods
  async initiateMpesaPayment(mpesaData: {
    phoneNumber: string;
    amount: number;
    accountReference?: string;
    transactionDesc?: string;
    payerName: string;
    payerEmail?: string;
    type?: PaymentType;
    metadata?: any;
  }): Promise<{ payment: Payment; stkResponse: any }> {
    const sanitizedPhone = sanitizePhoneNumber(mpesaData.phoneNumber);
    
    if (!validatePhoneNumber(sanitizedPhone)) {
      throw new Error('Invalid M-Pesa phone number');
    }

    const payment = await this.createPayment({
      reference: generateTransactionReference(mpesaData.type || 'donation', 'MP'),
      amount: mpesaData.amount,
      currency: 'KES',
      paymentMethod: 'mpesa',
      type: mpesaData.type || 'donation',
      payer: {
        name: mpesaData.payerName,
        email: mpesaData.payerEmail,
        phone: sanitizedPhone
      },
      description: mpesaData.transactionDesc,
      metadata: mpesaData.metadata || {},
      mpesaDetails: {
        phoneNumber: sanitizedPhone
      }
    });

    // Initiate STK Push
    const stkResponse = await this.initiateStkPush({
      phoneNumber: sanitizedPhone,
      amount: mpesaData.amount,
      accountReference: mpesaData.accountReference || payment.reference,
      transactionDesc: mpesaData.transactionDesc || 'Payment to React Now FC Academy',
      paymentId: payment._id!
    });

    // Update payment with M-Pesa details
    await this.updatePayment(payment._id!, {
      mpesaDetails: {
        phoneNumber: sanitizedPhone,
        checkoutRequestID: stkResponse.CheckoutRequestID,
        merchantRequestID: stkResponse.MerchantRequestID
      }
    });

    return { payment, stkResponse };
  }

  private async initiateStkPush(stkData: {
    phoneNumber: string;
    amount: number;
    accountReference: string;
    transactionDesc: string;
    paymentId: string;
  }) {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortCode = process.env.MPESA_SHORTCODE || '174379';
    const callbackURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/mpesa/callback`;

    if (!consumerKey || !consumerSecret || !passkey) {
      throw new Error('M-Pesa credentials not configured');
    }

    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // Prepare STK Push request
    const stkPushRequest = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(stkData.amount),
      PartyA: stkData.phoneNumber,
      PartyB: shortCode,
      PhoneNumber: stkData.phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: stkData.accountReference,
      TransactionDesc: stkData.transactionDesc,
    };

    const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushRequest)
    });

    if (!stkResponse.ok) {
      throw new Error('M-Pesa STK Push failed');
    }

    return await stkResponse.json();
  }

  // Stripe payment methods
  async createStripePaymentIntent(stripeData: {
    amount: number;
    currency?: string;
    payerName: string;
    payerEmail?: string;
    type?: PaymentType;
    metadata?: any;
  }): Promise<{ payment: Payment; clientSecret: string }> {
    // This would integrate with Stripe API
    // For now, create a placeholder payment
    const payment = await this.createPayment({
      reference: generateTransactionReference(stripeData.type || 'donation', 'ST'),
      amount: stripeData.amount,
      currency: (stripeData.currency as any) || 'KES',
      paymentMethod: 'stripe',
      type: stripeData.type || 'donation',
      payer: {
        name: stripeData.payerName,
        email: stripeData.payerEmail
      },
      metadata: stripeData.metadata || {}
    });

    // In a real implementation, you would call Stripe API here
    const clientSecret = 'pi_test_placeholder';

    return { payment, clientSecret };
  }

  // PayPal payment methods
  async createPayPalPayment(paypalData: {
    amount: number;
    currency?: string;
    payerName: string;
    payerEmail?: string;
    type?: PaymentType;
    metadata?: any;
  }): Promise<{ payment: Payment; approvalUrl: string; paymentId: string }> {
    const payment = await this.createPayment({
      reference: generateTransactionReference(paypalData.type || 'donation', 'PP'),
      amount: paypalData.amount,
      currency: (paypalData.currency as any) || 'USD',
      paymentMethod: 'paypal',
      type: paypalData.type || 'donation',
      payer: {
        name: paypalData.payerName,
        email: paypalData.payerEmail
      },
      metadata: paypalData.metadata || {}
    });

    // In a real implementation, you would call PayPal API here
    const approvalUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-TEST';
    const paymentId = 'PAYID_TEST';

    return { payment, approvalUrl, paymentId };
  }

  // Internal donation methods
  async createInternalDonation(donationData: {
    amount: number;
    donorName: string;
    donorEmail?: string;
    donorPhone?: string;
    description?: string;
    type?: PaymentType;
    metadata?: any;
  }): Promise<Payment> {
    return await this.createPayment({
      reference: generateTransactionReference(donationData.type || 'donation', 'IN'),
      amount: donationData.amount,
      currency: 'KES',
      paymentMethod: 'internal_donation',
      type: donationData.type || 'donation',
      payer: {
        name: donationData.donorName,
        email: donationData.donorEmail,
        phone: donationData.donorPhone
      },
      description: donationData.description,
      metadata: donationData.metadata || {}
    });
  }

  // Donor management
  async createDonor(donorData: Omit<Donor, '_id' | 'createdAt' | 'updatedAt'>): Promise<Donor> {
    return await this.donorDb.create(donorData);
  }

  async getDonorById(id: string): Promise<Donor | null> {
    return await this.donorDb.findById(id);
  }

  async updateDonor(id: string, updateData: Partial<Donor>): Promise<Donor | null> {
    return await this.donorDb.update(id, updateData);
  }

  async updateDonorHistory(payer: Payment['payer'], payment: Payment): Promise<void> {
    let donor = await this.donorDb.findOne({ email: payer.email });
    
    if (!donor && payer.name) {
      // Create new donor
      donor = await this.createDonor({
        name: payer.name,
        email: payer.email,
        phone: payer.phone,
        type: 'individual',
        category: 'one_time',
        totalDonated: payment.amount,
        donationCount: 1,
        firstDonationDate: payment.initiatedAt,
        lastDonationDate: payment.initiatedAt
      });
    } else if (donor) {
      // Update existing donor
      await this.updateDonor(donor._id!, {
        totalDonated: donor.totalDonated + payment.amount,
        donationCount: donor.donationCount + 1,
        lastDonationDate: payment.initiatedAt,
        firstDonationDate: donor.firstDonationDate || payment.initiatedAt
      });
    }
  }

  // Campaign management
  async createCampaign(campaignData: Omit<PaymentCampaign, '_id' | 'createdAt' | 'updatedAt'>): Promise<PaymentCampaign> {
    return await this.campaignDb.create(campaignData);
  }

  async getCampaignById(id: string): Promise<PaymentCampaign | null> {
    return await this.campaignDb.findById(id);
  }

  async updateCampaign(id: string, updateData: Partial<PaymentCampaign>): Promise<PaymentCampaign | null> {
    return await this.campaignDb.update(id, updateData);
  }

  async updateCampaignProgress(campaignId: string, donationAmount: number): Promise<void> {
    const campaign = await this.getCampaignById(campaignId);
    if (campaign) {
      await this.updateCampaign(campaignId, {
        currentAmount: campaign.currentAmount + donationAmount,
        totalDonors: campaign.totalDonors + 1,
        averageDonation: Math.round((campaign.currentAmount + donationAmount) / (campaign.totalDonors + 1) * 100) / 100
      });
    }
  }

  // Analytics and reporting
  async getPaymentStatistics(dateRange?: { start: string; end: string }) {
    const filter: any = {};
    if (dateRange) {
      filter.createdAt = {
        $gte: dateRange.start,
        $lte: dateRange.end
      };
    }

    const payments = await this.getPayments(filter);
    const completedPayments = payments.filter(p => p.status === 'completed');

    return {
      totalPayments: payments.length,
      completedPayments: completedPayments.length,
      totalAmount: completedPayments.reduce((sum, p) => sum + p.amount, 0),
      averageAmount: completedPayments.length > 0 ? Math.round(completedPayments.reduce((sum, p) => sum + p.amount, 0) / completedPayments.length * 100) / 100 : 0,
      paymentMethods: this.groupBy(completedPayments, 'paymentMethod'),
      paymentTypes: this.groupBy(completedPayments, 'type'),
      currencyBreakdown: this.groupBy(completedPayments, 'currency')
    };
  }

  async getDonorStatistics() {
    const donors = await this.donorDb.findAll();
    const activeDonors = donors.filter(d => d.status === 'active');

    return {
      totalDonors: donors.length,
      activeDonors: activeDonors.length,
      totalDonated: donors.reduce((sum, d) => sum + d.totalDonated, 0),
      averageDonation: donors.length > 0 ? Math.round(donors.reduce((sum, d) => sum + d.totalDonated, 0) / donors.length * 100) / 100 : 0,
      donorTypes: this.groupBy(donors, 'type'),
      donorCategories: this.groupBy(donors, 'category')
    };
  }

  async getCampaignStatistics() {
    const campaigns = await this.campaignDb.findAll();
    const activeCampaigns = campaigns.filter(c => c.status === 'active');

    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: activeCampaigns.length,
      totalTarget: campaigns.reduce((sum, c) => sum + c.targetAmount, 0),
      totalRaised: campaigns.reduce((sum, c) => sum + c.currentAmount, 0),
      averageProgress: campaigns.length > 0 ? Math.round(campaigns.reduce((sum, c) => sum + (c.currentAmount / c.targetAmount * 100), 0) / campaigns.length) : 0,
      campaignCategories: this.groupBy(campaigns, 'category')
    };
  }

  // Refund management
  async processRefund(paymentId: string, refundData: {
    amount: number;
    reason: string;
    refundId?: string;
  }): Promise<Payment | null> {
    const payment = await this.getPaymentById(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== 'completed') {
      throw new Error('Payment must be completed to process refund');
    }

    if (refundData.amount > payment.amount) {
      throw new Error('Refund amount cannot exceed payment amount');
    }

    const refund = {
      amount: refundData.amount,
      reason: refundData.reason,
      processedAt: new Date().toISOString(),
      refundId: refundData.refundId || `REF_${Date.now()}`,
      status: 'completed' as const
    };

    const updatedPayment = await this.updatePayment(paymentId, {
      refunds: [...payment.refunds, refund],
      status: refundData.amount === payment.amount ? 'refunded' : 'partially_refunded'
    });

    return updatedPayment;
  }

  // Utility methods
  private groupBy<T>(array: T[], key: keyof T): Record<string, number> {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = (groups[group] || 0) + 1;
      return groups;
    }, {} as Record<string, number>);
  }

  async searchPayments(query: string): Promise<Payment[]> {
    return await this.paymentDb.search(query, ['reference', 'description', 'payer.name', 'payer.email']);
  }

  async getPaymentsByDateRange(startDate: string, endDate: string): Promise<Payment[]> {
    return await this.paymentDb.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }

  async getPaymentsByMethod(method: PaymentMethod): Promise<Payment[]> {
    return await this.paymentDb.find({ paymentMethod: method });
  }

  async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    return await this.paymentDb.find({ status });
  }

  async getPaymentsByType(type: PaymentType): Promise<Payment[]> {
    return await this.paymentDb.find({ type });
  }

  // Donor Management Methods
  async createDonor(donorData: any): Promise<any> {
    return await this.donorDb.create(donorData);
  }

  async getDonorById(id: string): Promise<any> {
    return await this.donorDb.findById(id);
  }

  async getDonors(filters: any = {}, skip: number = 0, limit: number = 20): Promise<any[]> {
    return await this.donorDb.find(filters, { skip, limit, sort: { createdAt: -1 } });
  }

  async getDonorCount(filters: any = {}): Promise<number> {
    return await this.donorDb.count(filters);
  }

  async updateDonor(id: string, updateData: any): Promise<any> {
    return await this.donorDb.update(id, updateData);
  }

  async deleteDonor(id: string): Promise<boolean> {
    return await this.donorDb.delete(id);
  }

  async getDonorStatistics(): Promise<any> {
    const donors = await this.donorDb.find({});
    const activeDonors = donors.filter(d => d.status === 'active').length;
    const totalDonated = donors.reduce((sum, d) => sum + (d.totalDonated || 0), 0);
    const averageDonation = donors.length > 0 ? totalDonated / donors.length : 0;
    
    const donorTypes = this.groupByField(donors, 'type');
    const donorCategories = this.groupByField(donors, 'category');

    return {
      totalDonors: donors.length,
      activeDonors,
      totalDonated,
      averageDonation,
      donorTypes,
      donorCategories
    };
  }

  // Campaign Management Methods
  async createCampaign(campaignData: any): Promise<any> {
    return await this.campaignDb.create(campaignData);
  }

  async getCampaignById(id: string): Promise<any> {
    return await this.campaignDb.findById(id);
  }

  async getCampaigns(filters: any = {}): Promise<any[]> {
    return await this.campaignDb.find(filters, { sort: { createdAt: -1 } });
  }

  async updateCampaign(id: string, updateData: any): Promise<any> {
    return await this.campaignDb.update(id, updateData);
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return await this.campaignDb.delete(id);
  }

  async getCampaignStatistics(): Promise<any> {
    const campaigns = await this.campaignDb.find({});
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalRaised = campaigns.reduce((sum, c) => sum + (c.current?.amount || 0), 0);
    const totalGoal = campaigns.reduce((sum, c) => sum + (c.goal?.amount || 0), 0);
    const averageProgress = totalGoal > 0 ? Math.round((totalRaised / totalGoal) * 100) : 0;
    
    const campaignTypes = this.groupByField(campaigns, 'type');

    return {
      totalCampaigns: campaigns.length,
      activeCampaigns,
      totalRaised,
      totalGoal,
      averageProgress,
      campaignTypes
    };
  }
}

// Export singleton instance
export const paymentService = new PaymentService();
