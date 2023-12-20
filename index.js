import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

execSync('git checkout .');
execSync('git pull');

const latestTag = execSync('git describe --tags --abbrev=0').toString().trim();

const pkg = (() => {
	const name = 'create-svelte';
	const version = execSync(`pnpm view ${name} version`).toString().trim();
	return { name, version, spec: `${name}@${version}` };
})();

if (latestTag === `v${pkg.version}`) throw new Error('New version not found.');

execSync(`pnpm add ${pkg.spec} --workspace-root`);

// Reference https://github.com/sveltejs/kit/tree/main/packages/create-svelte#readme

/**
 * @param {'checkjs' | 'typescript'} type
 * @returns svelte-create Options
 */
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

rmSync('javascript', { recursive: true, force: true });
rmSync('typescript', { recursive: true, force: true });

const { create } = await import('create-svelte');

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
		pkg.spec
	)
);

try {
	execSync('git add .');
	execSync(`git commit -m "${pkg.spec}"`);
	execSync('git push origin');
	execSync(`git tag v${pkg.version}`);
	execSync(`git push origin v${pkg.version}`);
} catch {
	console.log('git operations failed.');
}
