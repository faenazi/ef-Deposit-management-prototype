# EF Deposit Management Prototype

High-fidelity interactive prototype for the Environment Fund Investment Deposit Management Platform.

## Purpose

This repository is used to validate the business process, user experience, roles, approvals, and deposit lifecycle before production development.

The prototype is Arabic-first, RTL, enterprise-focused, and uses realistic mock data only.

## Repository Structure

- `docs/` — product, business, functional, UI/UX, data, and quality documentation.
- `prompts/` — small execution prompts for Claude Code, organized by delivery stage.
- `assets/brand/` — Environment Fund visual identity reference assets.
- `src/` — frontend application root. It will be created only after the documentation baseline is approved.

## Current Phase

Documentation and prototype planning.

Do not add deployment configuration, CI/CD, Docker, Vercel, backend services, databases, or real integrations during this phase.

## Planned Frontend Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Feature-based architecture
- Local mock services and deterministic mock data

## Local Frontend Execution

After the frontend is initialized:

```bash
cd src
npm install
npm run dev
```

## Source of Truth

- `CLAUDE.md` contains mandatory delivery and design rules.
- `docs/00-index.md` defines the documentation map.
- `prompts/README.md` defines how Claude Code prompts must be executed.
