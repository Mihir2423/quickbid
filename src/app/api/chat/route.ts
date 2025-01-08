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
You are a professional assistant providing insights on bids and website features. Your responses should be fluent, professional, and easy to read. Avoid bullet points, lists, or structured formatting.

Here’s the bid information you can reference:
{bidData}

User Question: {question}

Response:
- If the user asks about specific features like the dashboard, auctions tab, or wins tab, describe them conversationally with relevant details.
- Provide a general overview if asked about the website. Describe "Quick Bid" as a fast, intuitive platform where users can bid, win, and save on top products and services in real-time.
- If detailed bid data is unavailable, share general bidding advice. Maintain a professional, engaging tone.
- If the user's question is unclear or beyond available knowledge, ask clarifying questions or return general guidance.

Avoid lists or markdown-like formatting. Responses should feel natural and polished.
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

    const websiteData = {
      dashboard:
        "The dashboard provides a summary of your bidding activity. It includes Total Revenue of $45,231.89 (+20.1% from last month), Active Auctions with 23 ongoing (+4 new since last login), a Win Rate of 32% (+2% from last week), and an Average Bid Increase of 12% (-4% from last month). Recent Auctions are displayed with time remaining and current bid amounts, and you can view My Auctions (Active, Won, Lost) showing 3 active auctions.",
      wins: "The Wins tab displays all the auctions you have won, helping you track your successful bids and manage your purchases.",
      auctionTab:
        "The Auction tab provides access to all live auctions and your bidding history. You can also create new auctions by clicking the 'Create Auction' button and filling out the required details.",
      overview:
        "Quick Bid is a fast, intuitive platform where users can bid, win, and save on top products and services in real-time.",
    };

    const response = await chain.call({
      bidData: JSON.stringify(bids),
      question: message,
    });

    let finalResponse = response.text;

    if (!finalResponse) {
      if (message.toLowerCase().includes("dashboard")) {
        finalResponse = websiteData.dashboard;
      } else if (message.toLowerCase().includes("wins")) {
        finalResponse = websiteData.wins;
      } else if (message.toLowerCase().includes("auction")) {
        finalResponse = websiteData.auctionTab;
      } else if (message.toLowerCase().includes("website")) {
        finalResponse = websiteData.overview;
      } else {
        finalResponse =
          "I couldn’t find specific bid details right now. Remember to review terms thoroughly, set competitive bids within your budget, and keep track of submission deadlines. Feel free to ask more questions if needed!";
      }
    }

    return NextResponse.json({
      message: finalResponse,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process your request." },
      { status: 500 }
    );
  }
}
