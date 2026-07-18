# BRMF-206 — Research Constructs, Variables, and Theoretical Models Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205  
**Prepares:** BRMF-207, BRMF-208, BRMF-209, BRMF-210, BRMF-211

---

## 1. Purpose

This document defines the domain model for theories, concepts, constructs,
variables, indicators, conceptual frameworks, theoretical frameworks,
operationalisation, measurement, and their governed relationships within the
Business Research Mentor (BRM).

It establishes the Scholarly Knowledge Graph as a first-class platform
capability.

The model must support reuse of scholarly knowledge across projects while
preserving the independence, context, decisions, provenance, and version history
of each individual Research Project.

---

## 2. Core Principle

BRM must not treat theory, concept, construct, variable, and indicator as
interchangeable labels.

The canonical semantic progression is:

Knowledge Domain  
→ Theory  
→ Concept  
→ Construct  
→ Variable  
→ Indicator

These layers are related but distinct.

A Theory explains or predicts relationships.

A Concept is an abstract scholarly idea.

A Construct is a defined scholarly representation of a concept for a particular
research context.

A Variable is the role-bearing representation of a construct within a specific
research design.

An Indicator is an observable or measurable representation used to assess a
variable.

---

## 3. Bounded Context

### 3.1 Context name

**Research Constructs, Variables, and Theoretical Models Context**

### 3.2 Responsibilities

The context owns:

- Theory;
- Concept;
- Construct;
- Construct Dimension;
- Variable;
- Variable Role Assignment;
- Indicator;
- Measurement Definition;
- Operationalisation;
- Relationship Definition;
- Proposition;
- Hypothesis;
- Conceptual Framework;
- Theoretical Framework;
- Framework Node;
- Framework Edge;
- Boundary Condition;
- Scholarly Knowledge Graph;
- Knowledge Relationship;
- Framework Coherence Finding;
- Construct Provenance;
- Theory Provenance;
- Measurement Provenance;
- Semantic Versioning of scholarly objects.

### 3.3 Responsibilities excluded

The context does not own:

- Research Project lifecycle;
- Research Decision reasoning;
- source-document content;
- Evidence Item content;
- learner development;
- mentoring interactions;
- supervisor identity;
- institutional approval;
- statistical analysis execution;
- instrument administration.

---

## 4. Aggregate Architecture

BRMF-206 defines multiple collaborating aggregates rather than one oversized
aggregate.

The foundational aggregate roots are:

1. Theory
2. Concept
3. Construct
4. Variable
5. Measurement Model
6. Conceptual Framework
7. Theoretical Framework
8. Scholarly Knowledge Graph

These aggregates are linked by stable identifiers, explicit relationships, and
provenance.

---

## 5. Governed Scholarly Object Conformance

Each major aggregate conforms conceptually to the Governed Scholarly Object
pattern.

It must support, where applicable:

- stable identity;
- explicit lifecycle;
- semantic version;
- provenance;
- source attribution;
- review status;
- authority;
- supersession;
- traceability;
- domain events;
- non-destructive revision.

This pattern must not force implementation inheritance.

---

## 6. Theory Aggregate

### 6.1 Identity

`TheoryId`

### 6.2 Responsibilities

The Theory aggregate governs:

- theory identity;
- canonical name;
- alternative names;
- theoretical domain;
- explanatory purpose;
- core assumptions;
- principal concepts;
- claimed relationships;
- boundary conditions;
- source lineage;
- versions;
- project-specific adoption references.

### 6.3 Theory attributes

- Theory Id;
- Canonical Name;
- Alternative Names;
- Acronym;
- Description;
- Knowledge Domain;
- Theory Type;
- Explanatory Scope;
- Core Assumptions;
- Principal Concepts;
- Claimed Mechanisms;
- Boundary Conditions;
- Foundational Source References;
- Supporting Source References;
- Critical Source References;
- Status;
- Review Status;
- Semantic Version;
- Provenance.

### 6.4 Theory types

- Grand Theory;
- Middle-Range Theory;
- Substantive Theory;
- Process Theory;
- Variance Theory;
- Normative Theory;
- Predictive Theory;
- Explanatory Theory;
- Design Theory;
- Integrative Theory;
- Practice Theory;
- Framework Commonly Treated as Theory.

### 6.5 Theory status

- Candidate;
- Defined;
- Under Review;
- Accepted;
- Contested;
- Deprecated;
- Superseded;
- Archived.

### 6.6 Rules

- A Theory must not be reduced to a list of variables.
- A theory adoption must remain distinguishable from the theory itself.
- Project-specific reinterpretation must not silently alter the canonical
  theory record.
- Criticism and limitations must remain traceable.
- Foundational and later interpretations must retain separate provenance.

---

## 7. Concept Aggregate

### 7.1 Identity

`ConceptId`

### 7.2 Responsibilities

The Concept aggregate governs abstract scholarly meaning independently of a
single project.

### 7.3 Concept attributes

