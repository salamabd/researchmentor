# BRMF-202 — Ubiquitous Language and Domain Glossary

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Foundational Domain Specification  
**Depends on:** BRMF-201 and BRMF Volumes 01–02

---

## 1. Purpose

This document defines the ubiquitous language of the Business Research Mentor
(BRM) domain.

Ubiquitous language is the shared vocabulary used consistently by educational
designers, researchers, supervisors, product owners, architects, developers,
AI agents, testers, and institutional stakeholders.

Its purpose is to reduce ambiguity and ensure that BRM concepts retain the same
meaning across:

- educational models;
- domain models;
- software specifications;
- AI reasoning;
- data structures;
- interfaces;
- reporting;
- validation;
- governance.

---

## 2. Language Governance Principles

### 2.1 One Term, One Primary Meaning

A governed domain term should have one primary meaning within its bounded
context. Where a word has different meanings in different contexts, the context
must be stated explicitly.

### 2.2 Educational Meaning Takes Priority

Where educational and technical interpretations conflict, the educational
meaning defined by BRMF takes priority unless an approved decision record states
otherwise.

### 2.3 Neutral and Descriptive Naming

Domain terms, methodologies, events, and identifiers must use neutral,
descriptive names. Personal names must not be used as primary methodology or
system identifiers.

Scholar names may appear only as:

- historical lineage;
- theoretical influence;
- source attribution;
- bibliographic metadata.

### 2.4 Human and System Actions Must Remain Distinct

The language must distinguish between:

- learner actions;
- supervisor actions;
- institutional decisions;
- BRM recommendations;
- system observations;
- system inferences;
- formal approvals.

### 2.5 Terms Are Versioned Governance Assets

Changes to governed terminology must be traceable. Material changes require an
Educational Decision Record (EDR), Architecture Decision Record (ADR), or other
approved governance instrument, depending on the nature of the change.

---

## 3. Naming Conventions

### 3.1 Entities

Entity names use singular nouns:

- Learner
- Research Project
- Mentoring Episode
- Supervisor Review

### 3.2 Value Objects

Value-object names describe a measurable, classifiable, or meaningful concept:

- Research Stage
- Development Level
- Confidence Indicator
- Intervention Rationale

### 3.3 Domain Events

Domain events use the past tense and describe something meaningful that has
already happened:

- LearnerStateUpdated
- FeedbackProvided
- ResearchDecisionJustified

### 3.4 Commands

Commands use an imperative verb phrase:

- Record Reflection
- Propose Research Decision
- Request Supervisor Review
- Evaluate Intervention

### 3.5 Policies

Policies use descriptive names that reveal their educational or governance
purpose:

- Mentoring Intervention Selection Policy
- Research Coherence Evaluation Policy
- Supervisor Escalation Policy

### 3.6 Avoided Terms

The following terms should not be used without qualification:

- user;
- content;
- score;
- intelligence;
- approval;
- assessment;
- progress;
- completion;
- recommendation;
- generated.

These terms are too broad and may conceal important distinctions.

---

## 4. Core Actor Terms

### 4.1 Learner

A person undertaking a research project and developing scholarly capability.

A learner is not merely a system user. The term emphasises the educational
purpose of BRM.

### 4.2 Student

An institutional status assigned to a person enrolled in a program.

A learner may also be a student, but the terms are not interchangeable:

- **Student** describes institutional status.
- **Learner** describes participation in scholarly development.

### 4.3 Researcher

A person engaged in systematic inquiry.

Within BRM, the learner is developing toward increasing research independence
and may be described as a researcher where context requires.

### 4.4 Supervisor

An academic with responsibility for guiding, reviewing, challenging, and where
authorised, approving aspects of a learner's research.

### 4.5 Co-supervisor

A supervisor who shares defined supervision responsibilities with one or more
other supervisors.

### 4.6 Program Director

A person responsible for program-level oversight, academic governance,
progression visibility, and intervention where authorised.

### 4.7 Institutional Administrator

A person responsible for configured administrative processes, records, access,
or program operations.

This role does not automatically carry academic decision authority.

