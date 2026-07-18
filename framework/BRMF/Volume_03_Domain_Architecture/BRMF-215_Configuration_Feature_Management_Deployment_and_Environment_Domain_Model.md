# BRMF-215 — Configuration, Feature Management, Deployment, and Environment Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101 through BRMF-214  
**Prepares:** BRMF-216

---

## 1. Purpose

This document defines the domain model for platform configuration, configuration
sets, configuration items, environments, features, feature flags, experiment
flags, deployment packages, releases, rollouts, rollbacks, migrations,
compatibility assessments, deployment approvals, operational readiness,
configuration drift, environment promotion, release evidence, and governed
platform evolution within the Business Research Mentor (BRM).

It establishes the following as first-class platform capabilities:

- Platform Configuration;
- Configuration Set;
- Configuration Item;
- Environment;
- Feature;
- Feature Flag;
- Experiment Flag;
- Deployment Package;
- Release;
- Rollout;
- Rollback;
- Migration;
- Compatibility Assessment;
- Operational Readiness Assessment;
- Deployment Approval;
- Configuration Drift;
- Environment Promotion;
- Release Evidence;
- Platform Evolution Engine;
- Platform Evolution Graph.

The model ensures that BRM treats every material platform change as a governed
educational, architectural, operational, privacy, and security change rather
than merely as a software update.

---

## 2. Core Principle

A deployment is not simply the movement of software.

It is the controlled activation of a governed platform state.

The canonical evolution flow is:

Platform Configuration  
→ Configuration Set  
→ Environment  
→ Feature Management  
→ Deployment Package  
→ Release  
→ Migration  
→ Compatibility Assessment  
→ Operational Readiness  
→ Deployment Approval  
→ Rollout  
→ Observation  
→ Rollback or Completion  
→ Release Audit

The central aggregate is:

`PlatformConfiguration`

The governing question is:

> Should this proposed change become part of the active educational platform,
> in this environment, for this audience, under these controls, with this
> evidence, and with a safe path to recovery?

---

## 3. Constitutional Role

BRMF-215 defines how BRM changes safely over time.

It protects:

- educational philosophy;
- learner agency;
- supervisor relationships;
- research evidence;
- architectural integrity;
- domain compatibility;
- operational reliability;
- privacy;
- security;
- explainability;
- institutional governance;
- reversibility;
- auditability.

BRM must not:

- treat a successful build as deployment approval;
- release unvalidated AI behaviour directly to all users;
- hide configuration changes;
- use feature flags as permanent undocumented architecture;
- run learner-facing experiments without governance;
- promote configuration manually without evidence;
- migrate data without rollback or recovery planning;
- assume backward compatibility;
- allow production drift to become normal;
- continue a rollout after material educational or trust degradation;
- conceal a partial or failed rollback.

---

## 4. Bounded Context

### 4.1 Context name

**Configuration, Feature Management, Deployment, and Environment Context**

### 4.2 Responsibilities

The context owns:

- Platform Configuration;
- Configuration Set;
- Configuration Item;
- Configuration Schema;
- Environment;
- Environment Class;
- Environment Baseline;
- Feature;
- Feature Flag;
- Feature Exposure Rule;
- Experiment Flag;
- Experiment Allocation;
- Deployment Package;
- Release;
- Release Candidate;
- Release Evidence;
- Rollout;
- Rollout Segment;
- Rollback;
- Migration;
- Migration Plan;
- Compatibility Assessment;
- Compatibility Contract;
- Operational Readiness Assessment;
- Deployment Approval;
- Configuration Drift;
- Environment Promotion;
- Change Window;
- Release Audit Record;
- Platform Evolution Engine;
- Platform Evolution Graph.

### 4.3 Responsibilities excluded

The context does not own:

- infrastructure provisioning implementation;
- source-control implementation;
- CI/CD vendor configuration;
- cloud-provider deployment mechanics;
- domain business rules;
- formal academic approval semantics;
- identity-provider implementation;
- observability storage;
- cryptographic secret values.

---

## 5. Aggregate Architecture

BRMF-215 defines the following collaborating aggregate roots:

1. Platform Configuration
2. Configuration Set
3. Configuration Item
4. Environment
5. Feature
6. Feature Flag
7. Experiment Flag
8. Deployment Package
9. Release
10. Rollout
11. Rollback
12. Migration
13. Compatibility Assessment
14. Operational Readiness Assessment
15. Deployment Approval
16. Configuration Drift
17. Environment Promotion
18. Release Evidence
19. Release Audit Record
20. Platform Evolution Graph

The central aggregate is:

`PlatformConfiguration`

---

## 6. Governed Change Object Conformance

Major change objects must support, where applicable:

- stable identity;
- owner;
- environment;
- scope;
- effective period;
- status;
- version;
- source;
- rationale;
- dependencies;
- compatibility;
- risk;
- approvals;
- rollback;
- evidence;
- provenance;
- auditability;
- domain events.

No material production change may rely solely on undocumented manual action.

---

## 7. Platform Configuration Aggregate

### 7.1 Identity

`PlatformConfigurationId`

### 7.2 Purpose

Platform Configuration represents the complete governed configuration state of
a BRM environment.

### 7.3 Configuration domains

- Domain Configuration;
- Research Workflow Configuration;
- Intelligence Configuration;
- Methodology Configuration;
- Knowledge Graph Configuration;
- Decision Graph Configuration;
- Learning Graph Configuration;
- Capability Graph Configuration;
- Integration Configuration;
- Identity and Trust Configuration;
- Operational Configuration;
- Notification Configuration;
- Institutional Configuration;
- Privacy Configuration;
- Feature Configuration.

### 7.4 Attributes

- Platform Configuration Id;
- Environment;
- Configuration Sets;
- Active Features;
- Active Methodologies;
- Active Model Providers;
- Graph Versions;
- Contract Versions;
- Security Policies;
- Privacy Policies;
- Operational Policies;
- Feature Flags;
- Effective From;
- Effective Until;
- Status;
- Semantic Version;
- Provenance.

### 7.5 Status

- Draft;
- Validating;
- Approved;
- Active;
- Superseded;
- Rolled Back;
- Retired;
- Invalid.

