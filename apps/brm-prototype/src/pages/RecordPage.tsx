import { usePrototypeStore } from "../state/usePrototypeStore";

export default function RecordPage() {
  const s = usePrototypeStore();
  const blueprint = s.getBlueprint();
  const alt = blueprint.alternatives.find((a) => a.id === s.decision?.alternativeId);
  const exportRecord = () => {
    const data = s.createDecisionRecord();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BRM_BP-001_Decision_Record.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="panel record">
      <span className="eyebrow">Research Decision Record</span>
      <h2>{alt?.title ?? "Decision pending"}</h2>
      <p className="lead">{s.decision?.justification}</p>
      <div className="summary-grid">
        <article>
          <h3>Original idea</h3>
          <p>{s.initialIdea}</p>
        </article>
        <article>
          <h3>Decision confidence</h3>
          <p className="score">{s.decision?.confidence ?? 0}%</p>
        </article>
        <article>
          <h3>Supervisor feedback</h3>
          <p>{s.supervisorFeedback || "Pending"}</p>
        </article>
        <article>
          <h3>Learning evidence</h3>
          <p>{s.answers.length} mentoring responses recorded.</p>
        </article>
      </div>
      <h3>Reasoning trail</h3>
      <div className="timeline">
        {blueprint.questions.map((q) => (
          <article key={q.id}>
            <span>{q.stage}</span>
            <h4>{q.text}</h4>
            <p>{s.answers.find((a) => a.questionId === q.id)?.text}</p>
          </article>
        ))}
      </div>
      <div className="actions">
        <button className="button primary" onClick={exportRecord}>
          Export JSON record
        </button>
      </div>
    </section>
  );
}
