# Rule override examples

Examples of customizing `@creo-team/eslint-config` by overriding rules.

## naming-convention

Override `@typescript-eslint/naming-convention` to allow `UPPER_SNAKE` for variables (e.g. constants).

```bash
cd naming-convention
npm install
npm run lint
```

## kebab-files

Enforce kebab-case filenames for `.ts` / `.tsx` using `eslint-plugin-unicorn`.

```bash
cd kebab-files
npm install
npm run lint
```

Files must be named like `user-service.ts`, not `userService.ts` or `UserService.ts`.