### 7.6 Rules

- A running environment must reference one active Platform Configuration.
- Configuration changes require versioning.
- Secrets are referenced, not embedded.
- Active configuration must be reproducible.
- Configuration state must be attributable.
- Configuration cannot silently override domain invariants.
- Production configuration requires approval.

---

## 8. Configuration Set Aggregate

### 8.1 Identity

`ConfigurationSetId`

### 8.2 Purpose

A Configuration Set groups related Configuration Items into a coherent governed
unit.

### 8.3 Examples

- Intelligence Provider Set;
- Research Workflow Set;
- Identity and Access Set;
- Notification Set;
- Graph Version Set;
- Operational Threshold Set;
- Institution Policy Set;
- Educational Intervention Set.

### 8.4 Attributes

- Configuration Set Id;
- Name;
- Domain;
- Configuration Items;
- Dependencies;
- Validation Rules;
- Owner;
- Status;
- Semantic Version;
- Provenance.

### 8.5 Rules

- Configuration sets must declare dependencies.
- Configuration sets must be independently validatable where practical.
- Changes require impact assessment.
- Sets cannot conceal unapproved item changes.

---

## 9. Configuration Item Aggregate

### 9.1 Identity

`ConfigurationItemId`

### 9.2 Purpose

A Configuration Item represents one governed configurable value or reference.

### 9.3 Attributes

- Configuration Item Id;
- Name;
- Key;
- Value Type;
- Value or Reference;
- Default;
- Allowed Values;
- Validation;
- Sensitivity;
- Owner;
- Effective Period;
- Environment Scope;
- Status;
- Semantic Version;
- Provenance.

### 9.4 Sensitivity levels

- Public;
- Internal;
- Confidential;
- Secret Reference;
- Governance Restricted.

### 9.5 Rules

- Configuration types must be explicit.
- Invalid values cannot be activated.
- Sensitive values require appropriate handling.
- Secret values must not be stored directly.
- Defaults must be intentional.
- Configuration changes must remain traceable.

---

## 10. Configuration Schema

A Configuration Schema defines the structure, constraints, and compatibility of
configuration objects.

### Attributes

- Configuration Schema Id;
- Name;
- Version;
- Fields;
- Types;
- Required Items;
- Validation Rules;
- Compatibility Rules;
- Migration Rules;
- Status;
- Provenance.

### Rules

- Schema changes require compatibility assessment.
- Deprecated fields require migration guidance.
- Schema validation precedes environment promotion.

---

## 11. Environment Aggregate

### 11.1 Identity

`EnvironmentId`

### 11.2 Purpose

An Environment represents a governed execution context.

### 11.3 Environment classes

- Local Development;
- Shared Development;
- Test;
- Quality Assurance;
- User Acceptance Testing;
- Staging;
- Pilot;
- Production;
- Demonstration;
- Training;
- Disaster Recovery.

### 11.4 Attributes

- Environment Id;
- Name;
- Environment Class;
- Purpose;
- Owner;
- Platform Configuration;
- Data Classification;
- Allowed Identities;
- Allowed Integrations;
- Deployment Policy;
- Change Windows;
- Baseline;
- Status;
- Provenance.

### 11.5 Rules

- Every environment has a declared purpose.
- Production data must not be copied to lower environments without protection.
- Test environments must not become undocumented production systems.
- Environment-specific controls must be explicit.
- Demonstration environments must not expose live sensitive data.
- Environment identity must be visible to operators and users where relevant.

---

## 12. Environment Baseline

An Environment Baseline defines the approved expected state of an environment.

### Attributes

- Environment Baseline Id;
- Environment;
- Platform Configuration Version;
- Deployment Version;
- Contract Versions;
- Graph Versions;
- Feature States;
- Migration State;
- Approved At;
- Status;
- Provenance.

### Rules

- Baselines are immutable after approval.
- New baselines supersede rather than overwrite.
- Drift is measured against an approved baseline.

---

## 13. Feature Aggregate

### 13.1 Identity

`FeatureId`

### 13.2 Purpose

A Feature represents a deployable or activatable platform capability.

### 13.3 Attributes

- Feature Id;
- Name;
- Description;
- Domain Owner;
- Educational Purpose;
- User Groups;
- Dependencies;
- Risk Classification;
- Data Impact;
- Security Impact;
- Explainability Requirement;
- Lifecycle State;
- Semantic Version;
- Provenance.

### 13.4 Lifecycle states

- Proposed;
- Designed;
- Implemented;
- Internal;
- Beta;
- Pilot;
- General Availability;
- Deprecated;
- Retired;
- Removed.

### 13.5 Rules

- Feature existence is distinct from feature activation.
- Learner-facing features require educational purpose.
- High-impact features require stronger validation.
- Deprecated features require migration and retirement planning.
- Feature ownership must be explicit.

---

## 14. Feature Flag Aggregate

### 14.1 Identity

`FeatureFlagId`

### 14.2 Purpose

A Feature Flag controls runtime exposure of a Feature.

### 14.3 Attributes

- Feature Flag Id;
- Feature;
- Default State;
- Exposure Rules;
- Environment Scope;
- Audience Scope;
- Institution Scope;
- Programme Scope;
- Percentage;
- Effective Period;
- Kill Switch;
- Owner;
- Status;
- Expiry;
- Provenance.

### 14.4 States

- Disabled;
- Internal;
- Beta;
- Pilot;
- Limited Availability;
- Institution;
- General Availability;
- Deprecated;
- Removed.

### 14.5 Rules

- Feature flags require owners and expiry.
- Flag state changes are auditable.
- Flags must not permanently replace architecture.
- Kill switches must be tested for high-risk features.
- Access control cannot be implemented solely through feature flags.
- Flag evaluation must be deterministic for the same context unless explicitly randomised.

---

## 15. Feature Exposure Rule

A Feature Exposure Rule defines who may receive a feature and under what
conditions.

### Attributes

- Exposure Rule Id;
- Feature Flag;
- Environment;
- Identity Attributes;
- Institution;
- Programme;
- User Role;
- Cohort;
- Percentage;
- Preconditions;
- Exclusions;
- Priority;
- Status;
- Provenance.

