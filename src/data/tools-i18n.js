// Tool data with full i18n support for 16 languages
// Each tool has localized name, description, methods, and platforms

export const tools = {
  chatgpt: {
    id: 'chatgpt',
    icon: '💬',
    color: '#10a37f',
    category: 'writing',
    incomeRange: { min: 3000, max: 8000 },
    difficulty: 2,
    timeToFirstIncome: '1-3 days',
    i18n: {
      'en': {
        name: 'ChatGPT',
        headline: 'How to Make $420-$1,120/Month with ChatGPT',
        description: 'The world\'s most powerful AI writing tool. Master it to start earning immediately.',
        methods: [
          { title: 'Copywriting Services', desc: 'Write blog posts, social media content, product descriptions for clients', income: '$50-200/post' },
          { title: 'Academic Writing Help', desc: 'Assist with essay outlines, literature reviews, paraphrasing', income: '$100-500/paper' },
          { title: 'Video Script Writing', desc: 'Create scripts for YouTube, TikTok creators', income: '$30-100/script' },
          { title: 'Resume Optimization', desc: 'Help job seekers optimize resumes for better interview rates', income: '$50-150/resume' },
          { title: 'AI Prompt Sales', desc: 'Sell curated prompt collections on marketplaces', income: '$10-100/collection' }
        ],
        tools: ['ChatGPT Plus account', 'Google Docs', 'Freelance platform account'],
        tips: [
          'Learning to write quality prompts is the key to success',
          'Always humanize AI output - never deliver raw AI content',
          'Build your own client base to reduce platform dependency',
          'Study marketing to increase your pricing power'
        ],
        faq: [
          { q: 'Do I need ChatGPT Plus?', a: 'Recommended. GPT-4 produces higher quality, allowing you to charge premium rates.' },
          { q: 'How soon can I start earning?', a: 'Most beginners land their first client within 1-3 days.' },
          { q: 'Will clients know I use AI?', a: 'Not if you edit properly. Clients care about results, not methods.' }
        ]
      },
      'zh-cn': {
        name: 'ChatGPT',
        headline: 'ChatGPT怎么赚钱？2026年实测月入8000+的5种方法',
        description: 'OpenAI的ChatGPT是目前最强大的AI写作工具，掌握它就能轻松接单赚钱',
        methods: [
          { title: '文案代写服务', desc: '帮客户写公众号文章、小红书文案、产品描述等', income: '￥50-200/篇' },
          { title: '论文辅助写作', desc: '帮助学生写论文大纲、文献综述、降重改写', income: '￥100-500/篇' },
          { title: '短视频脚本创作', desc: '为抖音、快手创作者写脚本', income: '￥30-100/条' },
          { title: '简历优化服务', desc: '帮求职者优化简历，提高面试率', income: '￥50-150/份' },
          { title: 'AI提示词售卖', desc: '整理优质Prompt在平台售卖', income: '￥9.9-99/份' }
        ],
        tools: ['ChatGPT Plus账号', '文档编辑工具', '接单平台账号'],
        tips: [
          '学会写高质量Prompt是关键',
          '不要直接复制AI内容，要人工润色',
          '建立自己的客户群体，减少平台依赖',
          '多学习营销技巧，提高客单价'
        ],
        faq: [
          { q: '需要购买ChatGPT Plus吗？', a: '建议购买，GPT-4质量更高，能接更高单价订单' },
          { q: '新手多久能赚钱？', a: '一般1-3天就能接到第一单' },
          { q: '会被客户发现用AI吗？', a: '只要人工润色到位，客户通常看不出来' }
        ]
      },
      'ja': {
        name: 'ChatGPT',
        headline: 'ChatGPTで月5万円以上稼ぐ方法',
        description: '世界最強のAIライティングツール。習得すればすぐに収入を得られます',
        methods: [
          { title: 'ライティング代行', desc: 'ブログ記事、SNS投稿、商品説明文の作成', income: '¥7,000-28,000/件' },
          { title: '学術ライティング支援', desc: 'レポートのアウトライン、文献レビュー、リライト', income: '¥14,000-70,000/件' },
          { title: '動画脚本作成', desc: 'YouTube、TikTokクリエイターの脚本作成', income: '¥4,200-14,000/本' },
          { title: '履歴書最適化', desc: '求職者の履歴書を最適化して面接率向上', income: '¥7,000-21,000/件' },
          { title: 'プロンプト販売', desc: '厳選したプロンプト集を販売', income: '¥1,400-14,000/セット' }
        ],
        tools: ['ChatGPT Plusアカウント', 'Googleドキュメント', 'フリーランスプラットフォーム'],
        tips: [
          '質の高いプロンプトを書くことが成功の鍵',
          'AIの出力は必ず人間が編集する',
          '独自の顧客基盤を構築する',
          'マーケティングを学び単価を上げる'
        ],
        faq: [
          { q: 'ChatGPT Plusは必要？', a: '推奨。GPT-4は質が高く、高単価案件を受注できます' },
          { q: '初心者はいつ稼げますか？', a: '多くの人が1-3日で最初のクライアントを獲得します' },
          { q: 'クライアントにAI使用がバレますか？', a: '適切に編集すれば気づかれません' }
        ]
      },
      'es': {
        name: 'ChatGPT',
        headline: 'Cómo Ganar €420-€1.120/mes con ChatGPT',
        description: 'La herramienta de escritura AI más poderosa del mundo. Domínala para empezar a ganar.',
        methods: [
          { title: 'Servicios de Copywriting', desc: 'Escribe blogs, redes sociales, descripciones de productos', income: '€50-200/post' },
          { title: 'Ayuda Académica', desc: 'Asiste con esquemas de ensayos, revisiones literarias', income: '€100-500/trabajo' },
          { title: 'Guiones de Video', desc: 'Crea guiones para YouTube, TikTok', income: '€30-100/guion' },
          { title: 'Optimización de CV', desc: 'Ayuda a buscadores de empleo a mejorar sus CV', income: '€50-150/CV' },
          { title: 'Venta de Prompts', desc: 'Vende colecciones de prompts curados', income: '€10-100/colección' }
        ],
        tools: ['Cuenta ChatGPT Plus', 'Google Docs', 'Cuenta de plataforma freelance'],
        tips: [
          'Aprender a escribir prompts de calidad es la clave',
          'Siempre humaniza el contenido AI',
          'Construye tu propia base de clientes',
          'Estudia marketing para aumentar tus precios'
        ],
        faq: [
          { q: '¿Necesito ChatGPT Plus?', a: 'Recomendado. GPT-4 produce mayor calidad y mejores tarifas.' },
          { q: '¿Cuándo puedo empezar a ganar?', a: 'La mayoría consigue su primer cliente en 1-3 días.' },
          { q: '¿Los clientes sabrán que uso AI?', a: 'No si editas adecuadamente.' }
        ]
      }
    }
  },
  midjourney: {
    id: 'midjourney',
    icon: '🎨',
    color: '#6366f1',
    category: 'art',
    incomeRange: { min: 5000, max: 15000 },
    difficulty: 3,
    timeToFirstIncome: '3-7 days',
    i18n: {
      'en': {
        name: 'Midjourney',
        headline: 'Midjourney Money Guide: From Zero to $700-$2,100/Month',
        description: 'The king of AI art. Learn it to unlock design freelancing.',
        methods: [
          { title: 'Avatar Customization', desc: 'Create personalized AI avatars for clients', income: '$30-100/image' },
          { title: 'E-commerce Design', desc: 'Product photos, main images, detail pages', income: '$200-1,000/set' },
          { title: 'Wallpaper/Sticker Creation', desc: 'Create and sell phone wallpapers, stickers', income: '$500-3,000/month passive' },
          { title: 'Illustration Outsourcing', desc: 'Book illustrations, poster designs', income: '$500-5,000/project' }
        ],
        tools: ['Midjourney subscription', 'Discord account', 'Photo editing software'],
        tips: [
          'Practice prompt writing to improve output quality',
          'Build your own style library for efficiency',
          'Learn basic Photoshop for post-processing',
          'Value client communication and understanding needs'
        ],
        faq: [
          { q: 'How much is Midjourney subscription?', a: 'Standard plan $30/month, sufficient for freelancing.' },
          { q: 'Can I do this without art skills?', a: 'Absolutely. AI art requires no traditional art background.' },
          { q: 'What about copyright?', a: 'Clarify rights with clients. Commercial use requires attention.' }
        ]
      },
      'zh-cn': {
        name: 'Midjourney',
        headline: 'Midjourney赚钱攻略：从零基础到月入15000+',
        description: 'Midjourney是AI绘画领域的王者，学会它就能开启设计接单之路',
        methods: [
          { title: '头像定制服务', desc: '帮客户生成个性化AI头像、情侣头像', income: '￥30-100/张' },
          { title: '电商设计接单', desc: '做产品图、主图、详情页设计', income: '￥200-1000/套' },
          { title: '壁纸/表情包制作', desc: '制作手机壁纸、微信表情包售卖', income: '￥500-3000/月（被动收入）' },
          { title: '插画设计外包', desc: '接书籍插画、海报设计等', income: '￥500-5000/单' }
        ],
        tools: ['Midjourney订阅', 'Discord账号', '图片编辑软件'],
        tips: [
          '多练习Prompt写法，提高出图质量',
          '建立自己的风格库，提高效率',
          '学会用PS后期处理',
          '重视客户沟通，理解需求'
        ],
        faq: [
          { q: 'Midjourney订阅费用多少？', a: '标准版$30/月，足够接单使用' },
          { q: '不会画画能做吗？', a: '完全可以，AI绘画不需要绘画基础' },
          { q: '版权问题怎么办？', a: '商用需注意，建议与客户明确版权归属' }
        ]
      }
    }
  },
  notion: {
    id: 'notion',
    icon: '📝',
    color: '#000000',
    category: 'productivity',
    incomeRange: { min: 2000, max: 6000 },
    difficulty: 1,
    timeToFirstIncome: '7-14 days',
    i18n: {
      'en': {
        name: 'Notion AI',
        headline: 'Notion AI Monetization: Sell Templates for $280-$840/Month',
        description: 'The world\'s hottest productivity tool. Creating and selling templates is perfect passive income.',
        methods: [
          { title: 'Template Sales', desc: 'Create Notion templates and sell on marketplaces', income: '$10-100/template' },
          { title: 'Knowledge Courses', desc: 'Teach others how to use Notion effectively', income: '$30-200/student' },
          { title: 'Productivity Consulting', desc: 'Help clients build personal management systems', income: '$200-1,000/client' }
        ],
        tools: ['Notion account', 'Notion AI feature', 'Marketplace accounts'],
        tips: [
          'Templates must be beautiful and practical',
          'Study bestsellers to learn from them',
          'Provide good after-sales service',
          'Keep updating to maintain momentum'
        ],
        faq: [
          { q: 'Is Notion AI extra?', a: 'Notion AI requires $10/month subscription.' },
          { q: 'Will templates get copied?', a: 'Build brand identity and trust to differentiate.' },
          { q: 'When will I see income?', a: 'Usually 1-2 weeks for first orders.' }
        ]
      },
      'zh-cn': {
        name: 'Notion AI',
        headline: 'Notion AI变现指南：卖模板月入6000+的完整攻略',
        description: 'Notion是全球最火的效率工具，用AI制作模板售卖是绝佳的被动收入来源',
        methods: [
          { title: '模板售卖', desc: '制作各类Notion模板在小红书售卖', income: '￥9.9-99/份' },
          { title: '知识付费课程', desc: '教别人如何使用Notion', income: '￥29-199/人' },
          { title: '个人效率咨询', desc: '帮客户搭建个人管理系统', income: '￥200-1000/人' }
        ],
        tools: ['Notion账号', 'Notion AI功能', '小红书/知识星球'],
        tips: [
          '模板要美观实用，颜值很重要',
          '多研究爆款模板，学习优点',
          '做好售后服务，积累好评',
          '持续更新，保持热度'
        ],
        faq: [
          { q: 'Notion AI需要额外付费吗？', a: 'Notion AI需要$10/月订阅' },
          { q: '模板会被抄袭吗？', a: '做好品牌标识，建立信任度' },
          { q: '多久能看到收入？', a: '一般1-2周开始有订单' }
        ]
      }
    }
  }
};

// Get tool data for specific locale
export function getToolData(toolId, locale = 'en') {
  const tool = tools[toolId];
  if (!tool) return null;
  
  const i18nData = tool.i18n[locale] || tool.i18n['en'];
  
  return {
    ...tool,
    ...i18nData,
    locale
  };
}

// Get all tools for a locale
export function getAllTools(locale = 'en') {
  return Object.keys(tools).map(id => getToolData(id, locale));
}
