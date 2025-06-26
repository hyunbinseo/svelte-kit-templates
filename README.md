[SvelteKit] templates generated using the `sv@0.8.15` package. [Changelog]

[SvelteKit]: https://svelte.dev/
[Changelog]: https://github.com/sveltejs/cli/blob/main/packages/cli/CHANGELOG.md

## Project Structure

```
├── javascript ← template using JavaScript with JSDoc comments
└── typescript ← template using TypeScript syntax
```

## Open in StackBlitz

- [TypeScript syntax](https://stackblitz.com/github/hyunbinseo/svelte-kit-templates/tree/main/typescript?title=SvelteKit-TypeScript)
- [JavaScript with JSDoc comments](https://stackblitz.com/github/hyunbinseo/svelte-kit-templates/tree/main/javascript?title=SvelteKit-JSDoc)

To use a specific version, replace the `/main` part with a valid [tag] name.

[tag]: https://github.com/hyunbinseo/svelte-kit-templates/tags

```diff
- https://stackblitz.com/github/hyunbinseo/svelte-kit-templates/tree/main/typescript
+ https://stackblitz.com/github/hyunbinseo/svelte-kit-templates/tree/v0.6.9/typescript
```

## Presets

```shell
sv create --template minimal --types jsdoc
sv create --template minimal --types ts
sv add eslint prettier
```

## Comparison

The [kit-template-default] repository does not provide a TypeScript template.

[kit-template-default]: https://github.com/sveltejs/kit-template-default
