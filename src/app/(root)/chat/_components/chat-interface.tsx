import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageSquare } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  onSendMessage: (message: string) => void;
};

const EmptyState = () => (
  <div className="flex flex-col justify-center items-center space-y-4 p-8 h-full text-center">
    <div className="flex justify-center items-center bg-neutral-100 rounded-full w-16 h-16">
      <MessageSquare className="w-8 h-8 text-neutral-400" />
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-neutral-800 text-xl">
        Welcome to Chat Assistant
      </h3>
      <p className="max-w-sm text-neutral-500 text-sm">
        Start a conversation by typing a message below. I&lsquo;m here to help
        answer your questions and assist you with any tasks.
      </p>
    </div>
    <div className="gap-3 grid grid-cols-2 mt-4">
      <div className="bg-neutral-50 p-3 rounded-lg">
        <p className="font-medium text-neutral-700 text-sm">
          &ldquo;How can you help me?&ldquo;
        </p>
      </div>
      <div className="bg-neutral-50 p-3 rounded-lg">
        <p className="font-medium text-neutral-700 text-sm">
          &quot;Tell me about...&quot;
        </p>
      </div>
    </div>
  </div>
);

export const ChatInterface: React.FC<Props> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Card className="shadow-lg mx-auto w-full max-w-2xl">
      <CardContent className="p-0 rounded-md">
        <div className="bg-white p-4 border-b">
          <h2 className="font-semibold text-gray-800 text-lg">
            Chat Assistant
          </h2>
          <p className="text-gray-500 text-sm">Ask me anything</p>
        </div>
        <ScrollArea
          className="p-4 h-[500px] overflow-y-auto"
          ref={scrollAreaRef}
        >
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 transition-opacity duration-200 ease-in-out ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar
                    className={`flex-shrink-0 ${message.role === "user" ? "bg-gray-100" : "bg-gray-100"}`}
                  >
                    <AvatarImage
                      src={
                        message.role === "user"
                          ? "/user-avatar.png"
                          : "/bot-avatar.png"
                      }
                      alt={message.role === "user" ? "User" : "Assistant"}
                    />
                    <AvatarFallback className="text-sm">
                      {message.role === "user" ? "You" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm transition-all duration-200 ${
                      message.role === "user"
                        ? "bg-neutral-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border-gray-200 bg-gray-50 focus:border-transparent focus:ring-2 focus:ring-neutral-600 transition-all duration-200"
            />
            <Button
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-700 transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};
