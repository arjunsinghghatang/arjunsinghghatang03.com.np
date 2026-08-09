export type SupportedLanguage = 'ne' | 'en' | 'hi' | 'ja' | 'zh' | 'es';

export interface TranslationDictionary {
  // Header / Profile details
  ceoTitle: string;
  ceoSubRole: string;
  ceoBio: string;
  location: string;
  followers: string;
  following: string;
  posts: string;
  views: string;
  verifiedOfficial: string;
  activeNow: string;
  follow: string;
  followingBtn: string;
  editProfile: string;
  ceoAnalytics: string;
  socialChannels: string;
  adsenseHub: string;
  payoutsMonetization: string;
  securityTools: string;
  settings: string;
  liveChatAI: string;
  
  // Navigation & Tabs
  home: string;
  sports: string;
  news: string;
  politics: string;
  economy: string;
  games: string;
  movies: string;
  allFeeds: string;
  nepalWorldNews: string;
  bbsNotes: string;
  youtubeVideos: string;
  facebookPosts: string;
  githubRepos: string;
  tiktokFeeds: string;
  uploadedVideos: string;
  photosGallery: string;
  noticesStatus: string;
  savedBookmarks: string;

  // Search & Filters
  searchPlaceholder: string;
  filterAll: string;
  sortByRecent: string;
  sortByPopular: string;
  sortByTitle: string;
  
  // Create Post
  createPostPlaceholder: string;
  postButton: string;
  photoVideo: string;
  feelingActivity: string;
  
  // Help & Contact
  officeLocations: string;
  contactUs: string;
  helpDeskFAQ: string;
  syncNow: string;
  syncingText: string;

  // Footer & Badges
  copyrightRights: string;
  officialChannelNotice: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  ne: {
    ceoTitle: "फाउन्डर तथा प्रमुख कार्यकारी अधिकृत (CEO)",
    ceoSubRole: "युवा उद्यमी, डिजिटल मिडिया प्रविधि विश्लेषक तथा समाजसेवी",
    ceoBio: "स्याङ्जा वालिङमा जन्मिएका अर्जुन सिंह घताङ नेपालको डिजिटल सञ्चार, अनलाइन पत्रकारिता, र त्रिभुवन विश्वविद्यालय BBS शिक्षा सुधारमा अग्रसर व्यक्तित्व हुन्।",
    location: "वालिङ, स्याङ्जा / काठमाडौँ, नेपाल",
    followers: "फलोअर्स",
    following: "फलोइङ",
    posts: "पोष्टहरू",
    views: "हेरिएको संख्या",
    verifiedOfficial: "आधिकारिक प्रमाणित खाता",
    activeNow: "अहिले सक्रिय",
    follow: "+ फलो गर्नुहोस्",
    followingBtn: "✓ फलो गरिएको छ",
    editProfile: "प्रोफाइल सम्पादन",
    ceoAnalytics: "CEO एनालिटिक्स",
    socialChannels: "सञ्जाल खाताहरू",
    adsenseHub: "गुगल एडसेन्स हब",
    payoutsMonetization: "मोनेटाइजेशन / भुक्तानी",
    securityTools: "सुरक्षा तथा प्राइभेसी",
    settings: "प्रणाली सेटिङ्स",
    liveChatAI: "CEO AI च्याट",
    
    home: "गृहपृष्ठ",
    sports: "खेलकुद",
    news: "समाचार",
    politics: "राजनीति",
    economy: "अर्थतन्त्र",
    games: "गेमिङ",
    movies: "मनोरञ्जन / चलचित्र",
    allFeeds: "सबै फिडहरू",
    nepalWorldNews: "🇳🇵 नेपाल र विश्व खबर",
    bbsNotes: "🎓 BBS नोटहरू र नमुना प्रश्न",
    youtubeVideos: "🎥 युट्युब भिडियोहरू",
    facebookPosts: "📘 फेसबुक अपडेटहरू",
    githubRepos: "💻 गिटहब कोड",
    tiktokFeeds: "🎵 टिकटक अपडेट",
    uploadedVideos: "🎬 अपलोड भिडियो",
    photosGallery: "📷 तस्विर ग्यालरी",
    noticesStatus: "📢 सूचना तथा अपडेट",
    savedBookmarks: "🔖 सुरक्षित गरिएका",

    searchPlaceholder: "नेपाल समाचार, BBS १/२/३ वर्ष नोट, युट्युब भिडियो, स्याङ्जा खबर खोज्नुहोस्...",
    filterAll: "सबै विधा",
    sortByRecent: "भर्खरैको",
    sortByPopular: "लोकप्रिय",
    sortByTitle: "शीर्षक अनुसार",

    createPostPlaceholder: "अर्जुन सिंह घताङको पोर्टलमा नयाँ अपडेट वा BBS नोट सेयर गर्नुहोस्...",
    postButton: "प्रकाशित गर्नुहोस्",
    photoVideo: "फोटो/भिडियो",
    feelingActivity: "अनुभूति",

    officeLocations: "कार्यालय तथा सम्पर्क",
    contactUs: "सम्पर्क फर्म",
    helpDeskFAQ: "मद्दत कक्ष तथा प्रश्नोत्तर",
    syncNow: "प्रत्यक्ष सिंक",
    syncingText: "लाइभ RSS तथा सामाजिक सञ्जाल सिंक हुँदैछ...",

    copyrightRights: "सर्वाधिकार सुरक्षित। अर्जुन सिंह घताङ आधिकारिक पोर्टल।",
    officialChannelNotice: "त्रिभुवन विश्वविद्यालय र नेपाल समाचारको आधिकारिक डिजिटल सञ्जाल।"
  },

