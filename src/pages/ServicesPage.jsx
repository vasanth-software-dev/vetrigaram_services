import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AirVent, IceCream, WashingMachine, Flame, 
  Zap, Power, Wrench, Shield, ArrowRight, 
  Droplet, CheckCircle2, MapPin
} from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { SERVICES_CATALOG, LOCATIONS_CATALOG } from '../data/seoData';
import { getBreadcrumbSchema } from '../seo/schemaGenerator';

export default function ServicesPage({ onBookNow }) {
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
      title: 'Appliance Repair Services',
      description: 'Keep your cooling and washing essentials operating at peak capacity with certified doorstep mechanics.',
      services: SERVICES_CATALOG.filter(s => s.category === 'appliances')
    },
    {
      id: 'electrical',
      title: 'Electrical Diagnostics & Wiring',
      description: 'Safe, certified solutions for short circuits, tripped breakers, and high-load household installations.',
      services: SERVICES_CATALOG.filter(s => s.category === 'electrical')
    },
    {
      id: 'plumbing',
      title: 'Plumbing & Drainage Solutions',
      description: 'Hygienic tap, concealed leak, pressure pump, and drain block repairs by experienced plumbing technicians.',
      services: SERVICES_CATALOG.filter(s => s.category === 'plumbing')
    }
  ];

  const breadcrumbs = [
    { name: 'Services', url: '/services' }
  ];

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title="All Doorstep Home Services | Appliance, Electrical & Plumbing Repair | Vetrikharam"
        description="Browse all certified doorstep home repair services by Vetrikharam in Chennai and Ambattur. AC servicing, refrigerator fix, electrical troubleshooting, and plumbing."
        canonicalPath="/services"
        schemas={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Full Service Directory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Doorstep Repair & Maintenance Services
          </h1>
          <p className="text-navy/70 mt-4 text-base sm:text-lg leading-relaxed">
            Professional repair technicians for your home appliances, electrical circuits, and water systems across Chennai and Ambattur.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Inspection fee ₹149 is 100% adjusted into your final repair bill.</span>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <section key={cat.id} className="space-y-8">
              <div className="border-b border-gray-200/80 pb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins">
                  {cat.title}
                </h2>
                <p className="text-navy/60 text-sm sm:text-base mt-1.5">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => {
                  const Icon = iconMap[service.id] || Wrench;
                  return (
                    <article 
                      key={service.id}
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium hover-float flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-primary/5 text-primary p-3 rounded-2xl">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-poppins">
                            {service.startingPrice}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-navy font-poppins mb-2">
                          <Link to={`/services/${service.id}`} className="hover:text-primary transition-colors">
                            {service.name}
                          </Link>
                        </h3>

                        <p className="text-sm text-navy/65 leading-relaxed mb-6">
                          {service.tagline || service.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                        <Link
                          to={`/services/${service.id}`}
                          className="text-primary font-bold text-sm hover:text-primary-dark inline-flex items-center gap-1 group"
                        >
                          <span>Service Details</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <button
                          onClick={() => onBookNow && onBookNow(service.category, service.name)}
                          className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs py-2 px-3.5 rounded-xl transition-all"
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
        <section className="mt-20 bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-premium">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-4 h-4" />
              <span>Doorstep Coverage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins">
              Looking for Repairs in Your Specific Area?
            </h2>
            <p className="text-navy/70 text-sm sm:text-base mt-3">
              We operate dedicated technician teams across key residential corridors in Chennai and Ambattur.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {LOCATIONS_CATALOG.map((loc) => (
                <Link
                  key={loc.id}
                  to={`/locations/${loc.id}`}
                  className="bg-neutralBg hover:bg-primary hover:text-white text-navy font-bold text-sm px-6 py-3 rounded-2xl border border-gray-200 transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-orange" />
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
