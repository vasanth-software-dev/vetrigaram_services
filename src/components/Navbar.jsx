import React, { useState, useEffect } from 'react';
import { Menu, X, Wrench, Phone } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_NUMBER } from '../utils/contacts';

export default function Navbar({ onBookClick, onBookNow }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // header height
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

  const sidebarCategories = [
    {
      title: "Appliance Repair",
      categoryKey: "appliances",
      items: [
        { name: "AC Repair & Servicing" },
        { name: "Refrigerator Repair" },
        { name: "Washing Machine Repair" },
        { name: "Geyser & Heater Repair", searchName: "Geyser / Water Heater Repair" }
      ]
    },
    {
      title: "Electrical Services",
      categoryKey: "electrical",
      items: [
        { name: "Electrical Repair" },
        { name: "Switch & Socket Repair" },
        { name: "Fan Installation & Repair" },
        { name: "Light Installation" },
        { name: "Wiring & Rewiring" },
        { name: "MCB & Fuse Repair", searchName: "MCB / Fuse Repair" },
        { name: "Fault Troubleshooting", searchName: "Electrical Fault Troubleshooting" }
      ]
    },
    {
      title: "Plumbing Services",
      categoryKey: "plumbing",
      items: [
        { name: "Tap & Faucet Repair" },
        { name: "Pipe Leakage Repair" },
        { name: "Drain Cleaning" },
        { name: "Bathroom Plumbing" },
        { name: "Kitchen Plumbing" },
        { name: "Water Tank Services" },
        { name: "Toilet Repair & Installation" },
        { name: "General Plumbing Repair" }
      ]
    }
  ];

  const handleServiceClick = (category, serviceName) => {
    setIsOpen(false);
    if (onBookNow) {
      onBookNow(category, serviceName);
    }
  };
  
  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-premium' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center group shrink-0">
              <Logo size="md" />
            </a>

            {/* Actions & Hamburger Menu (Visible on all screens) */}
            <div className="flex items-center space-x-2 sm:space-x-5">
              {/* WhatsApp CTA Button */}
              <a 
                href={
                  `https://api.whatsapp.com/send?phone=+91${CONTACT_NUMBER}&text=Hello%20ServiceTree!%20Home%20Appliance%20Repair%20and%20Service%20Company`
                } 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow active:scale-95 flex items-center space-x-1 sm:space-x-1.5 shrink-0"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#ffffff"></path> </g></svg>
                <span className="hidden sm:inline">For Whatsapp Booking</span>
                <span className="inline sm:hidden">WhatsApp</span>
              </a>

              {/* Call support border block */}
              <a 
                href={`tel:+91${CONTACT_NUMBER}`} 
                className="border border-navy/20 bg-white hover:border-navy text-navy font-semibold p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm transition-all flex items-center space-x-1 sm:space-x-1.5 shadow-sm active:scale-95 shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-orange shrink-0" />
                <span className="hidden sm:inline">{CONTACT_NUMBER}</span>
                <span className="inline sm:hidden">Call</span>
              </a>

              {/* Hamburger Button - Shown on every screen size */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-navy hover:text-primary hover:bg-navy-light/5 focus:outline-none transition-colors"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Panel - Positioned on the LEFT, matching the styling from the image */}
      <div className={`fixed top-0 left-0 w-80 max-w-[85%] h-full bg-white shadow-2xl flex flex-col overflow-y-auto transition-transform duration-350 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-[9999]`}>
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-[#0B1B3D] text-white h-20 shrink-0 border-b border-[#0066FF]/20">
          <Logo size="sm" textLight title="vetikharam" subtitle="Menu" />
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-orange p-1 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Quick Links */}
        <div className="bg-[#0B1B3D]/5 p-4 border-b border-gray-150">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2 px-1 font-poppins">Quick Links</span>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[13px] font-semibold text-navy/85 hover:text-primary hover:bg-primary/5 px-2.5 py-2 rounded-lg transition-colors text-left font-poppins"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Categories List */}
        <div className="flex-grow flex flex-col bg-white">
          {sidebarCategories.map((cat, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Category Header */}
              <div className="bg-[#0B1B3D] text-white px-5 py-3 font-semibold text-[13px] tracking-wide uppercase font-poppins text-left border-b border-[#0066FF]/10">
                {cat.title}
              </div>
              {/* Category Sub-items */}
              <div className="flex flex-col">
                {cat.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleServiceClick(cat.categoryKey, item.searchName || item.name)}
                    className="w-full text-left bg-white border-b border-gray-100 px-6 py-3.5 text-[13.5px] font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors block font-poppins"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
