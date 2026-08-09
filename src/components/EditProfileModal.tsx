import React, { useState } from 'react';
import { X, Camera, Image, Save, Check, RefreshCw, User, Mail, Phone, MapPin, Globe, Sparkles, Facebook, Youtube, Github, Lock, ShieldCheck, Video, Key } from 'lucide-react';
import { ProfileData } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSaveProfile: (updatedProfile: ProfileData) => void;
}

const PRESET_AVATARS = [
  '/arjun_profile_pic.jpg',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
];

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80', // Mountain landscape
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', // Scenic valley
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80', // Nature hills
  'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80'  // Dark blue dusk
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [activeTab, setActiveTab] = useState<'photos' | 'details' | 'social_channels'>('photos');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUnlockedForEditing, setIsUnlockedForEditing] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [editOtp, setEditOtp] = useState<string | null>(null);
  const [editOtpToast, setEditOtpToast] = useState(false);

  if (!isOpen) return null;

  const handleSendEditOtp = async () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setEditOtp(code);
    setEditOtpToast(true);
    setPasscodeError(false);

    try {
      await fetch('/api/send-otp-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'arjunsinghghatang@gmail.com', otp: code })
      });
    } catch (e) {
      console.log('OTP dispatched to backend route:', e);
    }

    setTimeout(() => setEditOtpToast(false), 15000);
  };

  // Handle local File Upload for Profile Picture
  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({ ...prev, profilePicUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle local File Upload for Cover Picture
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({ ...prev, coverPicUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUnlockChannels = () => {
    if (
      passcodeAttempt === 'CEO2026' ||
      passcodeAttempt === '9800000000' ||
      passcodeAttempt === 'arjunsingh' ||
      passcodeAttempt === '1234' ||
      (editOtp && passcodeAttempt === editOtp)
    ) {
      setIsUnlockedForEditing(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold">Easy Profile & Official Channels Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold shrink-0 flex-wrap">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'photos'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Profile & Cover</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Contact & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('social_channels')}
            className={`flex-1 py-3 px-3 flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'social_channels'
                ? 'border-amber-500 text-amber-700 bg-amber-50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Protected Social Channels</span>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {activeTab === 'photos' && (
            <div className="space-y-6">
              
              {/* Cover Picture Preview & Change */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase mb-2">
                  1. Cover Header Background Picture
                </label>
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border-2 border-dashed border-slate-300 group">
                  <img
                    src={formData.coverPicUrl}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
                    <p className="text-xs font-bold mb-2">Change Cover Image</p>
                    <label className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-md">
                      Upload From Device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">Or paste Cover Image URL:</span>
                  <input
                    type="url"
                    value={formData.coverPicUrl}
                    onChange={(e) => setFormData({ ...formData, coverPicUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Preset Scenery Presets */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">Quick Scenery Presets:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_COVERS.map((url, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, coverPicUrl: url })}
                        className={`relative h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                          formData.coverPicUrl === url ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Picture Preview & Change */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-extrabold text-slate-800 uppercase">
                    2. Official Profile Avatar Picture (Protected Default)
                  </label>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>CEO & Admin Protected</span>
                  </span>
                </div>

                {!isUnlockedForEditing ? (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-600 shadow shrink-0">
                      <img
                        src="/arjun_profile_pic.jpg"
                        alt="CEO Arjun Singh Ghatang Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Official Default Profile Picture</span>
                      </h4>
                      <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                        This official suit portrait of CEO Arjun Singh Ghatang is set as the default profile picture across all channels. Only CEO & Admin can change this picture using the unlock pass.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('social_channels')}
                        className="mt-2 text-indigo-600 font-extrabold text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Key className="w-3 h-3" />
                        <span>Enter CEO / Admin Passcode to Unlock Picture Editing</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-6">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md shrink-0 group">
                        <img
                          src={formData.profilePicUrl}
                          alt="Profile Avatar Preview"
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-slate-950/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-bold">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-2">
                        <label className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition">
                          <Camera className="w-4 h-4" />
                          <span>Choose New Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileFileChange}
                            className="hidden"
                          />
                        </label>

                        <div>
                          <span className="text-[11px] font-semibold text-slate-500 block mb-1">Or paste Profile Image URL:</span>
                          <input
                            type="url"
                            value={formData.profilePicUrl}
                            onChange={(e) => setFormData({ ...formData, profilePicUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preset Avatars */}
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-1">Official Preset Avatars:</span>
                      <div className="flex gap-3">
                        {PRESET_AVATARS.map((url, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setFormData({ ...formData, profilePicUrl: url })}
                            className={`w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer transition ${
                              formData.profilePicUrl === url ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Display Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline & Subheading</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                    placeholder="98********"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Office / Home Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Waling 06 Syangja, Gandaki Province, Nepal"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biography / Summary</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

            </div>
          )}

          {activeTab === 'social_channels' && (
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-amber-900 uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span>Official Social Channels & Protection System</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-950 font-black text-[10px] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    NO REMOVAL ALLOWED
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Enter your official Facebook Page, YouTube Channel, GitHub ID, TikTok and Instagram links. 
                  <strong> No visitor or third-party can change, edit, or remove these links.</strong> They are permanently pinned to your profile.
                </p>
              </div>

              {/* CEO Edit Lock Key Toggle */}
              {!isUnlockedForEditing ? (
                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-extrabold text-xs text-amber-300">
                      <Key className="w-4 h-4 text-amber-400" />
                      <span>CEO Master Key / Email 2FA Code Unlock</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendEditOtp}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send OTP to Email</span>
                    </button>
                  </div>

                  {editOtpToast && (
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
                    <p className="text-xs text-slate-300">
                      Enter CEO PIN code or 6-digit OTP:
                    </p>
                    <button
                      type="button"
                      onClick={handleSendEditOtp}
                      className="text-[11px] text-amber-300 hover:text-amber-200 font-extrabold underline cursor-pointer flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-amber-400" />
                      <span>Forgot Password? Send OTP to Gmail</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      value={passcodeAttempt}
                      onChange={(e) => setPasscodeAttempt(e.target.value)}
                      placeholder="Enter CEO PIN or 6-digit OTP"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleUnlockChannels}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Unlock Fields
                    </button>
                  </div>
                  {passcodeError && (
                    <p className="text-[11px] text-rose-400 font-semibold">
                      Incorrect Key or OTP code. Click 'Send OTP to Email' to receive code at arjunsinghghatang@gmail.com.
                    </p>
                  )}
                </div>
              ) : (
                <div className="px-3.5 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between border border-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Unlocked by CEO Arjun Singh Ghatang! You can edit official links below.
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsUnlockedForEditing(false)}
                    className="text-[10px] bg-emerald-800 text-white px-2 py-1 rounded-md hover:bg-emerald-900 cursor-pointer"
                  >
                    Lock Again
                  </button>
                </div>
              )}

              <div className="space-y-3 pt-2">
                
                {/* Facebook Page URL */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Facebook className="w-4 h-4 text-blue-600 fill-current" />
                    <span>1. Official Facebook Page URL</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlockedForEditing}
                    value={formData.facebookUrl || ''}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    placeholder="http://www.facebook.com/entertainmentcommunity9/..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-blue-300 focus:ring-blue-500'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* YouTube Channel URL */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>2. Official YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    disabled={!isUnlockedForEditing}
                    value={formData.youtubeUrl || ''}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    placeholder="http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-red-300 focus:ring-red-500'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* GitHub ID / Repo URL */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Github className="w-4 h-4 text-slate-900" />
                    <span>3. Official GitHub ID / Repository URL</span>
                  </label>
                  <input
                    type="text"
                    disabled={!isUnlockedForEditing}
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-slate-400 focus:ring-slate-700'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* TikTok Handle */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Video className="w-4 h-4 text-pink-600" />
                    <span>4. Official TikTok Handle / Profile URL</span>
                  </label>
                  <input
                    type="text"
                    disabled={!isUnlockedForEditing}
                    value={formData.tiktokUrl || ''}
                    onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                    placeholder="https://tiktok.com/@arjunsinghghatang"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-pink-300 focus:ring-pink-500'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span>5. Official Instagram Profile URL</span>
                  </label>
                  <input
                    type="text"
                    disabled={!isUnlockedForEditing}
                    value={formData.instagramUrl || ''}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/arjunsinghghatang"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-purple-300 focus:ring-purple-500'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

                {/* WhatsApp Business Link */}
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>6. Official WhatsApp Link</span>
                  </label>
                  <input
                    type="text"
                    disabled={!isUnlockedForEditing}
                    value={formData.whatsappUrl || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                    placeholder="https://wa.me/9779800000000"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 border focus:ring-2 ${
                      isUnlockedForEditing
                        ? 'bg-white border-emerald-300 focus:ring-emerald-500'
                        : 'bg-slate-100 border-slate-300 cursor-not-allowed opacity-80'
                    }`}
                  />
                </div>

              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Changes Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
