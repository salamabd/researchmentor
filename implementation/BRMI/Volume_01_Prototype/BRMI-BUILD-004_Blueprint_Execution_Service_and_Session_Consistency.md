# BRMI-BUILD-004 — Blueprint Execution Service and Session–Blueprint Consistency

**Project:** Business Research Mentor  
**Component:** BRM Prototype  
**Build ID:** BRMI-BUILD-004  
**Status:** Approved for Implementation  
**Baseline:** Post BRMI-BUILD-003  
**Date:** 2026-07-18  

---

## 1. Purpose

BRMI-BUILD-004 introduces an application-layer execution boundary that coordinates a registered Blueprint with the active Research Session.

The build removes Blueprint orchestration from Zustand while preserving the existing responsibilities of:

* `SessionService`;
* `BlueprintRegistry`;
* the domain model;
* the persistence layer;
* React pages;
* browser-only presentation effects.

This milestone is an architectural refinement. It must not introduce new educational functionality or change BP-001 behaviour.

---

## 2. Objective

Create a small application-layer service that coordinates:

```text
SessionService
+
BlueprintRegistry
```

for Blueprint-aware operations.

The resulting dependency flow shall be:

```text
React Pages
    ↓
Zustand UI Adapter
    ↓
BlueprintExecutionService
    ↓
SessionService + BlueprintRegistry
    ↓
Domain Model + Repository Port
```

Zustand remains a React-facing state adapter.

It must no longer resolve Blueprints, calculate Blueprint question counts, or supply Blueprint alternatives directly.

---

## 3. Architectural Responsibilities

### 3.1 BlueprintExecutionService

The new service is responsible for:

* resolving the active Blueprint from the current Research Session;
* returning the active Blueprint;
* returning the current Blueprint question;
* coordinating next-question navigation using the active Blueprint length;
* coordinating previous-question navigation;
* validating a newly selected alternative against the active Blueprint;
* coordinating Decision Record creation using the active Blueprint alternatives;
* detecting explicit unknown Blueprint identifiers;
* exposing Blueprint-aware operations to Zustand.

It must not:

* perform browser downloads;
* directly access LocalStorage;
* implement React state;
* own Blueprint registration;
* duplicate general session mutations already provided by `SessionService`;
* implement domain lifecycle rules;
* silently delete answers;
* become a general workflow engine.

### 3.2 SessionService

`SessionService` remains responsible for general Research Session use cases, including:

* session loading;
* session persistence;
* profile updates;
* initial-idea updates;
* answer updates;
* question-index mutation;
* decision persistence;
* supervisor feedback;
* completion;
* reset;
* Decision Record domain-builder invocation.

Where possible, `BlueprintExecutionService` should delegate these operations to `SessionService`.

### 3.3 BlueprintRegistry

`BlueprintRegistry` remains responsible only for:

* validated Blueprint storage;
* retrieval by identifier;
* existence checks;
* identifier enumeration;
* clear failure for unknown identifiers.

It must not contain Research Session logic.

### 3.4 Zustand

Zustand remains responsible for:

* exposing current UI state;
* exposing UI-facing actions;
* reflecting updated Research Session values;
* delegating application operations to services.

Zustand must not:

* import `BlueprintRegistry`;
* directly call `BlueprintRegistry`;
* import BP-001 content;
* calculate Blueprint question limits;
* validate alternative identifiers;
* assemble Decision Record inputs;
* access LocalStorage.

### 3.5 Presentation

React pages may:

* render the active Blueprint and current question;
* render Blueprint alternatives;
* invoke Zustand actions;
* create Blob objects;
* trigger browser downloads;
* retain page-level validation thresholds.

React pages must not:

* import BP-001 directly;
* import the registry;
* resolve Blueprint identifiers;
* coordinate session–Blueprint consistency.

---

## 4. Required Service Design

Create:

```text
apps/brm-prototype/src/application/blueprintExecutionService.ts
```

and:

```text
apps/brm-prototype/src/application/blueprintExecutionService.test.ts
```

The exact API may be adapted to the current codebase, but it should remain close to the following minimal contract:

```ts
export class BlueprintExecutionService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly blueprintRegistry: BlueprintRegistry,
  ) {}

  getActiveBlueprint(): Blueprint;

  getCurrentQuestion(): BlueprintQuestion;

  goToNextQuestion(): ResearchSession;

  goToPreviousQuestion(): ResearchSession;

  saveDecision(input: Decision): ResearchSession;

  createDecisionRecord(): DecisionRecord;
}
```

