import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/user
 * Protected endpoint that requires authentication
 * Returns user data if valid token is provided
 */

export async function GET(request: NextRequest) {
    try {
        // Extract token from Authorization header
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // In production, validate token against database/JWT
        // For now, accept any token that starts with "mock-access-token"
        if (token.startsWith('mock-access-token')) {
            return NextResponse.json(
                {
                    user: {
                        id: '1',
                        email: 'user@example.com',
                        name: 'John Doe',
                        role: 'user',
                        createdAt: '2024-01-01T00:00:00Z',
                    },
                    stats: {
                        loginCount: 42,
                        lastLogin: new Date().toISOString(),
                    },
                },
                { status: 200 }
            );
        }

        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    } catch (_error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
