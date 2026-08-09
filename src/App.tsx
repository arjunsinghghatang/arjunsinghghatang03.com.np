import React, { useState, useMemo, useEffect } from 'react';
import { TopDateBar } from './components/TopDateBar';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { MainCategoryNavBar } from './components/MainCategoryNavBar';
import { CreatePostBar } from './components/CreatePostBar';
import { StoriesReelsBar } from './components/StoriesReelsBar';
import { CategoriesView } from './components/CategoriesView';
import { CEOAnalyticsDashboardModal } from './components/CEOAnalyticsDashboardModal';
import { MonetizationPayoutModal } from './components/MonetizationPayoutModal';
import { GoogleAdsenseHubModal } from './components/GoogleAdsenseHubModal';
import { FacebookFriendInviteModal } from './components/FacebookFriendInviteModal';
import { AdSenseBanner } from './components/AdSenseBanner';
import { HelpDeskSection } from './components/HelpDeskSection';
import { ContactSection } from './components/ContactSection';
import { OfficeLocationSection } from './components/OfficeLocationSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { EditProfileModal } from './components/EditProfileModal';
import { FollowersModal } from './components/FollowersModal';
import { TwoFactorAuthModal } from './components/TwoFactorAuthModal';
import { SettingsModal } from './components/SettingsModal';
import { AIChatTalkModal } from './components/AIChatTalkModal';
import { SecurityPrivacyToolsModal } from './components/SecurityPrivacyToolsModal';
import { Footer } from './components/Footer';

import { CategoryType, ContentItem, ProfileData, Follower, ContactInfo, OfficeLocation, UserSettings } from './types';
import { INITIAL_PROFILE_DATA, INITIAL_CONTACT_INFO, INITIAL_OFFICE_LOCATION, INITIAL_FOLLOWERS, INITIAL_CONTENT_ITEMS, INITIAL_FAQS, INITIAL_USER_SETTINGS } from './data/initialData';
import { generateNextLiveFeedItem } from './utils/liveFeedGenerator';
import { Search, HelpCircle, Phone, MapPin, Crown, Sparkles } from 'lucide-react';

