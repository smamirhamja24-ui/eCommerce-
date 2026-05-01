import React from 'react';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react';

import { Link } from 'react-router-dom';

const MENU_ITEMS = [
  { icon: <User className="w-5 h-5" />, label: 'Personal Profile', desc: 'Verify your ID and identity', to: '/account' },
  { icon: <ShoppingBag className="w-5 h-5" />, label: 'My Orders', desc: 'Ongoing, Completed & Cancelled', to: '/orders' },
  { icon: <Heart className="w-5 h-5" />, label: 'My Wishlist', desc: 'Everything you have saved', to: '/wishlist' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Delivery Address', desc: 'Primary & Secondary locations', to: '#' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Payment Methods', desc: 'Securely saved banking info', to: '#' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifications', desc: 'Price drops & Order alerts', to: '#' },
  { icon: <Settings className="w-5 h-5" />, label: 'Security & App Settings', desc: 'Manage your data and privacy', to: '#' },
  { icon: <HelpCircle className="w-5 h-5" />, label: 'Help & Global Support', desc: 'We are here for you 24/7', to: '/help' },
];

export const Account: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-widest">My Account</h1>
        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 mb-10 overflow-hidden relative group">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-emerald-600/20 group-hover:rotate-3 transition-transform">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">John Doe</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">john.doe@example.com</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-md">Platinum Member</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 -mr-12 -mt-12 rounded-full opacity-50"></div>
      </div>

      {/* Menu List */}
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Personal Management</h3>
      <div className="space-y-3">
        {MENU_ITEMS.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="w-full flex items-center p-4 bg-white border border-slate-50 rounded-3xl hover:border-emerald-100 hover:bg-emerald-50/10 transition-all duration-300 group"
          >
            <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all">
              {item.icon}
            </div>
            <div className="flex-grow text-left ml-4">
              <h3 className="text-sm font-black text-slate-700 tracking-tight group-hover:text-emerald-700 transition-colors">{item.label}</h3>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
          </Link>
        ))}

        <button className="w-full flex items-center p-5 bg-rose-50/50 border border-rose-50 rounded-3xl hover:bg-rose-50 transition-all duration-300 group mt-10">
          <div className="w-11 h-11 bg-rose-100/50 rounded-2xl flex items-center justify-center text-rose-500">
            <LogOut className="w-5 h-5 shrink-0" />
          </div>
          <div className="flex-grow text-left ml-4">
            <h3 className="text-sm font-black text-rose-600 tracking-tight uppercase tracking-widest">Termination session</h3>
          </div>
        </button>
      </div>
    </div>
  );
};
