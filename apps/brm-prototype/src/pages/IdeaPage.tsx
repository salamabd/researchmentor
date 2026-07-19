import { useNavigate } from "react-router-dom";
import { usePrototypeStore } from "../state/usePrototypeStore";
export default function IdeaPage() {
  const idea = usePrototypeStore((s) => s.initialIdea);
  const setIdea = usePrototypeStore((s) => s.setInitialIdea);
  const nav = useNavigate();
  return (
    <section className="panel">
      <span className="eyebrow">Step 2</span>
      <h2>Your initial research idea</h2>
      <p>Describe the business issue in your own words. BRM will not rewrite it.</p>
      <label>
        What would you like to investigate?
        <textarea
          className="large"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Example: I am interested in why experienced employees leave small technology firms..."
        />
      </label>
      <aside className="notice">
        <strong>Student ownership:</strong> your original wording is preserved throughout the
        journey.
      </aside>
      <div className="actions">
        <button
          className="button primary"
          disabled={idea.trim().length === 0}
          onClick={() => nav("/journey/CONTEXT")}
        >
          Continue to Context stage
        </button>
      </div>
    </section>
  );
}
