// Add Top 100 navigation and partner perks translations
const fs = require('fs');
const path = require('path');

const localesDir = 'C:\\Users\\Administrator\\Documents\\aitoolguide-deploy\\public\\locales';

const translations = {
  'en': {
    navTop100: 'Top 100 AI',
    partnerPerks: '🎁 Official Partner Perks',
    unlockGuide: '🔥 Unlock Earning Guide',
    top100Title: 'Top 100 AI Tools Directory',
    top100Desc: 'Discover the most popular AI tools ranked by global traffic and usage',
    top100Partner: 'Partner',
    top100Category: 'Category',
    top100Visit: 'Visit'
  },
  'zh-CN': {
    navTop100: 'AI工具百强',
    partnerPerks: '🎁 官方合作福利',
    unlockGuide: '🔥 注册解锁独家变现教程',
    top100Title: 'AI工具百强榜',
    top100Desc: '发现全球流量和使用量最高的热门AI工具',
    top100Partner: '合作',
    top100Category: '分类',
    top100Visit: '访问'
  },
  'zh-TW': {
    navTop100: 'AI工具百強',
    partnerPerks: '🎁 官方合作福利',
    unlockGuide: '🔥 註冊解鎖獨家變現教程',
    top100Title: 'AI工具百強榜',
    top100Desc: '發現全球流量和使用量最高的熱門AI工具',
    top100Partner: '合作',
    top100Category: '分類',
    top100Visit: '訪問'
  },
  'ja': {
    navTop100: 'AIツール100選',
    partnerPerks: '🎁 公式パートナー特典',
    unlockGuide: '🔥 登録で独占収益化ガイド',
    top100Title: 'AIツールランキング100',
    top100Desc: 'グローバルトラフィックと使用率でランキングされた人気AIツール',
    top100Partner: 'パートナー',
    top100Category: 'カテゴリ',
    top100Visit: '訪問'
  },
  'ko': {
    navTop100: 'AI 도구 TOP 100',
    partnerPerks: '🎁 공식 파트너 혜택',
    unlockGuide: '🔥 가입하고 독점 수익화 가이드',
    top100Title: 'AI 도구 TOP 100',
    top100Desc: '글로벌 트래픽과 사용량 기준 인기 AI 도구 발견',
    top100Partner: '파트너',
    top100Category: '카테고리',
    top100Visit: '방문'
  },
  'es': {
    navTop100: 'Top 100 IA',
    partnerPerks: '🎁 Beneficios Oficiales',
    unlockGuide: '🔥 Regístrate para Guía Exclusiva',
    top100Title: 'Directorio Top 100 Herramientas IA',
    top100Desc: 'Descubre las herramientas IA más populares por tráfico global',
    top100Partner: 'Partner',
    top100Category: 'Categoría',
    top100Visit: 'Visitar'
  },
  'fr': {
    navTop100: 'Top 100 IA',
    partnerPerks: '🎁 Avantages Partenaire',
    unlockGuide: '🔥 Inscrivez-vous pour Guide Exclusif',
    top100Title: 'Annuaire Top 100 Outils IA',
    top100Desc: 'Découvrez les outils IA les plus populaires par trafic mondial',
    top100Partner: 'Partner',
    top100Category: 'Catégorie',
    top100Visit: 'Visiter'
  },
  'de': {
    navTop100: 'Top 100 KI',
    partnerPerks: '🎁 Offizielle Partner-Vorteile',
    unlockGuide: '🔥 Registrieren für Exklusiven Guide',
    top100Title: 'Top 100 KI-Tools Verzeichnis',
    top100Desc: 'Entdecken Sie die beliebtesten KI-Tools nach globalem Traffic',
    top100Partner: 'Partner',
    top100Category: 'Kategorie',
    top100Visit: 'Besuchen'
  },
  'pt': {
    navTop100: 'Top 100 IA',
    partnerPerks: '🎁 Benefícios Parceiro',
    unlockGuide: '🔥 Cadastre-se para Guia Exclusivo',
    top100Title: 'Diretório Top 100 Ferramentas IA',
    top100Desc: 'Descubra as ferramentas IA mais populares por tráfego global',
    top100Partner: 'Parceiro',
    top100Category: 'Categoria',
    top100Visit: 'Visitar'
  },
  'ru': {
    navTop100: 'Топ 100 ИИ',
    partnerPerks: '🎁 Преимущества Партнера',
    unlockGuide: '🔥 Регистрация для Эксклюзивного Гида',
    top100Title: 'Каталог Топ 100 ИИ-инструментов',
    top100Desc: 'Откройте самые популярные ИИ-инструменты по глобальному трафику',
    top100Partner: 'Партнер',
    top100Category: 'Категория',
    top100Visit: 'Посетить'
  },
  'ar': {
    navTop100: 'أفضل 100 ذكاء اصطناعي',
    partnerPerks: '🎁 مزايا الشريك الرسمي',
    unlockGuide: '🔥 سجل للحصول على دليل حصري',
    top100Title: 'دليل أفضل 100 أداة ذكاء اصطناعي',
    top100Desc: 'اكتشف أدوات الذكاء الاصطناعي الأكثر شعبية حسب حركة المرور العالمية',
    top100Partner: 'شريك',
    top100Category: 'الفئة',
    top100Visit: 'زيارة'
  },
  'hi': {
    navTop100: 'शीर्ष 100 AI',
    partnerPerks: '🎁 आधिकारिक पार्टनर लाभ',
    unlockGuide: '🔥 पंजीकरण करें एक्सक्लूसिव गाइड के लिए',
    top100Title: 'शीर्ष 100 AI टूल निर्देशिका',
    top100Desc: 'वैश्विक ट्रैफिक के आधार पर सबसे लोकप्रिय AI टूल खोजें',
    top100Partner: 'पार्टनर',
    top100Category: 'श्रेणी',
    top100Visit: 'देखें'
  },
  'th': {
    navTop100: '100 อันดับ AI',
    partnerPerks: '🎁 สิทธิประโยชน์พันธมิตร',
    unlockGuide: '🔥 ลงทะเบียนเพื่อรับคู่มือพิเศษ',
    top100Title: 'ไดเรกทอรี 100 อันดับเครื่องมือ AI',
    top100Desc: 'ค้นพบเครื่องมือ AI ยอดนิยมตามปริมาณการเข้าชมทั่วโลก',
    top100Partner: 'พันธมิตร',
    top100Category: 'หมวดหมู่',
    top100Visit: 'เข้าชม'
  },
  'tr': {
    navTop100: 'En İyi 100 YZ',
    partnerPerks: '🎁 Resmi Ortak Avantajları',
    unlockGuide: '🔥 Kaydolun Özel Rehber için',
    top100Title: 'En İyi 100 YZ Aracı Dizini',
    top100Desc: 'Küresel trafiğe göre en popüler YZ araçlarını keşfedin',
    top100Partner: 'Ortak',
    top100Category: 'Kategori',
    top100Visit: 'Ziyaret'
  },
  'vi': {
    navTop100: 'Top 100 AI',
    partnerPerks: '🎁 Ưu đãi Đối tác Chính thức',
    unlockGuide: '🔥 Đăng ký để nhận Hướng dẫn Độc quyền',
    top100Title: 'Danh mục Top 100 Công cụ AI',
    top100Desc: 'Khám phá các công cụ AI phổ biến nhất theo lưu lượng toàn cầu',
    top100Partner: 'Đối tác',
    top100Category: 'Danh mục',
    top100Visit: 'Truy cập'
  },
  'id': {
    navTop100: '100 AI Teratas',
    partnerPerks: '🎁 Keuntungan Mitra Resmi',
    unlockGuide: '🔥 Daftar untuk Panduan Eksklusif',
    top100Title: 'Direktori 100 Alat AI Teratas',
    top100Desc: 'Temukan alat AI paling populer berdasarkan lalu lintas global',
    top100Partner: 'Mitra',
    top100Category: 'Kategori',
    top100Visit: 'Kunjungi'
  }
};

const files = Object.keys(translations);

files.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newKeys = translations[lang];
    
    Object.assign(content, newKeys);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated ${lang}.json`);
  } catch (err) {
    console.error(`❌ Failed ${lang}.json: ${err.message}`);
  }
});

console.log('Done!');
