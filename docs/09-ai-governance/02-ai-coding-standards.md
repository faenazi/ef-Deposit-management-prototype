# AI Coding Standards

## 1. Scope

These standards apply to the React, TypeScript, Vite, and Tailwind prototype under `src/`.

## 2. Architecture

Use a feature-based frontend architecture. Business features must not be organized as one large shared components folder.

Canonical structure (Decision DEC-014): `src/` is the application root and contains the nested Vite source directory:

```text
src/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig*.json
├── public/
│   └── brand/
└── src/
    ├── app/
    ├── styles/
    ├── lib/
    ├── domain/
    ├── mock-data/
    ├── services/
    ├── hooks/
    ├── components/
    ├── layouts/
    └── features/
```

Use `domain/`, not a competing top-level `types/` folder, for business entities and rules. Use `mock-data/`, not `mocks/`, for fixtures and generators. Routing configuration lives under `app/`.

Each feature may contain its own components, types, data, hooks, and utilities when they are feature-specific.

## 3. TypeScript

- Use strict TypeScript.
- Avoid `any`.
- Define domain types explicitly.
- Prefer discriminated unions for workflow and UI states.
- Keep mock data aligned with domain types.
- Do not silence type errors with unsafe casting.

## 4. React

- Use functional components.
- Keep page components focused on composition.
- Extract reusable components only when reuse or complexity justifies it.
- Avoid premature abstraction.
- Keep business display logic close to its feature.
- Do not place all application state in one global store.
- No backend, API, authentication, or server-state library is required for this prototype unless explicitly approved.
- Prototype state is in-memory with deterministic seeded initial data (Decision DEC-019). Reloading resets to the initial dataset. Do not use localStorage, IndexedDB, a backend, or a database. Provide an explicit `إعادة ضبط البيانات التجريبية` action for administrators.

## 5. Styling

- Tailwind is the primary styling approach.
- Centralize design tokens and reusable visual rules.
- Do not scatter raw brand HEX values throughout components.
- Avoid arbitrary values when a token or shared scale can be used.
- Maintain logical RTL properties and test direction-sensitive layouts.
- Do not add a UI framework that imposes a conflicting visual identity.

## 6. Components

Shared components must be:

- accessible;
- keyboard usable;
- visually consistent;
- responsive;
- typed;
- documented through clear props and naming.

Required reusable families include, where applicable:

- page headers;
- status badges;
- financial value displays;
- workflow steps;
- data tables;
- filters;
- empty states;
- dialogs and drawers;
- file attachment rows;
- timeline entries;
- KPI summaries.

## 7. Accessibility

- Use semantic HTML.
- Associate labels with inputs.
- Preserve visible focus.
- Do not rely on color alone.
- Support keyboard navigation.
- Use appropriate ARIA attributes only when native semantics are insufficient.
- Ensure dialogs and drawers manage focus correctly.

## 8. Quality

The codebase must have:

- no TypeScript errors;
- no lint errors;
- no broken imports;
- no unused code;
- no unexplained TODOs;
- no console errors;
- no duplicated large mock datasets;
- no dead routes;
- no placeholder screens presented as complete.

## 9. File naming

- Components: `PascalCase.tsx`
- Hooks: `useSomething.ts`
- Utilities: `camelCase.ts`
- Types: descriptive names, not generic `Data` or `Item`
- Feature folders: lowercase kebab-case

## 10. Change discipline

For each task:

1. Inspect existing patterns.
2. Identify affected files.
3. Make the smallest coherent change.
4. Run validation.
5. Report what changed and any remaining limitations.

Do not rewrite unrelated areas merely to make the code look different.
