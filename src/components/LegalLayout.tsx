import type { ReactNode } from "react";
import Link from "next/link";
import PageHero from "./PageHero";
import Reveal from "./Reveal";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export default function LegalLayout({
  icon,
  title,
  updated,
  intro,
  children,
}: {
  icon: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <PageHero
        tone="dark"
        eyebrow={`Legal · ${icon}`}
        title={title}
        subtitle={intro}
        crumbs={[{ label: title }]}
        compact
      >
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-300">Last updated: {updated}</p>
      </PageHero>

      <div className="section-shell grid gap-8 py-12 lg:grid-cols-[16rem_1fr]">
        <aside>
          <Reveal direction="left">
            <div className="surface p-5 lg:sticky lg:top-28">
              <h3 className="text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Legal</h3>
              <ul className="mt-3 space-y-1.5">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl brand-gradient-soft p-4">
                <p className="text-xs text-slate-500">Have questions about our policies?</p>
                <Link href="/contact" className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-indigo-700 hover:gap-2">
                  Contact support <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </aside>

        <Reveal direction="right">
          <article className="surface max-w-none p-6 sm:p-10">{children}</article>
        </Reveal>
      </div>
    </div>
  );
}
