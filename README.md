# Chardho Aspire Institute — Premium Website Template

A complete, production-shaped **Next.js 16 + Tailwind CSS 4** website template for an
education institute / course platform, with a full animation system and a bundled
image library. It runs out of the box with **zero configuration** — no database, no
API keys, no external image hosts.

---

## ✨ What's inside

- **Full site**: animated homepage, courses + course detail, categories, about,
  placements, contact, legal pages, student login (face-ID demo), dashboard, digital
  student ID card, and a **live design-system / UI kit** at `/design`.
- **Animation library** (CSS + small React primitives): aurora mesh backgrounds,
  scroll reveals with stagger, infinite marquees, 3D tilt, cursor spotlight, magnetic
  buttons, count-up numbers, typewriter, Ken Burns / parallax images, image hover zoom,
  shimmer sweep, floating badges, orbit rings, gradient-shift text, scroll progress bar,
  animated FAQ accordion, glassmorphism, pulse/scan effects and mobile drawer motion.
  All motion honours `prefers-reduced-motion` and has a no-JS fallback.
- **12 local images**: original photography and abstract 3D art in `public/images/`
  (hero, campus, mentoring, placements, online learning, AI/cloud abstractions, course
  thumbnails, portraits, aurora backdrop). Nothing is loaded from a remote host.
- **Design system**: tokens, palette, type scale, buttons, cards, surfaces and background
  recipes documented interactively at `/design`.
- **Zero-config demo data**: all content ships in `src/db/seed-data.ts` and is served via
  `src/lib/demo-data.ts` when `DATABASE_URL` is absent. Set `DATABASE_URL` and the same
  app transparently switches to Drizzle ORM + PostgreSQL (`/api/seed` populates it).
- **Polished basics**: responsive sticky header, mobile drawer, animated footer with
  newsletter, metadata/OpenGraph, JSON-LD, sitemap, robots, health endpoint and
  accessible semantics.

---

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. That's it — the site is fully populated in demo mode.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

### Optional: real PostgreSQL

```bash
cp .env.example .env.local
# set DATABASE_URL=postgresql://...
npx drizzle-kit push        # create tables
curl http://localhost:3000/api/seed   # seed categories, courses, instructors, students
```

`GET /api/health` reports whether the app is in `demo` or `database` mode.

---

## 🗂 Structure

```
src/
├── app/
│   ├── page.tsx              # animated homepage
│   ├── design/page.tsx       # interactive design system & animation gallery
│   ├── courses/, categories/, about/, placements/, contact/
│   ├── login/, dashboard/, profile/   # student area + face-ID demo
│   ├── api/                  # contact, enroll, courses, auth, seed, health
│   ├── globals.css           # ⭐ design tokens + entire animation library
│   ├── layout.tsx            # metadata, header/footer, progress bar, back-to-top
│   └── icon.svg              # vector favicon
├── components/
│   ├── AuroraBackground.tsx  Reveal.tsx        SpotlightCard.tsx
│   ├── Marquee.tsx           Magnetic.tsx      ParallaxImage.tsx
│   ├── Tilt3D.tsx            CountUp.tsx       TypingText.tsx
│   ├── PageHero.tsx          SectionHeading.tsx  FAQ.tsx  GalleryShowcase.tsx
│   ├── Header.tsx  Footer.tsx  BrandLogo.tsx  CourseCard.tsx  …
├── db/                       # Drizzle schema, seed data, pool
└── lib/
    ├── demo-data.ts          # in-memory mirror of the seed (demo mode)
    ├── queries.ts            # one API, two backends (demo / Postgres)
    ├── media.ts              # central image registry
    └── site-info.ts          # ⭐ name, phone, address, batches, learning modes
public/images/                # 12 bundled assets
```

---

## 🎨 Customising the template

| What | Where |
| --- | --- |
| Brand colours, gradients, shadows, radii | `:root` tokens in `src/app/globals.css` |
| Animation keyframes & utility classes | `src/app/globals.css` (search for `animation library`) |
| Institute name, phone, address, batches | `src/lib/site-info.ts` |
| Courses, categories, trainers, testimonials | `src/db/seed-data.ts` |
| Images used across the site | `src/lib/media.ts` + `public/images/` |
| Navigation / footer links | `src/components/Header.tsx`, `Footer.tsx` |
| Homepage sections | `src/app/page.tsx` |
| Metadata, favicon, OpenGraph | `src/app/layout.tsx`, `src/app/icon.svg` |

### Reusable motion snippets

```tsx
<Reveal delay={120} direction="left">…</Reveal>      // scroll reveal
<Marquee duration={30} reverse>…</Marquee>            // infinite ticker
<SpotlightCard className="rounded-3xl">…</SpotlightCard>
<Magnetic><Link className="btn btn-primary shine">…</Link></Magnetic>
<ParallaxImage src="/images/ai-abstract.jpg" className="h-80 rounded-3xl" />
<AuroraBackground tone="dark" dense />               // section background
<div className="animate-float animate-kenburns animate-pulse-glow" />
```

---

## ♿ Accessibility & performance

- `prefers-reduced-motion` disables every animation; `<noscript>` forces reveals visible.
- Local images only — no third-party requests, works offline after install.
- Semantic headings, labelled form fields, `aria-label`s on icon buttons and controls.
- Demo mode has no database round-trips; interactive effects are DOM-only where possible
  (no React re-renders on scroll).

---

## 🔌 API routes

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Mode + database status |
| `GET /api/courses` | Filterable course JSON |
| `GET /api/seed` | Seed PostgreSQL (no-op in demo mode) |
| `POST /api/contact`, `POST /api/enroll` | Form submissions |
| `POST /api/auth/face-login`, `/api/auth/me`, `/api/auth/logout` | Demo student session |

Demo student ID: **`CAI-2026-04821`** (use "id-only" method, or the face scanner with a
camera). All write endpoints return friendly demo responses when no database is configured.
