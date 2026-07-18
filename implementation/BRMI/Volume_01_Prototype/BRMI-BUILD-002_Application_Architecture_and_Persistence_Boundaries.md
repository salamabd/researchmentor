# BRMI-BUILD-002 — Application Architecture and Persistence Boundaries

**Status:** Approved for implementation  
**Series:** Business Research Mentor Implementation (BRMI)  
**Volume:** 01 — Prototype  
**Classification:** Authoritative Build Specification  
**Depends on:** BRMI-BUILD-001 (implemented baseline 0.1), BRMI-001 (prototype architecture guidance)  
**Primary Decision Blueprint:** BP-001 — Choosing a Research Topic  
**Implementation target:** `apps/brm-prototype`

---

## 1. Purpose

BRMI-BUILD-002 introduces **application architecture and persistence boundaries** into the working BUILD-001 vertical slice.

It exists to answer one implementation question:

> Can the BP-001 prototype keep its current student–supervisor behaviour while separating domain rules, application orchestration, persistence, and React state?

### 1.1 Objectives

1. Introduce a **domain model** centred on `ResearchSession`.
2. Define a **minimal session lifecycle**.
3. Extract **deterministic domain functions** for progression and completion checks used by the current flow.
4. Define a **`ResearchSessionRepository`** port (contract).
5. Implement a **LocalStorage repository adapter**.
6. Introduce an **application service** that owns use-case operations.
7. Reduce **Zustand** to a **React state adapter** (not the owner of mentoring rules or persistence I/O).
8. Compose dependencies explicitly.
9. Extract **Decision Record** construction from page-level ad hoc objects into a deterministic domain/application function.
10. Add focused tests for domain, repository, and application behaviour.
11. Preserve BUILD-001 user-visible behaviour and storage compatibility.

### 1.2 Non-objectives

BUILD-002 does **not**:

- redesign the interface;
- change BP-001 question wording, order, or mock alternatives;
- change route paths or navigation outcomes;
- add AI integration, authentication, backend services, or additional blueprints;
- implement the full BRMI-001 enterprise domain model;
- implement the Intelligence layer;
- introduce IndexedDB, remote APIs, or multi-session institutional storage;
- fill or rewrite BRMF, BOK, governance, archive, methodology, research, theory, or specification documents outside this BRMI build file.

---

## 2. Current Implementation (BUILD-001 Baseline)

The accepted BUILD-001 baseline in `apps/brm-prototype` provides:

| Area | Current state |
| --- | --- |
| Stack | React, TypeScript, Vite, Node 24 LTS |
| Routes | `/welcome`, `/profile`, `/idea`, `/guided`, `/decision`, `/supervisor`, `/record` (+ redirects) |
| Blueprint | `src/blueprints/BP-001/blueprint.ts` (TS module; 10 questions; 3 mock alternatives) |
| Domain types | Thin UI-oriented types in `src/domain/types.ts` |
| State | Zustand store `usePrototypeStore` with `persist` middleware |
| Persistence key | `brm.prototype.v1` |
| Persistence shape | Flattened `PrototypeState` fields written by Zustand persist |
| Decision Record | Constructed inline in `RecordPage` and downloaded as JSON |
| Tests | Blueprint integrity test only |
| Architecture | UI → Zustand → localStorage (no application/repository boundary) |

BUILD-002 must start from this baseline and move logic across boundaries **without changing product behaviour**.

---

## 3. Target Dependency Direction

### 3.1 Allowed dependency direction

Dependency rules for BUILD-002:

1. The **presentation layer** depends on the **application layer**.
2. The **application layer** depends on the **domain layer** and the **repository port**.
3. The infrastructure **LocalStorage adapter** implements the **repository port**.
4. The **domain layer** does **not** depend on persistence or infrastructure.

