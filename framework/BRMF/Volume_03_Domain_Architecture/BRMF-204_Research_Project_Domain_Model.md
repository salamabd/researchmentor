# BRMF-204 — Research Project Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-201, BRMF-202, BRMF-203  
**Prepares:** BRMF-205, BRMF-206, BRMF-207, BRMF-208

---

## 1. Purpose

This document defines the domain model for the Research Project bounded context within the Business Research Mentor (BRM).

It establishes the Research Project as a governed scholarly system rather than a folder, document set, or task list.

The model governs project identity and scope, lifecycle, research stages, problem space, questions, objectives, assumptions, constraints, milestones, artefact references, coherence relationships, revisions, review, provenance, and interfaces with adjacent bounded contexts.

Detailed modelling of Research Decisions is reserved for BRMF-205. Detailed modelling of constructs, variables, relationships, and theoretical or conceptual frameworks is reserved for BRMF-206.

---

## 2. Domain Objective

The Research Project domain must enable BRM to represent a research project as an evolving network of scholarly commitments, questions, decisions, evidence, constraints, and relationships.

The domain must support the learner and supervisor in understanding:

- what the project is trying to investigate;
- why the project matters;
- what has been decided;
- what remains unresolved;
- how the project has changed;
- whether its major elements remain coherent;
- which claims are provisional;
- which elements require review;
- who has authority over each significant change.

The domain must not treat document completion as equivalent to research quality.

---

## 3. Core Principle

A Research Project is a living scholarly system.

It is not defined by the number of files, chapters, pages, meetings, or completed tasks. It is defined by the evolving coherence among the research problem, research gap, questions, objectives, theoretical framing, constructs, research design, evidence, interpretations, conclusions, and limitations.

The project must preserve the history of material changes so that the reasoning behind its present form remains explainable.

---

## 4. Bounded Context

### 4.1 Context name

**Research Project Context**

### 4.2 Responsibilities

The context owns:

- Research Project identity;
- Research Project lifecycle;
- Research Stage;
- Project Scope;
- Research Topic;
- Research Problem;
- Research Gap;
- Research Purpose;
- Research Significance;
- Research Questions;
- Research Objectives;
- Project Assumptions;
- Project Constraints;
- Project Milestones;
- Project Review State;
- project-level Coherence Findings;
- Project Revision History;
- Research Artefact references.

### 4.3 Responsibilities excluded

The context does not own:

- Learner State;
- detailed Research Decision reasoning;
- detailed Construct and Variable definitions;
- Evidence Item content;
- Mentoring Intervention logic;
- formal institutional progression decisions;
- supervisor identity management;
- document authoring.

---

## 5. Aggregate Root: Research Project

### 5.1 Identity

`ResearchProjectId`

### 5.2 Aggregate responsibilities

The Research Project aggregate must:

- maintain the authoritative project identity;
- preserve one current project state;
- retain prior material states;
- govern lifecycle transitions;
- maintain project scope;
- govern research stages;
- associate questions and objectives;
- record assumptions and constraints;
- maintain project-level coherence relationships;
- preserve references to related scholarly decisions;
- preserve references to research artefacts and evidence;
- record review and approval status;
- enforce project invariants;
- publish domain events.

### 5.3 Aggregate boundary

The aggregate directly controls:

- Project Profile;
- Project Scope;
- Research Topic;
- Research Problem;
- Research Gap;
- Research Purpose;
- Research Significance;
- Research Question Set;
- Research Objective Set;
- Project Assumption;
- Project Constraint;
- Research Stage State;
- Project Milestone;
- Project Review;
- Project Coherence Finding;
- Project Revision Record;
- Research Artefact Reference;
- Project Provenance Record.

The aggregate references, but does not own:

- Learner Development Record;
- Research Decision;
- Construct;
- Variable;
- Theory;
- Evidence Item;
- Mentoring Episode;
- Supervisor;
- Institutional Progression Decision.

---

## 6. Governed Scholarly Object Pattern

