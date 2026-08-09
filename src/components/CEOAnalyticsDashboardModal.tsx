import React, { useState } from 'react';
import { X, Crown, BarChart2, Eye, Users, Heart, Share2, TrendingUp, DollarSign, Activity, MessageSquare, Sparkles, ShieldCheck, Download, RefreshCw, Layers, Wallet, Facebook } from 'lucide-react';
import { ContentItem, ProfileData } from '../types';

interface CEOAnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  items: ContentItem[];
  totalFollowers: number;
  onOpenPayoutModal: () => void;
  onOpenAdSenseModal: () => void;
  onOpenFbModal: () => void;
}

export const CEOAnalyticsDashboardModal: React.FC<CEOAnalyticsDashboardModalProps> = ({
  isOpen,
  onClose,
  profile,
  items,
  totalFollowers,
  onOpenPayoutModal,
  onOpenAdSenseModal,
  onOpenFbModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'engagement' | 'monetization'>('overview');

  if (!isOpen) return null;

  const totalViews = items.reduce((acc, item) => acc + (item.views || 0), 0);
  const totalPosts = items.length;

  // Category breakdown stats
  const categoryStats = items.reduce((acc, item) => {
    const cat = item.categoryLabel || item.category;
    if (!acc[cat]) {
      acc[cat] = { count: 0, views: 0 };
    }
    acc[cat].count += 1;
    acc[cat].views += item.views || 0;
    return acc;
  }, {} as Record<string, { count: number; views: number }>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-4xl rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CEO Header Bar */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-5 px-6 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-black">
              <Crown className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-amber-300 uppercase">
                  CEO Analytics & Control Center
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  CEO Access Only
                </span>
              </div>
              <p className="text-slate-400 text-xs">Executive insights for CEO {profile.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Traffic Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('engagement')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'engagement'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Content Engagement</span>
          </button>

          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'monetization'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Monetization & Reach</span>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Key Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between text-indigo-400 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Views</span>
                <Eye className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{totalViews.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-400 font-semibold mt-1">↑ 18.4% this month</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Supporters</span>
                <Users className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{totalFollowers.toLocaleString()}</p>
              <p className="text-[10px] text-amber-300 font-semibold mt-1">Verified Community</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between text-rose-400 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Posts</span>
                <Layers className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{totalPosts}</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Across 8 channels</p>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Est. Revenue</span>
                <DollarSign className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-emerald-300">$1,450</p>
              <p className="text-[10px] text-emerald-400 font-semibold mt-1">NPR 1,93,000 / mo</p>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Category Breakdown Bars */}
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Channel Wise View Distribution</span>
                </h3>

                <div className="space-y-3">
                  {Object.entries(categoryStats).map(([catName, statVal]) => {
                    const stat = statVal as { count: number; views: number };
                    const percentage = Math.round((stat.views / (totalViews || 1)) * 100);
                    return (
                      <div key={catName} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-200">{catName} ({stat.count} posts)</span>
                          <span className="text-amber-300 font-mono">{stat.views.toLocaleString()} views ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geographic Demographics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
                  <h4 className="text-xs font-extrabold text-slate-300 uppercase mb-3">Top Viewer Regions (Nepal)</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between py-1 border-b border-slate-700/50">
                      <span>1. Waling & Syangja District</span>
                      <span className="font-bold text-amber-400">42%</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-700/50">
                      <span>2. Kathmandu Valley (TU BBS Students)</span>
                      <span className="font-bold text-indigo-400">31%</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-700/50">
                      <span>3. Pokhara & Gandaki Province</span>
                      <span className="font-bold text-emerald-400">18%</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>4. Chitwan & Other Districts</span>
                      <span className="font-bold text-slate-400">9%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
                  <h4 className="text-xs font-extrabold text-slate-300 uppercase mb-3">Audience Demographics</h4>
                  <ul className="space-y-2 text-xs">
                    <li className="flex justify-between py-1 border-b border-slate-700/50">
                      <span>BBS & Management Students</span>
                      <span className="font-bold text-amber-400">54%</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-700/50">
                      <span>Youth & Entertainment Viewers</span>
                      <span className="font-bold text-rose-400">28%</span>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>News & Politics Enthusiasts</span>
                      <span className="font-bold text-teal-400">18%</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                Top Performing Content Posts
              </h3>

              <div className="space-y-3">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/70 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.thumbnailUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-xs font-extrabold text-white line-clamp-1">{item.title}</h4>
                        <span className="text-[11px] text-slate-400 font-medium">{item.categoryLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                      <span className="flex items-center gap-1 text-indigo-300">
                        <Eye className="w-3.5 h-3.5" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1 text-rose-400">
                        <Heart className="w-3.5 h-3.5" />
                        {Math.floor((item.views || 100) * 0.12)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monetization' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-4">
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Monetization & Sponsorship Control Hub</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-bold">Google AdSense Net Revenue</span>
                    <span className="text-xl font-bold text-emerald-400">$820.00 USD / mo</span>
                    <span className="text-[10px] text-slate-400 block mt-1">ca-pub-9842109281203912</span>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-bold">Total Available Payout Balance</span>
                    <span className="text-xl font-bold text-amber-400">$1,450.00 USD</span>
                    <span className="text-[10px] text-emerald-300 block mt-1">Min. transfer allowed: $5.00 USD</span>
                  </div>
                </div>
              </div>

              {/* Direct Dashboard Launcher Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  Dashboard Monetization & Social Growth Tools
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* eSewa / Khalti / Banks Transfer Card */}
                  <div 
                    onClick={() => {
                      onClose();
                      onOpenPayoutModal();
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 shadow-lg cursor-pointer transition hover:scale-105 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center mb-3 font-bold shadow">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <h5 className="font-black text-sm text-white group-hover:text-emerald-300 transition">
                      eSewa / Khalti / Banks Payouts
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Execute real instant transfers to Nepal digital wallets or bank accounts.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 mt-3 font-mono">
                      Transfer $5.00+ USD →
                    </span>
                  </div>

                  {/* Google AdSense Integration Hub Card */}
                  <div 
                    onClick={() => {
                      onClose();
                      onOpenAdSenseModal();
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-amber-950 to-slate-900 border border-amber-500/40 hover:border-amber-400 shadow-lg cursor-pointer transition hover:scale-105 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-3 font-bold shadow">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h5 className="font-black text-sm text-white group-hover:text-amber-300 transition">
                      Google AdSense Hub
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Manage publisher code snippets, ad slots, and banner ad positions.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 mt-3 font-mono">
                      AdSense Settings →
                    </span>
                  </div>

                  {/* Facebook Auto Invite Friends Card */}
                  <div 
                    onClick={() => {
                      onClose();
                      onOpenFbModal();
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-900 border border-blue-500/40 hover:border-blue-400 shadow-lg cursor-pointer transition hover:scale-105 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 font-bold shadow">
                      <Facebook className="w-5 h-5 fill-current" />
                    </div>
                    <h5 className="font-black text-sm text-white group-hover:text-blue-300 transition">
                      Facebook Friends Sync
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Auto invite Facebook friends to follow CEO Arjun Singh Ghatang portal.
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 mt-3 font-mono">
                      Invite Friends →
                    </span>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* CEO Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CEO & FOUNDER: ARJUN SINGH GHATANG</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
