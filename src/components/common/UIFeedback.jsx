import React from 'react';
import { Loader2, X, AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-1 p-1 rounded-stat-lg bg-stat-bg-secondary border border-stat-border-subtle ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2 px-3 rounded-stat-md text-xs font-medium font-mono transition-all duration-200 ${
              isActive
                ? 'bg-stat-bg-card text-stat-cyan border border-stat-cyan/40 shadow-stat-glow-cyan/20 font-bold'
                : 'text-stat-text-muted hover:text-stat-text-primary hover:bg-stat-bg-elevated'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-stat-cyan/20 text-stat-cyan' : 'bg-stat-bg-elevated text-stat-text-muted'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-stat-bg-elevated border border-stat-border-cyan rounded-stat-2xl shadow-2xl p-6 overflow-hidden z-10">
        <div className="flex items-center justify-between border-b border-stat-border-subtle pb-4 mb-4">
          <h3 className="text-lg font-bold text-stat-text-bright">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-stat-md text-stat-text-muted hover:text-stat-text-primary hover:bg-stat-bg-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-stat-border-subtle pt-4 mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export function LoadingState({ message = 'Analyzing Statistical Intelligence Data...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-stat-cyan/20 border-t-stat-cyan animate-spin" />
        <Loader2 className="w-6 h-6 text-stat-cyan absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-mono text-stat-text-muted tracking-tight animate-pulse">{message}</p>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-stat-xl bg-stat-bg-card border border-stat-border-subtle space-y-3">
      {Icon && (
        <div className="w-12 h-12 rounded-stat-xl bg-stat-bg-secondary flex items-center justify-center text-stat-cyan border border-stat-cyan/30 shadow-stat-glow-cyan/20">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h4 className="text-base font-bold text-stat-text-bright">{title}</h4>
      {description && <p className="text-xs text-stat-text-muted max-w-md">{description}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function Toast({ type = 'info', message, onClose }) {
  const icons = {
    info: <Info className="w-5 h-5 text-stat-blue" />,
    success: <CheckCircle2 className="w-5 h-5 text-stat-status-success" />,
    warning: <AlertTriangle className="w-5 h-5 text-stat-status-warning" />,
    error: <XCircle className="w-5 h-5 text-stat-status-error" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-stat-lg bg-stat-bg-elevated border border-stat-border-cyan shadow-stat-glow-cyan text-sm font-medium text-stat-text-primary">
      {icons[type]}
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 text-stat-text-muted hover:text-stat-text-primary">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
