export type CategoryType = 'all' | 'home' | 'sports' | 'news' | 'politic' | 'economy' | 'game' | 'movie' | 'youtube' | 'bbs' | 'entertainment' | 'tech' | 'helpdesk';

export interface ContentItem {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  description: string;
  tags: string[];
  date: string;
  views?: number;
  downloadUrl?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  featured?: boolean;
  platformSource?: 'facebook' | 'youtube' | 'github' | 'tiktok' | 'instagram' | 'bbs' | 'portal';
  platformUrl?: string;
  authorName?: string;
  authorAvatar?: string;
  isAutoSynced?: boolean;
  syncedTime?: string;
  codeSnippet?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'bbs' | 'youtube' | 'general' | 'office';
}

export interface HelpTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  youtubeUrl: string;
  facebookUrl: string;
  githubUrl: string;
  domain: string;
}

export interface CustomSocialPlatform {
  id: string;
  platformName: string;
  url: string;
  icon?: string;
  isLocked?: boolean;
}

export interface UserSettings {
  accountName: string;
  accountId: string;
  email: string;
  phone: string;
  activeStatus: 'online' | 'offline' | 'away';
  privacyMode: 'public' | 'private' | 'unlisted';
  allowSearchIndexing: boolean;
  whoCanComment: 'everyone' | 'followers' | 'approved';
  isOfficialLinksLocked: boolean;
  facebookUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
  customSocials?: CustomSocialPlatform[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  profilePicUrl: string;
  coverPicUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  domain: string;
  followersCount: number;
  isFollowing: boolean;
  facebookUrl?: string;
  youtubeUrl?: string;
  githubUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  customSocials?: CustomSocialPlatform[];
  isSocialLinksLocked?: boolean;
}

export interface Follower {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  isFollowedBack: boolean;
  joinedDate: string;
}

export interface OfficeLocation {
  title: string;
  address: string;
  city: string;
  province: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  hours: {
    days: string;
    time: string;
  }[];
  nearbyLandmark: string;
}
