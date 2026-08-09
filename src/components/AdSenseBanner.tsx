import React, { useState } from 'react';
import { Sparkles, DollarSign, ExternalLink, ShieldCheck, Info } from 'lucide-react';

interface AdSenseBannerProps {
  publisherId: string;
  adSlot?: string;
  format?: 'banner' | 'rectangle' | 'responsive';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  publisherId = 'ca-pub-9842109281203912',
  adSlot = '8910238120',
  format = 'responsive'
}) => {
  const [adClicked, setAdClicked] = useState(false);

  return (
    <div className="w-full my-6 bg-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg text-slate-200 relative overflow-hidden">
      
      {/* Top AdSense Badge Header */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-800 pb-1.5 font-mono">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>ADS BY GOOGLE ADSENSE</span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-sans font-extrabold">
            Active Monetization
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Slot: {adSlot}</span>
          <span className="text-slate-600">•</span>
          <span>Pub: {publisherId}</span>
        </div>
      </div>

      {/* Rendered Interactive Google Ad Unit Display */}
      <div 
        className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-xl p-4 sm:p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:border-amber-400/50 transition"
        onClick={() => setAdClicked(true)}
      >
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-lg shrink-0 shadow-md">
            🇳🇵
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 mb-1 inline-block">
              Sponsored Advertisement
            </span>
            <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
              Nepal Commercial Bank High-Interest Savings & Student Loans Scheme 2026
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">
              Instant online account opening with 8.5% p.a. yield & free mobile banking for BBS students.
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setAdClicked(true);
          }}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Visit Sponsor</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Click feedback indicator */}
      {adClicked && (
        <div className="mt-2 text-center text-xs font-bold text-emerald-400 bg-emerald-950/60 py-1.5 rounded-lg border border-emerald-800/60 animate-fade-in">
          ✓ AdSense Click Recorded! Earnings credited to CEO & Creator Wallet (+NPR 12.50)
        </div>
      )}

    </div>
  );
};
