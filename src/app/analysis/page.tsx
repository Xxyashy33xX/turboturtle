"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Analysis() {
  const [step, setStep] = useState(1); // 1 = keyword input, 2 = login, 3 = dashboard
  const [newKeyword, setNewKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // --- Check if user already logged in on load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        await fetchPreferences(data.user.id);
        setStep(3); // skip login if already signed in
      }
    };
    checkSession();
  }, []);

  // --- Fetch prefs from DB
  const fetchPreferences = async (uid: string) => {
    const { data, error } = await supabase
      .from("analysis_preferences")
      .select("keywords, notifications_enabled")
      .eq("user_id", uid)
      .single();

    if (!error && data) {
      setKeywords(data.keywords || []);
      setNotificationsEnabled(data.notifications_enabled || false);
    }
  };

  // --- Save prefs
  const savePreferences = async (updatedKeywords?: string[]) => {
    if (!userId) return;

    const { error } = await supabase.from("analysis_preferences").upsert(
      [
        {
          user_id: userId,
          keywords: updatedKeywords ?? keywords,
          notifications_enabled: notificationsEnabled,
        },
      ],
      { onConflict: "user_id" }
    );

    if (error) {
      setMessage("❌ Error saving preferences: " + error.message);
    } else {
      setMessage("✅ Preferences saved!");
    }
  };

  // --- Keyword handling
  const addKeyword = async () => {
    if (newKeyword && keywords.length < 5) {
      const updated = [...keywords, newKeyword];
      setKeywords(updated);
      setNewKeyword("");
      await savePreferences(updated);
    }
  };

  const removeKeyword = async (keyword: string) => {
    const updated = keywords.filter((k) => k !== keyword);
    setKeywords(updated);
    await savePreferences(updated);
  };

  // --- Notifications
  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    let permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      new Notification("✅ Notifications enabled!");
      await savePreferences();
    }
  };

  // --- Auth: Sign Up
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("❌ Sign-up failed: " + error.message);
    } else {
      setUserId(data.user?.id ?? null);
      if (data.user) await fetchPreferences(data.user.id);
      setStep(3);
    }
  };

  // --- Auth: Sign In
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("❌ Login failed: " + error.message);
    } else {
      setUserId(data.user?.id ?? null);
      if (data.user) await fetchPreferences(data.user.id);
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 text-white p-8">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="TurboTurtle Logo" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold">TurboTurtle</span>
          </Link>
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

      <h1 className="text-4xl font-bold mb-6">Analysis – Keyword Alerts</h1>

      {/* Step 1: First keyword entry */}
      {step === 1 && (
        <div className="bg-white/10 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Enter your first keyword</h2>
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="e.g. Bitcoin"
            className="w-full p-3 rounded-lg mb-4 text-black"
          />
          <button
            onClick={() => {
              if (!newKeyword) {
                alert("❌ Please enter a keyword first");
                return;
              }
              setKeywords([newKeyword]);
              setNewKeyword("");
              if (userId) {
                setStep(3); // already logged in → dashboard
              } else {
                setStep(2); // not logged in → show login form
              }
            }}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500"
          >
            Submit
          </button>
        </div>
      )}

      {/* Step 2: Login / Sign up */}
      {step === 2 && (
        <div className="max-w-md space-y-4">
          <h2 className="text-xl font-bold">Log in or Sign up</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg text-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg text-black"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password (for sign-up)"
            className="w-full p-3 rounded-lg text-black"
          />

          <div className="flex space-x-2">
            <button
              onClick={handleSignIn}
              className="flex-1 bg-blue-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-500"
            >
              Log In
            </button>
            <button
              onClick={handleSignUp}
              className="flex-1 bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Dashboard */}
      {step === 3 && (
        <div>
          <div className="flex space-x-2 mb-6">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add another keyword"
              className="flex-1 p-3 rounded-lg text-black"
            />
            <button
              onClick={addKeyword}
              disabled={keywords.length >= 5}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 disabled:opacity-50"
            >
              Add
            </button>
          </div>

          <button
            onClick={enableNotifications}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold mb-6 hover:bg-green-500"
          >
            Enable Notifications
          </button>

          <div className="space-y-6">
            {keywords.map((keyword, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{keyword}</h2>
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {message && <p className="mt-6">{message}</p>}
    </main>
  );
}
