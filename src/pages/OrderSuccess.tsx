import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderSuccess: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-6 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-4">Order Successful!</h1>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 max-w-[280px] mx-auto">
          Thank you for your purchase. Your order <span className="text-emerald-600 font-black">#SP123456789</span> has been received and is being processed.
        </p>

        <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 mb-10 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Estimated Delivery</span>
            <span className="text-slate-800">May 15, 2024</span>
          </div>
          <div className="h-px bg-slate-200"></div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Shipping Agent</span>
            <span className="text-slate-800">RedX Delivery</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Link
            to="/track"
            className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95"
          >
            <Package className="w-4 h-4" />
            Track My Order
          </Link>
          <Link
            to="/"
            className="w-full py-5 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
