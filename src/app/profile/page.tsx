import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import StudentIDCard from "@/components/StudentIDCard";
import LogoutButton from "@/components/LogoutButton";
import AuroraBackground from "@/components/AuroraBackground";
import { getSession } from "@/lib/session";
import { getStudentByCode } from "@/lib/queries";

export const metadata: Metadata = {
  title: "My Profile & Access Card",
  description: "View your Chardho Aspire Institute digital student profile and access ID card.",
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/profile");

  const dbStudent = await getStudentByCode(session.studentCode);
  if (!dbStudent) redirect("/login?redirect=/profile");

  const student = {
    id: dbStudent.studentCode,
    name: dbStudent.name,
    email: dbStudent.email,
    course: dbStudent.course,
    batch: dbStudent.batch,
    photo: dbStudent.photo,
    issued: dbStudent.issuedOn,
    validThru: dbStudent.validThru,
    bloodGroup: dbStudent.bloodGroup,
  };

  const activity = [
    {
      icon: session.method === "face" ? "✅" : "🆔",
      label: session.method === "face" ? "Logged in via Face Authentication" : "Logged in via Student ID",
      time: "Just now",
    },
    { icon: "📶", label: "Access card scanned at Campus Gate", time: "Yesterday, 6:40 PM" },
    { icon: "🔐", label: "Password changed", time: "3 days ago" },
    { icon: "📄", label: "Certificate downloaded — Python Basics", time: "1 week ago" },
  ];

  const details = [
    { label: "Full Name", value: student.name },
    { label: "Student ID", value: student.id },
    { label: "Email", value: student.email },
    { label: "Phone", value: dbStudent.phone || "—" },
    { label: "Enrolled Course", value: student.course },
    { label: "Batch", value: student.batch },
    { label: "Blood Group", value: student.bloodGroup },
    { label: "Access Valid Thru", value: student.validThru },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-purple-600">My Profile</span>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Student Access &amp; Identity</h1>
        <p className="mx-auto max-w-xl text-slate-500">
          Your verified digital identity for campus access, live class authentication and exam
          verification.
        </p>
        <LogoutButton />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <StudentIDCard student={student} />

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
              ⬇️ Download ID (PDF)
            </button>
            <button className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700">
              🔄 Reissue Card
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">🔐 Biometric &amp; Login Access</h3>
            <div className="mt-3 space-y-2.5">
              {[
                { icon: "🆔", label: "Face Authentication", on: dbStudent.faceEnrolled },
                { icon: "👆", label: "Fingerprint Login", on: true },
                { icon: "📱", label: "OTP via Phone", on: true },
                { icon: "🔑", label: "Google Sign-In", on: false },
              ].map((a) => (
                <div key={a.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span>{a.icon}</span> {a.label}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      a.on ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {a.on ? "ENABLED" : "OFF"}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/login"
              className="mt-4 block rounded-lg bg-blue-50 py-2 text-center text-xs font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Re-scan &amp; verify Face ID →
            </Link>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Profile Details</h3>
              <button className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100">
                ✏️ Edit Profile
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{d.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">Recent Access Activity</h3>
            <div className="mt-4 space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-lg">{a.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{a.label}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brand-gradient relative overflow-hidden rounded-2xl p-6 text-white shadow-lg">
            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <h3 className="text-lg font-black">Need to update your details?</h3>
            <p className="mt-1 text-sm text-blue-50">
              Contact student support to update your photo, course batch or access permissions.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-purple-700 transition hover:scale-105"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
