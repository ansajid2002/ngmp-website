// Import necessary modules
"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { HomeUrl } from '@/app/layout';

const excludedRoutes = ['/account', '/account-savelists', '/account-order', '/account-password', '/account-billing'];

export default function Provider({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}): React.ReactNode {
    const pathname = usePathname();
    const router = useRouter()

    console.log(session);

    useEffect(() => {
        if (!session && excludedRoutes.includes(pathname)) {
            // Redirect to a login page or any other page of your choice
            // Adjust the redirect path according to your project structure.
            router.push(HomeUrl || '/')

        }
    }, [session, pathname]);

    return <SessionProvider session={session}>{children}</SessionProvider>;
}
