import { NextRequest, NextResponse } from 'next/server';
import { playerService } from '@/lib/services/player.service';
import { PlayerSchema } from '@/lib/schemas/player';

// GET /api/players - Get all players or filter players
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const ageGroup = searchParams.get('ageGroup');
    const position = searchParams.get('position');
    const skillLevel = searchParams.get('skillLevel');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const statistics = searchParams.get('statistics') === 'true';

    // Return team statistics
    if (statistics) {
      const stats = await playerService.getTeamStatistics();
      return NextResponse.json({ success: true, data: stats });
    }

    // Handle search
    if (search) {
      const players = await playerService.searchPlayers(search);
      return NextResponse.json({ 
        success: true, 
        data: players,
        pagination: {
          page: 1,
          limit: players.length,
          total: players.length,
          totalPages: 1
        }
      });
    }

    // Handle specific filters
    if (ageGroup || position || skillLevel || status || minAge || maxAge) {
      const filters: any = {};
      if (ageGroup) filters.ageGroup = ageGroup;
      if (position) filters.position = position;
      if (skillLevel) filters.skillLevel = skillLevel;
      if (status) filters.status = status;
      if (minAge) filters.minAge = parseInt(minAge);
      if (maxAge) filters.maxAge = parseInt(maxAge);

      const players = await playerService.getPlayersWithFilters(filters);
      return NextResponse.json({ 
        success: true, 
        data: players,
        pagination: {
          page: 1,
          limit: players.length,
          total: players.length,
          totalPages: 1
        }
      });
    }

    // Get all players with pagination
    const players = await playerService.getAllPlayers();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPlayers = players.slice(startIndex, endIndex);

    return NextResponse.json({ 
      success: true, 
      data: paginatedPlayers,
      pagination: {
        page,
        limit,
        total: players.length,
        totalPages: Math.ceil(players.length / limit)
      }
    });

  } catch (error) {
    console.error('Error in GET /api/players:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

// POST /api/players - Create a new player
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = PlayerSchema.omit({ _id: true, createdAt: true, updatedAt: true }).parse(body);
    
    // Create player
    const player = await playerService.createPlayer(validatedData);
    
    return NextResponse.json(
      { success: true, data: player },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST /api/players:', error);
    
    if (error instanceof Error && error.message.includes('age must be between')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create player' },
      { status: 500 }
    );
  }
}
