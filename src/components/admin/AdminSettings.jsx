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
  FileText,
  Database,
  Cloud,
  RefreshCw,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminSettings() {
  const { 
    company, 
    updateCompanyDetails, 
    resetToDefaults,
    isCloudConnected,
    isSyncing,
    cloudSyncMessage,
    supabaseConfig,
    connectCloudDatabase,
    disconnectCloudDatabase,
    seedCloud
  } = useData();

  const [dbUrlInput, setDbUrlInput] = useState(supabaseConfig?.url || '');
  const [dbKeyInput, setDbKeyInput] = useState(supabaseConfig?.anonKey || '');
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null);

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

  const handleConnectDb = (e) => {
    e.preventDefault();
    if (!dbUrlInput.trim() || !dbKeyInput.trim()) {
      alert('Please provide both the Supabase Project URL and Anon API Key.');
      return;
    }
    connectCloudDatabase(dbUrlInput, dbKeyInput);
  };

  const handleDisconnectDb = () => {
    if (window.confirm('Disconnect from Supabase cloud database? The app will return to local storage mode.')) {
      disconnectCloudDatabase();
    }
  };

  const handleRunSeed = async () => {
    try {
      setSeedStatus('Seeding 43 products, 10 categories, and factory specs to Supabase...');
      await seedCloud();
      setSeedStatus('Successfully uploaded full catalogue to Supabase cloud!');
      setTimeout(() => setSeedStatus(null), 4000);
    } catch (err) {
      setSeedStatus(`Seed failed: ${err.message}`);
    }
  };

  const handleCopySqlInstructions = () => {
    const sqlText = `-- Copy content from supabase_schema.sql located in project root.`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
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
      <div className="pb-2 border-b border-[#E5E7EB]">
        <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">
          Factory Business Credentials & Settings
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5 font-medium">
          Manage factory credentials, company specs, and configure real-time cloud database synchronization.
        </p>
      </div>

      {/* CLOUD DATABASE SYNCHRONIZATION CARD */}
      <div className={`p-5 sm:p-6 rounded-2xl border shadow-xs transition-all ${
        isCloudConnected 
          ? 'bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 border-emerald-300' 
          : 'bg-white border-[#E5E7EB]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]/80">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isCloudConnected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#111827]">
                  Cloud Database Synchronization (Supabase PostgreSQL)
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isCloudConnected 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCloudConnected ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                  {isCloudConnected ? 'Live Cloud Connected' : 'Local Browser Mode'}
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isCloudConnected 
                  ? 'All product modifications, deletions, and inquiries are permanently saved in the cloud and instantly reflected across all devices in real-time.' 
                  : 'Connect your Supabase project so modifications in this admin console are permanently stored and instantly visible to all public visitors.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all cursor-pointer shrink-0"
          >
            <span>Setup Guide</span>
            {showSqlGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Setup Instructions */}
        {showSqlGuide && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-red-600" />
                <span>3-Step Supabase Cloud Database Setup</span>
              </span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-red-600 hover:underline font-bold"
              >
                <span>Open Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 leading-relaxed">
              <li>Create a free project at <strong>supabase.com</strong>.</li>
              <li>Open <strong>SQL Editor</strong> in Supabase, copy the schema from <code className="bg-white px-1.5 py-0.5 rounded border font-mono">supabase_schema.sql</code> (provided in your project root), and click <strong>Run</strong>.</li>
              <li>Go to <strong>Project Settings ➡️ API</strong>, copy your <strong>Project URL</strong> and <strong>Anon Public Key</strong>, and paste them into the fields below.</li>
            </ol>
          </div>
        )}

        {/* Connection Form */}
        <form onSubmit={handleConnectDb} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Supabase Project URL
              </label>
              <input
                type="url"
                value={dbUrlInput}
                onChange={(e) => setDbUrlInput(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#A30D20] font-mono text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Supabase Anon Key
              </label>
              <input
                type="password"
                value={dbKeyInput}
                onChange={(e) => setDbKeyInput(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#A30D20] font-mono text-slate-800"
              />
            </div>
          </div>

          {cloudSyncMessage && (
            <p className="text-[11px] text-slate-500 font-medium">
              Status: <span className="text-slate-800">{cloudSyncMessage}</span>
            </p>
          )}

          {seedStatus && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              {seedStatus}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>{isCloudConnected ? 'Update Cloud Credentials' : 'Connect & Sync Cloud Database'}</span>
            </button>

            {isCloudConnected && (
              <>
                <button
                  type="button"
                  onClick={handleRunSeed}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                  title="Uploads all 43 default catalogue models to Supabase tables"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>Seed Catalog to Cloud</span>
                </button>

                <button
                  type="button"
                  onClick={handleDisconnectDb}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Disconnect Cloud</span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#15803D] text-xs flex items-center gap-2 animate-fadeIn font-medium">
          <Check className="w-4 h-4 text-[#15803D] shrink-0 stroke-[3]" />
          <span>Business settings successfully saved and synced across public website!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Business Identity */}
        <div className="bg-white border border-[#E5E7EB] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A30D20] flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>Manufacturing Legal Entity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Company Legal Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Proprietor / Managing Director
              </label>
              <input
                type="text"
                required
                value={formData.proprietor}
                onChange={(e) => setFormData({ ...formData, proprietor: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                GSTIN (B2B Tax Registration)
              </label>
              <input
                type="text"
                required
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Official Inquiries Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111827]">
              Corporate Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
            />
          </div>
        </div>

        {/* Section 2: Contact Numbers */}
        <div className="bg-white border border-[#E5E7EB] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A30D20] flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Factory Dispatch & Sales Desk Contact Numbers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Factory Phone Hotline (Display)
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                WhatsApp Business Number (with country code, no +)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Factory Location */}
        <div className="bg-white border border-[#E5E7EB] p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A30D20] flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Manufacturing Plant Location (Kumbalgodu)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Site & Plot Number
              </label>
              <input
                type="text"
                value={formData.siteNo}
                onChange={(e) => setFormData({ ...formData, siteNo: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Industrial Estate Name
              </label>
              <input
                type="text"
                value={formData.estate}
                onChange={(e) => setFormData({ ...formData, estate: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Area / Locality
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                City & State
              </label>
              <input
                type="text"
                value={`${formData.city}, ${formData.state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setFormData({ ...formData, city: parts[0]?.trim() || formData.city, state: parts[1]?.trim() || formData.state });
                }}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827]">
                Postal Code (PIN)
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#111827]">
              Google Maps Location Link
            </label>
            <input
              type="url"
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-mono focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-red-50 text-[#64748B] hover:text-[#A30D20] border border-[#E5E7EB] hover:border-red-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save & Apply Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
