import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { usePrototypeStore } from "../state/usePrototypeStore";
import JourneyPage from "./JourneyPage";

function seedThroughAlternativeExamination() {
  const store = usePrototypeStore.getState();
  store.reset();
  store.setInitialIdea("Staff retention in retail");
  const answers: Array<[string, string]> = [
    ["ORIENTATION_ACK", "Ready"],
    ["Q1", "m"],
    ["Q3", "s"],
    ["Q2", "p"],
    ["Q4", "e"],
    ["Q5", "a"],
    ["Q6", "b"],
    ["Q7", "c"],
    ["Q8", "d"],
    ["Q9", "contrib"],
    ["Q15", "trade-offs"],
  ];
  for (const [questionId, text] of answers) {
    usePrototypeStore.getState().saveAnswer(questionId, text);
  }
}

function renderProductionJourney(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/journey/:stageId" element={<JourneyPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

function selectAlternativeById(id: string) {
  const titles: Record<string, string> = {
    A: "Narrow organisational case",
    B: "Cross-sectional industry study",
    C: "Focused stakeholder study",
  };
  const radio = screen.getByRole("radio", { name: titles[id] });
  fireEvent.click(radio);
  return radio;
}

describe("JourneyPage Decision stage integration", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    seedThroughAlternativeExamination();
    expect(usePrototypeStore.getState().getResearchJourneyProgress().currentStageId).toBe(
      "DECISION",
    );
    expect(usePrototypeStore.getState().getResearchJourneyProgress().completedStages).toBe(5);
  });

  it(
    "persists Focused stakeholder study (C), advances progress to 6 of 8, and opens Reflection",
    () => {
      renderProductionJourney("/journey/DECISION");

      const radio = selectAlternativeById("C");
      expect(radio).toBeChecked();

      const justification =
        "Focused stakeholder study matches my access and keeps analytical scope controlled for this dissertation.";
      fireEvent.change(
        screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
        { target: { value: justification } },
      );
      fireEvent.change(screen.getByLabelText(/confidence/i), { target: { value: "70" } });

      const continueButton = screen.getByRole("button", { name: /^continue$/i });
      expect(continueButton).toBeEnabled();
      fireEvent.click(continueButton);

      expect(usePrototypeStore.getState().decision).toEqual({
        alternativeId: "C",
        justification,
        confidence: 70,
      });
      expect(typeof usePrototypeStore.getState().decision?.confidence).toBe("number");

      const progress = usePrototypeStore.getState().getResearchJourneyProgress();
      expect(progress.completedStages).toBe(6);
      expect(progress.currentStageId).toBe("REFLECTION");
      expect(screen.getByRole("heading", { level: 2, name: /^reflection$/i })).toBeInTheDocument();

      const record = usePrototypeStore.getState().createDecisionRecord();
      expect(record.decision?.alternativeId).toBe("C");
      expect(record.selectedDirection?.id).toBe("C");
      expect(Object.keys(record).sort()).toEqual(
        [
          "answers",
          "blueprint",
          "completed",
          "decision",
          "exportedAt",
          "initialIdea",
          "profile",
          "selectedDirection",
          "supervisorFeedback",
        ].sort(),
      );
    },
    15000,
  );

  it("does not leave Decision when save is rejected", () => {
    const original = usePrototypeStore.getState().setDecision;
    usePrototypeStore.setState({
      setDecision: () => {
        throw new Error('Alternative "Z" is not valid for blueprint "BP-001"');
      },
    });

    try {
      renderProductionJourney("/journey/DECISION");
      selectAlternativeById("C");
      fireEvent.change(
        screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
        { target: { value: "Justification that should not navigate when save fails." } },
      );
      fireEvent.click(screen.getByRole("button", { name: /^continue$/i }));

      expect(screen.getByRole("heading", { level: 2, name: /^decision$/i })).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/not valid for blueprint/i);
    } finally {
      usePrototypeStore.setState({ setDecision: original });
    }
  });

  it("loads a previously saved decision when revisiting Stage 6", () => {
    usePrototypeStore.getState().setDecision({
      alternativeId: "B",
      justification: "Comparative insight is appropriate here",
      confidence: 70,
    });

    renderProductionJourney("/journey/DECISION");
    expect(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
    ).toHaveValue("Comparative insight is appropriate here");
    expect(selectAlternativeById("B")).toBeChecked();
  });
});
