# BRMF-207 — Mentoring Interaction and Educational Intervention Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206  
**Prepares:** BRMF-208, BRMF-209, BRMF-210, BRMF-211

---

## 1. Purpose

This document defines the domain model for mentoring interactions, learner needs,
educational interventions, scaffolds, reflection activities, learner responses,
learning evidence, intervention outcomes, escalation, educational
appropriateness, and mentoring effectiveness within the Business Research Mentor
(BRM).

It establishes the Educational Learning Graph as a first-class platform
capability.

The model governs how BRM responds to learner needs without replacing learner
agency, supervisor authority, academic assessment, counselling, therapy, or
institutional responsibility.

---

## 2. Core Principle

BRM must not deliver generic advice merely because a learner asks a question.

It should identify the educational need, select an appropriate intervention,
observe the learner response, collect learning evidence, and update the governed
understanding of learner development.

The canonical educational loop is:

Learner State  
→ Educational Need  
→ Mentoring Need  
→ Intervention Selection  
→ Educational Interaction  
→ Learner Response  
→ Reflection  
→ Learning Evidence  
→ Updated Learner State

The purpose of the loop is not to maximise interaction.

It is to improve scholarly capability and independence.

---

## 3. Constitutional Role

BRM is an educational mentor, not a ghostwriter.

The system may:

- prompt;
- question;
- clarify;
- compare;
- scaffold;
- challenge;
- explain;
- encourage reflection;
- identify uncertainty;
- prepare supervisor discussion;
- recommend escalation.

The system must not:

- complete assessed research work in place of the learner;
- conceal AI authorship;
- impersonate a supervisor;
- provide counselling or therapy;
- diagnose mental-health conditions;
- manipulate emotions;
- pressure agreement;
- reward compliance instead of understanding;
- create dependency;
- make formal academic decisions.

---

## 4. Bounded Context

### 4.1 Context name

**Mentoring Interaction and Educational Intervention Context**

### 4.2 Responsibilities

The context owns:

- Educational Need;
- Mentoring Need;
- Educational Intervention;
- Intervention Strategy;
- Scaffold;
- Prompt;
- Mentoring Episode;
- Interaction Turn;
- Reflection Activity;
- Learner Response;
- Learning Evidence;
- Intervention Outcome;
- Intervention Effectiveness Assessment;
- Educational Appropriateness Assessment;
- Escalation;
- Supervisor Discussion Preparation;
- Intervention Provenance;
- Educational Learning Graph.

### 4.3 Responsibilities excluded

The context does not own:

- Learner identity;
- the full Learner Development Record;
- Research Project lifecycle;
- Research Decision lifecycle;
- Theory, Construct, or Variable identity;
- Evidence Item content;
- supervisor identity;
- institutional policy;
- formal assessment;
- ethics approval;
- counselling or clinical support;
- final academic progression decisions.

---

## 5. Aggregate Architecture

BRMF-207 defines the following collaborating aggregate roots:

1. Educational Need
2. Educational Intervention
3. Mentoring Episode
4. Reflection Activity
5. Learning Evidence Record
6. Escalation
7. Educational Learning Graph

The central aggregate is:

`EducationalIntervention`

A Mentoring Episode may contain one or more Educational Interventions.

An Educational Need may produce multiple candidate interventions.

A Learning Evidence Record may be linked to one or more interventions and to the
Learner Development Context.

---

## 6. Governed Scholarly Object Conformance

Major educational objects should conform conceptually to the Governed Scholarly
Object pattern where applicable.

They must support:

- stable identity;
- lifecycle;
- purpose;
- provenance;
- actor attribution;
- review;
- revision;
- authority boundaries;
- traceability;
- supersession where meaningful;
- domain events.

The pattern must not force implementation inheritance.

---

## 7. Educational Need Aggregate

### 7.1 Identity

`EducationalNeedId`

### 7.2 Purpose

An Educational Need represents a learning-related condition requiring support,
practice, clarification, challenge, reflection, or escalation.

It is not a permanent learner trait.

### 7.3 Attributes

- Educational Need Id;
- Learner Id;
- Research Project Id;
- Need Category;
- Need Statement;
- Observed Context;
- Trigger;
- Supporting Observations;
- Related Learner-State References;
- Related Research Decisions;
- Related Scholarly Objects;
- Severity;
- Urgency;
- Confidence;
- Source;
- Status;
- Review Status;
- Created At;
- Provenance.

### 7.4 Need categories

- Conceptual;
- Theoretical;
- Methodological;
- Analytical;
- Evidence Evaluation;
- Research Design;
- Decision-Making;
- Metacognitive;
- Reflective;
- Communication;
- Planning;
- Organisational;
- Confidence Calibration;
- Uncertainty Management;
- Supervisor Preparation;
- Academic Integrity;
- Motivational within Educational Boundaries;
- Accessibility;
- Institutional Navigation.

### 7.5 Need source

- Learner Reported;
- Supervisor Identified;
- System Observed;
- Assessment Feedback;
- Decision Quality Finding;
- Framework Coherence Finding;
- Project Coherence Finding;
- Learning Evidence;
- Institutional Requirement;
- Collaborative Identification.

### 7.6 Status

- Candidate;
- Observed;
- Confirmed;
- Under Review;
- Active;
- Addressed;
- Partially Addressed;
- Escalated;
- Reclassified;
- Superseded;
- Closed.

