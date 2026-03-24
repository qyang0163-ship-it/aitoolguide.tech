// Tool page i18n keys - All tool detail page translations
// These keys are used in src/pages/tool/[tool].astro

export const toolPageKeys = {
  // Common tool page keys
  'tool.urgencyBanner': '🔥 限时福利：前100名注册用户可获得专属赚钱工具包 + 独家接单渠道',
  'tool.navTools': '赚钱工具',
  'tool.navMethods': '变现方法', 
  'tool.navStories': '成功案例',
  'tool.navStart': '立即开始',
  'tool.freeUse': '免费使用',
  'tool.expectedIncome': '预期收入',
  'tool.difficulty': '上手难度',
  'tool.timeToFirstIncome': '首单时间',
  'tool.toolsNeeded': '你需要准备这些',
  'tool.methodsTitle': '赚钱的{N}种方式',
  'tool.methodsDesc': '每种方法都有详细的操作步骤和真实收入数据',
  'tool.method': '方法',
  'tool.steps': '操作步骤：',
  'tool.tip': '重点',
  'tool.platformsTitle': '去哪里接单？',
  'tool.platformsDesc': '推荐最靠谱的接单平台',
  'tool.goPlatform': '去接单 →',
  'tool.experienceTitle': '老司机的经验总结',
  'tool.faqTitle': '新手必看FAQ',
  'tool.ctaTitle': '准备好开始赚钱了吗？',
  'tool.ctaDesc': '现在行动，比别人更快一步！前100名用户可获得专属赚钱工具包',
  'tool.ctaUrgency': '已有 {N} 人实现收入增长',
  
  // ChatGPT specific
  'tool.chatgpt.headline': 'ChatGPT怎么赚钱？2026年实测月入8000+的5种方法',
  'tool.chatgpt.description': 'OpenAI的ChatGPT是目前最强大的AI写作工具，掌握它就能轻松接单赚钱',
  'tool.chatgpt.category': 'AI写作赚钱',
  
  // Midjourney specific  
  'tool.midjourney.headline': 'Midjourney赚钱攻略：从零基础到月入15000+',
  'tool.midjourney.description': 'Midjourney是AI绘画领域的王者，学会它就能开启设计接单之路',
  'tool.midjourney.category': 'AI绘画接单',
  
  // Notion specific
  'tool.notion.headline': 'Notion AI变现指南：卖模板月入6000+的完整攻略',
  'tool.notion.description': 'Notion是全球最火的效率工具，用AI制作模板售卖是绝佳的被动收入来源',
  'tool.notion.category': '效率变现',
};

// Method titles and descriptions for each tool
export const toolMethods = {
  chatgpt: [
    { key: 'chatgpt.method1', title: '文案代写服务', desc: '帮客户写公众号文章、小红书文案、产品描述等' },
    { key: 'chatgpt.method2', title: '论文辅助写作', desc: '帮助学生写论文大纲、文献综述、降重改写' },
    { key: 'chatgpt.method3', title: '短视频脚本创作', desc: '为抖音、快手创作者写脚本' },
    { key: 'chatgpt.method4', title: '简历优化服务', desc: '帮求职者优化简历，提高面试率' },
    { key: 'chatgpt.method5', title: 'AI提示词售卖', desc: '整理优质Prompt在平台售卖' },
  ],
  midjourney: [
    { key: 'midjourney.method1', title: '头像定制服务', desc: '帮客户生成个性化AI头像、情侣头像' },
    { key: 'midjourney.method2', title: '电商设计接单', desc: '做产品图、主图、详情页设计' },
    { key: 'midjourney.method3', title: '壁纸/表情包制作', desc: '制作手机壁纸、微信表情包售卖' },
    { key: 'midjourney.method4', title: '插画设计外包', desc: '接书籍插画、海报设计等' },
  ],
  notion: [
    { key: 'notion.method1', title: '模板售卖', desc: '制作各类Notion模板在小红书售卖' },
    { key: 'notion.method2', title: '知识付费课程', desc: '教别人如何使用Notion' },
    { key: 'notion.method3', title: '个人效率咨询', desc: '帮客户搭建个人管理系统' },
  ]
};