### Rules

- Exposure rules must not override access policy.
- Sensitive segmentation requires privacy review.
- Conflicts are resolved deterministically.
- Exposure must be reversible.

---

## 16. Experiment Flag Aggregate

### 16.1 Identity

`ExperimentFlagId`

### 16.2 Purpose

An Experiment Flag controls participation in an approved platform or educational
experiment.

### 16.3 Attributes

- Experiment Flag Id;
- Experiment;
- Hypothesis;
- Population;
- Allocation Method;
- Control Condition;
- Treatment Conditions;
- Consent Basis;
- Governance Approval;
- Ethics Review, when required;
- Start Time;
- End Time;
- Stop Conditions;
- Status;
- Provenance.

### 16.4 Rules

- Experiment flags are distinct from feature flags.
- Learner-facing experiments require explicit governance.
- Experiments must define stop conditions.
- Allocation must be auditable.
- Experiment participation must not silently disadvantage learners.
- Results must not be interpreted beyond the approved design.

---

## 17. Experiment Allocation

Experiment Allocation records the assignment of an eligible participant or
context to an experiment condition.

### Attributes

- Experiment Allocation Id;
- Experiment Flag;
- Subject or Context;
- Condition;
- Allocation Time;
- Allocation Method;
- Eligibility Evidence;
- Status;
- Provenance.

### Rules

- Allocation must be stable unless the design allows reassignment.
- Personally identifying allocation data requires protection.
- Withdrawal handling must be explicit.

---

## 18. Deployment Package Aggregate

### 18.1 Identity

`DeploymentPackageId`

### 18.2 Purpose

A Deployment Package represents the complete deployable change set.

### 18.3 Package contents

- Application Artifacts;
- Configuration Schemas;
- Configuration Defaults;
- Database Migrations;
- Event Migrations;
- Graph Migrations;
- Methodology Changes;
- Prompt or Intelligence Changes;
- Contract Changes;
- Feature Definitions;
- Runbooks;
- Rollback Artifacts;
- Release Evidence.

### 18.4 Attributes

- Deployment Package Id;
- Version;
- Contents;
- Build Provenance;
- Integrity Evidence;
- Dependencies;
- Target Environments;
- Compatibility Requirements;
- Rollback Package;
- Status;
- Provenance.

### 18.5 Rules

- Deployment packages must be immutable after approval.
- Package integrity must be verifiable.
- Package contents must be complete.
- Untracked manual changes are prohibited.
- AI prompt and methodology changes are deployment artifacts.

---

## 19. Release Aggregate

### 19.1 Identity

`ReleaseId`

### 19.2 Purpose

A Release represents an approved versioned platform change intended for
deployment and controlled activation.

### 19.3 Attributes

- Release Id;
- Version;
- Name;
- Objectives;
- Deployment Package;
- Included Features;
- Included Fixes;
- Configuration Changes;
- Migrations;
- Compatibility Assessments;
- Educational Impact;
- Security Impact;
- Privacy Impact;
- Operational Impact;
- Rollback Strategy;
- Release Evidence;
- Approvals;
- Status;
- Provenance.

### 19.4 Status

- Planned;
- Candidate;
- Validating;
- Approved;
- Scheduled;
- Deploying;
- Deployed;
- Rolling Out;
- Completed;
- Paused;
- Rolled Back;
- Failed;
- Superseded;
- Retired.

### 19.5 Rules

- Releases require version identity.
- Release objectives must be explicit.
- Release approval is distinct from deployment success.
- Material AI behaviour changes require educational validation.
- Release completion requires evidence.
- Failed releases remain auditable.

---

## 20. Release Candidate

A Release Candidate is a release version undergoing validation.

### Attributes

- Release Candidate Id;
- Release;
- Candidate Number;
- Deployment Package;
- Validation Results;
- Known Issues;
- Status;
- Provenance.

### Rules

- Candidate content is immutable.
- A changed candidate becomes a new candidate.
- Production approval references a specific candidate.

---

## 21. Release Evidence Aggregate

### 21.1 Identity

`ReleaseEvidenceId`

### 21.2 Purpose

Release Evidence records the evidence supporting a release decision.

### Evidence categories

- Automated Test Results;
- Domain Validation;
- Contract Validation;
- Migration Test;
- Security Review;
- Privacy Review;
- Educational Validation;
- Explainability Validation;
- Performance Test;
- Resilience Test;
- Backup and Restore Test;
- Accessibility Review;
- Operational Readiness;
- Pilot Findings;
- Approval Record.

### Attributes

- Release Evidence Id;
- Release;
- Evidence Type;
- Source;
- Result;
- Scope;
- Limitations;
- Collected At;
- Integrity Evidence;
- Status;
- Provenance.

### Rules

- Evidence must identify scope and limitations.
- Evidence from a different candidate cannot be silently reused.
- Failed evidence requires disposition.
- Release evidence must be retained according to policy.

---

## 22. Migration Aggregate

### 22.1 Identity

`MigrationId`

### 22.2 Purpose

A Migration transforms platform state from one compatible version to another.

### 22.3 Migration types

- Database Schema;
- Data;
- Event Schema;
- Projection;
- Knowledge Graph;
- Decision Graph;
- Learning Graph;
- Capability Graph;
- Identity Graph;
- Operational Graph;
- Configuration;
- Contract;
- Methodology;
- Prompt;
- Model;
- File Format.

### 22.4 Attributes

- Migration Id;
- Migration Type;
- Source Version;
- Target Version;
- Scope;
- Preconditions;
- Transformation;
- Validation;
- Rollback or Forward-Recovery Strategy;
- Expected Duration;
- Data Risk;
- Status;
- Provenance.

### 22.5 Rules

- Migrations require explicit source and target.
- Migrations must be tested.
- Irreversible migrations require stronger approval.
- Data loss or semantic loss must be disclosed.
- Projection rebuilds remain distinct from domain-state migration.
- Migration status must be resumable or recoverable where possible.

---

## 23. Migration Plan

A Migration Plan coordinates one or more ordered migrations.

### Attributes

