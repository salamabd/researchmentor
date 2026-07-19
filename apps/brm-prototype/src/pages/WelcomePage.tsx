import { Link } from "react-router-dom";
import { usePrototypeStore } from "../state/usePrototypeStore";

export default function WelcomePage() {
  const reset = usePrototypeStore((s) => s.reset);
  const getResearchJourneyProgress = usePrototypeStore((s) => s.getResearchJourneyProgress);
  const recommended = getResearchJourneyProgress().currentStageId;

  return (
    <section className="hero">
      <span className="eyebrow">Not an AI writing assistant</span>
      <h2>Think like a researcher.</h2>
      <p>
        BRM guides you through one research decision as an explicit staged learning journey. The
        prototype helps you choose and justify a research topic without writing it for you.
      </p>
      <div className="actions">
        <Link className="button primary" to="/journey/ORIENTATION">
          Start research journey
        </Link>
        <Link className="button" to={`/journey/${recommended}`}>
          Continue saved session
        </Link>
        <Link className="button" to="/profile">
          Edit student profile
        </Link>
        <button className="button ghost" onClick={reset}>
          Reset prototype
        </button>
      </div>
      <div className="principles">
        <article>
          <h3>Student-owned</h3>
          <p>You make the decision and write the justification.</p>
        </article>
        <article>
          <h3>Blueprint-guided</h3>
          <p>Eight educational stages structure the reasoning process.</p>
        </article>
        <article>
          <h3>Supervisor-visible</h3>
          <p>The reasoning path is preserved for review.</p>
        </article>
      </div>
    </section>
  );
}
