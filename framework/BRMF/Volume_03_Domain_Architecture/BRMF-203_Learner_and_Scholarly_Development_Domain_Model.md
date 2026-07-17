# BRMF-203 — Learner and Scholarly Development Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-108, BRMF-109, BRMF-201, BRMF-202

---

## 1. Purpose

This document defines the domain model for learner development and scholarly
development within the Business Research Mentor (BRM).

It translates the educational concepts established in Volume 02 into explicit
domain entities, value objects, aggregate boundaries, policies, services,
events, state transitions, invariants, and authority rules.

The model exists to support adaptive, explainable, and ethically governed
mentoring while preserving the learner's responsibility for research and the
supervisor's academic authority.

---

## 2. Domain Objective

The Learner Development domain must enable BRM to:

- represent scholarly development over time;
- distinguish observation from interpretation;
- record evidence of capability and uncertainty;
- identify strengths and growth opportunities;
- support adaptive mentoring;
- track reflection and learning;
- explain why a learner-state interpretation was formed;
- preserve supervisor review and override;
- avoid permanent or reductive labelling;
- support progression toward research independence.

The domain must not reduce development to task completion, activity counts, or a
single score.

---

## 3. Scope

This specification governs:

- learner identity references relevant to scholarly development;
- learner development records;
- development dimensions;
- development levels;
- learner-state observations;
- learner-state inferences;
- capability indicators;
- confidence and uncertainty indicators;
- strengths and growth opportunities;
- cognitive pathway observations;
- reflection-linked development;
- learner-state transitions;
- supervisor confirmations and overrides;
- development history and provenance.

This specification does not govern:

- institutional enrolment records;
- formal grading;
- final academic progression decisions;
- detailed research project structure;
- detailed mentoring-intervention design;
- authentication or personal-account management;
- clinical, psychological, or personality diagnosis.

---

## 4. Core Domain Concepts

### 4.1 Learner

A learner is a person undertaking research and developing scholarly capability.

Within this bounded context, the Learner entity is represented only by the
minimum identity reference required to associate development records with the
correct person.

### 4.2 Learner Development Record

The Learner Development Record is the aggregate root for the learner's governed
scholarly-development history.

It controls the consistency of:

- current learner state;
- development dimensions;
- development-level estimates;
- capability indicators;
- confidence and uncertainty indicators;
- strengths;
- growth opportunities;
- cognitive pathway observations;
- state-transition history;
- evidence and provenance references;
- supervisor confirmations and overrides.

### 4.3 Learner State

Learner State is a time-bound, evidence-informed representation of the learner's
current educational condition for a defined research context.

Learner State is:

- contextual;
- revisable;
- explainable;
- historically traceable;
- non-diagnostic;
- distinct from the learner's identity or worth.

### 4.4 Scholarly Development

Scholarly Development is the progressive growth of research understanding,
judgement, methodological competence, reflective practice, and independence.

### 4.5 Development Dimension

A Development Dimension is a governed area of scholarly capability.

The initial dimensions are:

1. Research Understanding
2. Critical Thinking
3. Research Judgement
4. Methodological Competence
5. Evidence Use
6. Theoretical Reasoning
7. Reflective Practice
8. Scholarly Communication
9. Research Planning
10. Research Independence

Institutions may configure additional dimensions, but the constitutional meaning
of the core dimensions must remain stable.

### 4.6 Development Level

A Development Level classifies the learner's current demonstrated capability
within a specific Development Dimension.

The foundational levels are:

- Guided
- Emerging
- Developing
- Independent
- Scholarly Leadership

A learner may occupy different levels across different dimensions.

---

## 5. Aggregate Design

## 5.1 Aggregate Root: Learner Development Record

### Identity

`LearnerDevelopmentRecordId`

### Required references

- `LearnerId`
- active institutional context, where applicable
- active program context, where applicable
- one or more linked research projects

### Controlled child entities and value objects

- Learner State
- Development Assessment
- Development Dimension State
- Capability Indicator
- Confidence Indicator
- Uncertainty Indicator
- Strength
- Growth Opportunity
- Cognitive Pathway Observation
- State Transition
- Supervisor Development Review
- Provenance Reference

### Aggregate responsibilities

The aggregate must:

