# BRMF-208 — Knowledge, Evidence, and Provenance Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207  
**Prepares:** BRMF-209, BRMF-210, BRMF-211

---

## 1. Purpose

This document defines the domain model for scholarly sources, evidence items,
evidence fragments, claims, interpretations, knowledge objects, contradictions,
citations, source quality, evidence quality, evidence sufficiency, provenance
chains, evidence dossiers, verification, AI-generated candidate claims, and
traceability within the Business Research Mentor (BRM).

It establishes the Provenance Engine and the Knowledge–Evidence Network as
first-class platform capabilities.

The model ensures that every material scholarly assertion can be traced to its
sources, evidence, interpretations, decisions, revisions, and responsible
actors.

---

## 2. Core Principle

Knowledge and evidence are not the same domain object.

The canonical scholarly progression is:

Source  
→ Evidence  
→ Claim  
→ Interpretation  
→ Knowledge  
→ Scholarly Decision

A Source contains or generates material.

An Evidence Item is a bounded scholarly observation, result, argument, datum, or
fragment derived from a Source.

A Claim is an assertion that may be supported, challenged, qualified, or
contradicted by Evidence.

An Interpretation explains what the Evidence and Claims mean within a scholarly
context.

A Knowledge Object represents a governed, contextually accepted understanding
that remains open to revision and challenge.

Knowledge is governed.

It is not automatically true, final, universal, or permanent.

---

## 3. Constitutional Role

BRM must preserve scholarly accountability.

The system may:

- locate candidate sources;
- extract candidate evidence;
- identify claims;
- compare support and contradiction;
- assess source and evidence quality;
- identify provenance gaps;
- propose interpretations;
- construct evidence dossiers;
- identify insufficiency;
- support verification;
- trace downstream impact.

The system must not:

- fabricate sources;
- fabricate evidence;
- present AI-generated statements as sourced claims;
- convert inference into fact;
- conceal contradiction;
- erase source limitations;
- treat citation count as truth;
- treat peer review as an automatic quality guarantee;
- silently alter provenance;
- accept generated claims without review.

---

## 4. Bounded Context

### 4.1 Context name

**Knowledge, Evidence, and Provenance Context**

### 4.2 Responsibilities

The context owns:

- Knowledge Source;
- Source Version;
- Source Identity;
- Source Quality Assessment;
- Evidence Item;
- Evidence Fragment;
- Claim;
- Claim Scope;
- Claim Support;
- Claim Challenge;
- Contradiction;
- Interpretation;
- Knowledge Object;
- Citation;
- Verification Record;
- Evidence Quality Assessment;
- Evidence Sufficiency Assessment;
- Evidence Dossier;
- Provenance Record;
- Provenance Chain;
- Provenance Event;
- Provenance Engine;
- Knowledge–Evidence Network.

### 4.3 Responsibilities excluded

The context does not own:

- Research Project lifecycle;
- Research Decision lifecycle;
- Theory, Concept, Construct, or Variable identity;
- mentoring interactions;
- learner identity;
- supervisor identity;
- formal institutional assessment;
- copyright ownership;
- publisher access rights;
- statistical analysis execution;
- external repository permanence.

---

## 5. Aggregate Architecture

BRMF-208 defines the following collaborating aggregate roots:

1. Knowledge Source
2. Evidence Item
3. Claim
4. Interpretation
5. Knowledge Object
6. Evidence Dossier
7. Provenance Chain
8. Knowledge–Evidence Network

The central scholarly aggregate is:

`Claim`

Claims connect sources, evidence, interpretations, contradictions, knowledge,
decisions, and learning.

---

## 6. Governed Scholarly Object Conformance

Major objects conform conceptually to the Governed Scholarly Object pattern.

They must support, where applicable:

- stable identity;
- explicit lifecycle;
- provenance;
- actor attribution;
- source attribution;
- semantic versioning;
- verification;
- review;
- supersession;
- contestation;
- traceability;
- domain events.

This pattern must not force implementation inheritance.

---

## 7. Knowledge Source Aggregate

### 7.1 Identity

`KnowledgeSourceId`

### 7.2 Purpose

A Knowledge Source represents the origin from which scholarly material,
evidence, claims, or interpretations are obtained.

### 7.3 Source types

- Journal Article;
- Conference Paper;
- Book;
- Book Chapter;
- Thesis;
- Dissertation;
- Research Report;
- Government Report;
- Industry Report;
- Legislation;
- Regulation;
- Policy;
- Standard;
- Dataset;
- Database;
- Website;
- Repository Record;
- Interview;
- Focus Group;
- Observation;
- Field Note;
- Survey Response;
- Experiment;
- Organisational Record;
- Financial Record;
- Archival Document;
- Supervisor Note;
- Learner Note;
- AI Output;
- System Observation;
- Other Governed Source.

### 7.4 Attributes

- Knowledge Source Id;
- Source Type;
- Title;
- Authors or Creators;
- Publication or Creation Date;
- Publisher or Custodian;
- Journal or Collection;
- Edition;
- Volume;
- Issue;
- Pages;
- DOI;
- ISBN;
- URI;
- Repository Identifier;
- Language;
- Abstract or Description;
- Access Date;
- Access Rights;
- Licence;
- Retraction Status;
- Correction Status;
- Version References;
- Source Quality Assessments;
- Status;
- Provenance.

### 7.5 Source status

- Candidate;
- Registered;
- Verified;
- Partially Verified;
- Unverified;
- Corrected;
- Retracted;
- Superseded;
- Inaccessible;
- Archived.

### 7.6 Rules

- Source identity must be distinguishable from Source Version.
- A citation is not proof that the source was accessed or verified.
- Retracted or corrected status must remain visible.
- A URL alone is insufficient source identity.
- Duplicate source records should be reconciled without losing provenance.
- Proprietary source content must respect access and licensing restrictions.