```text
Presentation (React pages/components, Zustand adapter)
        ↓
Application (services / use cases)
        ↓
Domain (models, pure functions, invariants)
        ↑
Repository port (ResearchSessionRepository)
        ↑
Infrastructure adapter (LocalStorageResearchSessionRepository)
```

Zustand belongs to the **presentation adapter** surface:

```text
React UI  ↔  Zustand adapter  ↔  Application service  ↔  Domain
                                      ↕
                         ResearchSessionRepository (port)
                                      ↕
                         LocalStorageResearchSessionRepository (adapter)
```

### 3.2 Hard rules

1. **UI must not** import LocalStorage APIs directly for session persistence.
2. **UI must not** contain mentoring progression or completion rules beyond calling application operations and rendering results.
3. **Domain must not** import React, Zustand, `localStorage`, persistence adapters, or other infrastructure modules.
4. **Application may** depend on Domain and on repository **ports**.
5. **Persistence adapters may** depend on Domain types and browser storage; they must not depend on React components.
6. **Zustand must not** embed persistence middleware that bypasses the repository after BUILD-002 (see §10 and §16).
7. Blueprint question content remains data; domain functions may read blueprint structure but must not hard-code educational wording in multiple places.

---

## 4. Domain Layer and ResearchSession Model

### 4.1 Domain responsibility

The Domain layer owns:

- session aggregate shape;
- answer upsert semantics;
- question-index bounds relative to BP-001;
- minimal lifecycle transitions;
- Decision Record payload construction (deterministic, pure);
- invariants that protect student-owned wording.

The Domain layer does **not** own:

- React rendering;
- route navigation;
- AI analysis;
- persistence or infrastructure concerns;
- schema evolution of BRMF documents.

### 4.2 Retained BUILD-001 value types

Keep compatibility with current fields (names and meanings preserved):

```ts
type DegreeLevel = "MBA" | "MSc" | "DBA" | "PhD" | "Other";

type ResearchExperience = "none" | "limited" | "moderate" | "experienced";

interface StudentProfile {
  degreeLevel: DegreeLevel;
  discipline: string;
  researchExperience: ResearchExperience;
  professionalContext: string;
}

interface Answer {
  questionId: string;
  text: string;
}

interface Decision {
  alternativeId: string;
  justification: string;
  confidence: number;
}

interface Alternative {
  id: string;
  title: string;
  description: string;
  strengths: string[];
  risks: string[];
}

interface BlueprintQuestion {
  id: string;
  stage: string;
  text: string;
  rationale: string;
}

interface Blueprint {
  id: string;
  title: string;
  questions: BlueprintQuestion[];
}
```

### 4.3 ResearchSession aggregate

Introduce a session aggregate that **contains** the BUILD-001 working fields and adds minimal identity/lifecycle metadata required for persistence boundaries.

BUILD-002 defines **exactly three** session statuses:

```ts
type ResearchSessionStatus = "not_started" | "in_progress" | "completed";

interface ResearchSession {
  id: string;
  blueprintId: string; // "BP-001" for this build
  status: ResearchSessionStatus;
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  currentQuestionIndex: number;
  decision?: Decision;
  supervisorFeedback: string;
  completed: boolean; // retained for BUILD-001 behaviour and Decision Record shape
  startedAt: string; // ISO-8601
  updatedAt: string; // ISO-8601
  completedAt?: string; // ISO-8601
}
```

### 4.4 Modelling constraints for BUILD-002

1. Do **not** require `displayName`, multi-profile identity, or `studentProfileId` foreign keys yet.
2. Do **not** introduce Reasoning Findings, AI policies, audit event streams, or multi-blueprint registries in this build.
3. `completed: boolean` remains part of the export/UI contract; lifecycle `status` must stay consistent with it (see §5).
4. `blueprintId` must be `"BP-001"` for all sessions created by this prototype.
5. Student original wording in `initialIdea`, `answers[].text`, `decision.justification`, and `supervisorFeedback` must never be rewritten by domain functions.

---

## 5. Minimal Session Lifecycle