  en: {
    ceoTitle: "Founder & Chief Executive Officer (CEO)",
    ceoSubRole: "Young Entrepreneur, Digital Media Analyst & Social Worker",
    ceoBio: "Born in Waling, Syangja, Arjun Singh Ghatang is a prominent figure in Nepal's digital media innovation, online journalism, and TU BBS education reform.",
    location: "Waling, Syangja / Kathmandu, Nepal",
    followers: "Followers",
    following: "Following",
    posts: "Posts",
    views: "Total Views",
    verifiedOfficial: "Verified Official Account",
    activeNow: "Active Now",
    follow: "+ Follow",
    followingBtn: "✓ Following",
    editProfile: "Edit Profile",
    ceoAnalytics: "CEO Analytics",
    socialChannels: "Social Channels",
    adsenseHub: "Google AdSense Hub",
    payoutsMonetization: "Monetization & Payouts",
    securityTools: "Security & Privacy",
    settings: "System Settings",
    liveChatAI: "CEO AI Chat",

    home: "Home",
    sports: "Sports",
    news: "News",
    politics: "Politics",
    economy: "Economy",
    games: "Games",
    movies: "Movies",
    allFeeds: "All Linked Feeds",
    nepalWorldNews: "🇳🇵 Nepal & World News",
    bbsNotes: "🎓 BBS Notes & Model Qs",
    youtubeVideos: "🎥 YouTube Videos",
    facebookPosts: "📘 Facebook Updates",
    githubRepos: "💻 GitHub Repos",
    tiktokFeeds: "🎵 TikTok Clips",
    uploadedVideos: "🎬 Uploaded Videos",
    photosGallery: "📷 Photo Gallery",
    noticesStatus: "📢 Notices & Status",
    savedBookmarks: "🔖 Saved Posts",

    searchPlaceholder: "Search Nepal news, BBS 1st/2nd/3rd year notes, YouTube videos...",
    filterAll: "All Categories",
    sortByRecent: "Most Recent",
    sortByPopular: "Most Popular",
    sortByTitle: "By Title",

    createPostPlaceholder: "Share a new update or BBS study note on Arjun Singh Ghatang Portal...",
    postButton: "Publish Post",
    photoVideo: "Photo/Video",
    feelingActivity: "Feeling/Activity",

    officeLocations: "Office & Headquarters",
    contactUs: "Contact Us",
    helpDeskFAQ: "Help Desk & FAQ",
    syncNow: "Live Sync",
    syncingText: "Syncing live RSS and linked social accounts...",

    copyrightRights: "All Rights Reserved. Arjun Singh Ghatang Official Portal.",
    officialChannelNotice: "Official digital hub for TU BBS study resources & Nepal updates."
  },

