// Affiliate & Tracking Links Configuration
// 集中管理所有工具的推广链接，方便一键替换 Affiliate 链接
// 
// 使用方法：获取到 Affiliate 链接后，直接修改对应工具的 url 字段即可全站生效
// 
// STATUS:
// ✅ ready    = Affiliate链接已接入
// ⏳ pending  = 已申请，等待审批
// 🔗 tracking = 使用UTM追踪链接（等待Affiliate开放）
// ❌ none     = 无Affiliate计划

export const affiliateLinks = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com/?ref=aitoolguide',
    affiliateStatus: 'tracking', // OpenAI暂无公开Affiliate计划
    commission: 'N/A',
    note: 'OpenAI没有公开Affiliate计划。使用UTM追踪。若有Referral Program开放，立即替换。'
  },
  midjourney: {
    name: 'Midjourney',
    url: 'https://midjourney.com/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'Midjourney暂无Affiliate。使用UTM追踪链接。'
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'Anthropic暂无公开Affiliate。有API Referral但不适合个人站。'
  },
  notion: {
    name: 'Notion AI',
    url: 'https://affiliate.notion.so/aitoolguide', // 占位符 - 需要注册后替换
    affiliateStatus: 'pending',
    commission: 'Up to $50/signup + 20% year 1 revenue',
    platform: 'PartnerStack',
    applyUrl: 'https://notion.so/affiliates',
    note: '⚠️ Notion Affiliate 目前暂停接受新申请(not accepting new affiliates)。持续关注重新开放。'
  },
  runway: {
    name: 'Runway',
    url: 'https://runwayml.com/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'Runway有Creative Partners Program但非传统Affiliate。使用UTM追踪。'
  },
  'dall-e-3': {
    name: 'DALL-E 3',
    url: 'https://openai.com/dall-e-3?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'DALL-E 3通过ChatGPT Plus使用，同ChatGPT。'
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://perplexity.ai/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'Perplexity有referral program给用户$10 credit。关注Affiliate开放。'
  },
  'github-copilot': {
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'GitHub/Microsoft暂无公开Copilot Affiliate。'
  },
  gamma: {
    name: 'Gamma',
    url: 'https://gamma.app/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: 'Gamma暂无公开Affiliate计划。'
  },
  'claude-code': {
    name: 'Claude Code',
    url: 'https://claude.ai/?ref=aitoolguide',
    affiliateStatus: 'tracking',
    commission: 'N/A',
    note: '同Claude，Anthropic暂无公开Affiliate。'
  }
};

// 获取工具链接的辅助函数
export function getToolLink(toolId) {
  const tool = affiliateLinks[toolId];
  return tool ? tool.url : '#';
}

// 获取所有待替换为Affiliate的工具
export function getPendingAffiliates() {
  return Object.entries(affiliateLinks)
    .filter(([_, tool]) => tool.affiliateStatus === 'tracking' || tool.affiliateStatus === 'pending')
    .map(([id, tool]) => ({ id, ...tool }));
}
