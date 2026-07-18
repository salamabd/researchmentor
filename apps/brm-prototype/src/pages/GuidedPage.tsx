import { useNavigate } from "react-router-dom";
import { bp001 } from "../blueprints/BP-001/blueprint";
import { usePrototypeStore } from "../state/usePrototypeStore";
import Progress from "../components/Progress";
export default function GuidedPage() {
  const i = usePrototypeStore((s) => s.currentQuestionIndex);
  const answers = usePrototypeStore((s) => s.answers);
  const save = usePrototypeStore((s) => s.saveAnswer);
  const next = usePrototypeStore((s) => s.nextQuestion);
  const prev = usePrototypeStore((s) => s.previousQuestion);
  const nav = useNavigate();
  const q = bp001.questions[Math.min(i, bp001.questions.length - 1)];
  const current = answers.find((a) => a.questionId === q.id)?.text ?? "";
  const final = i >= bp001.questions.length - 1;
  return (
    <section className="panel">
      <Progress value={i + 1} total={bp001.questions.length} label={q.stage} />
      <div className="question-card">
        <span className="eyebrow">Current mentoring question</span>
        <h2>{q.text}</h2>
        <details>
          <summary>Why this matters</summary>
          <p>{q.rationale}</p>
        </details>
        <label>
          Your response
          <textarea
            className="large"
            value={current}
            onChange={(e) => save(q.id, e.target.value)}
            placeholder="Explain your thinking rather than aiming for a perfect answer."
          />
        </label>
        <div className="reflection-box">
          <strong>Prototype reflection</strong>
          <p>
            BRM would later analyse ambiguity, evidence, assumptions, scope and feasibility here.
            BUILD-001 keeps this deterministic so we can first test the experience.
          </p>
        </div>
        <div className="actions">
          <button className="button" disabled={i === 0} onClick={prev}>
            Previous
          </button>
          {final ? (
            <button
              className="button primary"
              disabled={current.trim().length < 10}
              onClick={() => nav("/decision")}
            >
              Review directions
            </button>
          ) : (
            <button className="button primary" disabled={current.trim().length < 10} onClick={next}>
              Next question
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
