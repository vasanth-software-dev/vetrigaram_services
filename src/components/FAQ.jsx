import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "How quickly can a technician arrive?",
      a: "Typically, our certified technicians can arrive at your doorstep within 2 to 4 hours of booking, depending on your preferred time slot and technician availability in your local area."
    },
    // {
    //   q: "How much does a service cost?",
    //   a: "Service pricing starts at a flat rate of $29 for minor fixes. For larger wiring, piping, or complex installs, we perform an inspection and provide a transparent, itemized quote before any work begins."
    // },
    // {
    //   q: "Do you provide same-day service?",
    //   a: "Yes! We offer same-day appliance, electrical, and plumbing repairs for all bookings confirmed before 4:00 PM. Active standby teams are dispatched daily."
    // },
    {
      q: "Are spare parts included in the price?",
      a: "The service fee covers standard diagnostics and labor. If any replacement parts are required (such as capacitors, compressor units, taps, or cables), they are billed separately at genuine retail pricing with full warranties."
    },
    // {
    //   q: "Do your repairs come with a warranty?",
    //   a: "Absolutely. We back our craftsmanship and replacement parts with a comprehensive 30-day vetikharam Service Warranty. If the same issue recurs within 30 days, we return and fix it for free."
    // },
    {
      q: "Can I cancel or reschedule my booking?",
      a: "Yes, you can reschedule or cancel your appointment at no extra cost up to 2 hours before your chosen time slot. You can manage this via the online portal or by calling customer care."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit/debit cards, digital wallet transfers, net banking, and cash on delivery after the technician completes the service to your satisfaction."
    },
    // {
    //   q: "Do you provide emergency services?",
    //   a: "Yes! We have standby teams on call for sudden pipe leakages, water tank overflows, or electrical short circuits. Select the nearest slot in the booking form or call our support line immediately."
    // }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-neutralBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins font-semibold">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Find answers to common questions about our services, booking terms, technicians, and warranties.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-navy text-base sm:text-lg hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="pr-4 font-poppins">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {/* Body/Answer Panel */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-56 opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="p-5 text-sm sm:text-[15px] text-navy/65 leading-relaxed bg-neutralBg/30 font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
