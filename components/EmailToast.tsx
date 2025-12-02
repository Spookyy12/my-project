import React, { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';

interface ToastData {
  to: string;
  subject: string;
  body: string;
}

const EmailToast: React.FC = () => {
  const [notification, setNotification] = useState<ToastData | null>(null);

  useEffect(() => {
    const handleEmailEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      setNotification(customEvent.detail);
      
      // Auto hide after 6 seconds
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    };

    window.addEventListener('mock-email-sent', handleEmailEvent);
    return () => window.removeEventListener('mock-email-sent', handleEmailEvent);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-sm w-full bg-white rounded-xl shadow-2xl border-l-4 border-terracotta-500 overflow-hidden animate-slide-in-right z-[100]">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-terracotta-600 font-bold text-xs uppercase tracking-wide">
            <Mail size={14} />
            <span>Backend Email Simulation</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-1.5">
            <p className="text-sm text-slate-500">To: <span className="text-slate-800 font-medium">{notification.to}</span></p>
            <p className="text-sm text-slate-500">Subject: <span className="text-slate-800 font-medium">{notification.subject}</span></p>
            <div className="mt-3 p-3 bg-sand-50 rounded-lg text-xs text-slate-600 font-mono border border-sand-200">
                {notification.body.substring(0, 100)}...
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailToast;