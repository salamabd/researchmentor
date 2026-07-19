# ABR-003 --- Post BUILD-005 Diagnostic Architecture Baseline

**Project:** Business Research Mentor\
**Component:** BRM Prototype\
**Review ID:** ABR-003\
**Baseline:** Post BRMI-BUILD-005\
**Status:** Approved Architecture Baseline\
**Date:** 2026-07-19\
**Baseline Commit:** `87f9d76`\
**Previous Baseline:** ABR-002

------------------------------------------------------------------------

## Purpose

This Architecture Baseline Review (ABR-003) establishes the post
BUILD-005 architectural baseline for the BRM Prototype. It freezes the
architecture following introduction of Blueprint-aware session
diagnostics and confirms that diagnostics are observational,
deterministic, and non-destructive.

## Executive Assessment

The architecture remains layered and coherent:

-   React presentation layer
-   Zustand as a thin UI adapter
-   BlueprintExecutionService as application orchestrator
-   SessionService + BlueprintRegistry
-   Domain model
-   Repository abstraction
-   LocalStorage adapter

BUILD-005 introduced:

-   Pure diagnostic evaluation
-   Stable diagnostic codes
-   Severity model
-   On-demand evaluation
-   Preservation of student work
-   Minimal UI banner

It intentionally did **not** introduce:

-   Recovery engine
-   Migration engine
-   Blueprint versioning
-   Persisted diagnostics
-   Decision Record redesign

------------------------------------------------------------------------

# Accepted Architecture

``` text
React Pages / Components
        ↓
Zustand UI Adapter
        ↓
BlueprintExecutionService
        ↓
SessionService + BlueprintRegistry
        ↓
Domain + Repository Port
        ↓
LocalStorage Adapter
```

Diagnostic execution path:

``` text
Layout
 ↓
getSessionDiagnostics()
 ↓
BlueprintExecutionService
 ↓
evaluateSessionDiagnostics(session, blueprint)
 ↓
SessionDiagnosticsReport
```

------------------------------------------------------------------------

# Diagnostic Principles

The evaluator is:

-   Pure
-   Deterministic
-   Non-mutating
-   Synchronous
-   Storage-independent
-   React-independent
-   Zustand-independent

Diagnostics are observations only.

No diagnostic evaluation may:

-   save the repository
-   delete answers
-   repair decisions
-   migrate sessions
-   rewrite Blueprint identifiers

------------------------------------------------------------------------

# Approved Diagnostic Codes

-   SESSION_BLUEPRINT_WHITESPACE
-   ANSWER_QUESTION_UNKNOWN
-   ANSWER_QUESTION_DUPLICATE
-   CURRENT_INDEX_BELOW_RANGE
-   CURRENT_INDEX_ABOVE_RANGE
-   DECISION_ALTERNATIVE_UNKNOWN
-   COMPLETED_WITHOUT_DECISION

Unknown active Blueprints remain exceptions rather than diagnostics.

------------------------------------------------------------------------

# Severity Policy

Warnings indicate recoverable inconsistencies.

Errors indicate material inconsistencies that must remain visible but
must not automatically destroy student work.

No fatal severity exists.

------------------------------------------------------------------------

# Architectural Boundaries

## Presentation

Responsible only for displaying reports.

## Zustand

Delegates only.

## BlueprintExecutionService

Coordinates evaluation.

## Evaluator

Produces diagnostics.

## Repository

Persists data only.

## Domain

Contains domain behaviour only.

------------------------------------------------------------------------

# Student Work Preservation

The following rules are frozen:

1.  Unknown answers remain.
2.  Duplicate answers remain.
3.  Invalid stored decisions remain.
4.  Diagnostics never persist changes.
5.  Diagnostics never delete information.
6.  Recovery is separate from detection.

------------------------------------------------------------------------

# Persistence

Storage key remains:

`brm.prototype.v1`

No schema changes.

No Blueprint version field.

No persisted diagnostics.

------------------------------------------------------------------------

# Decision Record

Decision Record remains unchanged.

Filename:

`BRM_BP-001_Decision_Record.json`

Diagnostics are not exported.

------------------------------------------------------------------------

# Regression Baseline

-   61 automated tests passing
-   Production build successful
-   Working tree clean
-   Commit baseline: `87f9d76`

------------------------------------------------------------------------

# Risks

Primary architectural risks:

-   Diagnostics evolving into automatic migration
-   Student-data loss
-   Zustand responsibility drift
-   Persisted stale diagnostics

These remain prohibited without a new BUILD specification and
Architecture Baseline Review.

------------------------------------------------------------------------

# Architectural Freeze

The following are frozen:

-   Blueprint-aware diagnostics
-   Pure evaluator
-   On-demand evaluation
-   Zustand delegation
-   No persisted diagnostics
-   No automatic repair
-   Student-work preservation
-   Decision Record compatibility
-   LocalStorage compatibility

------------------------------------------------------------------------

# Deferred Scope

Deferred until future BUILD specifications:

-   Recovery wizard
-   Migration engine
-   Blueprint versioning
-   Answer remapping
-   Persisted diagnostics
-   Cloud storage
-   Authentication
-   AI mentoring workflows
-   Supervisor dashboard
-   Program Director dashboard

------------------------------------------------------------------------

# Recommendation

The next implementation phase should focus on educational workflow and
mentoring capability rather than expanding infrastructure. The current
diagnostic architecture is sufficient to support future educational
features while protecting student work.

------------------------------------------------------------------------

# Baseline Declaration

Commit:

`87f9d76 BRMI-BUILD-005 Add blueprint-aware session diagnostics`

is accepted as:

**ABR-003 --- Post BUILD-005 Diagnostic Architecture Baseline**

Status: **Approved and Frozen**