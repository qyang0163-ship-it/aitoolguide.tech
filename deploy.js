const https = require('https');
const fs = require('fs');
const path = require('path');

// GitHub配置
const CONFIG = {
  owner: 'qyang0163-ship-it',
  repo: 'ai2424.com',
  branch: 'master',
  token: process.env.GITHUB_TOKEN || 'YOUR_GITHUB_TOKEN_HERE' // 需要在环境变量中设置
};

// 要更新的文件列表
const filesToUpdate = [
  {
    path: 'src/pages/index.astro',
    localPath: 'C:/Users/Administrator/Documents/GitHub/ai2424.com/ai2424.com-master/src/pages/index.astro'
  },
  {
    path: 'src/layouts/Layout.astro',
    localPath: 'C:/Users/Administrator/Documents/GitHub/ai2424.com/ai2424.com-master/src/layouts/Layout.astro'
  },
  {
    path: 'src/pages/tool/[tool].astro',
    localPath: 'C:/Users/Administrator/Documents/GitHub/ai2424.com/ai2424.com-master/src/pages/tool/[tool].astro'
  },
  {
    path: 'public/favicon.svg',
    localPath: 'C:/Users/Administrator/Documents/GitHub/ai2424.com/ai2424.com-master/public/favicon.svg'
  }
];

// 读取文件并编码为base64
function readFileBase64(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return Buffer.from(content).toString('base64');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// 获取文件当前SHA（用于更新）
function getFileSHA(filePath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${filePath}?ref=${CONFIG.branch}`,
      method: 'GET',
      headers: {
        'User-Agent': 'AIToolGuide-Updater',
        'Authorization': `token ${CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.sha) {
            resolve(json.sha);
          } else {
            resolve(null); // 文件不存在
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Error getting SHA for ${filePath}:`, error.message);
      resolve(null);
    });

    req.end();
  });
}

// 更新或创建文件
function updateFile(filePath, content, sha, message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      message: message,
      content: content,
      sha: sha,
      branch: CONFIG.branch
    });

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        'User-Agent': 'AIToolGuide-Updater',
        'Authorization': `token ${CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(responseData);
          if (res.statusCode === 200 || res.statusCode === 201) {
            console.log(`✅ Successfully updated: ${filePath}`);
            resolve(json);
          } else {
            console.error(`❌ Failed to update ${filePath}:`, json.message);
            reject(new Error(json.message));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error updating ${filePath}:`, error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// 主函数
async function main() {
  console.log('🚀 Starting ai2424.com update...\n');

  if (CONFIG.token === 'YOUR_GITHUB_TOKEN_HERE') {
    console.error('❌ Error: Please set your GitHub token in the GITHUB_TOKEN environment variable');
    console.log('\nTo get a GitHub token:');
    console.log('1. Go to https://github.com/settings/tokens');
    console.log('2. Click "Generate new token (classic)"');
    console.log('3. Select "repo" scope');
    console.log('4. Copy the token and set it as GITHUB_TOKEN environment variable');
    process.exit(1);
  }

  const commitMessage = 'Day 1: 商业化首页改造 - 赚钱导向设计';

  for (const file of filesToUpdate) {
    try {
      console.log(`📄 Processing: ${file.path}`);
      
      // 读取本地文件
      const content = readFileBase64(file.localPath);
      if (!content) {
        console.log(`⚠️ Skipping ${file.path} - file not found`);
        continue;
      }

      // 获取文件SHA（如果文件存在）
      const sha = await getFileSHA(file.path);
      
      // 更新文件
      await updateFile(file.path, content, sha, commitMessage);
      
    } catch (error) {
      console.error(`❌ Error processing ${file.path}:`, error.message);
    }
  }

  console.log('\n✨ Update complete!');
  console.log('🌐 Check your site at: https://aitoolguide-tech.vercel.app');
}

// 运行
main().catch(console.error);
