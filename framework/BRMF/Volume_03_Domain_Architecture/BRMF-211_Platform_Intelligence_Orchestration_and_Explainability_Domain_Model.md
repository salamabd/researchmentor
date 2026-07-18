# BRMF-211 — Platform Intelligence, Orchestration, and Explainability Domain Model

**Status:** Draft 1.0  
**Volume:** 03 — Domain Architecture  
**Classification:** Core Domain Specification  
**Depends on:** BRMF-101, BRMF-102, BRMF-103, BRMF-106, BRMF-107, BRMF-108, BRMF-109, BRMF-110, BRMF-201, BRMF-202, BRMF-203, BRMF-204, BRMF-205, BRMF-206, BRMF-207, BRMF-208, BRMF-209, BRMF-210  
**Prepares:** BRMF-212

---

## 1. Purpose

This document defines the domain model for platform intelligence, educational
intent, intelligence requests, intelligence tasks, capability resolution,
context assembly, retrieval, reasoning strategies, orchestration, model
selection, tool invocation, agent action, pedagogical reasoning, safety,
academic-integrity protection, human review, explanation, confidence,
uncertainty, provenance, auditability, failure handling, fallback, resource
governance, and cross-domain intelligence within the Business Research Mentor
(BRM).

It establishes the following as first-class platform capabilities:

- Intelligence Task;
- Intelligence Capability;
- Context Package;
- Orchestration Plan;
- Pedagogical Reasoning Engine;
- Orchestration Engine;
- Explainability Engine;
- Intelligence Graph;
- Safety and Academic-Integrity Guardrail Layer;
- Human Review Gateway;
- Intelligence Audit Record.

The model makes BRM independent of any specific AI vendor, model family, or
provider.

---

## 2. Core Principle

AI models are replaceable infrastructure.

Educational reasoning is part of the platform constitution.

The canonical intelligence flow is:

Educational Intent  
→ Intelligence Request  
→ Intelligence Task  
→ Capability Resolution  
→ Context Assembly  
→ Retrieval  
→ Reasoning Strategy  
→ Orchestration  
→ Model and Tool Execution  
→ Safety Review  
→ Educational Validation  
→ Human Review, when required  
→ Response  
→ Explanation  
→ Audit Record

The central aggregate is:

`IntelligenceTask`

The governing question is:

> What educationally appropriate intelligence action should BRM perform, using
> which capabilities, context, evidence, tools, safeguards, and review controls?

---

## 3. Constitutional Role

BRM is not an unrestricted answer generator.

Its intelligence layer exists to improve research thinking, learning, decision
quality, evidence use, scholarly independence, and supervision.

BRM may:

- explain;
- compare;
- challenge;
- retrieve;
- classify;
- evaluate;
- diagnose scholarly misconceptions;
- generate questions;
- recommend;
- simulate alternatives;
- identify uncertainty;
- prepare review material;
- support reflection;
- orchestrate tools;
- assemble context;
- produce traceable educational responses.

BRM must not:

- optimise solely for answer completion;
- bypass the learner's thinking;
- impersonate academic authority;
- fabricate evidence or citations;
- hide model or retrieval uncertainty;
- treat model confidence as correctness;
- silently use excessive personal context;
- override institutional policy;
- perform high-risk actions without required human review;
- conceal failures, fallbacks, or unavailable evidence;
- become dependent on one model vendor.

---

## 4. Bounded Context

### 4.1 Context name

**Platform Intelligence, Orchestration, and Explainability Context**

### 4.2 Responsibilities

The context owns:

- Educational Intent;
- Intelligence Request;
- Intelligence Task;
- Intelligence Capability;
- Capability Requirement;
- Model Profile;
- Model Capability;
- Model Selection;
- Context Package;
- Context Element;
- Retrieval Request;
- Retrieval Result;
- Reasoning Strategy;
- Orchestration Plan;
- Orchestration Step;
- Tool Invocation;
- Agent Action;
- Prompt Package;
- Output Classification;
- Intelligence Response;
- Explanation;
- Confidence Assessment;
- Uncertainty Record;
- Safety Rule;
- Academic-Integrity Guardrail;
- Pedagogical Decision;
- Human Review Request;
- Human Review Outcome;
- Intelligence Failure;
- Fallback Plan;
- Resource Budget;
- Intelligence Audit Record;
- Pedagogical Reasoning Engine;
- Orchestration Engine;
- Explainability Engine;
- Intelligence Graph.

### 4.3 Responsibilities excluded

The context does not own:

- Research Project semantics;
- Research Decision authority;
- Evidence or claim identity;
- learner identity;
- institutional policy identity;
- formal supervision authority;
- capability identity;
- milestone identity;
- final academic approval;
- external model-provider infrastructure;
- billing-provider systems.

---

## 5. Aggregate Architecture

BRMF-211 defines the following collaborating aggregate roots:

1. Intelligence Request
2. Intelligence Task
3. Intelligence Capability
4. Context Package
5. Orchestration Plan
6. Intelligence Response
7. Explanation
8. Human Review Request
9. Intelligence Failure
10. Resource Budget
11. Intelligence Audit Record
12. Intelligence Graph

The central aggregate is:

`IntelligenceTask`

---

## 6. Governed Intelligence Object Conformance

Major intelligence objects must support, where applicable:

- stable identity;
- purpose;
- educational intent;
- lifecycle;
- actor attribution;
- context boundary;
- evidence references;
- model and tool provenance;
- policy references;
- safety status;
- confidence;
- uncertainty;
- human review;
- failure state;
- semantic version;
- domain events.

No intelligence output may be accepted as authoritative merely because it was
generated by a model.

---

## 7. Educational Intent

Educational Intent represents the learning or research-development purpose behind
an intelligence request.

### Intent types

- Explain;
- Clarify;
- Compare;
- Challenge;
- Question;
- Reflect;
- Diagnose Misconception;
- Evaluate;
- Review;
- Mentor;
- Prepare;
- Retrieve;
- Verify;
- Summarise;
- Simulate;
- Recommend;
- Assess Readiness;
- Assess Capability;
- Identify Risk;
- Support Decision;
- Prepare Supervisor Discussion;
- Encourage Independence.

### Attributes

- Educational Intent Id;
- Intent Type;
- Learner Goal;
- Research Goal;
- Desired Cognitive Operation;
- Desired Learning Outcome;
- Prohibited Assistance;
- Required Support Level;
- Independence Objective;
- Context;
- Provenance.

### Rules

- Intent must be explicit or inferable with recorded confidence.
- Educational intent must remain distinct from user wording.
- A request for an answer may still require a mentoring intervention.
- High-risk inferred intent requires clarification or conservative handling.

---

## 8. Intelligence Request Aggregate

### 8.1 Identity

`IntelligenceRequestId`

### 8.2 Purpose

An Intelligence Request represents a request for educational, scholarly,
analytical, retrieval, or platform assistance.

### 8.3 Attributes

- Intelligence Request Id;
- Requester;
- Learner Id, optional;
- Research Project Id, optional;
- Educational Intent;
- User Request;
- Requested Output;
- Constraints;
- Urgency;
- Confidentiality;
- Allowed Data Scope;
- Prohibited Actions;
- Human Review Preference;
- Resource Constraints;
- Status;
- Provenance.

