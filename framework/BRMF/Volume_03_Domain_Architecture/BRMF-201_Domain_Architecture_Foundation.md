# BRMF-201 — Domain Architecture Foundation

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Foundational Domain Specification  
**Depends on:** BRMF-001–005 and BRMF-101–110

---

## 1. Purpose

This document establishes the foundational domain architecture for the Business Research Mentor (BRM). It translates the educational principles and models defined in Volumes 01 and 02 into a coherent domain structure that can later support software architecture, AI reasoning, data design, and implementation.

The domain architecture describes what BRM must understand and manage. It does not prescribe a technology stack, database engine, interface, or deployment model.

## 2. Architectural Objective

BRM must represent research mentoring as an educational process involving learners developing scholarly capability, supervisors exercising academic judgement, research projects evolving through justified decisions, mentoring interventions responding to learner needs, and institutions providing governance and academic context.

The architecture must preserve these relationships without reducing BRM to a writing assistant, document generator, task tracker, or generic chatbot.

## 3. Domain Principles

### 3.1 Education Before Automation
Domain behaviour must first serve learning, judgement, reflection, and research independence. Automation is subordinate to these purposes.

### 3.2 Research as a Coherent System
A research project is represented as a network of related decisions, constructs, evidence, activities, and outcomes rather than isolated chapters.

### 3.3 Human Academic Authority
Supervisors and institutional authorities retain responsibility for formal academic approval, assessment, and ethical decisions.

### 3.4 Explainable Domain Behaviour
Recommendations, learner-state changes, intervention choices, and coherence assessments must be traceable to evidence and explicit rationale.

### 3.5 Temporal and Versioned State
Research understanding, project design, learner capability, and mentoring decisions change over time. Important states must be historically traceable.

### 3.6 Separation of Observation and Interpretation
The domain distinguishes what the learner did, what BRM inferred, what a supervisor confirmed, what the system recommended, and what was formally approved.

### 3.7 Academic Integrity by Design
The domain supports thinking and learning without enabling undisclosed authorship, fabricated evidence, or inappropriate substitution for the learner's work.

## 4. Primary Domain

> **Research Mentoring and Scholarly Development**

Its purpose is to help learners make progressively better research decisions through explainable mentoring while preserving supervisor authority and academic integrity.

## 5. Core Subdomains

### 5.1 Learner Development
Represents scholarly capability, research judgement, confidence, uncertainty, reflective practice, and research independence.

Key concepts: Learner, Learner State, Development Dimension, Development Level, Capability Indicator, Confidence Indicator, Uncertainty Indicator, Growth Opportunity.

### 5.2 Research Project
Represents the evolving research endeavour and its internal coherence.

Key concepts: Research Project, Research Stage, Research Construct, Research Decision, Research Question, Objective, Theoretical Position, Conceptual Model, Methodological Choice, Evidence Item, Contribution Claim, Limitation.

### 5.3 Mentoring
Represents diagnosis, selection, delivery, and evaluation of educational interventions.

Key concepts: Mentoring Session, Mentoring Need, Mentoring Intervention, Intervention Rationale, Expected Learning Outcome, Learner Response, Intervention Evaluation, Escalation.

### 5.4 Reflection and Feedback
Represents the learning cycle through which experience, feedback, and reflection change learner understanding and future action.

Key concepts: Reflection, Feedback, Feedback Source, Feedback Category, Reflection Prompt, Learning Insight, Action Commitment.

### 5.5 Supervision
Represents the academic relationship between learner and supervisor.

Key concepts: Supervisor, Supervision Relationship, Supervisor Review, Supervisor Decision, Approval, Concern, Direction, Meeting Record.

### 5.6 Institutional Governance
Represents the academic, ethical, program, and policy context.

Key concepts: Institution, Program, Research Policy, Ethics Requirement, Milestone, Assessment Requirement, Academic Role, Governance Decision.

### 5.7 Knowledge and Evidence
Represents evidence and knowledge structures supporting research reasoning and mentoring.

