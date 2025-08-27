// lib/summarize.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarize(text: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // free/cheap option
    messages: [
      {
        role: "system",
        content:
          "You are a neutral AI that summarizes news into 2-3 short, key sentences. No bias, just facts. Try to use more numeric values to help strengthen news. Also, for example if there is a company name EG Nvidia, put in brackets next to the name NVDA, ie thier ticker symbol",
      },
      {
        role: "user",
        content: text,
      },
    ],
    max_tokens: 150,
  });

  return response.choices[0].message?.content ?? "No summary generated.";
}
// lib/fetchNews.ts
export type NewsItem = {
  title: string;
  url: string;      // instead of "link"
  summary: string;  // required for AI later, placeholder now
};
