# BRMI-001 — Prototype Architecture

**Status:** Draft 1.0  
**Series:** Business Research Mentor Implementation  
**Volume:** 01 — Prototype  
**Classification:** Authoritative Prototype Implementation Specification  
**Depends on:** BRMP-001 and BRMF-101 through BRMF-215  
**Primary Decision Blueprint:** BP-001 — Choosing a Research Topic  
**Implementation Target:** Local-first React prototype

---

## 1. Purpose

This document defines the implementation architecture for the first working Business Research Mentor prototype.

It translates the approved BRM educational philosophy and enterprise architecture into a deliberately small, testable, end-to-end software product.

The prototype exists to answer one question:

> Can BRM improve the quality of a student's research thinking without writing the research for the student?

The prototype is not intended to validate enterprise scale, institutional deployment, billing, authentication, or the complete research lifecycle. It validates the educational interaction.

---

## 2. Prototype Mission

The prototype must demonstrate that BRM can:

- guide a student through one research decision;
- ask adaptive mentoring questions;
- identify ambiguity, assumptions, constraints, and missing evidence;
- preserve student ownership;
- provide explainable guidance;
- present alternatives without choosing for the learner;
- require student reflection and justification;
- expose the reasoning journey to a supervisor;
- create a durable Research Decision Record.

The first prototype implements only:

`BP-001 — Choosing a Research Topic`

---

## 3. Product Principle

BRM is not:

`Student → LLM → Answer`

BRM is:

`Student → Decision Blueprint → Guided Reasoning → Reflection → Decision → Supervisor Review`

The language model is a supporting service. The Decision Blueprint controls the educational process.

---

## 4. Prototype Scope

### 4.1 Included

1. Welcome screen;
2. Student Profile;
3. Research Idea Workspace;
4. Guided Thinking Workspace;
5. Decision Review Workspace;
6. Supervisor Review Workspace;
7. Research Decision Record;
8. local persistence;
9. one Decision Blueprint;
10. structured AI analysis;
11. basic explainability;
12. a local audit trail;
13. session resume;
14. role switching between Student and Supervisor;
15. prototype evaluation feedback.

### 4.2 Excluded

- user authentication;
- institutional accounts;
- programme-director dashboards;
- multi-tenancy;
- cloud deployment;
- mobile applications;
- billing;
- complete literature review;
- citation generation;
- plagiarism detection;
- thesis writing;
- automatic chapter generation;
- multi-provider AI orchestration;
- advanced knowledge graphs;
- production analytics;
- live collaboration;
- email notifications;
- enterprise integrations;
- production security certification.

---

## 5. Prototype Success Criteria

The prototype succeeds when a student can complete the full flow:

`Initial Idea → Guided Questions → Constraints → Alternatives → Reflection → Decision → Supervisor Review → Decision Record`

and when evaluation indicates that:

- the student understands the topic better;
- the student can explain why the final direction was selected;
- the student recognises at least one assumption or constraint;
- the student considered more than one plausible direction;
- the supervisor can understand the reasoning path;
- the AI did not write the final research topic on behalf of the student;
- the system records enough evidence to reconstruct the decision.

---

## 6. Prototype Technical Position

The first prototype will be:

- local-first;
- single-device;
- single-student-session oriented;
- TypeScript-based;
- React-based;
- data-driven;
- componentised;
- testable;
- provider-abstracted;
- intentionally simple.

Recommended implementation baseline:

- React;
- TypeScript;
- Vite;
- React Router;
- Zustand or equivalent lightweight state store;
- Zod for runtime validation;
- localStorage for initial persistence;
- optional IndexedDB adapter later;
- Vitest;
- React Testing Library;
- one AI provider adapter;
- structured JSON responses;
- CSS modules or a simple component library.

The prototype architecture must not depend on a specific UI framework or AI provider.

---

## 7. High-Level Architecture

```text
React User Interface
        |
Application Orchestration
        |
Decision Blueprint Engine
        |
Conversation Engine
        |
Reasoning Engine
        |
Decision Record Engine
        |
AI Provider Adapter
        |
Local Persistence
```

