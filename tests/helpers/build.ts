import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '../..');

export function buildSite(): void {
  execFileSync('npm', ['run', 'build'], {
    cwd: projectRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    stdio: 'pipe',
  });
}

export function readBuiltPage(path: string): string {
  return readFileSync(resolve(projectRoot, 'dist', path), 'utf8');
}
