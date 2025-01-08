"use client"

import React, { useState } from "react";
import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { ChatInterface } from "./_components/chat-interface";

const ChatBotPage = () => {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `You said: ${message}` },
      ]);
    }, 1000);
  };

  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="ChatBot"></PageHeader>
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </ComponentWrapper>
  );
};

export default ChatBotPage;
