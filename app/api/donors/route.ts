import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// GET /api/donors - List donors with filtering and statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statistics = searchParams.get('statistics') === 'true';
    
    if (statistics) {
      // Return donor statistics
      const stats = await paymentService.getDonorStatistics();
      return NextResponse.json({
        success: true,
        data: stats
      });
    }

    // Get filter parameters
    const filters: any = {};
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    if (type) filters.type = type;
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Get pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Get donors
    const donors = await paymentService.getDonors(filters, skip, limit);
    const total = await paymentService.getDonorCount(filters);

    return NextResponse.json({
      success: true,
      data: donors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Donors GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch donors' 
      },
      { status: 500 }
    );
  }
}

// POST /api/donors - Create new donor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const donor = await paymentService.createDonor(body);

    return NextResponse.json({
      success: true,
      data: donor,
      message: 'Donor created successfully'
    });

  } catch (error: any) {
    console.error('Donor POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create donor' 
      },
      { status: 500 }
    );
  }
}
