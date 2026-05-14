import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// GET /api/campaigns/[id] - Get specific campaign
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaign = await paymentService.getCampaignById(params.id);
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: campaign
    });

  } catch (error: any) {
    console.error('Campaign GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch campaign' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/campaigns/[id] - Update campaign
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const campaign = await paymentService.updateCampaign(params.id, body);

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: campaign,
      message: 'Campaign updated successfully'
    });

  } catch (error: any) {
    console.error('Campaign PUT error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update campaign' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/campaigns/[id] - Delete campaign
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await paymentService.deleteCampaign(params.id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Campaign deleted successfully'
    });

  } catch (error: any) {
    console.error('Campaign DELETE error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete campaign' 
      },
      { status: 500 }
    );
  }
}
