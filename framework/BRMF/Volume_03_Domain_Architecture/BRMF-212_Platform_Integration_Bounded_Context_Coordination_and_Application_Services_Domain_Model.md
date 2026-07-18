# BRMF-212 — Platform Integration, Bounded Context Coordination, and Application Services Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-110, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207, BRMF-208, BRMF-209, BRMF-210, BRMF-211  
**Prepares:** BRMF Architecture Version 1.0 baseline and BRMF-213

---

## 1. Purpose

This document defines the domain model for platform integration, application
services, use cases, workflows, process managers, sagas, cross-context commands,
cross-context events, bounded-context contracts, anti-corruption layers, read
models, projections, notifications, work queues, retries, idempotency,
compensation, transaction boundaries, consistency models, API boundaries,
integration policies, and platform-level coordination across the Business
Research Mentor (BRM).

It establishes the following as first-class platform capabilities:

- Application Service;
- Use Case;
- Workflow;
- Process Manager;
- Saga;
- Context Contract;
- Cross-Context Command;
- Cross-Context Event;
- Anti-Corruption Layer;
- Read Model;
- Projection;
- Platform Coordination Engine;
- Integration Graph.

The model ensures that BRM bounded contexts remain autonomous while participating
in coherent end-to-end educational and governance processes.

---

## 2. Core Principle

Bounded contexts collaborate through explicit contracts.

They do not manipulate one another's internal state.

The canonical application flow is:

Use Case  
→ Application Service  
→ Workflow  
→ Process Manager  
→ Domain Commands  
→ Bounded Contexts  
→ Domain Events  
→ Projections  
→ Read Models  
→ Notifications  
→ Application Result

The central aggregate is:

`ApplicationService`

The governing question is:

> How should BRM coordinate a complete user or institutional use case across
> autonomous bounded contexts without coupling their internal models?

---

## 3. Constitutional Role

BRMF-212 defines coordination, not domain truth.

Application services may:

- interpret an application-level use case;
- validate request shape;
- verify access and authority;
- coordinate bounded contexts;
- dispatch commands;
- react to events;
- manage long-running workflows;
- request human review;
- build application responses;
- update projections;
- publish notifications;
- manage retries, compensation, and failure.

Application services must not:

- contain core domain rules;
- directly mutate another context's database;
- bypass context contracts;
- treat APIs as the domain model;
- silently share internal entities across contexts;
- create cyclic context dependencies;
- hide partial workflow failure;
- guarantee global immediate consistency where it is not required;
- bypass governance, provenance, or educational constraints.

---

## 4. Bounded Context

### 4.1 Context name

**Platform Integration, Bounded Context Coordination, and Application Services Context**

### 4.2 Responsibilities

The context owns:

- Use Case;
- Application Service;
- Application Request;
- Application Result;
- Workflow;
- Workflow Step;
- Process Manager;
- Saga;
- Saga Step;
- Compensation Action;
- Context Contract;
- Published Language;
- Cross-Context Command;
- Cross-Context Event;
- Event Subscription;
- Anti-Corruption Layer;
- External Integration;
- API Boundary;
- Read Model;
- Projection;
- Notification;
- Work Item;
- Work Queue;
- Idempotency Record;
- Retry Policy;
- Transaction Boundary;
- Consistency Policy;
- Integration Policy;
- Platform Coordination Engine;
- Integration Graph.

### 4.3 Responsibilities excluded

The context does not own:

- business rules internal to domain aggregates;
- domain entity persistence;
- formal academic authority;
- intelligence reasoning;
- evidence semantics;
- learner capability semantics;
- provider-specific infrastructure implementation;
- UI layout;
- database technology;
- message-broker technology.

---

## 5. Aggregate Architecture

BRMF-212 defines the following collaborating aggregate roots:

1. Application Service
2. Use Case
3. Workflow
4. Process Manager
5. Saga
6. Context Contract
7. Cross-Context Command
8. Cross-Context Event
9. External Integration
10. Read Model
11. Projection
12. Notification
13. Work Queue
14. Integration Policy
15. Integration Graph

The central aggregate is:

`ApplicationService`

---

## 6. Governed Integration Object Conformance

Major integration objects must support, where applicable:

- stable identity;
- explicit owner;
- bounded-context attribution;
- semantic version;
- lifecycle;
- input and output contracts;
- idempotency;
- correlation;
- causation;
- retry;
- failure state;
- authority and access checks;
- provenance;
- observability;
- domain events.

No integration object may expose another bounded context's internal persistence
model as its public contract.

---

## 7. Use Case Aggregate

### 7.1 Identity

`UseCaseId`

### 7.2 Purpose

A Use Case represents an application-level goal pursued by a learner,
supervisor, program authority, administrator, or system actor.

### 7.3 Examples

- Start Research Project;
- Evaluate Research Topic;
- Create Research Decision;
- Prepare Supervisor Meeting;
- Submit Milestone;
- Assess Readiness;
- Request Academic Review;
- File Appeal;
- Create Evidence Dossier;
- Review Capability Development;
- Generate Reflection Session;
- Run Intelligence Task;
- View Program Progress;
- Resolve Research Blocker.

### 7.4 Attributes

- Use Case Id;
- Name;
- Purpose;
- Primary Actor;
- Supporting Actors;
- Preconditions;
- Trigger;
- Input Contract;
- Application Services;
- Participating Contexts;
- Success Outcome;
- Alternative Outcomes;
- Failure Outcomes;
- Authority Requirements;
- Privacy Requirements;
- Status;
- Semantic Version;
- Provenance.

### 7.5 Rules

- A use case describes user or institutional intent, not transport.
- One use case may coordinate multiple application services.
- Formal authority requirements must be explicit.
- Alternative and failure outcomes must be modelled.

