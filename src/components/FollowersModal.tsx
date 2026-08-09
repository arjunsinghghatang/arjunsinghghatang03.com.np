import React, { useState } from 'react';
import { X, UserCheck, UserPlus, Search, Users, MapPin, Sparkles, Check, Heart } from 'lucide-react';
import { Follower } from '../types';

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers: Follower[];
  totalFollowersCount: number;
  onToggleFollowBack: (followerId: string) => void;
  onAddFollower: (newFollower: Follower) => void;
}

export const FollowersModal: React.FC<FollowersModalProps> = ({
  isOpen,
  onClose,
  followers,
  totalFollowersCount,
  onToggleFollowBack,
  onAddFollower
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New follower form
  const [newFollowerName, setNewFollowerName] = useState('');
  const [newFollowerRole, setNewFollowerRole] = useState('BBS Student');
  const [newFollowerLocation, setNewFollowerLocation] = useState('Waling, Syangja');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredFollowers = followers.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFollower = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowerName.trim()) return;

    const created: Follower = {
      id: `fol-${Date.now()}`,
      name: newFollowerName,
      role: newFollowerRole,
      location: newFollowerLocation,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=200&q=80`,
      isFollowedBack: false,
      joinedDate: 'Just now'
    };

    onAddFollower(created);
    setAddedSuccess(true);
    setTimeout(() => {
      setNewFollowerName('');
      setAddedSuccess(false);
      setShowAddForm(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <span>Who Follows Me</span>
                <span className="bg-indigo-500/30 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {totalFollowersCount.toLocaleString()} Followers
                </span>
              </h2>
              <p className="text-slate-400 text-xs">ARJUN SINGH GHATANG’s official supporter list</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search followers by name or location (e.g., Waling, Pokhara...)"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{showAddForm ? 'Hide Form' : 'Join as Follower'}</span>
          </button>
        </div>

        {/* Add Myself Form Toggle */}
        {showAddForm && (
          <div className="p-4 bg-indigo-50/70 border-b border-indigo-100 shrink-0">
            <h3 className="text-xs font-bold text-indigo-950 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add Your Name to Arjun’s Followers List</span>
            </h3>

            {addedSuccess ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You are now following Arjun Singh Ghatang!</span>
              </div>
            ) : (
              <form onSubmit={handleCreateFollower} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={newFollowerName}
                  onChange={(e) => setNewFollowerName(e.target.value)}
                  placeholder="Your Full Name"
                  className="px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs text-slate-900"
                />
                <input
                  type="text"
                  value={newFollowerRole}
                  onChange={(e) => setNewFollowerRole(e.target.value)}
                  placeholder="Role (e.g., BBS Student / Fan)"
                  className="px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs text-slate-900"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFollowerLocation}
                    onChange={(e) => setNewFollowerLocation(e.target.value)}
                    placeholder="Location (e.g. Waling Syangja)"
                    className="flex-1 px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs text-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold hover:bg-indigo-800"
                  >
                    Follow
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Followers List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredFollowers.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No followers found matching "{searchQuery}".
            </div>
          ) : (
            filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 transition shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={follower.avatarUrl}
                    alt={follower.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span>{follower.name}</span>
                      <Heart className="w-3 h-3 text-rose-500 fill-current" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{follower.role}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {follower.location}
                      </span>
                      <span>•</span>
                      <span>{follower.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleFollowBack(follower.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    follower.isFollowedBack
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {follower.isFollowedBack ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Following Back</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow Back</span>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <span>Showing {filteredFollowers.length} supporters</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