### 7.7 Rules

- A need must be described in context.
- A system-observed need must be labelled as an observation, not a fact.
- A need must not be converted into a permanent learner characteristic.
- Emotional language must not be interpreted clinically.
- A need may be rejected or reclassified by authorised human actors.
- Need severity must not be inferred solely from interaction frequency.

---

## 8. Mentoring Need

A Mentoring Need is an Educational Need suitable for response through a mentoring
interaction.

### Attributes

- Mentoring Need Id;
- Educational Need Id;
- Mentoring Goal;
- Required Intervention Capability;
- Expected Learner Contribution;
- Supervisor Involvement Requirement;
- Suitability for BRM;
- Constraints;
- Risks;
- Priority;
- Status;
- Provenance.

### Suitability for BRM

- Suitable for BRM;
- Suitable with Supervisor Visibility;
- Supervisor Participation Required;
- Institution Required;
- Outside BRM Scope;
- Safety Escalation Required;
- Insufficient Information.

### Rule

Not every Educational Need should become an automated intervention.

---

## 9. Educational Intervention Aggregate

### 9.1 Identity

`EducationalInterventionId`

### 9.2 Responsibilities

The Educational Intervention aggregate governs:

- intervention purpose;
- educational rationale;
- linked Educational Need;
- strategy;
- learner-state assumptions;
- expected learner action;
- prompts and scaffolds;
- delivery mode;
- boundaries;
- expected learning outcomes;
- evidence requirements;
- review and completion;
- effectiveness;
- revision;
- provenance.

### 9.3 Attributes

- Educational Intervention Id;
- Learner Id;
- Research Project Id;
- Educational Need Id;
- Mentoring Need Id, optional;
- Intervention Type;
- Educational Objective;
- Educational Rationale;
- Target Capability;
- Prerequisite Learner State;
- Research Stage;
- Related Decision References;
- Related Knowledge References;
- Intervention Strategy;
- Prompt Set;
- Scaffold Set;
- Expected Learner Action;
- Expected Learning Outcome;
- Required Learning Evidence;
- Delivery Mode;
- Support Level;
- Supervisor Visibility;
- Boundaries;
- Start Time;
- Completion Criteria;
- Status;
- Review Status;
- Version;
- Provenance.

### 9.4 Intervention status

- Proposed;
- Selected;
- Prepared;
- Active;
- Awaiting Learner Response;
- Awaiting Reflection;
- Awaiting Evidence;
- Completed;
- Partially Completed;
- Ineffective;
- Inappropriate;
- Paused;
- Escalated;
- Withdrawn;
- Superseded;
- Archived.

---

## 10. Intervention Taxonomy

### 10.1 Conceptual interventions

- Clarify Concept;
- Distinguish Concepts;
- Define Boundary;
- Identify Misconception;
- Provide Example;
- Provide Counterexample;
- Map Concept Relationships;
- Reframe Concept.

### 10.2 Analytical interventions

- Compare Alternatives;
- Identify Assumptions;
- Identify Constraints;
- Evaluate Evidence;
- Examine Contradiction;
- Test Consistency;
- Identify Trade-Off;
- Explore Boundary Condition;
- Conduct Sensitivity Reflection.

### 10.3 Research-design interventions

- Refine Topic;
- Clarify Problem;
- Examine Gap;
- Improve Research Question;
- Align Objective;
- Review Theory Fit;
- Review Construct Definition;
- Review Variable Role;
- Examine Operationalisation;
- Review Methodology Fit;
- Examine Sampling;
- Examine Analysis Choice.

### 10.4 Decision interventions

- Formulate Decision Question;
- Generate Alternatives;
- Challenge Single-Option Thinking;
- Compare Criteria;
- Calibrate Confidence;
- Identify Residual Uncertainty;
- Strengthen Justification;
- Reopen Decision;
- Prepare Decision Review.

### 10.5 Metacognitive interventions

- Self-Explain;
- Reflect on Reasoning;
- Identify Knowledge Gap;
- Confidence Calibration;
- Uncertainty Awareness;
- Recognise Premature Closure;
- Review Learning Strategy;
- Transfer Learning;
- Plan Independent Next Step.

### 10.6 Supervisor-oriented interventions

- Prepare Supervisor Question;
- Summarise Decision Context;
- Identify Point of Disagreement;
- Prepare Alternatives for Discussion;
- Prepare Evidence Dossier;
- Request Formal Review;
- Clarify Required Authority.

### 10.7 Academic-integrity interventions

- Identify Improper Delegation;
- Require Learner Contribution;
- Mark AI-Generated Material;
- Request Source Verification;
- Redirect from Answer Production to Learning;
- Require Personal Justification;
- Escalate Suspected Misrepresentation.

### 10.8 Organisational interventions

- Break Down Task;
- Sequence Research Activity;
- Identify Dependency;
- Set Review Point;
- Prepare Milestone;
- Identify Blocker;
- Prioritise Revision.

---

## 11. Intervention Strategy

An Intervention Strategy defines how the educational objective will be pursued.

### Attributes

- Intervention Strategy Id;
- Strategy Type;
- Description;
- Suitable Need Categories;
- Suitable Learner States;
- Contraindications;
- Required Inputs;
- Expected Cognitive Operation;
- Expected Learner Effort;
- Expected Duration Class;
- Escalation Conditions;
- Evidence Requirements;
- Provenance.

