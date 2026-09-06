import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <div className="pt-28 pb-20 bg-[#F5F7FA] min-h-screen">
      <SeoHead
        title="About Us | Verified Doorstep Engineering | Vetrigaram"
        description="Learn about Vetrigaram Tech Services. Our mission is turning momentum into measurable growth through certified, warranty-backed appliance engineering across Chennai."
        canonicalPath="/about"
        schemas={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-12 border border-[#D9DEE5] shadow-premium mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2385E8]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Our Mission & Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A33] tracking-tight leading-tight">
            About Vetrigaram Tech Services
          </h1>

          <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl">
            Built to replace the uncertainty, arbitrary pricing, and recurring downtime of informal repair calls, Vetrigaram operates an enterprise-grade field platform delivering certified doorstep engineering across Chennai and Ambattur.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#071A33] text-[#2385E8]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#071A33] text-base">Verified Engineers</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Background checked, certified mechanics and electrical specialists.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#071A33] text-[#FF7A00]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#071A33] text-base">30-Day Guarantee</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Full warranty coverage on labor and genuine manufacturer parts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#071A33] text-[#25D366]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#071A33] text-base">₹149 Diagnostic</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">100% adjusted into your final service invoice upon confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitments */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D9DEE5] shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight mb-4">
            Our Core Principles
          </h2>

          <div className="space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            <p>
              At Vetrigaram, we believe precision engineering and absolute integrity go hand in hand. Every technician undergoes background checks, diagnostic competency evaluation, and structured safety certifications.
            </p>
            <p>
              We operate on an upfront, itemized pricing model. Before any tool is touched, you receive a transparent diagnostic breakdown. There are no arbitrary fees or hidden surcharges.
            </p>
            <p>
              We mandate the use of authentic OEM components. From heavy-duty AC capacitors and copper coils to inverter PCB relays and valves, we never cut corners on durability or performance.
            </p>
          </div>
        </section>

        {/* Service Hubs */}
        <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#D9DEE5] shadow-premium mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight mb-3">
            Service Coverage Corridor
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
            Headquartered near the Ambattur Industrial corridor, our distributed mobile hubs serve all of Chennai, including Ambattur, Anna Nagar, Mogappair, T. Nagar, Velachery, Porur, and surrounding residential sectors.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/locations/chennai"
              className="bg-[#F5F7FA] hover:bg-[#071A33] hover:text-white text-[#071A33] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#D9DEE5] transition-all"
            >
              Chennai Service Hub
            </Link>
            <Link
              to="/locations/ambattur"
              className="bg-[#F5F7FA] hover:bg-[#071A33] hover:text-white text-[#071A33] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#D9DEE5] transition-all"
            >
              Ambattur Service Hub
            </Link>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="bg-[#071A33] rounded-2xl p-8 sm:p-12 text-white text-center shadow-premium border border-[#2385E8]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2385E8]/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
            Ready to Turn Momentum Into <span className="text-gradient-orange">Growth?</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            Book a certified technician in under 60 seconds or speak directly with our engineering support desk.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="bg-gradient-orange-btn text-white font-bold px-8 py-3.5 rounded-xl shadow-button-orange transition-all flex items-center gap-2 text-sm group"
            >
              <span>Explore All Solutions</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn-outline-blue font-bold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-[#FF7A00]" />
              <span>Call +91 {SITE_CONFIG.rawPhone}</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
