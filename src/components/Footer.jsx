import React from 'react';
import { Wrench, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_EMAIL, CONTACT_NUMBER } from '../utils/contacts';

export default function Footer({ onBookClick }) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="contact" className="bg-navy-dark text-gray-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Branding & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col space-y-4">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex group">
              <Logo size="md" textLight />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted partner for home appliance, electrical, and plumbing repair. We deliver fast, certified, and warranty-backed doorstep repairs.
            </p>
            
            {/* Contact details */}
            <div className="space-y-2 pt-2">
              <a 
              href={`tel:+91${CONTACT_NUMBER}`} 
               className="flex items-center space-x-2.5 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-orange" />
                <span>{CONTACT_NUMBER}</span>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center space-x-2.5 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-center space-x-2.5 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>08:00 AM - 09:00 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Column 2: Appliance Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4.5">Appliance Repair</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">AC Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Refrigerator Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Washing Machine Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Geyser Repair</a></li>
            </ul>
          </div>

          {/* Column 3: Electrical Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4.5">Electrical Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Electrical Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Fan Installation</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Wiring & Rewiring</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Switch & Socket Repair</a></li>
            </ul>
          </div>

          {/* Column 4: Plumbing Services */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4.5">Plumbing Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Pipe Leakage Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Tap & Faucet Repair</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Drain Cleaning</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Bathroom Plumbing</a></li>
            </ul>
          </div>

          {/* Column 5: Company & Support */}
          <div>
            <h4 className="text-white font-semibold font-poppins text-[15px] mb-4.5">Company</h4>
            <ul className="space-y-2.5 text-sm mb-4">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#reviews" onClick={(e) => handleNavClick(e, '#reviews')} className="hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
            <h4 className="text-white font-semibold font-poppins text-xs uppercase tracking-wider mb-2">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onBookClick} className="hover:text-primary text-left transition-colors">Book a Service</button></li>
              <li><a href="tel:+18005550199" className="hover:text-primary transition-colors">Call Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Socials, Copyright, Legal */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Social icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
            </a>
            <a href="#" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="bg-white/5 hover:bg-primary text-gray-300 hover:text-white p-2.5 rounded-xl transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          {/* Copy and design attribution */}
          <div className="text-xs text-gray-500 text-center md:text-left flex items-center space-x-1.5">
            <span>© {currentYear} vetikharam Home Services. All rights reserved.</span>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