- preserve one authoritative current learner state per defined context;
- retain all prior states;
- prevent unsupported level changes;
- record evidence supporting each material inference;
- distinguish system-inferred values from supervisor-confirmed values;
- ensure growth opportunities are specific and educationally actionable;
- prevent confidence from being used as a substitute for competence;
- preserve overrides and their rationale;
- publish meaningful domain events.

---

## 5.2 Contextual State Partition

A single learner may have more than one active Learner State where the states
relate to materially different contexts.

Examples:

- topic selection;
- literature evaluation;
- methodology design;
- data analysis;
- scholarly writing;
- oral defence preparation.

Each Learner State must therefore include a `DevelopmentContext`.

A context may reference:

- Research Project;
- Research Stage;
- Research Decision;
- Development Dimension;
- Mentoring Episode;
- Academic Milestone.

---

## 6. Entity Definitions

## 6.1 Development Assessment

A Development Assessment is an entity representing a reasoned evaluation of one
or more development dimensions at a particular time.

### Attributes

- Assessment Id
- Learner Development Record Id
- Development Context
- Assessment Purpose
- Assessment Source
- Observation References
- Evidence References
- Dimension Findings
- Overall Interpretation
- Confidence of Interpretation
- Limitations
- Created By
- Created At
- Status
- Provenance

### Assessment sources

- BRM inference;
- learner self-reflection;
- supervisor review;
- structured activity;
- milestone review;
- validated external evidence.

### Assessment status

- Draft;
- Proposed;
- Under Review;
- Accepted as System Inference;
- Supervisor Confirmed;
- Supervisor Revised;
- Superseded;
- Withdrawn.

A Development Assessment is not a formal academic grade.

---

## 6.2 Development Dimension State

Represents the current condition of one Development Dimension within a defined
context.

### Attributes

- Development Dimension
- Development Level
- Level Basis
- Capability Indicators
- Confidence Indicators
- Uncertainty Indicators
- Strengths
- Growth Opportunities
- Effective From
- Superseded At
- Confirmation Status
- Evidence References
- Rationale

### Level basis

The `Level Basis` must identify whether the level is:

- observed;
- inferred;
- learner self-reported;
- supervisor confirmed;
- institutionally assessed.

---

## 6.3 Capability Indicator

A Capability Indicator records evidence that the learner demonstrated a
meaningful scholarly capability.

### Attributes

- Indicator Id
- Capability Type
- Development Dimension
- Context
- Observation Reference
- Evidence Reference
- Demonstration Description
- Strength of Evidence
- Recency
- Repetition
- Transferability
- Source
- Provenance

### Examples

- distinguishes a research problem from a topic;
- compares competing theoretical explanations;
- justifies a methodological choice;
- identifies assumptions in a claim;
- revises a decision after evaluating evidence;
- explains limitations of an analytical approach.

Capability Indicators must be behaviour- or evidence-based rather than based on
unexplained impressions.

---

## 6.4 Confidence Indicator

A Confidence Indicator records evidence about the learner's expressed or
demonstrated certainty regarding a research matter.

### Attributes

- Indicator Id
- Context
- Confidence Direction
- Evidence Reference
- Expression or Behaviour
- Interpretation
- Source
- Timestamp
- Provenance

### Confidence direction

- low confidence;
- calibrated confidence;
- high confidence;
- overconfidence risk;
- underconfidence risk;
- indeterminate.

A Confidence Indicator must not independently cause a Development Level change.

---

## 6.5 Uncertainty Indicator

An Uncertainty Indicator records unresolved ambiguity, inconsistency, doubt, or
lack of clarity relevant to research reasoning or action.

### Attributes

- Indicator Id
- Uncertainty Type
- Context
- Evidence Reference
- Description
- Educational Significance
- Resolution Status
- Related Growth Opportunity
- Provenance

### Uncertainty types

- conceptual;
- theoretical;
- methodological;
- evidential;
- procedural;
- interpretive;
- ethical;
- decision-related.

---

## 6.6 Strength

A Strength is an evidence-supported scholarly capability currently demonstrated
by the learner.

### Attributes

- Strength Id
- Development Dimension
- Description
- Supporting Indicators
- Context Scope
- Stability
- Confirmed By
- Effective From
- Review Date

A Strength must be specific enough to support mentoring decisions.

---

## 6.7 Growth Opportunity

