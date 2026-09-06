import React from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Clock, 
  TrendingUp
} from 'lucide-react';

export default function Hero({ onBookClick }) {
  const handleExploreClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-midnight text-white">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2385E8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#1459B8]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Ambient Grid / Orbit Backdrop Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2385E8 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#2385E8]/30 bg-[#1459B8]/20 backdrop-blur-md mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
              <span className="text-xs font-semibold text-[#2385E8] tracking-wider uppercase">
                Precision Tech • Doorstep Engineering
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 animate-fade-in-up">
              Turn Momentum Into <br />
              <span className="text-gradient-orange">Measurable Growth.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-8 font-normal">
              Vetrigaram powers mission-critical doorstep appliance repair, precision diagnostics, and electrical restoration across Chennai & Ambattur. Certified technicians, transparent pricing, and 30-day guaranteed service.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onBookClick}
                className="bg-gradient-orange-btn text-white font-bold text-base px-8 py-4 rounded-xl shadow-button-orange flex items-center justify-center space-x-2.5 group"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={handleExploreClick}
                className="btn-outline-blue font-semibold text-base px-7 py-4 rounded-xl flex items-center justify-center space-x-2"
              >
                <span>Explore Solutions</span>
                <span className="text-[#FF7A00]">↓</span>
              </button>
            </div>

            {/* Confidence Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-xl">
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#2385E8]" />
                  <span>Arrival</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  60-90 Mins
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium mb-1">
                  <Zap className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Diagnostic</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  ₹149 Adjusted
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Warranty</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                  30-Day Cover
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Sophisticated Orbital Logo Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center z-10 w-full py-8 lg:py-0">
            
            {/* Ambient Backlight for Logo */}
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              
              {/* Outer Orbital Ring (Slow clockwise) */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#2385E8]/25 animate-orbital-slow pointer-events-none">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2385E8] shadow-[0_0_12px_#2385E8]" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1459B8]" />
              </div>

              {/* Middle Orbital Ring (Counter-clockwise with orange velocity node) */}
              <div className="absolute inset-5 sm:inset-7 rounded-full border border-[#2385E8]/20 animate-orbital-reverse pointer-events-none">
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FF7A00] shadow-[0_0_16px_#FF7A00]" />
              </div>

              {/* Inner Radiant Orange Momentum Arc */}
              <div 
                className="absolute inset-10 sm:inset-12 rounded-full border-2 border-transparent border-b-[#FF7A00] border-r-[#FF9A1F] pointer-events-none opacity-80"
                style={{ transform: 'rotate(15deg)' }}
              />

              {/* Soft Center Glow */}
              <div className="absolute inset-16 bg-radial from-[#2385E8]/20 via-[#0B2345]/50 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Central 3D Emblem Container */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#071A33] p-3 border border-[#2385E8]/35 shadow-[0_12px_45px_rgba(7,26,51,0.8),0_0_35px_rgba(35,133,232,0.25)] flex items-center justify-center group hover:scale-105 transition-all duration-500 z-20">
                <img
                  src={`${import.meta.env.BASE_URL}logo-emblem.png`}
                  alt="Vetrigaram Momentum Emblem"
                  className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
              </div>

              {/* Floating Glassmorphic Metric Badge 1 (Top-Right) */}
              <div className="absolute -top-3 right-0 sm:-right-4 glass-card-dark p-3 sm:px-4 sm:py-2.5 rounded-xl flex items-center space-x-2.5 shadow-card-dark animate-float z-30">
                <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/20 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">+98% Satisfaction</div>
                  <div className="text-[10px] text-gray-300">5-Star Rated Service</div>
                </div>
              </div>

              {/* Floating Glassmorphic Metric Badge 2 (Bottom-Left) */}
              <div 
                className="absolute -bottom-4 left-0 sm:-left-4 glass-card-dark p-3 sm:px-4 sm:py-2.5 rounded-xl flex items-center space-x-2.5 shadow-card-dark animate-float z-30"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#2385E8]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2385E8]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight">Verified Engineers</div>
                  <div className="text-[10px] text-gray-300">Certified & Background Checked</div>
                </div>
              </div>

              {/* Floating Metric Badge 3 (Upward Growth Trajectory Indicator) */}
              <div 
                className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 glass-card-dark px-3 py-2 rounded-xl flex items-center space-x-2 shadow-card-dark hidden sm:flex z-30"
              >
                <div className="w-6 h-6 rounded-md bg-[#FF7A00]/15 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-[#FF7A00]" />
                </div>
                <span className="text-[11px] font-bold text-white">3.5x Speed</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