### 4.8 Institution

The organisation within which a research program, policy framework, supervision
relationship, or academic requirement exists.

### 4.9 BRM Mentoring System

The explainable educational system that supports scholarly development by
observing, prompting, reasoning, recommending, recording, and adapting within
approved limits.

The BRM Mentoring System is not an academic authority.

---

## 5. Research Context Terms

### 5.1 Research Project

The governed representation of a learner's research endeavour, including its
context, constructs, decisions, evidence, activities, and history.

### 5.2 Research Context

The disciplinary, organisational, social, theoretical, practical, geographic,
or temporal setting within which a research problem is situated.

### 5.3 Business Research Domain

The area of business scholarship relevant to a research project, such as:

- Accounting;
- Finance;
- Marketing;
- Information Systems;
- Management;
- Strategy;
- Operations;
- Entrepreneurship;
- Human Resource Management;
- Organisational Behaviour;
- Business Analytics.

### 5.4 Research Stage

A governed phase in the research lifecycle.

Examples include:

- exploration;
- topic formation;
- proposal development;
- research design;
- ethics preparation;
- data collection;
- analysis;
- interpretation;
- reporting;
- examination;
- revision.

A research stage is not necessarily linear or irreversible.

### 5.5 Research Milestone

A formally defined point of expected achievement or review within a program or
project.

A milestone is distinct from a research stage:

- a **stage** describes the current condition of research work;
- a **milestone** describes an expected or formally assessed point.

### 5.6 Research Activity

A purposeful action undertaken as part of the research process.

Examples include reviewing literature, refining a question, comparing methods,
collecting evidence, analysing data, or reflecting on feedback.

### 5.7 Research Output

A tangible product produced during research.

Examples include a proposal, literature map, ethics application, analysis
record, presentation, thesis chapter, or article.

An output is evidence of work, not proof of learning by itself.

---

## 6. Research Construct Terms

### 6.1 Research Construct

A meaningful component of a research project that participates in relationships
with other components.

Examples include:

- problem statement;
- research gap;
- aim;
- objective;
- research question;
- theory;
- concept;
- variable;
- theme;
- hypothesis;
- method;
- evidence claim;
- contribution claim.

This is a domain-level use of the word **construct**. It is broader than the
quantitative research meaning of a latent construct.

### 6.2 Quantitative Construct

An abstract concept represented through measurable indicators within a
quantitative study.

This term must be used when the narrower quantitative meaning is intended.

### 6.3 Variable

A measurable characteristic that can take different values.

The term variable should normally be used in quantitative research contexts.

### 6.4 Theme

A patterned meaning identified in qualitative data or analysis.

A theme is not interchangeable with a variable.

### 6.5 Concept

An abstract idea relevant to a theory, framework, research problem, or analysis.

### 6.6 Theory

A structured explanatory system that defines concepts and relationships and
supports interpretation or prediction.

### 6.7 Theoretical Foundation

The theory or combination of theories that provides the explanatory basis for
a research project.

### 6.8 Conceptual Framework

The researcher's structured representation of relevant concepts and expected
relationships for a particular study.

A conceptual framework may be informed by theory but is not necessarily a
theory.

### 6.9 Research Problem

A significant condition, difficulty, inconsistency, uncertainty, or practical
or theoretical concern that justifies systematic inquiry.

### 6.10 Problem Statement

A clear and bounded expression of the research problem.

### 6.11 Research Gap

A justified absence, limitation, contradiction, or unresolved issue in existing
knowledge that the study may address.

A research gap must be supported by evidence. It is not merely a claim that a
topic has not been studied.

### 6.12 Research Aim

The broad intended purpose of a research project.

### 6.13 Research Objective

A specific result or analytical purpose that contributes to achieving the
research aim.

### 6.14 Research Question

A focused inquiry that the research is designed to answer.

### 6.15 Hypothesis

A testable proposition concerning an expected relationship, difference, or
effect.

Hypotheses normally belong to quantitative or explicitly hypothesis-testing
designs and must not be imposed on all research paradigms.

### 6.16 Contribution Claim