### 8.4 Status

- Received;
- Interpreting;
- Clarification Required;
- Accepted;
- Rejected;
- Converted to Task;
- Cancelled;
- Completed;
- Failed.

### 8.5 Rules

- Request acceptance must respect policy and capability.
- User wording is not automatically the correct educational action.
- Requests exceeding authority or safety boundaries must be constrained,
  redirected, or rejected.
- Accepted requests must create one or more Intelligence Tasks.

---

## 9. Intelligence Task Aggregate

### 9.1 Identity

`IntelligenceTaskId`

### 9.2 Purpose

An Intelligence Task represents one governed unit of educational reasoning or
platform intelligence work.

### 9.3 Task types

- Explain Concept;
- Compare Theories;
- Evaluate Evidence;
- Critique Hypothesis;
- Evaluate Framework;
- Challenge Assumption;
- Identify Contradiction;
- Evaluate Methodology;
- Prepare Supervisor Meeting;
- Generate Reflection Questions;
- Diagnose Misconception;
- Assess Readiness;
- Assess Capability;
- Identify Blocker;
- Prepare Recovery Options;
- Retrieve Knowledge;
- Verify Citation;
- Classify Evidence;
- Summarise with Provenance;
- Conduct Impact Analysis;
- Evaluate Governance Requirement;
- Generate Mentoring Intervention;
- Produce Explainable Recommendation.

### 9.4 Attributes

- Intelligence Task Id;
- Intelligence Request Id;
- Task Type;
- Educational Intent;
- Target Objects;
- Capability Requirements;
- Context Requirements;
- Evidence Requirements;
- Reasoning Strategy;
- Orchestration Plan;
- Safety Requirements;
- Human Review Requirement;
- Resource Budget;
- Expected Output Classification;
- Status;
- Priority;
- Semantic Version;
- Provenance.

### 9.5 Status

- Planned;
- Ready;
- Context Pending;
- Retrieval Pending;
- Running;
- Safety Review;
- Human Review;
- Completed;
- Completed with Qualification;
- Blocked;
- Failed;
- Cancelled;
- Superseded.

### 9.6 Rules

- Every task must have an educational or platform purpose.
- Capability requirements must be resolved before execution.
- Context must be limited to what the task requires.
- High-risk tasks require human review according to policy.
- Task completion does not imply output correctness.
- Failed tasks remain auditable.

---

## 10. Intelligence Capability Aggregate

### 10.1 Identity

`IntelligenceCapabilityId`

### 10.2 Purpose

An Intelligence Capability represents a vendor-neutral capacity required to
perform an Intelligence Task.

### 10.3 Capability categories

#### Retrieval

- Semantic Retrieval;
- Structured Retrieval;
- Graph Retrieval;
- Citation Retrieval;
- Longitudinal Context Retrieval.

#### Scholarly Reasoning

- Evidence Evaluation;
- Claim Analysis;
- Contradiction Analysis;
- Theory Comparison;
- Hypothesis Critique;
- Framework Evaluation;
- Methodology Review;
- Statistical Reasoning;
- Qualitative Reasoning;
- Mixed-Methods Reasoning.

#### Educational Reasoning

- Socratic Questioning;
- Misconception Diagnosis;
- Reflection Coaching;
- Scaffold Selection;
- Scaffold Fading;
- Productive Cognitive Conflict;
- Capability Assessment;
- Readiness Assessment;
- Supervisor Discussion Preparation.

#### Governance and Safety

- Authority Validation;
- Policy Evaluation;
- Academic-Integrity Risk Detection;
- Citation Verification;
- Privacy Screening;
- Human Review Routing;
- Risk Classification.

#### Technical

- Structured Output;
- Tool Use;
- Code Execution;
- Graph Traversal;
- Document Analysis;
- Vision;
- Speech;
- Translation;
- Multi-Agent Coordination.

### 10.4 Attributes

- Intelligence Capability Id;
- Name;
- Category;
- Definition;
- Input Contract;
- Output Contract;
- Quality Requirements;
- Evidence Requirements;
- Safety Requirements;
- Supported Providers;
- Deterministic Alternatives;
- Status;
- Provenance.

### 10.5 Rules

- Capability definitions remain vendor neutral.
- A capability may be fulfilled by a model, tool, deterministic service, human,
  or combination.
- Provider branding must not define platform semantics.
- Unsupported capability must not be simulated silently.

---

## 11. Capability Requirement

A Capability Requirement links an Intelligence Task to required capabilities.

### Attributes

- Capability Requirement Id;
- Intelligence Task Id;
- Intelligence Capability Id;
- Required Level;
- Mandatory or Optional;
- Quality Threshold;
- Safety Constraint;
- Fallback Requirement;
- Provenance.

### Rules

- Mandatory capabilities must be resolved before execution.
- Optional capability absence must be disclosed where material.
- Fallback capability must not silently lower educational safety.

---

## 12. Model Profile

A Model Profile represents an available AI model or model endpoint.

### Attributes

- Model Profile Id;
- Provider;
- Model Family;
- Model Version;
- Deployment Type;
- Supported Capabilities;
- Context Capacity;
- Tool Support;
- Structured Output Support;
- Data Residency;
- Privacy Terms;
- Reliability Evidence;
- Known Limitations;
- Cost Profile;
- Latency Profile;
- Availability;
- Effective Period;
- Status;
- Provenance.

### Rules

- Model identity is infrastructure metadata.
- Model capability claims require evidence.
- Model versions must remain explicit.
- Deprecated or unavailable models must not be selected.
- Provider terms and data handling must be considered during selection.

---

## 13. Model Capability

A Model Capability records evidence that a Model Profile can perform an
Intelligence Capability under defined conditions.

### Attributes

- Model Capability Id;
- Model Profile Id;
- Intelligence Capability Id;
- Capability Level;
- Evaluation Method;
- Evaluation Context;
- Reliability;
- Known Failure Modes;
- Safety Limitations;
- Last Verified;
- Provenance.

### Rules

- Marketing claims alone are insufficient evidence.
- Capability depends on task, prompt, context, tools, and output constraints.
- Stale evaluations must be marked.
- A model may be strong in one capability and unsuitable in another.

---

## 14. Model Selection

Model Selection chooses one or more execution resources for an Intelligence Task.

### Inputs

- capability requirements;
- privacy;
- safety;
- data residency;
- context size;
- latency;
- cost;
- availability;
- tool requirements;
- reliability;
- fallback options;
- human review requirement.

### Outputs

- selected model or service;
- alternative model;
- selection rationale;
- constraints;
- expected risks;
- fallback path;
- provenance.

### Rules

- Selection must be explainable.
- Cheapest or largest model is not automatically preferred.
- Sensitive context may restrict providers.
- Deterministic services should be preferred where sufficient.
- Vendor lock-in must be avoided.

---

## 15. Context Package Aggregate

### 15.1 Identity

`ContextPackageId`

### 15.2 Purpose

A Context Package contains the minimum governed context necessary to perform an
Intelligence Task.

