import { create } from 'create-svelte';
import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

execSync('git checkout .');
execSync('git pull');

const pkg = (() => {
	const name = 'create-svelte';
	const version = execSync(`pnpm view ${name} version`).toString().trim();
	return { name, version, spec: `${name}@${version}` };
})();

execSync(`pnpm add ${pkg.spec} --workspace-root`);

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
	execSync(`git commit -m "chore: use ${pkg.spec}"`);
	execSync(`git tag v${pkg.version}`);
} catch {
	console.log('git operations failed.');
}