  hi: {
    ceoTitle: "संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)",
    ceoSubRole: "युवा उद्यमी, डिजिटल मीडिया विश्लेषक और समाज सेवी",
    ceoBio: "स्याङ्जा वालिङ में जन्मे अर्जुन सिंह घताङ नेपाल के डिजिटल मीडिया, ऑनलाइन पत्रकारिता और त्रिभुवन विश्वविद्यालय BBS शिक्षा सुधार के अग्रणी व्यक्तित्व हैं।",
    location: "वालिङ, स्याङ्जा / काठमांडू, नेपाल",
    followers: "फ़ॉलोअर्स",
    following: "फ़ॉलोइंग",
    posts: "पोस्ट्स",
    views: "कुल विचार",
    verifiedOfficial: "सत्यापित आधिकारिक खाता",
    activeNow: "अभी सक्रिय",
    follow: "+ फ़ॉलो करें",
    followingBtn: "✓ फ़ॉलो किया जा रहा है",
    editProfile: "प्रोफ़ाइल संपादित करें",
    ceoAnalytics: "CEO विश्लेषण",
    socialChannels: "सोशल चैनल",
    adsenseHub: "गूगल एडसेंस हब",
    payoutsMonetization: "मोनेटाइजेशन / भुगतान",
    securityTools: "सुरक्षा एवं गोपनीयता",
    settings: "सिस्टम सेटिंग्स",
    liveChatAI: "CEO AI चैट",

    home: "मुख्य पृष्ठ",
    sports: "खेल",
    news: "समाचार",
    politics: "राजनीति",
    economy: "अर्थव्यवस्था",
    games: "गेमिंग",
    movies: "मनोरंजन/फिल्में",
    allFeeds: "सभी फ़ीड",
    nepalWorldNews: "🇳🇵 नेपाल व विश्व समाचार",
    bbsNotes: "🎓 BBS नोट्स और मॉडल प्रश्न",
    youtubeVideos: "🎥 यूट्यूब वीडियो",
    facebookPosts: "📘 फ़ेसबुक अपडेट",
    githubRepos: "💻 गिटहब कोड",
    tiktokFeeds: "🎵 टिकटॉक फ़ीड",
    uploadedVideos: "🎬 अपलोड किए गए वीडियो",
    photosGallery: "📷 फोटो गैलरी",
    noticesStatus: "📢 सूचनाएं और स्थिति",
    savedBookmarks: "🔖 सहेजे गए",

    searchPlaceholder: "नेपाल समाचार, BBS नोट्स, यूट्यूब वीडियो खोजें...",
    filterAll: "सभी श्रेणियां",
    sortByRecent: "नवीनतम",
    sortByPopular: "लोकप्रिय",
    sortByTitle: "शीर्षक अनुसार",

    createPostPlaceholder: "अर्जुन सिंह घताङ पोर्टल पर नया अपडेट साझा करें...",
    postButton: "प्रकाशित करें",
    photoVideo: "फोटो/वीडियो",
    feelingActivity: "भावनाएं",

    officeLocations: "कार्यालय और मुख्यालय",
    contactUs: "संपर्क करें",
    helpDeskFAQ: "सहायता केंद्र",
    syncNow: "लाइव सिंक",
    syncingText: "लाइव समाचार और सोशल मीडिया सिंक हो रहा है...",

    copyrightRights: "सर्वाधिकार सुरक्षित। अर्जुन सिंह घताङ आधिकारिक पोर्टल।",
    officialChannelNotice: "नेपाल समाचार और शैक्षणिक संसाधनों का आधिकारिक डिजिटल पोर्टल।"
  },

