# BRMF-205 — Research Decision and Scholarly Reasoning Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-201, BRMF-202, BRMF-203, BRMF-204  
**Prepares:** BRMF-206, BRMF-207, BRMF-208, BRMF-209, BRMF-210, BRMF-211

---

## 1. Purpose

This document defines the domain model for Research Decisions and Scholarly
Reasoning within the Business Research Mentor (BRM).

It establishes the Research Decision as a first-class governed scholarly
aggregate rather than an incidental note, recommendation, form response, or
hidden system output.

The model governs:

- decision identity and scope;
- decision questions;
- decision context;
- alternatives;
- evidence references;
- assumptions;
- constraints;
- evaluation criteria;
- option evaluations;
- reasoning records;
- uncertainty;
- recommendations;
- selections;
- justifications;
- learner acceptance;
- supervisor review;
- institutional confirmation where required;
- revision;
- supersession;
- decision quality;
- reasoning-pattern observations;
- traceability and provenance.

This specification defines how BRM supports research decision-making without
replacing learner judgement, supervisor authority, or institutional governance.

---

## 2. Constitutional Role in BRM

BRM exists to improve scholarly thinking and decision-making.

It is not a dissertation generator.

The Research Decision model therefore serves as a constitutional specification
for BRM's intelligent capabilities.

Every recommendation, prompt, intervention, coherence finding, or analytical
insight that materially influences a research choice should be capable of being
represented as, linked to, or explained through a governed Research Decision.

The domain must preserve a clear distinction among:

- evidence;
- interpretation;
- evaluation;
- recommendation;
- learner choice;
- supervisor judgement;
- institutional decision.

These are related but are never interchangeable.

---

## 3. Core Principle

A research project is an evolving network of scholarly decisions.

The dissertation, thesis, report, article, model, or presentation is an
expression of those decisions.

BRM must therefore preserve not only what was selected, but also:

- what question required a decision;
- which alternatives were considered;
- which evidence was examined;
- which assumptions were made;
- which constraints limited the feasible space;
- how alternatives were evaluated;
- what uncertainty remained;
- why one option was preferred;
- who accepted or confirmed it;
- what changed later;
- why it was revised or superseded.

A final choice without its reasoning history is an incomplete scholarly record.

---

## 4. Bounded Context

### 4.1 Context name

**Research Decision and Scholarly Reasoning Context**

### 4.2 Context responsibilities

The context owns:

- Research Decision identity;
- Decision Question;
- Decision Context;
- Decision Type;
- Alternative;
- Evaluation Criterion;
- Alternative Evaluation;
- Reasoning Record;
- Uncertainty Record;
- Recommendation;
- Selection;
- Justification;
- Decision Review;
- Decision Revision;
- Decision Supersession;
- Decision Quality Assessment;
- Reasoning Pattern Observation;
- Decision Provenance.

### 4.3 Responsibilities excluded

The context does not own:

- Research Project identity;
- detailed Construct or Variable semantics;
- source-document content;
- Evidence Item content;
- Learner Development Record;
- mentoring-session ownership;
- supervisor identity;
- institutional policy;
- formal ethics decisions;
- final academic examination outcomes;
- generated dissertation text.

---

## 5. Aggregate Root: Research Decision

### 5.1 Identity

`ResearchDecisionId`

### 5.2 Aggregate responsibilities

The Research Decision aggregate must:

- answer one clearly defined Decision Question;
- maintain a governed set of alternatives;
- associate evidence, assumptions, and constraints;
- preserve evaluation criteria;
- record alternative evaluations;
- preserve reasoning as explicit scholarly records;
- distinguish system recommendations from human choices;
- represent remaining uncertainty;
- manage decision lifecycle transitions;
- preserve learner acceptance and supervisor review separately;
- maintain revision and supersession history;
- enforce decision invariants;
- publish domain events;
- remain explainable without hidden AI reasoning.

### 5.3 Aggregate boundary

The aggregate directly controls:

- Decision Profile;
- Decision Question;
- Decision Context;
- Alternative Set;
- Evaluation Criterion Set;
- Alternative Evaluation;
- Decision Assumption;
- Decision Constraint;
- Reasoning Record;
- Uncertainty Record;
- Recommendation;
- Selection;
- Justification;
- Decision Review;
- Decision Quality Assessment;
- Decision Revision Record;
- Supersession Record;
- Decision Provenance Record.

The aggregate references, but does not own:

- Research Project;
- Learner;
- Supervisor;
- Institution;
- Research Question;
- Research Objective;
- Research Problem;
- Research Gap;
- Construct;
- Variable;
- Theory;
- Methodology;
- Evidence Item;
- Mentoring Episode;
- Project Review;
- Institutional Progression Decision.

---

## 6. Governed Scholarly Object Conformance

A Research Decision conforms to the Governed Scholarly Object pattern defined
in BRMF-204.

It must support:

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

The pattern is conceptual and must not force implementation inheritance.

---

## 7. Decision Profile

The Decision Profile identifies the decision and its project context.

### Attributes

- Research Decision Id;
- Research Project Id;
- Decision Type;
- Decision Title;
- Decision Question Id;
- Responsible Learner Id;
- Primary Reviewer Id, optional;
- Institutional Context, optional;
- Related Project Element References;
- Current Decision Status;
- Decision Priority;
- Created At;
- Created By;
- Last Updated At;
- Provenance.

### Decision priority

- Low;
- Normal;
- High;
- Critical.

Priority represents urgency or consequence, not intellectual importance alone.