### 15.3 Possible context elements

- Research Project;
- Research Stage;
- Research Decision;
- Evidence Dossier;
- Claim;
- Knowledge Object;
- Contradiction;
- Capability Profile;
- Maturity Profile;
- Readiness Assessment;
- Learner Reflection;
- Supervisor Feedback;
- Academic Review;
- Governance Rule;
- Previous Intelligence Response;
- Tool Result;
- Relevant Conversation Segment.

### 15.4 Attributes

- Context Package Id;
- Intelligence Task Id;
- Context Elements;
- Selection Rationale;
- Inclusion Rules;
- Exclusion Rules;
- Privacy Classification;
- Token or Size Estimate;
- Freshness;
- Completeness;
- Missing Context;
- Redactions;
- Semantic Version;
- Provenance.

### 15.5 Rules

- Context minimisation is mandatory.
- Entire conversation history must not be included by default.
- Sensitive context requires explicit policy basis.
- Missing context must remain visible.
- Context package versions must be reproducible where possible.
- Context quality affects confidence.

---

## 16. Context Element

A Context Element is one governed item included in a Context Package.

### Attributes

- Context Element Id;
- Source Object;
- Context Type;
- Relevance;
- Freshness;
- Reliability;
- Access Basis;
- Redaction Status;
- Inclusion Reason;
- Token or Size Estimate;
- Provenance.

### Rules

- Inclusion must be justified.
- Irrelevant personal data must be excluded.
- Redacted elements must preserve redaction reason.
- Access controls must follow source-domain policy.

---

## 17. Retrieval Request

A Retrieval Request defines what information must be retrieved for a task.

### Attributes

- Retrieval Request Id;
- Intelligence Task Id;
- Retrieval Purpose;
- Query;
- Source Scope;
- Time Scope;
- Evidence Standard;
- Freshness Requirement;
- Result Limit;
- Ranking Strategy;
- Safety Constraints;
- Status;
- Provenance.

### Retrieval types

- Semantic Search;
- Keyword Search;
- Graph Traversal;
- Citation Lookup;
- Policy Lookup;
- Longitudinal Retrieval;
- Similar Case Retrieval;
- Contradiction Search;
- External Web Retrieval;
- Internal Repository Retrieval.

---

## 18. Retrieval Result

A Retrieval Result records retrieved materials and their selection state.

### Attributes

- Retrieval Result Id;
- Retrieval Request Id;
- Retrieved Items;
- Ranking;
- Relevance;
- Freshness;
- Reliability;
- Contradictions;
- Missing Evidence;
- Excluded Items;
- Retrieval Method;
- Status;
- Provenance.

### Rules

- Retrieval does not imply truth.
- Ranking does not imply authority.
- External and internal sources must remain distinguishable.
- Unsupported or stale material must be qualified.
- Retrieval provenance must be preserved.

---

## 19. Reasoning Strategy

A Reasoning Strategy defines how the task should be reasoned about.

### Strategy types

- Direct Explanation;
- Comparative Analysis;
- Evidence-First Analysis;
- Contradiction-First Analysis;
- Hypothesis Testing;
- Assumption Challenge;
- Socratic Dialogue;
- Scaffolded Discovery;
- Reflective Prompting;
- Case Comparison;
- Counterexample Search;
- Decision Matrix;
- Causal Analysis;
- Constraint Analysis;
- Readiness Evaluation;
- Capability Evaluation;
- Governance Validation;
- Multi-Perspective Review;
- Human-in-the-Loop Deliberation.

### Attributes

- Reasoning Strategy Id;
- Name;
- Purpose;
- Preconditions;
- Steps;
- Required Capabilities;
- Educational Risks;
- Safety Constraints;
- Expected Output;
- Provenance.

### Rules

- Reasoning strategy must fit educational intent.
- Strategy selection must consider learner capability and independence.
- Hidden reasoning content need not be exposed, but the rationale, evidence,
  assumptions, alternatives, and uncertainty must be explainable.
- A strategy may be changed when evidence invalidates the original plan.

---

## 20. Orchestration Plan Aggregate

### 20.1 Identity

`OrchestrationPlanId`

### 20.2 Purpose

An Orchestration Plan defines the ordered, conditional, and reviewable execution
of an Intelligence Task.

### 20.3 Attributes

- Orchestration Plan Id;
- Intelligence Task Id;
- Objective;
- Orchestration Steps;
- Dependencies;
- Parallel Steps;
- Model Selections;
- Tool Selections;
- Human Review Gates;
- Safety Gates;
- Budget;
- Fallback Plans;
- Completion Conditions;
- Status;
- Semantic Version;
- Provenance.

### 20.4 Status

- Draft;
- Validated;
- Approved for Execution;
- Running;
- Paused;
- Replanned;
- Completed;
- Failed;
- Cancelled;
- Superseded.

### 20.5 Rules

- Plans must be reproducible at the level permitted by model variability.
- Safety gates cannot be bypassed.
- Human review gates cannot be silently removed.
- Replanning must preserve prior plan history.
- Tool and model execution remain subordinate to educational intent.

---

## 21. Orchestration Step

### Step types

- Interpret Intent;
- Resolve Capability;
- Assemble Context;
- Retrieve;
- Traverse Graph;
- Invoke Tool;
- Invoke Model;
- Run Deterministic Rule;
- Validate Evidence;
- Check Citation;
- Evaluate Safety;
- Evaluate Integrity Risk;
- Apply Pedagogical Decision;
- Request Human Review;
- Generate Explanation;
- Classify Output;
- Store Audit Record.

### Attributes

- Orchestration Step Id;
- Orchestration Plan Id;
- Step Type;
- Input;
- Required Capability;
- Execution Resource;
- Preconditions;
- Output Contract;
- Retry Policy;
- Timeout;
- Failure Policy;
- Status;
- Provenance.

---

## 22. Tool Invocation

A Tool Invocation records a governed use of a deterministic or external tool.

### Attributes

- Tool Invocation Id;
- Intelligence Task Id;
- Tool Id;
- Tool Version;
- Purpose;
- Input;
- Output;
- Permissions;
- Safety Classification;
- Start Time;
- End Time;
- Cost;
- Status;
- Failure;
- Provenance.

### Rules

- Tool permissions must be explicit.
- Side-effect tools require higher review and confirmation.
- Tool output must not be treated as infallible.
- External data and local data must remain distinguishable.
- Sensitive inputs must follow privacy policy.

---

## 23. Agent Action

An Agent Action is a bounded action performed by an autonomous or semi-autonomous
component.

### Attributes

- Agent Action Id;
- Intelligence Task Id;
- Agent Id;
- Purpose;
- Planned Action;
- Tool or Model;
- Preconditions;
- Allowed Side Effects;
- Human Approval Requirement;
- Result;
- Status;
- Provenance.

### Rules

- Agent autonomy must be bounded.
- Unapproved side effects are prohibited.
- Agent identity and action history must be attributable.
- Agents do not possess academic authority.
- Autonomous escalation must remain policy constrained.

---

## 24. Prompt Package

A Prompt Package is a versioned execution artifact supplied to a model.

### Attributes

