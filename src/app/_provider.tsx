import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { NotificationProvider } from "./_notif-provider";
type Props = {
  children: React.ReactNode;
};

const Provider = async ({ children }: Props) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
};

export default Provider;
