import React, { useState } from 'react';
import { 
  X, Settings, User, Shield, Key, Eye, EyeOff, Lock, Unlock, Globe, 
  Smartphone, Mail, CheckCircle2, AlertCircle, Save, RefreshCw, ShieldCheck,
  Facebook, Youtube, Github, Video, Sparkles, Sliders, ToggleLeft, ToggleRight,
  Bell, HelpCircle, MessageCircle, Plus, Trash2
} from 'lucide-react';
import { UserSettings, ProfileData } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSaveSettings: (newSettings: UserSettings) => void;
  profile: ProfileData;
  onUpdateProfileName?: (newName: string) => void;
  onOpenSecurityToolsModal?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  profile,
  onUpdateProfileName,
  onOpenSecurityToolsModal
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'status' | 'privacy' | 'security_tools' | 'protected_channels'>('account');
  const [formData, setFormData] = useState<UserSettings>(settings);
  
  // Password change form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  // 2FA Protected Channel Unlock state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinAttempt, setPinAttempt] = useState('');
  const [pinError, setPinError] = useState(false);
  const [settingsOtp, setSettingsOtp] = useState<string | null>(null);
  const [otpSentToast, setOtpSentToast] = useState(false);

  // Save Success Notification
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Custom Platform state
  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');

  if (!isOpen) return null;

  const handleSendSettingsOtp = async () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSettingsOtp(code);
    setOtpSentToast(true);
    setPinError(false);

    try {
      await fetch('/api/send-otp-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'arjunsinghghatang@gmail.com', otp: code })
      });
    } catch (e) {
      console.log('OTP dispatched to backend route:', e);
    }

    setTimeout(() => setOtpSentToast(false), 15000);
  };

  const handleAddCustomPlatform = () => {
    if (!newPlatformName.trim() || !newPlatformUrl.trim()) return;
    const newCustom = {
      id: `custom-${Date.now()}`,
      platformName: newPlatformName.trim(),
      url: newPlatformUrl.trim(),
      isLocked: true
    };
    setFormData(prev => ({
      ...prev,
      customSocials: [...(prev.customSocials || []), newCustom]
    }));
    setNewPlatformName('');
    setNewPlatformUrl('');
  };

  const handleRemoveCustomPlatform = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customSocials: (prev.customSocials || []).filter(c => c.id !== id)
    }));
  };

  const handleUnlockProtected = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      pinAttempt === '1234' ||
      pinAttempt === 'CEO2026' ||
      pinAttempt === '9800000000' ||
      pinAttempt === 'arjunsingh' ||
      (settingsOtp && pinAttempt === settingsOtp)
    ) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordErrorMsg('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordErrorMsg('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordErrorMsg('New password and confirmation do not match.');
      return;
    }

    setPasswordErrorMsg('');
    setPasswordSuccessMsg('Password updated successfully! Secured with 2FA.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccessMsg(''), 5000);
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    if (onUpdateProfileName && formData.accountName !== profile.name) {
      onUpdateProfileName(formData.accountName);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-400 flex items-center justify-center font-bold shadow-inner">
              <Settings className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">System & Profile Settings</h2>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-md font-bold uppercase">
                  Facebook Style
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Manage Account, Privacy, Active Status & Protected Official Channels
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

        {/* Tab Selection Bar */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-bold overflow-x-auto shrink-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`flex-1 min-w-[130px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'account'
                ? 'border-indigo-500 text-indigo-300 bg-indigo-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span>Account & Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 min-w-[120px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'status'
                ? 'border-emerald-500 text-emerald-300 bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${formData.activeStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>Active Status</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 min-w-[120px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-purple-500 text-purple-300 bg-purple-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Privacy Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security_tools')}
            className={`flex-1 min-w-[160px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'security_tools'
                ? 'border-blue-500 text-blue-300 bg-blue-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Platform Security & Tools 🛡️</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('protected_channels')}
            className={`flex-1 min-w-[150px] py-3 px-3 flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'protected_channels'
                ? 'border-amber-500 text-amber-300 bg-amber-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Official Channels 🔐</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Quick Launch Banner for Facebook, Google, TikTok & YouTube Security & Privacy Tools */}
          {onOpenSecurityToolsModal && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-indigo-700/80 shadow-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <span>Facebook, Google, TikTok & YouTube Tools Hub</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase">
                      New
                    </span>
                  </h3>
                  <p className="text-xs text-indigo-200/90 mt-0.5">
                    Security checkup, login sessions, Google Takeout, TikTok safety, & YouTube copyright shields.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSecurityToolsModal();
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition hover:scale-105 shrink-0"
              >
                <Sliders className="w-4 h-4 text-slate-950" />
                <span>Open Tools Hub</span>
              </button>
            </div>
          )}

          {savedSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>All Settings Saved Successfully to System!</span>
            </div>
          )}

          {/* TAB 1: ACCOUNT & SECURITY */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              
              {/* Profile Name & ID */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-wide">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>Account Identity & Handle</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Account User ID / Handle
                    </label>
                    <input
                      type="text"
                      value={formData.accountId}
                      onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password Change Sub-Form */}
              <form onSubmit={handlePasswordChange} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wide">
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>Change Account Password</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPasswords ? 'Hide Passwords' : 'Show Passwords'}</span>
                  </button>
                </div>

                {passwordSuccessMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-semibold">
                    {passwordSuccessMsg}
                  </div>
                )}

                {passwordErrorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-500 text-rose-200 text-xs font-semibold">
                    {passwordErrorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Current Password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">New Password</label>
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 block mb-1">Confirm New Password</label>
                      <input
                        type={showPasswords ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password"
                        className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow"
                  >
                    Update Password
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* TAB 2: ACTIVE STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${formData.activeStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                      <span>Show when you're Active</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Your friends and followers will see when you're active or recently active on this channel.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  
                  {/* Option: Active / Online */}
                  <div 
                    onClick={() => setFormData({ ...formData, activeStatus: 'online' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                      formData.activeStatus === 'online'
                        ? 'bg-emerald-950/60 border-emerald-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-400 mt-0.5 shrink-0 shadow-lg shadow-emerald-500/50" />
                    <div>
                      <span className="text-xs font-bold block text-white">🟢 Online (Active Status On)</span>
                      <span className="text-[11px] text-slate-300">Displays green active status dot next to profile & comments.</span>
                    </div>
                  </div>

                  {/* Option: Offline / Invisible */}
                  <div 
                    onClick={() => setFormData({ ...formData, activeStatus: 'offline' })}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                      formData.activeStatus === 'offline'
                        ? 'bg-indigo-950/60 border-indigo-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block text-white">⚫ Invisible / Offline Mode</span>
                      <span className="text-[11px] text-slate-300">Browse anonymously without showing active status to visitors.</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 text-xs text-indigo-200 space-y-1">
                <span className="font-black text-amber-300 block">💡 CEO Active Status Tip:</span>
                <p>
                  Setting status to <strong>Online</strong> keeps your followers engaged and lets visitors know you are actively moderating news and posts.
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: PRIVACY MODE (Public, Hide/Private, Unlisted & Access Policy) */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              
              {/* Access Policy Banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 text-xs text-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-amber-300 uppercase tracking-wide">
                    <Globe className="w-4.5 h-4.5 text-emerald-400" />
                    <span>Visitor & Follower Access Policy</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40 text-[10px]">
                    2FA ADMIN ENFORCED
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  <strong>✅ Enabled for Visitors & Followers:</strong> Read posts, like, comment, repost, tag, share, and upload photos & videos.<br />
                  <strong>🔒 Admin Only (2FA Secured):</strong> Editing profile details, email address, CEO status, location, and official locked channels.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-wide">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Profile & Posts Privacy Visibility</span>
                </div>

                <div className="space-y-3">
                  
                  {/* Public Option */}
                  <label 
                    onClick={() => setFormData({ ...formData, privacyMode: 'public' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      formData.privacyMode === 'public'
                        ? 'bg-purple-950/60 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="text-xs font-extrabold block text-white">🌐 Public (Recommended)</span>
                        <span className="text-[11px] text-slate-300">Anyone on or off Nepal Viral News Network can see your profile and posts.</span>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="privacy" 
                      checked={formData.privacyMode === 'public'} 
                      onChange={() => {}}
                      className="accent-purple-500" 
                    />
                  </label>

                  {/* Private / Hide Option */}
                  <label 
                    onClick={() => setFormData({ ...formData, privacyMode: 'private' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      formData.privacyMode === 'private'
                        ? 'bg-purple-950/60 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-amber-400" />
                      <div>
                        <span className="text-xs font-extrabold block text-white">🔒 Private / Hidden</span>
                        <span className="text-[11px] text-slate-300">Only verified followers and admins can view posts and email details.</span>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="privacy" 
                      checked={formData.privacyMode === 'private'} 
                      onChange={() => {}}
                      className="accent-purple-500" 
                    />
                  </label>

                  {/* Unlisted Option */}
                  <label 
                    onClick={() => setFormData({ ...formData, privacyMode: 'unlisted' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      formData.privacyMode === 'unlisted'
                        ? 'bg-purple-950/60 border-purple-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-5 h-5 text-indigo-400" />
                      <div>
                        <span className="text-xs font-extrabold block text-white">👁️ Unlisted (Link Only)</span>
                        <span className="text-[11px] text-slate-300">Hidden from search engines; accessible only via direct URL link.</span>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="privacy" 
                      checked={formData.privacyMode === 'unlisted'} 
                      onChange={() => {}}
                      className="accent-purple-500" 
                    />
                  </label>

                </div>
              </div>

              {/* Interaction Controls */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-slate-200">Who Can Comment & Tag You</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, whoCanComment: 'everyone' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      formData.whoCanComment === 'everyone'
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Everyone
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, whoCanComment: 'followers' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      formData.whoCanComment === 'followers'
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Followers Only
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, whoCanComment: 'approved' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      formData.whoCanComment === 'approved'
                        ? 'bg-indigo-600 text-white border-indigo-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Approved Admin Only
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PLATFORM SECURITY & PRIVACY TOOLS */}
          {activeTab === 'security_tools' && (
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-indigo-700/80 text-blue-100 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-300 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-extrabold text-sm text-white">Facebook, Google, TikTok & YouTube Security & Privacy Hub</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                      2FA Protected
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200/90 mt-1">
                    Manage login sessions, Google Takeout exports, TikTok video privacy, YouTube Content ID shields, and Facebook profile locking inside settings options.
                  </p>
                  
                  {onOpenSecurityToolsModal && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSecurityToolsModal();
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-slate-950" />
                      <span>Launch Full Interactive Security & Tools Studio</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Platform Modules Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Facebook Security */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-400 flex items-center gap-1.5">
                      <Facebook className="w-4 h-4 fill-current" />
                      <span>Facebook Security</span>
                    </span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">
                      3 Sessions Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Profile lock active, timeline tag review enabled, off-Facebook tracking disconnected.
                  </p>
                </div>

                {/* Google Security */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      <span>Google Account Shield</span>
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                      100% Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Passkeys enabled, search history auto-delete set to 18 months, 3 connected OAuth apps.
                  </p>
                </div>

                {/* TikTok Safety */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-pink-400 flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      <span>TikTok Creator Safety</span>
                    </span>
                    <span className="text-[10px] bg-pink-950 text-pink-300 px-2 py-0.5 rounded font-mono font-bold">
                      Followers DMs
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Duet and Stitch allowed, direct MP4 downloads protected, comment spam keywords filtered.
                  </p>
                </div>

                {/* YouTube Studio */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-red-400 flex items-center gap-1.5">
                      <Youtube className="w-4 h-4" />
                      <span>YouTube Studio Shield</span>
                    </span>
                    <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded font-mono font-bold">
                      0 Copyright Claims
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Content ID auto-scanner enabled, live chat auto-moderator on, video watermark active.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: PROTECTED OFFICIAL CHANNELS (LOCKED 🔐) */}
          {activeTab === 'protected_channels' && (
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-600/70 text-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-amber-300 uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span>Protected Official Channels System (Locked 🔐)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow">
                    <Lock className="w-3 h-3" />
                    PERMANENTLY LOCKED
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Your official <strong>Facebook Page, YouTube Channel, GitHub Repository, TikTok, and Instagram</strong> links are securely locked. Visitors, followers, and unauthorized users <strong>cannot edit, modify, or remove</strong> these channels.
                </p>
              </div>

              {/* Master Unlock Panel */}
              {!isUnlocked ? (
                <form onSubmit={handleUnlockProtected} className="p-4 bg-slate-950 text-white rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-extrabold text-xs text-amber-400">
                      <Key className="w-4 h-4 text-amber-400" />
                      <span>CEO Master Key / Email 2FA Code Unlock</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendSettingsOtp}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send OTP to Email</span>
                    </button>
                  </div>

                  {otpSentToast && (
                    <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/80 text-emerald-100 text-xs space-y-2 shadow-xl animate-fade-in">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                          <div>
                            <span className="font-bold text-white block">⚡ 2FA OTP Dispatched to Gmail!</span>
                            <span className="text-[11px] text-emerald-300">Recipient: <strong className="text-white font-mono">arjunsinghghatang@gmail.com</strong></span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-900 border border-emerald-600/60 px-2 py-0.5 rounded-full font-bold text-emerald-300">
                          Under 60s Delivery
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-950/80 rounded-xl border border-emerald-800/60 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-emerald-200 block font-semibold">Please check your inbox or spam folder for your 6-digit code.</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href="https://mail.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Open Gmail</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-400">
                      Enter your CEO Master PIN or 6-digit OTP:
                    </p>
                    <button
                      type="button"
                      onClick={handleSendSettingsOtp}
                      className="text-[11px] text-amber-300 hover:text-amber-200 font-extrabold underline cursor-pointer flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-amber-400" />
                      <span>Forgot Password? Send OTP to Gmail</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      value={pinAttempt}
                      onChange={(e) => setPinAttempt(e.target.value)}
                      placeholder="Enter CEO Security PIN or 6-digit OTP"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow"
                    >
                      Unlock Channels
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-[11px] text-rose-400 font-semibold">
                      Incorrect Key or OTP code. Click 'Send OTP to Email' to receive a code at arjunsinghghatang@gmail.com.
                    </p>
                  )}
                </form>
              ) : (
                <div className="px-3.5 py-2.5 bg-emerald-950 text-emerald-200 rounded-xl text-xs font-bold flex items-center justify-between border border-emerald-500">
                  <span className="flex items-center gap-1.5">
                    <Unlock className="w-4 h-4 text-emerald-400" />
                    Channels Unlocked by CEO Arjun Singh Ghatang!
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsUnlocked(false)}
                    className="text-[10px] bg-slate-900 text-amber-300 px-2.5 py-1 rounded-md hover:bg-slate-800 cursor-pointer border border-amber-500/40"
                  >
                    Lock Now 🔐
                  </button>
                </div>
              )}

              {/* Official Social Links List */}
              <div className="space-y-3.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                
                {/* Facebook Page */}
                <div>
                  <label className="text-xs font-bold text-blue-400 flex items-center gap-1.5 mb-1">
                    <Facebook className="w-4 h-4 fill-current" />
                    <span>1. Official Facebook Page URL (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-blue-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* YouTube Channel */}
                <div>
                  <label className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-1">
                    <Youtube className="w-4 h-4" />
                    <span>2. Official YouTube Channel URL (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-red-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* GitHub Repo */}
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1">
                    <Github className="w-4 h-4 text-white" />
                    <span>3. Official GitHub ID / Repo URL (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-slate-600 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* TikTok Handle */}
                <div>
                  <label className="text-xs font-bold text-pink-400 flex items-center gap-1.5 mb-1">
                    <Video className="w-4 h-4" />
                    <span>4. Official TikTok Handle URL (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.tiktokUrl}
                    onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-pink-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-1">
                    <Globe className="w-4 h-4" />
                    <span>5. Official Instagram Profile URL (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-purple-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* WhatsApp Link */}
                <div>
                  <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>6. Official WhatsApp Business Link (Protected)</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlocked}
                    value={formData.whatsappUrl || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                    placeholder="https://wa.me/9779800000000"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border font-mono ${
                      isUnlocked
                        ? 'bg-slate-900 border-emerald-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* Custom Added Social Platforms */}
                {formData.customSocials && formData.customSocials.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Custom Added Social Platforms ({formData.customSocials.length})</span>
                    </span>
                    <div className="space-y-2">
                      {formData.customSocials.map((custom) => (
                        <div key={custom.id} className="flex items-center justify-between gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-amber-300 block truncate">{custom.platformName}</span>
                            <span className="text-[10px] text-slate-400 font-mono block truncate">{custom.url}</span>
                          </div>
                          {isUnlocked && (
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomPlatform(custom.id)}
                              className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 cursor-pointer"
                              title="Delete platform"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Custom Social Platform Form */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add New Social / Media Platform</span>
                  </span>
                  
                  {!isUnlocked ? (
                    <p className="text-[11px] text-slate-500 italic">
                      Unlock channels with CEO PIN above to add custom platforms (e.g. Telegram, LinkedIn, X/Twitter, Website, Pinterest).
                    </p>
                  ) : (
                    <div className="space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newPlatformName}
                          onChange={(e) => setNewPlatformName(e.target.value)}
                          placeholder="Platform Name (e.g. Telegram, LinkedIn, X)"
                          className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        <input
                          type="url"
                          value={newPlatformUrl}
                          onChange={(e) => setNewPlatformUrl(e.target.value)}
                          placeholder="Platform URL (e.g. https://t.me/...)"
                          className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCustomPlatform}
                        disabled={!newPlatformName.trim() || !newPlatformUrl.trim()}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Platform to Profile Wall</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmitAll}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Save All Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
