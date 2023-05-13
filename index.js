import { create } from 'create-svelte';
import { readFileSync, writeFileSync } from 'node:fs';
import lockFile from './package-lock.json' assert { type: 'json' };

const common = {
	name: 'svelte-kit',
	template: 'skeleton',
	prettier: true,
};

await create('javascript', { types: 'checkjs', ...common });
await create('typescript', { types: 'typescript', ...common });

const version = lockFile.packages['node_modules/create-svelte'].version;
const readme = readFileSync('README.md', { encoding: 'utf-8' });

writeFileSync(
	'README.md',
	readme.replace(/create-svelte@[\d\.]+\d/, `create-svelte@${version}`)
);

console.log(`\ngit add . && git commit -m "create-svelte@${version}"\n`);
