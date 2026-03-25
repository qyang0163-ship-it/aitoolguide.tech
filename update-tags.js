// Add story tag translations to all locale files
const fs = require('fs');
const path = require('path');

const localesDir = 'C:\\Users\\Administrator\\Documents\\aitoolguide-deploy\\public\\locales';

const tagTranslations = {
  'ar': { tagBeginner: 'مناسب للمبتدئين', tagDesigner: 'مصمم يجب قراءته', tagPassive: 'دخل سلبي' },
  'de': { tagBeginner: 'Anfängerfreundlich', tagDesigner: 'Designer-Must-Read', tagPassive: 'Passives Einkommen' },
  'en': { tagBeginner: 'Beginner Friendly', tagDesigner: 'Designer Must-Read', tagPassive: 'Passive Income' },
  'es': { tagBeginner: 'Para principiantes', tagDesigner: 'Diseñadores deben leer', tagPassive: 'Ingreso pasivo' },
  'fr': { tagBeginner: 'Débutant friendly', tagDesigner: 'Designer must-read', tagPassive: 'Revenu passif' },
  'hi': { tagBeginner: 'नौसिखिया अनुकूल', tagDesigner: 'डिजाइनर के लिए जरूरी', tagPassive: 'निष्क्रिय आय' },
  'id': { tagBeginner: 'Ramah Pemula', tagDesigner: 'Wajib Baca Designer', tagPassive: 'Pendapatan Pasif' },
  'ja': { tagBeginner: '初心者向け', tagDesigner: 'デザイナー必読', tagPassive: '不労所得' },
  'ko': { tagBeginner: '초보자 친화적', tagDesigner: '디자이너 필독', tagPassive: '수동적 소득' },
  'pt': { tagBeginner: 'Para iniciantes', tagDesigner: 'Designer deve ler', tagPassive: 'Renda passiva' },
  'ru': { tagBeginner: 'Для новичков', tagDesigner: 'Дизайнеру обязательно', tagPassive: 'Пассивный доход' },
  'th': { tagBeginner: 'เหมาะกับมือใหม่', tagDesigner: 'นักออกแบบต้องอ่าน', tagPassive: 'รายได้แบบพาสซีฟ' },
  'tr': { tagBeginner: 'Yeni Başlayanlar İçin', tagDesigner: 'Tasarımcı İçin', tagPassive: 'Pasif Gelir' },
  'vi': { tagBeginner: 'Thân thiện người mới', tagDesigner: 'Designer nên đọc', tagPassive: 'Thu nhập thụ động' },
  'zh-CN': { tagBeginner: '新手友好', tagDesigner: '设计师必读', tagPassive: '被动收入' },
  'zh-TW': { tagBeginner: '新手友好', tagDesigner: '設計師必讀', tagPassive: '被動收入' }
};

const files = Object.keys(tagTranslations);

files.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newKeys = tagTranslations[lang];
    
    // Add new keys
    Object.assign(content, newKeys);
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Updated ${lang}.json`);
  } catch (err) {
    console.error(`❌ Failed ${lang}.json: ${err.message}`);
  }
});

console.log('Done!');
