import React from 'react';
import { 
  CheckCircle2, 
  Truck, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '../lib/utils';

export const OrderTracking: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h1 className="text-sm font-black text-slate-800 uppercase tracking-widest">Track Order</h1>
        <div className="w-10"></div>
      </div>

      {/* Info Card */}
      <div className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
            <p className="text-xl font-black text-slate-800 tracking-tight">20 May 2024</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-sm font-black text-emerald-600 tracking-tight">#SP12345678</p>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Standard Delivery</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tracking Live</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Contact</button>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8 px-4">
        {[
          { label: 'Order Placed', time: '10:30 AM, 18 May', active: true, completed: true },
          { label: 'In Progress', time: '12:45 PM, 18 May', active: true, completed: true },
          { label: 'Shipped', time: 'Expected 19 May', active: true, completed: false },
          { label: 'Delivered', time: 'Expected 20 May', active: false, completed: false },
        ].map((step, i, arr) => (
          <div key={i} className="flex gap-6 relative">
            {i !== arr.length - 1 && (
              <div className={cn(
                "absolute left-4 top-8 w-[2px] h-12 -ml-[1px]",
                step.completed ? "bg-emerald-600" : "bg-slate-100"
              )} />
            )}
            <div className={cn(
              "w-8 h-8 rounded-full border-4 flex items-center justify-center shrink-0 transition-all z-10",
              step.completed ? "bg-emerald-600 border-emerald-100 text-white" : 
              step.active ? "bg-white border-emerald-600" : "bg-white border-slate-100"
            )}>
              {step.completed && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className="pt-0.5">
              <h3 className={cn("text-[13px] font-black uppercase tracking-tight mb-1", step.active ? "text-slate-800" : "text-slate-300")}>{step.label}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{step.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipping Address</h3>
        <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
          123, MG ROAD, BANGALORE,<br />
          KARNATAKA - 560001, INDIA
        </p>
      </div>
    </div>
  );
};

