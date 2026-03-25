// Add detailed tool-specific translations
const fs = require('fs');
const path = require('path');

const localesDir = 'C:\\Users\\Administrator\\Documents\\aitoolguide-deploy\\public\\locales';

// Tool-specific translations for all 10 tools
const toolTranslations = {
  'en': {
    // ChatGPT
    toolHeadline_chatgpt: 'Make Money with ChatGPT: 5 Proven Methods',
    toolIncome_chatgpt: '$500-1,500/month',
    toolDifficulty_chatgpt: '⭐⭐',
    toolTime_chatgpt: '1-3 days',
    // Midjourney
    toolHeadline_midjourney: 'Midjourney Money Guide: From Zero to $2,100/month',
    toolIncome_midjourney: '$700-2,100/month',
    toolDifficulty_midjourney: '⭐⭐⭐',
    toolTime_midjourney: '3-7 days',
    // Claude
    toolHeadline_claude: 'Make Money with Claude: Long-form Writing & Code',
    toolIncome_claude: '$700-2,000/month',
    toolDifficulty_claude: '⭐⭐',
    toolTime_claude: '1-3 days',
    // Notion
    toolHeadline_notion: 'Notion AI Money Guide: Templates & Courses',
    toolIncome_notion: '$300-1,000/month',
    toolDifficulty_notion: '⭐',
    toolTime_notion: '7-14 days',
    // Runway
    toolHeadline_runway: 'Runway Money Guide: AI Video Generation',
    toolIncome_runway: '$800-2,500/month',
    toolDifficulty_runway: '⭐⭐⭐',
    toolTime_runway: '3-7 days',
    // DALL-E 3
    toolHeadline_dalle3: 'DALL-E 3 Money Guide: AI Art & Design',
    toolIncome_dalle3: '$400-1,200/month',
    toolDifficulty_dalle3: '⭐⭐',
    toolTime_dalle3: '1-3 days',
    // Perplexity
    toolHeadline_perplexity: 'Perplexity Money Guide: Research & Reports',
    toolIncome_perplexity: '$300-800/month',
    toolDifficulty_perplexity: '⭐',
    toolTime_perplexity: '1-3 days',
    // Copilot
    toolHeadline_copilot: 'GitHub Copilot: Code Faster, Earn More',
    toolIncome_copilot: '$1,500-5,000/month',
    toolDifficulty_copilot: '⭐⭐⭐⭐',
    toolTime_copilot: '7-14 days',
    // Gamma
    toolHeadline_gamma: 'Gamma Money Guide: AI Presentations',
    toolIncome_gamma: '$400-1,400/month',
    toolDifficulty_gamma: '⭐',
    toolTime_gamma: '1-3 days',
    // Claude Code
    toolHeadline_claudecode: 'Claude Code: Automation & Development',
    toolIncome_claudecode: '$2,000-7,000/month',
    toolDifficulty_claudecode: '⭐⭐⭐⭐',
    toolTime_claudecode: '7-21 days'
  },
  'zh-CN': {
    toolHeadline_chatgpt: '用ChatGPT赚钱：5种验证方法',
    toolIncome_chatgpt: '￥3,500-10,000/月',
    toolDifficulty_chatgpt: '⭐⭐',
    toolTime_chatgpt: '1-3天',
    toolHeadline_midjourney: 'Midjourney赚钱指南：从零到月入￥15,000',
    toolIncome_midjourney: '￥5,000-15,000/月',
    toolDifficulty_midjourney: '⭐⭐⭐',
    toolTime_midjourney: '3-7天',
    toolHeadline_claude: '用Claude赚钱：长文写作与代码辅助',
    toolIncome_claude: '￥5,000-14,000/月',
    toolDifficulty_claude: '⭐⭐',
    toolTime_claude: '1-3天',
    toolHeadline_notion: 'Notion AI赚钱指南：模板与课程',
    toolIncome_notion: '￥2,000-7,000/月',
    toolDifficulty_notion: '⭐',
    toolTime_notion: '7-14天',
    toolHeadline_runway: 'Runway赚钱指南：AI视频生成',
    toolIncome_runway: '￥5,500-17,500/月',
    toolDifficulty_runway: '⭐⭐⭐',
    toolTime_runway: '3-7天',
    toolHeadline_dalle3: 'DALL-E 3赚钱指南：AI艺术与设计',
    toolIncome_dalle3: '￥2,800-8,500/月',
    toolDifficulty_dalle3: '⭐⭐',
    toolTime_dalle3: '1-3天',
    toolHeadline_perplexity: 'Perplexity赚钱指南：研究与报告',
    toolIncome_perplexity: '￥2,000-5,500/月',
    toolDifficulty_perplexity: '⭐',
    toolTime_perplexity: '1-3天',
    toolHeadline_copilot: 'GitHub Copilot：更快编码，更多收入',
    toolIncome_copilot: '￥10,000-35,000/月',
    toolDifficulty_copilot: '⭐⭐⭐⭐',
    toolTime_copilot: '7-14天',
    toolHeadline_gamma: 'Gamma赚钱指南：AI演示文稿',
    toolIncome_gamma: '￥2,800-10,000/月',
    toolDifficulty_gamma: '⭐',
    toolTime_gamma: '1-3天',
    toolHeadline_claudecode: 'Claude Code：自动化与开发',
    toolIncome_claudecode: '￥14,000-49,000/月',
    toolDifficulty_claudecode: '⭐⭐⭐⭐',
    toolTime_claudecode: '7-21天'
  },
  'zh-TW': {
    toolHeadline_chatgpt: '用ChatGPT賺錢：5種驗證方法',
    toolIncome_chatgpt: 'NT$15,000-45,000/月',
    toolDifficulty_chatgpt: '⭐⭐',
    toolTime_chatgpt: '1-3天',
    toolHeadline_midjourney: 'Midjourney賺錢指南：從零到月入NT$65,000',
    toolIncome_midjourney: 'NT$22,000-65,000/月',
    toolDifficulty_midjourney: '⭐⭐⭐',
    toolTime_midjourney: '3-7天',
    toolHeadline_claude: '用Claude賺錢：長文寫作與代碼輔助',
    toolIncome_claude: 'NT$18,000-45,000/月',
    toolDifficulty_claude: '⭐⭐',
    toolTime_claude: '1-3天',
    toolHeadline_notion: 'Notion AI賺錢指南：模板與課程',
    toolIncome_notion: 'NT$6,500-22,000/月',
    toolDifficulty_notion: '⭐',
    toolTime_notion: '7-14天',
    toolHeadline_runway: 'Runway賺錢指南：AI影片生成',
    toolIncome_runway: 'NT$18,000-55,000/月',
    toolDifficulty_runway: '⭐⭐⭐',
    toolTime_runway: '3-7天',
    toolHeadline_dalle3: 'DALL-E 3賺錢指南：AI藝術與設計',
    toolIncome_dalle3: 'NT$9,000-26,000/月',
    toolDifficulty_dalle3: '⭐⭐',
    toolTime_dalle3: '1-3天',
    toolHeadline_perplexity: 'Perplexity賺錢指南：研究與報告',
    toolIncome_perplexity: 'NT$6,500-18,000/月',
    toolDifficulty_perplexity: '⭐',
    toolTime_perplexity: '1-3天',
    toolHeadline_copilot: 'GitHub Copilot：更快編碼，更多收入',
    toolIncome_copilot: 'NT$33,000-110,000/月',
    toolDifficulty_copilot: '⭐⭐⭐⭐',
    toolTime_copilot: '7-14天',
    toolHeadline_gamma: 'Gamma賺錢指南：AI演示文稿',
    toolIncome_gamma: 'NT$9,000-31,000/月',
    toolDifficulty_gamma: '⭐',
    toolTime_gamma: '1-3天',
    toolHeadline_claudecode: 'Claude Code：自動化與開發',
    toolIncome_claudecode: 'NT$44,000-154,000/月',
    toolDifficulty_claudecode: '⭐⭐⭐⭐',
    toolTime_claudecode: '7-21天'
  },
  'ja': {
    toolHeadline_chatgpt: 'ChatGPTで稼ぐ：5つの実証済み方法',
    toolIncome_chatgpt: '¥75,000-220,000/月',
    toolDifficulty_chatgpt: '⭐⭐',
    toolTime_chatgpt: '1-3日',
    toolHeadline_midjourney: 'Midjourney稼ぎガイド：ゼロから月¥320,000',
    toolIncome_midjourney: '¥110,000-320,000/月',
    toolDifficulty_midjourney: '⭐⭐⭐',
    toolTime_midjourney: '3-7日',
    toolHeadline_claude: 'Claudeで稼ぐ：長文作成とコード補助',
    toolIncome_claude: '¥110,000-220,000/月',
    toolDifficulty_claude: '⭐⭐',
    toolTime_claude: '1-3日',
    toolHeadline_notion: 'Notion AI稼ぎガイド：テンプレートとコース',
    toolIncome_notion: '¥45,000-110,000/月',
    toolDifficulty_notion: '⭐',
    toolTime_notion: '7-14日',
    toolHeadline_runway: 'Runway稼ぎガイド：AI動画生成',
    toolIncome_runway: '¥130,000-380,000/月',
    toolDifficulty_runway: '⭐⭐⭐',
    toolTime_runway: '3-7日',
    toolHeadline_dalle3: 'DALL-E 3稼ぎガイド：AIアートとデザイン',
    toolIncome_dalle3: '¥60,000-170,000/月',
    toolDifficulty_dalle3: '⭐⭐',
    toolTime_dalle3: '1-3日',
    toolHeadline_perplexity: 'Perplexity稼ぎガイド：調査とレポート',
    toolIncome_perplexity: '¥45,000-110,000/月',
    toolDifficulty_perplexity: '⭐',
    toolTime_perplexity: '1-3日',
    toolHeadline_copilot: 'GitHub Copilot：高速コーディングで高収入',
    toolIncome_copilot: '¥220,000-750,000/月',
    toolDifficulty_copilot: '⭐⭐⭐⭐',
    toolTime_copilot: '7-14日',
    toolHeadline_gamma: 'Gamma稼ぎガイド：AIプレゼンテーション',
    toolIncome_gamma: '¥60,000-200,000/月',
    toolDifficulty_gamma: '⭐',
    toolTime_gamma: '1-3日',
    toolHeadline_claudecode: 'Claude Code：自動化と開発',
    toolIncome_claudecode: '¥300,000-1,000,000/月',
    toolDifficulty_claudecode: '⭐⭐⭐⭐',
    toolTime_claudecode: '7-21日'
  }
};

// Only update languages we have complete translations for
const files = Object.keys(toolTranslations);

files.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newKeys = toolTranslations[lang];
    
    Object.assign(content, newKeys);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated ${lang}.json with tool details`);
  } catch (err) {
    console.error(`❌ Failed ${lang}.json: ${err.message}`);
  }
});

console.log('Done!');