export default function App() {
  // Language State (Nepali, English, Hindi, Japanese, Chinese, Spanish)
  const [currentLang, setCurrentLang] = useState<string>(() => {
    return localStorage.getItem('asg_site_language') || 'ne';
  });

  useEffect(() => {
    const handleLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCurrentLang(customEvent.detail);
      }
    };
    window.addEventListener('asg_language_changed', handleLangEvent);
    return () => window.removeEventListener('asg_language_changed', handleLangEvent);
  }, []);

  // Profile State (with LocalStorage persistence)
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('asg_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.profilePicUrl?.includes('photo-1534528741775-53994a69daeb') || !parsed.profilePicUrl) {
          parsed.profilePicUrl = '/arjun_profile_pic.jpg';
          localStorage.setItem('asg_profile_data', JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
    return INITIAL_PROFILE_DATA;
  });

  // User System Settings State (Facebook Style - Name, ID, Password, Active Status, Privacy & Protected Channels)
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('asg_user_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user settings:', e);
      }
    }
    return INITIAL_USER_SETTINGS;
  });

  // Save Settings handler
  const handleSaveSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('asg_user_settings', JSON.stringify(newSettings));

    // Sync profile data with new settings
    setProfile(prev => {
      const updated = {
        ...prev,
        name: newSettings.accountName,
        email: newSettings.email,
        phone: newSettings.phone,
        facebookUrl: newSettings.facebookUrl,
        youtubeUrl: newSettings.youtubeUrl,
        githubUrl: newSettings.githubUrl,
        tiktokUrl: newSettings.tiktokUrl,
        instagramUrl: newSettings.instagramUrl,
        whatsappUrl: newSettings.whatsappUrl,
        customSocials: newSettings.customSocials
      };
      localStorage.setItem('asg_profile_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Followers List State
  const [followers, setFollowers] = useState<Follower[]>(() => {
    const saved = localStorage.getItem('asg_followers_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved followers:', e);
      }
    }
    return INITIAL_FOLLOWERS;
  });

  // Dynamic Posts Content Feed State (with LocalStorage)
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('asg_content_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved posts:', e);
      }
    }
    return INITIAL_CONTENT_ITEMS;
  });

  // Real-Time Live Feed Sync State (Updates every 10 seconds)
  const [lastFeedSyncTime, setLastFeedSyncTime] = useState<string>('');
  const [isLiveFeedPaused, setIsLiveFeedPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isLiveFeedPaused) return;

    // Run every 10 seconds (10000ms)
    const timer = setInterval(() => {
      const newItem = generateNextLiveFeedItem();
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastFeedSyncTime(timeStr);

      setContentItems(prev => {
        const updated = [newItem, ...prev];
        // Retain top 120 items in memory to avoid performance degradation
        const trimmed = updated.slice(0, 120);
        localStorage.setItem('asg_content_items', JSON.stringify(trimmed));
        return trimmed;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [isLiveFeedPaused]);

  // Modal Visibility States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSecurityToolsModalOpen, setIsSecurityToolsModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isCEODashboardOpen, setIsCEODashboardOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isAdSenseModalOpen, setIsAdSenseModalOpen] = useState(false);
  const [isFbModalOpen, setIsFbModalOpen] = useState(false);
  const [isAIChatModalOpen, setIsAIChatModalOpen] = useState(false);

  // Two-Factor Authentication (2FA) State & Protections for Admin/Profile Editing
  const [isAdmin2FAVerified, setIsAdmin2FAVerified] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<'edit_profile' | 'ceo_dashboard' | 'payout_modal' | null>(null);
  const [twoFactorTargetTitle, setTwoFactorTargetTitle] = useState('Edit Profile & Contact Details');

  const handleProtectedAdminAction = (action: 'edit_profile' | 'ceo_dashboard' | 'payout_modal', title: string) => {
    if (isAdmin2FAVerified) {
      if (action === 'edit_profile') setIsEditModalOpen(true);
      if (action === 'ceo_dashboard') setIsCEODashboardOpen(true);
      if (action === 'payout_modal') setIsPayoutModalOpen(true);
    } else {
      setPendingAdminAction(action);
      setTwoFactorTargetTitle(title);
      setIs2FAModalOpen(true);
    }
  };

  const handle2FASuccess = () => {
    setIsAdmin2FAVerified(true);
    if (pendingAdminAction === 'edit_profile') setIsEditModalOpen(true);
    if (pendingAdminAction === 'ceo_dashboard') setIsCEODashboardOpen(true);
    if (pendingAdminAction === 'payout_modal') setIsPayoutModalOpen(true);
    setPendingAdminAction(null);
  };

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');
  
  // Selected Item for Modal Detail View
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  // Derive Contact Info from Profile State
  const contactInfo: ContactInfo = useMemo(() => ({
    phone: profile.phone,
    whatsapp: profile.whatsapp,
    email: profile.email,
    address: profile.location,
    youtubeUrl: INITIAL_CONTACT_INFO.youtubeUrl,
    facebookUrl: INITIAL_CONTACT_INFO.facebookUrl,
    githubUrl: INITIAL_CONTACT_INFO.githubUrl,
    domain: profile.domain
  }), [profile]);

  // Derive Office Location from Profile State
  const officeLocation: OfficeLocation = useMemo(() => ({
    ...INITIAL_OFFICE_LOCATION,
    address: profile.location.split(',')[0] || profile.location,
    city: profile.location.includes('Syangja') ? 'Syangja' : 'Kathmandu',
    province: profile.location.includes('Gandaki') ? 'Gandaki Province' : 'Bagmati Province',
    phone: profile.phone,
    email: profile.email,
  }), [profile]);

  // Save profile state changes
  const handleSaveProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
    localStorage.setItem('asg_profile_data', JSON.stringify(updatedProfile));

    setUserSettings(prev => {
      const updatedSettings: UserSettings = {
        ...prev,
        accountName: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        facebookUrl: updatedProfile.facebookUrl || prev.facebookUrl,
        youtubeUrl: updatedProfile.youtubeUrl || prev.youtubeUrl,
        githubUrl: updatedProfile.githubUrl || prev.githubUrl,
        tiktokUrl: updatedProfile.tiktokUrl || prev.tiktokUrl,
        instagramUrl: updatedProfile.instagramUrl || prev.instagramUrl,
        whatsappUrl: updatedProfile.whatsappUrl || prev.whatsappUrl,
        customSocials: updatedProfile.customSocials || prev.customSocials
      };
      localStorage.setItem('asg_user_settings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Add new post from Upload Bar
  const handleAddPost = (newPost: ContentItem) => {
    setContentItems(prev => {
      const updated = [newPost, ...prev];
      localStorage.setItem('asg_content_items', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle main Follow button
  const handleToggleFollow = () => {
    setProfile(prev => {
      const nextIsFollowing = !prev.isFollowing;
      const nextCount = nextIsFollowing ? prev.followersCount + 1 : prev.followersCount - 1;
      const updated = {
        ...prev,
        isFollowing: nextIsFollowing,
        followersCount: nextCount
      };
      localStorage.setItem('asg_profile_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle Follow Back for a follower
  const handleToggleFollowBack = (followerId: string) => {
    setFollowers(prev => {
      const updated = prev.map(f => f.id === followerId ? { ...f, isFollowedBack: !f.isFollowedBack } : f);
      localStorage.setItem('asg_followers_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Add a new follower
  const handleAddFollower = (newFollower: Follower) => {
    setFollowers(prev => {
      const updated = [newFollower, ...prev];
      localStorage.setItem('asg_followers_data', JSON.stringify(updated));
      return updated;
    });
    // Increment total count
    setProfile(prev => {
      const updatedProfile = { ...prev, followersCount: prev.followersCount + 1 };
      localStorage.setItem('asg_profile_data', JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  // Smooth Navigation Handler
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'search' || sectionId === 'search-section') {
      const searchElem = document.getElementById('feed-section');
      if (searchElem) {
        searchElem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    contentItems.forEach(item => {
      item.tags.forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [contentItems]);

  // Filter & Sort Items
  const filteredItems = useMemo(() => {
    let result = [...contentItems];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter(item => item.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort items
    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [contentItems, selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col antialiased">
      
      {/* Top Date & Time Bar: Nepal NPT Date/Time + English AD Date/Day */}
      <TopDateBar
        currentLang={currentLang}
        onLanguageChange={(lang) => {
          setCurrentLang(lang);
          localStorage.setItem('asg_site_language', lang);
          window.dispatchEvent(new CustomEvent('asg_language_changed', { detail: lang }));
        }}
      />

      {/* Header Masthead */}
      <Header
        profile={profile}
        userSettings={userSettings}
        currentLang={currentLang}
        onNavigateSection={handleNavigateSection}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenEditModal={() => handleProtectedAdminAction('edit_profile', 'Edit Profile, Email, Location & CEO Info')}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenFollowersModal={() => setIsFollowersModalOpen(true)}
        onToggleFollow={handleToggleFollow}
        onOpenCEODashboard={() => handleProtectedAdminAction('ceo_dashboard', 'CEO Analytics & Monetization Hub')}
        onOpenPayoutModal={() => handleProtectedAdminAction('payout_modal', 'Bank & Wallet Payout Settings')}
        onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
        onOpenFbModal={() => setIsFbModalOpen(true)}
        onOpenAIChatModal={() => setIsAIChatModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Live Google AdSense Banner Placement */}
        <AdSenseBanner publisherId="ca-pub-9842109281203912" adSlot="8910238120" />

        {/* Feed Section Header */}
        <section id="feed-section" className="scroll-mt-6">
          
          {/* Facebook/TikTok/YouTube Stories, Reels & Shorts Carousel Bar */}
          <StoriesReelsBar profile={profile} onAddPost={handleAddPost} />

          {/* Facebook-style Upload Feed Bar (For CEO & Followers to post status, photo, video) */}
          <CreatePostBar
            profile={profile}
            onAddPost={handleAddPost}
          />

          {/* Main Category Channels Bar */}
          <MainCategoryNavBar
            selectedCategory={selectedCategory}
            currentLang={currentLang}
            onSelectCategory={setSelectedCategory}
            totalItemsCount={filteredItems.length}
          />

          {/* Resource Search & Filter Controls */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            sortBy={sortBy}
            onSortChange={setSortBy}
            availableTags={availableTags}
            totalResults={filteredItems.length}
          />

          {/* Posts Feed Cards Display (With Like, Comment, Share, Repost, Follow, Subscribe) */}
          <CategoriesView
            items={filteredItems}
            selectedCategory={selectedCategory}
            profile={profile}
            onSelectItem={setSelectedItem}
            onNavigateSection={handleNavigateSection}
            lastFeedSyncTime={lastFeedSyncTime}
            isLiveFeedPaused={isLiveFeedPaused}
            onTogglePauseFeed={() => setIsLiveFeedPaused(prev => !prev)}
          />
        </section>

        {/* Help Desk Info Section */}
        <HelpDeskSection
          faqs={INITIAL_FAQS}
          contactInfo={contactInfo}
        />

        {/* Contact Section */}
        <ContactSection
          contactInfo={contactInfo}
        />

        {/* Office Location Section */}
        <OfficeLocationSection
          office={officeLocation}
        />

      </main>

      {/* CEO Analytics Dashboard Modal */}
      <CEOAnalyticsDashboardModal
        isOpen={isCEODashboardOpen}
        onClose={() => setIsCEODashboardOpen(false)}
        profile={profile}
        items={contentItems}
        totalFollowers={profile.followersCount}
        onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
        onOpenAdSenseModal={() => setIsAdSenseModalOpen(true)}
        onOpenFbModal={() => setIsFbModalOpen(true)}
      />

      {/* Detail Pop-up Modal */}
      <ItemDetailModal
        item={selectedItem}
        currentLang={currentLang}
        onClose={() => setSelectedItem(null)}
      />

      {/* Edit Profile & Website Info Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Followers & Supporters List Modal ("Who Follows Me") */}
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        followers={followers}
        totalFollowersCount={profile.followersCount}
        onToggleFollowBack={handleToggleFollowBack}
        onAddFollower={handleAddFollower}
      />

      {/* Nepal All Banks & Digital Wallets Payout Modal */}
      <MonetizationPayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        profile={profile}
      />

      {/* Google AdSense Integration & Code Snippet Hub Modal */}
      <GoogleAdsenseHubModal
        isOpen={isAdSenseModalOpen}
        onClose={() => setIsAdSenseModalOpen(false)}
      />

      {/* Facebook Friends Auto Invite & Sync Modal */}
      <FacebookFriendInviteModal
        isOpen={isFbModalOpen}
        onClose={() => setIsFbModalOpen(false)}
        profile={profile}
        onAddFollower={handleAddFollower}
      />

      {/* Admin Two-Factor Security Verification Modal */}
      <TwoFactorAuthModal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
        onSuccess={handle2FASuccess}
        profile={profile}
        targetActionName={twoFactorTargetTitle}
      />

      {/* Facebook-style System Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={userSettings}
        onSaveSettings={handleSaveSettings}
        profile={profile}
        onOpenSecurityToolsModal={() => setIsSecurityToolsModalOpen(true)}
      />

      {/* Facebook, Google, TikTok & YouTube Security, Privacy & Tools Hub Modal */}
      <SecurityPrivacyToolsModal
        isOpen={isSecurityToolsModalOpen}
        onClose={() => setIsSecurityToolsModalOpen(false)}
        profile={profile}
        settings={userSettings}
        onSaveSettings={handleSaveSettings}
        onOpen2FAModal={() => setIs2FAModalOpen(true)}
      />

      {/* AI Smart Chat & Voice Companion Modal */}
      <AIChatTalkModal
        isOpen={isAIChatModalOpen}
        onClose={() => setIsAIChatModalOpen(false)}
        profile={profile}
      />

      {/* Floating Action Button (FAB) for AI Assistant & Voice Talk */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIChatModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/20 ring-4 ring-indigo-500/30"
          title="Open AI Chat & Voice Talk Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-extrabold text-xs tracking-wide">AI Chat & Talk</span>
        </button>
      </div>

      {/* Footer with Prominent CEO Name at Bottom */}
      <Footer
        contactInfo={contactInfo}
        onNavigateSection={handleNavigateSection}
      />

    </div>
  );
}
