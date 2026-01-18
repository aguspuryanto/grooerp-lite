
import React, { useState, useRef } from 'react';
import { InventoryItem, Location } from '../types';

const mockLocations: Location[] = [
  { id: 'WH-001', name: 'Gudang Pusat (Jakarta)', type: 'Warehouse', address: 'Jakarta Industrial Estate' },
  { id: 'OUT-001', name: 'Ramayana Dept Store', type: 'Outlet', address: 'Blok M' },
  { id: 'OUT-002', name: 'Transmart (Surabaya)', type: 'Outlet', address: 'Surabaya City' },
];

const mockInventory: InventoryItem[] = [
  { 
    id: 'PRD-001', 
    name: 'Semen Padang 50kg', 
    category: 'Material', 
    stock: 450, 
    locationStocks: [
      { locationId: 'WH-001', stock: 400 },
      { locationId: 'OUT-001', stock: 50 }
    ],
    unit: 'Zak', 
    priceRetail: 65000, 
    priceDistributor: 60000, 
    status: 'In Stock' 
  },
  { 
    id: 'PRD-002', 
    name: 'Besi Beton 10mm', 
    category: 'Material', 
    stock: 12, 
    unit: 'Batang', 
    priceRetail: 95000, 
    priceDistributor: 88000, 
    status: 'Low Stock' 
  },
];

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Material',
    stock: '',
    unit: 'Unit',
    priceRetail: '',
    priceDistributor: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stockVal = parseInt(formData.stock) || 0;
    const newItem: InventoryItem = {
      id: `PRD-00${items.length + 1}`,
      name: formData.name,
      category: formData.category,
      stock: stockVal,
      unit: formData.unit,
      priceRetail: parseInt(formData.priceRetail) || 0,
      priceDistributor: parseInt(formData.priceDistributor) || 0,
      status: stockVal > 20 ? 'In Stock' : (stockVal > 0 ? 'Low Stock' : 'Out of Stock')
    };
    setItems([newItem, ...items]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Distribution Status Summary (Case Study Inspired) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-200">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Total Outlet Konsinyasi</p>
          <p className="text-2xl font-black">157 <span className="text-xs font-normal">Lokasi</span></p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stok Tertahan di Outlet</p>
          <p className="text-2xl font-black text-slate-800">4,280 <span className="text-xs font-normal text-slate-400">Unit</span></p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Distributor Aktif</p>
          <p className="text-2xl font-black text-slate-800">25 <span className="text-xs font-normal text-slate-400">Mitra</span></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div className="flex space-x-2 w-full sm:w-auto">
          <button onClick={() => setIsModalOpen(true)} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            + Produk
          </button>
          <button onClick={() => setIsTransferOpen(true)} className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-all">
            Transfer Stok
          </button>
          <button onClick={() => setIsImportOpen(!isImportOpen)} className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">
            Import
          </button>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="hidden md:inline text-xs text-slate-500 font-bold uppercase tracking-wider">Lokasi:</span>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full sm:w-64 bg-slate-100 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none cursor-pointer"
          >
            <option value="all">Semua Gudang & Outlet</option>
            {mockLocations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name} ({loc.type})</option>
            ))}
          </select>
        </div>
      </div>

      {isImportOpen && (
        <div className="bg-blue-50 p-6 rounded-3xl border-2 border-dashed border-blue-200 animate-in slide-in-from-top-4">
           <div className="text-center">
             <h3 className="text-lg font-black text-blue-900">Upload Data Konsinyasi</h3>
             <p className="text-xs text-blue-600 mb-4">Pastikan SKU sesuai untuk sinkronisasi otomatis antar cabang.</p>
             <button onClick={() => fileInputRef.current?.click()} className="bg-white px-6 py-2 rounded-xl text-xs font-black shadow-sm text-blue-600">PILIH FILE CSV/XLSX</button>
             <input type="file" ref={fileInputRef} className="hidden" />
           </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">SKU</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Produk</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Stok</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Distribusi</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Harga Retail</th>
                <th className="px-4 md:px-6 py-4 text-center">Lacak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-4 md:px-6 py-4 text-xs font-mono text-slate-500">{item.id}</td>
                  <td className="px-4 md:px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.category}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm font-black text-slate-900">{item.stock} {item.unit}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex -space-x-2">
                      {item.locationStocks?.map((ls, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-blue-600" title={`LID: ${ls.locationId}`}>
                          {ls.stock}
                        </div>
                      ))}
                      {(!item.locationStocks || item.locationStocks.length === 0) && <span className="text-xs text-slate-300 italic">Belum terdistribusi</span>}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm font-bold">Rp {item.priceRetail.toLocaleString()}</td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.171-1.815l.482-.241m0 0l6.347 3.174m-6.347-3.174L12 7l6.347-3.174m0 0l.482.241A2 2 0 0121 5.618v9.764a2 2 0 01-1.171 1.815L15 20m-3-13v13m0-13l6.347-3.174m-6.347 3.174L5.653 3.826"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simplified Modal for Stock Transfer (Addressing missing items) */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <h3 className="text-xl font-black mb-4">Stock Transfer (Mutasi Barang)</h3>
            <div className="space-y-4">
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                <option>Dari: Gudang Pusat</option>
              </select>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                <option>Ke: Ramayana Dept Store (Konsinyasi)</option>
              </select>
              <input type="number" placeholder="Jumlah (Unit)" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none" />
              <button onClick={() => setIsTransferOpen(false)} className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Konfirmasi Transfer</button>
              <button onClick={() => setIsTransferOpen(false)} className="w-full py-2 text-slate-400 font-bold text-xs uppercase">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
