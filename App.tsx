
import React, { useState, useEffect } from 'react';
import { ModuleType } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Finance from './components/Finance';
import SalesPurchase from './components/SalesPurchase';
import ProjectManagement from './components/ProjectManagement';
import Manufacturing from './components/Manufacturing';
import Dictionary from './components/Dictionary';
import CRM from './components/CRM';
import Analytics from './components/Analytics';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    closeSidebar();
  };

  const askAi = async () => {
    if (!aiMessage.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: aiMessage,
        config: {
          systemInstruction: `Anda adalah asisten cerdas GrooERP. Bantu pengguna memahami modul ERP ini (Inventaris, CRM, Keuangan, Manufaktur). Jawab dengan ramah dalam Bahasa Indonesia. Gunakan data bisnis yang relevan jika ditanyakan.`,
        }
      });
      setAiResponse(response.text || "Maaf, saya tidak dapat menjawab saat ini.");
    } catch (err) {
      console.error(err);
      setAiResponse("Koneksi asisten AI terputus. Silakan coba lagi nanti.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard />;
      case ModuleType.INVENTORY: return <Inventory />;
      case ModuleType.FINANCE: return <Finance />;
      case ModuleType.SALES_PURCHASE: return <SalesPurchase />;
      case ModuleType.PROJECT: return <ProjectManagement />;
      case ModuleType.MANUFACTURING: return <Manufacturing />;
      case ModuleType.DICTIONARY: return <Dictionary />;
      case ModuleType.CRM: return <CRM />;
      case ModuleType.ANALYTICS: return <Analytics />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={handleModuleChange} 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header activeModule={activeModule} onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* Floating AI Assistant Toggle */}
      <button 
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 ring-4 ring-white"
      >
        {isAiOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        )}
      </button>

      {/* AI Assistant Panel */}
      {isAiOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          <div className="bg-blue-600 p-6 text-white">
            <h3 className="font-black text-lg">GrooAI Assistant</h3>
            <p className="text-xs text-blue-100">Siap membantu operasional bisnis Anda.</p>
          </div>
          <div className="flex-1 p-6 max-h-[400px] overflow-y-auto bg-slate-50">
            {aiResponse ? (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-sm leading-relaxed text-slate-700">
                {aiResponse}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic text-center py-4">Tanyakan sesuatu tentang bisnis atau software ini...</p>
            )}
            {isAiLoading && (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex space-x-2">
            <input 
              type="text" 
              placeholder="Tanya asisten..."
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && askAi()}
            />
            <button 
              onClick={askAi}
              disabled={isAiLoading}
              className="bg-blue-600 text-white p-2 rounded-xl disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
