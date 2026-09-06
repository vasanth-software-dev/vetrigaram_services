import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Clock, 
  TrendingUp,
  Star
} from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: "Certified & Background-Verified Specialists",
      desc: "Every technician undergoes rigorous background validation, competency testing, and safety training.",
      icon: ShieldCheck,
    },
    {
      title: "Transparent Pricing with ₹149 Adjusted Diagnostic",
      desc: "Upfront estimates before any repair begins. The ₹149 diagnostic fee is fully adjusted into your final bill.",
      icon: Zap,
    },
    {
      title: "30-Day Warranty & Genuine OEM Spares",
      desc: "Authentic manufacturer parts backed by our unconditional 30-day service and replacement warranty.",
      icon: Award,
    },
    {
      title: "Rapid 60–90 Minute Urban Dispatch",
      desc: "Mobile technician hubs strategically placed across Chennai & Ambattur ensure rapid arrival times.",
      icon: Clock,
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden border-b border-[#D9DEE5]/60">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2385E8]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Visual Inspired by Circular Logo Geometry */}
         <div className="lg:col-span-6 relative flex items-center justify-center"> 
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

          {/* Right Column: Company Story & Forward-Moving Benefits */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              <span>The Vetrigaram Advantage</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-extrabold text-[#071A33] tracking-tight leading-tight mb-5">
              Engineered for Velocity. <br />
              <span className="text-gradient-navy">Built for Uncompromising Quality.</span>
            </h2>

            {/* Story */}
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              We replaced unpredictable local repair calls with a disciplined technology platform. Vetrigaram deploys factory-trained diagnostic specialists equipped with precision testing instruments, transparent pricing models, and genuine replacement components across Chennai and Ambattur.
            </p>

            {/* 4 Benefits with Orange Forward Indicator */}
            <div className="space-y-5 w-full">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-[#2385E8]/20 hover:bg-[#F5F7FA] transition-all group"
                  >
                    {/* Orange Forward Momentum Indicator */}
                    <div className="w-10 h-10 rounded-xl bg-[#071A33] text-[#FF7A00] flex items-center justify-center shrink-0 group-hover:bg-[#FF7A00] group-hover:text-white transition-all shadow-sm">
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#071A33] tracking-tight mb-1 group-hover:text-[#1459B8] transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
