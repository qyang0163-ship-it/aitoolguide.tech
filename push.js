import git from 'isomorphic-git';
import fs from 'fs';
import http from 'isomorphic-git/http/node/index.js';

const dir = '.';

// Configure git author
const author = {
  name: 'AI Assistant',
  email: 'ai@ai2424.com'
};

// Initialize git if needed
try {
  await git.status({ dir, fs });
} catch (e) {
  console.log('Initializing git repo...');
  await git.init({ dir, fs, defaultBranch: 'main' });
}

// Add all files
console.log('Adding files...');
const status = await git.statusMatrix({ dir, fs });
for (const [filepath, head, workdir, stage] of status) {
  if (head === 0 && workdir === 2 && stage === 2) {
    await git.add({ dir, fs, filepath });
  }
}

// Commit
console.log('Committing...');
try {
  await git.commit({
    dir,
    fs,
    author,
    message: 'Initial commit: ai2424.com v1.0 - Complete homepage with popular AI tools'
  });
} catch (e) {
  console.log('Commit skipped (nothing to commit or already committed)');
}

// Push to GitHub
console.log('Pushing to GitHub...');
try {
  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({
      username: 'qyang0163-ship-it',
      token: process.env.GITHUB_TOKEN || ''
    })
  });
  console.log('Push successful!');
} catch (e) {
  console.error('Push failed:', e.message);
  console.log('\nPlease provide a GitHub token with repo permissions.');
  console.log('You can set it as GITHUB_TOKEN environment variable or update this script.');
}