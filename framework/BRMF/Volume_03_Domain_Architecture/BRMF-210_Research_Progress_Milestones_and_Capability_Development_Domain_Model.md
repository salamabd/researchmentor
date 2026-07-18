# BRMF-210 — Research Progress, Milestones, and Capability Development Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-110, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207, BRMF-208, BRMF-209  
**Prepares:** BRMF-211

---

## 1. Purpose

This document defines the domain model for research journeys, research stages,
capabilities, capability dimensions, capability profiles, progress evidence,
readiness, milestones, transitions, blockers, delays, dependencies, recovery
plans, maturity, progression, completion, and program-level visibility within
the Business Research Mentor (BRM).

It establishes the Readiness Engine, Research Maturity Engine, and Capability
Graph as first-class platform capabilities.

The model ensures that BRM distinguishes:

- activity from progress;
- progress from capability;
- capability from readiness;
- readiness from formal approval;
- milestone completion from genuine development;
- document production from researcher formation.

---

## 2. Core Principle

Research progress is developmental, not merely administrative.

The canonical developmental progression is:

Research Journey  
→ Research Stage  
→ Capability Development  
→ Readiness  
→ Milestone  
→ Transition

Milestones are observable checkpoints.

They are not the central educational objective.

The central aggregate is:

`ResearchCapability`

The governing question is:

> How do we know that the learner is becoming a more capable researcher?

---

## 3. Constitutional Role

BRM exists to support the formation of researchers.

It may:

- identify capability requirements;
- gather progress evidence;
- assess readiness;
- identify blockers;
- recommend recovery actions;
- track development over time;
- surface maturity patterns;
- distinguish completion from competence;
- prepare evidence for supervisors and programs.

It must not:

- equate task completion with learning;
- equate document length with progress;
- claim mastery from one performance;
- reduce maturity to a single opaque score;
- formally progress or fail a learner;
- replace supervisor or institutional judgement;
- treat confidence as competence;
- treat system activity as capability;
- hide contradictory progress evidence.

---

## 4. Bounded Context

### 4.1 Context name

**Research Progress, Milestones, and Capability Development Context**

### 4.2 Responsibilities

The context owns:

- Research Journey;
- Research Stage;
- Stage Requirement;
- Research Capability;
- Capability Dimension;
- Capability Profile;
- Capability Evidence;
- Progress Evidence;
- Progress Assessment;
- Readiness Assessment;
- Milestone;
- Milestone Requirement;
- Transition;
- Blocker;
- Dependency;
- Delay;
- Recovery Plan;
- Maturity Profile;
- Development Trajectory;
- Completion Record;
- Readiness Engine;
- Research Maturity Engine;
- Capability Graph.

### 4.3 Responsibilities excluded

The context does not own:

- learner identity;
- Research Project identity;
- formal academic approval;
- supervision authority;
- evidence-source identity;
- educational intervention lifecycle;
- institutional enrolment;
- payroll or workload management;
- degree conferral;
- examination result ownership.

---

## 5. Aggregate Architecture

BRMF-210 defines the following collaborating aggregate roots:

1. Research Journey
2. Research Stage
3. Research Capability
4. Capability Profile
5. Progress Assessment
6. Readiness Assessment
7. Milestone
8. Blocker
9. Recovery Plan
10. Maturity Profile
11. Capability Graph

The central aggregate is:

`ResearchCapability`

---

## 6. Governed Developmental Object Conformance

Major developmental objects must support, where applicable:

- stable identity;
- explicit lifecycle;
- learner attribution;
- project context;
- evidence;
- provenance;
- review;
- revision;
- contradiction;
- uncertainty;
- temporal history;
- authority boundary;
- domain events.

No developmental claim may be treated as final without evidence and context.

---

## 7. Research Journey Aggregate

### 7.1 Identity

`ResearchJourneyId`

### 7.2 Purpose

A Research Journey represents the learner's complete developmental path through
a research project or program.

### 7.3 Attributes

- Research Journey Id;
- Learner Id;
- Research Project Id;
- Program Id;
- Institution Id;
- Journey Type;
- Start Date;
- Expected End Date;
- Research Stages;
- Current Stage References;
- Capability Requirements;
- Milestones;
- Transitions;
- Blockers;
- Recovery Plans;
- Maturity Profiles;
- Status;
- Provenance.

### 7.4 Journey types

- Honours Research;
- MBA Research Project;
- MSc Dissertation;
- DBA Research;
- PhD Research;
- Research Article;
- Capstone Project;
- Independent Research;
- Industry Research Project.

### 7.5 Status

- Planned;
- Active;
- Paused;
- Delayed;
- Under Recovery;
- Completed;
- Withdrawn;
- Terminated;
- Archived.

### 7.6 Rules

- A journey may include parallel and revisited stages.
- Journey status must not be inferred solely from activity.
- Completion of journey tasks does not prove capability.
- Formal progression remains governed by BRMF-209.

---

## 8. Research Stage Aggregate

### 8.1 Identity

`ResearchStageId`

### 8.2 Purpose

A Research Stage represents a meaningful phase of scholarly work and capability
development.

### 8.3 Stage types

- Orientation;
- Topic Exploration;
- Problem Definition;
- Research Question Development;
- Literature Discovery;
- Literature Evaluation;
- Literature Synthesis;
- Theoretical Framing;
- Construct Definition;
- Conceptual Framework Development;
- Methodology Design;
- Ethics Preparation;
- Data Access;
- Instrument Development;
- Data Collection;
- Data Preparation;
- Quantitative Analysis;
- Qualitative Analysis;
- Mixed-Methods Integration;
- Findings Interpretation;
- Discussion;
- Conclusion;
- Writing and Revision;
- Examination Preparation;
- Publication Preparation;
- Reflection and Transfer.

