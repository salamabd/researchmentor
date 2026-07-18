# BRMF-213 — Security, Identity, Privacy, and Access-Control Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-110, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207, BRMF-208, BRMF-209, BRMF-210, BRMF-211, BRMF-212  
**Prepares:** BRMF-214

---

## 1. Purpose

This document defines the domain model for identity, authentication, sessions,
roles, permissions, authority context, contextual access control, consent,
delegation, impersonation control, privacy classification, data-subject rights,
retention, erasure, encryption, secrets, security events, threats, incidents,
auditing, institutional identity integration, and trust evaluation within the
Business Research Mentor (BRM).

It establishes the following as first-class platform capabilities:

- Identity;
- Authentication;
- Session;
- Role Assignment;
- Permission;
- Authority Context;
- Access Request;
- Access Decision;
- Consent;
- Delegation;
- Impersonation Session;
- Privacy Classification;
- Data Subject;
- Retention Policy;
- Security Event;
- Threat;
- Security Incident;
- Trust Evaluation Engine;
- Identity and Trust Graph.

The model ensures that access is not determined by a static role alone. It is
evaluated in context using identity assurance, authority, purpose, consent,
privacy, workflow state, risk, and educational legitimacy.

---

## 2. Core Principle

Authentication proves identity.

It does not grant authority.

The canonical trust flow is:

Identity  
→ Authentication  
→ Session  
→ Authority Context  
→ Role Assignment  
→ Permission Evaluation  
→ Policy Evaluation  
→ Trust Evaluation  
→ Access Decision  
→ Audit

The central aggregate is:

`Identity`

The governing question is:

> Is this actor, in this context, for this purpose, using this level of
> authentication and authority, permitted to perform this action on this
> resource under current privacy, security, governance, and educational rules?

---

## 3. Constitutional Role

BRMF-213 protects:

- people;
- research;
- educational relationships;
- institutional authority;
- confidential reflections;
- scholarly evidence;
- platform integrity;
- learner authorship;
- academic independence;
- explainable and proportionate access.

BRM must not:

- equate login with permission;
- treat roles as globally permanent;
- expose sensitive learner information merely because an actor is senior;
- allow hidden impersonation;
- infer unrestricted consent from platform use;
- permit AI or automation to override human authority;
- retain data indefinitely without basis;
- use security monitoring as learner surveillance;
- conceal access denials, restrictions, or escalations;
- allow sensitive cross-context access without policy evaluation.

---

## 4. Bounded Context

### 4.1 Context name

**Security, Identity, Privacy, and Access-Control Context**

### 4.2 Responsibilities

The context owns:

- Identity;
- Identity Claim;
- Authentication Method;
- Authentication Event;
- Session;
- Device Trust;
- Role;
- Role Assignment;
- Permission;
- Permission Set;
- Authority Context;
- Access Request;
- Access Decision;
- Access Policy;
- Consent;
- Consent Grant;
- Consent Withdrawal;
- Delegation;
- Impersonation Session;
- Privacy Classification;
- Data Subject;
- Data Subject Request;
- Retention Policy;
- Retention Schedule;
- Legal Hold;
- Erasure Request;
- Data Export Request;
- Encryption Policy;
- Secret;
- Security Event;
- Threat;
- Vulnerability;
- Security Incident;
- Security Control;
- Security Audit Record;
- Trust Evaluation Engine;
- Identity and Trust Graph.

### 4.3 Responsibilities excluded

The context does not own:

- research-project business rules;
- supervision assignment semantics;
- formal academic decision semantics;
- evidence or claim semantics;
- learner capability semantics;
- workflow coordination;
- AI orchestration;
- infrastructure-specific cryptographic implementation;
- identity-provider infrastructure.

---

## 5. Aggregate Architecture

BRMF-213 defines the following collaborating aggregate roots:

1. Identity
2. Authentication
3. Session
4. Role Assignment
5. Permission
6. Authority Context
7. Access Decision
8. Consent
9. Delegation
10. Impersonation Session
11. Data Subject
12. Retention Policy
13. Security Event
14. Threat
15. Security Incident
16. Security Audit Record
17. Identity and Trust Graph

The central aggregate is:

`Identity`

---

## 6. Governed Security Object Conformance

Major security and privacy objects must support, where applicable:

- stable identity;
- actor attribution;
- context;
- purpose;
- effective period;
- source;
- status;
- authority basis;
- policy basis;
- privacy classification;
- auditability;
- revocation;
- semantic version;
- provenance;
- domain events.

No access decision may rely solely on an unverified client-side claim.

---

## 7. Identity Aggregate

### 7.1 Identity

`IdentityId`

### 7.2 Purpose

Identity represents a governed participant or technical principal within BRM.

### 7.3 Identity types

- Learner;
- Supervisor;
- Co-Supervisor;
- Examiner;
- Program Director;
- Academic Reviewer;
- Ethics Reviewer;
- Institution Administrator;
- Platform Administrator;
- Support Operator;
- External Reviewer;
- Researcher;
- Service Principal;
- Integration Principal;
- System Agent.

### 7.4 Attributes

- Identity Id;
- Identity Type;
- Display Name;
- Institutional Affiliations;
- External Identity References;
- Identity Claims;
- Verification Status;
- Assurance Level;
- Lifecycle Status;
- Created At;
- Effective Period;
- Provenance.

### 7.5 Lifecycle status

- Pending;
- Verified;
- Active;
- Restricted;
- Suspended;
- Dormant;
- Revoked;
- Archived.

### 7.6 Rules

- Identity persists independently of current roles.
- One person may hold multiple contextual roles.
- Service principals must remain distinguishable from human identities.
- Identity verification level must be explicit.
- Identity revocation must invalidate dependent sessions according to policy.
- Sensitive identity attributes must be minimised.

---

## 8. Identity Claim

An Identity Claim represents an asserted attribute about an identity.

### Examples

- institutional affiliation;
- student number;
- staff number;
- programme membership;
- organisational unit;
- verified email;
- external reviewer status;
- age eligibility where legally required.

