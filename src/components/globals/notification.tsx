"use client";

import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { ArrowUpRight } from "lucide-react";
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm p-4 border border-blue-100 rounded-lg">
                <Link
                  className="flex items-start space-x-3 text-gray-700 text-sm hover:text-blue-600 transition-colors duration-200 group"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  href={`/product/${item?.data.productId}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="flex justify-center items-center bg-blue-500 rounded-full w-8 h-8">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p>
                      Someone outbid you on{" "}
                      <span className="font-semibold text-blue-600">
                        {item?.data.productName}
                      </span>
                    </p>
                    <p className="mt-1 font-medium text-blue-600">
                      New bid: ${item?.data.bidAmount}
                    </p>
                    <p className="group-hover:text-blue-500 mt-2 text-gray-500 text-xs transition-colors duration-200">
                      Click to view product
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </NotificationCell>
        )}
      />
    </div>
  );
};
