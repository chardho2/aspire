import { contacts } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 },
      );
    }

    const values = {
      name: String(name).slice(0, 160),
      email: String(email).slice(0, 200),
      subject: String(subject ?? "").slice(0, 220),
      message: String(message).slice(0, 4000),
    };

    if (!process.env.DATABASE_URL) {
      return Response.json({ ok: true, id: 0, demo: true, message: "Thanks! We'll be in touch." });
    }

    const { db } = await import("@/db");
    const [row] = await db.insert(contacts).values(values).returning();
    return Response.json({ ok: true, id: row.id });
  } catch (err) {
    console.error("contact error", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
