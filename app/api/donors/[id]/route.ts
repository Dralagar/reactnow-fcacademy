import { NextRequest, NextResponse } from 'next/server';
import { paymentService } from '@/lib/services/payment.service';

// GET /api/donors/[id] - Get specific donor
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const donor = await paymentService.getDonorById(params.id);
    
    if (!donor) {
      return NextResponse.json(
        { success: false, error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: donor
    });

  } catch (error: any) {
    console.error('Donor GET error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch donor' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/donors/[id] - Update donor
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const donor = await paymentService.updateDonor(params.id, body);

    if (!donor) {
      return NextResponse.json(
        { success: false, error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: donor,
      message: 'Donor updated successfully'
    });

  } catch (error: any) {
    console.error('Donor PUT error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update donor' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/donors/[id] - Delete donor
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await paymentService.deleteDonor(params.id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Donor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Donor deleted successfully'
    });

  } catch (error: any) {
    console.error('Donor DELETE error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete donor' 
      },
      { status: 500 }
    );
  }
}
