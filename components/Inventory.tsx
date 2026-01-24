
import React, { useState, useRef, useEffect } from 'react';
import { InventoryItem, Location } from '../types';
import { supabase, isSupabaseConfigured, handleSupabaseError } from '../supabase';

const mockLocations: Location[] = [
  { id: 'WH-001', name: 'Gudang Pusat (Jakarta)', type: 'Warehouse', address: 'Jakarta Industrial Estate' },
  { id: 'OUT-001', name: 'Ramayana Dept Store', type: 'Outlet', address: 'Blok M' },
  { id: 'OUT-002', name: 'Transmart (Surabaya)', type: 'Outlet', address: 'Surabaya City' },
];

const INITIAL_MOCK_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Kertas A4 80gr', category: 'Material', stock: 150, unit: 'Rim', priceRetail: 55000, priceDistributor: 48000, status: 'In Stock' },
  { id: '2', name: 'Tinta HP 680 Black', category: 'Elektronik', stock: 12, unit: 'Unit', priceRetail: 125000, priceDistributor: 110000, status: 'Low Stock' },
  { id: '3', name: 'Laptop Pro-X1', category: 'Elektronik', stock: 0, unit: 'Unit', priceRetail: 15000000, priceDistributor: 13500000, status: 'Out of Stock' },
];

const Inventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_MOCK_ITEMS);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Material',
    stock: '',
    unit: 'Unit',
    priceRetail: '',
    priceDistributor: ''
  });

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchInventory();
      
      const channel = supabase
        .channel('inventory-changes')
        // Fix: Added missing 'schema' property to the filter object to satisfy Supabase Realtime types.
        .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, () => {
          fetchInventory();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setLoading(false);
    }
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setItems(data as any);
        setIsDemoMode(false);
      }
    } catch (error: any) {
      const isFetchError = handleSupabaseError(error);
      if (isFetchError) {
        console.log("Switching to Demo Mode due to connection failure.");
        setIsDemoMode(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stockVal = parseInt(formData.stock) || 0;
    
    const newItem: Partial<InventoryItem> & { price_retail?: number, price_distributor?: number } = {
      name: formData.name,
      category: formData.category,
      stock: stockVal,
      unit: formData.unit,
      price_retail: parseInt(formData.priceRetail) || 0,
      price_distributor: parseInt(formData.priceDistributor) || 0,
      status: stockVal > 20 ? 'In Stock' : (stockVal > 0 ? 'Low Stock' : 'Out of Stock')
    };

    if (!isDemoMode && isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('inventory').insert([newItem]);
        if (error) throw error;
        setIsModalOpen(false);
        setFormData({ name: '', category: 'Material', stock: '', unit: 'Unit', priceRetail: '', priceDistributor: '' });
      } catch (error) {
        handleSupabaseError(error);
        // Fallback to local if insert fails
        addLocalItem(newItem);
      }
    } else {
      addLocalItem(newItem);
    }
  };

  const addLocalItem = (item: any) => {
    const localItem: InventoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name,
      category: item.category,
      stock: item.stock,
      unit: item.unit,
      priceRetail: item.price_retail || 0,
      priceDistributor: item.price_distributor || 0,
      status: item.status
    };
    setItems([localItem, ...items]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Material', stock: '', unit: 'Unit', priceRetail: '', priceDistributor: '' });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg shadow-blue-200">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total SKU Terdaftar</p>
          <p className="text-3xl font-black">{loading ? '...' : items.length} <span className="text-xs font-normal">Produk</span></p>
        </div>
        <div className={`p-6 rounded-3xl border ${isDemoMode ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Koneksi Data</p>
          <div className="flex items-center space-x-2">
             <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`}></span>
             <p className={`text-sm font-black tracking-tight uppercase ${isDemoMode ? 'text-amber-700' : 'text-slate-800'}`}>
               {isDemoMode ? 'Mode Demo (Offline)' : 'Cloud Aktif'}
             </p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stok Rendah</p>
          <p className="text-2xl font-black text-red-600">{items.filter(i => i.status === 'Low Stock').length} <span className="text-xs font-normal text-slate-400">Peringatan</span></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div className="flex space-x-2 w-full sm:w-auto">
          <button onClick={() => setIsModalOpen(true)} className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            + Tambah Produk
          </button>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full sm:w-64 bg-slate-100 border-none rounded-xl text-xs font-bold px-4 py-2.5 outline-none cursor-pointer"
          >
            <option value="all">Filter: Semua Lokasi</option>
            {mockLocations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">ID / SKU</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Informasi Produk</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Stok</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Harga Retail</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && !isDemoMode ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">Menghubungkan ke database...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">Belum ada data tersedia.</td>
                </tr>
              ) : items.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">#{item.id.toString().slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <span className="text-[10px] text-blue-600 font-black uppercase tracking-tighter">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900">{item.stock} {item.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">Rp {(item.priceRetail || item.price_retail || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[8px] font-black rounded-lg uppercase ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                      item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-xl font-black text-slate-800 mb-6">Tambah Produk {isDemoMode ? '(Lokal)' : '(Cloud)'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nama Barang</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 font-bold text-sm" placeholder="Nama Produk..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Kategori</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm">
                      <option>Material</option>
                      <option>Elektronik</option>
                      <option>Layanan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Stok Awal</label>
                    <input required name="stock" type="number" value={formData.stock} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm" placeholder="0" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1.5 ml-1">Harga Retail (Rp)</label>
                  <input required name="priceRetail" type="number" value={formData.priceRetail} onChange={handleInputChange} className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-2xl outline-none font-bold text-sm" placeholder="0" />
                </div>
                <div className="pt-4 flex space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-500 font-black text-xs uppercase tracking-widest">Batal</button>
                  <button type="submit" className="flex-2 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20">
                    {isDemoMode ? 'Simpan Secara Lokal' : 'Simpan ke Cloud'}
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

export default Inventory;
