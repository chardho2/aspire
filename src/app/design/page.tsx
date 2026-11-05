import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import Tilt3D from "@/components/Tilt3D";
import CountUp from "@/components/CountUp";
import TypingText from "@/components/TypingText";
import FAQ from "@/components/FAQ";
import ParallaxImage from "@/components/ParallaxImage";
import { MEDIA, GALLERY } from "@/lib/media";

export const metadata: Metadata = {
  title: "Design System & Animation Kit",
  description: "The complete Aspire UI kit: colors, typography, buttons, motion primitives and the local image library.",
};

const palette = [
  { name: "Brand Blue", hex: "#2563EB", cls: "bg-blue-600" },
  { name: "Indigo", hex: "#4F46E5", cls: "bg-indigo-600" },
  { name: "Violet", hex: "#7C3AED", cls: "bg-violet-600" },
  { name: "Cyan", hex: "#06B6D4", cls: "bg-cyan-500" },
  { name: "Teal", hex: "#0D9488", cls: "bg-teal-600" },
  { name: "Ink", hex: "#0B1128", cls: "bg-[#0b1128]" },
];

const motion = [
  { label: "fade up", cls: "animate-fadeup", demo: "A" },
  { label: "float", cls: "animate-float", demo: "🎈" },
  { label: "pop in", cls: "animate-popin", demo: "✦" },
  { label: "spin slow", cls: "animate-spin-slow", demo: "◌" },
  { label: "pulse glow", cls: "animate-pulse-glow", demo: "●" },
  { label: "wiggle", cls: "animate-wiggle", demo: "↝" },
];

