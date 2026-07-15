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
