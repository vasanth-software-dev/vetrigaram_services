import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AirVent, IceCream, WashingMachine, Flame, 
  Zap, Power, Wrench, Shield, ArrowUpRight, 
  Droplet, CheckCircle2, MapPin, Sparkles
} from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES_CATALOG, LOCATIONS_CATALOG } from '../data/seoData';
import { getBreadcrumbSchema } from '../seo/schemaGenerator';

export default function ServicesPage({ onBookNow }) {
  const navigate = useNavigate();

  const handleBookNow = (category, serviceName) => {
    if (onBookNow) {
      onBookNow(category, serviceName);
    }
    navigate('/');
    setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = bookingSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const iconMap = {
    'ac-repair': AirVent,
    'refrigerator-repair': IceCream,
    'washing-machine-repair': WashingMachine,
    'geyser-repair': Flame,
    'electrical-repair': Zap,
    'switch-socket-repair': Power,
    'fan-installation': AirVent,
    'wiring-rewiring': Wrench,
    'plumbing-repair': Wrench,
    'tap-faucet-repair': Droplet,
    'drain-cleaning': Shield,
    'water-tank-services': Droplet,
  };

  const categories = [
    {
      id: 'appliances',
      title: 'Appliance Engineering & Repair Services',
      description: 'Keep your cooling and essential facilities operating at peak reliability with certified doorstep technicians.',
      services: SERVICES_CATALOG.filter(s => s.category === 'appliances')
    }
  ];

  const breadcrumbs = [
    { name: 'Services', url: '/services' }
  ];

  const schemas = [
    getBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F5F7FA] min-h-screen">
      <SeoHead
        title="All Doorstep Appliance Solutions | Vetrigaram Tech Services"
        description="Browse certified doorstep appliance repair services by Vetrigaram in Chennai and Ambattur. AC servicing, refrigerator repair, washing machine diagnostics, and more."
        canonicalPath="/services"
        schemas={schemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Comprehensive Solutions Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A33] tracking-tight leading-tight">
            Doorstep Technical Solutions
          </h1>

          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Transparent pricing, certified background-verified technicians, and 30-day warranty coverage across Chennai and Ambattur.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-[#071A33] bg-white border border-[#D9DEE5] px-4 py-2 rounded-xl font-medium shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
            <span>Standard ₹149 inspection fee is 100% adjusted into your final repair invoice.</span>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <section key={cat.id} className="space-y-8">
              <div className="border-b border-[#D9DEE5] pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight">
                  {cat.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-1.5">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => {
                  const Icon = iconMap[service.id] || Wrench;
                  return (
                    <article 
                      key={service.id}
                      className="bg-white rounded-2xl p-7 border border-[#D9DEE5] shadow-premium hover:shadow-premium-hover hover-lift flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#071A33]/5 text-[#2385E8] flex items-center justify-center group-hover:bg-[#071A33] group-hover:text-white transition-all">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-2.5 py-1 rounded-md">
                            {service.startingPrice}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#071A33] tracking-tight mb-2 group-hover:text-[#1459B8] transition-colors">
                          <Link to={`/services/${service.id}`}>
                            {service.name}
                          </Link>
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                          {service.tagline || service.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <Link
                          to={`/services/${service.id}`}
                          className="text-[#1459B8] hover:text-[#FF7A00] font-bold text-xs sm:text-sm inline-flex items-center gap-1 group/link transition-colors"
                        >
                          <span>Service Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>

                        <button
                          onClick={() => handleBookNow(service.category, service.name)}
                          className="bg-gradient-orange-btn text-white font-bold text-xs py-2 px-4 rounded-xl shadow-button-orange transition-all cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Local Area Coverage Banner */}
        <section className="mt-20 bg-white rounded-2xl p-8 sm:p-12 border border-[#D9DEE5] shadow-premium">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#2385E8] bg-[#2385E8]/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4 text-[#FF7A00]" />
              <span>Doorstep Technician Coverage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071A33] tracking-tight">
              Looking for Technicians in Your Area?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              We operate dedicated mobile response hubs across Chennai and Ambattur for 60–90 minute arrival times.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {LOCATIONS_CATALOG.map((loc) => (
                <Link
                  key={loc.id}
                  to={`/locations/${loc.id}`}
                  className="bg-[#F5F7FA] hover:bg-[#071A33] hover:text-white text-[#071A33] font-bold text-sm px-6 py-3 rounded-xl border border-[#D9DEE5] transition-all flex items-center gap-2 group"
                >
                  <MapPin className="w-4 h-4 text-[#FF7A00]" />
                  <span>{loc.name} Service Hub</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
