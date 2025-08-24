"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("subscribers").insert([{ email }]);

    if (error) {
      setMessage("❌ Error: " + error.message);
    } else {
      setMessage("✅ Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 text-white p-8">
        <header className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-400 text-white shadow-md">
  <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-3"> 
  <div className="flex items-center space-x-3">
  <Link href="/" className="flex items-center space-x-3">
    <img src="/logo.jpg" alt="TurboTurtle Logo" className="w-10 h-10 rounded-full" />
    <span className="text-2xl font-bold">TurboTurtle</span>
  </Link>
</div>
</div>
    <nav className="space-x-6 text-lg font-semibold">
      <a href="/breaking-news" className="hover:text-yellow-400 transition">Breaking News</a>
      <a href="/personalise" className="hover:text-yellow-400 transition">Personalise</a>
      <a href="/analysis" className="hover:text-yellow-400 transition">Analysis</a>
      <a href="/socials" className="hover:text-yellow-400 transition">Socials</a>
      <a href="/subscribe" className="hover:text-yellow-400 transition">Subscribe</a>
      <a href="/about" className="hover:text-yellow-400 transition">About</a>
    </nav>
  </div>
</header>
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <section className="bg-black/30 rounded-xl p-10 text-center shadow-lg w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">Subscribe to TurboTurtle</h1>
          <p className="mb-6">
            Get the latest updates, breaking news, and exclusive insights straight to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg text-black w-full sm:w-96"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="mt-4">{message}</p>}
        </section>
      </div>
    </main>
  );
}
