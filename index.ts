import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
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

rmSync('./javascript', { recursive: true, force: true });
rmSync('./typescript', { recursive: true, force: true });

const plugins = [
	'drizzle="database:sqlite+client:better-sqlite3"',
	'eslint',
	'prettier',
	'tailwindcss="plugins:forms"',
];

const commands = {
	create: `pnpm dlx sv create --template minimal --add ${plugins.join(' ')} --install pnpm`,
	version: `pnpm version ${remote.version} -m "sv@${remote.version}" --no-git-checks`,
};

execSync(`${commands.create} --types jsdoc javascript`);
execSync(`${commands.create} --types ts typescript`);

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/sv@[\d.]+\d/, //
		`sv@${remote.version}`,
	),
);

if (!noGit) {
	execSync('git add .');
	execSync(commands.version, { stdio: 'inherit' });
	execSync('git push');
	execSync('git push --tags');
}
