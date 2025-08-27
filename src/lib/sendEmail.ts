import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_PASS, // Gmail app password
  },
});

/**
 * Send a summarized news digest email (top 5 only)
 */
export async function sendEmail(
  to: string,
  summaries: { title: string; summary: string; url: string }[]
) {
  // Take only the top 5
  const topFive = summaries.slice(0, 5);

  const html = `
  <div style="background: linear-gradient(135deg, #1d67ddff, #531bd6ff); padding: 30px; font-family: Arial, sans-serif; color: #fff; min-height: 100vh;">
    <h2 style="text-align: center; margin-bottom: 25px;">📰 Daily News Digest</h2>
    ${topFive
      .map(
        (s) => `
        <div style="background: #fff; color: #333; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <h3 style="margin-top: 0; font-size: 18px; color: #1f2937;">${s.title}</h3>
          <p style="font-size: 14px; line-height: 1.5; margin: 10px 0;">${s.summary}</p>
          <a href="${s.url}" style="display: inline-block; margin-top: 10px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #fff; text-decoration: none; padding: 8px 14px; border-radius: 8px; font-size: 14px;">Read more</a>
        </div>
      `
      )
      .join("")}
    <p style="text-align: center; font-size: 12px; color: #e5e7eb; margin-top: 30px;">
      You are receiving this email because you subscribed to TurboTurtle Daily News.
    </p>
  </div>
  `;

  return transporter.sendMail({
    from: `"TurboTurtle" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your Daily News Summary",
    html,
  });
}

/**
 * Send a simple test email
 */
export async function sendTestEmail(to: string) {
  return transporter.sendMail({
    from: `"Daily News Bot" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Test Email",
    html: `<div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; font-family: Arial, sans-serif; color: #fff; border-radius: 12px; text-align: center;">
             <h2>Hello ${to} 👋</h2>
             <p>This is a styled test email from TurboTurtle.</p>
           </div>`,
  });
}
