import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Filter,
  ChevronDown,
  Building2,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminInquiries() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = inq.customerName?.toLowerCase().includes(q);
        const matchesBiz = inq.businessName?.toLowerCase().includes(q);
        const matchesPhone = inq.phone?.toLowerCase().includes(q);
        const matchesProd = inq.productName?.toLowerCase().includes(q);
        if (!matchesName && !matchesBiz && !matchesPhone && !matchesProd) return false;
      }
      if (statusFilter !== 'All' && inq.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [inquiries, searchQuery, statusFilter]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete inquiry record for "${name}"?`)) {
      deleteInquiry(id);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-red-950/60 border-red-500/40 text-red-300';
      case 'In Progress':
        return 'bg-amber-950/60 border-amber-500/40 text-amber-300';
      case 'Quoted':
        return 'bg-blue-950/60 border-blue-500/40 text-blue-300';
      case 'Closed':
        return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Wholesale Inquiries Desk</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono border border-slate-700">
              {inquiries.length} Inquiries Logged
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time feed of quotations and wholesale inquiries received from public web forms and WhatsApp triggers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Customer, Business Name, Phone, or Model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="All">All Statuses ({inquiries.length})</option>
            <option value="New">New ({inquiries.filter(i => i.status === 'New').length})</option>
            <option value="In Progress">In Progress ({inquiries.filter(i => i.status === 'In Progress').length})</option>
            <option value="Quoted">Quoted ({inquiries.filter(i => i.status === 'Quoted').length})</option>
            <option value="Closed">Closed ({inquiries.filter(i => i.status === 'Closed').length})</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer & Business</th>
                <th className="py-3 px-4">Contact Channels</th>
                <th className="py-3 px-4">Product & Quantity</th>
                <th className="py-3 px-4">Inquiry Notes</th>
                <th className="py-3 px-4">Status & Follow-up</th>
                <th className="py-3 px-4 text-right">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => {
                  const phoneRaw = inq.phone?.replace(/[^0-9]/g, '') || '';
                  const whatsappUrl = `https://wa.me/${phoneRaw}?text=Hello%20${encodeURIComponent(inq.customerName)}%2C%20this%20is%20Shri%20Metro%20Products%20following%20up%20on%20your%20wholesale%20inquiry.`;
                  
                  return (
                    <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Date */}
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {inq.date ? new Date(inq.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Recent'}
                      </td>

                      {/* Customer & Business */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-white text-xs">{inq.customerName}</p>
                        {inq.businessName && (
                          <p className="text-[11px] text-amber-400/90 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 shrink-0" />
                            <span>{inq.businessName}</span>
                          </p>
                        )}
                      </td>

                      {/* Contacts */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {inq.phone && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700"
                              title="Click to call"
                            >
                              <Phone className="w-3 h-3 text-amber-400" />
                              <span>{inq.phone}</span>
                            </a>
                          )}
                          {phoneRaw && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Product & Quantity */}
                      <td className="py-3 px-4 max-w-[200px]">
                        <p className="font-semibold text-slate-200 text-xs truncate" title={inq.productName}>
                          {inq.productName || 'Wholesale Catalog Mix'}
                        </p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 font-bold text-[10px]">
                          {inq.quantity ? `${inq.quantity} Units` : 'Bulk Lot'}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="py-3 px-4 max-w-[240px]">
                        <p className="text-[11px] text-slate-400 line-clamp-2" title={inq.message}>
                          {inq.message || 'Standard wholesale inquiry submitted.'}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className={`px-2 py-1 rounded-lg border text-[11px] font-bold focus:outline-none cursor-pointer ${getStatusBadge(inq.status)}`}
                        >
                          <option value="New" className="bg-slate-900 text-red-300">New</option>
                          <option value="In Progress" className="bg-slate-900 text-amber-300">In Progress</option>
                          <option value="Quoted" className="bg-slate-900 text-blue-300">Quoted</option>
                          <option value="Closed" className="bg-slate-900 text-emerald-300">Closed</option>
                        </select>
                      </td>

                      {/* Delete */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id, inq.customerName)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No inquiries logged yet or matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
