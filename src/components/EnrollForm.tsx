"use client";

import { useState } from "react";
import { formatINR } from "@/lib/format";

export default function EnrollForm({
  courseId,
  courseTitle,
  offerPrice,
}: {
  courseId: number;
  courseTitle: string;
  offerPrice: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", goal: "", mode: "online" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courseId }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-3 text-lg font-bold text-green-800">You&apos;re almost in!</h3>
        <p className="mt-1 text-sm text-green-700">
          Our admissions team will reach out shortly to confirm your{" "}
          <span className="font-semibold">{form.mode === "offline" ? "offline (campus)" : "online"}</span> seat for{" "}
          <span className="font-semibold">{courseTitle}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className="text-sm font-bold text-slate-900">Reserve your seat</p>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-slate-500">Preferred class mode</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "online", label: "💻 Online", desc: "Live from anywhere" },
            { key: "offline", label: "🏫 Offline", desc: "At our campus" },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setForm({ ...form, mode: m.key })}
              className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                form.mode === m.key
                  ? "border-blue-400 bg-blue-50 ring-2 ring-blue-100"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <span className="block text-sm font-bold text-slate-800">{m.label}</span>
              <span className="text-[11px] text-slate-500">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <input
        required
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <input
        required
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <input
        required
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <textarea
        placeholder="Your goal (optional)"
        value={form.goal}
        rows={2}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <button
        disabled={status === "loading"}
        className="brand-gradient w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : `Enroll for ${formatINR(offerPrice)}`}
      </button>
      {status === "error" && (
        <p className="text-center text-xs font-medium text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="text-center text-xs text-slate-400">🔒 No payment now · Talk to a counselor first</p>
    </form>
  );
}
