import React from 'react';
import { Phone, Mail, Clock, MapPin, MessageSquare } from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import Breadcrumbs from '../components/Breadcrumbs';
import BookingForm from '../components/BookingForm';
import { SITE_CONFIG } from '../data/seoData';
import { getLocalBusinessSchema, getBreadcrumbSchema } from '../seo/schemaGenerator';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Contact', url: '/contact' }
  ];

  const schemas = [
    getLocalBusinessSchema(),
    getBreadcrumbSchema(breadcrumbs)
  ];

  return (
    <div className="pt-28 pb-20 bg-neutralBg min-h-screen">
      <SeoHead
        title="Contact Us & Book a Technician | Vetrikharam Home Services"
        description="Contact Vetrikharam Home Services in Chennai & Ambattur. Call +91 6374121120 or book online for fast appliance, electrical, and plumbing repair. Open 8 AM - 9 PM daily."
        canonicalPath="/contact"
        schemas={schemas}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-poppins bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Customer Support & Bookings
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            We Are Here to Help
          </h1>
          <p className="text-navy/70 mt-4 text-base sm:text-lg leading-relaxed">
            Reach out via phone, WhatsApp, or our online booking form for same-day doorstep technician assistance in Chennai and Ambattur.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy font-poppins text-base mb-1">Direct Phone Line</h3>
              <p className="text-xs text-navy/60 mb-4">Dial or give a missed call for a callback in 3-5 minutes.</p>
            </div>
            <a 
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-primary font-extrabold text-sm hover:underline"
            >
              {SITE_CONFIG.rawPhone}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy font-poppins text-base mb-1">WhatsApp Chat</h3>
              <p className="text-xs text-navy/60 mb-4">Message our customer service desk for instant slot booking.</p>
            </div>
            <a 
              href={`https://api.whatsapp.com/send?phone=+91${SITE_CONFIG.rawPhone}&text=Hello%20Vetrikharam!%20I%20would%20like%20to%20book%20a%20technician.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-extrabold text-sm hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy font-poppins text-base mb-1">Email Support</h3>
              <p className="text-xs text-navy/60 mb-4">Send us your service inquiries, quotes, or feedback.</p>
            </div>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-primary font-bold text-sm truncate hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-premium flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy font-poppins text-base mb-1">Service Hours</h3>
              <p className="text-xs text-navy/60 mb-4">Technician teams dispatched across Chennai & Ambattur.</p>
            </div>
            <span className="text-xs font-bold text-navy/80">
              08:00 AM - 09:00 PM Daily
            </span>
          </div>
        </div>

        {/* Embedded Booking Form */}
        <section className="mb-16">
          <BookingForm />
        </section>

        {/* Base of Operations & Technicians */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-wider font-poppins">Local Base</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mt-1 mb-3">
                Ambattur Corridor & Central Chennai Operations
              </h2>
              <p className="text-navy/70 text-sm leading-relaxed mb-4">
                Our main dispatch center is located at Ambattur Industrial Estate, Chennai 600053, with decentralized mobile technicians stationed across North, South, and Central Chennai.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-orange shrink-0" />
                <span>Ambattur Industrial Estate, Chennai, Tamil Nadu 600053</span>
              </div>
            </div>

            <div className="bg-neutralBg p-6 rounded-2xl border border-gray-100">
              <span className="text-xs font-bold text-navy uppercase font-poppins block mb-3">
                Active Senior Dispatch Supervisors:
              </span>
              <div className="space-y-3">
                {SITE_CONFIG.technicians.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                    <div>
                      <span className="text-sm font-bold text-navy block">{tech.name}</span>
                      <span className="text-xs text-gray-500">{tech.role}</span>
                    </div>
                    <a 
                      href={`tel:+91${tech.phone}`}
                      className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