Major scholarly objects within BRM should conform conceptually to a common cross-cutting pattern called the **Governed Scholarly Object**.

This is an architectural pattern, not a requirement for class inheritance.

A Governed Scholarly Object should support, where applicable:

- stable identity;
- explicit lifecycle;
- version history;
- provenance;
- evidence references;
- review status;
- authority boundaries;
- traceability;
- rationale;
- domain events;
- supersession rather than silent replacement.

The Research Project is a Governed Scholarly Object. The same pattern will later apply to Research Decisions, Research Questions, Constructs, Theoretical Models, Evidence Claims, and Learner States.

---

## 7. Project Profile

The Project Profile identifies the project and its institutional context.

### Attributes

- Project Id;
- Working Title;
- Formal Title, optional;
- Learner Id;
- Program Id;
- Institution Id, optional;
- Primary Supervisor Id, optional;
- Co-Supervisor Ids, optional;
- Discipline;
- Subdiscipline;
- Degree or Award Type;
- Project Type;
- Start Date;
- Expected Completion Date;
- Actual Completion Date, optional;
- Current Research Stage;
- Project Status;
- Created At;
- Created By;
- Last Updated At;
- Provenance.

### Project types

- Honours Research Project;
- MBA Research Project;
- MSc Thesis;
- DBA Thesis;
- PhD Thesis;
- Research Article;
- Conference Paper;
- Independent Research Study;
- Applied Business Research Project.

---

## 8. Project Lifecycle

The foundational project lifecycle is:

1. Initiated
2. Exploratory
3. Problem Formation
4. Design Development
5. Proposal Review
6. Approved for Execution
7. Data Preparation
8. Data Collection
9. Analysis
10. Interpretation
11. Writing and Integration
12. Examination or Review
13. Revision
14. Completed
15. Archived
16. Withdrawn

Institutions may map their own stages to these lifecycle concepts.

### Lifecycle rules

- A project may move backward when revision is educationally or academically required.
- Stage movement must not erase prior stages.
- Formal stage approval must remain distinguishable from a system inference.
- Completion requires institutional or delegated human confirmation.
- Withdrawal must preserve the project record and rationale.

---

## 9. Research Stage State

A Research Stage State records the current project stage and its review status.

### Attributes

- Stage State Id;
- Research Stage;
- Effective From;
- Superseded At;
- Entry Criteria;
- Exit Criteria;
- Criteria Evidence;
- Open Issues;
- Review Status;
- Confirmed By;
- Rationale;
- Provenance.

### Review status

- Not Reviewed;
- System Proposed;
- Learner Acknowledged;
- Supervisor Confirmed;
- Institutionally Confirmed;
- Revision Required;
- Superseded.

---

## 10. Project Scope

Project Scope defines the governed boundaries of the inquiry.

### Attributes

- Scope Id;
- Unit of Analysis;
- Population or Domain;
- Geographic Scope;
- Industry Scope;
- Organisational Scope;
- Time Scope;
- Conceptual Scope;
- Inclusion Boundaries;
- Exclusion Boundaries;
- Scope Rationale;
- Scope Risks;
- Effective From;
- Superseded At;
- Provenance.

A material scope change must create a revision record.

---

## 11. Research Topic

The Research Topic identifies the general area of inquiry.

### Attributes

- Topic Id;
- Topic Statement;
- Context;
- Practical Relevance;
- Academic Relevance;
- Scope Reference;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Topic status

- Proposed;
- Under Exploration;
- Refined;
- Accepted;
- Rejected;
- Superseded.

A Research Topic is not equivalent to a Research Problem.

---

## 12. Research Problem

A Research Problem defines the condition, tension, deficiency, contradiction, unresolved phenomenon, or decision difficulty that justifies investigation.

### Attributes

- Problem Id;
- Problem Statement;
- Context;
- Affected Domain;
- Current Condition;
- Desired or Expected Condition;
- Problem Evidence References;
- Consequences;
- Researchability Assessment;
- Scope Reference;
- Status;
- Review Status;
- Effective From;
- Superseded At;
- Provenance.

