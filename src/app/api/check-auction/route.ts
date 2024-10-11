/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkExpiredAuctions } from "@/data-access/check-auction";
import { NextRequest, NextResponse } from "next/server";

// vercel sends "post" req for cron job
export async function POST(req: NextRequest) {
  try {
    console.log("Cron job started, date: ", new Date().toISOString());
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    await checkExpiredAuctions();
    console.log("Cron job completed, date: ", new Date().toISOString());
    return NextResponse.json(
      { message: "Cron job completed" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
