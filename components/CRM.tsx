
import React, { useState } from 'react';
import { MOCK_LEADS, MOCK_CUSTOMERS } from '../constants';

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'customers'>('leads');

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-2xl w-full sm:w-fit shadow-inner">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex-1 sm:flex-none px-6 py-2.5 text-xs md:text-sm font-black rounded-xl transition-all ${activeTab === 'leads' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Prospek (Leads)
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`flex-1 sm:flex-none px-6 py-2.5 text-xs md:text-sm font-black rounded-xl transition-all ${activeTab === 'customers' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Pelanggan
        </button>
      </div>

      {activeTab === 'leads' ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
              <h3 className="text-base md:text-lg font-bold text-slate-800">Pipeline Penjualan</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">+ Lead Baru</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-wider">Total</p>
                <p className="text-xl md:text-2xl font-black text-blue-900">42</p>
              </div>
              <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-black text-green-600 uppercase mb-1 tracking-wider">Qualified</p>
                <p className="text-xl md:text-2xl font-black text-green-900">18</p>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-black text-orange-600 uppercase mb-1 tracking-wider">Potensi</p>
                <p className="text-base md:text-lg font-black text-orange-900">Rp 4.2M</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-black text-slate-600 uppercase mb-1 tracking-wider">Win Rate</p>
                <p className="text-xl md:text-2xl font-black text-slate-900">32%</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-y border-slate-100">
                  <tr>
                    <th className="px-4 py-4 whitespace-nowrap">Prospek</th>
                    <th className="px-4 py-4 whitespace-nowrap hidden md:table-cell">Estimasi Nilai</th>
                    <th className="px-4 py-4 whitespace-nowrap">Status</th>
                    <th className="px-4 py-4 whitespace-nowrap text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_LEADS.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-4 py-4 min-w-[150px]">
                        <p className="text-sm font-bold text-slate-800">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company}</p>
                        <span className="text-[10px] font-bold text-blue-600 md:hidden">Rp {(lead.value/1000000).toFixed(1)}M</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-black text-slate-900 hidden md:table-cell">Rp {lead.value.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-[9px] font-black rounded-lg uppercase tracking-wider ${
                          lead.status === 'Qualified' ? 'bg-green-100 text-green-700' :
                          lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-blue-600 hover:text-blue-800 text-[10px] font-black uppercase tracking-widest">LOG</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-base md:text-lg font-bold text-slate-800">Basis Pelanggan Aktif</h3>
            <div className="flex space-x-2 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Cari..." 
                className="flex-1 md:w-48 px-4 py-2 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button className="p-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 border border-slate-200 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {MOCK_CUSTOMERS.map(customer => (
              <div key={customer.id} className="p-5 border-2 border-slate-50 rounded-3xl hover:border-blue-200 transition-all group bg-slate-50/30">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    {customer.name.charAt(0)}
                  </div>
                  <span className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-tighter ${
                    customer.tier === 'Gold' ? 'bg-yellow-400 text-yellow-900 shadow-sm shadow-yellow-200' :
                    customer.tier === 'Silver' ? 'bg-slate-300 text-slate-700' :
                    'bg-orange-400 text-white'
                  }`}>
                    {customer.tier} Partner
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-base mb-1 truncate">{customer.name}</h4>
                <p className="text-xs text-slate-500 mb-5 truncate">{customer.email}</p>
                <div className="grid grid-cols-2 gap-3 text-[10px] mb-6">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100">
                    <p className="text-slate-400 uppercase font-black tracking-tighter mb-1 leading-none">Total Nilai</p>
                    <p className="font-black text-slate-700 text-xs">Rp {(customer.totalSpent / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-100">
                    <p className="text-slate-400 uppercase font-black tracking-tighter mb-1 leading-none">Terakhir</p>
                    <p className="font-black text-slate-700 text-xs">{new Date(customer.lastInteraction).toLocaleDateString('id-ID', {month: 'short', day: 'numeric'})}</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-blue-600 text-white text-[10px] font-black rounded-2xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all uppercase tracking-widest">
                  Detail Profil
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