- Concept Id;
- Canonical Label;
- Alternative Labels;
- Definition;
- Knowledge Domain;
- Parent Concepts;
- Child Concepts;
- Related Concepts;
- Distinguishing Features;
- Inclusion Boundaries;
- Exclusion Boundaries;
- Source Lineage;
- Status;
- Semantic Version;
- Provenance.

### 7.4 Concept relationships

- Broader Than;
- Narrower Than;
- Related To;
- Overlaps With;
- Contrasts With;
- Historically Derived From;
- Commonly Confused With;
- Contextually Equivalent To.

### 7.5 Rules

- A Concept is not automatically measurable.
- A Concept may support multiple Constructs.
- Concept equivalence must be contextual, not assumed globally.
- Synonyms must not be merged without review.
- Definitions must preserve disciplinary and contextual variation.

---

## 8. Construct Aggregate

### 8.1 Identity

`ConstructId`

### 8.2 Responsibilities

The Construct aggregate governs a scholarly definition used to represent one or
more concepts in a research context.

### 8.3 Construct attributes

- Construct Id;
- Construct Name;
- Definition;
- Concept References;
- Theoretical Context;
- Research Context;
- Unit of Analysis;
- Level of Analysis;
- Dimensionality;
- Construct Dimensions;
- Inclusion Boundaries;
- Exclusion Boundaries;
- Distinguishing Features;
- Related Constructs;
- Source Lineage;
- Status;
- Review Status;
- Semantic Version;
- Provenance.

### 8.4 Construct types

- Unidimensional;
- Multidimensional;
- Latent;
- Formative;
- Reflective;
- Composite;
- Emergent;
- Context-Specific;
- Higher-Order;
- Observed Composite.

### 8.5 Construct relationships

- Extends;
- Refines;
- Specialises;
- Generalises;
- Overlaps;
- Contrasts;
- Conflicts With;
- Depends On;
- Composed Of;
- Derived From;
- Operationalised As;
- Measured Through;
- Supported By Theory;
- Contextually Equivalent To;
- Distinct From.

### 8.6 Rules

- A Construct must reference at least one Concept.
- A Construct must have an explicit definition.
- A Construct definition must identify context where context affects meaning.
- A Construct must not be treated as identical to its measurement instrument.
- Material redefinition creates a new semantic version.
- Construct lineage must remain traceable.
- A Construct may be reused across projects without inheriting the same
  Variable role.

---

## 9. Construct Dimension

A Construct Dimension represents a governed component of a multidimensional
construct.

### Attributes

- Construct Dimension Id;
- Parent Construct Id;
- Name;
- Definition;
- Position;
- Mandatory or Optional;
- Distinctiveness Rationale;
- Related Indicators;
- Status;
- Semantic Version;
- Provenance.

### Rules

- A dimension must not be introduced solely because a scale contains grouped
  items.
- Dimensionality requires theoretical or empirical justification.
- Higher-order relationships must be explicitly modelled.

---

## 10. Variable Aggregate

### 10.1 Identity

`VariableId`

### 10.2 Responsibilities

The Variable aggregate governs the project-specific role of a Construct within
a research design.

### 10.3 Variable attributes

- Variable Id;
- Research Project Id;
- Construct Id;
- Variable Label;
- Operational Definition;
- Variable Role Assignments;
- Unit of Analysis;
- Level of Analysis;
- Data Form;
- Temporal Position;
- Measurement Model Reference;
- Related Research Questions;
- Related Objectives;
- Related Hypotheses;
- Status;
- Semantic Version;
- Provenance.

### 10.4 Variable roles

- Independent;
- Dependent;
- Mediator;
- Moderator;
- Control;
- Predictor;
- Outcome;
- Criterion;
- Covariate;
- Confounder;
- Endogenous;
- Exogenous;
- Latent;
- Observed;
- Grouping;
- Exposure;
- Intervention;
- Process;
- Contextual;
- Instrumental.

### 10.5 Role-assignment principle

Variable role belongs to the project and research design context.

It is not an intrinsic property of the Construct.

The same Construct may serve different roles in different projects or models.

### 10.6 Rules

- A Variable references exactly one Construct within one project context.
- A Variable may hold more than one compatible role where explicitly justified.
- Conflicting roles must trigger a coherence finding.
- Variable role changes create a revision record.
- A Variable must not exist without a project context.
- A latent or observed designation must remain distinct from causal role.

---

## 11. Indicator

An Indicator is an observable representation used to measure or assess a
Variable.

### Attributes

- Indicator Id;
- Variable Id;
- Indicator Type;
- Label;
- Definition;
- Source;
- Instrument Item Reference;
- Data Type;
- Scale Type;
- Direction;
- Scoring Rule;
- Aggregation Rule;
- Collection Method;
- Time Point;
- Validity Evidence References;
- Reliability Evidence References;
- Status;
- Semantic Version;
- Provenance.

### Indicator types

- Survey Item;
- Interview Code;
- Observation;
- Behavioural Measure;
- Organisational Metric;
- Financial Ratio;
- Archival Measure;
- Experimental Measure;
- Digital Trace;
- Physiological Measure;
- Composite Score;
- Index;
- Categorical Classification;
- Textual Indicator.

