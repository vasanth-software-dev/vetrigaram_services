import React from 'react';
import { 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Services({ onBookNow }) {
  const items = servicesData.appliances.items;

  return (
    <section id="services" className="py-24 bg-[#F5F7FA] relative overflow-hidden">
      {/* Subtle geometric background line */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#2385E8]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#071A33]/5 border border-[#2385E8]/20 text-[#2385E8] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span>Precision Solutions & Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A33] tracking-tight leading-tight">
            Engineered for Reliability. <br />
            <span className="text-gradient-navy">Built on Proven Results.</span>
          </h2>

          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Certified doorstep repair, preventative overhaul, and diagnostic testing delivered by verified specialists across Chennai and Ambattur.
          </p>

          <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-xl bg-white border border-[#D9DEE5] shadow-sm text-xs font-semibold text-[#071A33]">
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
            <span>Standard ₹149 inspection charge — 100% adjusted into your final service invoice</span>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-7 border border-[#D9DEE5]/80 hover:border-[#2385E8]/40 shadow-premium hover:shadow-premium-hover hover-lift flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
              >
                {/* Diagonal Accent line at top of card on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#2385E8] to-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#071A33]/5 border border-[#2385E8]/20 flex items-center justify-center text-[#2385E8] group-hover:bg-[#071A33] group-hover:text-white group-hover:border-[#FF7A00]/50 transition-all duration-300">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-bold text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {service.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#071A33] tracking-tight mb-3 group-hover:text-[#1459B8] transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                    <span>Verified Technician</span>
                  </div>

                  <button
                    onClick={() => onBookNow(service.category, service.name)}
                    className="inline-flex items-center space-x-1.5 text-sm font-bold text-[#071A33] group-hover:text-[#FF7A00] transition-colors"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF7A00] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
