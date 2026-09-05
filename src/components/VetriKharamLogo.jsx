import React, { useState } from 'react';

/**
 * Modern Corporate 3D Vector Emblem Logo Component
 * Uses /logo.mp4 as the live animated emblem mark, with high-resolution 3D poster fallback.
 */
export default function VetriKharamLogo({
  size = 'md', // 'sm', 'md', 'lg'
  showText = true,
  title = 'Vetrikharam',
  subtitle = 'Home Services',
  textLight = false,
  className = '',
  iconOnly = false,
  useStatic = false,
}) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
  };

  const textClasses = {
    sm: 'text-[15px] font-bold',
    md: 'text-lg sm:text-2xl font-bold',
    lg: 'text-2xl sm:text-3xl font-bold',
  };

  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3 group shrink-0 ${className}`}>
      {/* 3D Animated Emblem Container */}
      <div
        className={`relative ${sizeClasses[size] || sizeClasses.md} overflow-hidden bg-white border border-[#0066FF]/20 shadow-[0_2px_10px_rgba(0,102,255,0.12)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#0066FF]/40 group-hover:shadow-[0_4px_18px_rgba(0,102,255,0.22)] transition-all duration-300`}
      >
        {useStatic ? (
          <img
            src={`${import.meta.env.BASE_URL}logo-emblem.png`}
            alt={title}
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        ) : (
          <video
            src={`${import.meta.env.BASE_URL}logo.mp4`}
            autoPlay
            loop
            muted
            playsInline
            poster={`${import.meta.env.BASE_URL}logo-emblem.png`}
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover scale-[2.33] origin-[50%_36.6%] select-none pointer-events-none"
            title="Antigravity 3D Emblem"
          />
        )}

        {/* Subtle glossy sheen reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none rounded-[inherit]" />
      </div>

      {/* Brand Typography */}
      {showText && !iconOnly && (
        <span className={`${textClasses[size] || textClasses.md} font-poppins tracking-tight ${textLight ? 'text-white' : 'text-navy'} flex items-center`}>
          <span>{title}</span>
          {subtitle && (
            <span className={`font-normal ml-1.5 ${textLight ? 'text-blue-400' : 'text-primary'} ${size === 'sm' ? 'inline' : 'hidden sm:inline'}`}>
              {subtitle}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
