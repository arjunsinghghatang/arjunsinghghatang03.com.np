import React from 'react';
import { Youtube, Facebook, Github, Phone, MapPin, Search, HelpCircle, ExternalLink, GraduationCap, Video, ShieldCheck, Camera, Edit3, UserCheck, UserPlus, Users, Sparkles, Crown, BarChart2, Wallet, DollarSign, UserCheck as UserCheckIcon, Lock, Globe, Instagram, Settings, Sliders, MessageCircle, Plus, CheckCircle2 } from 'lucide-react';
import { ProfileData, UserSettings } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  profile: ProfileData;
  userSettings?: UserSettings;
  currentLang?: string;
  onNavigateSection: (sectionId: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenEditModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenFollowersModal: () => void;
  onToggleFollow: () => void;
  onOpenCEODashboard: () => void;
  onOpenPayoutModal: () => void;
  onOpenAdSenseModal: () => void;
  onOpenFbModal: () => void;
  onOpenAIChatModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  userSettings,
  currentLang = 'ne',
  onNavigateSection,
  onSelectCategory,
  onOpenEditModal,
  onOpenSettingsModal,
  onOpenFollowersModal,
  onToggleFollow,
  onOpenCEODashboard,
  onOpenPayoutModal,
  onOpenAdSenseModal,
  onOpenFbModal,
  onOpenAIChatModal
}) => {
  const t = getTranslation(currentLang);
  return (
    <header className="relative bg-slate-950 text-white border-b border-indigo-900/50 overflow-hidden">
      
      {/* Cover Backdrop Picture */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          src={profile.coverPicUrl}
          alt="Cover Header"
          className="w-full h-full object-cover opacity-60 transition duration-700 hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

        {/* Top-Right Settings Bar & Cover Photo Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2.5 z-20">
          
          {/* Main Top-Right Facebook Style Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="bg-indigo-600/90 hover:bg-indigo-600 text-white px-3.5 py-1.5 rounded-xl border border-indigo-400/60 text-xs font-black flex items-center gap-2 backdrop-blur-md shadow-xl transition hover:scale-105 cursor-pointer"
            title="Open Account, Privacy & Security Settings"
          >
            <Settings className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span className="hidden sm:inline">Settings</span>
            <div className={`w-2.5 h-2.5 rounded-full ${userSettings?.activeStatus === 'offline' ? 'bg-slate-400' : 'bg-emerald-400 animate-pulse'}`} />
          </button>

          {/* Change Cover Photo Quick Button */}
          <button
            onClick={onOpenEditModal}
            className="bg-slate-950/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition hover:scale-105 cursor-pointer"
            title="Change Cover & Website Details"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Change Cover Photo</span>
          </button>
        </div>

        {/* Quick Location & Email Strip on Banner Top */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 text-xs font-medium z-20">
          <span className="bg-slate-950/80 border border-slate-800 text-emerald-400 px-3 py-1 rounded-xl backdrop-blur-md flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{profile.location}</span>
          </span>

          <span className="hidden sm:inline-flex bg-slate-950/80 border border-slate-800 text-indigo-300 px-3 py-1 rounded-xl backdrop-blur-md items-center gap-1.5 font-mono">
            <span>{profile.email}</span>
          </span>
        </div>
      </div>

      {/* Main Masthead Banner Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-20 pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8 text-center md:text-left">
          
          {/* Avatar Container with Animated Glow */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-indigo-500 to-amber-500 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-slate-900 overflow-hidden ring-4 ring-indigo-500/40 shadow-2xl">
              <img
                src={profile.profilePicUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/arjun_profile_pic.jpg';
                }}
              />
            </div>

            {/* Verified Blue Tick Badge Overlay on Profile Picture */}
            <div 
              className="absolute top-1 right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1.5 sm:p-2 rounded-full ring-4 ring-slate-950 shadow-2xl flex items-center justify-center animate-pulse z-10" 
              title="Official Verified Profile"
            >
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-blue-500 stroke-[2.5]" />
            </div>

            {/* Change Profile Avatar Overlay Button */}
            <button
              onClick={onOpenEditModal}
              className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full ring-4 ring-slate-900 shadow-xl cursor-pointer transition hover:scale-110 z-10"
              title="Change Profile Picture"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile & Biography Info */}
          <div className="flex-1 space-y-3">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {/* CEO & Founder Title Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/30 via-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-500/40 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>{t.ceoTitle}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.officialChannelNotice}</span>
              </div>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.verifiedOfficial}</span>
              </span>

              {/* Active Status Badge (Online / Offline) */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                userSettings?.activeStatus === 'offline'
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
              }`}>
                <div className={`w-2 h-2 rounded-full ${userSettings?.activeStatus === 'offline' ? 'bg-slate-500' : 'bg-emerald-400 animate-pulse'}`} />
                <span>{userSettings?.activeStatus === 'offline' ? 'Offline' : t.activeNow}</span>
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                <span>{profile.name}</span>
                <span className="inline-flex items-center text-blue-500" title="Verified Blue Tick Official Account">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-blue-500 stroke-[2.5]" />
                </span>
                <span className="text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg uppercase tracking-wider font-mono self-center shadow-md">
                  CEO
                </span>
              </h1>
              
              <p className="mt-1.5 text-base sm:text-lg font-medium text-indigo-200 flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 text-red-400 font-bold">
                  <Video className="w-4 h-4" /> {currentLang === 'ne' ? profile.tagline : t.ceoSubRole}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {currentLang === 'ne' ? profile.location : t.location}
                </span>
              </p>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {currentLang === 'ne' ? profile.bio : t.ceoBio}
            </p>

            {/* Official Social Channels & Platforms Bar */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-bold">
                {/* Facebook Page Link */}
                {(profile.facebookUrl || userSettings?.facebookUrl) && (
                  <a
                    href={profile.facebookUrl || userSettings?.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 transition hover:scale-105 shadow-sm"
                    title="Official Facebook Page"
                  >
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                    <span>FB Page</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* YouTube Channel Link */}
                {(profile.youtubeUrl || userSettings?.youtubeUrl) && (
                  <a
                    href={profile.youtubeUrl || userSettings?.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-300 transition hover:scale-105 shadow-sm"
                    title="Official YouTube Channel"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* GitHub Repo Link */}
                {(profile.githubUrl || userSettings?.githubUrl) && (
                  <a
                    href={profile.githubUrl || userSettings?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition hover:scale-105 shadow-sm"
                    title="Official GitHub Repo"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* WhatsApp Link */}
                {(profile.whatsappUrl || profile.whatsapp || userSettings?.whatsappUrl) && (
                  <a
                    href={profile.whatsappUrl || userSettings?.whatsappUrl || `https://wa.me/${(profile.whatsapp || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 transition hover:scale-105 shadow-sm"
                    title="Official WhatsApp Business"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* TikTok Link */}
                {(profile.tiktokUrl || userSettings?.tiktokUrl) && (
                  <a
                    href={profile.tiktokUrl || userSettings?.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/50 text-pink-300 transition hover:scale-105 shadow-sm"
                    title="Official TikTok Profile"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>TikTok</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* Instagram Link */}
                {(profile.instagramUrl || userSettings?.instagramUrl) && (
                  <a
                    href={profile.instagramUrl || userSettings?.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-300 transition hover:scale-105 shadow-sm"
                    title="Official Instagram Profile"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}

                {/* Custom Social Platforms Added dynamically */}
                {(profile.customSocials || userSettings?.customSocials)?.map((cs) => (
                  <a
                    key={cs.id}
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/40 text-amber-300 transition hover:scale-105 shadow-sm"
                    title={cs.platformName}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{cs.platformName}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                ))}

                {/* Add Social Platform Action Button */}
                <button
                  onClick={onOpenSettingsModal}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 transition text-[11px] font-bold cursor-pointer hover:scale-105"
                  title="Add or Manage Official Social Platforms"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Add Platform</span>
                </button>
              </div>
            </div>

            {/* Social Buttons, Follow Button & Quick Edit */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2">
              
              {/* AI Chat & Talk System Button */}
              {onOpenAIChatModal && (
                <button
                  onClick={onOpenAIChatModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-xl hover:scale-105 cursor-pointer border border-indigo-300/40 ring-2 ring-indigo-400/20"
                  title="Open AI Chat & Voice Talk Assistant"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>{t.liveChatAI}</span>
                  <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    Gemini 3.6
                  </span>
                </button>
              )}

              {/* Main CEO Control Center & Monetization Dashboard Button */}
              <button
                onClick={onOpenCEODashboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl hover:scale-105 cursor-pointer border border-amber-300/60 ring-2 ring-amber-400/20"
              >
                <Crown className="w-4 h-4 fill-current text-slate-950" />
                <span>{t.ceoAnalytics}</span>
              </button>

              {/* Interactive Follow Button */}
              <button
                onClick={onToggleFollow}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer ${
                  profile.isFollowing
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/40 hover:scale-105'
                }`}
              >
                {profile.isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>{t.followingBtn}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>{t.follow}</span>
                  </>
                )}
              </button>

              {/* Know Who Follows Me Button */}
              <button
                onClick={onOpenFollowersModal}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>{t.followers}</span>
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                  {profile.followersCount.toLocaleString()}
                </span>
              </button>

              {/* Quick Customize Profile Button */}
              <button
                onClick={onOpenEditModal}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
                title="Edit Phone Number, Email, Photos, Location"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.editProfile}</span>
              </button>

            </div>

          </div>

        </div>

        {/* Quick Jump Action Pills */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigateSection('search-section');
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/50 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Search Portal</span>
          </button>

          <button
            onClick={() => {
              onSelectCategory('bbs');
              onNavigateSection('search-section');
            }}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/60 hover:bg-emerald-600/20 border border-slate-700/60 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>BBS Notes</span>
          </button>

          <button
            onClick={() => onNavigateSection('helpdesk')}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/60 hover:bg-amber-600/20 border border-slate-700/60 hover:border-amber-500/50 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Help Desk Info</span>
          </button>

          <button
            onClick={() => onNavigateSection('contact')}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/60 hover:bg-rose-600/20 border border-slate-700/60 hover:border-rose-500/50 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <Phone className="w-4 h-4 text-rose-400" />
            <span>Contact & Office</span>
          </button>
        </div>

      </div>
    </header>
  );
};
