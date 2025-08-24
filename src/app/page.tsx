"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };
    getUser();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const categories = [
    { title: "Markets", desc: "Covers stock markets, bonds, forex, and global indices with clear fact-based updates." },
    { title: "Inflation", desc: "Tracks inflation rates, CPI, PPI, and price trends across key economies." },
    { title: "Central Banks", desc: "Summarises interest rate decisions, monetary policy, and official statements." },
    { title: "Trade", desc: "Focuses on trade balances, tariffs, and international agreements shaping global economies." },
    { title: "Employment", desc: "Highlights job growth, unemployment figures, and workforce trends." },
    { title: "Commodities", desc: "Summarises news on oil, gas, metals, and agricultural products." },
    { title: "Technology & Economy", desc: "Explains how innovations like AI, fintech, and automation shape global markets and productivity." },
    { title: "Energy Transition", desc: "Covers renewable energy, climate policy, and the shift toward sustainable global economies." },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-purple-950 text-black">
      <header className="bg-gradient-to-r from-blue-900 to-purple-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="TurboTurtle Logo" className="w-10 h-10 rounded-full" />
              <span className="text-2xl font-bold">TurboTurtle</span>
            </Link>
          </div>
          <nav className="space-x-6 text-lg font-semibold flex items-center">
            <a href="/breaking-news" className="hover:text-yellow-400 transition">Breaking News</a>
            <a href="/personalise" className="hover:text-yellow-400 transition">Personalise</a>
            <a href="/analysis" className="hover:text-yellow-400 transition">Analysis</a>
            <a href="/socials" className="hover:text-yellow-400 transition">Socials</a>
            <a href="/subscribe" className="hover:text-yellow-400 transition">Subscribe</a>
            <a href="/about" className="hover:text-yellow-400 transition">About</a>

            {/* ✅ Login / Logout Button */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-yellow-400 text-black px-4 py-1 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-300 mb-6">
          <span className="font-extrabold">
            No opinions, no noise! Just the facts that matter in economics, finance, and global markets.
          </span>
        </h1>
        <p className="text-lg text-gray-1000">
          Our website delivers short, neutral, fact-based summaries of global
          economic news so you stay informed quickly.
        </p>
      </section>

      {/* Categories Section */}
      <section className="space-y-16 px-8 max-w-5xl mx-auto">
        {/* First 3 categories */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <ul className="space-y-4 text-lg font-semibold">
              {categories.slice(0, 3).map((cat) => (
                <li key={cat.title} className="p-4 rounded-lg bg-white shadow">
                  {cat.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-600">
              Expect reliable updates on markets, inflation, and central banks —
              giving you a snapshot of global economic performance.
            </p>
          </div>
          <div>
            <img
              src="/finance-1.jpg"
              alt="Markets, Inflation, Central Banks"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Next 3 categories */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/finance-2.jpg"
              alt="Trade, Employment, Commodities"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <ul className="space-y-4 text-lg font-semibold">
              {categories.slice(3, 6).map((cat) => (
                <li key={cat.title} className="p-4 rounded-lg bg-white shadow">
                  {cat.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-600">
              Trade, employment, and commodities shape everyday life. Our
              summaries highlight shifts in global jobs, trade relations, and
              resource markets.
            </p>
          </div>
        </div>

        {/* Final 2 categories */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <ul className="space-y-4 text-lg font-semibold">
              {categories.slice(6, 8).map((cat) => (
                <li key={cat.title} className="p-4 rounded-lg bg-white shadow">
                  {cat.title}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-600">
              Technology and the energy transition are transforming global
              economies. We summarise key innovations, policies, and industry
              shifts that define the future.
            </p>
          </div>
          <div>
            <img
              src="/finance-3.jpg"
              alt="Technology & Economy, Energy Transition"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold">📧 Subscribe for Updates</h2>
          <p>Get key economic news summaries delivered to your inbox every day.</p>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-2 rounded text-black placeholder-gray-400 w-full max-w-sm"
          />
          <button className="mt-2 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">
            Subscribe
          </button>
          <div className="mt-4 space-x-4">
            <a href="#" className="underline hover:text-blue-400">Contact</a>
            <a href="#" className="underline hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="underline hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
