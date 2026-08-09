import React from 'react';
import { Search, Filter, X, ArrowUpDown, GraduationCap, Video, Sparkles, Code, HelpCircle } from 'lucide-react';
import { CategoryType } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  sortBy: 'recent' | 'popular' | 'title';
  onSortChange: (sort: 'recent' | 'popular' | 'title') => void;
  availableTags: string[];
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  sortBy,
  onSortChange,
  availableTags,
  totalResults
}) => {
  const categories: { id: CategoryType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'all', label: 'All Resources', icon: <Filter className="w-4 h-4" />, color: 'bg-indigo-600' },
    { id: 'bbs', label: 'BBS Study Notes', icon: <GraduationCap className="w-4 h-4" />, color: 'bg-emerald-600' },
    { id: 'youtube', label: 'YouTube Videos', icon: <Video className="w-4 h-4" />, color: 'bg-red-600' },
    { id: 'entertainment', label: 'Entertainment', icon: <Sparkles className="w-4 h-4" />, color: 'bg-blue-600' },
    { id: 'tech', label: 'Tech Tutorials', icon: <Code className="w-4 h-4" />, color: 'bg-purple-600' },
    { id: 'helpdesk', label: 'Help Desk Info', icon: <HelpCircle className="w-4 h-4" />, color: 'bg-amber-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-5 sm:p-6 mb-8">
      
      {/* Search Input Box & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-indigo-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search BBS notes, YouTube videos, office location, help desk..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto min-w-[180px]">
          <ArrowUpDown className="w-4 h-4 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'recent' | 'popular' | 'title')}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Category Tabs Bar - Only appears when actively searching */}
      {(searchQuery.trim().length > 0 || selectedCategory !== 'all') && (
        <div className="mb-4 pt-3 border-t border-slate-100 animate-fade-in">
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Search Filter Categories</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                    isSelected
                      ? `${cat.color} text-white shadow-md shadow-indigo-500/20 scale-[1.02]`
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Popular Filter Tags - Only show when user is actively searching or matching */}
      {availableTags.length > 0 && (searchQuery.trim().length > 0 || selectedTag !== null) && (
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs animate-fade-in">
          <span className="font-bold text-indigo-600 uppercase tracking-wider mr-1">
            Matching Tags:
          </span>
          {availableTags.map((tag) => {
            const isTagActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(isTagActive ? null : tag)}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  isTagActive
                    ? 'bg-indigo-900 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-600 border border-slate-200'
                }`}
              >
                #{tag}
              </button>
            );
          })}

          {selectedTag && (
            <button
              onClick={() => onSelectTag(null)}
              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold ml-2 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear tag</span>
            </button>
          )}
        </div>
      )}

      {/* Active Filters Summary & Count */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>
          Showing <span className="font-bold text-slate-900">{totalResults}</span> {totalResults === 1 ? 'item' : 'items'}
          {(searchQuery || selectedCategory !== 'all' || selectedTag) && (
            <span className="ml-1 text-indigo-600">
              (Filtered result)
            </span>
          )}
        </div>

        {(searchQuery || selectedCategory !== 'all' || selectedTag) && (
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
              onSelectTag(null);
            }}
            className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

    </div>
  );
};