Additional methods may be added only when clearly necessary to remove Blueprint orchestration from Zustand.

The service should not reproduce every `SessionService` method.

Composition must be used. Inheritance must not be used.

---

## 5. Active Blueprint Resolution

The active Blueprint shall be resolved from:

```ts
session.blueprintId
```

through:

```ts
BlueprintRegistry.getById(session.blueprintId)
```

### 5.1 Missing legacy identifier

A missing, undefined, null, whitespace-only, or empty legacy `blueprintId` shall continue to normalise to:

```text
BP-001
```

This behaviour should remain in the existing session normalisation or migration boundary.

### 5.2 Explicit unknown identifier

An explicit non-empty identifier that is not present in the registry must not silently fall back to BP-001.

Example:

```text
BP-999
```

Required behaviour:

* throw a clear application-level error;
* preserve the session and student-entered data;
* do not rewrite the identifier silently;
* allow the problem to be diagnosed.

---

## 6. Error Handling

Introduce only the smallest useful application-level error.

Recommended:

```ts
export class UnknownBlueprintError extends Error {
  constructor(public readonly blueprintId: string) {
    super(`Unknown blueprint id: ${blueprintId}`);
    this.name = "UnknownBlueprintError";
  }
}
```

The service may translate the registry’s generic unknown-id error into this application error.

No broad enterprise error hierarchy is required.

A separate invalid-alternative error may be introduced only if it materially improves tests and behaviour:

```ts
export class InvalidBlueprintAlternativeError extends Error
```

Standard `Error` with a precise message is also acceptable if consistency is maintained.

---

## 7. Current Question Resolution

The current question shall be resolved using:

```ts
activeBlueprint.questions[session.currentQuestionIndex]
```

The service must not use a hard-coded question count.

If the index exceeds the current Blueprint bounds, the service shall use the existing domain clamping behaviour where available.

The service must not silently delete answers associated with questions that no longer exist.

If no current question can be resolved after valid clamping, the service should throw a clear application error rather than returning an invalid value.

---

## 8. Navigation

### 8.1 Next question

`goToNextQuestion()` shall:

1. resolve the active Blueprint;
2. obtain `activeBlueprint.questions.length`;
3. delegate index mutation to `SessionService`;
4. preserve existing clamping behaviour;
5. return the updated session.

### 8.2 Previous question

`goToPreviousQuestion()` shall:

1. delegate to the existing `SessionService` and domain navigation;
2. preserve current lower-bound behaviour;
3. return the updated session.

Navigation must not introduce route changes.

The existing final-question page transition remains presentation-controlled.

---

## 9. Decision Validation

When saving a new decision, the application layer must verify that:

```ts
decision.alternativeId
```

exists in:

```ts
activeBlueprint.alternatives
```

Unknown alternative identifiers must be rejected before session persistence.

Validation belongs in `BlueprintExecutionService` because it depends on both:

* the active Research Session;
* the registered Blueprint definition.

The domain `Decision` type remains generic and must not depend on BlueprintRegistry.

Existing stored invalid decisions must not be automatically deleted.

They may be preserved and exposed as unresolved when read. New invalid decisions must not be accepted.

---

## 10. Answer Consistency

BUILD-004 must preserve all student-entered answers.

The service may detect answers whose `questionId` does not exist in the active Blueprint, but it must not:

* delete them;
* filter them from persistence;
* overwrite their text;
* silently remap them.

Required policy:

```text
Preserve but do not silently treat as current Blueprint answers
```

A full mismatch-reporting or migration mechanism is deferred.

Duplicate-answer prevention remains governed by existing domain answer-upsert logic.

Missing answers are valid and must not be treated as corruption.

Answer storage order need not be rewritten to match Blueprint order.

---

## 11. Decision Record Export

Decision Record generation shall be coordinated through `BlueprintExecutionService`.

The service shall:

1. resolve the active Blueprint;
2. pass the active Blueprint alternatives to `SessionService`;
3. preserve the existing domain Decision Record builder;
4. preserve existing output field names;
5. preserve BP-001 export compatibility.

The browser download remains in `RecordPage`.

For BP-001, the filename remains:

```text
BRM_BP-001_Decision_Record.json
```

No Blueprint version field shall be added to the export in BUILD-004.

---

## 12. Blueprint Version Decision

