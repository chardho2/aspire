import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CourseCard from "@/components/CourseCard";
import { getAllCourses, getCategories } from "@/lib/queries";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Explore job-ready courses in web development, AI, cloud, data science, design and more at Chardho Aspire Institute.",
};

export const dynamic = "force-dynamic";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const [courses, categories] = await Promise.all([getAllCourses(), getCategories()]);

  let filtered = courses;
  if (category) filtered = filtered.filter((c) => c.category?.slug === category);
  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.subtitle.toLowerCase().includes(term) ||
        c.tags.some((t) => t.toLowerCase().includes(term)),
    );
  }

  const active = categories.find((c) => c.slug === category);

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Courses"
        title={<>{active ? <>{active.icon} {active.name}</> : <>Explore <span className="text-gradient">all courses</span></>}</>}
        subtitle={active ? active.description : "Hand-crafted, industry-relevant programs to launch your tech career. Live online and at our Hindupur campus."}
        crumbs={active ? [{ href: "/courses", label: "Courses" }, { label: active.name }] : [{ label: "Courses" }]}
        image={MEDIA.code}
        compact
      >
        <form className="flex w-full max-w-lg flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg sm:flex-row" action="/courses">
          {category && <input type="hidden" name="category" value={category} />}
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search courses, skills, tags..."
            aria-label="Search courses"
            className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button className="btn btn-primary !rounded-xl !px-5 !py-2.5 !text-sm">Search ↗</button>
        </form>
      </PageHero>

      <section className="section-shell py-12">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/courses"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${!category ? "brand-gradient text-white shadow-lg shadow-indigo-500/25" : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600"}`}
            >
              All courses
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/courses?category=${c.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  category === c.slug
                    ? "brand-gradient text-white shadow-lg shadow-indigo-500/25"
                    : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-9 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-500">
            <span className="text-lg font-black text-slate-900">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""} found
          </p>
          {(category || q) && <Link href="/courses" className="text-sm font-bold text-indigo-600 hover:underline">Clear filters →</Link>}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 90} className="h-full"><CourseCard course={c} /></Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-10">
            <div className="surface py-16 text-center">
              <div className="text-5xl animate-float">🔍</div>
              <p className="mt-4 font-bold text-slate-700">No courses match your search.</p>
              <Link href="/courses" className="btn btn-outline mt-5">Clear filters →</Link>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
}
