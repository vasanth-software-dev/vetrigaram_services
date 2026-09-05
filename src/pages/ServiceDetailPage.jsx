import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ShieldCheck, Zap, Award, CheckCircle2, 
  AlertCircle, ChevronDown, Phone, MapPin, ArrowRight, CalendarDays
} from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import BookingForm from '../components/BookingForm';
import { getServiceBySlug, SERVICES_CATALOG, LOCATIONS_CATALOG, SITE_CONFIG } from '../data/seoData';
import { getServiceSchema, getBreadcrumbSchema, getFaqSchema } from '../seo/schemaGenerator';
import { validateSlug } from '../utils/security';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const slugCheck = validateSlug(serviceSlug);

  if (!slugCheck.isValid) {
    return <Navigate to="/services" replace />;
  }

  const service = getServiceBySlug(slugCheck.sanitized);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.name, url: `/services/${service.id}` }
  ];

  const schemas = [
    getServiceSchema(service),
    getBreadcrumbSchema(breadcrumbs),
    getFaqSchema(service.faqs)
  ];

  const relatedServices = SERVICES_CATALOG
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const scrollToBooking = () => {
    const el = document.getElementById('service-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title={`${service.name} | Doorstep Repair & Servicing | Vetrigaram`}
        description={`${service.desc} Transparent ₹149 inspection charge adjusted in final bill. 30-day service warranty.`}
        canonicalPath={`/services/${service.id}`}
        schemas={schemas}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-premium mb-12">
          <div className="max-w-3xl">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              {service.categoryTitle}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              {service.name}
            </h1>

            <p className="text-navy/70 text-base sm:text-lg mt-4 leading-relaxed">
              {service.desc}
            </p>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs font-bold text-navy">Verified Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-xs font-bold text-navy">Same-Day Arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-navy">{SITE_CONFIG.inspectionFee} Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-navy">30-Day Warranty</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={scrollToBooking}
                className="bg-primary hover:bg-primary-dark text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-button-blue transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm sm:text-base"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Book This Service</span>
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

        {/* Symptoms & Issues Handled */}
        {service.symptoms && service.symptoms.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
              Common Problems We Fix
            </h2>
            <p className="text-navy/60 text-sm sm:text-base mb-8">
              If your home setup is experiencing any of the following symptoms, our technicians can diagnose and repair it today:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-neutralBg border border-gray-100">
                  <AlertCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-navy/85">{symptom}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4-Step Process */}
        {service.process && service.process.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins">Transparent Process</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mt-2">
                How Our {service.shortName} Service Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="bg-neutralBg p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-primary/30 font-poppins block mb-2">
                      {step.step}
                    </span>
                    <h3 className="font-bold text-navy font-poppins text-base mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-navy/65 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Area Service Hubs */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
            Available Service Locations
          </h2>
          <p className="text-navy/60 text-sm sm:text-base mb-6">
            We provide verified doorstep {service.name.toLowerCase()} in your locality:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCATIONS_CATALOG.map((loc) => (
              <Link
                key={loc.id}
                to={`/${loc.id}/${service.id}`}
                className="p-5 rounded-2xl bg-neutralBg hover:bg-primary/5 border border-gray-100 hover:border-primary/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange" />
                  <div>
                    <h3 className="font-bold text-navy font-poppins text-sm group-hover:text-primary transition-colors">
                      {service.shortName} in {loc.name}
                    </h3>
                    <span className="text-xs text-navy/50">{loc.coverageDetails}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-6">
              Frequently Asked Questions About {service.name}
            </h2>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
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
        )}

        {/* Embedded Booking Section */}
        <section id="service-booking" className="mb-12">
          <BookingForm 
            initialCategory={service.category}
            initialService={service.name}
          />
        </section>

        {/* Related Services in Same Category */}
        {relatedServices.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium">
            <h2 className="text-xl sm:text-2xl font-bold text-navy font-poppins mb-6">
              Related {service.categoryTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/services/${rel.id}`}
                  className="p-5 rounded-2xl bg-neutralBg border border-gray-100 hover:border-primary/40 hover-float flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-navy font-poppins text-sm mb-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-navy/60 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <span className="text-xs text-primary font-bold mt-4 inline-flex items-center gap-1">
                    <span>View Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