### Strategy types

- Socratic Questioning;
- Guided Discovery;
- Worked Example;
- Faded Scaffold;
- Comparative Analysis;
- Concept Mapping;
- Error Analysis;
- Retrieval Practice;
- Reflection;
- Self-Explanation;
- Prompted Justification;
- Counterexample;
- Perspective Taking;
- Decision Matrix;
- Evidence Mapping;
- Supervisor Preparation;
- Independent Practice;
- Feedback and Revision;
- Progressive Disclosure.

---

## 12. Prompt

A Prompt is a bounded educational request delivered to the learner.

### Attributes

- Prompt Id;
- Intervention Id;
- Prompt Type;
- Prompt Text;
- Educational Purpose;
- Expected Response Form;
- Difficulty;
- Support Level;
- Sequence;
- Follow-Up Conditions;
- Provenance.

### Prompt types

- Open Question;
- Clarification Question;
- Comparison Question;
- Evidence Question;
- Assumption Question;
- Constraint Question;
- Reflection Question;
- Challenge Question;
- Justification Question;
- Transfer Question;
- Supervisor Preparation Question;
- Self-Assessment Question.

### Rules

- A Prompt must have an educational purpose.
- Prompts must not be designed to trick or manipulate.
- Leading prompts must be labelled where unavoidable.
- Prompt difficulty should be appropriate to the learner's current state.
- Excessive prompting must not replace learner autonomy.

---

## 13. Scaffold

A Scaffold is temporary support that enables the learner to perform a scholarly
operation they cannot yet perform independently.

### Attributes

- Scaffold Id;
- Intervention Id;
- Scaffold Type;
- Description;
- Support Level;
- Entry Condition;
- Fading Rule;
- Removal Condition;
- Risk of Dependency;
- Learner Control;
- Status;
- Provenance.

### Scaffold types

- Checklist;
- Template;
- Partial Example;
- Worked Example;
- Decision Frame;
- Comparison Table;
- Concept Map;
- Evidence Map;
- Question Sequence;
- Rubric;
- Boundary Guide;
- Reflection Guide;
- Supervisor Discussion Guide.

### Rules

- Every Scaffold must have a fading or removal rule.
- Permanent reliance must trigger review.
- A Scaffold must not become concealed answer generation.
- Learners should be able to inspect why a Scaffold was offered.

---

## 14. Support Level

Support level represents the degree of assistance.

- Minimal Prompt;
- Light Scaffold;
- Guided Practice;
- Structured Support;
- Intensive Educational Support;
- Supervisor-Led Support;
- Institution-Led Support.

Support should decrease as independent capability becomes evident.

---

## 15. Mentoring Episode Aggregate

### 15.1 Identity

`MentoringEpisodeId`

### 15.2 Purpose

A Mentoring Episode represents a bounded educational interaction involving one
or more interventions.

### 15.3 Attributes

- Mentoring Episode Id;
- Learner Id;
- Research Project Id;
- Episode Purpose;
- Trigger;
- Educational Need References;
- Intervention References;
- Participants;
- Delivery Channel;
- Start Time;
- End Time;
- Episode Summary;
- Learner Contribution Summary;
- System Contribution Summary;
- Supervisor Contribution Summary;
- Open Questions;
- Follow-Up Needs;
- Status;
- Provenance.

### 15.4 Participants

- Learner;
- BRM;
- Supervisor;
- Co-Supervisor;
- Research Methods Advisor;
- Librarian;
- Program Director;
- External Expert;
- Peer, where authorised.

### 15.5 Episode status

- Planned;
- Active;
- Paused;
- Completed;
- Abandoned;
- Escalated;
- Archived.

### 15.6 Rules

- An Episode may contain multiple interventions.
- An intervention may span multiple Episodes.
- Episode completion does not prove learning.
- Interaction volume does not establish mentoring effectiveness.
- Participant contributions must remain attributable.

---

## 16. Interaction Turn

An Interaction Turn is an attributable contribution within a Mentoring Episode.

### Attributes

- Interaction Turn Id;
- Episode Id;
- Actor Type;
- Actor Id, optional;
- Turn Type;
- Content Reference;
- Educational Function;
- Related Intervention;
- Created At;
- Provenance.

### Turn types

- Learner Question;
- Learner Explanation;
- Learner Reflection;
- Learner Decision;
- System Prompt;
- System Explanation;
- System Feedback;
- Supervisor Feedback;
- Supervisor Decision;
- Clarification;
- Evidence Reference;
- Escalation Notice.

The domain need not preserve hidden model reasoning.

---

## 17. Learner Response

A Learner Response records how the learner responds to an intervention.

### Attributes

- Learner Response Id;
- Intervention Id;
- Episode Id;
- Response Type;
- Response Content Reference;
- Learner Reasoning Reference;
- Confidence;
- Uncertainty;
- Effort Indicator, optional;
- Assistance Used;
- Submitted At;
- Review Status;
- Provenance.

### Response types

- Explanation;
- Comparison;
- Justification;
- Definition;
- Decision;
- Reflection;
- Revision;
- Question;
- Evidence Evaluation;
- Concept Map;
- Framework Revision;
- Supervisor Discussion Preparation;
- Decline;
- Request for More Support.

