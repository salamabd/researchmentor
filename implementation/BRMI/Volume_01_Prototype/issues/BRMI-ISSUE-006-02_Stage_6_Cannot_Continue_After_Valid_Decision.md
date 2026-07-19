# BRMI-ISSUE-006-02 — Stage 6 Cannot Continue After Valid Decision

**Status:** Resolved  
**Related Build:** BRMI-BUILD-006  
**Depends On:** BRMI-ISSUE-006-01  
**Date resolved:** 2026-07-19  

## Root cause

Two compounding UI/state issues:

1. **Incomplete selection target** — Only the radio/`title` fragment was wrapped in `<label>`, while CSS marked the entire alternative card as `cursor: pointer`. Clicks on description, strengths, or risks did not set `alternativeId`, so `canContinue` stayed false and Continue remained disabled even after the student believed a direction was selected.

2. **Fragile confidence typing** — Range inputs emit strings. Validation now coerces with `Number(...)` so values such as `"70"` cannot fail `Number.isFinite` checks. Save always persists `confidence` as a number.

Save/navigation was also hardened: persist via `setDecision` first, confirm journey progress advances to `REFLECTION`, then navigate; surface application errors without leaving Stage 6.

## Validation rule confirmed

BUILD-006 structural policy (unchanged):

- non-empty `alternativeId`
- non-empty trimmed `justification`
- finite `confidence` in `0..100`

Authoritative evaluator: `hasValidJourneyDecision` / `isDecisionDraftStructurallyValid`.

## Selected alternative ID

Visible title **Focused stakeholder study** → domain id **`C`**.

## Confidence runtime type

Persisted as `number` (coerced from the range input).

## Files changed

- `apps/brm-prototype/src/components/DecisionStageForm.tsx`
- `apps/brm-prototype/src/components/DecisionStageForm.test.tsx`
- `apps/brm-prototype/src/pages/JourneyPage.tsx`
- `apps/brm-prototype/src/pages/JourneyPage.decision.test.tsx`
- `apps/brm-prototype/src/styles/global.css`
- this issue note

## Contracts preserved

- Decision Record fields/filename unchanged
- LocalStorage key `brm.prototype.v1` unchanged
- BUILD-005 diagnostics unchanged
- No journey metadata / alternative content changes

## Verification

- Automated: Focused stakeholder study → save `{ alternativeId: "C", ... }` → progress 6/8 → Reflection heading
- Production build: success
- Commit: not created
