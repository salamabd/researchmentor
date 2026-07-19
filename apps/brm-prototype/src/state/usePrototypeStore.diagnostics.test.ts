import { describe, expect, it } from "vitest";
import { usePrototypeStore } from "./usePrototypeStore";

/**
 * Lightweight Zustand verification for BUILD-005.
 * Full React banner rendering is covered by formatSessionDiagnosticsBanner unit tests;
 * component DOM automation is intentionally omitted.
 */
describe("usePrototypeStore diagnostics delegation", () => {
  it("exposes getSessionDiagnostics and returns an application-layer report", () => {
    usePrototypeStore.getState().reset();
    const getSessionDiagnostics = usePrototypeStore.getState().getSessionDiagnostics;
    expect(typeof getSessionDiagnostics).toBe("function");
    const report = getSessionDiagnostics();
    expect(report).toEqual({
      diagnostics: [],
      hasErrors: false,
      hasWarnings: false,
    });
  });
});
