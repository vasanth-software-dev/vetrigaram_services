import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_NUMBER } from '../utils/contacts';

export default function Navbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/' || location.pathname === '';


  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services / Solutions', path: '/services' },
    { label: 'Why Us', href: '#why-us', path: '/#why-us' },
    { label: 'Case Studies', href: '#case-studies', path: '/#case-studies' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);

    if (isHomePage && item.href) {
      const element = document.querySelector(item.href);
      if (element) {
        const offset = 85;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        return;
      }
    }

    if (item.path) {
      if (item.path.startsWith('/#') && !isHomePage) {
        navigate('/');
        setTimeout(() => {
          const targetId = item.path.replace('/#', '');
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        navigate(item.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCtaClick = () => {
    setIsOpen(false);
    if (onBookClick) {
      onBookClick();
    } else {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-nav-scrolled"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center group shrink-0 focus:outline-none">
              <Logo size="md" textLight={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-gray-200">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`transition-colors duration-200 hover:text-[#FF7A00] relative py-1 cursor-pointer ${
                      isActive ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF7A00] to-[#2385E8] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center space-x-3">
              {/* WhatsApp Quick Chat */}
              <a
                href={`https://api.whatsapp.com/send?phone=+91${CONTACT_NUMBER}&text=Hello%20Vetrigaram!%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              {/* Call CTA */}
              <a
                href={`tel:+91${CONTACT_NUMBER}`}
                className="hidden md:inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg text-white border border-white/15 hover:border-white/30 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>+91 {CONTACT_NUMBER}</span>
              </a>

              {/* Primary High-Conversion CTA */}
              <button
                onClick={handleCtaClick}
                className="bg-gradient-orange-btn text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-button-orange flex items-center space-x-1.5 group shrink-0"
              >
                <span>Book Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6 text-[#FF7A00]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-80 max-w-[85%] h-full bg-[#071A33] border-l border-[#2385E8]/20 shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ease-out z-[9999] lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#0B2345]">
          <Logo size="sm" textLight={true} />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-gray-300 hover:text-[#FF7A00] p-1.5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-grow px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className="flex items-center justify-between py-3 px-3.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/5 font-medium text-sm transition-all"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF7A00] opacity-60" />
            </a>
          ))}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-[#0B2345]/50 space-y-3">
          <button
            onClick={handleCtaClick}
            className="w-full bg-gradient-orange-btn text-white font-bold py-3 px-4 rounded-xl shadow-button-orange flex items-center justify-center space-x-2 text-sm"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:+91${CONTACT_NUMBER}`}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-white/15 text-white text-xs font-semibold hover:bg-white/5 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Call +91 {CONTACT_NUMBER}</span>
          </a>
        </div>
      </div>
    </>
  );
}
