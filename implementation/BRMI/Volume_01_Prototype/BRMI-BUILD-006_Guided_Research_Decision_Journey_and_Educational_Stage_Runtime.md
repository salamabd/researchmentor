# BRMI-BUILD-006 — Guided Research Decision Journey and Educational Stage Runtime

**Project:** Business Research Mentor  
**Component:** BRM Prototype  
**Build ID:** BRMI-BUILD-006  
**Status:** Implemented — Pending Independent Review  
**Date:** 2026-07-19  
**Depends On:** BRMI-BUILD-005  
**Architecture Baseline:** ABR-003  
**Primary Blueprint:** BP-001  
**Implementation Principle:** Extend the educational experience without weakening established architecture or student-work preservation.

---

# 1. Purpose

BRMI-BUILD-006 introduces the first complete guided educational journey in the BRM Prototype.

The purpose of this build is to demonstrate that BRM can guide a student through one research decision as a structured learning process rather than merely collecting form data.

The build must transform the existing BP-001 interaction into an explicit staged journey that helps the student:

1. understand the decision being made;
2. examine relevant constraints;
3. consider alternatives;
4. articulate reasoning;
5. make a decision;
6. reflect on confidence and uncertainty;
7. review the completed reasoning journey.

This build is educational rather than infrastructural.

It must not become:

- a generic workflow engine;
- a dissertation generator;
- an AI writing assistant;
- a Blueprint authoring system;
- a recovery or migration framework;
- a supervisor dashboard;
- an analytics platform.

---

# 2. Core Educational Question

The build must answer:

> Can BRM help a student make one better research decision by guiding the student through an explicit sequence of reasoning stages?

The first decision remains:

> Choosing and refining a viable business research topic.

The prototype must make the reasoning process visible without producing the student's final academic work for them.

---

# 3. Educational Outcome

At the end of the journey, the student should be able to explain:

- what research decision was made;
- why the decision was necessary;
- what constraints shaped the choice;
- what alternatives were considered;
- why one alternative was selected;
- what uncertainty remains;
- what should be examined next.

The system should preserve the student's own language.

It may guide, prompt, structure, and challenge.

It must not silently write the student's research topic, proposal, or justification.

---

# 4. Scope

BUILD-006 includes:

- explicit educational stages for BP-001;
- deterministic stage derivation;
- guided stage presentation;
- stage-level requirements;
- progress reporting;
- previous and next navigation;
- resume behaviour;
- student reflection capture;
- completed-journey review;
- compatibility with the current Decision Record;
- tests for educational progression and boundary preservation.

BUILD-006 does not include:

- generative AI mentoring;
- automated assessment of writing quality;
- supervisor comments;
- program-director reporting;
- Blueprint migration;
- Blueprint versioning;
- automatic recovery;
- generic workflow definitions;
- drag-and-drop Blueprint authoring;
- remote persistence;
- authentication;
- cloud synchronisation;
- collaborative editing;
- analytics;
- scoring students;
- grading;
- plagiarism detection.

---

# 5. Architectural Baseline

The accepted operational architecture remains:

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

The BUILD-006 educational progression path must be:

```text
React Journey UI
        ↓
Zustand Journey Actions
        ↓
BlueprintExecutionService
        ↓
Pure Journey Evaluation
        ↓
ResearchSession + Resolved Blueprint
```

No page or component may directly import:

- BlueprintRegistry;
- the BP-001 implementation module;
- LocalStorage;
- repository implementations.

Zustand must remain an adapter rather than the owner of educational progression rules.

---

# 6. Key Design Decision

BUILD-006 must not introduce a generic workflow engine.

The current need is limited to one educational journey executed from a validated Blueprint.

The build should introduce a small application-layer model that derives the student's current educational stage from:

- the active Blueprint;
- the current ResearchSession;
- the answers already supplied;
- decision state;
- completion state.

The runtime must remain specific enough to prove the educational concept and simple enough to replace or generalise later if multiple Blueprints demonstrate the need.

---

# 7. Proposed Educational Stages

The accepted initial stages are:

```text
ORIENTATION
CONTEXT
CONSTRAINT_DISCOVERY
ALTERNATIVE_EXAMINATION
DECISION
REFLECTION
REVIEW
```