---

## 8. Decision Types

The foundational taxonomy includes:

### 8.1 Research initiation decisions

- Topic Selection;
- Topic Refinement;
- Problem Definition;
- Gap Identification;
- Scope Definition;
- Purpose Definition;
- Significance Framing.

### 8.2 Conceptual decisions

- Theory Selection;
- Concept Definition;
- Construct Selection;
- Construct Definition;
- Variable Definition;
- Relationship Definition;
- Proposition Definition;
- Hypothesis Definition;
- Conceptual Framework Design;
- Theoretical Framework Design.

### 8.3 Methodological decisions

- Research Paradigm;
- Research Approach;
- Methodology Selection;
- Method Selection;
- Research Design;
- Population Definition;
- Sampling Strategy;
- Sample Size;
- Instrument Selection;
- Instrument Development;
- Measurement;
- Data Source;
- Data Collection Procedure;
- Analysis Technique;
- Validity Strategy;
- Reliability Strategy;
- Trustworthiness Strategy;
- Ethics Strategy.

### 8.4 Interpretation decisions

- Finding Interpretation;
- Explanation Selection;
- Theory Integration;
- Practical Implication;
- Theoretical Implication;
- Policy Implication;
- Limitation Identification;
- Boundary Condition;
- Conclusion Formation;
- Future Research Direction.

### 8.5 Governance decisions

- Milestone Readiness;
- Revision Priority;
- Evidence Sufficiency;
- Escalation;
- Supervisor Recommendation Response;
- Project Stage Transition;
- Risk Acceptance.

### 8.6 Extension rule

New decision types may be registered through governed configuration.

A new type must define:

- semantic meaning;
- allowed contexts;
- expected alternatives;
- required evidence classes;
- applicable quality dimensions;
- authority requirements;
- lifecycle variations, if any.

---

## 9. Decision Question

Every Research Decision answers exactly one Decision Question.

### Attributes

- Decision Question Id;
- Question Text;
- Question Type;
- Decision Scope;
- Trigger;
- Related Project Elements;
- Required Outcome;
- Required Authority;
- Due Date, optional;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Question types

- Selection;
- Definition;
- Inclusion;
- Exclusion;
- Prioritisation;
- Comparison;
- Evaluation;
- Sequencing;
- Revision;
- Acceptance;
- Rejection;
- Escalation;
- Sufficiency;
- Readiness.

### Rules

A Decision Question must:

- identify one material choice;
- be answerable through a decision process;
- avoid embedding the preferred answer;
- define the relevant scope;
- identify any formal authority requirement;
- remain distinguishable from a research question.

A Research Question seeks knowledge.

A Decision Question seeks a governed choice.

---

## 10. Decision Context

Decision Context defines the conditions under which the decision is made.

### Attributes

- Decision Context Id;
- Current Project Stage;
- Related Problem;
- Related Gap;
- Related Research Questions;
- Related Objectives;
- Scope;
- Known Dependencies;
- Stakeholders;
- Relevant Policies;
- Prior Decisions;
- Open Coherence Findings;
- Time Context;
- Resource Context;
- Context Summary;
- Provenance.

A decision must be interpretable within its context.

A recommendation detached from context must not be represented as generally
valid.

---

## 11. Alternative Set

The Alternative Set contains the feasible options considered for the Decision
Question.

### Alternative attributes

- Alternative Id;
- Label;
- Description;
- Source;
- Eligibility;
- Feasibility;
- Inclusion Rationale;
- Exclusion Rationale, optional;
- Related Evidence References;
- Related Assumptions;
- Related Constraints;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Alternative source

- Learner Proposed;
- Supervisor Proposed;
- System Suggested;
- Literature Derived;
- Institutional Requirement;
- Prior Project;
- External Expert;
- Other.

### Alternative status

- Proposed;
- Eligible;
- Ineligible;
- Under Evaluation;
- Preferred;
- Selected;
- Rejected;
- Withdrawn;
- Superseded.

### Rules

- The aggregate must preserve rejected material alternatives.
- An ineligible option may remain recorded with the reason for ineligibility.
- System-suggested alternatives must be visibly attributed.
- Alternatives must not be fabricated merely to create artificial comparison.
- A selected option must originate from the Alternative Set unless the decision
  is explicitly reopened and the new option is added.

---

## 12. Evidence Reference

The aggregate stores references to evidence governed by the Knowledge, Evidence,
and Provenance Context.

### Attributes

- Evidence Reference Id;
- Evidence Item Id;
- Evidence Role;
- Related Alternative;
- Related Criterion;
- Support Direction;
- Relevance;
- Confidence;
- Interpretation Note;
- Added By;
- Added At;
- Provenance.

### Evidence role

- Supports;
- Challenges;
- Contextualises;
- Defines;
- Compares;
- Establishes Constraint;
- Establishes Requirement;
- Identifies Risk;
- Indicates Uncertainty.

### Support direction

- Positive;
- Negative;
- Mixed;
- Neutral;
- Indeterminate.

The aggregate must not silently convert a source into a conclusion.

The interpretation linking evidence to a decision must remain explicit.

---

## 13. Decision Assumption

A Decision Assumption is a proposition provisionally accepted for the decision
process.

### Attributes

- Decision Assumption Id;
- Statement;
- Assumption Type;
- Basis;
- Related Alternatives;
- Related Criteria;
- Consequence if False;
- Testability;
- Validation Plan;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Assumption status

