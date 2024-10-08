import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard 💵 | Real-time bidding platform",
  description: "Bidding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
