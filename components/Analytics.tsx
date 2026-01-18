
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
    <div className="space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-widest">Business Intelligence</p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Analitik Performa</h2>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs md:text-sm font-bold text-slate-700 outline-none">
            <option>Tahun 2023</option>
            <option>Tahun 2022</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all uppercase tracking-widest">Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 group hover:border-blue-500 transition-colors">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Profit Margin</p>
            <p className="text-xl font-black text-slate-800 leading-none">24.8%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 group hover:border-green-500 transition-colors">
          <div className="p-3 bg-green-50 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">CAC (Unit)</p>
            <p className="text-xl font-black text-slate-800 leading-none">Rp 125K</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4 group hover:border-orange-500 transition-colors">
          <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Delivery</p>
            <p className="text-xl font-black text-slate-800 leading-none">92.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-base md:text-lg font-black mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Tren Pendapatan vs Biaya
          </h3>
          <div className="h-[250px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: 10, paddingTop: 20}} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }} name="In" />
                <Line type="monotone" dataKey="sales" stroke="#94a3b8" strokeWidth={2} name="Out" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-base md:text-lg font-black mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
            Kesehatan Proyek
          </h3>
          <div className="h-[250px] md:h-[350px] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={projectHealthData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Status" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-center text-sm font-black mb-6 uppercase tracking-widest text-slate-400">Pangsa Pasar</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerTierData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {customerTierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{fontSize: 10}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-400">Distribusi Budget (Regional)</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="month" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 10, 10, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
