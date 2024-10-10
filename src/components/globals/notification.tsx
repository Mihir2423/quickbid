"use client";

import {
 NotificationCell,
 NotificationFeedPopover,
 NotificationIconButton,
} from "@knocklabs/react";
import Link from "next/link";
import { useRef, useState } from "react";

export const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  return (
    <div>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={() => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        renderItem={({ item, ...props }) => (
          <NotificationCell {...props} item={item}>
            {item && item?.data && (
              <div className="rounded-xl">
                <Link
                  className="text-blue-400 hover:text=blue-500"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  href={`/product/${item?.data.productId}`}
                >
                  Someone outbidded you on{" "}
                  <span className="font-bold">{item?.data.productName}</span> by
                  ${item?.data.bidAmount}
                </Link>
              </div>
            )}
          </NotificationCell>
        )}
      />
    </div>
  );
};
