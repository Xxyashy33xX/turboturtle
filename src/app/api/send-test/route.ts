import { NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/sendEmail";

export async function GET() {
  const testRecipient = "agnihotriaryan@gmail.com"; // change this to your email

  const result = await sendTestEmail(testRecipient);

  return NextResponse.json(result);
}
