# Agent Guidelines for fullstack-workspaces-starter

## Build/Lint/Test Commands

### Build Commands

- `yarn build` - Build all packages (common → api + web)
- `yarn build:common` - Build shared common package
- `yarn build:api` - Build NestJS API
- `yarn build:web` - Build React web app

### Lint Commands

- `yarn lint` - Lint all packages
- `yarn lint:fix` - Lint and auto-fix all packages

### Test Commands

- `yarn test:common` - Run common package tests (Vitest)
- `yarn test:api` - Run API tests (Jest)
- `yarn test:web` - Run web tests (Vitest)
- `yarn e2e:api` - Run API e2e tests
- `yarn e2e:web` - Run web e2e tests

### Single Test Execution

- API (Jest): `yarn workspace @app/api run test -- <path/to/test.spec.ts>`
- Web/Common (Vitest): `yarn workspace @app/web run test <path/to/test.test.ts>`

## Code Style Guidelines

### TypeScript

- Strict typing enabled
- Explicit return types on all functions
- Use `type` for interfaces, `interface` for object shapes
- Prefer `const` assertions for literals

### Formatting (Prettier)

- Semicolons: enabled
- Quotes: single
- Trailing commas: all
- Print width: 80 characters
- Tab width: 2 spaces
- Indent: spaces (no tabs)

### Imports (simple-import-sort)

- Node.js built-ins first (`^node:`)
- External packages (`^[^./]`)
- Internal packages (`^@app`)
- Relative imports (`^../`, `^./`)
- Type-only imports last

### Naming Conventions

- Files: kebab-case (`hello.controller.ts`)
- Classes/Components: PascalCase (`HelloController`, `App`)
- Variables/Functions: camelCase (`helloService`, `getHello`)
- Constants: UPPER_SNAKE_CASE
- Directories: kebab-case

### Documentation

- JSDoc comments for classes, methods, and parameters
- Describe purpose, parameters, and return values
- Use markdown in JSDoc for formatting

### Error Handling

- Use try-catch blocks for async operations
- Custom exceptions in API (`ValidationException`)
- Proper HTTP status codes and error responses

### React Specific

- Functional components with hooks
- TypeScript interfaces for props
- CSS Modules for styling (`.module.scss`)
- Utility functions for class names

### Testing

- Jest for API (unit + e2e)
- Vitest for web/common (unit)
- Playwright for web e2e
- Test files: `.spec.ts` (API), `.test.ts` (web/common)
- Coverage excludes: index files, config, health modules