---

## 8. Application Service Aggregate

### 8.1 Identity

`ApplicationServiceId`

### 8.2 Purpose

An Application Service coordinates one application capability across one or more
bounded contexts.

It owns coordination.

It does not own domain rules.

### 8.3 Examples

- Start Research Project Service;
- Evaluate Topic Service;
- Submit Milestone Service;
- Assess Readiness Service;
- Prepare Supervisor Review Service;
- Create Evidence Dossier Service;
- Generate Mentoring Intervention Service;
- Run Intelligence Request Service;
- Resolve Blocker Service;
- Build Program Dashboard Service.

### 8.4 Attributes

- Application Service Id;
- Name;
- Purpose;
- Supported Use Cases;
- Input Contract;
- Output Contract;
- Required Authority;
- Participating Contexts;
- Commands Dispatched;
- Events Consumed;
- Workflow;
- Process Manager;
- Transaction Boundary;
- Consistency Policy;
- Idempotency Requirement;
- Retry Policy;
- Failure Policy;
- Status;
- Semantic Version;
- Provenance.

### 8.5 Status

- Draft;
- Active;
- Restricted;
- Deprecated;
- Suspended;
- Retired.

### 8.6 Rules

- Application services coordinate but do not contain core business rules.
- Direct database access across contexts is prohibited.
- Application services must use context contracts.
- Side effects must be explicit.
- Every externally callable service requires an idempotency strategy where
  duplicate requests are possible.
- Service changes must preserve contract compatibility or create a new version.

---

## 9. Application Request

An Application Request is the transport-neutral input to an Application Service.

### Attributes

- Application Request Id;
- Application Service Id;
- Requester;
- Actor Role;
- Correlation Id;
- Idempotency Key;
- Input;
- Requested Outcome;
- Authority Context;
- Privacy Context;
- Channel;
- Timestamp;
- Provenance.

### Rules

- Request shape must match the service input contract.
- Transport metadata must not leak into domain semantics.
- Duplicate requests must be detected where required.
- Authority context must be validated, not trusted blindly.

---

## 10. Application Result

An Application Result represents the application-level outcome of a service.

### Result types

- Completed;
- Accepted for Processing;
- Partially Completed;
- Pending Human Review;
- Pending External Dependency;
- Rejected;
- Failed;
- Compensated;
- Cancelled;
- Indeterminate.

### Attributes

- Application Result Id;
- Application Service Id;
- Application Request Id;
- Result Type;
- Output;
- Domain Object References;
- Workflow Status;
- Pending Actions;
- Warnings;
- Failures;
- Consistency Status;
- Notification Status;
- Explanation;
- Provenance.

### Rules

- Partial completion must be explicit.
- Accepted-for-processing must not be represented as completed.
- Eventual-consistency lag must be disclosed where material.
- Failures must identify affected steps without exposing sensitive internals.

---

## 11. Workflow Aggregate

### 11.1 Identity

`WorkflowId`

### 11.2 Purpose

A Workflow represents a coordinated sequence of application and domain actions
required to complete a use case.

### 11.3 Workflow types

- Synchronous Workflow;
- Asynchronous Workflow;
- Human-in-the-Loop Workflow;
- Long-Running Workflow;
- Event-Driven Workflow;
- Scheduled Workflow;
- Recovery Workflow;
- Governance Workflow.

### 11.4 Attributes

- Workflow Id;
- Name;
- Purpose;
- Supported Use Case;
- Participating Contexts;
- Workflow Steps;
- Entry Conditions;
- Completion Conditions;
- Human Review Gates;
- Timeout Rules;
- Compensation Rules;
- Escalation Rules;
- Status;
- Semantic Version;
- Provenance.

### 11.5 Status

- Draft;
- Ready;
- Running;
- Waiting;
- Paused;
- Compensating;
- Completed;
- Failed;
- Cancelled;
- Superseded.

### 11.6 Rules

- Workflow steps must respect bounded-context ownership.
- Long-running workflows must tolerate asynchronous completion.
- Human review gates cannot be bypassed.
- Workflow state must remain recoverable.
- Workflow versions must preserve in-flight compatibility.

---

## 12. Workflow Step

### Step types

- Validate Request;
- Authorise Actor;
- Dispatch Command;
- Await Event;
- Invoke Application Service;
- Request Human Review;
- Update Projection;
- Send Notification;
- Invoke External Integration;
- Evaluate Condition;
- Retry;
- Compensate;
- Escalate;
- Complete.

### Attributes

- Workflow Step Id;
- Workflow Id;
- Step Type;
- Owner;
- Input;
- Output Contract;
- Preconditions;
- Dependencies;
- Timeout;
- Retry Policy;
- Compensation Action;
- Status;
- Correlation Id;
- Provenance.

---

## 13. Process Manager Aggregate

### 13.1 Identity

`ProcessManagerId`

### 13.2 Purpose

A Process Manager coordinates a long-running business process spanning multiple
bounded contexts.

### 13.3 Responsibilities

- track workflow state;
- correlate commands and events;
- determine the next step;
- manage timeouts;
- request human review;
- trigger retries;
- invoke compensation;
- escalate failure;
- preserve process history;
- report completion.

### 13.4 Attributes

- Process Manager Id;
- Process Type;
- Workflow Id;
- Correlation Id;
- Participating Contexts;
- Current State;
- Completed Steps;
- Pending Steps;
- Received Events;
- Dispatched Commands;
- Timeouts;
- Retry State;
- Compensation State;
- Human Review State;
- Status;
- Semantic Version;
- Provenance.

### 13.5 Rules

