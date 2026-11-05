import { cookies } from "next/headers";

export const SESSION_COOKIE = "chardho_session";

export type SessionPayload = {
  studentCode: string;
  method: "face" | "id-only";
  ts: number;
};

export function encodeSession(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

export function decodeSession(token: string): SessionPayload | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as Partial<SessionPayload>;
    if (!parsed.studentCode) return null;
    return {
      studentCode: parsed.studentCode,
      method: parsed.method === "id-only" ? "id-only" : "face",
      ts: parsed.ts ?? Date.now(),
    };
  } catch {
    return null;
  }
}

/** Read the current session on the server (Server Components / Route Handlers). */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  return decodeSession(raw);
}
