import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStudentByCode } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: true, loggedIn: false });
  }

  const student = await getStudentByCode(session.studentCode);
  if (!student) {
    return NextResponse.json({ ok: true, loggedIn: false });
  }

  return NextResponse.json({
    ok: true,
    loggedIn: true,
    name: student.name,
    studentCode: student.studentCode,
    photo: student.photo,
  });
}