- A Process Manager coordinates; it does not own domain invariants.
- Process state must be durable.
- Duplicate events must be tolerated.
- Out-of-order events must be handled according to policy.
- Completed steps must not be silently repeated.
- Failed coordination must remain diagnosable.

---

## 14. Saga Aggregate

### 14.1 Identity

`SagaId`

### 14.2 Purpose

A Saga represents a distributed transaction composed of local transactions
across bounded contexts.

### 14.3 Saga styles

- Orchestrated Saga;
- Choreographed Saga;
- Hybrid Saga.

### 14.4 Attributes

- Saga Id;
- Process Manager Id;
- Saga Type;
- Saga Steps;
- Local Transactions;
- Compensation Actions;
- Completion Conditions;
- Failure Conditions;
- Status;
- Correlation Id;
- Provenance.

### 14.5 Status

- Planned;
- Running;
- Waiting;
- Compensating;
- Compensated;
- Completed;
- Failed;
- Manual Intervention Required.

### 14.6 Rules

- Each step owns a local transaction only.
- Global database transactions across contexts are prohibited.
- Compensation is semantic, not database rollback.
- Irreversible steps require explicit governance and recovery policy.
- Manual intervention must be supported.

---

## 15. Saga Step

### Attributes

- Saga Step Id;
- Saga Id;
- Owning Context;
- Command;
- Expected Event;
- Local Transaction;
- Timeout;
- Retry Policy;
- Compensation Action;
- Irreversibility;
- Status;
- Provenance.

---

## 16. Compensation Action

A Compensation Action defines how the platform responds when a completed saga
step must be semantically reversed or neutralised.

### Examples

- Withdraw pending review;
- Cancel notification;
- Mark milestone submission as withdrawn;
- Release reserved resource;
- Supersede provisional projection;
- Create corrective governance record.

### Rules

- Compensation must preserve history.
- Compensation must not pretend the original action never occurred.
- Irreversible effects require explicit corrective action.
- Compensation authority must be validated.

---

## 17. Context Contract Aggregate

### 17.1 Identity

`ContextContractId`

### 17.2 Purpose

A Context Contract defines the published language and integration boundary of a
bounded context.

### 17.3 Contract contents

- Context Identity;
- Published Commands;
- Published Events;
- Query Contracts;
- Error Contracts;
- Data Ownership;
- Authority Requirements;
- Privacy Classification;
- Versioning Policy;
- Compatibility Policy;
- Deprecation Policy;
- Service-Level Expectations;
- Provenance Requirements.

### 17.4 Status

- Draft;
- Published;
- Restricted;
- Deprecated;
- Retired.

### 17.5 Rules

- Internal entities are not public contracts by default.
- Contract ownership belongs to the publishing context.
- Breaking changes require a new major version.
- Consumers must not depend on undocumented fields.
- Contract deprecation requires a transition period.
- Contract changes must be discoverable.

---

## 18. Published Language

Published Language is the stable vocabulary a context exposes to consumers.

### Components

- command names;
- event names;
- identifiers;
- value objects;
- status values;
- error codes;
- semantic definitions.

### Rules

- Published language must be unambiguous.
- Shared names must not imply shared internal models.
- Translation may be required between contexts.
- Published language changes follow semantic versioning.

---

## 19. Cross-Context Command Aggregate

### 19.1 Identity

`CrossContextCommandId`

### 19.2 Purpose

A Cross-Context Command requests that another bounded context perform an action.

### 19.3 Examples

- CreateResearchProject;
- RegisterEvidence;
- RequestCapabilityAssessment;
- RequestReadinessAssessment;
- CreateAcademicReview;
- GenerateMentoringIntervention;
- EvaluateIntelligenceTask;
- UpdateResearchStage;
- CreateNotification.

### 19.4 Attributes

- Cross-Context Command Id;
- Command Name;
- Producer Context;
- Consumer Context;
- Payload;
- Contract Version;
- Correlation Id;
- Causation Id;
- Idempotency Key;
- Authority Context;
- Expected Outcome;
- Expiry;
- Status;
- Provenance.

### 19.5 Rules

- Commands express intent, not state transfer.
- Consumers validate commands independently.
- Command acceptance is not guaranteed.
- Duplicate commands must be safely handled.
- Commands must not expose producer internals.
- Authority claims must be revalidated where material.

---

## 20. Cross-Context Event Aggregate

### 20.1 Identity

`CrossContextEventId`

### 20.2 Purpose

A Cross-Context Event communicates an immutable fact published by one bounded
context for consumption by others.

### 20.3 Examples

- ResearchProjectStarted;
- ResearchStageCompleted;
- EvidenceDossierCreated;
- CapabilityProfileUpdated;
- ReadinessAssessed;
- MilestoneSubmitted;
- AcademicReviewCompleted;
- AcademicDecisionCreated;
- IntelligenceResponseReleased;
- BlockerResolved.

### 20.4 Attributes

- Cross-Context Event Id;
- Event Name;
- Producer Context;
- Payload;
- Contract Version;
- Occurred At;
- Published At;
- Correlation Id;
- Causation Id;
- Sequence;
- Privacy Classification;
- Status;
- Provenance.

### 20.5 Rules

- Events are immutable.
- Events report facts that have already occurred.
- Event contracts are versioned.
- Consumers must tolerate replay.
- Consumers must not infer undocumented meaning.
- Sensitive events require restricted distribution.

---

## 21. Event Subscription

An Event Subscription defines a consumer's declared interest in a published
event.

### Attributes

- Event Subscription Id;
- Consumer Context;
- Event Type;
- Supported Versions;
- Handler;
- Filter;
- Delivery Semantics;
- Retry Policy;
- Dead-Letter Policy;
- Status;
- Provenance.

