# BRMF-209 — Supervision, Review, and Academic Governance Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207, BRMF-208  
**Prepares:** BRMF-210, BRMF-211

---

## 1. Purpose

This document defines the domain model for supervision relationships, authority
roles, delegated authority, review requests, academic reviews, governed feedback,
recommendations, academic decisions, approvals, revision requirements,
disagreements, appeals, escalation, committee governance, program oversight,
academic-integrity referrals, ethics referrals, supervision workload visibility,
and institutional accountability within the Business Research Mentor (BRM).

It establishes the Scholarly Authority Engine and Governance Graph as first-class
platform capabilities.

The model ensures that recommendations, reviews, approvals, rejections,
escalations, and overrides are made only by actors with appropriate authority for
the relevant context.

---

## 2. Core Principle

People and authority are not the same domain object.

A person may hold multiple roles.

A role may hold different authority in different contexts.

Authority may be delegated, constrained, suspended, revoked, or superseded.

The canonical governance flow is:

Authority Requirement  
→ Review Request  
→ Review Assignment  
→ Academic Review  
→ Feedback  
→ Recommendation  
→ Academic Decision  
→ Learner Response  
→ Revision  
→ Re-review or Closure

The central aggregate is:

`AcademicReview`

The governing question is:

> Who is authorised to review, recommend, decide, approve, reject, escalate,
> revise, or override this matter?

---

## 3. Constitutional Role

BRM supports academic governance.

BRM does not possess formal academic authority.

BRM may:

- identify when formal review is required;
- prepare review dossiers;
- match matters to appropriate authority roles;
- record delegated authority;
- surface unresolved disagreement;
- prepare revision responses;
- track review and appeal status;
- preserve the rationale and provenance of decisions;
- notify authorised stakeholders.

BRM must not:

- approve a research proposal formally;
- reject a student formally;
- award grades;
- fail a learner;
- approve ethics;
- impose disciplinary penalties;
- impersonate a supervisor or committee;
- invent institutional policy;
- treat AI recommendation as binding authority;
- conceal disagreement or superseded decisions.

---

## 4. Bounded Context

### 4.1 Context name

**Supervision, Review, and Academic Governance Context**

### 4.2 Responsibilities

The context owns:

- Authority Role;
- Authority Scope;
- Authority Assignment;
- Delegation;
- Supervision Relationship;
- Supervision Agreement;
- Supervision Meeting;
- Review Request;
- Review Assignment;
- Academic Review;
- Review Finding;
- Feedback;
- Recommendation;
- Academic Decision;
- Approval;
- Rejection;
- Revision Requirement;
- Disagreement;
- Appeal;
- Governance Escalation;
- Committee Review;
- Program Governance Record;
- Academic-Integrity Referral;
- Ethics Referral;
- Workload Visibility Record;
- Scholarly Authority Engine;
- Governance Graph.

### 4.3 Responsibilities excluded

The context does not own:

- learner identity;
- staff identity;
- institutional directory;
- Research Project lifecycle;
- Research Decision lifecycle;
- Knowledge Source or Evidence identity;
- Educational Intervention;
- formal payroll or workload allocation;
- legal adjudication;
- institutional case-management implementation;
- external ethics committee systems.

---

## 5. Aggregate Architecture

BRMF-209 defines the following collaborating aggregate roots:

1. Authority Role
2. Authority Assignment
3. Supervision Relationship
4. Review Request
5. Academic Review
6. Academic Decision
7. Disagreement
8. Appeal
9. Governance Escalation
10. Governance Graph

The central aggregate is:

`AcademicReview`

Academic Review connects authority, evidence, feedback, recommendation, decision,
revision, appeal, and governance provenance.

---

## 6. Governed Scholarly Object Conformance

Major governance objects must support, where applicable:

- stable identity;
- lifecycle;
- institutional context;
- authority attribution;
- actor attribution;
- provenance;
- evidence references;
- review;
- revision;
- supersession;
- appealability;
- traceability;
- domain events.

The pattern must not force implementation inheritance.

---

## 7. Authority Role Aggregate

### 7.1 Identity

`AuthorityRoleId`

### 7.2 Purpose

An Authority Role represents a governed institutional or scholarly role capable
of acting within defined authority scopes.

### 7.3 Role types

- Learner;
- Principal Supervisor;
- Associate Supervisor;
- Co-Supervisor;
- Research Methods Advisor;
- Statistician;
- Qualitative Methods Advisor;
- Librarian;
- Industry Mentor;
- Program Director;
- Research Coordinator;
- Head of School;
- Research Committee Member;
- Research Committee Chair;
- Ethics Committee Member;
- Ethics Committee Chair;
- Academic Integrity Officer;
- Accessibility Officer;
- Graduate Research Officer;
- External Examiner;
- Internal Examiner;
- Appeals Committee Member;
- Institutional Administrator;
- AI Mentor;
- System Service.

### 7.4 Attributes

- Authority Role Id;
- Role Type;
- Institution Id;
- Program Id, optional;
- Description;
- Default Authority Scopes;
- Constraints;
- Required Qualifications;
- Conflict-of-Interest Rules;
- Delegation Rules;
- Status;
- Effective Period;
- Provenance.

### 7.5 Rules

- Authority belongs to a role in context, not merely to a person.
- AI Mentor and System Service roles have no formal academic authority.
- Role existence does not automatically create an active assignment.
- Authority scopes must be explicit.
- Institutional policy may constrain the same role differently across programs.

---

## 8. Authority Scope

Authority Scope defines what actions a role may take and under what conditions.

### 8.1 Scope dimensions

- Educational;
- Supervisory;
- Conceptual;
- Theoretical;
- Methodological;
- Statistical;
- Ethical;
- Academic Integrity;
- Administrative;
- Assessment;
- Progression;
- Examination;
- Appeals;
- Institutional Governance;
- Data Access;
- Approval;
- Delegation;
- Escalation.

### 8.2 Attributes

- Authority Scope Id;
- Role Type;
- Action Type;
- Object Type;
- Research Stage;
- Program;
- Institution;
- Decision Type;
- Binding Status;
- Conditions;
- Exclusions;
- Escalation Destination;
- Effective Period;
- Policy Reference;
- Provenance.