BUILD-002 uses exactly three lifecycle statuses. No additional statuses are authorised.

### 5.1 Status meanings

| Status | Meaning in BUILD-002 |
| --- | --- |
| `not_started` | The session contains no meaningful user progress. |
| `in_progress` | Meaningful progress exists and the session has not been explicitly completed. |
| `completed` | The existing completion action has been performed. |

### 5.2 Status determination (deterministic)

Status is derived from session data:

1. If the existing completion action has set `completed` to `true`, status is `completed`.
2. Else if the session has meaningful user progress, status is `in_progress`.
3. Else status is `not_started`.

Meaningful progress includes any non-trivial user-owned working data already captured by BUILD-001 (for example a non-empty initial idea, answers, question-index movement, decision, supervisor feedback, or profile fields changed from defaults). Exact detection remains a pure domain function.

### 5.3 Deterministic transitions (minimal)

| From | Triggering condition / operation | To |
| --- | --- | --- |
| _(new)_ | create / reset session | `not_started` |
| `not_started` | meaningful progress appears (via ordinary updates) | `in_progress` |
| `in_progress` | existing completion action (`complete` / `markComplete`) | `completed` |
| any | reset session | new `not_started` session |

There is **no** separate status for supervisor submission or review. Supervisor feedback remains a BUILD-001 field updated while the session is `in_progress` until the existing completion action is performed.

### 5.4 Consistency rules

1. When `status === "completed"`, `completed` must be `true` and `completedAt` must be set.
2. When `status !== "completed"`, `completed` must be `false` and `completedAt` must be unset.
3. Status determination and update helpers are pure domain functions; persistence is performed by application + repository after updates.
4. BUILD-002 does **not** add new user-facing gates beyond existing UI disabled-button rules. Lifecycle tracking must not block routes that BUILD-001 currently leaves open.

---

## 6. Deterministic Domain Functions

Implement pure functions (no I/O) in the Domain layer. Names may vary slightly, but responsibilities must exist.

### 6.1 Required functions

1. **`createEmptySession(nowIso: string, id: string): ResearchSession`**  
   Returns a `not_started` session with BUILD-001 default profile values and empty working fields.

2. **`upsertAnswer(session, questionId, text, nowIso): ResearchSession`**  
   Replaces any existing answer for `questionId`; preserves other answers; updates `updatedAt` and derived status.

3. **`setCurrentQuestionIndex(session, index, questionCount): ResearchSession`**  
   Clamps index to `[0, questionCount - 1]`; updates `updatedAt` and derived status.

4. **`nextQuestionIndex(session, questionCount): ResearchSession`**  
   Advances by one without exceeding last question index.

5. **`previousQuestionIndex(session): ResearchSession`**  
   Decrements by one without going below 0.

6. **`withProfile(session, profile, nowIso): ResearchSession`**

7. **`withInitialIdea(session, idea, nowIso): ResearchSession`**  
   Updates the idea and re-derives status (`not_started` / `in_progress` as appropriate).

8. **`withDecision(session, decision, nowIso): ResearchSession`**

9. **`withSupervisorFeedback(session, feedback, nowIso): ResearchSession`**

10. **`markCompleted(session, nowIso): ResearchSession`**  
    Performs the existing completion action: sets `completed`, `completedAt`, `updatedAt`, and `status` to `completed`.

11. **`buildDecisionRecord(input): DecisionRecord`**  
    Pure extraction of the export payload (see §12).

12. **`hasMeaningfulProgress(session): boolean`** and **`determineSessionStatus(session): ResearchSessionStatus`**  
    Pure lifecycle helpers used by normalisation and updates.

### 6.2 Deterministic completion helpers (minimal)

Provide helpers used by tests and application logic; do **not** invent new UI-blocking completion engines:

- `hasMinimumIdea(session): boolean` — `initialIdea.trim().length >= 20` (matches BUILD-001 Idea page rule)
- `hasAnswerMinimum(session, questionId): boolean` — answer trim length `>= 10` (matches Guided page rule)
- `hasDecisionMinimum(session): boolean` — alternative selected and justification trim length `>= 30` (matches Decision page rule)
- `hasSupervisorFeedbackMinimum(session): boolean` — feedback trim length `>= 20` (matches Supervisor page rule)

These helpers encode **existing UI thresholds** as shared deterministic rules so pages can later call one source of truth without changing thresholds in BUILD-002 unless required for extraction safety. Prefer extracting current literals into named domain constants to avoid drift.

---

## 7. ResearchSessionRepository Contract

### 7.1 Port

```ts
interface ResearchSessionRepository {
  load(): ResearchSession | null;
  save(session: ResearchSession): void;
  clear(): void;
}
```

### 7.2 Contract rules

1. `load()` returns `null` when no usable session exists.
2. `save(session)` replaces the single prototype session document.
3. `clear()` removes the stored session (used by reset).
4. The port is synchronous for BUILD-002 (LocalStorage).
5. The port must be mockable in unit tests without React.
6. Only one current prototype session is supported (single-device, single-student BUILD-001 model).

---

## 8. LocalStorage Repository Adapter

### 8.1 Adapter responsibilities

Implement `LocalStorageResearchSessionRepository` (name may vary) that:

1. Reads/writes browser `localStorage`.
2. Uses storage key **`brm.prototype.v1`** (unchanged).
3. Serialises/deserialises JSON.
4. Implements BUILD-001 storage compatibility (§16).
5. Never throws uncaught errors into React render paths; application service may catch and fall back to an empty session on corrupt data.

### 8.2 Adapter constraints

1. No React imports.
2. No mentoring rules beyond parse/map/validate structural presence.
3. May perform structural normalisation from legacy BUILD-001 persist payloads into `ResearchSession`.
4. Must write a payload that round-trips through `load()` after `save()`.
5. Implements the repository port; the domain does not depend on this adapter.

---

## 9. Application Service Operations

### 9.1 Service role

Introduce an application service (for example `PrototypeSessionService` or `ResearchSessionService`) that:

- loads/saves via `ResearchSessionRepository`;
- calls domain functions;
- returns updated `ResearchSession` (and/or Decision Record) to the Zustand adapter;
- owns use-case sequencing for persistence.

### 9.2 Required operations

| Operation | Behaviour |
| --- | --- |
| `getSession()` | Load from repository or create empty session and persist |
| `resetSession()` | Clear storage and create a new `not_started` session |
| `updateProfile(profile)` | Domain update + save |
| `updateInitialIdea(idea)` | Domain update + status re-derivation + save |
| `saveAnswer(questionId, text)` | Domain upsert + save |
| `goToNextQuestion(questionCount)` | Domain next + save |
| `goToPreviousQuestion()` | Domain previous + save |
| `updateDecision(decision)` | Domain update + save |
| `updateSupervisorFeedback(text)` | Domain update + save |
| `completeSession()` | Existing completion action + save (`status` becomes `completed`) |
| `exportDecisionRecord(alternatives)` | Build deterministic Decision Record from current session + selected alternative metadata |

### 9.3 Navigation

Route navigation remains in React (`react-router-dom`). The application service does **not** own routing. Pages continue to navigate as in BUILD-001; they may call a service operation immediately before or after navigation where persistence must occur.

### 9.4 Error handling (minimal)

- Corrupt storage → treat as empty session, optionally clear key, continue.
- No user-facing redesign of error UI is required in BUILD-002.

---

## 10. Zustand as a React State Adapter

### 10.1 Role after BUILD-002

Zustand holds **in-memory session state for React subscriptions**.

It must:

1. Expose selectors/actions used by existing pages with **behaviour-compatible** method names where practical (`setProfile`, `setInitialIdea`, `saveAnswer`, `nextQuestion`, `previousQuestion`, `setDecision`, `setSupervisorFeedback`, `complete`, `reset`), implemented as thin wrappers over the application service.
2. Initialise from the repository/application service on store creation.
3. Keep UI re-render behaviour equivalent for the same user actions.

