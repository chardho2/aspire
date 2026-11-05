import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import ParallaxImage from "@/components/ParallaxImage";
import { getTestimonials } from "@/lib/queries";
import { partnerSeed } from "@/db/seed-data";
import { MEDIA } from "@/lib/media";
import { SITE_INFO } from "@/lib/site-info";

export const metadata: Metadata = {
  title: "Placements & Success Stories",
  description: "94% placement rate. See how Chardho Aspire learners landed jobs at Google, Microsoft, Amazon and more.",
};

const jobs = [
  { role: "Frontend Engineer", company: "Razorpay", location: "Bangalore", type: "Full-time", ctc: "₹18–24 LPA", emoji: "⚛️" },
  { role: "ML Engineer", company: "Microsoft", location: "Hyderabad", type: "Full-time", ctc: "₹26–34 LPA", emoji: "🤖" },
  { role: "DevOps Engineer", company: "Swiggy", location: "Remote", type: "Full-time", ctc: "₹20–28 LPA", emoji: "☁️" },
  { role: "Product Designer", company: "Flipkart", location: "Bangalore", type: "Full-time", ctc: "₹16–22 LPA", emoji: "🎨" },
  { role: "Backend Developer", company: "Zomato", location: "Gurgaon", type: "Full-time", ctc: "₹18–26 LPA", emoji: "🔧" },
  { role: "Data Analyst", company: "Paytm", location: "Noida", type: "Full-time", ctc: "₹12–18 LPA", emoji: "📊" },
];

const process = [
  { icon: "📝", title: "Resume & profile", desc: "Polished resumes, GitHub and LinkedIn that recruiters actually notice." },
  { icon: "🎤", title: "Mock interviews", desc: "Technical and HR rounds with real engineers and honest feedback." },
  { icon: "🤝", title: "Partner referrals", desc: "Direct introductions to our 350+ hiring partners." },
  { icon: "🎯", title: "Campus drives", desc: "Interview days hosted at the Hindupur campus and online." },
];

export const dynamic = "force-dynamic";

export default async function PlacementsPage() {
  const testimonials = await getTestimonials();
  const stats = [
    { v: "94%", l: "Placement Rate" },
    { v: "₹12 LPA", l: "Average Package" },
    { v: "₹34 LPA", l: "Highest Package" },
    { v: "350+", l: "Hiring Partners" },
  ];

  return (
    <div className="overflow-hidden">
      <PageHero
        tone="dark"
        eyebrow="Placements"
        title={<>Careers that <span className="text-gradient-animated">take off</span> 🚀</>}
        subtitle="Our dedicated placement cell works with you until you get hired — resume building, mock interviews, referrals and more."
        crumbs={[{ label: "Placements" }]}
        image={MEDIA.success}
      >
        <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className="animate-fadeup rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur" style={{ animationDelay: `${i * 110}ms` }}>
              <div className="text-xl font-black text-white sm:text-2xl">{s.v}</div>
              <div className="mt-1 text-[11px] text-slate-300">{s.l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Image + copy */}
      <section className="section-shell py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <ParallaxImage src={MEDIA.success} alt="Chardho Aspire graduates celebrating placements" className="h-80 rounded-[2rem] border border-white/60 shadow-2xl sm:h-[26rem]" sizes="(max-width: 1024px) 100vw, 50vw" />
          </Reveal>
          <Reveal direction="right">
            <SectionHeading align="left" eyebrow="The outcome" title={<>Every batch, <span className="text-gradient">new success stories</span></>} subtitle="94% of our graduates land offers within 90 days of completing their program." />
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Placement support isn&apos;t an add-on — it&apos;s built into every course. From week one you&apos;ll be building a portfolio, and by the final module you&apos;ll be interview-ready.
            </p>
            <Link href="/contact" className="btn btn-primary mt-7 shine">Talk to our placement cell ↗</Link>
          </Reveal>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="border-y border-slate-200/70 bg-white/70 py-9">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[.22em] text-slate-400">Trusted by 350+ hiring partners</p>
        <Marquee duration={34} trackClassName="gap-12 px-6">
          {partnerSeed.map((p) => (
            <span key={p} className="whitespace-nowrap text-xl font-black text-slate-300 transition-colors hover:text-indigo-600 sm:text-2xl">{p}</span>
          ))}
        </Marquee>
      </section>

      {/* Process */}
      <section className="section-shell py-16">
        <SectionHeading eyebrow="How we do it" title={<>Support until <span className="text-gradient">you&apos;re hired</span></>} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="surface h-full p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl brand-gradient-soft text-2xl">{p.icon}</div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-indigo-600">Step 0{i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Recent openings" title={<>Roles our learners <span className="text-gradient">stepped into</span></>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j, i) => (
              <Reveal key={`${j.role}-${j.company}`} delay={(i % 3) * 90}>
                <div className="group surface flex items-center gap-4 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-indigo-200">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-2xl transition-transform group-hover:scale-110">{j.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-900">{j.role}</h3>
                    <p className="truncate text-xs text-slate-500">{j.company} · {j.location}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{j.type}</span>
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">{j.ctc}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-shell py-16">
        <SectionHeading eyebrow="In their words" title={<>Real people, <span className="text-gradient">real offers</span></>} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 90}>
              <div className="surface flex h-full flex-col p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="text-sm tracking-widest text-amber-400">{"★".repeat(t.rating)}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-cyan-50 text-xl">{t.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="truncate text-xs text-slate-500">{t.role} @ {t.company}</p>
                  </div>
                  {t.package && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">{t.package}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell pb-4">
        <Reveal>
          <div className="surface-dark relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center text-white shadow-2xl">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl animate-blob [animation-delay:3s]" />
            <h2 className="relative text-3xl font-black sm:text-4xl">Your offer letter is next</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-300">Book a free counselling call and we&apos;ll map a course-to-career plan for you.</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary shine">Book free counselling ↗</Link>
              <a href={SITE_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">💬 WhatsApp us</a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