- Migration Plan Id;
- Release;
- Migrations;
- Order;
- Dependency Rules;
- Downtime Requirement;
- Compatibility Window;
- Validation Checkpoints;
- Rollback Checkpoints;
- Status;
- Provenance.

### Rules

- Migration ordering must be explicit.
- Partial migration states must be defined.
- Long-running migrations require observability.
- Failure handling must be documented.

---

## 24. Compatibility Assessment Aggregate

### 24.1 Identity

`CompatibilityAssessmentId`

### 24.2 Purpose

A Compatibility Assessment determines whether a proposed change can coexist
with relevant existing versions, data, contracts, and behaviours.

### 24.3 Compatibility dimensions

- API Compatibility;
- Event Compatibility;
- Data Compatibility;
- Graph Compatibility;
- Methodology Compatibility;
- Configuration Compatibility;
- Identity Compatibility;
- Workflow Compatibility;
- Prompt Compatibility;
- Model Compatibility;
- Report Compatibility;
- Educational Behaviour Compatibility;
- Explainability Compatibility.

### 24.4 Outcomes

- Compatible;
- Compatible with Conditions;
- Migration Required;
- Parallel Operation Required;
- Pilot Only;
- Incompatible;
- Indeterminate.

### 24.5 Attributes

- Compatibility Assessment Id;
- Change;
- Source Version;
- Target Version;
- Dimensions;
- Findings;
- Conditions;
- Required Migrations;
- Risks;
- Outcome;
- Status;
- Provenance.

### 24.6 Rules

- Compatibility must be assessed, not assumed.
- Semantic compatibility is distinct from technical compatibility.
- Indeterminate high-impact compatibility blocks general rollout.
- Conditions must be enforceable.
- Backward and forward compatibility are assessed separately.

---

## 25. Compatibility Contract

A Compatibility Contract records a supported interoperability commitment.

### Attributes

- Compatibility Contract Id;
- Producer;
- Consumer;
- Supported Versions;
- Compatibility Type;
- Deprecation Window;
- Migration Path;
- Status;
- Provenance.

### Rules

- Contract changes require impact analysis.
- Unsupported combinations must be explicit.
- Deprecation requires notice and migration path.

---

## 26. Operational Readiness Assessment Aggregate

### 26.1 Identity

`OperationalReadinessAssessmentId`

### 26.2 Purpose

An Operational Readiness Assessment determines whether a release can be safely
operated.

### 26.3 Assessment dimensions

- Observability;
- Alerting;
- SLOs;
- Capacity;
- Backup;
- Restore;
- Rollback;
- Runbooks;
- Incident Response;
- Support Readiness;
- Dependency Readiness;
- Security;
- Privacy;
- Educational Validation;
- Governance;
- Accessibility;
- Documentation.

### 26.4 Outcomes

- Ready;
- Ready with Conditions;
- Pilot Ready;
- Additional Evidence Required;
- Not Ready;
- Indeterminate.

### 26.5 Rules

- Build success does not establish readiness.
- Missing rollback or recovery evidence blocks high-risk releases.
- Conditions require owners and due dates.
- Indeterminate critical readiness blocks production approval.

---

## 27. Deployment Approval Aggregate

### 27.1 Identity

`DeploymentApprovalId`

### 27.2 Purpose

Deployment Approval records formal authorisation to deploy or roll out a release.

### 27.3 Approval types

- Architecture;
- Domain;
- Educational;
- Security;
- Privacy;
- Operational;
- Data Migration;
- Institutional;
- Ethics;
- Executive Risk Acceptance.

### 27.4 Attributes

- Deployment Approval Id;
- Release;
- Approval Type;
- Approver;
- Authority Basis;
- Scope;
- Conditions;
- Decision;
- Effective Period;
- Status;
- Provenance.

### 27.5 Decisions

- Approved;
- Approved with Conditions;
- Pilot Only;
- Deferred;
- Rejected;
- Withdrawn;
- Expired.

### 27.6 Rules

- Approvers require relevant authority.
- Self-approval restrictions may apply.
- Approval conditions must be tracked.
- Material release changes invalidate affected approvals.
- Approval withdrawal must be effective immediately where required.

---

## 28. Rollout Aggregate

### 28.1 Identity

`RolloutId`

### 28.2 Purpose

A Rollout controls progressive exposure of a deployed Release.

### 28.3 Rollout strategies

- Internal;
- Canary;
- Percentage;
- Cohort;
- Programme;
- Institution;
- Region;
- Pilot;
- Blue-Green;
- Parallel;
- General Availability.

### 28.4 Attributes

- Rollout Id;
- Release;
- Environment;
- Strategy;
- Segments;
- Start Time;
- Step Schedule;
- Monitoring Criteria;
- Success Criteria;
- Pause Criteria;
- Rollback Criteria;
- Current State;
- Status;
- Provenance.

### 28.5 Rules

- Deployment is distinct from rollout.
- Rollout exposure must be observable.
- Each step requires evaluation.
- Material trust, privacy, or educational degradation pauses rollout.
- General availability requires completed approval conditions.
- Rollout changes are auditable.

---

## 29. Rollout Segment

A Rollout Segment defines one exposure population.

### Attributes

- Rollout Segment Id;
- Rollout;
- Audience;
- Institution;
- Programme;
- Cohort;
- Percentage;
- Feature State;
- Start Time;
- Exit Criteria;
- Status;
- Provenance.

### Rules

- Segments must be unambiguous.
- Segment selection must not create unfair educational disadvantage.
- Sensitive segmentation requires review.

---

## 30. Rollback Aggregate

### 30.1 Identity

`RollbackId`

### 30.2 Purpose

A Rollback restores a prior safe platform state after a failed or harmful change.

### 30.3 Rollback scope

- Application;
- Configuration;
- Feature State;
- Contract;
- Database;
- Graph;
- Prompt;
- Model;
- Integration;
- Deployment;
- Release.

### 30.4 Attributes

- Rollback Id;
- Release;
- Trigger;
- Scope;
- Target State;
- Data Consequences;
- Compatibility Consequences;
- Steps;
- Validation;
- Authority;
- Started At;
- Completed At;
- Status;
- Provenance.

### 30.5 Rules

