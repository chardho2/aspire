import Image from "next/image";
import Link from "next/link";
import { LEARNING_MODES } from "@/lib/site-info";
import { MEDIA } from "@/lib/media";
import Reveal from "./Reveal";

const IMAGES: Record<string, string> = {
  online: MEDIA.online,
  offline: MEDIA.campus,
};

export default function LearningModes() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {LEARNING_MODES.map((m, i) => (
        <Reveal key={m.key} delay={i * 120} direction={i === 0 ? "left" : "right"} className="h-full">
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_40px_-20px_rgba(30,41,99,.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-52 overflow-hidden sm:h-60">
              <Image
                src={IMAGES[m.key] ?? MEDIA.campus}
                alt={m.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-30 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-3 text-white">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${m.gradient} text-xl shadow-lg`}>{m.icon}</span>
                <div>
                  <h3 className="text-lg font-black">{m.title}</h3>
                  <p className="text-xs text-white/80">{m.tagline}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm leading-relaxed text-slate-500">{m.desc}</p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] font-black text-emerald-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-bold text-indigo-600 transition hover:gap-2">
                Talk to admissions <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
