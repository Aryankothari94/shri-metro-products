import React from 'react';

/**
 * Shri Metro Official Brand Logo
 * 
 * Variants:
 *  - 'icon': Circular emblem with white chair & red 'M' backrest on dark circle.
 *  - 'horizontal': Emblem on left, bold text 'SHRI METRO' & subtitle on right.
 *  - 'full': Stacked emblem with 'SHRI METRO' text underneath.
 */
export function LogoIcon({ className = "w-9 h-9", ...props }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`shrink-0 ${className}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Shri Metro Logo"
      {...props}
    >
      {/* Dark Circle Emblem */}
      <circle cx="100" cy="100" r="95" fill="#1C1A1B" />

      {/* Red M Backrest */}
      <path 
        fill="#E31E24"
        fillRule="evenodd"
        d="
          M 65 138
          L 66 58
          C 66 40, 78 28, 100 28
          C 122 28, 134 40, 134 58
          L 135 138
          L 121 138
          L 120 54
          C 120 44, 116 39, 107 39
          C 103 39, 100 42, 98 47
          L 97 138
          L 83 138
          L 83 47
          C 81 42, 78 39, 74 39
          C 65 39, 61 44, 61 54
          L 61 138
          Z
        "
      />

      {/* White Chair Frame */}
      <g stroke="#FFFFFF" strokeLinecap="square" strokeLinejoin="miter">
        {/* Back uprights */}
        <line x1="56" y1="40" x2="65" y2="140" strokeWidth="7" />
        <line x1="144" y1="40" x2="135" y2="140" strokeWidth="7" />

        {/* Armrests */}
        <line x1="32" y1="92" x2="55" y2="92" strokeWidth="7" />
        <line x1="145" y1="92" x2="168" y2="92" strokeWidth="7" />

        {/* Arm posts */}
        <line x1="49" y1="92" x2="61" y2="140" strokeWidth="7" />
        <line x1="151" y1="92" x2="139" y2="140" strokeWidth="7" />

        {/* Seat bar */}
        <line x1="58" y1="140" x2="142" y2="140" strokeWidth="7.5" strokeLinecap="butt" />

        {/* Front legs */}
        <line x1="62" y1="140" x2="50" y2="175" strokeWidth="7" />
        <line x1="138" y1="140" x2="150" y2="175" strokeWidth="7" />
      </g>
    </svg>
  );
}

export default function Logo({ 
  variant = 'horizontal', 
  theme = 'light', // 'light' | 'dark'
  iconSize = 'w-9 h-9',
  subtitle = 'Plastic Moulded Furniture',
  className = ''
}) {
  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return <LogoIcon className={iconSize} />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoIcon className={iconSize || "w-16 h-16"} />
        <span className={`font-black tracking-tight text-lg mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          SHRI METRO
        </span>
        {subtitle && (
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={iconSize} />
      <div className="flex flex-col min-w-0">
        <span className={`font-extrabold text-base tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-red-600 transition-colors'}`}>
          SHRI METRO
        </span>
        {subtitle && (
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