A Growth Opportunity is a specific area where targeted learning or mentoring
may improve scholarly capability.

### Attributes

- Growth Opportunity Id
- Development Dimension
- Description
- Evidence Basis
- Educational Priority
- Suggested Learning Objective
- Related Mentoring Need
- Status
- Created At
- Reviewed At
- Provenance

### Status

- Identified;
- Accepted by Learner;
- Prioritised;
- In Development;
- Evidence of Improvement;
- Resolved;
- Deferred;
- Superseded.

Growth Opportunities must not use deficit-based labels such as “weak learner.”

---

## 6.8 Cognitive Pathway Observation

A Cognitive Pathway Observation records a recurring or meaningful reasoning
pattern shown by the learner.

### Attributes

- Observation Id
- Pathway Type
- Development Context
- Supporting Observations
- Pattern Description
- Educational Interpretation
- Stability
- Confidence
- Recorded At
- Provenance

### Initial pathway types

- Exploratory;
- Comparative;
- Constraint-Seeking;
- Evidence-Led;
- Theory-Led;
- Method-Led;
- Reflective-Revisional;
- Premature-Closure Risk;
- Excessive-Expansion Risk;
- Fragmented Reasoning Risk.

These terms describe observed patterns and must not become permanent personality
labels.

---

## 6.9 Supervisor Development Review

A Supervisor Development Review records a supervisor's examination of a learner
state, assessment, strength, growth opportunity, or transition.

### Attributes

- Review Id
- Reviewer Id
- Reviewed Record References
- Decision
- Rationale
- Requested Changes
- Scope
- Created At
- Provenance

### Decisions

- Confirm;
- Confirm with Qualification;
- Revise;
- Reject;
- Request Additional Evidence;
- Defer;
- Escalate.

---

## 7. Value Objects

## 7.1 Development Context

Defines the scope within which a learner state or development interpretation is
valid.

### Components

- Research Project Id
- Research Stage
- Research Decision Id, optional
- Development Dimension, optional
- Academic Milestone Id, optional
- Context Description

Two Development Contexts are equal when their governed component values are
equal.

---

## 7.2 Development Level

A governed value object with ordered values:

1. Guided
2. Emerging
3. Developing
4. Independent
5. Scholarly Leadership

The order supports comparison but must not be treated as a universal numerical
score.

---

## 7.3 Interpretation Confidence

Represents confidence in the reliability of a system or human interpretation.

Values:

- Low
- Moderate
- High
- Indeterminate

Interpretation Confidence is distinct from Learner Confidence.

---

## 7.4 Evidence Strength

Represents the degree to which specified evidence supports a particular
development interpretation in context.

Values:

- Insufficient
- Limited
- Moderate
- Strong
- Convergent

“Convergent” means multiple relevant evidence sources support a similar
interpretation.

---

## 7.5 Confirmation Status

Values:

- Unconfirmed System Inference
- Learner Acknowledged
- Supervisor Confirmed
- Supervisor Qualified
- Institutionally Assessed
- Superseded

---

## 7.6 Educational Priority

Values:

- Low
- Normal
- High
- Immediate Review

“Immediate Review” does not automatically mean emergency or misconduct. It means
the issue requires prompt educational or supervisory attention.

---

## 8. Learner State Structure

A Learner State must contain:

- State Id
- Learner Development Record Id
- Development Context
- Effective From
- Superseded At
- Development Dimension States
- Current Strengths
- Current Growth Opportunities
- Confidence Indicators
- Uncertainty Indicators
- Cognitive Pathway Observations
- Interpretation Summary
- Interpretation Confidence
- Evidence References
- Assessment References
- Confirmation Status
- Provenance

The state must remain intelligible without requiring access to hidden AI
reasoning.

---

## 9. State Lifecycle

The Learner State lifecycle is:

1. Observation Collection
2. Interpretation Proposed
3. Evidence Sufficiency Evaluated
4. Learner State Drafted
5. State Accepted as System Inference
6. Learner Acknowledgement, where appropriate
7. Supervisor Review, where required
8. State Confirmed, Qualified, Revised, or Rejected
9. State Used for Mentoring
10. New Evidence Collected
11. State Superseded

A state must never be silently overwritten.

---

## 10. Development-Level Transition Rules

### 10.1 Upward transition

