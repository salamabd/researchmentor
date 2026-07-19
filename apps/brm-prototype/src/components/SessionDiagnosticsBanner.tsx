import { formatSessionDiagnosticsBanner } from "../application/sessionDiagnostics";
import { usePrototypeStore } from "../state/usePrototypeStore";

export default function SessionDiagnosticsBanner() {
  // Re-render when session fields that affect diagnostics change (on-demand evaluation).
  usePrototypeStore((s) => s.blueprintId);
  usePrototypeStore((s) => s.answers);
  usePrototypeStore((s) => s.currentQuestionIndex);
  usePrototypeStore((s) => s.decision);
  usePrototypeStore((s) => s.completed);

  const getSessionDiagnostics = usePrototypeStore((s) => s.getSessionDiagnostics);
  const report = getSessionDiagnostics();
  const banner = formatSessionDiagnosticsBanner(report);
  if (!banner) return null;

  return (
    <aside className="diagnostics-banner" role="status" aria-live="polite">
      <strong>{banner.summary}</strong>
      <p>{banner.detail}</p>
    </aside>
  );
}
