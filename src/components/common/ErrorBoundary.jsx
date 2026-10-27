import React from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import { LogoIcon } from '../Logo';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleResetApp = () => {
    try {
      localStorage.removeItem('smp_admin_auth_v1');
      sessionStorage.removeItem('smp_admin_auth_v1');
    } catch {}
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F6F8] text-[#111827] flex flex-col justify-center items-center p-4 font-sans selection:bg-[#A30D20] selection:text-white">
          <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#A30D20]" />
            
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-red-50 text-[#A30D20] mb-4">
              <AlertTriangle className="w-8 h-8 text-[#A30D20]" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <LogoIcon className="w-7 h-7" />
              <span className="font-extrabold text-sm tracking-tight text-[#111827]">SHRI METRO PRODUCTS</span>
            </div>

            <h2 className="text-xl font-black text-[#111827] mb-2">Something went wrong</h2>
            <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
              An unexpected error occurred while rendering this interface. You can reload the page or return to the main catalog.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left overflow-auto max-h-32 text-[11px] font-mono text-slate-700">
                <span className="font-bold text-red-600 block mb-1">Error Details:</span>
                {this.state.error.toString()}
              </div>
            )}

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-2.5 px-4 rounded-xl bg-[#A30D20] hover:bg-[#880A1A] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetApp}
                className="w-full py-2 px-3 text-[11px] text-slate-400 hover:text-slate-600 font-medium cursor-pointer transition-colors"
              >
                Reset Session & Clean Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
