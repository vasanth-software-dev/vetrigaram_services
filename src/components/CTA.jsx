import React from 'react';
import { CalendarDays, Phone, Star } from 'lucide-react';
import { CONTACT_NUMBER } from '../utils/contacts';

export default function CTA({ onBookClick }) {
  return (
    <section className="py-20 relative bg-navy overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Radial circles grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Trust badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 text-orange border border-white/10 px-4 py-1.5 rounded-full mb-6">
          <Star className="w-4 h-4 fill-orange" />
          <span className="text-xs font-bold font-poppins uppercase tracking-wider text-white">100% Satisfaction Guarantee</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your Home Deserves <span className="text-orange">Expert Care.</span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
          From complex appliance troubleshooting to urgent appliance repairs, Vetikharam’s verified local technicians are ready to help.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <button
            onClick={onBookClick}
            className="bg-orange hover:bg-orange-dark text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-200 shadow-button-orange hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-base flex items-center justify-center space-x-2"
          >
            <CalendarDays className="w-5 h-5" />
            <span>Book a Service</span>
          </button>
          
          <a
            href={`tel:+91${CONTACT_NUMBER}`} 
            className="border border-white/20 hover:border-white text-white bg-white/5 hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] text-base flex items-center justify-center space-x-2 shadow-sm"
          >
            <Phone className="w-5 h-5 text-orange" />
            <span>{CONTACT_NUMBER}</span>
          </a>
        </div>

        {/* Supporting line */}
        <p className="text-xs text-gray-400 mt-6 font-medium">
          Available 24/7 for emergency repair inquiries. Average response time under 15 minutes.
        </p>

      </div>
    </section>
  );
}
