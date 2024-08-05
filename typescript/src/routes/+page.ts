import { module } from './module';

module;

// FIXME ts(2550) error is shown in VS Code, but not in svelte-check.
// NOTE svelte.svelte-vscode@108.6.0 extension is installed.
[].at(-1); // Property 'at' does not exist on type 'never[]'.
