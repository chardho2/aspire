import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import ParallaxImage from "@/components/ParallaxImage";
import CountUp from "@/components/CountUp";
import BatchSchedule from "@/components/BatchSchedule";
import LearningModes from "@/components/LearningModes";
import { getInstructors } from "@/lib/queries";
import { formatCount } from "@/lib/format";
import { SITE_INFO } from "@/lib/site-info";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = {
  title: "About Us & Trainers",
  description: "Learn about Chardho Aspire Institute — our mission, values and the industry experts who mentor our students.",
};

export const dynamic = "force-dynamic";

const values = [
  { icon: "🎯", title: "Outcome-Driven", desc: "Every course is designed to make you job-ready, not just certified." },
  { icon: "💡", title: "Learn by Doing", desc: "Real projects and hands-on labs from day one." },
  { icon: "🤝", title: "Learner First", desc: "Mentorship, community and support until you succeed." },
  { icon: "🚀", title: "Future Ready", desc: "Curriculum updated for the AI-first world of 2026." },
];

export default async function AboutPage() {
  const instructors = await getInstructors();

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="About Us"
        title={<>Empowering the next generation of <span className="text-gradient">tech talent</span></>}
        subtitle="Chardho Aspire Institute is an AI-powered learning platform on a mission to make world-class tech education accessible, practical and career-changing for everyone."
        crumbs={[{ label: "About" }]}
        image={MEDIA.hero}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/courses" className="btn btn-primary shine">Explore courses ↗</Link>
          <Link href="/contact" className="btn btn-outline">📅 Book a free demo</Link>
        </div>
      </PageHero>

      {/* Story */}
      <section className="section-shell py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-indigo-300/30 to-cyan-300/30 blur-2xl" />
              <ParallaxImage src={MEDIA.mentor} alt="A mentor guiding students at Chardho Aspire Institute" className="relative h-80 rounded-[2rem] border border-white/60 shadow-2xl sm:h-[26rem]" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute -bottom-5 -right-3 hidden animate-float rounded-2xl glass p-4 shadow-xl sm:block">
                <p className="text-xs font-black text-slate-900">✨ Where ambition meets mentorship</p>
                <p className="text-[10px] text-slate-500">Live classes · Real mentors · Real outcomes</p>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <SectionHeading align="left" eyebrow="Our Story" title={<>Built in Hindupur. <span className="text-gradient">Built for the world.</span></>} />
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              We started with a simple belief: talent is everywhere, but opportunity isn&apos;t. So we built an institute that combines live expert teaching, hands-on projects, an AI tutor and a dedicated placement cell — all in one place.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Today our learners join from across India, attending online or at our campus in {SITE_INFO.addressLines[2].replace(",", "")} — and leave with portfolios, certificates and offers.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ v: 50000, s: "+", l: "Learners" }, { v: 120, s: "+", l: "Courses" }, { v: 94, s: "%", l: "Placed" }].map((x) => (
                <div key={x.l} className="surface p-4 text-center">
                  <p className="text-2xl font-black text-gradient"><CountUp end={x.v} suffix={x.s} /></p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">{x.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="What we believe" title={<>Values that <span className="text-gradient">shape every class</span></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="h-full">
                <SpotlightCard className="h-full rounded-3xl">
                  <div className="surface h-full p-6 transition-transform duration-500 hover:-translate-y-1.5">
                    <div className="text-3xl">{v.icon}</div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section-shell py-20">
        <SectionHeading eyebrow="Our Trainers" title={<>Learn from the <span className="text-gradient">best in the industry</span></>} subtitle="Working engineers, designers and researchers who teach what they actually do." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 90} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="surface h-full p-6 transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-3xl">{t.avatar}</span>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs font-semibold leading-snug text-indigo-600">{t.title}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{t.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.expertise.map((e) => (
                      <span key={e} className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">{e}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                    <span className="text-amber-500">⭐ {Number(t.rating).toFixed(1)}</span>
                    <span>👥 {formatCount(t.students)} learners</span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Learning modes */}
      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading eyebrow="Learn Your Way" title={<>Online &amp; offline — <span className="text-gradient">you choose</span></>} subtitle="Every course is available both virtually and in-person at our Hindupur campus." />
          <div className="mt-12"><LearningModes /></div>
        </div>
      </section>

      {/* Batches */}
      <section className="section-shell py-16">
        <SectionHeading eyebrow="Flexible Learning" title="Batches for every schedule" subtitle="Morning, evening and weekend options for students and working professionals." />
        <div className="mt-12"><BatchSchedule /></div>
      </section>

      {/* CTA */}
      <section className="section-shell pb-4">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] brand-gradient px-8 py-14 text-center text-white shadow-2xl shadow-indigo-500/30">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-cyan-300/25 blur-3xl animate-blob [animation-delay:3s]" />
            <h2 className="relative text-3xl font-black sm:text-4xl">Come see the campus for yourself</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/85">Book a free counselling session and tour our labs in Hindupur, or join us online from anywhere.</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn bg-white !text-indigo-700 shine">Book a free demo ↗</Link>
              <a href={SITE_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">💬 WhatsApp us</a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
