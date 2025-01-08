import React from "react";
import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { Chat } from "./_components/chat";
import prisma from "@/lib/db";

const ChatBotPage = async () => {
  const products = await prisma.products.findMany();
  console.log(products);
  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="ChatBot"></PageHeader>
        <Chat />
      </div>
    </ComponentWrapper>
  );
};

export default ChatBotPage;
