import { NextResponse } from 'next/server';

// Simple test endpoint to check if the server is running
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Server is running correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