### Delivery semantics

- At Most Once;
- At Least Once;
- Effectively Once through Idempotency.

### Rules

- Exactly-once delivery must not be assumed across distributed systems.
- Consumers must design for duplicates where at-least-once delivery is used.
- Subscription ownership belongs to the consumer.

---

## 22. Anti-Corruption Layer Aggregate

### 22.1 Identity

`AntiCorruptionLayerId`

### 22.2 Purpose

An Anti-Corruption Layer translates between BRM domain language and external or
legacy system language.

### 22.3 Typical integrations

- Learning Management Systems;
- Student Management Systems;
- Library Systems;
- Ethics Systems;
- Research Repositories;
- ORCID;
- Crossref;
- Scopus;
- Web of Science;
- Institutional Identity Providers;
- Calendar and Communication Systems.

### 22.4 Attributes

- Anti-Corruption Layer Id;
- External System;
- BRM Context;
- Source Concepts;
- Target Concepts;
- Translation Rules;
- Validation Rules;
- Lossy Mappings;
- Error Handling;
- Version;
- Status;
- Provenance.

### 22.5 Rules

- External models must not contaminate BRM domain language.
- Lossy translation must be disclosed.
- Unknown external values must not be silently coerced.
- Translation history must be auditable.
- External identifiers remain distinct from BRM identifiers.

---

## 23. External Integration Aggregate

### 23.1 Identity

`ExternalIntegrationId`

### 23.2 Attributes

- External Integration Id;
- External System;
- Purpose;
- Integration Type;
- Anti-Corruption Layer;
- Authentication;
- Data Scope;
- Direction;
- Contract;
- Rate Limits;
- Privacy Requirements;
- Availability Expectations;
- Failure Policy;
- Status;
- Provenance.

### 23.3 Integration types

- API;
- File Exchange;
- Webhook;
- Message Stream;
- Scheduled Import;
- Scheduled Export;
- Manual Exchange.

### Rules

- External availability must not define core domain correctness.
- Provider failure must be isolated.
- Data sharing must have a legitimate basis.
- External side effects require explicit control.

---

## 24. API Boundary

An API Boundary defines a transport-accessible application interface.

### Types

- REST;
- GraphQL;
- gRPC;
- Message API;
- Command Line;
- Batch Interface;
- Internal Function Boundary.

### Attributes

- API Boundary Id;
- Application Service;
- Transport;
- Endpoint or Topic;
- Request Schema;
- Response Schema;
- Authentication;
- Authorisation;
- Rate Limit;
- Version;
- Deprecation;
- Status;
- Provenance.

### Rules

- API boundaries expose Application Services, not domain persistence.
- Transport concerns remain outside core domain models.
- API changes follow contract versioning.
- Internal implementation must remain replaceable.

---

## 25. Read Model Aggregate

### 25.1 Identity

`ReadModelId`

### 25.2 Purpose

A Read Model provides a query-optimised view assembled from one or more bounded
contexts.

### 25.3 Examples

- Learner Dashboard;
- Supervisor Dashboard;
- Program Director Dashboard;
- Research Journey Timeline;
- Capability Development View;
- Readiness View;
- Governance Review Queue;
- Intelligence Audit View;
- Evidence Traceability View.

### 25.4 Attributes

- Read Model Id;
- Name;
- Purpose;
- Audience;
- Source Events;
- Projection;
- Data Elements;
- Privacy Scope;
- Freshness Target;
- Consistency Status;
- Rebuild Strategy;
- Status;
- Semantic Version;
- Provenance.

### 25.5 Rules

- Read models do not own domain truth.
- Read models may combine contexts without merging their ownership.
- Staleness must be known where material.
- Read models must be rebuildable where feasible.
- Sensitive information must follow audience permissions.

---

## 26. Projection Aggregate

### 26.1 Identity

`ProjectionId`

### 26.2 Purpose

A Projection consumes events and constructs or updates a Read Model.

### 26.3 Attributes

- Projection Id;
- Read Model Id;
- Consumed Events;
- Event Versions;
- Projection Logic;
- Checkpoint;
- Replay Strategy;
- Idempotency Strategy;
- Failure State;
- Status;
- Semantic Version;
- Provenance.

### 26.4 Rules

- Projection handlers must be idempotent.
- Projection failures must not corrupt domain state.
- Replay must be supported where feasible.
- Projection version changes may require rebuild.
- Event-order assumptions must be explicit.

---

## 27. Notification Aggregate

### 27.1 Identity

`NotificationId`

### 27.2 Purpose

A Notification communicates information resulting from domain or application
events.

### 27.3 Types

- Informational;
- Reminder;
- Action Required;
- Warning;
- Escalation;
- Completion;
- Review Request;
- Governance Notice;
- System Failure.

### 27.4 Attributes

- Notification Id;
- Trigger Event;
- Recipient;
- Channel;
- Message Template;
- Priority;
- Privacy Classification;
- Delivery Window;
- Status;
- Delivery Attempts;
- Provenance.

### 27.5 Rules

- Notifications do not contain domain rules.
- Delivery failure does not reverse domain events.
- Sensitive notifications require appropriate channels.
- Notification fatigue must be managed.
- Duplicate notifications should be suppressed where appropriate.

---

## 28. Work Item

A Work Item represents a unit of asynchronous application work.

### Attributes

- Work Item Id;
- Work Queue Id;
- Work Type;
- Payload;
- Priority;
- Correlation Id;
- Idempotency Key;
- Available At;
- Attempts;
- Maximum Attempts;
- Status;
- Failure;
- Provenance.

---

## 29. Work Queue Aggregate

