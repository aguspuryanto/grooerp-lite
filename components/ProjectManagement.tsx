
import React from 'react';

const ProjectManagement: React.FC = () => {
  const projects = [
    { name: 'Pembangunan Ruko Melati', budget: 1500000000, spent: 1200000000, progress: 80 },
    { name: 'Renovasi Gedung Utama', budget: 850000000, spent: 400000000, progress: 45 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6">Monitoring Anggaran Proyek (RAB)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-slate-800 text-lg">{project.name}</h4>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Aktif</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    <span>Progress Pengerjaan</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Anggaran</p>
                    <p className="font-black text-slate-900">Rp {(project.budget / 1000000).toFixed(1)} M</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Teralokasi</p>
                    <p className="font-black text-blue-600">Rp {(project.spent / 1000000).toFixed(1)} M</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-200">
                  <p className="text-xs text-slate-500 italic">Terakhir diperbarui 2 hari yang lalu</p>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Kelola Budget →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
