import { enrollments } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, goal, courseId, mode } = body ?? {};

    if (!name || !email) {
      return Response.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

    const values = {
      name: String(name).slice(0, 160),
      email: String(email).slice(0, 200),
      phone: String(phone ?? "").slice(0, 40),
      goal: String(goal ?? "").slice(0, 1000),
      mode: mode === "offline" ? ("offline" as const) : ("online" as const),
      courseId: typeof courseId === "number" ? courseId : null,
    };

    if (!process.env.DATABASE_URL) {
      return Response.json({ ok: true, id: 0, demo: true, message: "Demo enrollment received." });
    }

    const { db } = await import("@/db");
    const [row] = await db.insert(enrollments).values(values).returning();
    return Response.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("enroll error", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
