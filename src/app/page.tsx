import Link from "next/link";
import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import TypingText from "@/components/TypingText";
import CountUp from "@/components/CountUp";
import Tilt3D from "@/components/Tilt3D";
import BatchSchedule from "@/components/BatchSchedule";
import LearningModes from "@/components/LearningModes";
import AuroraBackground from "@/components/AuroraBackground";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import ParallaxImage from "@/components/ParallaxImage";
import GalleryShowcase from "@/components/GalleryShowcase";
import FAQ from "@/components/FAQ";
import { getFeaturedCourses, getCategories, getTestimonials } from "@/lib/queries";
import { partnerSeed } from "@/db/seed-data";
import { SITE_INFO } from "@/lib/site-info";
import { MEDIA, GALLERY } from "@/lib/media";

export const dynamic = "force-dynamic";

const stats = [
  { label: "Students Trained", value: 50000, suffix: "+", icon: "🎓" },
  { label: "Expert-Led Courses", value: 120, suffix: "+", icon: "📚" },
  { label: "Placement Rate", value: 94, suffix: "%", icon: "💼" },
  { label: "Hiring Partners", value: 350, suffix: "+", icon: "🤝" },
];

const whyUs = [
  { icon: "🤖", title: "AI-Powered Learning", desc: "AI tutor, doubt solver, quiz generator and personalized course recommendations." },
  { icon: "👨‍🏫", title: "Industry Mentors", desc: "Learn from engineers at Google, Amazon, Microsoft & top startups." },
  { icon: "💼", title: "Placement Assistance", desc: "Resume building, mock interviews and referrals until you get hired." },
  { icon: "🛠️", title: "Real Projects", desc: "Build a portfolio of production-grade projects, not just tutorials." },
  { icon: "📜", title: "Verified Certificates", desc: "Industry-recognized certificates with QR verification & LinkedIn sharing." },
  { icon: "♾️", title: "Lifetime Access", desc: "Recorded lectures, notes and community access forever." },
];

const steps = [
  { icon: "🧭", label: "01 · Explore", title: "Find your path", desc: "Tell us your goal. We'll map the right course and batch for you." },
  { icon: "🎧", label: "02 · Learn", title: "Live with mentors", desc: "Attend interactive online or campus classes with 1:1 doubt solving." },
  { icon: "⚙️", label: "03 · Build", title: "Ship real projects", desc: "Create portfolio-grade work reviewed by working engineers." },
  { icon: "🚀", label: "04 · Get hired", title: "Land the offer", desc: "Mock interviews, referrals and placement drives until you're placed." },
];

const faqs = [
  { q: "Do I need any prior coding experience?", a: "Not at all. Most of our programs start from the absolute basics and ramp up to production-level work. Our advisors help you pick a batch that matches your current level." },
  { q: "Can I attend classes online and offline?", a: "Yes — every course is available both live online and in-person at our Hindupur campus. You can even switch modes mid-program if your schedule changes." },
  { q: "What if I miss a class?", a: "Every live session is recorded and uploaded to your student dashboard, along with notes, assignments and an AI tutor you can ask questions any time." },
  { q: "Is placement support really included?", a: "Yes. Resume reviews, mock interviews, portfolio polishing, hiring-partner referrals and campus drives are included until you receive an offer." },
  { q: "Will I get a certificate?", a: "Every completed course includes a QR-verifiable industry certificate you can add directly to LinkedIn and share with employers." },
];

