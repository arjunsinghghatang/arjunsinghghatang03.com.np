import { ContentItem, CategoryType } from '../types';

// Category fallback thumbnails ensuring relevant imagery for every post & feed
export const CATEGORY_THUMBNAILS: Record<string, string[]> = {
  sports: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c6232661c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579952318893-20a31006100e?auto=format&fit=crop&w=800&q=80'
  ],
  news: [
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80'
  ],
  bbs: [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80'
  ],
  economy: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'
  ],
  youtube: [
    'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
  ],
  tech: [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  ],
  politic: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=800&q=80'
  ],
  movie: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'
  ],
  game: [
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  ]
};

const LIVE_NEWS_POOL: Array<{
  title: string;
  category: CategoryType;
  categoryLabel: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  platformSource: 'portal' | 'facebook' | 'youtube' | 'bbs' | 'github' | 'tiktok';
}> = [
  {
    title: '🇳🇵 ब्रेकिङ: स्याङ्जा वालिङ नगरपालिकामा नयाँ सूचना प्रविधि पार्क तथा डिजिटल केन्द्रको शिलान्यास',
    category: 'news',
    categoryLabel: 'नेपाल खबर (NEWS)',
    description: 'गण्डकी प्रदेश स्याङ्जा वालिङमा स्थानीय युवा तथा विद्यार्थीहरूका लागि आधुनिक डिजिटल लाइब्रेरी तथा आईटी पार्कको निर्माण कार्य सुरु भएको छ। CEO अर्जुन सिंह घताङले नयाँ प्रविधि अभियानको स्वागत गर्नुभएको छ।',
    tags: ['Syangja', 'Waling', 'IT Park', 'Digital Nepal', 'Ghandaki'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    platformSource: 'portal'
  },
  {
    title: '🎓 त्रिभुवन विश्वविद्यालय BBS चौथो वर्षको नतिजा र नयाँ पाठ्यसामग्री सार्वजनिक',
    category: 'bbs',
    categoryLabel: 'TU BBS NOTES',
    description: 'त्रिभुवन विश्वविद्यालय परीक्षा नियन्त्रण कार्यालयद्वारा BBS परीक्षा सम्बन्धी महत्वपूर्ण सूचना जारी। अर्जुन सिंह घताङ पोर्टलमा चौथो वर्षको Business Research Methods नोटहरू नि:शुल्क उपलब्ध गराइएको छ।',
    tags: ['TU', 'BBS Notes', 'Syllabus', 'Exam Update', 'Nepal Education'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    platformSource: 'bbs'
  },
  {
    title: '⚽ नेपाली राष्ट्रिय फुटबल टोलीको नयाँ प्रशिक्षण शिविर काठमाडौँमा सुरु',
    category: 'sports',
    categoryLabel: 'खेलकुद (SPORTS)',
    description: 'आगामी अन्तर्राष्ट्रिय खेलको तयारीका लागि नेपाली फुटबल टोली दशरथ रङ्गशालामा बन्द प्रशिक्षणमा जुटेको छ। प्रशिक्षकले युवा खेलाडीहरूको उच्च प्रदर्शन रहने विश्वास व्यक्त गरेका छन्।',
    tags: ['Nepal Sports', 'Football', 'Dasharath Stadium', 'Kathmandu'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    platformSource: 'portal'
  },
  {
    title: '📈 नेपाल राष्ट्र बैंकद्वारा नयाँ मौद्रिक नीति परिमार्जन: डिजिटल भुक्तानीमा विशेष छुट',
    category: 'economy',
    categoryLabel: 'अर्थतन्त्र (ECONOMY)',
    description: 'बैंक तथा वित्तीय संस्थामा क्युआर कोड तथा अनलाइन बैंकिङ प्रयोग बढाउन नेपाल राष्ट्र बैंकले नयाँ सहुलियत नीति ल्याएको छ। यसले साना व्यवसायी र विद्यार्थीहरूलाई सहज हुनेछ।',
    tags: ['Nepal Economy', 'NRB', 'Monetary Policy', 'Digital Banking'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    platformSource: 'portal'
  },
  {
    title: '🎥 अर्जुन सिंह घताङ युट्युब च्यानलमा नयाँ भीलॉग "Syangja Waling to Kathmandu Journey" सार्वजनिक',
    category: 'youtube',
    categoryLabel: 'युट्युब भीलॉग (YOUTUBE)',
    description: 'स्याङ्जा वालिङको रमणीय दृश्य, स्थानीय संस्कृति र काठमाडौँसम्मको यात्रा समेटिएको नयाँ युट्युब भिडियो अर्जुन सिंह घताङ आधिकारिक युट्युब च्यानलमा रिलिज भएको छ।',
    tags: ['YouTube', 'Arjun Singh Ghatang', 'Vlog', 'Syangja', 'Kathmandu'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80',
    platformSource: 'youtube'
  },
  {
    title: '💻 AI र OpenAI को नयाँ च्याटमोडेल सार्वजनिक: कोडिङ र अनुसन्धान थप तीव्र',
    category: 'tech',
    categoryLabel: 'प्रविधि (TECH)',
    description: 'विश्वव्यापी आर्टिफिसियल इन्टेलिजेन्स क्षेत्रमा नयाँ क्रान्ति! नयाँ एआई मोडलले वेब विकास र शैक्षिक अनुसन्धानलाई ५ गुणा तीव्र बनाउने दाबी गरिएको छ।',
    tags: ['AI', 'Tech News', 'Artificial Intelligence', 'Innovation'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    platformSource: 'github'
  },
  {
    title: '🏛️ संसदमा नयाँ युवा उद्यमशीलता तथा प्रविधि विधेयक प्रस्तुत',
    category: 'politic',
    categoryLabel: 'राजनीति (POLITICS)',
    description: 'नेपालमा युवा स्वरोजगार र स्टार्टअप प्रोत्साहन गर्न नयाँ ऐन निर्माण प्रक्रिया सुरु। युवा उद्यमी अर्जुन सिंह घताङले विधेयकले नयाँ अवसर सिर्जना गर्ने बताउनुभएको छ।',
    tags: ['Politics', 'Parliament', 'Nepal Law', 'Youth Startup'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    platformSource: 'portal'
  },
  {
    title: '🎬 नेपाली चलचित्र उद्योगमा नयाँ प्रविधिको प्रयोग: ४K सिनेमाटोग्राफी प्रवर्धन',
    category: 'movie',
    categoryLabel: 'मनोरञ्जन (MOVIES)',
    description: 'नेपाली चलचित्रहरू अन्तर्राष्ट्रिय बजारमा प्रतिस्पर्धा गर्न आधुनिक दृश्य प्रविधि र साउन्ड ट्र्याकतर्फ आकर्षित हुँदैछन्।',
    tags: ['Nepali Cinema', 'Entertainment', 'Movie News', 'Kollywood'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    platformSource: 'facebook'
  },
  {
    title: '🎮 स्याङ्जा इ-स्पोर्ट्स च्याम्पियनसिप: PUBG Mobile र MLBB टोलीहरूको भिडन्त',
    category: 'game',
    categoryLabel: 'गेमिङ (GAME)',
    description: 'गण्डकी प्रदेश स्तरीय ई-स्पोर्ट्स प्रतियोगिताको फाइनल चरण। युवा ग्यामरहरूलाई अर्जुन सिंह घताङद्वारा बधाई तथा पुरस्कार वितरण।',
    tags: ['Esports', 'PUBG Mobile', 'Gaming Nepal', 'Syangja'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    platformSource: 'facebook'
  },
  {
    title: '🏏 क्यान (CAN) द्वारा नेपाल प्रिमियर लिग (NPL) को नयाँ खेल तालिका सार्वजनिक',
    category: 'sports',
    categoryLabel: 'खेलकुद (SPORTS)',
    description: 'नेपाली क्रिकेट समर्थकहरूका लागि ठूलो खबर! एनपिएल (NPL) का सबै खेलहरू कीर्तिपुर क्रिकेट मैदानमा आयोजना हुने।',
    tags: ['Nepal Cricket', 'NPL', 'CAN', 'TU Cricket Ground'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    platformSource: 'portal'
  }
];

let feedCounter = 100;

export function generateNextLiveFeedItem(): ContentItem {
  feedCounter++;
  const randomIndex = Math.floor(Math.random() * LIVE_NEWS_POOL.length);
  const base = LIVE_NEWS_POOL[randomIndex];

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const views = Math.floor(Math.random() * 800) + 120;

  // Pick contextual thumbnail from category array if available
  const catList = CATEGORY_THUMBNAILS[base.category] || CATEGORY_THUMBNAILS['news'];
  const thumb = catList[feedCounter % catList.length] || base.thumbnailUrl;

  return {
    id: `live-feed-${Date.now()}-${feedCounter}`,
    title: `${base.title} [लाइभ - ${timeStr}]`,
    category: base.category,
    categoryLabel: base.categoryLabel,
    description: `${base.description} (अपडेट समय: ${timeStr} | प्रत्यक्ष समाचार फिड)`,
    tags: [...base.tags, 'LiveUpdates', 'RealtimeFeed'],
    date: new Date().toISOString(),
    views: views,
    thumbnailUrl: thumb,
    featured: feedCounter % 3 === 0,
    platformSource: base.platformSource,
    authorName: 'ARJUN SINGH GHATANG (CEO)',
    authorAvatar: '/arjun_profile_pic.jpg',
    isAutoSynced: true,
    syncedTime: `${timeStr} (Just Now)`
  };
}
