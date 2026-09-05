import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { LOCATIONS_CATALOG, SITE_CONFIG } from '../data/seoData';
import { getBreadcrumbSchema, getLocalBusinessSchema } from '../seo/schemaGenerator';

export default function LocationsPage() {
  const breadcrumbs = [
    { name: 'Locations', url: '/locations' }
  ];

  const schemas = [
    getBreadcrumbSchema(breadcrumbs),
    getLocalBusinessSchema()
  ];

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title="Service Locations & Doorstep Coverage | Vetrigaram Tech Services"
        description="Explore Vetrigaram's active doorstep technician hubs across Chennai and Ambattur. Certified home appliance repair, electrical, and plumbing with fast arrival."
        canonicalPath="/locations"
        schemas={schemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Coverage Directory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Doorstep Service Hubs in Chennai & Ambattur
          </h1>
          <p className="text-navy/70 mt-4 text-base sm:text-lg leading-relaxed">
            Our certified appliance mechanics, electricians, and plumbers operate from strategic local hubs to ensure prompt, same-day doorstep service.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {LOCATIONS_CATALOG.map((loc) => (
            <article 
              key={loc.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium flex flex-col justify-between hover-float"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange/10 text-orange p-3 rounded-2xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-navy font-poppins">
                        {loc.name}
                      </h2>
                      <span className="text-xs text-navy/50 font-medium">
                        {loc.state}, India ({loc.pincodes})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                    <Clock className="w-4 h-4" />
                    <span>{loc.averageResponseTime}</span>
                  </div>
                </div>

                <p className="text-sm text-navy/70 leading-relaxed mb-6">
                  {loc.overview}
                </p>

                {/* Key Localities Pills */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-navy uppercase tracking-wider block font-poppins mb-2.5">
                    Serviced Localities:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {loc.keyLocalities.slice(0, 8).map((area) => (
                      <span 
                        key={area}
                        className="text-xs bg-neutralBg text-navy/80 px-3 py-1 rounded-xl border border-gray-100 font-medium"
                      >
                        {area}
                      </span>
                    ))}
                    {loc.keyLocalities.length > 8 && (
                      <span className="text-xs text-primary font-semibold px-2 py-1">
                        +{loc.keyLocalities.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-50">
                  {loc.serviceHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-navy/75 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <Link
                  to={`/locations/${loc.id}`}
                  className="text-primary font-bold text-sm hover:text-primary-dark inline-flex items-center gap-1.5"
                >
                  <span>Explore {loc.name} Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-orange" />
                  <span>Call Dispatch</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Coverage Commitment Card */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-premium text-center max-w-4xl mx-auto">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins">
            Need Rapid Doorstep Repairs in Your Neighborhood?
          </h2>
          <p className="text-navy/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Our certified technicians live and operate right in your community. Every booking is covered by our flat ₹149 inspection charge policy (waived if service is completed) and a 30-day service warranty.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/services"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-button-blue transition-all"
            >
              Browse All Services
            </Link>
            <Link
              to="/contact"
              className="border border-navy/20 hover:border-navy text-navy font-bold text-sm px-8 py-3.5 rounded-2xl transition-all"
            >
              Contact Local Dispatch
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