### Attributes

- Identity Claim Id;
- Identity Id;
- Claim Type;
- Claim Value;
- Issuer;
- Verification Method;
- Assurance Level;
- Effective Period;
- Status;
- Provenance.

### Rules

- Claims are not automatically trusted.
- Claim issuer and assurance must be recorded.
- Expired claims cannot support current authority.
- Sensitive claims require purpose limitation.

---

## 9. Authentication Aggregate

### 9.1 Identity

`AuthenticationId`

### 9.2 Purpose

Authentication represents proof that a principal controls or corresponds to an
Identity.

### 9.3 Authentication methods

- Password;
- Passkey;
- One-Time Code;
- Multi-Factor Authentication;
- University Single Sign-On;
- OAuth or OpenID Connect;
- Hardware Security Key;
- Certificate;
- Service Credential;
- Recovery Authentication.

### 9.4 Attributes

- Authentication Id;
- Identity Id;
- Method;
- Identity Provider;
- Authentication Strength;
- Assurance Level;
- Authentication Time;
- Risk Signals;
- Result;
- Failure Reason;
- Provenance.

### 9.5 Results

- Successful;
- Failed;
- Challenged;
- Step-Up Required;
- Blocked;
- Expired.

### 9.6 Rules

- Authentication proves identity, not authority.
- Stronger actions may require step-up authentication.
- Authentication failures must not reveal sensitive account details.
- Service authentication must use managed credentials.
- Authentication events must be auditable.

---

## 10. Session Aggregate

### 10.1 Identity

`SessionId`

### 10.2 Purpose

A Session represents a bounded period of authenticated interaction.

### 10.3 Attributes

- Session Id;
- Identity Id;
- Authentication Id;
- Started At;
- Expires At;
- Last Activity;
- Authentication Strength;
- Device Trust;
- Network Risk;
- Authority Context;
- Active Restrictions;
- Status;
- Revocation Reason;
- Provenance.

### 10.4 Status

- Active;
- Step-Up Required;
- Restricted;
- Expired;
- Revoked;
- Compromised;
- Closed.

### 10.5 Rules

- Sessions must expire.
- High-risk changes may invalidate existing sessions.
- Sensitive actions may require recent authentication.
- Session compromise must trigger containment.
- Session state must not grant authority absent role and policy evaluation.

---

## 11. Device Trust

Device Trust represents the assessed trust state of a device used in a session.

### Attributes

- Device Trust Id;
- Device Identifier;
- Identity Id;
- Device Type;
- Registration Status;
- Security Posture;
- Last Verified;
- Risk Signals;
- Trust Level;
- Status;
- Provenance.

### Trust levels

- Trusted;
- Known;
- Unknown;
- High Risk;
- Blocked.

### Rules

- Device trust supplements but does not replace authentication.
- Device fingerprinting must comply with privacy policy.
- High-risk devices may require restricted access.

---

## 12. Role

A Role is a named collection of expected responsibilities.

### Examples

- Learner;
- Supervisor;
- Co-Supervisor;
- Examiner;
- Program Director;
- Academic Reviewer;
- Institution Administrator;
- Platform Administrator;
- Support Operator;
- External Reviewer.

### Attributes

- Role Id;
- Name;
- Description;
- Permission Set;
- Authority Limitations;
- Assignable Contexts;
- Status;
- Semantic Version;
- Provenance.

### Rules

- Roles are templates, not authority by themselves.
- Role names must not imply unrestricted scope.
- Role changes require versioning and impact analysis.

---

## 13. Role Assignment Aggregate

### 13.1 Identity

`RoleAssignmentId`

### 13.2 Purpose

A Role Assignment grants an Identity a role within a defined context and period.

### 13.3 Attributes

- Role Assignment Id;
- Identity Id;
- Role Id;
- Institution;
- Programme;
- Research Project;
- Workflow;
- Resource Scope;
- Effective From;
- Effective Until;
- Assigned By;
- Authority Basis;
- Conditions;
- Status;
- Provenance.

### 13.4 Status

- Proposed;
- Active;
- Suspended;
- Expired;
- Revoked;
- Superseded.

### 13.5 Rules

- Role assignments are contextual.
- Role assignments may be time-bound.
- Assignment authority must be validated.
- Expired assignments cannot grant access.
- Role assignments must not silently expand scope.
- Conflicting role assignments require policy resolution.

---

## 14. Permission Aggregate

### 14.1 Identity

`PermissionId`

### 14.2 Purpose

Permission represents an atomic capability to act on a resource.

### 14.3 Examples

- View Research Project;
- Edit Research Proposal;
- Submit Milestone;
- Review Milestone;
- Approve Milestone;
- View Confidential Reflection;
- View Aggregated Analytics;
- Manage Role Assignment;
- Configure Institution;
- Execute Intelligence Task;
- Export Personal Data;
- Initiate Impersonation;
- View Security Audit;
- Resolve Incident.

### 14.4 Attributes

- Permission Id;
- Action;
- Resource Type;
- Constraints;
- Risk Classification;
- Required Authentication Strength;
- Required Authority;
- Status;
- Semantic Version;
- Provenance.

### 14.5 Rules

- Permissions remain distinct from roles.
- High-risk permissions require stronger safeguards.
- Permissions must be specific enough for meaningful policy evaluation.
- Deprecated permissions require migration.

---

## 15. Permission Set

A Permission Set groups permissions for assignment through a role or policy.

### Attributes

- Permission Set Id;
- Name;
- Permissions;
- Constraints;
- Status;
- Semantic Version;
- Provenance.

### Rules

- Permission sets must not override contextual policy.
- Least privilege is the default.
- Permission-set expansion requires review.

---

## 16. Authority Context Aggregate

### 16.1 Identity

`AuthorityContextId`

### 16.2 Purpose

Authority Context defines the scope in which an Identity may exercise a role or
permission.

### 16.3 Context dimensions

