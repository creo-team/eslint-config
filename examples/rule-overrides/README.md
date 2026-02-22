# Rule override examples

Examples of customizing `@creo-team/eslint-config` by overriding rules. All use constants from `@creo-team/eslint-config/constants` — no magic strings.

## naming-convention

Override `@typescript-eslint/naming-convention` to allow `UPPER_SNAKE` for variables (e.g. constants). Uses `namingConvention.withUpperCaseVariables` and `FilesPattern.TsAndTsx`.

```bash
cd naming-convention
npm install
npm run lint
```

## kebab-files

Enforce kebab-case filenames for `.ts` / `.tsx` using `eslint-plugin-unicorn`. Uses `FilenameCase.KebabCase` and `FilesPattern.TsAndTsx`.

```bash
cd kebab-files
npm install
npm run lint
```

Files must be named like `user-service.ts`, not `userService.ts` or `UserService.ts`.
