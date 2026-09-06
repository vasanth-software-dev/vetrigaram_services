import React from 'react';
import { ArrowUpRight, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { CONTACT_NUMBER } from '../utils/contacts';

export default function CTA({ onBookClick }) {
  return (
    <section className="py-24 relative bg-[#071A33] overflow-hidden border-t border-[#2385E8]/20 text-white text-center">
      {/* Dynamic Circular Orbital Graphics in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-dashed border-[#2385E8]/20 animate-orbital-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#FF7A00]/20 animate-orbital-reverse pointer-events-none" />
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#2385E8]/15 via-[#FF7A00]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
          <span>Immediate Doorstep Dispatch</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          Ready to Move <span className="text-gradient-orange">Forward?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Let’s turn your next opportunity into measurable growth. Book your certified technician or schedule an on-site diagnostic today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <button
            onClick={onBookClick}
            className="bg-gradient-orange-btn text-white font-bold px-9 py-4 rounded-xl text-base flex items-center justify-center space-x-2.5 shadow-button-orange group"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          
          <a
            href={`https://api.whatsapp.com/send?phone=+91${CONTACT_NUMBER}&text=Hello%20Vetrigaram!%20I%20am%20ready%20to%20book%20a%20technician.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-blue font-semibold px-8 py-4 rounded-xl text-base flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:+91${CONTACT_NUMBER}`}
            className="px-6 py-4 rounded-xl text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all text-sm font-semibold flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4 text-[#FF7A00]" />
            <span>Call +91 {CONTACT_NUMBER}</span>
          </a>
        </div>

        {/* Confidence Assurance */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10 text-xs text-gray-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>30-Day Guaranteed Warranty</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
            <span>₹149 Transparent Diagnostic</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2385E8]" />
            <span>60-90 Min Urban Arrival</span>
          </div>
        </div>

      </div>
    </section>
  );
}