### 8.4 Attributes

- Research Stage Id;
- Research Journey Id;
- Stage Type;
- Purpose;
- Entry Requirements;
- Capability Requirements;
- Required Decisions;
- Required Evidence;
- Required Reviews;
- Milestones;
- Dependencies;
- Blockers;
- Entry Date;
- Exit Date;
- Status;
- Provenance.

### 8.5 Status

- Not Started;
- Exploring;
- Active;
- Partially Ready;
- Ready for Review;
- Under Review;
- Completed Provisionally;
- Completed;
- Reopened;
- Blocked;
- Paused;
- Superseded.

### 8.6 Rules

- Stage sequence may be non-linear.
- Reopening a stage must preserve history.
- Stage completion does not imply mastery.
- Entry and exit should be evidence based.
- Formal stage approval remains outside BRM authority.

---

## 9. Stage Requirement

A Stage Requirement defines what must be present before entry, completion, or
transition.

### Requirement types

- Knowledge;
- Capability;
- Evidence;
- Decision;
- Review;
- Approval;
- Ethics;
- Data Access;
- Governance;
- Reflection;
- Supervisor Confirmation;
- Institutional Requirement.

### Attributes

- Stage Requirement Id;
- Stage Id;
- Requirement Type;
- Statement;
- Mandatory or Advisory;
- Evidence Standard;
- Authority Required;
- Dependency;
- Status;
- Provenance.

---

## 10. Research Capability Aggregate

### 10.1 Identity

`ResearchCapabilityId`

### 10.2 Purpose

A Research Capability represents a demonstrable capacity to perform a meaningful
research activity with appropriate quality, reasoning, independence, and
integrity.

### 10.3 Capability categories

#### Conceptual

- Conceptual Thinking;
- Problem Framing;
- Concept Differentiation;
- Construct Definition;
- Model Coherence.

#### Theoretical

- Theory Discovery;
- Theory Evaluation;
- Theory Selection;
- Theory Application;
- Theoretical Integration.

#### Evidence

- Literature Search;
- Source Evaluation;
- Evidence Appraisal;
- Contradiction Recognition;
- Evidence Synthesis;
- Citation Verification;
- Provenance Discipline.

#### Analytical

- Critical Evaluation;
- Alternative Explanation;
- Argument Evaluation;
- Bias Awareness;
- Confidence Calibration;
- Decision Justification.

#### Methodological

- Research Design;
- Quantitative Design;
- Qualitative Design;
- Mixed-Methods Design;
- Sampling;
- Measurement;
- Instrument Development;
- Validity Reasoning;
- Reliability Reasoning.

#### Data and Analysis

- Data Management;
- Statistical Reasoning;
- Qualitative Interpretation;
- Model Interpretation;
- Robustness Evaluation;
- Limitation Recognition.

#### Communication

- Academic Writing;
- Scholarly Argument;
- Visual Communication;
- Supervisor Communication;
- Oral Defence;
- Research Presentation.

#### Ethical and Governance

- Research Ethics;
- Academic Integrity;
- Consent Reasoning;
- Privacy Awareness;
- Governance Awareness;
- Responsible AI Use.

#### Metacognitive

- Reflection;
- Self-Explanation;
- Self-Regulation;
- Uncertainty Recognition;
- Help Seeking;
- Transfer Learning;
- Scholarly Independence.

### 10.4 Attributes

- Research Capability Id;
- Capability Name;
- Category;
- Definition;
- Applicable Research Stages;
- Capability Dimensions;
- Evidence Expectations;
- Development Levels;
- Dependencies;
- Related Capabilities;
- Status;
- Provenance.

### 10.5 Rules

- Capabilities are not percentages by definition.
- A capability may develop differently across contexts.
- Capability must be evidenced through performance.
- Confidence alone is not capability.
- One successful performance does not prove stable capability.
- Capability remains distinct from institutional grades.

---

## 11. Capability Dimension

A Capability Dimension represents a meaningful component of a capability.

### Example: Critical Evaluation

- Evidence Appraisal;
- Contradiction Recognition;
- Alternative Explanation;
- Argument Quality;
- Bias Awareness;
- Confidence Calibration.

### Attributes

- Capability Dimension Id;
- Research Capability Id;
- Name;
- Definition;
- Observable Indicators;
- Evidence Requirements;
- Development Levels;
- Dependencies;
- Provenance.

### Rules

- Dimensions must remain interpretable.
- Dimensions must not be arbitrarily combined into one hidden score.
- Different dimensions may develop at different rates.
- Weakness in one dimension must not be concealed by strength in another.

---

## 12. Capability Development Level

Development levels should describe observable independence and quality.

### Levels

1. Not Yet Demonstrated
2. Emerging with Intensive Support
3. Developing with Structured Support
4. Functional with Light Support
5. Independent in Familiar Context
6. Independent Across Contexts
7. Adaptive and Transferable
8. Capable of Critique and Mentoring

### Rules

- Levels require evidence.
- Levels are capability specific.
- Learners may regress temporarily under new complexity.
- Level labels are developmental, not personal judgments.
- Institutional grades must not be inferred directly from levels.

---

## 13. Capability Evidence

Capability Evidence links observed performance to a capability or dimension.

### Attributes

- Capability Evidence Id;
- Learner Id;
- Research Capability Id;
- Capability Dimension Id, optional;
- Evidence Type;
- Evidence Object Reference;
- Context;
- Complexity;
- Support Level;
- Quality;
- Independence;
- Consistency;
- Transfer;
- Assessor;
- Confidence;
- Limitations;
- Timestamp;
- Provenance.

### Evidence types

