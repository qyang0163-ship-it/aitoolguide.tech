import fetch from 'node:fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_OWNER = 'qyang0163-ship-it';
const REPO_NAME = 'aitoolguide.tech';
const BRANCH = 'main';

// Files to upload (excluding node_modules, dist, .git)
const filesToUpload = [
  'src/layouts/Layout.astro',
  'src/pages/index.astro',
  'public/favicon.svg',
  'package.json',
  'astro.config.mjs',
  'tsconfig.json',
  '.gitignore',
  'README.md'
];

// We'll create a PAT via login - for now let's try basic auth or ask for token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

if (!GITHUB_TOKEN) {
  console.log('Please provide GitHub token via GITHUB_TOKEN environment variable');
  console.log('Or manually upload files to GitHub');
  process.exit(1);
}

async function uploadFile(filePath, content) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify({
      message: `Add ${filePath}`,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH
    })
  });
  
  const data = await response.json();
  if (response.ok) {
    console.log(`✓ Uploaded: ${filePath}`);
  } else {
    console.log(`✗ Failed: ${filePath} - ${data.message}`);
  }
  return data;
}

async function main() {
  console.log('Starting upload to GitHub...');
  
  for (const file of filesToUpload) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      await uploadFile(file, content);
      await new Promise(r => setTimeout(r, 500)); // Rate limiting
    } else {
      console.log(`✗ Not found: ${file}`);
    }
  }
  
  console.log('\nUpload complete!');
}

main().catch(console.error);