export default function DesignPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        tone="dark"
        eyebrow="Template · UI Kit"
        title={<>The Aspire <span className="text-gradient-animated">Design System</span></>}
        subtitle="A complete, reusable visual language — colors, type, components, motion primitives and a fully local image library. Everything below is live, not a screenshot."
        crumbs={[{ label: "Design System" }]}
        image={MEDIA.aurora}
      >
        <div className="flex flex-wrap gap-3">
          <Magnetic><Link href="/" className="btn btn-primary shine">See it on the homepage ↗</Link></Magnetic>
          <Link href="#motion" className="btn btn-ghost-light">Explore animations</Link>
        </div>
      </PageHero>

      {/* ================= PALETTE ================= */}
      <section className="section-shell py-16">
        <SectionHeading align="left" eyebrow="01 · Foundations" title="Color & type" subtitle="One coherent palette, and a type scale built for big ideas and small print." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="surface p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Palette</h3>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {palette.map((c) => (
                  <div key={c.name} className="group overflow-hidden rounded-2xl border border-slate-100">
                    <div className={`h-20 ${c.cls} transition-transform duration-500 group-hover:scale-105`} />
                    <div className="px-3 py-2">
                      <p className="text-xs font-bold text-slate-800">{c.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-12 rounded-2xl aurora-gradient shadow-inner" />
              <p className="mt-2 text-xs text-slate-400">Animated aurora gradient — used on brand surfaces and progress indicators.</p>
            </div>
          </Reveal>
          <Reveal delay={120} direction="right">
            <div className="surface p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Type scale</h3>
              <div className="mt-5 space-y-4">
                <p className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Build what&apos;s next.</p>
                <p className="text-2xl font-bold text-slate-800">Headline / 2xl</p>
                <p className="text-base font-semibold text-slate-600">Subtitle / base — clear, confident and readable.</p>
                <p className="text-sm leading-relaxed text-slate-500">
                  Body copy uses a comfortable line height and generous spacing. Emphasis is created with weight and color, never with clutter.
                </p>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Eyebrow / uppercase</p>
                <p className="text-3xl font-black text-gradient">Gradient display text</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= COMPONENTS ================= */}
      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading align="left" eyebrow="02 · Components" title="Buttons, cards & surfaces" subtitle="Hover everything. Every interaction is spring-eased and respects reduced-motion preferences." />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal>
              <div className="surface flex h-full flex-col items-start gap-3 p-7">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Buttons</h3>
                <Magnetic><Link href="/courses" className="btn btn-primary shine">Primary + magnetic ↗</Link></Magnetic>
                <Link href="/contact" className="btn btn-outline">Outline button</Link>
                <div className="w-full rounded-2xl bg-[#0b1128] p-4">
                  <Link href="/design" className="btn btn-ghost-light">On dark surfaces</Link>
                </div>
                <p className="mt-auto text-xs text-slate-400">Shimmer sweep, magnetic pull, lift on hover.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <SpotlightCard className="rounded-3xl">
                <div className="surface flex h-full min-h-[15rem] flex-col justify-end p-7">
                  <span className="pill border border-indigo-100 bg-white text-indigo-700 w-fit">Spotlight card</span>
                  <h3 className="mt-3 text-lg font-black text-slate-900">Glow follows your cursor</h3>
                  <p className="mt-1 text-sm text-slate-500">A radial gradient tracks pointer position using two CSS custom properties.</p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={200} direction="right">
              <Tilt3D strength={12}>
                <div className="relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl brand-gradient p-7 text-white shadow-2xl shadow-indigo-500/30">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl animate-pulse-glow" />
                  <span className="text-4xl animate-float">◇</span>
                  <div>
                    <h3 className="text-lg font-black">3D tilt</h3>
                    <p className="mt-1 text-sm text-white/80">Move your mouse across this card — perspective transforms react in real time.</p>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= MOTION ================= */}
      <section id="motion" className="section-shell py-16">
        <SectionHeading align="left" eyebrow="03 · Motion" title="The animation library" subtitle="CSS keyframes, scroll reveals, counters, marquees, parallax and interactive transforms — all reusable." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {motion.map((m, i) => (
            <Reveal key={m.label} delay={(i % 3) * 90}>
              <div className="surface flex min-h-[9rem] flex-col items-center justify-center gap-3 p-6">
                <span className={`text-4xl font-black text-gradient ${m.cls}`}>{m.demo}</span>
                <code className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">{m.cls}</code>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="surface p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Typewriter + counters</h3>
              <p className="mt-5 text-2xl font-black text-slate-900">I want to learn <TypingText words={["Web Development", "AI & ML", "Cloud & DevOps", "UI/UX Design"]} /></p>
              <div className="mt-7 flex flex-wrap gap-8">
                <div><p className="text-4xl font-black text-gradient"><CountUp end={50000} suffix="+" /></p><p className="text-xs text-slate-500">Students</p></div>
                <div><p className="text-4xl font-black text-gradient"><CountUp end={94} suffix="%" /></p><p className="text-xs text-slate-500">Placed</p></div>
                <div><p className="text-4xl font-black text-gradient"><CountUp end={350} suffix="+" /></p><p className="text-xs text-slate-500">Partners</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="surface overflow-hidden p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Infinite marquee (pauses on hover)</h3>
              <div className="mt-5">
                <Marquee duration={18} trackClassName="gap-3 px-1.5">
                  {["Aurora", "Reveal", "Parallax", "Tilt", "Shimmer", "Ken Burns", "Marquee", "Spotlight"].map((t) => (
                    <span key={t} className="whitespace-nowrap rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">{t}</span>
                  ))}
                </Marquee>
              </div>
              <div className="mt-3">
                <Marquee duration={22} reverse trackClassName="gap-3 px-1.5">
                  {["Glassmorphism", "Count-up", "Scroll progress", "3D flip", "Scroll cue", "Magnetic"].map((t) => (
                    <span key={t} className="whitespace-nowrap rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700">{t}</span>
                  ))}
                </Marquee>
              </div>
              <div className="relative mt-5 h-32 overflow-hidden rounded-2xl">
                <ParallaxImage src={MEDIA.ai} alt="Animated parallax example" className="h-full w-full" speed={0.14} sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs font-bold text-white">Scroll parallax + Ken Burns</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <div className="surface p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Scroll reveal stagger</h3>
              <div className="stagger mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["01", "02", "03", "04", "05", "06", "07", "08"].map((n) => (
                  <div key={n} className="flex h-16 items-center justify-center rounded-xl brand-gradient-soft text-sm font-black text-indigo-600">{n}</div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">IntersectionObserver reveals elements with directional offsets and configurable delays.</p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="surface p-7">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Accordion</h3>
              <div className="mt-5">
                <FAQ items={[
                  { q: "Is motion accessible?", a: "Yes — every animation is disabled under prefers-reduced-motion, and scroll reveals have a no-script fallback." },
                  { q: "Are images bundled locally?", a: "Yes — the full library lives in /public/images, so the template works offline with no external hosts." },
                  { q: "Is JavaScript required?", a: "Only for interactive primitives. All layout, gradients and keyframe motion are pure CSS." },
                ]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= IMAGE LIBRARY ================= */}
      <section className="bg-white/60 py-16">
        <div className="section-shell">
          <SectionHeading align="left" eyebrow="04 · Imagery" title="Local image library" subtitle="Twelve original assets, generated for this template and bundled in /public/images. Zero external requests." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: MEDIA.hero, name: "hero-students.jpg", tag: "Hero" },
              { src: MEDIA.campus, name: "campus-lab.jpg", tag: "Campus" },
              { src: MEDIA.success, name: "graduate-success.jpg", tag: "Placements" },
              { src: MEDIA.online, name: "online-learning.jpg", tag: "Online" },
              { src: MEDIA.mentor, name: "mentor-session.jpg", tag: "Mentorship" },
              { src: MEDIA.ai, name: "ai-abstract.jpg", tag: "Abstract" },
              { src: MEDIA.code, name: "code-screen.jpg", tag: "Courses" },
              { src: MEDIA.design, name: "design-studio.jpg", tag: "Courses" },
              { src: MEDIA.cloud, name: "cloud-abstract.jpg", tag: "Abstract" },
              { src: MEDIA.aurora, name: "aurora-bg.jpg", tag: "Backdrop" },
              { src: MEDIA.portrait1, name: "portrait-1.jpg", tag: "Portrait" },
              { src: MEDIA.portrait2, name: "portrait-2.jpg", tag: "Portrait" },
            ].map((img, i) => (
              <Reveal key={img.name} delay={(i % 3) * 80}>
                <div className="image-zoom group relative h-52 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <Image src={img.src} alt={img.tag} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-xs font-black">{img.name}</p>
                    <p className="text-[10px] text-white/70">{img.tag} · hover to zoom</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PATTERNS ================= */}
      <section className="section-shell py-16">
        <SectionHeading align="left" eyebrow="05 · Patterns" title="Background recipes" subtitle="Mix and match these layers to build new sections in seconds." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-100 bg-white"><div className="absolute inset-0 grid-pattern" /><p className="absolute bottom-3 left-4 text-xs font-bold text-slate-500">.grid-pattern</p></div>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-100 bg-white"><div className="absolute inset-0 dot-pattern" /><p className="absolute bottom-3 left-4 text-xs font-bold text-slate-500">.dot-pattern</p></div>
          </Reveal>
          <Reveal delay={160}>
            <div className="relative h-44 overflow-hidden rounded-2xl border border-slate-100 glass"><div className="absolute inset-0 noise opacity-10" /><p className="absolute bottom-3 left-4 text-xs font-bold text-slate-500">.glass + .noise</p></div>
          </Reveal>
          <Reveal delay={240}>
            <div className="relative h-44 overflow-hidden rounded-2xl aurora-gradient"><div className="absolute inset-0 grid-pattern opacity-40" /><p className="absolute bottom-3 left-4 text-xs font-bold text-white">.aurora-gradient</p></div>
          </Reveal>
        </div>
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1128] p-9 text-center text-white">
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: `url(${MEDIA.aurora})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/40 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl animate-blob [animation-delay:3s]" />
            <div className="relative">
              <h3 className="text-2xl font-black">Ready to build something beautiful?</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-white/75">Every pattern, animation and image on this page is part of the template — reuse them anywhere.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Magnetic><Link href="/" className="btn bg-white !text-indigo-700 shine">Back to homepage ↗</Link></Magnetic>
                <Link href="/courses" className="btn btn-ghost-light">Browse courses</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* gallery strip */}
      <div className="pb-16">
        <Marquee duration={40} trackClassName="gap-4 px-2">
          {GALLERY.map((g) => (
            <div key={g.src} className="image-zoom relative h-32 w-56 shrink-0 overflow-hidden rounded-2xl shadow-md">
              <Image src={g.src} alt={g.caption} fill sizes="224px" className="object-cover" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
