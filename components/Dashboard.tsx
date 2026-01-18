
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Icons } from '../constants';

const data = [
  { name: 'Jan', revenue: 4000, cost: 2400 },
  { name: 'Feb', revenue: 3000, cost: 1398 },
  { name: 'Mar', revenue: 2000, cost: 9800 },
  { name: 'Apr', revenue: 2780, cost: 3908 },
  { name: 'May', revenue: 1890, cost: 4800 },
  { name: 'Jun', revenue: 2390, cost: 3800 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; color: string }> = ({ title, value, trend, color }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
    <p className="text-xs md:text-sm font-medium text-slate-500 mb-1">{title}</p>
    <h3 className="text-xl md:text-2xl font-bold text-slate-900">{value}</h3>
    <p className={`text-[10px] md:text-xs mt-2 font-semibold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
      {trend} <span className="text-slate-400 font-normal">vs bln lalu</span>
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Pendapatan" value="Rp 1.25B" trend="+12.5%" color="blue" />
        <StatCard title="Stok Produk" value="8.4K Unit" trend="-2.4%" color="orange" />
        <StatCard title="Proyek Aktif" value="24" trend="+4" color="green" />
        <StatCard title="Pesanan Pending" value="18" trend="-5%" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
            <h4 className="text-base md:text-lg font-bold">Analisis Keuangan</h4>
            <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 outline-none">
              <option>6 Bulan Terakhir</option>
              <option>12 Bulan Terakhir</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-base md:text-lg font-bold mb-6">Performa Stok</h4>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="cost" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <h4 className="text-base md:text-lg font-bold mb-4">Aktivitas Terkini</h4>
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 last:border-0 gap-3 group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icons.Sales />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">Penjualan baru: Retail JKT-0{i}</p>
                  <p className="text-xs text-slate-500">INV-2023-10{i} • 2 jam yang lalu</p>
                </div>
              </div>
              <div className="sm:text-right pl-14 sm:pl-0">
                <span className="text-sm font-black text-slate-900">Rp 4.500.000</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
