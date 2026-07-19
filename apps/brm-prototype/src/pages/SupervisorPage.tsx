import { Link } from "react-router-dom";
import { usePrototypeStore } from "../state/usePrototypeStore";

export default function SupervisorPage() {
  const s = usePrototypeStore();
  const blueprint = s.getBlueprint();
  const alt = blueprint.alternatives.find((a) => a.id === s.decision?.alternativeId);
  return (
    <section className="panel">
      <span className="eyebrow">Supervisor workspace</span>
      <h2>Review the reasoning journey</h2>
      <p className="notice">
        Supervisor feedback is optional commentary. Journey completion is controlled from the Review
        stage and cannot bypass structural journey requirements.
      </p>
      <div className="summary-grid">
        <article>
          <h3>Initial idea</h3>
          <p>{s.initialIdea || "No idea recorded."}</p>
        </article>
        <article>
          <h3>Student decision</h3>
          <p>
            <strong>{alt?.title ?? "Pending"}</strong>
          </p>
          <p>{s.decision?.justification}</p>
          <p>Confidence: {s.decision?.confidence ?? 0}%</p>
        </article>
      </div>
      <h3>Questions and responses</h3>
      <div className="timeline">
        {blueprint.questions.map((q) => (
          <article key={q.id}>
            <span>{q.stage}</span>
            <h4>{q.text}</h4>
            <p>{s.answers.find((a) => a.questionId === q.id)?.text || "No response"}</p>
          </article>
        ))}
      </div>
      <label>
        Supervisor feedback
        <textarea
          className="large"
          value={s.supervisorFeedback}
          onChange={(e) => s.setSupervisorFeedback(e.target.value)}
          placeholder="Comment on the reasoning, constraints, evidence and next actions."
        />
      </label>
      <div className="actions">
        <Link className="button" to="/journey/REVIEW">
          Open journey review
        </Link>
        <Link className="button primary" to="/record">
          Open Decision Record
        </Link>
      </div>
    </section>
  );
}
