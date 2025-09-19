"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold text-red-600">Bir hata oluştu</h2>
              <p className="text-muted-foreground mb-4">
                Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