  ja: {
    ceoTitle: "創業者 兼 最高経営責任者 (CEO)",
    ceoSubRole: "若手起業家、デジタルメディアアナリスト、社会活動家",
    ceoBio: "ネパールのワリン・シャンジャ出身のアルジュン・シン・ガタンは、デジタルメディア改革および教育支援のリーダーです。",
    location: "ネパール、シャンジャ / カトマンズ",
    followers: "フォロワー",
    following: "フォロー中",
    posts: "投稿",
    views: "総閲覧数",
    verifiedOfficial: "公式認証アカウント",
    activeNow: "オンライン",
    follow: "+ フォローする",
    followingBtn: "✓ フォロー中",
    editProfile: "プロフィール編集",
    ceoAnalytics: "CEO アナリティクス",
    socialChannels: "SNS チャンネル",
    adsenseHub: "Google AdSense ハブ",
    payoutsMonetization: "収益化と支払い",
    securityTools: "セキュリティとプライバシー",
    settings: "システム設定",
    liveChatAI: "CEO AI チャット",

    home: "ホーム",
    sports: "スポーツ",
    news: "ニュース",
    politics: "政治",
    economy: "経済",
    games: "ゲーム",
    movies: "映画・エンタメ",
    allFeeds: "すべてのフィード",
    nepalWorldNews: "🇳🇵 ネパール・世界ニュース",
    bbsNotes: "🎓 BBS ノート・過去問",
    youtubeVideos: "🎥 YouTube 動画",
    facebookPosts: "📘 Facebook 更新",
    githubRepos: "💻 GitHub リポジトリ",
    tiktokFeeds: "🎵 TikTok フィード",
    uploadedVideos: "🎬 アップロード動画",
    photosGallery: "📷 フォトギャラリー",
    noticesStatus: "📢 お知らせ・ステータス",
    savedBookmarks: "🔖 保存した投稿",

    searchPlaceholder: "ネパールニュース、BBS教材、動画を検索...",
    filterAll: "すべてのカテゴリ",
    sortByRecent: "最新順",
    sortByPopular: "人気順",
    sortByTitle: "タイトル順",

    createPostPlaceholder: "新しいアップデートやメモを投稿...",
    postButton: "投稿する",
    photoVideo: "写真/動画",
    feelingActivity: "気分/アクティビティ",

    officeLocations: "オフィス・所在地",
    contactUs: "お問い合わせ",
    helpDeskFAQ: "ヘルプデスク & FAQ",
    syncNow: "リアルタイム同期",
    syncingText: "ライブニュースとSNSを同期中...",

    copyrightRights: "All Rights Reserved. アルジュン・シン・ガタン 公式ポータル。",
    officialChannelNotice: "ネパールニュースと学習リソースの公式デジタルハブ。"
  },

  zh: {
    ceoTitle: "创始人兼首席执行官 (CEO)",
    ceoSubRole: "青年企业家、数字媒体分析师与社会活动家",
    ceoBio: "Arjun Singh Ghatang 出生于尼泊尔 Syangja Waling，是数字媒体创新、新闻与 TU BBS 教育改革的杰出领导者。",
    location: "尼泊尔 Syangja Waling / 加德满都",
    followers: "粉丝",
    following: "关注",
    posts: "动态",
    views: "总浏览量",
    verifiedOfficial: "官方认证账号",
    activeNow: "当前在线",
    follow: "+ 关注",
    followingBtn: "✓ 已关注",
    editProfile: "编辑个人资料",
    ceoAnalytics: "CEO 数据分析",
    socialChannels: "社交频道",
    adsenseHub: "Google AdSense 中心",
    payoutsMonetization: "变现与提现",
    securityTools: "安全与隐私",
    settings: "系统设置",
    liveChatAI: "CEO AI 智能对话",

    home: "首页",
    sports: "体育",
    news: "新闻",
    politics: "政治",
    economy: "经济",
    games: "游戏",
    movies: "影视娱乐",
    allFeeds: "全部动态",
    nepalWorldNews: "🇳🇵 尼泊尔与全球新闻",
    bbsNotes: "🎓 BBS 笔记与模拟试题",
    youtubeVideos: "🎥 YouTube 视频",
    facebookPosts: "📘 Facebook 动态",
    githubRepos: "💻 GitHub 代码库",
    tiktokFeeds: "🎵 TikTok 短视频",
    uploadedVideos: "🎬 上传视频",
    photosGallery: "📷 图库",
    noticesStatus: "📢 公告与状态",
    savedBookmarks: "🔖 已收藏",

    searchPlaceholder: "搜索尼泊尔新闻、BBS 笔记、视频...",
    filterAll: "全部分类",
    sortByRecent: "最新",
    sortByPopular: "热门",
    sortByTitle: "按标题",

    createPostPlaceholder: "分享新的动态或 BBS 笔记...",
    postButton: "发布",
    photoVideo: "图片/视频",
    feelingActivity: "心情/活动",

    officeLocations: "办公室与总部",
    contactUs: "联系我们",
    helpDeskFAQ: "帮助中心与常见问题",
    syncNow: "实时同步",
    syncingText: "正在同步实时新闻与社交媒体...",

    copyrightRights: "版权所有。Arjun Singh Ghatang 官方门户。",
    officialChannelNotice: "尼泊尔新闻与学术资源的官方数字 hub。"
  },