### Rules

- An Indicator measures a Variable, not a Concept directly.
- Reverse-coded indicators must be explicit.
- Derived indicators must preserve calculation provenance.
- An Indicator must not be represented as valid merely because it has been used
  previously.
- Indicator suitability is context dependent.

---

## 12. Measurement Model Aggregate

### 12.1 Identity

`MeasurementModelId`

### 12.2 Responsibilities

The Measurement Model aggregate governs how one or more Variables are measured.

### 12.3 Attributes

- Measurement Model Id;
- Research Project Id;
- Variable References;
- Construct References;
- Model Type;
- Indicator Set;
- Instrument Reference;
- Scoring Method;
- Aggregation Method;
- Missing Data Rule;
- Validation Strategy;
- Reliability Strategy;
- Invariance Requirements;
- Adaptation History;
- Language;
- Administration Mode;
- Status;
- Review Status;
- Semantic Version;
- Provenance.

### 12.4 Model types

- Reflective;
- Formative;
- Composite;
- Index;
- Single-Indicator;
- Multi-Trait Multi-Method;
- Hierarchical;
- Qualitative Coding Structure;
- Mixed Measurement Model.

### 12.5 Rules

- Measurement type must align with Construct meaning.
- Reflective and formative models must not be treated as interchangeable.
- Adapted instruments must preserve changes and rationale.
- Reliability evidence must remain distinct from validity evidence.
- Prior validation does not eliminate the need for contextual assessment.
- A Measurement Model may be provisional before pilot evidence is available.

---

## 13. Operationalisation

Operationalisation connects a Construct and Variable to observable indicators
and procedures.

### Attributes

- Operationalisation Id;
- Construct Id;
- Variable Id;
- Measurement Model Id;
- Definition Used;
- Indicator References;
- Instrument Reference;
- Data Collection Procedure;
- Scoring Procedure;
- Transformation Procedure;
- Thresholds;
- Missing Data Treatment;
- Context Adaptations;
- Rationale;
- Limitations;
- Status;
- Provenance.

### Rules

- Operationalisation must be traceable to the Construct definition.
- Operational convenience must not silently redefine the Construct.
- Transformations must preserve their rationale and effect.
- A proxy measure must be labelled as a proxy.
- Operationalisation changes must trigger impact analysis.

---

## 14. Relationship Definition

A Relationship Definition represents a proposed or established scholarly
relationship among Concepts, Constructs, or Variables.

### Attributes

- Relationship Id;
- Source Node;
- Target Node;
- Relationship Type;
- Direction;
- Sign;
- Functional Form, optional;
- Temporal Order;
- Level of Analysis;
- Mechanism;
- Boundary Conditions;
- Theoretical Support;
- Evidence References;
- Strength, optional;
- Confidence;
- Status;
- Semantic Version;
- Provenance.

### Relationship types

- Causes;
- Influences;
- Predicts;
- Explains;
- Mediates;
- Moderates;
- Associates With;
- Covaries With;
- Precedes;
- Follows;
- Enables;
- Constrains;
- Reinforces;
- Reduces;
- Constitutes;
- Is Dimension Of;
- Is Indicator Of;
- Depends On;
- Conflicts With;
- Supports;
- Contradicts.

### Rules

- Direction must be explicit where direction is claimed.
- Association must not be represented as causation.
- Mediation and moderation require distinct semantics.
- Relationship meaning must be distinguishable from statistical significance.
- Boundary conditions must be preserved.
- Cross-level relationships must identify their levels.

---

## 15. Proposition

A Proposition is a theoretically grounded statement about relationships among
Concepts or Constructs.

### Attributes

- Proposition Id;
- Statement;
- Source Nodes;
- Target Nodes;
- Relationship References;
- Theoretical Support;
- Boundary Conditions;
- Assumptions;
- Status;
- Review Status;
- Provenance.

### Rules

- A Proposition need not be directly testable.
- A Proposition must not be labelled a Hypothesis unless operationalised for
  empirical testing.
- Theoretical and empirical status must remain distinct.

---

## 16. Hypothesis

A Hypothesis is a testable statement about Variables or operationalised
Constructs.

### Attributes

- Hypothesis Id;
- Research Project Id;
- Statement;
- Hypothesis Type;
- Variable References;
- Relationship Reference;
- Direction;
- Expected Sign;
- Population or Context;
- Boundary Conditions;
- Statistical Test Reference, optional;
- Decision Rule, optional;
- Status;
- Provenance.

### Hypothesis types

- Directional;
- Non-Directional;
- Null;
- Alternative;
- Mediation;
- Moderation;
- Interaction;
- Comparative;
- Difference;
- Association;
- Causal;
- Exploratory.

### Rules

- A Hypothesis must be traceable to a Research Question or Objective.
- Variables must be operationally defined before empirical testing.
- Statistical rejection or non-rejection must not be confused with theoretical
  truth.
