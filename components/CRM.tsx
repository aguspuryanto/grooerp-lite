
import React, { useState } from 'react';
import { MOCK_LEADS, MOCK_CUSTOMERS } from '../constants';

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'customers'>('leads');

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'leads' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Prospek (Leads)
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'customers' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Basis Pelanggan
        </button>
      </div>

      {activeTab === 'leads' ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Pipeline Penjualan</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Lead Baru</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-center">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Total Prospek</p>
                <p className="text-2xl font-black text-blue-900">42</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">Qualified</p>
                <p className="text-2xl font-black text-green-900">18</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Potensi Nilai</p>
                <p className="text-lg font-black text-orange-900">Rp 4.2 M</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-600 uppercase mb-1">Win Rate</p>
                <p className="text-2xl font-black text-slate-900">32%</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-y border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Nama Prospek</th>
                    <th className="px-6 py-4">Perusahaan</th>
                    <th className="px-6 py-4">Estimasi Nilai</th>
                    <th className="px-6 py-4">Sumber</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_LEADS.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{lead.company}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">Rp {lead.value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{lead.source}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${
                          lead.status === 'Qualified' ? 'bg-green-100 text-green-700' :
                          lead.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:underline text-xs font-bold">Log Aktivitas</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Daftar Pelanggan Aktif</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="Cari pelanggan..." className="px-4 py-2 border rounded-lg text-sm" />
              <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200">Export</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CUSTOMERS.map(customer => (
              <div key={customer.id} className="p-6 border border-slate-100 rounded-2xl hover:border-blue-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600">
                    {customer.name.charAt(0)}
                  </div>
                  <span className={`px-2 py-1 text-[8px] font-black rounded-md uppercase tracking-tighter ${
                    customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    customer.tier === 'Silver' ? 'bg-slate-200 text-slate-600' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {customer.tier} Partner
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-1">{customer.name}</h4>
                <p className="text-xs text-slate-500 mb-4">{customer.email}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-4">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-slate-400 uppercase font-bold">Total Transaksi</p>
                    <p className="font-bold text-slate-700">Rp {(customer.totalSpent / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-slate-400 uppercase font-bold">Interaksi</p>
                    <p className="font-bold text-slate-700">{customer.lastInteraction}</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-slate-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">Lihat Profil</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