- Proposed;
- Accepted Provisionally;
- Tested;
- Supported;
- Challenged;
- Rejected;
- Superseded.

Assumptions must remain visible after a decision is selected.

Selection does not transform an assumption into fact.

---

## 14. Decision Constraint

A Decision Constraint limits the feasible decision space.

### Attributes

- Decision Constraint Id;
- Constraint Type;
- Description;
- Source;
- Hard or Soft;
- Severity;
- Related Alternatives;
- Flexibility;
- Negotiability;
- Consequence;
- Status;
- Effective From;
- Superseded At;
- Provenance.

### Constraint classification

- Hard Constraint;
- Soft Constraint.

A hard constraint makes an option infeasible or impermissible.

A soft constraint affects preference, cost, difficulty, timing, or risk but does
not make an option impossible.

### Rules

- Constraints must not be disguised as scholarly evidence.
- A practical constraint must not be represented as proving theoretical
  superiority.
- A decision driven mainly by constraints must state this openly.

---

## 15. Evaluation Criterion

An Evaluation Criterion defines a dimension used to compare alternatives.

### Attributes

- Evaluation Criterion Id;
- Name;
- Definition;
- Criterion Type;
- Weight, optional;
- Mandatory;
- Direction;
- Measurement Approach;
- Evidence Requirement;
- Threshold, optional;
- Added By;
- Provenance.

### Criterion types

- Scholarly;
- Theoretical;
- Methodological;
- Empirical;
- Ethical;
- Practical;
- Feasibility;
- Institutional;
- Educational;
- Risk;
- Coherence;
- Resource;
- Time.

### Direction

- Higher Is Better;
- Lower Is Better;
- Threshold;
- Binary Requirement;
- Qualitative Judgement;
- Non-Directional.

### Weighting rule

Weights may be used to support comparison but must not create false precision.

The system must preserve:

- who assigned the weights;
- why they were assigned;
- whether the learner or supervisor accepted them;
- how sensitive the outcome is to changes in weight.

---

## 16. Alternative Evaluation

An Alternative Evaluation records how one alternative performs against one or
more criteria.

### Attributes

- Alternative Evaluation Id;
- Alternative Id;
- Criterion Id;
- Assessment;
- Score, optional;
- Qualitative Rating, optional;
- Evidence References;
- Reasoning Record References;
- Confidence;
- Evaluated By;
- Evaluated At;
- Review Status;
- Provenance.

### Qualitative ratings

- Strongly Favourable;
- Favourable;
- Mixed;
- Unfavourable;
- Strongly Unfavourable;
- Insufficient Evidence;
- Not Applicable.

A score without explanation is insufficient for a material scholarly decision.

---

## 17. Scholarly Reasoning Record

A Scholarly Reasoning Record captures an explicit, communicable step in the
decision process.

It is not a transcript of private mental activity and must not expose hidden
model chain-of-thought.

### Attributes

- Reasoning Record Id;
- Reasoning Operation;
- Input References;
- Statement;
- Output or Implication;
- Related Alternatives;
- Related Criteria;
- Evidence References;
- Assumption References;
- Constraint References;
- Uncertainty References;
- Actor Type;
- Actor Id, optional;
- Created At;
- Review Status;
- Provenance.

### Reasoning operations

- Observe;
- Clarify;
- Define;
- Distinguish;
- Categorise;
- Compare;
- Contrast;
- Relate;
- Interpret;
- Infer;
- Evaluate;
- Prioritise;
- Eliminate;
- Integrate;
- Generalise;
- Qualify;
- Challenge;
- Reflect;
- Revise;
- Justify;
- Conclude.

### Actor type

- Learner;
- Supervisor;
- System;
- Institution;
- External Reviewer;
- Collaborative.

### Rule

A system-generated reasoning record must contain a concise explanation suitable
for review.

It must not claim to expose private internal model reasoning.

---

## 18. Reasoning Pattern Observation

A Reasoning Pattern Observation identifies an observable pattern across one or
more reasoning records.

### Pattern types

- Exploratory Reasoning;
- Comparative Reasoning;
- Evaluative Reasoning;
- Constraint-Based Reasoning;
- Evidence-Led Reasoning;
- Theory-Led Reasoning;
- Inductive Reasoning;
- Deductive Reasoning;
- Abductive Reasoning;
- Hypothetico-Deductive Reasoning;
- Integrative Reasoning;
- Reflective Reasoning;
- Revision-Oriented Reasoning;
- Elimination Reasoning;
- Satisficing;
- Optimising;
- Sequential Reasoning;
- Iterative Reasoning.

### Attributes

- Pattern Observation Id;
- Pattern Type;
- Supporting Reasoning Records;
- Context;
- Strength;
- Confidence;
- Educational Interpretation;
- Limitations;
- Observed By;
- Observed At;
- Provenance.

A reasoning pattern is an observation about recorded scholarly activity.

It must not be treated as a permanent personal trait.

---

## 19. Uncertainty Record

An Uncertainty Record preserves what remains unknown, contested, unstable, or
dependent on future evidence.

### Attributes

- Uncertainty Record Id;
- Uncertainty Type;
- Statement;
- Source;
- Related Alternatives;
- Related Criteria;
- Impact;
- Likelihood, optional;
- Reducibility;
- Reduction Plan;
- Residual Uncertainty;
- Accepted By;
- Status;
- Provenance.

### Uncertainty types

- Evidence;
- Conceptual;
- Theoretical;
- Methodological;
- Measurement;
- Data;
- Contextual;
- Ethical;
- Predictive;
- Interpretive;
- Implementation;
- Institutional.