Key concepts: Source, Literature Record, Evidence Claim, Concept, Theory, Method, Relationship, Provenance Record, Validation Status.

## 6. Supporting Subdomains

- Identity and Role Context
- Workflow and Milestones
- Communication
- Audit and Provenance
- Configuration

These provide necessary capabilities without defining BRM's core educational value.

## 7. Principal Actors

### 7.1 Learner
Undertakes the research and remains responsible for research decisions and submitted work.

### 7.2 Supervisor
Mentors, reviews, challenges, guides, and where applicable approves research decisions.

### 7.3 Program Director
Provides program-level oversight, progression visibility, policy alignment, and intervention where required.

### 7.4 Institution
Defines policies, ethical requirements, milestones, roles, and academic standards.

### 7.5 BRM Mentoring System
Observes, reasons, recommends, prompts, records, and adapts within approved authority.

## 8. Central Aggregate Candidates

### 8.1 Learner Development Record
Controls learner state, capability indicators, development assessments, confidence, uncertainty, growth opportunities, and transition history.

### 8.2 Research Project
Controls project identity, stages, constructs, decisions, coherence status, and project history.

### 8.3 Mentoring Episode
Controls mentoring need, selected intervention, rationale, guidance, learner response, and outcome evaluation.

### 8.4 Supervision Relationship
Controls learner-supervisor assignment, review responsibilities, formal decisions, escalation paths, and supervision history.

### 8.5 Institutional Research Context
Controls program requirements, policies, ethics requirements, milestones, and applicable governance rules.

## 9. Foundational Domain Relationships

- A learner undertakes one or more research projects.
- A project belongs to an institutional and program context.
- A learner is supported through one or more supervision relationships.
- A project contains research constructs and research decisions.
- Research constructs may constrain, support, justify, refine, or validate one another.
- Learner interactions provide observations that may update learner state.
- Learner state informs mentoring needs.
- Mentoring needs lead to interventions.
- Interventions produce learner responses and possible learning outcomes.
- Reflection and feedback may change learner understanding and learner state.
- Supervisors may confirm, reject, revise, or override BRM recommendations.
- Formal approvals remain distinct from recommendations and inferred states.
- Important changes require provenance and temporal traceability.

## 10. Initial Domain Events

- LearnerStateObserved
- LearnerStateUpdated
- ResearchProjectCreated
- ResearchStageChanged
- ResearchConstructAdded
- ResearchConstructRevised
- ResearchDecisionProposed
- ResearchDecisionJustified
- ResearchDecisionRevised
- MentoringNeedIdentified
- MentoringInterventionSelected
- MentoringInterventionDelivered
- LearnerReflectionRecorded
- FeedbackProvided
- SupervisorReviewRequested
- SupervisorDecisionRecorded
- EscalationRaised
- InstitutionalRequirementApplied
- ResearchCoherenceIssueDetected
- ResearchCoherenceIssueResolved

Event names are neutral and descriptive. They must not embed implementation details or personal names.

## 11. Domain Invariants

1. A BRM recommendation must never be represented as supervisor approval.
2. An inferred learner state must retain supporting evidence and rationale.
3. A formal research decision must identify author, status, and history.
4. A mentoring intervention must identify its educational purpose.
5. A research project must retain traceability between major constructs and decisions.
6. Institutional requirements must be versioned and contextualised.
7. Learner-generated, AI-generated, supervisor-generated, and system-inferred content must remain distinguishable.
8. Historical academic records must not be silently overwritten.
9. BRM must not assign final grades or ethical approval without explicit delegated authority.
10. Personalisation must not lower academic standards.

## 12. Bounded Context Candidates

### 12.1 Learner Development Context
Owns learner-state interpretation, scholarly development indicators, and development history.

### 12.2 Research Design Context
Owns project constructs, research decisions, dependencies, coherence, and stage transitions.

### 12.3 Mentoring Context
Owns mentoring needs, intervention selection, delivery, reflection prompts, and evaluation.

