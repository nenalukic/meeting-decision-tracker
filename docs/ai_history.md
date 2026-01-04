# AI Development Log & MCP Workflow

This document tracks AI-assisted development, MCP-style contracts, and key architectural decisions.

## AI-Assisted Development

### Tools & Workflow

1. **ChatGPT + GitHub Copilot**: Primary AI assistants for code generation, debugging, and architectural guidance
2. **MCP (Model Context Protocol)**: Shared contracts using OpenAPI specifications to ensure backend/frontend alignment
3. **Code Generation from Contracts**: Frontend models auto-generated from OpenAPI schema using `openapi-typescript-codegen`

### Development Process

The project follows an AI-augmented development workflow:

1. **Define Contract First**: Write OpenAPI specification in `api/openapi.yaml`
2. **Generate Code**: Use `openapi-typescript-codegen` to generate TypeScript models and service classes
3. **Implement Backend**: FastAPI automatically validates against OpenAPI spec
4. **Implement Frontend**: TypeScript models ensure type safety across API boundaries
5. **Test & Iterate**: Run tests, commit with clear messages

### MCP-Style Shared Contracts

- **OpenAPI Specification** (`api/openapi.yaml`): Single source of truth for API contract
- **Generated Models**: Frontend models automatically sync with backend via codegen
- **Type Safety**: TypeScript strict mode ensures frontend-backend type alignment
- **Schema Validation**: FastAPI Pydantic models match OpenAPI request/response schemas

### Key Design Decisions (AI-Informed)

1. **FastAPI**: Chose for automatic OpenAPI generation and validation
2. **TypeScript Codegen**: Eliminated manual API client maintenance
3. **Centralized Client**: All API calls go through generated service classes (no scattered fetch calls)
4. **SQLAlchemy ORM**: Database models stay synchronized with Pydantic schemas
5. **Docker Compose**: Simplified local development with realistic DB setup

### Benefits of This Approach

- ✅ Backend and frontend always in sync via OpenAPI contract
- ✅ Type-safe API calls across all services
- ✅ No manual API client updates needed
- ✅ Automatic validation of requests/responses
- ✅ Clear audit trail of changes via OpenAPI