### Rules

- A response must remain attributable to the learner.
- AI-generated wording must not be recorded as learner reasoning without clear
  provenance.
- Refusal or uncertainty may be educationally meaningful.
- Fluency must not be treated automatically as understanding.

---

## 18. Reflection Activity Aggregate

### 18.1 Identity

`ReflectionActivityId`

### 18.2 Purpose

A Reflection Activity helps the learner examine their knowledge, reasoning,
decisions, uncertainty, progress, and future action.

### 18.3 Attributes

- Reflection Activity Id;
- Learner Id;
- Research Project Id;
- Trigger;
- Reflection Type;
- Prompt Set;
- Related Intervention;
- Related Decision;
- Related Learner-State Dimension;
- Expected Reflection Outcome;
- Learner Reflection Reference;
- Review;
- Completion Status;
- Provenance.

### 18.4 Reflection types

- Decision Reflection;
- Evidence Reflection;
- Misconception Reflection;
- Confidence Reflection;
- Uncertainty Reflection;
- Learning Strategy Reflection;
- Supervisor Feedback Reflection;
- Revision Reflection;
- Transfer Reflection;
- Independence Reflection;
- Ethical Reflection;
- Milestone Reflection.

### 18.5 Rules

- Reflection must not be reduced to sentiment collection.
- Reflection should connect to identifiable scholarly activity.
- The learner may mark a reflection as private where governance permits.
- Reflection quality must not be inferred solely from length.

---

## 19. Learning Evidence Record Aggregate

### 19.1 Identity

`LearningEvidenceId`

### 19.2 Purpose

A Learning Evidence Record represents observable support for a claim that the
learner's scholarly capability, understanding, judgement, or independence has
changed.

### 19.3 Attributes

- Learning Evidence Id;
- Learner Id;
- Research Project Id;
- Evidence Type;
- Evidence Statement;
- Source;
- Related Intervention;
- Related Response;
- Related Reflection;
- Related Decision;
- Related Scholarly Object;
- Capability Dimension;
- Before State Reference, optional;
- After State Reference, optional;
- Strength;
- Confidence;
- Alternative Explanation;
- Reviewer;
- Status;
- Provenance.

### 19.4 Evidence types

- Improved Explanation;
- Improved Definition;
- Improved Comparison;
- Stronger Justification;
- Better Evidence Evaluation;
- Misconception Corrected;
- Uncertainty Better Calibrated;
- Decision Revised Appropriately;
- Framework Coherence Improved;
- Independent Transfer;
- Reduced Scaffold Reliance;
- Improved Supervisor Preparation;
- Improved Methodological Alignment;
- Sustained Performance;
- Reflective Insight;
- No Observable Change;
- Conflicting Evidence.

### 19.5 Evidence strength

- Weak;
- Emerging;
- Moderate;
- Strong;
- Sustained;
- Indeterminate.

### 19.6 Rules

- Activity completion is not learning evidence by itself.
- One response rarely proves durable learning.
- Learning claims must remain contestable.
- Alternative explanations should be preserved where material.
- Evidence may be contradictory.
- Learning Evidence must not automatically become formal assessment evidence.

---

## 20. Intervention Outcome

An Intervention Outcome records what occurred following an intervention.

### Attributes

- Intervention Outcome Id;
- Intervention Id;
- Outcome Type;
- Observed Result;
- Expected Outcome Met;
- Learning Evidence References;
- Learner Feedback;
- Reviewer Feedback;
- Residual Need;
- New Need References;
- Recommended Next Action;
- Completed At;
- Provenance.

### Outcome types

- Objective Achieved;
- Partially Achieved;
- Not Achieved;
- Misconception Reduced;
- Decision Improved;
- Reflection Completed;
- Independent Transfer Demonstrated;
- Additional Support Required;
- Supervisor Review Required;
- Intervention Inappropriate;
- Learner Declined;
- Need Reclassified;
- Escalated;
- Indeterminate.

---

## 21. Intervention Effectiveness Assessment

Effectiveness is multidimensional.

### Dimensions

1. Relevance to Need
2. Educational Appropriateness
3. Learner Engagement
4. Learner Understanding
5. Quality of Learner Response
6. Misconception Reduction
7. Reasoning Improvement
8. Decision Improvement
9. Reflection Quality
10. Transfer
11. Retention
12. Independence
13. Scaffold Reduction
14. Supervisor Usefulness
15. Timeliness
16. Cognitive Load Appropriateness
17. Academic Integrity
18. Boundary Compliance

### Assessment scale

- Strong;
- Adequate;
- Developing;
- Weak;
- Harmful or Counterproductive;
- Not Assessable;
- Not Applicable.

### Rules

- No single opaque effectiveness score should conceal weak dimensions.
- Learner satisfaction alone does not establish effectiveness.
- Immediate performance does not establish retention.
- Completion does not establish transfer.
- Disagreement does not establish failure.
- An intervention may be educationally effective even when the learner rejects a
  system recommendation.

---

## 22. Educational Appropriateness Assessment

An Educational Appropriateness Assessment determines whether an intervention is
suitable for the learner, context, stage, authority, and need.

### Attributes