- Institution;
- Faculty or School;
- Programme;
- Research Project;
- Learner;
- Cohort;
- Workflow;
- Review;
- Milestone;
- Time Period;
- Delegation;
- Governance Decision.

### 16.4 Attributes

- Authority Context Id;
- Identity Id;
- Role Assignment References;
- Context Dimensions;
- Authority Source;
- Effective Period;
- Constraints;
- Delegation Chain;
- Conflict State;
- Status;
- Provenance.

### 16.5 Rules

- Authority is contextual.
- Seniority alone does not create authority.
- Authority must be evaluated against the resource and action.
- Delegated authority cannot exceed delegator authority.
- Ambiguous authority requires denial, restriction, or human review.
- Authority context must be preserved in access audit.

---

## 17. Access Policy

An Access Policy defines executable conditions governing access.

### Policy types

- Role-Based;
- Attribute-Based;
- Relationship-Based;
- Context-Based;
- Purpose-Based;
- Consent-Based;
- Risk-Based;
- Workflow-Based;
- Privacy-Based;
- Time-Based;
- Educational-Appropriateness;
- Separation-of-Duties.

### Attributes

- Access Policy Id;
- Name;
- Applies To;
- Conditions;
- Effect;
- Priority;
- Conflict Resolution;
- Human Review Requirement;
- Effective Period;
- Status;
- Semantic Version;
- Provenance.

### Effects

- Permit;
- Deny;
- Permit with Restrictions;
- Require Step-Up Authentication;
- Require Consent;
- Require Human Review;
- Require Anonymisation;
- Require Redaction.

### Rules

- Deny-by-default applies where no policy grants access.
- Policy conflicts must be resolved deterministically.
- High-risk exceptions require authority and audit.
- Policy evaluation must be explainable.

---

## 18. Access Request

An Access Request represents an attempt to perform an action on a resource.

### Attributes

- Access Request Id;
- Identity Id;
- Session Id;
- Action;
- Resource;
- Purpose;
- Authority Context;
- Requested Data Scope;
- Authentication Strength;
- Device Trust;
- Risk Signals;
- Consent References;
- Timestamp;
- Provenance.

### Rules

- Purpose must be explicit for sensitive access.
- Requested data scope must be minimised.
- Access requests must be evaluated, not assumed.
- Machine-initiated access must identify the responsible principal.

---

## 19. Access Decision Aggregate

### 19.1 Identity

`AccessDecisionId`

### 19.2 Purpose

An Access Decision records whether and under what conditions access is allowed.

### 19.3 Outcomes

- Granted;
- Granted with Restrictions;
- Step-Up Authentication Required;
- Consent Required;
- Human Review Required;
- Anonymised Access Granted;
- Redacted Access Granted;
- Denied;
- Indeterminate.

### 19.4 Attributes

- Access Decision Id;
- Access Request Id;
- Outcome;
- Applied Policies;
- Authority Findings;
- Consent Findings;
- Privacy Findings;
- Risk Findings;
- Educational-Appropriateness Findings;
- Restrictions;
- Expiry;
- Rationale;
- Decision Source;
- Provenance.

### 19.5 Rules

- Access decisions must be explainable.
- Decisions must be time-bound where appropriate.
- Restricted access must define restrictions.
- Denial must not disclose protected information.
- Indeterminate high-risk requests must not default to permit.
- Access decisions do not transfer resource ownership.

---

## 20. Consent Aggregate

### 20.1 Identity

`ConsentId`

### 20.2 Purpose

Consent records a data subject's informed and voluntary permission for a defined
use of personal or sensitive information where consent is the appropriate basis.

### 20.3 Attributes

- Consent Id;
- Data Subject Id;
- Purpose;
- Data Categories;
- Recipient Categories;
- Processing Activity;
- Scope;
- Granted At;
- Effective Until;
- Withdrawal Method;
- Status;
- Provenance.

### 20.4 Status

- Proposed;
- Granted;
- Partially Granted;
- Withdrawn;
- Expired;
- Invalidated.

### 20.5 Rules

- Consent is granular.
- Consent must be understandable.
- Consent cannot be bundled unnecessarily.
- Withdrawal must be possible where legally and operationally applicable.
- Withdrawal does not erase lawful prior processing automatically.
- Consent is not the only possible lawful basis and must not be used falsely.

---

## 21. Delegation Aggregate

### 21.1 Identity

`DelegationId`

### 21.2 Purpose

Delegation transfers limited authority from one authorised identity to another
for a defined scope and period.

### 21.3 Attributes

- Delegation Id;
- Delegator;
- Delegate;
- Authority Context;
- Permissions;
- Resource Scope;
- Effective From;
- Effective Until;
- Conditions;
- Delegation Depth;
- Revocation Rules;
- Status;
- Provenance.

### 21.4 Rules

- Delegation cannot exceed delegator authority.
- Delegation scope must be explicit.
- Re-delegation is prohibited unless expressly authorised.
- Delegation must be revocable.
- Delegated actions remain attributable to the delegate and delegation chain.
- Separation-of-duties rules still apply.

---

## 22. Impersonation Session Aggregate

### 22.1 Identity

`ImpersonationSessionId`

### 22.2 Purpose

An Impersonation Session supports authorised support or administrative access
performed in the context of another identity.

### 22.3 Attributes

- Impersonation Session Id;
- Initiating Identity;
- Target Identity;
- Purpose;
- Approved By;
- Scope;
- Effective From;
- Effective Until;
- Visible Banner Requirement;
- Disclosure Requirement;
- Actions Performed;
- Status;
- Provenance.

### 22.4 Rules

- Impersonation must never be hidden.
- Target credentials must not be used.
- Impersonation requires explicit authority.
- Scope and duration must be minimal.
- Sensitive actions may be prohibited during impersonation.
- All actions must be doubly attributable.

---

## 23. Privacy Classification

### Classification levels

- Public;
- Internal;
- Confidential;
- Highly Confidential;
- Educational Sensitive;
- Research Sensitive;
- Governance Restricted;
- Security Restricted.

