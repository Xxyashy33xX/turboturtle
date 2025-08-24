import Link from "next/link";

export default function About() {
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
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <section className="bg-black/30 rounded-xl p-10 text-center shadow-lg w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">About TurboTurtle</h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            <span className="font-bold">TurboTurtle</span> is your reliable hub for 
            <span className="font-bold"> fact-based economic news.</span>  
            Our mission is simple: summarise the key points without opinion or fluff,  
            helping you stay informed in the fastest and clearest way possible.
          </p>
        </section>
      </div>
    </main>
  );
}