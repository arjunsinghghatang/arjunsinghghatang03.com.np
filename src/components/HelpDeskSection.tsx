import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Send, CheckCircle2, Clock, PhoneCall, Mail, MessageSquare, AlertCircle, FileText } from 'lucide-react';
import { FAQItem, HelpTicket, ContactInfo } from '../types';

interface HelpDeskSectionProps {
  faqs: FAQItem[];
  contactInfo: ContactInfo;
}

export const HelpDeskSection: React.FC<HelpDeskSectionProps> = ({ faqs, contactInfo }) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-01');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');

  // Help Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'BBS Study Notes Request',
    message: ''
  });

  const [submittedTicket, setSubmittedTicket] = useState<HelpTicket | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCat = selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
    return matchesSearch && matchesCat;
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: HelpTicket = {
        id: `ASG-${Math.floor(1000 + Math.random() * 9000)}`,
        name: ticketForm.name,
        email: ticketForm.email || 'N/A',
        phone: ticketForm.phone || 'N/A',
        subject: ticketForm.subject || ticketForm.category,
        category: ticketForm.category,
        message: ticketForm.message,
        status: 'Open',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
      };

      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setTicketForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'BBS Study Notes Request',
        message: ''
      });
    }, 800);
  };

  return (
    <section id="helpdesk" className="py-10 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Official Student & Media Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Help Desk & Inquiry Center
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Get instant answers to common BBS exam questions, YouTube channel inquiries, office visit guidelines, or submit a support ticket directly to Arjun Singh Ghatang.
          </p>
        </div>

        {/* Desk Status Overview Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 rounded-2xl p-6 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-950 animate-pulse" />
                Live Desk Support Active
              </div>
              <h3 className="text-xl font-black text-slate-950">
                Support Desk Hours: 09:00 AM – 05:00 PM (NPT)
              </h3>
              <p className="text-slate-900 text-xs sm:text-sm font-medium">
                Average email response time: Under 24 hours. Emergency call desk: {contactInfo.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${contactInfo.phone}`}
              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call Help Desk</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: FAQ Accordion System */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm">Quick solutions for common questions</p>
              </div>

              {/* Category Pills */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setSelectedFaqCategory('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${selectedFaqCategory === 'all' ? 'bg-white font-bold text-indigo-600 shadow-xs' : 'text-slate-600'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFaqCategory('bbs')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${selectedFaqCategory === 'bbs' ? 'bg-white font-bold text-emerald-600 shadow-xs' : 'text-slate-600'}`}
                >
                  BBS
                </button>
                <button
                  onClick={() => setSelectedFaqCategory('youtube')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${selectedFaqCategory === 'youtube' ? 'bg-white font-bold text-red-600 shadow-xs' : 'text-slate-600'}`}
                >
                  YouTube
                </button>
              </div>
            </div>

            {/* FAQ Search Filter */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. BBS notes download, office visit...)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <p className="text-slate-500 text-sm py-4 text-center">No FAQs match your search keyword.</p>
              ) : (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100/80 font-bold text-slate-800 text-sm flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500" />
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column: Submit Ticket Form */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Submit Help Desk Ticket</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Need custom BBS study notes, YouTube business advice, or personal guidance? Fill out the ticket below.
            </p>

            {submittedTicket ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-900 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-base">Ticket Created Successfully!</h4>
                    <p className="text-xs text-emerald-700">Ref ID: <strong className="font-mono text-emerald-950">{submittedTicket.id}</strong></p>
                  </div>
                </div>

                <div className="bg-white/80 p-4 rounded-xl text-xs space-y-2 border border-emerald-100">
                  <p><strong>Name:</strong> {submittedTicket.name}</p>
                  <p><strong>Category:</strong> {submittedTicket.category}</p>
                  <p><strong>Status:</strong> <span className="bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-bold">{submittedTicket.status}</span></p>
                  <p><strong>Created:</strong> {submittedTicket.createdAt}</p>
                </div>

                <p className="text-xs text-emerald-800">
                  Arjun Singh Ghatang or our study desk team will review your inquiry and reach back via phone/email shortly.
                </p>

                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    placeholder="e.g., Arjun Singh / Student Name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      value={ticketForm.phone}
                      onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      placeholder="+977 98..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="BBS Study Notes Request">BBS Study Notes / Model Questions Request</option>
                    <option value="YouTube Collaboration">YouTube Collaboration & Sponsorship</option>
                    <option value="Office Visit Appointment">Office Visit & Consultation</option>
                    <option value="General Question">General Inquiry / Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    placeholder="Describe what study notes or assistance you need..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Generating Ticket...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry Ticket</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
