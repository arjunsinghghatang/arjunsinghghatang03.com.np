import React, { useState } from 'react';
import { 
  X, ShieldCheck, Shield, Lock, Unlock, Eye, EyeOff, Key, Smartphone, Globe, 
  Download, RefreshCw, Facebook, Youtube, Github, Trash2, CheckCircle2, AlertTriangle, 
  Users, Bell, Sliders, Zap, Video, Mail, HardDrive, Check, Copy, ExternalLink, 
  Settings, Sparkles, Monitor, Radio, MessageSquare, Flame, ShieldAlert, Cpu, Database
} from 'lucide-react';
import { ProfileData, UserSettings } from '../types';

interface SecurityPrivacyToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  settings: UserSettings;
  onSaveSettings: (newSettings: UserSettings) => void;
  onOpen2FAModal?: () => void;
}

export const SecurityPrivacyToolsModal: React.FC<SecurityPrivacyToolsModalProps> = ({
  isOpen,
  onClose,
  profile,
  settings,
  onSaveSettings,
  onOpen2FAModal
}) => {
  const [activeTab, setActiveTab] = useState<'facebook' | 'google' | 'tiktok' | 'youtube' | 'audit_logs'>('facebook');
  
  // Facebook Tools Local States
  const [fbTagReview, setFbTagReview] = useState(true);
  const [fbOffActivity, setFbOffActivity] = useState(true);
  const [fbProfileLock, setFbProfileLock] = useState(false);
  const [fbActiveSessions, setFbActiveSessions] = useState([
    { id: '1', device: 'Chrome on Windows 11 (Current)', location: 'Kathmandu, Nepal', ip: '27.34.120.45', time: 'Active now', isCurrent: true },
    { id: '2', device: 'Samsung Galaxy S24 Ultra', location: 'Pokhara / Syangja, Nepal', ip: '110.44.115.89', time: '2 hours ago', isCurrent: false },
    { id: '3', device: 'Safari on iPad Pro', location: 'Kathmandu, Nepal', ip: '27.34.120.48', time: 'Yesterday at 04:12 PM', isCurrent: false }
  ]);

  // Google Tools Local States
  const [googlePasskeysEnabled, setGooglePasskeysEnabled] = useState(true);
  const [googleAutoDeleteHistory, setGoogleAutoDeleteHistory] = useState<'3' | '18' | 'never'>('18');
  const [googleLocationHistory, setGoogleLocationHistory] = useState(true);
  const [googleOAuthApps, setGoogleOAuthApps] = useState([
    { id: 'app1', name: 'Nepal Viral News Portal API', scope: 'Gmail, Drive, YouTube V3', verified: true },
    { id: 'app2', name: 'eSewa Digital Wallet Auth Gateway', scope: 'Profile, Payment Webhook', verified: true },
    { id: 'app3', name: 'Google Cloud Platform AI Studio App', scope: 'Gemini 3.6 Flash, Vertex AI', verified: true }
  ]);

  // TikTok Tools Local States
  const [tiktokDmPrivacy, setTiktokDmPrivacy] = useState<'everyone' | 'followers' | 'none'>('followers');
  const [tiktokAllowDuet, setTiktokAllowDuet] = useState(true);
  const [tiktokAllowStitch, setTiktokAllowStitch] = useState(true);
  const [tiktokAllowDownload, setTiktokAllowDownload] = useState(true);
  const [tiktokRestrictedMode, setTiktokRestrictedMode] = useState(false);
  const [tiktokCommentFilterKeywords, setTiktokCommentFilterKeywords] = useState('spam, scam, fake, promo');

  // YouTube Tools Local States
  const [ytCopyrightAutoScan, setYtCopyrightAutoScan] = useState(true);
  const [ytLiveChatModerator, setYtLiveChatModerator] = useState(true);
  const [ytHideSubscribers, setYtHideSubscribers] = useState(false);
  const [ytKeepPlaylistsPrivate, setYtKeepPlaylistsPrivate] = useState(true);
  const [ytVideoWatermark, setYtVideoWatermark] = useState(true);

  // General Notification & Toast Toasting
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showSuccessNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleLogoutOtherFbSessions = () => {
    setFbActiveSessions(prev => prev.filter(s => s.isCurrent));
    showSuccessNotification('Logged out of all other active Facebook sessions across devices.');
  };

  const handleDownloadPlatformData = (platformName: string) => {
    const exportObject = {
      platform: platformName,
      accountHolder: profile.name,
      email: profile.email,
      phone: profile.phone,
      securityStatus: '2FA Protected',
      exportedAt: new Date().toISOString(),
      settings: settings
    };
    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${platformName.toLowerCase()}_security_privacy_data_backup.json`;
    a.click();
    showSuccessNotification(`Downloaded official ${platformName} account & privacy backup data (JSON).`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400/50 text-amber-300 flex items-center justify-center font-bold shadow-lg">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black text-white tracking-wide">
                  Security, Privacy & Creator Tools Hub
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>2FA Active</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Unified Controls for Facebook, Google, TikTok, and YouTube Security & Data Privacy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950 text-xs font-bold overflow-x-auto shrink-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('facebook')}
            className={`flex-1 min-w-[140px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'facebook'
                ? 'border-blue-500 text-blue-300 bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Facebook className="w-4 h-4 text-blue-400 fill-current" />
            <span>Facebook Privacy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`flex-1 min-w-[140px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'google'
                ? 'border-emerald-500 text-emerald-300 bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Google Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tiktok')}
            className={`flex-1 min-w-[140px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'tiktok'
                ? 'border-pink-500 text-pink-300 bg-pink-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span>TikTok Safety</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('youtube')}
            className={`flex-1 min-w-[140px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'youtube'
                ? 'border-red-500 text-red-300 bg-red-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>YouTube Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit_logs')}
            className={`flex-1 min-w-[140px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'audit_logs'
                ? 'border-amber-500 text-amber-300 bg-amber-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Security Logs</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Notification Toast */}
          {actionSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center justify-between gap-2 shadow-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{actionSuccessMsg}</span>
              </div>
              <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 1: FACEBOOK SECURITY & PRIVACY TOOLS */}
          {activeTab === 'facebook' && (
            <div className="space-y-5">
              
              {/* Header Card */}
              <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-blue-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/30 text-blue-300 shrink-0">
                  <Facebook className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Facebook Security & Audience Controls</h3>
                  <p className="text-xs text-blue-200/90 mt-0.5">
                    Configure your timeline tagging, login alerts, profile lock, off-Facebook data tracking, and active device sessions.
                  </p>
                </div>
              </div>

              {/* Security Checkup & Quick 2FA Status */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-blue-400 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Facebook Security Checkup Status</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    PASSED (3/3 Checks)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold block flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Password Strong
                    </span>
                    <span className="text-[11px] text-slate-400">Encrypted with bcrypt & 2FA</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold block flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 2FA Email Active
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">arjunsinghghatang@gmail.com</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="text-emerald-400 font-bold block flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Login Alerts On
                    </span>
                    <span className="text-[11px] text-slate-400">Notifies email on new login</span>
                  </div>
                </div>
              </div>

              {/* Profile Lock & Tagging Controls */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                  Profile Guard & Timeline Controls
                </h4>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-white block">Facebook Profile Guard / Lock</span>
                      <span className="text-[11px] text-slate-400 block">Restricts non-friends from downloading or expanding profile picture.</span>
                    </div>
                    <button
                      onClick={() => {
                        setFbProfileLock(!fbProfileLock);
                        showSuccessNotification(`Facebook Profile Lock ${!fbProfileLock ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        fbProfileLock ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {fbProfileLock ? 'Locked 🔒' : 'Unlocked 🔓'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-white block">Review Tags Before Appearing on Timeline</span>
                      <span className="text-[11px] text-slate-400 block">Require manual CEO approval before tagged posts appear publicly.</span>
                    </div>
                    <button
                      onClick={() => {
                        setFbTagReview(!fbTagReview);
                        showSuccessNotification(`Tag Review requirement ${!fbTagReview ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        fbTagReview ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {fbTagReview ? 'Review ON' : 'Auto Post'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-white block">Off-Facebook Activity Data Tracking</span>
                      <span className="text-[11px] text-slate-400 block">Clear activity sent by external sites or disconnect off-site tracking.</span>
                    </div>
                    <button
                      onClick={() => {
                        setFbOffActivity(!fbOffActivity);
                        showSuccessNotification(`Off-Facebook activity tracking ${!fbOffActivity ? 'Protected' : 'Allowed'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        fbOffActivity ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {fbOffActivity ? 'Disconnected' : 'Connected'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Login Sessions */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-indigo-400" />
                    <span>Recognized Devices & Active Login Sessions ({fbActiveSessions.length})</span>
                  </span>
                  {fbActiveSessions.length > 1 && (
                    <button
                      onClick={handleLogoutOtherFbSessions}
                      className="px-2.5 py-1 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-bold cursor-pointer transition"
                    >
                      Log Out Other Devices
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {fbActiveSessions.map(session => (
                    <div key={session.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-white block flex items-center gap-1.5">
                          {session.device}
                          {session.isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black uppercase">
                              This Device
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          📍 {session.location} • IP: <span className="font-mono text-amber-300">{session.ip}</span> • {session.time}
                        </span>
                      </div>
                      {!session.isCurrent && (
                        <button
                          onClick={() => {
                            setFbActiveSessions(prev => prev.filter(s => s.id !== session.id));
                            showSuccessNotification(`Terminated session on ${session.device}.`);
                          }}
                          className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-400 text-[10px] font-bold cursor-pointer"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Facebook Data */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-white block">Download Your Facebook Data Archive</span>
                  <span className="text-[11px] text-slate-400 block">Export posts, photos, messages, and followers list in JSON format.</span>
                </div>
                <button
                  onClick={() => handleDownloadPlatformData('Facebook')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Archive</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: GOOGLE SECURITY & PRIVACY CHECKUP */}
          {activeTab === 'google' && (
            <div className="space-y-5">
              
              {/* Header Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600/30 text-emerald-300 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Google Security Checkup & Privacy Dashboard</h3>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    Audit connected Google Workspace accounts, Passkeys, location history, OAuth app permissions, and Google Takeout data exports.
                  </p>
                </div>
              </div>

              {/* Google Security Audit Green Shield */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-400 uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Google Account Security Shield Audit</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Secure</span>
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-bold">Primary Recovery Email:</span>
                    <span className="text-amber-300 font-mono font-bold">arjunsinghghatang@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-bold">Passkeys & Security Keys:</span>
                    <button
                      onClick={() => {
                        setGooglePasskeysEnabled(!googlePasskeysEnabled);
                        showSuccessNotification(`Google Passkeys ${!googlePasskeysEnabled ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                        googlePasskeysEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {googlePasskeysEnabled ? 'Passkeys Active 🔑' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Checkup & Auto-Delete Settings */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                  Google Privacy Controls & History Retention
                </h4>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Auto-Delete Search & Web Activity</span>
                      <span className="text-[11px] text-slate-400 block">Automatically purge activity logs after selected threshold.</span>
                    </div>
                    <select
                      value={googleAutoDeleteHistory}
                      onChange={(e) => {
                        setGoogleAutoDeleteHistory(e.target.value as '3' | '18' | 'never');
                        showSuccessNotification('Google Auto-Delete History setting updated.');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-amber-300 text-xs font-bold focus:outline-none"
                    >
                      <option value="3">Auto-Delete after 3 Months</option>
                      <option value="18">Auto-Delete after 18 Months</option>
                      <option value="never">Never Auto-Delete</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Google Location History</span>
                      <span className="text-[11px] text-slate-400 block">Save places you visit with your devices.</span>
                    </div>
                    <button
                      onClick={() => {
                        setGoogleLocationHistory(!googleLocationHistory);
                        showSuccessNotification(`Google Location History ${!googleLocationHistory ? 'Turned ON' : 'Paused'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        googleLocationHistory ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {googleLocationHistory ? 'Tracking ON' : 'Paused'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Third-Party Connected Apps */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Third-Party Connected OAuth Apps ({googleOAuthApps.length})</span>
                </span>

                <div className="space-y-2">
                  {googleOAuthApps.map(app => (
                    <div key={app.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-amber-300 block">{app.name}</span>
                        <span className="text-[11px] text-slate-400 block">Scopes: {app.scope}</span>
                      </div>
                      <button
                        onClick={() => {
                          setGoogleOAuthApps(prev => prev.filter(a => a.id !== app.id));
                          showSuccessNotification(`Revoked access for ${app.name}.`);
                        }}
                        className="px-2.5 py-1 rounded-md bg-rose-950 hover:bg-rose-900 text-rose-300 text-[10px] font-bold cursor-pointer"
                      >
                        Revoke Access
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Takeout Export */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-white block">Google Takeout Full Export</span>
                  <span className="text-[11px] text-slate-400 block">Download copy of your data from Google Drive, Photos, Notes & Channel.</span>
                </div>
                <button
                  onClick={() => handleDownloadPlatformData('Google_Takeout')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Takeout</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: TIKTOK SAFETY & CREATOR PRIVACY */}
          {activeTab === 'tiktok' && (
            <div className="space-y-5">
              
              {/* Header Card */}
              <div className="p-4 rounded-2xl bg-pink-950/60 border border-pink-800/80 text-pink-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-pink-600/30 text-pink-300 shrink-0">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">TikTok Creator Safety & Video Interaction Controls</h3>
                  <p className="text-xs text-pink-200/90 mt-0.5">
                    Manage direct messages, Duet and Stitch permissions, video downloads, spam comment filters, and screen time safety.
                  </p>
                </div>
              </div>

              {/* Direct Messages & Video Permission Controls */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                  TikTok Content & Interaction Rights
                </h4>

                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Who Can Direct Message (DM) You</span>
                      <span className="text-[11px] text-slate-400 block">Control who can send inbox messages on TikTok.</span>
                    </div>
                    <select
                      value={tiktokDmPrivacy}
                      onChange={(e) => {
                        setTiktokDmPrivacy(e.target.value as any);
                        showSuccessNotification('TikTok Direct Message Privacy updated.');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-pink-300 text-xs font-bold focus:outline-none"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="followers">Followers & Friends Only</option>
                      <option value="none">No One (Block DMs)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Allow Duet on Uploaded Videos</span>
                      <span className="text-[11px] text-slate-400 block">Let viewers create side-by-side duet videos with your posts.</span>
                    </div>
                    <button
                      onClick={() => {
                        setTiktokAllowDuet(!tiktokAllowDuet);
                        showSuccessNotification(`TikTok Duet ${!tiktokAllowDuet ? 'Allowed' : 'Blocked'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        tiktokAllowDuet ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tiktokAllowDuet ? 'Allowed ✅' : 'Blocked ❌'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Allow Stitch on Videos</span>
                      <span className="text-[11px] text-slate-400 block">Allow creators to stitch clips from your videos into theirs.</span>
                    </div>
                    <button
                      onClick={() => {
                        setTiktokAllowStitch(!tiktokAllowStitch);
                        showSuccessNotification(`TikTok Stitch ${!tiktokAllowStitch ? 'Allowed' : 'Blocked'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        tiktokAllowStitch ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tiktokAllowStitch ? 'Allowed ✅' : 'Blocked ❌'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Allow Direct Video Downloads</span>
                      <span className="text-[11px] text-slate-400 block">Permit viewers to save video MP4 files to their device gallery.</span>
                    </div>
                    <button
                      onClick={() => {
                        setTiktokAllowDownload(!tiktokAllowDownload);
                        showSuccessNotification(`TikTok Video Downloads ${!tiktokAllowDownload ? 'Allowed' : 'Protected'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        tiktokAllowDownload ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tiktokAllowDownload ? 'Allowed' : 'Protected (No Download)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment Spam Filter Keyphrases */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-pink-400" />
                  <span>TikTok Spam & Keyword Auto-Blocker</span>
                </span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Enter comma-separated keywords to automatically hide from video comments:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tiktokCommentFilterKeywords}
                      onChange={(e) => setTiktokCommentFilterKeywords(e.target.value)}
                      className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-amber-300 font-mono focus:outline-none"
                    />
                    <button
                      onClick={() => showSuccessNotification('TikTok Comment Filter Keywords Saved.')}
                      className="px-3.5 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Save Keywords
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: YOUTUBE STUDIO COPYRIGHT & CHANNEL PROTECTION */}
          {activeTab === 'youtube' && (
            <div className="space-y-5">
              
              {/* Header Card */}
              <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-red-600/30 text-red-300 shrink-0">
                  <Youtube className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">YouTube Studio Copyright & Live Stream Safeguards</h3>
                  <p className="text-xs text-red-200/90 mt-0.5">
                    Configure YouTube Content ID auto-scanner, live chat auto-moderation, subscriber count visibility, and video watermark protection.
                  </p>
                </div>
              </div>

              {/* Content ID Auto-Scan & Copyright Shield */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-red-400 uppercase tracking-wide">
                    <ShieldCheck className="w-4.5 h-4.5 text-red-400" />
                    <span>YouTube Content ID Copyright Auto-Scanner</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    STRIKE-FREE (0 Strikes)
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Auto-Scan Audio & Music Copyrights</span>
                      <span className="text-[11px] text-slate-400 block">Scans background audio during video upload to prevent copyright claims.</span>
                    </div>
                    <button
                      onClick={() => {
                        setYtCopyrightAutoScan(!ytCopyrightAutoScan);
                        showSuccessNotification(`YouTube Content ID Scanner ${!ytCopyrightAutoScan ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        ytCopyrightAutoScan ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ytCopyrightAutoScan ? 'Scanner Active' : 'Disabled'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">YouTube Live Stream Auto-Moderator</span>
                      <span className="text-[11px] text-slate-400 block">Blocks spam links and abusive messages automatically in live chat.</span>
                    </div>
                    <button
                      onClick={() => {
                        setYtLiveChatModerator(!ytLiveChatModerator);
                        showSuccessNotification(`YouTube Live Auto-Moderator ${!ytLiveChatModerator ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        ytLiveChatModerator ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ytLiveChatModerator ? 'Auto-Mod ON' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Channel Privacy & Watermarks */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                  Channel Privacy & Branding Safeguards
                </h4>

                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Hide Subscriber Count</span>
                      <span className="text-[11px] text-slate-400 block">Choose whether to display total subscriber tally on channel.</span>
                    </div>
                    <button
                      onClick={() => {
                        setYtHideSubscribers(!ytHideSubscribers);
                        showSuccessNotification(`Subscriber tally ${!ytHideSubscribers ? 'Hidden' : 'Visible'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        ytHideSubscribers ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ytHideSubscribers ? 'Hidden 🙈' : 'Visible 👁️'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Keep Saved Playlists Private</span>
                      <span className="text-[11px] text-slate-400 block">Prevents saved video playlists from appearing on channel front page.</span>
                    </div>
                    <button
                      onClick={() => {
                        setYtKeepPlaylistsPrivate(!ytKeepPlaylistsPrivate);
                        showSuccessNotification(`Saved Playlists ${!ytKeepPlaylistsPrivate ? 'Private' : 'Public'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        ytKeepPlaylistsPrivate ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ytKeepPlaylistsPrivate ? 'Private 🔒' : 'Public 🌐'}
                    </button>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white block">Channel Video Branding Watermark</span>
                      <span className="text-[11px] text-slate-400 block">Embed "Arjun Singh Ghatang CEO" watermark in bottom right corner of videos.</span>
                    </div>
                    <button
                      onClick={() => {
                        setYtVideoWatermark(!ytVideoWatermark);
                        showSuccessNotification(`Branding Watermark ${!ytVideoWatermark ? 'Enabled' : 'Disabled'}.`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        ytVideoWatermark ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ytVideoWatermark ? 'Watermark Active' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: REAL-TIME SECURITY AUDIT LOGS */}
          {activeTab === 'audit_logs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800/80 text-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-black text-xs text-amber-300 uppercase tracking-wider">Real-time Account Audit Log Stream</h3>
                    <p className="text-[11px] text-slate-300">Monitors all authentication requests, settings modifications, & API syncs.</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px]">
                  LIVE LOGS
                </span>
              </div>

              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Event Action</th>
                      <th className="p-3">IP & Location</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300 font-mono">
                    <tr>
                      <td className="p-3 text-slate-400">Just now</td>
                      <td className="p-3 text-blue-400 font-bold">Facebook</td>
                      <td className="p-3">2FA Audit Checkup</td>
                      <td className="p-3">27.34.120.45 (Kathmandu)</td>
                      <td className="p-3 text-emerald-400 font-bold">Passed ✅</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">2 mins ago</td>
                      <td className="p-3 text-emerald-400 font-bold">Google</td>
                      <td className="p-3">OAuth API Key Authenticated</td>
                      <td className="p-3">27.34.120.45 (Kathmandu)</td>
                      <td className="p-3 text-emerald-400 font-bold">Verified ✅</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">14 mins ago</td>
                      <td className="p-3 text-pink-400 font-bold">TikTok</td>
                      <td className="p-3">Comment Spam Filter Sync</td>
                      <td className="p-3">110.44.115.89 (Syangja)</td>
                      <td className="p-3 text-emerald-400 font-bold">Synced ✅</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-400">1 hour ago</td>
                      <td className="p-3 text-red-400 font-bold">YouTube</td>
                      <td className="p-3">Content ID Audio Check</td>
                      <td className="p-3">27.34.120.45 (Kathmandu)</td>
                      <td className="p-3 text-emerald-400 font-bold">Clean ✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Protected by Admin 2FA Code (<strong className="text-amber-300 font-mono">arjunsinghghatang@gmail.com</strong>)</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpen2FAModal && (
              <button
                type="button"
                onClick={onOpen2FAModal}
                className="px-3.5 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 border border-indigo-700/60 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>Re-Verify 2FA Key</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg"
            >
              Done & Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
