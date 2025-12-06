import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import solicitationData from '../data/solicits.json';
import type { Solicit } from '../types';

const SolicitationList = () => {
  const [solicits] = useState<Solicit[]>(solicitationData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSolicits, setFilteredSolicits] = useState<Solicit[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Subscribed' | 'Not Subscribed'>('All');
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );
    }
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    let filtered = solicits.filter((solicit) =>
      solicit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter((solicit) => solicit.subscriptionStatus === statusFilter);
    }

    // Sort by name
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredSolicits(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, solicits]);

  // Calculate total solicitation letters acquired
  const totalAcquired = solicits.reduce((sum, solicit) => {
    const acquired = typeof solicit.solicitationAcquired === 'string' 
      ? parseInt(solicit.solicitationAcquired, 10) 
      : solicit.solicitationAcquired;
    return sum + acquired;
  }, 0);

  // Calculate counts for each status
  const subscribedCount = solicits.filter(s => s.subscriptionStatus === 'Subscribed').length;
  const notSubscribedCount = solicits.filter(s => s.subscriptionStatus === 'Not Subscribed').length;

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className={`${isDarkMode ? 'bg-rose-500' : 'bg-rose-600'} text-white font-semibold px-1 rounded`}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const theme = {
    dark: {
      bg: '#0C0C0C',
      inputBg: '#1a1a1a',
      inputBorder: '#2a2a2a',
      tableBorder: '#2a2a2a',
      tableHeaderBg: 'linear-gradient(to right, #1a1a1a, #151515)',
      tableBg: '#0C0C0C',
      hoverBg: '#1a1a1a',
      cardBg: 'linear-gradient(to bottom right, #1a1a1a, #0C0C0C)',
      cardBorder: '#2a2a2a',
      text: 'text-white',
      textSecondary: 'text-gray-400',
      textTertiary: 'text-gray-500',
      filterBg: '#1a1a1a',
      filterBorder: '#2a2a2a',
      filterHover: '#252525'
    },
    light: {
      bg: '#F9F8F6',
      inputBg: '#ffffff',
      inputBorder: '#dee2e6',
      tableBorder: '#dee2e6',
      tableHeaderBg: 'linear-gradient(to right, #e9ecef, #f8f9fa)',
      tableBg: '#ffffff',
      hoverBg: '#f8f9fa',
      cardBg: 'linear-gradient(to bottom right, #ffffff, #F9F8F6)',
      cardBorder: '#dee2e6',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textTertiary: 'text-gray-500',
      filterBg: '#ffffff',
      filterBorder: '#dee2e6',
      filterHover: '#f8f9fa'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const totalPages = Math.ceil(filteredSolicits.length / ITEMS_PER_PAGE);
  const paginatedSolicits = filteredSolicits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex flex-col" style={{ backgroundColor: currentTheme.bg }}>
      <div className="max-w-7xl mx-auto w-full flex-grow">
        {/* Navigation and Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden cursor-pointer p-2 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.text.includes('white') ? '#ffffff' : '#000000' }}>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Link */}
          <button
            onClick={() => navigate('/')}
            className={`hidden md:block cursor-pointer font-medium transition-all duration-200 hover:opacity-80 border-b-2 border-transparent italic hover:border-rose-400 pb-1 ${currentTheme.text}`}
          >
            View Subscribers
          </button>
          
          {/* Theme Toggle */}
          <div 
            className="relative inline-flex items-center rounded-full p-1 transition-all duration-300 shadow-lg"
            style={{ 
              backgroundColor: isDarkMode ? '#1a1a1a' : '#e9ecef',
              border: `2px solid ${isDarkMode ? '#2a2a2a' : '#dee2e6'}`
            }}
          >
            <button
              onClick={() => setIsDarkMode(true)}
              className={`relative z-10 p-2 sm:p-2.5 rounded-full transition-all duration-300 cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
              aria-label="Dark mode"
            >
              <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button
              onClick={() => setIsDarkMode(false)}
              className={`relative z-10 p-2 sm:p-2.5 rounded-full transition-all duration-300 cursor-pointer ${!isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}
              aria-label="Light mode"
            >
              <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <div
              className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: 'calc(50% - 4px)',
                backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                left: isDarkMode ? '4px' : 'calc(50% + 2px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div 
            className="md:hidden mb-6 p-4 absolute rounded-2xl border shadow-lg z-99"
            style={{
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className={`text-sm font-medium transition-all duration-200 hover:opacity-80 border-b cursor-pointer border-transparent hover:border-rose-400 italic pb-1 ${currentTheme.text}`}
            >
              View Subscribers
            </button>
          </div>
        )}

        <div ref={headerRef} className="text-center mb-8">
          <h1 className={`text-5xl sm:text-6xl font-bold mb-4 tracking-tight ${currentTheme.text}`}>
            Solicitation List
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              Total Students: <span className="font-semibold text-rose-400">{solicits.length}</span>
            </p>
            <div className={`hidden sm:block w-px h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <p className={`text-lg ${currentTheme.textSecondary}`}>
              Total Acquired: <span className="font-semibold text-blue-400">{totalAcquired}</span>
            </p>
          </div>
        </div>

        <div ref={searchRef} className="mb-10">
          <div className="max-w-4xl mx-auto">
            {/* Search and Filter Container */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-6 py-4 text-lg rounded-2xl border-2 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xl ${currentTheme.text}`}
                  style={{ backgroundColor: currentTheme.inputBg, borderColor: currentTheme.inputBorder }}
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="md:w-64">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Subscribed' | 'Not Subscribed')}
                    className={`w-full px-6 py-4 text-lg rounded-2xl border-2 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xl appearance-none cursor-pointer ${currentTheme.text}`}
                    style={{ 
                      backgroundColor: currentTheme.filterBg, 
                      borderColor: currentTheme.inputBorder 
                    }}
                  >
                    <option value="All">All Students ({solicits.length})</option>
                    <option value="Subscribed">Subscribed ({subscribedCount})</option>
                    <option value="Not Subscribed">Not Subscribed ({notSubscribedCount})</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className={`w-5 h-5 ${currentTheme.textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Badge */}
            {statusFilter !== 'All' && (
              <div className="flex items-center gap-2 mt-4">
                <span className={`text-sm ${currentTheme.textSecondary}`}>Active filter:</span>
                <span 
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    statusFilter === 'Subscribed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {statusFilter}
                  <button
                    onClick={() => setStatusFilter('All')}
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Clear filter"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>

        <div ref={tableRef}>
          {paginatedSolicits.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border" style={{ borderColor: currentTheme.tableBorder }}>
                <table className="w-full">
                  <thead style={{ background: currentTheme.tableHeaderBg }}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>ID</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Name</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Course</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Tracking Numbers</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Acquired</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Returned</th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${currentTheme.textSecondary}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ backgroundColor: currentTheme.tableBg, borderColor: currentTheme.tableBorder }}>
                    {paginatedSolicits.map((solicit) => (
                      <tr
                        key={solicit.id}
                        className="transition-colors duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentTheme.hoverBg}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textSecondary}`}>{solicit.id}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${currentTheme.text}`}>{highlightText(solicit.name, searchQuery)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-400">{solicit.course}</td>
                        <td className={`px-6 py-4 text-sm ${currentTheme.textSecondary}`}>
                          {solicit.trackingNumbers && solicit.trackingNumbers.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {solicit.trackingNumbers.map((num, index) => (
                                <span key={index} className="px-2 py-0.5 text-xs font-medium rounded bg-blue-500/20 text-blue-400">
                                  {num}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className={currentTheme.textTertiary}>—</span>
                          )}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textSecondary}`}>{solicit.solicitationAcquired}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.textSecondary}`}>{solicit.solicitationReturned}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${solicit.subscriptionStatus === 'Subscribed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {solicit.subscriptionStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {paginatedSolicits.map((solicit) => (
                  <div
                    key={solicit.id}
                    className="border rounded-2xl p-6 transition-all duration-300"
                    style={{ background: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = currentTheme.cardBorder}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-1 ${currentTheme.text}`}>{highlightText(solicit.name, searchQuery)}</h3>
                        <p className={`text-xs ${currentTheme.textTertiary}`}>ID: {solicit.id}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${solicit.subscriptionStatus === 'Subscribed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {solicit.subscriptionStatus}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center"><span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span><span className="text-sm text-rose-400 font-medium">{solicit.course}</span></div>
                      {solicit.trackingNumbers && solicit.trackingNumbers.length > 0 && (
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 mt-1.5"></span>
                          <div>
                            <span className={`text-xs ${currentTheme.textTertiary}`}>Tracking Numbers:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {solicit.trackingNumbers.map((num, index) => (
                                <span key={index} className="px-2 py-0.5 text-xs font-medium rounded bg-blue-500/20 text-blue-400">
                                  {num}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center"><span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span><span className={`text-sm ${currentTheme.textSecondary}`}>Acquired: {solicit.solicitationAcquired}</span></div>
                        <div className="flex items-center"><span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span><span className={`text-sm ${currentTheme.textSecondary}`}>Returned: {solicit.solicitationReturned}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className={`text-xl ${currentTheme.textTertiary}`}>
                {statusFilter !== 'All' 
                  ? `No ${statusFilter.toLowerCase()} students found${searchQuery ? ' matching your search' : ''}.`
                  : 'No students found matching your search.'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                currentPage === 1 ? '' : 'hover:bg-rose-500/20 hover:border-rose-500'
              }`}
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textSecondary,
                border: `1px solid ${currentTheme.inputBorder}`
              }}
              aria-label="Previous page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNumber;
                
                if (totalPages <= 7) {
                  pageNumber = i + 1;
                } else if (currentPage <= 4) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNumber = totalPages - 6 + i;
                } else {
                  pageNumber = currentPage - 3 + i;
                }

                const isActive = pageNumber === currentPage;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'shadow-lg scale-105' 
                        : 'hover:bg-rose-500/20 hover:border-rose-500 hover:text-rose-500'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#8B9DC3' : currentTheme.inputBg,
                      color: isActive ? '#ffffff' : '#ef4444',
                      border: isActive ? 'none' : `1px solid ${currentTheme.inputBorder}`
                    }}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${
                currentPage === totalPages ? '' : 'hover:bg-rose-500/20 hover:border-rose-500'
              }`}
              style={{ 
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.textSecondary,
                border: `1px solid ${currentTheme.inputBorder}`
              }}
              aria-label="Next page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center text-sm ${currentTheme.textSecondary}`}>
            Developed by <span className="font-semibold text-rose-400">COS Devs</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SolicitationList;