---

## 8. Source Version

A Source Version represents a specific edition, revision, release, retrieval
state, or preserved form of a Knowledge Source.

### Attributes

- Source Version Id;
- Knowledge Source Id;
- Version Label;
- Publication or Release Date;
- Retrieved At;
- Content Hash, where permitted;
- Location;
- Format;
- Correction Notice;
- Retraction Notice;
- Supersedes Version;
- Status;
- Provenance.

### Rules

- Evidence must reference the Source Version actually used.
- Later versions must not silently rewrite earlier evidence extraction.
- Web-source versions should preserve retrieval time and available snapshot
  metadata.
- Version uncertainty must be explicit.

---

## 9. Source Quality Assessment

Source quality is multidimensional.

### Dimensions

1. Authorship Authority
2. Publication Transparency
3. Methodological Transparency
4. Review Process
5. Reproducibility
6. Data Availability
7. Conflict-of-Interest Disclosure
8. Retraction or Correction Risk
9. Relevance
10. Context Similarity
11. Recency
12. Stability
13. Primary or Secondary Status
14. Completeness
15. Traceability
16. Accessibility for Verification

### Assessment values

- Strong;
- Adequate;
- Mixed;
- Weak;
- Unacceptable;
- Unknown;
- Not Applicable.

### Rules

- Peer review is one dimension, not an automatic quality verdict.
- Prestige must not replace methodological assessment.
- Recency must not automatically outweigh relevance or foundational importance.
- Source quality must remain separate from claim relevance.
- Quality assessment must preserve the assessor and rationale.

---

## 10. Evidence Item Aggregate

### 10.1 Identity

`EvidenceItemId`

### 10.2 Purpose

An Evidence Item represents a bounded scholarly observation, result, argument,
datum, model, or other evidential object derived from a Source.

### 10.3 Evidence types

- Empirical Finding;
- Statistical Result;
- Qualitative Finding;
- Direct Observation;
- Measurement;
- Dataset Record;
- Quotation;
- Argument;
- Theoretical Statement;
- Definition;
- Conceptual Model;
- Framework;
- Methodological Procedure;
- Limitation;
- Boundary Condition;
- Counterexample;
- Replication Result;
- Meta-Analytic Result;
- Policy Requirement;
- Legal Provision;
- Expert Judgement;
- Supervisor Observation;
- Learner Observation;
- AI-Generated Candidate Evidence Reference;
- System-Derived Observation.

### 10.4 Attributes

- Evidence Item Id;
- Source Id;
- Source Version Id;
- Evidence Type;
- Summary;
- Location in Source;
- Evidence Fragment References;
- Context;
- Population;
- Unit of Analysis;
- Method;
- Time Period;
- Limitations;
- Extraction Method;
- Extracted By;
- Verification Status;
- Evidence Quality Assessments;
- Related Claim References;
- Status;
- Provenance.

### 10.5 Status

- Candidate;
- Extracted;
- Verified;
- Partially Verified;
- Disputed;
- Misquoted;
- Out of Context;
- Superseded;
- Withdrawn;
- Archived.

### 10.6 Rules

- Evidence must reference a Source Version.
- Extraction must preserve location in source where possible.
- Evidence context must not be discarded.
- A whole source must not automatically be treated as one Evidence Item.
- A summary must remain distinguishable from verbatim content.
- Misquotation and context loss must trigger status review.

---

## 11. Evidence Fragment

An Evidence Fragment is the smallest governed source-linked unit used to support
or challenge a Claim.

### Attributes

- Evidence Fragment Id;
- Evidence Item Id;
- Source Version Id;
- Fragment Type;
- Content Reference;
- Start Location;
- End Location;
- Table, Figure, Page, Paragraph, Timestamp, or Record Reference;
- Extraction Confidence;
- Verification Status;
- Copyright Handling;
- Provenance.

### Fragment types

- Text Passage;
- Table Cell;
- Table Region;
- Figure;
- Chart;
- Statistical Output;
- Dataset Slice;
- Observation Record;
- Interview Segment;
- Audio Segment;
- Video Segment;
- Code or Model Output;
- Legal Clause;
- Policy Clause.

### Rules

- Fragments must preserve sufficient context for responsible interpretation.
- Stored content must respect copyright and access restrictions.
- Machine extraction must be labelled.
- Fragment boundaries must remain reproducible where technically possible.

---

## 12. Claim Aggregate

### 12.1 Identity

`ClaimId`

### 12.2 Purpose

A Claim is a governed assertion that may be supported, challenged, qualified, or
contradicted by Evidence.

### 12.3 Claim types

- Descriptive;
- Definitional;
- Explanatory;
- Predictive;
- Causal;
- Associational;
- Comparative;
- Evaluative;
- Normative;
- Methodological;
- Theoretical;
- Interpretive;
- Legal;
- Policy;
- Boundary;
- Limitation;
- Negative;
- Null;
- Meta-Claim;
- Candidate AI Claim.

### 12.4 Attributes

- Claim Id;
- Claim Statement;
- Claim Type;
- Scope;
- Population;
- Context;
- Time Period;
- Unit of Analysis;
- Level of Analysis;
- Assumptions;
- Boundary Conditions;
- Qualifications;
- Supporting Claim Links;
- Challenging Claim Links;
- Evidence Support Links;
- Evidence Challenge Links;
- Contradiction Links;
- Confidence;
- Verification Status;
- Acceptance Status;
- Author or Generator;
- Created At;
- Semantic Version;
- Provenance.

### 12.5 Claim lifecycle