### 8.3 Binding status

- Advisory;
- Recommendatory;
- Conditionally Binding;
- Binding;
- Final within Scope;
- Subject to Ratification;
- Subject to Appeal;
- Informational Only.

### 8.4 Rules

- Authority must be evaluated against action, object, stage, and context.
- Advisory authority must not be represented as binding authority.
- Final authority must be explicitly granted.
- Absence of authority must not be interpreted as permission.
- Conflicts among scopes must be escalated or resolved by policy.

---

## 9. Authority Assignment Aggregate

### 9.1 Identity

`AuthorityAssignmentId`

### 9.2 Purpose

An Authority Assignment links an actor to an Authority Role in a defined context
and effective period.

### 9.3 Attributes

- Authority Assignment Id;
- Actor Id;
- Authority Role Id;
- Institution Id;
- Program Id;
- Research Project Id, optional;
- Supervision Relationship Id, optional;
- Assigned Scopes;
- Effective From;
- Effective Until;
- Appointing Authority;
- Conditions;
- Conflict-of-Interest Status;
- Status;
- Provenance.

### 9.4 Status

- Proposed;
- Active;
- Suspended;
- Expired;
- Revoked;
- Superseded;
- Closed.

### 9.5 Rules

- Every binding action must reference an active Authority Assignment.
- Expired or revoked assignments cannot authorise new decisions.
- Historical decisions retain the assignment valid at decision time.
- Conflict-of-interest status may restrict or suspend action.
- Authority Assignment does not transfer personal identity ownership to BRM.

---

## 10. Delegation

Delegation transfers a defined portion of authority from one active assignment to
another authorised actor or role.

### 10.1 Attributes

- Delegation Id;
- Delegating Assignment;
- Receiving Assignment or Role;
- Delegated Scope;
- Purpose;
- Conditions;
- Effective From;
- Effective Until;
- Revocation Conditions;
- Ratification Requirement;
- Status;
- Provenance.

### 10.2 Status

- Proposed;
- Active;
- Suspended;
- Revoked;
- Expired;
- Completed;
- Superseded.

### 10.3 Rules

- An actor cannot delegate authority they do not hold.
- Delegation cannot exceed the delegator's scope.
- Non-delegable authority must remain non-delegable.
- Delegation must preserve origin and limits.
- Sub-delegation requires explicit permission.
- Revocation does not erase actions validly taken before revocation.
- Delegation must not be inferred from informal participation alone.

---

## 11. Supervision Relationship Aggregate

### 11.1 Identity

`SupervisionRelationshipId`

### 11.2 Purpose

A Supervision Relationship represents the governed relationship between a
learner, one or more supervisors, and the relevant program or institution.

### 11.3 Attributes

- Supervision Relationship Id;
- Learner Id;
- Research Project Id;
- Principal Supervisor Assignment;
- Additional Supervisor Assignments;
- Program Id;
- Institution Id;
- Commencement Date;
- Expected End Date;
- Supervision Mode;
- Meeting Expectations;
- Review Expectations;
- Communication Expectations;
- Authority Boundaries;
- Conflict-Resolution Path;
- Accessibility Arrangements;
- Status;
- Provenance.

### 11.4 Supervision modes

- Individual;
- Panel;
- Team;
- Co-Supervision;
- Industry-Academic;
- Remote;
- Hybrid;
- Cohort-Based.

### 11.5 Status

- Proposed;
- Active;
- Under Review;
- Suspended;
- Reassigned;
- Completed;
- Terminated;
- Archived.

### 11.6 Rules

- Supervision relationship does not grant unlimited authority.
- Supervisor authority remains constrained by policy and scope.
- Learner and supervisor contributions must remain attributable.
- Relationship changes must not rewrite historical reviews.
- Supervisory disagreement may coexist and must be governed explicitly.

---

## 12. Supervision Agreement

A Supervision Agreement records expectations and working arrangements.

### Attributes

- Supervision Agreement Id;
- Supervision Relationship Id;
- Meeting Frequency;
- Feedback Expectations;
- Turnaround Expectations;
- Communication Channels;
- Learner Responsibilities;
- Supervisor Responsibilities;
- Intellectual Contribution Rules;
- AI Use Expectations;
- Authorship Expectations;
- Data and Confidentiality Rules;
- Conflict-Resolution Process;
- Review Date;
- Acceptance Records;
- Version;
- Provenance.

### Rules

- Agreements must not override institutional policy.
- Material changes create a new version.
- Acceptance by all required parties must be traceable.
- AI use expectations must preserve learner authorship and integrity.

---

## 13. Supervision Meeting

A Supervision Meeting is a governed interaction related to research progress,
review, mentoring, decision, or escalation.

### Attributes

- Supervision Meeting Id;
- Supervision Relationship Id;
- Participants;
- Scheduled Time;
- Actual Time;
- Purpose;
- Agenda;
- Evidence Dossier References;
- Decisions Discussed;
- Feedback Given;
- Recommendations;
- Actions;
- Open Disagreements;
- Follow-Up Date;
- Status;
- Provenance.

### Rules

- Meeting occurrence alone does not establish effective supervision.
- Meeting records should distinguish discussion, recommendation, and decision.
- Participants must be attributable.
- Confidential or restricted content must remain access controlled.

---

## 14. Review Request Aggregate

### 14.1 Identity

`ReviewRequestId`

### 14.2 Purpose

A Review Request represents a governed request for evaluation by an actor holding
the required authority.

### 14.3 Attributes

- Review Request Id;
- Requester;
- Research Project Id;
- Target Object;
- Review Purpose;
- Review Type;
- Required Authority Scope;
- Evidence Dossier;
- Questions for Reviewer;
- Urgency;
- Due Date;
- Confidentiality;
- Conflict-of-Interest Requirements;
- Assignment Status;
- Review Status;
- Provenance.

### 14.4 Review types

- Conceptual Review;
- Theoretical Review;
- Methodological Review;
- Statistical Review;
- Qualitative Review;
- Evidence Review;
- Framework Review;
- Research Design Review;
- Ethics Review;
- Academic Integrity Review;
- Progress Review;
- Milestone Review;
- Proposal Review;
- Thesis Review;
- Examination Review;
- Administrative Review;
- Appeal Review;
- Accessibility Review.

