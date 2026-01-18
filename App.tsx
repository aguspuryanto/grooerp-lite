
import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header activeModule={activeModule} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default App;
