import type { ReactNode } from "react";

export function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-9 scroll-mt-24" id={`section-${number}`}>
      <h2 className="flex items-center gap-3 text-xl font-black text-slate-900">
        <span className="brand-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">
          {number}
        </span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 pl-11 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-0.5 text-blue-500">●</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
