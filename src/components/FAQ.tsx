"use client";

import { useState } from "react";

export default function FAQ({
  items,
  className = "",
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const active = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
              active ? "border-indigo-200 shadow-lg shadow-indigo-500/5" : "border-slate-100 shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-slate-900 sm:text-base">{item.q}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  active ? "rotate-45 brand-gradient text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
