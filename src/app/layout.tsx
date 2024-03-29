import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import NewFooter from "@/shared/Footer/NewFooter";
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReduxProvider } from "@/redux/provider";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const poppins = {
  fontFamily:
    '"miui", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", Helvetica, Arial, sans-serif',
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" dir="" className={`${poppins.className} font-miui`}>
      <body className="bg-white overflow-x-hidden text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <NextTopLoader color="red" />
        <ReduxProvider>
          <div className="">
            <SiteHeader session={session} />

            <AuthProvider session={session}>{children}</AuthProvider>

            <CommonClient />
            {/* <Footer /> */}
            <NewFooter />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}

export const AdminUrl = process.env.BASEURL;
export const HomeUrl = process.env.HOMEURL;
export const ProductImageUrl = process.env.PRODUCTIMAGEURL;
// export const AdminUrl = "https://admin.nilegmp.com";
