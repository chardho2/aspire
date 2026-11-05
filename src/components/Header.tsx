"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import Magnetic from "./Magnetic";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/categories", label: "Categories" },
  { href: "/placements", label: "Placements" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/design", label: "UI Kit" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setLoggedIn(Boolean(data?.loggedIn));
        setStudentName(data?.name ?? "");
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const accountHref = loggedIn ? "/dashboard" : "/login";
  const accountLabel = loggedIn ? `👋 ${studentName.split(" ")[0] || "Dashboard"}` : "Student Login";

  return (
    <>
      {/* Announcement ribbon */}
      <div className="relative z-[55] overflow-hidden bg-[#0b1128] text-white">
        <div className="section-shell flex h-9 items-center justify-center gap-2 text-[11px] font-semibold tracking-wide sm:text-xs">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 animate-pulse-glow" />
          <span className="truncate">New batches starting this month — online &amp; offline at Hindupur</span>
          <Link href="/contact" className="hidden shrink-0 text-cyan-300 underline-offset-2 hover:underline sm:inline">
            Book a free demo →
          </Link>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-20 aurora-gradient [mask-image:linear-gradient(90deg,transparent,#000,transparent)]" />
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-[0_10px_40px_-18px_rgba(30,41,99,.5)]" : "bg-white/70 backdrop-blur-md"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <Link href="/" className="group shrink-0" aria-label="Chardho Aspire Institute home">
            <span className="transition-transform duration-500 group-hover:scale-[1.04] inline-flex">
              <BrandLogo size={42} />
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-indigo-700" : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full brand-gradient transition-all duration-300 ${active ? "w-5 opacity-100" : "w-0 opacity-0"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href={accountHref} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700">
              {accountLabel}
            </Link>
            <Magnetic>
              <Link href="/courses" className="btn btn-primary shine !rounded-xl !px-5 !py-2.5 !text-sm">
                Enroll Now <span aria-hidden="true">↗</span>
              </Link>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="flex flex-col gap-[5px]">
              <span className={`block h-[2px] w-5 rounded bg-slate-800 transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 rounded bg-slate-800 transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 rounded bg-slate-800 transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[min(20rem,88vw)] overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <BrandLogo size={36} />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg">✕</button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: open ? `${i * 45 + 80}ms` : "0ms" }}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              } ${
                pathname === item.href ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label} <span className="float-right text-slate-300">→</span>
            </Link>
          ))}
          <Link href={accountHref} className="mt-3 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700">
            {accountLabel}
          </Link>
          <Link href="/courses" className="mt-2 btn btn-primary w-full">Enroll Now ↗</Link>
        </nav>
        <div className="mx-4 mt-4 rounded-2xl brand-gradient-soft p-4 text-xs text-slate-600">
          📍 Hindupur, Andhra Pradesh<br />📞 +91 9492620142
        </div>
      </div>
    </>
  );
}