A proposed statement describing how the research adds to theory, method,
practice, policy, or understanding.

A contribution claim remains provisional until supported by completed research.

### 6.17 Limitation

A recognised boundary, weakness, constraint, or condition affecting the design,
interpretation, transferability, or generalisability of research.

---

## 7. Research Decision Terms

### 7.1 Research Decision

A deliberate choice affecting the direction, design, interpretation, or conduct
of a research project.

Examples include selecting a topic, theory, sample, method, analytical approach,
or interpretation.

### 7.2 Decision Option

A plausible alternative considered when making a research decision.

### 7.3 Decision Criterion

A consideration used to compare or evaluate decision options.

### 7.4 Decision Rationale

The explicit reasoning supporting a research decision.

### 7.5 Decision Evidence

The evidence considered when forming or revising a research decision.

### 7.6 Decision Status

The governed lifecycle condition of a research decision.

Recommended statuses include:

- Draft;
- Proposed;
- Under Review;
- Accepted by Learner;
- Supervisor Confirmed;
- Revision Requested;
- Superseded;
- Withdrawn.

### 7.7 Sufficient Constraint

A constraint that meaningfully narrows the available decision space enough to
permit a justified next step.

A sufficient constraint does not imply perfect certainty.

### 7.8 Threshold of Sufficiency

The point at which available constraints and evidence are adequate to make a
defensible research decision without unnecessary continued exploration.

### 7.9 Research Judgement

The capability to make, justify, evaluate, and revise research decisions using
evidence, reasoning, context, and reflection.

### 7.10 Decision Quality

A reasoned assessment of how well a decision reflects evidence, coherence,
appropriateness, transparency, and awareness of limitations.

Decision quality is distinct from whether the eventual outcome is favourable.

---

## 8. Learner Development Terms

### 8.1 Scholarly Development

The progressive growth of a learner's research understanding, judgement,
methodological competence, reflective practice, and independence.

### 8.2 Scholarly Capability

A learner's demonstrated ability to perform a meaningful aspect of research
thinking or practice.

### 8.3 Development Dimension

A governed area of scholarly development.

Examples include:

- research understanding;
- critical thinking;
- research judgement;
- methodological competence;
- reflective practice;
- research independence.

### 8.4 Development Level

A classified stage of capability within a development dimension.

The current foundational levels are:

- Guided;
- Emerging;
- Developing;
- Independent;
- Scholarly Leadership.

### 8.5 Capability Indicator

Observable evidence relevant to estimating scholarly capability.

### 8.6 Growth Opportunity

An area where targeted learning or mentoring may improve scholarly capability.

A growth opportunity is not a personal deficiency label.

### 8.7 Research Independence

The demonstrated ability to make and justify appropriate research decisions
with decreasing reliance on direct guidance.

### 8.8 Critical Thinking

The disciplined examination of claims, evidence, assumptions, alternatives,
relationships, and implications.

### 8.9 Reflective Practice

The intentional examination of experience, reasoning, feedback, and outcomes to
improve future understanding and action.

### 8.10 Cognitive Pathway

A recurring pattern through which a learner explores, evaluates, decides,
revises, and integrates research understanding.

A cognitive pathway is descriptive and adaptive, not a permanent personality
classification.

---

## 9. Learner State Terms

### 9.1 Learner State

A time-bound, evidence-informed representation of a learner's current
educational condition for the purpose of adaptive mentoring.

Learner State is not a permanent profile and does not represent personal worth.

### 9.2 Learner State Observation

A recorded learner action, response, decision, reflection, or other evidence
that may inform learner-state interpretation.

### 9.3 Learner State Inference

A reasoned system interpretation derived from one or more observations.

An inference must remain distinguishable from an observation or supervisor
confirmation.

### 9.4 Learner State Component

A governed part of the learner state, such as development level, confidence,
uncertainty, pathway, strength, or growth opportunity.

### 9.5 State Transition

A traceable change from one learner state or state component value to another.

### 9.6 Confidence Indicator

Evidence suggesting the learner's expressed or demonstrated level of confidence
in relation to a particular research matter.

