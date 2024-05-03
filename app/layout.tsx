import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import { constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexProvider } from "@/components/providers/convex-provider";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const font = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />
              <main className="min-h-[calc(100vh-129px)] p-4">
                <Toaster theme="system" richColors />
                {children}
                <Analytics />
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ConvexProvider>
  );
}
