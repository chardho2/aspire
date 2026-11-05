import { BATCH_SCHEDULE } from "@/lib/site-info";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

export default function BatchSchedule() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {BATCH_SCHEDULE.map((b, i) => (
        <Reveal key={b.title} delay={i * 120} direction={i === 0 ? "left" : "right"}>
          <SpotlightCard className="h-full rounded-3xl">
            <div className="relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_10px_35px_-20px_rgba(30,41,99,.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-200 to-cyan-200 opacity-60 blur-3xl animate-pulse-glow" />
              <div className="relative flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-2xl text-white shadow-lg shadow-indigo-500/30">{b.icon}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{b.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{b.days}</p>
                </div>
              </div>
              <p className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3.5 py-2 text-sm font-bold text-indigo-700">
                🕕 {b.time}
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-500">{b.desc}</p>
              <div className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 rounded-full aurora-gradient animate-shimmer" />
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}
