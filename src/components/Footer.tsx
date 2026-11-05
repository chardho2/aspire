import Link from "next/link";
import BrandLogo from "./BrandLogo";
import NewsletterForm from "./NewsletterForm";
import { SITE_INFO } from "@/lib/site-info";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/courses", label: "All Courses" },
      { href: "/categories", label: "Categories" },
      { href: "/placements", label: "Placements" },
      { href: "/about", label: "Our Trainers" },
      { href: "/design", label: "Design System" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/placements", label: "Success Stories" },
      { href: "/login", label: "Student Login" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Help Center" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

const SOCIALS = [
  { label: "X", href: "https://x.com", d: "M4 4h3.5l4.2 5.8L16.4 4H20l-6.1 7.3L20.5 20h-3.5l-4.5-6.2L7.4 20H4l6.5-7.8L4 4Zm2.5 1.5 11 13h1.1l-11-13H6.5Z" },
  { label: "LinkedIn", href: "https://linkedin.com", d: "M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.2 9h3.6v12H3.2V9Zm6 0h3.4v1.7h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.3 4.3 5.3V21h-3.6v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H9.2V9Z" },
  { label: "YouTube", href: "https://youtube.com", d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" },
  { label: "Instagram", href: "https://instagram.com", d: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5Zm5.8-3.3a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1Z" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#080d24] text-slate-300">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-indigo-600/25 blur-[120px] animate-blob" />
        <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[120px] animate-blob [animation-delay:4s]" />
        <div className="absolute inset-0 dot-pattern opacity-[.12]" />
      </div>

      <div className="section-shell relative py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex"><BrandLogo size={48} light /></Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              India&apos;s AI-powered institute for career-changing tech education. Learn from
              industry mentors, build real projects, and get placed at top companies.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.04] p-5 backdrop-blur">
              <p className="text-sm font-bold text-white">Join 50,000+ learners</p>
              <NewsletterForm />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[.15em] text-white">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-300">
                      <span className="h-1 w-1 rounded-full bg-indigo-500 transition-all duration-300 group-hover:w-2 group-hover:bg-cyan-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[.15em] text-white">Get in Touch</h4>
            <ul className="mt-5 space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span aria-hidden="true">📍</span>
                <a href={SITE_INFO.mapsHref} target="_blank" rel="noopener noreferrer" className="not-italic leading-relaxed transition hover:text-cyan-300">
                  {SITE_INFO.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                </a>
              </li>
              <li className="flex items-center gap-2.5">📧 <a href={`mailto:${SITE_INFO.email}`} className="transition hover:text-cyan-300">{SITE_INFO.email}</a></li>
              <li className="flex items-center gap-2.5">📞 <a href={`tel:${SITE_INFO.phoneHref}`} className="transition hover:text-cyan-300">{SITE_INFO.phone}</a></li>
              <li className="flex items-center gap-2.5">💬 <a href={SITE_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">WhatsApp us</a></li>
              <li className="flex items-start gap-2.5">🕘 <span>{SITE_INFO.workingHours}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Chardho Aspire Institute. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-cyan-300">Privacy Policy</Link>
            <Link href="/terms-of-service" className="transition hover:text-cyan-300">Terms of Service</Link>
            <Link href="/refund-policy" className="transition hover:text-cyan-300">Refund Policy</Link>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-cyan-300">Made with ✦ in Hindupur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
