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


    return <SessionProvider session={session}>{children}</SessionProvider>;
}
