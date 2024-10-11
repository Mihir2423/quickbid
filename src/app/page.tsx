import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="top-0 left-0 fixed flex justify-between items-center p-6 w-full">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <Button className="flex justify-center items-center gap-2 w-fit transition-all duration-300 ease-in-out">
          Contact Us <MessageSquare size={18} />
        </Button>
      </nav>
      <div className="flex flex-col justify-center items-center gap-2 w-full h-screen">
        <h1 className="font-bold text-5xl text-black">QuickBid</h1>
        <p className="font-normal text-center text-gray-500 text-lg">
          A fast, intuitive platform where users can bid, win, and save on top
          products and services in real-time.
        </p>
        <Button asChild>
          <Link href="/dashboard" className="flex justify-center items-center gap-2 mt-2 w-fit text-lg transition-all duration-300 ease-in-out">
            Get Started <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
      <footer className="bottom-0 left-0 fixed flex justify-center pb-4 w-full text-center">
        © 2024 QuickBid. All rights reserved.
      </footer>
    </div>
  );
}
