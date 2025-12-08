import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Download, 
  FileText, 
  PlayCircle, 
  BookOpen, 
  XCircle, 
  CheckCircle, 
  FileCheck, 
  FileOutput,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard', onNavigate }) => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'nexus',
      label: 'Nexus',
      icon: Users,
      path: '/nexus',
    },
    {
      id: 'intake',
      label: 'Intake',
      icon: Download,
      path: '/intake',
    },
  ];

  const servicesItems = [
    {
      id: 'pre-active',
      label: 'Pre-active',
      icon: PlayCircle,
      path: '/services/pre-active',
    },
    {
      id: 'active',
      label: 'Active',
      icon: BookOpen,
      path: '/services/active',
    },
    {
      id: 'blocked',
      label: 'Blocked',
      icon: XCircle,
      path: '/services/blocked',
    },
    {
      id: 'closed',
      label: 'Closed',
      icon: CheckCircle,
      path: '/services/closed',
    },
  ];

  const invoicesItems = [
    {
      id: 'proforma',
      label: 'Proforma Invoices',
      icon: FileCheck,
      path: '/invoices/proforma',
    },
    {
      id: 'final',
      label: 'Final Invoices',
      icon: FileOutput,
      path: '/invoices/final',
    },
  ];

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <aside className="w-72 bg-[#F5F5F7] border-r border-gray-300 h-screen flex flex-col">
      {/* Brand Header */}
      <div className="p-4 bg-white border-b border-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 bg-blue-600 rounded-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 truncate">Vault</h2>
            <p className="text-xs text-gray-500 truncate">Anurag Yadav</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <div className="bg-white rounded-xl shadow-sm mb-2.5 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors
                  ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}
                  ${isActive 
                    ? 'text-gray-900 font-medium bg-gray-50' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-2.5 overflow-hidden">
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <FileText className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
            <span className="flex-1 text-left font-medium">Services</span>
            {servicesOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            )}
          </button>
          
          {servicesOpen && (
            <>
              {servicesItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-2.5 pl-10 pr-3 py-2.5 text-sm transition-colors
                      ${index !== servicesItems.length - 1 ? 'border-b border-gray-100' : ''}
                      ${isActive 
                        ? 'text-gray-900 font-medium bg-gray-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setInvoicesOpen(!invoicesOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <FileText className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
            <span className="flex-1 text-left font-medium">Invoices</span>
            {invoicesOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            )}
          </button>
          
          {invoicesOpen && (
            <>
              {invoicesItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-2.5 pl-10 pr-3 py-2.5 text-sm transition-colors
                      ${index !== invoicesItems.length - 1 ? 'border-b border-gray-100' : ''}
                      ${isActive 
                        ? 'text-gray-900 font-medium bg-gray-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;