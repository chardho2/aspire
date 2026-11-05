"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="mt-5"
    >
      <div className="flex gap-2 rounded-xl border border-white/15 bg-white/5 p-1.5 backdrop-blur">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-500 outline-none"
        />
        <button className="brand-gradient shrink-0 rounded-lg px-4 py-2 text-xs font-bold text-white transition hover:scale-105">
          {done ? "Subscribed ✓" : "Subscribe"}
        </button>
      </div>
      <p className={`mt-2 text-xs transition-all ${done ? "text-cyan-300" : "text-slate-500"}`}>
        {done ? "You're on the list — watch your inbox! 🎉" : "Monthly course drops, free workshops & placement news."}
      </p>
    </form>
  );
}