- A Hypothesis may be revised before data analysis with full provenance.
- Post hoc hypotheses must be labelled as such.

---

## 17. Conceptual Framework Aggregate

### 17.1 Identity

`ConceptualFrameworkId`

### 17.2 Responsibilities

The Conceptual Framework aggregate governs a project-specific representation of
Concepts, Constructs, Variables, and their proposed relationships.

### 17.3 Attributes

- Conceptual Framework Id;
- Research Project Id;
- Name;
- Purpose;
- Framework Nodes;
- Framework Edges;
- Boundary Conditions;
- Assumptions;
- Scope;
- Related Research Questions;
- Related Objectives;
- Related Decisions;
- Diagram Reference, optional;
- Status;
- Review Status;
- Semantic Version;
- Provenance.

### 17.4 Rules

- A framework is not merely an image.
- Every visible node and edge must have semantic identity.
- Diagram changes must be reconciled with the governed model.
- Unsupported edges must be flagged.
- The framework must preserve alternative and superseded versions.
- A framework may integrate multiple theories.

---

## 18. Theoretical Framework Aggregate

### 18.1 Identity

`TheoreticalFrameworkId`

### 18.2 Responsibilities

The Theoretical Framework aggregate governs how one or more Theories are adopted
and applied to explain the Research Project.

### 18.3 Attributes

- Theoretical Framework Id;
- Research Project Id;
- Name;
- Adopted Theory References;
- Integration Rationale;
- Selected Concepts;
- Selected Constructs;
- Claimed Mechanisms;
- Boundary Conditions;
- Exclusions;
- Adaptations;
- Related Decisions;
- Status;
- Review Status;
- Semantic Version;
- Provenance.

### 18.4 Rules

- Theory adoption must be explicit.
- Adaptation must not be presented as the unchanged original theory.
- Combining theories requires an integration rationale.
- Theoretical incompatibilities must trigger a coherence finding.
- A Theoretical Framework may exist without a graphical representation.
- A Conceptual Framework and Theoretical Framework may overlap but are not
  identical by default.

---

## 19. Framework Node

A Framework Node references a governed scholarly object.

### Node types

- Theory;
- Concept;
- Construct;
- Variable;
- Construct Dimension;
- Indicator;
- Context;
- Boundary Condition;
- Outcome;
- Process;
- Mechanism.

### Attributes

- Framework Node Id;
- Referenced Object Id;
- Node Type;
- Label Override, optional;
- Role in Framework;
- Position Metadata, optional;
- Status;
- Provenance.

---

## 20. Framework Edge

A Framework Edge references a governed Relationship Definition.

### Attributes

- Framework Edge Id;
- Relationship Id;
- Source Node Id;
- Target Node Id;
- Label Override, optional;
- Direction;
- Status;
- Provenance.

### Rules

- Every edge must reference valid nodes.
- Edge semantics must remain consistent with the Relationship Definition.
- Visual direction and semantic direction must not conflict.
- Duplicate edges require explicit justification.

---

## 21. Scholarly Knowledge Graph Aggregate

### 21.1 Identity

`ScholarlyKnowledgeGraphId`

### 21.2 Purpose

The Scholarly Knowledge Graph provides a governed semantic structure linking
theories, concepts, constructs, variables, indicators, frameworks, evidence,
decisions, and project contexts.

### 21.3 Graph components

- Knowledge Nodes;
- Knowledge Edges;
- Node Types;
- Edge Types;
- Provenance Links;
- Version Links;
- Project Context Links;
- Evidence Links;
- Decision Links;
- Review Links;
- Confidence and Status Metadata.

### 21.4 Node types

- Knowledge Domain;
- Theory;
- Concept;
- Construct;
- Construct Dimension;
- Variable;
- Indicator;
- Measurement Model;
- Operationalisation;
- Proposition;
- Hypothesis;
- Conceptual Framework;
- Theoretical Framework;
- Evidence Claim;
- Research Decision;
- Research Question;
- Research Objective;
- Boundary Condition.

### 21.5 Edge types

- Defines;
- Refines;
- Extends;
- Specialises;
- Generalises;
- Operationalises;
- Measures;
- Supports;
- Challenges;
- Contradicts;
- Predicts;
- Explains;
- Causes;
- Mediates;
- Moderates;
- Is Dimension Of;
- Is Variable For;
- Is Indicator For;
- Adopted By;
- Included In;
- Derived From;
- Supersedes;
- Version Of;
- Decided Through;
- Evidenced By;
- Constrained By;
- Applicable Within.

### 21.6 Graph rules

- Every node must have stable identity.
- Every edge must have semantic type.
- Every material edge must retain provenance.
- Project-specific relationships must be distinguishable from canonical
  scholarly relationships.
- Conflicting relationships may coexist when context and provenance differ.
- Graph traversal must respect access, project, and version boundaries.
- Graph inference must be distinguishable from asserted knowledge.
- Inferred edges must never overwrite asserted edges.

---

## 22. Canonical and Project-Specific Knowledge

The platform must distinguish:

### Canonical scholarly knowledge