## 7.1 ORIENTATION

Purpose:

- explain the research decision;
- explain why the decision matters;
- explain that BRM guides thinking rather than writes the answer.

Completion requirement:

- the student explicitly begins the journey.

No academic text is required.

## 7.2 CONTEXT

Purpose:

- capture the student's initial research interest;
- establish the business discipline and practical or theoretical context;
- identify the tentative problem space.

Completion requirement:

- required context questions have answer records.

Empty or whitespace-only answers do not satisfy required questions.

## 7.3 CONSTRAINT_DISCOVERY

Purpose:

- help the student identify sufficient constraints;
- reduce an overly broad topic;
- distinguish useful constraints from irrelevant detail.

Typical constraints may include:

- discipline;
- population;
- organisation type;
- geographic context;
- phenomenon;
- theoretical lens;
- available evidence;
- access;
- time;
- methodological feasibility.

Completion requirement:

- all required constraint questions are answered.

The system must not decide that a constraint is academically sufficient through hidden AI judgement in this build.

## 7.4 ALTERNATIVE_EXAMINATION

Purpose:

- present or collect viable topic-direction alternatives;
- encourage comparison rather than immediate commitment;
- make trade-offs explicit.

Completion requirement:

- required comparison questions are answered;
- the student has considered the Blueprint alternatives.

BUILD-006 must use validated Blueprint alternatives. It must not create a free-form alternative-authoring engine unless the current BP-001 contract already supports it.

## 7.5 DECISION

Purpose:

- select one valid Blueprint alternative;
- provide the student's justification;
- record confidence.

Completion requirement:

- a valid decision alternative is stored;
- justification meets the existing non-empty requirement;
- confidence is valid under the existing domain rules.

Invalid new alternatives must continue to throw `InvalidBlueprintAlternativeError`.

## 7.6 REFLECTION

Purpose:

- make uncertainty visible;
- identify evidence that influenced the decision;
- identify what remains unresolved;
- prompt the student to state the next research question or action.

Completion requirement:

- required reflection prompts are answered.

Reflection must be student-authored.

## 7.7 REVIEW

Purpose:

- display the complete decision journey;
- show context, constraints, alternatives, decision, justification, confidence, and reflection;
- allow navigation back to earlier stages;
- preserve Decision Record export compatibility.

Completion requirement:

- the session may be marked completed only when all mandatory requirements are satisfied.

---

# 8. Stage Model

Introduce an application-layer stage model using string literal unions rather than enums.

Suggested structure:

```ts
export type ResearchJourneyStageId =
  | "ORIENTATION"
  | "CONTEXT"
  | "CONSTRAINT_DISCOVERY"
  | "ALTERNATIVE_EXAMINATION"
  | "DECISION"
  | "REFLECTION"
  | "REVIEW";

export interface ResearchJourneyStage {
  id: ResearchJourneyStageId;
  title: string;
  purpose: string;
  questionIds: string[];
  requiredQuestionIds: string[];
}

export interface ResearchJourneyProgress {
  currentStageId: ResearchJourneyStageId;
  completedStageIds: ResearchJourneyStageId[];
  availableStageIds: ResearchJourneyStageId[];
  blockedStageIds: ResearchJourneyStageId[];
  totalStages: number;
  completedStages: number;
  percentComplete: number;
  canMovePrevious: boolean;
  canMoveNext: boolean;
}
```

Names may be adjusted to fit the existing repository vocabulary, but the concepts must remain explicit.

No stage object should contain React components or callbacks.

---

# 9. Stage Definition Ownership

Stage metadata should be associated with the Blueprint execution model without placing UI concerns into Blueprint definitions.

The implementation-readiness review must choose one of these approaches:

## Preferred approach

Add educational stage metadata to the validated Blueprint contract.

This is preferred only if:

- stage metadata is educational Blueprint content;
- validation can ensure referenced question identifiers exist;
- BP-001 remains declarative;
- the registry continues to validate the complete definition.

## Acceptable temporary approach

Introduce a BP-001 journey map in the application layer.

This is acceptable only if changing the validated Blueprint contract would cause disproportionate scope expansion.

