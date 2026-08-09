import { ContentItem, FAQItem, ContactInfo, OfficeLocation, ProfileData, Follower, UserSettings } from '../types';

export const INITIAL_USER_SETTINGS: UserSettings = {
  accountName: 'ARJUN SINGH GHATANG',
  accountId: '@arjunsinghghatang03',
  email: 'arjunsinghghatang@gmail.com',
  phone: '98********',
  activeStatus: 'online',
  privacyMode: 'public',
  allowSearchIndexing: true,
  whoCanComment: 'everyone',
  isOfficialLinksLocked: true,
  facebookUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
  youtubeUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
  githubUrl: 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np',
  tiktokUrl: 'https://tiktok.com/@arjunsinghghatang',
  instagramUrl: 'https://instagram.com/arjunsinghghatang',
  whatsappUrl: 'https://wa.me/9779800000000',
  customSocials: [
    { id: '1', platformName: 'WhatsApp Business', url: 'https://wa.me/9779800000000', icon: 'whatsapp', isLocked: true },
    { id: '2', platformName: 'Telegram Channel', url: 'https://t.me/arjunsinghghatang', icon: 'telegram', isLocked: false }
  ]
};

export const INITIAL_PROFILE_DATA: ProfileData = {
  name: 'ARJUN SINGH GHATANG',
  title: 'CEO & FOUNDER',
  tagline: 'YOUTUBER & BBS STUDENT',
  bio: 'Official portal of Arjun Singh Ghatang (CEO & Founder). Exploring Tribhuvan University BBS study notes, educational vlogs, news updates, local youth media, politics, sports, economy, and entertainment from Syangja & Kathmandu.',
  profilePicUrl: '/arjun_profile_pic.jpg',
  coverPicUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
  email: 'arjunsinghghatang@gmail.com',
  phone: '98********',
  whatsapp: '98********',
  location: 'Waling 06 Syangja, Gandaki Province, Nepal',
  domain: 'arjunsinghghatang03.com.np',
  followersCount: 1482,
  isFollowing: false,
  facebookUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
  youtubeUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
  githubUrl: 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np',
  tiktokUrl: 'https://tiktok.com/@arjunsinghghatang',
  instagramUrl: 'https://instagram.com/arjunsinghghatang',
  whatsappUrl: 'https://wa.me/9779800000000',
  customSocials: [
    { id: '1', platformName: 'WhatsApp Business', url: 'https://wa.me/9779800000000', icon: 'whatsapp', isLocked: true },
    { id: '2', platformName: 'Telegram Channel', url: 'https://t.me/arjunsinghghatang', icon: 'telegram', isLocked: false }
  ],
  isSocialLinksLocked: true
};

export const INITIAL_CONTACT_INFO: ContactInfo = {
  phone: '98********',
  whatsapp: '98********',
  email: 'arjunsinghghatang@gmail.com',
  address: 'Waling 06, Syangja, Gandaki Province, Nepal',
  youtubeUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
  facebookUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
  githubUrl: 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np',
  domain: 'arjunsinghghatang03.com.np'
};

export const INITIAL_OFFICE_LOCATION: OfficeLocation = {
  title: 'ARJUN SINGH GHATANG Official Media & Desk',
  address: 'Waling Municipality Ward No. 06',
  city: 'Syangja',
  province: 'Gandaki Province',
  country: 'Nepal',
  coordinates: {
    lat: 27.9868,
    lng: 83.7661
  },
  phone: '98********',
  email: 'arjunsinghghatang@gmail.com',
  hours: [
    { days: 'Sunday - Thursday', time: '09:00 AM - 05:00 PM NPT' },
    { days: 'Friday', time: '09:00 AM - 02:00 PM NPT' },
    { days: 'Saturday', time: 'Closed (Online Helpdesk Only)' }
  ],
  nearbyLandmark: 'Waling Bazar Central Plaza, Siddhartha Highway, Syangja'
};

