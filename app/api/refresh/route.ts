import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/refresh
 * Refreshes the access token using a refresh token
 * In production, validate refresh token against database
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token is required' },
                { status: 400 }
            );
        }

        // In production, validate refresh token against database
        // For now, accept any refresh token that starts with "mock-refresh-token"
        if (refreshToken.startsWith('mock-refresh-token')) {
            // Generate new tokens
            const newAccessToken = `mock-access-token-${Date.now()}`;
            const newRefreshToken = `mock-refresh-token-${Date.now()}`;

            return NextResponse.json(
                {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { error: 'Invalid refresh token' },
            { status: 401 }
        );
    } catch (_error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
