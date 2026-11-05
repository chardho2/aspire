"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/BrandLogo";
import AuroraBackground from "@/components/AuroraBackground";
import Reveal from "@/components/Reveal";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [studentCode, setStudentCode] = useState("");

  function goToFaceAuth(e?: React.FormEvent) {
    e?.preventDefault();
    if (!studentCode.trim()) return;
    const params = new URLSearchParams({ code: studentCode.trim().toUpperCase(), redirect: redirectTo });
    router.push(`/login/face?${params.toString()}`);
  }

  return (
    <Reveal className="mx-auto max-w-md">
      <div className="text-center">
        <LogoMark size={60} className="mx-auto rounded-2xl shadow-xl shadow-indigo-500/30 animate-float-small" />
        <h1 className="mt-5 text-3xl font-black text-slate-900">Student Sign In</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Sign in securely with Face Authentication using your device camera.
        </p>
      </div>

      <form onSubmit={goToFaceAuth} className="surface mt-8 p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-slate-700">Student ID</span>
          <input
            required
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            placeholder="e.g. CAI-2026-04821"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase tracking-wide outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <button
          type="submit"
          disabled={!studentCode.trim()}
          className="btn btn-primary shine mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          🧑‍💻 Continue with Face Authentication
        </button>

        <button
          type="button"
          onClick={() => setStudentCode("CAI-2026-04821")}
          className="mt-3 w-full rounded-xl border border-dashed border-slate-200 py-2.5 text-xs font-bold text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600"
        >
          Use demo Student ID (CAI-2026-04821)
        </button>
      </form>

      <div className="mt-5 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-cyan-50 p-5 text-center">
        <p className="text-sm font-bold text-slate-800">🔒 How Face Authentication works</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Enter your Student ID, then look at your camera. We scan and match your face against your
          enrolled Face ID to grant secure access to your dashboard and digital ID card — no password needed.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        New here? <Link href="/contact" className="font-bold text-indigo-600 hover:underline">Talk to admissions</Link> to get enrolled.
      </p>
    </Reveal>
  );
}

function LoginFallback() {
  return (
    <div className="mx-auto max-w-md animate-pulse">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-slate-200" />
      <div className="mx-auto mt-4 h-6 w-48 rounded bg-slate-200" />
      <div className="mx-auto mt-2 h-4 w-64 rounded bg-slate-200" />
      <div className="mt-8 h-64 rounded-2xl bg-slate-100" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackground dense />
      <div className="section-shell relative py-16 sm:py-20">
        <Suspense fallback={<LoginFallback />}><LoginForm /></Suspense>
      </div>
    </div>
  );
}
