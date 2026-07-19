# BRMI-BUILD-005 — Blueprint-Aware Session Diagnostics and Recoverable Mismatch Reporting

**Project:** Business Research Mentor
**Component:** BRM Prototype
**Build ID:** BRMI-BUILD-005
**Status:** Approved for Implementation
**Baseline:** ABR-002 / Post BRMI-BUILD-004
**Date:** 2026-07-18

---

# 1. Implementation Instruction

Implement BRMI-BUILD-005 exactly as specified below.

Before modifying application code:

1. Create the authoritative specification file:

```text
implementation/BRMI/Volume_01_Prototype/BRMI-BUILD-005_Blueprint-Aware_Session_Diagnostics_and_Recoverable_Mismatch_Reporting.md
```

2. Place this complete approved specification in that file.
3. Treat it as the implementation contract.
4. Do not broaden the scope.
5. Do not create a Git commit.
6. Preserve all BUILD-001 through BUILD-004 behaviour unless this specification explicitly changes it.

---

# 2. Purpose

BRMI-BUILD-005 introduces deterministic, Blueprint-aware diagnostics for inconsistencies between:

```text
ResearchSession
+
Active Blueprint
```

The diagnostics must make mismatches:

* visible;
* explainable;
* testable;
* non-destructive;
* suitable for minimal UI reporting.

The build must preserve student-entered work.

It must not become a migration framework, repair engine, workflow engine, or data-cleanup process.

---

# 3. Accepted Architecture

Preserve this dependency direction:

```text
React Pages and Components
            ↓
      Zustand UI Adapter
            ↓
 BlueprintExecutionService
            ↓
 SessionService + BlueprintRegistry
            ↓
 Domain + Repository Port
            ↓
     LocalStorage Adapter
```

BUILD-005 adds:

```text
BlueprintExecutionService
            ↓
Pure Session Diagnostics Evaluator
            ↑
ResearchSession + Resolved Blueprint
```

The evaluator belongs in the application layer because it compares a domain session with a Blueprint definition.

Do not create a separate `SessionDiagnosticsService`.

---

# 4. Files to Create

Create:

```text
apps/brm-prototype/src/application/sessionDiagnostics.ts
apps/brm-prototype/src/application/sessionDiagnostics.test.ts
implementation/BRMI/Volume_01_Prototype/BRMI-BUILD-005_Blueprint-Aware_Session_Diagnostics_and_Recoverable_Mismatch_Reporting.md
```

A separate UI component may be created only if it keeps the existing layout implementation cleaner:

```text
apps/brm-prototype/src/components/SessionDiagnosticsBanner.tsx
```

This UI component is optional. An inline implementation in the existing layout is acceptable.

---

# 5. Files Expected to Change

Expected modifications:

```text
apps/brm-prototype/src/application/blueprintExecutionService.ts
apps/brm-prototype/src/application/blueprintExecutionService.test.ts
apps/brm-prototype/src/state/usePrototypeStore.ts
apps/brm-prototype/src/components/Layout.tsx
apps/brm-prototype/README.md
```

Modify other files only when directly necessary.

Do not modify:

* BP-001 educational content;
* Blueprint question order;
* Blueprint alternatives;
* routes;
* CSS architecture;
* LocalStorage repository format;
* storage key;
* Decision Record schema;
* SessionService unless a concrete implementation blocker is found;
* BRMF;
* BOK;
* governance;
* research;
* theory;
* methodology;
* archive material.

---

# 6. Diagnostic Types

Implement the diagnostic model in:

```text
src/application/sessionDiagnostics.ts
```

Use string literal unions, not TypeScript enums.

```ts
export type SessionDiagnosticSeverity =
  | "info"
  | "warning"
  | "error";
```

Implement these diagnostic codes:

```ts
export type SessionDiagnosticCode =
  | "SESSION_BLUEPRINT_WHITESPACE"
  | "ANSWER_QUESTION_UNKNOWN"
  | "ANSWER_QUESTION_DUPLICATE"
  | "CURRENT_INDEX_BELOW_RANGE"
  | "CURRENT_INDEX_ABOVE_RANGE"
  | "DECISION_ALTERNATIVE_UNKNOWN"
  | "COMPLETED_WITHOUT_DECISION";
```

Do not add:

```text
SESSION_BLUEPRINT_MISSING_LEGACY
```

The legacy loading boundary normalises missing Blueprint identifiers before diagnostics are evaluated. BUILD-005 must not add provenance state solely to determine whether BP-001 was explicitly stored or supplied as a default.

Implement:

```ts
export interface SessionDiagnostic {
  code: SessionDiagnosticCode;
  severity: SessionDiagnosticSeverity;
  message: string;
  field?: string;
  entityId?: string;
  recoverable: boolean;
}
```

Implement:

```ts
export interface SessionDiagnosticsReport {
  diagnostics: SessionDiagnostic[];
  hasErrors: boolean;
  hasWarnings: boolean;
}
```

`hasErrors` and `hasWarnings` must be derived from the diagnostic collection.

Do not store separate mutable flags.

---

# 7. Pure Evaluator

Implement:

```ts
export function evaluateSessionDiagnostics(
  session: ResearchSession,
  blueprint: Blueprint,
): SessionDiagnosticsReport
```

The function must be:

* pure;
* deterministic;
* synchronous;
* side-effect free;
* independent of LocalStorage;
* independent of Zustand;
* independent of React;
* independent of BlueprintRegistry;
* non-mutating.

It must not persist or repair the session.

It must not call `SessionService`.

It must not alter answers, decisions, indexes, or Blueprint identifiers.

---

# 8. Required Diagnostics

## 8.1 Whitespace Blueprint Identifier

Emit:

```text
SESSION_BLUEPRINT_WHITESPACE
```

when the stored `session.blueprintId` is non-empty but differs from its trimmed value.

Recommended severity:

```text
warning
```

Recommended field:

```text
blueprintId
```

The active Blueprint may still resolve through existing trimmed lookup behaviour.

Do not rewrite or persist the identifier.

---

## 8.2 Unknown Answer Question

For each answer whose non-empty `questionId` does not match a question in the resolved active Blueprint, emit:

```text
ANSWER_QUESTION_UNKNOWN
```

Severity:

```text
warning
```

Field:

```text
answers
```

Entity ID:

```text
answer.questionId
```

The answer must remain unchanged in the session.

Do not filter it from diagnostics evaluation, persistence, or Decision Record export.

---

## 8.3 Duplicate Answer Question

When more than one stored answer uses the same `questionId`, emit:

```text
ANSWER_QUESTION_DUPLICATE
```

Severity:

```text
warning
```

Field:

```text
answers
```

Entity ID:

```text
questionId
```

Emit one diagnostic per duplicated question identifier, not one diagnostic per duplicate row.

All stored answers must remain preserved.

Do not consolidate them automatically.

---

## 8.4 Current Index Below Range

When:

```ts
session.currentQuestionIndex < 0
```

emit:

```text
CURRENT_INDEX_BELOW_RANGE
```

Severity:

```text
warning
```

Field:

```text
currentQuestionIndex
```

This condition may not normally survive LocalStorage normalisation, but the pure evaluator must still handle it correctly for direct application fixtures and future callers.

Do not mutate or persist the index.

---

## 8.5 Current Index Above Range

When the Blueprint contains questions and:

```ts
session.currentQuestionIndex >= blueprint.questions.length
```

emit:

```text
CURRENT_INDEX_ABOVE_RANGE
```

Severity:

```text
warning
```

Field:

```text
currentQuestionIndex
```

Do not persist a clamped value.

Existing display-time or navigation-time clamping behaviour remains unchanged.

---

## 8.6 Unknown Stored Decision Alternative