`Blueprint.version` remains part of the Blueprint definition.

`ResearchSession` shall not be required to add `blueprintVersion` during BUILD-004.

Decision:

```text
Deferred
```

Reasoning:

* only BP-001 currently exists;
* no Blueprint migration mechanism exists;
* adding the field would expand LocalStorage migration scope;
* version mismatch behaviour has not yet been designed;
* BUILD-004 focuses on execution boundaries and identifier consistency.

The need for session-level Blueprint version tracking should be revisited when:

* a Blueprint is revised incompatibly;
* a second Blueprint is introduced;
* migration policy is designed.

---

## 13. Composition Root

Update:

```text
apps/brm-prototype/src/app/composition.ts
```

The composition root shall construct:

```ts
const repository = ...
const sessionService = new SessionService(...)
const blueprintRegistry = createBlueprintRegistry([bp001])
const blueprintExecutionService =
  new BlueprintExecutionService(sessionService, blueprintRegistry)
```

Exact order may follow constructor requirements.

Export the execution service for use by the Zustand adapter.

Pages must not import the composition-root registry directly.

---

## 14. Zustand Changes

Update:

```text
apps/brm-prototype/src/state/usePrototypeStore.ts
```

Remove direct BlueprintRegistry use.

The store should delegate:

* active Blueprint retrieval;
* current-question retrieval;
* next-question navigation;
* previous-question navigation where appropriate;
* decision validation and persistence;
* Decision Record creation

to `BlueprintExecutionService`.

The store may continue exposing:

```ts
getBlueprint()
```

as a UI-facing compatibility method if pages currently depend on it, but its implementation must delegate to `BlueprintExecutionService`.

The store must not calculate:

```ts
blueprint.questions.length
```

for navigation.

---

## 15. Expected Page Impact

### WelcomePage

No change required.

### ProfilePage

No change required.

### IdeaPage

No change required.

### GuidedPage

May continue requesting:

* active Blueprint;
* current question;
* current session state;
* next and previous actions

through Zustand.

Must not resolve Blueprint consistency itself.

### DecisionPage

Must obtain alternatives through the Zustand adapter, backed by the execution service.

Decision saving must use execution-service validation.

### SupervisorPage

Must obtain the active Blueprint through the Zustand adapter.

No direct registry import.

### RecordPage

Must obtain Decision Record data through the Zustand adapter and execution service.

Blob construction and download remain in this page.

---

## 16. Files to Create

```text
apps/brm-prototype/src/application/blueprintExecutionService.ts
apps/brm-prototype/src/application/blueprintExecutionService.test.ts
```

An application-error file may be created only if it improves clarity:

```text
apps/brm-prototype/src/application/errors.ts
```

This is optional.

---

## 17. Files to Modify

Expected:

```text
apps/brm-prototype/src/app/composition.ts
apps/brm-prototype/src/state/usePrototypeStore.ts
apps/brm-prototype/src/application/sessionService.ts
apps/brm-prototype/src/pages/GuidedPage.tsx
apps/brm-prototype/src/pages/DecisionPage.tsx
apps/brm-prototype/src/pages/SupervisorPage.tsx
apps/brm-prototype/src/pages/RecordPage.tsx
apps/brm-prototype/README.md
implementation/BRMI/Volume_01_Prototype/BRMI-BUILD-004_Blueprint_Execution_Service_and_Session_Consistency.md
```

`SessionService` should be modified only if its current public methods prevent clean orchestration.

---

## 18. Files and Areas to Leave Untouched

Unless required solely for a test fixture:

* BP-001 educational wording;
* BP-001 question order;
* BP-001 stages and rationales;
* BP-001 alternatives;
* CSS and visual styling;
* route definitions;
* LocalStorage key;
* persistence adapter architecture;
* BRMF;
* BOK;
* governance;
* research;
* theory;
* methodology;
* archive materials.

---

## 19. Required Tests

Add tests proving:

1. the active Blueprint resolves from the session’s `blueprintId`;
2. BP-001 resolves successfully;
3. an explicit unknown Blueprint id throws a clear application error;
4. a missing legacy Blueprint identifier still normalises to BP-001 through the existing loading boundary;
5. the current question resolves from the active Blueprint and session index;
6. next-question navigation uses the active Blueprint question count;
7. final-question navigation clamps correctly;
8. previous-question navigation retains current lower-bound behaviour;
9. saving a valid alternative succeeds;
10. saving an unknown alternative fails;
11. an invalid stored decision is preserved rather than silently deleted;
12. Decision Record generation uses active Blueprint alternatives;
13. Decision Record output remains BUILD-001-compatible;
14. LocalStorage legacy-load tests remain passing;
15. Zustand does not import or call `BlueprintRegistry`;
16. pages do not import BP-001 or the registry directly;
17. domain dependency boundaries remain intact.