- Prompt Package Id;
- Intelligence Task Id;
- System Instructions;
- Task Instructions;
- Context References;
- Output Schema;
- Safety Constraints;
- Educational Constraints;
- Model Profile;
- Version;
- Hash;
- Provenance.

### Rules

- Prompts are implementation artifacts, not domain truth.
- Prompt versions must be traceable for audited tasks.
- Sensitive context should be referenced or redacted where possible.
- Prompt changes must not silently alter educational policy.

---

## 25. Pedagogical Decision

A Pedagogical Decision determines the educationally appropriate intervention
strategy before response generation.

### Possible decisions

- Ask a Socratic Question;
- Request Learner Explanation;
- Provide a Hint;
- Provide Partial Explanation;
- Provide Full Explanation;
- Challenge an Assumption;
- Present Competing Perspectives;
- Introduce Productive Conflict;
- Prompt Reflection;
- Require Evidence;
- Delay Recommendation;
- Reduce Scaffolding;
- Increase Scaffolding;
- Prepare Supervisor Discussion;
- Escalate for Human Review;
- Decline Over-Helping.

### Attributes

- Pedagogical Decision Id;
- Intelligence Task Id;
- Learner State References;
- Capability Profile References;
- Maturity Profile References;
- Readiness References;
- Educational Objective;
- Candidate Interventions;
- Selected Intervention;
- Rationale;
- Risks;
- Expected Learning Outcome;
- Review Requirement;
- Provenance.

### Rules

- The selected intervention must serve learning, not merely convenience.
- Learner capability and independence must influence intervention depth.
- Direct answers may be withheld where guided discovery is more appropriate.
- Pedagogical decisions must not become manipulative or punitive.
- Formal academic decisions remain outside this object.

---

## 26. Pedagogical Reasoning Engine

The Pedagogical Reasoning Engine determines which educational action is most
appropriate for the learner at the current point in the research journey.

### 26.1 Inputs

- Educational Intent;
- Learner State;
- Capability Profile;
- Maturity Profile;
- Readiness Assessment;
- Research Stage;
- Research Decision Context;
- Prior Interventions;
- Scaffold History;
- Supervisor Feedback;
- Current Request;
- Academic-Integrity Risk;
- Governance Constraints.

### 26.2 Outputs

- Pedagogical Decision;
- intervention type;
- response depth;
- scaffolding level;
- questioning strategy;
- reflection requirement;
- explanation requirement;
- human review requirement;
- rationale;
- uncertainty;
- provenance.

### 26.3 Responsibilities

The engine must:

- optimise for researcher development;
- protect learner agency;
- avoid over-helping;
- select appropriate cognitive operations;
- support productive struggle;
- adapt scaffolding;
- encourage transfer and independence;
- preserve supervisor involvement;
- route high-risk situations to human review.

### 26.4 Rules

- The engine does not assess grades.
- It must not manipulate the learner covertly.
- It must explain material intervention choices.
- It must not infer sensitive psychological states.
- Educational benefit must not override safety or institutional policy.
- Human review is required for ambiguous high-impact interventions.

---

## 27. Orchestration Engine

The Orchestration Engine executes Intelligence Tasks through models, tools,
retrieval services, deterministic rules, and human review.

### Responsibilities

- resolve capabilities;
- validate context;
- select resources;
- execute orchestration plans;
- manage dependencies;
- enforce safety gates;
- manage retries;
- invoke fallback;
- preserve provenance;
- detect partial completion;
- stop unsafe execution;
- produce auditable results.

### Rules

- The engine does not define educational goals.
- Pedagogical Reasoning governs educational intervention choice.
- Governance rules govern authority.
- Evidence rules govern scholarly support.
- Failures and fallbacks must remain visible.
- Execution success does not imply educational validity.

---

## 28. Safety Rule

A Safety Rule defines a constraint on intelligence behaviour.

### Safety categories

- Privacy;
- Data Security;
- Academic Integrity;
- Fabricated Citation;
- Hallucination;
- Over-Helping;
- Supervisor Bypass;
- False Authority;
- False Certainty;
- Bias;
- Harmful Advice;
- Confidentiality;
- Tool Misuse;
- Unauthorized Side Effect;
- Excessive Context;
- Model Unsuitability;
- Vulnerable Learner Protection.

### Attributes

- Safety Rule Id;
- Category;
- Trigger;
- Constraint;
- Severity;
- Required Action;
- Human Review Requirement;
- Policy Reference;
- Status;
- Provenance.

---

## 29. Academic-Integrity Guardrail

An Academic-Integrity Guardrail protects learner authorship, original thinking,
and responsible use of AI.

### Guardrail types

- No Dissertation Generation;
- No Fabricated Citation;
- No False Data;
- No Undisclosed Authorship;
- No Assessment Impersonation;
- No Supervisor Impersonation;
- No Evidence Invention;
- No Concealed AI Contribution;
- No Plagiarism Assistance;
- No Bypass of Required Learning;
- Scaffold Limitation;
- Reflection Requirement;
- Attribution Requirement.

### Rules

- Integrity protection must be educational where possible.
- Guardrails must distinguish assistance from substitution.
- Legitimate language support must not be confused with misconduct.
- AI detection alone is not proof of misconduct.
- High-risk integrity matters must be referred, not adjudicated, by BRM.

---

## 30. Output Classification

Every intelligence output must be classified.

### Output classes

- Explanation;
- Question;
- Hint;
- Reflection Prompt;
- Comparison;
- Evidence Summary;
- Candidate Claim;
- Recommendation;
- Risk Alert;
- Readiness Assessment;
- Capability Assessment;
- Governance Information;
- Draft for Review;
- Supervisor Discussion Preparation;
- Citation Verification Result;
- Refusal;
- Escalation;
- Human Review Pending.

### Rules

- Recommendations must not be presented as decisions.
- Candidate claims must not be presented as accepted knowledge.
- Drafts must remain distinguishable from learner-authored final work.
- Human-review-pending output must not be treated as final.

---

## 31. Intelligence Response Aggregate

### 31.1 Identity

`IntelligenceResponseId`

### 31.2 Purpose

An Intelligence Response is the governed output of one or more Intelligence
Tasks.

### 31.3 Attributes

- Intelligence Response Id;
- Intelligence Request Id;
- Intelligence Task Id;
- Output Classification;
- Response Content;
- Evidence References;
- Explanation Reference;
- Confidence Assessment;
- Uncertainty Records;
- Safety Status;
- Human Review Status;
- Model and Tool References;
- Limitations;
- Status;
- Semantic Version;
- Provenance.

### 31.4 Status

- Draft;
- Pending Safety Review;
- Pending Human Review;
- Released;
- Released with Qualification;
- Withheld;
- Superseded;
- Withdrawn;
- Failed.

### 31.5 Rules

- Released responses must pass required safety gates.
- High-risk responses must satisfy human review requirements.
- Evidence and uncertainty must remain attached.
- Response revision must preserve prior versions.
- Response quality does not grant academic authority.

---

## 32. Explanation Aggregate

### 32.1 Identity

`ExplanationId`

### 32.2 Purpose

An Explanation makes the basis of an intelligence output understandable and
auditable.

