import React, { useState } from 'react';

const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base">Vault</p>
            <p className="text-xs text-gray-500">Anurag Yadav</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">Nexus</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium">Intake</span>
            </a>
          </li>
          <li>
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">Services</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <ul className="mt-1 space-y-0.5 ml-9">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Pre-active
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Active
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Blocked
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Closed
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <div>
              <button
                onClick={() => setInvoicesOpen(!invoicesOpen)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Invoices</span>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${invoicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {invoicesOpen && (
                <ul className="mt-1 space-y-0.5 ml-9">
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Proforma Invoices
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                      Final Invoices
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;