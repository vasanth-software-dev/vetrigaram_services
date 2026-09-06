import React from 'react';

/**
 * Premium Corporate Emblem Logo Component
 * Precision circular medallion with metallic gradient border,
 * specular reflection, dual-tone typography, and ambient interactive glow.
 */
export default function VetrigaramLogo({
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  showText = true,
  title = 'Vetrigaram',
  subtitle = 'Tech Services',
  textLight = false,
  className = '',
  iconOnly = false,
  showTamil = false,
}) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const textSizes = {
    sm: 'text-base font-extrabold',
    md: 'text-xl sm:text-[22px] font-extrabold',
    lg: 'text-2xl sm:text-3xl font-black',
    xl: 'text-3xl sm:text-4xl font-black',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.16em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.22em]',
    xl: 'text-sm tracking-[0.24em]',
  };

  const renderTitle = () => {
    if (title === 'Vetrigaram') {
      return (
        <div className="flex items-center leading-none">
          <span className={`${textLight ? 'text-white' : 'text-[#071A33]'} tracking-tight drop-shadow-sm`}>
            Vetri
          </span>
          <span className="text-gradient-orange tracking-tight drop-shadow-sm">
            garam
          </span>
          {showTamil && (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#2385E8]/15 text-[#2385E8] border border-[#2385E8]/30 hidden sm:inline-block">
              வெற்றிகரம்
            </span>
          )}
        </div>
      );
    }
    return (
      <span className={`${textLight ? 'text-white' : 'text-[#071A33]'} tracking-tight`}>
        {title}
      </span>
    );
  };

  return (
    <div className={`flex items-center space-x-3 group shrink-0 ${className}`}>
      {/* Medallion Container with Ambient Glow and Dual Gradient Ring */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Ambient Hover Glow Halo */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#2385E8]/40 via-[#FF7A00]/20 to-[#FF7A00]/40 rounded-full blur-md opacity-40 group-hover:opacity-100 group-hover:scale-115 transition-all duration-300 pointer-events-none" />

        {/* Outer Metallic Gradient Bezel */}
        <div
          className={`relative ${sizeClasses[size] || sizeClasses.md} rounded-full p-[2px] bg-gradient-to-tr from-[#2385E8] via-[#1459B8] to-[#FF7A00] shadow-[0_4px_16px_rgba(7,26,51,0.25)] group-hover:shadow-[0_0_24px_rgba(255,122,0,0.45)] group-hover:scale-105 transition-all duration-300`}
        >
          {/* Inner Circular Medallion */}
          <div className="relative w-full h-full rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]">
            <img
              src={`${import.meta.env.BASE_URL}logo-emblem.png`}
              alt={title}
              className="w-full h-full object-contain select-none pointer-events-none transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Specular Diagonal Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none rounded-full" />
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && !iconOnly && (
        <div className="flex flex-col text-left select-none">
          <div className={`${textSizes[size] || textSizes.md} font-sans`}>
            {renderTitle()}
          </div>
          {subtitle && (
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_6px_#FF7A00] shrink-0 animate-pulse" />
              <span
                className={`${subtitleSizes[size] || subtitleSizes.md} font-bold uppercase ${
                  textLight ? 'text-[#2385E8] group-hover:text-[#4facfe]' : 'text-[#1459B8] group-hover:text-[#2385E8]'
                } font-sans transition-colors`}
              >
                {subtitle}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