- Rollback must define target state.
- Rollback completion requires validation.
- Data consequences must be disclosed.
- Irreversible changes require forward-recovery planning.
- Partial rollback must remain explicit.
- Rollback does not erase release audit history.

---

## 31. Configuration Drift Aggregate

### 31.1 Identity

`ConfigurationDriftId`

### 31.2 Purpose

Configuration Drift represents divergence between an approved Environment
Baseline and actual environment state.

### 31.3 Drift types

- Expected;
- Approved Temporary;
- Unapproved;
- Emergency;
- Security-Critical;
- Unknown.

### 31.4 Attributes

- Configuration Drift Id;
- Environment;
- Baseline;
- Actual State;
- Difference;
- Detected At;
- Source;
- Impact;
- Risk;
- Owner;
- Expiry;
- Remediation;
- Status;
- Provenance.

### 31.5 Rules

- Drift must be visible.
- Unapproved production drift requires investigation.
- Emergency changes require retrospective review.
- Temporary drift must expire or be incorporated into a new baseline.
- Drift must not be normalised through silence.

---

## 32. Environment Promotion Aggregate

### 32.1 Identity

`EnvironmentPromotionId`

### 32.2 Purpose

Environment Promotion advances an approved release and configuration from one
environment stage to another.

### 32.3 Attributes

- Environment Promotion Id;
- Release;
- Source Environment;
- Target Environment;
- Source Baseline;
- Target Requirements;
- Evidence;
- Approvals;
- Differences;
- Scheduled Window;
- Status;
- Provenance.

### 32.4 Rules

- Promotion is evidence-based.
- Rebuilding the same immutable package is preferred over copying runtime state.
- Environment-specific configuration differences must be declared.
- Production promotion requires explicit approval.
- Failed promotions remain auditable.

---

## 33. Change Window

A Change Window defines when a class of change may occur.

### Attributes

- Change Window Id;
- Environment;
- Start;
- End;
- Allowed Change Types;
- Required Staffing;
- Freeze Periods;
- Emergency Exception;
- Status;
- Provenance.

### Rules

- High-risk changes require suitable support coverage.
- Academic deadlines and assessment periods may create freeze periods.
- Emergency exceptions require authority and audit.

---

## 34. Release Audit Record Aggregate

### 34.1 Identity

`ReleaseAuditRecordId`

### 34.2 Purpose

A Release Audit Record preserves append-only evidence of material configuration,
deployment, rollout, migration, approval, and rollback actions.

### 34.3 Auditable activities

- Configuration Activation;
- Feature Flag Change;
- Experiment Allocation Change;
- Deployment;
- Release Approval;
- Migration;
- Environment Promotion;
- Rollout Step;
- Rollout Pause;
- Rollback;
- Emergency Change;
- Drift Acceptance;
- Approval Withdrawal.

### 34.4 Attributes

- Release Audit Record Id;
- Activity;
- Actor;
- Authority;
- Environment;
- Release;
- Before State;
- After State;
- Evidence;
- Rationale;
- Timestamp;
- Integrity Evidence;
- Provenance.

### 34.5 Rules

- Audit records are append-only.
- Corrections are linked.
- Manual changes require attribution.
- Auditability must not expose secret values.
- Automation must identify the responsible service principal and policy.

---

## 35. Platform Evolution Engine

The Platform Evolution Engine evaluates whether a proposed change should become
part of BRM.

### 35.1 Inputs

- Proposed Release;
- Deployment Package;
- Platform Configuration;
- Environment;
- Feature and Flag State;
- Experiment Design;
- Migration Plan;
- Compatibility Assessments;
- Release Evidence;
- Operational Readiness;
- Deployment Approvals;
- Educational Impact;
- Governance Impact;
- Security Impact;
- Privacy Impact;
- Explainability Impact;
- Learner Impact;
- Supervisor Impact;
- Rollback Readiness;
- Long-Term Maintainability;
- Platform Health State.

### 35.2 Outputs

- Evolution Decision;
- permitted environments;
- rollout constraints;
- required approvals;
- required evidence;
- migration requirements;
- compatibility conditions;
- monitoring requirements;
- rollback requirements;
- stop conditions;
- rationale;
- confidence;
- provenance.

### 35.3 Evolution decisions

- Approved;
- Approved with Conditions;
- Internal Only;
- Pilot Only;
- Institution Trial;
- Additional Validation Required;
- Governance Review Required;
- Migration Required;
- Paused;
- Rejected;
- Indeterminate.

### 35.4 Responsibilities

The engine must:

- validate architecture and domain compatibility;
- evaluate educational impact;
- evaluate AI reasoning and explainability impact;
- evaluate privacy and security impact;
- evaluate operational readiness;
- evaluate rollback and recovery readiness;
- evaluate environment suitability;
- validate approval coverage;
- recommend rollout strategy;
- identify stop conditions;
- explain its conclusion;
- route high-impact ambiguity to human review.

### 35.5 Rules

- The engine advises; authorised humans approve.
- High-impact indeterminate changes do not proceed to general availability.
- Technical success does not override educational harm.
- Educational benefit does not override privacy or security.
- Engine decisions must cite evidence.
- The engine must not self-approve its own changes.
- Change evaluation must remain contestable.

---

## 36. Platform Evolution Graph Aggregate

### 36.1 Identity

`PlatformEvolutionGraphId`

### 36.2 Purpose

The Platform Evolution Graph represents relationships among configurations,
features, environments, packages, releases, migrations, contracts, approvals,
rollouts, rollbacks, drift, evidence, and operational outcomes.

### 36.3 Node types

- Platform Configuration;
- Configuration Set;
- Configuration Item;
- Environment;
- Environment Baseline;
- Feature;
- Feature Flag;
- Experiment Flag;
- Deployment Package;
- Release;
- Release Candidate;
- Release Evidence;
- Migration;
- Compatibility Assessment;
- Compatibility Contract;
- Operational Readiness Assessment;
- Deployment Approval;
- Rollout;
- Rollback;
- Configuration Drift;
- Environment Promotion;
- Release Audit Record.

### 36.4 Edge types