export default async function HomePage() {
  const [courses, categories, testimonials] = await Promise.all([
    getFeaturedCourses(),
    getCategories(),
    getTestimonials(),
  ]);
  const featured = courses.slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        <AuroraBackground dense />
        <div className="section-shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
          <div className="animate-fadeup">
            <Link href="/contact" className="pill group border border-indigo-100 bg-white/80 text-indigo-700 shadow-sm backdrop-blur transition hover:shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              🚀 New batches starting this month
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <h1 className="mt-6 text-[2.6rem] font-black leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[4rem]">
              Master the skills for
              <br />
              <TypingText words={["Web Development", "AI & Machine Learning", "Cloud & DevOps", "Data Science", "UI/UX Design"]} />
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              India&apos;s premium AI-powered institute. Learn from industry experts, build real
              projects, earn verified certificates and get placed at top companies.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: "💻", text: "Online Classes", color: "bg-blue-50 text-blue-700" },
                { icon: "🏫", text: "Offline Classes", color: "bg-violet-50 text-violet-700" },
                { icon: "📅", text: "Weekday & Weekend", color: "bg-emerald-50 text-emerald-700" },
              ].map((chip) => (
                <span key={chip.text} className={`rounded-full px-3 py-1.5 text-xs font-bold ${chip.color}`}>
                  {chip.icon} {chip.text}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/courses" className="btn btn-primary shine">Enroll Now <span aria-hidden="true">↗</span></Link>
              </Magnetic>
              <Link href="/contact" className="btn btn-outline">📅 Book Free Demo</Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2.5">
                  {["👩‍💻", "🧑‍🎓", "👨‍💼", "👩‍🔬"].map((e) => (
                    <span key={e} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-50 to-cyan-50 text-sm shadow-sm">
                      {e}
                    </span>
                  ))}
                </div>
                <span className="font-bold">50,000+ learners</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-amber-500">
                ⭐ 4.9 <span className="font-medium text-slate-500">(12k reviews)</span>
              </div>
            </div>
          </div>

          {/* Hero visual collage */}
          <div className="relative animate-fadeup [animation-delay:180ms]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/30 animate-spin-slow" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-300/40 animate-spin-slow [animation-direction:reverse] [animation-duration:16s]" />
            <div className="pointer-events-none absolute left-[8%] top-[12%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,.6)] animate-float-small" />
            <div className="pointer-events-none absolute right-[6%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_20px_4px_rgba(139,92,246,.6)] animate-float-small [animation-delay:1.5s]" />

            <Tilt3D strength={8} className="relative">
              <div className="glass overflow-hidden rounded-[2rem] p-2.5 shadow-[0_35px_80px_-25px_rgba(49,46,129,.55)]">
                <div className="relative h-[21rem] overflow-hidden rounded-[1.55rem] sm:h-[25rem]">
                  <Image
                    src={MEDIA.hero}
                    alt="Students learning together with laptops at Chardho Aspire Institute"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 480px"
                    className="object-cover animate-kenburns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                    <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl brand-gradient text-lg">🎓</span>
                      <div>
                        <p className="text-xs font-bold text-white">Live Cohort · 2026</p>
                        <p className="text-[10px] text-slate-300">Online + Hindupur campus</p>
                      </div>
                    </div>
                    <span className="hidden rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black text-indigo-700 shadow-lg sm:inline">4.9 ★ rated</span>
                  </div>
                </div>
              </div>
            </Tilt3D>

            <div className="absolute -left-4 top-10 hidden animate-float rounded-2xl glass p-3.5 shadow-xl sm:block">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="text-xs font-black text-slate-900">Verified Certificate</div>
                  <div className="text-[10px] text-slate-500">QR + LinkedIn ready</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 bottom-12 hidden animate-float rounded-2xl glass p-3.5 shadow-xl [animation-delay:1.6s] sm:block">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">💼</span>
                <div>
                  <div className="text-xs font-black text-slate-900">Placed @ Google</div>
                  <div className="text-[10px] text-slate-500">₹32 LPA package</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 left-6 hidden animate-float rounded-2xl glass p-3 shadow-xl [animation-delay:2.8s] lg:block">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm">📈</span>
                <div>
                  <div className="text-xs font-black text-slate-900">94% placed</div>
                  <div className="text-[10px] text-slate-500">within 90 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 lg:flex" aria-hidden="true">
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Scroll</span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-300 p-1">
            <span className="h-1.5 w-1 rounded-full bg-indigo-500 animate-bounce-soft" />
          </span>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="relative border-y border-slate-200/70 bg-white/70 py-8">
        <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[.22em] text-slate-400">
          Our learners work at
        </p>
        <Marquee duration={32} trackClassName="gap-14 px-7">
          {partnerSeed.map((p) => (
            <span key={p} className="cursor-default whitespace-nowrap text-xl font-black tracking-tight text-slate-300 transition-colors duration-300 hover:text-indigo-600 sm:text-2xl">
              {p}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ================= STATS ================= */}
      <section className="section-shell py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} direction="zoom">
              <div className="hover-lift surface relative overflow-hidden p-6 text-center">
                <div className="absolute inset-x-0 top-0 h-1 aurora-gradient" />
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient-soft text-2xl">{s.icon}</div>
                <div className="mt-3 text-3xl font-black text-gradient sm:text-4xl">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="section-shell py-10 lg:py-14">
        <SectionHeading
          eyebrow="Explore"
          title={<>Learn any skill, <span className="text-gradient">anytime</span></>}
          subtitle="Browse our most popular categories across development, AI, cloud, design and animation."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 80} className="h-full">
              <SpotlightCard className="h-full rounded-2xl">
                <Link
                  href={`/courses?category=${c.slug}`}
                  className="gradient-border group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {c.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">{c.name}</h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition-transform group-hover:translate-x-1">
                    {c.courseCount} courses →
                  </span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link href="/categories" className="btn btn-outline">View all categories →</Link>
        </div>
      </section>

      {/* ================= FEATURED COURSES ================= */}
      <section className="relative bg-white/60 py-20">
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-[.35]" />
        <div className="section-shell relative">
          <SectionHeading
            eyebrow="Popular Courses"
            title={<>Trending programs <span className="text-gradient">this season</span></>}
            subtitle="Job-ready bootcamps with live classes, real projects and placement support."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 110} className="h-full">
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
          <div className="mt-11 text-center">
            <Magnetic>
              <Link href="/courses" className="btn btn-primary shine">Explore all {courses.length}+ courses ↗</Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative isolate overflow-hidden py-20 text-white lg:py-24">
        <AuroraBackground tone="dark" dense />
        <div className="section-shell relative">
          <SectionHeading
            light
            eyebrow="Your journey"
            title={<>From curious to <span className="text-gradient-animated">hired</span></>}
            subtitle="A clear, mentor-guided path from your first class to your first offer letter."
          />
          <div className="relative mt-16">
            <div className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent lg:block" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 130} className="relative text-center">
                  <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl border border-white/15 bg-white/5 text-3xl shadow-lg backdrop-blur animate-float-small" style={{ animationDelay: `${i * 0.7}s` }}>
                    {s.icon}
                  </div>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[.18em] text-cyan-300">{s.label}</p>
                  <h3 className="mt-2 text-lg font-black text-white">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-14 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-slate-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            Average time to first offer: <strong className="text-white">under 90 days</strong>
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Why Chardho Aspire"
          title={<>Everything you need to <span className="text-gradient">get hired</span></>}
          subtitle="A complete ecosystem built to turn learners into professionals."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 100}>
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/60 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl brand-gradient text-2xl text-white shadow-lg shadow-indigo-500/25 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3 className="relative mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LEARNING MODES ================= */}
      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Learn Your Way"
          title={<>Online &amp; offline classes — <span className="text-gradient">you choose</span></>}
          subtitle="Attend live virtual classes from anywhere, or learn in-person at our Hindupur campus. Every course is available both ways."
        />
        <div className="mt-12"><LearningModes /></div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="relative overflow-hidden bg-white/60 py-20">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="section-shell relative">
          <SectionHeading eyebrow="Life at Aspire" title={<>Moments that <span className="text-gradient">make us</span></>} subtitle="Classrooms, collaborations and celebration — a glimpse inside the institute." />
          <div className="mt-12"><GalleryShowcase /></div>
          <div className="mt-8">
            <Marquee duration={38} trackClassName="gap-4 px-2">
              {[...GALLERY, ...GALLERY].map((g, i) => (
                <div key={`${g.src}-${i}`} className="image-zoom relative h-28 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/70 shadow-md">
                  <Image src={g.src} alt={g.caption} fill sizes="192px" className="object-cover" />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Success Stories"
          title={<>Our learners, <span className="text-gradient">now professionals</span></>}
          subtitle="Real people, real career transformations at world-class companies."
        />
        <div className="mt-12 space-y-5">
          <Marquee duration={52} trackClassName="gap-5 px-2.5">
            {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.id} t={t} />)}
          </Marquee>
          <Marquee duration={52} reverse trackClassName="gap-5 px-2.5">
            {testimonials.slice(3, 6).map((t) => <TestimonialCard key={t.id} t={t} />)}
          </Marquee>
        </div>
      </section>

      {/* ================= PLACEMENT BAND ================= */}
      <section className="section-shell py-12">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1128] shadow-2xl shadow-indigo-900/20 lg:grid-cols-2">
          <div className="relative min-h-[20rem] lg:min-h-[28rem]">
            <ParallaxImage src={MEDIA.success} alt="Chardho Aspire graduate celebrating a placement" className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1128]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 animate-fadeup rounded-2xl glass-dark px-4 py-3 shadow-xl">
              <p className="text-xs font-black text-white">✨ Every batch, new success stories</p>
              <p className="text-[11px] text-slate-300">94% placed within 90 days of completion</p>
            </div>
          </div>
          <div className="relative p-9 text-white lg:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-indigo-500/25 blur-3xl animate-blob" />
            <div className="relative">
              <span className="pill border border-white/20 bg-white/10 text-cyan-200">💼 Placement Cell</span>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">We don&apos;t stop until you&apos;re hired.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Resume building, mock interviews, portfolio reviews, hiring-partner referrals and campus drives — all included with every program.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { v: "94%", l: "Placement rate" },
                  { v: "₹12 LPA", l: "Average package" },
                  { v: "₹34 LPA", l: "Highest package" },
                  { v: "350+", l: "Hiring partners" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-indigo-400/40">
                    <div className="text-2xl font-black text-gradient-animated">{s.v}</div>
                    <div className="mt-0.5 text-xs text-slate-400">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/placements" className="btn btn-primary shine">See success stories ↗</Link>
                <Link href="/contact" className="btn btn-ghost-light">Talk to placements</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BATCH SCHEDULE ================= */}
      <section className="section-shell py-16">
        <SectionHeading
          eyebrow="Flexible Learning"
          title={<>Batches that <span className="text-gradient">fit your life</span></>}
          subtitle="Whether you're a student or a working professional, we have a batch timing for you."
        />
        <div className="mt-12"><BatchSchedule /></div>
        <Reveal className="mx-auto mt-6 max-w-2xl">
          <div className="surface p-5 text-center text-sm text-slate-500">
            Need help choosing a batch? Call us at{" "}
            <a href={`tel:${SITE_INFO.phoneHref}`} className="font-bold text-indigo-600 hover:underline">{SITE_INFO.phone}</a>{" "}
            or message us on{" "}
            <a href={SITE_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 hover:underline">WhatsApp</a>.
            We&apos;re available {SITE_INFO.workingHours}.
          </div>
        </Reveal>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHeading align="left" eyebrow="Good to know" title={<>Questions, <span className="text-gradient">answered</span></>} subtitle="Everything you might want to know before you start. Still curious? Our team is one message away." />
            <Reveal delay={150} className="mt-8">
              <Link href="/contact" className="btn btn-outline">💬 Ask us anything</Link>
            </Reveal>
          </div>
          <Reveal direction="right"><FAQ items={faqs} /></Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="section-shell pb-6">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center shadow-2xl shadow-indigo-900/30 sm:py-20">
          <AuroraBackground tone="aurora" dense />
          <div className="relative">
            <span className="pill border border-white/25 bg-white/10 text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse-glow" /> Your next chapter starts here
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
              Ready to transform your <span className="text-cyan-200">career?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Join 50,000+ learners. Book a free demo class today and get a personalized learning roadmap from our experts.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic><Link href="/courses" className="btn bg-white !text-indigo-700 shadow-xl shine">Browse Courses ↗</Link></Magnetic>
              <Link href="/contact" className="btn btn-ghost-light">📅 Book Free Demo</Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/75">
              <span>✓ No credit card needed</span><span>✓ Free career counselling</span><span>✓ Online &amp; campus batches</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TestimonialCard({ t }: { t: { id: number; rating: number; quote: string; avatar: string; name: string; role: string; company: string; package: string } }) {
  return (
    <div className="surface w-[20rem] shrink-0 p-6 transition-shadow duration-300 hover:shadow-xl sm:w-[23rem]">
      <div className="flex items-center justify-between">
        <div className="text-sm tracking-widest text-amber-400">{"★".repeat(Math.min(5, t.rating))}</div>
        <span className="text-2xl">❝</span>
      </div>
      <p className="mt-3 min-h-[5.5rem] text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-cyan-50 text-xl">{t.avatar}</span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-slate-900">{t.name}</div>
          <div className="truncate text-xs text-slate-500">{t.role} @ {t.company}</div>
        </div>
        {t.package && <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">{t.package}</span>}
      </div>
    </div>
  );
}
