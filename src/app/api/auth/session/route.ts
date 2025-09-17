export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";

export async function GET() {
  const nhost = await createNhostClient();
  const s = nhost.getUserSession();
  return NextResponse.json({ authenticated: Boolean(s), user: s?.user ?? null });
}
