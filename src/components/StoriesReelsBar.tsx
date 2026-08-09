import React, { useState, useEffect } from 'react';
import { Plus, Play, Flame, Heart, Eye, Sparkles, Volume2, X, Check, Share2, MessageCircle, CheckCircle2, Video, Image as ImageIcon } from 'lucide-react';
import { ProfileData, ContentItem } from '../types';

export interface ReelStoryItem {
  id: string;
  type: 'story' | 'reel' | 'short';
  title: string;
  platform: 'TikTok' | 'Facebook' | 'YouTube' | 'Instagram';
  thumbnailUrl: string;
  videoUrl?: string;
  creatorName: string;
  creatorAvatar: string;
  views: string;
  likes: string;
  duration?: string;
  soundTrack?: string;
}

interface StoriesReelsBarProps {
  profile?: ProfileData;
  onAddPost?: (newPost: ContentItem) => void;
}

const INITIAL_STORIES_REELS: ReelStoryItem[] = [
  {
    id: 'sr-1',
    type: 'reel',
    title: 'BBS 1st Year Accounting Exam Hack in 60 Secs! 📚',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-student-working-on-a-laptop-42990-large.mp4',
    creatorName: 'Arjun Singh Ghatang',
    creatorAvatar: '/arjun_profile_pic.jpg',
    views: '142.5K',
    likes: '18.2K',
    soundTrack: 'Arjun Ghatang - TU BBS Exam Preparation Notes'
  },
  {
    id: 'sr-2',
    type: 'story',
    title: 'Waling Syangja Morning Cultural Festival VLOG 🇳🇵',
    platform: 'Facebook',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    creatorName: 'Arjun Singh Ghatang',
    creatorAvatar: '/arjun_profile_pic.jpg',
    views: '98.1K',
    likes: '12.4K',
    soundTrack: 'Original Sound - Syangja Folk Melodies'
  },
  {
    id: 'sr-3',
    type: 'reel',
    title: 'New Media Release: Syangja Youth Music & Arts 🎸',
    platform: 'TikTok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41228-large.mp4',
    creatorName: 'Nepal Official Media',
    creatorAvatar: '/arjun_profile_pic.jpg',
    views: '210.8K',
    likes: '29.5K',
    soundTrack: 'Nepal Official Media - Live Studio Mix'
  },
  {
    id: 'sr-4',
    type: 'short',
    title: 'Microeconomics Demand Curve Trick Explained 📊',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-42992-large.mp4',
    creatorName: 'TU BBS Academic Hub',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    views: '76.3K',
    likes: '8.9K',
    soundTrack: 'BBS Microeconomics Masterclass 2026'
  },
  {
    id: 'sr-5',
    type: 'reel',
    title: 'Top 5 Tourist Spots in Gandaki Province Nepal 🏔️',
    platform: 'Instagram',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    creatorName: 'Gandaki Travel & News',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    views: '340.2K',
    likes: '45.1K',
    soundTrack: 'Himalayan Breeze Ambient Music'
  }
];

