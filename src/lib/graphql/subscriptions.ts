"use client";

import {
  createClient,
  type Client,
  type SubscribePayload,
  type FormattedExecutionResult,
} from "graphql-ws";

let wsClient: Client | null = null;
let currentToken: string | null = null;

function getWsGraphqlUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL;
  if (explicit) {
    // Replace http/https with ws/wss
    try {
      const u = new URL(explicit);
      u.protocol = u.protocol === "http:" ? "ws:" : "wss:";
      return u.toString();
    } catch {
      // Fallback to explicit as-is; caller should ensure correctness
      return explicit.replace(/^http/, "ws");
    }
  }

  const sub = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "local";
  const region = process.env.NEXT_PUBLIC_NHOST_REGION || "local";
  if (sub === "local" || region === "local") {
    return "wss://local.hasura.local.nhost.run/v1/graphql";
  }
  return `wss://${sub}.hasura.${region}.nhost.run/v1/graphql`;
}

function ensureClient(token: string | null): Client {
  const normalized = token || null;
  if (!wsClient || currentToken !== normalized) {
    // Dispose previous client if token changed
    try {
      wsClient?.dispose();
    } catch {}
    currentToken = normalized;
    wsClient = createClient({
      url: getWsGraphqlUrl(),
      connectionParams: () => {
        const headers: Record<string, string> = {};
        if (normalized) headers["Authorization"] = `Bearer ${normalized}`;
        return { headers };
      },
      keepAlive: 12_000,
      retryAttempts: 10,
      shouldRetry: () => true,
    });
  }
  return wsClient as Client;
}

export type UnsubscribeFn = () => void;

export function subscribeGraphql<TData = unknown>(
  payload: SubscribePayload & { token?: string | null },
  handlers: {
    next: (data: FormattedExecutionResult<TData>) => void;
    error?: (err: unknown) => void;
    complete?: () => void;
  },
): UnsubscribeFn {
  const client = ensureClient(payload.token ?? null);
  let disposed = false;
  const dispose = client.subscribe<TData>(
    { query: payload.query, variables: payload.variables },
    {
      next: (value) => handlers.next(value as FormattedExecutionResult<TData>),
      error: (err) => handlers.error?.(err),
      complete: () => handlers.complete?.(),
    },
  );
  return () => {
    if (!disposed) {
      disposed = true;
      try {
        dispose();
      } catch {}
    }
  };
}

// Message subscription documents
export const RecentMessagesSubscription = /* GraphQL */ `
  subscription RecentMessages($userId: uuid!, $limit: Int! = 50, $offset: Int! = 0) {
    messages(
      where: { _or: [{ sender_id: { _eq: $userId } }, { recipient_id: { _eq: $userId } }] }
      order_by: { created_at: desc }
      limit: $limit
      offset: $offset
    ) {
      id
      created_at
      body
      sender_id
      recipient_id
      sender {
        id
        displayName
        avatarUrl
      }
      receiver {
        id
        displayName
        avatarUrl
      }
    }
  }
`;

export const ThreadMessagesSubscription = /* GraphQL */ `
  subscription ThreadMessages(
    $userId: uuid!
    $otherId: uuid!
    $limit: Int! = 50
    $offset: Int! = 0
  ) {
    messages(
      where: {
        _or: [
          { sender_id: { _eq: $userId }, recipient_id: { _eq: $otherId } }
          { sender_id: { _eq: $otherId }, recipient_id: { _eq: $userId } }
        ]
      }
      order_by: { created_at: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      created_at
      body
      sender_id
      recipient_id
      sender {
        id
        displayName
        avatarUrl
      }
      receiver {
        id
        displayName
        avatarUrl
      }
    }
  }
`;

export const TypingSubscription = /* GraphQL */ `
  subscription OnTyping($userId: uuid!, $otherId: uuid!) {
    message_typing(
      where: {
        sender_id: { _eq: $otherId }
        recipient_id: { _eq: $userId }
        is_typing: { _eq: true }
      }
      order_by: { updated_at: desc }
      limit: 1
    ) {
      sender_id
      recipient_id
      is_typing
      updated_at
    }
  }
`;

export const PresenceSubscription = /* GraphQL */ `
  subscription OnPresence($userId: uuid!) {
    users(where: { id: { _eq: $userId } }) {
      id
      lastSeen
    }
  }
`;

export const TypingPresenceSubscription = /* GraphQL */ `
  subscription OnTypingPresence($userId: uuid!, $otherId: uuid!) {
    message_typing(
      where: { sender_id: { _eq: $otherId }, recipient_id: { _eq: $userId } }
      order_by: { updated_at: desc }
      limit: 1
    ) {
      is_typing
      updated_at
    }
  }
`;
