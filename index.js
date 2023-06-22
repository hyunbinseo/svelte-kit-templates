import { create } from 'create-svelte';
import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

execSync('git checkout .');
execSync('git pull');
execSync('npm i create-svelte@latest');

const version = execSync('npm info create-svelte version').toString().trim();

const common = {
	name: 'svelte-kit',
	template: 'skeleton',
	prettier: true,
};

rmSync('javascript', { recursive: true, force: true });
rmSync('typescript', { recursive: true, force: true });

await create('javascript', { types: 'checkjs', ...common });
await create('typescript', { types: 'typescript', ...common });

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
