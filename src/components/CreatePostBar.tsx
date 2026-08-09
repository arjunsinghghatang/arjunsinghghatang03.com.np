import React, { useState } from 'react';
import { Image, Video, FileText, Send, Sparkles, PlusCircle, Check, X, Camera, Globe, Crown, ShieldCheck, CheckCircle2, Film, Flame } from 'lucide-react';
import { ContentItem, CategoryType, ProfileData } from '../types';

interface CreatePostBarProps {
  profile: ProfileData;
  onAddPost: (newPost: ContentItem) => void;
  onAddStoryReel?: (storyReel: any) => void;
}

const CATEGORY_OPTIONS: { id: CategoryType; label: string }[] = [
  { id: 'news', label: 'News' },
  { id: 'sports', label: 'Sports' },
  { id: 'politic', label: 'Politic' },
  { id: 'economy', label: 'Economy' },
  { id: 'game', label: 'Game' },
  { id: 'movie', label: 'Movie' },
  { id: 'bbs', label: 'BBS Notes' },
  { id: 'youtube', label: 'YouTube Vlog' },
];

export const CreatePostBar: React.FC<CreatePostBarProps> = ({ profile, onAddPost, onAddStoryReel }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [postType, setPostType] = useState<'status' | 'photo' | 'video' | 'reel' | 'story'>('status');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('news');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('OfficialUpdate, SyangjaMedia');
  const [authorRole, setAuthorRole] = useState<'ceo' | 'follower'>('ceo');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // File upload reader for photo
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // File upload reader for video
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setVideoUrl(reader.result);
          if (!imageUrl) {
            // Set default thumbnail if none set
            setImageUrl('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categoryObj = CATEGORY_OPTIONS.find(c => c.id === category);
    const label = categoryObj ? categoryObj.label : 'General';

    const rawTags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    // Auto append post type tags so filtering in feed tabs catches it instantly
    const tags = [...rawTags];
    if (postType === 'photo' && !tags.some(t => t.toLowerCase().includes('photo'))) tags.push('photo');
    if (postType === 'video' && !tags.some(t => t.toLowerCase().includes('video'))) tags.push('video');
    if (postType === 'reel' && !tags.some(t => t.toLowerCase().includes('reel'))) tags.push('reel', 'video');
    if (postType === 'story' && !tags.some(t => t.toLowerCase().includes('story'))) tags.push('story');

    const defaultImg = imageUrl || (videoUrl 
      ? 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
    );

    const postCat: CategoryType = (postType === 'video' || postType === 'reel') ? 'youtube' : category;

    const newPostItem: ContentItem = {
      id: `post-${Date.now()}`,
      title,
      description: description || `New ${postType.toUpperCase()} update published on Arjun Singh Ghatang official portal.`,
      category: postCat,
      categoryLabel: authorRole === 'ceo' ? `[CEO ${postType.toUpperCase()}] ${label}` : label,
      tags: tags.length > 0 ? tags : ['PortalUpdate', label, postType],
      date: new Date().toISOString().split('T')[0],
      views: 1,
      thumbnailUrl: defaultImg,
      videoUrl: videoUrl || undefined,
      featured: authorRole === 'ceo',
      platformSource: videoUrl?.includes('tiktok') ? 'tiktok' : videoUrl?.includes('facebook') ? 'facebook' : videoUrl ? 'youtube' : 'facebook'
    };

    onAddPost(newPostItem);

    // If story or reel, sync with stories reels bar if handler provided
    if ((postType === 'reel' || postType === 'story') && onAddStoryReel) {
      onAddStoryReel({
        id: `sr-${Date.now()}`,
        type: postType === 'story' ? 'story' : 'reel',
        title: title,
        platform: videoUrl?.includes('tiktok') ? 'TikTok' : videoUrl?.includes('youtube') ? 'YouTube' : 'Facebook',
        thumbnailUrl: defaultImg,
        videoUrl: videoUrl || defaultImg,
        creatorName: authorRole === 'ceo' ? (profile.name || 'Arjun Singh Ghatang') : 'Supporter / Guest User',
        creatorAvatar: authorRole === 'ceo' ? profile.profilePicUrl : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        views: '1',
        likes: '1',
        soundTrack: `Original Sound by ${authorRole === 'ceo' ? profile.name : 'Supporter'}`
      });
    }

    setPublishedSuccess(true);

    setTimeout(() => {
      setPublishedSuccess(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setVideoUrl('');
      setIsOpenModal(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 transition-all hover:shadow-md">
      
      {/* Facebook style top bar trigger */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={profile.profilePicUrl}
            alt={profile.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
          />
          <div className="absolute -bottom-0.5 -right-0.5 bg-blue-600 text-white rounded-full p-0.5 ring-2 ring-white shadow-xs" title="Verified CEO Account">
            <CheckCircle2 className="w-3.5 h-3.5 text-white fill-blue-600 stroke-[2.5]" />
          </div>
        </div>

        <button
          onClick={() => {
            setPostType('status');
            setIsOpenModal(true);
          }}
          className="flex-1 bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium px-4 py-3 rounded-full text-left transition cursor-pointer border border-slate-200/60"
        >
          What's on your mind, CEO Arjun / Supporter? Post photo, video, reel, story or status...
        </button>
      </div>

      {/* Action buttons row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-around text-xs font-bold text-slate-600 flex-wrap gap-1">
        <button
          onClick={() => {
            setPostType('photo');
            setIsOpenModal(true);
          }}
          className="flex items-center gap-1.5 hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition text-emerald-600 cursor-pointer"
        >
          <Image className="w-4 h-4 text-emerald-500" />
          <span>Photo / Picture</span>
        </button>

        <button
          onClick={() => {
            setPostType('video');
            setIsOpenModal(true);
          }}
          className="flex items-center gap-1.5 hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition text-rose-600 cursor-pointer"
        >
          <Video className="w-4 h-4 text-rose-500" />
          <span>Video / Vlog</span>
        </button>

        <button
          onClick={() => {
            setPostType('reel');
            setIsOpenModal(true);
          }}
          className="flex items-center gap-1.5 hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition text-purple-600 cursor-pointer"
        >
          <Film className="w-4 h-4 text-purple-500" />
          <span>Reel / Short</span>
        </button>

        <button
          onClick={() => {
            setPostType('story');
            setIsOpenModal(true);
          }}
          className="flex items-center gap-1.5 hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition text-pink-600 cursor-pointer"
        >
          <Flame className="w-4 h-4 text-pink-500" />
          <span>Story</span>
        </button>

        <button
          onClick={() => {
            setPostType('status');
            setIsOpenModal(true);
          }}
          className="flex items-center gap-1.5 hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition text-amber-600 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span>Status</span>
        </button>
      </div>

      {/* Upload Post Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div 
            className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base">Publish Content Immediately to Feed</h3>
              </div>
              <button
                onClick={() => setIsOpenModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitPost} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
              
              {/* Post Type Selector Tabs */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Select Content Format</label>
                <div className="grid grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPostType('status')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      postType === 'status' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Status
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('photo')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      postType === 'photo' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('video')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      postType === 'video' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('reel')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      postType === 'reel' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Reel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('story')}
                    className={`py-2 px-1 rounded-xl text-center font-bold text-[11px] transition cursor-pointer ${
                      postType === 'story' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Story
                  </button>
                </div>
              </div>

              {/* Author Selection Toggle */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900">Post As:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthorRole('ceo')}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      authorRole === 'ceo'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>CEO Arjun Singh Ghatang</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthorRole('follower')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      authorRole === 'follower'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span>Follower / Supporter</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Post Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Breaking Update on Syangja Sports / New Reel VLOG..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Select Channel Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`py-2 px-2 rounded-xl text-center font-bold border transition cursor-pointer ${
                        category === cat.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload / Image URL */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Upload Photo / Image File</label>
                <div className="flex gap-2 items-center">
                  <label className="px-3.5 py-2 bg-slate-800 text-white rounded-xl cursor-pointer hover:bg-slate-900 font-bold shrink-0">
                    Choose Photo
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste image URL (https://...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                  />
                </div>
                {imageUrl && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden bg-slate-900">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Video File / Video URL */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Upload Video File / Reel / Vlog URL</label>
                <div className="flex gap-2 items-center mb-2">
                  <label className="px-3.5 py-2 bg-rose-700 text-white rounded-xl cursor-pointer hover:bg-rose-800 font-bold shrink-0 flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>Choose Video File</span>
                    <input type="file" accept="video/*" onChange={handleVideoFileChange} className="hidden" />
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Or paste video link (YouTube, TikTok, MP4 URL...)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                  />
                </div>
                {videoUrl && (
                  <div className="mt-2 p-2 bg-slate-900 rounded-xl text-amber-300 font-mono text-[11px] truncate flex items-center gap-2">
                    <Video className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Video attached: {videoUrl.substring(0, 60)}...</span>
                  </div>
                )}
              </div>

              {/* Description Body */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Post Description & Details</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your thoughts, status, news details or study notes description..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-900 font-extrabold mb-1">Hashtags (Comma Separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Syangja, News, BBS1stYear, Sports, Reel"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition"
                >
                  {publishedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Post Published to Feed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish & Run on Feed</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
