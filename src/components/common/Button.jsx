import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-stat-cyan to-stat-blue text-stat-bg-primary font-semibold hover:from-stat-cyan-light hover:to-stat-blue-light shadow-stat-glow-cyan/50',
    secondary: 'bg-stat-bg-elevated hover:bg-stat-bg-hover text-stat-text-primary border border-stat-border-default',
    outline: 'border border-stat-cyan/50 text-stat-cyan hover:bg-stat-cyan/10 hover:border-stat-cyan',
    danger: 'bg-stat-competency-critical text-white hover:bg-red-600',
    ghost: 'text-stat-text-muted hover:text-stat-text-primary hover:bg-stat-bg-hover',
    glow: 'bg-stat-cyan/20 text-stat-cyan border border-stat-cyan/50 hover:bg-stat-cyan/30 shadow-stat-glow-cyan',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs rounded-stat-md gap-1.5',
    md: 'px-4 py-2 text-sm rounded-stat-lg gap-2',
    lg: 'px-5 py-2.5 text-base rounded-stat-xl gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
    </button>
  );
}

export function IconButton({
  icon: Icon,
  variant = 'secondary',
  size = 'md',
  title,
  className = '',
  onClick,
  ...props
}) {
  const variants = {
    primary: 'bg-stat-cyan text-stat-bg-primary hover:bg-stat-cyan-light',
    secondary: 'bg-stat-bg-elevated text-stat-text-muted hover:text-stat-text-primary hover:bg-stat-bg-hover border border-stat-border-subtle',
    ghost: 'text-stat-text-muted hover:text-stat-text-primary hover:bg-stat-bg-hover',
  };

  const sizes = {
    sm: 'p-1.5 rounded-stat-md',
    md: 'p-2 rounded-stat-lg',
    lg: 'p-2.5 rounded-stat-xl',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`inline-flex items-center justify-center transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />}
    </button>
  );
}
