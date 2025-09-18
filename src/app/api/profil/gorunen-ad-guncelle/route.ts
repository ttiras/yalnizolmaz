import { NextRequest, NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";

export async function POST(request: NextRequest) {
  try {
    const { displayName } = await request.json();

    // Validate input
    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json({ message: "Görünen ad gereklidir" }, { status: 400 });
    }

    const trimmedDisplayName = displayName.trim();
    if (trimmedDisplayName.length === 0) {
      return NextResponse.json({ message: "Görünen ad boş olamaz" }, { status: 400 });
    }

    if (trimmedDisplayName.length > 100) {
      return NextResponse.json(
        { message: "Görünen ad 100 karakter veya daha az olmalıdır" },
        { status: 400 },
      );
    }

    const nhost = await createNhostClient();
    const session = nhost.getUserSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Yetkisiz işlem" }, { status: 401 });
    }

    // Refresh session for API context (middleware doesn't run on /api/*)
    const refreshed = await nhost.refreshSession(60).catch(() => null);
    const activeSession = refreshed ?? nhost.getUserSession();
    if (!activeSession?.user) {
      return NextResponse.json({ message: "Oturum süresi doldu" }, { status: 401 });
    }

    // Update user metadata using GraphQL mutation
    const resp = await nhost.graphql.request({
      query: `
      mutation UpdateDisplayName($userId: uuid!, $displayName: String!) {
        updateUser(
          pk_columns: { id: $userId }
          _set: { displayName: $displayName }
        ) {
          id
          displayName
        }
      }
    `,
      variables: {
        userId: activeSession.user.id,
        displayName: trimmedDisplayName,
      },
    });
    const anyResp = resp as unknown as {
      data?: { updateUser?: { id: string; displayName: string } };
      error?: unknown;
      body?: { data?: { updateUser?: { id: string; displayName: string } }; errors?: unknown };
    };
    const gqlErrors = anyResp.error ?? anyResp.body?.errors;
    if (gqlErrors) {
      console.error("Error updating display name:", gqlErrors);
      return NextResponse.json({ message: "Görünen ad güncellenemedi" }, { status: 500 });
    }

    const updatedUser = anyResp.body?.data?.updateUser ?? anyResp.data?.updateUser;
    if (!updatedUser) {
      return NextResponse.json({ message: "Görünen ad güncellenemedi" }, { status: 500 });
    }

    // Force-refresh session so cookie carries updated user fields immediately
    try {
      await nhost.refreshSession(0);
    } catch {}

    return NextResponse.json({
      message: "Görünen ad başarıyla güncellendi",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in update display name API:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