### 32.3 Explanation questions

- Why was this response produced?
- What evidence was used?
- What assumptions were made?
- What alternatives were considered?
- Why was this intervention selected?
- What uncertainty remains?
- Which policies constrained the response?
- Which models and tools were used?
- Was human review required?
- What would change the conclusion?

### 32.4 Attributes

- Explanation Id;
- Intelligence Response Id;
- Educational Objective;
- Evidence Basis;
- Reasoning Strategy Summary;
- Assumptions;
- Alternatives Considered;
- Selection Rationale;
- Pedagogical Rationale;
- Policy Constraints;
- Confidence Basis;
- Uncertainty;
- Model and Tool Contributions;
- Human Review Contribution;
- Provenance.

### 32.5 Rules

- Explanation must not expose private hidden reasoning traces.
- It must provide meaningful rationale, evidence, assumptions, alternatives,
  uncertainty, and policy constraints.
- Explanations must remain audience appropriate.
- "The model said so" is never sufficient explanation.

---

## 33. Explainability Engine

The Explainability Engine produces audience-appropriate explanations for
intelligence outputs and orchestration decisions.

### Inputs

- Intelligence Task;
- Orchestration Plan;
- Context Package;
- Retrieval Results;
- Pedagogical Decision;
- Safety Rules;
- Model Selections;
- Tool Invocations;
- Human Review Outcomes;
- Intelligence Response;
- Confidence;
- Uncertainty.

### Outputs

- learner explanation;
- supervisor explanation;
- administrator explanation;
- technical audit explanation;
- provenance links;
- limitations;
- alternative-path explanation.

### Rules

- Explanations must be truthful and evidence linked.
- Technical detail must match audience need.
- Hidden chain-of-thought is not required for explainability.
- Material policy or safety constraints must be visible.
- Explanation must distinguish deterministic and model-generated contributions.

---

## 34. Confidence Assessment

Confidence represents justified confidence in an intelligence output, not model
self-assurance.

### Confidence dimensions

- Evidence Coverage;
- Evidence Quality;
- Context Completeness;
- Reasoning Stability;
- Model Reliability;
- Tool Reliability;
- Retrieval Quality;
- Contradiction Burden;
- Policy Clarity;
- Human Review Strength;
- Educational Fit.

### Results

- High with Strong Support;
- Moderate;
- Low;
- Conditional;
- Indeterminate;
- Not Assessable.

### Rules

- No single unexplained confidence percentage.
- Confidence must be dimension based.
- High confidence does not guarantee correctness.
- Model agreement alone is insufficient.
- Missing evidence and conflicting evidence must reduce confidence appropriately.

---

## 35. Uncertainty Record

### Uncertainty types

- Missing Evidence;
- Conflicting Evidence;
- Incomplete Context;
- Ambiguous Request;
- Novel Situation;
- Policy Ambiguity;
- Model Limitation;
- Tool Failure;
- Retrieval Limitation;
- Supervisor Disagreement;
- Authority Ambiguity;
- Low Generalisability;
- Stale Information;
- Unknown Unknown Risk.

### Attributes

- Uncertainty Record Id;
- Intelligence Task Id or Response Id;
- Type;
- Description;
- Impact;
- Mitigation;
- Residual Uncertainty;
- Human Review Requirement;
- Status;
- Provenance.

### Rules

- Uncertainty must not be hidden.
- Unknown and unsupported are different states.
- Mitigation must not imply elimination where uncertainty remains.
- Material uncertainty must be visible to the user.

---

## 36. Human Review Request Aggregate

### 36.1 Identity

`HumanReviewRequestId`

### 36.2 Purpose

A Human Review Request routes an intelligence task or response to an authorised
human reviewer.

### 36.3 Triggers

- ethics;
- academic integrity;
- formal progression;
- high-impact methodology redesign;
- ambiguous authority;
- conflicting policies;
- low-confidence high-stakes output;
- potential harm;
- sensitive personal context;
- unresolved supervisor disagreement;
- external action with side effects.

### 36.4 Attributes

- Human Review Request Id;
- Intelligence Task Id;
- Intelligence Response Id, optional;
- Trigger;
- Required Authority;
- Reviewer Assignment;
- Review Questions;
- Evidence Package;
- Due Date;
- Interim Status;
- Outcome;
- Status;
- Provenance.

### 36.5 Rules

- Required human review cannot be silently bypassed.
- Reviewer authority must be validated through BRMF-209.
- Human review outcome must remain attributable.
- Review does not erase model and tool provenance.

---

## 37. Human Review Outcome

### Outcomes

- Approved for Release;
- Approved with Conditions;
- Revision Required;
- Withheld;
- Escalated;
- Outside Reviewer Scope;
- Indeterminate.

### Attributes

- Human Review Outcome Id;
- Human Review Request Id;
- Reviewer;
- Authority Assignment;
- Findings;
- Conditions;
- Rationale;
- Decision;
- Timestamp;
- Provenance.

---

## 38. Intelligence Failure Aggregate

### 38.1 Identity

`IntelligenceFailureId`

### 38.2 Failure types

- Capability Unavailable;
- Context Assembly Failure;
- Retrieval Failure;
- Tool Failure;
- Model Failure;
- Timeout;
- Safety Block;
- Integrity Block;
- Policy Conflict;
- Human Review Unavailable;
- Budget Exhausted;
- Invalid Output;
- Citation Verification Failure;
- Provider Outage;
- Orchestration Failure;
- Unknown Failure.

### 38.3 Attributes

- Intelligence Failure Id;
- Intelligence Task Id;
- Failure Type;
- Failed Step;
- Cause;
- Impact;
- Partial Results;
- Retryability;
- Fallback Eligibility;
- User Visibility;
- Status;
- Provenance.

### Rules

- Failure must not be concealed.
- Partial results must be labelled.
- Invalid outputs must not be released.
- Retry must respect resource and safety policy.
- Failure history must support improvement.

---

## 39. Fallback Plan

A Fallback Plan defines alternative execution when the preferred path fails.

### Fallback types

- Alternative Model;
- Deterministic Service;
- Reduced Scope;
- Cached Verified Result;
- Human Review;
- Deferred Completion;
- Manual Retrieval;
- Refusal with Explanation.

### Attributes

- Fallback Plan Id;
- Intelligence Task Id;
- Trigger;
- Alternative Path;
- Quality Impact;
- Safety Impact;
- Cost Impact;
- User Disclosure;
- Status;
- Provenance.

### Rules

- Fallback must not silently reduce quality or safety.
- Reduced scope must be disclosed.
- Cached outputs require freshness checks.
- Human review may be the safest fallback.
- Refusal is preferable to fabricated completion.

---

## 40. Resource Budget Aggregate

### 40.1 Identity

`ResourceBudgetId`

### 40.2 Purpose

A Resource Budget governs cost, latency, context size, model calls, tool calls,
storage, and human-review demand.

### 40.3 Attributes

- Resource Budget Id;
- Intelligence Task Id;
- Cost Limit;
- Token Limit;
- Time Limit;
- Model Call Limit;
- Tool Call Limit;
- Retrieval Limit;
- Human Review Allocation;
- Priority;
- Override Authority;
- Usage;
- Status;
- Provenance.