### 29.1 Identity

`WorkQueueId`

### 29.2 Purpose

A Work Queue manages deferred, asynchronous, retryable, or resource-controlled
application work.

### 29.3 Queue types

- Command Queue;
- Event Processing Queue;
- Notification Queue;
- Projection Queue;
- Human Review Queue;
- External Integration Queue;
- Intelligence Work Queue;
- Dead-Letter Queue.

### 29.4 Rules

- Queue processing must be observable.
- Duplicate work must be tolerated.
- Poison messages must be isolated.
- Dead-letter work requires review and recovery.
- Queue backlog must not be hidden.

---

## 30. Idempotency Record

An Idempotency Record ensures duplicate requests or deliveries do not cause
duplicate effects.

### Attributes

- Idempotency Record Id;
- Scope;
- Idempotency Key;
- Request Hash;
- First Seen;
- Result Reference;
- Expiry;
- Status;
- Provenance.

### Rules

- Idempotency scope must be explicit.
- Reused keys with different payloads must be rejected.
- Retention must match replay and retry risk.
- Idempotency does not replace domain validation.

---

## 31. Retry Policy

### Attributes

- Retry Policy Id;
- Applies To;
- Maximum Attempts;
- Delay Strategy;
- Backoff;
- Jitter;
- Retryable Failures;
- Non-Retryable Failures;
- Escalation;
- Dead-Letter Destination;
- Provenance.

### Rules

- Business rejections are not technical retry conditions.
- Retries must not duplicate side effects.
- Infinite retries are prohibited.
- Retry exhaustion must become visible.

---

## 32. Transaction Boundary

A Transaction Boundary defines the atomic consistency scope of an operation.

### Types

- Aggregate Transaction;
- Bounded-Context Transaction;
- Outbox Transaction;
- Projection Transaction;
- External Side-Effect Boundary.

### Rules

- One aggregate is the preferred transactional consistency boundary.
- Distributed global transactions are not the default.
- Outbox or equivalent patterns should preserve event publication reliability.
- External effects must not be assumed atomic with local persistence.
- Transaction failure must not produce ambiguous success.

---

## 33. Consistency Policy

### Consistency types

- Strong Consistency;
- Read-Your-Writes;
- Monotonic Read;
- Eventual Consistency;
- Causal Consistency;
- Manual Reconciliation.

### Attributes

- Consistency Policy Id;
- Applies To;
- Required Consistency;
- Maximum Acceptable Lag;
- User Disclosure;
- Reconciliation Method;
- Failure Handling;
- Provenance.

### Rules

- Consistency must be chosen according to business risk.
- Formal decisions and authority assignments may require stronger consistency.
- Dashboards and analytics may use eventual consistency.
- Users must not be misled by stale state.
- Reconciliation must be available where divergence is possible.

---

## 34. Integration Policy Aggregate

### 34.1 Identity

`IntegrationPolicyId`

### 34.2 Policy categories

- Context Autonomy;
- Contract Versioning;
- Event Publication;
- Command Handling;
- Idempotency;
- Retry;
- Compensation;
- Privacy;
- Security;
- Human Review;
- Observability;
- External Integration;
- Consistency;
- Deprecation;
- Failure Disclosure.

### 34.3 Attributes

- Integration Policy Id;
- Category;
- Rule;
- Scope;
- Severity;
- Enforcement;
- Exceptions;
- Authority;
- Effective Period;
- Status;
- Provenance.

---

## 35. Platform Coordination Engine

The Platform Coordination Engine governs platform-level coordination across
bounded contexts.

### 35.1 Responsibilities

The engine must:

- route commands;
- route events;
- resolve context contracts;
- validate compatible versions;
- create and supervise process managers;
- execute sagas;
- enforce idempotency;
- coordinate retries;
- trigger compensation;
- detect cyclic dependencies;
- enforce human review gates;
- monitor workflow health;
- expose integration metrics;
- support replay and reconstruction;
- preserve correlation and causation;
- isolate failing contexts;
- maintain bounded-context autonomy.

### 35.2 Inputs

- Use Case;
- Application Request;
- Application Service;
- Workflow;
- Context Contracts;
- Cross-Context Commands;
- Cross-Context Events;
- Integration Policies;
- Authority Context;
- Failure Signals;
- Resource Constraints.

### 35.3 Outputs

- routed command;
- event delivery;
- process state;
- compensation action;
- retry action;
- escalation;
- application result;
- workflow metrics;
- integration audit record.

### 35.4 Rules

- The engine coordinates but does not own domain rules.
- Context contracts are mandatory.
- Cyclic context dependencies must be rejected or redesigned.
- Human review and governance gates cannot be bypassed.
- Version incompatibility must fail visibly.
- Platform coordination must remain transport neutral.
- Failure in one context should not unnecessarily cascade.

---

## 36. Integration Graph Aggregate

### 36.1 Identity

`IntegrationGraphId`

### 36.2 Purpose

The Integration Graph represents operational relationships among bounded
contexts, use cases, application services, workflows, process managers,
commands, events, contracts, projections, read models, notifications, and
external integrations.

### 36.3 Node types

- Bounded Context;
- Use Case;
- Application Service;
- Workflow;
- Process Manager;
- Saga;
- Context Contract;
- Cross-Context Command;
- Cross-Context Event;
- Event Subscription;
- Anti-Corruption Layer;
- External Integration;
- API Boundary;
- Read Model;
- Projection;
- Notification;
- Work Queue;
- Integration Policy.

### 36.4 Edge types

- Supports;
- Coordinates;
- Participates In;
- Dispatches;
- Consumes;
- Publishes;
- Subscribes To;
- Exposes;
- Translates;
- Projects;
- Updates;
- Notifies;
- Depends On;
- Compensates;
- Governed By;
- Integrates With;
- Supersedes.

