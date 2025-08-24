"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BreakingNews() {
  const headlines = [
    "Global markets rise as inflation fears ease",
    "US Federal Reserve signals no more rate hikes this year",
    "Oil prices surge after OPEC announces production cuts",
    "China reports stronger-than-expected GDP growth",
    "UK unemployment hits lowest rate in 20 years",
  ];

  const summaries = [
    {
      title: "Global markets rise as inflation fears ease",
      summary:
        "Investors responded positively today as inflation data showed signs of cooling across major economies, reducing recession worries.",
    },
    {
      title: "US Federal Reserve signals no more rate hikes this year",
      summary:
        "The Fed indicated its tightening cycle is over, sparking optimism in equity markets and boosting tech stocks.",
    },
    {
      title: "Oil prices surge after OPEC announces production cuts",
      summary:
        "OPEC’s decision to cut oil production pushed crude prices higher, raising concerns over global energy costs.",
    },
    {
      title: "China reports stronger-than-expected GDP growth",
      summary:
        "China’s economy expanded faster than forecasts, driven by strong exports and consumer spending recovery.",
    },
    {
      title: "UK unemployment hits lowest rate in 20 years",
      summary:
        "The latest labour report revealed record-low unemployment, highlighting resilience in the UK job market despite global challenges.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 text-white p-8">
          <header className="bg-gradient-to-r from-blue-900 to-purple-700 text-white shadow-md">
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
      {/* Carousel */}
      <section className="flex flex-col items-center mb-10">
        <div className="relative w-full max-w-3xl h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="bg-white/20 rounded-lg px-6 py-4 text-xl font-semibold shadow-lg">
                {headlines[current]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex space-x-2 mt-4">
          {headlines.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* News Summaries */}
      <section className="space-y-6">
        {summaries.map((news, index) => (
          <div
            key={index}
            className="bg-white/10 p-6 rounded-lg shadow-lg hover:bg-white/20 transition"
          >
            <h2 className="text-2xl font-bold mb-2">{news.title}</h2>
            <p className="text-gray-200">{news.summary}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