### Attributes

- Privacy Classification Id;
- Name;
- Definition;
- Handling Rules;
- Access Requirements;
- Sharing Restrictions;
- Retention Requirements;
- Encryption Requirements;
- Provenance.

### Rules

- Classification applies to data and resources.
- The strictest applicable classification governs combined data.
- Classification changes require impact review.
- Sensitive learner reflections should default to restricted visibility.

---

## 24. Data Subject Aggregate

### 24.1 Identity

`DataSubjectId`

### 24.2 Purpose

A Data Subject represents a person whose personal data is processed by BRM.

### 24.3 Attributes

- Data Subject Id;
- Linked Identity, optional;
- Subject Category;
- Jurisdiction;
- Contact Channel;
- Applicable Rights;
- Verification Status;
- Status;
- Provenance.

### 24.4 Rules

- Data-subject identity must be verified before rights requests are fulfilled.
- Data subjects may exist without active platform accounts.
- Rights depend on jurisdiction and lawful basis.
- Rights handling must not expose another person's data.

---

## 25. Data Subject Request

### Request types

- Access;
- Correction;
- Export;
- Restriction;
- Objection;
- Erasure;
- Consent Withdrawal;
- Processing Explanation.

### Attributes

- Data Subject Request Id;
- Data Subject Id;
- Request Type;
- Scope;
- Submitted At;
- Identity Verification;
- Applicable Exceptions;
- Due Date;
- Status;
- Outcome;
- Provenance.

### Rules

- Requests must be tracked.
- Identity verification must be proportionate.
- Exceptions must be documented.
- Fulfilment must preserve third-party rights and legal holds.

---

## 26. Retention Policy Aggregate

### 26.1 Identity

`RetentionPolicyId`

### 26.2 Purpose

A Retention Policy defines how long information is retained and what happens at
the end of the retention period.

### 26.3 Attributes

- Retention Policy Id;
- Data Category;
- Context;
- Retention Period;
- Retention Basis;
- Archival Rule;
- Destruction Rule;
- Legal Hold Interaction;
- Review Cycle;
- Status;
- Provenance.

### 26.4 Rules

- Indefinite retention requires explicit justification.
- Retention must align with purpose and legal obligations.
- Destruction must be verifiable.
- Audit records may have separate retention rules.
- Model-training use requires separate policy basis.

---

## 27. Legal Hold

A Legal Hold suspends normal deletion for specified data.

### Attributes

- Legal Hold Id;
- Authority;
- Scope;
- Reason;
- Effective From;
- Review Date;
- Release Condition;
- Status;
- Provenance.

### Rules

- Legal hold scope must be minimal and explicit.
- Holds must be reviewed.
- Erasure requests affected by holds must receive a qualified response.
- Release must resume applicable retention processes.

---

## 28. Erasure Request

An Erasure Request requests deletion or irreversible de-identification.

### Attributes

- Erasure Request Id;
- Data Subject Id;
- Scope;
- Basis;
- Exceptions;
- Legal Holds;
- Downstream Systems;
- Status;
- Completion Evidence;
- Provenance.

### Rules

- Erasure must propagate where required and feasible.
- Referential integrity and audit obligations must be handled explicitly.
- Erasure must not rewrite valid academic or governance history unlawfully.
- De-identification may be used where deletion is not appropriate and is legally valid.

---

## 29. Data Export Request

A Data Export Request asks for portable access to personal or research data.

### Attributes

- Data Export Request Id;
- Data Subject Id;
- Scope;
- Format;
- Verification;
- Security Method;
- Status;
- Delivery Evidence;
- Provenance.

### Rules

- Exports must exclude unauthorised third-party data.
- Export delivery must be secure.
- Export format should be intelligible and portable where required.

---

## 30. Encryption Policy

### Attributes

- Encryption Policy Id;
- Data Classification;
- Encryption at Rest Requirement;
- Encryption in Transit Requirement;
- Key Management Requirement;
- Rotation Requirement;
- Backup Requirement;
- Exception Process;
- Status;
- Provenance.

### Rules

- Sensitive data requires encryption according to classification.
- Keys must be separated from protected data where practical.
- Cryptographic exceptions require formal approval.
- Cryptographic implementation details remain infrastructure concerns.

---

## 31. Secret Aggregate

### 31.1 Identity

`SecretId`

### 31.2 Purpose

A Secret represents a protected credential or cryptographic value used by the
platform.

### Examples

- API key;
- service credential;
- signing key;
- encryption key reference;
- webhook secret;
- database credential.

### Attributes

- Secret Id;
- Secret Type;
- Owner;
- Usage Scope;
- Storage Reference;
- Rotation Schedule;
- Last Rotated;
- Expiry;
- Status;
- Provenance.

### Rules

- Secret values must not be stored in domain events or logs.
- Secrets must be rotated.
- Access to secrets requires least privilege.
- Compromised secrets must be revoked immediately.

---

## 32. Security Control

A Security Control is a safeguard designed to reduce a defined risk.

### Control types

- Preventive;
- Detective;
- Corrective;
- Recovery;
- Deterrent;
- Compensating.

### Attributes

- Security Control Id;
- Control Type;
- Threats Addressed;
- Implementation Owner;
- Evidence;
- Effectiveness;
- Review Cycle;
- Status;
- Provenance.

### Rules

- Controls require evidence of operation.
- Control existence does not prove effectiveness.
- Failed controls must trigger review.

---

## 33. Threat Aggregate

### 33.1 Identity

`ThreatId`

### 33.2 Threat types

- Credential Compromise;
- Privilege Escalation;
- Session Hijacking;
- Insider Misuse;
- Data Exfiltration;
- Prompt Injection;
- Tool Abuse;
- Malicious Integration;
- Citation Manipulation;
- Model Output Manipulation;
- Denial of Service;
- Unauthorised Impersonation;
- Privacy Leakage;
- Cross-Context Overreach;
- Academic-Integrity Abuse.