A hard-coded stage map inside React or Zustand is prohibited.

The final completion report must state which option was implemented and why.

---

# 10. Stage Derivation

Introduce a pure application-layer evaluator:

```ts
deriveResearchJourneyProgress(
  session: ResearchSession,
  blueprint: Blueprint
): ResearchJourneyProgress
```

The evaluator must:

- be deterministic;
- be non-mutating;
- derive progress from stored session state;
- use resolved Blueprint content;
- avoid repository access;
- avoid LocalStorage;
- avoid React;
- avoid Zustand;
- avoid BlueprintRegistry.

The evaluator must not persist `percentComplete`, `completedStageIds`, or similar derived values.

Derived progress must remain computed on demand.

---

# 11. Current Stage Behaviour

The current stage should be determined by the earliest mandatory stage that is not complete, subject to explicit student navigation rules.

The implementation must distinguish:

- **derived recommended stage** — where the student should continue;
- **currently viewed stage** — the screen the student is viewing.

Do not overload `currentQuestionIndex` to represent the educational stage.

If persistent resume behaviour requires a new session field, the field must be minimal and explicitly justified.

Suggested field only if needed:

```ts
currentJourneyStageId?: ResearchJourneyStageId;
```

Before adding it, the implementation-readiness review must determine whether current route/session information already provides sufficient resume behaviour.

No new persistence field should be added merely for convenience.

---

# 12. Navigation Policy

The student must be able to:

- move to the previous available stage;
- return to completed stages;
- resume at the recommended incomplete stage;
- review previously entered work.

The system may prevent progression into a mandatory later stage when prerequisite requirements are not satisfied.

The system must not prevent the student from moving backward.

The system must not delete later work when earlier answers are edited.

If editing earlier answers makes later work inconsistent, existing BUILD-005 diagnostics must report the mismatch.

Automatic rollback is prohibited.

---

# 13. Stage Completion Rules

Stage completion must be evaluated by pure functions.

Suggested interface:

```ts
evaluateJourneyStageCompletion(
  stage: ResearchJourneyStage,
  session: ResearchSession,
  blueprint: Blueprint
): JourneyStageCompletion
```

Suggested result:

```ts
export interface JourneyStageCompletion {
  stageId: ResearchJourneyStageId;
  complete: boolean;
  missingRequiredQuestionIds: string[];
  blockingReasons: string[];
}
```

The completion evaluator must not:

- write answers;
- create decisions;
- infer student intent;
- score answer quality;
- judge academic correctness;
- use generated text;
- call an AI model.

For BUILD-006, completion means structurally complete, not academically excellent.

---

# 14. Required and Optional Questions

The Blueprint or journey map must identify which questions are required for stage progression.

Required status must not be inferred from question order or UI placement.

A required answer is satisfied only when:

- an answer exists for the exact question identifier;
- the answer text is not empty after trimming.

Duplicate answers must not be silently consolidated.

Where duplicates exist:

- BUILD-005 diagnostics remain responsible for warning;
- stage evaluation must use a deterministic policy;
- the chosen policy must be documented and tested.

Recommended deterministic policy:

> A required question is considered answered when at least one matching answer contains non-whitespace text.

This policy preserves student work while avoiding accidental blockage.

---

# 15. Reflection Capture

BUILD-006 must add explicit reflection prompts if they do not already exist in BP-001.

Minimum reflection concepts:

1. What most influenced your decision?
2. What remains uncertain?
3. What evidence do you still need?
4. What is your next research action or question?

Reflection should be stored using the existing answer model where possible.

Avoid introducing a separate Reflection entity unless the current answer model cannot represent the required data without ambiguity.

The implementation-readiness review must verify whether reflection question IDs can be added compatibly to BP-001.

---

# 16. Progress Reporting

The interface must display:

- current stage title;
- stage position, such as “Stage 3 of 7”;
- completed stage count;
- a progress percentage or equivalent visual indicator;
- clear indication of the next required action.

Progress percentage must be deterministic.

Recommended calculation:

```text
completed mandatory stages / total mandatory stages × 100
```

The UI must not imply academic quality.

Avoid labels such as:

- research quality score;
- readiness score;
- supervisor score;
- academic performance.

