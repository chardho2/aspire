import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Marquee from "@/components/Marquee";
import { getCategories } from "@/lib/queries";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = {
  title: "Course Categories",
  description: "Browse all learning categories at Chardho Aspire Institute.",
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const groups = new Map<string, typeof categories>();
  for (const c of categories) {
    const arr = groups.get(c.group) ?? [];
    arr.push(c);
    groups.set(c.group, arr);
  }

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Categories"
        title={<>Find your <span className="text-gradient">learning path</span></>}
        subtitle="From development to design, explore every domain we teach — and pick the one that moves your career forward."
        crumbs={[{ label: "Categories" }]}
        image={MEDIA.design}
      >
        <div className="flex flex-wrap gap-2">
          {[...groups.keys()].map((g) => (
            <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="pill border border-indigo-100 bg-white/80 text-indigo-700 shadow-sm transition hover:-translate-y-0.5">
              {g}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="section-shell py-16">
        <div className="space-y-14">
          {[...groups.entries()].map(([group, items], gi) => (
            <div key={group} id={group.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded-full aurora-gradient" />
                  <h2 className="text-2xl font-black text-slate-900">{group}</h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{items.length} paths</span>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((c, i) => (
                  <Reveal key={c.id} delay={(i % 4) * 70} className="h-full">
                    <SpotlightCard className="h-full rounded-2xl">
                      <Link
                        href={`/courses?category=${c.slug}`}
                        className="gradient-border group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
                      >
                        <div className="flex items-start justify-between">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">{c.icon}</span>
                          <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-500">{c.courseCount}</span>
                        </div>
                        <h3 className="mt-4 text-sm font-bold text-slate-900">{c.name}</h3>
                        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">{c.description}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 transition-transform group-hover:translate-x-1">Explore →</span>
                      </Link>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
              {gi === 0 && (
                <div className="mt-8">
                  <Marquee duration={30} trackClassName="gap-10 px-5">
                    {["Web Development", "AI & Machine Learning", "Cloud & DevOps", "UI/UX Design", "Data Science", "Animation & VFX", "Cyber Security", "Digital Marketing"].map((x) => (
                      <span key={x} className="whitespace-nowrap text-lg font-black text-slate-200 transition-colors hover:text-indigo-500">{x}</span>
                    ))}
                  </Marquee>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
