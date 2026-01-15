import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';

/**
 * Dashboard-specific Loading Component
 * Shows while /dashboard page loads
 * Uses the shared DashboardSkeleton
 */
export default function DashboardLoading() {
    return <DashboardSkeleton />;
}
