# BRMI-ISSUE-006-01 — Stage 6 Decision Justification Field Is Non-Editable

**Status:** Resolved  
**Related Build:** BRMI-BUILD-006  
**Date resolved:** 2026-07-19  

## Root cause

On `/journey/DECISION`, the justification textarea was a controlled input bound to `session.decision`, updated only through `updateDecision`.

That helper required a non-empty `alternativeId` before calling `setDecision` / `saveDecision`:

```ts
if (!alternativeId) return;
```

Typing in the justification field before selecting a direction therefore performed no state update, so the controlled `value` remained `""` and the field appeared non-editable. Partial drafts could not be held in the UI independently of persistence.

## Repair

1. Extracted `DecisionStageForm` with local draft state for `alternativeId`, `justification`, and `confidence`.
2. Justification and confidence edit the local draft without calling `saveDecision` on each keystroke.
3. Continue persists through the existing store/application path (`setDecision` → `BlueprintExecutionService.saveDecision`) only when the draft is structurally valid, then navigates to `/journey/REFLECTION`.
4. Structural validity remains BUILD-006 policy: non-empty trimmed justification, valid alternative, confidence 0–100.

## Files changed

- `apps/brm-prototype/src/components/DecisionStageForm.tsx` (created)
- `apps/brm-prototype/src/components/DecisionStageForm.test.tsx` (created)
- `apps/brm-prototype/src/pages/JourneyPage.tsx` (wired Decision stage to the form)
- `apps/brm-prototype/src/pages/JourneyPage.decision.test.tsx` (created)
- `implementation/BRMI/Volume_01_Prototype/issues/BRMI-ISSUE-006-01_Stage_6_Decision_Justification_Field_Noneditable.md` (this note)

## Tests added

- DecisionStageForm: typing, revisit load, alternative/confidence isolation, Continue gating, save callback
- JourneyPage integration: persist + navigate to REFLECTION; revisit loads saved decision; Decision Record field set unchanged

## Verification

- Tests passing: **98** (14 files)
- Production build: success
- Manual Stage 6 typing: covered by automated interaction tests (local draft accepts change events without prior alternative selection)
- Decision Record schema/filename: unchanged
- LocalStorage key `brm.prototype.v1`: unchanged
- BUILD-005 diagnostics: unchanged
- No architectural contract change; Zustand remains delegation-only for persistence

## Commit

No Git commit created for this repair.