### 33.3 Attributes

- Threat Id;
- Threat Type;
- Threat Actor;
- Target;
- Attack Path;
- Likelihood;
- Impact;
- Existing Controls;
- Residual Risk;
- Status;
- Provenance.

### 33.4 Rules

- Threats must include educational and governance harms, not only technical harm.
- Residual risk must be explicit.
- Threat models require periodic review.

---

## 34. Vulnerability

A Vulnerability is a weakness that may be exploited by a threat.

### Attributes

- Vulnerability Id;
- Affected Asset;
- Description;
- Severity;
- Exploitability;
- Detection Source;
- Remediation;
- Due Date;
- Status;
- Provenance.

### Rules

- Vulnerability severity must consider data, authority, and educational impact.
- Accepted risk requires explicit authority.
- Critical vulnerabilities may require immediate capability suspension.

---

## 35. Security Event Aggregate

### 35.1 Identity

`SecurityEventId`

### 35.2 Event types

- Authentication Failed;
- Suspicious Login;
- Step-Up Triggered;
- Access Denied;
- Privilege Escalation Attempt;
- Consent Violation Attempt;
- Excessive Data Access;
- Sensitive Export;
- Impersonation Started;
- Impersonation Ended;
- Policy Override;
- Secret Access;
- Secret Rotation;
- Malware Signal;
- Prompt Injection Attempt;
- Tool Misuse Attempt;
- Unusual AI Activity;
- Cross-Context Policy Violation;
- Security Control Failure.

### 35.3 Attributes

- Security Event Id;
- Event Type;
- Identity;
- Session;
- Resource;
- Timestamp;
- Severity;
- Detection Source;
- Context;
- Correlation Id;
- Immediate Action;
- Escalation Status;
- Provenance.

### 35.4 Rules

- Security events must be immutable.
- Security logging must avoid unnecessary sensitive content.
- Events must support correlation.
- Events do not automatically establish misconduct.

---

## 36. Security Incident Aggregate

### 36.1 Identity

`SecurityIncidentId`

### 36.2 Purpose

A Security Incident represents a confirmed or suspected security or privacy
situation requiring coordinated investigation and response.

### 36.3 Lifecycle

- Detected;
- Triaged;
- Investigating;
- Contained;
- Eradicated;
- Recovering;
- Resolved;
- Closed;
- Reopened.

### 36.4 Attributes

- Security Incident Id;
- Related Events;
- Threat;
- Affected Identities;
- Affected Resources;
- Data Impact;
- Educational Impact;
- Governance Impact;
- Severity;
- Incident Commander;
- Response Plan;
- Containment Actions;
- Notifications;
- Root Cause;
- Lessons Learned;
- Status;
- Provenance.

### 36.5 Rules

- Incident response must preserve evidence.
- Security incidents must not be used to bypass fair process.
- Material privacy incidents may require notification.
- Recovery must include trust restoration where relevant.
- Closure requires documented rationale.

---

## 37. Trust Evaluation Engine

The Trust Evaluation Engine determines whether an interaction is trustworthy,
proportionate, contextually authorised, privacy-preserving, and educationally
legitimate.

### 37.1 Inputs

- Identity;
- Identity Claims;
- Authentication Strength;
- Session;
- Device Trust;
- Role Assignments;
- Permissions;
- Authority Context;
- Delegation Chain;
- Consent;
- Privacy Classification;
- Requested Purpose;
- Workflow State;
- Educational Appropriateness;
- Academic-Integrity Risk;
- Security Risk;
- Institutional Policy;
- Historical Security Signals.

### 37.2 Outputs

- Access Decision;
- trust level;
- restrictions;
- step-up requirement;
- consent requirement;
- anonymisation or redaction requirement;
- human review requirement;
- denial rationale;
- uncertainty;
- provenance.

### 37.3 Trust outcomes

- Trusted;
- Trusted with Restrictions;
- Additional Assurance Required;
- Human Review Required;
- Untrusted;
- Indeterminate.

### 37.4 Responsibilities

The engine must:

- evaluate identity assurance;
- validate contextual authority;
- validate role assignment and delegation;
- enforce purpose limitation;
- evaluate consent and privacy;
- assess educational legitimacy;
- identify anomalous or high-risk behaviour;
- request stronger authentication where needed;
- require anonymisation or redaction where possible;
- route ambiguous high-impact cases to human review;
- generate an explainable decision.

### 37.5 Rules

- Trust is evaluated per interaction.
- Trust is not a permanent personal score.
- The engine must not create hidden behavioural profiles.
- Seniority must not substitute for authority.
- High-risk ambiguity must not default to permit.
- Trust evaluation must remain contestable.
- Educational legitimacy cannot override legal or security constraints.
- Security risk cannot be used as a pretext for unjustified surveillance.

---

## 38. Educational Security

Educational Security protects the learning process and scholarly relationship.

### Risks

- AI replacing learner reasoning;
- supervisor over-authoring;
- hidden use of learner reflections;
- unauthorised visibility into capability weaknesses;
- misuse of progress analytics;
- coercive monitoring;
- inappropriate intervention;
- manipulation of academic decisions;
- confidentiality breaches within supervision;
- hidden profiling.

### Controls

- minimum necessary access;
- restricted reflection visibility;
- explicit supervisor assignment;
- learner consent where appropriate;
- explainable intervention access;
- separation of support and assessment roles;
- anonymised programme analytics;
- human review for high-impact access;
- auditable AI contribution;
- prohibition of hidden impersonation.

### Rules

- Learning protection is a security objective.
- Educationally sensitive data requires contextual access.
- Programme analytics should default to aggregation.
- Capability weaknesses must not become unrestricted administrative labels.
- Support access must remain distinct from assessment authority.

---

## 39. Identity and Trust Graph Aggregate

### 39.1 Identity

`IdentityTrustGraphId`

### 39.2 Purpose

The Identity and Trust Graph represents relationships among identities, claims,
roles, permissions, authority contexts, resources, policies, consent,
delegation, sessions, access decisions, threats, controls, events, and incidents.

