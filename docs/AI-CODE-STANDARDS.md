# AI Code Standards

Guidelines for AI coding assistants (Claude, Cursor, Copilot) generating code in projects that use `@creo-team/eslint-config`.

## Rules That Catch Common AI Mistakes

| Rule | What AI tends to do wrong |
|------|--------------------------|
| `no-console: warn` | AI leaves `console.log` debug statements |
| `no-await-in-loop: warn` | AI writes sequential awaits instead of `Promise.all()` |
| `no-promise-executor-return: error` | AI returns values from Promise executors |
| `@typescript-eslint/no-explicit-any: warn` | AI uses `any` as a shortcut |
| `@typescript-eslint/no-unnecessary-condition: warn` | AI generates redundant null checks |
| `complexity (max 15)` | AI generates deeply nested conditionals |
| `max-lines-per-function (200)` | AI generates monolithic functions |
| `no-magic-numbers: warn` | AI uses raw literals (200, 404, 1000) |
| `import/no-duplicates` | AI adds duplicate import lines |
| `@typescript-eslint/consistent-type-imports` | AI mixes value and type imports |

## Patterns to Follow

### Use named constants, not magic numbers

```typescript
// bad — AI default
if (response.status === 200) { ... }
setTimeout(callback, 5000)

// good
const STATUS_OK = 200
const TIMEOUT_MS = 5000
if (response.status === STATUS_OK) { ... }
setTimeout(callback, TIMEOUT_MS)
```

### Use Promise.all for independent async operations

```typescript
// bad — sequential when operations are independent
for (const id of ids) {
    await processItem(id)
}

// good
await Promise.all(ids.map((id) => processItem(id)))
```

### Use consistent type imports

```typescript
// bad — AI mixes value and type imports
import { MyType, myFunction } from './module'

// good
import type { MyType } from './module'
import { myFunction } from './module'
```

### JSDoc on function declarations

```typescript
// Arrow functions don't need JSDoc
const double = (n: number) => n * 2

// Function declarations need JSDoc
/**
 * Doubles a number.
 *
 * @param n - The number to double.
 * @returns The doubled value.
 */
function double(n: number): number {
    return n * 2
}
```

### Naming conventions

```typescript
// variables and functions: camelCase
const userName = 'alice'
function getUser() { ... }

// types and interfaces: PascalCase
interface UserProfile { ... }
type SessionState = 'active' | 'expired'

// enum members: PascalCase
enum SessionType {
    Engagement = 'ENGAGEMENT',
    Family = 'FAMILY',
}

// imports: camelCase or PascalCase
import { createConfig } from '@creo-team/eslint-config'
import type { UserProfile } from './types'
```

## Suppression Etiquette

When AI generates code that triggers a lint rule, fix the code rather than adding a suppression. Only suppress when the violation is intentional and documented:

```typescript
// eslint-disable-next-line no-console -- CLI tool, console is the interface
console.log(result)
```

Never generate bare `// eslint-disable` without a rule name and reason.

## Running Lint

AI assistants should lint after generating code:

```bash
npm run lint        # check
npm run fix         # auto-fix
```

Use the [ESLint MCP server](https://eslint.org/docs/latest/use/mcp) for real-time feedback in Cursor or Claude.
