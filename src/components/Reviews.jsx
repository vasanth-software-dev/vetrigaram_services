import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Reviews() {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: "Robert Chen",
      location: "Manhattan, NY",
      service: "AC Repair & Servicing",
      rating: 5,
      comment: "Outstanding work! My AC stopped cooling in the middle of a hot summer day. The technician arrived within 2 hours, diagnosed a capacitor failure, and replaced it immediately. Clean and professional service."
    },
    {
      name: "Emily Watson",
      location: "Beverly Hills, CA",
      service: "Switch & Socket Repair",
      rating: 5,
      comment: "Had some switches short circuiting in my kitchen. The technician was extremely safety-conscious, wore shoe covers, explained the grounding issue clearly, and completed the repair quickly. Highly recommend!"
    },
    {
      name: "David Miller",
      location: "Lincoln Park, IL",
      service: "Drain Cleaning",
      rating: 5,
      comment: "The drain clogging was a nightmare. The plumber from vetikharam had high-pressure jetting equipment and cleared the line in minutes. No mess left behind. Very satisfied with the upfront pricing too."
    },
    {
      name: "Amanda Ross",
      location: "Pasadena, CA",
      service: "Washing Machine Repair",
      rating: 5,
      comment: "Washing machine was making loud banging noises during spin cycles. The expert found it was out of alignment and the suspension rods were worn. Excellent repair quality, now running silent as new!"
    },
    {
      name: "Michael Thompson",
      location: "Midtown, TX",
      service: "Wiring & Rewiring",
      rating: 5,
      comment: "Professional and prompt. They did the full wiring checklist for our home extension. Upfront quote was exactly what they charged at the end. Extremely reliable and tidy craftsmanship."
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
    <section id="reviews" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout: Sidebar + Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Overall score */}
          <div className="lg:col-span-4 text-left">
            <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 leading-tight tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-navy/70 mt-4 text-sm sm:text-base leading-relaxed">
              We take pride in our service quality. Discover how our verified home experts are helping homeowners live comfortably.
            </p>

            {/* Overall Rating card */}
            <div className="bg-neutralBg rounded-3xl p-6 border border-gray-100 mt-8 flex items-center space-x-4 w-fit">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm text-center">
                <span className="text-3xl font-extrabold text-navy font-poppins">4.8</span>
                <span className="text-xs text-gray-400 block font-medium">/ 5</span>
              </div>
              <div>
                <div className="flex items-center text-orange space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-orange text-orange" />
                  ))}
                </div>
                <span className="text-xs font-bold text-navy mt-1.5 block font-poppins">
                  ★★★★★ Average Rating
                </span>
                <span className="text-[11px] text-gray-500 block">Based on 10K+ bookings</span>
              </div>
            </div>

            {/* Slide Arrows */}
            <div className="flex items-center space-x-3 mt-8 hidden lg:flex">
              <button 
                onClick={() => scroll('left')}
                className="bg-neutralBg hover:bg-primary hover:text-white text-navy p-3.5 rounded-xl border border-gray-100 transition-colors active:scale-[0.95] shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="bg-neutralBg hover:bg-primary hover:text-white text-navy p-3.5 rounded-xl border border-gray-100 transition-colors active:scale-[0.95] shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Carousel grid */}
          <div className="lg:col-span-8 relative min-w-0">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  className="bg-neutralBg border border-gray-100 rounded-[32px] p-6 min-w-[280px] sm:min-w-[380px] max-w-[400px] snap-start flex flex-col justify-between shadow-premium hover:shadow-premium-hover transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-navy font-poppins leading-none text-base">{test.name}</h3>
                        <span className="text-[11px] text-gray-400 mt-1 block">{test.location}</span>
                      </div>
                      
                      {/* Quote Mark */}
                      <div className="text-primary/10">
                        <Quote className="w-8 h-8 fill-current" />
                      </div>
                    </div>

                    {/* Stars & Service Badge */}
                    <div className="flex items-center justify-between mb-4.5 bg-white py-2 px-3.5 rounded-xl border border-gray-100/50">
                      <div className="flex items-center text-orange space-x-0.5">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-orange text-orange" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg uppercase font-poppins">
                        {test.service}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-navy/70 leading-relaxed font-medium">
                      "{test.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile swipe indicator */}
            <p className="text-center text-xs text-gray-400 mt-2 block lg:hidden">
              Swipe left/right to read more reviews
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