### 14.5 Rules

- Every Review Request must identify required authority.
- A reviewer must not be assigned outside valid authority scope.
- Conflict-of-interest checks must occur before assignment where required.
- Review purpose must be explicit.
- Urgency must not override authority requirements.

---

## 15. Review Assignment

A Review Assignment links a Review Request to an authorised reviewer or panel.

### Attributes

- Review Assignment Id;
- Review Request Id;
- Reviewer Assignment;
- Panel, optional;
- Authority Validation Result;
- Conflict-of-Interest Result;
- Assigned At;
- Due Date;
- Acceptance Status;
- Delegation Reference;
- Status;
- Provenance.

### Status

- Proposed;
- Assigned;
- Accepted;
- Declined;
- Reassigned;
- In Progress;
- Completed;
- Cancelled.

### Rules

- Authority validation must precede active assignment.
- Declining a review must not be treated as adverse judgement.
- Reassignment must preserve prior assignment history.
- Panel assignments must preserve individual and collective authority.

---

## 16. Academic Review Aggregate

### 16.1 Identity

`AcademicReviewId`

### 16.2 Purpose

An Academic Review is a governed evaluation of a scholarly, educational,
methodological, ethical, administrative, or institutional matter.

### 16.3 Responsibilities

The aggregate governs:

- reviewer authority;
- scope;
- evidence examined;
- criteria;
- findings;
- feedback;
- recommendations;
- limitations;
- conflicts;
- review quality;
- status;
- provenance.

### 16.4 Attributes

- Academic Review Id;
- Review Request Id;
- Review Assignment Id;
- Reviewer;
- Authority Assignment;
- Review Scope;
- Review Criteria;
- Evidence Examined;
- Objects Examined;
- Findings;
- Feedback References;
- Recommendation References;
- Unresolved Questions;
- Limitations;
- Conflict-of-Interest Declaration;
- Review Quality Assessment;
- Review Outcome;
- Completed At;
- Status;
- Semantic Version;
- Provenance.

### 16.5 Review outcomes

- Satisfactory;
- Satisfactory with Qualification;
- Revision Recommended;
- Revision Required;
- Further Evidence Required;
- Further Review Required;
- Not Satisfactory;
- Outside Reviewer Scope;
- Conflict Identified;
- Escalation Required;
- Indeterminate.

### 16.6 Status

- Draft;
- In Progress;
- Submitted;
- Under Clarification;
- Completed;
- Reopened;
- Superseded;
- Withdrawn;
- Archived.

### 16.7 Rules

- Review findings must remain within reviewer authority scope.
- Review evidence and criteria must be identifiable.
- A review does not automatically create a binding decision.
- Review limitations must remain visible.
- Reviews may be revised but not silently rewritten.
- Multiple reviews may coexist.
- Reviewer disagreement must not be flattened into a false consensus.

---

## 17. Review Finding

A Review Finding is a bounded conclusion produced within an Academic Review.

### Attributes

- Review Finding Id;
- Academic Review Id;
- Finding Type;
- Statement;
- Target Object;
- Evidence References;
- Criteria References;
- Severity;
- Confidence;
- Required Action;
- Status;
- Provenance.

### Finding types

- Strength;
- Weakness;
- Inconsistency;
- Misalignment;
- Insufficient Evidence;
- Methodological Concern;
- Conceptual Concern;
- Ethical Concern;
- Integrity Concern;
- Governance Concern;
- Accessibility Concern;
- Administrative Concern;
- Approval Condition;
- Revision Requirement;
- Information Request;
- Commendation.

---

## 18. Feedback Aggregate

### 18.1 Identity

`FeedbackId`

### 18.2 Purpose

Feedback is a governed communication intended to support understanding,
improvement, correction, decision-making, or compliance.

It is not merely unstructured comment text.

### 18.3 Feedback types

- Conceptual;
- Theoretical;
- Methodological;
- Statistical;
- Qualitative;
- Evidence;
- Reasoning;
- Research Design;
- Writing;
- Structure;
- Ethics;
- Academic Integrity;
- Reflection;
- Project Management;
- Supervisor Discussion;
- Administrative;
- Encouragement;
- Warning;
- Clarification;
- Revision Guidance.

### 18.4 Attributes

- Feedback Id;
- Review Id or Meeting Id;
- Author;
- Authority Context;
- Recipient;
- Target Object;
- Feedback Type;
- Feedback Statement;
- Rationale;
- Evidence References;
- Priority;
- Actionability;
- Binding Status;
- Due Date, optional;
- Learner Response;
- Status;
- Provenance.

### 18.5 Rules

- Feedback must remain distinct from Recommendation and Decision.
- Binding status must be explicit.
- Feedback should identify the object or issue addressed.
- Contradictory feedback may coexist.
- AI-generated feedback must be labelled and non-binding.
- Encouragement must not conceal material concern.

---

## 19. Recommendation Aggregate

### 19.1 Identity

`RecommendationId`

### 19.2 Purpose

A Recommendation is an advised course of action that may be considered by an
authorised decision-maker.

### 19.3 Attributes

- Recommendation Id;
- Source Review;
- Recommender;
- Authority Context;
- Target Decision;
- Recommendation Type;
- Recommended Action;
- Rationale;
- Evidence References;
- Conditions;
- Alternatives;
- Risks;
- Binding Status;
- Status;
- Provenance.

### 19.4 Recommendation types

- Approve;
- Approve with Conditions;
- Revise;
- Reject;
- Defer;
- Seek Further Evidence;
- Seek Specialist Review;
- Escalate;
- Continue;
- Pause;
- Withdraw;
- Reassign;
- Refer to Ethics;
- Refer to Academic Integrity;
- Refer to Accessibility Support.

### 19.5 Rules

- Recommendations are non-binding unless policy explicitly grants otherwise.
- Recommendation status must not be represented as decision status.
- AI recommendations are always advisory.
- Decision-makers may reject recommendations but must preserve rationale where
  governance requires it.

---

## 20. Academic Decision Aggregate

### 20.1 Identity

`AcademicDecisionId`

### 20.2 Purpose

An Academic Decision records a binding or formally recognised determination made
by an authorised actor or body.

