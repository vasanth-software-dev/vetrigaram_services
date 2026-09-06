import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: "How quickly can a technician arrive at my doorstep in Chennai & Ambattur?",
      a: "Our mobile technician hubs ensure dispatch within 60 to 90 minutes in Ambattur and 2 to 4 hours across wider Chennai areas, depending on your preferred booking slot."
    },
    {
      q: "What is the ₹149 inspection fee policy?",
      a: "We charge a nominal ₹149 diagnostic fee for the technician's arrival, inspection, and formal estimate. If you approve the repair, this entire ₹149 is adjusted and deducted from your final bill, effectively making the inspection free."
    },
    {
      q: "Are replacement parts authentic and covered by a warranty?",
      a: "Yes. We source only genuine, brand-certified replacement parts. Every spare part installed carries authentic manufacturer warranty plus our unconditional 30-day Vetrigaram service guarantee."
    },
    {
      q: "What happens if the problem returns after repair?",
      a: "Every completed repair is protected under our 30-day warranty. If the exact same issue reoccurs within 30 days of service, a senior engineer will re-inspect and resolve it without additional labor charges."
    },
    {
      q: "Can I reschedule or cancel my appointment?",
      a: "Yes, you can reschedule or cancel your appointment free of charge up to 2 hours before your scheduled time slot by calling our direct helpline at +91 6374121120."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all UPI platforms (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery after the service is fully verified and completed to your 100% satisfaction."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#F5F7FA] relative overflow-hidden border-b border-[#D9DEE5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#2385E8]/10 border border-[#2385E8]/30 text-[#1459B8] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#2385E8]" />
            <span>Answers & Assurance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A33] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Everything you need to know about our certified technician arrival, pricing transparency, and service warranties.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-[#2385E8]/40 shadow-premium' 
                    : 'bg-white/80 border-[#D9DEE5] hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#071A33] tracking-tight pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#FF7A00] text-white rotate-180' : 'bg-[#071A33]/5 text-[#071A33]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
