// AIToolGuide i18n v2 - 16 Language Support with "3+13" L10n Architecture
// Core Markets: en, zh-CN, es (Deep Localization)
// Long-tail: ja, pt, vi, th, id, hi, de, fr, ko, ar, ru, tr (Generic Fallback)

(function() {
  'use strict';

  const LANGS = [
    { code: 'en', label: 'English', flag: '🇺🇸', rtl: false, tier: 'core' },
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳', rtl: false, tier: 'core' },
    { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼', rtl: false, tier: 'core' },
    { code: 'es', label: 'Español', flag: '🇪🇸', rtl: false, tier: 'core' },
    { code: 'ja', label: '日本語', flag: '🇯🇵', rtl: false, tier: 'longtail' },
    { code: 'pt', label: 'Português', flag: '🇧🇷', rtl: false, tier: 'longtail' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', rtl: false, tier: 'longtail' },
    { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭', rtl: false, tier: 'longtail' },
    { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false, tier: 'longtail' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', rtl: false, tier: 'longtail' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', rtl: false, tier: 'longtail' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', rtl: false, tier: 'longtail' },
    { code: 'ko', label: '한국어', flag: '🇰🇷', rtl: false, tier: 'longtail' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true, tier: 'longtail' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', rtl: false, tier: 'longtail' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷', rtl: false, tier: 'longtail' }
  ];

  const LANG_KEY = 'aitg_lang_v2';
  const DEFAULT_LANG = 'en';

  // Core markets with deep localization
  const coreTranslations = {
    en: {
      navTools: "Money Tools", navMethods: "Methods", navStories: "Success Stories", navStart: "Get Started", navCta: "Start Earning Free →",
      platformFreelance: "Upwork, Fiverr, Freelancer", platformTraffic: "X (Twitter), TikTok, Reddit", platformPayment: "Stripe, PayPal, Wise",
      genericFallbackNotice: "",
      heroBadge: "💸 #1 Side Hustle Choice", heroSocial: "Helped 10,000+ people grow their income",
      heroTitle1: "Make Money Easily", heroTitle2: "with AI Tools", heroTitle3: "Even Beginners Can Earn $1,000+/Month",
      heroDesc: "No coding skills needed. No design experience required. Just learn AI tools and seize the biggest opportunity in 2026.",
      heroDescStrong: "10 AI Money Tools + Step-by-Step Tutorials + Exclusive Channels", heroDescEnd: " — We'll guide you to start your side hustle!",
      heroCta1: "🔥 Try Free Now (Limited Time)", heroCta2: "See Money Methods →", heroCta3: "View Success Stories",
      urgencyText: "This week", urgencyCount: "1,247", urgencyPeople: "people started earning through this site", urgencyLimit: "Limited spots, first come first served",
      stat1Num: "50+", stat1Label: "AI Money Tools", stat2Num: "10K+", stat2Label: "Success Cases", stat3Num: "$700", stat3Label: "Avg Monthly Income", stat4Num: "98%", stat4Label: "Beginner Success Rate",
      step1Title: "Pick a Tool", step1Desc: "Choose the right AI tool based on your interests", step2Title: "Learn Methods", step2Desc: "Follow detailed tutorials and real case studies", step3Title: "Start Earning", step3Desc: "Take action and land your first gig",
      sectionToolsBadge: "💰 Tested & Proven", sectionToolsTitle: "Top 10 AI Money-Making Tools", sectionToolsDesc: "Each tool comes with detailed tutorials and real income data",
      sectionMethodsBadge: "🎯 Choose Your Path", sectionMethodsTitle: "6 AI Monetization Tracks", sectionMethodsDesc: "Find the best way to earn money, even with zero experience",
      sectionStoriesBadge: "⭐ Real Stories", sectionStoriesTitle: "They're All Making Money with AI", sectionStoriesDesc: "Real user success stories — you can do it too",
      earningMethod: "Earning Method:", difficulty: "Difficulty:", tryFree: "🚀 Try Free Now", viewTutorial: "📖 View Earning Tutorial", hotBadge: "🔥 Trending", viewAllTools: "View All 50+ Money Tools →",
      catWriting: "AI Writing", catArt: "AI Art & Design", catVideo: "Video Editing", catCode: "Code & Tech", catKnowledge: "Knowledge Products", catProductivity: "Productivity Tools", startEarning: "Start Earning →",
      ctaBadge: "🎁 Limited Offer", ctaTitle: "Still watching? Others are already earning!", ctaDesc1: "Register now and get:", ctaDesc2: "✅ 'AI Money Toolkit' (Worth $40)", ctaDesc3: "✅ Exclusive freelance channels & platform recommendations", ctaDesc4: "✅ 1-on-1 mentoring (first 100 only)",
      ctaCta1: "🔥 Start Earning Now (Free)", ctaCta2: "💎 Get Toolkit", ctaCta3: "📱 Join Earning Community",
      ctaUrgency1: "⏰", ctaUrgency2: "12,847", ctaUrgency3: "people joined |", ctaUrgency4: "153", ctaUrgency5: "spots remaining",
      footerDesc: "Focused on AI tool monetization. Helping everyone create income with AI. The most practical AI side hustle guide in 2026.",
      footerTools: "Money Tools", footerWriting: "AI Writing Tools", footerArt: "AI Art Tools", footerVideo: "Video Editing Tools", footerCode: "Code Assistant Tools",
      footerGuides: "Earning Guides", footerBeginner: "Beginner's Guide", footerAdvanced: "Advanced Tips", footerPlatforms: "Freelance Platforms", footerPitfalls: "Avoiding Pitfalls",
      footerAbout: "About Us", footerContact: "Contact Us", footerBusiness: "Business Inquiry", footerSubmit: "Submit a Story", footerPrivacy: "Privacy Policy",
      footerCopyright: "© 2026 AIToolGuide.tech. All rights reserved. | For educational purposes only. Use AI tools legally.",
      expectedIncome: "Expected Income", difficultyLevel: "Difficulty", firstGig: "Time to First Gig", learnMethods: "🔥 Learn Earning Methods Now", tryTool: "💎 Try {tool} Free",
      viewPlatforms: "📱 View Freelancing Platforms", preparation: "🛠️ What You Need", coreMethods: "💰 Core Methods", methodsTitle: "{tool} — {count} Ways to Earn",
      methodsDesc: "Each method includes step-by-step instructions and real income data", operationSteps: "Steps:", whereToFreelance: "Where to Freelance?",
      recommendPlatforms: "Recommended {count} reliable platforms", goFreelance: "Go Freelance →", expertTips: "⭐ Expert Tips", expertTitle: "Pro Tips & Experience",
      faqBadge: "❓ FAQ", faqTitle: "Must-Read FAQ for Beginners", readyToEarn: "Ready to earn with {tool}?", actNow: "Act now, stay ahead of the competition!",
      first100: "First 100 users get an exclusive money toolkit", joinCommunity: "📱 Join Earning Community", moreTools: "💎 See More Money Tools",
      alsoRead: "📚 You Might Also Like", confusion: "💢 Do You Also Have This Problem?", detailTitle: "🛠️ Detailed Guide & Tutorials", conclusion: "✅ Conclusion",
      midCta: "⚡ Don't just read — take action now!", midCtaBtn: "🔥 Get Free AI Money Toolkit",
      bottomCtaBadge: "🎁 Limited Offer", bottomCtaTitle: "Done reading? Start taking action!", bottomCtaDesc: "The best method means nothing without execution. Pick a tool and start now!",
      bottomCtaCta1: "🔥 Try AI Tools Free Now", bottomCtaCta2: "💎 More Earning Guides", bottomCtaCta3: "📱 Join Earning Community",
      bottomUrgency1: "⏰", bottomUrgency2: "12,847", bottomUrgency3: "people taking action |", bottomUrgency4: "153", bottomUrgency5: "spots remaining",
      urgencyBanner: "🔥 Limited Offer: First 100 users get the 'AI Money Toolkit' + Exclusive Freelance Channels"
    },

    'zh-CN': {
      navTools: "赚钱工具", navMethods: "变现方法", navStories: "成功案例", navStart: "立即开始", navCta: "免费开始赚钱 →",
      platformFreelance: "闲鱼, 小红书, 猪八戒网", platformTraffic: "抖音, 微信公众号, 哔哩哔哩", platformPayment: "支付宝 (Alipay), 微信支付 (WeChat Pay)",
      genericFallbackNotice: "",
      heroBadge: "💸 副业变现首选", heroSocial: "已帮助 10,000+ 人实现收入增长",
      heroTitle1: "用AI工具", heroTitle2: "轻松赚钱", heroTitle3: "普通人也能月入过万",
      heroDesc: "不需要编程基础，不需要设计经验，只要会用AI工具，就能在2026年抓住最大红利。",
      heroDescStrong: "10大AI赚钱工具 + 详细变现教程 + 独家接单渠道", heroDescEnd: "，手把手教你开启副业！",
      heroCta1: "🔥 立即免费试用（限时）", heroCta2: "查看赚钱方法 →", heroCta3: "看成功案例",
      urgencyText: "本周已有", urgencyCount: "1,247", urgencyPeople: "人通过本站开始赚钱", urgencyLimit: "名额有限，先到先得",
      stat1Num: "50+", stat1Label: "AI赚钱工具", stat2Num: "10K+", stat2Label: "成功变现案例", stat3Num: "￥5000", stat3Label: "平均月收入", stat4Num: "98%", stat4Label: "新手成功率",
      step1Title: "选工具", step1Desc: "根据兴趣选择适合的AI工具", step2Title: "学方法", step2Desc: "查看详细赚钱教程和案例", step3Title: "开始赚", step3Desc: "立即行动，接第一单",
      sectionToolsBadge: "💰 亲测有效", sectionToolsTitle: "十大AI赚钱工具", sectionToolsDesc: "每个工具都附带详细变现教程和真实收入数据",
      sectionMethodsBadge: "🎯 按方式选择", sectionMethodsTitle: "六大AI变现赛道", sectionMethodsDesc: "找到最适合你的赚钱方式，零基础也能快速上手",
      sectionStoriesBadge: "⭐ 真实案例", sectionStoriesTitle: "他们都在用AI赚钱", sectionStoriesDesc: "来自真实用户的变现故事，你也可以做到",
      earningMethod: "赚钱方式：", difficulty: "上手难度：", tryFree: "🚀 立即免费使用", viewTutorial: "📖 查看赚钱教程", hotBadge: "🔥 正在爆火", viewAllTools: "查看全部50+赚钱工具 →",
      catWriting: "AI写作赚钱", catArt: "AI绘画接单", catVideo: "视频剪辑变现", catCode: "代码技术外包", catKnowledge: "知识付费", catProductivity: "效率工具变现", startEarning: "开始赚钱 →",
      ctaBadge: "🎁 限时福利", ctaTitle: "还在观望？别人已经开始赚钱了！", ctaDesc1: "现在注册即可获得：", ctaDesc2: "✅ 《AI赚钱工具包》（价值￥299）", ctaDesc3: "✅ 独家接单渠道和平台推荐", ctaDesc4: "✅ 1对1变现指导（限前100名）",
      ctaCta1: "🔥 立即开始赚钱（免费）", ctaCta2: "💎 领取工具包", ctaCta3: "📱 加入赚钱交流群",
      ctaUrgency1: "⏰", ctaUrgency2: "12,847", ctaUrgency3: "人加入 |", ctaUrgency4: "153", ctaUrgency5: "个剩余名额",
      footerDesc: "专注AI工具变现，让每个人都能用AI创造收入。2026年最实用的AI副业指南。",
      footerTools: "赚钱工具", footerWriting: "AI写作工具", footerArt: "AI绘画工具", footerVideo: "视频剪辑工具", footerCode: "代码辅助工具",
      footerGuides: "变现攻略", footerBeginner: "新手入门", footerAdvanced: "进阶技巧", footerPlatforms: "接单平台", footerPitfalls: "避坑指南",
      footerAbout: "关于我们", footerContact: "联系我们", footerBusiness: "商务合作", footerSubmit: "投稿指南", footerPrivacy: "隐私政策",
      footerCopyright: "© 2026 AIToolGuide.tech 赚钱版. All rights reserved. | 本站仅供学习交流，请合法合规使用AI工具",
      expectedIncome: "预期收入", difficultyLevel: "上手难度", firstGig: "首单时间", learnMethods: "🔥 立即学习赚钱方法", tryTool: "💎 免费使用{tool}",
      viewPlatforms: "📱 查看接单平台", preparation: "🛠️ 准备工作", coreMethods: "💰 核心方法", methodsTitle: "{tool}赚钱的{count}种方式",
      methodsDesc: "每种方法都有详细的操作步骤和真实收入数据", operationSteps: "操作步骤：", whereToFreelance: "去哪里接单？",
      recommendPlatforms: "推荐{count}个最靠谱的接单平台", goFreelance: "去接单 →", expertTips: "⭐ 经验分享", expertTitle: "老司机的经验总结",
      faqBadge: "❓ 常见问题", faqTitle: "新手必看FAQ", readyToEarn: "准备好用{tool}赚钱了吗？", actNow: "现在行动，比别人更快一步！",
      first100: "前100名用户可获得专属赚钱工具包", joinCommunity: "📱 加入赚钱交流群", moreTools: "💎 查看更多赚钱工具",
      alsoRead: "📚 你可能还想看", confusion: "💢 你是不是也有这样的困惑？", detailTitle: "🛠️ 详细介绍与实操教程", conclusion: "✅ 总结",
      midCta: "⚡ 别光看，现在就行动！", midCtaBtn: "🔥 免费领取AI赚钱工具包",
      bottomCtaBadge: "🎁 限时福利", bottomCtaTitle: "看完了？现在就开始行动吧！", bottomCtaDesc: "再好的方法，不执行就等于零。现在就选一个工具开始，比别人快一步！",
      bottomCtaCta1: "🔥 立即免费试用AI工具", bottomCtaCta2: "💎 查看更多赚钱攻略", bottomCtaCta3: "📱 加入赚钱交流群",
      bottomUrgency1: "⏰", bottomUrgency2: "12,847", bottomUrgency3: "人开始行动 |", bottomUrgency4: "153", bottomUrgency5: "个剩余名额",
      urgencyBanner: "🔥 限时福利：前100名注册用户可获得《AI赚钱工具包》+ 独家接单渠道"
    },