When the session contains a decision whose `alternativeId` is absent from the active Blueprint alternatives, emit:

```text
DECISION_ALTERNATIVE_UNKNOWN
```

Severity:

```text
error
```

Field:

```text
decision.alternativeId
```

Entity ID:

```text
decision.alternativeId
```

The stored decision must remain preserved.

The evaluator must not clear it.

Existing validation of new decisions remains unchanged:

```text
InvalidBlueprintAlternativeError
```

must still be thrown when attempting to save a new invalid decision.

---

## 8.7 Completed Without Decision

When:

```ts
session.completed === true
```

and no decision exists, emit:

```text
COMPLETED_WITHOUT_DECISION
```

Severity:

```text
warning
```

Field:

```text
decision
```

Do not automatically reopen or alter the session.

Do not block loading.

---

# 9. Conditions That Must Not Produce Diagnostics

Do not diagnose the following as corruption or inconsistency:

* unanswered Blueprint questions;
* empty answer text;
* an in-progress session containing a valid decision;
* supervisor feedback entered before a decision;
* answers stored in a different order from Blueprint questions;
* absence of a decision in an incomplete session;
* absence of supervisor feedback;
* a valid current index;
* a clean BP-001 session;
* legacy BP-001 defaulting after normalisation;
* additional Blueprint questions that have not yet been answered.

Incomplete student work is valid.

---

# 10. Diagnostic Ordering

Diagnostics must have deterministic ordering.

Recommended order:

1. Blueprint identifier warning;
2. navigation-index diagnostics;
3. unknown-answer diagnostics in stored answer order;
4. duplicate-answer diagnostics in first-occurrence order;
5. decision diagnostics;
6. completion diagnostics.

Tests must not depend on unstable object or set iteration.

---

# 11. BlueprintExecutionService Integration

Add this public method:

```ts
getSessionDiagnostics(): SessionDiagnosticsReport
```

Implementation flow:

```text
get current session
        ↓
resolve active Blueprint using existing policy
        ↓
evaluateSessionDiagnostics(session, blueprint)
        ↓
return report
```

The method must not persist data.

The method must not catch and convert an explicit unknown Blueprint into an ordinary diagnostic.

If the active Blueprint cannot be resolved, preserve existing behaviour:

```text
UnknownBlueprintError
```

The session must remain unchanged.

An empty Blueprint question list may continue to use the existing `NoCurrentQuestionError` behaviour where relevant.

---

# 12. Error and Diagnostic Boundary

Preserve this distinction:

| Condition                           | Behaviour                                 |
| ----------------------------------- | ----------------------------------------- |
| Explicit unknown active Blueprint   | `UnknownBlueprintError`                   |
| Invalid newly submitted alternative | `InvalidBlueprintAlternativeError`        |
| Invalid alternative already stored  | `DECISION_ALTERNATIVE_UNKNOWN` diagnostic |
| Unknown stored answer question      | warning diagnostic                        |
| Out-of-range stored index           | warning diagnostic                        |
| Completed without decision          | warning diagnostic                        |

Do not add a “fatal” diagnostic severity.

Do not create a partial diagnostic report when the active Blueprint cannot be resolved.

---

# 13. Zustand Integration

Update the Zustand store interface with:

```ts
getSessionDiagnostics: () => SessionDiagnosticsReport;
```

Its implementation must delegate directly:

```ts
getSessionDiagnostics: () =>
  blueprintExecutionService.getSessionDiagnostics()
```

Zustand must not:

* import `evaluateSessionDiagnostics`;
* import diagnostic-code constants for evaluation;
* inspect answers for mismatch;
* calculate severity;
* resolve Blueprint identifiers;
* maintain a stored diagnostics array;
* refresh diagnostics manually after every mutation.

Diagnostics must be computed on demand to avoid stale state.

---

# 14. Minimum User-Visible Reporting

Add a compact diagnostics banner to the common application layout.

