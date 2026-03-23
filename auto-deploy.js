// GitHub Auto Deploy - 使用GitHub Web界面自动化
// 这个脚本通过模拟浏览器操作自动完成GitHub文件上传

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  repoUrl: 'https://github.com/qyang0163-ship-it/aitoolguide.tech',
  files: [
    {
      githubPath: 'src/pages/index.astro',
      localPath: 'C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/pages/index.astro'
    },
    {
      githubPath: 'src/layouts/Layout.astro',
      localPath: 'C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/layouts/Layout.astro'
    },
    {
      githubPath: 'src/pages/tool/[tool].astro',
      localPath: 'C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/pages/tool/[tool].astro'
    },
    {
      githubPath: 'public/favicon.svg',
      localPath: 'C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/public/favicon.svg'
    }
  ],
  commitMessage: 'Day 1: 商业化首页改造 - 赚钱导向设计'
};

async function deploy() {
  console.log('🚀 Starting automated GitHub deployment...\n');
  
  // 检查文件是否存在
  for (const file of CONFIG.files) {
    if (!fs.existsSync(file.localPath)) {
      console.error(`❌ File not found: ${file.localPath}`);
      process.exit(1);
    }
  }
  
  console.log('✅ All files verified\n');
  console.log('📋 Files to upload:');
  CONFIG.files.forEach(f => console.log(`  • ${f.githubPath}`));
  console.log('');
  
  // 由于无法自动处理GitHub登录，创建一键部署包
  console.log('📦 Creating deployment package...\n');
  
  // 创建部署说明文件
  const deployInstructions = `
# AIToolGuide.tech 部署包

## 自动部署步骤

### 方法1：使用GitHub Desktop（推荐）

1. 下载并安装 GitHub Desktop: https://desktop.github.com
2. 登录您的GitHub账户
3. 克隆仓库: qyang0163-ship-it/aitoolguide.tech
4. 将本文件夹中的文件复制到克隆的仓库目录
5. 在GitHub Desktop中提交更改
6. 推送到GitHub

### 方法2：命令行部署

\`\`\`bash
# 克隆仓库
git clone https://github.com/qyang0163-ship-it/aitoolguide.tech.git
cd aitoolguide.tech

# 复制文件
cp ../deploy-package/src/pages/index.astro src/pages/
cp ../deploy-package/src/layouts/Layout.astro src/layouts/
cp ../deploy-package/src/pages/tool/[tool].astro src/pages/tool/
cp ../deploy-package/public/favicon.svg public/

# 提交并推送
git add .
git commit -m "${CONFIG.commitMessage}"
git push origin master
\`\`\`

### 方法3：GitHub网页上传

1. 访问: https://github.com/qyang0163-ship-it/aitoolguide.tech
2. 点击 "Add file" → "Upload files"
3. 拖拽本文件夹中的所有文件
4. 填写提交信息: "${CONFIG.commitMessage}"
5. 点击 "Commit changes"

## 文件清单

${CONFIG.files.map(f => `- ${f.githubPath}`).join('\n')}

## 部署后

网站将自动部署到: https://aitoolguide-tech.vercel.app
`;

  // 创建部署包目录
  const deployPackageDir = 'C:/Users/Administrator/Documents/aitoolguide-tech/deploy-package';
  
  // 创建目录结构
  const dirs = [
    deployPackageDir,
    `${deployPackageDir}/src/pages`,
    `${deployPackageDir}/src/layouts`,
    `${deployPackageDir}/src/pages/tool`,
    `${deployPackageDir}/public`
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // 复制文件
  CONFIG.files.forEach(file => {
    const destPath = path.join(deployPackageDir, file.githubPath);
    fs.copyFileSync(file.localPath, destPath);
    console.log(`✅ Copied: ${file.githubPath}`);
  });
  
  // 写入说明文件
  fs.writeFileSync(`${deployPackageDir}/DEPLOY.md`, deployInstructions);
  console.log('✅ Created: DEPLOY.md');
  
  console.log('\n📦 Deployment package created!');
  console.log(`📂 Location: ${deployPackageDir}`);
  console.log('\n🚀 Ready to deploy!');
  console.log('\n💡 Next steps:');
  console.log('   1. Open GitHub Desktop or command line');
  console.log('   2. Clone the repository');
  console.log('   3. Copy files from deploy-package folder');
  console.log('   4. Commit and push');
  
  // 打开文件夹
  const { exec } = require('child_process');
  exec(`explorer "${deployPackageDir}"`);
  
  // 打开GitHub
  exec('start https://github.com/qyang0163-ship-it/aitoolguide.tech');
}

deploy().catch(console.error);
