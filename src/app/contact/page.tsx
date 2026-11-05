"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BatchSchedule from "@/components/BatchSchedule";
import AuroraBackground from "@/components/AuroraBackground";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { SITE_INFO } from "@/lib/site-info";
import { MEDIA } from "@/lib/media";

const info = [
  { icon: "📞", label: "Customer Care", value: SITE_INFO.phone, href: `tel:${SITE_INFO.phoneHref}` },
  { icon: "📧", label: "Email us", value: SITE_INFO.email, href: `mailto:${SITE_INFO.email}` },
  { icon: "🕘", label: "Working Hours", value: SITE_INFO.workingHours, href: undefined },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden">
        <AuroraBackground dense />
        <div className="section-shell relative py-16 text-center lg:py-20">
          <span className="pill animate-fadeup border border-indigo-100 bg-white/80 text-indigo-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" /> Contact us
          </span>
          <h1 className="mt-5 animate-fadeup text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let&apos;s talk about your <span className="text-gradient">goals</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl animate-fadeup text-base leading-relaxed text-slate-600 [animation-delay:120ms]">
            Book a free demo, ask about courses, or get a personalized learning roadmap from our team. We usually reply within a few hours.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 animate-fadeup [animation-delay:220ms]">
            <Link href="/courses" className="btn btn-outline">Browse courses</Link>
            <a href={SITE_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary shine">💬 Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info column */}
          <div className="space-y-4 lg:col-span-2">
            <Reveal direction="left">
              <a
                href={SITE_INFO.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group surface block p-5 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-xl">📍</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Visit us</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{SITE_INFO.name}</p>
                    <address className="mt-1 text-sm not-italic leading-relaxed text-slate-600">
                      {SITE_INFO.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                    </address>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition-transform group-hover:translate-x-1">Get directions →</span>
                  </div>
                </div>
              </a>
            </Reveal>
            {info.map((i, idx) => (
              <Reveal key={i.label} direction="left" delay={idx * 90}>
                <SpotlightCard className="rounded-2xl">
                  <div className="surface flex items-center gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-xl">{i.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{i.label}</p>
                      {i.href ? (
                        <a href={i.href} className="block truncate text-sm font-bold text-slate-900 hover:text-indigo-600">{i.value}</a>
                      ) : (
                        <p className="text-sm font-bold text-slate-900">{i.value}</p>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
            <Reveal direction="left" delay={280}>
              <div className="relative h-52 overflow-hidden rounded-2xl border border-white/60 shadow-lg">
                <Image src={MEDIA.campus} alt="Chardho Aspire campus lab" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <p className="absolute bottom-4 left-5 text-sm font-black text-white">Our Hindupur campus 🏫</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="right" className="lg:col-span-3">
            <div className="surface relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl" />
              <div className="relative">
                <h2 className="text-xl font-black text-slate-900">Send us a message</h2>
                <p className="mt-1 text-sm text-slate-500">Fill in the form and our admissions team will get back to you.</p>

                {status === "done" ? (
                  <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center animate-popin">
                    <div className="text-4xl">🎉</div>
                    <h3 className="mt-3 text-lg font-black text-emerald-800">Message received!</h3>
                    <p className="mt-1 text-sm text-emerald-700">Thanks for reaching out. We&apos;ll be in touch shortly.</p>
                    <button onClick={() => setStatus("idle")} className="btn btn-outline mt-5">Send another message</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-600">Your name *</span>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={field} />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-slate-600">Email address *</span>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={field} />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-slate-600">Subject</span>
                      <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Course enquiry, demo class, placements..." className={field} />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-slate-600">Message *</span>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you'd like to learn..." className={`${field} resize-none`} />
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      <button disabled={status === "loading"} className="btn btn-primary shine disabled:opacity-60">
                        {status === "loading" ? "Sending…" : "Send message ↗"}
                      </button>
                      {status === "error" && <span className="text-sm font-semibold text-rose-600">Something went wrong. Please try again.</span>}
                      <span className="text-xs text-slate-400">🔒 Your details stay private.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Flexible Learning" title="Batches that fit your schedule" subtitle="Not sure which timing works? Just tell us in the form above — we'll help you pick." />
          <div className="mt-12"><BatchSchedule /></div>
        </div>
      </section>
    </div>
  );
}