### Problem status

- Candidate;
- Under Investigation;
- Supported;
- Confirmed;
- Contested;
- Rejected;
- Superseded.

### Rules

A Research Problem must:

- be distinguishable from a broad topic;
- identify a condition requiring investigation;
- have a clear context;
- be supported by evidence or reasoned justification;
- be researchable within the project constraints;
- remain traceable to the Research Questions and Objectives.

---

## 13. Research Gap

A Research Gap represents a justified absence, limitation, inconsistency, unresolved relationship, contextual omission, methodological weakness, or theoretical deficiency in current knowledge.

### Gap types

- Empirical;
- Theoretical;
- Methodological;
- Contextual;
- Population;
- Contradictory Findings;
- Practical Knowledge;
- Replication;
- Temporal;
- Measurement;
- Integration.

### Attributes

- Gap Id;
- Gap Type;
- Gap Statement;
- Knowledge Context;
- Supporting Evidence References;
- Boundary Conditions;
- Significance;
- Relationship to Problem;
- Confidence;
- Status;
- Review Status;
- Effective From;
- Superseded At;
- Provenance.

### Rules

A gap must not be accepted merely because:

- no identical study was found;
- a new country or industry is selected;
- the learner claims novelty without evidence;
- the topic is personally interesting.

---

## 14. Research Purpose

Research Purpose expresses the overall scholarly intent of the project.

### Attributes

- Purpose Id;
- Purpose Statement;
- Purpose Type;
- Related Problem;
- Related Gap;
- Context;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Purpose types

- Exploratory;
- Descriptive;
- Explanatory;
- Predictive;
- Evaluative;
- Interpretive;
- Design-Oriented;
- Action-Oriented;
- Theory-Building;
- Theory-Testing.

---

## 15. Research Significance

Research Significance describes why the project matters.

### Significance dimensions

- Theoretical;
- Empirical;
- Methodological;
- Practical;
- Policy;
- Educational;
- Organisational;
- Societal.

### Attributes

- Significance Id;
- Dimension;
- Claim;
- Beneficiaries;
- Evidence or Rationale;
- Limitations;
- Status;
- Provenance.

Significance must not be represented as established fact when it remains prospective.

---

## 16. Research Question Set

The Research Question Set is a controlled collection of research questions governed by the Research Project aggregate.

### Attributes

- Question Set Id;
- Primary Question;
- Secondary Questions;
- Question Relationships;
- Effective From;
- Superseded At;
- Review Status;
- Provenance.

### Research Question attributes

- Question Id;
- Question Text;
- Question Type;
- Scope;
- Related Problem;
- Related Gap;
- Related Objective;
- Answerability Assessment;
- Evidence Requirements;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Question types

- Exploratory;
- Descriptive;
- Explanatory;
- Comparative;
- Relational;
- Predictive;
- Evaluative;
- Interpretive;
- Design;
- Causal;
- Process;
- Decision.

### Question status

- Candidate;
- Under Refinement;
- Accepted;
- Supervisor Confirmed;
- Rejected;
- Superseded;
- Answered;
- Partially Answered;
- Unresolved.

---

## 17. Research Objective Set

The Research Objective Set describes what the project intends to accomplish.

### Attributes

- Objective Set Id;
- General Objective;
- Specific Objectives;
- Objective Relationships;
- Effective From;
- Superseded At;
- Review Status;
- Provenance.

### Research Objective attributes

- Objective Id;
- Objective Statement;
- Objective Type;
- Related Question;
- Related Problem;
- Intended Output;
- Completion Evidence;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Objective types

- General;
- Exploratory;
- Descriptive;
- Explanatory;
- Comparative;
- Evaluative;
- Predictive;
- Interpretive;
- Developmental;
- Validation.

### Rules

Each accepted specific objective must:

- relate to at least one accepted Research Question;
- contribute to the Research Purpose;
- be feasible within the Project Scope;
- identify an assessable scholarly outcome;
- avoid being expressed only as an administrative task.

---

## 18. Project Assumption

A Project Assumption is a proposition accepted provisionally for the project to proceed.

### Attributes

- Assumption Id;
- Assumption Statement;
- Assumption Type;
- Basis;
- Related Project Elements;
- Risk if False;
- Validation Method;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Assumption types

- Theoretical;
- Methodological;
- Contextual;
- Measurement;
- Access;
- Population;
- Data;
- Analytical;
- Ethical;
- Operational.

### Status

- Proposed;
- Accepted Provisionally;
- Validated;
- Challenged;
- Rejected;
- Superseded.

---

## 19. Project Constraint

A Project Constraint is a condition that limits the available project choices.

### Attributes

- Constraint Id;
- Constraint Type;
- Description;
- Source;
- Severity;
- Affected Project Elements;
- Flexibility;
- Accepted By;
- Effective From;
- Resolution Status;
- Provenance.

### Constraint types

- Time;
- Access;
- Budget;
- Data;
- Ethical;
- Institutional;
- Methodological;
- Skill;
- Technology;
- Legal;
- Geographic;
- Population;
- Supervisor Requirement.

A constraint must not automatically determine the scholarly decision. It narrows the feasible decision space and must remain visible in the rationale.

---

## 20. Project Milestone

A Project Milestone represents a meaningful scholarly or governance checkpoint.

### Attributes

- Milestone Id;
- Milestone Type;
- Title;
- Description;
- Due Date;
- Completion Date;
- Required Evidence;
- Review Authority;
- Status;
- Outcome;
- Related Project Elements;
- Provenance.

### Milestone types

- Topic Approval;
- Problem Confirmation;
- Proposal Submission;
- Ethics Submission;
- Ethics Approval;
- Confirmation of Candidature;
- Data Collection Readiness;
- Data Collection Completion;
- Analysis Completion;
- Draft Submission;
- Final Submission;
- Examination;
- Revision Completion.

### Milestone status

- Planned;
- In Progress;
- Submitted;
- Under Review;
- Approved;
- Revision Required;
- Completed;
- Deferred;
- Cancelled.

A milestone records governance or scholarly progress but does not itself prove capability.

---

## 21. Research Artefact Reference

A Research Artefact Reference links the project to a document, dataset, model, instrument, diagram, code asset, or other research output.

### Attributes

- Artefact Reference Id;
- Artefact Type;
- External or Internal Identifier;
- Title;
- Version;
- Storage Location;
- Related Project Elements;
- Created By;
- Created At;
- Status;
- Provenance.

The Research Project Context stores the reference, not necessarily the artefact content.

---

## 22. Project Coherence Finding

A Project Coherence Finding records an evaluated relationship between two or more project elements.

### Attributes

- Finding Id;
- Coherence Type;
- Source Element References;
- Target Element References;
- Finding;
- Severity;
- Evidence;
- Explanation;
- Recommended Review;
- Status;
- Created At;
- Resolved At;
- Provenance.

### Initial coherence types

- Problem to Gap;
- Problem to Question;
- Gap to Question;
- Question to Objective;
- Objective to Scope;
- Question to Construct;
- Construct to Theory;
- Question to Methodology;
- Objective to Method;
- Method to Evidence Requirement;
- Analysis to Question;
- Conclusion to Evidence;
- Limitation to Claim;
- Scope to Generalisation.

### Severity

- Informational;
- Minor;
- Material;
- Critical;
- Indeterminate.

### Status

- Open;
- Acknowledged;
- Under Review;
- Resolved;
- Accepted with Limitation;
- Dismissed with Rationale;
- Superseded.

---

## 23. Project Review

A Project Review records a governed evaluation of the project or part of it.

### Attributes