- Assessment Id;
- Intervention Id;
- Need Fit;
- Learner-State Fit;
- Research-Stage Fit;
- Difficulty Fit;
- Support-Level Fit;
- Authority Fit;
- Cultural and Language Considerations;
- Accessibility Considerations;
- Academic-Integrity Risk;
- Dependency Risk;
- Emotional-Safety Boundary;
- Privacy Risk;
- Decision;
- Rationale;
- Reviewer;
- Provenance.

### Decisions

- Appropriate;
- Appropriate with Qualification;
- Revise Before Delivery;
- Supervisor Visibility Required;
- Supervisor Delivery Required;
- Institution Required;
- Outside BRM Scope;
- Do Not Deliver;
- Insufficient Information.

---

## 23. Escalation Aggregate

### 23.1 Identity

`EscalationId`

### 23.2 Purpose

An Escalation transfers or refers a matter to an authorised human role when BRM
should not act alone.

### 23.3 Attributes

- Escalation Id;
- Learner Id;
- Research Project Id;
- Trigger;
- Escalation Type;
- Reason;
- Urgency;
- Destination Role;
- Information Shared;
- Consent Basis;
- Status;
- Outcome;
- Created At;
- Provenance.

### 23.4 Escalation types

- Supervisor Review;
- Methodological Advice;
- Ethics Advice;
- Institutional Policy;
- Academic Integrity;
- Accessibility Support;
- Learning Support;
- Program Director Review;
- Technical Support;
- Wellbeing Support Referral;
- Safety Referral.

### 23.5 Rules

- BRM must not provide clinical or crisis intervention.
- Wellbeing or safety concerns must be handled through approved referral and
  escalation pathways.
- Escalation must minimise unnecessary disclosure.
- Formal authority remains with the destination role.
- The learner should be informed where policy permits.

---

## 24. Supervisor Discussion Preparation

Supervisor Discussion Preparation is an intervention outcome that helps a
learner approach supervision with a clear, evidence-supported question.

### Attributes

- Preparation Id;
- Learner Id;
- Research Project Id;
- Discussion Purpose;
- Decision Context;
- Alternatives;
- Evidence Summary;
- Assumptions;
- Constraints;
- Uncertainty;
- Learner Position;
- Questions for Supervisor;
- Required Authority;
- Supporting Artefacts;
- Provenance.

BRM prepares the discussion.

It does not impersonate either participant.

---

## 25. Intervention Selection Service

The Intervention Selection Service identifies suitable interventions from
governed inputs.

### Inputs

- Learner State summary;
- Educational Need;
- Research Stage;
- Research Decision quality;
- Scholarly Knowledge Graph findings;
- Project coherence findings;
- supervisor feedback;
- intervention history;
- prior effectiveness;
- learner preferences;
- accessibility requirements;
- authority constraints.

### Outputs

- candidate interventions;
- educational rationale;
- suitability conditions;
- expected learner action;
- expected learning evidence;
- support level;
- escalation requirements;
- confidence;
- limitations.

### Rules

- Selection must remain explainable.
- A previous effective intervention is not automatically suitable again.
- The system must avoid repetitive low-value prompting.
- Interventions should favour increasing learner independence.

---

## 26. Additional Domain Services

### 26.1 Educational Need Identification Service

Identifies candidate needs from explicit evidence.

It must distinguish observation from confirmation.

### 26.2 Root Educational Cause Exploration Service

Explores whether the visible difficulty may arise from:

- concept confusion;
- missing prerequisite knowledge;
- weak evidence evaluation;
- poor decision framing;
- uncertainty;
- inappropriate scaffold;
- project incoherence;
- authority ambiguity;
- workload or sequencing issue.

It must not claim clinical diagnosis.

### 26.3 Prompt Adaptation Service

Adjusts prompt difficulty, sequence, and support level while preserving the
educational objective.

### 26.4 Scaffold Fading Service

Recommends reduction or removal of scaffolds as independence becomes evident.

### 26.5 Learning Evidence Evaluation Service

Evaluates the strength and limitations of potential learning evidence.

### 26.6 Intervention Effectiveness Service

Evaluates intervention outcomes across the dimensions defined in this
specification.

### 26.7 Escalation Decision Service

Determines when the matter requires supervisor, institutional, methodological,
accessibility, wellbeing, safety, or other authorised support.

### 26.8 Mentoring Continuity Service

Links educational needs, interventions, reflections, and evidence across
episodes without reducing the learner to a fixed profile.

---

## 27. Educational Learning Graph Aggregate

### 27.1 Identity

`EducationalLearningGraphId`

### 27.2 Purpose

The Educational Learning Graph represents the governed relationships among:

- Learner States;
- Educational Needs;
- Mentoring Needs;
- Interventions;
- Prompts;
- Scaffolds;
- Mentoring Episodes;
- Learner Responses;
- Reflections;
- Learning Evidence;
- Outcomes;
- Supervisor Interactions;
- Escalations;
- scholarly decisions;
- knowledge objects.

### 27.3 Node types

- Learner State;
- Educational Need;
- Mentoring Need;
- Educational Intervention;
- Intervention Strategy;
- Prompt;
- Scaffold;
- Mentoring Episode;
- Learner Response;
- Reflection Activity;
- Learning Evidence;
- Intervention Outcome;
- Effectiveness Assessment;
- Escalation;
- Supervisor Interaction;
- Research Decision;
- Research Project Element;
- Theory;
- Construct;
- Variable;
- Evidence Claim.