Supporting cross-cutting services:

```text
Validation
Explainability
Audit
Configuration
Error Handling
Prototype Evaluation
```

---

## 8. Architectural Layers

### 8.1 Presentation Layer

Responsibilities:

- render screens;
- capture input;
- show current educational stage;
- display guidance and rationale;
- prevent prohibited actions;
- support role switching;
- show progress;
- display errors and recovery options.

The Presentation Layer contains no research mentoring rules.

### 8.2 Application Layer

Responsibilities:

- orchestrate use cases;
- coordinate navigation;
- load and save sessions;
- call domain services;
- handle commands;
- publish local domain events;
- map domain output to view models.

The Application Layer must not contain prompt wording or component-specific rendering logic.

### 8.3 Domain Layer

Responsibilities:

- Decision Blueprint;
- Blueprint Stage;
- Mentoring Question;
- Student Response;
- Reasoning Finding;
- Constraint;
- Assumption;
- Alternative Direction;
- Reflection;
- Student Decision;
- Supervisor Review;
- Research Decision Record;
- completion rules;
- invariants.

The Domain Layer must not depend on React, browser APIs, or AI SDKs.

### 8.4 Intelligence Layer

Responsibilities:

- prompt construction;
- structured analysis requests;
- response validation;
- reasoning-finding extraction;
- adaptive question recommendations;
- alternative-direction generation;
- explanation generation;
- provider abstraction.

The Intelligence Layer assists the educational process but does not own it.

### 8.5 Persistence Layer

Responsibilities:

- session storage;
- profile storage;
- blueprint storage;
- response history;
- decision records;
- supervisor comments;
- audit events;
- export and import.

### 8.6 Infrastructure Layer

Responsibilities:

- browser storage adapter;
- AI provider adapter;
- clock;
- identifier generation;
- logging;
- configuration loading;
- test doubles.

---

## 9. Recommended Repository Structure

```text
rmentor/
├── docs/
│   ├── framework/
│   ├── prototype/
│   └── decisions/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── providers/
│   │   └── config/
│   ├── pages/
│   │   ├── WelcomePage/
│   │   ├── StudentProfilePage/
│   │   ├── ResearchIdeaPage/
│   │   ├── GuidedThinkingPage/
│   │   ├── DecisionReviewPage/
│   │   ├── SupervisorReviewPage/
│   │   └── DecisionRecordPage/
│   ├── components/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── mentoring/
│   │   ├── reasoning/
│   │   ├── decisions/
│   │   ├── supervisor/
│   │   └── feedback/
│   ├── domain/
│   │   ├── blueprint/
│   │   ├── conversation/
│   │   ├── reasoning/
│   │   ├── decision/
│   │   ├── supervision/
│   │   └── shared/
│   ├── application/
│   │   ├── commands/
│   │   ├── queries/
│   │   ├── services/
│   │   ├── useCases/
│   │   └── viewModels/
│   ├── intelligence/
│   │   ├── prompts/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── policies/
│   │   └── adapters/
│   ├── persistence/
│   │   ├── repositories/
│   │   ├── localStorage/
│   │   ├── migrations/
│   │   └── export/
│   ├── blueprints/
│   │   └── BP-001/
│   │       ├── blueprint.json
│   │       ├── questions.json
│   │       ├── completion-rules.json
│   │       └── ai-policy.json
│   ├── state/
│   ├── events/
│   ├── audit/
│   ├── evaluation/
│   ├── styles/
│   └── test/
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

The exact names may evolve, but separation between presentation, domain, application, intelligence, and persistence must remain.

---

## 10. Core Domain Model

### 10.1 Student Profile

```ts
type DegreeLevel = "MBA" | "MSc" | "DBA" | "PhD" | "Other";