- Review Id;
- Review Type;
- Scope;
- Reviewer;
- Reviewed Elements;
- Findings;
- Decision;
- Rationale;
- Requested Revisions;
- Effective Date;
- Provenance.

### Review types

- Learner Self-Review;
- Supervisor Review;
- Methodological Review;
- Ethics Review;
- Milestone Review;
- Proposal Review;
- Institutional Review;
- External Examination.

### Review decisions

- Accept;
- Accept with Qualification;
- Revise;
- Reject;
- Request Additional Evidence;
- Defer;
- Escalate.

---

## 24. Project Revision Record

A Project Revision Record preserves the history of a material project change.

### Attributes

- Revision Id;
- Project Id;
- Changed Elements;
- Previous Values;
- New Values;
- Change Reason;
- Trigger;
- Related Decision References;
- Evidence References;
- Requested By;
- Approved By;
- Effective From;
- Provenance.

### Material change examples

- change in Research Problem;
- change in primary Research Question;
- major scope change;
- change in Research Purpose;
- change in project type;
- major stage rollback;
- removal of a core objective;
- change caused by ethics or access constraints.

---

## 25. Project Status

The foundational Project Status values are:

- Draft;
- Active;
- Paused;
- Under Review;
- Revision Required;
- Approved;
- Completed;
- Withdrawn;
- Archived.

Project Status is distinct from Research Stage.

---

## 26. Commands

Initial domain commands include:

- Create Research Project
- Update Project Profile
- Define Project Scope
- Propose Research Topic
- Refine Research Topic
- Propose Research Problem
- Support Research Problem
- Reject Research Problem
- Propose Research Gap
- Support Research Gap
- Reject Research Gap
- Define Research Purpose
- Record Research Significance
- Add Research Question
- Refine Research Question
- Accept Research Question
- Supersede Research Question
- Add Research Objective
- Accept Research Objective
- Supersede Research Objective
- Record Project Assumption
- Challenge Project Assumption
- Record Project Constraint
- Resolve Project Constraint
- Add Project Milestone
- Submit Project Milestone
- Review Project Milestone
- Record Coherence Finding
- Resolve Coherence Finding
- Request Project Review
- Record Project Review
- Advance Research Stage
- Return Project to Earlier Stage
- Revise Research Project
- Complete Research Project
- Withdraw Research Project
- Archive Research Project

Commands express intent and may be rejected by domain rules.

---

## 27. Domain Events

Initial domain events include:

- ResearchProjectCreated
- ProjectProfileUpdated
- ProjectScopeDefined
- ProjectScopeRevised
- ResearchTopicProposed
- ResearchTopicRefined
- ResearchTopicAccepted
- ResearchTopicRejected
- ResearchProblemProposed
- ResearchProblemSupported
- ResearchProblemContested
- ResearchProblemRejected
- ResearchGapProposed
- ResearchGapSupported
- ResearchGapRejected
- ResearchPurposeDefined
- ResearchSignificanceRecorded
- ResearchQuestionAdded
- ResearchQuestionRefined
- ResearchQuestionAccepted
- ResearchQuestionSuperseded
- ResearchObjectiveAdded
- ResearchObjectiveAccepted
- ResearchObjectiveSuperseded
- ProjectAssumptionRecorded
- ProjectAssumptionChallenged
- ProjectConstraintRecorded
- ProjectConstraintResolved
- ProjectMilestoneAdded
- ProjectMilestoneSubmitted
- ProjectMilestoneReviewed
- ProjectCoherenceFindingRecorded
- ProjectCoherenceFindingResolved
- ProjectReviewRequested
- ProjectReviewRecorded
- ResearchStageAdvanced
- ResearchStageReverted
- ResearchProjectRevised
- ResearchProjectCompleted
- ResearchProjectWithdrawn
- ResearchProjectArchived

---

## 28. Domain Services

### 28.1 Project Coherence Evaluation Service

Evaluates whether defined project relationships remain coherent.

Inputs include accepted project elements, related decision references, evidence references, construct and theory references, methodology references, and applicable coherence rules.