### 27.4 Edge types

- Observed From;
- Indicates;
- Gives Rise To;
- Addressed By;
- Delivered Through;
- Contains;
- Responded To By;
- Reflected On Through;
- Evidenced By;
- Improved;
- Did Not Improve;
- Partially Improved;
- Required Escalation;
- Reviewed By;
- Confirmed By;
- Revised After;
- Supports Independence;
- Risks Dependency;
- Related To Decision;
- Related To Knowledge;
- Supersedes;
- Contradicts.

### 27.5 Graph rules

- Every node must have stable identity.
- Every edge must have a semantic type.
- Observations must remain distinct from confirmed facts.
- Inferred learning relationships must be labelled.
- Contradictory evidence may coexist.
- Graph traversal must respect learner privacy and role permissions.
- The graph must not become a covert behavioural surveillance system.
- Interaction volume must not be used as a proxy for learning.

---

## 28. Relationship to the Tri-Graph Architecture

BRM contains three complementary governed graphs.

### Research Decision Graph

Represents how scholarly choices evolve.

### Scholarly Knowledge Graph

Represents how research knowledge is organised.

### Educational Learning Graph

Represents how the learner develops through educational interactions.

The graphs connect through typed references but retain separate governance.

The Knowledge Graph represents what the learner is working with.

The Decision Graph represents how the learner decides.

The Learning Graph represents how capability develops.

No graph should overwrite the authority or provenance of another.

---

## 29. Domain Policies

### 29.1 Learning Before Production Policy

Where the user seeks completion of assessed work, BRM should first support the
underlying scholarly operation rather than silently produce the final answer.

### 29.2 Learner Agency Policy

The learner may:

- question the intervention;
- decline it;
- request a different support level;
- challenge the identified need;
- ask for supervisor involvement;
- inspect why the intervention was selected.

### 29.3 Supervisor Boundary Policy

BRM supports but does not replace the supervisor.

Matters requiring academic judgement, confirmation, or formal authority must be
referred appropriately.

### 29.4 Non-Clinical Boundary Policy

BRM must not diagnose, treat, counsel, or provide therapy.

Educational support may acknowledge frustration or uncertainty without making
clinical interpretations.

### 29.5 Scaffold Fading Policy

Scaffolds must be temporary and should reduce as independent capability becomes
evident.

### 29.6 Evidence of Learning Policy

Completion, message count, time spent, and learner satisfaction must not be
treated alone as proof of learning.

### 29.7 Academic Integrity Policy

Learner and AI contributions must remain distinguishable.

The system must not fabricate learner reasoning or conceal generated work.

### 29.8 Minimal Necessary Intervention Policy

BRM should provide the least intensive intervention likely to produce meaningful
learning.

### 29.9 Escalation Policy

BRM must escalate when:

- formal authority is required;
- the issue is outside scope;
- academic integrity risk is material;
- the intervention is repeatedly ineffective;
- supervisor disagreement remains unresolved;
- accessibility support is required;
- wellbeing or safety concerns require authorised human support.

### 29.10 Privacy Policy

Educational data must be used only for legitimate learning, supervision, and
governance purposes.

---

## 30. Aggregate Invariants

The domain must enforce:

1. Every Educational Need has stable identity and provenance.
2. A system-observed need is not automatically confirmed.
3. A need is contextual, not a permanent learner trait.
4. Every Educational Intervention references an educational objective.
5. Every intervention has an educational rationale.
6. Every intervention identifies expected learner action.
7. Every intervention identifies expected learning evidence.
8. A Mentoring Episode may contain multiple interventions.
9. Episode completion does not establish learning.
10. Learner responses remain attributable.
11. AI-generated wording is not recorded as learner reasoning without
    provenance.
12. Every Scaffold has a fading or removal rule.
13. Support level should not increase without rationale.
14. BRM does not become the final academic authority.
15. BRM does not provide clinical diagnosis or therapy.
16. Learning Evidence remains distinct from formal assessment evidence.
17. Interaction volume does not determine learning.
18. Learner satisfaction alone does not determine effectiveness.
19. Immediate success does not establish retention.
20. A rejected recommendation may still produce learning.
21. Contradictory learning evidence may coexist.
22. An intervention may be withdrawn if inappropriate.
23. Escalation preserves minimal necessary disclosure.
24. Supervisor interactions remain attributable.
25. System observations remain contestable.
26. The learner may decline or challenge an intervention.
27. Formal decisions remain outside the intervention aggregate.
28. Inferred Learning Graph edges remain distinguishable from asserted edges.
29. The Learning Graph must respect access and privacy boundaries.
30. BRM must not reward agreement over understanding.
31. BRM must not create dependency intentionally.
32. The domain remains explainable without hidden AI reasoning.

---

## 31. Commands

Initial commands include:

