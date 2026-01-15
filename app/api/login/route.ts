import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/login
 * Dummy login endpoint for authentication
 * In production, this would validate against a database
 */

const DUMMY_CREDENTIALS = {
    email: 'user@example.com',
    password: 'password123',
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Validate credentials (dummy check)
        if (
            email === DUMMY_CREDENTIALS.email &&
            password === DUMMY_CREDENTIALS.password
        ) {
            // Generate mock tokens
            const accessToken = `mock-access-token-${Date.now()}`;
            const refreshToken = `mock-refresh-token-${Date.now()}`;

            return NextResponse.json(
                {
                    accessToken,
                    refreshToken,
                    user: {
                        id: '1',
                        email,
                        name: 'John Doe',
                    },
                },
                { status: 200 }
            );
        }

        // Invalid credentials
        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
