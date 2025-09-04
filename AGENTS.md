# Agents Guideline

## General Instructions
- Apply this to Co-Pilot instructions.md
- Apply this to OpenAI Codex AGENTS.md
- Apply this to Claude Code CLAUDE.md

## Clean Code Guidelines
- Guard Clauses / Fail-Fast: Handle invalid or special cases early and return immediately.
- Use switch, pattern matching, strategy, or a lookup table for branching on one discriminator.
- Command–Query Separation (CQS): A function either returns data or causes effects, never both.

## JavaScript Guidelines
- Adopt [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Always use static, top-level ESM imports (import X from 'module'); do not use dynamic imports (import()) or require() inside functions or conditionals.
- Prefer function declarations to function expressions.

## Git
- Adopt trunk-based development.
- Before pushing to remote, run `git pull origin main`
- Adopt [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Do not add "Generated with [Claude Code](https://claude.ai/code)"

## Vendors
- Adopt design systems from the vendor folder
- Do not make changes to the vendor folder
