import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, Phone, CalendarDays } from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE_CONFIG } from '../data/seoData';
import { getOrganizationSchema, getBreadcrumbSchema } from '../seo/schemaGenerator';

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'About Us', url: '/about' }
  ];

  const schemas = [
    getOrganizationSchema(),
    getBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title="About Us | Verified Doorstep Home Technicians | Vetrigaram"
        description="Learn about Vetrigaram Tech Services. Our mission is delivering reliable, verified, and warranty-backed appliance, electrical, and plumbing repair across Chennai."
        canonicalPath="/about"
        schemas={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-premium mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Our Story & Standards
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            About Vetrigaram Tech Services
          </h1>

          <p className="text-navy/70 text-base sm:text-lg mt-4 leading-relaxed">
            Founded to eliminate the uncertainty, inflated pricing, and inconsistent craftsmanship typical of traditional informal home repairs, Vetrigaram provides structured, certified, and transparent doorstep home services across Chennai and Ambattur.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-navy font-poppins text-base">Verified Experts</h3>
                <p className="text-xs text-navy/60 mt-1">Background checked, certified mechanics and wiremen.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-orange/10 text-orange">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-navy font-poppins text-base">30-Day Guarantee</h3>
                <p className="text-xs text-navy/60 mt-1">Complete post-service warranty on labor and replacement parts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-navy font-poppins text-base">₹149 Inspection</h3>
                <p className="text-xs text-navy/60 mt-1">100% adjusted into final service bill upon repair confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitments */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-4">
            Our Core Principles
          </h2>

          <div className="space-y-6 text-sm sm:text-base text-navy/75 leading-relaxed">
            <p>
              At Vetrigaram, we understand that inviting a technician into your home requires complete trust. That is why every technician in our network undergoes rigorous identity verification, criminal record screening, and hands-on diagnostic competence testing.
            </p>
            <p>
              We operate on an upfront, transparent pricing model. Before any tool touches your appliance or electrical wiring, you receive a detailed, itemized estimate. There are no surprise fees or undisclosed charges.
            </p>
            <p>
              We exclusively use authentic, manufacturer-approved replacement components. From AC capacitors and copper coils to electrical circuit breakers and ceramic tap cartridges, we never compromise on safety or component longevity.
            </p>
          </div>
        </section>

        {/* Operational Corridor */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
            Service Coverage Corridor
          </h2>
          <p className="text-navy/70 text-sm sm:text-base mb-6">
            Headquartered near the Ambattur Industrial corridor, our decentralized technician hubs serve all of Chennai, including Ambattur, Anna Nagar, Mogappair, T. Nagar, Velachery, Porur, and surrounding residential sectors.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/locations/chennai"
              className="bg-neutralBg hover:bg-primary hover:text-white text-navy font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-100 transition-all"
            >
              Chennai Service Hub
            </Link>
            <Link
              to="/locations/ambattur"
              className="bg-neutralBg hover:bg-primary hover:text-white text-navy font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-100 transition-all"
            >
              Ambattur Service Hub
            </Link>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-gradient-premium rounded-3xl p-8 sm:p-12 text-white text-center shadow-premium">
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-3">
            Ready for Hassle-Free Doorstep Repairs?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Book an appointment online in under 60 seconds or give us a missed call to schedule immediate diagnostic assistance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="bg-orange hover:bg-orange-dark text-white font-bold px-8 py-3.5 rounded-2xl shadow-button-orange transition-all flex items-center gap-2 text-sm"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Explore All Services</span>
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-2xl transition-all flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-orange" />
              <span>Call {SITE_CONFIG.rawPhone}</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