- Record Educational Need
- Confirm Educational Need
- Reclassify Educational Need
- Close Educational Need
- Determine Mentoring Suitability
- Create Mentoring Need
- Propose Educational Intervention
- Select Educational Intervention
- Assess Educational Appropriateness
- Prepare Educational Intervention
- Activate Educational Intervention
- Add Prompt
- Add Scaffold
- Revise Prompt
- Revise Scaffold
- Fade Scaffold
- Remove Scaffold
- Create Mentoring Episode
- Start Mentoring Episode
- Add Interaction Turn
- Record Learner Response
- Pause Mentoring Episode
- Complete Mentoring Episode
- Create Reflection Activity
- Record Learner Reflection
- Record Learning Evidence
- Review Learning Evidence
- Record Intervention Outcome
- Assess Intervention Effectiveness
- Request Supervisor Review
- Prepare Supervisor Discussion
- Create Escalation
- Resolve Escalation
- Reopen Educational Need
- Supersede Educational Intervention
- Add Educational Learning Graph Node
- Add Educational Learning Graph Edge
- Record Inferred Learning Relationship
- Review Learning Relationship

---

## 32. Domain Events

Initial events include:

- EducationalNeedRecorded
- EducationalNeedConfirmed
- EducationalNeedReclassified
- EducationalNeedClosed
- MentoringSuitabilityDetermined
- MentoringNeedCreated
- EducationalInterventionProposed
- EducationalInterventionSelected
- EducationalAppropriatenessAssessed
- EducationalInterventionPrepared
- EducationalInterventionActivated
- InterventionPromptAdded
- InterventionScaffoldAdded
- InterventionPromptRevised
- InterventionScaffoldRevised
- InterventionScaffoldFaded
- InterventionScaffoldRemoved
- MentoringEpisodeCreated
- MentoringEpisodeStarted
- InteractionTurnAdded
- LearnerResponseRecorded
- MentoringEpisodePaused
- MentoringEpisodeCompleted
- ReflectionActivityCreated
- LearnerReflectionRecorded
- LearningEvidenceRecorded
- LearningEvidenceReviewed
- InterventionOutcomeRecorded
- InterventionEffectivenessAssessed
- SupervisorReviewRequested
- SupervisorDiscussionPrepared
- EscalationCreated
- EscalationResolved
- EducationalNeedReopened
- EducationalInterventionSuperseded
- EducationalLearningGraphNodeAdded
- EducationalLearningGraphEdgeAdded
- InferredLearningRelationshipRecorded
- LearningRelationshipReviewed

---

## 33. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Record Educational Need | EducationalNeedRecorded | Learner Agency Policy | Observation is not confirmation |
| Propose Intervention | EducationalInterventionProposed | Minimal Necessary Intervention Policy | Educational rationale required |
| Activate Intervention | EducationalInterventionActivated | Learning Before Production Policy | Learner action required |
| Add Scaffold | InterventionScaffoldAdded | Scaffold Fading Policy | Fading rule required |
| Record Learner Response | LearnerResponseRecorded | Academic Integrity Policy | Attribution preserved |
| Record Learning Evidence | LearningEvidenceRecorded | Evidence of Learning Policy | Completion alone is insufficient |
| Assess Effectiveness | InterventionEffectivenessAssessed | Evidence of Learning Policy | Multidimensional result |
| Request Supervisor Review | SupervisorReviewRequested | Supervisor Boundary Policy | Formal authority preserved |
| Create Escalation | EscalationCreated | Escalation Policy | Minimal disclosure |
| Record Inferred Relationship | InferredLearningRelationshipRecorded | Privacy Policy | Inferred remains distinguishable |

---

## 34. Authority Model

### 34.1 BRM may

- identify candidate educational needs;
- propose interventions;
- adapt prompts;
- provide scaffolds;
- request learner explanation;
- assess observable learning evidence;
- identify lack of progress;
- recommend supervisor discussion;
- recommend escalation;
- assess intervention appropriateness and effectiveness;
- identify dependency risk.

### 34.2 BRM may not

- diagnose the learner;
- make clinical interpretations;
- provide therapy;
- impersonate a supervisor;
- make formal academic decisions;
- fabricate learner reasoning;
- force an intervention;
- conceal AI-generated contributions;
- penalise disagreement;
- treat private reflection as unrestricted institutional data.

### 34.3 Learner may

- report needs;
- challenge identified needs;
- accept or decline interventions;
- request different support;
- provide responses;
- reflect;
- control private reflections where policy permits;
- request supervisor involvement;
- inspect intervention rationale.

### 34.4 Supervisor may

- identify educational needs;
- review interventions;
- provide feedback;
- confirm or reject matters within authority;
- require revision;
- assume direct mentoring responsibility;
- review learning evidence where authorised;
- resolve academic disagreement.

### 34.5 Institution may

- define educational standards;
- define escalation pathways;
- govern data access;
- define assessment boundaries;
- provide accessibility and support services;
- audit academic integrity;
- define supervisor and program authority.

---

## 35. Cross-Context Interfaces

### Learner Development Context

Provides:

- current learner-state summaries;
- capability dimensions;
- confidence and uncertainty observations;
- prior development evidence.

Receives:

- learning evidence;
- intervention outcomes;
- reasoning-pattern observations;
- scaffold independence;
- reflection evidence.

### Research Project Context

Provides:

- project stage;
- milestones;
- coherence findings;
- active project elements;
- project constraints.

Receives:

- unresolved educational blockers;
- mentoring outcomes affecting project progress;
- escalation status.

### Research Decision Context

Provides:

- decision-quality findings;
- unresolved assumptions;
- weak justifications;
- uncertainty;
- review needs.

Receives:

- improved learner reasoning;
- revised decisions;
- supervisor-preparation artefacts;
- learning evidence linked to decisions.

### Constructs and Theoretical Models Context

Provides:

