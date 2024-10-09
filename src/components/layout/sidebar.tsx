"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hammer, Bell, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { signOut } from "next-auth/react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-background transition-all duration-300 flex flex-col h-full pb-4`}
    >
      <div className="flex justify-between items-center gap-2 p-4 pr-0">
        <Image src="/logo.png" alt="logo" width={36} height={36} />
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:flex hidden"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        )}
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-2">
          <li>
            <Link
              href="/auction"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <Hammer size={20} />
              {!isCollapsed && <span>Auction</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/notifications"
              className={`flex items-center p-2 rounded-lg hover:bg-accent ${
                isCollapsed ? "justify-center" : "space-x-3"
              }`}
            >
              <Bell size={20} />
              {!isCollapsed && <span>Notifications</span>}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
        >
          <Avatar>
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">John Doe</p>
              <p className="text-muted-foreground text-xs truncate">
                john@example.com
              </p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={async () => await signOut()}
          size="sm"
          className={`mt-2 text-left w-fit ${isCollapsed ? "p-2" : ""}`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
