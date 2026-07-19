import { useState } from "react";
import type { Alternative, Decision } from "../domain/types";

/** Structural decision policy (BUILD-006): non-empty trimmed justification. */
export function isDecisionDraftStructurallyValid(draft: {
  alternativeId: string;
  justification: string;
  confidence: number | string;
}): boolean {
  const confidence = Number(draft.confidence);
  return (
    draft.alternativeId.trim().length > 0 &&
    draft.justification.trim().length > 0 &&
    Number.isFinite(confidence) &&
    confidence >= 0 &&
    confidence <= 100
  );
}

interface DecisionStageFormProps {
  alternatives: Alternative[];
  initialDecision?: Decision;
  onPrevious: () => void;
  onSaveAndContinue: (decision: Decision) => void;
}

/**
 * Local decision draft editor for Stage 6.
 * Partial edits stay in component state until Continue persists via the application path.
 */
export default function DecisionStageForm({
  alternatives,
  initialDecision,
  onPrevious,
  onSaveAndContinue,
}: DecisionStageFormProps) {
  const [alternativeId, setAlternativeId] = useState(initialDecision?.alternativeId ?? "");
  const [justification, setJustification] = useState(initialDecision?.justification ?? "");
  const [confidence, setConfidence] = useState<number>(Number(initialDecision?.confidence ?? 60));
  const [error, setError] = useState<string | null>(null);

  const confidenceNumber = Number(confidence);
  const canContinue = isDecisionDraftStructurallyValid({
    alternativeId,
    justification,
    confidence: confidenceNumber,
  });

  const handleContinue = () => {
    const payload: Decision = {
      alternativeId: alternativeId.trim(),
      justification: justification.trim(),
      confidence: confidenceNumber,
    };

    if (!isDecisionDraftStructurallyValid(payload)) {
      setError(
        !payload.alternativeId
          ? "Select a research direction before continuing."
          : !payload.justification
            ? "Provide a justification for your selected direction."
            : "Record a valid confidence value between 0 and 100.",
      );
      return;
    }

    try {
      setError(null);
      onSaveAndContinue(payload);
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : "The decision could not be saved. Check your selection and try again.";
      setError(message);
    }
  };

  return (
    <div className="decision-stage-form">
      <div className="cards" role="radiogroup" aria-label="Research direction">
        {alternatives.map((alternative) => {
          const selected = alternativeId === alternative.id;
          return (
            <label key={alternative.id} className={`alternative ${selected ? "selected" : ""}`}>
              <input
                type="radio"
                name="research-direction"
                value={alternative.id}
                checked={selected}
                aria-label={alternative.title}
                onChange={() => setAlternativeId(alternative.id)}
              />
              <span className="alternative-title" aria-hidden="true">
                {alternative.title}
              </span>
              <span className="alternative-body">
                <span className="alternative-description">{alternative.description}</span>
                <strong>Strengths</strong>
                <ul>
                  {alternative.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <strong>Risks</strong>
                <ul>
                  {alternative.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </span>
            </label>
          );
        })}
      </div>

      <label htmlFor="decision-justification">
        Why is this direction most appropriate for your study?
        <textarea
          id="decision-justification"
          className="large"
          rows={6}
          value={justification}
          onChange={(event) => setJustification(event.target.value)}
          placeholder="Explain your reasoning in your own words."
        />
      </label>

      <label htmlFor="decision-confidence">
        Confidence: {confidenceNumber}%
        <input
          id="decision-confidence"
          type="range"
          min={0}
          max={100}
          step={5}
          value={Number.isFinite(confidenceNumber) ? confidenceNumber : 60}
          onChange={(event) => setConfidence(Number(event.target.value))}
        />
      </label>

      {error && (
        <p className="journey-blocking" role="alert">
          {error}
        </p>
      )}

      <div className="actions">
        <button className="button" type="button" onClick={onPrevious}>
          Previous
        </button>
        <button
          className="button primary"
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          aria-disabled={!canContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