### 20.3 Attributes

- Academic Decision Id;
- Decision Type;
- Decision Maker;
- Authority Assignment;
- Target Object;
- Research Project Id;
- Related Review Requests;
- Academic Reviews;
- Recommendations;
- Evidence Dossier;
- Decision;
- Rationale;
- Conditions;
- Effective Date;
- Expiry or Review Date;
- Appealability;
- Appeal Deadline;
- Notification Requirements;
- Supersedes Decision;
- Status;
- Provenance.

### 20.4 Decision types

- Topic Approval;
- Proposal Approval;
- Research Question Approval;
- Methodology Approval;
- Milestone Outcome;
- Ethics Determination;
- Academic Integrity Determination;
- Progression Decision;
- Candidature Decision;
- Extension Decision;
- Leave Decision;
- Supervisor Appointment;
- Supervisor Reassignment;
- Examination Outcome;
- Revision Outcome;
- Appeal Outcome;
- Administrative Determination.

### 20.5 Decision values

- Approved;
- Approved with Conditions;
- Revision Required;
- Deferred;
- Rejected;
- Escalated;
- Withdrawn;
- Superseded;
- No Decision;
- Outside Authority.

### 20.6 Rules

- Every binding decision must reference valid authority.
- Decision authority must be evaluated at decision time.
- Decision rationale must be preserved.
- Decision status must remain distinct from recommendation.
- Supersession does not erase the original decision.
- Appeal rights must be explicit where applicable.
- BRM cannot be the formal decision-maker.

---

## 21. Approval

Approval is a formal decision state, not a generic expression of support.

### Attributes

- Approval Id;
- Academic Decision Id;
- Approved Object;
- Scope;
- Conditions;
- Effective Date;
- Expiry or Review Date;
- Approving Authority;
- Ratification Requirement;
- Status;
- Provenance.

### Rules

- Conditional approval must preserve all conditions.
- Approval outside authority is invalid or requires ratification.
- Approval of one object must not imply approval of unrelated objects.
- Expired approval must remain historically visible.

---

## 22. Rejection

Rejection is a formal decision state requiring authority and rationale.

### Attributes

- Rejection Id;
- Academic Decision Id;
- Rejected Object;
- Rationale;
- Evidence;
- Criteria;
- Revision or Resubmission Rights;
- Appeal Rights;
- Notification;
- Provenance.

### Rules

- Rejection must not be generated by BRM.
- Rejection must preserve resubmission and appeal conditions where applicable.
- Review criticism alone is not formal rejection.

---

## 23. Revision Requirement

A Revision Requirement is a governed condition requiring changes before further
review or approval.

### Attributes

- Revision Requirement Id;
- Originating Review or Decision;
- Target Object;
- Required Change;
- Rationale;
- Evidence or Criterion;
- Priority;
- Mandatory or Advisory;
- Responsible Actor;
- Due Date;
- Completion Evidence;
- Verification Method;
- Status;
- Provenance.

### Status

- Open;
- In Progress;
- Submitted;
- Verified;
- Partially Satisfied;
- Not Satisfied;
- Waived;
- Superseded;
- Closed.

### Rules

- Mandatory and advisory revisions must remain distinct.
- Completion must be verified by the appropriate authority.
- Revision requirements must not silently expand.
- Waiver requires authorised rationale.

---

## 24. Disagreement Aggregate

### 24.1 Identity

`DisagreementId`

### 24.2 Purpose

A Disagreement records a substantive conflict among reviews, recommendations,
interpretations, authority claims, or decisions.

### 24.3 Attributes

- Disagreement Id;
- Parties;
- Related Reviews;
- Related Recommendations;
- Related Decisions;
- Disagreement Type;
- Disputed Question;
- Positions;
- Evidence Relied Upon;
- Authority Context;
- Impact;
- Resolution Path;
- Status;
- Provenance.

### 24.4 Disagreement types

- Conceptual;
- Theoretical;
- Methodological;
- Statistical;
- Ethical;
- Integrity;
- Administrative;
- Evidence Interpretation;
- Authority Scope;
- Policy Interpretation;
- Supervisory;
- Examination;
- Procedural.

### 24.5 Status

- Detected;
- Recorded;
- Under Clarification;
- Mediation Requested;
- Escalated;
- Resolved;
- Partially Resolved;
- Preserved as Legitimate Difference;
- Superseded;
- Closed without Resolution.

### 24.6 Rules

- Disagreement must not be overwritten by the latest comment.
- Legitimate scholarly disagreement may remain unresolved.
- Authority determines who can decide, not who is necessarily intellectually
  correct.
- Resolution rationale must be preserved.
- Power imbalance must not be hidden by technical workflow.

---

## 25. Appeal Aggregate

### 25.1 Identity

`AppealId`

### 25.2 Purpose

An Appeal represents a formal request to review a decision or process under
institutional rules.

### 25.3 Attributes

- Appeal Id;
- Appellant;
- Appealed Decision;
- Appeal Grounds;
- Evidence;
- Filing Date;
- Deadline Status;
- Appeal Authority;
- Conflict-of-Interest Checks;
- Review Process;
- Interim Measures;
- Outcome;
- Rationale;
- Status;
- Provenance.

### 25.4 Appeal grounds

- Procedural Error;
- Authority Error;
- New Evidence;
- Misapplication of Policy;
- Conflict of Interest;
- Bias Allegation;
- Inadequate Reasons;
- Disproportionate Outcome;
- Administrative Error;
- Other Permitted Ground.

### 25.5 Rules

- Appeal rights depend on policy and decision type.
- The original decision remains historically visible.
- BRM may prepare but not decide an appeal.
- Appeal bodies must have validated authority.
- Confidentiality and due process must be preserved.

---

## 26. Governance Escalation Aggregate

### 26.1 Identity

`GovernanceEscalationId`

### 26.2 Purpose

A Governance Escalation transfers a matter to a higher or more appropriate
authority when current authority is insufficient, conflicted, disputed, or
unable to resolve the matter.

### 26.3 Escalation types

