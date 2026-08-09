import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Calendar, CheckCircle2, Phone, Mail, Building2, Compass, ExternalLink, Sparkles } from 'lucide-react';
import { OfficeLocation } from '../types';

interface OfficeLocationSectionProps {
  office: OfficeLocation;
}

export const OfficeLocationSection: React.FC<OfficeLocationSectionProps> = ({ office }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Appointment Modal/Form state
  const [visitForm, setVisitForm] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '11:00 AM - 12:00 PM',
    purpose: 'BBS Study Consultation'
  });
  const [visitBooked, setVisitBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${office.address}, ${office.city}, ${office.country}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitForm.name || !visitForm.phone || !visitForm.date) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setVisitBooked(true);
    }, 700);
  };

  return (
    <section id="office" className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/20">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>Consultation & Media Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Office Location & Visiting Hours
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Visit Arjun Singh Ghatang’s official desk in {office.address}, {office.city}, {office.province}, {office.country} for in-person academic guidance, video project meetings, and study resource pickups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Office Address & Operating Hours Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Compass className="w-32 h-32 text-indigo-400" />
              </div>

              <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span>{office.title}</span>
              </h3>

              <div className="space-y-3 my-6 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-white">{office.address}</p>
                    <p>{office.city}, {office.province}, {office.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Landmark Directions</p>
                    <p className="text-xs text-slate-300">{office.nearbyLandmark}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800 text-xs font-mono">
                  <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GPS Coords: {office.coordinates.lat}° N, {office.coordinates.lng}° E</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedAddress ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${office.coordinates.lat},${office.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                  <span>Google Maps</span>
                </a>
              </div>

            </div>

            {/* Operating Hours Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h4 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Official Visiting Hours</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                {office.hours.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-200/60 last:border-0">
                    <span className="font-semibold text-slate-700">{item.days}</span>
                    <span className={`font-mono font-bold ${item.time.includes('Closed') ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-amber-50 text-amber-900 text-xs border border-amber-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Students and visitors are encouraged to schedule an appointment below before arriving at the office.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Preview + Appointment Booking */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Preview Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden relative">
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-2 font-bold text-white">
                  <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span>Office Location • {office.city}, {office.province}, {office.country}</span>
                </span>
                <span className="bg-indigo-900/60 text-indigo-300 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                  {office.province}
                </span>
              </div>

              {/* Map Canvas Visual Embedded Google Map */}
              <div className="relative h-72 sm:h-96 bg-slate-900 overflow-hidden">
                <iframe
                  title="Google Maps Office Location - Arjun Singh Ghatang Desk Waling Syangja"
                  src={`https://maps.google.com/maps?q=${office.coordinates.lat},${office.coordinates.lng}&z=15&output=embed`}
                  className="w-full h-full border-0 grayscale-[20%] contrast-[110%] hover:grayscale-0 transition duration-500"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Pin Badge Overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/90 text-white px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-bold shadow-xl flex items-center gap-2 backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <div>
                    <p className="text-rose-400 font-extrabold">{office.title}</p>
                    <p className="text-[10px] text-slate-300">{office.address}, {office.city}, {office.province}</p>
                  </div>
                </div>

                {/* Quick Map Directions CTA */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transition-all hover:scale-105 z-10"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Open in Google Maps App</span>
                </a>
              </div>
            </div>

            {/* Appointment Scheduler Form */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>Schedule an Office Visit</span>
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Book a time slot to meet Arjun Singh Ghatang in New Baneshwor for academic counselling or video discussions.
              </p>

              {visitBooked ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-900 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-bold text-sm">Appointment Request Confirmed!</h4>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Your visit slot on <strong>{visitForm.date}</strong> at <strong>{visitForm.timeSlot}</strong> has been registered. We look forward to welcoming you at our New Baneshwor desk!
                  </p>
                  <button
                    onClick={() => setVisitBooked(false)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Book another time slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                        placeholder="+977 98..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Visit Date *</label>
                      <input
                        type="date"
                        required
                        value={visitForm.date}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Slot</label>
                      <select
                        value={visitForm.timeSlot}
                        onChange={(e) => setVisitForm({ ...visitForm, timeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                        <option value="03:30 PM - 04:30 PM">03:30 PM - 04:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    {isSubmitting ? 'Booking Slot...' : 'Confirm Office Visit Appointment'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
