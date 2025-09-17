import { NextRequest, NextResponse } from "next/server";
import { createNhostClient } from "@/app/lib/nhost/server";

export async function POST(request: NextRequest) {
  try {
    const { displayName } = await request.json();

    // Validate input
    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json({ message: "Display name is required" }, { status: 400 });
    }

    const trimmedDisplayName = displayName.trim();
    if (trimmedDisplayName.length === 0) {
      return NextResponse.json({ message: "Display name cannot be empty" }, { status: 400 });
    }

    if (trimmedDisplayName.length > 100) {
      return NextResponse.json(
        { message: "Display name must be 100 characters or less" },
        { status: 400 },
      );
    }

    // Get session
    const nhost = await createNhostClient();
    const session = nhost.getUserSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // nhost already has session via CookieStorage; call GraphQL directly

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
        userId: session.user.id,
        displayName: trimmedDisplayName,
      },
    });
    const data = (resp as unknown as { data?: unknown; error?: unknown }).data;
    const error = (resp as unknown as { data?: unknown; error?: unknown }).error;

    if (error) {
      console.error("Error updating display name:", error);
      return NextResponse.json({ message: "Failed to update display name" }, { status: 500 });
    }

    const updatedUser = (data as { updateUser?: { id: string; displayName: string } })?.updateUser;
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update display name" }, { status: 500 });
    }

    // Session cookie is updated by middleware on next navigation; no manual cookie writes here

    return NextResponse.json({
      message: "Display name updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in update display name API:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
