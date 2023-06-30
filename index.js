import { create } from 'create-svelte';
import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

execSync('git checkout .');
execSync('git pull');

// The default version is "latest" if unspecified.
// https://docs.npmjs.com/cli/v9/commands/npm-view
const version = execSync('npm view create-svelte version').toString().trim();
const pkg = `create-svelte@${version}`;

console.log(pkg);
execSync(`npm install ${pkg}`);

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

execSync('npm install', { stdio: 'inherit' });
execSync('npm update', { stdio: 'inherit' });

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
