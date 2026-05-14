import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';
import { PaymentSchema } from '@/lib/schemas/payment';

// GET /api/payments - Get all payments with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const method = searchParams.get('method');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const statistics = searchParams.get('statistics') === 'true';

    // Return statistics
    if (statistics) {
      const stats = await paymentService.getPaymentStatistics(
        startDate && endDate ? { start: startDate, end: endDate } : undefined
      );
      return NextResponse.json({ success: true, data: stats });
    }

    // Handle search
    if (search) {
      const payments = await paymentService.searchPayments(search);
      return NextResponse.json({ 
        success: true, 
        data: payments,
        pagination: {
          page: 1,
          limit: payments.length,
          total: payments.length,
          totalPages: 1
        }
      });
    }

    // Build filter
    const filter: any = {};
    if (method) filter.paymentMethod = method;
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
    }

    // Get payments with pagination
    const result = await paymentService.getPaymentsWithPagination(filter, page, limit);
    
    return NextResponse.json({ 
      success: true, 
      data: result.documents,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    });

  } catch (error) {
    console.error('Error in GET /api/payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = PaymentSchema.omit({ _id: true, createdAt: true, updatedAt: true, initiatedAt: true }).parse(body);
    
    // Create payment
    const payment = await paymentService.createPayment(validatedData);
    
    return NextResponse.json(
      { success: true, data: payment },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST /api/payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
