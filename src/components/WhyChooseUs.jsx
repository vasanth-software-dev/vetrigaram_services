import React from 'react';
import { ShieldCheck, Zap, Receipt, Settings, Award, CalendarDays } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Technicians",
      desc: "Every technician is background checked, certified, and fully vetted for safety and competence.",
      icon: ShieldCheck,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      title: "Fast Doorstep Service",
      desc: "No long waiting queues. Get professional service at your doorstep at your chosen time slot.",
      icon: Zap,
      color: "text-amber-500 bg-amber-50 border-amber-100"
    },
    {
      title: "Transparent Pricing",
      desc: "Clear upfront prices with zero hidden charges. Confirm estimate before any work begins.",
      icon: Receipt,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Genuine Spare Parts",
      desc: "We use only authentic, brand-approved spare parts to ensure durability and high performance.",
      icon: Settings,
      color: "text-indigo-500 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Service Warranty",
      desc: "Enjoy complete peace of mind with a robust 30-day warranty on all repairs and parts.",
      icon: Award,
      color: "text-rose-500 bg-rose-50 border-rose-100"
    },
    {
      title: "Easy Booking",
      desc: "Book, track, and manage your service appointments online in just three simple steps.",
      icon: CalendarDays,
      color: "text-sky-500 bg-sky-50 border-sky-100"
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-neutralBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">The vetikharam Promise</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            Why Homeowners Choose vetikharam
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            We are dedicated to providing premium quality repair and maintenance services with complete safety and convenience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={feature.title}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-premium hover-float text-left flex flex-col h-full"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${feature.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy font-poppins mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