export const INITIAL_FOLLOWERS: Follower[] = [
  {
    id: 'fol-1',
    name: 'Suman Thapa',
    role: 'BBS 2nd Year Student',
    location: 'Waling, Syangja',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isFollowedBack: true,
    joinedDate: '2 days ago'
  },
  {
    id: 'fol-2',
    name: 'Pooja Gurung',
    role: 'Tech & Vlog Enthusiast',
    location: 'Pokhara, Gandaki',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    isFollowedBack: false,
    joinedDate: '1 week ago'
  },
  {
    id: 'fol-3',
    name: 'Rohan Shrestha',
    role: 'BBS 1st Year Exam Prep',
    location: 'Kathmandu, Nepal',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isFollowedBack: true,
    joinedDate: '2 weeks ago'
  },
  {
    id: 'fol-4',
    name: 'Entertainment Community 9 Member',
    role: 'Content Creator',
    location: 'Syangja, Nepal',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    isFollowedBack: false,
    joinedDate: '1 month ago'
  },
  {
    id: 'fol-5',
    name: 'Aayush Malla',
    role: 'BBS 3rd Year Finance Major',
    location: 'Gorkha, Gandaki',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    isFollowedBack: true,
    joinedDate: '1 month ago'
  }
];

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'yt-01',
    title: 'BBS Student Life in Nepal & Youtube Journey - Campus Vlog & Tips',
    category: 'youtube',
    categoryLabel: 'YouTube Channel',
    description: 'An inspirational look into managing BBS degree studies at campus alongside running a YouTube channel. Essential tips for youth in Nepal!',
    tags: ['YouTube Vlogs', 'BBS Life', 'Nepal Youth', 'Student Tips', 'video'],
    date: '2026-08-07',
    views: 12890,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-student-working-on-a-laptop-42990-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'youtube',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '1 minute ago'
  },
  {
    id: 'fb-01',
    title: 'Entertainment Community Nepal - Official Community Facebook Page Live Update',
    category: 'entertainment',
    categoryLabel: 'Facebook Page',
    description: 'Special highlights from the Entertainment Community 9 Facebook page. Creator networking events, student vlogs, and fun content creation workshops in Syangja & Kathmandu.',
    tags: ['Facebook Page', 'Entertainment Community', 'Social Media', 'Content Creation'],
    date: '2026-08-06',
    views: 8940,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'facebook',
    platformUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
    authorName: 'Arjun Singh Ghatang (CEO)',
    isAutoSynced: true,
    syncedTime: '3 minutes ago'
  },
  {
    id: 'gh-01',
    title: 'arjunsinghghatang03.com.np - Official Web Portal Source Repository & React Code',
    category: 'tech',
    categoryLabel: 'GitHub Repo',
    description: 'Open-source React + Vite + TypeScript web application for Arjun Singh Ghatang official portal featuring auto-playing feeds, AI Chatbot, BBS study guides, and office booking.',
    tags: ['GitHub Repo', 'React JS', 'TypeScript', 'Tailwind CSS', 'Open Source'],
    date: '2026-08-05',
    views: 14500,
    downloadUrl: 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'github',
    platformUrl: 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np',
    authorName: 'arjunsinghghatang',
    isAutoSynced: true,
    syncedTime: '5 minutes ago',
    codeSnippet: `// Official Web Portal React + TypeScript Entry Point
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);`
  },
  {
    id: 'tt-01',
    title: 'Nepal Youth Motivation & BBS Campus Life - Viral TikTok Reel',
    category: 'entertainment',
    categoryLabel: 'TikTok Reel',
    description: 'Quick 60-second motivational reel on staying dedicated to BBS exams while building digital skills and creative YouTube content in Nepal.',
    tags: ['TikTok Reel', 'Shorts', 'Motivation', 'Nepal Youth', 'video'],
    date: '2026-08-04',
    views: 24300,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-street-41221-large.mp4',
    thumbnailUrl: '/arjun_profile_pic.jpg',
    featured: true,
    platformSource: 'tiktok',
    platformUrl: 'https://tiktok.com/@arjunsinghghatang',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '8 minutes ago'
  },
  {
    id: 'news-01',
    title: '🇳🇵 Nepal National Headline: Gandaki Province Highway Expansion & Syangja Development Projects Update',
    category: 'news',
    categoryLabel: '🇳🇵 Primary Nepal News',
    description: 'Special bulletin covering Gandaki Province Siddhartha Highway road widening, local youth employment grants, and clean water infrastructure projects in Waling, Syangja.',
    tags: ['NepalNews', 'SyangjaUpdate', 'GandakiProvince', 'OnlineKhabar', 'PrimaryNepal'],
    date: '2026-08-08',
    views: 18940,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    featured: true,
    platformSource: 'portal',
    platformUrl: 'https://onlinekhabar.com',
    authorName: 'OnlineKhabar Nepal (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '1 minute ago'
  },
  {
    id: 'news-nepal-02',
    title: '🇳🇵 Tribhuvan University Examination Routine & Digital BBS Curriculum Reform Announced',
    category: 'news',
    categoryLabel: '🇳🇵 Primary Nepal News',
    description: 'TU Office of the Controller of Examinations issues the official routine for BBS 1st, 2nd, and 3rd year board exams along with digitized note verification portals.',
    tags: ['NepalNews', 'TUEducation', 'BBSExams', 'KathmanduPost', 'PrimaryNepal'],
    date: '2026-08-08',
    views: 15420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    featured: true,
    platformSource: 'portal',
    platformUrl: 'https://kathmandupost.com',
    authorName: 'Kathmandu Post (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '2 minutes ago'
  },
  {
    id: 'news-nepal-03',
    title: '🇳🇵 Nepal Rastra Bank Monetary Policy: Remittance Inflows Hit Record High in 2026',
    category: 'economy',
    categoryLabel: '🇳🇵 Nepal Economy & Banking',
    description: 'Central Bank of Nepal releases new quarterly financial statistics showing steady foreign exchange reserve growth and enhanced digital banking accessibility.',
    tags: ['NepalEconomy', 'NRBMonetaryPolicy', 'Remittance', 'Republica', 'PrimaryNepal'],
    date: '2026-08-07',
    views: 12800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    featured: true,
    platformSource: 'portal',
    platformUrl: 'https://myrepublica.nagariknetwork.com',
    authorName: 'MyRepublica Nepal (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '5 minutes ago'
  },
  {
    id: 'news-nepal-04',
    title: '🇳🇵 Pokhara International Airport Boosts Tourist Arrivals in Gandaki Region',
    category: 'news',
    categoryLabel: '🇳🇵 Primary Nepal News',
    description: 'Direct international charter flights and domestic connecting routes to Pokhara bring surging eco-tourism and hotel bookings across Annapurna and Syangja circuits.',
    tags: ['NepalTourism', 'PokharaAirport', 'GandakiProvince', 'HimalayanTimes'],
    date: '2026-08-07',
    views: 11200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    platformSource: 'portal',
    platformUrl: 'https://thehimalayantimes.com',
    authorName: 'The Himalayan Times (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '8 minutes ago'
  },
  {
    id: 'news-world-01',
    title: '🌍 World News Headlines: Global Tech & Open AI Innovations Drive Next-Gen Economy',
    category: 'news',
    categoryLabel: '🌍 World News Bulletin',
    description: 'International summit highlights breakthroughs in renewable energy grids, generative AI productivity tools, and global digital education access.',
    tags: ['WorldNews', 'TechInnovation', 'GlobalEconomy', 'BBCNews'],
    date: '2026-08-08',
    views: 21500,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    platformSource: 'portal',
    platformUrl: 'https://bbc.com/news',
    authorName: 'BBC World News (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '10 minutes ago'
  },
  {
    id: 'news-world-02',
    title: '🌍 World Climate & Sustainability Accord Signed by 120+ Nations',
    category: 'news',
    categoryLabel: '🌍 World News Bulletin',
    description: 'Global environmental pact pledges funding for mountain ecosystem protection, glacier preservation in South Asia, and clean solar infrastructure.',
    tags: ['WorldNews', 'ClimateAction', 'Sustainability', 'Reuters'],
    date: '2026-08-06',
    views: 14300,
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    featured: false,
    platformSource: 'portal',
    platformUrl: 'https://reuters.com',
    authorName: 'Reuters Global News (Verified Free Source)',
    isAutoSynced: true,
    syncedTime: '12 minutes ago'
  },
  {
    id: 'bbs-01',
    title: 'BBS 1st Year Financial Accounting & Analysis - Comprehensive Notes & Model Questions',
    category: 'bbs',
    categoryLabel: 'BBS Study Material',
    description: 'Complete chapter-wise notes, solved numerical problems, cash flow statements, and Tribhuvan University model question solutions for BBS 1st year students.',
    tags: ['BBS 1st Year', 'Accounting', 'TU Model Questions', 'Notes PDF'],
    date: '2026-07-20',
    views: 4520,
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'bbs',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '15 minutes ago'
  },
  {
    id: 'yt-02',
    title: 'Best Youtube Gear for Beginners on a Budget in Nepal',
    category: 'youtube',
    categoryLabel: 'YouTube Guide',
    description: 'Affordable microphones, lighting setups, tripod recommendations, and mobile editing apps available in Kathmandu for aspiring Nepali YouTubers.',
    tags: ['YouTube Gear', 'Budget Tech', 'Nepal Creators', 'Editing Apps', 'video'],
    date: '2026-03-29',
    views: 9320,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-student-working-on-a-laptop-42990-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=600&q=80',
    platformSource: 'youtube',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '20 minutes ago'
  },
  {
    id: 'sports-01',
    title: 'Nepal Cricket & Football Highlights: Local Syangja Youth Tournament Final',
    category: 'sports',
    categoryLabel: 'Sports Nepal',
    description: 'Exciting sports coverage of the Syangja District Volleyball and Cricket Tournament final match results, player stats, and youth sports development.',
    tags: ['Nepal Sports', 'CAN Cricket', 'Syangja Cup', 'Youth Football'],
    date: '2026-08-02',
    views: 6540,
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'facebook',
    platformUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
    authorName: 'Entertainment Community 9',
    isAutoSynced: true,
    syncedTime: '25 minutes ago'
  },
  {
    id: 'politic-01',
    title: 'Nepal Political Analysis: Youth Engagement in Federal Governance & Student Union Policies',
    category: 'politic',
    categoryLabel: 'Politics & Governance',
    description: 'An insightful overview of youth political representation, student parliament debates, and upcoming policy changes affecting higher education in Nepal.',
    tags: ['Nepal Politics', 'Youth Governance', 'Student Union', 'TU Policy'],
    date: '2026-07-29',
    views: 5210,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
    platformSource: 'facebook',
    platformUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '30 minutes ago'
  },
  {
    id: 'economy-01',
    title: 'Nepal Economy & Remittance Insights: Inflation Rates, NRB Monetary Policy & Business Growth',
    category: 'economy',
    categoryLabel: 'Economy & Business',
    description: 'Key insights into Nepal Rastra Bank monetary guidelines, macroeconomic growth, youth startup ecosystem, and local business environment.',
    tags: ['Nepal Economy', 'NRB Policy', 'Financial Growth', 'BBS Finance'],
    date: '2026-07-25',
    views: 8900,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    featured: true,
    platformSource: 'portal',
    platformUrl: 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '35 minutes ago'
  },
  {
    id: 'game-01',
    title: 'Nepal Esports & Gaming Championship: PUBG Mobile & Mobile Legends Tournament Vlogs',
    category: 'game',
    categoryLabel: 'Gaming & Esports',
    description: 'Highlights from the national gaming tournament in Nepal, setup reviews for gaming streamers, and mobile gaming tips.',
    tags: ['Nepal Gaming', 'Esports', 'PUBG Mobile', 'Streaming', 'video'],
    date: '2026-07-22',
    views: 11200,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    platformSource: 'youtube',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '40 minutes ago'
  },
  {
    id: 'bbs-02',
    title: 'BBS 2nd Year Macroeconomics & Business Environment Notes',
    category: 'bbs',
    categoryLabel: 'BBS Study Material',
    description: 'Key macroeconomic indicators of Nepal, GDP calculation methods, monetary policy summaries, and exam-oriented answer writing techniques.',
    tags: ['BBS 2nd Year', 'Economics', 'Nepal Business', 'Exam Guide'],
    date: '2026-06-28',
    views: 3100,
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    platformSource: 'bbs',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '45 minutes ago'
  },
  {
    id: 'bbs-03',
    title: 'BBS 3rd Year Business Finance & Financial Markets Solutions',
    category: 'bbs',
    categoryLabel: 'BBS Study Material',
    description: 'Time value of money, capital budgeting formulas, stock valuation practice sets, and financial ratios simplified with step-by-step solutions.',
    tags: ['BBS 3rd Year', 'Finance', 'Capital Budgeting', 'Formula Sheet'],
    date: '2026-05-02',
    views: 2890,
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    platformSource: 'bbs',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '50 minutes ago'
  },
  {
    id: 'bbs-04',
    title: 'BBS 4th Year Foundations of Financial Institutions & Services',
    category: 'bbs',
    categoryLabel: 'BBS Study Material',
    description: 'Overview of Nepal Rastra Bank (NRB) regulations, commercial banks, development financial institutions, and insurance sector notes.',
    tags: ['BBS 4th Year', 'NRB Rules', 'Banking Nepal', 'Final Notes'],
    date: '2026-04-12',
    views: 1980,
    downloadUrl: '#',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    platformSource: 'bbs',
    platformUrl: 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA',
    authorName: 'Arjun Singh Ghatang',
    isAutoSynced: true,
    syncedTime: '1 hour ago'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'How can I download BBS notes and model question solutions?',
    answer: 'You can browse the "BBS Study Materials" category on this website or use the Search bar to find your year (1st, 2nd, 3rd, or 4th Year). Click on any course note card to download the PDF directly or read online.',
    category: 'bbs'
  },
  {
    id: 'faq-02',
    question: 'How do I contact Arjun Singh Ghatang for YouTube collaborations or sponsorships?',
    answer: 'For channel collaborations, brand sponsorships, or media interviews, please use the Contact section or email singhzb911@gmail.com / contact@arjunsinghghatang03.com.np. You can also send a direct inquiry ticket via the Help Desk.',
    category: 'youtube'
  },
  {
    id: 'faq-03',
    question: 'Where is Arjun Singh Ghatang’s office/desk located in Kathmandu?',
    answer: 'The official media & study desk is located at Subidhanagar, near Civil Hospital, New Baneshwor, Kathmandu. Visiting hours are Sunday through Thursday 9:00 AM – 5:00 PM, and Friday 9:00 AM – 2:00 PM NPT. Prior appointment via the Office Booking tab is recommended.',
    category: 'office'
  },
  {
    id: 'faq-04',
    question: 'Are the BBS notes aligned with Tribhuvan University (TU) syllabus?',
    answer: 'Yes! All notes, model question sets, and exam preparation sheets are curated strictly based on the latest Tribhuvan University (TU) BBS syllabus.',
    category: 'bbs'
  },
  {
    id: 'faq-05',
    question: 'How quickly does the Help Desk respond to submitted tickets?',
    answer: 'Our support desk aims to respond to all student and fan inquiries within 24 hours on business days.',
    category: 'general'
  }
];