### Reducibility

- Reducible Now;
- Reducible Later;
- Partially Reducible;
- Irreducible;
- Unknown.

### Rule

Uncertainty must never be discarded merely because a choice has been made.

---

## 20. Recommendation

A Recommendation is a proposed preferred alternative.

### Attributes

- Recommendation Id;
- Recommended Alternative Id;
- Recommendation Source;
- Supporting Evaluations;
- Supporting Evidence References;
- Reasoning Summary;
- Conditions;
- Qualifications;
- Residual Uncertainty;
- Confidence;
- Generated At;
- Valid Until, optional;
- Status;
- Provenance.

### Recommendation source

- Learner;
- Supervisor;
- System;
- Review Panel;
- Institution;
- Collaborative.

### Recommendation status

- Draft;
- Proposed;
- Reviewed;
- Accepted;
- Rejected;
- Withdrawn;
- Superseded.

A system recommendation is not a decision.

---

## 21. Selection

A Selection records the option chosen by an authorised human actor.

### Attributes

- Selection Id;
- Selected Alternative Id;
- Selected By;
- Selection Authority;
- Selected At;
- Recommendation Followed, optional;
- Conditions;
- Residual Uncertainty Acknowledged;
- Provisional or Final;
- Status;
- Provenance.

### Selection authority

- Learner;
- Supervisor;
- Joint Learner-Supervisor;
- Institution;
- Review Panel;
- Delegated Authority.

### Rules

- The selected alternative must belong to the Alternative Set.
- The system must not be the final selection authority.
- A provisional selection remains reopenable.
- A learner may select against a system recommendation.
- A supervisor or institution may require revision where their authority
  applies.
- Disagreement must remain traceable rather than being overwritten.

---

## 22. Justification

A Justification explains why the selected option is appropriate in context.

### Attributes

- Justification Id;
- Selection Id;
- Justification Statement;
- Alternatives Rejected;
- Evidence References;
- Evaluation References;
- Assumption References;
- Constraint References;
- Reasoning References;
- Residual Uncertainty;
- Limitations;
- Authored By;
- Review Status;
- Provenance.

### Sufficiency rule

A justification is sufficient when it communicates:

- the choice;
- the material alternatives;
- the relevant evidence;
- the decisive criteria;
- the principal constraints;
- the remaining uncertainty;
- the contextual limits of the choice.

Length alone does not determine sufficiency.

---

## 23. Decision Lifecycle

The foundational lifecycle is:

1. Initiated
2. Question Defined
3. Context Established
4. Alternatives Under Development
5. Alternatives Ready
6. Under Evaluation
7. Reasoning Under Development
8. Recommendation Proposed
9. Selection Pending
10. Provisionally Selected
11. Under Review
12. Accepted
13. Confirmed
14. Implemented
15. Revision Required
16. Reopened
17. Superseded
18. Withdrawn
19. Archived

### Lifecycle principles

- The lifecycle may be iterative.
- A decision may return to an earlier state.
- Acceptance and confirmation remain distinct.
- Implementation does not prevent later revision.
- Supersession preserves the full prior decision.
- A recommendation may be withdrawn without deleting the decision.
- Institutional policy may require additional confirmation states.

---

## 24. Decision Review

A Decision Review records a governed evaluation of the decision process or
outcome.

### Attributes

- Decision Review Id;
- Review Type;
- Reviewer;
- Review Scope;
- Reviewed Elements;
- Findings;
- Decision;
- Required Revisions;
- Rationale;
- Review Date;
- Provenance.

### Review types

- Learner Self-Review;
- Supervisor Review;
- Methodological Review;
- Ethical Review;
- Institutional Review;
- Peer Review;
- External Expert Review;
- System Quality Review.

### Review decisions

- Accept;
- Confirm;
- Accept with Qualification;
- Revise;
- Reject;
- Request Evidence;
- Request Alternatives;
- Request Re-evaluation;
- Defer;
- Escalate.

---

## 25. Decision Revision Record

A Decision Revision Record preserves a material change.

### Attributes

- Revision Id;
- Previous Decision Version;
- New Decision Version;
- Changed Elements;
- Change Trigger;
- Change Reason;
- New Evidence References;
- Affected Project Elements;
- Requested By;
- Approved By;
- Effective From;
- Provenance.

### Revision triggers

- new evidence;
- supervisor feedback;
- coherence finding;
- failed assumption;
- changed constraint;
- ethics requirement;
- access failure;
- project scope change;
- construct revision;
- methodology revision;
- unexpected data condition;
- learner reflection;
- institutional requirement.

---

## 26. Supersession Record

A Supersession Record links a prior decision to the decision that replaces it.

### Attributes

- Supersession Record Id;
- Superseded Decision Id;
- Superseding Decision Id;
- Supersession Reason;
- Effective Date;
- Affected Project Elements;
- Authority;
- Provenance.

Supersession does not imply that the earlier decision was irrational.

It may reflect changed evidence, context, constraints, or project direction.

---

## 27. Decision Quality Model

Decision quality is multidimensional.

It must not be represented by one opaque score alone.

### Foundational dimensions

1. Question Clarity
2. Context Adequacy
3. Alternative Coverage
4. Evidence Sufficiency
5. Evidence Quality
6. Assumption Visibility
7. Constraint Recognition
8. Evaluation Transparency
9. Logical Consistency
10. Theoretical Alignment
11. Methodological Suitability
12. Project Coherence
13. Uncertainty Recognition
14. Justification Sufficiency
15. Explainability
16. Authority Compliance
17. Traceability
18. Revision Responsiveness
19. Educational Value
20. Implementation Feasibility