- Candidate;
- Extracted;
- Formulated;
- Under Review;
- Supported;
- Provisionally Accepted;
- Accepted in Project Context;
- Qualified;
- Challenged;
- Contradicted;
- Weakened;
- Rejected;
- Superseded;
- Withdrawn;
- Archived.

### 12.6 Rules

- Every Claim must have an identifiable author, generator, or extraction source.
- A Claim must preserve its scope and qualifications.
- A causal Claim must not be inferred from association without explicit
  justification.
- A Claim may exist without acceptance.
- Accepted status is contextual, not universal truth.
- AI-generated Claims remain candidates until reviewed and supported.
- Material claim revision creates a new semantic version.

---

## 13. Claim Scope

Claim Scope defines where and when a Claim is intended to apply.

### Attributes

- Scope Id;
- Claim Id;
- Population;
- Geography;
- Industry;
- Organisation Type;
- Research Context;
- Time Period;
- Unit of Analysis;
- Level of Analysis;
- Inclusion Boundaries;
- Exclusion Boundaries;
- Generalisation Limits;
- Provenance.

### Rule

Claims without explicit scope must be treated as scope-uncertain rather than
universally applicable.

---

## 14. Claim Support

A Claim Support relationship links Evidence to a Claim.

### Attributes

- Claim Support Id;
- Claim Id;
- Evidence Item or Fragment Id;
- Support Type;
- Relevance;
- Directness;
- Consistency;
- Strength;
- Context Fit;
- Limitations;
- Assessor;
- Status;
- Provenance.

### Support types

- Direct Empirical Support;
- Indirect Empirical Support;
- Theoretical Support;
- Conceptual Support;
- Methodological Support;
- Replication Support;
- Corroborative Support;
- Contextual Support;
- Partial Support;
- Conditional Support.

### Rules

- Evidence quantity does not determine support strength.
- Support strength must not be inferred solely from statistical significance.
- The same Evidence may support one Claim and challenge another.
- Support must remain traceable to the exact Evidence used.

---

## 15. Claim Challenge

A Claim Challenge links Evidence or another Claim to a weakness, limitation,
qualification, or rejection of a Claim.

### Challenge types

- Contradictory Evidence;
- Boundary Limitation;
- Methodological Weakness;
- Measurement Weakness;
- Context Mismatch;
- Replication Failure;
- Alternative Explanation;
- Theoretical Inconsistency;
- Statistical Uncertainty;
- Scope Overreach;
- Source Reliability Concern;
- Interpretation Dispute.

---

## 16. Contradiction Aggregate

### 16.1 Identity

`ContradictionId`

### 16.2 Purpose

A Contradiction records a governed conflict between Claims, Evidence,
Interpretations, or Knowledge Objects.

### 16.3 Attributes

- Contradiction Id;
- Object A;
- Object B;
- Contradiction Type;
- Description;
- Scope of Conflict;
- Supporting Evidence;
- Possible Explanations;
- Resolution Status;
- Reviewer;
- Provenance.

### 16.4 Contradiction types

- Direct Contradiction;
- Partial Contradiction;
- Contextual Difference;
- Temporal Difference;
- Population Difference;
- Measurement Difference;
- Methodological Difference;
- Theoretical Difference;
- Interpretation Difference;
- Terminological Difference;
- Apparent Contradiction;
- Unresolved Conflict.

### 16.5 Resolution status

- Detected;
- Under Review;
- Explained by Context;
- Explained by Method;
- Explained by Measurement;
- Reconciled;
- Partially Reconciled;
- Unresolved;
- Superseded;
- Closed without Resolution.

### 16.6 Rules

- Contradictions must not be silently removed.
- Reconciliation must preserve the original conflict.
- Contextual difference must not be mislabelled as direct contradiction.
- Unresolved conflict may remain part of the project knowledge state.

---

## 17. Interpretation Aggregate

### 17.1 Identity

`InterpretationId`

### 17.2 Purpose

An Interpretation represents a reasoned scholarly account of what Evidence and
Claims mean in a particular context.

### 17.3 Attributes

- Interpretation Id;
- Interpreter;
- Research Project Id;
- Interpretation Statement;
- Evidence References;
- Claim References;
- Theoretical Context;
- Assumptions;
- Reasoning Record Reference;
- Alternative Interpretations;
- Limitations;
- Confidence;
- Review Status;
- Acceptance Status;
- Semantic Version;
- Provenance.

### 17.4 Lifecycle

- Draft;
- Proposed;
- Under Review;
- Accepted by Learner;
- Confirmed by Supervisor;
- Qualified;
- Challenged;
- Revised;
- Superseded;
- Rejected;
- Archived.

### 17.5 Rules

- Interpretation must remain distinct from Evidence.
- Learner, supervisor, and AI interpretations must remain attributable.
- AI-generated interpretation must be labelled.
- Alternative interpretations may coexist.
- Fluent wording must not be treated as sound interpretation.
- Hidden AI reasoning is not part of the domain record.

---

## 18. Knowledge Object Aggregate

### 18.1 Identity

`KnowledgeObjectId`

### 18.2 Purpose

A Knowledge Object represents a governed understanding accepted for use within a
defined context.

### 18.3 Knowledge object types

- Accepted Definition;
- Accepted Relationship;
- Project Assumption;
- Theoretical Understanding;
- Methodological Understanding;
- Contextual Understanding;
- Evidence Synthesis;
- Design Principle;
- Boundary Condition;
- Project Conclusion;
- Institutional Rule;
- Provisional Knowledge;
- Contested Knowledge.

### 18.4 Attributes

- Knowledge Object Id;
- Statement;
- Type;
- Scope;
- Supporting Claims;
- Supporting Interpretations;
- Evidence Dossier Reference;
- Contradictions;
- Acceptance Context;
- Authority;
- Confidence;
- Limitations;
- Review Date;
- Status;
- Semantic Version;
- Provenance.

