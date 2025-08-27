import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { fetchNews } from "@/lib/fetchNews";
import { summarize } from "@/lib/summarize";
import { sendEmail } from "@/lib/sendEmail";

export async function GET() {
  try {
    // 1. Get subscribers
    const { data: subscribers, error } = await supabaseAdmin
      .from("subscribers")
      .select("email");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const emails = (subscribers ?? [])
      .map((s) => s.email)
      .filter((e): e is string => typeof e === "string" && e.length > 0);

    if (emails.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No subscribers found",
      });
    }

    // 2. Fetch raw news
    const news = await fetchNews();

    // 3. Only take top 5 articles
    const topFive = news.slice(0, 5);

    // 4. Summarize once per article
    const summaries = [];
    for (const n of topFive) {
      const summary = await summarize(n.title + " " + (n.summary ?? ""));
      summaries.push({
        title: n.title,
        summary,
        url: n.url ?? "#", // ✅ only use url (no more .link error)
      });
    }

    // 5. Send the SAME summaries to all subscribers
    const results: Array<{ email: string; ok: boolean; error?: string }> = [];
    for (const email of emails) {
      try {
        await sendEmail(email, summaries);
        results.push({ email, ok: true });
      } catch (err: any) {
        console.error("Email send failed:", err);
        results.push({ email, ok: false, error: err.message ?? String(err) });
      }
    }

    return NextResponse.json({
      success: true,
      count: emails.length,
      results,
    });
  } catch (err: any) {
    console.error("Daily-news error:", err);
    return NextResponse.json(
      { success: false, error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
