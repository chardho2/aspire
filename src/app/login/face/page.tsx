"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FaceScanner from "@/components/FaceScanner";
import AuroraBackground from "@/components/AuroraBackground";

function FaceLoginContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  if (!code) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-semibold text-slate-600">Missing Student ID.</p>
        <Link href="/login" className="mt-3 inline-block text-sm font-bold text-blue-600 hover:underline">
          ← Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          🧑‍💻 Face Authentication
        </span>
        <h1 className="mt-3 text-2xl font-black text-slate-900">Look at your camera</h1>
        <p className="mt-1 text-sm text-slate-500">
          Verifying access for <span className="font-bold text-slate-800">{code}</span>
        </p>
      </div>

      <div className="mt-8">
        <FaceScanner studentCode={code} redirectTo={redirectTo} />
      </div>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-blue-600">
          ← Use a different Student ID
        </Link>
      </div>
    </div>
  );
}

function FaceLoginFallback() {
  return (
    <div className="mx-auto max-w-md animate-pulse text-center">
      <div className="mx-auto h-6 w-40 rounded-full bg-slate-200" />
      <div className="mx-auto mt-3 h-7 w-56 rounded bg-slate-200" />
      <div className="mx-auto mt-8 aspect-square w-full max-w-xs rounded-3xl bg-slate-200" />
    </div>
  );
}

export default function FaceLoginPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackground dense />
      <div className="section-shell relative py-16 sm:py-20">
        <Suspense fallback={<FaceLoginFallback />}>
          <FaceLoginContent />
        </Suspense>
      </div>
    </div>
  );
}