It must **not**:

1. Contain mentoring business rules beyond delegating to application/domain.
2. Use Zustand `persist` middleware as the system of record after migration (repository adapter owns LocalStorage).
3. Import page components.

### 10.2 Compatibility preference

Prefer preserving the existing hook name `usePrototypeStore` and action names so page edits remain mechanical. Internal implementation may change freely behind that facade.

---

## 11. Dependency Composition

### 11.1 Composition root

Create a small composition module (for example `src/app/composition.ts` or `src/persistence/createPrototypeRuntime.ts`) that:

1. Instantiates `LocalStorageResearchSessionRepository`.
2. Instantiates the application service with that repository and a clock/id provider.
3. Supplies the service to the Zustand adapter factory.

### 11.2 Clock and IDs

Inject simple ports for testability:

```ts
interface Clock {
  nowIso(): string;
}

interface IdGenerator {
  nextId(): string;
}
```

Production adapters may use `new Date().toISOString()` and a simple unique id strategy (`crypto.randomUUID()` when available, with a deterministic fallback only in tests).

### 11.3 Blueprint access

BP-001 remains imported from `src/blueprints/BP-001/blueprint.ts` in BUILD-002. Do not convert to JSON in this build unless required for tests; converting blueprints to validated JSON is out of scope.

---

## 12. Decision Record Extraction

### 12.1 Required export shape (behaviour preservation)

The downloaded JSON must remain structurally compatible with BUILD-001:

```ts
interface DecisionRecord {
  blueprint: string; // bp001.id
  profile: StudentProfile;
  initialIdea: string;
  answers: Answer[];
  decision?: Decision;
  selectedDirection?: Alternative; // resolved from mockAlternatives by decision.alternativeId
  supervisorFeedback: string;
  completed: boolean;
  exportedAt: string; // ISO-8601 at export time
}
```

### 12.2 Rules

1. `buildDecisionRecord` (domain or application pure helper) constructs this object.
2. `RecordPage` may still trigger download via Blob/anchor, but must not assemble field mapping ad hoc if a shared builder exists.
3. Filename remains `BRM_BP-001_Decision_Record.json`.
4. Field names and nesting must not change.

---

## 13. Testing Requirements

### 13.1 Mandatory tests

Add focused unit tests (Vitest) for:

1. **Domain answer upsert** — replace same `questionId`, keep others.
2. **Question index bounds** — next/previous clamp behaviour.
3. **Lifecycle determination** — `not_started` with no progress; `in_progress` when meaningful progress exists; `completed` after the existing completion action.
4. **Decision Record builder** — stable field mapping.
5. **LocalStorage repository** — save/load/clear round-trip (jsdom).
6. **Legacy BUILD-001 payload load** — flattened Zustand persist-shaped payload (or the previously saved working fields) normalises into `ResearchSession` without data loss of profile/idea/answers/decision/feedback/completed/index.

### 13.2 Existing tests

Keep the BP-001 integrity test passing.

### 13.3 Explicitly not required in BUILD-002

- New component/RTL journey tests
- Visual regression tests
- E2E browser automation

### 13.4 Commands that must pass

From `apps/brm-prototype`:

```sh
npm install
npm test
npm run build
```

---

## 14. Recommended Folder Structure

Evolve toward (names may vary slightly, responsibilities must not):

```text
apps/brm-prototype/src/
├── app/
│   ├── App.tsx
│   └── composition.ts
├── application/
│   └── sessionService.ts
├── blueprints/
│   └── BP-001/
│       ├── blueprint.ts
│       └── blueprint.test.ts
├── components/
├── domain/
│   ├── types.ts
│   ├── session.ts              # ResearchSession model + pure functions
│   ├── decisionRecord.ts       # pure Decision Record builder
│   └── session.test.ts
├── pages/
├── persistence/
│   ├── researchSessionRepository.ts   # port
│   ├── localStorageResearchSessionRepository.ts
│   └── localStorageResearchSessionRepository.test.ts
├── state/
│   └── usePrototypeStore.ts    # Zustand React adapter
├── styles/
├── test/
│   └── setup.ts
└── main.tsx
```