Outputs include coherence findings, severity, explanation, unresolved dependencies, and recommended review.

The service identifies concerns but does not replace supervisor judgement.

### 28.2 Project Stage Readiness Service

Evaluates whether the project appears ready to enter a new stage.

Possible outputs are:

- ready;
- ready with qualification;
- not ready;
- additional evidence required;
- supervisor review required.

### 28.3 Research Problem Evaluation Service

Evaluates whether a proposed Research Problem is sufficiently clear, contextualised, significant, evidence-supported, researchable, appropriately scoped, and distinguishable from a topic or desired solution.

### 28.4 Research Gap Evaluation Service

Evaluates whether a proposed Research Gap is supported and academically meaningful. It must distinguish absence of an identical study from genuine unresolved knowledge, contextual extension, replication value, methodological limitation, or theoretical inconsistency.

### 28.5 Project Change Impact Service

Evaluates the likely impact of a proposed material change on related project elements.

A primary Research Question change may affect objectives, constructs, methodology, sampling, analysis, milestones, and learner development needs.

---

## 29. Domain Policies

### 29.1 Project Creation Policy

A Research Project may be created when a valid learner reference exists, a project type is specified, a working title exists, the institutional or independent context is known, and the creator has authority.

A confirmed problem or gap is not required at creation.

### 29.2 Material Change Policy

A material change must create a revision record, identify affected elements, preserve previous values, record rationale, identify related decisions, trigger impact evaluation, and request review when required.

### 29.3 Research Stage Transition Policy

A stage transition must consider entry and exit criteria, required milestones, open critical coherence findings, unresolved ethical constraints, required human approvals, and evidence sufficiency.

### 29.4 Coherence Review Policy

Material or critical coherence findings must not be silently dismissed. They require acknowledgement, resolution, acceptance with limitation, or dismissal with recorded rationale and authority.

### 29.5 Project Completion Policy

A project may be marked Completed only when required institutional processes are satisfied, required outputs are submitted, final review authority confirms completion, unresolved critical findings are closed or formally accepted, and completion provenance is recorded.

### 29.6 Supersession Policy

Material scholarly elements must be superseded rather than destructively overwritten.

---

## 30. Aggregate Invariants

The Research Project aggregate must enforce:

1. Every project has one stable Research Project Id.
2. Every project has exactly one current Project Profile.
3. Project Status and Research Stage remain distinct.
4. Every accepted Research Question relates to the project scope.
5. Every accepted specific Objective relates to at least one accepted Research Question.
6. Every supported Research Gap relates to a Research Problem or justified knowledge need.
7. A Research Topic is not represented as a Research Problem without explicit problem formulation.
8. A Project Constraint is not represented as a scholarly justification.
9. Formal approval is distinguishable from system recommendation.
10. Material changes create Project Revision Records.
11. Prior material states are preserved.
12. Critical coherence findings cannot be silently removed.
13. Completion requires authorised human confirmation.
14. Research artefact references do not determine scholarly validity.
15. Activity volume does not determine project quality.
16. System-generated content cannot be represented as learner-authored without provenance.
17. Every state transition records actor, time, rationale, and provenance.
18. The aggregate must not own detailed Research Decision reasoning.
19. The aggregate must not own detailed Construct or Variable semantics.
20. The project must remain explainable without hidden AI reasoning.

---

## 31. Authority Model

### BRM may

- propose project elements;
- identify possible inconsistencies;
- evaluate readiness;
- generate coherence findings;
- explain project changes;
- recommend reviews;
- record system inferences;
- support version comparison.

### Learner may

- create and revise project elements;
- provide rationale and evidence;
- acknowledge findings;
- challenge system interpretations;
- propose stage transitions;
- submit milestones.

### Supervisor may

- confirm or revise project elements;
- accept or reject stage transitions;
- qualify project coherence;
- request additional evidence;
- approve or reject material changes within delegated authority;
- confirm scholarly readiness.