- Supervisor to Program Director;
- Specialist Method Review;
- Ethics Referral;
- Academic Integrity Referral;
- Committee Review;
- Head of School Review;
- Appeals Referral;
- Accessibility Referral;
- Institutional Policy Clarification;
- Conflict-of-Interest Escalation;
- Workload Risk Escalation;
- Safety or Wellbeing Referral.

### 26.4 Attributes

- Governance Escalation Id;
- Originating Object;
- Trigger;
- Reason;
- Required Authority;
- Destination;
- Urgency;
- Information Shared;
- Consent or Policy Basis;
- Interim Actions;
- Status;
- Outcome;
- Provenance.

### 26.5 Rules

- Escalation must use minimal necessary disclosure.
- Escalation must not be used to bypass valid learner rights.
- Higher organisational position does not automatically imply correct subject
  authority.
- Formal referrals remain subject to institutional policy.
- BRM does not perform clinical or disciplinary adjudication.

---

## 27. Committee Review

A Committee Review represents collective review or decision-making by an
authorised body.

### Attributes

- Committee Review Id;
- Committee;
- Members;
- Chair;
- Quorum Requirement;
- Conflict Declarations;
- Review Request;
- Evidence Dossier;
- Deliberation Record Reference;
- Findings;
- Recommendations;
- Decision;
- Dissenting Views;
- Vote Record, where policy permits;
- Status;
- Provenance.

### Rules

- Quorum and membership requirements must be validated.
- Dissenting views should remain visible where policy permits.
- Collective decisions must identify the governing rule.
- Committee authority must be explicit.
- Confidential deliberation content may be restricted without erasing decision
  provenance.

---

## 28. Program Governance Record

A Program Governance Record represents a policy, rule, requirement, or
determination applicable to a program.

### Attributes

- Program Governance Record Id;
- Institution;
- Program;
- Governance Type;
- Statement;
- Effective Period;
- Authority;
- Policy Source;
- Applicable Stages;
- Applicable Roles;
- Supersedes Record;
- Status;
- Provenance.

### Governance types

- Progression Rule;
- Milestone Rule;
- Supervision Rule;
- Review Requirement;
- Ethics Requirement;
- Integrity Requirement;
- Examination Rule;
- Appeal Rule;
- Data Rule;
- AI Use Rule;
- Workload Rule;
- Accessibility Rule.

---

## 29. Academic-Integrity Referral

An Academic-Integrity Referral records a governed referral of a suspected
integrity matter to the appropriate institutional authority.

### Attributes

- Referral Id;
- Trigger;
- Referring Actor;
- Target Work or Event;
- Observed Concern;
- Evidence;
- Provisional Classification;
- Learner Notification Status;
- Destination Authority;
- Confidentiality;
- Interim Restrictions;
- Status;
- Outcome Reference;
- Provenance.

### Rules

- Referral is not a finding of misconduct.
- BRM may identify risk but cannot determine guilt.
- Suspicions must be distinguished from verified facts.
- Due process and confidentiality must be preserved.
- AI-detection output alone must not be treated as conclusive proof.

---

## 30. Ethics Referral

An Ethics Referral transfers a matter to an ethics authority.

### Attributes

- Ethics Referral Id;
- Research Project Id;
- Trigger;
- Ethical Issue;
- Evidence;
- Risk Level;
- Destination Authority;
- Interim Action;
- Consent and Privacy Considerations;
- Status;
- Outcome Reference;
- Provenance.

### Rules

- BRM cannot issue ethics approval.
- Ethical concerns may require project pause according to policy.
- Institutional ethics authority remains final within scope.
- Informal supervisor approval must not substitute for required ethics approval.

---

## 31. Workload Visibility Record

A Workload Visibility Record provides non-payroll governance visibility into
supervision and review demand.

### Attributes

- Workload Record Id;
- Authority Assignment;
- Period;
- Active Learners;
- Active Reviews;
- Overdue Reviews;
- Upcoming Milestones;
- Escalations;
- Declared Capacity;
- Risk Indicators;
- Visibility Scope;
- Status;
- Provenance.

### Rules

- Workload visibility must not become covert performance surveillance.
- Counts must not be treated as quality measures.
- Sensitive employment data remains outside BRM unless explicitly integrated.
- Workload risk may trigger reassignment or escalation review.
- Learner access to staff workload data must follow policy.

---

## 32. Scholarly Authority Engine

The Scholarly Authority Engine determines whether an actor or body is authorised
to perform a governance action.

### 32.1 Inputs

- actor;
- active Authority Assignments;
- Authority Role;
- requested action;
- target object;
- decision type;
- research stage;
- program;
- institution;
- policy;
- delegation;
- conflict-of-interest status;
- effective date;
- appeal or ratification requirements.

### 32.2 Outputs

- Authorised;
- Authorised with Conditions;
- Advisory Only;
- Ratification Required;
- Delegation Required;
- Conflict Prevents Action;
- Expired Authority;
- Outside Scope;
- No Valid Authority;
- Human Governance Review Required.

The output must include:

- rationale;
- governing authority scope;
- policy reference;
- conditions;
- limitations;
- escalation destination;
- provenance.

### 32.3 Responsibilities

The engine must:

- validate active authority;
- evaluate contextual scope;
- distinguish advisory from binding actions;
- validate delegation;
- detect expired or revoked authority;
- detect conflicts of interest;
- identify ratification needs;
- identify appeal rights;
- suggest authorised reviewers;
- preserve explainability;
- prevent BRM from acquiring formal authority.

### 32.4 Rules

- The engine evaluates authority; it does not make the academic decision.
- Static role labels alone are insufficient.
- Authority must be assessed at the time of action.
- Policy conflicts must be surfaced.
- No opaque score may substitute for authority reasoning.
- Human review is required where authority remains ambiguous.

---

## 33. Governance Graph Aggregate

### 33.1 Identity

`GovernanceGraphId`

### 33.2 Purpose

The Governance Graph represents authority, assignment, delegation, review,
recommendation, decision, disagreement, appeal, committee, policy, escalation,
and supervision relationships.

### 33.3 Node types

- Actor;
- Authority Role;
- Authority Assignment;
- Authority Scope;
- Delegation;
- Learner;
- Supervisor;
- Committee;
- Program;
- Institution;
- Supervision Relationship;
- Review Request;
- Academic Review;
- Feedback;
- Recommendation;
- Academic Decision;
- Revision Requirement;
- Disagreement;
- Appeal;
- Escalation;
- Policy;
- Evidence Dossier;
- Research Project;
- Research Decision.