### 36.5 Rules

- Every material edge requires provenance.
- Cycles must be analysed and classified.
- Internal dependencies remain distinct from external integrations.
- Contract-version edges must be explicit.
- Graph visibility must respect security and privacy.
- Operational dependency does not transfer domain ownership.

---

## 37. Application Service Rules

Application Services may:

- validate application input;
- validate access and authority;
- begin workflows;
- dispatch commands;
- receive outcomes;
- assemble results;
- coordinate transaction boundaries;
- publish application-level notifications;
- manage idempotency and retry.

Application Services may not:

- implement aggregate invariants;
- directly update another context's data;
- duplicate domain policy;
- convert eventual consistency into false immediate certainty;
- hide process state;
- bypass human review.

---

## 38. Cross-Context Coordination Patterns

Approved coordination patterns include:

### Request–Response

Used for short, bounded operations where immediate response is required.

### Command–Event

Used when a context accepts a command and later publishes an outcome.

### Event Choreography

Used when independent contexts react to published facts.

### Process Manager Orchestration

Used when one durable coordinator must track a multi-step process.

### Saga

Used when multiple local transactions require compensation.

### Projection

Used for read-optimised cross-context views.

### Human Task

Used where formal review or judgement is required.

### Scheduled Coordination

Used for deadlines, reminders, periodic checks, and reconciliations.

Pattern choice must be driven by consistency, latency, risk, authority, and
failure-recovery needs.

---

## 39. Example Workflow: Milestone Submission and Review

A learner submits a proposal milestone.

### Step 1 — Use Case

`Submit Milestone`

### Step 2 — Application Service

`Submit Milestone Service`

The service validates:

- learner access;
- milestone identity;
- idempotency key;
- submission input.

### Step 3 — Command

The service dispatches:

`SubmitMilestone`

to the Progress and Capability Context.

### Step 4 — Domain Event

The context publishes:

`MilestoneSubmitted`

### Step 5 — Process Manager

The Milestone Review Process Manager receives the event and:

1. requests a readiness assessment;
2. requests an academic review;
3. creates supervisor notification;
4. waits for review outcome;
5. checks authority;
6. records conditions or approval;
7. updates the research journey;
8. completes the workflow.

### Step 6 — Cross-Context Events

Possible events include:

- ReadinessAssessed;
- AcademicReviewCompleted;
- AcademicDecisionCreated;
- ResearchStageTransitioned.

### Step 7 — Projection

The events update:

- learner dashboard;
- supervisor review queue;
- program progress view.

### Step 8 — Notification

The learner receives:

- review submitted;
- revision required;
- approved with conditions;
- or human review pending.

If the governance review cannot be created, the saga does not erase the
milestone submission.

It records partial completion and initiates recovery or compensation according
to policy.

---

## 40. Relationship to Existing Architecture

The BRM architecture now contains:

### Governance Layer

Authority, review, decisions, appeal, institutional control.

### Knowledge–Evidence Network

Knowledge, evidence, claims, contradiction, provenance.

### Domain Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph;
- Capability Graph;
- Intelligence Graph.

### Research Journey

The longitudinal educational and research context.

### Application Layer

Use Cases, Application Services, Workflows, Process Managers, and Sagas.

### Integration Graph

The operational architecture map connecting autonomous bounded contexts.

### Infrastructure Layer

Transport, persistence, messaging, identity, external providers, deployment,
and observability implementations.

Application Services sit below domain semantics and above infrastructure.

---

## 41. Domain Services

### 41.1 Use Case Resolution Service

Maps application intent to one or more Application Services.

### 41.2 Context Contract Resolution Service

Finds compatible commands, events, queries, and versions.

### 41.3 Workflow Planning Service

Selects and validates the required workflow.

### 41.4 Process Correlation Service

Maintains correlation and causation across commands and events.

### 41.5 Saga Coordination Service

Coordinates local transactions and compensation.

### 41.6 Idempotency Service

Prevents duplicate effects.

### 41.7 Retry and Recovery Service

Applies retry, dead-letter, escalation, and recovery rules.

### 41.8 Projection Management Service

Builds, checkpoints, replays, and rebuilds projections.

### 41.9 Consistency Evaluation Service

Determines required consistency and acceptable lag.

### 41.10 Dependency Analysis Service

Detects cyclic, hidden, or unsafe context dependencies.

### 41.11 Contract Compatibility Service

Validates semantic-version compatibility.

### 41.12 Integration Impact Service

Traces how contract or event changes affect consumers, workflows, read models,
and external integrations.

---

## 42. Domain Policies

### 42.1 Bounded Context Autonomy Policy

Each bounded context owns its model, rules, and persistence.

### 42.2 Contract-First Integration Policy

Cross-context collaboration requires an explicit contract.

### 42.3 No Shared Database Integration Policy

Contexts must not integrate by directly sharing persistence tables.

### 42.4 Application Service Purity Policy

Application services coordinate; domains decide.

### 42.5 Event Immutability Policy

Published events are immutable facts.

### 42.6 Idempotency Policy

Duplicate requests and deliveries must not create duplicate effects.

### 42.7 Eventual Consistency Transparency Policy

Material consistency lag must remain visible.

### 42.8 Saga Compensation Policy

Distributed failure is handled through semantic compensation or recovery.

### 42.9 Human Review Preservation Policy

Formal review gates cannot be bypassed by integration workflows.

### 42.10 Anti-Corruption Policy

External language must be translated before entering BRM domains.

### 42.11 Version Compatibility Policy

