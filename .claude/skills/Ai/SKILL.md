```markdown
# Ai Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches best practices for developing TypeScript applications using the Vite framework, as observed in the `Ai` repository. It covers coding conventions, commit patterns, and testing strategies to ensure consistency and maintainability in your codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `myComponent.ts`, `userService.ts`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```typescript
    import { fetchData } from './apiClient';
    ```

### Export Style
- Use a **mixed export style** (both named and default exports are present).
  - Example:
    ```typescript
    // Named export
    export function calculateSum(a: number, b: number): number {
      return a + b;
    }

    // Default export
    export default class UserService { /* ... */ }
    ```

### Commit Patterns
- Follow the **Conventional Commits** specification.
- Use the `feat` prefix for new features.
- Commit messages are concise, averaging 63 characters.
  - Example:
    ```
    feat: add user authentication middleware
    ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- Test files follow the `*.test.*` naming pattern.
  - Example: `userService.test.ts`
- The testing framework is **unknown**; ensure to check project dependencies or documentation for specifics.
- Example test file structure:
  ```typescript
  // userService.test.ts
  import { getUser } from './userService';

  test('should fetch user by ID', () => {
    const user = getUser(1);
    expect(user.id).toBe(1);
  });
  ```

## Commands
| Command      | Purpose                                  |
|--------------|------------------------------------------|
| /new-feature | Scaffold a new feature with conventions  |
| /run-tests   | Run all test files matching *.test.*     |
| /commit      | Create a commit using conventional style |
```