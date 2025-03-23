import { execSync } from 'node:child_process';

execSync('pnpm sv create --template minimal --no-add-ons --types jsdoc javascript');
execSync('pnpm sv add --no-preconditions --cwd javascript eslint prettier');

execSync('pnpm sv create --template minimal --no-add-ons --types ts typescript');
execSync('pnpm sv add --no-preconditions --cwd typescript eslint prettier');
