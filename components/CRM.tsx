
import React, { useState, useRef } from 'react';
import { MOCK_LEADS, MOCK_CUSTOMERS } from '../constants';
import { Lead, InventoryItem } from '../types';

const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'customers' | 'products'>('leads');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  
  const [products, setProducts] = useState<InventoryItem[]>([
    { id: 'PRD-CRM-01', name: 'Paket Bundling Retail', category: 'Software', stock: 100, bufferStock: 10, barcode: '8850123456', unit: 'Lisensi', priceRetail: 5000000, priceDistributor: 4200000, status: 'In Stock' },
    { id: 'PRD-CRM-02', name: 'Custom Module ERP', category: 'Service', stock: 5, bufferStock: 10, barcode: 'SRV-9921', unit: 'Mandays', priceRetail: 2500000, priceDistributor: 2000000, status: 'Low Stock' },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [leadFormData, setLeadFormData] = useState({
    name: '',
    company: '',
    value: '',
    source: 'Website'
  });

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: 'Software',
    barcode: '',
    stock: '',
    bufferStock: '10',
    unit: 'Unit',
    priceRetail: '',
    priceDistributor: ''
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `LD-00${leads.length + 1}`,
      name: leadFormData.name,
      company: leadFormData.company,
      value: parseInt(leadFormData.value) || 0,
      status: 'New',
      source: leadFormData.source
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
    setLeadFormData({ name: '', company: '', value: '', source: 'Website' });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stockVal = parseInt(productFormData.stock) || 0;
    const bufferVal = parseInt(productFormData.bufferStock) || 0;
    
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (stockVal <= 0) status = 'Out of Stock';
    else if (stockVal <= bufferVal) status = 'Low Stock';

    const newProduct: InventoryItem = {
      id: `PRD-CRM-0${products.length + 1}`,
      name: productFormData.name,
      category: productFormData.category,
      barcode: productFormData.barcode,
      stock: stockVal,
      bufferStock: bufferVal,
      unit: productFormData.unit,
      priceRetail: parseInt(productFormData.priceRetail) || 0,
      priceDistributor: parseInt(productFormData.priceDistributor) || 0,
      status: status
    };
    setProducts([newProduct, ...products]);
    setIsProductModalOpen(false);
    setProductFormData({ name: '', category: 'Software', barcode: '', stock: '', bufferStock: '10', unit: 'Unit', priceRetail: '', priceDistributor: '' });
  };

  const downloadTemplate = () => {
    const headers = ["Nama Produk", "Barcode", "Kategori", "Stok", "Buffer Stock", "Satuan", "Harga Retail", "Harga Distributor"];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_produk_crm_pro.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-2xl w-full sm:w-fit shadow-inner">
        {['leads', 'customers', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 sm:flex-none px-6 py-2.5 text-xs md:text-sm font-black rounded-xl transition-all capitalize ${activeTab === tab ? 'bg-white shadow-lg text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
          >
            {tab === 'leads' ? 'Prospek' : tab === 'customers' ? 'Pelanggan' : 'Produk & Stok'}
          </button>
        ))}
      </div>

      {activeTab === 'leads' && (
        <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-300">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
              <h3 className="text-base md:text-lg font-bold text-slate-800">Pipeline Penjualan</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95"
              >
                + Lead Baru
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-y border-slate-100">
                  <tr>
                    <th className="px-4 py-4">Prospek</th>
                    <th className="px-4 py-4 hidden md:table-cell">Estimasi Nilai</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-slate-800">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.company}</p>
                      </td>
                      <td className="px-4 py-4 text-sm font-black text-slate-900 hidden md:table-cell">Rp {lead.value.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 text-[9px] font-black rounded-lg uppercase tracking-wider bg-blue-100 text-blue-700">{lead.status}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-blue-600 text-[10px] font-black uppercase">LOG</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in duration-300">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-6">Basis Pelanggan Aktif</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {MOCK_CUSTOMERS.map(customer => (
              <div key={customer.id} className="p-5 border-2 border-slate-50 rounded-3xl hover:border-blue-200 transition-all bg-slate-50/30">
                <h4 className="font-bold text-slate-800 text-base mb-1 truncate">{customer.name}</h4>
                <p className="text-xs text-slate-500 mb-5">{customer.email}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-lg">{customer.tier}</span>
                  <button className="py-1.5 px-4 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">Profil</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
            <div className="flex space-x-2 w-full sm:w-auto">
              <button 
                onClick={() => setIsProductModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                + Produk
              </button>
              <button 
                onClick={() => setIsImportOpen(!isImportOpen)}
                className={`flex-1 sm:flex-none px-4 py-2 border rounded-xl text-sm font-bold transition-all ${isImportOpen ? 'bg-slate-800 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {isImportOpen ? 'Batal' : 'Import'}
              </button>
            </div>
            <button onClick={downloadTemplate} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
              Unduh Template Excel
            </button>
          </div>

          {isImportOpen && (
            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-dashed border-blue-200 text-center animate-in slide-in-from-top-4">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                </div>
                <h4 className="text-sm font-black text-blue-900 mb-2">Smart Import System</h4>
                <p className="text-xs text-blue-600 mb-6">Mendukung multi-unit, barcode, dan konversi otomatis.</p>
                <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx" />
                <button onClick={() => fileInputRef.current?.click()} className="bg-white px-6 py-2.5 rounded-xl text-xs font-black shadow-sm text-blue-600 border border-blue-200 uppercase tracking-widest">Pilih File</button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Barcode & Produk</th>
                    <th className="px-6 py-4">Stok / Buffer</th>
                    <th className="px-6 py-4">Harga Retail</th>
                    <th className="px-6 py-4">Harga Dist.</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-[10px] font-mono font-bold text-slate-400 mb-0.5">{product.barcode || 'NO-BARCODE'}</p>
                        <p className="text-sm font-bold text-slate-800">{product.name}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{product.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-black text-slate-900">{product.stock} {product.unit}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">Buffer: {product.bufferStock} {product.unit}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">Rp {product.priceRetail.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-bold text-orange-600">Rp {product.priceDistributor.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 text-[8px] font-black rounded-full uppercase ${
                          product.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                          product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Lead Baru (Sederhana) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">
            <h3 className="text-xl font-black mb-6">Tambah Prospek</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Nama Lengkap" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={leadFormData.name}
                onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})}
              />
              <input 
                type="text" placeholder="Perusahaan" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={leadFormData.company}
                onChange={(e) => setLeadFormData({...leadFormData, company: e.target.value})}
              />
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Simpan Prospek</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Produk & Stok (The core of your request) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Formulir Produk CRM</h3>
                  <p className="text-xs text-slate-500 mt-1">Lengkapi detail untuk Smart Inventory & Barcoding.</p>
                </div>
                <button 
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nama Produk</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Contoh: Paket Lisensi ERP"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none text-sm font-bold"
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Barcode (Opsional)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Scan atau Ketik..."
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none text-sm font-bold pr-10"
                        value={productFormData.barcode}
                        onChange={(e) => setProductFormData({...productFormData, barcode: e.target.value})}
                      />
                      <svg className="w-5 h-5 absolute right-3 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kategori</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold appearance-none"
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                    >
                      <option>Software</option>
                      <option>Service</option>
                      <option>Hardware</option>
                      <option>Bundling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Satuan Dasar</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold appearance-none"
                      value={productFormData.unit}
                      onChange={(e) => setProductFormData({...productFormData, unit: e.target.value})}
                    >
                      <option>Unit</option>
                      <option>Lisensi</option>
                      <option>Mandays</option>
                      <option>Pack</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Stok Awal</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold"
                      value={productFormData.stock}
                      onChange={(e) => setProductFormData({...productFormData, stock: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Buffer Stock (Peringatan)</label>
                    <input 
                      type="number" 
                      placeholder="10"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold"
                      value={productFormData.bufferStock}
                      onChange={(e) => setProductFormData({...productFormData, bufferStock: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1.5 ml-1">Harga Jual Retail (Rp)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0"
                      className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none text-sm font-bold"
                      value={productFormData.priceRetail}
                      onChange={(e) => setProductFormData({...productFormData, priceRetail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1.5 ml-1">Harga Distributor (Rp)</label>
                    <input 
                      required
                      type="number" 
                      placeholder="0"
                      className="w-full px-4 py-3 bg-orange-50/50 border-2 border-orange-100 rounded-2xl focus:border-orange-500 focus:bg-white outline-none text-sm font-bold"
                      value={productFormData.priceDistributor}
                      onChange={(e) => setProductFormData({...productFormData, priceDistributor: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button 
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 text-xs font-black rounded-2xl uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-2 py-3 bg-blue-600 text-white text-xs font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all uppercase tracking-widest"
                  >
                    Simpan Produk ERP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRM;
