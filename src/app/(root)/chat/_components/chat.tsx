"use client";

import React, { useState } from "react";
import { ChatInterface } from "./chat-interface";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;
};

export const Chat = ({ products }: Props) => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

  console.log(products);
  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          bids: products,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };
  return (
    <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
  );
};
