
import React from 'react';
import { BUSINESS_DICTIONARY } from '../constants';

const Dictionary: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-blue-600 p-12 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4">Kamus Bisnis GrooERP</h2>
          <p className="text-blue-100 max-w-lg">Pahami istilah-istilah akuntansi dan bisnis penting untuk memaksimalkan penggunaan software ERP Anda.</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUSINESS_DICTIONARY.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h4 className="text-lg font-black text-slate-800 mb-3">{item.term}</h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.definition}</p>
            {item.link !== '#' && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center group"
              >
                BACA SELENGKAPNYA 
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dictionary;
