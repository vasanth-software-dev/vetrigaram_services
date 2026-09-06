import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  const cases = [
    {
      project: "Multi-Unit Inverter AC Overhaul",
      client: "Ambattur Residential Complex",
      tag: "HVAC Engineering",
      challenge: "Chronic refrigerant pressure drop across 18 split systems leading to high electrical bills and repeated system cut-offs.",
      solution: "Conducted nitrogen micro-leak trace testing, ultrasonic braze repair on copper joints, and calibrated R32 gas charging.",
      result: "Zero system downtime recorded across 180+ operational days with a verified 32% drop in monthly compressor power consumption.",
      metric: "+32%",
      metricLabel: "Energy Efficiency",
      accent: "from-[#FF7A00] to-[#FF9A1F]"
    },
    {
      project: "Commercial Cold Storage Diagnostic",
      client: "Gourmet Food Hub, Anna Nagar",
      tag: "Refrigeration Systems",
      challenge: "High-capacity commercial refrigerator tripping main MCB under peak heat loads, risking ₹3.5L of perishable inventory.",
      solution: "Micro-soldered inverter PCB logic board, installed high-torque condenser fan motor, and reset digital thermal sensor relays.",
      result: "Restored operating temperatures within 105 minutes of dispatch, averting spoilage and stabilizing temperature consistency.",
      metric: "100%",
      metricLabel: "Inventory Preserved",
      accent: "from-[#2385E8] to-[#1459B8]"
    },
    {
      project: "Dynamic Drum Bearing Balancing",
      client: "Boutique Hospitality Suites, Velachery",
      tag: "Washing Appliances",
      challenge: "Severe mechanical vibration and loud spin cycles shaking adjacent residential partition walls.",
      solution: "Extracted and replaced worn drum bearings, balanced counterweights, and installed OEM high-damping shock absorbers.",
      result: "Reduced operating acoustic levels to whisper-quiet 52 dB, restoring full operational confidence.",
      metric: "< 2 Hrs",
      metricLabel: "Total Turnaround",
      accent: "from-[#FF7A00] to-[#2385E8]"
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-[#071A33] text-white relative overflow-hidden border-b border-[#2385E8]/20">
      {/* Subtle Background Orbital Curves */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2385E8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              <span>Proven Performance • Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Real Challenges. <br />
              <span className="text-gradient-orange">Measurable Breakthroughs.</span>
            </h2>
          </div>

          <p className="text-gray-300 max-w-md text-sm sm:text-base leading-relaxed">
            See how our certified engineering team resolves persistent diagnostic faults and delivers quantifiable reliability for homes and facilities.
          </p>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0B2345]/80 border border-white/10 hover:border-[#2385E8]/40 p-8 shadow-card-dark flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Diagonal Accent Line at Top Inspired by Arrow */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent}`} />

              {/* Diagonal Watermark Arrow in Background */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <ArrowUpRight className="w-full h-full text-white" />
              </div>

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 text-gray-200">
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {item.client}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-5 group-hover:text-[#2385E8] transition-colors">
                  {item.project}
                </h3>

                {/* Challenge & Solution Breakdown */}
                <div className="space-y-3.5 mb-6 text-xs sm:text-sm">
                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[11px] font-bold text-[#FF7A00] block uppercase tracking-wider mb-1">
                      The Challenge
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>

                  <div className="bg-black/20 p-3.5 rounded-xl border border-white/5">
                    <span className="text-[11px] font-bold text-[#2385E8] block uppercase tracking-wider mb-1">
                      Our Solution
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Outcome Statement */}
                <p className="text-xs text-gray-300 leading-relaxed mb-6 font-normal">
                  <strong className="text-white">Impact:</strong> {item.result}
                </p>
              </div>

              {/* Bottom Metric Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight block leading-none">
                    {item.metric}
                  </span>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mt-1 block">
                    {item.metricLabel}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FF7A00] flex items-center justify-center group-hover:bg-[#FF7A00] group-hover:text-white transition-all shadow-sm">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