- Research Decision;
- Learner Explanation;
- Learner Reflection;
- Revised Framework;
- Evidence Dossier;
- Methodology Justification;
- Supervisor Feedback;
- Review Outcome;
- Completed Research Task;
- Oral Defence;
- Problem Resolution;
- Transfer Task;
- Independent Correction;
- Reduced Scaffold Reliance;
- Sustained Performance.

### Rules

- Activity logs alone are not capability evidence.
- AI-generated text cannot automatically evidence learner capability.
- Support level must be recorded.
- Contradictory capability evidence may coexist.
- Evidence quality and context must remain visible.

---

## 14. Capability Profile Aggregate

### 14.1 Identity

`CapabilityProfileId`

### 14.2 Purpose

A Capability Profile represents the learner's multidimensional research
capability state at a defined time.

### 14.3 Attributes

- Capability Profile Id;
- Learner Id;
- Research Journey Id;
- Profile Date;
- Capability Assessments;
- Strengths;
- Development Needs;
- Evidence Coverage;
- Contradictions;
- Confidence;
- Assessor;
- Status;
- Provenance.

### 14.4 Rules

- A profile must not collapse into one overall score.
- Missing evidence must remain distinguishable from weakness.
- Profile comparisons must account for changed context and complexity.
- Learner access and contestation must be supported.
- Profiles must not be used as covert psychological profiling.

---

## 15. Progress Evidence

Progress Evidence represents evidence that the learner or project has advanced
meaningfully.

### Evidence examples

- improved research question;
- stronger decision rationale;
- corrected misconception;
- improved theory fit;
- more coherent framework;
- verified evidence dossier;
- reduced scaffold reliance;
- successful transfer;
- improved supervisor discussion;
- resolved blocker;
- completed governance requirement;
- sustained capability demonstration.

### Attributes

- Progress Evidence Id;
- Research Journey Id;
- Learner Id;
- Evidence Type;
- Target Stage or Capability;
- Before State;
- After State;
- Evidence Reference;
- Significance;
- Sustainability;
- Support Level;
- Verified By;
- Limitations;
- Timestamp;
- Provenance.

### Rules

- Document production is not automatically progress.
- Change must be meaningful relative to a prior state or requirement.
- Progress may be negative, stalled, or contradictory.
- Progress evidence must remain attributable.

---

## 16. Progress Assessment Aggregate

### 16.1 Identity

`ProgressAssessmentId`

### 16.2 Purpose

A Progress Assessment evaluates advancement across project, stage, capability,
governance, and learning dimensions.

### 16.3 Dimensions

- Research Work Progress;
- Capability Development;
- Decision Quality;
- Evidence Quality;
- Readiness;
- Milestone Status;
- Governance Status;
- Supervisor Engagement;
- Blocker Status;
- Recovery Status;
- Independence;
- Reflection;
- Sustainability.

### 16.4 Results

- Meaningful Progress;
- Partial Progress;
- Administrative Progress Only;
- Capability Growth without Milestone Completion;
- Milestone Completion without Sufficient Capability;
- Stalled;
- Regressed;
- Blocked;
- Recovery in Progress;
- Indeterminate.

### 16.5 Rules

- Progress is multidimensional.
- Administrative completion must remain separate from capability growth.
- Formal progression decisions remain governed by BRMF-209.
- Assessment rationale and evidence must be explicit.

---

## 17. Readiness Assessment Aggregate

### 17.1 Identity

`ReadinessAssessmentId`

### 17.2 Purpose

A Readiness Assessment evaluates whether the learner and project are adequately
prepared for a defined next action, stage, review, or milestone.

### 17.3 Readiness dimensions

- Knowledge Readiness;
- Capability Readiness;
- Evidence Readiness;
- Decision Readiness;
- Methodological Readiness;
- Ethical Readiness;
- Governance Readiness;
- Resource Readiness;
- Supervisor Review Readiness;
- Confidence Calibration;
- Reflection Readiness;
- Independence Readiness.

### 17.4 Attributes

- Readiness Assessment Id;
- Learner Id;
- Research Journey Id;
- Target Transition;
- Purpose;
- Required Dimensions;
- Evidence;
- Dimension Assessments;
- Missing Requirements;
- Blockers;
- Conditions;
- Residual Risk;
- Result;
- Rationale;
- Assessor;
- Review Date;
- Provenance.

### 17.5 Results

- Ready;
- Ready with Conditions;
- Provisionally Ready;
- Partially Ready;
- Not Yet Ready;
- Blocked;
- Requires Supervisor Review;
- Requires Governance Approval;
- Indeterminate.

### 17.6 Rules

- Readiness is purpose specific.
- Readiness does not equal formal approval.
- High confidence does not prove readiness.
- One weak critical dimension may prevent transition.
- Missing evidence must not be scored as demonstrated weakness.
- Readiness must remain explainable.

---

## 18. Milestone Aggregate

### 18.1 Identity

`MilestoneId`

### 18.2 Purpose

A Milestone represents an observable checkpoint in a Research Journey.

### 18.3 Milestone types

- Topic Selected;
- Problem Defined;
- Research Questions Agreed;
- Literature Review Completed;
- Theoretical Framework Accepted;
- Constructs Defined;
- Proposal Submitted;
- Proposal Approved;
- Ethics Submitted;
- Ethics Approved;
- Instrument Ready;
- Data Access Secured;
- Data Collection Started;
- Data Collection Completed;
- Analysis Completed;
- Findings Reviewed;
- Draft Submitted;
- Final Submission;
- Examination Completed;
- Revisions Completed;
- Publication Submitted;
- Journey Reflection Completed.

### 18.4 Attributes

- Milestone Id;
- Research Journey Id;
- Stage Id;
- Milestone Type;
- Purpose;
- Requirements;
- Capability Expectations;
- Evidence Requirements;
- Authority Requirements;
- Target Date;
- Actual Date;
- Readiness Assessment;
- Review Outcome;
- Status;
- Provenance.

