import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ORDERS = [
  { 
    id: 'SP123456789', 
    date: '24 April, 2024', 
    status: 'Delivered', 
    items: 3, 
    total: 4254, 
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    bg: 'bg-emerald-50'
  },
  { 
    id: 'SP987654321', 
    date: '28 April, 2024', 
    status: 'In Transit', 
    items: 1, 
    total: 2249, 
    icon: <Truck className="w-4 h-4 text-blue-500" />,
    bg: 'bg-blue-50'
  },
  { 
    id: 'SP456782391', 
    date: '12 March, 2024', 
    status: 'Cancelled', 
    items: 2, 
    total: 1099, 
    icon: <XCircle className="w-4 h-4 text-rose-500" />,
    bg: 'bg-rose-50'
  }
];

export const Orders: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      <div className="flex items-baseline gap-4 mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Orders</h1>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ORDERS.length} Orders</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab, i) => (
          <button 
            key={tab} 
            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              i === 0 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-white border border-slate-100 text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {ORDERS.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${order.bg} rounded-xl flex items-center justify-center`}>
                  {order.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 leading-none mb-1">#{order.id}</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Items</p>
                  <p className="text-sm font-black text-slate-800">{order.items} Products</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total</p>
                  <p className="text-sm font-black text-emerald-600">৳{order.total}</p>
                </div>
              </div>

              <Link 
                to={`/order/${order.id}`}
                className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reorder Suggestion */}
      <div className="mt-12 p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-xl font-black text-emerald-900 mb-2 tracking-tight">Need it again?</h3>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-6 max-w-[200px] leading-relaxed">Quickly re-order your favorite products with one click.</p>
          <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95">
            View Frequent Items
          </button>
        </div>
        <Clock className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-200/30 -rotate-12" />
      </div>
    </div>
  );
};
