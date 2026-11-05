"use client";

import { useState } from "react";
import Image from "next/image";
import { LogoMark } from "./BrandLogo";
import QrPattern from "./QrPattern";

export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  course: string;
  batch: string;
  photo: string;
  issued: string;
  validThru: string;
  bloodGroup: string;
};

export default function StudentIDCard({ student }: { student: StudentProfile }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div className="id-card-scene mx-auto w-full max-w-sm">
        <div
          className={`id-card-flip aspect-[16/10] w-full cursor-pointer ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          aria-label="Flip student ID card"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
          }}
        >
          {/* FRONT */}
          <div className="id-card-face absolute inset-0 overflow-hidden rounded-2xl shadow-2xl shadow-blue-900/30">
            <div className="brand-gradient relative h-full w-full p-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-8 left-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LogoMark size={28} className="rounded-md" />
                  <div className="leading-tight">
                    <p className="text-[11px] font-black tracking-wide">CHARDHO ASPIRE</p>
                    <p className="text-[9px] font-medium text-blue-100">STUDENT ACCESS CARD</p>
                  </div>
                </div>
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold backdrop-blur">
                  VERIFIED ✓
                </span>
              </div>

              <div className="relative mt-4 flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-white/70 bg-white/20 shadow-lg">
                  <Image
                    src={student.photo}
                    alt={student.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-black">{student.name}</p>
                  <p className="truncate text-xs text-blue-100">{student.course}</p>
                  <p className="mt-1 text-[11px] font-semibold tracking-wide text-blue-50">
                    ID: {student.id}
                  </p>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-2 text-[10px]">
                <div className="rounded-lg bg-white/10 px-2 py-1.5 backdrop-blur">
                  <p className="text-blue-100">Batch</p>
                  <p className="font-bold">{student.batch}</p>
                </div>
                <div className="rounded-lg bg-white/10 px-2 py-1.5 backdrop-blur">
                  <p className="text-blue-100">Valid Thru</p>
                  <p className="font-bold">{student.validThru}</p>
                </div>
                <div className="rounded-lg bg-white/10 px-2 py-1.5 backdrop-blur">
                  <p className="text-blue-100">Blood Grp</p>
                  <p className="font-bold">{student.bloodGroup}</p>
                </div>
              </div>

              <p className="absolute bottom-3 right-4 text-[9px] font-medium text-blue-100/80">
                Tap to flip ⟳
              </p>
            </div>
          </div>

          {/* BACK */}
          <div className="id-card-face id-card-back absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-2xl shadow-blue-900/30">
            <div className="flex h-full flex-col p-5">
              <div className="h-6 w-full rounded bg-slate-800" />
              <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
                This card certifies that the holder is a registered student at Chardho Aspire
                Institute. If found, please return to the nearest campus or contact support.
                Misuse of this access card is a violation of institute policy.
              </p>

              <div className="mt-4 flex flex-1 items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Scan to verify
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">chardhoaspire.com/verify</p>
                  <p className="text-[10px] text-slate-500">Issued: {student.issued}</p>
                  <p className="text-[10px] text-slate-500">{student.email}</p>
                </div>
                <QrPattern seed={student.id} size={84} />
              </div>

              <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span
                      key={i}
                      className="bg-slate-900"
                      style={{ width: (i % 3) + 1, height: 22 }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-slate-400">{student.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-slate-400">
        Tap the card to flip and reveal the verification code
      </p>
    </div>
  );
}
