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
        return 'bg-red-50 border-red-200 text-[#A30D20]';
      case 'In Progress':
        return 'bg-amber-50 border-amber-200 text-[#B45309]';
      case 'Quoted':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'Closed':
        return 'bg-emerald-50 border-emerald-200 text-[#15803D]';
      default:
        return 'bg-[#F5F6F8] border-[#E5E7EB] text-[#111827]';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827] tracking-tight flex items-center gap-2">
            <span>Wholesale Inquiries Desk</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-50 text-[#A30D20] font-semibold border border-red-200/80">
              {inquiries.length} Inquiries Logged
            </span>
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">
            Real-time feed of quotations and wholesale inquiries received from public web forms and WhatsApp triggers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E7EB] p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Customer, Business Name, Phone, or Model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs text-[#111827] font-medium focus:bg-white focus:outline-none focus:border-[#A30D20] cursor-pointer"
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
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-xs">
            <thead className="bg-[#F5F6F8] text-[#64748B] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer & Business</th>
                <th className="py-3.5 px-4">Contact Channels</th>
                <th className="py-3.5 px-4">Product & Quantity</th>
                <th className="py-3.5 px-4">Inquiry Notes</th>
                <th className="py-3.5 px-4">Status & Follow-up</th>
                <th className="py-3.5 px-4 text-right">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => {
                  const phoneRaw = inq.phone?.replace(/[^0-9]/g, '') || '';
                  const whatsappUrl = `https://wa.me/${phoneRaw}?text=Hello%20${encodeURIComponent(inq.customerName)}%2C%20this%20is%20Shri%20Metro%20Products%20following%20up%20on%20your%20wholesale%20inquiry.`;
                  
                  return (
                    <tr key={inq.id} className="hover:bg-[#F5F6F8]/60 transition-colors">
                      {/* Date */}
                      <td className="py-3 px-4 whitespace-nowrap text-[#64748B] font-mono text-[11px]">
                        {inq.date ? new Date(inq.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Recent'}
                      </td>

                      {/* Customer & Business */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#111827] text-xs">{inq.customerName}</p>
                        {inq.businessName && (
                          <p className="text-[11px] text-[#64748B] font-medium flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 shrink-0 text-[#64748B]" />
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
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F6F8] hover:bg-slate-200 text-[#111827] text-[11px] border border-[#E5E7EB] font-medium transition-colors"
                              title="Click to call"
                            >
                              <Phone className="w-3 h-3 text-[#64748B]" />
                              <span>{inq.phone}</span>
                            </a>
                          )}
                          {phoneRaw && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#15803D] transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Product & Quantity */}
                      <td className="py-3 px-4 max-w-[200px]">
                        <p className="font-bold text-[#111827] text-xs truncate" title={inq.productName}>
                          {inq.productName || 'Wholesale Catalog Mix'}
                        </p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-red-50 border border-red-200/80 text-[#A30D20] font-bold text-[10px]">
                          {inq.quantity ? `${inq.quantity} Units` : 'Bulk Lot'}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="py-3 px-4 max-w-[240px]">
                        <p className="text-[11px] text-[#64748B] line-clamp-2" title={inq.message}>
                          {inq.message || 'Standard wholesale inquiry submitted.'}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold focus:outline-none cursor-pointer ${getStatusBadge(inq.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      {/* Delete */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id, inq.customerName)}
                          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#A30D20] hover:bg-red-50 transition-colors cursor-pointer"
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
                  <td colSpan={7} className="py-12 text-center text-[#64748B]">
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