  es: {
    ceoTitle: "Fundador y Director Ejecutivo (CEO)",
    ceoSubRole: "Joven Emprendedor, Analista de Medios Digitales y Trabajador Social",
    ceoBio: "Nacido en Waling, Syangja, Arjun Singh Ghatang es una figura destacada en la innovación de medios digitales y la reforma educativa BBS en Nepal.",
    location: "Waling, Syangja / Katmandú, Nepal",
    followers: "Seguidores",
    following: "Siguiendo",
    posts: "Publicaciones",
    views: "Visitas Totales",
    verifiedOfficial: "Cuenta Oficial Verificada",
    activeNow: "Activo Ahora",
    follow: "+ Seguir",
    followingBtn: "✓ Siguiendo",
    editProfile: "Editar Perfil",
    ceoAnalytics: "Analítica del CEO",
    socialChannels: "Canales Sociales",
    adsenseHub: "Centro Google AdSense",
    payoutsMonetization: "Monetización y Pagos",
    securityTools: "Seguridad y Privacidad",
    settings: "Configuración del Sistema",
    liveChatAI: "CEO Chat de IA",

    home: "Inicio",
    sports: "Deportes",
    news: "Noticias",
    politics: "Política",
    economy: "Economía",
    games: "Juegos",
    movies: "Películas",
    allFeeds: "Todas las Fuentes",
    nepalWorldNews: "🇳🇵 Noticias de Nepal y del Mundo",
    bbsNotes: "🎓 Apuntes BBS y Modelos de Examen",
    youtubeVideos: "🎥 Videos de YouTube",
    facebookPosts: "📘 Actualizaciones de Facebook",
    githubRepos: "💻 Repositorios GitHub",
    tiktokFeeds: "🎵 Clips de TikTok",
    uploadedVideos: "🎬 Videos Subidos",
    photosGallery: "📷 Galería de Fotos",
    noticesStatus: "📢 Avisos y Estados",
    savedBookmarks: "🔖 Guardados",

    searchPlaceholder: "Buscar noticias de Nepal, apuntes BBS, videos...",
    filterAll: "Todas las Categorías",
    sortByRecent: "Más Recientes",
    sortByPopular: "Más Populares",
    sortByTitle: "Por Título",

    createPostPlaceholder: "Compartir nueva actualización o apuntes BBS...",
    postButton: "Publicar",
    photoVideo: "Foto/Video",
    feelingActivity: "Sentimiento/Actividad",

    officeLocations: "Oficina y Sede",
    contactUs: "Contáctenos",
    helpDeskFAQ: "Centro de Ayuda y Preguntas",
    syncNow: "Sincronizar en Vivo",
    syncingText: "Sincronizando noticias en vivo y redes sociales...",

    copyrightRights: "Todos los derechos reservados. Portal Oficial de Arjun Singh Ghatang.",
    officialChannelNotice: "Centro digital oficial para recursos educativos BBS y noticias de Nepal."
  }
};

export function getTranslation(lang: string = 'ne'): TranslationDictionary {
  const code = (lang as SupportedLanguage) in TRANSLATIONS ? (lang as SupportedLanguage) : 'ne';
  return TRANSLATIONS[code];
}