### Decision Quality Assessment attributes

- Assessment Id;
- Decision Version;
- Dimension Assessments;
- Overall Interpretation;
- Critical Weaknesses;
- Strengths;
- Improvement Priorities;
- Assessed By;
- Assessment Method;
- Confidence;
- Limitations;
- Created At;
- Provenance.

### Dimension assessment scale

- Strong;
- Adequate;
- Developing;
- Weak;
- Critical Concern;
- Not Assessable;
- Not Applicable.

### Rules

- No single score may conceal critical weaknesses.
- Formal authority cannot be inferred from a high quality assessment.
- A well-reasoned decision may still produce an uncertain outcome.
- A successful outcome does not retroactively prove the decision process was
  sound.
- A poor outcome does not automatically prove the original process was
  unsound.
- Quality assessments must remain explainable and contestable.

---

## 28. Threshold of Sufficiency

BRM recognises that research decisions are often made under incomplete
information.

A decision may proceed when it reaches a justified threshold of sufficiency.

### Sufficiency conditions

The decision question is sufficiently clear.

The feasible alternatives are sufficiently represented.

Material evidence has been considered.

Critical assumptions and constraints are visible.

The decisive criteria are identified.

Residual uncertainty is acknowledged.

Further analysis is unlikely to materially improve the choice relative to its
cost, delay, or educational value.

Required human authority agrees that the decision may proceed.

### Rule

Sufficiency is not certainty.

It is a governed stopping condition.

---

## 29. Decision Dependencies

A Research Decision may depend on other decisions.

### Dependency types

- Requires;
- Enables;
- Constrains;
- Informs;
- Conflicts With;
- Revises;
- Supersedes;
- Implements;
- Validates;
- Invalidates.

### Rules

- Circular dependencies must be identified.
- A decision must not be marked final while a critical prerequisite decision is
  unresolved unless the dependency is explicitly accepted as provisional.
- A changed upstream decision must trigger impact evaluation for dependent
  decisions.

---

## 30. Decision Coherence

Decision coherence evaluates whether a decision is consistent with the wider
research project.

### Coherence relationships

- Decision to Research Problem;
- Decision to Research Gap;
- Decision to Research Question;
- Decision to Objective;
- Decision to Scope;
- Decision to Theory;
- Decision to Construct;
- Decision to Methodology;
- Decision to Evidence;
- Decision to Ethics;
- Decision to Constraint;
- Decision to Prior Decision;
- Decision to Project Stage.

### Coherence finding severities

- Informational;
- Minor;
- Material;
- Critical;
- Indeterminate.

A coherent decision may still be challenged on evidence or methodology.

Coherence is necessary but not always sufficient.

---

## 31. Commands

Initial domain commands include:

- Create Research Decision
- Define Decision Question
- Establish Decision Context
- Add Alternative
- Update Alternative
- Mark Alternative Ineligible
- Withdraw Alternative
- Add Evidence Reference
- Remove Evidence Reference
- Record Decision Assumption
- Challenge Decision Assumption
- Record Decision Constraint
- Update Decision Constraint
- Add Evaluation Criterion
- Update Evaluation Criterion
- Evaluate Alternative
- Record Scholarly Reasoning
- Record Reasoning Pattern Observation
- Record Uncertainty
- Update Uncertainty
- Propose Recommendation
- Withdraw Recommendation
- Select Alternative
- Record Justification
- Submit Decision for Review
- Record Decision Review
- Accept Decision
- Confirm Decision
- Implement Decision
- Request Decision Revision
- Reopen Decision
- Revise Decision
- Supersede Decision
- Withdraw Decision
- Archive Decision
- Assess Decision Quality
- Reassess Decision Quality
- Evaluate Decision Dependencies
- Evaluate Decision Coherence
- Determine Decision Sufficiency

Commands express intent and may be rejected by domain rules.

---

## 32. Domain Events

Initial domain events include:

- ResearchDecisionCreated
- DecisionQuestionDefined
- DecisionContextEstablished
- AlternativeAdded
- AlternativeUpdated
- AlternativeMarkedIneligible
- AlternativeWithdrawn
- EvidenceReferenceAdded
- EvidenceReferenceRemoved
- DecisionAssumptionRecorded
- DecisionAssumptionChallenged
- DecisionConstraintRecorded
- DecisionConstraintUpdated
- EvaluationCriterionAdded
- EvaluationCriterionUpdated
- AlternativeEvaluated
- ScholarlyReasoningRecorded
- ReasoningPatternObserved
- DecisionUncertaintyRecorded
- DecisionUncertaintyUpdated
- DecisionRecommendationProposed
- DecisionRecommendationWithdrawn
- DecisionAlternativeSelected
- DecisionJustificationRecorded
- DecisionSubmittedForReview
- DecisionReviewRecorded
- ResearchDecisionAccepted
- ResearchDecisionConfirmed
- ResearchDecisionImplemented
- DecisionRevisionRequested
- ResearchDecisionReopened
- ResearchDecisionRevised
- ResearchDecisionSuperseded
- ResearchDecisionWithdrawn
- ResearchDecisionArchived
- DecisionQualityAssessed
- DecisionQualityReassessed
- DecisionDependencyFindingRecorded
- DecisionCoherenceFindingRecorded
- DecisionSufficiencyDetermined

---

## 33. Domain Services

