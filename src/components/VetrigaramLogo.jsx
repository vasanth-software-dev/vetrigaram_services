import React from 'react';

/**
 * Authentic 3D Corporate Emblem Logo Component
 * Directly renders public/logo-emblem.png maintaining full original proportions,
 * metallic colors, and geometry with refined typography.
 */
export default function VetrigaramLogo({
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  showText = true,
  title = 'Vetrigaram',
  subtitle = 'Tech Services',
  textLight = false,
  className = '',
  iconOnly = false,
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  };

  const textClasses = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-lg sm:text-xl font-extrabold tracking-tight',
    lg: 'text-xl sm:text-2xl font-extrabold tracking-tight',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  };

  const subtitleClasses = {
    sm: 'text-[10px] font-semibold tracking-wider uppercase',
    md: 'text-xs font-semibold tracking-wider uppercase',
    lg: 'text-sm font-semibold tracking-wider uppercase',
    xl: 'text-base font-semibold tracking-wider uppercase',
  };

  return (
    <div className={`flex items-center space-x-3 group shrink-0 ${className}`}>
      {/* 3D Emblem Frame */}
      <div
        className={`relative ${sizeClasses[size] || sizeClasses.md} overflow-hidden bg-white p-0.5 border border-[#2385E8]/30 shadow-[0_4px_14px_rgba(7,26,51,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#FF7A00]/50 group-hover:shadow-[0_6px_20px_rgba(255,122,0,0.25)] transition-all duration-300`}
      >
        <img
          src={`${import.meta.env.BASE_URL}logo-emblem.png`}
          alt={title}
          className="w-full h-full object-contain select-none pointer-events-none"
        />
        {/* Subtle specular sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none rounded-[inherit]" />
      </div>

      {/* Brand Typography */}
      {showText && !iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center leading-none">
            <span className={`${textClasses[size] || textClasses.md} ${textLight ? 'text-white' : 'text-[#071A33]'} font-sans`}>
              {title}
            </span>
          </div>
          {subtitle && (
            <span className={`${subtitleClasses[size] || subtitleClasses.md} ${textLight ? 'text-[#2385E8]' : 'text-[#1459B8]'} font-sans mt-0.5`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