Use educationally neutral labels such as:

- Journey progress;
- Stages completed;
- Next step.

---

# 17. User Interface Requirements

The interface should present one educational stage at a time.

Minimum shared elements:

- Blueprint purpose;
- current stage title;
- stage purpose;
- relevant questions;
- progress indicator;
- Previous button;
- Continue button;
- Save behaviour consistent with existing application;
- diagnostic banner from BUILD-005.

The UI should reduce cognitive overload.

It should not display all questions and all decision controls simultaneously unless the existing design makes stage separation technically impractical.

The completion report must include screenshots or a written UI walkthrough.

---

# 18. Orientation Requirements

The orientation stage must explain:

- BRM is a research mentoring tool;
- BRM guides thinking;
- the student's wording remains their own;
- the student can revise earlier work;
- progress indicates completion of steps, not academic quality;
- the Decision Record captures reasoning rather than certifying correctness.

The orientation copy must not promise:

- guaranteed topic approval;
- guaranteed research quality;
- supervisor replacement;
- academic correctness;
- plagiarism safety merely from using the system.

---

# 19. Review Stage

The review stage must display a structured summary of the journey.

Suggested sections:

- Initial research context
- Important constraints
- Alternatives considered
- Selected direction
- Student justification
- Confidence
- Remaining uncertainty
- Evidence still needed
- Next research action

The review stage should rely on existing stored data.

It must not create a second competing Decision Record model.

The existing Decision Record export remains authoritative.

---

# 20. Session Completion

The session may be marked completed only when:

- all mandatory stages are structurally complete;
- a valid decision exists;
- required reflection prompts are answered.

The completion command should be owned by BlueprintExecutionService.

Suggested method:

```ts
completeJourney(): ResearchSession
```

or:

```ts
completeSessionForActiveBlueprint(): ResearchSession
```

The exact name should follow existing service conventions.

The method must:

1. load the current session;
2. resolve the active Blueprint;
3. evaluate journey completion;
4. reject completion when blocking requirements remain;
5. persist completion through SessionService only when valid.

Introduce a specific application error rather than a generic `Error`.

Suggested error:

```ts
IncompleteResearchJourneyError
```

The error should expose machine-readable blocking information where practical.

---

# 21. Compatibility with BUILD-005 Diagnostics

BUILD-006 must preserve all diagnostic behaviour.

The diagnostic banner remains available throughout the journey.

BUILD-006 must not:

- hide diagnostics merely because the current stage appears valid;
- repair data during progress evaluation;
- convert diagnostics into automatic migration;
- delete unknown answers;
- clear invalid stored decisions;
- clamp and persist mismatched indexes through diagnostic evaluation.

Journey progression and session diagnostics are separate application concerns.

They may use the same session and Blueprint inputs, but they must not become one large rules framework.

---

# 22. Persistence Compatibility

The existing storage key remains:

```text
brm.prototype.v1
```

Prefer no schema change.

If a new field is required for resume behaviour:

- it must be optional;
- legacy sessions must continue to load;
- normalisation must provide a safe default;
- existing LocalStorage tests must remain passing;
- the change must be explicitly reported.

No migration framework is approved.

---

# 23. Decision Record Compatibility

The existing Decision Record filename remains:

```text
BRM_BP-001_Decision_Record.json
```

The build must not rename existing fields.

Reflection answers may appear through the existing answer export if they are represented as Blueprint questions.

No new Decision Record schema is approved unless implementation-readiness analysis proves the existing structure incapable of representing the completed journey.

Any proposed schema change must stop implementation and trigger a separate design decision.

---

# 24. Accessibility and Usability

The journey UI must support:

- keyboard navigation;
- visible focus indicators;
- clear button labels;
- semantic headings;
- associated labels for inputs;
- accessible progress text;
- non-colour-only warning communication;
- readable error messages.

The interface must remain usable at common laptop widths.

Mobile optimisation is desirable but not a BUILD-006 acceptance blocker unless already supported.

---

# 25. Error Handling

The UI must handle:

- unknown active Blueprint;
- incomplete-stage progression attempts;
- invalid new decision alternative;
- invalid persisted decision diagnostic;
- storage failures where existing infrastructure exposes them.

