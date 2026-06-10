import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { argv, exit } from 'node:process';
import { object, parse, string } from 'valibot';
import local from './package.json' with { type: 'json' };

const noGit = argv[2] === '--no-git';

if (!noGit) {
	execSync('git checkout main');
	execSync('git fetch origin');
	execSync('git reset --hard origin/main');
}

const response = await fetch('https://registry.npmjs.org/sv/latest');
if (!response.ok) exit(1);

const remote = parse(object({ version: string() }), await response.json());

if (!noGit && local.version === remote.version) {
	console.log(`Already at sv@${remote.version}`);
	exit(0);
}

execSync(`pnpm add -D sv@${remote.version}`);
const sv = await import('sv');

for (const lang of ['javascript', 'typescript'] as const) {
	const cwd = resolve(import.meta.dirname, lang);
	rmSync(cwd, { recursive: true, force: true });

	sv.create({
		cwd,
		name: lang,
		template: 'minimal',
		types: {
			javascript: 'checkjs' as const,
			typescript: 'typescript' as const,
		}[lang],
	});

	await sv.add({
		cwd,
		addons: {
			drizzle: sv.officialAddons.drizzle,
			eslint: sv.officialAddons.eslint,
			prettier: sv.officialAddons.prettier,
			tailwindcss: sv.officialAddons.tailwindcss,
		},
		options: {
			drizzle: { database: 'sqlite', client: 'better-sqlite3' },
			eslint: {},
			prettier: {},
			tailwindcss: { plugins: ['forms'] },
		},
		packageManager: 'pnpm',
	});
}

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/sv@[\d.]+\d/, //
		`sv@${remote.version}`,
	),
);

if (!noGit) {
	execSync('git add .');
	const command = `pnpm version ${remote.version} -m "sv@${remote.version}" --no-git-checks`;
	execSync(command, { stdio: 'inherit' });
	execSync('git push');
	execSync('git push --tags');
}