Breaking contract changes require explicit version transition.

### 42.12 Failure Isolation Policy

Failure in one context should not unnecessarily cascade.

### 42.13 Replay and Reconstruction Policy

Events and projections should support recovery and reconstruction where feasible.

### 42.14 Integration Observability Policy

Workflow health, retries, failures, and backlog must be observable.

---

## 43. Aggregate Invariants

The domain must enforce:

1. Application Service is the central aggregate.
2. Use cases remain transport neutral.
3. Application services coordinate but do not own domain rules.
4. Bounded contexts own their internal models and persistence.
5. Direct cross-context database mutation is prohibited.
6. Context contracts are explicit.
7. Published language is versioned.
8. Commands express intent.
9. Events report immutable facts.
10. Event consumers tolerate replay.
11. Duplicate commands and events are safely handled.
12. Authority is revalidated where material.
13. Correlation and causation are preserved.
14. Process state is durable.
15. Long-running workflows tolerate asynchronous completion.
16. Human review gates cannot be bypassed.
17. One saga step owns one local transaction.
18. Global distributed transactions are not the default.
19. Compensation preserves history.
20. Irreversible effects require explicit recovery.
21. External models enter through an Anti-Corruption Layer.
22. External identifiers remain distinct from BRM identifiers.
23. APIs expose application services, not persistence.
24. Read models do not own domain truth.
25. Projections are idempotent.
26. Projection failure does not corrupt domain state.
27. Notification failure does not reverse domain events.
28. Retryable and non-retryable failures remain distinct.
29. Infinite retry is prohibited.
30. Idempotency keys cannot be reused with conflicting payloads.
31. Consistency policy is explicit.
32. Eventual-consistency lag is not hidden.
33. Contract-breaking changes require version transition.
34. Cyclic context dependencies are detected.
35. Integration Graph edges require provenance.
36. Operational dependency does not transfer domain ownership.
37. Partial completion remains visible.
38. Accepted-for-processing is not represented as completed.
39. Platform coordination remains transport neutral.
40. Integration remains subordinate to BRM governance, evidence, educational,
    and intelligence principles.

---

## 44. Commands

Initial commands include:

- Register Use Case
- Register Application Service
- Create Application Request
- Start Workflow
- Add Workflow Step
- Create Process Manager
- Advance Process
- Pause Process
- Resume Process
- Start Saga
- Add Saga Step
- Invoke Compensation
- Publish Context Contract
- Deprecate Context Contract
- Publish Cross-Context Command
- Accept Cross-Context Command
- Reject Cross-Context Command
- Publish Cross-Context Event
- Register Event Subscription
- Create Anti-Corruption Layer
- Register External Integration
- Register API Boundary
- Create Read Model
- Create Projection
- Replay Projection
- Rebuild Read Model
- Create Notification
- Enqueue Work Item
- Retry Work Item
- Move Work Item to Dead Letter
- Register Idempotency Key
- Create Retry Policy
- Define Transaction Boundary
- Define Consistency Policy
- Create Integration Policy
- Add Integration Graph Node
- Add Integration Graph Edge
- Conduct Integration Impact Analysis

---

## 45. Domain Events

Initial events include:

- UseCaseRegistered
- ApplicationServiceRegistered
- ApplicationRequestCreated
- WorkflowStarted
- WorkflowStepAdded
- ProcessManagerCreated
- ProcessAdvanced
- ProcessPaused
- ProcessResumed
- SagaStarted
- SagaStepAdded
- CompensationInvoked
- ContextContractPublished
- ContextContractDeprecated
- CrossContextCommandPublished
- CrossContextCommandAccepted
- CrossContextCommandRejected
- CrossContextEventPublished
- EventSubscriptionRegistered
- AntiCorruptionLayerCreated
- ExternalIntegrationRegistered
- ApiBoundaryRegistered
- ReadModelCreated
- ProjectionCreated
- ProjectionReplayed
- ReadModelRebuilt
- NotificationCreated
- WorkItemEnqueued
- WorkItemRetried
- WorkItemMovedToDeadLetter
- IdempotencyKeyRegistered
- RetryPolicyCreated
- TransactionBoundaryDefined
- ConsistencyPolicyDefined
- IntegrationPolicyCreated
- IntegrationGraphNodeAdded
- IntegrationGraphEdgeAdded
- IntegrationImpactAnalysisConducted

---

## 46. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Register Application Service | ApplicationServiceRegistered | Application Service Purity Policy | Service coordinates, domain decides |
| Publish Context Contract | ContextContractPublished | Contract-First Integration Policy | Contract is explicit |
| Publish Command | CrossContextCommandPublished | Idempotency Policy | Duplicate effects prevented |
| Publish Event | CrossContextEventPublished | Event Immutability Policy | Event is immutable |
| Start Saga | SagaStarted | Saga Compensation Policy | Local transactions only |
| Create ACL | AntiCorruptionLayerCreated | Anti-Corruption Policy | External language translated |
| Create Projection | ProjectionCreated | Replay and Reconstruction Policy | Projection is rebuildable |
| Define Consistency | ConsistencyPolicyDefined | Eventual Consistency Transparency Policy | Lag remains visible |
| Add Integration Edge | IntegrationGraphEdgeAdded | Bounded Context Autonomy Policy | Ownership remains local |

---

## 47. Authority Model

### 47.1 BRM application layer may

- expose use cases;
- coordinate services;
- route commands and events;
- manage workflows;
- create process managers and sagas;
- build read models;
- create notifications;
- manage retries and recovery;
- request human review;
- report integration state.

### 47.2 BRM application layer may not

