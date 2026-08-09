import React from 'react';
import { Youtube, Facebook, Github, ArrowUp, Heart, Globe, GraduationCap, ShieldCheck, Crown } from 'lucide-react';
import { ContactInfo } from '../types';

interface FooterProps {
  contactInfo: ContactInfo;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ contactInfo, onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Profile Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-black text-base uppercase font-sans">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>ARJUN SINGH GHATANG</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>CEO & FOUNDER PORTAL</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Official YouTube Creator & BBS Student digital portal. CEO & Founder: Arjun Singh Ghatang. Providing free study resources, news, sports, politics, economy, vlogs, and student guidance in Nepal.
            </p>

            <div className="pt-1 flex items-center gap-1.5 text-indigo-400 font-mono text-[11px]">
              <Globe className="w-3.5 h-3.5" />
              <span>{contactInfo.domain}</span>
            </div>
          </div>

          {/* Column 2: Quick Portal Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Resource Portal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('search-section')} className="hover:text-white transition-colors cursor-pointer">
                  Search Study Notes & News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('helpdesk')} className="hover:text-white transition-colors cursor-pointer">
                  Help Desk & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Number & CEO Office
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('office')} className="hover:text-white transition-colors cursor-pointer">
                  Office Location & Visit Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Channels */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Direct CEO Channels</h4>
            <ul className="space-y-2">
              <li className="text-slate-300 font-mono">
                Phone: <span className="text-white font-bold">{contactInfo.phone}</span>
              </li>
              <li className="text-slate-300 font-mono">
                WhatsApp: <span className="text-emerald-400">{contactInfo.whatsapp}</span>
              </li>
              <li className="text-slate-300">
                Email: <span className="text-indigo-300">{contactInfo.email}</span>
              </li>
              <li className="text-slate-400">
                Location: {contactInfo.address}
              </li>
            </ul>
          </div>

          {/* Column 4: Official Socials */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Official Socials</h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href={contactInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-current" />
                <span>YouTube Channel</span>
              </a>

              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-500 fill-current" />
                <span>Facebook Community 9</span>
              </a>

              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-slate-200 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Prominent CEO & Founder Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
              <Crown className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-sm font-black text-amber-300 uppercase tracking-wide">
                CEO AND FOUNDER: ARJUN SINGH GHATANG
              </p>
              <p className="text-slate-400 text-[11px]">
                Copyright &copy; 2021-{new Date().getFullYear()} ARJUN SINGH GHATANG. All rights reserved. ({contactInfo.domain})
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer border border-slate-800 font-bold shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
