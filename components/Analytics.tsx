
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, Legend
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4200, sales: 2400 },
  { month: 'Feb', revenue: 3800, sales: 1398 },
  { month: 'Mar', revenue: 5400, sales: 9800 },
  { month: 'Apr', revenue: 4780, sales: 3908 },
  { month: 'May', revenue: 5890, sales: 4800 },
];

const customerTierData = [
  { name: 'Gold', value: 400 },
  { name: 'Silver', value: 300 },
  { name: 'Bronze', value: 300 },
];

const COLORS_PIE = ['#f59e0b', '#94a3b8', '#b45309'];

const projectHealthData = [
  { subject: 'Budget', A: 120, fullMark: 150 },
  { subject: 'Timeline', A: 98, fullMark: 150 },
  { subject: 'Quality', A: 86, fullMark: 150 },
  { subject: 'Risk', A: 99, fullMark: 150 },
  { subject: 'Resources', A: 85, fullMark: 150 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">Laporan Periodik Bisnis</p>
          <h2 className="text-2xl font-bold text-slate-900">Advanced Business Intelligence</h2>
        </div>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700">
            <option>Tahun Ini (2023)</option>
            <option>Tahun Lalu (2022)</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">Unduh PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Margin Keuntungan</p>
            <p className="text-xl font-black text-slate-800">24.8%</p>
            <p className="text-[10px] text-green-600 font-bold">+2.4% vs bln lalu</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Customer Acquisition Cost</p>
            <p className="text-xl font-black text-slate-800">Rp 125K</p>
            <p className="text-[10px] text-red-600 font-bold">+12% vs bln lalu</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">On-time Delivery Rate</p>
            <p className="text-xl font-black text-slate-800">92.4%</p>
            <p className="text-[10px] text-green-600 font-bold">+5.1% vs bln lalu</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Tren Penjualan vs Biaya</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} name="Pendapatan" />
                <Line type="monotone" dataKey="sales" stroke="#94a3b8" strokeWidth={2} name="Biaya Operasional" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Kesehatan Proyek Aktif (KPI)</h3>
          <div className="h-[350px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={projectHealthData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <Radar name="Kesehatan" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-center">Segmentasi Tiering</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerTierData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {customerTierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Distribusi Alokasi Budget Per-Indeks</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
