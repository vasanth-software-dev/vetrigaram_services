import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Reviews() {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: "S. Raghavan",
      location: "Ambattur Estate, Chennai",
      service: "AC Performance Overhaul",
      rating: 5,
      comment: "Outstanding work! My split AC unit stopped cooling in peak summer heat. The technician arrived in 45 minutes, diagnosed a faulty dual-run capacitor, and replaced it with genuine OEM parts. Completely transparent billing."
    },
    {
      name: "Meenakshi Sundaram",
      location: "Anna Nagar West, Chennai",
      service: "Refrigerator Cooling Fix",
      rating: 5,
      comment: "Our double-door refrigerator was constantly tripping the breaker. The Vetrigaram engineer ran circuit diagnostics, cleaned the condenser coils, and resolved the relay fault in under an hour. Highly professional."
    },
    {
      name: "K. Karthikeyan",
      location: "Velachery, Chennai",
      service: "Washing Machine Balancing",
      rating: 5,
      comment: "Our front-load machine shook violently during spin cycles. The team disassembled the suspension rods, balanced the drum bearings, and now it runs whisper-quiet. The ₹149 fee was smoothly adjusted into the bill."
    },
    {
      name: "Pooja Venkatesh",
      location: "T. Nagar, Chennai",
      service: "Geyser & Heating Service",
      rating: 5,
      comment: "Water heater stopped heating during early morning hours. Booked online and a technician was at our door by 9:00 AM. Replaced the burned heating element with full 30-day warranty coverage. Excellent service."
    },
    {
      name: "R. Balasubramanian",
      location: "Mogappair East, Chennai",
      service: "Power Backup & Inverter",
      rating: 5,
      comment: "Scheduled a full electrical backup check before monsoon season. Complete inspection of terminals, gravity check on batteries, and inverter PCB calibration. Thorough, polite, and tidy craftsmanship."
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-24 bg-white relative overflow-hidden border-b border-[#D9DEE5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout: Sidebar + Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Overall score */}
          <div className="lg:col-span-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              <span>Verified Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A33] tracking-tight leading-tight mb-4">
              Trusted by Thousands Across Chennai.
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              Real feedback from residential homeowners, facility managers, and business operators who rely on Vetrigaram for guaranteed technical execution.
            </p>

            {/* Overall Rating card */}
            <div className="bg-[#F5F7FA] rounded-2xl p-6 border border-[#D9DEE5] flex items-center space-x-4 w-fit shadow-sm">
              <div className="bg-white p-3 rounded-xl border border-[#D9DEE5] text-center shadow-xs">
                <span className="text-3xl font-extrabold text-[#071A33]">4.8</span>
                <span className="text-[10px] text-gray-400 block font-semibold">OUT OF 5</span>
              </div>
              <div>
                <div className="flex items-center text-[#FF7A00] space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF7A00] text-[#FF7A00]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#071A33] mt-1.5 block">
                  ★★★★★ Verified Rating
                </span>
                <span className="text-[11px] text-gray-500 block">Based on 10,000+ completed repairs</span>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="items-center space-x-3 mt-8 hidden lg:flex">
              <button 
                onClick={() => scroll('left')}
                aria-label="Previous review"
                className="bg-[#F5F7FA] hover:bg-[#071A33] hover:text-white text-[#071A33] p-3.5 rounded-xl border border-[#D9DEE5] transition-colors active:scale-95 shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                aria-label="Next review"
                className="bg-[#F5F7FA] hover:bg-[#071A33] hover:text-white text-[#071A33] p-3.5 rounded-xl border border-[#D9DEE5] transition-colors active:scale-95 shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Carousel grid */}
          <div className="lg:col-span-8 relative min-w-0">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  className="bg-[#F5F7FA] border border-[#D9DEE5] rounded-2xl p-7 min-w-[290px] sm:min-w-[380px] max-w-[400px] snap-start flex flex-col justify-between shadow-premium hover:shadow-premium-hover hover-lift transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-[#071A33] text-base">{test.name}</h3>
                        <span className="text-[11px] text-gray-500 mt-0.5 block">{test.location}</span>
                      </div>
                      
                      <div className="text-[#2385E8]/20">
                        <Quote className="w-7 h-7 fill-current" />
                      </div>
                    </div>

                    {/* Stars & Service Badge */}
                    <div className="flex items-center justify-between mb-4 bg-white py-2 px-3 rounded-lg border border-[#D9DEE5]/60">
                      <div className="flex items-center text-[#FF7A00] space-x-0.5">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#1459B8] bg-[#2385E8]/10 px-2 py-0.5 rounded uppercase">
                        {test.service}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      "{test.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-2 block lg:hidden">
              Swipe left/right to view more reviews
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