The banner must appear only when:

```ts
report.hasWarnings || report.hasErrors
```

Minimum content:

* total number of detected issues;
* number of errors where greater than zero;
* number of warnings where greater than zero;
* the first diagnostic message.

Example presentation:

```text
Session check: 2 issues detected — 1 error and 1 warning.
The saved decision no longer matches an available option.
```

The wording may be adapted to the current UI style.

Requirements:

* do not create a dashboard;
* do not create a recovery wizard;
* do not expose raw developer stack traces;
* do not display the banner for a clean session;
* preserve existing layout and styling behaviour;
* add only minimal CSS if required;
* do not add a new route.

If `getSessionDiagnostics()` throws `UnknownBlueprintError`, preserve the application’s current error behaviour unless the existing layout already has a suitable non-invasive error boundary.

Do not expand BUILD-005 into global error-handling redesign.

---

# 15. No Automatic Repair

BUILD-005 must not automatically:

* clamp and persist indexes;
* rewrite whitespace Blueprint identifiers;
* replace unknown Blueprint identifiers with BP-001;
* delete unknown answers;
* consolidate duplicate answers;
* remap question identifiers;
* clear invalid stored decisions;
* replace invalid stored decisions;
* change completion state;
* add Blueprint version metadata;
* rewrite LocalStorage solely because diagnostics were evaluated.

Diagnostics are observational.

They are not mutation commands.

---

# 16. Student-Work Preservation

The following rules are mandatory:

1. Unknown answers remain in the ResearchSession.
2. Duplicate answers remain in the ResearchSession.
3. Stored invalid decisions remain in the ResearchSession.
4. Diagnostics evaluation must not call persistence.
5. Diagnostics evaluation must not invoke reset.
6. Diagnostics evaluation must not use array filtering that changes stored data.
7. Existing Decision Record export behaviour remains unchanged.
8. Existing student data must remain available after diagnostics are generated.
9. No diagnostic may silently replace student-entered text.
10. Recovery actions are deferred unless already provided through ordinary valid user editing.

---

# 17. Decision Record Compatibility

Do not change:

* Decision Record TypeScript shape;
* Decision Record JSON field names;
* BP-001 Decision Record filename;
* answer export behaviour;
* BUILD-001 compatibility.

Do not embed diagnostics in the Decision Record.

Do not create a separate diagnostics export.

Do not block export solely because diagnostics exist.

The UI may display a warning before or near export, but export behaviour must remain compatible.

The BP-001 filename remains:

```text
BRM_BP-001_Decision_Record.json
```

---

# 18. Persistence Compatibility

Do not change:

```text
brm.prototype.v1
```

Do not add session fields.

Do not add `blueprintVersion`.

Do not create a new persistence migration.

Do not add a diagnostics array to ResearchSession.

Diagnostics are computed, not persisted.

Existing LocalStorage legacy-load tests must remain passing.

---

# 19. Blueprint Version Decision

Decision:

```text
Deferred
```

Do not add:

```ts
ResearchSession.blueprintVersion
```

BUILD-005 remains version-agnostic.

Future Blueprint version mismatch diagnostics may be introduced only after Blueprint-version persistence and migration policy are designed.

---

# 20. Required Tests — Pure Evaluator

Add deterministic unit tests for:

1. clean default BP-001 session returns:

   * no diagnostics;
   * `hasErrors === false`;
   * `hasWarnings === false`;

2. unanswered Blueprint questions do not produce diagnostics;

3. whitespace Blueprint identifier produces:

   * `SESSION_BLUEPRINT_WHITESPACE`;
   * warning severity;
   * no session mutation;

4. unknown answer question identifier produces:

   * `ANSWER_QUESTION_UNKNOWN`;
   * warning severity;
   * correct `entityId`;

5. unknown answer remains present after evaluation;

6. duplicate answer identifiers produce:

   * one `ANSWER_QUESTION_DUPLICATE` diagnostic per duplicated identifier;
   * all answers remain preserved;

