import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { argv, exit } from 'node:process';
import { object, parse, string } from 'valibot';

const isBump = argv[2] === '--bump';

if (isBump) {
	execSync('git checkout main');
	execSync('git fetch origin');
	execSync('git reset --hard origin/main');
}

const response = await fetch('https://registry.npmjs.org/sv/latest');
if (!response.ok) exit(1);

const pkg = parse(object({ version: string() }), await response.json());

rmSync('./javascript', { recursive: true, force: true });
rmSync('./typescript', { recursive: true, force: true });

const plugins = [
	'drizzle="database:sqlite+client:better-sqlite3"',
	'eslint',
	'prettier',
	'tailwindcss="plugins:forms"',
].join(' ');

const command = `pnpm dlx sv create --template minimal --add ${plugins} --install pnpm`;

execSync(`${command} --types jsdoc javascript `);
execSync(`${command} --types ts typescript`);

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/sv@[\d.]+\d/, //
		`sv@${pkg.version}`,
	),
);

if (isBump) {
	execSync('git add .');

	const command = `pnpm version ${pkg.version} -m "sv@${pkg.version}" --no-git-checks`;
	execSync(command, { stdio: 'inherit' });

	execSync('git push');
	execSync('git push --tags');
}
