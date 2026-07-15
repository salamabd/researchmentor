# BRM-BOK Engineering Handbook

---

# Canonical Metadata

| Field               | Value                                         |
| ------------------- | --------------------------------------------- |
| Document ID         | BOK-V1-002                                    |
| Canonical Name      | BRM-BOK Engineering Handbook                  |
| Body of Knowledge   | BRM-BOK                                       |
| Volume              | I — Foundations                               |
| Part                | A — Governance                                |
| Version             | 1.0 Draft                                     |
| Status              | In Development                                |
| Classification      | Canonical                                     |
| Normative Status    | Normative                                     |
| Repository Path     | `bok/Volume_01_Foundation/Part_A_Governance/` |
| Parent Documents    | BOK-STD-001, BOK-V1-001                       |
| Dependent Documents | All BRM-BOK Canonical Documents               |
| Review Cycle        | Foundation Release                            |

---

# Table of Contents

1. Introduction and Engineering Philosophy *(this chapter)*
2. Engineering Principles
3. Knowledge Engineering
4. Governance and Decision Records
5. Lifecycle Management
6. Traceability Framework
7. Quality Assurance
8. AI-Assisted Knowledge Engineering
9. Release and Version Management
10. Continuous Improvement

---

# Chapter 1 — Introduction and Engineering Philosophy

## 1.1 Executive Summary

The BRM-BOK Engineering Handbook establishes the engineering discipline used to create, govern, validate, maintain, and evolve the Business Research Mentoring Body of Knowledge (BRM-BOK).

Unlike conventional software engineering manuals, this handbook governs the engineering of educational knowledge. It defines how frameworks, theories, methodologies, architectures, specifications, and software implementations are developed as coherent, traceable, evidence-informed components of a single body of knowledge.

The handbook is intended to provide long-term stability while allowing controlled evolution through governance and empirical evidence.

---

## 1.2 Purpose

The purpose of this handbook is to ensure that BRM-BOK develops as a disciplined and enduring body of knowledge rather than as an accumulation of independent documents or software features.

The handbook provides a common engineering approach that:

* preserves conceptual integrity;
* supports educational quality;
* enables consistent governance;
* facilitates scholarly collaboration;
* ensures long-term maintainability.

---

## 1.3 Scope

This handbook governs:

* canonical documents;
* educational theories;
* mentoring methodologies;
* educational architectures;
* specifications;
* knowledge models;
* implementation traceability;
* validation activities;
* lifecycle management.

It applies to both human contributors and AI-assisted development activities.

The handbook does not define educational content. Instead, it defines the engineering process by which educational content is created and maintained.

---

## 1.4 Engineering Philosophy

BRM-BOK is engineered according to one foundational belief:

> **Educational knowledge deserves the same level of engineering discipline that mature engineering fields apply to software, architecture, and quality systems.**

Accordingly:

* Knowledge is engineered.
* Educational models are governed.
* Methodologies are validated.
* Architectures are traceable.
* Implementations are derived from governed knowledge.

Software is therefore regarded as one expression of BRM-BOK rather than its primary product.

---

## 1.5 The Knowledge-First Principle

The Business Research Initiative adopts a knowledge-first approach.

Educational understanding shall precede technological implementation.

This principle requires that:

* educational problems are understood before solutions are proposed;
* theories are defined before methodologies;
* methodologies are defined before architectures;
* architectures are defined before specifications;
* specifications are defined before implementation.

This progression reduces architectural drift and maintains educational coherence.

---

## 1.6 Separation of Concerns

BRM-BOK distinguishes between several complementary but independent layers.

| Layer          | Primary Purpose                                     |
| -------------- | --------------------------------------------------- |
| Charter        | Defines the purpose and identity of the initiative. |
| Framework      | Defines governing educational principles.           |
| Theory         | Explains educational phenomena.                     |
| Methodology    | Defines educational practice.                       |
| Architecture   | Organizes implementation structures.                |
| Specification  | Describes required system behaviour.                |
| Implementation | Delivers operational software.                      |
| Validation     | Evaluates educational effectiveness.                |

Each layer answers a different question and should avoid assuming the responsibilities of another.

---

## 1.7 Engineering Objectives

The handbook pursues six enduring objectives.

