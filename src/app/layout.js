import "./globals.css";
import { headers } from "next/headers"; // added
import ContextProvider from "@/Context/wegmiPtovider";
import BgStar from "@/components/startbg/BgStar";
import PageLoader from "@/components/PageLoader/PageLoader";
export default async function RootLayout({ children }) {
  const headersList = await headers();
  const cookies = headersList?.get("cookie") ?? "";

  return (
    <html suppressHydrationWarning lang='en'>
      <body>
        <div data-rh='true'>
          <PageLoader />
          <BgStar>
            <ContextProvider cookies={cookies}>{children}</ContextProvider>
          </BgStar>
        </div>
      </body>
    </html>
  );
}
