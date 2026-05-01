import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  
  const shipping = 0;
  const total = subtotal + shipping;

  const steps = [
    { id: 1, label: 'Address' },
    { id: 2, label: 'Payment' },
    { id: 3, label: 'Review' }
  ];

  const handlePlaceOrder = () => {
    navigate('/order-success');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => step > 1 ? setStep((step - 1) as (1 | 2 | 3)) : navigate('/cart')} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-black text-slate-800 uppercase tracking-widest">
          {step === 1 ? 'Checkout' : step === 2 ? 'Payment' : 'Order Review'}
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between px-4 mb-10">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-300",
                step >= s.id ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-white border-slate-100 text-slate-400"
              )}>
                {step > s.id ? <ShieldCheck className="w-4 h-4" /> : s.id}
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                step >= s.id ? "text-emerald-600" : "text-slate-400"
              )}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "h-[2px] flex-1 mx-2 -mt-6 transition-all duration-300",
                step > s.id ? "bg-emerald-600" : "bg-slate-100"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-8">
            <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Shipping Address</h3>
                <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Change</button>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-800">John Doe</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  123, MG Road, Bangalore,<br />
                  Karnataka - 560001<br />
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Delivery Options</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl cursor-pointer border border-transparent hover:border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center p-1">
                      <div className="w-full h-full bg-emerald-600 rounded-full" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-800">Creodard Delivery (3-5 days)</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-black">Free</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer opacity-50 grayscale">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                    <div>
                      <p className="text-[11px] font-black text-slate-800">Express Delivery (1-2 days)</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-black">৳150</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Payment Methods</h3>
              <div className="space-y-4">
                {[
                  { id: 'card', name: 'Credit / Debit Card' },
                  { id: 'upi', name: 'UPI' },
                  { id: 'netbanking', name: 'Net Banking' },
                  { id: 'cod', name: 'Cash on Delivery' }
                ].map((m) => (
                  <label key={m.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center p-1",
                        paymentMethod === m.id ? "border-emerald-600" : "border-slate-200"
                      )}>
                        {paymentMethod === m.id && <div className="w-full h-full bg-emerald-600 rounded-full" />}
                      </div>
                      <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{m.name}</span>
                    </div>
                    <input type="radio" className="hidden" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id as 'card' | 'upi' | 'netbanking' | 'cod')} />
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-6">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Card Details</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input type="text" placeholder="Card Number" className="w-full p-4 bg-slate-50 border-0 rounded-xl text-xs font-black placeholder:text-slate-300" defaultValue="4242 4242 4242 4242" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-6 h-4 bg-slate-200 rounded-sm" />
                      <div className="w-6 h-4 bg-slate-300 rounded-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiry Date" className="w-full p-4 bg-slate-50 border-0 rounded-xl text-xs font-black placeholder:text-slate-300" defaultValue="MM/YY" />
                    <input type="text" placeholder="CVV" className="w-full p-4 bg-slate-50 border-0 rounded-xl text-xs font-black placeholder:text-slate-300" defaultValue="123" />
                  </div>
                  <input type="text" placeholder="Cardholder Name" className="w-full p-4 bg-slate-50 border-0 rounded-xl text-xs font-black placeholder:text-slate-300" defaultValue="John Doe" />
                </div>
              </div>
            )}

            <button 
              onClick={() => setStep(3)}
              className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Continue to Review
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="p-6 bg-white border border-slate-100 rounded-[2rem]">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl p-2 shrink-0">
                      <img src={item.images[0]} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[11px] font-black text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-black text-slate-800">৳{(item.discountPrice || item.price) * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-slate-50">
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-800 pt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">৳{total}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipping Address</h3>
                <button onClick={() => setStep(1)} className="text-[10px] font-black text-emerald-600 uppercase">Edit</button>
              </div>
              <p className="text-[11px] font-black text-slate-800">John Doe, 123 MG Road, Bangalore...</p>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