### Objective 1 — Coherence

Maintain consistency across all BRM-BOK artifacts.

### Objective 2 — Traceability

Ensure every engineering decision can be traced to an educational purpose.

### Objective 3 — Explainability

Ensure educational recommendations remain understandable to students, supervisors, and institutions.

### Objective 4 — Sustainability

Allow the Body of Knowledge to evolve without compromising its conceptual foundations.

### Objective 5 — Reusability

Design educational concepts so they can be reused across future domains where appropriate.

### Objective 6 — Scholarly Rigor

Support peer review, institutional adoption, and continuous refinement through evidence.

---

## 1.8 Guiding Engineering Principles

The following principles govern every subsequent chapter of this handbook.

1. Knowledge before software.
2. Education before automation.
3. Governance before implementation.
4. Traceability before optimisation.
5. Evidence before canonisation.
6. Simplicity before complexity.
7. Evolution through controlled change.

These principles shall be interpreted consistently throughout BRM-BOK.

---

## 1.9 Relationship to Other Canonical Documents

This handbook derives its authority from:

* **BOK-V1-001 — Business Research Initiative Charter**
* **BOK-STD-001 — BRM-BOK Writing Standard**

The handbook governs the engineering discipline applied to:

* BRMF;
* BRMM;
* REA;
* educational theories;
* specifications;
* software implementations.

---

## 1.10 Normative Statements

Within BRM-BOK:

* Engineering activities **MUST** conform to this handbook.
* Canonical documents **MUST** comply with the BRM-BOK Writing Standard.
* Educational intent **MUST** remain traceable throughout the engineering lifecycle.
* New engineering practices **SHOULD** be justified through educational need and governance review.
* Implementation convenience **MUST NOT** override educational purpose.

---

## 1.11 Acceptance Criteria

Chapter 1 is complete when it:

* establishes the purpose of the handbook;
* defines the engineering philosophy;
* explains the knowledge-first approach;
* identifies engineering objectives;
* establishes the relationship between the handbook and the remainder of BRM-BOK;
* provides the conceptual foundation for all subsequent chapters.

---

## Revision History

| Version   | Date               | Description                                                     |
| --------- | ------------------ | --------------------------------------------------------------- |
| 1.0 Draft | Foundation Phase 2 | Chapter 1 established; subsequent chapters pending integration. |


# Chapter 2 — Engineering Principles

---

## 2.1 Purpose

This chapter establishes the engineering principles that govern the creation, evolution, validation, and maintenance of the Business Research Mentoring Body of Knowledge (BRM-BOK).

These principles are normative and shall guide all future canonical artifacts.

Where conflicts arise, these principles take precedence over implementation preferences.

---

## 2.2 Principle 1 — Educational Purpose First

Every artifact shall exist to solve a clearly defined educational problem.

No framework, theory, methodology, architecture, specification, feature, or implementation shall be introduced solely because it is technically feasible or technologically fashionable.

Educational need precedes technological capability.

### Engineering Implications

Every proposal shall identify:

* the educational problem;
* the intended educational outcome;
* the stakeholders affected;
* the expected educational benefit.

---

## 2.3 Principle 2 — Knowledge Before Software

Educational knowledge shall be engineered before software implementation.

The engineering sequence shall remain:

Educational Need

↓

Framework

↓

Theory

↓

Methodology

↓

Architecture

↓

Specification

↓

Implementation

↓

Validation

Software shall never become the source of educational policy.

---

## 2.4 Principle 3 — Complete Traceability

Every canonical artifact shall participate in an unbroken traceability chain.

The minimum traceability model is:

Charter

↓

Framework

↓

Principle

↓

Theory

↓

Methodology

↓

Architecture

↓

Specification

↓

Implementation

↓

Validation Evidence

Each engineering decision shall be explainable by reference to this chain.

---

## 2.5 Principle 4 — Separation of Concerns

Each layer of BRM-BOK has a distinct responsibility.

Frameworks establish governing principles.

Theories explain educational phenomena.

Methodologies define practice.

Architectures organise systems.

Specifications define behaviour.

Implementations realise behaviour.

Validation evaluates effectiveness.

No layer should assume the responsibilities of another.

---

## 2.6 Principle 5 — Explainability