Confidence is not equivalent to correctness or competence.

### 9.7 Uncertainty Indicator

Evidence suggesting unresolved doubt, ambiguity, inconsistency, or lack of
clarity relevant to a research decision or capability.

### 9.8 Strength

An evidence-supported scholarly capability currently demonstrated by the
learner.

### 9.9 Readiness

An evidence-informed judgement that the learner or project is sufficiently
prepared for a particular next action.

Readiness must always identify what the learner is ready for.

### 9.10 Learner Profile

A broader collection of relatively stable and historical learner information.

A learner profile is distinct from the time-bound learner state.

---

## 10. Mentoring Terms

### 10.1 Mentoring

An educational process that supports the learner in developing scholarly
capability and research independence.

### 10.2 Mentoring Need

An evidence-informed educational need that may be addressed through a mentoring
intervention.

### 10.3 Mentoring Episode

A governed unit of mentoring activity that begins with an identified need and
records intervention selection, delivery, learner response, and evaluation.

### 10.4 Mentoring Intervention

A deliberate educational action selected to advance learning, judgement,
reflection, or independence.

### 10.5 Intervention Type

A governed category of mentoring intervention.

Examples include:

- Socratic Questioning;
- Concept Clarification;
- Literature Exploration;
- Critical Comparison;
- Methodology Guidance;
- Research Design Review;
- Reflective Prompting;
- Progress Planning;
- Supervisor Escalation.

### 10.6 Intervention Rationale

The explicit explanation of why a particular mentoring intervention was
selected.

### 10.7 Expected Learning Outcome

The intended educational change expected from a mentoring intervention.

### 10.8 Learner Response

The learner's observable reaction, reasoning, action, or reflection following an
intervention.

### 10.9 Intervention Evaluation

A reasoned assessment of whether and how an intervention contributed to its
expected learning outcome.

### 10.10 Adaptive Mentoring

The selection and adjustment of mentoring interventions in response to learner
state, research context, previous interactions, and educational objectives.

Adaptation changes guidance, not academic standards.

### 10.11 Socratic Questioning

A mentoring intervention using sequenced questions to help the learner examine
assumptions, evidence, alternatives, and implications.

### 10.12 Supervisor Escalation

A formal action that refers an issue, uncertainty, risk, or decision to an
authorised supervisor.

Escalation is not failure; it is a governed recognition of authority boundaries.

---

## 11. Reflection and Feedback Terms

### 11.1 Reflection

A learner's intentional examination of experience, reasoning, evidence,
feedback, or outcomes.

### 11.2 Reflection Record

The persistent representation of a learner's reflection at a particular time.

### 11.3 Reflection Prompt

A question or structured stimulus intended to initiate or deepen reflection.

### 11.4 Learning Insight

A new or revised understanding produced through reflection, feedback, evidence,
or mentoring.

### 11.5 Feedback

Information provided to support understanding, improvement, correction, or
future action.

### 11.6 Feedback Source

The origin of feedback, such as:

- learner self-reflection;
- BRM mentoring;
- supervisor;
- peer;
- assessor;
- institutional process.

### 11.7 Feedback Category

The educational area addressed by feedback.

Examples include conceptual understanding, research judgement, methodological
reasoning, critical evaluation, scholarly communication, and planning.

### 11.8 Action Commitment

A learner's stated intention to undertake a specific next action in response to
reflection or feedback.

### 11.9 Feedback Loop

The sequence through which feedback is received, interpreted, acted upon,
reviewed, and incorporated into future learning or decisions.

---

## 12. Supervision and Authority Terms

### 12.1 Supervision Relationship

The governed academic relationship linking a learner, one or more supervisors,
a research project, and defined responsibilities.

### 12.2 Supervisor Review

A supervisor's examination of a research decision, output, state, concern, or
request.

### 12.3 Supervisor Decision

A recorded academic decision made by an authorised supervisor.

### 12.4 Supervisor Confirmation

A supervisor's recorded agreement that a proposed decision or interpretation is
acceptable within the relevant scope.

### 12.5 Approval

A formal decision issued by a person or body with explicit authority.

