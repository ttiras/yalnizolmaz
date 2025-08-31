import "@testing-library/jest-dom";

// Mock IntersectionObserver for JSDOM
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// jsdom globals
(
  globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }
).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

(window as unknown as { scrollTo: () => void }).scrollTo = () => {};
