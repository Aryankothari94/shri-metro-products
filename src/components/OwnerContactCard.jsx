import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  Clock,
  Send
} from 'lucide-react';
import { companyDetails } from '../data/companyData';

export default function OwnerContactCard() {
  const [copiedGstin, setCopiedGstin] = useState(false);

  const handleCopyGstin = () => {
    navigator.clipboard.writeText(companyDetails.gstin);
    setCopiedGstin(true);
    setTimeout(() => setCopiedGstin(false), 2500);
  };

  return (
    <section id="contact-card" className="py-16 sm:py-24 bg-brand-bg scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-primary tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Direct Management Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mt-2">
            Speak Directly With The Manufacturer
          </h2>
          <p className="text-slate-600 text-sm mt-1.5">
            No distributors, middlemen, or brokers. Fast quotes, container dispatches, and OEM inquiries.
          </p>
        </div>

        {/* Featured Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column: Owner Profile & Direct Actions */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <UserCheck className="w-3.5 h-3.5" />
                    Proprietor & Works Head
                  </span>
                  <span className="text-xs text-slate-400">• Karnataka Unit</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                  {companyDetails.proprietor}
                </h3>
                <p className="text-sm font-semibold text-brand-primary mt-0.5">
                  SHRI METRO PRODUCTS • Bangalore
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                  "We believe in zero compromises on resin quality. Whether you need 50 chairs for an auditorium or 5,000 chairs for district distribution, get direct factory gate rates and swift dispatch."
                </p>

                {/* Direct Action Triggers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {/* WhatsApp */}
                  <a
                    href={companyDetails.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 transition-all hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Owner</span>
                  </a>

                  {/* Direct Call */}
                  <a
                    href={`tel:${companyDetails.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-dark hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call: {companyDetails.phone}</span>
                  </a>
                </div>
              </div>

              {/* Working Hours & Availability */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Factory Hours: Monday - Saturday (9:00 AM - 7:30 PM IST)</span>
              </div>
            </div>

            {/* Right Column: Factory Location & GSTIN Details */}
            <div className="md:col-span-5 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Works & Plant Location
                </span>

                <div className="flex items-start gap-3 mt-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-200 space-y-1">
                    <p className="font-bold text-white text-base">{companyDetails.location.siteNo}</p>
                    <p>{companyDetails.location.estate}</p>
                    <p>{companyDetails.location.area}</p>
                    <p className="font-semibold text-slate-300">
                      {companyDetails.location.city} - {companyDetails.location.pincode}
                    </p>
                  </div>
                </div>

                <a
                  href={companyDetails.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold underline decoration-amber-400/50 underline-offset-4"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* GSTIN Verification Box */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified GSTIN
                    </span>
                    <button
                      onClick={handleCopyGstin}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedGstin ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-sm tracking-wider text-amber-300 font-bold">
                    {companyDetails.gstin}
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                Direct billing with Input Tax Credit (ITC) available for all corporate & B2B buyers.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
