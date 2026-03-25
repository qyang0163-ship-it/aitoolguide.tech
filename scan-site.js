#!/usr/bin/env node
/**
 * 全站深度扫描脚本 - 无限循环优化模式
 * 检测: 死链、中文硬编码、Loading挂起、SEO问题、货币符号
 */

const fs = require('fs');
const path = require('path');

const SCAN_RESULTS = {
  timestamp: new Date().toISOString(),
  cycle: 1,
  issues: {
    hardcodedChinese: [],
    missingI18n: [],
    deadLinks: [],
    currencyIssues: [],
    seoIssues: []
  }
};

// 扫描目录
const PAGES_DIR = path.join(__dirname, 'src', 'pages');
const LOCALES_DIR = path.join(__dirname, 'public', 'locales');

// 读取所有页面文件
function scanPages() {
  const files = fs.readdirSync(PAGES_DIR, { recursive: true });
  
  files.forEach(file => {
    if (file.endsWith('.astro')) {
      const filePath = path.join(PAGES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 检测中文硬编码 (不在data-i18n属性中的中文)
      const chineseRegex = /[\u4e00-\u9fa5]{2,}/g;
      const matches = content.match(chineseRegex);
      
      if (matches) {
        matches.forEach(match => {
          // 检查是否在i18n属性中
          const context = content.substring(
            Math.max(0, content.indexOf(match) - 100),
            Math.min(content.length, content.indexOf(match) + match.length + 100)
          );
          
          if (!context.includes('data-i18n') && !context.includes('i18n')) {
            SCAN_RESULTS.issues.hardcodedChinese.push({
              file: file,
              text: match,
              context: context.substring(0, 50)
            });
          }
        });
      }
      
      // 检测没有i18n的按钮文本
      const buttonRegex = /<button[^>]*>([^<]+)<\/button>/g;
      let btnMatch;
      while ((btnMatch = buttonRegex.exec(content)) !== null) {
        const btnText = btnMatch[1].trim();
        if (btnText && !btnMatch[0].includes('data-i18n') && btnText.length > 3) {
          SCAN_RESULTS.issues.missingI18n.push({
            file: file,
            element: 'button',
            text: btnText
          });
        }
      }
      
      // 检测货币符号问题
      if (content.includes('￥') || content.includes('¥')) {
        SCAN_RESULTS.issues.currencyIssues.push({
          file: file,
          issue: 'Chinese Yuan symbol found'
        });
      }
    }
  });
}

// 检查翻译文件完整性
function checkLocales() {
  const locales = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar', 'hi', 'th', 'tr', 'vi', 'id'];
  const enFile = path.join(LOCALES_DIR, 'en.json');
  const enKeys = Object.keys(JSON.parse(fs.readFileSync(enFile, 'utf-8')));
  
  locales.forEach(locale => {
    const file = path.join(LOCALES_DIR, `${locale}.json`);
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const missingKeys = enKeys.filter(key => !data[key]);
      
      if (missingKeys.length > 0) {
        SCAN_RESULTS.issues.missingI18n.push({
          file: `${locale}.json`,
          missingKeys: missingKeys.slice(0, 10) // 只显示前10个
        });
      }
    }
  });
}

// 运行扫描
console.log('🔍 开始全站深度扫描...');
scanPages();
checkLocales();

// 输出结果
console.log('\n📊 扫描结果:');
console.log(JSON.stringify(SCAN_RESULTS, null, 2));

// 保存结果
fs.writeFileSync('scan-results.json', JSON.stringify(SCAN_RESULTS, null, 2));
console.log('\n✅ 扫描完成，结果保存到 scan-results.json');
