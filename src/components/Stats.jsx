import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, ShieldCheck, Star } from 'lucide-react';

function CountUp({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value based on progress
      const currentValue = progress * end;
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  // Handle floats vs integers
  const displayVal = Number.isInteger(end) 
    ? Math.floor(count).toLocaleString() 
    : count.toFixed(1);

  return <span>{displayVal}{suffix}</span>;
}

export default function Stats() {
  const stats = [
    {
      label: "Happy Customers",
      endVal: 10000,
      suffix: "+",
      icon: Users,
      desc: "Serviced & satisfied families"
    },
    {
      label: "Services Completed",
      endVal: 5000,
      suffix: "+",
      icon: CheckCircle,
      desc: "Repairs & setups completed"
    },
    {
      label: "Verified Technicians",
      endVal: 100,
      suffix: "+",
      icon: ShieldCheck,
      desc: "Certified local technicians"
    },
    {
      label: "Average Rating",
      endVal: 4.8,
      suffix: "/5",
      icon: Star,
      desc: "Based on 10K+ customer reviews"
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-premium text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                {/* Icon */}
                <div className="bg-white/10 p-3 rounded-2xl mb-4 text-orange">
                  <IconComponent className="w-6 h-6 text-orange fill-orange/10" />
                </div>
                
                {/* Counter */}
                <span className="text-3xl sm:text-4xl font-extrabold font-poppins tracking-tight block">
                  <CountUp end={stat.endVal} suffix={stat.suffix} />
                </span>

                {/* Label */}
                <span className="text-sm font-bold text-gray-200 mt-2 font-poppins block leading-tight">
                  {stat.label}
                </span>

                {/* Description */}
                <span className="text-[11px] text-gray-300 mt-1 block">
                  {stat.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
