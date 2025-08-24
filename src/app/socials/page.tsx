"use client";
import Link from "next/link";

export default function Socials() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400 text-white p-8">
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
      <h1 className="text-4xl font-bold mb-8 text-center">Follow TurboTurtle on Socials!</h1>

      <div className="space-y-12">

        {/* X / Twitter */}
        <div className="flex flex-col md:flex-row items-center bg-black/30 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          {/* Image */}
          <img
             src="x-profile.png"
              alt="X Profile"
              className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6 object-cover transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold mb-2">TurboTurtle on X</h2>
            <p className="mb-2">
              Follow for fast updates, witty takes, and real-time news highlights!
            </p>
            <a
              href="https://x.com/youraccount"
              target="_blank"
              className="text-yellow-300 font-bold underline"
            >
              Visit X
            </a>
          </div>
        </div>

        {/* Instagram */}
        <div className="flex flex-col md:flex-row-reverse items-center bg-black/30 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          <img
            src="instagram-profile.png"
            alt="Instagram Profile"
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:ml-6 object-cover transform transition-transform duration-300 hover:scale-105 hover:-rotate-3"
            />
          <div>
            <h2 className="text-2xl font-bold mb-2">TurboTurtle on Instagram</h2>
            <p className="mb-2">
              See behind-the-scenes, trending news visuals, and fun stories from TurboTurtle!
            </p>
            <a
              href="https://instagram.com/youraccount"
              target="_blank"
              className="text-yellow-300 font-bold underline"
            >
              Visit Instagram
            </a>
          </div>
        </div>

        {/* TikTok */}
        <div className="flex flex-col md:flex-row items-center bg-black/30 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          <img
            src="tiktok-profile.png"
            alt="TikTok Profile"
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6 object-cover transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
            />
          <div>
            <h2 className="text-2xl font-bold mb-2">TurboTurtle on TikTok</h2>
            <p className="mb-2">
              Watch short, engaging videos about the latest headlines and news trends!
            </p>
            <a
              href="https://tiktok.com/@youraccount"
              target="_blank"
              className="text-yellow-300 font-bold underline"
            >
              Visit TikTok
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
