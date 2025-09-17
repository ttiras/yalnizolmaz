import "server-only";
import { NextRequest } from "next/server";
import { createCsrfToken } from "@/lib/security/csrf";

export async function GET(_req: NextRequest) {
  try {
    const token = await createCsrfToken();
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[guvenlik/belirteci] unexpected error", err);
    return new Response(JSON.stringify({ error: "Beklenmeyen bir hata" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
