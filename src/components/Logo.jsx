import React from 'react';

/**
 * Shri Metro Official Brand Logo
 * 
 * Variants:
 *  - 'icon': Circular emblem with white chair & red 'M' backrest on dark circle.
 *  - 'horizontal': Emblem on left, bold text 'SHRI METRO' & subtitle on right.
 *  - 'full': Stacked emblem with 'SHRI METRO' text underneath.
 */
export function LogoIcon({ className = "w-9 h-9", alt = "SHRI METRO Logo", ...props }) {
  return (
    <img 
      src="/logo-emblem.png" 
      alt={alt}
      className={`shrink-0 object-contain rounded-full select-none ${className}`}
      loading="eager"
      decoding="async"
      {...props}
    />
  );
}

export default function Logo({ 
  variant = 'horizontal', 
  theme = 'light', // 'light' | 'dark'
  iconSize = 'w-9 h-9',
  subtitle = 'Plastic Moulded Furniture',
  className = '',
  useImageAsset = false
}) {
  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return <LogoIcon className={iconSize} />;
  }

  // Exact image asset variant (uses pre-rendered transparent typography lockup)
  if (variant === 'image') {
    const src = isDark ? '/logo-horizontal-dark.png' : '/logo-horizontal.png';
    return (
      <img 
        src={src} 
        alt="SHRI METRO - Plastic Moulded Furniture" 
        className={`h-9 w-auto object-contain select-none ${className}`}
      />
    );
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

  // Horizontal variant (default: responsive emblem + crisp typography)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={iconSize} />
      <div className="flex flex-col min-w-0">
        <span className={`font-extrabold text-base tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-red-600 transition-colors'}`}>
          SHRI METRO
        </span>
        {subtitle && (
          <span className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
