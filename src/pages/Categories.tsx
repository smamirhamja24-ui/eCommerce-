import React from 'react';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Dribbble, 
  Gamepad2, 
  Watch, 
  Book,
  ChevronRight,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Electronics', count: 24, icon: <Smartphone className="w-5 h-5" />, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { name: 'Fashion', count: 18, icon: <Shirt className="w-5 h-5" />, bg: 'bg-orange-50', color: 'text-orange-600' },
  { name: 'Home & Living', count: 20, icon: <Home className="w-5 h-5" />, bg: 'bg-blue-50', color: 'text-blue-600' },
  { name: 'Beauty', count: 15, icon: <Sparkles className="w-5 h-5" />, bg: 'bg-pink-50', color: 'text-pink-600' },
  { name: 'Sports', count: 12, icon: <Dribbble className="w-5 h-5" />, bg: 'bg-indigo-50', color: 'text-indigo-600' },
  { name: 'Toys & Games', count: 16, icon: <Gamepad2 className="w-5 h-5" />, bg: 'bg-amber-50', color: 'text-amber-600' },
  { name: 'Accessories', count: 20, icon: <Watch className="w-5 h-5" />, bg: 'bg-rose-50', color: 'text-rose-600' },
  { name: 'Books', count: 15, icon: <Book className="w-5 h-5" />, bg: 'bg-cyan-50', color: 'text-cyan-600' },
];

export const Categories: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Category</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Find everything you need</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <input 
          type="text" 
          placeholder="Search Category" 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
        />
        <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={i}
            to={`/shop?category=${cat.name.toLowerCase()}`}
            className="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-[2rem] hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                {cat.icon}
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-700 tracking-tight">{cat.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cat.count} Items</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
};