### 18.5 Status

- Planned;
- Approaching;
- Ready for Review;
- Submitted;
- Under Review;
- Achieved Provisionally;
- Achieved;
- Achieved with Conditions;
- Missed;
- Delayed;
- Reopened;
- Superseded;
- Waived;
- Cancelled.

### 18.6 Rules

- Milestone achievement does not automatically prove capability.
- Capability may develop without milestone completion.
- Formal milestone outcomes require BRMF-209 authority.
- Conditions and waivers must remain visible.
- Reopened milestones preserve prior achievement history.

---

## 19. Milestone Requirement

### Attributes

- Milestone Requirement Id;
- Milestone Id;
- Requirement Type;
- Statement;
- Mandatory or Advisory;
- Evidence Standard;
- Capability Threshold;
- Review Requirement;
- Authority Requirement;
- Dependency;
- Status;
- Provenance.

---

## 20. Transition

A Transition represents movement from one stage or journey state to another.

### Attributes

- Transition Id;
- Research Journey Id;
- From Stage;
- To Stage;
- Trigger;
- Readiness Assessment;
- Milestone References;
- Authority Decision;
- Conditions;
- Transition Date;
- Status;
- Provenance.

### Status

- Proposed;
- Ready;
- Authorised;
- Completed;
- Conditional;
- Deferred;
- Blocked;
- Reversed;
- Superseded.

### Rules

- Transition may require both readiness and formal authority.
- BRM may assess readiness but not grant formal progression.
- Reversal must preserve the original transition.
- Parallel-stage transitions are permitted.

---

## 21. Blocker Aggregate

### 21.1 Identity

`BlockerId`

### 21.2 Purpose

A Blocker represents a condition materially preventing progress, readiness,
capability development, milestone completion, or transition.

### 21.3 Blocker types

- Knowledge Gap;
- Conceptual Confusion;
- Theory Misfit;
- Construct Ambiguity;
- Evidence Insufficiency;
- Methodological Weakness;
- Statistical Difficulty;
- Qualitative Analysis Difficulty;
- Ethics Approval Missing;
- Governance Approval Missing;
- Data Access Failure;
- Recruitment Difficulty;
- Instrument Problem;
- Supervisor Unavailability;
- Conflicting Feedback;
- Low Confidence;
- Poor Confidence Calibration;
- Time Management;
- Resource Constraint;
- Accessibility Barrier;
- Personal Circumstance;
- Technical Failure;
- Academic Integrity Concern;
- Capability Deficiency;
- Dependency Failure.

### 21.4 Attributes

- Blocker Id;
- Research Journey Id;
- Target Stage, Milestone, Capability, or Decision;
- Blocker Type;
- Description;
- Root Cause Hypotheses;
- Evidence;
- Severity;
- Urgency;
- Controllability;
- Dependencies;
- Responsible Actors;
- Required Authority;
- Status;
- Provenance.

### 21.5 Status

- Suspected;
- Confirmed;
- Under Diagnosis;
- Active;
- Mitigated;
- Resolved;
- Accepted Constraint;
- Escalated;
- Superseded;
- Closed.

### 21.6 Rules

- Blocker classification must not become diagnosis of the learner.
- Personal and wellbeing matters require minimal necessary handling.
- Root cause must remain distinguishable from symptom.
- A blocker may affect multiple stages and capabilities.
- BRM must escalate beyond educational scope where appropriate.

---

## 22. Dependency

A Dependency represents something required before another object can progress.

### Dependency types

- Evidence;
- Capability;
- Decision;
- Approval;
- Review;
- Resource;
- Data;
- Access;
- Person;
- Tool;
- Ethics;
- Governance;
- Milestone;
- External Event.

### Rules

- Dependencies must be explicit.
- Circular dependencies must be detected.
- Dependency failure may create a Blocker.
- External dependencies require uncertainty handling.

---

## 23. Delay

A Delay represents divergence from an expected timeline.

### Attributes

- Delay Id;
- Research Journey Id;
- Affected Object;
- Expected Date;
- Revised Date;
- Cause;
- Blocker References;
- Impact;
- Recoverability;
- Governance Requirement;
- Status;
- Provenance.

### Rules

- Delay is not equivalent to poor capability.
- Delay reasons must not be inferred without evidence.
- Sensitive reasons require restricted access.
- Delay trends may trigger support or governance review.

---

## 24. Recovery Plan Aggregate

### 24.1 Identity

`RecoveryPlanId`

### 24.2 Purpose

A Recovery Plan defines a governed response to blockers, delay, insufficient
readiness, stalled capability development, or failed transition.

### 24.3 Canonical recovery flow

Blocker  
→ Diagnosis  
→ Intervention  
→ Capability Development  
→ Evidence  
→ Reassessment  
→ Recovery or Escalation

### 24.4 Attributes

- Recovery Plan Id;
- Research Journey Id;
- Trigger;
- Blockers;
- Root Cause Assessment;
- Recovery Objectives;
- Actions;
- Educational Interventions;
- Supervisor Actions;
- Learner Actions;
- Governance Actions;
- Resources;
- Revised Milestones;
- Review Points;
- Success Evidence;
- Escalation Conditions;
- Status;
- Provenance.

### 24.5 Status

- Proposed;
- Agreed;
- Active;
- Under Review;
- Partially Effective;
- Effective;
- Ineffective;
- Escalated;
- Completed;
- Superseded;
- Closed.

### 24.6 Rules

- Recovery must address root causes where known.
- Recovery is not punishment.
- Plans must preserve learner agency.
- Formal conditions require valid authority.
- Effectiveness must be evaluated using evidence.

---

## 25. Maturity Profile Aggregate

### 25.1 Identity

