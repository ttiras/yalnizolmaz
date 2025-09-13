import "server-only";
import { createServerNhostClient } from "@/lib/nhost.server";
import { getSession } from "@/lib/auth-session";
import type { NhostClient } from "@nhost/nhost-js";

/**
 * Creates an authenticated Nhost client for server-side operations
 * Handles token refresh automatically
 */
export async function createAuthenticatedNhostClient() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("No authenticated session found");
  }

  const nhost = createServerNhostClient();

  // Prime the client with the session data
  nhost.auth.client.start({
    initialSession: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken || null,
      accessTokenExpiresIn: session.accessTokenExpiresIn || 900,
      user: {
        id: session.user.id,
        email: session.user.email || "",
        displayName: session.user.displayName || "",
        avatarUrl: session.user.avatarUrl || "",
        createdAt: new Date().toISOString(),
        locale: "en",
        isAnonymous: false,
        defaultRole: "user",
        roles: ["user"],
        emailVerified: true,
        phoneNumber: null,
        phoneNumberVerified: false,
        activeMfaType: null,
        metadata: {},
      },
    },
  });

  // Ensure we have a fresh access token (refresh if needed)
  let token = nhost.auth.getAccessToken();
  if (!token) {
    await nhost.auth.refreshSession();
    token = nhost.auth.getAccessToken();
  }

  if (!token) {
    throw new Error("Failed to obtain valid access token");
  }

  // Set the fresh token for GraphQL requests
  nhost.graphql.setAccessToken(token);

  return nhost;
}

/**
 * Helper function to run GraphQL queries as an authenticated user
 */
export async function runAsUser<T = unknown>(
  callback: (nhost: NhostClient) => Promise<{ data?: T; error?: unknown }>,
): Promise<{ data?: T; error?: unknown }> {
  try {
    const nhost = await createAuthenticatedNhostClient();
    return await callback(nhost);
  } catch (error) {
    console.error("Error in runAsUser:", error);
    return { error };
  }
}