A level may move upward when:

- relevant capability is demonstrated;
- evidence is sufficient for the context;
- the demonstration is not based on one accidental success;
- the learner shows appropriate reasoning or transfer;
- contradictory evidence is considered;
- the rationale is recorded.

### 10.2 Downward transition

A level may move downward only when:

- materially relevant new evidence contradicts the previous interpretation;
- the context has changed substantially;
- the earlier assessment is found to be unsupported;
- supervisor review revises the state;
- the prior state and rationale remain preserved.

A downward transition must not be used as punishment.

### 10.3 Contextual variation

Different levels across contexts do not constitute inconsistency.

A learner may, for example, be:

- Independent in literature evaluation;
- Developing in methodology design;
- Guided in advanced statistical analysis.

### 10.4 No automatic promotion by time or completion

Development Level must not increase solely because:

- time has passed;
- tasks were completed;
- pages were written;
- meetings were attended;
- system usage increased.

---

## 11. Observation and Inference Model

### 11.1 Observation

An Observation records what occurred.

Examples:

- the learner compared two theories;
- the learner selected a method without rationale;
- the learner revised a question after feedback;
- the learner expressed uncertainty about sampling.

### 11.2 Inference

An Inference interprets one or more observations.

Examples:

- developing comparative reasoning;
- limited methodological justification;
- evidence of reflective revision;
- unresolved sampling uncertainty.

### 11.3 Required separation

Every inference must reference its observations and evidence.

The system must support the following trace:

`Observation → Evidence → Interpretation → Learner State → Mentoring Use`

### 11.4 Prohibited inference practices

The system must not:

- infer permanent personality traits;
- infer mental-health conditions;
- infer protected personal characteristics;
- treat writing fluency as equivalent to research capability;
- treat confidence as equivalent to correctness;
- infer capability from activity volume alone;
- conceal uncertainty in the interpretation.

---

## 12. Domain Services

## 12.1 Learner State Interpretation Service

### Purpose

Produces a proposed learner-state interpretation from validated observations and
evidence.

### Responsibilities

- group observations by context;
- identify relevant development dimensions;
- evaluate evidence sufficiency;
- propose capability indicators;
- identify confidence and uncertainty indicators;
- propose strengths and growth opportunities;
- generate an explanation;
- assign interpretation confidence;
- avoid unsupported state changes.

This service proposes state; it does not grant academic approval.

---

## 12.2 Development Transition Evaluation Service

### Purpose

Determines whether evidence supports a transition in Development Level.

### Inputs

- current dimension state;
- proposed new level;
- capability indicators;
- contradictory evidence;
- context;
- applicable policy;
- supervisor input, where required.

### Output

- transition supported;
- transition not supported;
- additional evidence required;
- supervisor review required.

---

## 12.3 Growth Opportunity Identification Service

### Purpose

Transforms evidence of uncertainty, inconsistency, or underdeveloped capability
into a specific and actionable educational opportunity.

### Constraints

A Growth Opportunity must:

- identify the relevant dimension;
- reference evidence;
- explain educational significance;
- avoid personal judgement;
- be capable of informing mentoring;
- include a review condition.

---

## 12.4 Learner State Explanation Service

### Purpose

Produces a human-understandable explanation of a learner-state interpretation.

### Explanation components

- what was observed;
- what evidence was considered;
- what was inferred;
- how confident the interpretation is;
- what limitations apply;
- what changed from the previous state;
- how the state may affect mentoring;
- whether supervisor confirmation exists.

---

## 13. Domain Policies

## 13.1 Evidence Sufficiency Policy

Determines whether evidence is adequate for a material development inference.

The policy should consider:

- relevance;
- quality;
- recency;
- repetition;
- contextual fit;
- source diversity;
- contradictory evidence;
- transfer across tasks.

---

## 13.2 Development Level Transition Policy

Defines the minimum requirements for changing a Development Level.

Material transitions may require supervisor review depending on institutional
configuration or educational significance.

---

## 13.3 Supervisor Review Policy

Supervisor review is required when:

- a state may affect formal progression;
- evidence is contradictory;
- interpretation confidence is low;
- a downward transition is proposed;
- an immediate-review growth opportunity is identified;
- the learner disputes a material inference;
- institutional rules require review.

---

