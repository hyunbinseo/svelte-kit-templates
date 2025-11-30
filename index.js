import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { argv, exit } from 'node:process';

const isBump = argv[2] === '--bump';

if (isBump) {
	execSync('git checkout main');
	execSync('git fetch origin');
	execSync('git reset --hard origin/main');
}

const response = await fetch('https://unpkg.com/sv/README.md');
if (!response.ok || !response.redirected) exit(1);

const version = response.url.replace('https://unpkg.com/sv@', '').split('/')[0];

rmSync('./javascript', { recursive: true, force: true });
rmSync('./typescript', { recursive: true, force: true });

const plugins = ['eslint', 'prettier', 'tailwindcss="plugins:forms"'].join(' ');
const command = `pnpm dlx sv create --template minimal --add ${plugins} --install pnpm`;

execSync(`${command} --types jsdoc javascript `);
execSync(`${command} --types ts typescript`);

writeFileSync(
	'README.md',
	readFileSync('README.md', { encoding: 'utf-8' }).replace(
		/sv@[\d\.]+\d/, //
		`sv@${version}`,
	),
);

if (isBump) {
	execSync('git add .');
	execSync(`pnpm version ${version} -m "sv@${version}" --force`, { stdio: 'inherit' });
	execSync('git push');
	execSync('git push --tags');
}