Reusable knowledge representing theories, concepts, constructs, established
definitions, and sourced relationships.

### Project-specific knowledge

Definitions, roles, frameworks, hypotheses, adaptations, and operationalisations
created for one Research Project.

### Rules

- Project adoption does not alter canonical knowledge.
- Project-specific adaptation must preserve a link to its source.
- Canonical updates must not silently rewrite project history.
- Projects may intentionally reject or challenge canonical interpretations.
- Cross-project reuse requires provenance and context preservation.

---

## 23. Semantic Versioning

Major scholarly objects must use semantic versioning principles.

### Version triggers

A new version is required for material changes to:

- definition;
- dimensionality;
- boundary;
- relationship meaning;
- operationalisation;
- framework membership;
- theory integration;
- measurement model;
- indicator scoring;
- variable role where project impact is material.

### Rules

- Minor editorial changes may retain the version with an audit record.
- Material semantic changes require a new version.
- Superseded versions remain retrievable.
- Project references must identify the version used.

---

## 24. Framework Coherence Finding

A Framework Coherence Finding records an evaluated inconsistency, omission, or
uncertainty.

### Attributes

- Finding Id;
- Framework Id;
- Finding Type;
- Affected Nodes;
- Affected Edges;
- Description;
- Severity;
- Evidence;
- Explanation;
- Recommended Action;
- Status;
- Provenance.

### Finding types

- Unsupported Relationship;
- Missing Construct;
- Redundant Construct;
- Ambiguous Definition;
- Conflicting Definition;
- Level-of-Analysis Mismatch;
- Unit-of-Analysis Mismatch;
- Temporal Mismatch;
- Theory-Construct Misalignment;
- Construct-Variable Misalignment;
- Variable-Indicator Misalignment;
- Reflective-Formative Mismatch;
- Causal Claim Without Basis;
- Mediation Misclassification;
- Moderation Misclassification;
- Circular Relationship;
- Boundary Condition Omission;
- Measurement Inadequacy;
- Hypothesis Misalignment;
- Framework Scope Conflict.

### Severity

- Informational;
- Minor;
- Material;
- Critical;
- Indeterminate.

---

## 25. Domain Services

### 25.1 Theory Discovery Service

Supports identification of theories relevant to the Research Problem, Gap,
Questions, Objectives, Constructs, and context.

It must provide:

- candidate theories;
- relevance rationale;
- assumptions;
- boundary conditions;
- supporting and critical evidence;
- provenance.

---

### 25.2 Theory Selection Support Service

Compares candidate theories using explicit criteria.

It may evaluate:

- explanatory fit;
- predictive relevance;
- construct coverage;
- context suitability;
- methodological compatibility;
- parsimony;
- integration burden;
- boundary conditions;
- known limitations.

Final theory selection remains a Research Decision.

---

### 25.3 Construct Discovery Service

Identifies candidate Constructs and related Concepts.

It must distinguish:

- canonical constructs;
- near-synonyms;
- overlapping constructs;
- context-specific variants;
- dimensions;
- competing definitions.

---

### 25.4 Construct Alignment Service

Evaluates alignment among:

- Construct definition;
- Theory;
- Research Question;
- Objective;
- Unit of Analysis;
- Level of Analysis;
- Variable;
- Indicator;
- Measurement Model.

---

### 25.5 Variable Role Validation Service

Evaluates whether assigned Variable roles are semantically and methodologically
coherent.

It must distinguish:

- causal role;
- statistical role;
- measurement status;
- temporal position;
- design function.

---

### 25.6 Operationalisation Assessment Service

Evaluates whether an Operationalisation appropriately represents the Construct
in the Research Project context.

Possible outputs:

- Suitable;
- Suitable with Qualification;
- Weak Alignment;
- Proxy Only;
- Insufficient Evidence;
- Revision Required;
- Supervisor Review Required.

---

### 25.7 Measurement Quality Assessment Service

Evaluates:

- content validity;
- construct validity;
- convergent validity;
- discriminant validity;
- criterion validity;
- reliability;
- contextual suitability;
- adaptation quality;
- measurement invariance;
- administration risk.

It must not collapse all dimensions into one opaque score.

---

### 25.8 Framework Coherence Service

Evaluates Conceptual and Theoretical Frameworks for typed semantic coherence.

It identifies:

- missing nodes;
- unsupported edges;
- contradictory theory assumptions;
- role conflicts;
- measurement gaps;
- scope mismatches;
- circularity;
- boundary-condition omissions.

---

### 25.9 Framework Evolution Service

Compares framework versions and explains:

- added or removed nodes;
- added or removed relationships;
- changed definitions;
- changed variable roles;
- changed operationalisations;
- changed theory adoption;
- affected hypotheses and decisions.

---

### 25.10 Knowledge Graph Integrity Service

Validates graph identity, typing, provenance, versioning, and edge consistency.

---

## 26. Domain Policies

### 26.1 Semantic Distinction Policy

Theory, Concept, Construct, Variable, and Indicator must remain distinct domain
objects.