`MaturityProfileId`

### 25.2 Purpose

A Maturity Profile represents the learner's multidimensional evolution as a
researcher over time.

### 25.3 Maturity dimensions

- Conceptual Maturity;
- Theoretical Maturity;
- Methodological Maturity;
- Analytical Maturity;
- Evidence Evaluation Maturity;
- Critical Reasoning Maturity;
- Reflective Maturity;
- Scholarly Independence;
- Supervisor Interaction Maturity;
- Research Governance Maturity;
- Ethical Reasoning Maturity;
- Responsible AI Use Maturity;
- Communication Maturity;
- Self-Regulation Maturity;
- Transfer Maturity.

### 25.4 Attributes

- Maturity Profile Id;
- Learner Id;
- Research Journey Id;
- Profile Date;
- Dimension Assessments;
- Evidence Coverage;
- Development Trajectory;
- Strengths;
- Development Priorities;
- Contradictions;
- Uncertainty;
- Assessor;
- Status;
- Provenance.

### 25.5 Rules

- Maturity must not be reduced to a single score.
- Maturity is developmental and context sensitive.
- Maturity assessment must use longitudinal evidence.
- Temporary difficulty does not necessarily imply regression.
- Learners must be able to inspect and contest profile interpretations.
- Maturity profiles must not become employment or psychological profiles.

---

## 26. Development Trajectory

A Development Trajectory represents change in a capability or maturity dimension
over time.

### Trajectory states

- Emerging;
- Improving;
- Stable;
- Uneven;
- Plateaued;
- Regressing;
- Transferring;
- Sustained;
- Insufficient Evidence.

### Attributes

- Development Trajectory Id;
- Learner Id;
- Capability or Maturity Dimension;
- Time Window;
- Evidence Points;
- Context Changes;
- Support Changes;
- Trajectory State;
- Confidence;
- Interpretation;
- Provenance.

### Rules

- Trajectory must consider support level and task complexity.
- Sparse data must remain marked as insufficient.
- A single weak event must not define regression.
- Transfer across contexts is stronger evidence than repetition alone.

---

## 27. Completion Record

A Completion Record records completion of a stage, milestone, journey, or
developmental requirement.

### Attributes

- Completion Record Id;
- Completed Object;
- Completion Type;
- Evidence;
- Capability Context;
- Authority Decision;
- Conditions;
- Completion Date;
- Status;
- Provenance.

### Rules

- Completion must remain distinct from capability.
- Administrative and educational completion must be distinguishable.
- Formal completion requires appropriate authority where applicable.
- Completion with conditions must preserve those conditions.

---

## 28. Readiness Engine

The Readiness Engine assesses preparedness for a defined transition or action.

### 28.1 Inputs

- target transition;
- stage requirements;
- capability profile;
- progress evidence;
- decisions;
- evidence dossiers;
- milestone status;
- blocker status;
- governance requirements;
- supervisor review;
- support level;
- residual uncertainty.

### 28.2 Outputs

- readiness result;
- dimension findings;
- missing evidence;
- blocking conditions;
- conditions for readiness;
- residual risk;
- recommended next actions;
- escalation or review requirements;
- rationale;
- provenance.

### 28.3 Responsibilities

The engine must:

- assess readiness multidimensionally;
- distinguish missing evidence from weakness;
- identify critical gating dimensions;
- detect contradictory readiness evidence;
- recognise conditional readiness;
- identify authority requirements;
- prepare explainable readiness reports.

### 28.4 Rules

- The engine does not grant formal progression.
- It must not use one opaque readiness score.
- Readiness is target specific.
- Human review is required for ambiguous high-stakes transitions.
- Institutional policy overrides configurable defaults.

---

## 29. Research Maturity Engine

The Research Maturity Engine evaluates how the learner has evolved as a
researcher over time.

### 29.1 Inputs

- capability evidence;
- capability profiles;
- progress assessments;
- learner reflections;
- research decisions;
- evidence dossiers;
- intervention history;
- supervisor feedback;
- review outcomes;
- support levels;
- transfer evidence;
- provenance.

### 29.2 Outputs

- multidimensional maturity profile;
- development trajectories;
- strengths;
- persistent development needs;
- emerging independence;
- dependency risks;
- transfer findings;
- evidence gaps;
- interpretive rationale;
- uncertainty;
- provenance.

### 29.3 Responsibilities

The engine must:

- use longitudinal evidence;
- distinguish performance from sustained capability;
- account for support and complexity;
- identify transfer;
- detect overdependence on scaffolds or AI;
- identify genuine independence;
- preserve contradiction and uncertainty;
- support learner reflection and supervisor review.

### 29.4 Rules

- No single maturity score.
- Maturity is not personality.
- Maturity is not intelligence.
- Maturity does not determine formal grades.
- AI assistance must not be mistaken for learner capability.
- Sparse or biased evidence must remain visible.
- Human interpretation is required for high-stakes use.

---

## 30. Capability Graph Aggregate

### 30.1 Identity

`CapabilityGraphId`

### 30.2 Purpose

The Capability Graph represents relationships among capabilities, dimensions,
stages, readiness, milestones, progress evidence, interventions, blockers,
decisions, reviews, and transitions.

### 30.3 Node types

- Research Journey;
- Research Stage;
- Research Capability;
- Capability Dimension;
- Capability Profile;
- Capability Evidence;
- Progress Evidence;
- Progress Assessment;
- Readiness Assessment;
- Milestone;
- Transition;
- Blocker;
- Dependency;
- Recovery Plan;
- Maturity Profile;
- Development Trajectory;
- Educational Intervention;
- Research Decision;
- Academic Review;
- Evidence Dossier.

### 30.4 Edge types