Do **not** create unused enterprise folders (`intelligence/`, `audit/`, `evaluation/`) in BUILD-002.

---

## 15. Explicit Exclusions

BUILD-002 excludes:

1. AI provider adapters, prompts, findings, and explainability services
2. Authentication / authorisation
3. Backend/API persistence
4. IndexedDB
5. Multi-session lists, archival workflows, or institutional admin
6. Additional blueprints beyond BP-001
7. Changing educational copy, mock alternatives, or visual design system
8. Route path changes
9. Full BRMI-001 completion-evidence engine (stakeholder/evidence/constraint extraction beyond current Q&A text capture)
10. Domain events bus
11. Rewriting empty framework/governance documents
12. Any session lifecycle beyond `not_started`, `in_progress`, and `completed`

---

## 16. Behaviour-Preservation Requirements

Unless a defect blocks the architecture extraction, BUILD-002 must preserve:

1. All existing route paths and redirects
2. Page sequence and button enablement thresholds currently in the UI
3. BP-001 question ids, order, text, stages, and rationales
4. Mock alternative ids/titles/descriptions/strengths/risks
5. Persistence key `brm.prototype.v1`
6. Decision Record download filename and JSON field names
7. Local-first single-session resume behaviour
8. Reset behaviour that clears the working prototype session
9. No new mandatory fields in the UI

Mechanical page edits that only redirect calls through the Zustand adapter/application service are allowed.

---

## 17. BUILD-001 Storage Compatibility

### 17.1 Key

Storage key remains:

```text
brm.prototype.v1
```

### 17.2 Legacy payload acceptance

BUILD-001 Zustand persist typically stores an object containing working fields such as:

- `profile`
- `initialIdea`
- `answers`
- `currentQuestionIndex`
- `decision` (optional)
- `supervisorFeedback`
- `completed`

and may include Zustand persist metadata depending on middleware shape (`state` wrapper). The LocalStorage adapter **must** accept:

1. A raw flattened BUILD-001 state object, and/or
2. A Zustand persist envelope if present,

and normalise into `ResearchSession` by:

- generating `id` if missing;
- setting `blueprintId` to `"BP-001"` if missing;
- deriving `status` with the three-status rules in §5 (`completed` → `completed`; else meaningful progress → `in_progress`; else `not_started`);
- setting `startedAt`/`updatedAt` if missing using clock at load time;
- preserving all student/supervisor textual fields exactly.

### 17.3 Write format

After BUILD-002, `save()` may persist a `ResearchSession`-shaped document (optionally wrapped). Future loads must support both legacy and new shapes. Prefer a single documented stored document shape once rewritten by the new adapter, while remaining able to read legacy documents at least once.

### 17.4 Compatibility test obligation

Include at least one automated test proving a representative BUILD-001 payload loads without losing answers/decision/feedback.

---

## 18. TypeScript and Dependency Constraints

1. Remain on the BUILD-001/MAINT-001 toolchain: React + TypeScript + Vite + Vitest in `apps/brm-prototype`.
2. Node requirement remains `engines.node: ">=24 <25"`.
3. Do **not** add new runtime product dependencies unless unavoidable.
4. Prefer using existing packages (`zustand`, `zod` if needed for parse guards). Zod is already present; if used, limit it to persistence normalisation/validation, not UI redesign.
5. Do not upgrade/downgrade packages as part of BUILD-002 except to fix a build break caused by the architecture extraction.
6. Domain code must compile under existing strict TypeScript settings.
7. No `any` in new domain/application/persistence code without explicit justification in the completion report.