### 18.5 Lifecycle

- Candidate;
- Synthesised;
- Provisionally Accepted;
- Accepted in Context;
- Strengthened;
- Qualified;
- Challenged;
- Weakened;
- Superseded;
- Deprecated;
- Rejected;
- Archived.

### 18.6 Rules

- A Knowledge Object must identify its acceptance context.
- Acceptance does not imply universal truth.
- Material challenges must remain visible.
- Downstream decisions must be traceable to the version used.
- New evidence may trigger review without automatically invalidating the object.

---

## 19. Citation

A Citation represents a governed reference from one scholarly object to a Source
or Source Version.

### Attributes

- Citation Id;
- Citing Object;
- Source Id;
- Source Version Id, where known;
- Citation Role;
- Locator;
- Citation Style Data;
- Verification Status;
- Created By;
- Provenance.

### Citation roles

- Supports;
- Challenges;
- Defines;
- Provides Method;
- Provides Measure;
- Provides Context;
- Provides Background;
- Provides Example;
- Acknowledges Origin;
- Identifies Limitation.

### Rules

- Citation presence does not prove claim support.
- Citation verification must be explicit.
- Secondary citation must be distinguishable from direct source access.
- Fabricated or unresolved citations must be quarantined.

---

## 20. Verification Record

A Verification Record captures the act and outcome of checking a Source,
Evidence Item, Claim, Citation, or Provenance link.

### Attributes

- Verification Record Id;
- Verified Object;
- Verification Type;
- Method;
- Verifier;
- Checked Against;
- Result;
- Exceptions;
- Timestamp;
- Provenance.

### Verification types

- Source Identity;
- Source Access;
- Citation;
- Quotation;
- Evidence Extraction;
- Claim Attribution;
- Data Integrity;
- Version;
- Retraction Status;
- Provenance Chain;
- AI Output;
- Cross-Source Consistency.

### Results

- Verified;
- Partially Verified;
- Failed;
- Inconclusive;
- Not Possible;
- Requires Human Review.

---

## 21. Evidence Quality Assessment

Evidence quality is multidimensional.

### Dimensions

1. Methodological Quality
2. Internal Validity
3. External Validity
4. Measurement Quality
5. Sampling Adequacy
6. Analytical Transparency
7. Reproducibility
8. Data Integrity
9. Directness
10. Relevance
11. Context Similarity
12. Precision
13. Completeness
14. Recency
15. Replication
16. Theoretical Alignment
17. Limitation Transparency
18. Independence from Other Evidence

### Rules

- No single quality score should conceal material weaknesses.
- Evidence relevance and methodological quality are separate.
- Strong evidence in one context may have weak transferability to another.
- Replication must not be double-counted when studies share data or methods.
- Quality assessments must preserve rationale and assessor.

---

## 22. Evidence Sufficiency Assessment

Evidence sufficiency asks whether available evidence is adequate for a stated
scholarly purpose.

It is not an evidence count.

### 22.1 Identity

`EvidenceSufficiencyAssessmentId`

### 22.2 Attributes

- Assessment Id;
- Purpose;
- Claim, Decision, or Knowledge Object;
- Evidence Dossier;
- Required Standard;
- Coverage;
- Diversity;
- Directness;
- Quality;
- Contradiction Handling;
- Context Fit;
- Source Independence;
- Missing Evidence;
- Residual Uncertainty;
- Result;
- Rationale;
- Reviewer;
- Provenance.

### 22.3 Results

- Sufficient;
- Sufficient with Qualification;
- Provisionally Sufficient;
- Insufficient;
- Contradictory but Usable;
- Requires Additional Evidence;
- Requires Supervisor Review;
- Indeterminate.

### 22.4 Rules

- Sufficiency depends on purpose.
- Twenty similar sources may provide less sufficiency than fewer independent and
  diverse sources.
- Contradictory evidence does not automatically mean insufficiency.
- Residual uncertainty must remain visible.
- Sufficiency does not equal certainty.

---

## 23. Evidence Dossier Aggregate

### 23.1 Identity

`EvidenceDossierId`

### 23.2 Purpose

An Evidence Dossier assembles the evidence, claims, contradictions,
interpretations, quality assessments, and provenance required for a defined
scholarly purpose.

### 23.3 Dossier purposes

- Research Decision;
- Theory Selection;
- Construct Definition;
- Methodology Selection;
- Hypothesis Justification;
- Framework Relationship;
- Supervisor Review;
- Ethics Review;
- Literature Synthesis;
- Finding Interpretation;
- Project Conclusion;
- Institutional Audit.

### 23.4 Attributes

- Evidence Dossier Id;
- Research Project Id;
- Purpose;
- Target Object;
- Included Sources;
- Included Evidence;
- Included Claims;
- Contradictions;
- Interpretations;
- Quality Assessments;
- Sufficiency Assessment;
- Missing Evidence;
- Residual Uncertainty;
- Version;
- Status;
- Provenance.

### 23.5 Rules

- A dossier must identify its purpose.
- Inclusion criteria must be explicit.
- Excluded evidence may be recorded with rationale.
- Dossier versions must remain traceable.
- A dossier must not conceal contradictory evidence.

---

## 24. Provenance Record

A Provenance Record captures a single attributable origin, transformation, use,
or governance event.

### Attributes

- Provenance Record Id;
- Subject Object;
- Event Type;
- Actor;
- Actor Type;
- Source Object;
- Input Objects;
- Output Object;
- Method or Tool;
- Purpose;
- Timestamp;
- Environment or Model Version, where relevant;
- Decision Reference;
- Verification Status;
- Notes;
- Integrity Hash, where applicable.

