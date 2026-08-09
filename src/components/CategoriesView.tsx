import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, ExternalLink, Eye, Calendar, Sparkles, GraduationCap, Video, BookOpen, ArrowRight, 
  Heart, MessageSquare, Share2, Repeat, UserPlus, UserCheck, Bell, BellRing, Send, Check, Copy, 
  Crown, ShieldCheck, Tag, Image as ImageIcon, FileText, Bookmark, Film, Grid, Volume2, VolumeX, 
  Play, Pause, Radio, Music, Zap, Flame, Github, Youtube, Facebook, Code, RefreshCw, CheckCircle2,
  Globe, Link as LinkIcon
} from 'lucide-react';
import { ContentItem, ProfileData } from '../types';

interface CategoriesViewProps {
  items: ContentItem[];
  selectedCategory?: string;
  profile?: ProfileData;
  onSelectItem: (item: ContentItem) => void;
  onNavigateSection: (sectionId: string) => void;
  lastFeedSyncTime?: string;
  isLiveFeedPaused?: boolean;
  onTogglePauseFeed?: () => void;
}

interface PostComment {
  id: string;
  author: string;
  text: string;
  time: string;
  avatarUrl: string;
}

// Auto-Play Scroll Feed Card Component
interface AutoPlayFeedCardProps {
  item: ContentItem;
  profile?: ProfileData;
  onSelectItem: (item: ContentItem) => void;
  isLiked: boolean;
  likesNum: number;
  isReposted: boolean;
  repostsNum: number;
  comments: PostComment[];
  isCommentsOpen: boolean;
  isFollowing: boolean;
  isSubscribed: boolean;
  isSaved: boolean;
  autoPlayEnabled: boolean;
  autoPlayAudioEnabled: boolean;
  onToggleSave: (id: string) => void;
  onToggleLike: (id: string) => void;
  onToggleRepost: (id: string) => void;
  onToggleFollow: (id: string) => void;
  onToggleSubscribe: (id: string) => void;
  onShare: (item: ContentItem) => void;
  onToggleComments: (id: string) => void;
  copiedPostId: string | null;
  onAddComment: (id: string, text: string) => void;
}