7. negative current index produces:

   * `CURRENT_INDEX_BELOW_RANGE`;

8. index equal to Blueprint question length produces:

   * `CURRENT_INDEX_ABOVE_RANGE`;

9. index greater than Blueprint question length produces:

   * `CURRENT_INDEX_ABOVE_RANGE`;

10. stored decision with unknown alternative produces:

    * `DECISION_ALTERNATIVE_UNKNOWN`;
    * error severity;
    * decision remains preserved;

11. completed session without a decision produces:

    * `COMPLETED_WITHOUT_DECISION`;

12. an incomplete session without a decision does not produce that warning;

13. diagnostic ordering is stable;

14. the evaluator does not mutate the supplied session or Blueprint.

Use explicit fixtures.

Do not rely only on LocalStorage fixtures for evaluator tests.

---

# 21. Required Tests — Execution Service

Extend BlueprintExecutionService tests to prove:

1. `getSessionDiagnostics()` resolves the active Blueprint;
2. clean BP-001 session returns an empty report;
3. explicit unknown Blueprint id throws `UnknownBlueprintError`;
4. the unknown-Blueprint session remains unchanged;
5. unknown stored answer produces a diagnostic and remains stored;
6. unknown stored decision produces a diagnostic and remains stored;
7. invalid newly submitted decision still throws `InvalidBlueprintAlternativeError`;
8. diagnostics do not trigger repository save;
9. diagnostics reflect the current session when called after a valid mutation.

---

# 22. Required Tests — Zustand and UI

Test at the lowest practical cost.

At minimum verify:

* Zustand exposes `getSessionDiagnostics`;
* Zustand delegates to BlueprintExecutionService;
* Zustand contains no diagnostic-evaluation logic;
* the diagnostics banner is absent for a clean session;
* the banner appears for warning or error diagnostics;
* the banner displays a concise issue count and message.

Do not introduce a large UI testing framework solely for BUILD-005.

If the current project lacks component-test infrastructure, prefer:

* a small pure banner-formatting helper test;
* existing test facilities;
* static architectural verification;
* minimal component testing only where already supported.

Document any intentionally omitted UI automation.

---

# 23. Architectural Verification

After implementation, verify Zustand does not own diagnostic logic:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "evaluateSessionDiagnostics|ANSWER_QUESTION_UNKNOWN|DECISION_ALTERNATIVE_UNKNOWN|CURRENT_INDEX_" \
  apps/brm-prototype/src/state
```

Expected:

```text
No diagnostic business logic in Zustand
```

Verify pages and components do not access the Blueprint registry:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "BlueprintRegistry|blueprintRegistry|BP-001/blueprint" \
  apps/brm-prototype/src/pages \
  apps/brm-prototype/src/components
```

Expected:

```text
No direct registry or BP-001 imports
```

Verify domain dependencies:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "from ['\"]react|from ['\"]zustand|react-router|localStorage|from ['\"]zod|BlueprintRegistry" \
  apps/brm-prototype/src/domain
```

Expected:

```text
No forbidden domain dependencies
```

Verify storage compatibility:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  "brm.prototype.v1" \
  apps/brm-prototype/src
```

---

# 24. Required Verification Commands

Run:

```bash
cd /Volumes/exsalam/Dev/Projects/Rmentor/apps/brm-prototype

npm run format
npm test
npm run build
```

Then return to the repository root:

```bash
cd /Volumes/exsalam/Dev/Projects/Rmentor

git status --short
git --no-pager diff --stat
```

Do not create a Git commit.

---

# 25. Exact Acceptance Criteria

BRMI-BUILD-005 is complete only when:

