import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Package, 
  CreditCard,
  Download
} from 'lucide-react';

export const OrderDetails: React.FC = () => {
  const { id } = useParams();

  const order = {
    id: id || 'SP12345678',
    date: '18 May 2024',
    status: 'Processing',
    address: '123, MG Road, Bangalore, Karnataka - 560001, India',
    items: [
      { id: 1, name: 'Sony WH-1000XM5 Headphones', price: 22999, qty: 1, image: 'https://images.unsplash.com/photo-1618366712010-8c0e2718e99e?auto=format&fit=crop&q=80&w=200' },
      { id: 2, name: 'S9 Smart Watch', price: 4799, qty: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200' },
    ],
    subtotal: 27798,
    tax: 416,
    shipping: 0,
    total: 28214
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/orders" className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none mb-1">Order Details</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">ID: {order.id}</p>
        </div>
        <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Status Card */}
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Placed on {order.date}</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{order.status}</p>
            </div>
          </div>
          <Link to="/track" className="px-5 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Track order</Link>
        </div>

        {/* Address */}
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Delivery Address</h3>
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight leading-relaxed">
            {order.address}
          </p>
        </div>

        {/* Items */}
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Order Items</h3>
          </div>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-xl p-2 shrink-0">
                  <img src={item.image} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight line-clamp-1">{item.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.qty} • ৳{item.price.toLocaleString()}</p>
                </div>
                <span className="text-xs font-black text-slate-800">৳{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Payment Summary</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-slate-800">৳{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <span>Estimated Tax (15%)</span>
              <span className="text-slate-800">৳{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <span>Shipping cost</span>
              <span className="text-emerald-600">FREE</span>
            </div>
            <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Total Paid</span>
              <span className="text-3xl font-black text-emerald-600 tracking-tighter">৳{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