### 33.1 Alternative Discovery Service

Supports the identification of plausible alternatives.

It may use:

- project context;
- prior decisions;
- literature-derived concepts;
- institutional requirements;
- methodological catalogues;
- supervisor suggestions;
- learner proposals.

It must label the source of each suggested alternative.

It must not invent false alternatives merely to appear comprehensive.

---

### 33.2 Evidence Relevance Service

Evaluates whether an Evidence Reference is relevant to:

- the Decision Question;
- an Alternative;
- an Evaluation Criterion;
- an Assumption;
- a Constraint;
- an Uncertainty.

It does not determine scholarly truth.

---

### 33.3 Alternative Evaluation Service

Supports transparent comparison across criteria.

Outputs may include:

- qualitative assessments;
- scores where appropriate;
- sensitivity observations;
- missing evidence;
- critical weaknesses;
- trade-offs;
- non-comparable dimensions.

---

### 33.4 Decision Recommendation Service

Produces an explainable recommendation.

The service must provide:

- recommended alternative;
- decisive criteria;
- supporting evidence;
- major assumptions;
- operative constraints;
- residual uncertainty;
- conditions;
- confidence;
- limitations.

It must not present its recommendation as a human decision.

---

### 33.5 Decision Quality Assessment Service

Evaluates the quality dimensions defined in this specification.

It must:

- preserve dimension-level results;
- identify critical weaknesses;
- avoid false precision;
- support contestation;
- explain the basis of every assessment.

---

### 33.6 Decision Sufficiency Service

Determines whether the decision has reached a justified stopping point.

Possible outputs:

- Insufficient;
- Developing;
- Sufficient for Provisional Selection;
- Sufficient for Review;
- Sufficient for Acceptance;
- Additional Evidence Required;
- Additional Alternative Required;
- Supervisor Judgement Required;
- Institutional Decision Required.

---

### 33.7 Decision Dependency and Impact Service

Evaluates:

- prerequisite decisions;
- downstream decisions;
- affected project elements;
- possible contradictions;
- revisions required after an upstream change.

---

### 33.8 Reasoning Pattern Observation Service

Identifies observable reasoning patterns from explicit records.

It must not infer permanent traits.

It may inform:

- learner reflection;
- mentoring intervention;
- supervisor review;
- educational analytics.

---

## 34. Domain Policies

### 34.1 Decision Creation Policy

A Research Decision may be created when:

- a valid project reference exists;
- a material Decision Question exists or is being formulated;
- the creator has authority;
- provenance is recorded.

---

### 34.2 Alternative Adequacy Policy

A decision should not proceed to final selection unless:

- feasible alternatives have been considered;
- a single-option decision is justified;
- excluded material alternatives retain exclusion rationale;
- institutional requirements are represented where applicable.

---

### 34.3 Evidence Transparency Policy

Material recommendations and selections must retain references to supporting and
challenging evidence.

Contradictory evidence must not be silently omitted.

---

### 34.4 Human Authority Policy

BRM may recommend, evaluate, challenge, and explain.

BRM must not:

- impersonate learner acceptance;
- impersonate supervisor confirmation;
- impersonate institutional approval;
- convert a system inference into a formal decision.

---

### 34.5 Uncertainty Preservation Policy

Residual uncertainty must remain visible through acceptance, confirmation, and
implementation.

---

### 34.6 Revision Policy

A material revision must:

- preserve the prior version;
- identify the trigger;
- identify changed elements;
- record new evidence or constraints;
- evaluate downstream impact;
- request review where required.

---

### 34.7 Supersession Policy

A superseded decision must remain retrievable and linked to its replacement.

---

### 34.8 Explainability Policy

Every system-generated recommendation or assessment must provide a concise,
reviewable explanation based on explicit records.

Hidden chain-of-thought is neither required nor appropriate.

---

### 34.9 Educational Agency Policy

The learner must be able to:

- inspect alternatives;
- inspect evidence;
- challenge assumptions;
- reject system recommendations;
- provide personal reasoning;
- request supervisor input;
- reflect on the final choice.

---

### 34.10 Disagreement Policy

Disagreement among learner, supervisor, system, and institution must be
recorded as distinct positions.

The system must not collapse disagreement into a false consensus.

---

## 35. Aggregate Invariants

The Research Decision aggregate must enforce:

1. Every Research Decision has one stable Research Decision Id.
2. Every Research Decision answers exactly one current Decision Question.
3. Every selected option belongs to the Alternative Set.
4. Every system recommendation is distinguishable from human selection.
5. Every human selection records authority and provenance.
6. Material alternatives are not silently deleted.
7. Rejected alternatives preserve rejection rationale.
8. Material recommendations reference evidence or explicitly state evidence
   insufficiency.
9. Evidence is distinguishable from interpretation.
10. Assumptions remain distinguishable from established facts.
11. Constraints remain distinguishable from scholarly justification.
12. Residual uncertainty remains visible after selection.
13. Acceptance, confirmation, and implementation remain distinct.
14. Formal institutional approval cannot be inferred from system status.
15. Material revisions preserve prior versions.
16. Superseded decisions remain traceable.
17. Decision quality remains multidimensional.
18. No opaque aggregate score may conceal a critical weakness.
19. Reasoning records contain communicable scholarly explanations, not hidden
   private model reasoning.
