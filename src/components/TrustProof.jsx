import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustProof() {
  const partners = [
    { name: 'Apex Tech Hub', type: 'Enterprise Facilities' },
    { name: 'OmniResidence', type: 'Multi-Unit Property Group' },
    { name: 'Titan Industrial', type: 'HVAC & Refrigeration' },
    { name: 'Horizon Estates', type: 'Residential Communities' },
    { name: 'Vertex Logistics', type: 'Commercial Infrastructure' },
  ];

  return (
    <section className="relative py-10 bg-[#071A33] border-y border-[#2385E8]/15 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial from-[#2385E8]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Trust Statement */}
          <div className="flex items-center space-x-3 shrink-0 text-center md:text-left">
            <div className="w-9 h-9 rounded-lg bg-[#2385E8]/15 border border-[#2385E8]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#2385E8]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">Proven Track Record</p>
              <h3 className="text-sm sm:text-base font-semibold text-gray-200">
                Trusted by ambitious teams building what's next.
              </h3>
            </div>
          </div>

          {/* Muted Partner Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 w-full md:w-auto">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#2385E8]/40 hover:bg-white/[0.06] transition-all flex flex-col items-center justify-center text-center group"
              >
                <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] text-gray-400 group-hover:text-[#2385E8] transition-colors mt-0.5">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
