import React from 'react';
import { Phone, CalendarDays } from 'lucide-react';

export default function MobileStickyBar({ onBookClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(11,31,58,0.08)] px-4 py-3 flex items-center gap-2 lg:hidden">
      <a
        href="tel:+914440114081"
        className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-white py-3 px-2 rounded-xl font-semibold hover:bg-navy-light transition-all active:scale-[0.98] shrink-0"
      >
        <Phone className="w-4 h-4 text-orange shrink-0" />
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Call Support</span>
      </a>
      <button
        onClick={onBookClick}
        className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-3 px-2 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-button-blue active:scale-[0.98] shrink-0"
      >
        <CalendarDays className="w-4 h-4 shrink-0" />
        <span className="text-xs sm:text-sm font-bold whitespace-nowrap">Book Now</span>
      </button>
    </div>
  );
}
