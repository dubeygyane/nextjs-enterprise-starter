'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { authService } from '@/services/auth.service';
import { performLogout } from '@/utils/logout';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Derived during render (React 19 approved)
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    performLogout();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Next.js Starter
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              {pathname !== '/dashboard' && (
                <Button
                  variant="secondary"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </Button>
              )}
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            pathname !== '/login' && (
              <Button
                variant="primary"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
