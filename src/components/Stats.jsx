import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

function CountUp({ end, suffix = '', prefix = '', decimals = 0, duration = 1600 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const currentValue = progress * end;
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  const displayVal = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return <span>{prefix}{displayVal}{suffix}</span>;
}

export default function Stats() {
  const metrics = [
    {
      value: 250,
      prefix: '+',
      suffix: '',
      decimals: 0,
      label: 'Projects Delivered',
      detail: 'Enterprise sites & residential facilities',
      color: 'text-[#FF7A00]',
      badgeBg: 'bg-[#FF7A00]/15',
      icon: CheckCircle2,
    },
    {
      value: 98,
      prefix: '+',
      suffix: '%',
      decimals: 0,
      label: 'Client Satisfaction',
      detail: 'Verified 5-star customer ratings',
      color: 'text-[#2385E8]',
      badgeBg: 'bg-[#2385E8]/15',
      icon: ShieldCheck,
    },
    {
      value: 3.5,
      prefix: '',
      suffix: 'x',
      decimals: 1,
      label: 'Average Growth',
      detail: 'Faster diagnostic & execution speed',
      color: 'text-[#FF7A00]',
      badgeBg: 'bg-[#FF7A00]/15',
      icon: TrendingUp,
    },
    {
      value: 24,
      prefix: '',
      suffix: '/7',
      decimals: 0,
      label: 'Rapid Support',
      detail: 'Rapid dispatch across Chennai & Ambattur',
      color: 'text-[#2385E8]',
      badgeBg: 'bg-[#2385E8]/15',
      icon: Zap,
    }
  ];

  return (
    <section className="relative py-16 bg-[#0B2345] text-white border-b border-[#2385E8]/20 overflow-hidden">
      {/* Subtle Orbital Background Graphics */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full border border-dashed border-[#2385E8]/15 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full border border-[#FF7A00]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#2385E8]/40 hover:bg-white/[0.07] transition-all duration-300 group hover:-translate-y-1 shadow-card-dark"
              >
                {/* Diagonal Accent Top-Left Line */}
                <div className="absolute top-0 left-6 w-8 h-[2px] bg-gradient-to-r from-[#FF7A00] to-[#2385E8] rounded-full" />

                {/* Metric Icon */}
                <div className={`w-10 h-10 rounded-xl ${item.badgeBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                </div>

                {/* Big Number */}
                <div className={`text-3.5xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${item.color} leading-none mb-2`}>
                  <CountUp 
                    end={item.value} 
                    prefix={item.prefix} 
                    suffix={item.suffix} 
                    decimals={item.decimals} 
                  />
                </div>

                {/* Heading */}
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
                  {item.label}
                </h4>

                {/* Subtext */}
                <p className="text-xs text-gray-300 leading-snug">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
