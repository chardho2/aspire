import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({
      ok: true,
      mode: "demo",
      database: "in-memory seed data",
      message: "Running with zero configuration. Set DATABASE_URL to enable PostgreSQL.",
    });
  }
  try {
    const { db } = await import("@/db");
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, mode: "database", database: "connected" });
  } catch (error) {
    console.error("health check error", error);
    return Response.json({ ok: false, mode: "database", database: "unavailable" }, { status: 500 });
  }
}
