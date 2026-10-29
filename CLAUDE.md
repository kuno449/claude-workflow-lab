# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server with HMR
- `npm run build`: type-check (`tsc -b`) then production build to `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`; `dist/` ignored)
- `npm test`: Vitest, single run
- Single test file: `npx vitest run src/lib/pricing.test.ts`
- Single test by name: `npx vitest run -t "<test name>"`

Prettier is installed but has no config file or npm script. Run it with `npx prettier --write <file>` if needed.

## Architecture

React 19 + TypeScript + Vite project, started from the official Vite template. `src/App.tsx` is still the template's demo page, and `src/components/` is empty.

- **Domain logic** lives in `src/lib/` as pure functions with colocated `*.test.ts` Vitest tests. Vitest uses the default config inherited from `vite.config.ts`; there is no separate vitest config.
- `src/lib/pricing.ts`: `suggestPrice(price, marketPrice, daysListed)` suggests a reduced listing price. It moves the price toward `marketPrice` in proportion to how long the item has been listed (full reduction at 60 days), never goes below market, and rounds to the nearest 1000. It throws on non-positive prices.

## Conventions

- Test descriptions and error messages are written in Japanese. Keep that style.
- The TS config is strict about unused code (`noUnusedLocals`, `noUnusedParameters`) and uses `verbatimModuleSyntax`, so type-only imports need `import type`. `erasableSyntaxOnly` is on, so no `enum` or `namespace`.
- Path-scoped rules live in `.claude/rules/` (`lib.md` for `src/lib/`, `components.md` for `src/components/`). Read them before editing those areas.
