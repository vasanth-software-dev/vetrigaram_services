import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  Clock, 
  TrendingUp
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
            
            {/* Visual Composition Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-3xl bg-[#071A33] border border-[#2385E8]/30 shadow-2xl p-8 flex items-center justify-center overflow-hidden group">
              
              {/* Radial Gradients & Glows */}
              <div className="absolute inset-0 bg-radial from-[#1459B8]/30 via-transparent to-transparent opacity-80" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#FF7A00]/20 rounded-full blur-2xl" />

              {/* Concentric Rotating Orbital Graphics */}
              <div className="absolute inset-8 rounded-full border border-dashed border-[#2385E8]/30 animate-orbital-slow pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-[#2385E8]/20 animate-orbital-reverse pointer-events-none" />
              
              {/* Metallic Orange Forward Acceleration Arc */}
              <div 
                className="absolute inset-12 rounded-full border-2 border-transparent border-t-[#FF7A00] border-r-[#FF9A1F] pointer-events-none"
                style={{ transform: 'rotate(45deg)' }}
              />

              {/* Central Logo Emblem with Specular Depth */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-white p-3 shadow-2xl border border-white/20 flex items-center justify-center z-20 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={`${import.meta.env.BASE_URL}logo-emblem.png`}
                  alt="Vetrigaram Emblem"
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </div>

              {/* Floating Glassmorphic Milestone 1 (Top Left) */}
              <div className="absolute top-6 left-6 glass-card-dark px-3.5 py-2 rounded-xl flex items-center space-x-2 border border-white/10 shadow-lg z-30">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-tight">100% Genuine Spares</span>
              </div>

              {/* Floating Glassmorphic Milestone 2 (Bottom Right) */}
              <div className="absolute bottom-6 right-6 glass-card-dark px-3.5 py-2 rounded-xl flex items-center space-x-2 border border-white/10 shadow-lg z-30">
                <TrendingUp className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span className="text-xs font-bold text-white tracking-tight">Guaranteed Reliability</span>
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