interface StudentProfile {
  id: string;
  displayName?: string;
  degreeLevel: DegreeLevel;
  discipline: string;
  researchExperience: "none" | "limited" | "moderate" | "experienced";
  professionalContext?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 10.2 Research Session

```ts
type ResearchSessionStatus =
  | "draft"
  | "active"
  | "awaiting_student"
  | "awaiting_supervisor"
  | "completed"
  | "archived";

interface ResearchSession {
  id: string;
  studentProfileId: string;
  blueprintId: string;
  status: ResearchSessionStatus;
  currentStageId: string;
  initialIdea: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

### 10.3 Decision Blueprint

```ts
interface DecisionBlueprint {
  id: string;
  version: string;
  title: string;
  purpose: string;
  educationalGoal: string;
  learningOutcomes: string[];
  stages: BlueprintStage[];
  completionRules: CompletionRule[];
  aiPolicy: AIPolicy;
  supervisorCheckpoints: SupervisorCheckpoint[];
}
```

### 10.4 Blueprint Stage

```ts
interface BlueprintStage {
  id: string;
  title: string;
  purpose: string;
  order: number;
  required: boolean;
  questionIds: string[];
  completionRuleIds: string[];
}
```

### 10.5 Mentoring Question

```ts
type QuestionCategory =
  | "motivation"
  | "business_problem"
  | "stakeholders"
  | "evidence"
  | "scope"
  | "constraints"
  | "data_access"
  | "contribution"
  | "assumptions"
  | "reflection";

interface MentoringQuestion {
  id: string;
  category: QuestionCategory;
  text: string;
  rationale: string;
  required: boolean;
  followUpStrategy: string;
  prohibitedBehaviour?: string[];
}
```

### 10.6 Student Response

```ts
interface StudentResponse {
  id: string;
  sessionId: string;
  questionId: string;
  responseText: string;
  submittedAt: string;
  revisionNumber: number;
}
```

### 10.7 Reasoning Finding

```ts
type FindingType =
  | "ambiguity"
  | "assumption"
  | "constraint"
  | "missing_evidence"
  | "scope_risk"
  | "contradiction"
  | "feasibility_risk"
  | "stakeholder_gap"
  | "strength"
  | "uncertainty";

interface ReasoningFinding {
  id: string;
  sessionId: string;
  type: FindingType;
  statement: string;
  sourceResponseIds: string[];
  confidence: number;
  rationale: string;
  status: "open" | "acknowledged" | "resolved" | "dismissed";
}
```

### 10.8 Alternative Direction

```ts
interface AlternativeDirection {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  constraints: string[];
  evidenceNeeded: string[];
  feasibility: "low" | "medium" | "high" | "uncertain";
  generatedFromResponseIds: string[];
}
```

### 10.9 Student Reflection

```ts
interface StudentReflection {
  id: string;
  sessionId: string;
  prompt: string;
  response: string;
  confidenceBefore?: number;
  confidenceAfter?: number;
  createdAt: string;
}
```

### 10.10 Student Decision

```ts
interface StudentDecision {
  id: string;
  sessionId: string;
  selectedAlternativeId?: string;
  studentDefinedDirection?: string;
  justification: string;
  acceptedConstraints: string[];
  unresolvedRisks: string[];
  confidence: number;
  decidedAt: string;
}
```

### 10.11 Supervisor Review

```ts
type SupervisorDecision =
  | "approved"
  | "approved_with_conditions"
  | "reconsider"
  | "additional_evidence_required"
  | "not_reviewed";

interface SupervisorReview {
  id: string;
  sessionId: string;
  decision: SupervisorDecision;
  feedback: string;
  strengthsObserved: string[];
  concerns: string[];
  requestedActions: string[];
  reviewedAt: string;
}
```

### 10.12 Research Decision Record

```ts
interface ResearchDecisionRecord {
  id: string;
  sessionId: string;
  blueprintId: string;
  decision: StudentDecision;
  alternatives: AlternativeDirection[];
  findings: ReasoningFinding[];
  reflections: StudentReflection[];
  supervisorReview?: SupervisorReview;
  evidenceSummary: string[];
  unresolvedQuestions: string[];
  createdAt: string;
  version: number;
}
```

---

## 11. BP-001 Blueprint Definition

### 11.1 Identity

- Id: `BP-001`
- Name: Choosing a Research Topic
- Version: `1.0.0`

### 11.2 Educational Goal

Help a Business School student transform a broad interest or initial idea into a researchable, feasible, justified research direction.

### 11.3 Stages

1. Context;
2. Initial Interest;
3. Motivation;
4. Business Problem;
5. Stakeholders;
6. Evidence;
7. Scope;
8. Constraints;
9. Data Feasibility;
10. Assumptions;
11. Alternative Directions;
12. Trade-off Evaluation;
13. Student Reflection;
14. Student Decision;
15. Supervisor Review;
16. Decision Record.

### 11.4 Required evidence before decision review

The system must have:

- an initial idea;
- a stated business problem;
- at least one stakeholder;
- at least one source or form of evidence indicating the problem exists;
- at least two constraints;
- an explicit data-access assessment;
- at least one acknowledged assumption;
- at least two alternative directions;
- a student reflection;
- a student justification.

### 11.5 Completion conditions

BP-001 is complete only when:

- required stages are complete;
- the learner has made or formulated the decision;
- the learner has justified the decision;
- unresolved risks are recorded;
- the Decision Record is generated;
- supervisor review is completed or explicitly marked pending.

---

## 12. Blueprint Storage Format

The first blueprint should be stored as validated JSON.

Blueprint files must be:

- versioned;
- schema-validated;
- human-readable;
- separate from React components;
- replaceable without modifying the domain engine;
- testable independently.

---

## 13. Conversation Engine

The Conversation Engine controls the mentoring sequence.

### Responsibilities

- determine current stage;
- select the next question;
- prevent premature completion;
- recommend follow-up questions;
- allow response revision;
- revisit unresolved findings;
- trigger reflection;
- detect when sufficient information exists;
- transition to alternative evaluation;
- transition to supervisor review.

### Prohibitions

It must not:

- behave as an unrestricted chatbot;
- answer unrelated questions without context;
- skip required educational stages;
- accept empty or superficial responses as sufficient;
- make the final decision for the learner.

### Question selection strategy

1. stage order;
2. required-question status;
3. missing evidence;
4. open reasoning findings;
5. prior responses;
6. duplication avoidance;
7. student cognitive load;
8. completion rules.

The initial engine may use deterministic rules. Adaptive AI selection is introduced only after deterministic progression works reliably.

---

## 14. Reasoning Engine

Initial capabilities:

- detect vague wording;
- identify assumptions;
- identify missing stakeholders;
- identify missing evidence;
- identify scope breadth;
- identify feasibility risks;
- identify contradictions;
- identify missing constraints;
- estimate confidence;
- recommend a follow-up question.

The engine must:

- cite student responses used;
- distinguish observation from inference;
- include confidence;
- avoid hidden scoring;
- avoid personality judgements;
- avoid evaluating writing style as reasoning quality;
- avoid inventing facts;
- expose uncertainty.

---

## 15. AI Service Architecture

```ts
interface AIProvider {
  analyzeReasoning(request: ReasoningAnalysisRequest): Promise<ReasoningAnalysis>;
  generateAlternatives(request: AlternativeGenerationRequest): Promise<AlternativeDirection[]>;
  explainFinding(request: FindingExplanationRequest): Promise<string>;
}
```

All AI responses must:

- use JSON;
- be validated with Zod;
- reject invalid structures;
- preserve student wording;
- avoid final-answer generation;
- include source-response references;
- include confidence;
- include limitations.

Prompt layers:

1. Constitutional policy;
2. Blueprint policy;
3. Stage context;
4. Student evidence;
5. Requested operation;
6. Output schema.

When the provider is unavailable, deterministic questions continue and entered work remains preserved.

---

## 16. AI Behaviour Policy

The AI may:

- ask;
- probe;
- challenge;
- identify;
- compare;
- explain;
- summarise;
- suggest reflection;
- propose alternatives;
- state uncertainty.

The AI may not:

- select the topic;
- write a final topic as if authored by the student;
- generate unsupported literature claims;
- fabricate citations;
- impose a theory;
- decide methodology prematurely;
- impersonate the supervisor;
- hide limitations;
- reward verbosity;
- penalise language proficiency;
- infer protected personal traits;
- pressure the learner toward a preferred answer.

---

## 17. Application Use Cases

- Start Prototype Session;
- Submit Student Response;
- Revise Student Response;
- Generate Alternative Directions;
- Record Student Decision;
- Record Supervisor Review;
- Export Decision Record.

Each use case must preserve history and validate its preconditions.

---

## 18. Navigation Architecture

```text
/
/welcome
/profile
/session/new
/session/:sessionId/idea
/session/:sessionId/guided
/session/:sessionId/decision
/session/:sessionId/supervisor
/session/:sessionId/record
/sessions
/settings
```

Guard rules:

- a session must exist before guided thinking;
- required profile fields must exist before session start;
- decision review requires sufficient evidence;
- supervisor review requires a Student Decision;
- Decision Record requires a Student Decision;
- direct URL access must restore state or redirect safely.

---

## 19. Screen Architecture

### Welcome Page

- ProductIntroduction;
- AcademicIntegrityNotice;
- StartSessionButton;
- ResumeSessionList.

### Student Profile Page

- DegreeLevelField;
- DisciplineField;
- ResearchExperienceField;
- ProfessionalContextField;
- ProfileSummary.

### Research Idea Page

- InitialIdeaPrompt;
- LargeResponseEditor;
- StudentOwnershipNotice;
- SaveDraftIndicator;
- BeginGuidedThinkingButton.

### Guided Thinking Page

- StageProgress;
- CurrentQuestionCard;
- QuestionRationaleDisclosure;
- StudentResponseEditor;
- ReasoningFeedbackPanel;
- OpenFindingsPanel;
- PreviousResponsesPanel;
- ContinueButton;
- SaveStatus.

### Decision Review Page

- InitialIdeaSnapshot;
- ReasoningStrengths;
- OpenRisks;
- ConstraintSummary;
- AlternativeDirectionCards;
- StudentDirectionEditor;
- JustificationEditor;
- ConfidenceControl;
- SubmitDecisionButton.

### Supervisor Review Page

- StudentJourneyTimeline;
- InitialIdeaPanel;
- QuestionsAndResponses;
- ReasoningFindings;
- AlternativeComparison;
- StudentDecisionPanel;
- SupervisorDecisionControl;
- SupervisorFeedbackEditor;
- RequestedActionsEditor.

### Decision Record Page

- DecisionRecordHeader;
- FinalDirection;
- Justification;
- Alternatives;
- Findings;
- Constraints;
- EvidenceSummary;
- ReflectionHistory;
- SupervisorReviewPanel;
- UnresolvedQuestions;
- ExportControls.

---

## 20. State Management

Separate state into:

- profile state;
- session state;
- blueprint state;
- conversation state;
- reasoning state;
- decision state;
- supervisor state;
- persistence status;
- UI state.

Domain objects must not exist only as component-local state. Persistence must occur through repositories rather than direct localStorage calls inside components.

---

## 21. Persistence Model

Use localStorage for the first vertical slice.

Storage keys:

```text
brm.profile.current
brm.sessions
brm.responses
brm.findings
brm.alternatives
brm.decisions
brm.supervisorReviews
brm.decisionRecords
brm.auditEvents
brm.schemaVersion
```

Rules:

- validate JSON when read;
- corrupt data must not crash the application;
- store migration version;
- support export;
- require confirmation before reset;
- keep data local unless explicitly sent to an AI provider;
- disclose AI transmission.

---

## 22. Local Audit Model

Initial events:

- StudentProfileCreated;
- ResearchSessionStarted;
- InitialIdeaSubmitted;
- StudentResponseSubmitted;
- StudentResponseRevised;
- ReasoningAnalysisCompleted;
- FindingCreated;
- AlternativeDirectionsGenerated;
- StudentDecisionRecorded;
- SupervisorReviewRecorded;
- DecisionRecordCreated;
- SessionCompleted;
- DataExported;
- LocalDataReset.

Audit events must not contain hidden AI chain-of-thought.

---

## 23. Explainability Model

Each AI-assisted finding should show:

- what was observed;
- which student response supported it;
- why it matters;
- confidence;
- what the student can do next;
- whether it is observation or inference.

The application must not expose internal model chain-of-thought.

---

## 24. Completion Rules Engine

Completion rules are deterministic and blueprint-driven.

```ts
interface CompletionRule {
  id: string;
  type:
    | "response_required"
    | "minimum_findings"
    | "finding_acknowledged"
    | "alternatives_required"
    | "reflection_required"
    | "decision_required"
    | "supervisor_status";
  parameters: Record<string, unknown>;
  blocking: boolean;
}
```

The AI may recommend completion, but deterministic rules decide whether the workflow progresses.

---

## 25. Error Handling

Handle:

- invalid saved data;
- AI timeout;
- invalid AI JSON;
- empty responses;
- storage quota errors;
- missing blueprint;
- stale session state;
- direct navigation to invalid stages;
- failed export;
- accidental refresh;
- partial data.

User-facing errors must explain what happened, preserve work, and provide a recovery action.

---

## 26. Testing Strategy

### Domain tests

- stage progression;
- completion rules;
- decision invariants;
- supervisor prerequisites;
- Decision Record creation;
- response revision;
- finding status changes.

### Blueprint tests

- schema validity;
- referenced question existence;
- completion-rule existence;
- unique identifiers;
- valid stage ordering;
- required policy fields.

### Application tests

- start session;
- submit response;
- restore session;
- generate alternatives;
- record decision;
- record supervisor review;
- export Decision Record.

### UI tests

- form validation;
- navigation guards;
- progress display;
- error recovery;
- role switching;
- accessibility basics.

### Intelligence contract tests

- valid JSON;
- invalid JSON rejection;
- missing source references;
- prohibited final-topic generation;
- uncertainty fields;
- deterministic fallback.

A complete scripted student journey must execute without developer intervention.

---

## 27. Accessibility and Usability

The prototype should support:

- keyboard navigation;
- visible focus;
- labelled fields;
- semantic headings;
- sufficient contrast;
- screen-reader-friendly updates;
- no colour-only meaning;
- clear save status;
- plain language;
- manageable cognitive load;
- one primary task per screen;
- optional explanation disclosure.

The system must not overload the student with simultaneous findings.

---

## 28. Privacy and Academic Integrity

Display:

- that work is stored locally;
- when content is sent to an AI provider;
- that AI guidance may be imperfect;
- that the student remains responsible for decisions;
- that BRM does not author the research;
- that supervisor review remains authoritative.

Minimise unnecessary personal and confidential data.

---

## 29. Prototype Evaluation

Student feedback:

- I understand my proposed topic better.
- I identified constraints I had not considered.
- I considered meaningful alternatives.
- I made the final decision myself.
- The questions improved my thinking.
- The system felt different from a normal chatbot.
- I would use this with a supervisor.

Supervisor feedback:

- I can see how the student reached the decision.
- The student considered appropriate constraints.
- The student's justification is visible.
- The system supports rather than replaces supervision.
- The Decision Record is useful.
- I would use this before an initial supervision meeting.

Behavioural measures:

- substantive responses;
- acknowledged findings;
- alternatives considered;
- confidence change;
- revisions;
- supervisor outcome;
- completion time;
- abandoned stage.

These measures are exploratory, not proof of educational effectiveness.

---

## 30. Implementation Sequence

### Iteration 1 — Static experience

Build routes, page shells, mock BP-001, a mock journey, and a mock Decision Record.

**Goal:** See the product shape.

### Iteration 2 — Domain and persistence

Build domain types, repositories, local storage, session resume, deterministic stage progression, and audit events.

**Goal:** Working non-AI mentoring workflow.

### Iteration 3 — Reasoning integration

Build AI provider abstraction, structured prompts, Zod validation, findings, follow-up recommendations, and fallback handling.

**Goal:** Useful analysis without surrendering workflow control.

### Iteration 4 — Alternatives and decision

Build alternative generation, trade-off cards, student justification, confidence, and Decision Record.

**Goal:** Complete student vertical slice.

### Iteration 5 — Supervisor review

Build role switch, reasoning timeline, supervisor outcome, comments, requested actions, and final record.

**Goal:** Complete student–supervisor loop.

### Iteration 6 — Evaluation and refinement

Build feedback survey, export, usability fixes, prompt refinement, acceptance test, and demo data.

**Goal:** Test with real users.

---

## 31. Definition of Prototype Complete

The prototype is complete when:

1. a student profile can be created;
2. BP-001 loads from validated data;
3. a session can start and resume;
4. the student enters an initial idea;
5. questions progress deterministically;
6. responses are saved and revisable;
7. reasoning findings are generated and explained;
8. constraints and assumptions can be acknowledged;
9. alternatives are presented;
10. the student selects or defines a direction;
11. the student justifies the decision;
12. a supervisor reviews the reasoning path;
13. a supervisor outcome is recorded;
14. a Research Decision Record is generated;
15. the record is exportable;
16. AI failure does not destroy the session;
17. the complete flow passes an acceptance test;
18. a student and supervisor can evaluate the experience.

---

## 32. Architectural Invariants

1. Decision Blueprints control the educational process.
2. The AI provider does not control workflow progression.
3. The student makes the research decision.
4. The system preserves original student wording.
5. Findings cite source responses.
6. Observation is distinguished from inference.
7. AI output is schema-validated.
8. Invalid AI output is rejected.
9. Deterministic completion rules govern progression.
10. Feature scope remains limited to BP-001.
11. Domain logic does not depend on React.
12. Persistence is accessed through repositories.
13. Local data remains recoverable.
14. Response revisions preserve history.
15. Supervisor review does not erase student reasoning.
16. Decision Records are reconstructable.
17. The system does not generate dissertation or thesis content.
18. Educational value takes priority over feature quantity.
19. The vertical slice must work before scope expands.
20. Prototype learning informs later architecture.

---

## 33. Key Risks and Controls

### Chatbot drift

Control: blueprint-driven stages, one question at a time, deterministic progression.

### AI overreach

Control: structured operations, prohibited behaviours, output validation, student justification.

### Excessive complexity

Control: local-first, one blueprint, one vertical slice, no authentication.

### Superficial responses

Control: completion rules, follow-up questions, evidence requirements, reflection.

### False reasoning precision

Control: confidence, evidence links, limitations, contestability.

### Supervisor redundancy

Control: show reasoning timeline, alternatives, constraints, revisions, and reflections.

---

## 34. Decision Log

The following decisions are frozen for Prototype 1.0:

- React and TypeScript;
- local-first storage;
- no authentication;
- BP-001 only;
- Decision Blueprint-controlled flow;
- deterministic workflow progression;
- AI as supporting service;
- structured JSON AI responses;
- student-authored final decision;
- supervisor review;
- Research Decision Record;
- one complete vertical slice before expansion.

Changes require an implementation decision record.

---

## 35. Immediate Next Action

Following approval of BRMI-001, implementation begins with:

**BRMI-BUILD-001 — Prototype Repository and Static Vertical Slice**

This build step should:

1. inspect the existing `rmentor` repository;
2. preserve existing work;
3. create the approved folder structure;
4. initialise or confirm React, TypeScript, and Vite;
5. add the prototype routes;
6. create static page shells;
7. add a mock BP-001 blueprint;
8. add a mock student journey;
9. add a mock Decision Record;
10. run locally;
11. commit the first prototype baseline.

The next work product must contain terminal commands, full file contents, test commands, and Git commands.

---

## 36. Approval Recommendation

BRMI-001 should be approved as:

**Prototype Architecture Version 1.0**

Approval authorises the first implementation vertical slice but does not authorise expansion beyond BP-001.

---

**End of BRMI-001**