### Institution may

- define formal stages;
- define approval requirements;
- define milestone rules;
- determine ethics and progression authority;
- confirm formal completion;
- audit project governance.

---

## 32. Cross-Context Interfaces

### 32.1 Learner Development Context

Provides learner-state summaries, growth opportunities, and development dimensions affecting project work.

Receives project-stage changes, research-task evidence, decision outcomes, and unresolved scholarly difficulties.

### 32.2 Research Decision Context

Provides decision references, selected options, rationale summaries, decision status, and revision relationships.

Receives decision questions, project constraints, affected project elements, and project review outcomes.

The Research Project stores references to decisions but does not own their full reasoning lifecycle.

### 32.3 Construct and Theory Context

Provides constructs, variables, theories, relationships, and conceptual or theoretical frameworks.

Receives project questions, objectives, scope, problem, and gap context.

### 32.4 Knowledge, Evidence, and Provenance Context

Provides evidence references, claim support, contradiction records, provenance, and source-quality information.

Receives evidence requirements and problem, gap, or significance claims.

### 32.5 Mentoring Context

Receives the current project stage, open questions, coherence findings, constraints, and milestone needs.

Provides mentoring outcomes, learner responses, and intervention-linked project changes.

### 32.6 Supervision and Governance Context

Receives review requests, material-change requests, stage-readiness findings, and milestone submissions.

Provides confirmations, qualifications, revisions, approvals, rejections, and escalations.

---

## 33. Example Domain Scenario

A learner proposes to investigate employee engagement in small businesses.

### Initial state

- Topic: employee engagement;
- Context: small businesses;
- Problem: not yet adequately formulated;
- Gap: claimed but unsupported;
- Primary Question: overly broad;
- Scope: undefined;
- Stage: Exploratory.

### Domain actions

1. Create Research Project.
2. Record Research Topic.
3. Propose Research Problem.
4. Evaluate Research Problem.
5. Record a finding that the proposed problem is currently only a topic statement.
6. Identify missing evidence and scope.
7. Record Project Coherence Finding.
8. Link the issue to a Research Decision request.
9. Provide project state to the Mentoring Context.
10. Learner refines the problem and supplies evidence.
11. Record Project Revision.
12. Re-evaluate coherence.
13. Supervisor confirms the revised problem.
14. Advance the project to Problem Formation or Design Development.

---

## 34. Validation Questions

1. Is the Research Project modelled as a scholarly system rather than a folder?
2. Is the aggregate boundary sufficiently clear?
3. Are Research Decisions referenced without being absorbed into the aggregate?
4. Are constructs and variables reserved for their own domain model?
5. Are topic, problem, gap, purpose, questions, and objectives distinct?
6. Can project evolution be reconstructed?
7. Are material changes governed?
8. Are coherence findings actionable and traceable?
9. Are formal approvals distinguishable from AI inference?
10. Can institutions adapt stages without changing core semantics?
11. Does the model protect learner agency and supervisor authority?
12. Does the model avoid equating completion with quality?

---

## 35. Acceptance Criteria

BRMF-204 may progress from Draft to Approved when:

- the Research Project aggregate boundary is accepted;
- project lifecycle and stage distinctions are accepted;
- topic, problem, gap, purpose, question, and objective models are accepted;
- assumption and constraint distinctions are accepted;
- coherence findings and revision records are accepted;
- authority boundaries are accepted;
- commands, events, policies, and invariants are accepted;
- cross-context interfaces are suitable for BRMF-205 and BRMF-206;
- no unresolved contradiction with BRMF-201 through BRMF-203 remains.

---

## 36. Next Specification

The next recommended document is:

**BRMF-205 — Research Decision and Scholarly Reasoning Domain Model**

It will define Research Decision as a first-class governed aggregate, including decision questions, alternatives, evidence, reasoning, assumptions, constraints, uncertainty, selection, justification, review, revision, acceptance, and supersession.

---

**End of BRMF-204**