### 40.4 Rules

- Cost optimisation must not override safety.
- High-cost execution requires justification.
- Budget exhaustion must not produce fabricated output.
- Educational value and quality must influence resource allocation.
- Personal or institutional limits must remain configurable.

---

## 41. Intelligence Audit Record Aggregate

### 41.1 Identity

`IntelligenceAuditRecordId`

### 41.2 Purpose

An Intelligence Audit Record preserves the traceability of an intelligence task
from request through response.

### 41.3 Attributes

- Intelligence Audit Record Id;
- Intelligence Request;
- Intelligence Tasks;
- Educational Intent;
- Context Package Versions;
- Retrieval Requests and Results;
- Reasoning Strategy;
- Orchestration Plan;
- Model Selections;
- Prompt Packages;
- Tool Invocations;
- Agent Actions;
- Safety Evaluations;
- Pedagogical Decisions;
- Human Reviews;
- Responses;
- Explanations;
- Confidence;
- Uncertainty;
- Failures;
- Fallbacks;
- Resource Usage;
- Timestamps;
- Provenance Chain.

### 41.4 Rules

- Audit records must be tamper evident.
- Sensitive prompt and context content may be protected while retaining hashes
  and references.
- Audit retention must follow privacy and institutional policy.
- Auditability must not become indiscriminate surveillance.
- Historical model and policy versions must remain identifiable.

---

## 42. Intelligence Graph Aggregate

### 42.1 Identity

`IntelligenceGraphId`

### 42.2 Purpose

The Intelligence Graph represents relationships among requests, tasks,
capabilities, context, models, tools, reasoning strategies, safety rules,
pedagogical decisions, responses, explanations, human reviews, failures, and
audit records.

### 42.3 Node types

- Educational Intent;
- Intelligence Request;
- Intelligence Task;
- Intelligence Capability;
- Model Profile;
- Model Capability;
- Context Package;
- Retrieval Request;
- Retrieval Result;
- Reasoning Strategy;
- Orchestration Plan;
- Orchestration Step;
- Tool Invocation;
- Agent Action;
- Prompt Package;
- Pedagogical Decision;
- Safety Rule;
- Integrity Guardrail;
- Human Review Request;
- Intelligence Response;
- Explanation;
- Confidence Assessment;
- Uncertainty Record;
- Intelligence Failure;
- Fallback Plan;
- Resource Budget;
- Audit Record.

### 42.4 Edge types

- Requests;
- Creates Task;
- Requires Capability;
- Fulfilled By;
- Uses Context;
- Retrieves;
- Selects Model;
- Invokes Tool;
- Uses Strategy;
- Orchestrated By;
- Constrained By;
- Reviewed By;
- Explains;
- Supported By;
- Qualified By;
- Blocked By;
- Failed At;
- Falls Back To;
- Audited By;
- Produces;
- Supersedes.

### 42.5 Rules

- Every material edge requires provenance.
- Inferred edges must remain labelled.
- Model selection edges must include rationale.
- Safety and human-review edges cannot be removed from history.
- Graph traversal must respect privacy and access controls.
- Operational connectivity does not imply academic authority.

---

## 43. Relationship to Existing Architecture

The BRM architecture now includes:

### Governance Layer

Authority, review, formal decisions, appeal, and institutional control.

### Knowledge–Evidence Network

Sources, evidence, claims, interpretations, knowledge, contradiction, and
provenance.

### Domain Graphs

- Scholarly Knowledge Graph;
- Research Decision Graph;
- Educational Learning Graph;
- Capability Graph.

### Research Journey

The longitudinal developmental context.

### Intelligence Graph

The operational map of how platform intelligence is requested, planned,
executed, reviewed, explained, and audited.

### Orchestration Layer

The execution mechanism operating across the architecture under educational,
evidence, safety, and governance constraints.

The intelligence layer is not above the constitution.

It is governed by it.

---

## 44. Domain Services

### 44.1 Educational Intent Interpretation Service

Interprets the educational purpose of a request and records uncertainty.

### 44.2 Capability Resolution Service

Maps tasks to required intelligence capabilities.

### 44.3 Context Assembly Service

Builds minimal, relevant, policy-compliant Context Packages.

### 44.4 Retrieval Planning Service

Determines retrieval sources, freshness, ranking, and evidence requirements.

### 44.5 Reasoning Strategy Selection Service

Selects a reasoning strategy appropriate to task and educational intent.

### 44.6 Model and Tool Selection Service

Selects execution resources using capability, privacy, safety, cost, reliability,
and availability.

### 44.7 Pedagogical Intervention Service

Selects educationally appropriate intervention depth and scaffolding.

### 44.8 Safety Evaluation Service

Evaluates safety, privacy, integrity, and authority risks.

### 44.9 Human Review Routing Service

Determines whether and where human review is required.

### 44.10 Explanation Construction Service

Builds audience-appropriate explanations.

### 44.11 Confidence and Uncertainty Service

Constructs multidimensional confidence and uncertainty records.

### 44.12 Failure and Fallback Service

Detects failure, selects fallback, and preserves disclosure.

### 44.13 Intelligence Impact Service

Traces which downstream decisions, learning records, capability profiles, and
governance objects may be affected by withdrawn or corrected outputs.

---

## 45. Domain Policies

### 45.1 Vendor Neutrality Policy

Domain semantics must not depend on one model provider.

### 45.2 Educational Intent First Policy

Intelligence execution must begin with educational purpose.

### 45.3 Pedagogical Governance Policy

The Pedagogical Reasoning Engine governs intervention choice.

### 45.4 Minimal Context Policy

Only necessary context may be assembled.

### 45.5 Evidence Before Recommendation Policy

Material scholarly recommendations require evidence or explicit qualification.

### 45.6 Explainability Policy

Material outputs require understandable rationale, evidence, assumptions,
alternatives, and uncertainty.

### 45.7 No Hidden Failure Policy

Failures, fallbacks, reduced scope, and partial completion must be disclosed.

### 45.8 Human Review Policy

High-risk tasks require authorised human review.

### 45.9 No AI Academic Authority Policy

Models, agents, and orchestration services possess no formal academic authority.

### 45.10 Academic-Integrity Protection Policy

AI assistance must support learning without replacing learner authorship.

### 45.11 Resource Responsibility Policy

Cost and computational resources must be governed without sacrificing safety.

### 45.12 Provenance and Audit Policy

Material intelligence actions require provenance and auditability.

### 45.13 Uncertainty Visibility Policy

Material uncertainty must remain visible.

### 45.14 Deterministic Preference Policy

Deterministic and verified services should be preferred where sufficient.

---

## 46. Aggregate Invariants

The domain must enforce:

