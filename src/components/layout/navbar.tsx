import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="top-0 left-0 fixed flex justify-between items-center backdrop-blur-md px-6 pt-6 w-full">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <Button className="flex justify-center items-center gap-2 w-fit transition-all duration-300 ease-in-out">
        Contact Us <MessageSquare size={18} />
      </Button>
    </nav>
  );
};
