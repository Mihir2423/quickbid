import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const apiKey = process.env.GOOGLE_API_KEY;

const model = new ChatGoogleGenerativeAI({
  apiKey: apiKey,
  model: "gemini-2.0-flash-exp",
  maxOutputTokens: 2048,
});

const template = `
You are a helpful assistant that provides information about bids. You have access to the following bid data:
{bidData}

User Question: {question}

Please provide a detailed response about the bids based on the question. If you're unsure about any specific details, provide general guidance about bids and bidding processes.

Response should be:
1. Relevant to the question
2. Based on the provided bid data
3. Professional and clear
4. Include specific bid details when available

If you cannot find specific information in the bid data, please respond with:
"I don't have specific information about that, but here's some general guidance about bids: [provide general bidding advice]"
`;

const promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["bidData", "question"],
});

export const runtime = "edge";

// Add type for the expected request body
type RequestBody = {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bids: any[]; // Replace 'any' with your specific bid type
};

export async function POST(req: Request) {
  try {
    const { message, bids }: RequestBody = await req.json();

    // Validate the incoming data
    if (!message || !bids) {
      return NextResponse.json(
        { error: "Message and bids are required" },
        { status: 400 }
      );
    }

    // Create LLMChain
    const chain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });

    // Run the chain with the provided bids data
    const response = await chain.call({
      bidData: JSON.stringify(bids),
      question: message,
    });

    // Fallback response if no answer is generated
    const fallbackResponse = {
      content:
        "I apologize, but I don't have enough information to answer that question. Here are some general guidelines about bidding:\n\n" +
        "1. Always review bid requirements carefully\n" +
        "2. Ensure all documentation is complete and accurate\n" +
        "3. Submit bids before the deadline\n" +
        "4. Follow up on submitted bids as appropriate\n\n" +
        "Would you like more specific information about any of these points?",
      role: "assistant",
    };

    return NextResponse.json({
      message: response.text || fallbackResponse.content,
      role: "assistant",
    });
  } catch (error) {
    console.error("Error processing chat:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