20. A learner may reject a system recommendation.
21. Disagreement remains traceable.
22. Every state transition records actor, time, rationale, and provenance.
23. Critical dependencies are evaluated before finalisation.
24. Context changes trigger reconsideration when materially relevant.
25. Activity volume does not determine decision quality.
26. A successful outcome does not automatically validate the prior process.
27. A poor outcome does not automatically invalidate a sound process.
28. The aggregate must not own source-document content.
29. The aggregate must not own the Research Project lifecycle.
30. The decision must remain explainable without dependence on inaccessible AI
   reasoning.

---

## 36. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Create Research Decision | ResearchDecisionCreated | Decision Creation Policy | Stable identity and project reference |
| Define Decision Question | DecisionQuestionDefined | Decision Creation Policy | Exactly one current question |
| Add Alternative | AlternativeAdded | Alternative Adequacy Policy | Alternatives preserved and sourced |
| Add Evidence Reference | EvidenceReferenceAdded | Evidence Transparency Policy | Evidence distinct from interpretation |
| Evaluate Alternative | AlternativeEvaluated | Evidence Transparency Policy | Score requires explanation |
| Record Scholarly Reasoning | ScholarlyReasoningRecorded | Explainability Policy | No hidden chain-of-thought claim |
| Propose Recommendation | DecisionRecommendationProposed | Human Authority Policy | Recommendation is not selection |
| Select Alternative | DecisionAlternativeSelected | Human Authority Policy | Selected option belongs to set |
| Record Justification | DecisionJustificationRecorded | Evidence Transparency Policy | Material rationale retained |
| Accept Decision | ResearchDecisionAccepted | Educational Agency Policy | Learner authority recorded |
| Confirm Decision | ResearchDecisionConfirmed | Human Authority Policy | Confirmation authority recorded |
| Revise Decision | ResearchDecisionRevised | Revision Policy | Prior version preserved |
| Supersede Decision | ResearchDecisionSuperseded | Supersession Policy | Replacement linked |
| Assess Decision Quality | DecisionQualityAssessed | Explainability Policy | Multidimensional assessment |
| Determine Sufficiency | DecisionSufficiencyDetermined | Educational Agency Policy | Sufficiency is not certainty |

---

## 37. Authority Model

### 37.1 BRM may

- suggest alternatives;
- identify missing alternatives;
- organise evidence;
- identify contradictions;
- evaluate alternatives;
- identify assumptions and constraints;
- observe reasoning patterns;
- assess decision quality;
- evaluate coherence;
- evaluate sufficiency;
- recommend an option;
- explain its recommendation;
- identify uncertainty;
- request review.

### 37.2 BRM may not

- accept a decision for the learner;
- confirm a decision for the supervisor;
- grant institutional approval;
- conceal uncertainty;
- fabricate evidence;
- convert convenience into scholarly superiority;
- present generated wording as learner reasoning without provenance;
- expose or claim private hidden model reasoning.

### 37.3 Learner may

- formulate the Decision Question;
- propose alternatives;
- add evidence;
- challenge evidence;
- record reasoning;
- define priorities;
- accept or reject recommendations;
- make selections within learner authority;
- request review;
- revise decisions;
- reflect on decision quality.

### 37.4 Supervisor may

- propose alternatives;
- challenge assumptions;
- require additional evidence;
- review reasoning;
- qualify recommendations;
- confirm or reject decisions within delegated authority;
- require revision;
- identify coherence concerns;
- escalate institutional matters.

### 37.5 Institution may

- define mandatory criteria;
- define formal authority;
- impose hard constraints;
- require approvals;
- confirm progression decisions;
- determine ethics or examination outcomes;
- audit provenance and compliance.

---

## 38. Cross-Context Interfaces

### 38.1 Research Project Context

Provides:

- project stage;
- project scope;
- problem;
- gap;
- questions;
- objectives;
- constraints;
- coherence findings;
- related project elements.

Receives:

- selected option;
- decision status;
- revision impact;
- related decision references;
- implementation consequences.

---

### 38.2 Learner Development Context

Provides:

- learner-state summaries;
- development dimensions;
- observed strengths;
- growth opportunities;
- confidence and uncertainty indicators.

Receives:

- reasoning-pattern observations;
- decision-quality observations;
- reflection evidence;
- learner responses;
- decision outcomes.

Decision performance must not be converted directly into a permanent learner
trait.

---

### 38.3 Construct and Theory Context

Provides:

- theories;
- constructs;
- variables;
- relationships;
- frameworks;
- conceptual definitions.

Receives:

- theory-selection decisions;
- construct-selection decisions;
- variable-definition decisions;
- framework-design decisions.

---

### 38.4 Knowledge, Evidence, and Provenance Context

Provides:

- Evidence Items;
- source quality;
- claims;
- contradictions;
- provenance;
- evidence relationships.

Receives:

- evidence requirements;
- evidence interpretations;
- decision support roles;
- unresolved evidence needs.

---

### 38.5 Mentoring Interaction Context

Provides:

- intervention recommendations;
- prompts;
- reflection activities;
- mentoring outcomes.

Receives:

- stalled decisions;
- weak reasoning dimensions;
- excessive uncertainty;
- missing alternatives;
- unexamined assumptions;
- learner-supervisor disagreement.

---

### 38.6 Supervision and Governance Context

Provides:

- review authority;
- supervisor decisions;
- institutional decisions;
- policy requirements;
- escalation outcomes.

Receives:

- review requests;
- decision dossiers;
- quality assessments;
- unresolved disagreement;
- decisions requiring confirmation.

---

### 38.7 Analytics and Insight Context

Receives:

- lifecycle durations;
- revision patterns;
- reasoning patterns;
- quality dimensions;
- review outcomes;
- unresolved uncertainty;
- decision dependencies.

Analytics must preserve context and must not rank learners through opaque
decision scores.

---

## 39. Privacy and Academic Integrity

The decision record may contain sensitive intellectual development data.

The domain must support:

- role-based visibility;
- learner access to their own decision record;
- provenance for generated suggestions;
- distinction between learner-authored and AI-generated reasoning;
- controlled supervisor access;
- institutional access limited to legitimate authority;
- retention and deletion policies;
- export of decision history;
- correction and contestation;
- protection against using reasoning records as covert surveillance.

BRM must not generate a false record suggesting that a learner performed
reasoning they did not perform.

---

## 40. Reporting Rules

Decision reports may include:

- Decision Question;
- Context;
- Alternatives;
- Evidence Map;
- Assumptions;
- Constraints;
- Criteria;
- Alternative Evaluations;
- Reasoning Summary;
- Recommendation;
- Selection;
- Justification;
- Residual Uncertainty;
- Review History;
- Revision History;
- Quality Assessment;
- Provenance.

Reports must clearly distinguish:

- system-generated content;
- learner-authored content;
- supervisor-authored content;
- institutional decisions;
- inferred observations;
- confirmed facts.

---

## 41. Example Domain Scenario

### Scenario

A learner must decide whether to use a cross-sectional survey or a longitudinal
design to study employee engagement and turnover intention.

### Decision Question

Which research design is most appropriate and feasible for the accepted
Research Questions?

### Alternatives

- Cross-sectional survey;
- Longitudinal panel design;
- Sequential mixed-method design.

### Evidence

- theory requires attention to temporal ordering;
- prior literature commonly uses cross-sectional designs;
- access to participating firms is limited;
- project duration is twelve months;
- expected attrition threatens longitudinal feasibility.

### Assumptions

- participating firms will permit at least one data collection wave;
- retrospective responses can provide limited temporal context;
- the learner can access suitable analysis support.

### Constraints

- twelve-month completion period;
- limited budget;
- uncertain participant retention;
- ethics approval lead time.

### Evaluation criteria

- alignment with Research Questions;
- temporal validity;
- feasibility;
- ethical burden;
- sample retention risk;
- analytical complexity;
- educational value.

### Reasoning

The longitudinal option has stronger temporal alignment but creates material
access and attrition risks.

The cross-sectional option is feasible but limits causal and temporal claims.

The mixed-method option may improve interpretation but does not fully solve
temporal ordering and increases workload.

### Recommendation

Use a cross-sectional survey with explicitly limited claims, supported by a
carefully justified temporal interpretation strategy.

### Selection

The learner provisionally selects the cross-sectional option.

### Review

The supervisor accepts with qualification and requires:

- revised wording of the Research Questions;
- removal of causal language;
- explicit limitation;
- stronger theoretical justification.

### Outcome

The decision is revised, confirmed, implemented, and linked to the Research
Project and Methodology decisions.

---

## 42. Validation Questions

Reviewers should confirm:

1. Is Research Decision correctly modelled as a first-class aggregate?
2. Is the Decision Question distinct from a Research Question?
3. Are alternatives preserved and source-attributed?
4. Are evidence, interpretation, assumption, and constraint distinct?
5. Is recommendation separate from selection?
6. Are learner acceptance, supervisor confirmation, and institutional approval
   distinct?
7. Is uncertainty preserved after selection?
8. Is decision quality multidimensional and explainable?
9. Are reasoning records communicable without claiming hidden chain-of-thought?
10. Can the complete decision history be reconstructed?
11. Can downstream impact be evaluated after revision?
12. Does the model support disagreement without false consensus?
13. Does the model preserve learner agency?
14. Does it protect supervisor and institutional authority?
15. Can it support multiple research paradigms and methods?
16. Does the model avoid equating decision outcomes with decision-process
    quality?
17. Is the threshold of sufficiency governed rather than arbitrary?
18. Are privacy and academic-integrity safeguards adequate?
19. Are cross-context boundaries sufficiently clear?
20. Does the model provide a stable foundation for BRMF-206 and later
    specifications?

---

## 43. Acceptance Criteria

BRMF-205 may progress from Draft to Approved when:

- the Research Decision aggregate boundary is accepted;
- the Decision Question model is accepted;
- the Alternative, Evidence Reference, Assumption, Constraint, and Criterion
  models are accepted;
- the Scholarly Reasoning Record model is accepted;
- the distinction between recommendation and human selection is accepted;
- uncertainty and sufficiency models are accepted;
- lifecycle, review, revision, and supersession rules are accepted;
- the Decision Quality Model is accepted;
- authority boundaries are accepted;
- commands, events, services, policies, and invariants are accepted;
- privacy and academic-integrity safeguards are accepted;
- cross-context interfaces are suitable for BRMF-206 through BRMF-211;
- no unresolved contradiction with BRMF-201 through BRMF-204 remains.

---

## 44. Next Specification

The next recommended document is:

**BRMF-206 — Research Constructs, Variables, and Theoretical Models Domain
Model**

It will define:

- Theory;
- Concept;
- Construct;
- Variable;
- Dimension;
- Indicator;
- Relationship;
- Proposition;
- Hypothesis;
- Conceptual Framework;
- Theoretical Framework;
- Operationalisation;
- measurement relationships;
- construct provenance;
- framework coherence;
- paradigm-sensitive modelling rules.

---

**End of BRMF-205**
