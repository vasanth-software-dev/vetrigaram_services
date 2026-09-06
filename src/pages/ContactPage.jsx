import React from 'react';
import { Phone, Mail, Clock, MessageSquare, Sparkles } from 'lucide-react';
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
    <div className="pt-28 pb-20 bg-[#F5F7FA] min-h-screen">
      <SeoHead
        title="Contact Us & Book a Specialist | Vetrigaram Tech Services"
        description="Contact Vetrigaram Tech Services in Chennai & Ambattur. Call +91 6374121120 or book online for fast appliance engineering and diagnostics. Open 8 AM - 9 PM daily."
        canonicalPath="/contact"
        schemas={schemas}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Customer Support & Instant Bookings</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A33] tracking-tight">
            We Are Ready to Assist You
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Reach out via phone, WhatsApp, or our online booking form for fast doorstep technician assistance across Chennai and Ambattur.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-[#D9DEE5] shadow-premium hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#071A33] text-[#FF7A00] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071A33] text-base mb-1">Direct Phone Line</h3>
              <p className="text-xs text-gray-500 mb-4">Speak directly with our technical dispatch desk.</p>
            </div>
            <a 
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-[#1459B8] hover:text-[#FF7A00] font-bold text-sm transition-colors"
            >
              +91 {SITE_CONFIG.rawPhone}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-6 border border-[#D9DEE5] shadow-premium hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071A33] text-base mb-1">WhatsApp Chat</h3>
              <p className="text-xs text-gray-500 mb-4">Instant chat for quick diagnostic questions and photos.</p>
            </div>
            <a 
              href={`https://api.whatsapp.com/send?phone=+91${SITE_CONFIG.rawPhone}&text=Hello%20Vetrigaram!%20I%20would%20like%20to%20book%20a%20technician.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-bold text-sm"
            >
              Open WhatsApp Chat →
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-[#D9DEE5] shadow-premium hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2385E8]/15 text-[#2385E8] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071A33] text-base mb-1">Direct Email</h3>
              <p className="text-xs text-gray-500 mb-4">For residential inquiries, invoices, and commercial accounts.</p>
            </div>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-[#1459B8] hover:text-[#FF7A00] font-bold text-xs truncate transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-2xl p-6 border border-[#D9DEE5] shadow-premium hover-lift flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#071A33] text-[#25D366] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#071A33] text-base mb-1">Working Hours</h3>
              <p className="text-xs text-gray-500 mb-4">Technician active dispatch 7 days a week.</p>
            </div>
            <span className="text-xs font-bold text-[#071A33]">
              8:00 AM – 9:00 PM Daily
            </span>
          </div>
        </div>

        {/* Embedded Booking Form */}
        <div id="booking" className="mt-8">
          <BookingForm />
        </div>

      </div>
    </div>
  );
}