- construct confusion;
- theory-fit findings;
- measurement concerns;
- framework incoherence.

Receives:

- revised learner definitions;
- framework revisions;
- educational outcomes.

### Knowledge, Evidence, and Provenance Context

Provides:

- evidence-quality findings;
- source contradictions;
- provenance concerns.

Receives:

- learner evidence evaluations;
- source-verification needs;
- intervention-generated evidence maps.

### Supervision and Governance Context

Provides:

- supervisor feedback;
- formal decisions;
- policies;
- escalation outcomes.

Receives:

- review requests;
- prepared discussion dossiers;
- unresolved needs;
- intervention summaries;
- academic-integrity concerns.

---

## 36. Privacy and Ethical Safeguards

The domain must support:

- role-based access;
- learner visibility into recorded needs;
- contestation and correction;
- private reflection controls;
- minimal necessary disclosure;
- clear purpose limitation;
- retention policy;
- exportable provenance;
- distinction between mentoring and assessment data;
- protection against covert surveillance;
- protection against opaque learner ranking;
- accessibility accommodations;
- cultural and language sensitivity;
- human review of material inferences.

The platform must not convert normal uncertainty, disagreement, or struggle into
a deficit label.

---

## 37. Reporting

Reports may include:

- Educational Need Summary;
- Intervention Plan;
- Mentoring Episode Summary;
- Learner Response Record;
- Reflection Summary;
- Learning Evidence Portfolio;
- Intervention Effectiveness Report;
- Scaffold Fading Report;
- Supervisor Discussion Preparation;
- Escalation Record;
- Educational Learning Graph View;
- Learner Development Contribution Report.

Reports must distinguish:

- learner statements;
- system observations;
- supervisor findings;
- confirmed needs;
- inferred needs;
- intervention outcomes;
- learning evidence;
- formal assessment.

---

## 38. Example Scenario

A learner repeatedly asks BRM to generate a research problem statement.

BRM does not immediately produce the final statement.

The system observes that the learner can name a topic but cannot distinguish:

- topic;
- practical problem;
- scholarly problem;
- research gap;
- study purpose.

BRM records a candidate Conceptual Educational Need.

The intervention-selection service proposes:

1. distinguish Topic, Problem, Gap, and Purpose;
2. compare short examples;
3. ask the learner to classify each example;
4. ask the learner to explain the distinctions;
5. ask the learner to formulate the project-specific problem;
6. request reflection on remaining uncertainty.

The learner initially confuses the practical problem with the research gap.

BRM provides a lighter comparison scaffold rather than writing the answer.

The learner then produces a revised explanation and problem statement.

Learning Evidence records:

- improved distinction;
- corrected misconception;
- stronger justification;
- reduced scaffold reliance.

The system does not declare mastery.

It recommends an independent transfer task using a different research example.

If the learner continues to struggle, BRM prepares a concise supervisor
discussion dossier rather than endlessly repeating prompts.

---

## 39. Validation Questions

Reviewers should confirm:

1. Is Educational Intervention correctly modelled as the central aggregate?
2. Are Educational Need and Mentoring Need distinct?
3. Can one Mentoring Episode contain multiple interventions?
4. Can one intervention span multiple Episodes?
5. Are prompts and scaffolds governed educational objects?
6. Does every Scaffold have a fading rule?
7. Is learner response attribution protected?
8. Is learning evidence distinct from task completion?
9. Is learning evidence distinct from formal assessment evidence?
10. Is intervention effectiveness multidimensional?
11. Can BRM support learning without replacing the supervisor?
12. Are non-clinical boundaries explicit?
13. Are escalation pathways governed?
14. Does the model protect learner agency?
15. Can the learner challenge system observations?
16. Does the model avoid dependency?
17. Is the Educational Learning Graph compatible with the tri-graph
    architecture?
18. Are privacy and surveillance risks addressed?
19. Are academic-integrity boundaries enforceable?
20. Does the model provide a stable foundation for BRMF-208 through BRMF-211?

---

## 40. Acceptance Criteria

BRMF-207 may progress from Draft to Approved when:

- the Educational Need aggregate is accepted;
- the Educational Intervention aggregate is accepted;
- the Mentoring Episode model is accepted;
- Prompt and Scaffold models are accepted;
- Reflection Activity and Learner Response models are accepted;
- Learning Evidence and Intervention Outcome models are accepted;
- effectiveness and appropriateness models are accepted;
- escalation and supervisor-preparation models are accepted;
- the Educational Learning Graph is accepted;
- tri-graph interfaces are accepted;
- authority and non-clinical boundaries are accepted;
- privacy and academic-integrity safeguards are accepted;
- commands, events, services, policies, and invariants are accepted;
- no unresolved contradiction with BRMF-201 through BRMF-206 remains.

---

## 41. Next Specification

The next recommended document is:

**BRMF-208 — Knowledge, Evidence, and Provenance Domain Model**

It will define:

- Knowledge Source;
- Evidence Item;
- Claim;
- Evidence Fragment;
- Source Quality;
- Claim Support;
- Contradiction;
- Interpretation;
- Citation;
- Provenance Chain;
- Evidence Dossier;
- Source Version;
- Evidence Sufficiency;
- knowledge authority;
- AI-generated claims;
- verification;
- traceability across the three BRM graphs.

---

**End of BRMF-207**
