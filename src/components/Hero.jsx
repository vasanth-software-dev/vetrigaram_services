import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Receipt, Award, Phone, CalendarDays, Star, User, CheckCircle2 } from 'lucide-react';
import emailjs from "@emailjs/browser";
import { CONTACT_NUMBER } from '../utils/contacts';
import { validateName, validatePhone, sanitizeText } from '../utils/security';

const referenceNum = () => Math.floor(100000 + Math.random() * 900000);

export default function Hero({ onBookClick }) {
  const [quickForm, setQuickForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
      alt: "Professional technician performing doorstep air conditioner repair and diagnostic testing"
    },
    {
      url: "https://images.unsplash.com/photo-1622044939413-0b829c342434?auto=format&fit=crop&w=1200&q=80",
      alt: "Licensed electrician troubleshooting home circuit breaker panel and wiring"
    },
    {
      url: "https://images.unsplash.com/photo-1607472586893-edb5ca08f55d?auto=format&fit=crop&w=1200&q=80",
      alt: "Expert plumbing technician inspecting water pipes and pressure connections"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleQuickChange = (e) => {
    const { name, value } = e.target;
    setQuickForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateQuick = () => {
    const tempErrors = {};

    const nameCheck = validateName(quickForm.name, { isRequired: true, maxLength: 70 });
    if (!nameCheck.isValid) {
      tempErrors.name = nameCheck.error;
    }

    const phoneCheck = validatePhone(quickForm.phone, { isRequired: true, allowInternational: false });
    if (!phoneCheck.isValid) {
      tempErrors.phone = phoneCheck.error;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuick()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const reference_num = "FX-" + referenceNum();

      const cleanName = validateName(quickForm.name).sanitized || sanitizeText(quickForm.name);
      const cleanPhone = validatePhone(quickForm.phone).sanitized || sanitizeText(quickForm.phone);

      const templateParams = {
        reference_num,
        name: cleanName,
        phone: cleanPhone,
        problem_description: "Quick Booking Request from Hero Banner",
        request_received_on: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      };

      await emailjs.send(
        "service_0j3nlam",
        "template_fhth66j",
        templateParams,
        "7fEFpmWyNsuPUUzKF"
      );

      setBookingRef(reference_num);
      setIsSubmitted(true);
      setErrors({});
    } catch (err) {
      console.error("Hero quick booking error:", err);
      setErrors({ phone: "Booking request failed. Please try again or call directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const trustBadges = [
    { icon: ShieldCheck, text: 'Verified Technicians', desc: 'Background checked experts' },
    { icon: Zap, text: 'Same-Day Service', desc: 'Fast turnaround times' },
    { icon: Receipt, text: 'Transparent Pricing', desc: 'No hidden fees or charges' },
    { icon: Award, text: 'Service Warranty', desc: '30-day warranty coverage' }
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent z-10">
      {/* Background carousel with overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {carouselImages.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              width="1200"
              height="800"
              fetchPriority={idx === 0 ? "high" : "low"}
              loading={idx === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Soft white/light gradient overlay for readability of navy text */}
        <div className="absolute inset-0 bg-white/90 sm:bg-gradient-to-r sm:from-white/95 sm:via-white/90 sm:to-white/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left animate-fade-in-up">
            
            {/* Trust Line Tags */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary-dark py-1.5 px-4 rounded-full w-fit">
                <Star className="w-4 h-4 fill-orange text-orange" />
                <span className="text-xs sm:text-sm font-semibold font-poppins">
                  Trusted by homeowners for fast & reliable service
                </span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 py-1.5 px-4 rounded-full w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs sm:text-sm font-bold font-poppins">
                  Per visit (Inspection charge) ₹149
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight">
              Expert Home Services, <br />
              <span className="text-gradient">Right at Your Door.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-navy/75 max-w-xl leading-relaxed">
              Fast, reliable, and professional appliance, electrical, and plumbing services from trusted local technicians. Book online in 60 seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={onBookClick}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-button-blue hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center space-x-2 text-base"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Book a Service</span>
              </button>
              
              <a
                 href={`tel:+91${CONTACT_NUMBER}`}
                className="border border-navy/20 bg-white hover:border-navy text-navy font-semibold px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center space-x-2 text-base shadow-sm hover:shadow-md"
              >
                <Phone className="w-5 h-5 text-orange" />
                <span>{CONTACT_NUMBER}</span>
              </a>
            </div>

            {/* Give missed call to book banner */}
            <div className="bg-[#103D27]/5 border border-[#103D27]/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-poppins">
                  Give missed call to book
                </span>
                <a href={`tel:+91${CONTACT_NUMBER}`} className="text-2xl sm:text-3xl font-extrabold text-navy hover:text-primary transition-colors flex items-center gap-2.5 mt-1.5">
                  <Phone className="w-6 h-6 text-[#25D366] fill-[#25D366]/10 animate-bounce" />
                  <span className="font-poppins">{CONTACT_NUMBER}</span>
                </a>
              </div>
              <span className="text-xs text-gray-500 sm:max-w-[210px] leading-relaxed">
                Dial and hang up — our executive dials you back within 3-5 minutes!
              </span>
            </div>

            {/* Trust Indicators Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-start space-y-1">
                  <div className="flex items-center space-x-2 text-primary">
                    <badge.icon className="w-5 h-5 text-primary fill-primary/10 shrink-0" />
                    <span className="text-xs sm:text-[13px] font-bold text-navy tracking-tight">{badge.text}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 hidden sm:block leading-none pl-7">{badge.desc}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Quick Book Now Form Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center items-center">
            {/* Background glowing shape */}
            <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            
            {/* Quick Booking Form Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-gray-100/80 shadow-premium max-w-sm w-full animate-fade-in relative z-10">
              {!isSubmitted ? (
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  {/* Form fields layout matches requested screenshot */}
                  
                  {/* Name Input */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        id="hero-quick-name"
                        type="text"
                        name="name"
                        maxLength={70}
                        autoComplete="name"
                        value={quickForm.name}
                        onChange={handleQuickChange}
                        placeholder="Name"
                        aria-label="Full Name"
                        className={`w-full bg-white pl-11 pr-4 py-3.5 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-250'} font-medium text-navy text-sm`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[11px] mt-1 font-medium pl-1">{errors.name}</p>}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        id="hero-quick-phone"
                        type="tel"
                        name="phone"
                        maxLength={15}
                        autoComplete="tel"
                        value={quickForm.phone}
                        onChange={handleQuickChange}
                        placeholder="Mobile No. (e.g. 6374121120)"
                        aria-label="Mobile Number"
                        className={`w-full bg-white pl-11 pr-4 py-3.5 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-250'} font-medium text-navy text-sm`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-medium pl-1">{errors.phone}</p>}
                  </div>

                  {/* Book Now Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/60 text-white font-extrabold py-3.5 rounded-xl transition-all duration-200 text-base active:scale-[0.98] shadow-button-blue"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Now'}
                  </button>

                  {/* Terms */}
                  <span className="text-[10px] text-gray-400 text-center block leading-normal">
                    By clicking Book Now, you agree to our <a href="#contact" className="underline hover:text-navy">terms</a>
                  </span>

                  {/* Online status indicator & text */}
                  <div className="flex flex-col items-center justify-center pt-3.5 border-t border-dashed border-gray-200 gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shadow-sm animate-pulse"></span>
                      <span>Online (7 AM to 8 PM)</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Our executive'll call you in 3 - 5 mins.
                    </span>
                  </div>
                </form>
              ) : (
                /* Quick Confirmation state */
                <div className="text-center py-6 animate-fade-in">
                  <div className="bg-emerald-50 text-emerald-500 p-3 rounded-full w-fit mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-navy font-poppins">
                    Booking Confirmed!
                  </h3>
                  <p className="text-sm font-semibold text-primary mt-1">
                    Ref: {bookingRef}
                  </p>
                  
                  <div className="w-full border-t border-dashed border-gray-150 my-4" />
                  
                  <p className="text-xs text-gray-500 px-2 leading-relaxed">
                    Thank you! Our executive will call you at <strong className="text-navy">{quickForm.phone}</strong> within 3 - 5 minutes to schedule your visit.
                  </p>
                  
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setQuickForm({ name: '', phone: '' });
                    }}
                    className="mt-5 text-xs text-primary font-bold hover:underline"
                  >
                    Book Another Service
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
