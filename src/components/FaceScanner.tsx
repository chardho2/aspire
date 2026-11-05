"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Stage =
  | "requesting"
  | "denied"
  | "live"
  | "capturing"
  | "verifying"
  | "success"
  | "error";

export default function FaceScanner({
  studentCode,
  redirectTo,
}: {
  studentCode: string;
  redirectTo: string;
}) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stage, setStage] = useState<Stage>("requesting");
  const [countdown, setCountdown] = useState(3);
  const [errorMsg, setErrorMsg] = useState("");
  const [studentName, setStudentName] = useState("");

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 480 }, height: { ideal: 480 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCountdown(3);
        setStage("live");
      } catch {
        if (!cancelled) setStage("denied");
      }
    }

    start();
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [stopCamera]);

  const verify = useCallback(
    async (image: string | null, method: "face" | "id-only") => {
      setStage("verifying");
      try {
        const res = await fetch("/api/auth/face-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentCode, image, method }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setErrorMsg(data.error ?? "Verification failed. Please try again.");
          setStage("error");
          return;
        }
        setStudentName(data.student?.name ?? "");
        stopCamera();
        setStage("success");
        setTimeout(() => router.push(redirectTo), 1400);
      } catch {
        setErrorMsg("Network error. Please try again.");
        setStage("error");
      }
    },
    [studentCode, stopCamera, router, redirectTo],
  );

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    verify(dataUrl, "face");
  }, [verify]);

  // Auto countdown once the camera is live.
  useEffect(() => {
    if (stage !== "live") return;
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Transition to "capturing" once the countdown reaches zero (deferred via timer).
  useEffect(() => {
    if (stage !== "live" || countdown !== 0) return;
    const t = setTimeout(() => setStage("capturing"), 0);
    return () => clearTimeout(t);
  }, [countdown, stage]);

  // Once capturing, take the photo shortly after.
  useEffect(() => {
    if (stage !== "capturing") return;
    const t = setTimeout(capture, 250);
    return () => clearTimeout(t);
  }, [stage, capture]);

  function retry() {
    setErrorMsg("");
    setStage("requesting");
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        setCountdown(3);
        setStage("live");
      } catch {
        setStage("denied");
      }
    })();
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
        <video
          ref={videoRef}
          muted
          playsInline
          className={`h-full w-full scale-x-[-1] object-cover transition-opacity duration-300 ${
            stage === "live" || stage === "capturing" ? "opacity-100" : "opacity-0"
          }`}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Overlay states */}
        {stage === "requesting" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <p className="text-sm font-medium">Requesting camera access…</p>
          </div>
        )}

        {stage === "denied" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
            <span className="text-4xl">🚫</span>
            <p className="text-sm font-semibold">Camera access denied</p>
            <p className="text-xs text-slate-300">
              Enable camera permissions in your browser, or continue with Student ID only.
            </p>
            <button
              onClick={retry}
              className="mt-1 rounded-lg bg-white/15 px-4 py-2 text-xs font-bold text-white hover:bg-white/25"
            >
              Try Again
            </button>
          </div>
        )}

        {(stage === "live" || stage === "capturing") && (
          <>
            <div className="pointer-events-none absolute inset-6 rounded-[40%] border-2 border-white/70 animate-scanpulse" />
            <div className="pointer-events-none absolute inset-x-10 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scanline" />
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {stage === "capturing" ? "Capturing…" : `Hold still — ${countdown || "📸"}`}
              </span>
            </div>
          </>
        )}

        {stage === "verifying" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-400/30 border-t-blue-400" />
            <p className="text-sm font-semibold">Verifying your identity…</p>
            <p className="text-xs text-slate-400">Matching against enrolled Face ID</p>
          </div>
        )}

        {stage === "success" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-emerald-600/95 text-white">
            <span className="animate-popin flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-emerald-600">
              ✓
            </span>
            <p className="mt-1 text-base font-black">Access Granted</p>
            <p className="text-xs text-emerald-50">Welcome back{studentName ? `, ${studentName.split(" ")[0]}` : ""}!</p>
          </div>
        )}

        {stage === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-red-600/95 px-6 text-center text-white">
            <span className="text-4xl">✕</span>
            <p className="text-sm font-bold">Verification Failed</p>
            <p className="text-xs text-red-50">{errorMsg}</p>
            <button
              onClick={retry}
              className="mt-1 rounded-lg bg-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/30"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        {stage === "denied" && (
          <button
            onClick={() => verify(null, "id-only")}
            className="brand-gradient w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01]"
          >
            Continue with Student ID only
          </button>
        )}
        {stage === "live" && (
          <button
            onClick={capture}
            className="brand-gradient w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01]"
          >
            📸 Capture Now
          </button>
        )}
        <p className="text-center text-xs text-slate-400">
          🔒 Your face data is processed securely and never shared with third parties.
        </p>
      </div>
    </div>
  );
}
