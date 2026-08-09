import React from 'react';
import { Home, Trophy, Newspaper, Landmark, TrendingUp, Gamepad2, Film, Sparkles, GraduationCap, Youtube } from 'lucide-react';
import { CategoryType } from '../types';
import { getTranslation } from '../utils/translations';

interface MainCategoryNavBarProps {
  selectedCategory: CategoryType;
  currentLang?: string;
  onSelectCategory: (cat: CategoryType) => void;
  totalItemsCount: number;
}

export const MainCategoryNavBar: React.FC<MainCategoryNavBarProps> = ({
  selectedCategory,
  currentLang = 'ne',
  onSelectCategory,
  totalItemsCount
}) => {
  const t = getTranslation(currentLang);

  const mainCategories: { id: CategoryType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'all', label: t.home, icon: <Home className="w-4 h-4" />, color: 'hover:bg-slate-800 active:bg-slate-900' },
    { id: 'sports', label: t.sports, icon: <Trophy className="w-4 h-4 text-emerald-400" />, color: 'hover:bg-emerald-900/40 text-emerald-400' },
    { id: 'news', label: t.news, icon: <Newspaper className="w-4 h-4 text-blue-400" />, color: 'hover:bg-blue-900/40 text-blue-400' },
    { id: 'politic', label: t.politics, icon: <Landmark className="w-4 h-4 text-amber-400" />, color: 'hover:bg-amber-900/40 text-amber-400' },
    { id: 'economy', label: t.economy, icon: <TrendingUp className="w-4 h-4 text-teal-400" />, color: 'hover:bg-teal-900/40 text-teal-400' },
    { id: 'game', label: t.games, icon: <Gamepad2 className="w-4 h-4 text-purple-400" />, color: 'hover:bg-purple-900/40 text-purple-400' },
    { id: 'movie', label: t.movies, icon: <Film className="w-4 h-4 text-rose-400" />, color: 'hover:bg-rose-900/40 text-rose-400' },
  ];

  const additionalCategories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'bbs', label: t.bbsNotes, icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> },
    { id: 'youtube', label: 'YOUTUBE VLOGS', icon: <Youtube className="w-4 h-4 text-red-400" /> }
  ];

  return (
    <div className="w-full bg-slate-950 text-white rounded-2xl p-2.5 sm:p-3.5 shadow-xl border border-indigo-900/60 my-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-2 px-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-200">
            Main Portal Category Channels
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-2">
          <span>Active Filter:</span>
          <span className="bg-indigo-600 text-white font-bold px-2.5 py-0.5 rounded-full uppercase">
            {selectedCategory === 'all' ? 'HOME (ALL CONTENT)' : selectedCategory}
          </span>
        </div>
      </div>

      {/* Main Bar Buttons Scrollable Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
        {mainCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg ring-2 ring-indigo-400/50 scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}

        {/* Separator */}
        <div className="h-6 w-[1px] bg-slate-800 shrink-0 mx-1" />

        {/* BBS & YouTube direct pills */}
        {additionalCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