### Event types

- Created;
- Imported;
- Extracted;
- Generated;
- Inferred;
- Summarised;
- Translated;
- Transformed;
- Adapted;
- Reviewed;
- Verified;
- Accepted;
- Rejected;
- Revised;
- Superseded;
- Cited;
- Used in Decision;
- Used in Intervention;
- Exported;
- Corrected;
- Withdrawn.

---

## 25. Provenance Chain Aggregate

### 25.1 Identity

`ProvenanceChainId`

### 25.2 Purpose

A Provenance Chain links Provenance Records into a reconstructable lineage.

### 25.3 Attributes

- Provenance Chain Id;
- Root Object;
- Provenance Records;
- Parent Chains;
- Child Chains;
- Integrity Status;
- Missing Links;
- Verification Status;
- Created At;
- Updated At.

### 25.4 Rules

- Provenance must be append-preserving.
- Corrections create new records rather than silently editing history.
- Missing links must be visible.
- Actor attribution must distinguish human, AI, system, imported, and unknown.
- Model and tool versions should be recorded for material AI transformations.
- Provenance traversal must respect access and privacy boundaries.

---

## 26. Provenance Engine

The Provenance Engine is an active domain subsystem.

### 26.1 Responsibilities

It must:

- create provenance records;
- link provenance chains;
- verify lineage completeness;
- trace upstream origins;
- trace downstream usage;
- identify impacted objects;
- detect missing or broken lineage;
- identify unverified AI transformations;
- preserve corrections and supersession;
- support audit and export;
- enforce access controls;
- provide explainable lineage views.

### 26.2 Required questions

The Provenance Engine should answer:

- Where did this object come from?
- Who created, imported, extracted, generated, or revised it?
- When was it created or changed?
- Why was it created?
- Which sources and evidence support it?
- Which AI model or tool contributed?
- Which human reviewed it?
- Which version was used?
- Which decisions relied on it?
- Which frameworks include it?
- Which interventions referenced it?
- What changed?
- What is affected if it is challenged or withdrawn?

### 26.3 Rules

- Provenance is not optional metadata for material scholarly objects.
- Provenance events must not be rewritten to improve appearance.
- Unverified lineage must remain visible.
- Provenance does not itself establish truth or quality.
- Access to provenance may be restricted without destroying the chain.

---

## 27. AI-Generated Candidate Claims

AI-generated scholarly assertions require explicit governance.

### Lifecycle

AI Output  
→ Candidate Claim  
→ Source Search  
→ Evidence Linking  
→ Verification  
→ Learner Review  
→ Supervisor Review, where required  
→ Acceptance, Qualification, Rejection, or Withdrawal

### Rules

- AI-generated Claims must be labelled.
- Generated citations must be verified before use.
- Unsupported AI claims must not enter accepted project knowledge.
- AI may suggest search strategies without inventing sources.
- Human acceptance does not cure fabricated provenance.
- Model version, prompt context, and transformation type should be recorded where
  materially relevant.
- Private hidden reasoning is not recorded as provenance.

---

## 28. Knowledge–Evidence Network Aggregate

### 28.1 Identity

`KnowledgeEvidenceNetworkId`

### 28.2 Purpose

The Knowledge–Evidence Network connects Sources, Evidence, Claims,
Interpretations, Knowledge Objects, Contradictions, Citations, Decisions,
Frameworks, and Learning Evidence.

### 28.3 Node types

- Knowledge Source;
- Source Version;
- Evidence Item;
- Evidence Fragment;
- Claim;
- Interpretation;
- Knowledge Object;
- Citation;
- Contradiction;
- Quality Assessment;
- Sufficiency Assessment;
- Evidence Dossier;
- Provenance Record;
- Theory;
- Concept;
- Construct;
- Variable;
- Framework;
- Research Decision;
- Learning Evidence;
- Supervisor Review.

### 28.4 Edge types

- Contains;
- Version Of;
- Extracted From;
- Supports;
- Challenges;
- Contradicts;
- Qualifies;
- Interprets;
- Synthesises;
- Accepted As;
- Cites;
- Verified By;
- Assessed By;
- Included In Dossier;
- Used In Decision;
- Used In Framework;
- Used In Intervention;
- Revised After;
- Supersedes;
- Generated By;
- Reviewed By;
- Derived From;
- Depends On;
- Affected By Withdrawal.

### 28.5 Rules

- Every node must have stable identity.
- Every material edge must have provenance.
- Asserted, extracted, inferred, and generated edges must remain distinguishable.
- Conflicting claims may coexist.
- Network traversal must respect project, role, privacy, and licence boundaries.
- The network must not convert high connectivity into truth.
- Downstream impact must be traceable.

---

## 29. Relationship to the Tri-Graph Architecture

BRMF now contains three operational graphs supported by a shared
Knowledge–Evidence Network and Provenance Layer.

### Research Decision Graph

Represents how scholarly decisions evolve.

### Scholarly Knowledge Graph

Represents theories, concepts, constructs, variables, and frameworks.

### Educational Learning Graph

Represents learner states, needs, interventions, reflections, and learning
evidence.

### Knowledge–Evidence Network

Provides evidence, claims, interpretations, contradiction, and verification
support across all three graphs.

### Provenance Layer

Records lineage across every graph and network.

The domains are linked through typed references but retain separate authority and
governance.

---

## 30. Domain Services

### 30.1 Source Identity Resolution Service

Detects and reconciles duplicate, variant, corrected, retracted, and superseded
source identities.

### 30.2 Evidence Extraction Service

Creates candidate Evidence Items and Fragments from governed Sources.

Machine extraction remains subject to verification.

