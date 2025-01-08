import { NextResponse } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const apiKey = process.env.GOOGLE_API_KEY;

const model = new ChatGoogleGenerativeAI({
  apiKey: apiKey,
  model: "gemini-2.0-flash-exp",
  maxOutputTokens: 2048,
});

const template = `
You are a professional assistant providing insights on bids. Your responses should be fluent, professional, and easy to read. Avoid bullet points, lists, or structured formatting.

Here’s the bid information you can reference:
{bidData}

User Question: {question}

Response:
- Provide a clear and direct answer.
- Highlight key points within a cohesive paragraph.
- Keep the tone professional but engaging, avoiding robotic or overly casual language.
- If detailed bid information is unavailable, share practical, general bidding advice within a single flowing response.

Avoid listing or markdown-like formatting. The response should feel like natural, professional communication.
`;

const promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["bidData", "question"],
});

export const runtime = "edge";

type RequestBody = {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bids: Record<string, any>[];
};

export async function POST(req: Request) {
  try {
    const { message, bids }: RequestBody = await req.json();

    if (!message || !bids) {
      return NextResponse.json(
        { error: "Please provide both a message and bids data." },
        { status: 400 }
      );
    }

    const chain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });

    const response = await chain.call({
      bidData: JSON.stringify(bids),
      question: message,
    });

    const fallbackResponse = {
      content:
        "I couldn’t find specific bid details right now. Remember to review terms thoroughly, set competitive bids within your budget, and keep track of submission deadlines. Feel free to ask more questions if needed!",
    };

    return NextResponse.json({
      message: response.text || fallbackResponse.content,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process your request." },
      { status: 500 }
    );
  }
}
