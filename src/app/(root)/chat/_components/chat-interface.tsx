import { useState, useRef, useEffect } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

interface Props {
  messages: { role: string; content: string }[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const EmptyState = () => (
  <div className="flex flex-col justify-center items-center px-4 h-full text-center">
    <div className="flex justify-center items-center bg-neutral-100 mb-6 rounded-full w-16 h-16">
      <MessageSquare className="w-8 h-8 text-neutral-400" />
    </div>
    <h2 className="mb-3 font-semibold text-2xl text-neutral-900">
      Welcome to Chat Assistant
    </h2>
    <p className="mb-8 max-w-md text-base text-neutral-600">
      Start a conversation by typing a message below. I&apos;m here to help
      answer your questions and assist you with any tasks.
    </p>
    <div className="gap-4 grid grid-cols-2 w-full max-w-md">
      <div className="bg-neutral-50 p-4 rounded-xl">
        <p className="text-neutral-600 text-sm">
          &quot;How can you help me?&quot;
        </p>
      </div>
      <div className="bg-neutral-50 p-4 rounded-xl">
        <p className="text-neutral-600 text-sm">&quot;Tell me about...&quot;</p>
      </div>
    </div>
  </div>
);

export function ChatInterface({ messages, onSendMessage, isLoading }: Props) {
  const [input, setInput] = useState("");
  const [displayedContent, setDisplayedContent] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedContent(lastMessage.content.slice(0, i));
          i++;
          if (i > lastMessage.content.length) {
            clearInterval(intervalId);
          }
        }, 20);
        return () => clearInterval(intervalId);
      }
    }
  }, [messages]);
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
    <Card className="shadow-lg mx-auto w-full max-w-3xl h-[80%]">
      <CardHeader className="px-6 py-4 border-b">
        <h2 className="font-semibold text-neutral-900 text-xl">
          Chat Assistant
        </h2>
        <p className="text-neutral-500 text-sm">Ask me anything</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[calc(100vh-20rem)]">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <ScrollArea className="p-6 h-full" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      message.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          message.role === "user"
                            ? "/user-avatar.png"
                            : "/bot-avatar.png"
                        }
                      />
                      <AvatarFallback>
                        {message.role === "user" ? "You" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[75%] ${
                        message.role === "user"
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-900"
                      }`}
                    >
                      {message.role === "assistant" &&
                      index === messages.length - 1
                        ? displayedContent
                        : message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-neutral-100 px-4 py-2 rounded-2xl">
                      <div className="flex justify-center items-center w-6 h-6">
                        <Loader2 className="w-4 h-4 text-neutral-900 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2 w-full">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className="bg-neutral-900 hover:bg-neutral-800"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