- Requires;
- Supports;
- Demonstrates;
- Develops;
- Improves;
- Weakens;
- Enables;
- Blocks;
- Delays;
- Depends On;
- Evidenced By;
- Assessed By;
- Prepared By;
- Achieved Through;
- Transitions To;
- Reopened By;
- Recovered Through;
- Reviewed By;
- Approved By;
- Transfers To;
- Contradicted By.

### 30.5 Rules

- Every material edge requires provenance.
- Asserted and inferred edges remain distinguishable.
- Graph connectivity must not be treated as capability.
- AI-generated capability inferences must be labelled.
- Historical profiles and transitions remain traceable.
- Access must respect learner privacy and governance boundaries.

---

## 31. Relationship to Existing Architecture

BRM now includes:

### Governance Layer

Authority, review, formal decision, appeal, and institutional control.

### Knowledge–Evidence Network

Sources, evidence, claims, interpretations, knowledge, and provenance.

### Operational Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph.

### Capability Graph

Research capability, readiness, maturity, blockers, milestones, and transitions.

### Research Journey

The longitudinal context linking all developmental and governance activity.

The Capability Graph explains why progress occurs and whether it reflects genuine
development.

---

## 32. Domain Services

### 32.1 Capability Requirement Service

Determines capabilities required for a stage, milestone, decision, or transition.

### 32.2 Capability Evidence Evaluation Service

Evaluates whether evidence demonstrates capability under the recorded support and
complexity conditions.

### 32.3 Capability Profile Service

Constructs multidimensional profiles without collapsing them into one score.

### 32.4 Progress Assessment Service

Distinguishes administrative activity, project progress, and capability growth.

### 32.5 Readiness Assessment Service

Evaluates readiness for a defined target.

### 32.6 Blocker Identification Service

Identifies candidate blockers and distinguishes symptoms from root causes.

### 32.7 Dependency Analysis Service

Detects required dependencies, failure points, and circularity.

### 32.8 Recovery Planning Service

Constructs recovery options based on blocker type, capability need, governance,
and learner agency.

### 32.9 Maturity Trajectory Service

Evaluates longitudinal development while accounting for task complexity and
support.

### 32.10 Transfer Evaluation Service

Assesses whether capability demonstrated in one context transfers to another.

### 32.11 Development Impact Service

Traces how interventions, reviews, decisions, and evidence affect capabilities,
readiness, milestones, and maturity.

---

## 33. Domain Policies

### 33.1 Capability Before Completion Policy

Milestone or task completion must not be treated as sufficient evidence of
capability.

### 33.2 Evidence of Development Policy

Developmental claims require attributable evidence.

### 33.3 Multidimensional Progress Policy

Progress, readiness, capability, and maturity must remain multidimensional.

### 33.4 No Opaque Maturity Score Policy

BRM must not represent research maturity through one unexplained score.

### 33.5 Support-Level Transparency Policy

Capability evidence must record the support and scaffolding present.

### 33.6 Readiness–Approval Separation Policy

BRM readiness assessment remains separate from formal progression approval.

### 33.7 Contradictory Evidence Policy

Contradictory progress or capability evidence must remain visible.

### 33.8 Recovery Before Punishment Policy

Educational recovery should be considered before punitive interpretation where
appropriate and within policy.

### 33.9 Learner Agency Policy

Learners may inspect, explain, contest, and contribute to developmental records.

### 33.10 Non-Profiling Policy

Capability and maturity models must not become covert personality, intelligence,
health, or employment profiles.

### 33.11 Minimal Necessary Visibility Policy

Program-level visibility must disclose only what is necessary for legitimate
educational and governance purposes.

### 33.12 Transfer and Independence Policy

Higher development requires evidence of independence and transfer, not repeated
completion under unchanged support.

---

## 34. Aggregate Invariants

The domain must enforce:

1. Activity is not automatically progress.
2. Progress is not automatically capability.
3. Capability is not automatically readiness.
4. Readiness is not formal approval.
5. Milestone completion is not mastery.
6. Completion remains distinct from capability.
7. Capability claims require evidence.
8. Support level is recorded with capability evidence.
9. AI-generated work is not automatically learner capability.
10. Confidence is not competence.
11. One performance does not establish stable capability.
12. Missing evidence is not automatically weakness.
13. Capability profiles remain multidimensional.
14. Maturity profiles remain multidimensional.
15. No opaque overall maturity score.
16. Contradictory evidence remains visible.
17. Stage sequence may be non-linear.
18. Reopened stages preserve history.
19. Readiness is target specific.
20. Formal progression requires BRMF-209 authority.
21. Blockers are not learner diagnoses.
22. Delay is not automatically capability failure.
23. Recovery is not punishment.
24. Root cause remains distinct from symptom.
25. Dependencies are explicit.
26. Circular dependencies are detected.
27. Transfer is stronger evidence than repetition alone.
28. Temporary difficulty does not automatically imply regression.
29. Workload and program visibility respect privacy.
30. Capability Graph edges require provenance.
31. Inferred developmental edges remain labelled.
32. Learners may inspect and contest developmental assessments.
33. High-stakes developmental interpretation requires human review.
34. Research maturity remains explainable.

---

## 35. Commands

Initial commands include:

- Create Research Journey
- Add Research Stage
- Reopen Research Stage
- Define Stage Requirement
- Register Research Capability
- Add Capability Dimension
- Define Capability Development Levels
- Record Capability Evidence
- Create Capability Profile
- Revise Capability Profile
- Record Progress Evidence
- Assess Progress
- Create Readiness Assessment
- Reassess Readiness
- Create Milestone
- Define Milestone Requirement
- Submit Milestone for Review
- Record Milestone Outcome
- Create Transition
- Authorise Transition Reference
- Record Blocker
- Confirm Blocker
- Resolve Blocker
- Add Dependency
- Record Delay
- Create Recovery Plan
- Activate Recovery Plan
- Evaluate Recovery Plan
- Create Maturity Profile
- Record Development Trajectory
- Record Completion
- Evaluate Readiness
- Evaluate Research Maturity
- Add Capability Graph Node
- Add Capability Graph Edge
- Record Inferred Capability Edge
- Conduct Development Impact Analysis