### 12.4 Supervision Context
Owns supervision relationships, reviews, supervisor decisions, approvals, and escalations.

### 12.5 Institutional Governance Context
Owns programs, policies, ethics requirements, milestones, and institutional rules.

### 12.6 Knowledge and Evidence Context
Owns literature records, concepts, theories, methods, claims, provenance, and evidence relationships.

### 12.7 Progress and Insight Context
Provides derived progress views, learning analytics, program-level indicators, and explainable reporting without owning authoritative source records.

These boundaries remain candidates until later validation.

## 13. Context Interaction Principles

- Contexts communicate through explicit contracts.
- Derived insights do not silently modify authoritative records.
- Supervisor decisions may override recommendations while preserving the original recommendation and rationale.
- Institutional governance constrains research and mentoring without owning learner reflections.
- Knowledge and evidence services support reasoning but do not determine formal approval.
- Reporting contexts consume domain events and approved read models.

## 14. Domain Layering

1. **Constitutional Layer** — enduring principles and governance constraints from Volume 01.
2. **Educational Science Layer** — learning, judgement, pathway, intervention, learner-state, reflection, and evolution models from Volume 02.
3. **Domain Layer** — actors, entities, value objects, aggregates, services, policies, events, and bounded contexts.
4. **Application and Technology Layers** — use cases and technical implementation depending on, rather than redefining, the domain.

## 15. Traceability to Educational Models

| Educational Model | Domain Expression |
|---|---|
| BRMF-101 Research as Learning | Research activity and learner-development relationships |
| BRMF-102 Scholarly Development | Learner Development Record |
| BRMF-103 Research Judgement | Research Decision and judgement indicators |
| BRMF-104 Adaptive Mentoring | Mentoring policy and intervention selection |
| BRMF-105 Research Construct Model | Research Construct network |
| BRMF-106 Cognitive Pathways | Learner pathway profile and transition evidence |
| BRMF-107 Mentoring Intervention | Mentoring Episode |
| BRMF-108 Learner State | Learner State and transition history |
| BRMF-109 Reflection and Feedback | Reflection and Feedback records |
| BRMF-110 Educational Evolution | Versioned educational policies and EDR governance |

## 16. Exclusions

This document does not yet define detailed attributes, final aggregate boundaries, APIs, database schemas, AI models, prompts, interfaces, deployment, detailed security controls, or analytics formulas.

## 17. Validation Questions

1. Does the architecture preserve BRM's educational purpose?
2. Are human and system authorities clearly separated?
3. Are the proposed subdomains coherent and sufficiently distinct?
4. Are the major relationships represented?
5. Are academic integrity and explainability enforced as domain concerns?
6. Can the model support learners, supervisors, program directors, and institutions without collapsing their responsibilities?
7. Does it support implementation without prescribing technology prematurely?

## 18. Acceptance Criteria

BRMF-201 may progress from Draft to Approved when:

- Volume 01 and Volume 02 concepts are traceably represented;
- core and supporting subdomains are accepted;
- principal actors and authority boundaries are accepted;
- foundational invariants are accepted;
- bounded-context candidates are accepted for further specification;
- no contradiction with BRMF constitutional principles remains unresolved.

## 19. Planned Volume 03 Sequence

- BRMF-202 — Ubiquitous Language and Domain Glossary
- BRMF-203 — Learner and Scholarly Development Domain Model
- BRMF-204 — Research Project and Construct Domain Model
- BRMF-205 — Mentoring and Intervention Domain Model
- BRMF-206 — Supervision and Academic Authority Domain Model
- BRMF-207 — Institutional Governance Domain Model
- BRMF-208 — Knowledge, Evidence, and Provenance Domain Model
- BRMF-209 — Bounded Context and Context Mapping Model
- BRMF-210 — Domain Events, Policies, and Invariants
- BRMF-211 — Domain Architecture Validation and Acceptance

---

**End of BRMF-201**
