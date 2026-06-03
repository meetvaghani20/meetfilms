import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const processes = [
  spawn(npmCommand, ['run', 'api'], { stdio: 'inherit' }),
  spawn(npmCommand, ['run', 'site'], { stdio: 'inherit' }),
];

function stopAll() {
  processes.forEach((processRef) => {
    if (!processRef.killed) processRef.kill();
  });
}

processes.forEach((processRef) => {
  processRef.on('exit', (code) => {
    if (code && code !== 0) stopAll();
  });
});

process.on('SIGINT', () => {
  stopAll();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll();
  process.exit(0);
});
