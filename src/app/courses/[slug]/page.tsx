import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import EnrollForm from "@/components/EnrollForm";
import Tilt3D from "@/components/Tilt3D";
import AuroraBackground from "@/components/AuroraBackground";
import Reveal from "@/components/Reveal";
import CourseImageSlider from "@/components/CourseImageSlider";
import { getCourseBySlug, getRelatedCourses } from "@/lib/queries";
import { formatINR, discountPct, formatCount, modeLabel } from "@/lib/format";
import { getAccent } from "@/lib/accent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.subtitle,
    openGraph: { title: course.title, description: course.subtitle },
  };
}

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const related = await getRelatedCourses(course.categoryId, course.slug);
  const off = discountPct(course.price, course.offerPrice);
  const accent = getAccent(course.accent);
  const gallery = course.images.length > 0 ? course.images : course.image ? [course.image] : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.subtitle,
    provider: {
      "@type": "Organization",
      name: "Chardho Aspire Institute",
    },
  };

  const meta = [
    { icon: "📶", label: "Level", value: course.level },
    { icon: "⏱", label: "Duration", value: `${course.durationWeeks} weeks · ${course.hours}h` },
    { icon: "👥", label: "Students", value: formatCount(course.studentsCount) },
    { icon: "⭐", label: "Rating", value: `${Number(course.rating).toFixed(1)} (${formatCount(course.reviewsCount)})` },
    { icon: "📍", label: "Mode", value: modeLabel(course.mode) },
  ];

  const perks = [
    { on: course.hasCertificate, icon: "📜", label: "Certificate of completion" },
    { on: course.hasPlacement, icon: "💼", label: "Placement assistance" },
    { on: course.hasInternship, icon: "🧑‍💻", label: "Internship opportunity" },
    { on: true, icon: "♾️", label: "Lifetime access" },
    { on: true, icon: "🤖", label: "AI tutor & doubt solver" },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <AuroraBackground tone="dark" dense />
        <div className="section-shell relative py-14 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_.65fr]">
            <div className="animate-fadeup text-white">
              <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-400">
                <Link href="/courses" className="hover:text-cyan-300">Courses</Link>
                {course.category && (
                  <>
                    <span>/</span>
                    <Link href={`/courses?category=${course.category.slug}`} className="hover:text-cyan-300">{course.category.name}</Link>
                  </>
                )}
              </nav>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl glass-dark text-3xl shadow-lg">{course.emoji}</span>
                {course.featured && <span className="pill border border-white/20 bg-white/10 text-cyan-200">🔥 Bestseller</span>}
                {course.category && <span className="pill border border-white/20 bg-white/10 text-slate-200">{course.category.name}</span>}
              </div>
              <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl">{course.title}</h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">{course.subtitle}</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-200">
                <span className="text-amber-300">⭐ {Number(course.rating).toFixed(1)} rating</span>
                <span>👥 {formatCount(course.studentsCount)} students</span>
                {course.instructor && <span>👨‍🏫 {course.instructor.name}</span>}
                <span>⏱ {course.durationWeeks} weeks</span>
              </div>
            </div>

            <div className="animate-slideleft [animation-delay:180ms] lg:sticky lg:top-28">
              <div className="surface relative overflow-hidden p-6 shadow-2xl">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-200/50 blur-3xl" />
                <div className="relative flex flex-wrap items-end gap-2">
                  <span className="text-3xl font-black text-slate-900">{formatINR(course.offerPrice)}</span>
                  {off > 0 && (
                    <>
                      <span className="text-sm text-slate-400 line-through">{formatINR(course.price)}</span>
                      <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-black text-violet-700">{off}% OFF</span>
                    </>
                  )}
                </div>
                <p className="relative mt-1 text-xs font-semibold text-rose-500">⏳ Limited-time offer ends soon</p>
                <div className="relative mt-5"><EnrollForm courseId={course.id} courseTitle={course.title} offerPrice={course.offerPrice} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-shell py-12 animate-fadein">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Course showcase image gallery */}
            {gallery.length > 0 && (
              <Tilt3D strength={5}>
                <CourseImageSlider
                  images={gallery}
                  alt={course.title}
                  gradient={course.gradient}
                  emoji={course.emoji}
                  heightClass="h-64 sm:h-80"
                  rounded="rounded-2xl shadow-xl"
                  interval={3800}
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </Tilt3D>
            )}

            {/* Meta grid */}
            <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {meta.map((m) => (
                <div key={m.label} className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl">{m.icon}</div>
                  <div className="mt-1 text-xs text-slate-400">{m.label}</div>
                  <div className="text-sm font-bold text-slate-900">{m.value}</div>
                </div>
              ))}
            </div>

</Reveal>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-black text-slate-900">Course Overview</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{course.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className={`rounded-lg px-3 py-1 text-sm font-semibold ${accent.badge}`}>
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-black text-slate-900">What you&apos;ll get</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {perks.filter((p) => p.on).map((p) => (
                  <div key={p.label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{p.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus */}
            <section>
              <h2 className="text-2xl font-black text-slate-900">Curriculum</h2>
              <div className="mt-4 space-y-3">
                {course.syllabus.map((mod, i) => (
                  <details key={i} className="group rounded-xl border border-slate-100 bg-white shadow-sm" open={i === 0}>
                    <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-slate-900">
                      <span>
                        <span className={`mr-2 ${accent.text}`}>Module {i + 1}</span>
                        {mod.module}
                      </span>
                      <span className="text-slate-400 transition group-open:rotate-180">▾</span>
                    </summary>
                    <ul className="space-y-2 border-t border-slate-100 p-4">
                      {mod.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="text-green-500">✓</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-black text-slate-900">Hands-on Projects</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.projects.map((p, i) => (
                  <div key={p} className={`flex items-center gap-3 rounded-xl border border-slate-100 p-4 ${accent.chipBg} bg-opacity-30`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black shadow ${accent.text}`}>
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{p}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Instructor */}
            {course.instructor && (
              <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900">Your Instructor</h2>
                <div className="mt-4 flex items-start gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 text-3xl">
                    {course.instructor.avatar}
                  </span>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{course.instructor.name}</div>
                    <div className="text-sm text-purple-600">{course.instructor.title}</div>
                    <div className="mt-1 flex gap-4 text-xs text-slate-500">
                      <span>⭐ {Number(course.instructor.rating).toFixed(1)} rating</span>
                      <span>👥 {formatCount(course.instructor.students)} students</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{course.instructor.bio}</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar related */}
          <aside className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">Related Courses</h3>
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
