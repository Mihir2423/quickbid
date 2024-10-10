"use client";

import {
 KnockFeedProvider,
 KnockProvider
} from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (
    !userId ||
    !process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY ||
    !process.env.NEXT_PUBLIC_KNOCK_FEED_ID
  ) {
    return <>{children}</>;
  }

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={userId}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        <div>{children}</div>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
