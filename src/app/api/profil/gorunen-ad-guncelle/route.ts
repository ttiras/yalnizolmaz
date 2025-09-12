import { NextRequest, NextResponse } from "next/server";
import { createServerNhostClient } from "@/lib/nhost.server";
import { getSession, updateSessionUser } from "@/lib/auth-session";

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
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Create Nhost client and update user metadata
    const nhost = createServerNhostClient();

    // Set the access token for authenticated requests
    nhost.graphql.setAccessToken(session.accessToken);

    // Update user metadata using GraphQL mutation
    const { data, error } = await nhost.graphql.request(
      `
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
      {
        userId: session.user.id,
        displayName: trimmedDisplayName,
      },
    );

    if (error) {
      console.error("Error updating display name:", error);
      return NextResponse.json({ message: "Failed to update display name" }, { status: 500 });
    }

    const updatedUser = (data as { updateUser?: { id: string; displayName: string } })?.updateUser;
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update display name" }, { status: 500 });
    }

    // Update the session with the new display name
    await updateSessionUser({
      displayName: updatedUser.displayName,
    });

    return NextResponse.json({
      message: "Display name updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in update display name API:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
