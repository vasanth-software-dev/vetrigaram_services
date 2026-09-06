import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  Search,
  X,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { validateName, validatePhone, validatePincode, validateCityOrArea, sanitizeText } from '../utils/security';
import { CONTACT_NUMBER } from '../utils/contacts';
import { LOCATIONS_CATALOG } from '../data/seoData';

const carouselSlides = [
  {
    id: 'ac',
    title: 'AC Diagnostic & Jet Cleaning',
    subtitle: 'Split & window air conditioner maintenance',
    badge: 'AC Repair & Service',
    image: `${import.meta.env.BASE_URL}hero/ac-repair.jpg`,
    alt: 'Certified technician in uniform diagnosing and servicing a modern wall-mounted split air conditioner'
  },
  {
    id: 'refrigerator',
    title: 'Precision Refrigerator Care',
    subtitle: 'Single, double-door & inverter compressor repairs',
    badge: 'Refrigerator Repair',
    image: `${import.meta.env.BASE_URL}hero/refrigerator-repair.jpg`,
    alt: 'Professional technician testing electrical and cooling circuits of a double door refrigerator'
  },
  {
    id: 'washing-machine',
    title: 'Washing Machine Engineering',
    subtitle: 'Front-load, top-load motor & drum diagnostics',
    badge: 'Washing Machine Care',
    image: `${import.meta.env.BASE_URL}hero/washing-machine-repair.jpg`,
    alt: 'Service engineer troubleshooting electronic controls on a premium front-loading washing machine'
  },
  {
    id: 'technician',
    title: 'Verified Technicians at Your Door',
    subtitle: 'Prompt 60-90 min urban arrival with genuine parts',
    badge: 'Doorstep Visit',
    image: `${import.meta.env.BASE_URL}hero/technician-doorstep.jpg`,
    alt: 'Friendly professional technician in uniform carrying toolkit visiting homeowner for doorstep appliance repair'
  }
];

const POPULAR_HUBS = [
  { name: 'Ambattur', pincode: '600053', time: '60–90 Mins' },
  { name: 'Anna Nagar', pincode: '600040', time: '60–90 Mins' },
  { name: 'Mogappair', pincode: '600037', time: '60–90 Mins' },
  { name: 'T. Nagar', pincode: '600017', time: '2–3 Hours' },
  { name: 'Velachery', pincode: '600042', time: '2–3 Hours' },
  { name: 'Porur', pincode: '600116', time: '60–90 Mins' },
  { name: 'Tambaram', pincode: '600045', time: '2–4 Hours' },
  { name: 'Adyar', pincode: '600020', time: '2–4 Hours' },
  { name: 'Kolathur', pincode: '600099', time: '60–90 Mins' },
  { name: 'Avadi', pincode: '600054', time: '60–90 Mins' }
];