1. A pure `evaluateSessionDiagnostics(session, blueprint)` function exists.
2. The evaluator is deterministic and non-mutating.
3. The evaluator returns `SessionDiagnosticsReport`.
4. Clean BP-001 sessions return no diagnostics.
5. Unanswered Blueprint questions do not produce warnings or errors.
6. Whitespace Blueprint identifiers produce `SESSION_BLUEPRINT_WHITESPACE`.
7. Unknown answer question identifiers produce `ANSWER_QUESTION_UNKNOWN`.
8. Unknown answers remain preserved.
9. Duplicate answer question identifiers produce `ANSWER_QUESTION_DUPLICATE`.
10. Duplicate answers remain preserved.
11. Negative question indexes produce `CURRENT_INDEX_BELOW_RANGE`.
12. Indexes at or above the Blueprint question count produce `CURRENT_INDEX_ABOVE_RANGE`.
13. Diagnostics do not persist index repairs.
14. Stored decisions with unknown alternatives produce `DECISION_ALTERNATIVE_UNKNOWN`.
15. Stored invalid decisions remain preserved.
16. New invalid decisions continue to throw `InvalidBlueprintAlternativeError`.
17. Completed sessions without decisions produce `COMPLETED_WITHOUT_DECISION`.
18. Explicit unknown Blueprint identifiers continue to throw `UnknownBlueprintError`.
19. `BlueprintExecutionService.getSessionDiagnostics()` coordinates Blueprint resolution and evaluation.
20. Diagnostics evaluation does not save the session.
21. Zustand exposes diagnostics only through application-layer delegation.
22. Zustand contains no diagnostic business rules.
23. Diagnostics are computed on demand and are not persisted in Zustand state.
24. A compact shared-layout warning banner appears when warnings or errors exist.
25. The banner does not appear for clean sessions.
26. No automatic answer, decision, Blueprint-id, completion-state, or index repair is introduced.
27. Decision Record JSON field names remain unchanged.
28. The BP-001 Decision Record filename remains unchanged.
29. The LocalStorage key remains `brm.prototype.v1`.
30. Existing legacy LocalStorage tests pass.
31. No `blueprintVersion` field is added.
32. BP-001 content and order remain unchanged.
33. Routes and existing UI thresholds remain unchanged.
34. Domain forbidden-dependency checks pass.
35. Required new tests pass.
36. All existing tests pass.
37. `npm test` succeeds.
38. `npm run build` succeeds.
39. Deferred scope is absent from the implementation.
40. No Git commit is created.

---

# 26. Deferred Scope

Do not implement:

* Blueprint migration;
* Blueprint-version persistence;
* automatic answer remapping;
* destructive answer cleanup;
* automatic duplicate consolidation;
* automatic decision clearing;
* automatic Blueprint reassignment;
* multiple Blueprint selection;
* Blueprint authoring;
* cloud persistence;
* authentication;
* analytics;
* AI mentoring;
* supervisor dashboards;
* program-director dashboards;
* generic rules engines;
* generic workflow engines;
* recovery wizards;
* Decision Record schema redesign;
* persisted diagnostics;
* diagnostics export;
* global application error redesign.

---

# 27. Completion Report

Return:

```text
BRMI-BUILD-005 — Completion Report
```

using this exact structure:

1. Files created
2. Files modified
3. Final diagnostic types
4. Final evaluator interface
5. BlueprintExecutionService changes
6. Zustand changes
7. UI reporting implemented
8. Diagnostic codes implemented
9. Severity policy
10. Student-work preservation evidence
11. Unknown Blueprint behaviour
12. Invalid new decision behaviour
13. Stored invalid decision behaviour
14. Navigation mismatch behaviour
15. Automatic recovery confirmation
16. Decision Record compatibility
17. Storage compatibility
18. Blueprint-version decision
19. Tests added or modified
20. Total tests passing
21. Build result
22. Dependency-boundary verification
23. Deferred-scope confirmation
24. Files modified outside authorised scope, if any
25. No commit created

Finish with:

```text
Files modified: <list>
Commit created: No
BUILD-005 acceptance criteria: Passed / Failed
```
