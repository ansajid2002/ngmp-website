import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import NewFooter from "@/shared/Footer/NewFooter"
import SiteHeader from "@/app/SiteHeader";
import CommonClient from "./CommonClient";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReduxProvider } from "@/redux/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});


export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ReduxProvider>

          <SiteHeader />
          {children}
          <CommonClient />
          {/* <Footer /> */}
          <NewFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}
// export const AdminUrl = "http://192.168.1.9:3001";
export const AdminUrl = "https://nileadmin.websitetest.info";