### 33.4 Edge types

- Holds Role;
- Assigned To;
- Authorised For;
- Delegates To;
- Supervises;
- Requests Review;
- Assigned Review;
- Reviews;
- Provides Feedback;
- Recommends;
- Decides;
- Approves;
- Rejects;
- Requires Revision;
- Appeals;
- Overrides;
- Supersedes;
- Ratifies;
- Escalates To;
- Conflicts With;
- Governed By;
- Applies To;
- Supported By Evidence;
- Notified To;
- Recused From.

### 33.5 Rules

- Every authority edge must have provenance.
- Active and historical authority must remain distinguishable.
- Delegated authority must link to originating authority.
- AI roles must not receive formal decision edges.
- Graph traversal must respect confidentiality.
- Network position must not be interpreted as authority.
- Conflicting authority claims must remain visible until resolved.
- Superseded decisions remain historically traceable.

---

## 34. Relationship to the Existing Architecture

BRMF governance is layered.

### Governance Layer

Authority, review, decision, appeal, escalation, and institutional control.

### Knowledge–Evidence Network

Evidence, claims, interpretations, contradiction, and provenance.

### Operational Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph.

### Research Project

The project is the context in which these layers interact.

The Governance Layer determines who may validate, approve, challenge, supersede,
or override actions and objects in the other domains.

It does not own their internal semantics.

---

## 35. Domain Services

### 35.1 Authority Resolution Service

Determines which roles and assignments are authorised for a requested action.

### 35.2 Reviewer Matching Service

Identifies suitable authorised reviewers based on scope, expertise, availability,
conflict, program, and stage.

### 35.3 Conflict-of-Interest Assessment Service

Evaluates declared and system-observed conflict conditions.

### 35.4 Review Completeness Service

Checks whether review scope, criteria, evidence, findings, and rationale are
sufficiently documented.

### 35.5 Feedback Classification Service

Classifies governed feedback without altering authorship or authority.

### 35.6 Decision Validity Service

Checks authority, evidence references, policy, conditions, effective date, and
appealability.

### 35.7 Disagreement Analysis Service

Maps the sources of disagreement across evidence, method, interpretation,
policy, and authority.

### 35.8 Appeal Eligibility Service

Evaluates appeal rights, deadlines, grounds, and destination authority.

### 35.9 Governance Escalation Service

Identifies appropriate higher or specialist authority.

### 35.10 Workload Risk Service

Identifies review or supervision capacity risk without reducing quality to
counts.

### 35.11 Governance Impact Service

Traces objects, learners, decisions, and processes affected by revoked authority,
superseded policy, overturned decision, or reassigned supervision.

---

## 36. Domain Policies

### 36.1 No AI Formal Authority Policy

BRM and other AI roles may advise, prepare, compare, identify, explain, and
recommend.

They may not formally approve, reject, grade, fail, award, discipline, or
adjudicate.

### 36.2 Contextual Authority Policy

Authority depends on role, assignment, action, object, stage, program,
institution, effective date, delegation, and conflict status.

### 36.3 Review–Decision Separation Policy

Academic Review, Feedback, Recommendation, and Academic Decision remain separate
objects.

### 36.4 Delegation Transparency Policy

Delegated authority must preserve origin, scope, duration, conditions, and
revocation status.

### 36.5 Disagreement Preservation Policy

Substantive disagreement must remain visible and attributable.

### 36.6 Due Process Policy

Rejection, integrity referral, appeal, and adverse decisions must preserve
applicable notice, evidence, response, review, and appeal rights.

### 36.7 Minimal Necessary Disclosure Policy

Reviews, referrals, escalation, and governance notifications must disclose only
what is necessary.

### 36.8 Conflict-of-Interest Policy

Actors must not review or decide matters where policy requires recusal.

### 36.9 Governance Provenance Policy

Every material review, recommendation, decision, delegation, override, appeal,
and escalation requires provenance.

### 36.10 Supervision Boundary Policy

Supervisors hold substantial academic responsibility but not unlimited
institutional authority.

### 36.11 Learner Agency and Voice Policy

Learners may respond, clarify, challenge, appeal, and record disagreement within
applicable policy.

### 36.12 Non-Surveillance Workload Policy

Workload visibility supports capacity and governance; it must not become opaque
employee surveillance.

---

## 37. Aggregate Invariants

The domain must enforce:

1. People and authority remain distinct.
2. Every binding action references valid authority.
3. Authority is evaluated in context.
4. AI holds no formal academic authority.
5. Advisory and binding authority remain distinct.
6. Expired authority cannot authorise new actions.
7. Historical decisions retain the authority valid at decision time.
8. Delegation cannot exceed the delegator's scope.
9. Non-delegable authority cannot be delegated.
10. Review Request identifies required authority.
11. Review Assignment requires authority validation.
12. Academic Review remains distinct from Academic Decision.
13. Feedback remains distinct from Recommendation.
14. Recommendation remains distinct from Decision.
15. Review criticism is not formal rejection.
16. Multiple reviews may coexist.
17. Disagreement must not be silently overwritten.
18. Binding decisions preserve rationale.
19. Supersession does not erase historical decisions.
20. Appealability is explicit where applicable.
21. BRM cannot approve ethics.
22. BRM cannot determine academic misconduct.
23. Academic-integrity referral is not a misconduct finding.
24. Supervisor authority is bounded.
25. Committee authority and quorum are validated.
26. Conflict-of-interest status affects authority.
27. Formal adverse action preserves due process.
28. Revision requirements distinguish mandatory and advisory changes.
29. Workload counts are not quality measures.
30. Governance Graph authority edges require provenance.
31. AI roles cannot receive formal decision edges.
32. Ambiguous authority requires human governance review.
33. Governance records remain explainable without opaque authority scores.

---

## 38. Commands

Initial commands include:

- Register Authority Role
- Define Authority Scope
- Create Authority Assignment
- Activate Authority Assignment
- Suspend Authority Assignment
- Revoke Authority Assignment
- Create Delegation
- Activate Delegation
- Revoke Delegation
- Create Supervision Relationship
- Update Supervision Agreement
- Record Supervision Meeting
- Create Review Request
- Assign Reviewer
- Accept Review Assignment
- Decline Review Assignment
- Start Academic Review
- Add Review Finding
- Add Feedback
- Add Recommendation
- Submit Academic Review
- Reopen Academic Review
- Assess Review Quality
- Create Academic Decision
- Record Approval
- Record Rejection
- Create Revision Requirement
- Submit Revision Evidence
- Verify Revision Requirement
- Record Disagreement
- Resolve Disagreement
- Preserve Scholarly Disagreement
- File Appeal
- Assign Appeal Review
- Decide Appeal
- Create Governance Escalation
- Resolve Governance Escalation
- Create Committee Review
- Record Committee Decision
- Register Program Governance Record
- Create Academic-Integrity Referral
- Create Ethics Referral
- Record Workload Visibility
- Evaluate Scholarly Authority
- Add Governance Graph Node
- Add Governance Graph Edge
- Record Authority Conflict
- Conduct Governance Impact Analysis

---

## 39. Domain Events

Initial events include:

- AuthorityRoleRegistered
- AuthorityScopeDefined
- AuthorityAssignmentCreated
- AuthorityAssignmentActivated
- AuthorityAssignmentSuspended
- AuthorityAssignmentRevoked
- DelegationCreated
- DelegationActivated
- DelegationRevoked
- SupervisionRelationshipCreated
- SupervisionAgreementUpdated
- SupervisionMeetingRecorded
- ReviewRequestCreated
- ReviewerAssigned
- ReviewAssignmentAccepted
- ReviewAssignmentDeclined
- AcademicReviewStarted
- ReviewFindingAdded
- FeedbackAdded
- RecommendationAdded
- AcademicReviewSubmitted
- AcademicReviewReopened
- ReviewQualityAssessed
- AcademicDecisionCreated
- ApprovalRecorded
- RejectionRecorded
- RevisionRequirementCreated
- RevisionEvidenceSubmitted
- RevisionRequirementVerified
- DisagreementRecorded
- DisagreementResolved
- ScholarlyDisagreementPreserved
- AppealFiled
- AppealReviewAssigned
- AppealDecided
- GovernanceEscalationCreated
- GovernanceEscalationResolved
- CommitteeReviewCreated
- CommitteeDecisionRecorded
- ProgramGovernanceRecordRegistered
- AcademicIntegrityReferralCreated
- EthicsReferralCreated
- WorkloadVisibilityRecorded
- ScholarlyAuthorityEvaluated
- GovernanceGraphNodeAdded
- GovernanceGraphEdgeAdded
- AuthorityConflictRecorded
- GovernanceImpactAnalysisConducted

---

## 40. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Create Authority Assignment | AuthorityAssignmentCreated | Contextual Authority Policy | People and authority remain distinct |
| Create Delegation | DelegationCreated | Delegation Transparency Policy | Scope cannot exceed delegator |
| Create Review Request | ReviewRequestCreated | Contextual Authority Policy | Required authority identified |
| Assign Reviewer | ReviewerAssigned | Conflict-of-Interest Policy | Authority validated first |
| Submit Academic Review | AcademicReviewSubmitted | Review–Decision Separation Policy | Review is not decision |
| Add Feedback | FeedbackAdded | Review–Decision Separation Policy | Feedback is not recommendation |
| Add Recommendation | RecommendationAdded | No AI Formal Authority Policy | Recommendation is not decision |
| Create Academic Decision | AcademicDecisionCreated | Governance Provenance Policy | Valid authority and rationale required |
| Record Disagreement | DisagreementRecorded | Disagreement Preservation Policy | Conflict remains visible |
| File Appeal | AppealFiled | Due Process Policy | Appeal rights preserved |
| Create Integrity Referral | AcademicIntegrityReferralCreated | Due Process Policy | Referral is not finding |
| Evaluate Authority | ScholarlyAuthorityEvaluated | Contextual Authority Policy | Context-specific result |

---

## 41. Authority Model

### 41.1 BRM may

- identify required authority;
- validate configured authority assignments;
- recommend reviewers;
- prepare review dossiers;
- classify feedback;
- identify disagreement;
- prepare revision responses;
- identify appealability;
- prepare escalation;
- trace governance provenance;
- identify potentially invalid authority;
- conduct downstream impact analysis.

### 41.2 BRM may not

- formally approve or reject;
- grade or fail;
- award qualifications;
- approve ethics;
- determine misconduct;
- decide an appeal;
- appoint supervisors independently;
- override institutional policy;
- impersonate committees;
- invent authority;
- suppress dissent.

### 41.3 Learner may

- request review;
- provide evidence;
- respond to feedback;
- seek clarification;
- submit revisions;
- record disagreement;
- appeal where permitted;
- request reassignment or escalation;
- inspect applicable governance records.

### 41.4 Supervisor may

- review within authority;
- provide feedback;
- make recommendations;
- make decisions where authorised;
- require revision;
- refer specialist matters;
- escalate conflicts;
- participate in committees;
- record disagreement.

### 41.5 Program and institutional authorities may

- assign authority;
- define scopes;
- delegate authority;
- appoint reviewers;
- make binding decisions;
- ratify decisions;
- hear appeals;
- resolve authority conflicts;
- govern integrity, ethics, progression, and examination;
- suspend or revoke authority.

---

## 42. Cross-Context Interfaces

### Research Project Context

Provides:

- project stage;
- milestones;
- project elements;
- progress state;
- submission objects.

Receives:

- review outcomes;
- decisions;
- revision requirements;
- approval conditions;
- escalation status.

### Research Decision Context

Provides:

- decision dossiers;
- alternatives;
- criteria;
- rationale;
- uncertainty.

Receives:

- authority validation;
- formal decisions;
- review findings;
- disagreement records;
- supersession.

### Constructs and Theoretical Models Context

Provides:

- frameworks;
- theories;
- constructs;
- variables;
- hypotheses;
- coherence findings.

Receives:

- conceptual and theoretical review;
- methodology approval where applicable;
- revision requirements.

### Mentoring and Educational Intervention Context

Provides:

