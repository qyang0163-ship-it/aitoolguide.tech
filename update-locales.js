// Batch update locale files with new translation keys
const fs = require('fs');
const path = require('path');

const localesDir = 'C:\\Users\\Administrator\\Documents\\aitoolguide-deploy\\public\\locales';

const translations = {
  'ar': { catWritingDesc: 'كتابة الإعلانات، إنشاء المحتوى', catArtDesc: 'تخصيص الصورة الرمزية، التصميم', catVideoDesc: 'فيديوهات قصيرة، إنتاج الإعلانات', catCodeDesc: 'التطوير، تخصيص السكربتات', catKnowledgeDesc: 'دورات، قوالب، موارد', catProductivityDesc: 'الأتمتة، الكفاءة' },
  'de': { catWritingDesc: 'Copywriting, Content-Erstellung', catArtDesc: 'Avatar-Anpassung, Design', catVideoDesc: 'Kurzvideos, Werbeproduktion', catCodeDesc: 'Entwicklung, Skript-Anpassung', catKnowledgeDesc: 'Kurse, Vorlagen, Ressourcen', catProductivityDesc: 'Automatisierung, Effizienz' },
  'es': { catWritingDesc: 'Redacción, creación de contenido', catArtDesc: 'Personalización de avatares, diseño', catVideoDesc: 'Videos cortos, producción de anuncios', catCodeDesc: 'Desarrollo, scripts personalizados', catKnowledgeDesc: 'Cursos, plantillas, recursos', catProductivityDesc: 'Automatización, eficiencia' },
  'fr': { catWritingDesc: 'Rédaction, création de contenu', catArtDesc: 'Personnalisation avatar, design', catVideoDesc: 'Vidéos courtes, production publicitaire', catCodeDesc: 'Développement, scripts', catKnowledgeDesc: 'Cours, modèles, ressources', catProductivityDesc: 'Automatisation, efficacité' },
  'hi': { catWritingDesc: 'कॉपीराइटिंग, सामग्री निर्माण', catArtDesc: 'अवतार अनुकूलन, डिजाइन', catVideoDesc: 'लघु वीडियो, विज्ञापन निर्माण', catCodeDesc: 'विकास, स्क्रिप्ट अनुकूलन', catKnowledgeDesc: 'पाठ्यक्रम, टेम्पलेट, संसाधन', catProductivityDesc: 'स्वचालन, दक्षता' },
  'id': { catWritingDesc: 'Copywriting, pembuatan konten', catArtDesc: 'Kustomisasi avatar, desain', catVideoDesc: 'Video pendek, produksi iklan', catCodeDesc: 'Pengembangan, kustomisasi skrip', catKnowledgeDesc: 'Kursus, template, sumber daya', catProductivityDesc: 'Otomatisasi, efisiensi' },
  'ja': { catWritingDesc: 'コピーライティング、コンテンツ作成', catArtDesc: 'アバター作成、デザイン受注', catVideoDesc: '短編動画、広告制作', catCodeDesc: '開発、スクリプト作成', catKnowledgeDesc: 'コース、テンプレート、資料', catProductivityDesc: '自動化、効率向上' },
  'ko': { catWritingDesc: '카피라이팅, 콘텐츠 제작', catArtDesc: '아바타 커스터마이징, 디자인', catVideoDesc: '짧은 동영상, 광고 제작', catCodeDesc: '개발, 스크립트 커스터마이징', catKnowledgeDesc: '코스, 템플릿, 자료', catProductivityDesc: '자동화, 효율성' },
  'pt': { catWritingDesc: 'Copywriting, criação de conteúdo', catArtDesc: 'Personalização de avatar, design', catVideoDesc: 'Vídeos curtos, produção de anúncios', catCodeDesc: 'Desenvolvimento, scripts', catKnowledgeDesc: 'Cursos, templates, recursos', catProductivityDesc: 'Automação, eficiência' },
  'ru': { catWritingDesc: 'Копирайтинг, создание контента', catArtDesc: 'Настройка аватара, дизайн', catVideoDesc: 'Короткие видео, рекламное производство', catCodeDesc: 'Разработка, настройка скриптов', catKnowledgeDesc: 'Курсы, шаблоны, ресурсы', catProductivityDesc: 'Автоматизация, эффективность' },
  'th': { catWritingDesc: 'การเขียนคำโฆษณา การสร้างเนื้อหา', catArtDesc: 'ปรับแต่งอวตาร ออกแบบ', catVideoDesc: 'วิดีโอสั้น ผลิตโฆษณา', catCodeDesc: 'การพัฒนา การปรับแต่งสคริปต์', catKnowledgeDesc: 'คอร์ส เทมเพลต เอกสาร', catProductivityDesc: 'การทำงานอัตโนมัติ ประสิทธิภาพ' },
  'tr': { catWritingDesc: 'Metin yazarlığı, içerik oluşturma', catArtDesc: 'Avatar özelleştirme, tasarım', catVideoDesc: 'Kısa videolar, reklam yapımı', catCodeDesc: 'Geliştirme, script özelleştirme', catKnowledgeDesc: 'Kurslar, şablonlar, kaynaklar', catProductivityDesc: 'Otomasyon, verimlilik' },
  'vi': { catWritingDesc: 'Viết quảng cáo, tạo nội dung', catArtDesc: 'Tùy chỉnh avatar, thiết kế', catVideoDesc: 'Video ngắn, sản xuất quảng cáo', catCodeDesc: 'Phát triển, tùy chỉnh script', catKnowledgeDesc: 'Khóa học, mẫu, tài liệu', catProductivityDesc: 'Tự động hóa, hiệu suất' },
  'zh-TW': { catWritingDesc: '文案代寫、內容創作', catArtDesc: '頭像定制、設計接單', catVideoDesc: '短視頻、廣告製作', catCodeDesc: '程序開發、腳本定制', catKnowledgeDesc: '課程、模板、資料', catProductivityDesc: '自動化、效率提升' }
};

const files = Object.keys(translations);

files.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newKeys = translations[lang];
    
    // Add new keys
    Object.assign(content, newKeys);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated ${lang}.json`);
  } catch (err) {
    console.error(`❌ Failed ${lang}.json: ${err.message}`);
  }
});

console.log('Done!');