The word approval must always identify:

- who approved;
- what was approved;
- under which authority;
- when approval occurred;
- the approval's scope and conditions.

### 12.6 Recommendation

A non-binding proposed course of action supported by rationale.

A recommendation is never equivalent to approval.

### 12.7 Override

An authorised decision that replaces the operational effect of a prior system
recommendation or derived result while preserving the original record.

### 12.8 Academic Authority

The formally delegated power to make specified academic decisions.

### 12.9 Escalation

The referral of a matter to a role or body with greater or more appropriate
authority.

### 12.10 Concern

A recorded issue requiring attention, review, clarification, or action.

A concern may relate to progress, ethics, academic integrity, research quality,
wellbeing, supervision, or institutional compliance.

---

## 13. Institutional Governance Terms

### 13.1 Program

A formally governed course of study or research enrolment structure.

### 13.2 Program Requirement

A condition that a learner or project must satisfy within a program.

### 13.3 Research Policy

An institutional rule or principle governing research conduct, supervision,
ethics, assessment, or progression.

### 13.4 Institutional Rule

A configured and versioned requirement applied within a defined institutional
context.

### 13.5 Ethics Requirement

A requirement governing ethical review, approval, conduct, data management,
participant protection, or reporting.

### 13.6 Ethics Approval

A formal decision issued by an authorised ethics body.

BRM may support preparation and tracking but must not represent its own
recommendation as ethics approval.

### 13.7 Assessment Requirement

A formal requirement relating to the evaluation of research work or progression.

### 13.8 Academic Milestone

A program-defined point at which progress, quality, readiness, or compliance is
formally reviewed.

### 13.9 Governance Decision

A formally recorded decision affecting institutional, program, educational, or
system governance.

### 13.10 Educational Decision Record

A governed record documenting a significant decision about educational
philosophy, models, principles, or practice.

### 13.11 Architecture Decision Record

A governed record documenting a significant architectural decision, its context,
alternatives, rationale, and consequences.

---

## 14. Knowledge and Evidence Terms

### 14.1 Source

An identifiable origin of information or evidence.

### 14.2 Literature Record

A structured representation of a scholarly source and its relevant metadata.

### 14.3 Evidence Item

A discrete item used to support, challenge, qualify, or contextualise a claim or
decision.

### 14.4 Evidence Claim

A statement asserting what an evidence item supports or indicates.

### 14.5 Research Claim

A statement proposed or advanced within the research project.

### 14.6 Claim Status

The governed condition of a claim.

Suggested statuses include:

- Proposed;
- Supported;
- Contested;
- Qualified;
- Rejected;
- Superseded.

### 14.7 Provenance

Information describing the origin, authorship, transformation, timing, and
history of a record, claim, decision, or inference.

### 14.8 Provenance Record

The persistent representation of provenance information.

### 14.9 Validation

A governed process for determining whether evidence, behaviour, output, or a
model satisfies defined criteria.

### 14.10 Validation Status

The current outcome of a validation process.

Suggested statuses include:

- Not Evaluated;
- Under Review;
- Provisionally Validated;
- Validated;
- Rejected;
- Superseded.

### 14.11 Knowledge Relationship

A typed connection between domain concepts, claims, evidence, theories, methods,
or research constructs.

### 14.12 Evidence Strength

A reasoned assessment of the degree to which evidence supports a specified
claim in a particular context.

Evidence strength must not be treated as a universal property detached from the
claim and context.

---

## 15. Coherence Terms

### 15.1 Research Coherence

The degree to which major research constructs, decisions, evidence, and methods
align logically and methodologically.

### 15.2 Coherence Relationship

A typed relationship showing how one research construct affects another.

Recommended relationship terms include:

- supports;
- depends on;
- constrains;
- justifies;
- refines;
- generates;
- operationalises;
- tests;
- informs;
- contradicts;
- validates;
- limits.

### 15.3 Coherence Issue

A traceable inconsistency, omission, conflict, unsupported relationship, or
misalignment within the research project.

### 15.4 Coherence Assessment

A reasoned evaluation of selected research relationships against explicit
criteria.

