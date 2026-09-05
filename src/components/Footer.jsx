import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_EMAIL, CONTACT_NUMBER } from '../utils/contacts';
import { SITE_CONFIG } from '../data/seoData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-navy-dark text-gray-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Branding & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col space-y-4">
            <Link to="/" className="inline-flex group focus:outline-none">
              <Logo size="md" textLight />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted partner for certified home appliance, electrical troubleshooting, and plumbing repairs across Chennai and Ambattur. Doorstep service with warranty protection.
            </p>
            
            {/* Contact details */}
            <div className="space-y-2 pt-2">
              <a 
                href={`tel:${SITE_CONFIG.phone}`} 
                className="flex items-center space-x-2.5 text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-orange shrink-0" />
                <span>{CONTACT_NUMBER}</span>
              </a>
              <a 
                href={`mailto:${CONTACT_EMAIL}`} 
                className="flex items-center space-x-2.5 text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-center space-x-2.5 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                <span>08:00 AM - 09:00 PM Daily</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-orange shrink-0" />
                <span>Ambattur Industrial Estate, Chennai</span>
              </div>
            </div>
          </div>

          {/* Column 2: Appliance Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4">Appliance Repair</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/ac-repair" className="hover:text-primary transition-colors">AC Repair & Service</Link></li>
              <li><Link to="/services/refrigerator-repair" className="hover:text-primary transition-colors">Refrigerator Repair</Link></li>
              <li><Link to="/services/washing-machine-repair" className="hover:text-primary transition-colors">Washing Machine Repair</Link></li>
              <li><Link to="/services/geyser-repair" className="hover:text-primary transition-colors">Geyser / Heater Repair</Link></li>
            </ul>
          </div>

          {/* Column 3: Electrical Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4">Electrical Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/electrical-repair" className="hover:text-primary transition-colors">Electrical Diagnostics</Link></li>
              <li><Link to="/services/fan-installation" className="hover:text-primary transition-colors">Fan Installation & Repair</Link></li>
              <li><Link to="/services/wiring-rewiring" className="hover:text-primary transition-colors">Wiring & Rewiring</Link></li>
              <li><Link to="/services/switch-socket-repair" className="hover:text-primary transition-colors">Switch & Socket Fix</Link></li>
            </ul>
          </div>

          {/* Column 4: Plumbing Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4">Plumbing Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/plumbing-repair" className="hover:text-primary transition-colors">General Plumbing Fix</Link></li>
              <li><Link to="/services/tap-faucet-repair" className="hover:text-primary transition-colors">Tap & Faucet Repair</Link></li>
              <li><Link to="/services/drain-cleaning" className="hover:text-primary transition-colors">Drain Block Cleaning</Link></li>
              <li><Link to="/services/water-tank-services" className="hover:text-primary transition-colors">Water Tank Services</Link></li>
            </ul>
          </div>

          {/* Column 5: Locations & Company */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4">Coverage & Info</h4>
            <ul className="space-y-2.5 text-sm mb-4">
              <li><Link to="/locations/chennai" className="hover:text-primary transition-colors">Chennai Hub</Link></li>
              <li><Link to="/locations/ambattur" className="hover:text-primary transition-colors">Ambattur Hub</Link></li>
              <li><Link to="/locations" className="hover:text-primary transition-colors">All Service Locations</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Socials, Copyright, Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Social links */}
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com/vetrikharamservices" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="https://twitter.com/vetrikharam" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com/vetrikharamservices" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://linkedin.com/company/vetrikharam-services" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-left">
            <span>© {currentYear} {SITE_CONFIG.brandName}. All rights reserved.</span>
          </div>

          {/* Quick links */}
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link to="/about" className="hover:text-gray-300 transition-colors">Privacy & Terms</Link>
            <Link to="/contact" className="hover:text-gray-300 transition-colors">Doorstep Support</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
