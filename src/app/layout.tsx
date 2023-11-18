import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import NewFooter from "@/shared/Footer/NewFooter"
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReduxProvider } from "@/redux/provider";
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions)
  console.log(session, 'das');

  return (

    <html lang="en" dir="" className={poppins.className} >
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <NextTopLoader color="red" />
        <ReduxProvider>

          <SiteHeader session={session} />
          <div className="relative top-32">
            <AuthProvider session={session}>{children}</AuthProvider>
          </div>
          <CommonClient />
          {/* <Footer /> */}
          <NewFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}
export const AdminUrl = "http://192.168.1.8:3001";
export const HomeUrl = "http://localhost:3000";
// export const AdminUrl = "https://admin.nilegmp.com";
