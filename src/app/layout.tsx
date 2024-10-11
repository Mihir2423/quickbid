import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://quickbid.vercel.app"
  ),
  title: "QuickBid 💵 | Real-time bidding platform",
  description: "Bidding Platform",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: `${process.env.NEXT_PUBLIC_URL}/opengraph-image.png`,
    images: "/opengraph-image.png",
    siteName: "QuickBid",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
