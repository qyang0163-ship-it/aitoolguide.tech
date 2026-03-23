// GitHub Auto Deploy - 创建部署包
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const CONFIG = {
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

console.log('🚀 Creating deployment package...\n');

// 检查文件
for (const file of CONFIG.files) {
  if (!fs.existsSync(file.localPath)) {
    console.error(`❌ File not found: ${file.localPath}`);
    process.exit(1);
  }
}

console.log('✅ All files verified\n');

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

// 创建部署说明
const deployInstructions = `# AIToolGuide.tech 部署包

## 快速部署步骤

### 方法1：GitHub网页上传（最简单）

1. 访问: https://github.com/qyang0163-ship-it/aitoolguide.tech
2. 点击 "Add file" → "Upload files"
3. 拖拽本文件夹中的文件到上传区域
4. 填写提交信息: "${CONFIG.commitMessage}"
5. 点击 "Commit changes"

### 方法2：Git命令行

\`\`\`bash
git clone https://github.com/qyang0163-ship-it/aitoolguide.tech.git
cd aitoolguide.tech
cp -r ../deploy-package/* .
git add .
git commit -m "${CONFIG.commitMessage}"
git push origin master
\`\`\`

## 文件清单

${CONFIG.files.map(f => `- ${f.githubPath}`).join('\n')}

## 部署后

网站地址: https://aitoolguide-tech.vercel.app
`;

fs.writeFileSync(`${deployPackageDir}/README.md`, deployInstructions);
console.log('✅ Created: README.md');

console.log('\n📦 Deployment package created!');
console.log(`📂 Location: ${deployPackageDir}`);

// 打开文件夹和GitHub
exec(`explorer "${deployPackageDir}"`);
exec('start https://github.com/qyang0163-ship-it/aitoolguide.tech/upload/master');

console.log('\n✅ 已打开文件管理器和GitHub上传页面');
console.log('💡 请将deploy-package文件夹中的文件拖拽到GitHub上传页面');