const AutoPlayFeedCard: React.FC<AutoPlayFeedCardProps> = ({
  item,
  profile,
  onSelectItem,
  isLiked,
  likesNum,
  isReposted,
  repostsNum,
  comments,
  isCommentsOpen,
  isFollowing,
  isSubscribed,
  isSaved,
  autoPlayEnabled,
  autoPlayAudioEnabled,
  onToggleSave,
  onToggleLike,
  onToggleRepost,
  onToggleFollow,
  onToggleSubscribe,
  onShare,
  onToggleComments,
  copiedPostId,
  onAddComment,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPointed, setIsPointed] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isPlayingAudioTrack, setIsPlayingAudioTrack] = useState(false);
  const [commentInputText, setCommentInputText] = useState('');
  const [isSpeakingText, setIsSpeakingText] = useState(false);

  const isBBS = item.category === 'bbs';
  const isYouTube = item.category === 'youtube';
  const isVideoItem = !!item.videoUrl || item.category === 'news' || item.category === 'sports' || item.category === 'game' || item.category === 'movie' || item.category === 'youtube';
  const isSongItem = item.category === 'audio' || item.category === 'music' || item.tags.some(t => t.toLowerCase().includes('song') || t.toLowerCase().includes('music') || t.toLowerCase().includes('audio'));
  const isPhotoGifItem = !isVideoItem && !isSongItem && (item.tags.some(t => t.toLowerCase().includes('gif') || t.toLowerCase().includes('photo') || t.toLowerCase().includes('pic')) || item.category === 'bbs');

  // Sample audio tracks for song items
  const sampleAudioTrack = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3';

  // IntersectionObserver to detect when this card is in the active viewport center (pointed area)
  useEffect(() => {
    if (!cardRef.current || !autoPlayEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPointed(true);

            // 1. Auto Play Video if video card
            if (videoRef.current) {
              videoRef.current.play().catch(err => {
                console.log('Video autoplay prevented by browser policy:', err);
              });
            }

            // 2. Auto Play Audio if song/music card
            if (audioRef.current && autoPlayAudioEnabled) {
              audioRef.current.play().then(() => {
                setIsPlayingAudioTrack(true);
              }).catch(err => {
                console.log('Audio autoplay prevented:', err);
              });
            }

          } else {
            setIsPointed(false);

            // Pause video & audio when scrolled away
            if (videoRef.current) {
              videoRef.current.pause();
            }
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlayingAudioTrack(false);
            }
            if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
              setIsSpeakingText(false);
            }
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: '-15% 0px -15% 0px'
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [autoPlayEnabled, autoPlayAudioEnabled]);

  // Voice read aloud for status / text updates
  const handleReadTextAloud = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingText) {
      window.speechSynthesis.cancel();
      setIsSpeakingText(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${item.title}. ${item.description}`);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeakingText(false);
    utterance.onerror = () => setIsSpeakingText(false);

    setIsSpeakingText(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl border transition-all duration-500 flex flex-col overflow-hidden relative ${
        isPointed
          ? 'border-indigo-500 shadow-2xl ring-4 ring-indigo-500/20 scale-[1.01]'
          : 'border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-xl'
      }`}
    >
      {/* Scroll Pointed Indicator Banner */}
      {isPointed && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 text-white px-3 py-1 flex items-center justify-between text-[11px] font-black tracking-wide animate-fade-in shadow-md">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span>SCROLL POINTED • AUTOPLAY ACTIVE</span>
          </div>
          <span className="text-[10px] bg-slate-950/40 px-2 py-0.5 rounded-full font-mono">
            {isVideoItem ? 'VIDEO PLAYING' : isSongItem ? 'SONG PLAYING' : isPhotoGifItem ? 'GIF ANIMATED' : 'TEXT FOCUSED'}
          </span>
        </div>
      )}

      {/* Creator Info & Action Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <img
              src={
                item.category === 'news'
                  ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=100&q=80'
                  : (profile?.profilePicUrl || '/arjun_profile_pic.jpg')
              }
              alt="Creator Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400 shrink-0"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 ring-2 ring-white shadow-xs" title="Verified Creator">
              <CheckCircle2 className="w-3.5 h-3.5 text-white fill-blue-600 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-black text-slate-900">
              <span>{item.category === 'news' ? 'Nepal Viral News Network' : (profile?.name || 'Arjun Singh Ghatang')}</span>
              <span className="inline-flex items-center" title="Verified Official Account">
                <CheckCircle2 className="w-4 h-4 text-white fill-blue-600 stroke-[2.5]" />
              </span>
              <Crown className="w-3 h-3 text-amber-500 fill-amber-400 ml-0.5" />
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">
              {item.category === 'news' ? 'OFFICIAL MEDIA EDITOR' : 'CEO & Founder Portal'} • {item.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleFollow(item.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition flex items-center gap-1 cursor-pointer ${
              isFollowing
                ? 'bg-slate-200 text-slate-700'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-3 h-3 text-emerald-600" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                <span>Follow</span>
              </>
            )}
          </button>

          <button
            onClick={() => onToggleSubscribe(item.id)}
            className={`p-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
              isSubscribed
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
            }`}
            title="Subscribe"
          >
            {isSubscribed ? <BellRing className="w-3.5 h-3.5 text-amber-600" /> : <Bell className="w-3.5 h-3.5 text-red-600" />}
          </button>
        </div>
      </div>

      {/* Media Player Container */}
      {isVideoItem ? (
        <div className="relative bg-black overflow-hidden group">
          <video
            ref={videoRef}
            src={
              item.videoUrl ||
              'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4'
            }
            loop
            muted={isVideoMuted}
            playsInline
            controls
            poster={item.thumbnailUrl}
            className="w-full h-56 object-cover"
          />

          {/* Video Autoplay Badge & Sound Controller */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="bg-red-600/90 text-white px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 backdrop-blur-md shadow-md animate-pulse">
              <Video className="w-3 h-3" />
              <span>{isPointed ? 'SCROLL AUTO-PLAYING' : 'VIDEO READY'}</span>
            </span>

            <button
              onClick={() => setIsVideoMuted(!isVideoMuted)}
              className="p-1.5 rounded-full bg-slate-950/80 text-amber-300 hover:text-white backdrop-blur-md border border-slate-700 shadow cursor-pointer"
              title={isVideoMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(item.id);
            }}
            className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer z-10 ${
              isSaved
                ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-200 hover:text-white'
            }`}
            title="Save post"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      ) : isSongItem ? (
        <div className="relative h-48 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-4 flex flex-col justify-between overflow-hidden">
          {/* Animated Music Waveform Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-around px-8">
            {[40, 80, 50, 100, 60, 90, 30, 70, 80, 40].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-2 bg-indigo-400 rounded-full ${
                  isPointed ? 'animate-pulse' : ''
                }`}
              />
            ))}
          </div>

          {/* Song Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-md bg-purple-600 text-white">
              <Music className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>MUSIC & SONG TRACK</span>
            </span>

            <button
              onClick={() => onToggleSave(item.id)}
              className={`p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer ${
                isSaved ? 'bg-purple-600 text-white' : 'bg-slate-900/80 text-slate-300'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Song Player Controller */}
          <div className="relative z-10 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-indigo-500/40">
            <button
              onClick={() => {
                if (audioRef.current) {
                  if (isPlayingAudioTrack) {
                    audioRef.current.pause();
                    setIsPlayingAudioTrack(false);
                  } else {
                    audioRef.current.play();
                    setIsPlayingAudioTrack(true);
                  }
                }
              }}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-slate-950 flex items-center justify-center font-black shadow-lg cursor-pointer shrink-0 hover:scale-105 transition"
            >
              {isPlayingAudioTrack ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 fill-current ml-0.5 text-slate-950" />}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <p className="text-[10px] text-indigo-300 truncate">
                {isPlayingAudioTrack ? '🎵 Auto-playing song soundtrack...' : 'Tap to play music track'}
              </p>
            </div>

            <audio ref={audioRef} src={sampleAudioTrack} loop />
          </div>
        </div>
      ) : (
        <div 
          className={`relative h-48 bg-slate-900 overflow-hidden cursor-pointer ${
            isPointed ? 'ring-2 ring-amber-400' : ''
          }`} 
          onClick={() => onSelectItem(item)}
        >
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className={`w-full h-full object-cover transition duration-700 ${
              isPointed ? 'scale-110 opacity-100' : 'opacity-85 hover:scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md text-white ${
              isBBS ? 'bg-emerald-600' : isYouTube ? 'bg-red-600' : 'bg-indigo-600'
            }`}>
              {isBBS ? <GraduationCap className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span>{item.categoryLabel}</span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(item.id);
            }}
            className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer z-10 ${
              isSaved
                ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                : 'bg-slate-950/70 hover:bg-slate-900 text-slate-200 hover:text-white'
            }`}
            title="Save post"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 font-medium">
            <span className="flex items-center gap-1 bg-slate-950/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{item.date}</span>
            </span>

            {item.views !== undefined && (
              <span className="flex items-center gap-1 bg-slate-950/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                <Eye className="w-3 h-3 text-indigo-400" />
                <span>{item.views.toLocaleString()} views</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 
              onClick={() => onSelectItem(item)}
              className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {item.title}
            </h3>

            {/* Read Aloud Button for Text/Status */}
            <button
              onClick={handleReadTextAloud}
              className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${
                isSpeakingText
                  ? 'bg-amber-400 text-slate-950 border-amber-500 animate-pulse'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300'
              }`}
              title="Voice Read Aloud Text"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">{isSpeakingText ? 'Reading...' : 'Read Aloud'}</span>
            </button>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3">
            {item.description}
          </p>

          {/* GitHub Code Snippet Preview */}
          {item.codeSnippet && (
            <div className="mb-3 bg-slate-950 text-emerald-400 p-3 rounded-xl border border-slate-800 font-mono text-[11px] relative overflow-hidden group/code shadow-inner">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-slate-400 text-[10px]">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>GitHub Code Preview</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.clipboard) navigator.clipboard.writeText(item.codeSnippet || '');
                  }}
                  className="text-[10px] text-indigo-300 hover:text-white transition flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-0.5 rounded"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </button>
              </div>
              <pre className="overflow-x-auto max-h-28 whitespace-pre-wrap leading-snug font-mono text-[10px] text-emerald-300">
                {item.codeSnippet}
              </pre>
            </div>
          )}

          {/* Linked Social Platform Origin & Direct Redirect Button */}
          {item.platformSource && (
            <div className="mb-3 p-2.5 rounded-xl border flex items-center justify-between gap-2 shadow-xs bg-slate-900 text-white border-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                {item.platformSource === 'facebook' && <Facebook className="w-4 h-4 text-blue-400 shrink-0" />}
                {item.platformSource === 'youtube' && <Youtube className="w-4 h-4 text-red-500 shrink-0" />}
                {item.platformSource === 'github' && <Github className="w-4 h-4 text-purple-400 shrink-0" />}
                {item.platformSource === 'tiktok' && <Music className="w-4 h-4 text-pink-400 shrink-0 animate-pulse" />}
                {item.platformSource === 'bbs' && <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />}
                {item.platformSource === 'portal' && <Globe className="w-4 h-4 text-amber-400 shrink-0" />}

                <div className="truncate">
                  <span className="text-[11px] font-black tracking-wide block uppercase text-slate-200">
                    {item.platformSource === 'facebook' && 'Facebook Page Post'}
                    {item.platformSource === 'youtube' && 'YouTube Channel Video'}
                    {item.platformSource === 'github' && 'GitHub Open Repository'}
                    {item.platformSource === 'tiktok' && 'TikTok Viral Reel'}
                    {item.platformSource === 'bbs' && 'BBS Campus Study Note'}
                    {item.platformSource === 'portal' && 'CEO Official Portal Feed'}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono block truncate">
                    ⚡ Auto-Synced {item.syncedTime || 'Just now'}
                  </span>
                </div>
              </div>

              {(item.platformUrl || item.downloadUrl || item.videoUrl) && (
                <a
                  href={item.platformUrl || item.downloadUrl || item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 shadow cursor-pointer transition hover:scale-105"
                  title="Redirect to official platform post"
                >
                  <span>Redirect</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              )}
            </div>
          )}

          {/* Tagged Persons & Content Tags */}
          <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-xl mb-3 space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-900">
              <Tag className="w-3 h-3 text-indigo-600" />
              <span>Tagged Persons:</span>
              <span className="text-indigo-600 font-medium truncate">
                @ArjunSinghGhatang, @SumanThapa, @PoojaGurung
              </span>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="p-2.5 bg-slate-100/70 rounded-xl mb-2 text-[11px] text-slate-700 space-y-1 font-medium">
            <div className="flex items-center gap-1.5 text-rose-700">
              <Heart className="w-3 h-3 fill-current text-rose-500 shrink-0" />
              <span className="line-clamp-1">
                <strong>Liked by:</strong> {isLiked ? 'Arjun Singh Ghatang (CEO), ' : ''}Suman Thapa, Pooja Gurung, Dilip Sharma and {(likesNum - (isLiked ? 3 : 2)).toLocaleString()} others
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-800">
              <Repeat className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="line-clamp-1">
                <strong>Reposted by:</strong> {isReposted ? 'Arjun Singh Ghatang (CEO), ' : ''}Suman Thapa, Gandaki Youth Club
              </span>
            </div>
          </div>
        </div>

        {/* Social Bar */}
        <div className="pt-3 border-t border-slate-100">
          <div className="grid grid-cols-4 gap-1 text-center text-xs font-bold text-slate-600">
            <button
              onClick={() => onToggleLike(item.id)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition cursor-pointer ${
                isLiked ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
              <span>{likesNum}</span>
            </button>

            <button
              onClick={() => onToggleComments(item.id)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition cursor-pointer ${
                isCommentsOpen ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{comments.length}</span>
            </button>

            <button
              onClick={() => onToggleRepost(item.id)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition cursor-pointer ${
                isReposted ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Repeat className={`w-4 h-4 ${isReposted ? 'text-emerald-600 font-bold' : ''}`} />
              <span>{repostsNum}</span>
            </button>

            <button
              onClick={() => onShare(item)}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl hover:bg-slate-100 transition text-slate-600 cursor-pointer"
            >
              {copiedPostId === item.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] text-emerald-600 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Comments Drawer */}
          {isCommentsOpen && (
            <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/80 p-3 rounded-xl space-y-3 animate-fade-in">
              <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                Comments & Community Reaction
              </h4>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">No comments yet. Be the first to reply!</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-2 text-xs bg-white p-2 rounded-lg border border-slate-200">
                      <img src={c.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.time}</span>
                        </div>
                        <p className="text-slate-700 text-xs mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={commentInputText}
                  onChange={(e) => setCommentInputText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onAddComment(item.id, commentInputText);
                      setCommentInputText('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    onAddComment(item.id, commentInputText);
                    setCommentInputText('');
                  }}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  items,
  selectedCategory = 'all',
  profile,
  onSelectItem,
  onNavigateSection,
  lastFeedSyncTime,
  isLiveFeedPaused = false,
  onTogglePauseFeed
}) => {
  // Global Auto-Play scroll configuration
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [autoPlayAudioEnabled, setAutoPlayAudioEnabled] = useState(true);

  // Live RSS/API News Aggregator State
  const [liveNewsItems, setLiveNewsItems] = useState<ContentItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);

  // Auto-Sync State across linked platforms
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState<string | null>(null);

  // Sub-category platform media tabs state
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'news' | 'facebook' | 'youtube' | 'github' | 'tiktok' | 'uploaded_videos' | 'photos' | 'status' | 'saved'>('all');
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  // Fetch Live Breaking News from Server RSS Aggregator
  const fetchLiveNewsFeed = async () => {
    setIsLoadingNews(true);
    try {
      const res = await fetch('/api/live-news');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          setLiveNewsItems(data.items);
        }
      }
    } catch (err) {
      console.error('Failed to load live news feed:', err);
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchLiveNewsFeed();
  }, []);

  // Social Interactions Local States
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const [repostedPosts, setRepostedPosts] = useState<Record<string, boolean>>({});
  const [repostCounts, setRepostCounts] = useState<Record<string, number>>({});

  const [followingCreators, setFollowingCreators] = useState<Record<string, boolean>>({});
  const [subscribedChannels, setSubscribedChannels] = useState<Record<string, boolean>>({});

  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
  const [postComments, setPostComments] = useState<Record<string, PostComment[]>>({
    'news-01': [
      { id: 'c1', author: 'Suman Thapa', text: 'Great news update for Syangja! Highway budget is well needed.', time: '2 hours ago', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
      { id: 'c2', author: 'CEO Arjun Singh Ghatang', text: 'Thank you all! We will keep posting Gandaki news updates regularly.', time: '1 hour ago', avatarUrl: '/arjun_profile_pic.jpg' }
    ],
    'bbs-01': [
      { id: 'c3', author: 'Pooja Gurung', text: 'These BBS accounting notes helped me pass the TU model exam!', time: '1 day ago', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' }
    ]
  });

  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Trigger Manual / Auto Platform Sync Simulation
  const handleTriggerPlatformSync = () => {
    setIsSyncing(true);
    setSyncStatusText('Fetching live RSS feeds & connecting to Facebook, YouTube, GitHub & TikTok...');

    fetchLiveNewsFeed();

    setTimeout(() => {
      setSyncStatusText('Importing live breaking Nepal news from OnlineKhabar, Kathmandu Post, Republica & World RSS...');
    }, 1200);

    setTimeout(() => {
      setSyncStatusText('🟢 Auto-Sync Complete! Live Nepal & World news and platform posts updated on this feed.');
    }, 2800);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusText(null);
    }, 5000);
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (postId: string) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Toggle Like
  const handleToggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const isCurrentlyLiked = !!prev[postId];
      const updated = { ...prev, [postId]: !isCurrentlyLiked };

      setLikeCounts(prevCounts => {
        const currentCount = prevCounts[postId] || 18;
        return {
          ...prevCounts,
          [postId]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1
        };
      });

      return updated;
    });
  };

  // Toggle Repost
  const handleToggleRepost = (postId: string) => {
    setRepostedPosts(prev => {
      const isCurrentlyReposted = !!prev[postId];
      const updated = { ...prev, [postId]: !isCurrentlyReposted };

      setRepostCounts(prevCounts => {
        const currentCount = prevCounts[postId] || 5;
        return {
          ...prevCounts,
          [postId]: isCurrentlyReposted ? currentCount - 1 : currentCount + 1
        };
      });

      return updated;
    });
  };

  const handleToggleFollow = (creatorKey: string) => {
    setFollowingCreators(prev => ({
      ...prev,
      [creatorKey]: !prev[creatorKey]
    }));
  };

  const handleToggleSubscription = (channelKey: string) => {
    setSubscribedChannels(prev => ({
      ...prev,
      [channelKey]: !prev[channelKey]
    }));
  };

  const handleSharePost = (item: ContentItem) => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.title} - ${url}`);
    }
    setCopiedPostId(item.id);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  const handleAddComment = (postId: string, text: string) => {
    if (!text.trim()) return;

    const newCommentObj: PostComment = {
      id: `comment-${Date.now()}`,
      author: 'Supporter / Guest User',
      text: text,
      time: 'Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentObj]
    }));
  };

  // Filter liveNewsItems by selectedCategory if selected
  const matchingLiveNews = (selectedCategory && selectedCategory !== 'all')
    ? liveNewsItems.filter(i => {
        if (selectedCategory === 'movie') return i.category === 'movie' || i.category === 'entertainment';
        if (selectedCategory === 'tech') return i.category === 'tech' || i.category === 'github';
        return i.category === selectedCategory;
      })
    : liveNewsItems;

  // Combine live news items with default items, putting primary Nepal news at top
  const combinedAllItems = [
    ...matchingLiveNews,
    ...items.filter(i => !matchingLiveNews.some(ln => ln.id === i.id))
  ];

  // Filter items by subtabs
  const newsItems = combinedAllItems.filter(i => 
    i.category === 'news' || 
    i.category === 'politic' || 
    i.category === 'economy' || 
    i.tags.some(t => t.toLowerCase().includes('news') || t.toLowerCase().includes('nepal') || t.toLowerCase().includes('world'))
  );
  const facebookItems = combinedAllItems.filter(i => i.platformSource === 'facebook');
  const youtubeItems = combinedAllItems.filter(i => i.platformSource === 'youtube' || i.category === 'youtube');
  const githubItems = combinedAllItems.filter(i => i.platformSource === 'github');
  const tiktokItems = combinedAllItems.filter(i => i.platformSource === 'tiktok');
  const uploadedVideoItems = combinedAllItems.filter(i => i.category === 'youtube' || i.videoUrl || i.tags.some(t => t.includes('video')));
  const photoItems = combinedAllItems.filter(i => i.tags.some(t => t.includes('photo') || t.includes('gallery') || t.includes('pic')) || i.category === 'bbs' || i.category === 'media');
  const statusItems = combinedAllItems.filter(i => i.category === 'news' || i.category === 'notices' || i.categoryLabel.includes('CEO Update'));
  const savedItemsList = combinedAllItems.filter(i => !!savedPosts[i.id]);

  let displayItems = combinedAllItems;
  if (activeSubTab === 'news') displayItems = newsItems;
  else if (activeSubTab === 'facebook') displayItems = facebookItems;
  else if (activeSubTab === 'youtube') displayItems = youtubeItems;
  else if (activeSubTab === 'github') displayItems = githubItems;
  else if (activeSubTab === 'tiktok') displayItems = tiktokItems;
  else if (activeSubTab === 'uploaded_videos') displayItems = uploadedVideoItems;
  else if (activeSubTab === 'photos') displayItems = photoItems;
  else if (activeSubTab === 'status') displayItems = statusItems;
  else if (activeSubTab === 'saved') displayItems = savedItemsList;

  return (
    <div className="space-y-6 mb-12">
      {/* Linked Accounts Auto-Sync Engine Control Panel */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-indigo-800/70 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 text-amber-300 shadow-inner">
              <RefreshCw className={`w-6 h-6 ${isSyncing ? 'animate-spin text-amber-400' : 'text-amber-300'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-base sm:text-lg text-white tracking-wide">
                  Linked Accounts Auto-Sync Feed Engine
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Auto-Sync Active (Every 30s)</span>
                </span>
              </div>
              <p className="text-xs text-indigo-200/90 mt-0.5">
                Automatically imports & plays uploaded videos, pictures, status updates, code repos, and older content from Facebook Page, YouTube Channel, GitHub & TikTok directly onto this central feed!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPlatformSync}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-slate-950' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            <button
              onClick={() => setAutoPlayAudioEnabled(!autoPlayAudioEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                autoPlayAudioEnabled
                  ? 'bg-amber-500 text-slate-950 shadow font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {autoPlayAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{autoPlayAudioEnabled ? 'Audio On' : 'Audio Muted'}</span>
            </button>

            <button
              onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                autoPlayEnabled
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{autoPlayEnabled ? 'Auto-Play ON' : 'Auto-Play OFF'}</span>
            </button>
          </div>
        </div>

        {/* Sync Progress Notification Banner */}
        {syncStatusText && (
          <div className="p-3 bg-indigo-900/60 border border-indigo-500/50 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-2 animate-pulse">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{syncStatusText}</span>
          </div>
        )}

        {/* Connected Official Channel Direct Links Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Connected Official Channels:
          </span>

          <a
            href={profile?.facebookUrl || 'http://www.facebook.com/entertainmentcommunity9/?ref=pages_you_manage'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 border border-blue-500/40 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-400" />
            <span>Facebook Page</span>
            <ExternalLink className="w-3 h-3 text-blue-300" />
          </a>

          <a
            href={profile?.youtubeUrl || 'http://youtube.com/channel/UCRrmvPF1035n_tfNKhHJCHA'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-500/40 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube Channel</span>
            <ExternalLink className="w-3 h-3 text-red-300" />
          </a>

          <a
            href={profile?.githubUrl || 'https://github.com/arjunsinghghatang/arjunsinghghatang03.com.np'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 text-purple-400" />
            <span>GitHub Repos</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={profile?.tiktokUrl || 'https://tiktok.com/@arjunsinghghatang'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-pink-950/60 hover:bg-pink-900 text-pink-200 border border-pink-500/40 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-pink-400" />
            <span>TikTok Reels</span>
            <ExternalLink className="w-3 h-3 text-pink-300" />
          </a>
        </div>
      </div>

      {/* 10-Second Live News Feed Auto-Sync Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3 rounded-2xl border border-indigo-500/30 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-black tracking-wide uppercase text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isLiveFeedPaused ? 'bg-amber-400' : 'bg-rose-500 animate-ping'}`} />
            <span>{isLiveFeedPaused ? 'PAUSED' : 'LIVE 10s AUTO-FEED'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-200 font-medium">
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isLiveFeedPaused ? '' : 'animate-spin'}`} />
            <span>Updates every 10 seconds</span>
            {lastFeedSyncTime && (
              <span className="text-slate-400 font-mono text-[11px] ml-1 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                Last: {lastFeedSyncTime}
              </span>
            )}
          </div>

          <div className="hidden lg:inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Reader Fixed View: Reading uninterrupted during live 5s/10s updates</span>
          </div>
        </div>

        {onTogglePauseFeed && (
          <button
            onClick={onTogglePauseFeed}
            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition cursor-pointer border ${
              isLiveFeedPaused
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600'
            }`}
          >
            {isLiveFeedPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            <span>{isLiveFeedPaused ? 'Resume Auto-Feed' : 'Pause Live Sync'}</span>
          </button>
        )}
      </div>

      {/* Sub-category & Platform Filter Navigation Bar */}
      <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'all' ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Linked Feeds ({combinedAllItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('news')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'news'
                ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow font-black ring-2 ring-rose-400'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>🇳🇵 Nepal & World News ({newsItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('facebook')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'facebook' ? 'bg-blue-600 text-white shadow' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            <span>Facebook Page ({facebookItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('youtube')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'youtube' ? 'bg-red-600 text-white shadow' : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>YouTube Channel ({youtubeItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('github')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'github' ? 'bg-slate-950 text-white shadow' : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repos ({githubItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tiktok')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'tiktok' ? 'bg-pink-600 text-white shadow' : 'bg-pink-50 text-pink-900 hover:bg-pink-100'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>TikTok Reels ({tiktokItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('uploaded_videos')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'uploaded_videos' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Uploaded Videos ({uploadedVideoItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('photos')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'photos' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos ({photoItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('status')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'status' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Status ({statusItems.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('saved')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'saved' ? 'bg-purple-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedItemsList.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => {
          const isLiked = !!likedPosts[item.id];
          const likesNum = likeCounts[item.id] || (item.views ? Math.floor(item.views * 0.08) : 24);

          const isReposted = !!repostedPosts[item.id];
          const repostsNum = repostCounts[item.id] || (item.views ? Math.floor(item.views * 0.02) : 6);

          const comments = postComments[item.id] || [];
          const isCommentsOpen = openCommentPostId === item.id;

          const isFollowing = !!followingCreators[item.id];
          const isSubscribed = !!subscribedChannels[item.id];
          const isSaved = !!savedPosts[item.id];

          return (
            <AutoPlayFeedCard
              key={item.id}
              item={item}
              profile={profile}
              onSelectItem={onSelectItem}
              isLiked={isLiked}
              likesNum={likesNum}
              isReposted={isReposted}
              repostsNum={repostsNum}
              comments={comments}
              isCommentsOpen={isCommentsOpen}
              isFollowing={isFollowing}
              isSubscribed={isSubscribed}
              isSaved={isSaved}
              autoPlayEnabled={autoPlayEnabled}
              autoPlayAudioEnabled={autoPlayAudioEnabled}
              onToggleSave={handleToggleSave}
              onToggleLike={handleToggleLike}
              onToggleRepost={handleToggleRepost}
              onToggleFollow={handleToggleFollow}
              onToggleSubscribe={handleToggleSubscription}
              onShare={handleSharePost}
              onToggleComments={(id) => setOpenCommentPostId(openCommentPostId === id ? null : id)}
              copiedPostId={copiedPostId}
              onAddComment={handleAddComment}
            />
          );
        })}
      </div>
    </div>
  );
};
