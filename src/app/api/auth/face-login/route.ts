import { NextResponse } from "next/server";
import { hasDatabase, db } from "@/db";
import { students, faceAuthLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getStudentByCode } from "@/lib/queries";
import { SESSION_COOKIE, encodeSession } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Simulated face-authentication verification endpoint.
 *
 * In a production system this would forward the captured frame to a secure
 * face-recognition service (e.g. AWS Rekognition / Azure Face API) and compare
 * it against the student's enrolled biometric template. Here we validate that
 * a live camera frame was captured and that the student record exists, then
 * issue a signed session cookie granting dashboard/profile access.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentCode, image, method } = body ?? {};

    if (!studentCode || typeof studentCode !== "string") {
      return NextResponse.json(
        { ok: false, error: "Student ID is required." },
        { status: 400 },
      );
    }

    const useMethod = method === "id-only" ? "id-only" : "face";
    if (useMethod === "face" && (!image || typeof image !== "string" || image.length < 100)) {
      return NextResponse.json(
        { ok: false, error: "No valid face capture received. Please try again." },
        { status: 400 },
      );
    }

    const code = studentCode.trim().toUpperCase();
    let student;
    if (hasDatabase) {
      const rows = await db.select().from(students).where(eq(students.studentCode, code)).limit(1);
      student = rows[0];
    } else {
      student = await getStudentByCode(code);
    }

    if (!student) {
      if (hasDatabase) {
        await db.insert(faceAuthLogs).values({ studentCode: code, status: "failed", method: useMethod });
      }
      return NextResponse.json(
        { ok: false, error: "We couldn't find a student with that ID." },
        { status: 404 },
      );
    }

    if (useMethod === "face" && !student.faceEnrolled) {
      return NextResponse.json(
        { ok: false, error: "Face ID is not enrolled for this account. Please use Student ID login." },
        { status: 403 },
      );
    }

    if (hasDatabase) {
      await db.insert(faceAuthLogs).values({
        studentCode: student.studentCode,
        status: "success",
        method: useMethod,
      });
    }

    const token = encodeSession({
      studentCode: student.studentCode,
      method: useMethod,
      ts: Date.now(),
    });

    const res = NextResponse.json({
      ok: true,
      student: {
        name: student.name,
        studentCode: student.studentCode,
        photo: student.photo,
      },
    });

    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("face-login error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
