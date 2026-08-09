import React, { useState } from 'react';
import { X, Facebook, UserPlus, Users, Check, Share2, Sparkles, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { ProfileData, Follower } from '../types';

interface FacebookFriendInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onAddFollower: (follower: Follower) => void;
}

const INITIAL_FB_FRIENDS = [
  { id: 'fb-1', name: 'Ramesh Adhikari', location: 'Pokhara, Gandaki', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false },
  { id: 'fb-2', name: 'Sujata Sharma', location: 'Kathmandu, Nepal', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false },
  { id: 'fb-3', name: 'Bibek Thapa', location: 'Waling, Syangja', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false },
  { id: 'fb-4', name: 'Pranisha Gurung', location: 'Butwal, Lumbini', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false },
  { id: 'fb-5', name: 'Sunil Karki', location: 'Bhakunde, Syangja', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false },
  { id: 'fb-6', name: 'Aashika Neupane', location: 'Chitwan, Nepal', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', isInvited: false, isConnected: false }
];

export const FacebookFriendInviteModal: React.FC<FacebookFriendInviteModalProps> = ({
  isOpen,
  onClose,
  profile,
  onAddFollower
}) => {
  const [isFbLoggedIn, setIsFbLoggedIn] = useState(true);
  const [fbFriends, setFbFriends] = useState(INITIAL_FB_FRIENDS);
  const [autoFriendAfterLogin, setAutoFriendAfterLogin] = useState(true);
  const [allInvitedSuccess, setAllInvitedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleInviteSingle = (friendId: string) => {
    setFbFriends(prev => prev.map(f => {
      if (f.id === friendId) {
        // Automatically create a new follower on the portal as well
        if (!f.isConnected) {
          onAddFollower({
            id: `follower-${Date.now()}-${f.id}`,
            name: f.name,
            avatarUrl: f.avatar,
            joinedDate: 'Just now',
            location: f.location,
            isFollowedBack: true
          });
        }
        return { ...f, isInvited: true, isConnected: true };
      }
      return f;
    }));
  };

  const handleAutoInviteAll = () => {
    fbFriends.forEach(f => {
      if (!f.isConnected) {
        onAddFollower({
          id: `follower-${Date.now()}-${f.id}`,
          name: f.name,
          avatarUrl: f.avatar,
          joinedDate: 'Just now',
          location: f.location,
          isFollowedBack: true
        });
      }
    });

    setFbFriends(prev => prev.map(f => ({ ...f, isInvited: true, isConnected: true })));
    setAllInvitedSuccess(true);
    setTimeout(() => setAllInvitedSuccess(false), 4000);
  };

  const sharePortalUrl = `https://arjunsinghghatang.com.np?ref_fb=${profile.name.toLowerCase().replace(/\s+/g, '_')}`;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(sharePortalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-blue-500/40 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-5 px-6 flex items-center justify-between border-b border-blue-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-lg">
              <Facebook className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-blue-300 uppercase">
                  Facebook Friend Auto Sync & Invite
                </h2>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  FB Logged In
                </span>
              </div>
              <p className="text-slate-400 text-xs">Auto-invite Facebook friends & make friends on portal after logging in</p>
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

          {/* Facebook Login Status Banner */}
          <div className="bg-blue-950/60 p-4 rounded-2xl border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <img
                src={profile.profilePicUrl}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400 shrink-0"
              />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                  Connected Account
                </span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">{profile.name} (Facebook User)</h4>
                <p className="text-xs text-slate-300">Facebook ID Connected: fb.me/arjunsingh.ghatang</p>
              </div>
            </div>

            <button
              onClick={() => setIsFbLoggedIn(!isFbLoggedIn)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow transition shrink-0 cursor-pointer"
            >
              {isFbLoggedIn ? 'Re-Sync FB Profile' : 'Connect Facebook'}
            </button>
          </div>

          {/* Auto-Friend Toggle Setting */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-black text-amber-300 uppercase block">
                  Auto-Make Friends After Facebook Login
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  Automatically connect imported Facebook contacts as official website supporters & followers when they visit
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoFriendAfterLogin}
                onChange={(e) => setAutoFriendAfterLogin(e.target.checked)}
                className="w-5 h-5 accent-blue-500 rounded cursor-pointer shrink-0"
              />
            </label>
          </div>

          {/* Batch Invite Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-4 rounded-2xl border border-blue-500/30">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Facebook Friends Contacts List ({fbFriends.length})</span>
              </h3>
              <p className="text-xs text-slate-300">Send platform invitations directly to Messenger & timeline</p>
            </div>

            <button
              onClick={handleAutoInviteAll}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Auto Invite All FB Friends</span>
            </button>
          </div>

          {allInvitedSuccess && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-center text-xs font-bold text-emerald-300 animate-fade-in">
              ✓ All {fbFriends.length} Facebook friends successfully invited & auto-connected as website supporters!
            </div>
          )}

          {/* Friends List Grid */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {fbFriends.map((f) => (
              <div key={f.id} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-600" />
                  <div>
                    <h4 className="font-extrabold text-white">{f.name}</h4>
                    <span className="text-[10px] text-slate-400">{f.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleInviteSingle(f.id)}
                  disabled={f.isInvited}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    f.isInvited
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow'
                  }`}
                >
                  {f.isInvited ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Invite & Friend</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Messenger Share Link */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-slate-300">Facebook Messenger Invitation Direct Link</span>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={sharePortalUrl}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-blue-300"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer transition border border-slate-700 shrink-0"
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Official Facebook Social Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
