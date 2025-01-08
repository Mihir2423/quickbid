import React, { Suspense } from "react";
import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { Chat } from "./_components/chat";
import prisma from "@/lib/db";

const ChatBotPage = async () => {
  const products = await prisma.products.findMany();
  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="ChatBot"></PageHeader>
        <Suspense fallback={<div>Loading...</div>}>
          <Chat products={products || []} />
        </Suspense>
      </div>
    </ComponentWrapper>
  );
};

export default ChatBotPage;