- Contains;
- Configures;
- Activates;
- Targets;
- Depends On;
- Built From;
- Includes;
- Migrates;
- Compatible With;
- Incompatible With;
- Approved By;
- Evidenced By;
- Promoted To;
- Rolled Out To;
- Rolled Back To;
- Deviates From;
- Supersedes;
- Restricted By;
- Observed Through;
- Caused.

### 36.5 Rules

- Every material edge requires provenance.
- Compatibility edges include direction.
- Approval edges include scope and effective period.
- Causal edges distinguish confirmed from suspected.
- Graph access follows identity and trust policy.
- Historical release relationships are never destructively removed.

---

## 37. Relationship to Existing Architecture

BRM now includes:

### Governance Layer

Authority, review, decisions, appeals, institutional control.

### Identity and Trust Layer

Identity, access, privacy, trust, security, incidents.

### Knowledge–Evidence Network

Sources, claims, evidence, contradictions, provenance.

### Domain and Intelligence Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph;
- Capability Graph;
- Intelligence Graph;
- Integration Graph;
- Identity and Trust Graph;
- Operational Intelligence Graph;
- Platform Evolution Graph.

### Application and Integration Layer

Use cases, services, workflows, contracts, commands, events, projections.

### Operational Intelligence Layer

Signals, health, SLOs, incidents, recovery, continuity, audit.

### Platform Operations Layer

Configuration, environments, features, experiments, releases, migrations,
compatibility, approval, rollout, rollback, and drift.

### Infrastructure Layer

Build systems, deployment platforms, runtime environments, configuration stores,
feature-management infrastructure, artifact registries, and cloud resources.

The Platform Operations Layer governs how BRM evolves without losing its
educational, architectural, security, or operational integrity.

---

## 38. Domain Services

### 38.1 Configuration Resolution Service

Resolves effective configuration for an environment and context.

### 38.2 Configuration Validation Service

Validates configuration schemas, values, dependencies, and policy.

### 38.3 Feature Evaluation Service

Determines effective feature state for a request context.

### 38.4 Experiment Allocation Service

Allocates eligible contexts to approved experiment conditions.

### 38.5 Package Integrity Service

Validates deployment-package integrity and completeness.

### 38.6 Release Coordination Service

Coordinates release lifecycle and evidence.

### 38.7 Migration Coordination Service

Coordinates ordered migrations and recovery checkpoints.

### 38.8 Compatibility Evaluation Service

Evaluates technical and semantic compatibility.

### 38.9 Operational Readiness Service

Assesses readiness across operational, educational, security, privacy, and
governance dimensions.

### 38.10 Approval Coordination Service

Validates approval coverage and conditions.

### 38.11 Rollout Coordination Service

Coordinates progressive exposure, monitoring, pause, and completion.

### 38.12 Rollback Coordination Service

Coordinates controlled restoration or forward recovery.

### 38.13 Drift Detection Service

Compares actual environment state with approved baseline.

### 38.14 Environment Promotion Service

Coordinates evidence-based promotion between environments.

### 38.15 Change Impact Service

Traces how proposed changes affect bounded contexts, contracts, graphs,
workflows, users, policies, and operational objectives.

---

## 39. Domain Policies

### 39.1 Governed Configuration Policy

Active configuration is versioned, reproducible, and approved.

### 39.2 Environment Purpose Policy

Every environment has declared purpose and controls.

### 39.3 Feature Expiry Policy

Feature flags have owners and expiry.

### 39.4 Experiment Governance Policy

Learner-facing experiments require approval and safeguards.

### 39.5 Immutable Package Policy

Approved deployment packages are immutable.

### 39.6 Evidence-Based Release Policy

Release decisions require relevant evidence.

### 39.7 Compatibility Before Promotion Policy

Compatibility is assessed before promotion.

### 39.8 Operational Readiness Policy

Build success alone cannot authorise deployment.

### 39.9 Progressive Rollout Policy

High-impact changes use controlled rollout.

### 39.10 Safe Reversal Policy

High-risk changes require rollback or forward-recovery strategy.

### 39.11 Drift Visibility Policy

Unexpected environment drift is detected and reviewed.

### 39.12 Educational Change Policy

Material changes to mentoring behaviour require educational assessment.

### 39.13 Approval Integrity Policy

Material release changes invalidate affected approvals.

### 39.14 Release Audit Integrity Policy

Material platform changes are append-only and attributable.

---

## 40. Aggregate Invariants

The domain must enforce:

1. Platform Configuration is the central aggregate.
2. Every running environment references an active configuration.
3. Active configuration is reproducible.
4. Secret values are not embedded in configuration.
5. Configuration changes are versioned.
6. Every environment has declared purpose.
7. Production data is protected outside production.
8. Environment baselines are immutable.
9. Feature existence is distinct from activation.
10. Feature flags have owners and expiry.
11. Feature flags do not replace access control.
12. Experiment flags are distinct from feature flags.
13. Learner-facing experiments require governance.
14. Deployment packages are immutable after approval.
15. AI prompts and methodologies are deployment artifacts.
16. Releases have explicit objectives.
17. Release approval is distinct from deployment success.
18. Evidence scope and limitations are explicit.
19. Migrations define source and target versions.
20. Irreversible migrations require stronger approval.
21. Compatibility is assessed, not assumed.
22. Semantic compatibility is distinct from technical compatibility.
23. High-impact indeterminate compatibility blocks general rollout.
24. Operational readiness includes rollback and recovery.
25. Approvers have relevant authority.
26. Material changes invalidate affected approvals.
27. Deployment is distinct from rollout.
28. Rollout steps are observable.
29. Educational, trust, privacy, or security degradation can pause rollout.
30. Rollback defines a target state.
31. Rollback completion requires validation.
32. Partial rollback remains explicit.
33. Drift is visible.
34. Temporary drift expires or becomes a new baseline.
35. Environment promotion is evidence-based.
36. Manual changes are attributable.
37. Release audit records are append-only.
38. The Platform Evolution Engine cannot self-approve.
39. Technical success does not override educational harm.
40. Platform evolution remains governed, reversible, explainable, and auditable.

---

## 41. Commands

Initial commands include:

- Create Platform Configuration
- Activate Platform Configuration
- Supersede Platform Configuration
- Create Configuration Set
- Create Configuration Item
- Create Configuration Schema
- Create Environment
- Approve Environment Baseline
- Create Feature
- Create Feature Flag
- Change Feature Flag State
- Create Feature Exposure Rule
- Create Experiment Flag
- Allocate Experiment Condition
- Create Deployment Package
- Verify Deployment Package
- Create Release
- Create Release Candidate
- Add Release Evidence
- Create Migration
- Create Migration Plan
- Assess Compatibility
- Create Compatibility Contract
- Assess Operational Readiness
- Create Deployment Approval
- Withdraw Deployment Approval
- Create Rollout
- Advance Rollout
- Pause Rollout
- Complete Rollout
- Create Rollback
- Execute Rollback
- Detect Configuration Drift
- Accept Temporary Drift
- Remediate Configuration Drift
- Promote Environment
- Create Change Window
- Create Release Audit Record
- Add Platform Evolution Graph Node
- Add Platform Evolution Graph Edge
- Conduct Change Impact Analysis

---

## 42. Domain Events

Initial events include:

- PlatformConfigurationCreated
- PlatformConfigurationActivated
- PlatformConfigurationSuperseded
- ConfigurationSetCreated
- ConfigurationItemCreated
- ConfigurationSchemaCreated
- EnvironmentCreated
- EnvironmentBaselineApproved
- FeatureCreated
- FeatureFlagCreated
- FeatureFlagStateChanged
- FeatureExposureRuleCreated
- ExperimentFlagCreated
- ExperimentConditionAllocated
- DeploymentPackageCreated
- DeploymentPackageVerified
- ReleaseCreated
- ReleaseCandidateCreated
- ReleaseEvidenceAdded
- MigrationCreated
- MigrationPlanCreated
- CompatibilityAssessed
- CompatibilityContractCreated
- OperationalReadinessAssessed
- DeploymentApprovalCreated
- DeploymentApprovalWithdrawn
- RolloutCreated
- RolloutAdvanced
- RolloutPaused
- RolloutCompleted
- RollbackCreated
- RollbackExecuted
- ConfigurationDriftDetected
- TemporaryDriftAccepted
- ConfigurationDriftRemediated
- EnvironmentPromoted
- ChangeWindowCreated
- ReleaseAuditRecordCreated
- PlatformEvolutionGraphNodeAdded
- PlatformEvolutionGraphEdgeAdded
- ChangeImpactAnalysisConducted

---

## 43. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Activate Configuration | PlatformConfigurationActivated | Governed Configuration Policy | Active state is reproducible |
| Change Feature Flag | FeatureFlagStateChanged | Feature Expiry Policy | Flag is owned and auditable |
| Create Experiment | ExperimentFlagCreated | Experiment Governance Policy | Learner experiments require approval |
| Verify Package | DeploymentPackageVerified | Immutable Package Policy | Approved package is immutable |
| Create Release | ReleaseCreated | Evidence-Based Release Policy | Objectives are explicit |
| Assess Compatibility | CompatibilityAssessed | Compatibility Before Promotion Policy | Compatibility is not assumed |
| Assess Readiness | OperationalReadinessAssessed | Operational Readiness Policy | Build success is insufficient |
| Advance Rollout | RolloutAdvanced | Progressive Rollout Policy | Step is observable |
| Execute Rollback | RollbackExecuted | Safe Reversal Policy | Target state is validated |
| Detect Drift | ConfigurationDriftDetected | Drift Visibility Policy | Drift remains visible |

---

## 44. Authority Model

### 44.1 Platform Operations services may

- validate configuration;
- evaluate feature exposure;
- allocate approved experiments;
- verify packages;
- coordinate releases;
- coordinate migrations;
- assess compatibility;
- assess readiness;
- coordinate rollout;
- recommend pause or rollback;
- detect drift;
- coordinate environment promotion;
- create release audit records.

### 44.2 Platform Operations services may not

- self-approve releases;
- bypass governance;
- expose features beyond access policy;
- run unapproved learner experiments;
- conceal configuration drift;
- alter approved packages;
- represent failed rollout as complete;
- erase release history;
- override domain truth.

### 44.3 Authorised operators may

- activate approved configuration;
- deploy approved packages;
- advance or pause rollout;
- execute approved rollback;
- remediate drift;
- promote environments;
- apply emergency changes under policy.

### 44.4 Governance authorities may

- approve high-impact releases;
- approve experiments;
- approve irreversible migrations;
- approve production promotion;
- approve residual risk;
- withdraw deployment authority;
- require rollback or suspension.

---

## 45. Cross-Context Interfaces

### BRMF-211 Intelligence Context

Provides:

- prompt, model, methodology, and intelligence changes;
- educational validation requirements;
- explainability requirements.

Receives:

- approved configuration;
- feature state;
- rollout constraints;
- compatibility findings;
- release restrictions.

### BRMF-212 Integration Context

Provides:

- contracts;
- workflow versions;
- event versions;
- projection dependencies;
- migration needs.

Receives:

- release versions;
- compatibility conditions;
- environment state;
- rollout status;
- rollback instructions.

### BRMF-213 Identity and Trust Context

Provides:

- access policies;
- identity-provider configuration;
- privacy requirements;
- security approval.

Receives:

- active environment configuration;
- approved feature exposure;
- release and migration state;
- audit evidence.

### BRMF-214 Operational Resilience Context

Provides:

- health state;
- SLO performance;
- alert status;
- incident state;
- backup and restore readiness;
- capacity findings.

Receives:

- release markers;
- rollout segments;
- configuration versions;
- stop conditions;
- rollback state.

### Governance and Educational Contexts

Provide:

- educational requirements;
- institutional policy;
- ethical constraints;
- approval authority.

Receive:

- change impact;
- release evidence;
- experiment state;
- rollout findings;
- platform evolution decisions.

---

## 46. Privacy, Security, Fairness, and Audit Safeguards

The domain must support:

