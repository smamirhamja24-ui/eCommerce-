import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/account');
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100"
      >
        <div className="flex">
          <button
            onClick={() => setIsLogin(true)}
            className={cn(
              "flex-1 py-6 text-center font-black transition-all",
              isLogin ? "text-green-600 border-b-4 border-green-600" : "text-gray-400 border-b border-gray-100"
            )}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={cn(
              "flex-1 py-6 text-center font-black transition-all",
              !isLogin ? "text-green-600 border-b-4 border-green-600" : "text-gray-400 border-b border-gray-100"
            )}
          >
            Register
          </button>
        </div>

        <div className="p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Bazarify'}
            </h2>
            <p className="text-gray-500">
              {isLogin ? 'Enter your credentials to access your account' : 'Start your shopping journey with us today'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                  <ArrowRight className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                {isLogin && <button className="text-xs font-bold text-green-600 hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <button className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-xl flex items-center justify-center group shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all">
              {isLogin ? 'Login to Account' : 'Create Free Account'}
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs font-bold uppercase"><span className="bg-white px-4 text-gray-400">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center space-x-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-gray-700"
            >
              <Chrome className="w-5 h-5 text-gray-400" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
