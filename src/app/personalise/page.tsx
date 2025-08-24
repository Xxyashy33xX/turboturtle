"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Personalise() {
  const categories = [
    "Markets",
    "Inflation",
    "Central Banks",
    "Trade",
    "Employment",
    "Commodities",
    "Technology & Economy",
    "Energy Transition",
  ];

  const g7Countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "France",
    "Germany",
    "Italy",
    "Japan",
  ];

  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // 🔹 Check if user is already signed in when component loads
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    checkSession();
  }, []);

  // 🔹 Sign up new user
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
      setStep(3); // move to categories
    }
  };

  // 🔹 Sign in existing user
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("❌ Login failed: " + error.message);
    } else {
      setUserId(data.user?.id ?? null);
      setStep(3); // move to categories
    }
  };

  // 🔹 Save preferences
  const savePreferences = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("❌ You must be logged in before saving preferences.");
      return;
    }

    const { error } = await supabase
      .from("preferences")
      .upsert(
        [
          {
            user_id: user.id,   // ✅ guaranteed real user ID
            categories: selectedCategories,
            countries: selectedCountries,
          },
        ],
        { onConflict: "user_id" }
      );

    if (error) {
      alert("❌ Error saving preferences: " + error.message);
    } else {
      alert("✅ Preferences saved!");
      setStep(1);
    }
  };


  // --- Category toggle
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // --- Country toggle
  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 text-white p-8">
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

      <h1 className="text-4xl font-bold mb-6">Personalise Your News</h1>

      {/* Step 1: Categories */}
      {step === 1 && (
        <div className="space-y-6">
          <p className="text-lg mb-2">Select up to <span className="font-bold">3 categories</span> you want to follow:</p>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`p-4 rounded-lg ${
                  selectedCategories.includes(cat)
                    ? "bg-yellow-400 text-black"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => selectedCategories.length > 0 && setStep(2)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Countries */}
      {step === 2 && (
        <div className="space-y-6">
          <p className="text-lg mb-2">Choose which G7 countries you want news from:</p>
          <div className="grid grid-cols-2 gap-4">
            {g7Countries.map((country) => (
              <button
                key={country}
                onClick={() => toggleCountry(country)}
                className={`p-4 rounded-lg ${
                  selectedCountries.includes(country)
                    ? "bg-yellow-400 text-black"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
          <button
          onClick={async () => {
            if (selectedCountries.length === 0) {
              alert("❌ Please pick at least one country");
              return;
            }

            // If already signed in, save now; otherwise go to email/password (Step 3)
            if (userId) {
              await savePreferences(); // make sure you have the savePreferences() function in this component
            } else {
              setStep(3);
            }
          }}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 3: Email + Password (only if not signed in) */}
      {step === 3 && (
        <div className="max-w-md space-y-4">
          <p className="text-lg">Sign up with your email and password:</p>
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
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg text-black"
          />
          <button
            onClick={async () => {
              if (password !== confirmPassword) {
                alert("❌ Passwords do not match!");
                return;
              }

              const { data, error } = await supabase.auth.signUp({ email, password });

              if (error) {
                if (error.message.includes("already registered")) {
                  const { data: loginData, error: loginError } =
                    await supabase.auth.signInWithPassword({ email, password });

                  if (loginError) {
                    alert("❌ Login failed: " + loginError.message);
                    return;
                  } else {
                    setUserId(loginData.user.id);
                    setStep(4);
                  }
                } else {
                  alert("❌ Error: " + error.message);
                }
              } else {
                setUserId(data.user?.id ?? null);
                setStep(4);
              }
            }}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-500"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 4: Save Preferences */}
      {step === 4 && (
        <div className="space-y-6">
          <p className="text-lg">Confirm and save your preferences.</p>
          <button
            onClick={async () => {
              await savePreferences();
            }}
            className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-500"
          >
            Save Preferences
          </button>

        </div>
      )}
    </main>
  );
}