Educational recommendations shall remain understandable to students, supervisors, reviewers, and institutions.

Accordingly:

* reasoning shall be explicit;
* assumptions shall be identified;
* educational intent shall be documented;
* dependencies shall be traceable.

Opaque educational behaviour is inconsistent with BRM-BOK.

---

## 2.7 Principle 6 — Academic Integrity

The engineering process shall preserve the educational responsibilities of all stakeholders.

Students remain responsible for scholarship.

Supervisors remain responsible for academic judgement.

Institutions remain responsible for academic governance.

Artificial intelligence functions as an educational mentor and decision-support capability rather than an academic decision maker.

---

## 2.8 Principle 7 — Evidence-Based Evolution

Canonical knowledge shall evolve through evidence rather than preference.

Evidence may include:

* peer-reviewed literature;
* expert review;
* pilot implementations;
* institutional feedback;
* empirical studies;
* implementation experience.

Concepts shall mature through validation rather than popularity.

---

## 2.9 Principle 8 — Controlled Innovation

Innovation is encouraged when it:

* addresses a genuine educational problem;
* complements rather than duplicates existing concepts;
* can be explained clearly;
* supports educational objectives;
* can be validated.

Innovation shall not compromise coherence.

---

## 2.10 Principle 9 — Conceptual Stability

Foundational concepts should change infrequently.

Changes to:

* the Charter;
* BRMF;
* foundational theories;
* constitutional principles;

require formal governance review.

This protects long-term stability while allowing controlled evolution elsewhere.

---

## 2.11 Principle 10 — Simplicity

Where two solutions satisfy the same educational objective, the simpler solution should normally be preferred.

Complexity shall require explicit educational justification.

The objective is not to minimise capability but to minimise unnecessary complexity.

---

## 2.12 Principle 11 — Reusability

Educational models, governance mechanisms, engineering practices, and architectural patterns should be designed for reuse where appropriate.

Reusable knowledge strengthens the long-term value of BRM-BOK.

---

## 2.13 Principle 12 — Continuous Improvement

BRM-BOK is expected to evolve.

Improvement shall occur through disciplined review rather than ad hoc modification.

The improvement cycle is:

Observe

↓

Evaluate

↓

Propose

↓

Review

↓

Approve

↓

Implement

↓

Validate

↓

Release

↓

Monitor

This cycle shall govern all significant revisions.

---

## 2.14 Engineering Quality Attributes

All canonical artifacts should demonstrate:

* clarity;
* consistency;
* traceability;
* educational relevance;
* maintainability;
* scalability;
* testability;
* explainability;
* governance compliance.

These attributes form the minimum quality baseline for BRM-BOK.

---

## 2.15 Engineering Decision Framework

Before approving any significant proposal, reviewers shall consider:

1. What educational problem does this solve?
2. Does an equivalent concept already exist?
3. Is the proposal traceable to higher-level principles?
4. Does it strengthen researcher development?
5. Can it be explained clearly?
6. Can it be validated?
7. Will it remain valuable over the long term?

Only proposals satisfying these questions should become canonical.

---

## 2.16 Normative Statements

Within BRM-BOK:

* Every canonical artifact **MUST** conform to these engineering principles.
* Educational purpose **MUST** take precedence over implementation convenience.
* Engineering decisions **MUST** remain traceable.
* Significant conceptual changes **MUST** undergo governance review.
* Educational recommendations **SHOULD** remain explainable.
* Canonical concepts **SHOULD** evolve only through evidence.
* Artificial intelligence **MUST NOT** establish canonical educational knowledge without human approval.

---

## 2.17 Acceptance Criteria

Chapter 2 is complete when it:

* establishes the permanent engineering principles of BRM-BOK;
* defines the relationship between educational purpose and engineering practice;
* introduces the engineering decision framework;
* defines minimum quality expectations;
* establishes the normative basis for all subsequent chapters.

---

## Revision History

| Version   | Date               | Description            |
| --------- | ------------------ | ---------------------- |
| 1.0 Draft | Foundation Phase 2 | Chapter 2 established. |



# Chapter 3 — Knowledge Engineering

---

## 3.1 Purpose

This chapter defines the knowledge engineering discipline used throughout BRM-BOK.