- grant academic approval;
- override domain invariants;
- bypass authority checks;
- mutate another context's persistence;
- reinterpret published events without contract basis;
- hide partial failure;
- present stale data as current;
- adjudicate governance matters.

### 47.3 Domain contexts may

- accept or reject commands;
- publish events;
- define contracts;
- enforce local invariants;
- change internal implementation without affecting compatible contracts.

### 47.4 Institutional authorities may

- approve integration policies;
- approve external data sharing;
- define required consistency;
- approve human review workflows;
- suspend unsafe integrations;
- define retention and audit requirements.

---

## 48. Cross-Context Interfaces

BRMF-212 provides the coordination boundary for every domain from BRMF-201
through BRMF-211.

Each participating context must publish:

- commands it accepts;
- events it emits;
- queries it supports;
- authority requirements;
- privacy classifications;
- error outcomes;
- semantic versions;
- deprecation rules.

No context is required to expose its aggregates, tables, internal events, or
implementation details.

---

## 49. Privacy, Security, Reliability, and Observability Safeguards

The integration layer must support:

- authenticated service calls;
- authorisation checks;
- least-privilege data exchange;
- encrypted transport;
- restricted event distribution;
- context-aware redaction;
- contract validation;
- idempotency;
- replay protection;
- tamper-evident logs;
- dead-letter handling;
- failure isolation;
- retry observability;
- backlog monitoring;
- correlation tracing;
- version tracking;
- projection freshness monitoring;
- external-integration circuit breaking;
- human intervention queues.

Integration telemetry must not become indiscriminate learner surveillance.

---

## 50. Reporting

Reports may include:

- Use Case Catalogue;
- Application Service Catalogue;
- Workflow Register;
- Process Manager Status;
- Saga Status;
- Compensation Report;
- Context Contract Catalogue;
- Command Catalogue;
- Event Catalogue;
- Event Subscription Register;
- Anti-Corruption Layer Register;
- External Integration Register;
- API Boundary Catalogue;
- Read Model Catalogue;
- Projection Health Report;
- Notification Delivery Report;
- Work Queue Health Report;
- Idempotency Report;
- Retry and Dead-Letter Report;
- Consistency Status Report;
- Contract Compatibility Report;
- Integration Dependency Report;
- Integration Graph View;
- Integration Impact Report.

Reports must distinguish:

- domain failure;
- application failure;
- integration failure;
- external-system failure;
- projection lag;
- notification failure;
- human-review delay;
- partial completion;
- compensated completion;
- unresolved inconsistency.

---

## 51. Validation Questions

Reviewers should confirm:

1. Is Application Service correctly modelled as the central aggregate?
2. Are Use Cases transport neutral?
3. Do Application Services avoid domain logic?
4. Are bounded contexts autonomous?
5. Are context contracts explicit and versioned?
6. Are commands and events correctly distinguished?
7. Can duplicate delivery be handled safely?
8. Are Process Managers durable?
9. Are Sagas and compensation modelled adequately?
10. Are transaction boundaries local?
11. Is eventual consistency explicit?
12. Are read models separate from domain truth?
13. Are projections replayable and idempotent?
14. Are notifications decoupled from business rules?
15. Do Anti-Corruption Layers protect BRM language?
16. Are external integrations isolated?
17. Does the Platform Coordination Engine remain domain neutral?
18. Are cyclic dependencies detectable?
19. Is contract compatibility governable?
20. Is failure isolation adequate?
21. Does the Integration Graph provide sufficient architectural visibility?
22. Is the model compatible with BRMF-201 through BRMF-211?
23. Are privacy, security, and observability safeguards sufficient?
24. Is the architecture ready for a Version 1.0 baseline?

---

## 52. Acceptance Criteria

BRMF-212 may progress from Draft to Approved when:

- Use Case and Application Request are accepted;
- Application Service is accepted as the central aggregate;
- Workflow and Workflow Step are accepted;
- Process Manager and Saga are accepted;
- compensation and recovery are accepted;
- Context Contract and Published Language are accepted;
- Cross-Context Commands and Events are accepted;
- Event Subscription is accepted;
- Anti-Corruption Layer and External Integration are accepted;
- API Boundary is accepted;
- Read Model and Projection are accepted;
- Notification and Work Queue are accepted;
- Idempotency, Retry, Transaction Boundary, and Consistency Policy are accepted;
- Integration Policy is accepted;
- Platform Coordination Engine is accepted;
- Integration Graph is accepted;
- interfaces with BRMF-201 through BRMF-211 are accepted;
- privacy, security, reliability, observability, and authority safeguards are
  accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved architectural contradiction remains.

---

## 53. Architecture Baseline Recommendation

Following approval of BRMF-212, the core BRMF domain architecture should be
eligible for declaration as:

**BRMF Architecture Version 1.0**

The declaration should:

- identify BRMF-201 through BRMF-212 as the approved domain architecture set;
- freeze their core responsibilities and bounded-context ownership;
- permit future evolution through ADRs and versioned specifications;
- prohibit silent cross-context coupling;
- require architecture-impact review for contract-breaking changes;
- establish implementation as the primary next activity.

---

## 54. Next Specification

The next recommended document is:

**BRMF-213 — Security, Identity, Privacy, and Access-Control Domain Model**

It will define:

- Principal;
- Identity;
- Authentication;
- Session;
- Role;
- Permission;
- Policy;
- Resource;
- Access Decision;
- Consent;
- Delegation;
- Impersonation Control;
- Privacy Classification;
- Data Subject;
- Retention;
- Erasure;
- Encryption;
- Secret;
- Security Event;
- Threat;
- Incident;
- Audit;
- institutional identity integration;
- learner, supervisor, and program access boundaries.

---

**End of BRMF-212**
