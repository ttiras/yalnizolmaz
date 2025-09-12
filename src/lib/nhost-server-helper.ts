import "server-only";
import { createServerNhostClient } from "@/lib/nhost.server";
import { getSession } from "@/lib/auth-session";

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
      refreshToken: session.refreshToken,
      accessTokenExpiresIn: session.accessTokenExpiresIn,
      user: session.user,
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
  callback: (nhost: unknown) => Promise<{ data?: T; error?: unknown }>,
): Promise<{ data?: T; error?: unknown }> {
  try {
    const nhost = await createAuthenticatedNhostClient();
    return await callback(nhost);
  } catch (error) {
    console.error("Error in runAsUser:", error);
    return { error };
  }
}