## 13.4 State Freshness Policy

A learner state must be reviewed when:

- significant new evidence appears;
- the research stage changes;
- a major research decision is revised;
- the current state exceeds its configured review period;
- a supervisor requests reassessment;
- the learner challenges the interpretation.

---

## 13.5 Non-Labelling Policy

All learner-state terminology must describe contextual educational conditions,
not permanent identity.

The system must prefer:

- “requires guidance in methodology justification”

over:

- “weak at methodology.”

---

## 13.6 Learner Challenge Policy

A learner may challenge:

- an observation;
- an inference;
- a capability indicator;
- a growth opportunity;
- a development-level interpretation.

A challenge must:

- be recorded;
- preserve the original state;
- allow supporting learner evidence;
- trigger review;
- record the outcome and rationale.

---

## 14. Commands

Initial domain commands include:

- Create Learner Development Record
- Record Learner State Observation
- Propose Development Assessment
- Evaluate Evidence Sufficiency
- Propose Learner State
- Accept System-Inferred Learner State
- Acknowledge Learner State
- Challenge Learner State
- Request Supervisor Development Review
- Confirm Learner State
- Qualify Learner State
- Revise Learner State
- Record Capability Indicator
- Record Uncertainty Indicator
- Identify Strength
- Identify Growth Opportunity
- Prioritise Growth Opportunity
- Record Cognitive Pathway Observation
- Evaluate Development Transition
- Supersede Learner State

Commands express intent and do not guarantee success.

---

## 15. Domain Events

Initial domain events include:

- LearnerDevelopmentRecordCreated
- LearnerStateObservationRecorded
- DevelopmentAssessmentProposed
- EvidenceSufficiencyEvaluated
- LearnerStateProposed
- LearnerStateAcceptedAsSystemInference
- LearnerStateAcknowledged
- LearnerStateChallenged
- SupervisorDevelopmentReviewRequested
- LearnerStateConfirmed
- LearnerStateQualified
- LearnerStateRevised
- LearnerStateSuperseded
- CapabilityIndicatorRecorded
- ConfidenceIndicatorRecorded
- UncertaintyIndicatorRecorded
- StrengthIdentified
- GrowthOpportunityIdentified
- GrowthOpportunityPrioritised
- GrowthOpportunityResolved
- CognitivePathwayObserved
- DevelopmentLevelTransitionSupported
- DevelopmentLevelTransitionRejected
- AdditionalDevelopmentEvidenceRequested

---

## 16. Aggregate Invariants

The Learner Development Record must enforce:

1. Every Learner State belongs to one Learner Development Record.
2. Every Learner State has a defined Development Context.
3. Every material inference references supporting observations or evidence.
4. Observation and inference records remain distinguishable.
5. Only one current authoritative state exists for the same learner and exact
   Development Context.
6. Prior states are retained when a new state becomes current.
7. A Development Level cannot change without a recorded rationale.
8. Confidence alone cannot establish capability.
9. Activity completion alone cannot establish development.
10. Growth Opportunities must be specific, evidence-linked, and educationally
    actionable.
11. System inference cannot be represented as supervisor confirmation.
12. Supervisor override must preserve the original state and recommendation.
13. Learner challenges must remain traceable.
14. No state may contain clinical or personality diagnosis.
15. Personalisation must not reduce academic standards.
16. The learner must not be reduced to one overall development score.
17. Historical records must not be silently edited or deleted.
18. Every state transition must identify actor, time, rationale, and provenance.

---

## 17. Authority Model

### BRM may:

- record observations;
- propose interpretations;
- identify possible strengths and growth opportunities;
- suggest development transitions;
- explain its rationale;
- recommend supervisor review;
- use accepted learner state for adaptive mentoring.

### Learner may:

- provide reflections and evidence;
- acknowledge a state;
- challenge a state;
- accept or reject suggested growth priorities;
- demonstrate development through action.

### Supervisor may:

- confirm;
- qualify;
- revise;
- reject;
- request further evidence;
- override a system inference;
- determine academic significance within delegated authority.

### Institution may:

- define formal development criteria;
- configure review requirements;
- define progression consequences;
- retain formal assessment authority;
- audit compliance with governance rules.

---

## 18. Cross-Context Interfaces

The Learner Development Context interacts with other bounded contexts through
explicit contracts.