### 39.3 Node types

- Identity;
- Identity Claim;
- Authentication;
- Session;
- Device;
- Role;
- Role Assignment;
- Permission;
- Authority Context;
- Resource;
- Access Policy;
- Access Decision;
- Consent;
- Delegation;
- Impersonation Session;
- Privacy Classification;
- Data Subject;
- Retention Policy;
- Security Control;
- Threat;
- Vulnerability;
- Security Event;
- Security Incident.

### 39.4 Edge types

- Authenticated By;
- Holds Role;
- Assigned Within;
- Grants Permission;
- Applies To;
- Authorised For;
- Delegated To;
- Consented To;
- Classified As;
- Subject Of;
- Protected By;
- Threatened By;
- Exploits;
- Triggered;
- Related To;
- Reviewed By;
- Revokes;
- Supersedes.

### 39.5 Rules

- Every material edge requires provenance.
- Authority edges require scope and effective period.
- Delegation chains must be traversable.
- Graph visibility must be access controlled.
- Security events do not establish guilt.
- Graph relationships must not create hidden personal profiling.

---

## 40. Relationship to Existing Architecture

BRMF now includes:

### Governance Layer

Authority, review, formal decisions, appeal, institutional control.

### Identity and Trust Layer

Identity, authentication, contextual authority, access control, privacy, trust,
security events, incidents.

### Knowledge–Evidence Network

Sources, evidence, claims, contradiction, provenance.

### Domain Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph;
- Capability Graph;
- Intelligence Graph;
- Integration Graph;
- Identity and Trust Graph.

### Application and Integration Layer

Use cases, application services, workflows, process managers, context contracts,
commands, events, projections.

### Infrastructure Layer

Identity providers, cryptographic implementation, session stores, secrets
management, security monitoring, transport, persistence, and deployment.

Identity and Trust act as a gatekeeper across all layers.

---

## 41. Domain Services

### 41.1 Identity Resolution Service

Resolves internal and external identity references.

### 41.2 Authentication Assurance Service

Evaluates authentication strength and freshness.

### 41.3 Role Assignment Service

Creates, validates, suspends, and revokes contextual role assignments.

### 41.4 Authority Resolution Service

Determines applicable authority context and delegation chain.

### 41.5 Permission Evaluation Service

Evaluates action and resource permissions.

### 41.6 Policy Decision Service

Evaluates access policies and resolves conflicts.

### 41.7 Consent Management Service

Manages consent grant, withdrawal, and effective scope.

### 41.8 Privacy Classification Service

Classifies information and determines handling requirements.

### 41.9 Data Subject Rights Service

Coordinates access, correction, export, restriction, and erasure requests.

### 41.10 Retention and Erasure Service

Applies retention schedules, legal holds, archival, and destruction.

### 41.11 Security Event Correlation Service

Correlates security events across sessions, identities, resources, and contexts.

### 41.12 Incident Response Service

Coordinates investigation, containment, recovery, and lessons learned.

### 41.13 Trust Evaluation Service

Produces contextual, explainable trust and access outcomes.

### 41.14 Security Impact Service

Traces how compromised identities, revoked permissions, or policy changes affect
sessions, workflows, decisions, integrations, and intelligence tasks.

---

## 42. Domain Policies

### 42.1 Identity–Authority Separation Policy

Authentication does not grant authority.

### 42.2 Contextual Role Policy

Roles apply only within declared scope and period.

### 42.3 Least Privilege Policy

Only minimum necessary permissions are granted.

### 42.4 Deny by Default Policy

Access is denied unless a valid policy permits it.

### 42.5 Purpose Limitation Policy

Sensitive access requires a legitimate declared purpose.

### 42.6 Consent Integrity Policy

Consent is granular, informed, and revocable where applicable.

### 42.7 Delegation Limitation Policy

Delegation cannot exceed original authority.

### 42.8 No Hidden Impersonation Policy

Impersonation must be authorised, visible, time-limited, and audited.

### 42.9 Privacy by Default Policy

Sensitive information defaults to restricted visibility.

### 42.10 Retention Limitation Policy

Data is not retained longer than justified.

### 42.11 Security Event Fairness Policy

Security signals do not by themselves establish misconduct.

### 42.12 Educational Security Policy

Access must protect learner agency, authorship, and confidential reflection.

### 42.13 Explainable Access Policy

Material access decisions require understandable rationale.

### 42.14 Trust Non-Profiling Policy

Trust is evaluated per interaction, not converted into a permanent hidden score.

---

## 43. Aggregate Invariants

The domain must enforce:

1. Identity is the central aggregate.
2. Identity is distinct from role.
3. Authentication is distinct from authority.
4. Session is distinct from permission.
5. Roles are contextual.
6. Role assignments have explicit scope.
7. Expired role assignments grant no authority.
8. Permissions remain atomic.
9. Authority is evaluated against action and resource.
10. Seniority alone does not grant access.
11. Delegation cannot exceed delegator authority.
12. Delegation is attributable and revocable.
13. Re-delegation requires explicit permission.
14. Deny by default applies.
15. Sensitive access requires declared purpose.
16. Access decisions are explainable.
17. Indeterminate high-risk access does not default to permit.
18. Consent is granular.
19. Consent withdrawal is recorded.
20. Impersonation is never hidden.
21. Impersonation uses no target credentials.
22. Privacy classification governs handling.
23. Combined data inherits the strictest applicable classification.
24. Data-subject requests require identity verification.
25. Legal holds suspend applicable deletion.
26. Retention requires explicit basis.
27. Secrets are never stored in logs or domain events.
28. Security events are immutable.
29. Security events do not prove misconduct.
30. Incidents preserve evidence.
31. Trust is interaction-specific.
32. Trust is not a permanent personal score.
33. Educationally sensitive data requires contextual access.
34. Programme analytics default to aggregation where possible.
35. Support access is distinct from assessment authority.
36. Identity and Trust Graph edges require provenance.
37. Authority and delegation edges carry scope and time.
38. Security monitoring must not become learner surveillance.
39. Access controls remain subordinate to legitimate governance and legal rules.
40. Identity and trust protection applies across every BRMF bounded context.

