import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getFeaturedCourses, getStudentByCode } from "@/lib/queries";
import { getSession } from "@/lib/session";
import ImageSlider, { type Slide } from "@/components/ImageSlider";
import LogoutButton from "@/components/LogoutButton";
import AuroraBackground from "@/components/AuroraBackground";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Your personalized learning dashboard at Chardho Aspire Institute.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/dashboard");

  const student = await getStudentByCode(session.studentCode);
  if (!student) redirect("/login?redirect=/dashboard");

  const courses = (await getFeaturedCourses()).slice(0, 3);
  const progress = [72, 45, 18];

  const stats = [
    { icon: "📚", label: "Enrolled Courses", value: "3" },
    { icon: "✅", label: "Completed Lessons", value: "128" },
    { icon: "🏆", label: "Certificates", value: "1" },
    { icon: "🔥", label: "Learning Streak", value: "14 days" },
  ];

  const upcoming = [
    { title: "Live: React Server Components", time: "Today · 6:00 PM", tag: "Live Class", icon: "🔴" },
    { title: "Assignment: Build a REST API", time: "Due Tomorrow", tag: "Assignment", icon: "📝" },
    { title: "AI Mock Interview", time: "Fri · 4:00 PM", tag: "Career", icon: "🤖" },
  ];

  const slides: Slide[] = [
    {
      src: "/images/campus-lab.jpg",
      alt: "Live classroom discussion",
      badge: "🔴 Live Now",
      title: "React Server Components — Live Class",
      subtitle: "Join 240+ learners live today at 6:00 PM with Aarav Mehta.",
    },
    {
      src: "/images/ai-abstract.jpg",
      alt: "AI and machine learning visual",
      badge: "🤖 New Batch",
      title: "AI & Machine Learning Pro — Batch 12",
      subtitle: "Seats filling fast. Enroll now to lock your spot.",
    },
    {
      src: "/images/mentor-session.jpg",
      alt: "Graduates celebrating success",
      badge: "🎉 Success Story",
      title: "94% of learners placed within 90 days",
      subtitle: "Your placement journey starts the day you enroll.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-lg">
            {student.photo ? (
              <Image src={student.photo} alt={student.name} fill className="object-cover" sizes="56px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-3xl">
                🧑‍🎓
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Welcome back, {student.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your learning today.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/profile"
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
          >
            🪪 My ID Card
          </Link>
          <Link
            href="/courses"
            className="brand-gradient rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30"
          >
            + Enroll in new course
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Sliding banner */}
      <div className="mt-8">
        <ImageSlider slides={slides} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-2 text-2xl font-black text-slate-900">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-black text-slate-900">Continue Learning</h2>
          <div className="mt-4 space-y-4">
            {courses.map((c, i) => (
              <div key={c.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center gap-4 p-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    {c.image ? (
                      <Image src={c.image} alt={c.title} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${c.gradient} text-2xl`}>
                        {c.emoji}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-500">{c.instructor?.name}</p>
                  </div>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                  >
                    Resume
                  </Link>
                </div>
                <div className="px-5 pb-5">
                  <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>{progress[i]}% complete</span>
                    <span>{Math.round((progress[i] / 100) * c.hours)}h / {c.hours}h</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="brand-gradient h-full rounded-full" style={{ width: `${progress[i]}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-black text-slate-900">Upcoming</h2>
            <div className="mt-4 space-y-3">
              {upcoming.map((u) => (
                <div key={u.title} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <span className="text-xl">{u.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{u.title}</div>
                    <div className="text-xs text-slate-500">{u.time}</div>
                    <span className="mt-1 inline-block rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600">
                      {u.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/profile"
            className="block rounded-2xl border border-slate-100 bg-gradient-to-br from-blue-50 to-purple-50 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🪪</span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm">
                VERIFIED
              </span>
            </div>
            <h3 className="mt-2 font-bold text-slate-900">Digital Access Card</h3>
            <p className="mt-1 text-xs text-slate-500">
              View your student ID card, QR verification &amp; access details.
            </p>
            <span className="mt-3 inline-block text-xs font-bold text-blue-700">Open my ID card →</span>
          </Link>

          <div className="brand-gradient rounded-2xl p-6 text-white shadow-lg">
            <div className="text-2xl">🤖</div>
            <h3 className="mt-2 font-bold">AI Tutor</h3>
            <p className="mt-1 text-sm text-blue-50">Stuck on a concept? Ask your AI tutor anytime, 24/7.</p>
            <button className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-bold text-purple-700 transition hover:scale-[1.02]">
              Ask AI Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