### 15.5 Missing Link

An expected but absent relationship between research constructs.

### 15.6 Unsupported Claim

A claim for which sufficient relevant evidence or reasoning has not been
identified.

### 15.7 Methodological Fit

The degree to which a research method is appropriate for the research question,
paradigm, evidence needs, and context.

### 15.8 Theoretical Fit

The degree to which a theory appropriately supports the research problem,
questions, constructs, and intended explanation.

---

## 16. System Reasoning Terms

### 16.1 Observation

A recorded fact about an interaction, action, response, state, or external
condition.

### 16.2 Inference

A reasoned interpretation derived from observations, rules, evidence, or models.

### 16.3 Derived Insight

A non-authoritative conclusion produced by processing domain information.

### 16.4 Recommendation

A non-binding proposed next action accompanied by rationale and relevant
evidence.

### 16.5 Explanation

A human-understandable account of why a recommendation, inference, assessment,
or intervention was produced.

### 16.6 Rule

A declared condition and consequence used in governance, validation, workflow,
or reasoning.

### 16.7 Policy

A higher-level principle or decision framework used to select among actions.

### 16.8 Model

A structured representation used to understand, classify, predict, guide, or
evaluate a domain phenomenon.

### 16.9 AI-Generated Material

Material produced substantially by an AI service.

This classification concerns provenance and does not determine whether the
material is academically permissible.

### 16.10 Learner-Authored Material

Material produced by the learner and identified as their own contribution.

### 16.11 Supervisor-Authored Material

Material produced by a supervisor.

### 16.12 System-Generated Record

A structured operational record created automatically by BRM.

A system-generated record is not necessarily AI-generated material.

---

## 17. Progress and Analytics Terms

### 17.1 Progress

A traceable change toward a defined educational, research, milestone, or
workflow objective.

The term progress must identify the dimension being measured.

### 17.2 Educational Progress

Change in scholarly capability, judgement, reflection, or independence.

### 17.3 Project Progress

Change in the state, completeness, coherence, or validation of a research
project.

### 17.4 Milestone Progress

Movement toward satisfying a formal milestone requirement.

### 17.5 Activity Completion

The recorded completion of a task or activity.

Activity completion is not equivalent to educational progress.

### 17.6 Indicator

A measurable or observable signal relevant to interpretation.

### 17.7 Metric

A defined quantitative measurement with a specified calculation method.

### 17.8 Score

A numerical representation produced by an explicit scoring model.

Scores must identify:

- the construct measured;
- the scale;
- the calculation;
- the evidence used;
- uncertainty and limitations;
- whether the score is authoritative or derived.

### 17.9 Insight

A meaningful interpretation of data or evidence intended to support
understanding or action.

### 17.10 Dashboard

A presentation layer that summarises selected domain information.

A dashboard does not own authoritative domain data.

---

## 18. Lifecycle and Record Terms

### 18.1 Draft

A record or decision that is incomplete, revisable, and not yet formally
proposed or accepted.

### 18.2 Proposed

A record or decision submitted for consideration.

### 18.3 Under Review

A state indicating active examination by an authorised person or process.

### 18.4 Confirmed

A state indicating that an authorised reviewer has explicitly endorsed a record
within a defined scope.

### 18.5 Approved

A state resulting from a formal decision by an authorised person or body.

### 18.6 Superseded

A historical record replaced by a newer authoritative record while remaining
available for traceability.

### 18.7 Withdrawn

A proposed record or decision intentionally removed from active consideration.

### 18.8 Archived

A retained record no longer active in ordinary workflows.

### 18.9 Version

An identified state of a governed record at a particular point in its evolution.

### 18.10 History

The ordered record of relevant changes, decisions, authorship, and status
transitions.

---

## 19. Distinctions That Must Be Preserved

The following terms must never be treated as interchangeable:

