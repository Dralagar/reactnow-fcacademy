import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// GET /api/campaigns - List campaigns with filtering and statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statistics = searchParams.get('statistics') === 'true';
    
    if (statistics) {
      // Return campaign statistics
      const stats = await paymentService.getCampaignStatistics();
      return NextResponse.json({
        success: true,
        data: stats
      });
    }

    // Get filter parameters
    const filters: any = {};
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');

    if (status) filters.status = status;
    if (type) filters.type = type;
    if (featured) filters.featured = featured === 'true';

    // Get campaigns
    const campaigns = await paymentService.getCampaigns(filters);

    return NextResponse.json({
      success: true,
      data: campaigns
    });

  } catch (error: any) {
    console.error('Campaigns GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch campaigns' 
      },
      { status: 500 }
    );
  }
}

// POST /api/campaigns - Create new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const campaign = await paymentService.createCampaign(body);

    return NextResponse.json({
      success: true,
      data: campaign,
      message: 'Campaign created successfully'
    });

  } catch (error: any) {
    console.error('Campaign POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create campaign' 
      },
      { status: 500 }
    );
  }
}
