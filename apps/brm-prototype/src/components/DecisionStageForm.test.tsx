import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { bp001 } from "../blueprints/BP-001/blueprint";
import DecisionStageForm, { isDecisionDraftStructurallyValid } from "./DecisionStageForm";

describe("DecisionStageForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("maps Focused stakeholder study to domain alternative id C", () => {
    const onSaveAndContinue = vi.fn();
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={onSaveAndContinue}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Focused stakeholder study" });
    fireEvent.click(radio);
    expect(radio).toBeChecked();
    expect(radio).toHaveAttribute("value", "C");

    fireEvent.change(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
      {
        target: {
          value:
            "This direction concentrates on one stakeholder group with a clearly defined outcome.",
        },
      },
    );
    fireEvent.change(screen.getByLabelText(/confidence/i), { target: { value: "70" } });
    expect(screen.getByRole("button", { name: /^continue$/i })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: /^continue$/i }));

    expect(onSaveAndContinue).toHaveBeenCalledWith({
      alternativeId: "C",
      justification:
        "This direction concentrates on one stakeholder group with a clearly defined outcome.",
      confidence: 70,
    });
    expect(typeof onSaveAndContinue.mock.calls[0]?.[0]?.confidence).toBe("number");
  });

  it("accepts justification typing before an alternative is selected and keeps the text visible", () => {
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={() => undefined}
      />,
    );

    const justification = screen.getByRole("textbox", {
      name: /why is this direction most appropriate/i,
    });
    const typed =
      "This direction offers the strongest balance between feasibility and analytical focus.";
    fireEvent.change(justification, { target: { value: typed } });
    expect(justification).toHaveValue(typed);
  });

  it("selecting anywhere on the alternative card sets the domain id without clearing justification", () => {
    const { container } = render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={() => undefined}
      />,
    );
    const view = within(container);
    const justification = view.getByRole("textbox", {
      name: /why is this direction most appropriate/i,
    });
    fireEvent.change(justification, { target: { value: "Keep this text" } });

    const card = view.getByText(/compare the issue across several organisations/i).closest("label");
    expect(card).toBeTruthy();
    fireEvent.click(card!);

    expect(view.getByRole("radio", { name: "Cross-sectional industry study" })).toBeChecked();
    expect(justification).toHaveValue("Keep this text");
  });

  it("displays an existing saved justification when Stage 6 is revisited", () => {
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        initialDecision={{
          alternativeId: "A",
          justification: "Saved organisational case justification",
          confidence: 75,
        }}
        onPrevious={() => undefined}
        onSaveAndContinue={() => undefined}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
    ).toHaveValue("Saved organisational case justification");
    expect(screen.getByRole("radio", { name: "Narrow organisational case" })).toBeChecked();
  });

  it("does not erase justification when changing confidence, and coerces confidence to a number", () => {
    const onSaveAndContinue = vi.fn();
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={onSaveAndContinue}
      />,
    );

    fireEvent.click(screen.getByRole("radio", { name: "Narrow organisational case" }));
    const justification = screen.getByRole("textbox", {
      name: /why is this direction most appropriate/i,
    });
    fireEvent.change(justification, { target: { value: "Keep this text" } });
    fireEvent.change(screen.getByLabelText(/confidence/i), { target: { value: "80" } });
    expect(justification).toHaveValue("Keep this text");

    fireEvent.click(screen.getByRole("button", { name: /^continue$/i }));
    expect(onSaveAndContinue).toHaveBeenCalledWith({
      alternativeId: "A",
      justification: "Keep this text",
      confidence: 80,
    });
  });

  it("enables Continue only for a structurally valid draft", () => {
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={() => undefined}
      />,
    );
    const continueButton = screen.getByRole("button", { name: /^continue$/i });
    expect(continueButton).toBeDisabled();

    fireEvent.change(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
      { target: { value: "Justification without a direction" } },
    );
    expect(continueButton).toBeDisabled();

    fireEvent.click(screen.getByRole("radio", { name: "Narrow organisational case" }));
    expect(continueButton).toBeEnabled();

    fireEvent.change(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
      { target: { value: "   " } },
    );
    expect(continueButton).toBeDisabled();
  });

  it("does not navigate when save throws and surfaces the error", () => {
    const onSaveAndContinue = vi.fn(() => {
      throw new Error('Alternative "Z" is not valid for blueprint "BP-001"');
    });
    render(
      <DecisionStageForm
        alternatives={bp001.alternatives}
        onPrevious={() => undefined}
        onSaveAndContinue={onSaveAndContinue}
      />,
    );

    fireEvent.click(screen.getByRole("radio", { name: "Focused stakeholder study" }));
    fireEvent.change(
      screen.getByRole("textbox", { name: /why is this direction most appropriate/i }),
      { target: { value: "Valid local draft" } },
    );
    fireEvent.click(screen.getByRole("button", { name: /^continue$/i }));

    expect(onSaveAndContinue).toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/not valid for blueprint/i);
  });

  it("treats string confidence values as numeric for structural validity", () => {
    expect(
      isDecisionDraftStructurallyValid({
        alternativeId: "C",
        justification: "Enough",
        confidence: "70" as unknown as number,
      }),
    ).toBe(true);
  });
});