---

## 19. Documentation Requirements

### 19.1 This specification

This file is the authoritative BUILD-002 implementation specification.

### 19.2 Application README

Update `apps/brm-prototype/README.md` only to note, briefly:

- BUILD-002 introduces domain/application/persistence boundaries;
- persistence remains localStorage key `brm.prototype.v1`;
- no AI/backend yet.

Do not invent broader architectural commitments in the root README beyond pointing to implementation docs.

### 19.3 BUILD-001 document

Do not rewrite BRMI-BUILD-001 history. Optionally add a single “Superseded in part by BUILD-002 for persistence ownership” note only if necessary; default is leave BUILD-001 unchanged.

### 19.4 Out of scope documents

Do not modify BRMF, BOK, governance, methodology, research, theory, archive, or non-BRMI specification documents.

---

## 20. Quality Gates

BUILD-002 is not complete unless all gates pass:

1. `npm install` succeeds in `apps/brm-prototype`
2. `npm test` succeeds (existing + new required tests)
3. `npm run build` succeeds
4. Manual smoke: complete Welcome → Profile → Idea → Guided → Decision → Supervisor → Record → Export JSON
5. Manual smoke: refresh browser mid-journey and confirm resume from `brm.prototype.v1`
6. Manual smoke: Reset clears session
7. No intentional UI redesign
8. Dependency direction rules in §3 are not violated by imports

---

## 21. Completion-Report Requirements

After implementation, produce a completion report containing:

1. Files created
2. Files modified
3. Summary of architecture boundaries introduced
4. Domain functions added
5. Repository contract and adapter behaviour
6. Storage compatibility approach and tests
7. Decision Record extraction location
8. Tests executed and results
9. Build result
10. Confirmation that routes, BP-001 content, mock alternatives, persistence key, and Decision Record field names are unchanged
11. Git status summary
12. Unresolved issues / follow-ups for later builds
13. Explicit statement that no commit was created unless the user requested one

Do not commit unless explicitly requested.

---

## 22. Acceptance Criteria

BUILD-002 is accepted when all of the following are true:

1. A `ResearchSession` domain model exists and is used as the persistence aggregate.
2. Deterministic domain functions own answer upsert, question-index bounds, and minimal lifecycle transitions among `not_started`, `in_progress`, and `completed`.
3. A `ResearchSessionRepository` port exists.
4. A LocalStorage adapter implements the port using key `brm.prototype.v1`.
5. An application service orchestrates load/save/use-case operations.
6. Zustand acts as a React state adapter over the application service (not the persistence system of record).
7. Dependency direction matches §3.
8. Decision Record JSON shape and filename remain BUILD-001-compatible and are built by a shared deterministic function.
9. Required tests in §13 pass.
10. `npm test` and `npm run build` pass.
11. User-visible BP-001 journey behaviour is preserved.
12. Legacy BUILD-001 stored sessions can be loaded.
13. Exclusions in §15 were respected.
14. This specification’s status remains the authority for BUILD-002 implementation decisions.

---

## 23. Implementation Guidance (Non-normative)

Suggested sequence:

1. Add domain types + pure session functions + tests.
2. Add Decision Record builder + tests.
3. Add repository port + LocalStorage adapter + legacy normalisation tests.
4. Add application service.
5. Rebind Zustand actions to the service; remove Zustand `persist` as system of record.
6. Mechanically update pages only if import/action signatures require it.
7. Run quality gates and write completion report.

Prefer small, reviewable diffs. Do not refactor unrelated styling or documentation.

---

## 24. Relationship to Later Builds

BUILD-002 prepares boundaries for later work (not authorised here), such as:

- richer completion rules and evidence checks;
- validated JSON blueprints;
- intelligence/AI adapters;
- audit/evaluation modules.

Those remain future builds and must not be pulled into BUILD-002.

---

**End of BRMI-BUILD-002 authoritative specification.**