- configuration secrecy by reference;
- environment data separation;
- production-data protection;
- least-privilege deployment authority;
- signed or integrity-verified artifacts;
- controlled experiments;
- consent and ethics checks;
- immutable release candidates;
- compatibility validation;
- progressive rollout;
- kill switches;
- rollback validation;
- drift detection;
- append-only release audit;
- non-discriminatory rollout segmentation;
- educational-impact review;
- security and privacy approvals;
- safe emergency-change procedures.

Feature management and experimentation must never become hidden manipulation of
learners or supervisors.

---

## 47. Reporting

Reports may include:

- Platform Configuration Register;
- Configuration Set Catalogue;
- Configuration Item Catalogue;
- Environment Register;
- Environment Baseline Report;
- Feature Catalogue;
- Feature Flag Register;
- Feature Flag Expiry Report;
- Experiment Register;
- Deployment Package Register;
- Release Register;
- Release Evidence Report;
- Migration Register;
- Compatibility Assessment Report;
- Operational Readiness Report;
- Deployment Approval Register;
- Rollout Status Report;
- Rollback Register;
- Configuration Drift Report;
- Environment Promotion Report;
- Change Window Calendar;
- Release Audit Report;
- Platform Evolution Decision Report;
- Platform Evolution Graph View.

Reports must distinguish:

- deployed;
- activated;
- rolled out;
- paused;
- partially rolled back;
- fully rolled back;
- drifted;
- approved with conditions;
- pilot only;
- incompatible;
- indeterminate;
- superseded.

---

## 48. Example Scenario

A new version of the Pedagogical Reasoning Engine improves topic-selection
guidance and passes unit and integration tests.

The deployment package includes:

- application changes;
- revised prompts;
- a new methodology version;
- a Decision Graph migration;
- updated explainability templates;
- a feature flag;
- a rollback package.

The Compatibility Assessment finds:

- API compatibility: Compatible;
- event compatibility: Compatible;
- graph compatibility: Migration Required;
- educational behaviour compatibility: Pilot Only;
- explainability compatibility: Compatible with Conditions.

The Operational Readiness Assessment finds:

- observability: Ready;
- rollback: Ready;
- migration recovery: Ready;
- supervisor support guidance: Additional Evidence Required;
- educational validation: Pilot Ready.

The Platform Evolution Engine returns:

`Pilot Only`

with conditions:

1. deploy to staging;
2. promote to pilot after migration validation;
3. expose to one approved programme;
4. require supervisor-visible explanation;
5. monitor learner confusion signals;
6. pause if explainability completeness falls below threshold;
7. retain one-click kill switch;
8. conduct human review before wider rollout.

The release is deployed but not generally activated.

After a successful pilot and completed approval conditions, a new Deployment
Approval permits institution-level rollout.

This scenario demonstrates:

- test success is not sufficient;
- deployment differs from activation and rollout;
- AI and methodology changes are release artifacts;
- compatibility includes educational behaviour;
- progressive exposure protects learners;
- Platform Evolution is governed by evidence.

---

## 49. Validation Questions

Reviewers should confirm:

1. Is Platform Configuration correctly modelled as the central aggregate?
2. Are configuration sets, items, and schemas adequately distinguished?
3. Are environments purpose-governed?
4. Are environment baselines immutable?
5. Are features distinct from feature flags?
6. Are experiment flags distinct from feature flags?
7. Are learner-facing experiments governed?
8. Are deployment packages complete and immutable?
9. Are AI prompts and methodologies included as artifacts?
10. Are Release and Release Candidate distinguished?
11. Is Release Evidence sufficiently broad?
12. Are migrations typed and recoverable?
13. Is semantic compatibility distinguished from technical compatibility?
14. Is Operational Readiness broader than build success?
15. Are deployment approvals contextual and revocable?
16. Are rollout and deployment distinguished?
17. Are pause and stop conditions explicit?
18. Are rollback and forward recovery represented?
19. Is configuration drift governed?
20. Is environment promotion evidence-based?
21. Is release auditing append-only?
22. Does the Platform Evolution Engine evaluate educational, security, privacy,
    architectural, and operational impact?
23. Is self-approval prohibited?
24. Is the Platform Evolution Graph compatible with the wider architecture?
25. Are interfaces with BRMF-211 through BRMF-214 sufficient?
26. Is the domain ready to support safe platform evolution?

---

## 50. Acceptance Criteria

BRMF-215 may progress from Draft to Approved when:

- Platform Configuration is accepted;
- Configuration Set, Item, and Schema are accepted;
- Environment and Environment Baseline are accepted;
- Feature, Feature Flag, and Exposure Rule are accepted;
- Experiment Flag and Allocation are accepted;
- Deployment Package is accepted;
- Release, Release Candidate, and Release Evidence are accepted;
- Migration and Migration Plan are accepted;
- Compatibility Assessment and Contract are accepted;
- Operational Readiness Assessment is accepted;
- Deployment Approval is accepted;
- Rollout and Rollout Segment are accepted;
- Rollback is accepted;
- Configuration Drift is accepted;
- Environment Promotion and Change Window are accepted;
- Release Audit Record is accepted;
- Platform Evolution Engine is accepted;
- Platform Evolution Graph is accepted;
- privacy, security, fairness, reversibility, audit, and educational safeguards
  are accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved architectural contradiction remains.

---

## 51. Architecture Phase Recommendation

Following approval of BRMF-215, the BRMF architecture should distinguish two
approved architecture bands:

### Foundational Platform Architecture

BRMF-201 through BRMF-214

### Platform Evolution Architecture

BRMF-215 onward

This distinction preserves the foundational baseline while allowing controlled
specialisation and implementation architecture to continue.

---

## 52. Next Specification

The next recommended document is:

**BRMF-216 — Data Lifecycle, Information Governance, Records, and Archival Domain Model**

It will define:

- Information Asset;
- Record;
- Record Series;
- Data Classification;
- Data Owner;
- Data Steward;
- Data Custodian;
- Data Lineage;
- Data Quality Rule;
- Retention Schedule;
- Disposal Authority;
- Archive;
- Legal Hold Coordination;
- Institutional Record;
- Research Record;
- Educational Record;
- Audit Record;
- Versioned Snapshot;
- Data Export;
- Data Portability;
- De-Identification;
- data lifecycle governance across all BRM contexts.

---

**End of BRMF-215**
