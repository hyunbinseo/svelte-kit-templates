import { create } from 'create-svelte';
import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

execSync('git checkout .');
execSync('git pull');
execSync('npm i create-svelte@latest');

const version = execSync('npm info create-svelte version').toString().trim();

// Reference https://github.com/sveltejs/kit/tree/master/packages/create-svelte#readme

/**
 * @param {'checkjs' | 'typescript'} type
 * @returns svelte-create Options
 */
const generateOptions = (type) => ({
	types: type,
	name: `svelte-kit-${type}`,
	template: 'skeleton', // or 'default' or 'skeletonlib'
	prettier: true,
	eslint: true,
	playwright: false,
	vitest: false,
});

rmSync('javascript', { recursive: true, force: true });
rmSync('typescript', { recursive: true, force: true });

await create('javascript', generateOptions('checkjs'));
await create('typescript', generateOptions('typescript'));

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/create-svelte@[\d\.]+\d/,
		`create-svelte@${version}`
	)
);

try {
	execSync('git add .');
	execSync(`git commit -m "chore: use create-svelte@${version}"`);
	execSync(`git tag v${version}`);
} catch {
	console.log('git operations failed.');
}