---

### 26.2 Variable Role Policy

Variable roles are project-specific assignments and must not be stored as
intrinsic Construct properties.

---

### 26.3 Measurement Separation Policy

Measurement evidence must remain distinct from theoretical justification.

---

### 26.4 Theory Adoption Policy

A project must record:

- which theory version was adopted;
- why it was adopted;
- how it was adapted;
- which assumptions apply;
- which limitations remain.

---

### 26.5 Framework Governance Policy

Material framework changes must:

- create a new version;
- preserve the prior version;
- identify affected nodes and edges;
- link related Research Decisions;
- trigger coherence evaluation;
- record review where required.

---

### 26.6 Knowledge Reuse Policy

Reusable scholarly knowledge may be shared across projects only when provenance,
version, context, and access boundaries are preserved.

---

### 26.7 Inference Transparency Policy

Graph-inferred knowledge must be labelled as inferred.

It must not overwrite asserted, reviewed, or sourced knowledge.

---

### 26.8 Paradigm Sensitivity Policy

The domain model must support quantitative, qualitative, mixed-method, design,
interpretive, critical, and other legitimate research traditions.

Construct and Variable models must not force all research into a quantitative
variable framework.

---

## 27. Paradigm-Sensitive Modelling

### Quantitative research

May use:

- Constructs;
- Variables;
- Indicators;
- Measurement Models;
- Hypotheses;
- directed relationships.

### Qualitative research

May use:

- Concepts;
- sensitising concepts;
- categories;
- themes;
- processes;
- mechanisms;
- contextual relationships;
- evolving conceptual models.

Variables and hypotheses are optional.

### Mixed-method research

May connect qualitative concepts and categories with quantitative Constructs,
Variables, Indicators, and Measurement Models.

### Design and action research

May include:

- design principles;
- mechanisms;
- interventions;
- outcomes;
- contextual conditions;
- iterative framework versions.

### Rule

BRM must not treat Constructs and Variables as mandatory for every research
paradigm.

---

## 28. Aggregate Invariants

The domain must enforce:

1. Every Theory has stable identity and provenance.
2. Every Concept has a definition or explicit unresolved-definition status.
3. Every Construct references at least one Concept.
4. Every Construct has an explicit definition.
5. Every Variable references exactly one Construct within one project context.
6. Variable role belongs to the project, not intrinsically to the Construct.
7. Every Indicator references a Variable.
8. An Indicator does not directly replace a Construct definition.
9. Measurement evidence remains distinct from theoretical support.
10. A Framework is a semantic model, not merely an image.
11. Every Framework Edge references valid Framework Nodes.
12. Every material relationship has type, direction where applicable, and
    provenance.
13. Association is not silently converted into causation.
14. Mediation and moderation remain semantically distinct.
15. Canonical knowledge remains distinct from project-specific knowledge.
16. Project adaptations do not overwrite canonical records.
17. Material semantic changes create new versions.
18. Superseded versions remain traceable.
19. Inferred graph edges remain distinguishable from asserted edges.
20. Conflicting scholarly claims may coexist with separate provenance.
21. Construct dimensionality requires justification.
22. Operational convenience must not silently redefine a Construct.
23. Reflective and formative models are not interchangeable.
24. Reliability does not establish validity.
25. Prior validation does not guarantee contextual suitability.
26. Post hoc hypotheses must be labelled.
27. A Theory is not reduced to a variable list.
28. A Concept need not be measurable.
29. A qualitative model need not contain Variables.
30. The complete framework must remain explainable without hidden AI reasoning.

---

## 29. Commands

Initial commands include:

- Register Theory
- Update Theory
- Supersede Theory Version
- Register Concept
- Relate Concepts
- Define Construct
- Revise Construct
- Add Construct Dimension
- Relate Constructs
- Create Project Variable
- Assign Variable Role
- Revise Variable Role
- Add Indicator
- Revise Indicator
- Create Measurement Model
- Add Indicator to Measurement Model
- Record Operationalisation
- Revise Operationalisation
- Define Relationship
- Revise Relationship
- Create Proposition
- Create Hypothesis
- Revise Hypothesis
- Create Conceptual Framework
- Add Framework Node
- Add Framework Edge
- Revise Conceptual Framework
- Create Theoretical Framework
- Adopt Theory
- Integrate Theories
- Record Theory Adaptation
- Revise Theoretical Framework
- Build Scholarly Knowledge Graph
- Add Knowledge Node
- Add Knowledge Edge
- Record Inferred Knowledge Edge
- Review Knowledge Edge
- Record Framework Coherence Finding
- Resolve Framework Coherence Finding
- Assess Operationalisation
- Assess Measurement Quality
- Evaluate Framework Coherence
- Compare Framework Versions

---

## 30. Domain Events

Initial events include:

- TheoryRegistered
- TheoryUpdated
- TheoryVersionSuperseded
- ConceptRegistered
- ConceptsRelated
- ConstructDefined
- ConstructRevised
- ConstructDimensionAdded
- ConstructsRelated
- ProjectVariableCreated
- VariableRoleAssigned
- VariableRoleRevised
- IndicatorAdded
- IndicatorRevised
- MeasurementModelCreated
- IndicatorAddedToMeasurementModel
- OperationalisationRecorded
- OperationalisationRevised
- RelationshipDefined
- RelationshipRevised
- PropositionCreated
- HypothesisCreated
- HypothesisRevised
- ConceptualFrameworkCreated
- FrameworkNodeAdded
- FrameworkEdgeAdded
- ConceptualFrameworkRevised
- TheoreticalFrameworkCreated
- TheoryAdopted
- TheoriesIntegrated
- TheoryAdaptationRecorded
- TheoreticalFrameworkRevised
- ScholarlyKnowledgeGraphBuilt
- KnowledgeNodeAdded
- KnowledgeEdgeAdded
- InferredKnowledgeEdgeRecorded
- KnowledgeEdgeReviewed
- FrameworkCoherenceFindingRecorded
- FrameworkCoherenceFindingResolved
- OperationalisationAssessed
- MeasurementQualityAssessed
- FrameworkCoherenceEvaluated
- FrameworkVersionsCompared

---

## 31. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Define Construct | ConstructDefined | Semantic Distinction Policy | Construct references a Concept |
| Create Project Variable | ProjectVariableCreated | Variable Role Policy | Variable is project-specific |
| Assign Variable Role | VariableRoleAssigned | Variable Role Policy | Role is not intrinsic to Construct |
| Add Indicator | IndicatorAdded | Measurement Separation Policy | Indicator references Variable |
| Create Measurement Model | MeasurementModelCreated | Measurement Separation Policy | Measurement type aligns with Construct |
| Adopt Theory | TheoryAdopted | Theory Adoption Policy | Theory version and rationale retained |
| Create Conceptual Framework | ConceptualFrameworkCreated | Framework Governance Policy | Framework is semantic, not only visual |
| Add Framework Edge | FrameworkEdgeAdded | Framework Governance Policy | Edge has valid typed nodes |
| Revise Framework | ConceptualFrameworkRevised | Framework Governance Policy | Prior version preserved |
| Add Knowledge Edge | KnowledgeEdgeAdded | Knowledge Reuse Policy | Provenance and context retained |
| Record Inferred Edge | InferredKnowledgeEdgeRecorded | Inference Transparency Policy | Inferred is distinct from asserted |
| Assess Operationalisation | OperationalisationAssessed | Measurement Separation Policy | Convenience does not redefine Construct |

---

## 32. Authority Model

### BRM may

- suggest theories;
- identify candidate Concepts and Constructs;
- compare definitions;
- identify overlapping Constructs;
- propose Variable roles;
- identify measurement concerns;
- assess framework coherence;
- detect unsupported edges;
- identify missing boundary conditions;
- recommend review;
- generate graph inferences with explicit labels.

### BRM may not

- declare a theory academically correct;
- silently redefine a Construct;
- assign final Variable roles without human acceptance;
- fabricate evidence;
- convert association into causation;
- treat prior instrument use as proof of validity;
- represent inferred graph edges as established knowledge;
- impose quantitative structures on all paradigms.

### Learner may

- propose theories and Constructs;
- define project-specific Constructs;
- assign Variable roles;
- design frameworks;
- select indicators;
- record operationalisation;
- challenge system recommendations;
- revise frameworks;
- justify adaptations.

### Supervisor may

- review theory adoption;
- challenge Construct definitions;
- require measurement evidence;
- review Variable roles;
- confirm framework coherence;
- require revision;
- approve or reject adaptations within delegated authority.

### Institution may

- define methodological standards;
- define instrument and ethics requirements;
- govern access to shared knowledge;
- define review authority;
- audit provenance and integrity.

---

## 33. Cross-Context Interfaces

### Research Project Context

Provides:

- problem;
- gap;
- questions;
- objectives;
- scope;
- stage;
- project constraints.

Receives:

- theory references;
- framework references;
- Construct references;
- Variable references;
- coherence findings;
- measurement risks.

### Research Decision Context

Provides:

- theory-selection decisions;
- construct-selection decisions;
- variable-role decisions;
- measurement decisions;
- framework-design decisions.

Receives:

- alternatives;
- theory comparisons;
- construct comparisons;
- coherence findings;
- measurement assessments;
- graph relationships.

### Knowledge, Evidence, and Provenance Context

Provides:

- Evidence Items;
- source claims;
- source quality;
- contradictions;
- provenance.

Receives:

- theory-source requirements;
- construct-definition claims;
- relationship-support claims;
- measurement-evidence requirements.

### Mentoring Context

Receives:

- construct confusion;
- theory-selection difficulty;
- framework incoherence;
- operationalisation weakness;
- measurement uncertainty.

Provides:

- intervention outcomes;
- learner reflections;
- revised definitions;
- mentoring-linked changes.

### Supervision and Governance Context

Receives:

- theory adoption requests;
- framework review requests;
- measurement concerns;
- critical coherence findings.

