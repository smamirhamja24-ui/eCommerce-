import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full z-50 bg-white sticky top-0 border-b border-slate-50">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/20">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Shopora</span>
        </Link>

        {/* Actions (Bell/Notification) */}
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all relative">
            <Bell className="w-6 h-6 stroke-[1.5px]" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </Link>
          <Link to="/account" className="hidden sm:flex p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
            <User className="w-6 h-6 stroke-[1.5px]" />
          </Link>
        </div>
      </div>

      {/* Search Bar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-14 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium transition-all group-hover:bg-white group-hover:shadow-lg group-hover:shadow-slate-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 text-white flex items-center justify-center rounded-xl hover:bg-emerald-700 transition-colors">
            <Search className="w-5 h-5 md:hidden" />
            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest px-2">Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};
