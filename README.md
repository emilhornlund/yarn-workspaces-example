# 🧶 Fullstack Workspaces Starter

A modern, production-ready fullstack monorepo starter template featuring **NestJS (backend)**, **Vite + React (frontend)**, and a **shared TypeScript library** — all managed with **Yarn Workspaces**.

This starter provides a solid foundation for building scalable fullstack applications with best practices for development, testing, and deployment.

---

## ✨ Features

- 🟢 **Node.js 22** with modern JavaScript/TypeScript
- 🧵 **Yarn Workspaces** monorepo setup for efficient dependency management
- ⚙️ **NestJS** backend with REST API, validation, and error handling
- ⚛️ **React 19 + Vite** frontend with hot module replacement
- 📦 **Shared TypeScript library** for type-safe cross-package communication
- 🧪 **Comprehensive testing** with Jest, Vitest, and Playwright
- 🧹 **Code quality** with ESLint, Prettier, and TypeScript strict mode
- 🐳 **Docker support** for containerized development and deployment
- 🚀 **GitHub Actions CI/CD** workflow (planned)
- 📚 **API documentation** with Swagger/OpenAPI

---

## ⚡ Quick Start

### 🧰 Prerequisites

- **Node.js** ≥ 22 (check with `node --version`)
- **Yarn Classic (v1)** (check with `yarn --version`)
- **Git** for version control

### 🏁 Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:emilhornlund/fullstack-workspaces-starter.git
   cd fullstack-workspaces-starter
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development servers**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:3001/api](http://localhost:3001)
   - API Docs: [http://localhost:3001/api_docs](http://localhost:3001/api)

---

## 🔧 Environment Setup

### Docker Setup

For containerized development:

```bash
# Start all services
docker-compose up

# Or build and run specific services
docker-compose up api web
```

---

## 📜 Root Commands

| Command             | Description                                              |
|---------------------|----------------------------------------------------------|
| `yarn build`        | Build all packages (common → API → web).                 |
| `yarn build:common` | Build only the shared library.                           |
| `yarn build:api`    | Build only the NestJS backend.                           |
| `yarn build:web`    | Build only the Vite frontend.                            |
| `yarn dev`          | Run both the API and web app concurrently in watch mode. |
| `yarn dev:api`      | Run only the API in dev mode.                            |
| `yarn dev:web`      | Run only the web app in dev mode.                        |
| `yarn lint`         | Lint all packages concurrently.                          |
| `yarn lint:fix`     | Fix lint issues across all packages.                     |
| `yarn test:*`       | Run unit tests for the respective package.               |
| `yarn e2e:*`        | Run end-to-end tests for the respective package.         |
| `yarn clean`        | Clean all build outputs.                                 |

---

## 📦 Packages

### [`@app/common`](./packages/common)

Shared TypeScript library containing common models, utilities, and constants used by both API and frontend.

- Built with **tsup**
- Tested with **Vitest**

---

### [`@app/api`](./packages/api)

Backend service built with **NestJS**.

- Uses **Jest** for unit and e2e tests
- Supports hot-reload during development (`nest start --watch`)
- Depends on `@app/common`

Run it individually:

```bash
yarn dev:api
```

---

### [`@app/web`](./packages/web)

Frontend app built with **Vite** + **React 19**.

- TypeScript support out of the box
- Integrated ESLint and Prettier
- Uses **Playwright** for end-to-end testing

Run it individually:

```bash
yarn dev:web
```

#### 🧪 Playwright Setup

Before running E2E tests for the web app, install dependencies:

```bash
yarn workspace @app/web playwright install --with-deps
```

---

## 📚 API Documentation

The API includes built-in Swagger documentation accessible at `/api_docs` when running in development mode.

### Available Endpoints

- `GET /health` - Health check endpoint
- `GET /api/hello` - Greeting endpoint with optional name parameter
- `GET /api_docs` - Interactive API documentation

### Example API Usage

```bash
# Health check
curl http://localhost:3001/health

# Greeting
curl http://localhost:3001/api/hello
curl http://localhost:3001/api/hello?name=World
```

---

## 🚀 Development Workflow

### Daily Development

1. **Start development servers:**

   ```bash
   yarn dev
   ```

2. **Run tests in watch mode:**

   ```bash
   # API tests
   yarn workspace @app/api run test:watch

   # Web tests
   yarn workspace @app/web run test:watch
   ```

3. **Lint and format code:**
   ```bash
   yarn lint:fix
   ```

### Adding New Features

1. **Update shared types in `@app/common`** first if needed
2. **Implement API endpoints** in `@app/api`
3. **Create frontend components** in `@app/web`
4. **Add comprehensive tests** for all changes
5. **Update documentation** as needed

### Code Quality Checks

Run the verification script to ensure everything works:

```bash
./scripts/verify.sh
```

This script runs: clean → lint → build → test → e2e

---

## 🧪 Testing

Each package provides its own testing setup:

- **@app/common:** Vitest for unit tests
- **@app/api:** Jest for unit tests + Supertest for integration tests
- **@app/web:** Vitest for unit tests + Playwright for E2E tests

### Running Tests

```bash
# Run all tests
yarn test:common && yarn test:api && yarn test:web

# Run tests with coverage
yarn test:common:cov && yarn test:api:cov && yarn test:web:cov

# Run E2E tests
yarn e2e:api && yarn e2e:web

# Run single test file
yarn workspace @app/api run test -- src/modules/hello/hello.controller.spec.ts
```

### Test Coverage

Coverage reports are generated in each package's `coverage/` and or `coverage-e2e/` directories.

---

## 🔧 Troubleshooting

### Common Issues

**Port conflicts:**

- API runs on port 3001, web on port 3000
- Check if ports are available: `lsof -i :3000` and `lsof -i :3001`

**Build failures:**

- Clear node_modules: `yarn clean && yarn install`
- Check Node.js version: `node --version` (should be ≥ 22)

**Test failures:**

- Ensure all dependencies are installed
- Check environment variables are set correctly
- For E2E tests, ensure servers are running

**Docker issues:**

- Clean Docker cache: `docker system prune`

### Getting Help

- Check existing issues on GitHub
- Review the API documentation at `/api`
- Run tests to verify functionality
- Check logs for detailed error messages

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/your-feature-name`
3. **Make your changes** and ensure tests pass
4. **Run the verification script:** `./scripts/verify.sh`
5. **Commit your changes** with descriptive commit messages
6. **Push to your branch** and create a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint and Prettier)
- Add tests for new features
- Update documentation as needed
- Ensure all CI checks pass
- Use conventional commit messages

### Commit Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

---

## 🧹 Cleaning

Remove all build artifacts:

```bash
yarn clean
```

---

## 📜 License

MIT © [Emil Hörnlund](mailto:emil.hornlund@me.com)

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) — Progressive Node.js framework
- [React](https://reactjs.org/) — JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) — Next generation frontend tooling
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces) — Monorepo management

---

_This repository serves as a comprehensive starter template for modern full-stack development in a monorepo environment using Yarn Workspaces._
