import React from 'react';
import { 
  AirVent, IceCream, WashingMachine, Flame, 
  Zap, Fan, Power, Droplet, Wrench, ShieldAlert
} from 'lucide-react';

export default function PopularServices({ onBookNow }) {

  const popularServices = [
    {
      name: "AC Repair",
      desc: "Deep cleaning, gas charging, filter wash, and cooling troubleshooting.",
      price: "$69",
      icon: AirVent,
      category: "appliances",
      fullName: "AC Repair & Servicing",
      status: true
    },
    {
      name: "AC Installation",
      desc: "Professional AC installation, mounting, piping, wiring, and testing.",
      price: "$89",
      icon: AirVent,
      category: "appliances",
      fullName: "AC Installation",
      status: true
    },
    {
      name: "Refrigerator Repair",
      desc: "Diagnostic checks, gas leakages, and compressor repairs.",
      price: "$79",
      icon: IceCream,
      category: "appliances",
      fullName: "Refrigerator Repair",
      status: true
    },
    {
      name: "Washing Machine Repair",
      desc: "Spin troubleshooting, drum alignment, and inlet repair.",
      price: "$59",
      icon: WashingMachine,
      category: "appliances",
      fullName: "Washing Machine Repair",
      status: true
    },
    {
      name: "Geyser Repair",
      desc: "Thermostat fixes, element checks, and pressure valve maintenance.",
      price: "$49",
      icon: Flame,
      category: "appliances",
      fullName: "Geyser / Water Heater Repair",
      status: true
    },
    {
      name: "Fan Installation",
      desc: "Ceiling fan mounting, wiring, speed regulator setup, and alignment checks.",
      price: "$39",
      icon: Fan,
      category: "appliances",
      fullName: "Fan Installation",
      status: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Top Booked</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            Our Most Popular Services
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Quickly book our most demanded services. Trusted by hundreds of families every day.
          </p>
        </div>

        {/* Popular Services Scroll/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {popularServices  .filter((s) => s.status).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.name}
                className="bg-neutralBg rounded-3xl p-5 border border-gray-100 flex flex-col justify-between hover-float h-full"
              >
                <div>
                  {/* Icon */}
                  <div className="bg-white text-primary p-3 rounded-2xl w-fit shadow-sm mb-4">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-bold text-navy font-poppins mb-1.5 tracking-tight leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-navy/60 leading-relaxed mb-4 line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-gray-100/50 mt-auto flex items-center justify-between">
                  {/* <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium leading-none">Starting</span>
                    <span className="text-sm font-extrabold text-navy font-poppins block mt-0.5">
                      {service.price}
                    </span>
                  </div> */}
                  
                  <button
                    onClick={() => onBookNow(service.category, service.fullName)}
                    className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm"
                  >
                    Book Now
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
