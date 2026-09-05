import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  MapPin, ChevronDown, Phone, ArrowRight, CalendarDays
} from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { getLocationBySlug, SERVICES_CATALOG, SITE_CONFIG } from '../data/seoData';
import { getLocalBusinessSchema, getBreadcrumbSchema, getFaqSchema } from '../seo/schemaGenerator';
import { validateSlug } from '../utils/security';

export default function LocationDetailPage({ onBookNow }) {
  const { locationSlug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);
  const slugCheck = validateSlug(locationSlug);

  if (!slugCheck.isValid) {
    return <Navigate to="/locations" replace />;
  }

  const location = getLocationBySlug(slugCheck.sanitized);

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const breadcrumbs = [
    { name: 'Locations', url: '/locations' },
    { name: location.name, url: `/locations/${location.id}` }
  ];

  const schemas = [
    getLocalBusinessSchema(location),
    getBreadcrumbSchema(breadcrumbs),
    getFaqSchema(location.faqs)
  ];

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title={location.metaTitle}
        description={location.metaDescription}
        canonicalPath={`/locations/${location.id}`}
        schemas={schemas}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-premium mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full w-fit mb-3">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              <span>{location.name} Service Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              {location.heroTitle}
            </h1>

            <p className="text-navy/70 text-base sm:text-lg mt-4 leading-relaxed">
              {location.overview}
            </p>

            {/* Response Time & Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="bg-neutralBg p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Average Response Time</span>
                <span className="text-lg font-bold text-navy font-poppins mt-1 block">
                  {location.averageResponseTime}
                </span>
              </div>
              <div className="bg-neutralBg p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Inspection Policy</span>
                <span className="text-lg font-bold text-emerald-600 font-poppins mt-1 block">
                  {SITE_CONFIG.inspectionFee} (Waived)
                </span>
              </div>
              <div className="bg-neutralBg p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 block">Service Warranty</span>
                <span className="text-lg font-bold text-navy font-poppins mt-1 block">
                  {SITE_CONFIG.warrantyDays}
                </span>
              </div>
            </div>

            {/* Call to action */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/services"
                className="bg-primary hover:bg-primary-dark text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-button-blue transition-all duration-200 active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                <CalendarDays className="w-5 h-5" />
                <span>Book Service in {location.name}</span>
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="border border-navy/20 bg-white hover:border-navy text-navy font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <Phone className="w-5 h-5 text-orange" />
                <span>Call Local Team</span>
              </a>
            </div>
          </div>
        </div>

        {/* Localities Covered */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
            Neighborhoods & Sectors Covered in {location.name}
          </h2>
          <p className="text-navy/60 text-sm sm:text-base mb-6">
            Technicians are stationed across these residential and commercial sectors:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {location.keyLocalities.map((locArea) => (
              <div 
                key={locArea}
                className="flex items-center gap-2 p-3 bg-neutralBg rounded-xl border border-gray-100 text-xs sm:text-sm font-semibold text-navy/80"
              >
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{locArea}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Postal codes covered: {location.pincodes}
          </p>
        </section>

        {/* Available Services in this Location */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins">
                Available Services in {location.name}
              </h2>
              <p className="text-navy/60 text-sm mt-1">
                Select a service to view specialized repair options and pricing for {location.name}:
              </p>
            </div>
            <Link
              to="/services"
              className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_CATALOG.slice(0, 6).map((service) => (
              <article 
                key={service.id}
                className="bg-neutralBg p-5 rounded-2xl border border-gray-100 flex flex-col justify-between hover:border-primary/40 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-poppins block mb-1">
                    {service.categoryTitle}
                  </span>
                  <h3 className="font-bold text-navy font-poppins text-base mb-2">
                    <Link to={`/${location.id}/${service.id}`} className="hover:text-primary transition-colors">
                      {service.shortName} in {location.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-navy/65 leading-relaxed mb-4">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/50 flex items-center justify-between mt-auto">
                  <Link
                    to={`/${location.id}/${service.id}`}
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Local Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => onBookNow && onBookNow(service.category, service.name)}
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-all"
                  >
                    Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Location FAQs */}
        {location.faqs && location.faqs.length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-6">
              Frequently Asked Questions - {location.name} Hub
            </h2>

            <div className="space-y-4">
              {location.faqs.map((faq, idx) => {
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

      </div>
    </div>
  );
}
