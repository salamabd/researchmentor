# Business Research Mentor — Prototype

Local-first React prototype for the Business Research Mentor (BRM) product.

## Purpose

Guide a business-school student through one research decision as an explicit staged learning journey, preserving student ownership of ideas and justifications. BRM supports research thinking; it does not write dissertations or replace scholarly judgement.

## Current scope

- **Blueprint:** BP-001 — Choosing a Research Topic only
- **Journey:** Eight educational stages (Orientation → Review), including Problem Formulation
- **Nature:** Static, deterministic prototype (no live AI analysis)
- **Persistence:** Browser `localStorage` under the key `brm.prototype.v1`

## Guided educational journey (BUILD-006)

Stage sequence:

```text
ORIENTATION → CONTEXT → PROBLEM_FORMULATION → CONSTRAINT_DISCOVERY
→ ALTERNATIVE_EXAMINATION → DECISION → REFLECTION → REVIEW
```

| Concern | Behaviour |
| --- | --- |
| Stage metadata | Declarative `journeyStages` on the validated Blueprint (not `question.stage` labels) |
| Recommended stage | Derived on demand from session + Blueprint |
| Viewed stage | URL `/journey/:stageId` (no persisted `currentJourneyStageId`) |
| Resume | `/journey` redirects to the recommended incomplete stage |
| Structural completion | Required answers must have non-whitespace text; CONTEXT also requires `initialIdea`; DECISION requires a valid alternative, non-empty justification, and confidence 0–100 |
| UI thresholds | Aligned with the same trim-non-empty structural policy |
| Completion | `BlueprintExecutionService.completeResearchJourney()` only; Supervisor cannot bypass |
| Student work | Editing earlier stages never auto-deletes later answers, decisions, or reflections |
| Diagnostics | BUILD-005 banner remains observational and separate |
| Decision Record | Unchanged fields; filename `BRM_BP-001_Decision_Record.json` |

Reflection uses ordinary Blueprint questions Q10–Q14. Alternative examination adds Q15 (comparison). Orientation uses `ORIENTATION_ACK`.

## Architecture

Dependency direction:

```text
React UI
    ↓
Zustand UI adapter
    ↓
BlueprintExecutionService
    ↓
SessionService + BlueprintRegistry
    ↓
Domain + ResearchSessionRepository → LocalStorage
```

| Layer | Responsibility |
| --- | --- |
| `src/pages`, `src/components` | Presentation only |
| `src/state` | Zustand React state adapter (no journey or registry rules) |
| `src/application` | SessionService, BlueprintExecutionService, diagnostics, journey evaluators |
| `src/domain` | `ResearchSession`, journey stage types, Decision Record builder |
| `src/blueprints` | Blueprint definitions, Zod validation (including journeyStages), registry |
| `src/persistence` | Repository port and LocalStorage adapter |
| `src/app/composition.ts` | Constructs repository, services, and registry |

### BUILD-003 / BUILD-004 / BUILD-005 / BUILD-006

Validated Blueprint definitions (including `purpose` and `journeyStages`) are registered in-process. BUILD-004 coordinates Blueprint-aware operations through `BlueprintExecutionService`. BUILD-005 adds observational session diagnostics. BUILD-006 adds pure journey evaluation and a staged `/journey/:stageId` UI. There is no remote blueprint loading, workflow engine, or AI.

Authentication, backend services, AI integration, and additional decision blueprints remain out of scope.

## Prerequisites

- Node.js 24 LTS (`>=24 <25`)
- npm (bundled with Node)

## Commands

From this directory (`apps/brm-prototype`):

```sh
npm install
npm run dev
npm test
npm run build
```

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run Vitest once |
| `npm run build` | Typecheck and produce a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format source with Prettier |
