import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

/** @param {'checkjs' | 'typescript'} type */
const generateOptions = (type) =>
	/** @type {const} */ ({
		types: type,
		name: `svelte-kit-${type}`,
		template: 'skeleton', // or 'default' or 'skeletonlib'
		prettier: true,
		eslint: true,
		playwright: false,
		vitest: false,
	});

const bump = process.env.npm_lifecycle_event === 'bump';

if (bump) {
	execSync('git checkout main');
	execSync('git fetch origin');
	execSync('git reset --hard origin/main');
}

execSync(`pnpm add create-svelte@latest --workspace-root`, { stdio: 'inherit' });

const { version } = JSON.parse(readFileSync('node_modules/create-svelte/package.json', 'utf8'));
const { create } = await import('create-svelte');

rmSync('javascript', { recursive: true, force: true });
rmSync('typescript', { recursive: true, force: true });

await create('javascript', generateOptions('checkjs'));
await create('typescript', generateOptions('typescript'));

// Inside a workspace, pnpm install installs all dependencies in all the projects.
execSync('pnpm install', { stdio: 'inherit' });

// Concurrently runs update in all subdirectories with a package.json
execSync('pnpm update --recursive', { stdio: 'inherit' });

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/create-svelte@[\d\.]+\d/,
		`create-svelte@${version}`
	)
);

if (bump) {
	execSync('git add .');
	execSync(`pnpm version ${version} -m "create-svelte@${version}" --force`, { stdio: 'inherit' });
	execSync('git push');
	execSync('git push --tags');
}
