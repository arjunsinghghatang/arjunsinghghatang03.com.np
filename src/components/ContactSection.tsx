import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Youtube, Facebook, Github, Copy, Check, Send, Sparkles, MapPin } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Quick message state
  const [msgName, setMsgName] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendQuickMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgText) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgName('');
      setMsgText('');
      setMsgSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-12 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-500/30">
            <Phone className="w-4 h-4 text-rose-400" />
            <span>Direct Communications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Contact Number & Direct Channels
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Reach out directly to Arjun Singh Ghatang for BBS student notes inquiries, YouTube content collaborations, media interviews, or general feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Primary Mobile Phone Number */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative group hover:border-rose-500/60 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Contact Mobile</span>
              <h3 className="text-2xl font-black text-white font-mono mt-1 mb-2">
                {contactInfo.phone}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Direct hotline for student inquiries, exam notes clarification, and official appointments in Nepal.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-700/80">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex-1 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors text-center"
              >
                Call Now
              </a>
              <button
                onClick={() => handleCopy(contactInfo.phone, 'phone')}
                className="py-2.5 px-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy phone number"
              >
                {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat Channel */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative group hover:border-emerald-500/60 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Instant Chat</span>
              <h3 className="text-2xl font-black text-white font-mono mt-1 mb-2">
                {contactInfo.whatsapp}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Send a quick WhatsApp message to request PDF study files, YouTube sponsorship rates, or quick guidance.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-700/80">
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors text-center"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => handleCopy(contactInfo.whatsapp, 'whatsapp')}
                className="py-2.5 px-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'whatsapp' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Official Email & Domain */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl relative group hover:border-indigo-500/60 transition duration-300 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address & Domain</span>
              <h3 className="text-lg font-black text-white font-mono mt-1 mb-2 truncate">
                {contactInfo.email}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Official website domain: <strong className="text-indigo-300">{contactInfo.domain}</strong>. Send detailed business letters & media proposals here.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-700/80">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors text-center"
              >
                Send Email
              </a>
              <button
                onClick={() => handleCopy(contactInfo.email, 'email')}
                className="py-2.5 px-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Quick Message & Social Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-700/60">
          
          {/* Social Links List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Official Social Channels</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Follow Arjun Singh Ghatang across YouTube, Facebook, and GitHub to stay updated with new videos and code releases.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={contactInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/80 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center">
                    <Youtube className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">YouTube Channel</h4>
                    <p className="text-xs text-slate-400">Subscribe for vlogs & BBS guides</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-semibold">Visit Channel →</span>
              </a>

              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/80 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center">
                    <Facebook className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Facebook Community 9</h4>
                    <p className="text-xs text-slate-400">Entertainment community page</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-semibold">Join Page →</span>
              </a>

              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-900/80 hover:bg-slate-900 rounded-xl border border-slate-700/80 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">GitHub Repository</h4>
                    <p className="text-xs text-slate-400">arjunsinghghatang03.com.np code</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-semibold">View Source →</span>
              </a>
            </div>
          </div>

          {/* Quick Instant Messenger Form */}
          <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-2">Send a Quick Note</h3>
            <p className="text-slate-400 text-xs mb-4">
              Have a quick question or message? Type it here for instant dispatch.
            </p>

            {msgSent ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs text-center space-y-1">
                <p className="font-bold text-sm">Thank you, message sent!</p>
                <p>Arjun Singh Ghatang will review your quick note.</p>
              </div>
            ) : (
              <form onSubmit={handleSendQuickMsg} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    value={msgName}
                    onChange={(e) => setMsgName(e.target.value)}
                    placeholder="Your Name / Student ID"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    placeholder="Write your quick message here..."
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Quick Note</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
