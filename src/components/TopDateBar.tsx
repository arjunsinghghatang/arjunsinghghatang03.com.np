import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Globe, Crown, Languages, ChevronDown, Check, Sparkles } from 'lucide-react';

// Nepali Months in Bikram Sambat (B.S.)
const NEPALI_MONTHS = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

const NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

function toNepaliDigits(numStr: string | number): string {
  return String(numStr).replace(/\d/g, (d) => NEPALI_DIGITS[parseInt(d, 10)]);
}

export const LANGUAGES = [
  { code: 'ne', name: 'Nepali (नेपाली)', flag: '🇳🇵' },
  { code: 'en', name: 'English (US)', flag: '🌐' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese (中文)', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
];

interface TopDateBarProps {
  currentLang?: string;
  onLanguageChange?: (langCode: string) => void;
}

export const TopDateBar: React.FC<TopDateBarProps> = ({ currentLang = 'ne', onLanguageChange }) => {
  const [now, setNow] = useState(new Date());
  const [selectedLang, setSelectedLang] = useState<string>(currentLang);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    setSelectedLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem('asg_site_language', langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
    window.dispatchEvent(new CustomEvent('asg_language_changed', { detail: langCode }));
    setIsLangMenuOpen(false);
  };

  // Calculate NPT (Nepal Standard Time: UTC + 5:45)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const nptTime = new Date(utc + (5.75 * 3600000));

  // English A.D. Date & Day
  const englishDay = nptTime.toLocaleDateString('en-US', { weekday: 'long' });
  const englishDateStr = nptTime.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Time in NPT
  const nptHours = nptTime.getHours();
  const nptMinutes = nptTime.getMinutes();
  const nptSeconds = nptTime.getSeconds();
  const ampm = nptHours >= 12 ? 'PM' : 'AM';
  const hours12 = nptHours % 12 || 12;
  const timeFormatted = `${String(hours12).padStart(2, '0')}:${String(nptMinutes).padStart(2, '0')}:${String(nptSeconds).padStart(2, '0')} ${ampm}`;

  // Approximate B.S. Date Calculation (AD 2026 Shrawan / B.S. 2083)
  const yearAD = nptTime.getFullYear();
  const monthAD = nptTime.getMonth(); // 0-indexed
  const dateAD = nptTime.getDate();

  let bsYear = yearAD + 57;
  let bsMonthIndex = 3; // Shrawan for August
  let bsDate = dateAD + 15; // Approximate shift for Nepali calendar day

  if (monthAD === 7) { // August
    bsMonthIndex = 3; // Shrawan
    bsDate = dateAD + 15;
    if (bsDate > 32) {
      bsMonthIndex = 4; // Bhadra
      bsDate = bsDate - 31;
    }
  }

  const nepaliMonthName = NEPALI_MONTHS[bsMonthIndex] || 'Shrawan';
  const nepaliDigitsDate = toNepaliDigits(bsDate);

  const activeLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-indigo-950 px-4 py-2 text-xs font-medium relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left Side: Nepal's Date and Time (NPT / B.S.) */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-950/80 text-red-300 border border-red-800/60 font-bold text-[11px]">
            <span>🇳🇵 NEPAL TIME (NPT)</span>
          </span>

          <span className="flex items-center gap-1 text-amber-300 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              २०८३ {nepaliMonthName} {nepaliDigitsDate} गते ({nepaliMonthName} {bsDate}, {bsYear} B.S.)
            </span>
          </span>

          <span className="text-slate-600 font-bold">•</span>

          <span className="flex items-center gap-1 text-emerald-400 font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
            <span>{timeFormatted} NPT</span>
          </span>
        </div>

        {/* Center/Right Designation Badge for CEO */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>CEO & FOUNDER: ARJUN SINGH GHATANG</span>
        </div>

        {/* Right Side: English Date, Days (A.D.) & Language Translate Option */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end text-slate-300">
          
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-bold text-[11px]">
              <Globe className="w-3 h-3 text-indigo-400" />
              <span>A.D.</span>
            </span>

            <span className="font-semibold text-slate-100">
              {englishDay}, {englishDateStr}
            </span>
          </div>

          {/* Language Auto-Translate Option Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="bg-gradient-to-r from-rose-900/90 to-red-950/90 hover:from-rose-800 hover:to-red-900 text-white px-2.5 py-1 rounded-xl border border-rose-600/60 text-[11px] font-extrabold flex items-center gap-1.5 shadow-md transition hover:scale-105 cursor-pointer"
              title="Change Auto Translation Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{activeLangObj.flag} {activeLangObj.name.split(' ')[0]}</span>
              <ChevronDown className={`w-3 h-3 text-amber-300 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Selection Dropdown Menu */}
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-rose-500/40 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-fade-in">
                <div className="px-2 py-1.5 border-b border-slate-800 flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>News Auto-Translate</span>
                  </span>
                  <span className="text-[9px] bg-rose-600/40 text-rose-300 px-1.5 py-0.5 rounded-full font-bold">
                    Live AI
                  </span>
                </div>

                <div className="space-y-0.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition cursor-pointer ${
                        selectedLang === lang.code
                          ? 'bg-rose-600 text-white font-extrabold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 px-2 text-center">
                  🇳🇵 News automatically translates into Nepali when opened.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