1. Intelligence Task is the central aggregate.
2. Educational intent precedes execution.
3. Intelligence capabilities remain vendor neutral.
4. Models are infrastructure, not domain authority.
5. Every task declares required capabilities.
6. Mandatory capabilities must be resolved.
7. Context is minimised.
8. Sensitive context requires policy basis.
9. Missing context remains visible.
10. Retrieval does not imply truth.
11. Ranking does not imply authority.
12. Reasoning strategy fits educational intent.
13. Pedagogical decisions optimise for learning.
14. Direct answers are not always the correct intervention.
15. AI has no formal academic authority.
16. Safety gates cannot be bypassed.
17. Required human review cannot be bypassed.
18. Recommendations remain distinct from decisions.
19. Candidate claims remain distinct from accepted knowledge.
20. Output classification is explicit.
21. Explanation does not require exposing hidden chain-of-thought.
22. Explanation includes rationale, evidence, assumptions, alternatives, and
    uncertainty.
23. Confidence remains multidimensional.
24. High confidence does not guarantee correctness.
25. Uncertainty is not hidden.
26. Failure is not concealed.
27. Partial results are labelled.
28. Fallback quality impact is disclosed.
29. Invalid output is not released.
30. Prompt packages are versioned implementation artifacts.
31. Model and tool contributions remain attributable.
32. Resource exhaustion does not justify fabrication.
33. Audit records are tamper evident.
34. Intelligence Graph edges require provenance.
35. Inferred graph edges remain labelled.
36. Operational connectivity does not imply authority.
37. Academic-integrity referrals remain outside misconduct adjudication.
38. High-impact ambiguous interventions require human review.
39. Vendor lock-in is actively avoided.
40. Intelligence remains subordinate to BRM educational and governance
    principles.

---

## 47. Commands

Initial commands include:

- Create Intelligence Request
- Interpret Educational Intent
- Reject Intelligence Request
- Create Intelligence Task
- Add Capability Requirement
- Register Intelligence Capability
- Register Model Profile
- Record Model Capability
- Select Model
- Create Context Package
- Add Context Element
- Redact Context Element
- Create Retrieval Request
- Record Retrieval Result
- Select Reasoning Strategy
- Create Orchestration Plan
- Add Orchestration Step
- Validate Orchestration Plan
- Invoke Tool
- Record Agent Action
- Create Prompt Package
- Create Pedagogical Decision
- Evaluate Pedagogical Intervention
- Evaluate Safety Rule
- Apply Integrity Guardrail
- Classify Output
- Create Intelligence Response
- Create Explanation
- Assess Confidence
- Record Uncertainty
- Create Human Review Request
- Record Human Review Outcome
- Record Intelligence Failure
- Activate Fallback Plan
- Create Resource Budget
- Record Resource Usage
- Create Intelligence Audit Record
- Add Intelligence Graph Node
- Add Intelligence Graph Edge
- Conduct Intelligence Impact Analysis

---

## 48. Domain Events

Initial events include:

- IntelligenceRequestCreated
- EducationalIntentInterpreted
- IntelligenceRequestRejected
- IntelligenceTaskCreated
- CapabilityRequirementAdded
- IntelligenceCapabilityRegistered
- ModelProfileRegistered
- ModelCapabilityRecorded
- ModelSelected
- ContextPackageCreated
- ContextElementAdded
- ContextElementRedacted
- RetrievalRequestCreated
- RetrievalResultRecorded
- ReasoningStrategySelected
- OrchestrationPlanCreated
- OrchestrationStepAdded
- OrchestrationPlanValidated
- ToolInvoked
- AgentActionRecorded
- PromptPackageCreated
- PedagogicalDecisionCreated
- PedagogicalInterventionEvaluated
- SafetyRuleEvaluated
- IntegrityGuardrailApplied
- OutputClassified
- IntelligenceResponseCreated
- ExplanationCreated
- ConfidenceAssessed
- UncertaintyRecorded
- HumanReviewRequestCreated
- HumanReviewOutcomeRecorded
- IntelligenceFailureRecorded
- FallbackPlanActivated
- ResourceBudgetCreated
- ResourceUsageRecorded
- IntelligenceAuditRecordCreated
- IntelligenceGraphNodeAdded
- IntelligenceGraphEdgeAdded
- IntelligenceImpactAnalysisConducted

---

## 49. Command–Event–Policy–Invariant Matrix

| Command | Principal Event | Governing Policy | Key Invariant |
|---|---|---|---|
| Interpret Educational Intent | EducationalIntentInterpreted | Educational Intent First Policy | Intent precedes execution |
| Add Capability Requirement | CapabilityRequirementAdded | Vendor Neutrality Policy | Capability is vendor neutral |
| Create Context Package | ContextPackageCreated | Minimal Context Policy | Context is minimised |
| Select Model | ModelSelected | Deterministic Preference Policy | Model selection is explainable |
| Create Pedagogical Decision | PedagogicalDecisionCreated | Pedagogical Governance Policy | Learning governs intervention |
| Evaluate Safety Rule | SafetyRuleEvaluated | Human Review Policy | Safety gates cannot be bypassed |
| Create Intelligence Response | IntelligenceResponseCreated | Evidence Before Recommendation Policy | Output is qualified and classified |
| Create Explanation | ExplanationCreated | Explainability Policy | Rationale and uncertainty visible |
| Record Failure | IntelligenceFailureRecorded | No Hidden Failure Policy | Failure remains visible |
| Create Audit Record | IntelligenceAuditRecordCreated | Provenance and Audit Policy | Material actions are auditable |

---

## 50. Authority Model

### 50.1 BRM may

- interpret educational intent;
- create intelligence tasks;
- assemble context;
- retrieve and analyse evidence;
- orchestrate models and tools;
- make pedagogical intervention decisions;
- generate explanations;
- identify risk and uncertainty;
- request human review;
- record audit trails;
- recommend and prepare.

### 50.2 BRM may not

- formally approve research;
- grade or fail learners;
- determine misconduct;
- approve ethics;
- decide appeals;
- impersonate supervisors;
- conceal AI contribution;
- invent evidence;
- bypass safety or human review;
- claim authority from model capability.

### 50.3 Learner may

- make requests;
- inspect explanations;
- inspect material context use;
- challenge outputs;
- request human review;
- provide correction;
- control applicable preferences;
- review AI contribution.

### 50.4 Supervisor may

- review high-impact outputs;
- validate pedagogical recommendations;
- challenge context or evidence;
- approve release where authorised;
- correct intelligence records;
- determine appropriate supervisory action.

### 50.5 Program and institutional authorities may

- define intelligence-use policy;
- define review requirements;
- restrict providers;
- define privacy and residency rules;
- audit intelligence use;
- suspend unsafe capabilities;
- approve institutional integrations;
- define acceptable AI assistance.

---

## 51. Cross-Context Interfaces

### Research Project Context

Provides:

- project state;
- objects;
- current stage;
- constraints.

Receives:

- intelligence outputs;
- risk alerts;
- explanations;
- impact notices.

### Research Decision Context

Provides:

- decision questions;
- alternatives;
- criteria;
- uncertainty.

Receives:

- explainable recommendations;
- evidence analyses;
- contradiction findings;
- candidate alternatives.

### Constructs and Theoretical Models Context

Provides:

- theories;
- constructs;
- frameworks;
- hypotheses.

Receives:

- conceptual analysis;
- theory comparison;
- model critique;
- explanation.

### Mentoring and Educational Intervention Context