Incomplete progression should produce a clear educational message, for example:

> Complete the required reflection prompts before continuing to Review.

Messages should tell the student what action is needed without sounding punitive.

---

# 26. Testing Requirements

## 26.1 Pure stage evaluation tests

Test:

- a new session;
- orientation state;
- partially answered context;
- completed context;
- partially answered constraints;
- completed constraints;
- alternative examination completion;
- valid decision;
- missing decision;
- incomplete reflection;
- completed reflection;
- completed journey;
- deterministic progress;
- non-mutation;
- duplicate answers;
- unknown answers;
- whitespace-only answers.

## 26.2 Blueprint validation tests

If stage metadata is added to Blueprint:

- every stage question ID must exist;
- every required question ID must belong to the stage;
- stage IDs must be unique;
- question assignment rules must be deterministic;
- the stage sequence must be valid;
- required stages must exist.

## 26.3 BlueprintExecutionService tests

Test:

- get journey progress;
- navigate to an available stage;
- reject blocked forward navigation;
- allow backward navigation;
- resume behaviour;
- complete valid journey;
- reject incomplete completion;
- preserve session on rejected command;
- unknown Blueprint behaviour;
- invalid decision behaviour;
- no bypass of SessionService persistence.

## 26.4 Zustand tests

Test delegation only.

No educational progression logic should be asserted inside Zustand because no such logic should exist there.

## 26.5 Component tests

Where the current test stack supports them, cover:

- progress display;
- stage title and purpose;
- Previous and Continue controls;
- blocked progression message;
- review summary;
- diagnostics banner coexistence.

If DOM automation is unavailable, the completion report must document the gap and provide testable formatting/view-model functions.

## 26.6 Regression tests

All BUILD-005 tests must remain passing.

The regression floor is:

```text
61 tests passing
10 test files
```

BUILD-006 must increase test coverage.

---

# 27. Dependency-Boundary Verification

Before completion, run checks proving:

- no BlueprintRegistry import in pages or components;
- no BP-001 direct import in pages or components;
- no LocalStorage access in application journey evaluators;
- no React or Zustand imports in domain;
- no journey evaluation rules inside Zustand;
- no persistence calls inside pure evaluators;
- no diagnostic evaluator changes that introduce repair.

The completion report must include the commands and results.

---

# 28. Authorised Files

Expected authorised scope may include:

```text
apps/brm-prototype/src/application/researchJourney.ts
apps/brm-prototype/src/application/researchJourney.test.ts
apps/brm-prototype/src/application/blueprintExecutionService.ts
apps/brm-prototype/src/application/blueprintExecutionService.test.ts
apps/brm-prototype/src/blueprints/*
apps/brm-prototype/src/domain/*
apps/brm-prototype/src/state/usePrototypeStore.ts
apps/brm-prototype/src/state/*.test.ts
apps/brm-prototype/src/components/*
apps/brm-prototype/src/pages/*
apps/brm-prototype/src/styles/global.css
apps/brm-prototype/README.md
implementation/BRMI/Volume_01_Prototype/BRMI-BUILD-006_Guided_Research_Decision_Journey_and_Educational_Stage_Runtime.md
```

The actual repository structure must be inspected before implementation.

Files outside this scope require justification in the completion report.

---

# 29. Implementation Sequence

## Phase 1 — Repository inspection

Inspect:

- Blueprint contract;
- BP-001 definition;
- ResearchSession;
- answer model;
- decision model;
- existing pages and routes;
- current question navigation;
- BlueprintExecutionService;
- Zustand;
- Decision Record creation;
- tests;
- README;
- LocalStorage adapter.

Produce an implementation-readiness report before changing code.

## Phase 2 — Educational stage design

Decide:

- where stage metadata lives;
- how questions map to stages;
- which questions are required;
- whether reflection prompts already exist;
- whether a minimal session field is required;
- how current stage and recommended stage differ.

## Phase 3 — Pure evaluation

Implement and test:

- stage completion;
- journey progress;
- deterministic required-answer behaviour;
- non-mutation.

## Phase 4 — Application orchestration

Extend BlueprintExecutionService with:

- get journey progress;
- stage navigation command if persistence is required;
- complete journey command;
- explicit incomplete-journey error.