- supervisor discussion preparation;
- learner responses;
- intervention outcomes;
- escalation needs.

Receives:

- feedback;
- review findings;
- supervisor recommendations;
- authority boundaries;
- formal escalation outcomes.

### Knowledge, Evidence, and Provenance Context

Provides:

- Evidence Dossiers;
- source verification;
- claims;
- contradictions;
- provenance chains.

Receives:

- review usage;
- decision provenance;
- authority provenance;
- impact notifications.

### Learner Development Context

Receives:

- feedback-response evidence;
- revision capability evidence;
- supervisor preparation evidence;
- scholarly disagreement handling evidence.

---

## 43. Privacy, Fairness, and Integrity Safeguards

The domain must support:

- role-based access;
- confidential review handling;
- restricted committee deliberation;
- learner access to applicable decisions and reasons;
- correction and contestation;
- conflict-of-interest disclosure;
- due-process records;
- minimal necessary disclosure;
- appeal confidentiality;
- protected supervisor notes;
- non-retaliation safeguards where institutionally applicable;
- workload privacy;
- explicit AI attribution;
- traceable notification;
- retention and archival rules.

The platform must not convert authority into unquestionable truth.

Authority determines who may decide within governance scope.

It does not eliminate scholarly contestability.

---

## 44. Reporting

Reports may include:

- Authority Role Register;
- Authority Assignment Register;
- Delegation Register;
- Supervision Relationship Summary;
- Supervision Agreement History;
- Supervision Meeting Record;
- Review Request Register;
- Review Assignment Report;
- Academic Review Report;
- Review Finding Register;
- Feedback Register;
- Recommendation Register;
- Academic Decision Register;
- Approval Conditions Report;
- Revision Requirement Tracker;
- Disagreement Register;
- Appeal Register;
- Governance Escalation Report;
- Committee Review Report;
- Program Governance Register;
- Academic-Integrity Referral Record;
- Ethics Referral Record;
- Workload Visibility Summary;
- Authority Validation Report;
- Governance Graph View;
- Governance Impact Report.

Reports must distinguish:

- review;
- feedback;
- recommendation;
- decision;
- formal approval;
- disagreement;
- appeal;
- AI-generated assistance;
- binding and advisory authority;
- active and historical authority.

---

## 45. Example Scenario

A DBA learner proposes a quantitative model involving transformational
leadership, creative self-efficacy, and employee innovative behaviour.

The principal supervisor considers the model conceptually sound and recommends
approval.

A methods advisor identifies a measurement and mediation-design weakness and
recommends revision.

BRM records two separate Academic Reviews.

It does not merge them into false consensus.

The Governance Graph shows:

- the supervisor holds supervisory and conceptual authority;
- the methods advisor holds specialist methodological advisory authority;
- the Program Research Committee holds binding proposal-approval authority.

A Review Request is prepared for the committee with:

- both reviews;
- the Evidence Dossier;
- the learner's response;
- the disputed methodological question;
- the supervisor's recommendation;
- the methods advisor's recommendation.

The committee issues:

`Revision Required`

The decision includes:

- valid committee authority;
- rationale;
- mandatory revisions;
- resubmission conditions;
- appealability;
- provenance.

The learner completes the revisions.

The methods advisor verifies the methodological requirement.

The supervisor confirms conceptual coherence.

The committee records approval on resubmission.

Later, an outdated delegation is discovered.

The Scholarly Authority Engine determines that the delegation was expired before
the first committee review but that the committee itself retained valid
authority and quorum.

The decision remains valid.

The authority analysis and rationale are preserved.

---

## 46. Validation Questions

Reviewers should confirm:

1. Are people and authority modelled separately?
2. Is Academic Review correctly modelled as the central aggregate?
3. Are roles, assignments, scopes, and delegations distinct?
4. Is authority evaluated contextually?
5. Are advisory and binding powers distinct?
6. Are Review, Feedback, Recommendation, and Decision separate?
7. Can multiple reviews and disagreements coexist?
8. Can supervisor and specialist recommendations conflict without overwrite?
9. Are academic decisions traceable to valid authority?
10. Are approval, rejection, and revision requirements governed?
11. Are appeal rights and deadlines representable?
12. Are committees, quorum, and dissent supported?
13. Can authority be suspended, revoked, delegated, or superseded?
14. Does BRM remain without formal academic authority?
15. Are ethics and integrity referrals distinct from findings?
16. Does the Scholarly Authority Engine remain explainable?
17. Is the Governance Graph compatible with the existing architecture?
18. Are workload and surveillance risks addressed?
19. Are due process, privacy, and conflict-of-interest safeguards enforceable?
20. Does the model provide a stable foundation for BRMF-210 and BRMF-211?

---

## 47. Acceptance Criteria

BRMF-209 may progress from Draft to Approved when:

- Authority Role, Authority Scope, and Authority Assignment are accepted;
- Delegation rules are accepted;
- Supervision Relationship and Agreement models are accepted;
- Review Request and Review Assignment models are accepted;
- Academic Review is accepted as the central aggregate;
- Review Finding, Feedback, and Recommendation models are accepted;
- Academic Decision, Approval, Rejection, and Revision Requirement are accepted;
- Disagreement and Appeal models are accepted;
- Governance Escalation and Committee Review are accepted;
- academic-integrity and ethics referral boundaries are accepted;
- Workload Visibility safeguards are accepted;
- the Scholarly Authority Engine is accepted;
- the Governance Graph is accepted;
- interfaces with existing BRM domains are accepted;
- privacy, due-process, conflict, and provenance safeguards are accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved contradiction with BRMF-201 through BRMF-208 remains.

---

## 48. Next Specification

The next recommended document is:

**BRMF-210 — Research Progress, Milestones, and Capability Development Domain Model**

It will define:

- Research Journey;
- Research Stage;
- Milestone;
- Milestone Requirement;
- Progress Evidence;
- Progress Assessment;
- Capability;
- Capability Dimension;
- Learner Development Record;
- Readiness;
- Blocker;
- Dependency;
- Delay;
- Recovery Plan;
- Transition;
- Completion;
- program-level progress visibility;
- distinction between activity, progress, capability, and formal progression.

---

**End of BRMF-209**
