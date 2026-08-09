import React, { useState, useEffect } from 'react';
import { X, Download, ExternalLink, Calendar, Eye, GraduationCap, Video, Share2, Check, FileText, Globe, Languages, Sparkles, Volume2, Loader2, CheckCircle2 } from 'lucide-react';
import { ContentItem } from '../types';

interface ItemDetailModalProps {
  item: ContentItem | null;
  currentLang?: string;
  onClose: () => void;
}

const LANG_MAP: Record<string, string> = {
  ne: 'Nepali',
  en: 'English',
  hi: 'Hindi',
  ja: 'Japanese',
  zh: 'Chinese',
  es: 'Spanish'
};

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, currentLang = 'ne', onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto Language Translation State
  const [langMode, setLangMode] = useState<'translated' | 'original'>('translated');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedTitle, setTranslatedTitle] = useState<string>('');
  const [translatedDescription, setTranslatedDescription] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const targetLangName = LANG_MAP[currentLang] || 'Nepali';

  // Trigger Auto-Translation into active site language on item load
  useEffect(() => {
    if (!item) return;

    let isMounted = true;
    const fetchTranslation = async () => {
      setIsTranslating(true);
      try {
        const res = await fetch('/api/translate-news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: item.title,
            description: item.description,
            targetLang: targetLangName
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && isMounted) {
            setTranslatedTitle(data.translatedTitle);
            setTranslatedDescription(data.translatedDescription);
            setHighlights(data.highlights || []);
          }
        }
      } catch (err) {
        console.error('Auto translation failed:', err);
        if (isMounted) {
          setTranslatedTitle(`[${targetLangName}] ${item.title}`);
          setTranslatedDescription(`[${targetLangName}] ${item.description}`);
        }
      } finally {
        if (isMounted) setIsTranslating(false);
      }
    };

    fetchTranslation();

    return () => {
      isMounted = false;
    };
  }, [item, currentLang, targetLangName]);

  if (!item) return null;

  const isBBS = item.category === 'bbs';
  const isYouTube = item.category === 'youtube';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Text to Speech Read Aloud for Nepali / English
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      const textToRead = langMode === 'translated' 
        ? `${translatedTitle || item.title}. ${translatedDescription || item.description}`
        : `${item.title}. ${item.description}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = currentLang === 'ne' ? 'ne-NP' : (currentLang === 'hi' ? 'hi-IN' : 'en-US');
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech audio reader is not supported in this browser.');
    }
  };

  const currentTitle = (langMode === 'translated' && translatedTitle) ? translatedTitle : item.title;
  const currentDescription = (langMode === 'translated' && translatedDescription) ? translatedDescription : item.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="relative h-56 sm:h-64 bg-slate-900 shrink-0">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis?.cancel();
              onClose();
            }}
            className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 text-white p-2 rounded-full transition-colors cursor-pointer border border-slate-700 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge & Live Auto-Translate Tag */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
              isBBS ? 'bg-emerald-600' : isYouTube ? 'bg-red-600' : 'bg-indigo-600'
            }`}>
              {isBBS ? <GraduationCap className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{item.categoryLabel}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md animate-pulse">
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span>🇳🇵 Auto-Translated into Nepali</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-4 text-xs text-slate-300 font-medium mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{item.date}</span>
              </span>
              {item.views !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.views.toLocaleString()} Total Views</span>
                </span>
              )}
            </div>
            
            <h2 className="text-xl sm:text-2xl font-extrabold line-clamp-2 leading-tight flex items-center gap-2">
              {isTranslating ? (
                <span className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>नेपाली भाषामा रूपान्तरण हुँदैछ... (Translating into Nepali...)</span>
                </span>
              ) : (
                <span>{currentTitle}</span>
              )}
            </h2>
          </div>
        </div>

        {/* Language Auto-Translator Switcher Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-300">Live AI News Auto-Translation System:</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader */}
            <button
              onClick={handleReadAloud}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Stop Reading' : 'Listen News Audio (आवाज सुन्नुहोस्)'}</span>
            </button>

            {/* Language Selector Buttons */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setLangMode('nepali')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  langMode === 'nepali' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇳🇵 Nepali (नेपाली)</span>
              </button>

              <button
                onClick={() => setLangMode('original')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  langMode === 'original' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Original Language</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Active Banner Indicator */}
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-xs font-bold text-amber-900">
                {langMode === 'nepali' 
                  ? 'नेपाली भाषामा रूपान्तरित (Auto-Translated to Nepali for seamless reading)'
                  : 'Viewing article in original published language'}
              </span>
            </div>
            {isTranslating && (
              <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Translating...</span>
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {langMode === 'nepali' ? 'समाचार सारांश र विस्तृत विवरण' : 'Overview & Summary'}
            </h3>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
              {currentDescription}
            </p>
          </div>

          {/* Detailed Content Highlights */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{langMode === 'nepali' ? 'मुख्य समाचार बिन्दुहरू (Key News Highlights)' : 'Resource Key Highlights'}</span>
            </h4>

            {highlights && highlights.length > 0 && langMode === 'nepali' ? (
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2 font-medium">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Verified resource for Tribhuvan University BBS study standard and national news.</li>
                <li>Hand-picked topic summaries and exam-oriented model questions.</li>
                <li>Free access provided via official channel arjunsinghghatang03.com.np.</li>
              </ul>
            )}
          </div>

          {/* Tags List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Resource Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Bar Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Resource'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis?.cancel();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>

            {isBBS && item.downloadUrl ? (
              <a
                href={item.downloadUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading PDF notes: ${item.title}`);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Notes</span>
              </a>
            ) : item.videoUrl ? (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-md shadow-red-600/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
};