---

## 44. Commands

Initial commands include:

- Create Identity
- Verify Identity
- Restrict Identity
- Revoke Identity
- Record Identity Claim
- Authenticate Identity
- Require Step-Up Authentication
- Create Session
- Revoke Session
- Register Device Trust
- Create Role
- Assign Role
- Suspend Role Assignment
- Revoke Role Assignment
- Create Permission
- Create Permission Set
- Create Authority Context
- Create Access Policy
- Submit Access Request
- Evaluate Access Request
- Grant Consent
- Withdraw Consent
- Create Delegation
- Revoke Delegation
- Start Impersonation Session
- End Impersonation Session
- Create Privacy Classification
- Register Data Subject
- Submit Data Subject Request
- Create Retention Policy
- Place Legal Hold
- Release Legal Hold
- Submit Erasure Request
- Submit Data Export Request
- Create Encryption Policy
- Register Secret
- Rotate Secret
- Revoke Secret
- Register Security Control
- Register Threat
- Register Vulnerability
- Record Security Event
- Create Security Incident
- Contain Security Incident
- Resolve Security Incident
- Create Security Audit Record
- Add Identity and Trust Graph Node
- Add Identity and Trust Graph Edge
- Conduct Security Impact Analysis

---

## 45. Domain Events

Initial events include:

- IdentityCreated
- IdentityVerified
- IdentityRestricted
- IdentityRevoked
- IdentityClaimRecorded
- IdentityAuthenticated
- StepUpAuthenticationRequired
- SessionCreated
- SessionRevoked
- DeviceTrustRegistered
- RoleCreated
- RoleAssigned
- RoleAssignmentSuspended
- RoleAssignmentRevoked
- PermissionCreated
- PermissionSetCreated
- AuthorityContextCreated
- AccessPolicyCreated
- AccessRequestSubmitted
- AccessRequestEvaluated
- ConsentGranted
- ConsentWithdrawn
- DelegationCreated
- DelegationRevoked
- ImpersonationSessionStarted
- ImpersonationSessionEnded
- PrivacyClassificationCreated
- DataSubjectRegistered
- DataSubjectRequestSubmitted
- RetentionPolicyCreated
- LegalHoldPlaced
- LegalHoldReleased
- ErasureRequestSubmitted
- DataExportRequestSubmitted
- EncryptionPolicyCreated
- SecretRegistered
- SecretRotated
- SecretRevoked
- SecurityControlRegistered
- ThreatRegistered
- VulnerabilityRegistered
- SecurityEventRecorded
- SecurityIncidentCreated
- SecurityIncidentContained
- SecurityIncidentResolved
- SecurityAuditRecordCreated
- IdentityTrustGraphNodeAdded
- IdentityTrustGraphEdgeAdded
- SecurityImpactAnalysisConducted

---

## 46. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Authenticate Identity | IdentityAuthenticated | Identity–Authority Separation Policy | Authentication is not authority |
| Assign Role | RoleAssigned | Contextual Role Policy | Role scope is explicit |
| Evaluate Access Request | AccessRequestEvaluated | Deny by Default Policy | High-risk ambiguity does not permit |
| Grant Consent | ConsentGranted | Consent Integrity Policy | Consent is granular |
| Create Delegation | DelegationCreated | Delegation Limitation Policy | Delegation cannot exceed authority |
| Start Impersonation | ImpersonationSessionStarted | No Hidden Impersonation Policy | Impersonation is visible and audited |
| Create Retention Policy | RetentionPolicyCreated | Retention Limitation Policy | Retention has basis |
| Record Security Event | SecurityEventRecorded | Security Event Fairness Policy | Event does not prove misconduct |
| Add Trust Graph Edge | IdentityTrustGraphEdgeAdded | Trust Non-Profiling Policy | Relationships require provenance |

---

## 47. Authority Model

### 47.1 Identity and Trust services may

- authenticate;
- evaluate access;
- enforce policy;
- request stronger authentication;
- require consent;
- anonymise or redact;
- suspend sessions;
- request human review;
- create security events;
- coordinate incident response;
- revoke compromised credentials.

### 47.2 Identity and Trust services may not

- grant academic approval;
- create academic authority without governance basis;
- infer misconduct from security signals alone;
- expose confidential reflections to unrelated administrators;
- create hidden behavioural profiles;
- override legal rights;
- conceal impersonation;
- retain data without basis.

### 47.3 Institutional authorities may

- approve role models;
- assign contextual authority;
- approve privacy classifications;
- approve retention schedules;
- approve security policies;
- authorise incident response;
- approve exceptional access;
- approve external identity providers.

### 47.4 Learners may

- inspect relevant personal data;
- understand material access decisions;
- manage applicable consent;
- challenge incorrect data;
- submit privacy requests;
- report suspected unauthorised access.

---

## 48. Cross-Context Interfaces

### BRMF-209 Governance and Authority Context

Provides:

- authority assignments;
- formal decision roles;
- appeal and review authority;
- institutional policy.

Receives:

- access decisions;
- authority ambiguity;
- security restrictions;
- impersonation audit.

### BRMF-211 Intelligence Context

Provides:

- intelligence tasks;
- context requests;
- model and tool access needs.

Receives:

- access restrictions;
- privacy redaction;
- trust outcomes;
- security alerts;
- consent limits.

### BRMF-212 Integration Context

Provides:

- application requests;
- workflows;
- service principals;
- external integrations.

Receives:

- authenticated principal;
- authority context;
- access decisions;
- session status;
- security incidents.

### Learner Development and Supervision Contexts

Provide:

- assignment relationships;
- educational purpose;
- reflection and feedback resources.

Receive:

- contextual access decisions;
- privacy handling;
- consent state;
- restricted visibility.

