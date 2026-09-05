import React, { useState } from 'react';
import { 
  Tv, AirVent, IceCream, WashingMachine, Flame, 
  Lightbulb, Zap, Wrench, Shield, ArrowRight,
  Droplet, Hammer, Power, HelpCircle, Check
} from 'lucide-react';

export const servicesData = {
  appliances: {
    title: "Appliance Repair",
    description: "Keep your essential home appliances running at peak efficiency with expert diagnostics.",
    icon: WashingMachine,
    items: [
      {
        name: "AC Repair & Servicing",
        desc: "Full cleaning, gas charging, condenser check, and performance tuning.",
        price: "$69",
        icon: AirVent
      },
      {
        name: "Refrigerator Repair",
        desc: "Cooling restoration, compressor diagnostic, thermostat replacement.",
        price: "$79",
        icon: IceCream
      },
      {
        name: "Washing Machine Repair",
        desc: "Drum fix, motor troubleshooting, inlet valve check, and noise reduction.",
        price: "$59",
        icon: WashingMachine
      },
      {
        name: "Geyser / Water Heater Repair",
        desc: "Heating element replacement, thermostat adjustment, leak repair.",
        price: "$49",
        icon: Flame
      }
    ]
  },
  electrical: {
    title: "Electrical Services",
    description: "Safe, certified, and precise electrical diagnostic and installation services.",
    icon: Power,
    items: [
      {
        name: "Electrical Repair",
        desc: "General repairs, fixture updates, junction box fixes, and connections.",
        price: "$39",
        icon: Zap
      },
      {
        name: "Switch & Socket Repair",
        desc: "Safe replacement of faulty switches, power sockets, and faceplates.",
        price: "$29",
        icon: Power
      },
      {
        name: "Fan Installation & Repair",
        desc: "Ceiling or exhaust fan mounting, regulator replacements, and motor check.",
        price: "$39",
        icon: AirVent
      },
      {
        name: "Light Installation",
        desc: "LED tube lights, chandeliers, smart lights, and outdoor fixtures.",
        price: "$29",
        icon: Lightbulb
      },
      {
        name: "Wiring & Rewiring",
        desc: "Safe conduit-based wiring for home additions and safety overhauls.",
        price: "Get a Quote",
        icon: Wrench
      },
      {
        name: "MCB / Fuse Repair",
        desc: "Circuit breaker diagnostics, short circuit prevention, load balancing.",
        price: "$49",
        icon: Shield
      },
      {
        name: "Electrical Fault Troubleshooting",
        desc: "Comprehensive tracing of trips, wire breaks, and power drops.",
        price: "$59",
        icon: HelpCircle
      }
    ]
  },
  plumbing: {
    title: "Plumbing Services",
    description: "Reliable tap, pipe, leak, and drain repair from experienced plumbing professionals.",
    icon: Droplet,
    items: [
      {
        name: "Tap & Faucet Repair",
        desc: "Leaky spindle fix, washer replacements, or brand new tap installations.",
        price: "$29",
        icon: Droplet
      },
      {
        name: "Pipe Leakage Repair",
        desc: "Tracing wall dampness, pipe segment replacements, and drain joint sealing.",
        price: "$49",
        icon: Hammer
      },
      {
        name: "Drain Cleaning",
        desc: "Clog removal using pressure jetting and structural inspection.",
        price: "$39",
        icon: Wrench
      },
      {
        name: "Bathroom Plumbing",
        desc: "Shower mixers, diverters, health faucets, and bathtub drain repairs.",
        price: "$59",
        icon: Droplet
      },
      {
        name: "Kitchen Plumbing",
        desc: "Sink installation, water purifier connection, waste pipe fixes.",
        price: "$49",
        icon: Hammer
      },
      {
        name: "Water Tank Services",
        desc: "Structural inspection, inlet control valve repair, and full sanitizing.",
        price: "Get a Quote",
        icon: Droplet
      },
      {
        name: "Toilet Repair & Installation",
        desc: "Flush valve repair, seat replacements, commode installations.",
        price: "$69",
        icon: Shield
      },
      {
        name: "General Plumbing Repair",
        desc: "Ancillary plumbing fixes, pressure checking, pressure pump setups.",
        price: "$39",
        icon: HelpCircle
      }
    ]
  }
};

export default function Services({ onBookNow }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'appliances', label: 'Appliance Repair' },
    { id: 'electrical', label: 'Electrical Services' },
    { id: 'plumbing', label: 'Plumbing Services' }
  ];

  const getFilteredItems = () => {
    if (activeTab === 'all') {
      return [
        ...servicesData.appliances.items.map(item => ({ ...item, category: 'appliances', catTitle: 'Appliance Repair' })),
        ...servicesData.electrical.items.map(item => ({ ...item, category: 'electrical', catTitle: 'Electrical Services' })),
        ...servicesData.plumbing.items.map(item => ({ ...item, category: 'plumbing', catTitle: 'Plumbing Services' }))
      ];
    }
    return servicesData[activeTab].items.map(item => ({ 
      ...item, 
      category: activeTab,
      catTitle: servicesData[activeTab].title 
    }));
  };

  return (
    <section id="services" className="py-20 bg-neutralBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Our Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            Everything Your Home Needs
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Professional services for your appliances, electrical systems and plumbing — all in one place.
            <span className="block mt-2 text-sm text-emerald-600 font-semibold font-poppins">
              ★ Per visit (Inspection charge) ₹149 (Adjusted in final service bill)
            </span>
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 border active:scale-[0.98] ${
                activeTab === cat.id
                  ? 'bg-primary text-white border-primary shadow-button-blue'
                  : 'bg-white text-navy/70 border-gray-100 hover:border-gray-300 hover:text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredItems().map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={`${service.name}-${index}`}
                className="bg-white rounded-3xl p-6 border border-gray-100/80 shadow-premium hover-float flex flex-col justify-between h-full"
              >
                <div>
                  {/* Card Icon & Tag */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="bg-primary/5 text-primary p-3.5 rounded-2xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-poppins">
                      {service.catTitle}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-navy font-poppins tracking-tight mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-navy/60 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                  {/* <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-medium leading-none">Starting at</span>
                    <span className="text-lg font-extrabold text-navy font-poppins mt-1 block">
                      {service.price}
                    </span>
                  </div> */}
                  
                  <button
                    onClick={() => onBookNow(service.category, service.name)}
                    className="flex items-center space-x-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm group"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
