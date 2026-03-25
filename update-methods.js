// Add method_* translations for all 16 languages
const fs = require('fs');
const path = require('path');

const localesDir = 'C:\\Users\\Administrator\\Documents\\aitoolguide-deploy\\public\\locales';

const methodTranslations = {
  'en': {
    method_chatgpt: 'Copywriting & Ghostwriting',
    method_midjourney: 'AI Art & Design Services',
    method_claude: 'Long-form Writing & Code',
    method_notion: 'Templates & Courses',
    method_runway: 'Video Editing & Production',
    method_dalle3: 'Image Generation & Design',
    method_perplexity: 'Research & Reports',
    method_copilot: 'Development & Consulting',
    method_gamma: 'Presentation Design',
    method_claudecode: 'Automation & Scripting'
  },
  'zh-CN': {
    method_chatgpt: '文案代写与代笔',
    method_midjourney: 'AI绘画与设计服务',
    method_claude: '长文写作与代码',
    method_notion: '模板与课程',
    method_runway: '视频剪辑与制作',
    method_dalle3: '图像生成与设计',
    method_perplexity: '调研与报告',
    method_copilot: '开发与咨询',
    method_gamma: '演示文稿设计',
    method_claudecode: '自动化与脚本'
  },
  'zh-TW': {
    method_chatgpt: '文案代寫與代筆',
    method_midjourney: 'AI繪畫與設計服務',
    method_claude: '長文寫作與代碼',
    method_notion: '模板與課程',
    method_runway: '影片剪輯與製作',
    method_dalle3: '圖像生成與設計',
    method_perplexity: '調研與報告',
    method_copilot: '開發與諮詢',
    method_gamma: '演示文稿設計',
    method_claudecode: '自動化與腳本'
  },
  'ja': {
    method_chatgpt: 'コピーライティング＆代筆',
    method_midjourney: 'AIアート＆デザインサービス',
    method_claude: '長文作成＆コード',
    method_notion: 'テンプレート＆コース',
    method_runway: '動画編集＆制作',
    method_dalle3: '画像生成＆デザイン',
    method_perplexity: '調査＆レポート',
    method_copilot: '開発＆コンサルティング',
    method_gamma: 'プレゼンテーション設計',
    method_claudecode: '自動化＆スクリプト'
  },
  'ko': {
    method_chatgpt: '카피라이팅 및 대필',
    method_midjourney: 'AI 아트 및 디자인 서비스',
    method_claude: '장문 작성 및 코드',
    method_notion: '템플릿 및 코스',
    method_runway: '영상 편집 및 제작',
    method_dalle3: '이미지 생성 및 디자인',
    method_perplexity: '리서치 및 보고서',
    method_copilot: '개발 및 컨설팅',
    method_gamma: '프레젠테이션 디자인',
    method_claudecode: '자동화 및 스크립트'
  },
  'es': {
    method_chatgpt: 'Redacción y Ghostwriting',
    method_midjourney: 'Arte IA y Servicios de Diseño',
    method_claude: 'Escritura Larga y Código',
    method_notion: 'Plantillas y Cursos',
    method_runway: 'Edición y Producción de Video',
    method_dalle3: 'Generación de Imágenes y Diseño',
    method_perplexity: 'Investigación e Informes',
    method_copilot: 'Desarrollo y Consultoría',
    method_gamma: 'Diseño de Presentaciones',
    method_claudecode: 'Automatización y Scripts'
  },
  'fr': {
    method_chatgpt: 'Rédaction et Ghostwriting',
    method_midjourney: 'Art IA et Services de Design',
    method_claude: 'Rédaction Longue et Code',
    method_notion: 'Modèles et Cours',
    method_runway: 'Montage et Production Vidéo',
    method_dalle3: 'Génération d\'Images et Design',
    method_perplexity: 'Recherche et Rapports',
    method_copilot: 'Développement et Conseil',
    method_gamma: 'Conception de Présentations',
    method_claudecode: 'Automatisation et Scripts'
  },
  'de': {
    method_chatgpt: 'Copywriting und Ghostwriting',
    method_midjourney: 'KI-Kunst und Design-Services',
    method_claude: 'Langform und Code',
    method_notion: 'Vorlagen und Kurse',
    method_runway: 'Video-Bearbeitung und Produktion',
    method_dalle3: 'Bildgenerierung und Design',
    method_perplexity: 'Recherche und Berichte',
    method_copilot: 'Entwicklung und Beratung',
    method_gamma: 'Präsentationsdesign',
    method_claudecode: 'Automatisierung und Skripte'
  },
  'pt': {
    method_chatgpt: 'Copywriting e Ghostwriting',
    method_midjourney: 'Arte IA e Serviços de Design',
    method_claude: 'Escrita Longa e Código',
    method_notion: 'Templates e Cursos',
    method_runway: 'Edição e Produção de Vídeo',
    method_dalle3: 'Geração de Imagens e Design',
    method_perplexity: 'Pesquisa e Relatórios',
    method_copilot: 'Desenvolvimento e Consultoria',
    method_gamma: 'Design de Apresentações',
    method_claudecode: 'Automação e Scripts'
  },
  'ru': {
    method_chatgpt: 'Копирайтинг и Гострайтинг',
    method_midjourney: 'ИИ-Арт и Дизайн-услуги',
    method_claude: 'Длинные тексты и Код',
    method_notion: 'Шаблоны и Курсы',
    method_runway: 'Монтаж и Производство видео',
    method_dalle3: 'Генерация изображений и Дизайн',
    method_perplexity: 'Исследования и Отчеты',
    method_copilot: 'Разработка и Консалтинг',
    method_gamma: 'Дизайн презентаций',
    method_claudecode: 'Автоматизация и Скрипты'
  },
  'ar': {
    method_chatgpt: 'كتابة الإعلانات والكتابة بالنيابة',
    method_midjourney: 'فن الذكاء الاصطناعي وخدمات التصميم',
    method_claude: 'الكتابة الطويلة والبرمجة',
    method_notion: 'القوالب والدورات',
    method_runway: 'تحرير وإنتاج الفيديو',
    method_dalle3: 'توليد الصور والتصميم',
    method_perplexity: 'البحث والتقارير',
    method_copilot: 'التطوير والاستشارات',
    method_gamma: 'تصميم العروض التقديمية',
    method_claudecode: 'الأتمتة والسكربتات'
  },
  'hi': {
    method_chatgpt: 'कॉपीराइटिंग और गोस्टराइटिंग',
    method_midjourney: 'AI कला और डिजाइन सेवाएं',
    method_claude: 'लंबी लेखन और कोड',
    method_notion: 'टेम्पलेट और कोर्स',
    method_runway: 'वीडियो एडिटिंग और प्रोडक्शन',
    method_dalle3: 'इमेज जनरेशन और डिजाइन',
    method_perplexity: 'रिसर्च और रिपोर्ट्स',
    method_copilot: 'डेवलपमेंट और कंसल्टिंग',
    method_gamma: 'प्रेजेंटेशन डिजाइन',
    method_claudecode: 'ऑटोमेशन और स्क्रिप्टिंग'
  },
  'th': {
    method_chatgpt: 'การเขียนคำโฆษณาและการเขียนแทน',
    method_midjourney: 'ศิลปะ AI และบริการออกแบบ',
    method_claude: 'การเขียนบทความยาวและโค้ด',
    method_notion: 'เทมเพลตและคอร์ส',
    method_runway: 'การตัดต่อและผลิตวิดีโอ',
    method_dalle3: 'การสร้างภาพและการออกแบบ',
    method_perplexity: 'การวิจัยและรายงาน',
    method_copilot: 'การพัฒนาและให้คำปรึกษา',
    method_gamma: 'การออกแบบงานนำเสนอ',
    method_claudecode: 'การทำงานอัตโนมัติและสคริปต์'
  },
  'tr': {
    method_chatgpt: 'Metin Yazarlığı ve Ghostwriting',
    method_midjourney: 'AI Sanatı ve Tasarım Hizmetleri',
    method_claude: 'Uzun Form Yazım ve Kod',
    method_notion: 'Şablonlar ve Kurslar',
    method_runway: 'Video Düzenleme ve Prodüksiyon',
    method_dalle3: 'Görüntü Oluşturma ve Tasarım',
    method_perplexity: 'Araştırma ve Raporlar',
    method_copilot: 'Geliştirme ve Danışmanlık',
    method_gamma: 'Sunum Tasarımı',
    method_claudecode: 'Otomasyon ve Scriptler'
  },
  'vi': {
    method_chatgpt: 'Viết quảng cáo và Viết thuê',
    method_midjourney: 'Nghệ thuật AI và Dịch vụ Thiết kế',
    method_claude: 'Viết dài hạn và Code',
    method_notion: 'Mẫu và Khóa học',
    method_runway: 'Chỉnh sửa và Sản xuất Video',
    method_dalle3: 'Tạo hình ảnh và Thiết kế',
    method_perplexity: 'Nghiên cứu và Báo cáo',
    method_copilot: 'Phát triển và Tư vấn',
    method_gamma: 'Thiết kế Thuyết trình',
    method_claudecode: 'Tự động hóa và Script'
  },
  'id': {
    method_chatgpt: 'Copywriting dan Ghostwriting',
    method_midjourney: 'Seni AI dan Layanan Desain',
    method_claude: 'Penulisan Panjang dan Kode',
    method_notion: 'Template dan Kursus',
    method_runway: 'Editing dan Produksi Video',
    method_dalle3: 'Generasi Gambar dan Desain',
    method_perplexity: 'Riset dan Laporan',
    method_copilot: 'Pengembangan dan Konsultasi',
    method_gamma: 'Desain Presentasi',
    method_claudecode: 'Otomatisasi dan Script'
  }
};

const files = Object.keys(methodTranslations);

files.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newKeys = methodTranslations[lang];
    
    Object.assign(content, newKeys);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated ${lang}.json with method translations`);
  } catch (err) {
    console.error(`❌ Failed ${lang}.json: ${err.message}`);
  }
});

console.log('Done!');
