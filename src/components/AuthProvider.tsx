// Import necessary modules
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HomeUrl } from "@/app/layout";

const excludedRoutes = [
  "/account",
  "/account-savelists",
  "/account-order",
  "/account-password",
  "/account-billing",
];

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);

  useEffect(() => {
    if (!session && excludedRoutes.includes(pathname)) {
      // Redirect to a login page or any other page of your choice
      // Adjust the redirect path according to your project structure.
      router.push(HomeUrl || "/");
    }
  }, [session, pathname]);

  return (
    <SessionProvider session={session}>
      <div
        className={`relative  ${
          pathname === "/auth/register" ||
          pathname === "/auth/signIn" ||
          pathname === "/auth/forgotpassword"
            ? "top-0  md:top-0"
            : "top-32 md:top-36"
        }`}
      >
        {children}
      </div>
    </SessionProvider>
  );
}
