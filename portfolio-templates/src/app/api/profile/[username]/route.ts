import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const backendUrl = process.env.BACKEND_URL || 'https://resuflow-h3g6.onrender.com';

  try {
    const res = await fetch(`${backendUrl}/api/profile/${username}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: res.status }
      );
    }

    const profile = await res.json();
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: 'Failed to reach backend' },
      { status: 502 }
    );
  }
}