---

## 36. Domain Events

Initial events include:

- ResearchJourneyCreated
- ResearchStageAdded
- ResearchStageReopened
- StageRequirementDefined
- ResearchCapabilityRegistered
- CapabilityDimensionAdded
- CapabilityDevelopmentLevelsDefined
- CapabilityEvidenceRecorded
- CapabilityProfileCreated
- CapabilityProfileRevised
- ProgressEvidenceRecorded
- ProgressAssessed
- ReadinessAssessmentCreated
- ReadinessReassessed
- MilestoneCreated
- MilestoneRequirementDefined
- MilestoneSubmittedForReview
- MilestoneOutcomeRecorded
- TransitionCreated
- TransitionAuthorityReferenced
- BlockerRecorded
- BlockerConfirmed
- BlockerResolved
- DependencyAdded
- DelayRecorded
- RecoveryPlanCreated
- RecoveryPlanActivated
- RecoveryPlanEvaluated
- MaturityProfileCreated
- DevelopmentTrajectoryRecorded
- CompletionRecorded
- ReadinessEvaluated
- ResearchMaturityEvaluated
- CapabilityGraphNodeAdded
- CapabilityGraphEdgeAdded
- InferredCapabilityEdgeRecorded
- DevelopmentImpactAnalysisConducted

---

## 37. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Record Capability Evidence | CapabilityEvidenceRecorded | Evidence of Development Policy | Evidence and support recorded |
| Assess Progress | ProgressAssessed | Multidimensional Progress Policy | Activity differs from progress |
| Create Readiness Assessment | ReadinessAssessmentCreated | Readiness–Approval Separation Policy | Readiness is not approval |
| Record Milestone Outcome | MilestoneOutcomeRecorded | Capability Before Completion Policy | Milestone is not mastery |
| Record Blocker | BlockerRecorded | Recovery Before Punishment Policy | Blocker is not diagnosis |
| Create Recovery Plan | RecoveryPlanCreated | Learner Agency Policy | Recovery preserves agency |
| Create Maturity Profile | MaturityProfileCreated | No Opaque Maturity Score Policy | Maturity is multidimensional |
| Evaluate Research Maturity | ResearchMaturityEvaluated | Transfer and Independence Policy | Transfer and independence matter |
| Add Capability Graph Edge | CapabilityGraphEdgeAdded | Evidence of Development Policy | Provenance required |

---

## 38. Authority Model

### 38.1 BRM may

- identify capability requirements;
- gather and organise progress evidence;
- propose capability assessments;
- assess readiness;
- identify blockers and dependencies;
- recommend recovery options;
- construct maturity profiles;
- identify development trajectories;
- prepare supervisor and program reports;
- trace developmental impact.

### 38.2 BRM may not

- formally progress or fail a learner;
- award grades or qualifications;
- diagnose personal conditions;
- declare permanent incapacity;
- treat engagement metrics as capability;
- hide uncertainty;
- convert maturity profiles into personality judgments;
- replace authorised review.

### 38.3 Learner may

- provide evidence;
- inspect profiles;
- add reflection;
- explain context;
- contest assessments;
- accept or challenge recovery plans;
- request review;
- document blockers;
- demonstrate transfer.

### 38.4 Supervisor may

- review capability evidence;
- confirm developmental interpretations;
- challenge readiness;
- identify milestones;
- agree recovery actions;
- recommend progression;
- assess transfer and independence.

### 38.5 Program and institutional authorities may

- define milestone requirements;
- define formal progression standards;
- make progression decisions;
- approve extensions;
- govern recovery and continuation;
- define program-level visibility;
- audit fairness and privacy.

---

## 39. Cross-Context Interfaces

### Research Project Context

Provides:

- project structure;
- project stage;
- tasks;
- deliverables;
- project status.

Receives:

- progress assessments;
- blocker status;
- readiness;
- milestone status;
- transition status.

### Research Decision Context

Provides:

- decisions;
- rationale;
- alternatives;
- confidence;
- revisions.

Receives:

- decision-making capability evidence;
- readiness findings;
- development trajectories.

### Constructs and Theoretical Models Context

Provides:

- theory and framework work;
- construct definitions;
- hypotheses;
- coherence findings.

Receives:

- conceptual and theoretical capability evidence;
- readiness for framework transition;
- development needs.

### Mentoring and Educational Intervention Context

Provides:

- interventions;
- prompts;
- scaffolds;
- learner responses;
- learning evidence;
- fading history.

Receives:

- capability gaps;
- blocker diagnoses;
- recovery objectives;
- maturity priorities.

### Knowledge, Evidence, and Provenance Context

Provides:

- evidence dossiers;
- claim quality;
- provenance;
- contradiction;
- verification.

Receives:

- evidence-evaluation capability;
- synthesis capability;
- citation and provenance discipline evidence.

### Supervision and Academic Governance Context

Provides:

- formal reviews;
- feedback;
- recommendations;
- decisions;
- approvals;
- revisions.

Receives:

- readiness reports;
- maturity reports;
- milestone evidence;
- blocker and recovery reports;
- progression evidence packages.

### Learner Development Context

Provides:

- learner state;
- educational needs;
- reflection;
- confidence;
- support needs.

Receives:

- capability profiles;
- development trajectories;
- maturity findings;
- progress evidence.

---

## 40. Privacy, Fairness, and Integrity Safeguards

The domain must support:

- learner access;
- correction and contestation;
- evidence-based assessment;
- minimal necessary program visibility;
- restricted sensitive blockers;
- transparent inference;
- explicit AI attribution;
- human review for high-stakes interpretation;
- retention and deletion rules;
- role-based access;
- prevention of covert profiling;
- support-level visibility;
- fairness review across learners and cohorts;
- explanation of missing evidence;
- separation from employment assessment.

BRM must not infer sensitive personal conditions from delays, inactivity,
confidence, or performance patterns.

---

## 41. Reporting

Reports may include:

- Research Journey Summary;
- Research Stage Map;
- Capability Catalogue;
- Capability Profile;
- Capability Evidence Register;
- Progress Evidence Report;
- Progress Assessment;
- Readiness Report;
- Milestone Register;
- Milestone Requirements Report;
- Transition Report;
- Blocker Register;
- Dependency Map;
- Delay Report;
- Recovery Plan;
- Recovery Effectiveness Report;
- Maturity Profile;
- Development Trajectory Report;
- Completion Record;
- Capability Graph View;
- Program Progress Overview;
- Development Impact Report.

Reports must distinguish:

- activity;
- output;
- progress;
- capability;
- readiness;
- approval;
- milestone;
- maturity;
- AI assistance;
- learner performance;
- supervisor judgment;
- institutional decision.

---

## 42. Example Scenario

A DBA learner completes a literature-review chapter and submits it on time.

An administrative system would mark the milestone complete.

BRM evaluates the developmental evidence.

It finds:

- broad literature coverage;
- weak contradiction handling;
- inconsistent theory selection;
- strong supervisor communication;
- heavy reliance on structured prompts;
- limited transfer when a new industry context is introduced.

The Progress Assessment records:

`Administrative Progress Only` for chapter completion.

It also records:

`Partial Capability Growth` in literature discovery and scholarly communication.

The Capability Profile shows:

- Literature Search: Independent in Familiar Context;
- Source Evaluation: Functional with Light Support;
- Evidence Synthesis: Developing with Structured Support;
- Theory Selection: Emerging with Intensive Support;
- Supervisor Communication: Independent in Familiar Context;
- Transfer Learning: Not Yet Demonstrated.

The learner is not yet ready to begin final methodology design.

The Readiness Engine identifies:

- theory-fit uncertainty;
- insufficient synthesis;
- unresolved construct definitions;
- no critical ethics blocker;
- adequate supervisor engagement.

It returns:

`Ready with Conditions` for preliminary methodology exploration, but
`Not Yet Ready` for methodology approval.

A Recovery Plan is created.

It includes:

- a contradiction-mapping exercise;
- comparison of two competing theories;
- construct-definition review;
- scaffold fading;
- supervisor discussion preparation;
- reassessment after an independent transfer task.

After several weeks, the learner independently evaluates a new theory in a
different business context and provides a justified rejection.

The Research Maturity Engine records:

- improvement in theoretical maturity;
- improvement in evidence evaluation;
- reduced scaffold dependence;
- emerging transfer;
- stronger confidence calibration.

The milestone remains only one part of the story.

The system shows genuine researcher development.

---

## 43. Validation Questions

Reviewers should confirm:

1. Is Research Capability correctly modelled as the central aggregate?
2. Are activity, progress, capability, readiness, milestone, and approval
   distinct?
3. Are research stages non-linear and revisitable?
4. Are capabilities multidimensional?
5. Is support level recorded with capability evidence?
6. Can contradictory capability evidence coexist?
7. Are Capability Profiles explainable?
8. Is Readiness target specific?
9. Does the Readiness Engine remain separate from formal authority?
10. Are milestones treated as checkpoints rather than educational goals?
11. Are blockers distinct from learner diagnoses?
12. Can dependencies, delays, and root causes be represented?
13. Does Recovery Planning preserve learner agency?
14. Is Research Maturity longitudinal and multidimensional?
15. Does the Research Maturity Engine avoid one score?
16. Are transfer and independence properly valued?
17. Is the Capability Graph compatible with existing BRM architecture?
18. Are privacy and non-profiling safeguards adequate?
19. Can program-level visibility avoid covert surveillance?
20. Does the model provide a stable foundation for BRMF-211?

---

## 44. Acceptance Criteria

BRMF-210 may progress from Draft to Approved when:

- Research Journey and Research Stage are accepted;
- Research Capability is accepted as the central aggregate;
- Capability Dimensions and Development Levels are accepted;
- Capability Evidence and Capability Profile are accepted;
- Progress Evidence and Progress Assessment are accepted;
- Readiness Assessment and the Readiness Engine are accepted;
- Milestone, Milestone Requirement, and Transition are accepted;
- Blocker, Dependency, Delay, and Recovery Plan are accepted;
- Maturity Profile, Development Trajectory, and Research Maturity Engine are
  accepted;
- the Capability Graph is accepted;
- interfaces with existing BRM domains are accepted;
- privacy, fairness, learner-agency, and non-profiling safeguards are accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved contradiction with BRMF-201 through BRMF-209 remains.

---

## 45. Next Specification

The next recommended document is:

**BRMF-211 — Platform Intelligence, Orchestration, and Explainability Domain Model**

It will define:

- Intelligence Request;
- Intelligence Task;
- AI Model;
- Model Capability;
- Model Selection;
- Orchestration Plan;
- Context Assembly;
- Prompt Package;
- Tool Invocation;
- Retrieval;
- Agent Action;
- Human Review;
- Output Classification;
- Recommendation;
- Explanation;
- Confidence;
- Uncertainty;
- Safety Rule;
- Academic-Integrity Guardrail;
- Audit Record;
- Cost and resource governance;
- fallback;
- failure;
- explainable cross-domain intelligence.

---

**End of BRMF-210**
