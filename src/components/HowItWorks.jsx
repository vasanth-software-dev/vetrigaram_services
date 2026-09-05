import React from 'react';
import { MousePointerClick, CalendarRange, CheckCircle2 } from 'lucide-react';

export default function HowItWorks({ onBookClick }) {
  const steps = [
    {
      num: "01",
      title: "Choose a Service",
      desc: "Select from appliance repair categories and find the specific repair you need.",
      icon: MousePointerClick,
      color: "text-primary bg-primary/5"
    },
    {
      num: "02",
      title: "Book a Technician",
      desc: "Select your preferred date, time slot, and fill in your address. Confirm in less than a minute.",
      icon: CalendarRange,
      color: "text-orange bg-orange/5"
    },
    {
      num: "03",
      title: "Get It Fixed",
      desc: "A background-checked, fully equipped technician arrives on time, inspects, and fixes the issue.",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Process flow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Get your home repairs solved in three simple, quick, and secure steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative mb-14">
          
          {/* Connector Line (Desktop) */}
          <div className="absolute top-24 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-200 -z-0 hidden lg:block" />

          {/* Individual Steps */}
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center px-4">
                
                {/* Step Circle with Icon */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border border-gray-100 shadow-md mb-6 relative bg-white`}>
                  
                  {/* Step Number Tag */}
                  <span className="absolute -top-2 -right-2 bg-navy text-white text-xs font-bold font-poppins w-6 h-6 rounded-full flex items-center justify-center">
                    {step.num}
                  </span>

                  <IconComponent className={`w-8 h-8 ${step.color.split(' ')[0]}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy font-poppins mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onBookClick}
            className="bg-primary hover:bg-primary-dark text-white font-extrabold px-10 py-4 rounded-2xl shadow-button-blue transition-all duration-200 active:scale-[0.98] active:translate-y-0 inline-flex items-center space-x-2 text-base hover:-translate-y-0.5"
          >
            <span>Book Your Service</span>
          </button>
        </div>

      </div>
    </section>
  );
}