Knowledge engineering is the systematic process of identifying, organising, governing, validating, evolving, and relating educational knowledge so that it remains coherent, reusable, explainable, and evidence-informed.

Knowledge engineering provides the foundation upon which frameworks, theories, methodologies, architectures, specifications, and implementations are constructed.

---

## 3.2 Definition

Within BRM-BOK:

**Knowledge Engineering** is the disciplined process of creating and maintaining governed educational knowledge through structured modelling, traceability, validation, and continuous improvement.

Knowledge engineering treats educational knowledge as a long-lived institutional asset rather than project documentation.

---

## 3.3 Objectives

Knowledge engineering within BRM-BOK pursues the following objectives:

* preserve conceptual integrity;
* reduce duplication;
* support educational consistency;
* improve discoverability;
* enable reuse;
* facilitate governance;
* support empirical validation;
* ensure long-term maintainability.

---

## 3.4 Knowledge Domains

BRM-BOK organises knowledge into distinct but connected domains.

| Domain         | Purpose                           |
| -------------- | --------------------------------- |
| Governance     | Governing principles and policies |
| Framework      | Educational foundations           |
| Theory         | Explanatory models                |
| Methodology    | Educational practice              |
| Architecture   | Structural design                 |
| Specification  | Behavioural requirements          |
| Implementation | Operational systems               |
| Validation     | Educational evidence              |
| Evolution      | Continuous improvement            |

Each domain has clearly defined responsibilities.

---

## 3.5 Knowledge Artifact Types

Every governed artifact shall belong to one primary category.

Examples include:

* Charter
* Standard
* Framework
* Theory
* Methodology
* Architecture
* Model
* Specification
* Register
* Guideline
* Validation Report
* Decision Record
* Case Study

Each artifact type shall have defined governance expectations.

---

## 3.6 Knowledge Lifecycle

Knowledge progresses through the following lifecycle:

Idea

↓

Proposal

↓

Working Draft

↓

Review

↓

Accepted Draft

↓

Canonical

↓

Validated

↓

Revised

↓

Retired

No artifact shall become canonical without governance review.

---

## 3.7 Concept Lifecycle

Individual concepts follow a similar progression.

Each concept shall identify:

* educational problem;
* definition;
* rationale;
* dependencies;
* relationships;
* evidence status;
* validation strategy.

Concepts mature through evidence rather than assertion.

---

## 3.8 Evidence Classification

Every significant concept shall identify its current evidence level.

| Classification | Meaning                                                     |
| -------------- | ----------------------------------------------------------- |
| Established    | Supported by substantial literature or established practice |
| Adapted        | Derived from existing work with justified modification      |
| Proposed       | Original BRM concept awaiting validation                    |
| Validated      | Supported by empirical evaluation within BRM                |
| Deprecated     | Retained for historical reference but no longer recommended |

Evidence classifications may evolve over time.

---

## 3.9 Knowledge Relationships

Knowledge within BRM-BOK is interconnected.

Typical relationships include:

* derives from;
* supports;
* depends on;
* constrains;
* extends;
* refines;
* validates;
* supersedes;
* complements.

These relationships should be explicit wherever practical.

---

## 3.10 Canonical Registers

BRM-BOK maintains authoritative registers.

Examples include:

* Document Register
* Theory Register
* Methodology Register
* Architecture Register
* Identifier Register
* Terminology Register
* Review Register

Registers provide authoritative references for governance.

---

## 3.11 Canonical Terminology

Canonical terminology shall be centrally governed.

Each canonical term shall include:

* identifier;
* preferred name;
* definition;
* rationale;
* related concepts;
* usage guidance;
* version history.

Competing terminology shall be resolved through governance review.

---

## 3.12 Knowledge Traceability

Every artifact shall identify:

* parent artifacts;
* dependent artifacts;
* related theories;
* related methodologies;
* related architectures;
* validation evidence.

Knowledge traceability enables transparent reasoning throughout BRM-BOK.

---

## 3.13 Knowledge Quality

Knowledge quality shall be evaluated against the following attributes:

* accuracy;
* clarity;
* consistency;
* completeness;
* educational relevance;
* traceability;
* maintainability;
* explainability;
* governance compliance.

These attributes define the minimum quality baseline for canonical knowledge.

---

