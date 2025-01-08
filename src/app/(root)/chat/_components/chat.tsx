"use client"

import React, { useState } from "react";
import { ChatInterface } from "./chat-interface";

export const Chat = () => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `You said: ${message}` },
      ]);
    }, 1000);
  };
  return (
    <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
  );
};
