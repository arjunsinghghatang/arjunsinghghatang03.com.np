import React, { useState } from 'react';
import { X, Sparkles, DollarSign, Check, Copy, ExternalLink, ShieldCheck, RefreshCw, BarChart3, Layout, Code2, Play } from 'lucide-react';
import { AdSenseBanner } from './AdSenseBanner';

interface GoogleAdsenseHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAdsenseHubModal: React.FC<GoogleAdsenseHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [publisherId, setPublisherId] = useState('ca-pub-9842109281203912');
  const [autoAdsEnabled, setAutoAdsEnabled] = useState(true);
  const [inFeedAdsEnabled, setInFeedAdsEnabled] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  if (!isOpen) return null;

  const codeSnippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}"
     crossorigin="anonymous"></script>
<!-- Nepal Media & BBS Student Portal Header Ad Unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="${publisherId}"
     data-ad-slot="8910238120"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-5 px-6 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-amber-300 uppercase">
                  Google AdSense Monetization Hub
                </h2>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Connected
                </span>
              </div>
              <p className="text-slate-400 text-xs">Easy Google AdSense account integration, code generator & live ad previews</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">

          {/* AdSense Earnings Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Today Estimated</span>
              <span className="text-lg font-black text-amber-400 font-mono">$18.40 USD</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">≈ NPR 2,447</span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Page Views</span>
              <span className="text-lg font-black text-indigo-300 font-mono">14,280</span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">High Student Traffic</span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Page RPM</span>
              <span className="text-lg font-black text-emerald-400 font-mono">$1.28</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Revenue per 1k views</span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Monthly Ad Earnings</span>
              <span className="text-lg font-black text-amber-300 font-mono">$524.10 USD</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">≈ NPR 69,700</span>
            </div>
          </div>

          {/* AdSense Configuration Form */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <h3 className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Google AdSense Publisher Configuration</span>
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Domain Ready: arjunsinghghatang.com.np</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXX) *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={publisherId}
                  onChange={(e) => setPublisherId(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-amber-300 font-bold"
                />
                <button
                  onClick={() => setIsConnected(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer shadow transition"
                >
                  Save Connection
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Enable AdSense Auto-Ads</span>
                  <span className="text-[10px] text-slate-400">Google automatically places optimized ad formats</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAdsEnabled}
                  onChange={(e) => setAutoAdsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">In-Feed Content Ads</span>
                  <span className="text-[10px] text-slate-400">Insert ads between educational posts & videos</span>
                </div>
                <input
                  type="checkbox"
                  checked={inFeedAdsEnabled}
                  onChange={(e) => setInFeedAdsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Generated HTML Code Snippet */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-300">Google AdSense Header Tag Snippet</span>
                <button
                  onClick={handleCopyCode}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Tag Code'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={codeSnippet}
                rows={5}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-emerald-400 leading-relaxed"
              />
            </div>
          </div>

          {/* AdSense Live Preview Banner */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">
              Live Google Ad Unit Rendering Test
            </h3>
            <AdSenseBanner publisherId={publisherId} adSlot="8910238120" />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Monetization Status: Active & Serving</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