## 3.14 AI-Assisted Knowledge Engineering

Artificial intelligence may assist with:

* drafting;
* comparison;
* consistency checking;
* traceability analysis;
* terminology review;
* structural modelling;
* editorial refinement.

Artificial intelligence shall not independently establish canonical educational knowledge.

Human review remains mandatory.

---

## 3.15 Knowledge Preservation

Canonical knowledge shall be preserved through:

* version control;
* revision history;
* governance records;
* persistent identifiers;
* repository management;
* institutional documentation.

Historical versions shall remain traceable.

---

## 3.16 Knowledge Evolution

Knowledge evolves through controlled refinement.

Evolution should be driven by:

* educational evidence;
* scholarly literature;
* expert review;
* institutional experience;
* implementation feedback;
* empirical validation.

Evolution shall preserve conceptual continuity whenever possible.

---

## 3.17 Engineering Decision Rules

Before accepting new knowledge, reviewers shall determine:

1. What educational problem does this knowledge address?
2. Is similar knowledge already available?
3. How does it relate to existing concepts?
4. What evidence supports it?
5. How will it be validated?
6. What artifacts will depend upon it?
7. Does it strengthen the coherence of BRM-BOK?

Only knowledge satisfying these questions should enter the canonical Body of Knowledge.

---

## 3.18 Normative Statements

Within BRM-BOK:

* Canonical knowledge **MUST** follow the defined lifecycle.
* Significant concepts **MUST** identify an evidence classification.
* Canonical terminology **MUST** be governed through the Lexicon.
* Knowledge relationships **SHOULD** be explicitly documented.
* AI-assisted contributions **MUST** undergo human review before canonisation.
* Historical knowledge **MUST NOT** be deleted without governance approval.

---

## 3.19 Acceptance Criteria

Chapter 3 is complete when it:

* defines knowledge engineering within BRM-BOK;
* establishes knowledge and concept lifecycles;
* introduces evidence classifications;
* defines canonical artifact categories;
* establishes governance for terminology and registers;
* provides a foundation for future knowledge modelling.

---

## Revision History

| Version   | Date               | Description            |
| --------- | ------------------ | ---------------------- |
| 1.0 Draft | Foundation Phase 2 | Chapter 3 established. |


# Chapter 4 — Governance and Decision Records

---

## 4.1 Purpose

This chapter establishes the governance framework through which BRM-BOK evolves.

Governance ensures that changes to the Body of Knowledge are deliberate, transparent, evidence-informed, and traceable. Every significant decision affecting the educational framework, theories, methodologies, architectures, specifications, or implementations shall be documented through a formal decision record.

---

## 4.2 Governance Objectives

The governance framework has six primary objectives:

* preserve conceptual integrity;
* provide transparent decision-making;
* support long-term maintainability;
* ensure educational accountability;
* enable traceability of major decisions;
* facilitate institutional confidence.

Governance protects the stability of BRM-BOK while allowing controlled evolution.

---

## 4.3 Governance Principles

The governance process is guided by the following principles:

1. Decisions shall be evidence-informed.
2. Decisions shall be documented.
3. Decisions shall be reviewable.
4. Decisions shall be traceable.
5. Decisions shall preserve educational purpose.
6. Decisions shall remain understandable to future contributors.

---

## 4.4 Governance Layers

Governance responsibilities exist at multiple layers.

| Layer          | Primary Responsibility   |
| -------------- | ------------------------ |
| Initiative     | Strategic direction      |
| Framework      | Educational principles   |
| Theory         | Educational explanations |
| Methodology    | Educational practice     |
| Architecture   | Structural design        |
| Specification  | Behavioural requirements |
| Implementation | Operational realisation  |
| Validation     | Evidence collection      |

Each layer governs decisions appropriate to its scope.

---

## 4.5 Decision Record Types

BRM-BOK recognises four primary decision record types.

### Educational Decision Record (EDR)

Records decisions affecting:

* educational philosophy;
* constitutional principles;
* learning models;
* educational policies.

Example identifier:

EDR-0001

---

### Theory Decision Record (TDR)

Records decisions affecting:

* educational theories;
* conceptual models;
* theoretical relationships;
* explanatory constructs.

Example identifier:

TDR-0001

---