Existing tests must not be weakened merely to accommodate the new service.

---

## 20. Compatibility Requirements

The following must remain unchanged:

```text
Storage key:
brm.prototype.v1
```

```text
Decision Record filename:
BRM_BP-001_Decision_Record.json
```

Also unchanged:

* Decision Record JSON shape;
* BP-001 id;
* BP-001 version;
* BP-001 purpose;
* BP-001 educational content;
* question order;
* alternatives A/B/C;
* route paths;
* UI validation thresholds;
* visual styling;
* session lifecycle.

---

## 21. Explicit Exclusions

Do not implement:

* a workflow engine;
* Blueprint-driven routes;
* Blueprint selection UI;
* multiple active Blueprints;
* Blueprint authoring;
* Blueprint version migration;
* answer migration;
* remote Blueprint loading;
* AI mentoring;
* adaptive questioning;
* rules scripting;
* analytics;
* authentication;
* cloud persistence;
* supervisor dashboards;
* program-director dashboards.

---

## 22. Exact Acceptance Criteria

BRMI-BUILD-004 is complete only when:

1. An application-layer `BlueprintExecutionService`, or clearly equivalent service, coordinates `SessionService` and `BlueprintRegistry`.
2. Zustand no longer imports or calls `BlueprintRegistry` directly.
3. Zustand delegates Blueprint-aware operations to the execution service.
4. Missing or empty legacy `blueprintId` continues to normalise to BP-001.
5. Explicit unknown Blueprint identifiers fail with a clear application error.
6. Current-question resolution uses the active Blueprint question list.
7. Next-question navigation uses the active Blueprint question count and contains no hard-coded BP-001 question total in Zustand.
8. New decisions whose `alternativeId` is not present in the active Blueprint are rejected.
9. Student answers are never silently deleted.
10. Decision Record generation uses the active Blueprint alternatives.
11. Decision Record JSON field names remain BUILD-001-compatible.
12. The BP-001 download filename remains `BRM_BP-001_Decision_Record.json`.
13. The LocalStorage key remains `brm.prototype.v1`.
14. Legacy LocalStorage compatibility tests pass.
15. Domain code remains free of React, Zustand, React Router, LocalStorage, Zod, and BlueprintRegistry implementation dependencies.
16. Routes, UI validation thresholds, BP-001 educational content, session lifecycle, and styling behaviour remain unchanged.
17. Required tests pass.
18. `npm test` succeeds.
19. `npm run build` succeeds.
20. Deferred scope is not implemented.
21. No BRMF, BOK, governance, research, theory, methodology, or archive files are modified.
22. No Git commit is created by the implementation agent.

---

## 23. Implementation Verification

Run:

```bash
npm run format
npm test
npm run build
```

Then verify Zustand no longer imports the registry:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "BlueprintRegistry|createBlueprintRegistry|blueprintRegistry" \
  src/state
```

Expected:

```text
No direct registry import or call
```

Verify pages do not import BP-001 or the registry:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "BP-001/blueprint|BlueprintRegistry|blueprintRegistry" \
  src/pages
```

Expected:

```text
No matching imports
```

Verify domain dependencies:

```bash
grep -RIn \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  -E "from ['\"]react|from ['\"]zustand|react-router|localStorage|from ['\"]zod|BlueprintRegistry" \
  src/domain
```

Expected:

```text
No matching dependency imports
```

---

## 24. Completion Report Requirements

The implementation agent must report:

1. files created;
2. files modified;
3. final `BlueprintExecutionService` public interface;
4. composition-root wiring;
5. Zustand responsibilities removed;
6. unknown Blueprint policy;
7. missing legacy Blueprint policy;
8. decision-alternative validation;
9. answer-preservation behaviour;
10. Blueprint-version decision;
11. Decision Record compatibility;
12. storage compatibility;
13. tests added or modified;
14. total tests passing;
15. build result;
16. dependency-boundary verification;
17. confirmation that no commit was created.

---

**End of BRMI-BUILD-004 authoritative specification.**
