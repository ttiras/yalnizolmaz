#!/bin/bash
set -e

echo "Running GraphQL code generator..."
pnpm graphql-codegen --config codegen.ts

GENERATED_FILE="src/lib/graphql/__generated__/graphql.ts"

if [ -f "$GENERATED_FILE" ]; then
  echo "Fixing import in $GENERATED_FILE..."
  sed -i -e 's/import type { useAuthenticatedFetcher }/import { useAuthenticatedFetcher }/g' "$GENERATED_FILE" || true
  echo "Import fixed (if present)."
else
  echo "Generated file not found at $GENERATED_FILE"
fi