### 30.3 Claim Identification Service

Identifies candidate Claims in sources or project material.

It must preserve attribution, scope, qualifications, and extraction confidence.

### 30.4 Claim–Evidence Alignment Service

Evaluates whether Evidence actually supports, challenges, or only relates to a
Claim.

### 30.5 Contradiction Detection Service

Identifies potential contradictions while distinguishing context, population,
method, measurement, and terminology differences.

### 30.6 Source Quality Assessment Service

Evaluates source quality across explicit dimensions.

### 30.7 Evidence Quality Assessment Service

Evaluates evidence quality across explicit dimensions.

### 30.8 Evidence Sufficiency Service

Determines whether an Evidence Dossier is sufficient for its stated purpose.

### 30.9 Interpretation Support Service

Supports the learner in comparing alternative interpretations without replacing
their scholarly judgement.

### 30.10 Verification Service

Coordinates source, citation, extraction, claim, version, and provenance checks.

### 30.11 Provenance Traversal Service

Traces upstream origin and downstream use.

### 30.12 Impact Analysis Service

Identifies decisions, knowledge objects, frameworks, hypotheses, and
interventions affected by challenged, corrected, retracted, or withdrawn
evidence.

---

## 31. Domain Policies

### 31.1 No Unsupported Knowledge Policy

No Claim or Knowledge Object may be accepted merely because BRM generated it.

### 31.2 Source–Evidence Separation Policy

A Source and an Evidence Item must remain distinct.

### 31.3 Evidence–Interpretation Separation Policy

Evidence and Interpretation must remain distinct.

### 31.4 Claim Transparency Policy

Claims must preserve scope, assumptions, qualifications, support, challenge, and
provenance.

### 31.5 Contradiction Preservation Policy

Contradictory evidence and Claims must remain visible until legitimately
resolved or qualified.

### 31.6 Verification Policy

Material citations, quotations, source identities, and AI-generated claims
require verification appropriate to their intended use.

### 31.7 Provenance Completeness Policy

Material scholarly objects require reconstructable lineage or an explicit
provenance-gap status.

### 31.8 Contextual Acceptance Policy

Accepted knowledge is accepted within a defined context and authority boundary.

### 31.9 Licensing and Access Policy

Storage, extraction, display, and export must respect copyright, licence, and
access restrictions.

### 31.10 Impact Review Policy

Retraction, correction, material challenge, or provenance failure must trigger
downstream impact analysis.

### 31.11 Educational Interpretation Policy

BRM should support learners in constructing and defending interpretations rather
than silently replacing them with system interpretations.

---

## 32. Aggregate Invariants

The domain must enforce:

1. Every Source has stable identity.
2. Evidence references the Source Version actually used.
3. A Source is not automatically an Evidence Item.
4. Every Evidence Item preserves context.
5. Every Claim has an attributable origin.
6. Every Claim preserves scope or scope uncertainty.
7. Causal Claims are not silently inferred from association.
8. Evidence remains distinct from Interpretation.
9. Interpretation remains distinct from Knowledge.
10. Accepted Knowledge identifies its context.
11. Citation presence does not prove support.
12. Peer review does not automatically establish source quality.
13. Statistical significance does not automatically establish evidence
    strength.
14. Evidence quantity does not determine sufficiency.
15. Contradictions remain visible.
16. Reconciliation preserves contradiction history.
17. AI-generated Claims remain candidates until reviewed.
18. Generated citations require verification.
19. Unsupported AI Claims do not enter accepted knowledge.
20. Every material accepted object has provenance or an explicit provenance gap.
21. Provenance corrections append rather than erase history.
22. Human, AI, system, imported, and unknown actors remain distinguishable.
23. Model and tool versions are recorded for material AI transformations where
    relevant.
24. Hidden AI reasoning is not represented as scholarly provenance.
25. Source correction or retraction triggers impact analysis.
26. Downstream decisions identify the evidence or knowledge version used.
27. Conflicting Claims may coexist.
28. Inferred network edges remain distinguishable from asserted edges.
29. Access restrictions do not destroy provenance.
30. Quality, relevance, and sufficiency remain distinct.
31. Sufficiency does not equal certainty.
32. The domain remains explainable without opaque truth scores.

---

## 33. Commands

Initial commands include:

- Register Knowledge Source
- Register Source Version
- Update Source Status
- Record Source Retraction
- Assess Source Quality
- Extract Evidence Item
- Add Evidence Fragment
- Verify Evidence Extraction
- Formulate Claim
- Extract Claim
- Revise Claim
- Link Evidence Support
- Link Evidence Challenge
- Qualify Claim
- Accept Claim in Project Context
- Reject Claim
- Supersede Claim
- Record Contradiction
- Review Contradiction
- Reconcile Contradiction
- Create Interpretation
- Revise Interpretation
- Accept Interpretation
- Challenge Interpretation
- Create Knowledge Object
- Accept Knowledge Object in Context
- Challenge Knowledge Object
- Supersede Knowledge Object
- Create Citation
- Verify Citation
- Create Verification Record
- Assess Evidence Quality
- Create Evidence Dossier
- Add Evidence to Dossier
- Record Excluded Evidence
- Assess Evidence Sufficiency
- Create Provenance Record
- Link Provenance Chain
- Verify Provenance Chain
- Trace Upstream Origin
- Trace Downstream Usage
- Record AI Candidate Claim
- Verify AI Candidate Claim
- Accept AI Candidate Claim
- Reject AI Candidate Claim
- Add Knowledge–Evidence Network Node
- Add Knowledge–Evidence Network Edge
- Record Inferred Network Edge
- Conduct Downstream Impact Analysis

---

## 34. Domain Events

Initial events include:

- KnowledgeSourceRegistered
- SourceVersionRegistered
- SourceStatusUpdated
- SourceRetractionRecorded
- SourceQualityAssessed
- EvidenceItemExtracted
- EvidenceFragmentAdded
- EvidenceExtractionVerified
- ClaimFormulated
- ClaimExtracted
- ClaimRevised
- EvidenceSupportLinked
- EvidenceChallengeLinked
- ClaimQualified
- ClaimAcceptedInProjectContext
- ClaimRejected
- ClaimSuperseded
- ContradictionRecorded
- ContradictionReviewed
- ContradictionReconciled
- InterpretationCreated
- InterpretationRevised
- InterpretationAccepted
- InterpretationChallenged
- KnowledgeObjectCreated
- KnowledgeObjectAcceptedInContext
- KnowledgeObjectChallenged
- KnowledgeObjectSuperseded
- CitationCreated
- CitationVerified
- VerificationRecordCreated
- EvidenceQualityAssessed
- EvidenceDossierCreated
- EvidenceAddedToDossier
- ExcludedEvidenceRecorded
- EvidenceSufficiencyAssessed
- ProvenanceRecordCreated
- ProvenanceChainLinked
- ProvenanceChainVerified
- UpstreamOriginTraced
- DownstreamUsageTraced
- AICandidateClaimRecorded
- AICandidateClaimVerified
- AICandidateClaimAccepted
- AICandidateClaimRejected
- KnowledgeEvidenceNetworkNodeAdded
- KnowledgeEvidenceNetworkEdgeAdded
- InferredNetworkEdgeRecorded
- DownstreamImpactAnalysisConducted

---

## 35. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Register Source | KnowledgeSourceRegistered | Source–Evidence Separation Policy | Source has stable identity |
| Extract Evidence | EvidenceItemExtracted | Source–Evidence Separation Policy | Source Version retained |
| Formulate Claim | ClaimFormulated | Claim Transparency Policy | Scope and origin preserved |
| Link Evidence Support | EvidenceSupportLinked | Claim Transparency Policy | Exact evidence traceable |
| Record Contradiction | ContradictionRecorded | Contradiction Preservation Policy | Conflict remains visible |
| Create Interpretation | InterpretationCreated | Educational Interpretation Policy | Interpretation distinct from evidence |
| Accept Knowledge Object | KnowledgeObjectAcceptedInContext | Contextual Acceptance Policy | Context identified |
| Verify Citation | CitationVerified | Verification Policy | Citation checked |
| Assess Sufficiency | EvidenceSufficiencyAssessed | No Unsupported Knowledge Policy | Quantity alone is insufficient |
| Create Provenance Record | ProvenanceRecordCreated | Provenance Completeness Policy | Actor and event retained |
| Record AI Candidate Claim | AICandidateClaimRecorded | No Unsupported Knowledge Policy | AI output remains candidate |
| Conduct Impact Analysis | DownstreamImpactAnalysisConducted | Impact Review Policy | Affected objects traced |

---

## 36. Authority Model

### 36.1 BRM may

- identify candidate sources;
- extract candidate evidence;
- formulate candidate claims;
- assess source and evidence quality;
- identify contradictions;
- propose interpretations;
- assess sufficiency;
- create provenance records;
- trace lineage;
- identify downstream impact;
- quarantine unsupported AI claims.

### 36.2 BRM may not

- fabricate sources or citations;
- declare unsupported claims as knowledge;
- conceal contradiction;
- erase provenance;
- treat connectivity as truth;
- treat source prestige as proof;
- accept claims on behalf of authorised humans;
- represent generated text as learner interpretation;
- expose hidden AI reasoning as provenance.

### 36.3 Learner may

- register and verify sources;
- extract and interpret evidence;
- formulate claims;
- challenge source or evidence quality;
- construct dossiers;
- accept project-level interpretations within delegated authority;
- request supervisor review;
- inspect provenance;
- correct attribution.

### 36.4 Supervisor may

- review claims and interpretations;
- confirm or qualify project knowledge;
- challenge sufficiency;
- require additional evidence;
- resolve or preserve scholarly disagreement;
- review provenance gaps;
- require withdrawal or correction.

### 36.5 Institution may

- define evidence standards;
- define verification requirements;
- govern access and retention;
- audit provenance;
- define acceptable source types;
- govern academic integrity;
- require impact review.

---

## 37. Cross-Context Interfaces

### Research Project Context

Provides:

- project scope;
- research stage;
- questions;
- objectives;
- project elements;
- milestone requirements.

Receives:

- evidence dossiers;
- sufficiency findings;
- provenance gaps;
- challenged knowledge;
- downstream impact notices.

### Research Decision Context

Provides:

- decision questions;
- alternatives;
- criteria;
- uncertainty;
- decision status.

Receives:

- evidence support;
- contradictory evidence;
- interpretations;
- sufficiency assessments;
- provenance chains;
- impact findings.

### Constructs and Theoretical Models Context

Provides:

- Theory;
- Concept;
- Construct;
- Variable;
- Framework;
- Relationship;
- Hypothesis.

Receives:

- supporting claims;
- measurement evidence;
- theory-source lineage;
- framework-edge support;
- contradiction findings;
- provenance.

### Mentoring and Educational Intervention Context

Provides:

- learner evidence evaluations;
- interpretation difficulties;
- intervention outcomes;
- learning evidence.

Receives:

- source-quality concerns;
- evidence gaps;
- candidate contradictions;
- interpretation tasks;
- citation-verification needs.

### Learner Development Context

Receives:

- evidence-evaluation capability evidence;
- interpretation quality evidence;
- provenance discipline evidence;
- source-verification capability.

### Supervision and Governance Context

Provides:

- review outcomes;
- formal authority;
- institutional standards;
- dispute resolution.

Receives:

- evidence dossiers;
- verification failures;
- unsupported claims;
- provenance gaps;
- impact reports.

---

## 38. Privacy, Copyright, and Integrity Safeguards

The domain must support:

- role-based source access;
- licence-aware fragment storage;
- minimal quotation;
- restricted display of proprietary instruments and databases;
- private project evidence;
- source-access logging where required;
- correction and contestation;
- provenance export;
- retention and deletion policies;
- distinction between source metadata and protected content;
- quarantine of suspected fabricated citations;
- clear AI attribution;
- controlled access to supervisor notes;
- human review of material inferences.

BRM must not store or reproduce protected source content merely because it can
identify or cite the source.

---

## 39. Reporting

Reports may include:

- Source Register;
- Source Version History;
- Source Quality Report;
- Evidence Catalogue;
- Evidence Fragment Register;
- Claim Map;
- Claim Support Matrix;
- Contradiction Register;
- Interpretation Record;
- Knowledge Object Register;
- Citation Verification Report;
- Evidence Quality Report;
- Evidence Sufficiency Report;
- Evidence Dossier;
- Provenance Chain Report;
- Provenance Gap Report;
- AI Claim Review Report;
- Downstream Impact Report;
- Knowledge–Evidence Network View.

Reports must distinguish:

- source metadata;
- source content;
- extracted evidence;
- learner claims;
- supervisor claims;
- AI candidate claims;
- accepted knowledge;
- challenged knowledge;
- asserted links;
- inferred links;
- verified and unverified objects.

---

## 40. Example Scenario

A learner investigates whether transformational leadership improves employee
innovative behaviour.

Three studies are registered.

Study A reports a positive relationship.

Study B reports no statistically significant relationship.

Study C reports that the relationship depends on organisational climate.

BRM creates:

- three Knowledge Sources;
- three Source Versions;
- bounded Evidence Items for each relevant finding;
- separate Claims with population, method, and scope;
- Claim Support links;
- a potential Contradiction between Studies A and B;
- a qualification based on Study C;
- Source and Evidence Quality Assessments;
- an Evidence Dossier for a theory-selection decision.

Contradiction analysis shows that:

- Study A used a technology-sector sample;
- Study B used public-sector employees;
- Study C tested a moderation model;
- measurement instruments were not identical;
- all studies were cross-sectional.

BRM therefore does not conclude simply that one paper is right.

It presents:

- direct support;
- non-support;
- contextual moderation;
- methodological differences;
- remaining uncertainty;
- evidence sufficiency for the specific decision.

The learner formulates an Interpretation.

The supervisor qualifies it.

The accepted project Knowledge Object states that the relationship is
provisionally supported but likely context dependent.

The Provenance Engine links the Knowledge Object to:

- the Interpretation;
- supporting and challenging Claims;
- exact Evidence Fragments;
- Source Versions;
- learner authorship;
- supervisor review;
- the Research Decision that used it.

If one study is later retracted, BRM traces every affected framework edge,
hypothesis, decision, and interpretation for review.

---

## 41. Validation Questions

Reviewers should confirm:

1. Are Source, Evidence, Claim, Interpretation, and Knowledge distinct?
2. Is Claim correctly modelled as the central scholarly aggregate?
3. Does Evidence reference the Source Version actually used?
4. Can Evidence Fragments preserve exact context?
5. Are Claims scoped and attributable?
6. Are support and challenge relationships explicit?
7. Are contradictions preserved rather than hidden?
8. Can alternative interpretations coexist?
9. Is accepted knowledge contextual rather than universal?
10. Is citation verification explicit?
11. Are source quality, evidence quality, relevance, and sufficiency distinct?
12. Is evidence sufficiency purpose dependent?
13. Can Evidence Dossiers support decisions and reviews?
14. Are AI-generated claims governed as candidates?
15. Does the Provenance Engine support upstream and downstream tracing?
16. Can corrections and retractions trigger impact analysis?
17. Is the Knowledge–Evidence Network compatible with the three BRM graphs?
18. Are copyright and access boundaries enforceable?
19. Can provenance gaps remain visible?
20. Does the model provide a stable foundation for BRMF-209 through BRMF-211?

---

## 42. Acceptance Criteria

BRMF-208 may progress from Draft to Approved when:

- the Source aggregate is accepted;
- the Evidence Item and Evidence Fragment models are accepted;
- Claim is accepted as the central scholarly aggregate;
- Claim Support, Challenge, and Contradiction models are accepted;
- Interpretation and Knowledge Object models are accepted;
- Citation and Verification models are accepted;
- Source and Evidence Quality models are accepted;
- Evidence Sufficiency and Evidence Dossier models are accepted;
- Provenance Record, Provenance Chain, and Provenance Engine are accepted;
- AI-generated Claim governance is accepted;
- the Knowledge–Evidence Network is accepted;
- interfaces with the three operational graphs are accepted;
- privacy, copyright, and academic-integrity safeguards are accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved contradiction with BRMF-201 through BRMF-207 remains.

---

## 43. Next Specification

The next recommended document is:

**BRMF-209 — Supervision, Review, and Academic Governance Domain Model**

It will define:

- Supervisor;
- Supervision Relationship;
- Supervision Meeting;
- Review Request;
- Review;
- Feedback;
- Recommendation;
- Academic Decision;
- Authority Scope;
- Approval;
- Rejection;
- Revision Requirement;
- Disagreement;
- Escalation;
- Program Governance;
- Ethics and integrity referrals;
- supervisor workload visibility;
- boundaries between mentoring, supervision, assessment, and institutional
  authority.

---

**End of BRMF-208**
