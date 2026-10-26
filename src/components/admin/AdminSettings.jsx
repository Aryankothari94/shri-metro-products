import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Check, 
  ShieldCheck, 
  RotateCcw, 
  AlertTriangle,
  Mail,
  FileText
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminSettings() {
  const { company, updateCompanyDetails, resetToDefaults } = useData();

  const [formData, setFormData] = useState({
    name: company.name || 'SHRI METRO PRODUCTS',
    tagline: company.tagline || '',
    subtitle: company.subtitle || '',
    proprietor: company.proprietor || 'Rakesh R Jain',
    phone: company.phone || '+91 9845287888',
    phoneRaw: company.phoneRaw || '+919845287888',
    whatsappNumber: company.whatsappNumber || '919845287888',
    email: company.email || 'info@shrimetroproducts.com',
    gstin: company.gstin || '29AKZPJ1388F1ZH',
    estate: company.location?.estate || 'Vaishno Devi Industrial Estate',
    siteNo: company.location?.siteNo || 'Site no: 10, 11',
    area: company.location?.area || 'Gerupalya, Kumbalgodu',
    city: company.location?.city || 'Bangalore',
    state: company.location?.state || 'Karnataka',
    pincode: company.location?.pincode || '560074',
    googleMapsUrl: company.location?.googleMapsUrl || 'https://maps.google.com/?q=Vaishno+Devi+Industrial+Estate+Kumbalgodu+Bangalore+560074'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompanyDetails({
      name: formData.name,
      tagline: formData.tagline,
      subtitle: formData.subtitle,
      proprietor: formData.proprietor,
      phone: formData.phone,
      phoneRaw: formData.phoneRaw || formData.phone.replace(/[^0-9+]/g, ''),
      whatsappNumber: formData.whatsappNumber || formData.phone.replace(/[^0-9]/g, ''),
      whatsappLink: `https://wa.me/${formData.whatsappNumber || formData.phone.replace(/[^0-9]/g, '')}?text=Hello%20Shri%20Metro%20Products%2C%20I%20would%20like%20to%20inquire%20about%20your%20furniture%20products.`,
      email: formData.email,
      gstin: formData.gstin,
      location: {
        siteNo: formData.siteNo,
        estate: formData.estate,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        fullAddress: `${formData.siteNo} ${formData.area}, ${formData.estate}, ${formData.city} - ${formData.pincode}`,
        googleMapsUrl: formData.googleMapsUrl
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('WARNING: This will reset all products, categories, company details, and inquiries back to the original factory default seeds. Are you absolutely sure?')) {
      resetToDefaults();
      alert('All catalog data has been reset to factory defaults.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans max-w-4xl">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl font-black text-white tracking-tight">
          Factory Business Credentials & Settings
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          These details dynamically populate across the public website (Navbar, Footer, Contact Page, and B2B invoices).
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
          <span>Business settings successfully saved and synced across public website!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Business Identity */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Manufacturing Legal Entity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Company Legal Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Proprietor / Managing Director
              </label>
              <input
                type="text"
                required
                value={formData.proprietor}
                onChange={(e) => setFormData({ ...formData, proprietor: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                GSTIN (B2B Tax Registration)
              </label>
              <input
                type="text"
                required
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Official Inquiries Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Corporate Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Section 2: Contact Numbers */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Factory Dispatch & Sales Desk Contact Numbers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Factory Phone Hotline (Display)
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                WhatsApp Business Number (with country code, no +)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Factory Location */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Manufacturing Plant Location (Kumbalgodu)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Site & Plot Number
              </label>
              <input
                type="text"
                value={formData.siteNo}
                onChange={(e) => setFormData({ ...formData, siteNo: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Industrial Estate Name
              </label>
              <input
                type="text"
                value={formData.estate}
                onChange={(e) => setFormData({ ...formData, estate: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Area / Locality
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                City & State
              </label>
              <input
                type="text"
                value={`${formData.city}, ${formData.state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setFormData({ ...formData, city: parts[0]?.trim() || formData.city, state: parts[1]?.trim() || formData.state });
                }}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Postal Code (PIN)
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Google Maps Location Link
            </label>
            <input
              type="url"
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-950/80 text-slate-400 hover:text-red-400 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save & Apply Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
