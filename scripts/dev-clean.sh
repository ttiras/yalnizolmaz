#!/bin/bash

echo "🧹 Cleaning development cache..."

# Kill any existing Next.js processes
pkill -f "next dev" || true

# Clean Next.js cache
rm -rf .next

# Clean node modules cache
rm -rf node_modules/.cache

# Clean any lock files that might be causing issues
rm -rf pnpm-lock.yaml

echo "📦 Reinstalling dependencies..."
pnpm install

echo "🚀 Starting development server..."
pnpm dev
