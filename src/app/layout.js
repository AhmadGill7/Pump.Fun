import "./globals.css";
import { headers } from "next/headers"; // added
import ContextProvider from "@/Context/wegmiPtovider";

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const cookies = headersList?.get("cookie") ?? "";

  return (
    <html lang='en'>
      <body>
        <div data-rh='true'>
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </div>
      </body>
    </html>
  );
}
