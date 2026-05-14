import { NextRequest, NextResponse } from 'next/server';
import { playerService } from '@/lib/services/player.service';
import { PlayerSchema } from '@/lib/schemas/player';

// GET /api/players/[id] - Get a specific player
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const statistics = searchParams.get('statistics') === 'true';

    if (statistics) {
      const stats = await playerService.getPlayerStatistics(params.id);
      return NextResponse.json({ success: true, data: stats });
    }

    const player = await playerService.getPlayerById(params.id);
    
    if (!player) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: player });

  } catch (error) {
    console.error('Error in GET /api/players/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch player' },
      { status: 500 }
    );
  }
}

// PUT /api/players/[id] - Update a specific player
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate partial update data
    const validatedData = PlayerSchema.partial().parse(body);
    
    const player = await playerService.updatePlayer(params.id, validatedData);
    
    if (!player) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: player });

  } catch (error) {
    console.error('Error in PUT /api/players/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update player' },
      { status: 500 }
    );
  }
}

// DELETE /api/players/[id] - Delete a specific player
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await playerService.deletePlayer(params.id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Player deleted successfully' });

  } catch (error) {
    console.error('Error in DELETE /api/players/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete player' },
      { status: 500 }
    );
  }
}
