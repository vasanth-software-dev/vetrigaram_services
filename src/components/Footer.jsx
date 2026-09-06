import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_EMAIL, CONTACT_NUMBER } from '../utils/contacts';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { label: 'AC Repair & Overhaul', to: '/services/ac-repair' },
    { label: 'Refrigerator Diagnostic', to: '/services/refrigerator-repair' },
    { label: 'Washing Machine Fix', to: '/services/washing-machine-repair' },
    { label: 'Geyser & Water Heating', to: '/services/geyser-repair' },
  ];

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'All Services', to: '/services' },
    { label: 'Service Locations', to: '/locations' },
    { label: 'Contact Support', to: '/contact' },
  ];

  return (
    <footer className="bg-[#071A33] text-white border-t border-[#2385E8]/20 relative overflow-hidden">
      {/* Subtle bottom decorative arc */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2385E8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link to="/" className="flex items-center group mb-5 focus:outline-none">
              <Logo size="md" textLight={true} />
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-sm font-normal">
              Vetrigaram is a premier doorstep technical engineering and appliance service platform. We pair verified master technicians with precision diagnostic SOPs to turn downtime into operational momentum.
            </p>

            <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              <span>Certified & Verified Technicians across Chennai</span>
            </div>
          </div>

          {/* Navigation Column (Col 5-6) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-[#FF7A00] transition-colors flex items-center space-x-1.5 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7A00]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (Col 7-9) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2385E8] mb-5">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-[#FF7A00] transition-colors flex items-center space-x-1.5 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7A00]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (Col 10-12) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-5">
              Headquarters
            </h4>
            
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-1" />
                <span className="text-xs sm:text-sm">Ambattur Industrial Estate, Chennai 600053</span>
              </li>

              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#2385E8] shrink-0" />
                <a 
                  href={`tel:+91${CONTACT_NUMBER}`}
                  className="hover:text-white transition-colors font-medium text-xs sm:text-sm"
                >
                  +91 {CONTACT_NUMBER}
                </a>
              </li>

              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <a 
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-white transition-colors text-xs truncate"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>

              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="text-xs sm:text-sm">Mon – Sun: 8 AM – 9 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © {currentYear} Vetrigaram Tech Services Private Limited. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-[#FF7A00] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-[#FF7A00] transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-[#FF7A00] transition-colors">
              Direct Support
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
