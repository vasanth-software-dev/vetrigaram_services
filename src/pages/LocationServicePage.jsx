import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  MapPin, Clock, ShieldCheck, Award, 
  CheckCircle2, ChevronDown, Phone, ArrowRight, CalendarDays
} from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import BookingForm from '../components/BookingForm';
import { getServiceBySlug, getLocationBySlug, SERVICES_CATALOG, SITE_CONFIG } from '../data/seoData';
import { getServiceSchema, getLocalBusinessSchema, getBreadcrumbSchema, getFaqSchema } from '../seo/schemaGenerator';
import { validateSlug } from '../utils/security';

export default function LocationServicePage() {
  const { locationSlug, serviceSlug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const locCheck = validateSlug(locationSlug);
  const srvCheck = validateSlug(serviceSlug);

  if (!locCheck.isValid || !srvCheck.isValid) {
    return <Navigate to="/services" replace />;
  }

  const location = getLocationBySlug(locCheck.sanitized);
  const service = getServiceBySlug(srvCheck.sanitized);

  if (!location || !service) {
    return <Navigate to="/services" replace />;
  }

  const breadcrumbs = [
    { name: 'Locations', url: '/locations' },
    { name: location.name, url: `/locations/${location.id}` },
    { name: `${service.shortName}`, url: `/${location.id}/${service.id}` }
  ];

  const localFaqs = [
    {
      q: `How quickly can a ${service.shortName.toLowerCase()} technician arrive in ${location.name}?`,
      a: `In ${location.name}, our certified technicians arrive within ${location.averageResponseTime} on average. Standby units are stationed near key residential zones for rapid dispatch.`
    },
    {
      q: `What is the inspection charge for ${service.shortName.toLowerCase()} in ${location.name}?`,
      a: `We charge a standard inspection fee of ${SITE_CONFIG.inspectionFee} for doorstep diagnosis. If you proceed with the suggested repair, this fee is 100% adjusted into your final service invoice.`
    },
    {
      q: `Does the repair in ${location.name} include a warranty?`,
      a: `Yes, all repairs completed by our ${location.name} team include an unconditional 30-day service warranty covering craftsmanship and verified replacement parts.`
    },
    ...(service.faqs || []).slice(0, 2)
  ];

  const schemas = [
    getServiceSchema(service, location),
    getLocalBusinessSchema(location),
    getBreadcrumbSchema(breadcrumbs),
    getFaqSchema(localFaqs)
  ];

  const otherServicesInLocation = SERVICES_CATALOG
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  const scrollToBooking = () => {
    const el = document.getElementById('local-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title={`${service.name} in ${location.name} | Doorstep Service | Vetrigaram`}
        description={`Professional ${service.name.toLowerCase()} in ${location.name}. Fast doorstep technician dispatch across ${location.keyLocalities.slice(0, 4).join(', ')}. Flat ₹149 inspection with 30-day warranty.`}
        canonicalPath={`/${location.id}/${service.id}`}
        schemas={schemas}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-premium mb-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1 rounded-full">
                {service.categoryTitle}
              </span>
              <span className="text-orange font-bold text-xs uppercase tracking-widest font-poppins bg-orange/10 px-3.5 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{location.name} Coverage</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              {service.name} in {location.name}
            </h1>

            <p className="text-navy/70 text-base sm:text-lg mt-4 leading-relaxed">
              Fast, reliable, and background-verified {service.name.toLowerCase()} delivered directly to your doorstep anywhere in {location.name}. Transparent upfront estimates with our standard ₹149 inspection policy.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Arrival Time</span>
                  <span className="text-xs font-bold text-navy">{location.averageResponseTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Inspection</span>
                  <span className="text-xs font-bold text-navy">{SITE_CONFIG.inspectionFee} (Waived)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Protection</span>
                  <span className="text-xs font-bold text-navy">30-Day Warranty</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Staff</span>
                  <span className="text-xs font-bold text-navy">Verified Experts</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={scrollToBooking}
                className="bg-primary hover:bg-primary-dark text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-button-blue transition-all duration-200 active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Book Technician in {location.name}</span>
              </button>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="border border-navy/20 bg-white hover:border-navy text-navy font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <Phone className="w-5 h-5 text-orange" />
                <span>Call {SITE_CONFIG.rawPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Local Area Service Coverage */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
            Doorstep {service.shortName} Coverage in {location.name}
          </h2>
          <p className="text-navy/60 text-sm sm:text-base mb-6">
            Our certified technicians are actively dispatched across these residential zones in {location.name}:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {location.keyLocalities.map((area) => (
              <div 
                key={area}
                className="flex items-center gap-2 p-3 bg-neutralBg rounded-xl border border-gray-100 text-xs sm:text-sm font-semibold text-navy/80"
              >
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-navy/50">
            Also providing service to adjacent pin codes: {location.pincodes}. Same-day booking slots available.
          </p>
        </section>

        {/* Service Diagnostic & Benefits */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-6">
            Why Homeowners in {location.name} Choose Vetrigaram
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit, bIdx) => (
              <div key={bIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-neutralBg border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-navy/85">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Local FAQs */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-6">
            Frequently Asked Questions - {service.shortName} in {location.name}
          </h2>

          <div className="space-y-4">
            {localFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-navy text-sm sm:text-base hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-sm text-navy/65 bg-neutralBg/30 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Embedded Booking */}
        <section id="local-booking" className="mb-12">
          <BookingForm 
            initialCategory={service.category}
            initialService={service.name}
          />
        </section>

        {/* Cross Links */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium">
          <h2 className="text-xl sm:text-2xl font-bold text-navy font-poppins mb-6">
            Other Services Available in {location.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherServicesInLocation.map((other) => (
              <Link
                key={other.id}
                to={`/${location.id}/${other.id}`}
                className="p-5 rounded-2xl bg-neutralBg border border-gray-100 hover:border-primary/40 hover-float flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase font-poppins block mb-1">
                    {other.categoryTitle}
                  </span>
                  <h3 className="font-bold text-navy font-poppins text-sm mb-1">
                    {other.shortName} in {location.name}
                  </h3>
                  <p className="text-xs text-navy/60 line-clamp-2">
                    {other.tagline}
                  </p>
                </div>
                <span className="text-xs text-primary font-bold mt-4 inline-flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
