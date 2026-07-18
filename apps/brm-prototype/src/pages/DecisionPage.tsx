import { useNavigate } from "react-router-dom";
import { mockAlternatives } from "../blueprints/BP-001/blueprint";
import { usePrototypeStore } from "../state/usePrototypeStore";
export default function DecisionPage() {
  const decision = usePrototypeStore((s) => s.decision);
  const setDecision = usePrototypeStore((s) => s.setDecision);
  const nav = useNavigate();
  const id = decision?.alternativeId ?? "";
  const justification = decision?.justification ?? "";
  const confidence = decision?.confidence ?? 60;
  const update = (
    v: Partial<{ alternativeId: string; justification: string; confidence: number }>,
  ) =>
    setDecision({
      alternativeId: v.alternativeId ?? id,
      justification: v.justification ?? justification,
      confidence: v.confidence ?? confidence,
    });
  return (
    <section className="panel">
      <span className="eyebrow">Step 4</span>
      <h2>Compare possible research directions</h2>
      <p>
        These are not answers. They are contrasting directions designed to make trade-offs visible.
      </p>
      <div className="cards">
        {mockAlternatives.map((a) => (
          <label className={`alternative ${id === a.id ? "selected" : ""}`} key={a.id}>
            <input
              type="radio"
              name="alt"
              checked={id === a.id}
              onChange={() => update({ alternativeId: a.id })}
            />
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <strong>Strengths</strong>
            <ul>
              {a.strengths.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <strong>Risks</strong>
            <ul>
              {a.risks.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </label>
        ))}
      </div>
      <label>
        Why is this direction most appropriate for your study?
        <textarea
          className="large"
          value={justification}
          onChange={(e) => update({ justification: e.target.value })}
        />
      </label>
      <label>
        Confidence: {confidence}%
        <input
          type="range"
          min="0"
          max="100"
          value={confidence}
          onChange={(e) => update({ confidence: Number(e.target.value) })}
        />
      </label>
      <div className="actions">
        <button
          className="button primary"
          disabled={!id || justification.trim().length < 30}
          onClick={() => nav("/supervisor")}
        >
          Submit for supervisor review
        </button>
      </div>
    </section>
  );
}