export default function Hero({ onBookClick }) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [heroLocationStatus, setHeroLocationStatus] = useState(null);

  // Location Availability Modal State
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [modalQuery, setModalQuery] = useState('');
  const [modalResult, setModalResult] = useState(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic Carousel Transition every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleExploreClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleHeroBookClick = () => {
    const nameInput = document.getElementById('hero-name-input');
    if (nameInput) {
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (onBookClick) {
      onBookClick();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'location' && heroLocationStatus) {
      setHeroLocationStatus(null);
    }
  };

  // Inline location check within the Hero form
  const checkHeroFormLocation = (locInput) => {
    const input = (locInput || '').trim();
    if (!input) {
      setHeroLocationStatus({
        type: 'error',
        message: 'Please enter your pincode or area name.'
      });
      return;
    }

    // Pincode test
    if (/^\d{6}$/.test(input)) {
      if (input.startsWith('600')) {
        setHeroLocationStatus({
          type: 'success',
          message: `Service Available in ${input}! (60–90 Min arrival)`
        });
      } else {
        setHeroLocationStatus({
          type: 'error',
          message: `Pincode ${input} is outside Chennai & Ambattur (600xxx). Call support for custom dispatch.`
        });
      }
      return;
    }

    // Locality test
    const lower = input.toLowerCase();
    const allLocalities = LOCATIONS_CATALOG.flatMap(loc => loc.keyLocalities.map(k => k.toLowerCase()));
    const matched = allLocalities.some(loc => loc.includes(lower) || lower.includes(loc));

    if (matched || lower.includes('chennai') || lower.includes('ambattur')) {
      setHeroLocationStatus({
        type: 'success',
        message: `Service Available in ${input}! Technicians active on standby.`
      });
    } else {
      setHeroLocationStatus({
        type: 'success',
        message: `Covered under Chennai & Ambattur urban doorstep network!`
      });
    }
  };

  // Modal search handler
  const handleModalSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = modalQuery.trim();
    if (!query) {
      setModalResult({
        status: 'error',
        message: 'Please enter a 6-digit postal pincode or locality name.'
      });
      return;
    }

    // Check pincode
    if (/^\d{6}$/.test(query)) {
      if (query.startsWith('600')) {
        const foundHub = POPULAR_HUBS.find(h => h.pincode === query);
        setModalResult({
          status: 'success',
          message: `Service is Available in pincode ${query}!`,
          responseTime: foundHub ? foundHub.time : '60–90 Mins',
          locationName: foundHub ? `${foundHub.name} (${query})` : `Pincode ${query}`
        });
      } else {
        setModalResult({
          status: 'error',
          message: `Pincode ${query} is currently outside our Chennai & Ambattur service radius. Call our support team at +91 ${CONTACT_NUMBER} for special arrangements.`
        });
      }
      return;
    }

    // Check locality
    const lower = query.toLowerCase();
    const matchedHub = POPULAR_HUBS.find(h => h.name.toLowerCase().includes(lower) || lower.includes(h.name.toLowerCase()));
    const allLocalities = LOCATIONS_CATALOG.flatMap(loc => loc.keyLocalities);
    const matchedCatalog = allLocalities.find(loc => loc.toLowerCase().includes(lower) || lower.includes(loc.toLowerCase()));

    if (matchedHub) {
      setModalResult({
        status: 'success',
        message: `Service is fully active in ${matchedHub.name} (${matchedHub.pincode})!`,
        responseTime: matchedHub.time,
        locationName: `${matchedHub.name} (${matchedHub.pincode})`
      });
    } else if (matchedCatalog || lower.includes('chennai') || lower.includes('ambattur')) {
      setModalResult({
        status: 'success',
        message: `Great news! Technicians actively cover ${matchedCatalog || query}.`,
        responseTime: '60–90 Mins',
        locationName: matchedCatalog || query
      });
    } else {
      setModalResult({
        status: 'success',
        message: `Mobile service units operate across Chennai & Ambattur residential sectors including ${query}.`,
        responseTime: '1–2 Hours',
        locationName: query
      });
    }
  };

  const handleSelectHub = (hub) => {
    setModalQuery(`${hub.name} (${hub.pincode})`);
    setModalResult({
      status: 'success',
      message: `Direct dispatch active in ${hub.name}!`,
      responseTime: hub.time,
      locationName: `${hub.name} (${hub.pincode})`
    });
  };

  const handleApplyModalLocation = (locationString) => {
    setFormData((prev) => ({
      ...prev,
      location: locationString
    }));
    setShowLocationModal(false);
    checkHeroFormLocation(locationString);
    handleHeroBookClick();
  };

  const validate = () => {
    const tempErrors = {};
    const nameCheck = validateName(formData.name, { isRequired: true, maxLength: 70 });
    if (!nameCheck.isValid) {
      tempErrors.name = nameCheck.error;
    }

    const phoneCheck = validatePhone(formData.phone, { isRequired: true });
    if (!phoneCheck.isValid) {
      tempErrors.phone = phoneCheck.error;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    const refNum = 'FX-' + Math.floor(100000 + Math.random() * 900000);

    const cleanName = validateName(formData.name).sanitized || sanitizeText(formData.name);
    const cleanPhone = validatePhone(formData.phone).sanitized || sanitizeText(formData.phone);
    const cleanService = formData.service ? sanitizeText(formData.service) : 'Doorstep Appliance Repair';
    const cleanLocation = formData.location ? sanitizeText(formData.location) : 'Chennai / Ambattur';

    const templateParams = {
      reference_num: refNum,
      name: cleanName,
      phone: cleanPhone,
      address: `Locality/Pincode: ${cleanLocation} (Hero Lead Form)`,
      service_category: cleanService,
      service: cleanService,
      preferred_date: 'Earliest Available Slot',
      preferred_time: '60-90 Mins Arrival',
      problem_description: `Direct request from Hero Lead Form for ${cleanService} in ${cleanLocation}`,
      request_received_on: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      })
    };

    try {
      await emailjs.send(
        'service_0j3nlam',
        'template_fhth66j',
        templateParams,
        '7fEFpmWyNsuPUUzKF'
      );
    } catch (err) {
      console.warn('Hero form email sending notice:', err);
    } finally {
      setBookingRef(refNum);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', service: '', location: '' });
    setErrors({});
    setHeroLocationStatus(null);
    setIsSubmitted(false);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-gradient-midnight text-white">
      {/* Dynamic Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2385E8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#1459B8]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Ambient Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2385E8 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Description, Trust Highlights, and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#2385E8]/30 bg-[#1459B8]/20 backdrop-blur-md mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
              <span className="text-xs font-semibold text-[#2385E8] tracking-wider uppercase">
                Doorstep Appliance Engineering • Chennai & Ambattur
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 animate-fade-in-up">
              Expert Home Appliance <br />
              <span className="text-gradient-orange">Repair at Your Doorstep.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mb-8 font-normal">
              Vetrigaram provides fast, reliable doorstep repair services for AC, Refrigerator, and Washing Machine across Chennai & Ambattur. Get expert diagnosis, skilled technicians, transparent pricing, and dependable repairs backed by a 30-day service guarantee.
            </p>

            {/* Hero Trust Points: 4 Compact Highlight Badges */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 w-full max-w-xl">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#2385E8]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#2385E8]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#2385E8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Fast Doorstep Service</div>
                  <div className="text-[11px] text-gray-300">60-90 min rapid arrival</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#FF7A00]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/20 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4 text-[#FF7A00]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Skilled Technicians</div>
                  <div className="text-[11px] text-gray-300">Certified & background-checked</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#25D366]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#25D366]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Transparent Pricing</div>
                  <div className="text-[11px] text-gray-300">₹149 waived upon repair</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#2385E8]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#2385E8]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2385E8]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">30-Day Service Guarantee</div>
                  <div className="text-[11px] text-gray-300">100% peace of mind warranty</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-4">
              <button
                onClick={handleHeroBookClick}
                className="bg-gradient-orange-btn text-white font-bold text-base px-8 py-4 rounded-xl shadow-button-orange flex items-center justify-center space-x-2.5 group cursor-pointer"
              >
                <span>Book a Repair</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={handleExploreClick}
                className="btn-outline-blue font-semibold text-base px-7 py-4 rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Solutions</span>
                <span className="text-[#FF7A00]">↓</span>
              </button>
            </div>

            {/* Secondary Text Highlighting Local Service Area + Interactive Check Location Option */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300 font-medium">
                <MapPin className="w-4 h-4 text-[#FF7A00]" />
                <span>Serving Chennai & Ambattur</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-[#25D366] font-semibold text-xs">Technicians On Duty Now</span>
              </div>

              {/* Check Available Location Action Button */}
              <button
                type="button"
                onClick={() => {
                  setShowLocationModal(true);
                  setModalResult(null);
                  setModalQuery('');
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#2385E8]/15 border border-[#2385E8]/40 hover:bg-[#2385E8]/30 text-xs font-bold text-[#2385E8] hover:text-white transition-all cursor-pointer shadow-sm group"
              >
                <Search className="w-3.5 h-3.5 text-[#FF7A00] group-hover:scale-110 transition-transform" />
                <span>Check Available Location</span>
                <span className="text-[#FF7A00] transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>

          </div>

          {/* Right Column: Lead Form Combined with Appliance Service Image Carousel */}
          <div className="lg:col-span-5 relative z-10 w-full py-4 lg:py-0">
            <div 
              id="hero-lead-form"
              className="bg-[#0B2345]/90 border border-[#2385E8]/35 rounded-2xl shadow-[0_20px_50px_rgba(7,26,51,0.85),0_0_35px_rgba(35,133,232,0.18)] backdrop-blur-xl overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1 bg-gradient-to-r from-[#FF7A00] via-[#2385E8] to-[#25D366]" />

              {/* Attractive Image Carousel */}
              <div 
                className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-[#071A33] select-none group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                role="region"
                aria-label="Appliance repair services showcase"
              >
                {/* Slides */}
                {carouselSlides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive 
                          ? 'opacity-100 scale-100 z-10' 
                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                      }`}
                      aria-hidden={!isActive}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        width="640"
                        height="360"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Readability Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2345] via-[#0B2345]/45 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/70 via-transparent to-transparent" />

                      {/* Slide Caption & Category Badge */}
                      <div className="absolute bottom-3 left-4 right-16 z-20">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#FF7A00] text-white shadow-sm mb-1">
                          {slide.badge}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug drop-shadow-md">
                          {slide.title}
                        </h3>
                        <p className="text-[11px] text-gray-200 line-clamp-1 opacity-90 drop-shadow-sm">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Subtle Manual Controls (Visible on hover/focus) */}
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Small Carousel Indicator Dots */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                  {carouselSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === currentSlide
                          ? 'w-4 h-1.5 bg-[#FF7A00]'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    />
                  ))}
                </div>
              </div>

              {/* Lead Generation Form Body */}
              <div className="p-5 sm:p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-3.5" noValidate>
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00] text-[11px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-[#FF7A00]" />
                        <span>Instant Doorstep Booking • 60 Secs</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        Book Doorstep Repair
                      </h2>
                      <p className="text-xs text-gray-300">
                        Enter details for technician dispatch in Chennai & Ambattur.
                      </p>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label htmlFor="hero-name-input" className="block text-xs font-semibold text-gray-200 mb-1 flex items-center justify-between">
                        <span>Full Name</span>
                        <span className="text-[#FF7A00] text-xs">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="hero-name-input"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full pl-10 pr-4 py-2.5 bg-[#071A33]/95 border ${
                            errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                          } rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#2385E8] focus:ring-2 focus:ring-[#2385E8]/30 transition-all`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                          <span>⚠</span> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="hero-phone-input" className="block text-xs font-semibold text-gray-200 mb-1 flex items-center justify-between">
                        <span>Phone Number</span>
                        <span className="text-[#FF7A00] text-xs">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3.5 flex items-center space-x-1.5 text-gray-400 text-xs font-bold border-r border-white/10 pr-2 pointer-events-none">
                          <Phone className="w-3.5 h-3.5 text-[#2385E8]" />
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          id="hero-phone-input"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          className={`w-full pl-20 pr-4 py-2.5 bg-[#071A33]/95 border ${
                            errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                          } rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#2385E8] focus:ring-2 focus:ring-[#2385E8]/30 transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                          <span>⚠</span> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label htmlFor="hero-service-select" className="block text-xs font-semibold text-gray-200 mb-1 flex items-center justify-between">
                        <span>Service Required</span>
                        <span className="text-[11px] text-gray-400 font-normal">Optional</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Wrench className="w-4 h-4 text-gray-400" />
                        </div>
                        <select
                          id="hero-service-select"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full pl-10 pr-8 py-2.5 bg-[#071A33]/95 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-[#2385E8] focus:ring-2 focus:ring-[#2385E8]/30 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#071A33] text-gray-300">Choose Appliance / Service</option>
                          <option value="AC Repair & Service" className="bg-[#071A33] text-white">Air Conditioner (AC)</option>
                          <option value="Washing Machine Repair" className="bg-[#071A33] text-white">Washing Machine</option>
                          <option value="Refrigerator Repair" className="bg-[#071A33] text-white">Refrigerator (Fridge)</option>
                          <option value="General Inspection" className="bg-[#071A33] text-white">General Diagnostic Inspection (₹149)</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Check Location / Pincode Option in the Form */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="hero-location-input" className="text-xs font-semibold text-gray-200 flex items-center gap-1">
                          <span>Your Locality / Pincode</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setShowLocationModal(true);
                            setModalResult(null);
                            setModalQuery('');
                          }}
                          className="text-[11px] text-[#2385E8] hover:text-[#FF7A00] font-semibold underline cursor-pointer"
                        >
                          Check all areas
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="hero-location-input"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. 600053 or Ambattur, Anna Nagar"
                          className="w-full pl-10 pr-20 py-2.5 bg-[#071A33]/95 border border-white/15 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#2385E8] focus:ring-2 focus:ring-[#2385E8]/30 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => checkHeroFormLocation(formData.location)}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#2385E8]/20 hover:bg-[#2385E8]/35 border border-[#2385E8]/40 rounded-lg text-xs font-bold text-[#2385E8] hover:text-white transition-colors cursor-pointer"
                        >
                          Check
                        </button>
                      </div>
                      {heroLocationStatus && (
                        <p className={`text-[11px] mt-1 flex items-center gap-1 font-medium ${
                          heroLocationStatus.type === 'success' ? 'text-[#25D366]' : 'text-[#FF7A00]'
                        }`}>
                          <span>{heroLocationStatus.type === 'success' ? '✓' : 'ℹ'}</span>
                          <span>{heroLocationStatus.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-orange-btn text-white font-bold text-sm sm:text-base py-3 px-6 rounded-xl shadow-button-orange flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer group mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Scheduling Technician...</span>
                        </>
                      ) : (
                        <>
                          <span>Book a Repair</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>

                    {/* Trust Highlights Strip */}
                    <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-white/10 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[#25D366] text-xs font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-[#25D366]" /> 30-Day
                        </span>
                        <span className="text-[10px] text-gray-400">Guarantee</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#FF7A00] text-xs font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-[#FF7A00]" /> ₹149
                        </span>
                        <span className="text-[10px] text-gray-400">Waived on repair</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[#2385E8] text-xs font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3 text-[#2385E8]" /> 60-90 Min
                        </span>
                        <span className="text-[10px] text-gray-400">Arrival</span>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Success Confirmation State */
                  <div className="relative z-10 text-center py-4 animate-fade-in space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-white">Booking Confirmed!</h3>
                      <p className="text-xs sm:text-sm text-gray-300 mt-1">
                        Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our technician will call you shortly.
                      </p>
                    </div>

                    <div className="bg-[#071A33] border border-[#2385E8]/30 rounded-xl p-3.5 text-left space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Booking Reference:</span>
                        <span className="font-mono font-bold text-[#FF7A00]">{bookingRef}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Contact Number:</span>
                        <span className="font-semibold text-white">+91 {formData.phone}</span>
                      </div>
                      {formData.location && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Service Location:</span>
                          <span className="font-semibold text-white">{formData.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-[#2385E8] pt-1 border-t border-white/5">
                        <Clock className="w-3.5 h-3.5 text-[#2385E8]" />
                        <span>Response expected in <strong>10–15 minutes</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 pt-1">
                      <a
                        href={`tel:+91${CONTACT_NUMBER}`}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#2385E8]/20 border border-[#2385E8]/40 hover:bg-[#2385E8]/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#2385E8]" />
                        <span>Call Support</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold transition-colors"
                      >
                        Book Another
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Location Availability Modal */}
      {showLocationModal && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowLocationModal(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-[#071A33] border border-[#2385E8]/40 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(35,133,232,0.25)] text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#2385E8]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#FF7A00]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#2385E8]/20 border border-[#2385E8]/35 flex items-center justify-center text-[#2385E8]">
                  <MapPin className="w-5 h-5 text-[#FF7A00]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">Check Service Availability</h3>
                  <p className="text-xs text-gray-300 mt-0.5">Chennai & Ambattur Rapid Doorstep Coverage</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLocationModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative z-10 space-y-4">
              <form onSubmit={handleModalSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={modalQuery}
                    onChange={(e) => setModalQuery(e.target.value)}
                    placeholder="Enter 6-digit Pincode or Locality..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B2345] border border-white/15 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#2385E8] focus:ring-2 focus:ring-[#2385E8]/30"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-orange-btn text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-button-orange cursor-pointer hover:scale-[1.02] transition-transform shrink-0"
                >
                  Verify
                </button>
              </form>

              {/* Quick Popular Hubs */}
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Popular Service Hubs (Click to Check):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_HUBS.map((hub) => (
                    <button
                      key={hub.name}
                      type="button"
                      onClick={() => handleSelectHub(hub)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/[0.06] hover:bg-[#2385E8]/25 border border-white/10 hover:border-[#2385E8]/40 text-gray-200 hover:text-white transition-all cursor-pointer"
                    >
                      {hub.name} ({hub.pincode})
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Feedback Result */}
              {modalResult && (
                <div className={`p-4 rounded-xl border ${
                  modalResult.status === 'success' 
                    ? 'bg-[#25D366]/10 border-[#25D366]/30' 
                    : 'bg-[#FF7A00]/10 border-[#FF7A00]/30'
                } animate-fade-in`}>
                  <div className="flex items-start space-x-2.5">
                    {modalResult.status === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-[#FF7A00] shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`text-xs sm:text-sm font-bold ${
                        modalResult.status === 'success' ? 'text-white' : 'text-[#FF7A00]'
                      }`}>
                        {modalResult.message}
                      </p>
                      {modalResult.status === 'success' && (
                        <div className="mt-2 text-xs text-gray-300 flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#2385E8]" />
                          <span>Estimated Response: <strong className="text-white">{modalResult.responseTime || '60–90 Mins'}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {modalResult.status === 'success' && (
                    <button
                      type="button"
                      onClick={() => handleApplyModalLocation(modalResult.locationName || modalQuery)}
                      className="w-full mt-3 py-2.5 px-4 bg-gradient-orange-btn text-white font-bold text-xs sm:text-sm rounded-xl shadow-button-orange flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-[1.01] transition-transform"
                    >
                      <span>Book Service in This Area</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
