# Business Research Mentor (Rmentor)

Business Research Mentor (BRM) helps students improve research thinking—clarifying problems, constraints, alternatives, and justifications—rather than generating dissertations or writing research on their behalf.

## Active prototype

The current runnable product slice lives at:

`apps/brm-prototype`

It implements BP-001 (Choosing a Research Topic) as a static, deterministic, local-first React prototype.

## Implementation documentation

Prototype architecture and build notes are under:

`implementation/BRMI/Volume_01_Prototype/`

## Running the prototype

Requires Node.js 24 LTS.

```sh
cd apps/brm-prototype
npm install
npm run dev
```

Tests and production build:

```sh
cd apps/brm-prototype
npm test
npm run build
```

See `apps/brm-prototype/README.md` for scope details and the localStorage persistence key.
