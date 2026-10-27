import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LogoIcon } from '../Logo';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const { login } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(username, password, remember);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message || 'Invalid administrative credentials');
      }
      setIsSubmitting(false);
    }, 350);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('metro123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#111827] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans selection:bg-[#A30D20] selection:text-white">
      
      {/* Background industrial lighting accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#A30D20]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#111827]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/60 rounded-full blur-2xl pointer-events-none -z-0" />

      {/* Back button */}
      <div className="w-full max-w-md flex justify-start mb-3 sm:mb-0 sm:absolute sm:top-6 sm:left-6 z-20">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white hover:bg-[#F5F6F8] text-[#111827] border border-[#E5E7EB] shadow-xs backdrop-blur-md text-xs font-bold transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#A30D20]" />
          <span>Back to Public Website</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 rounded-3xl bg-white ring-1 ring-[#E5E7EB] shadow-md mb-3.5">
            <LogoIcon className="w-16 h-16 drop-shadow-xs" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#111827]">
            SHRI METRO PRODUCTS
          </h1>
          <p className="text-xs font-bold text-[#A30D20] tracking-wider uppercase mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A30D20]" />
            <span>Administrative Command Portal</span>
          </p>
        </div>

        {/* Crisp White Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative">
          
          {/* Burgundy Red decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A30D20] to-[#880A1A] rounded-t-2xl" />

          <div className="mb-6">
            <h2 className="text-lg font-extrabold text-[#111827] tracking-tight">Owner Authentication</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Enter your authorized management credentials to access inventory and sales controls.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-[#A30D20] text-xs flex items-center gap-2.5 animate-shake font-medium">
              <AlertCircle className="w-4 h-4 text-[#A30D20] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827] block">
                Administrator Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Username (e.g. admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#111827] block">
                  Security Passkey
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] font-bold text-[#A30D20] hover:text-[#880A1A] cursor-pointer flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Auto-fill (admin / metro123)</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Passkey"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#111827] cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#64748B] hover:text-[#111827]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#F5F6F8] border-[#E5E7EB] text-[#A30D20] focus:ring-[#A30D20]"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-98 disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'Authenticating Terminal…' : 'Enter Administrative Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center">
            <p className="text-[11px] text-[#64748B]">
              Demo Credentials: <code className="text-[#111827] bg-[#F5F6F8] border border-[#E5E7EB] px-1.5 py-0.5 rounded font-mono font-bold">admin</code> / <code className="text-[#111827] bg-[#F5F6F8] border border-[#E5E7EB] px-1.5 py-0.5 rounded font-mono font-bold">metro123</code>
            </p>
          </div>

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-[#64748B] mt-6 font-medium">
          Shri Metro Products © {new Date().getFullYear()} • Kumbalgodu Unit Console
        </p>

      </div>
    </div>
  );
}
