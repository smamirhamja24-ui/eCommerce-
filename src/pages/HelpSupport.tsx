import React from 'react';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronRight, 
  FileText, 
  Shield, 
  Truck, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';

const FAQS = [
  { q: "How to track my order?", icon: <Truck className="w-4 h-4" /> },
  { q: "Change shipping address", icon: <Truck className="w-4 h-4" /> },
  { q: "Cancellation & Returns", icon: <RotateCcw className="w-4 h-4" /> },
  { q: "Payment security", icon: <Shield className="w-4 h-4" /> },
  { q: "Warranty information", icon: <FileText className="w-4 h-4" /> },
];

export const HelpSupport: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Help Center</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">We're here to help you 24/7</p>
      </div>

      {/* Search Support */}
      <div className="relative mb-10">
        <input 
          type="text" 
          placeholder="How can we help you?" 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
        />
        <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
      </div>

      {/* Quick Contacts */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="flex flex-col items-center gap-3 p-6 bg-emerald-600 text-white rounded-[2rem] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
          <MessageCircle className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-widest">Live Chat</span>
        </button>
        <button className="flex flex-col items-center gap-3 p-6 bg-white border border-slate-100 text-slate-800 rounded-[2rem] active:scale-95 transition-all">
          <Phone className="w-6 h-6 text-emerald-600" />
          <span className="text-[10px] font-black uppercase tracking-widest">Call Center</span>
        </button>
      </div>

      {/* FAQ Links */}
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Popular Topics</h3>
      <div className="space-y-3 mb-10">
        {FAQS.map((faq, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 bg-white border border-slate-50 rounded-2xl hover:bg-slate-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                {faq.icon}
              </div>
              <span className="text-sm font-black text-slate-700 tracking-tight">{faq.q}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        ))}
      </div>

      {/* Additional Support */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
        <h3 className="text-xl font-black mb-2 tracking-tight">Still stuck?</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">Send us an email and we'll reply within 2 hours</p>
        <a href="mailto:support@shopora.com" className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5 hover:bg-white/20 transition-all">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-black tracking-tight">support@shopora.com</span>
          </div>
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </a>
      </div>
    </div>
  );
};