Provides:

- confirmation;
- qualification;
- rejection;
- revision requirements;
- institutional standards.

---

## 34. Privacy, Licensing, and Intellectual Integrity

The domain must support:

- source attribution;
- copyright-aware storage of instrument references;
- restriction of proprietary instrument content;
- provenance for adapted scales;
- access control for unpublished frameworks;
- project-level confidentiality;
- distinction between public canonical knowledge and private project knowledge;
- protection of learner-created conceptual models;
- exportable provenance;
- correction and contestation.

BRM must not reproduce proprietary instruments merely because their constructs
or citations are known.

---

## 35. Reporting

Reports may include:

- Theory Profile;
- Concept Map;
- Construct Definition Record;
- Construct Lineage;
- Variable Role Map;
- Indicator Catalogue;
- Measurement Model Summary;
- Operationalisation Matrix;
- Hypothesis Map;
- Conceptual Framework;
- Theoretical Framework;
- Framework Coherence Report;
- Framework Evolution Report;
- Scholarly Knowledge Graph View;
- Provenance Report.

Reports must distinguish:

- canonical knowledge;
- project-specific knowledge;
- asserted relationships;
- inferred relationships;
- learner-authored definitions;
- supervisor-confirmed definitions;
- system suggestions;
- sourced scholarly claims.

---

## 36. Example Scenario

A learner studies the relationship between transformational leadership and
employee innovative behaviour.

The project adopts Social Cognitive Theory and a transformational leadership
framework.

BRM records:

- Theory: Social Cognitive Theory;
- Concept: Leadership;
- Construct: Transformational Leadership;
- Concept: Innovation;
- Construct: Employee Innovative Behaviour;
- Variable A: Transformational Leadership, assigned Predictor role;
- Variable B: Employee Innovative Behaviour, assigned Outcome role;
- Indicators linked through validated but context-adapted instruments;
- a directional relationship from Variable A to Variable B;
- a possible mediator: Creative Self-Efficacy;
- a boundary condition: organisational climate.

The Framework Coherence Service identifies:

- the mediator is not yet linked to a clear theoretical mechanism;
- the climate construct is described as both moderator and control;
- the leadership scale was adapted but adaptation provenance is incomplete;
- the project uses causal language despite a cross-sectional design.

These findings are sent to:

- the Research Decision Context for review;
- the Research Project Context for coherence;
- the Mentoring Context for intervention;
- the Supervision Context where confirmation is required.

---

## 37. Validation Questions

Reviewers should confirm:

1. Are Theory, Concept, Construct, Variable, and Indicator clearly distinct?
2. Does Variable role belong to the project context?
3. Can one Construct serve different roles across projects?
4. Are qualitative and non-variable research models supported?
5. Are Conceptual and Theoretical Frameworks distinct?
6. Are frameworks semantic models rather than only diagrams?
7. Are measurement and theory kept separate?
8. Are reflective and formative models distinguished?
9. Can Construct lineage and redefinition be reconstructed?
10. Can canonical knowledge be reused without overwriting project knowledge?
11. Are inferred graph edges distinguishable from asserted edges?
12. Can conflicting scholarly relationships coexist with provenance?
13. Are framework changes versioned and governed?
14. Are theory adaptations explicit?
15. Can operationalisation quality be assessed?
16. Can the model detect level and unit-of-analysis mismatches?
17. Are hypotheses linked to Variables and Research Questions?
18. Are post hoc hypotheses identifiable?
19. Are proprietary instruments protected?
20. Does the model support the future BRM implementation architecture?

---

## 38. Acceptance Criteria

BRMF-206 may progress from Draft to Approved when:

- the aggregate boundaries are accepted;
- the semantic distinction among Theory, Concept, Construct, Variable, and
  Indicator is accepted;
- Variable role assignment is accepted as project-specific;
- Conceptual and Theoretical Framework models are accepted;
- Measurement Model and Operationalisation models are accepted;
- Proposition and Hypothesis distinctions are accepted;
- the Scholarly Knowledge Graph model is accepted;
- canonical and project-specific knowledge boundaries are accepted;
- semantic versioning and provenance rules are accepted;
- paradigm-sensitive modelling is accepted;
- commands, events, policies, services, and invariants are accepted;
- privacy, licensing, and intellectual-integrity safeguards are accepted;
- cross-context interfaces are suitable for BRMF-207 through BRMF-211;
- no unresolved contradiction with BRMF-201 through BRMF-205 remains.

---

## 39. Next Specification

The next recommended document is:

**BRMF-207 — Mentoring Interaction and Educational Intervention Domain Model**

It will define:

- Mentoring Episode;
- Mentoring Need;
- Intervention;
- Prompt;
- Scaffold;
- Reflection Activity;
- Learner Response;
- Supervisor Interaction;
- Intervention Outcome;
- Escalation;
- Educational Appropriateness;
- intervention provenance;
- mentoring effectiveness;
- boundaries preventing BRM from replacing the supervisor.

---

**End of BRMF-206**