### Knowledge and Evidence Context

Provides:

- sensitive research objects;
- source ownership;
- confidentiality requirements.

Receives:

- resource access decision;
- export controls;
- retention and legal-hold instructions.

---

## 49. Privacy, Fairness, Security, and Educational Safeguards

The domain must support:

- least privilege;
- deny by default;
- contextual roles;
- strong authentication;
- session expiry;
- step-up authentication;
- device-risk evaluation;
- explicit delegation;
- visible impersonation;
- consent management;
- privacy classification;
- redaction;
- anonymisation;
- retention control;
- erasure and export handling;
- encryption policy;
- secrets rotation;
- threat modelling;
- vulnerability management;
- event correlation;
- incident response;
- explainable access;
- learner contestation;
- non-profiling;
- educational confidentiality;
- aggregation for programme analytics.

Security controls must remain proportionate and must not undermine the
educational relationship they are intended to protect.

---

## 50. Reporting

Reports may include:

- Identity Register;
- Identity Assurance Report;
- Authentication Report;
- Active Session Report;
- Role Catalogue;
- Role Assignment Register;
- Permission Catalogue;
- Authority Context Report;
- Access Policy Register;
- Access Decision Audit;
- Consent Register;
- Delegation Register;
- Impersonation Register;
- Privacy Classification Catalogue;
- Data Subject Request Register;
- Retention Schedule;
- Legal Hold Register;
- Erasure and Export Report;
- Secret Rotation Report;
- Security Control Register;
- Threat Register;
- Vulnerability Register;
- Security Event Report;
- Security Incident Report;
- Trust Evaluation Report;
- Identity and Trust Graph View;
- Security Impact Report.

Reports must distinguish:

- authentication failure;
- access denial;
- policy restriction;
- consent absence;
- insufficient authority;
- risk-triggered restriction;
- security event;
- confirmed incident;
- human review;
- revoked access;
- expired access;
- educationally inappropriate access.

---

## 51. Example Scenario

A program director requests access to a learner's private reflective journal.

The director is authenticated successfully.

The Session is active and uses strong authentication.

The identity holds the role:

`Program Director`

within the institution.

However, the requested resource is classified:

`Educational Sensitive`

The Authority Context confirms that the director may view:

- aggregate programme progress;
- governance reports;
- milestone status.

It does not establish authority to view private learner reflections.

No learner consent exists for this purpose.

The Trust Evaluation Engine evaluates:

- valid identity;
- valid authentication;
- valid programme role;
- insufficient resource-specific authority;
- incompatible purpose;
- restricted privacy classification;
- no consent;
- no emergency or legal basis.

The Access Decision is:

`Denied`

with an alternative:

`Anonymised Aggregate Access Granted`

The system provides the director with programme-level themes without exposing
the learner's journal.

The denial is audited.

No security incident is created because the request may have been legitimate but
overbroad.

Repeated attempts to bypass the restriction may generate a Security Event.

This scenario demonstrates:

- authentication is not authority;
- seniority does not override privacy;
- educationally sensitive data receives contextual protection;
- useful access may still be provided through aggregation;
- access decisions remain explainable and proportionate.

---

## 52. Validation Questions

Reviewers should confirm:

1. Is Identity correctly modelled as the central aggregate?
2. Are authentication and authority separated?
3. Are roles contextual and time-bound?
4. Are permissions atomic and independent of roles?
5. Is Authority Context sufficiently expressive?
6. Are access decisions explainable?
7. Does deny-by-default apply?
8. Are consent, delegation, and impersonation first-class?
9. Is hidden impersonation prohibited?
10. Are privacy classifications adequate?
11. Are data-subject rights represented?
12. Are retention, legal hold, erasure, and export represented?
13. Are encryption and secrets appropriately separated from implementation?
14. Are threats, vulnerabilities, events, and incidents distinguished?
15. Does the Trust Evaluation Engine evaluate each interaction contextually?
16. Is permanent hidden trust scoring prohibited?
17. Is Educational Security adequately represented?
18. Are learner reflections and capability weaknesses protected?
19. Are security events prevented from becoming automatic misconduct findings?
20. Is the Identity and Trust Graph compatible with other BRM graphs?
21. Are interfaces with BRMF-209, BRMF-211, and BRMF-212 sufficient?
22. Are privacy, fairness, governance, and security balanced?
23. Does the model support institutional identity integration?
24. Is the architecture ready to support BRMF-214?

---

## 53. Acceptance Criteria

BRMF-213 may progress from Draft to Approved when:

- Identity and Identity Claim are accepted;
- Authentication and Session are accepted;
- Role, Role Assignment, Permission, and Permission Set are accepted;
- Authority Context is accepted;
- Access Policy, Access Request, and Access Decision are accepted;
- Consent and Delegation are accepted;
- Impersonation Session is accepted;
- Privacy Classification and Data Subject are accepted;
- Data Subject Requests are accepted;
- Retention, Legal Hold, Erasure, and Export are accepted;
- Encryption Policy and Secret are accepted;
- Security Control, Threat, Vulnerability, Event, and Incident are accepted;
- Trust Evaluation Engine is accepted;
- Educational Security is accepted;
- Identity and Trust Graph is accepted;
- interfaces with BRMF-201 through BRMF-212 are accepted;
- privacy, fairness, explainability, non-profiling, and authority safeguards are
  accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved architectural contradiction remains.

---

## 54. Next Specification

The next recommended document is:

**BRMF-214 — Observability, Auditability, Reliability, and Operational Resilience Domain Model**

It will define:

- Operational Signal;
- Metric;
- Log;
- Trace;
- Health State;
- Service-Level Objective;
- Reliability Target;
- Alert;
- Operational Incident;
- Dependency Health;
- Capacity;
- Availability;
- Performance;
- Failure Budget;
- Backup;
- Restore;
- Disaster Recovery;
- Business Continuity;
- Runbook;
- Operational Review;
- platform-wide audit and resilience controls.

---

**End of BRMF-213**
