export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";

export async function GET() {
  const s = await getSession();
  return NextResponse.json({ authenticated: Boolean(s), user: s?.user ?? null });
}
