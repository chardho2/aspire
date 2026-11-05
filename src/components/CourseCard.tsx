import Link from "next/link";
import type { CourseWithRels } from "@/lib/queries";
import { formatINR, discountPct, formatCount, modeLabel } from "@/lib/format";
import { getAccent } from "@/lib/accent";
import Tilt3D from "./Tilt3D";
import SpotlightCard from "./SpotlightCard";
import CourseImageSlider from "./CourseImageSlider";

export default function CourseCard({ course }: { course: CourseWithRels }) {
  const off = discountPct(course.price, course.offerPrice);
  const accent = getAccent(course.accent);
  const gallery = course.images.length > 0 ? course.images : course.image ? [course.image] : [];

  return (
    <Tilt3D strength={5} className="h-full">
      <SpotlightCard className="h-full rounded-3xl">
        <Link
          href={`/courses/${course.slug}`}
          className="gradient-border group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_35px_-18px_rgba(30,41,99,.35)] transition-all duration-500 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-[0_35px_60px_-25px_rgba(79,70,229,.45)]"
        >
          <div className="relative">
            <CourseImageSlider
              images={gallery}
              alt={course.title}
              gradient={course.gradient}
              emoji={course.emoji}
              heightClass="h-44"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/60 to-transparent" />
          </div>

          <div className="absolute left-3 top-3 z-10 flex gap-2">
            {course.category && (
              <span className="rounded-full border border-white/30 bg-slate-950/35 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                {course.category.icon} {course.category.name}
              </span>
            )}
          </div>
          {off > 0 && (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-purple-700 shadow-lg">
              {off}% OFF
            </span>
          )}

          <div className="flex flex-1 flex-col p-5">
            <h3 className={`text-base font-bold leading-snug text-slate-900 transition-colors ${accent.text}`}>
              {course.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">{course.subtitle}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {course.tags.slice(0, 3).map((t) => (
                <span key={t} className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${accent.badge}`}>{t}</span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="font-bold text-amber-500">⭐ {Number(course.rating).toFixed(1)}</span>
              <span>👥 {formatCount(course.studentsCount)}</span>
              <span>⏱ {course.hours}h</span>
              <span className={`rounded-full px-2 py-0.5 font-semibold ${accent.badge}`}>{modeLabel(course.mode)}</span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <span className="text-lg font-extrabold text-slate-900">{formatINR(course.offerPrice)}</span>
                {off > 0 && <span className="ml-2 text-xs text-slate-400 line-through">{formatINR(course.price)}</span>}
              </div>
              <span className={`inline-flex items-center gap-1 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 ${accent.text}`}>
                Explore <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </Tilt3D>
  );
}