### 18.1 Research Design Context

Receives:

- research-stage changes;
- research-decision evidence;
- coherence issues;
- construct revisions.

Provides:

- learner-state summaries relevant to research design;
- growth opportunities affecting research decisions.

### 18.2 Mentoring Context

Provides:

- current learner state;
- strengths;
- growth opportunities;
- uncertainty indicators;
- cognitive pathway observations.

Receives:

- mentoring outcomes;
- learner responses;
- intervention evaluations.

### 18.3 Supervision Context

Provides:

- review requests;
- state explanations;
- disputed interpretations.

Receives:

- confirmations;
- qualifications;
- revisions;
- overrides;
- escalation decisions.

### 18.4 Knowledge and Evidence Context

Receives:

- evidence references;
- provenance records;
- validated source relationships.

Provides:

- claims and evidence used in development interpretation.

### 18.5 Progress and Insight Context

Provides read-only events and projections for:

- educational progress;
- dimension-level changes;
- unresolved growth opportunities;
- review status.

The Progress and Insight Context must not modify authoritative learner-state
records.

---

## 19. Privacy and Ethical Constraints

Learner-development records are sensitive educational records.

The domain must support:

- least-privilege access;
- purpose limitation;
- provenance;
- correction and challenge;
- retention rules;
- context-sensitive visibility;
- audit of access and changes;
- separation from unrelated personal profiling.

The domain must not use learner-development data for undisclosed commercial,
employment, disciplinary, or surveillance purposes.

---

## 20. Reporting Rules

Permitted reporting includes:

- dimension-specific development history;
- evidence-linked strengths;
- active growth opportunities;
- learner-state review status;
- confirmed versus inferred states;
- educational progress over time;
- unresolved uncertainty requiring mentoring.

Reporting must avoid:

- unsupported rankings;
- permanent labels;
- opaque composite scores;
- comparison across learners without governance approval;
- presenting system inference as formal assessment.

---

## 21. Example Domain Scenario

### Scenario

A learner proposes a research topic but cannot explain why it is a researchable
problem.

### Observations

- topic stated clearly;
- practical interest explained;
- no evidence-supported problem statement;
- learner asks whether topic novelty alone is sufficient.

### Possible interpretation

- Research Understanding: Emerging
- Research Judgement: Guided
- Confidence: Moderate
- Uncertainty: conceptual and evidential
- Strength: ability to articulate practical interest
- Growth Opportunity: distinguish topic, problem, and research gap

### Resulting domain actions

1. Record observations.
2. Propose Development Assessment.
3. Evaluate evidence sufficiency.
4. Propose Learner State.
5. Identify Growth Opportunity.
6. Publish GrowthOpportunityIdentified.
7. Supply state to Mentoring Context.
8. Mentoring Context selects a suitable intervention.
9. New learner response becomes additional evidence.
10. Learner State is later revised or superseded.

---

## 22. Validation Questions

Reviewers should confirm:

1. Does the model preserve the educational meaning of learner state?
2. Are contextual variation and development over time represented?
3. Are observation, inference, confirmation, and approval clearly separated?
4. Can the model support adaptive mentoring without permanent labelling?
5. Are learner challenge and supervisor override adequately governed?
6. Are capability, confidence, uncertainty, strengths, and growth opportunities
   distinct?
7. Are transitions evidence-based rather than activity-based?
8. Can implementation remain explainable and auditable?
9. Are privacy and ethical constraints treated as domain concerns?
10. Does the model avoid reducing development to a single score?

---

## 23. Acceptance Criteria

BRMF-203 may progress from Draft to Approved when:

- the Learner Development Record aggregate boundary is accepted;
- entity and value-object definitions are accepted;
- learner-state structure and lifecycle are accepted;
- development-level transition rules are accepted;
- observation and inference separation is accepted;
- authority boundaries are accepted;
- commands, events, policies, and invariants are accepted;
- cross-context interfaces are suitable for later context mapping;
- no contradiction with BRMF-101–110 remains unresolved.

---

## 24. Next Specification

The next recommended document is:

**BRMF-204 — Research Project and Construct Domain Model**

It will define the Research Project aggregate, research constructs, research
decisions, coherence relationships, lifecycle, policies, events, and authority
boundaries.

---

**End of BRMF-203**
