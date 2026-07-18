# BRMI-BUILD-003 — Decision Blueprint Architecture, Validation, and Registry

**Version:** 2.1 (includes BRMI-BUILD-003.1 purpose metadata)  
**Status:** Approved for implementation  
**Series:** Business Research Mentor Implementation (BRMI)  
**Volume:** 01 — Prototype  
**Classification:** Authoritative Build Specification  
**Depends on:** BRMI-BUILD-001, BRMI-BUILD-002  
**Primary Blueprint:** BP-001 — Choosing a Research Topic  
**Implementation target:** `apps/brm-prototype`

> The implementation retains the generic `Blueprint` abstraction. BP-001 is classified as a decision-purpose Blueprint through its `purpose` metadata.

---

## 1. Purpose

BRMI-BUILD-003 separates **Blueprint educational content** from React page implementation by introducing:

1. a complete in-process Blueprint definition for BP-001;
2. runtime **validation** of Blueprint structure (including purpose);
3. a **Blueprint Registry** for lookup by id;
4. data-driven question rendering, progress, alternatives, and Decision Record alternative resolution.

It preserves all BUILD-001 and BUILD-002 user-visible behaviour.

### 1.1 Blueprint genericity and purpose

`Blueprint` is intentionally generic so that later builds may represent different structured educational processes. The `purpose` field identifies the educational role of a Blueprint.

Approved purpose values:

| Purpose | Intended use |
| --- | --- |
| `decision` | Decision support (current BP-001) |
| `reflection` | Structured reflection (future) |
| `evaluation` | Evaluation processes (future) |
| `planning` | Planning processes (future) |
| `mentoring` | Mentoring processes (future) |

For BUILD-003, BP-001 is a **decision-purpose** Blueprint (`purpose: "decision"`). No additional Blueprint types or purpose-specific runtimes are implemented in this build.

### 1.2 Non-objectives

BUILD-003 does **not**:

- redesign the UI or change styling;
- change route paths or add routes;
- change BP-001 question wording, order, stages, rationales, or alternatives;
- change UI enablement thresholds;
- rename `Blueprint` to DecisionBlueprint (or similar);
- add remote blueprint loading, authoring UI, AI content, or executable blueprint logic;
- add authentication, backend, cloud persistence, analytics, or dashboards;
- implement a Blueprint Engine, stage graph, or completion-rules DSL;
- modify BRMF, BOK, governance, archive, methodology, research, or theory documents;
- couple the domain session lifecycle to Zod.

---

## 2. Authoritative architecture

```text
Blueprint
    ↓
Blueprint Schema
    ↓
Blueprint Registry
    ↓
Application
    ↓
Research Session
```

Runtime wiring in the prototype:

```text
Presentation (pages)
        ↓
Zustand React adapter
        ↓
SessionService → Domain → ResearchSessionRepository → LocalStorage
        ↑
BlueprintRegistry.getById(session.blueprintId)
        ↑
Validated Blueprint definitions (Zod at Blueprint Schema boundary only)
```

### 2.1 Dependency rules

1. Presentation may read Blueprints via the Blueprint Registry (or a thin store helper that uses the registry).
2. Application composition constructs the Blueprint Registry and the session service.
3. Zod validates Blueprint definitions **only** at the Blueprint Schema / registration boundary.
4. Domain session lifecycle, answer upsert, and Decision Record field mapping remain free of Zod and React.
5. Persistence continues to own LocalStorage; Blueprints are not stored remotely.

---

## 3. Blueprint definition model

### 3.1 Required shape

```ts
type BlueprintPurpose =
  | "decision"
  | "reflection"
  | "evaluation"
  | "planning"
  | "mentoring";

interface BlueprintQuestion {
  id: string;
  stage: string;
  text: string;
  rationale: string;
}

interface Alternative {
  id: string;
  title: string;
  description: string;
  strengths: string[];
  risks: string[];
}

interface Blueprint {
  id: string;
  version: string;
  purpose: BlueprintPurpose;
  title: string;
  questions: BlueprintQuestion[];
  alternatives: Alternative[];
}
```

### 3.2 BP-001 content constraints

1. `id` must remain `"BP-001"`.
2. `version` must be `"1.0.0"`.
3. `purpose` must be `"decision"`.
4. Question ids, order, `stage`, `text`, and `rationale` must match BUILD-001 content exactly.
5. Alternatives A/B/C content must match BUILD-001 content exactly.
6. Alternatives live on the Blueprint object.
7. A compatibility export `mockAlternatives` may alias `bp001.alternatives`.

### 3.3 Explicitly excluded fields

Do not add: completion rules engine, AI policy, executable functions, response-type systems, stage graphs, domain/discipline metadata, or remote URIs.

---

## 4. Validation (Blueprint Schema)

### 4.1 Zod boundary

Use the installed `zod` package to validate unknown Blueprint input at registration time.

### 4.2 Minimum rejection rules

Validation must reject:

1. missing or empty Blueprint `id`;
2. missing or empty `version`;
3. missing, empty, or unsupported `purpose`;
4. missing or empty `title`;
5. empty `questions` array;
6. duplicate question `id` values;
7. question missing `id`, `stage`, `text`, or `rationale` (empty strings rejected for id/text);
8. empty `alternatives` array;
9. duplicate alternative `id` values;
10. alternative missing required string fields or non-array strengths/risks.

Approved `purpose` values only: `decision`, `reflection`, `evaluation`, `planning`, `mentoring`.

### 4.3 Placement

- Schema and parse helpers live under `src/blueprints/schema.ts`.
- Domain session logic, application services, Zustand, pages, and persistence must not import Zod.

---

## 5. Blueprint Registry

### 5.1 Contract

```ts
interface BlueprintRegistry {
  getById(id: string): Blueprint;
  listIds(): string[];
  has(id: string): boolean;
}
```

### 5.2 Behaviour

1. Validate definitions before registration.
2. `getById` returns the validated Blueprint or throws a clear error for unknown ids.
3. `has` reports whether an id exists.
4. `listIds` lists registered ids.
5. Registry is constructed once in the composition root.
6. BP-001 is registered after successful validation.

### 5.3 Non-requirements

No repository port, remote loader, caching tier, or dependency-injection framework.

---

## 6. Application wiring

### 6.1 Composition

`src/app/composition.ts` must:

1. validate and register BP-001;
2. export `blueprintRegistry`;
3. continue to construct `LocalStorageResearchSessionRepository` and `SessionService`.

### 6.2 Zustand adapter

`usePrototypeStore` must:

1. resolve question count and alternatives through the Blueprint Registry;
2. expose `blueprintId` from the current session;
3. expose `getBlueprint()` for presentation use.

### 6.3 Pages

Guided, Decision, Supervisor, and Record pages resolve questions and alternatives from the registry Blueprint. Route paths and UI thresholds remain unchanged.

### 6.4 Session domain

1. New sessions default `blueprintId` to `"BP-001"`.
2. Legacy normalisation defaults missing `blueprintId` to `"BP-001"`.
3. Storage key remains `brm.prototype.v1`.

---

## 7. Decision Record compatibility

Preserve BUILD-001 export contract:

```ts
{
  blueprint: string; // session.blueprintId
  profile, initialIdea, answers, decision?, selectedDirection?, supervisorFeedback, completed, exportedAt
}
```

1. Field names and nesting unchanged.
2. `selectedDirection` resolved from the active Blueprint’s `alternatives`.
3. Filename for BP-001 remains `BRM_BP-001_Decision_Record.json`.
4. Do not add `purpose` or `version` to the export payload in this build.

---

## 8. Behaviour preservation

Must remain unchanged:

1. All route paths and redirects
2. BP-001 educational wording and alternative content
3. UI thresholds (idea ≥ 20, answer ≥ 10, justification ≥ 30, supervisor feedback ≥ 20)
4. Session lifecycle `not_started | in_progress | completed`
5. Persistence key and BUILD-002 repository behaviour
6. Decision Record JSON shape and BP-001 filename
7. Visual design / CSS

---

## 9. Folder structure

```text
src/blueprints/
├── schema.ts                 # Blueprint Schema (Zod) + parseBlueprint
├── registry.ts               # Blueprint Registry + factory
├── schema.test.ts
├── registry.test.ts
└── BP-001/
    ├── blueprint.ts          # BP-001 definition
    └── blueprint.test.ts     # content integrity
```

---

## 10. Testing requirements

Mandatory tests include:

1. BP-001 has `purpose === "decision"`.
2. Validation rejects missing purpose.
3. Validation rejects unsupported purpose.
4. Validation accepts all approved purpose identifiers when otherwise valid.
5. Registry lookup returns BP-001.
6. BP-001 retains 10 questions (Q1–Q10), alternatives A/B/C, and unchanged educational content.
7. Decision Record compatibility tests remain passing.
8. Legacy LocalStorage compatibility tests remain passing.

Commands:

```sh
npm run format
npm test
npm run build
```

---

## 11. Explicit exclusions / deferred work

Deferred and out of scope:

- renaming `stage` to `cognitiveStage`;
- blueprint-driven routing or purpose-specific layouts;
- multiple active Blueprints or selection UI;
- domain/discipline metadata;
- rule engines, completion rules, response-type systems;
- AI behaviour, remote loading, authoring tools;
- analytics, authentication, cloud persistence.

---

## 12. Acceptance criteria

BUILD-003 (including 003.1) is accepted when:

1. `Blueprint` includes required `purpose: BlueprintPurpose`.
2. BP-001 has `purpose: "decision"` with unchanged educational content.
3. Zod rejects missing/unsupported purpose at the Blueprint Schema boundary.
4. Blueprint Registry continues to validate, look up, list, and reject unknown ids.
5. Pages/store use registry Blueprint data for questions, length, and alternatives.
6. Routes, thresholds, styling, storage key, and Decision Record contract remain behaviour-equivalent.
7. Domain remains free of React, Zustand, React Router, localStorage, and Zod imports.
8. `npm run format`, `npm test`, and `npm run build` succeed.

---

**End of BRMI-BUILD-003 authoritative specification (Version 2.1).**