export const StoriesReelsBar: React.FC<StoriesReelsBarProps> = ({ profile, onAddPost }) => {
  const [items, setItems] = useState<ReelStoryItem[]>(() => {
    const saved = localStorage.getItem('asg_stories_reels_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stories reels:', e);
      }
    }
    return INITIAL_STORIES_REELS;
  });

  const [activeItem, setActiveItem] = useState<ReelStoryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Create Reel state
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<'TikTok' | 'Facebook' | 'YouTube' | 'Instagram'>('TikTok');
  const [newType, setNewType] = useState<'reel' | 'story' | 'short'>('reel');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  // Local File Reader for Media
  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewMediaUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const media = newMediaUrl || 'https://assets.mixkit.co/videos/preview/mixkit-student-working-on-a-laptop-42990-large.mp4';
    const thumb = newMediaUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';

    const created: ReelStoryItem = {
      id: `sr-${Date.now()}`,
      type: newType,
      title: newTitle,
      platform: newPlatform,
      thumbnailUrl: thumb,
      videoUrl: media,
      creatorName: profile?.name || 'Arjun Singh Ghatang',
      creatorAvatar: profile?.profilePicUrl || '/arjun_profile_pic.jpg',
      views: '1',
      likes: '1',
      soundTrack: `${newPlatform} Original Sound by ${profile?.name || 'Arjun Ghatang'}`
    };

    const updatedList = [created, ...items];
    setItems(updatedList);
    localStorage.setItem('asg_stories_reels_items', JSON.stringify(updatedList));

    // Also sync to main feed as a ContentItem!
    if (onAddPost) {
      const postItem: ContentItem = {
        id: `post-sr-${Date.now()}`,
        title: newTitle,
        description: `New ${newType.toUpperCase()} published on ${newPlatform} by ${profile?.name || 'CEO Arjun Singh Ghatang'}.`,
        category: 'youtube',
        categoryLabel: `[CEO ${newType.toUpperCase()}] ${newPlatform}`,
        tags: [newType, 'video', 'reel', 'story', newPlatform],
        date: new Date().toISOString().split('T')[0],
        views: 1,
        thumbnailUrl: thumb,
        videoUrl: media,
        featured: true,
        platformSource: newPlatform.toLowerCase() as any
      };
      onAddPost(postItem);
    }

    setNewTitle('');
    setNewMediaUrl('');
    setIsCreating(false);
    setActiveItem(created);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-amber-500 text-white shadow-md">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Stories, Reels & Shorts</span>
              <span className="text-[10px] font-bold bg-gradient-to-r from-red-600 to-pink-600 text-white px-2 py-0.5 rounded-full uppercase font-mono">
                TikTok • FB • YouTube
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Trending short-form video updates & BBS quick guides</p>
          </div>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Story / Reel</span>
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-300">
        
        {/* Create Card */}
        <div 
          onClick={() => setIsCreating(true)}
          className="relative w-32 h-52 sm:w-36 sm:h-56 rounded-2xl bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 border-2 border-dashed border-indigo-400/50 flex flex-col items-center justify-center text-center p-3 cursor-pointer shrink-0 group hover:border-amber-400 transition shadow-md"
        >
          <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mb-2 shadow-lg group-hover:scale-110 transition">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-xs font-black text-white group-hover:text-amber-300 transition">Create Reel or Story</span>
          <span className="text-[10px] text-indigo-300 mt-1">Upload Short Video</span>
        </div>

        {/* Stories & Reels Items */}
        {items.map((item) => {
          const badgeBg = item.platform === 'TikTok' ? 'bg-slate-950 text-emerald-400'
            : item.platform === 'YouTube' ? 'bg-red-600 text-white'
            : item.platform === 'Facebook' ? 'bg-blue-600 text-white'
            : 'bg-pink-600 text-white';

          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="relative w-32 h-52 sm:w-36 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer shrink-0 group transition duration-300 hover:scale-[1.03] hover:shadow-2xl"
            >
              {/* Background Thumbnail */}
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Top Platform Badge */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-md font-mono ${badgeBg}`}>
                  {item.platform}
                </span>

                <div className="w-6 h-6 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-current ml-0.5 text-amber-400" />
                </div>
              </div>

              {/* Avatar & Creator Info */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="relative shrink-0">
                    <img
                      src={
                        (item.creatorName.toLowerCase().includes('arjun') || item.creatorName.toLowerCase().includes('ceo')) && profile?.profilePicUrl
                          ? profile.profilePicUrl
                          : item.creatorAvatar
                      }
                      alt={item.creatorName}
                      className="w-6 h-6 rounded-full ring-2 ring-amber-400 object-cover shadow shrink-0"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white rounded-full p-[1px] ring-1 ring-white" title="Verified Creator">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white fill-blue-600 stroke-[2.5]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-200 truncate flex items-center gap-0.5">
                    <span>{item.creatorName}</span>
                    <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-500 stroke-white shrink-0" />
                  </span>
                </div>

                <p className="text-[11px] font-extrabold text-white leading-tight line-clamp-2 drop-shadow">
                  {item.title}
                </p>

                <div className="flex items-center gap-2 text-[9px] text-amber-300 font-mono font-bold pt-0.5">
                  <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" />{item.views}</span>
                  <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />{item.likes}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Screen Player Modal for Shorts & Reels */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden w-full max-w-sm sm:max-w-md shadow-2xl flex flex-col h-[85vh]">
            
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-slate-700/80">
                <img
                  src={
                    (activeItem.creatorName.toLowerCase().includes('arjun') || activeItem.creatorName.toLowerCase().includes('ceo')) && profile?.profilePicUrl
                      ? profile.profilePicUrl
                      : activeItem.creatorAvatar
                  }
                  alt={activeItem.creatorName}
                  className="w-6 h-6 rounded-full ring-1 ring-amber-400 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{activeItem.creatorName}</h4>
                  <p className="text-[9px] text-amber-300 font-mono">{activeItem.platform} • {activeItem.type.toUpperCase()}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <video
                src={activeItem.videoUrl}
                autoPlay
                loop
                controls
                className="w-full h-full object-cover"
                poster={activeItem.thumbnailUrl}
              />
            </div>

            {/* Bottom Details Overlay */}
            <div className="p-4 bg-slate-950 text-white border-t border-slate-800 space-y-3">
              <h3 className="text-sm font-extrabold text-white">{activeItem.title}</h3>
              
              {activeItem.soundTrack && (
                <div className="flex items-center gap-2 text-xs text-indigo-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="truncate">{activeItem.soundTrack}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-4 text-slate-300">
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <Heart className="w-4 h-4 fill-rose-400" /> {activeItem.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-indigo-300 font-bold">
                    <Eye className="w-4 h-4" /> {activeItem.views} views
                  </span>
                </div>

                <button
                  onClick={() => alert(`Shared ${activeItem.title} link!`)}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Create Reel Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 text-white p-6 rounded-3xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-amber-300 uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Upload Story / Reel / Short</span>
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReel} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BBS Exam Preparation Short Note 2026..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Platform Style</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="TikTok">TikTok Reel</option>
                    <option value="Facebook">Facebook Story</option>
                    <option value="YouTube">YouTube Short</option>
                    <option value="Instagram">Instagram Reel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Content Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="reel">Reel Video</option>
                    <option value="story">24h Story</option>
                    <option value="short">YouTube Short</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Video / Image Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition cursor-pointer shadow-lg"
              >
                Publish Reel / Story
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