| Term A | Term B | Required Distinction |
|---|---|---|
| Learner | Student | Educational role vs institutional status |
| Observation | Inference | Recorded fact vs interpreted meaning |
| Recommendation | Approval | Non-binding advice vs authorised decision |
| Confidence | Competence | Self-belief or expressed certainty vs demonstrated capability |
| Completion | Learning | Finished activity vs educational development |
| Output | Outcome | Produced artefact vs resulting change |
| Research Stage | Milestone | Work condition vs formal checkpoint |
| Conceptual Framework | Theory | Study-specific structure vs explanatory system |
| Variable | Theme | Quantitative measure vs qualitative patterned meaning |
| Feedback | Assessment | Improvement-oriented information vs formal evaluation |
| Learner State | Learner Profile | Time-bound educational condition vs broader record |
| AI-Generated Material | System-Generated Record | Generated substantive material vs automated structured record |
| Validation | Approval | Criteria-based evaluation vs authorised decision |
| Research Gap | Unstudied Topic | Evidence-supported unresolved issue vs simple absence claim |
| Project Progress | Educational Progress | Research advancement vs learner development |

---

## 20. Deprecated or Discouraged Language

The following language is discouraged unless explicitly qualified:

### 20.1 “The AI Decided”

Preferred alternatives:

- BRM recommended;
- BRM inferred;
- the intervention policy selected;
- the coherence assessment identified.

### 20.2 “The Student Failed”

Preferred alternatives:

- the requirement was not satisfied;
- the evidence was insufficient;
- the decision requires revision;
- a growth opportunity was identified.

Formal failure decisions must be attributed to the authorised institutional
assessment process.

### 20.3 “Research Complete”

Preferred alternatives should identify the relevant scope:

- proposal completed;
- data collection completed;
- milestone satisfied;
- thesis submitted.

Research as learning and inquiry may continue beyond a formal output.

### 20.4 “Automatic Approval”

BRM must not use this term for academic, ethical, or governance decisions unless
a lawful and explicitly delegated institutional process genuinely provides such
authority.

### 20.5 “Weak Student”

Preferred alternatives:

- learner requires guidance in a specified capability;
- evidence indicates a development need;
- the current learner state shows a growth opportunity.

---

## 21. Context Ownership of Terms

| Term Group | Primary Owning Context |
|---|---|
| Learner State, Development Level, Capability Indicator | Learner Development Context |
| Research Project, Research Construct, Research Decision | Research Design Context |
| Mentoring Need, Intervention, Intervention Evaluation | Mentoring Context |
| Supervisor Review, Approval, Escalation | Supervision Context |
| Program, Policy, Ethics Requirement, Milestone | Institutional Governance Context |
| Source, Evidence Item, Claim, Provenance | Knowledge and Evidence Context |
| Progress View, Metric, Dashboard Insight | Progress and Insight Context |

Ownership does not prevent other contexts from referencing a term through an
explicit contract.

---

## 22. Glossary Change Process

A proposed glossary change should include:

1. the term;
2. the current definition;
3. the proposed definition;
4. the reason for change;
5. affected documents and contexts;
6. compatibility implications;
7. required decision record;
8. migration guidance where relevant.

Minor editorial clarifications may be approved through document revision.
Material semantic changes require formal governance.

---

## 23. Validation Rules

The glossary is considered successfully adopted when:

- domain specifications use governed terms consistently;
- system interfaces avoid ambiguous substitutions;
- AI prompts and outputs preserve authority distinctions;
- tests use domain language rather than technical shorthand;
- reports distinguish observation, inference, recommendation, and approval;
- entity, event, policy, and command names follow naming conventions;
- contradictions are resolved through governance rather than local invention.

---

## 24. Acceptance Criteria

BRMF-202 may progress from Draft to Approved when:

- all foundational BRMF-201 concepts have governed definitions;
- educational and institutional meanings are clearly separated;
- cross-context terms have explicit ownership or qualification;
- prohibited ambiguities are identified;
- naming conventions are accepted;
- the glossary is suitable for use in domain modelling and implementation.

---

## 25. Next Specification

The next recommended document is:

**BRMF-203 — Learner and Scholarly Development Domain Model**

It will define the entities, value objects, aggregate boundaries, state
transitions, domain services, policies, and events associated with learner
development.

---

**End of BRMF-202**
