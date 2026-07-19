import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  adjacentJourneyStageId,
  evaluateJourneyStageCompletion,
  formatJourneyProgressLabel,
  isJourneyStageAvailable,
} from "../application/researchJourney";
import { IncompleteResearchJourneyError } from "../application/errors";
import DecisionStageForm from "../components/DecisionStageForm";
import Progress from "../components/Progress";
import {
  RESEARCH_JOURNEY_STAGE_IDS,
  type ResearchJourneyStageId,
  type ResearchSession,
} from "../domain/types";
import { usePrototypeStore } from "../state/usePrototypeStore";

function isStageId(value: string | undefined): value is ResearchJourneyStageId {
  return RESEARCH_JOURNEY_STAGE_IDS.includes(value as ResearchJourneyStageId);
}

export default function JourneyPage() {
  const params = useParams();
  const nav = useNavigate();
  const [completionError, setCompletionError] = useState<string | null>(null);

  const status = usePrototypeStore((s) => s.status);
  const blueprintId = usePrototypeStore((s) => s.blueprintId);
  const profile = usePrototypeStore((s) => s.profile);
  const initialIdea = usePrototypeStore((s) => s.initialIdea);
  const setInitialIdea = usePrototypeStore((s) => s.setInitialIdea);
  const answers = usePrototypeStore((s) => s.answers);
  const saveAnswer = usePrototypeStore((s) => s.saveAnswer);
  const currentQuestionIndex = usePrototypeStore((s) => s.currentQuestionIndex);
  const decision = usePrototypeStore((s) => s.decision);
  const setDecision = usePrototypeStore((s) => s.setDecision);
  const supervisorFeedback = usePrototypeStore((s) => s.supervisorFeedback);
  const completed = usePrototypeStore((s) => s.completed);
  const getBlueprint = usePrototypeStore((s) => s.getBlueprint);
  const getResearchJourneyProgress = usePrototypeStore((s) => s.getResearchJourneyProgress);
  const getResearchJourneyStage = usePrototypeStore((s) => s.getResearchJourneyStage);
  const completeResearchJourney = usePrototypeStore((s) => s.completeResearchJourney);

  const blueprint = getBlueprint();
  const progress = getResearchJourneyProgress();

  if (!params.stageId) {
    return <Navigate to={`/journey/${progress.currentStageId}`} replace />;
  }
  if (!isStageId(params.stageId)) {
    return <Navigate to={`/journey/${progress.currentStageId}`} replace />;
  }

  const viewedStageId = params.stageId;
  if (!isJourneyStageAvailable(progress, viewedStageId)) {
    return <Navigate to={`/journey/${progress.currentStageId}`} replace />;
  }

  const stage = getResearchJourneyStage(viewedStageId);
  const liveSession = {
    id: "ui",
    blueprintId,
    status,
    profile,
    initialIdea,
    answers,
    currentQuestionIndex,
    decision,
    supervisorFeedback,
    completed,
    startedAt: "",
    updatedAt: "",
  } satisfies ResearchSession;

  const completion = evaluateJourneyStageCompletion(stage, liveSession, blueprint);
  const previousId = adjacentJourneyStageId(viewedStageId, "previous");
  const nextId = adjacentJourneyStageId(viewedStageId, "next");
  const stageIndex = RESEARCH_JOURNEY_STAGE_IDS.indexOf(viewedStageId) + 1;
  const questions = stage.questionIds
    .map((id) => blueprint.questions.find((q) => q.id === id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question));

  const answerText = (questionId: string) =>
    answers.find((a) => a.questionId === questionId)?.text ?? "";

  const requiredSatisfied = completion.complete;
  const continueLabel =
    viewedStageId === "REVIEW"
      ? completed
        ? "View Decision Record"
        : "Complete journey"
      : "Continue";

  const onContinue = () => {
    setCompletionError(null);
    if (viewedStageId === "REVIEW") {
      if (completed) {
        nav("/record");
        return;
      }
      try {
        completeResearchJourney();
        nav("/record");
      } catch (error) {
        if (error instanceof IncompleteResearchJourneyError) {
          setCompletionError(
            error.blockingReasons[0] ??
              "Complete the required reflection prompts and decision before finishing.",
          );
          return;
        }
        throw error;
      }
      return;
    }
    if (!requiredSatisfied) {
      setCompletionError(
        completion.blockingReasons[0] ?? "Complete the required prompts for this stage.",
      );
      return;
    }
    if (nextId) {
      nav(`/journey/${nextId}`);
    }
  };

  return (
    <section className="panel journey-stage">
      <Progress
        value={progress.completedStages}
        total={progress.totalStages}
        label={`${formatJourneyProgressLabel(progress, viewedStageId)} · ${stage.title}`}
      />
      <p className="journey-meta">
        <span className="eyebrow">{blueprint.title}</span>
        <span>
          Journey progress: {progress.completedStages} of {progress.totalStages} stages completed (
          {progress.percentComplete}%)
        </span>
      </p>
      <p className="notice">
        Progress measures completed journey steps, not research quality. BRM guides thinking; your
        wording remains your own. You may revise earlier work. The Decision Record captures
        reasoning and does not certify correctness.
      </p>

      <header className="journey-header">
        <span className="eyebrow">
          Stage {stageIndex} of {progress.totalStages}
        </span>
        <h2>{stage.title}</h2>
        <p className="lead">{stage.purpose}</p>
      </header>

      {viewedStageId === "ORIENTATION" && stage.learningObjectives && (
        <div className="journey-objectives">
          <h3>By the end of this journey you should be able to:</h3>
          <ul>
            {stage.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
          <p>
            BRM is a research mentoring tool. It guides thinking rather than writing your topic,
            proposal, or justification for you.
          </p>
        </div>
      )}

      {viewedStageId === "CONTEXT" && (
        <label>
          What would you like to investigate?
          <textarea
            className="large"
            value={initialIdea}
            onChange={(e) => setInitialIdea(e.target.value)}
            placeholder="Describe the business issue in your own words."
          />
        </label>
      )}

      {viewedStageId === "PROBLEM_FORMULATION" && (
        <aside className="notice">
          <strong>Problem formulation focus</strong>
          <p>
            Distinguish a broad topic or interest, a practical business issue, a researchable
            business problem, supporting evidence, and a possible research-question direction. BRM
            will not generate the problem for you.
          </p>
        </aside>
      )}

      {viewedStageId === "ALTERNATIVE_EXAMINATION" && (
        <div className="cards">
          {blueprint.alternatives.map((alternative) => (
            <article className="alternative" key={alternative.id}>
              <h3>{alternative.title}</h3>
              <p>{alternative.description}</p>
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
            </article>
          ))}
        </div>
      )}

      {viewedStageId === "DECISION" && (
        <DecisionStageForm
          key="decision-stage-editor"
          alternatives={blueprint.alternatives}
          initialDecision={decision}
          onPrevious={() => {
            if (previousId) nav(`/journey/${previousId}`);
          }}
          onSaveAndContinue={(nextDecision) => {
            // Persist first; only navigate after the application path accepts the decision.
            setDecision(nextDecision);
            const progressAfterSave = getResearchJourneyProgress();
            if (progressAfterSave.currentStageId !== "REFLECTION") {
              throw new Error(
                "The decision was saved but Stage 7 is not yet available. Complete all Decision fields and try again.",
              );
            }
            nav("/journey/REFLECTION");
          }}
        />
      )}

      {viewedStageId !== "DECISION" &&
        questions.map((question) => (
          <label key={question.id}>
            {question.text}
            <textarea
              className="large"
              value={answerText(question.id)}
              onChange={(e) => saveAnswer(question.id, e.target.value)}
              placeholder="Explain your thinking in your own words."
            />
            <details>
              <summary>Why this matters</summary>
              <p>{question.rationale}</p>
            </details>
          </label>
        ))}

      {viewedStageId === "REVIEW" && (
        <div className="journey-review summary-grid">
          <article>
            <h3>Initial research context</h3>
            <p>{initialIdea || "Not recorded."}</p>
            <p>{answerText("Q1") || "Motivation not recorded."}</p>
            <p>{answerText("Q3") || "Stakeholders not recorded."}</p>
          </article>
          <article>
            <h3>Formulated problem</h3>
            <p>{answerText("Q2") || "Problem not recorded."}</p>
            <p>{answerText("Q4") || "Evidence not recorded."}</p>
          </article>
          <article>
            <h3>Important constraints</h3>
            <p>{answerText("Q5")}</p>
            <p>{answerText("Q6")}</p>
            <p>{answerText("Q7")}</p>
            <p>{answerText("Q8")}</p>
          </article>
          <article>
            <h3>Alternatives considered</h3>
            <ul>
              {blueprint.alternatives.map((alternative) => (
                <li key={alternative.id}>
                  <strong>{alternative.title}</strong> — {alternative.description}
                </li>
              ))}
            </ul>
            <p>{answerText("Q9")}</p>
            <p>{answerText("Q15")}</p>
          </article>
          <article>
            <h3>Selected direction</h3>
            <p>
              {blueprint.alternatives.find((a) => a.id === decision?.alternativeId)?.title ??
                "Pending"}
            </p>
            <p>{decision?.justification}</p>
            <p>Confidence: {decision?.confidence ?? 0}%</p>
          </article>
          <article>
            <h3>Reflection</h3>
            <p>{answerText("Q10")}</p>
            <p>{answerText("Q11")}</p>
            <p>
              <strong>Unresolved uncertainty:</strong> {answerText("Q12")}
            </p>
            <p>
              <strong>Evidence still needed:</strong> {answerText("Q13")}
            </p>
            <p>
              <strong>Next research action:</strong> {answerText("Q14")}
            </p>
          </article>
        </div>
      )}

      {viewedStageId !== "DECISION" &&
        (completionError || (!requiredSatisfied && completion.blockingReasons[0])) && (
          <p className="journey-blocking" role="alert">
            {completionError ?? completion.blockingReasons[0]}
          </p>
        )}

      {viewedStageId !== "DECISION" && (
        <div className="actions">
          {previousId ? (
            <button className="button" type="button" onClick={() => nav(`/journey/${previousId}`)}>
              Previous
            </button>
          ) : (
            <Link className="button" to="/welcome">
              Home
            </Link>
          )}
          <button
            className="button primary"
            type="button"
            onClick={onContinue}
            disabled={viewedStageId !== "REVIEW" && !requiredSatisfied}
          >
            {continueLabel}
          </button>
        </div>
      )}
    </section>
  );
}
