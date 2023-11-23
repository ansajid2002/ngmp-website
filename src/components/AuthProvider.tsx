"use client"
import { SessionProvider } from 'next-auth/react';

const excludedRoutes = ['/account'];

export default function Provider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}): React.ReactNode {
    // Check if there is no session and if the user is trying to access an excluded route
    const isExcludedRoute = excludedRoutes.some(route => window.location.pathname.startsWith(route));

    if (!session && typeof window !== 'undefined' && isExcludedRoute) {
        // Redirect to the home page
        window.location.href = '/';
        return null; // Return null to prevent rendering the rest of the components
    }

    return <SessionProvider session={session}>{children}</SessionProvider>;
}