## Phase 5 — Zustand delegation

Expose thin actions/selectors only.

## Phase 6 — UI

Implement:

- stage shell;
- progress;
- orientation;
- staged question presentation;
- decision stage;
- reflection;
- review.

## Phase 7 — Compatibility verification

Verify:

- diagnostics;
- LocalStorage;
- Decision Record;
- legacy sessions;
- student-work preservation;
- no automatic repair.

## Phase 8 — Documentation

Update README and BUILD-006 specification with final implementation details.

---

# 30. Acceptance Criteria

BUILD-006 passes only when all criteria below are satisfied.

## Educational journey

- [ ] BP-001 is presented as an explicit staged journey.
- [ ] The journey includes orientation, context, constraint discovery, alternative examination, decision, reflection, and review.
- [ ] Each stage has a visible educational purpose.
- [ ] The system presents a clear next action.
- [ ] The student can move backward without losing work.
- [ ] Forward progression respects mandatory structural requirements.
- [ ] Progress is visible and deterministic.
- [ ] Progress does not claim academic quality.

## Architecture

- [ ] Stage evaluation is pure and application-layer owned.
- [ ] BlueprintExecutionService coordinates journey operations.
- [ ] Zustand delegates only.
- [ ] Components do not import BlueprintRegistry or BP-001 directly.
- [ ] No generic workflow engine is introduced.
- [ ] No AI service is introduced.
- [ ] No migration or recovery engine is introduced.

## Data protection

- [ ] Existing answers remain preserved.
- [ ] Unknown answers remain preserved.
- [ ] Duplicate answers remain preserved.
- [ ] Editing earlier stages does not automatically delete later work.
- [ ] Rejected progression does not mutate the session.
- [ ] Rejected completion does not mutate the session.
- [ ] Diagnostics remain observational.

## Completion

- [ ] A valid decision is required.
- [ ] Required reflection is required.
- [ ] Completion is rejected when mandatory stages are incomplete.
- [ ] Completion succeeds when all structural requirements are met.
- [ ] A specific incomplete-journey application error exists.

## Compatibility

- [ ] LocalStorage key remains `brm.prototype.v1`.
- [ ] Legacy sessions continue to load.
- [ ] Decision Record filename remains unchanged.
- [ ] Existing Decision Record fields remain unchanged.
- [ ] BUILD-005 diagnostics continue working.
- [ ] All existing tests remain passing.
- [ ] Production build succeeds.

## Documentation

- [ ] README explains the guided journey.
- [ ] Final stage ownership decision is documented.
- [ ] Any persistence-field change is documented.
- [ ] Deferred scope is confirmed.
- [ ] Completion report is produced.
- [ ] No commit is created until independent review.

---

# 31. Required Completion Report

The implementation agent must return:

```text
BRMI-BUILD-006 — Completion Report

1. Repository baseline before implementation
2. Files created
3. Files modified
4. Final educational stage IDs
5. Final stage metadata ownership
6. Final journey evaluator interfaces
7. Stage completion policy
8. Required-answer policy
9. Duplicate-answer policy
10. Current-stage versus recommended-stage behaviour
11. Resume behaviour
12. BlueprintExecutionService changes
13. Zustand changes
14. UI journey implemented
15. Orientation behaviour
16. Constraint-discovery behaviour
17. Alternative-examination behaviour
18. Decision behaviour
19. Reflection prompts implemented
20. Review-stage behaviour
21. Session-completion rules
22. Incomplete-journey error behaviour
23. Student-work preservation evidence
24. BUILD-005 diagnostics compatibility
25. Decision Record compatibility
26. Storage compatibility
27. Legacy-session compatibility
28. Accessibility evidence
29. Tests added or modified
30. Total tests passing
31. Build result
32. Dependency-boundary verification
33. Deferred-scope confirmation
34. Files modified outside authorised scope
35. Known limitations
36. No commit created
37. BUILD-006 acceptance criteria result
```

No commit should be created until the completion report and actual diff are independently reviewed.

---

# 32. Implementation-Agent Prompt

Use the following prompt with the implementation agent after the repository-readiness inspection:

> Implement BRMI-BUILD-006 exactly as specified in `implementation/BRMI/Volume_01_Prototype/BRMI-BUILD-006_Guided_Research_Decision_Journey_and_Educational_Stage_Runtime.md`.
>
> Begin by inspecting the current repository and produce a concise implementation-readiness report before changing any file.
>
> Preserve ABR-003 boundaries. Do not introduce a generic workflow engine, AI generation, recovery, migration, Blueprint versioning, authentication, cloud persistence, analytics, supervisor features, or Decision Record redesign.
>
> Prefer declarative educational-stage metadata in the validated Blueprint contract if this can be introduced cleanly and compatibly. Otherwise use a small application-layer BP-001 journey map and document the reason.
>
> Keep journey evaluation pure and deterministic. Keep Zustand delegation-only. Keep BlueprintRegistry and BP-001 imports out of pages and components.
>
> Preserve all student work. Do not delete unknown answers, duplicates, invalid stored decisions, or later-stage work when earlier answers change.
>
> Keep BUILD-005 diagnostics observational and fully compatible.
>
> Add comprehensive tests, run the full test suite and production build, verify dependency boundaries, update the README, update the BUILD-006 specification with final implementation facts, and return the required Completion Report.
>
> Do not create a git commit.

---

# 33. Initial Review Decision

BUILD-006 is approved to enter **implementation-readiness inspection**.

Coding is not yet authorised until the repository inspection confirms:

- the actual Blueprint and session structures;
- the current question set;
- the current UI flow;
- the safest stage-metadata ownership;
- whether reflection prompts require BP-001 changes;
- whether persistent stage state is necessary.

The implementation agent should inspect first, report, and then proceed using the smallest architecture consistent with this specification.

---

# 34. Final Implementation Facts

## Stage sequence (authorised refinement)

```text
ORIENTATION
CONTEXT
PROBLEM_FORMULATION
CONSTRAINT_DISCOVERY
ALTERNATIVE_EXAMINATION
DECISION
REFLECTION
REVIEW
```

`PROBLEM_FORMULATION` was added between Context and Constraint Discovery.

## Stage metadata ownership

Implemented as declarative `Blueprint.journeyStages` in the validated Blueprint contract.

`BlueprintQuestion.stage` remains a free-form pedagogical label and is not used as a journey-stage identifier.

## Persistence

No `currentJourneyStageId` field was added.

Recommended stage is derived by `deriveResearchJourneyProgress(session, blueprint)`.

Viewed stage is represented by the route `/journey/:stageId`.

## Question mapping (BP-001)

| Stage | Question IDs |
| --- | --- |
| ORIENTATION | `ORIENTATION_ACK` |
| CONTEXT | Q1, Q3 (+ non-empty `initialIdea`) |
| PROBLEM_FORMULATION | Q2, Q4 |
| CONSTRAINT_DISCOVERY | Q5, Q6, Q7, Q8 |
| ALTERNATIVE_EXAMINATION | Q9, Q15 |
| DECISION | valid Blueprint decision (no question IDs) |
| REFLECTION | Q10, Q11, Q12, Q13, Q14 |
| REVIEW | summary only |

Q1–Q10 wording preserved. Added: `ORIENTATION_ACK`, Q11–Q14 (reflection), Q15 (alternative comparison). One question beyond Q14 was required: **Q15**.

## Orientation learning objectives

Stored on the ORIENTATION stage as `learningObjectives` and rendered in the journey UI.

## Structural completion policy

A required answer is satisfied when at least one matching answer has non-whitespace text.

UI Continue controls use the same structural completeness result (no separate 10/30 character thresholds on the journey path).

## Completion gate

`BlueprintExecutionService.completeResearchJourney()` throws `IncompleteResearchJourneyError` when incomplete.

Zustand exposes `completeResearchJourney` only. The Supervisor page no longer calls completion; it links to Review / Record.

## Compatibility

- Storage key: `brm.prototype.v1`
- Decision Record filename: `BRM_BP-001_Decision_Record.json`
- Decision Record fields unchanged
- BUILD-005 diagnostics unchanged and observational

## Verification snapshot

- Tests: 90 passed / 12 files
- Production build: success
- No git commit created during implementation
