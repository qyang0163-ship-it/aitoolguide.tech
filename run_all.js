const fs = require('fs');
const { execSync } = require('child_process');
const path = 'src/pages/chip/[id].astro';

try {
    console.log('⏳ 1. 开始修复 Astro 文件结构...');
    let content = fs.readFileSync(path, 'utf8');
    
    // 清理可能放错位置的旧代码
    content = content.replace(/export\s+function\s+getStaticPaths[\s\S]*?\n\}\n/g, '');
    
    const lines = content.split('\n');
    const firstDash = lines.findIndex(line => line.trim() === '---');
    
    if (firstDash !== -1) {
        lines.splice(firstDash + 1, 0, "export function getStaticPaths() {", "  return chipDatabase.map((chip) => ({ params: { id: chip.id } }));", "}");
        fs.writeFileSync(path, lines.join('\n'), 'utf8');
        console.log('✅ Astro 结构完美修复！');
    } else {
        console.log('⚠️ 未找到 frontmatter 标记，可能需要手动检查。');
    }

    console.log('\n⏳ 2. 开始构建项目 (npm run build)...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('\n⏳ 3. 开始推送到远程仓库...');
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "fix: automated structural fix and build deployment"', { stdio: 'inherit' });
    execSync('git push origin chip-platform-v1', { stdio: 'inherit' }); // 如果是主分支请在终端自行修改为 main

    console.log('\n🎉 所有任务一气呵成，代码已起飞！');
} catch (error) {
    console.error('\n❌ 流程中断，报错信息：', error.message);
}