### Methodology Decision Record (MDR)

Records decisions affecting:

* mentoring methodology;
* educational workflows;
* mentoring processes;
* capability assessment methods.

Example identifier:

MDR-0001

---

### Architecture Decision Record (ADR)

Records decisions affecting:

* reference architectures;
* platform architecture;
* knowledge graph architecture;
* technical architecture.

Example identifier:

ADR-0001

---

## 4.6 Decision Record Structure

Every decision record shall contain:

* identifier;
* title;
* status;
* date;
* context;
* problem statement;
* alternatives considered;
* decision;
* rationale;
* expected consequences;
* affected artifacts;
* related decision records;
* implementation implications;
* validation requirements.

---

## 4.7 Decision Lifecycle

Each decision progresses through the following lifecycle:

Proposal

↓

Discussion

↓

Review

↓

Accepted

↓

Implemented

↓

Validated

↓

Superseded (if necessary)

↓

Archived

Historical decisions remain part of the permanent governance record.

---

## 4.8 Governance Review

Significant proposals shall undergo structured review.

Review should consider:

* educational impact;
* conceptual consistency;
* traceability;
* implementation implications;
* validation strategy;
* stakeholder impact;
* long-term sustainability.

---

## 4.9 Authority Levels

Different decisions require different levels of approval.

| Decision Type           | Typical Authority   |
| ----------------------- | ------------------- |
| Editorial corrections   | Editor              |
| Clarifications          | Editor + Reviewer   |
| Educational principles  | Governance Board    |
| New theories            | Governance Board    |
| New methodologies       | Governance Board    |
| Architectural changes   | Architecture Review |
| Software implementation | Technical Review    |

Until a formal governance board exists, the project founder acts as the approving authority.

---

## 4.10 Change Categories

Changes shall be classified as:

* Editorial
* Clarification
* Minor
* Major
* Foundational

Foundational changes affect the Charter, BRMF, constitutional principles, or accepted foundational theories and require the highest level of scrutiny.

---

## 4.11 Governance Registers

The following governance registers shall be maintained:

* Document Register
* Decision Register
* Theory Register
* Methodology Register
* Architecture Register
* Standards Register
* Identifier Register
* Review Register

These registers constitute the authoritative governance index of BRM-BOK.

---

## 4.12 Governance Criteria

Before approving a proposal, reviewers shall determine:

1. Does it solve a genuine educational problem?
2. Is it consistent with the Charter?
3. Is it consistent with BRMF?
4. Is it supported by evidence or a clear validation plan?
5. Does it duplicate an existing concept?
6. Can it be explained clearly?
7. Is the expected educational value greater than the added complexity?

---

## 4.13 Governance and Traceability

Every accepted decision shall identify:

* affected canonical documents;
* affected theories;
* affected methodologies;
* affected architectures;
* affected specifications;
* affected implementations;
* affected validation activities.

This maintains complete governance traceability.

---

## 4.14 AI Participation

Artificial intelligence may assist in:

* identifying inconsistencies;
* analysing alternatives;
* drafting decision records;
* evaluating traceability;
* reviewing completeness.

Artificial intelligence shall not approve governance decisions.

Approval remains a human responsibility.

---

## 4.15 Governance Metrics

The governance process should be evaluated using indicators such as:

* decision traceability;
* review completion rate;
* unresolved proposals;
* superseded decisions;
* governance turnaround time;
* implementation compliance.

These metrics support continuous improvement.

---

## 4.16 Normative Statements

Within BRM-BOK:

* Significant changes **MUST** be documented through an appropriate decision record.
* Foundational changes **MUST** undergo governance review.
* Accepted decisions **MUST** remain permanently traceable.
* Decision records **MUST NOT** be deleted; they may only be superseded or retired.
* AI **MUST NOT** act as the approving authority for governance decisions.

---

## 4.17 Acceptance Criteria

Chapter 4 is complete when it:

* defines the governance model;
* establishes decision record types;
* defines governance authority;
* specifies review expectations;
* establishes governance registers;
* defines decision lifecycles and approval requirements.

---

## Revision History

| Version   | Date               | Description            |
| --------- | ------------------ | ---------------------- |
| 1.0 Draft | Foundation Phase 2 | Chapter 4 established. |


