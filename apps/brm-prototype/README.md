# Business Research Mentor — Prototype

Local-first React prototype for the Business Research Mentor (BRM) product.

## Purpose

Guide a business-school student through one research decision at a time, preserving student ownership of ideas and justifications. BRM supports research thinking; it does not write dissertations or replace scholarly judgement.

## Current scope

- **Blueprint:** BP-001 — Choosing a Research Topic only
- **Nature:** Static, deterministic prototype (no live AI analysis)
- **Persistence:** Browser `localStorage` under the key `brm.prototype.v1`

## Not in BUILD-001

Authentication, backend services, AI integration, and additional decision blueprints are out of scope for this baseline.

## Prerequisites

- Node.js 24 LTS (`>=24 <25`)
- npm (bundled with Node)

## Commands

From this directory (`apps/brm-prototype`):

```sh
npm install
npm run dev
npm test
npm run build
```

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the Vite development server |
| `npm test` | Run Vitest once |
| `npm run build` | Typecheck and produce a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