Provides:

- learner state;
- intervention history;
- scaffold state;
- reflection needs.

Receives:

- pedagogical decisions;
- intervention recommendations;
- questioning strategies;
- scaffold adjustments.

### Knowledge, Evidence, and Provenance Context

Provides:

- sources;
- evidence;
- claims;
- contradictions;
- citations;
- provenance.

Receives:

- retrieval usage;
- candidate claims;
- verification outcomes;
- impact analysis.

### Supervision and Governance Context

Provides:

- authority;
- policy;
- human reviewers;
- formal decisions.

Receives:

- review requests;
- high-risk outputs;
- authority ambiguity;
- audit records.

### Progress and Capability Context

Provides:

- capability profile;
- maturity profile;
- readiness;
- blockers;
- research stage.

Receives:

- capability assessments;
- readiness support;
- developmental evidence;
- intervention impact.

---

## 52. Privacy, Fairness, Safety, and Integrity Safeguards

The domain must support:

- context minimisation;
- role-based access;
- provider restrictions;
- data residency;
- sensitive-data redaction;
- model and tool provenance;
- human review;
- learner contestation;
- safety-rule transparency;
- bias review;
- versioned prompts;
- citation verification;
- guardrails against over-helping;
- protection of learner authorship;
- protection against fabricated evidence;
- clear AI attribution;
- audit retention rules;
- cost governance;
- safe failure;
- explainable model selection.

BRM must not infer sensitive personal traits from interaction style, delay,
confidence, or performance without an explicit legitimate basis and policy.

---

## 53. Reporting

Reports may include:

- Intelligence Request Register;
- Intelligence Task Register;
- Intelligence Capability Catalogue;
- Model Profile Register;
- Model Capability Assessment;
- Model Selection Report;
- Context Package Report;
- Retrieval Report;
- Reasoning Strategy Report;
- Orchestration Plan;
- Tool Invocation Register;
- Agent Action Register;
- Prompt Package Register;
- Pedagogical Decision Report;
- Safety Evaluation Report;
- Integrity Guardrail Report;
- Human Review Register;
- Intelligence Response Report;
- Explanation Report;
- Confidence and Uncertainty Report;
- Failure and Fallback Report;
- Resource Usage Report;
- Intelligence Audit Report;
- Intelligence Graph View;
- Intelligence Impact Report.

Reports must distinguish:

- model output;
- deterministic output;
- human review;
- evidence;
- recommendation;
- decision;
- candidate claim;
- accepted knowledge;
- safety block;
- failure;
- fallback;
- uncertainty;
- educational intervention.

---

## 54. Example Scenario

An MBA learner asks:

> Which theory should I use for my study of employee innovation?

BRM does not immediately provide a theory.

The Educational Intent is interpreted as:

- theory selection support;
- conceptual development;
- decision justification;
- preservation of learner independence.

An Intelligence Task is created:

`Compare Candidate Theories and Prepare a Guided Selection Process`

The Capability Requirements include:

- Theory Comparison;
- Evidence Evaluation;
- Construct Alignment;
- Socratic Questioning;
- Citation Verification;
- Pedagogical Intervention.

The Context Package includes:

- research problem;
- research questions;
- candidate constructs;
- prior supervisor feedback;
- Capability Profile;
- relevant Evidence Dossier;
- current Research Stage.

It excludes unrelated conversation history.

The Pedagogical Reasoning Engine determines that the learner has developing
theory-selection capability and should not receive a direct answer.

It selects:

- compare two plausible theories;
- expose trade-offs;
- ask the learner to justify boundary fit;
- require evidence;
- delay final recommendation.

The Orchestration Engine:

1. retrieves candidate theory evidence;
2. verifies citations;
3. analyses construct fit;
4. identifies contradictions;
5. compares scope and assumptions;
6. generates a structured comparison;
7. asks three guided questions;
8. creates an explanation;
9. stores an audit record.

The response is classified as:

`Guided Comparison`

not:

`Theory Selection Decision`

Confidence is moderate because one industry-context assumption remains
unsupported.

The learner responds with a justified selection.

BRM then generates a second task to challenge the learner's rationale.

The system supports the learner's development rather than merely selecting the
theory.

---

## 55. Validation Questions

Reviewers should confirm:

1. Is Intelligence Task correctly modelled as the central aggregate?
2. Are capabilities vendor neutral?
3. Are models treated as infrastructure?
4. Does Educational Intent precede orchestration?
5. Is Context Package minimal and governed?
6. Are retrieval, reasoning, orchestration, and response distinct?
7. Is Pedagogical Decision explicit?
8. Does the Pedagogical Reasoning Engine optimise for learning?
9. Can deterministic tools and humans fulfil capabilities?
10. Are model and tool selections explainable?
11. Are safety and academic-integrity guardrails first-class?
12. Is human review mandatory for high-risk outputs?
13. Are output classifications sufficient?
14. Are confidence and correctness distinct?
15. Is uncertainty preserved?
16. Are failures and fallbacks visible?
17. Is resource governance represented?
18. Is auditability balanced with privacy?
19. Is the Intelligence Graph compatible with the rest of BRM?
20. Does the model avoid vendor lock-in?
21. Does it preserve learner authorship and agency?
22. Does it provide a stable foundation for BRMF-212?

---

## 56. Acceptance Criteria

BRMF-211 may progress from Draft to Approved when:

- Educational Intent is accepted;
- Intelligence Request and Intelligence Task are accepted;
- Intelligence Capability and Capability Requirement are accepted;
- Model Profile, Model Capability, and Model Selection are accepted;
- Context Package and Retrieval models are accepted;
- Reasoning Strategy and Orchestration Plan are accepted;
- Tool Invocation, Agent Action, and Prompt Package are accepted;
- Pedagogical Decision and Pedagogical Reasoning Engine are accepted;
- Orchestration Engine is accepted;
- Safety Rules and Academic-Integrity Guardrails are accepted;
- Intelligence Response and Output Classification are accepted;
- Explanation and Explainability Engine are accepted;
- Confidence and Uncertainty models are accepted;
- Human Review Gateway is accepted;
- Failure, Fallback, and Resource Budget are accepted;
- Intelligence Audit Record and Intelligence Graph are accepted;
- interfaces with BRMF-201 through BRMF-210 are accepted;
- privacy, safety, fairness, learner-agency, and vendor-neutrality safeguards are
  accepted;
- commands, events, services, policies, authority boundaries, and invariants are
  accepted;
- no unresolved architectural contradiction remains.

---

## 57. Next Specification

The next recommended document is:

**BRMF-212 — Platform Integration, Bounded Context Coordination, and Application Services Domain Model**

It will define:

- Application Service;
- Use Case;
- Workflow;
- Process Manager;
- Saga;
- Cross-Context Command;
- Cross-Context Event;
- Context Contract;
- Anti-Corruption Layer;
- Read Model;
- Projection;
- Notification;
- Work Queue;
- Idempotency;
- Retry;
- Transaction Boundary;
- Consistency Model;
- Integration Policy;
- API Boundary;
- domain orchestration across BRMF-201 through BRMF-211.

---

**End of BRMF-211**
