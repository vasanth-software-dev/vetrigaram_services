import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_EMAIL, CONTACT_NUMBER } from '../utils/contacts';
import { SITE_CONFIG } from '../data/seoData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { label: 'AC Repair & Service', to: '/services/ac-repair' },
    { label: 'Refrigerator Repair', to: '/services/refrigerator-repair' },
    { label: 'Washing Machine Repair', to: '/services/washing-machine-repair' },
    { label: 'Geyser / Heater Repair', to: '/services/geyser-repair' },
  ];

  const companyLinks = [
    { label: 'Chennai Hub', to: '/locations/chennai' },
    { label: 'Ambattur Hub', to: '/locations/ambattur' },
    { label: 'All Service Locations', to: '/locations' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Support', to: '/contact' },
  ];

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://facebook.com/Vetrigaramservices',
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/Vetrigaramservices',
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/Vetrigaramservices',
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-navy-dark text-gray-300"
    >
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="inline-flex rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
              aria-label={`${SITE_CONFIG.brandName} home`}
            >
              <Logo size="md" textLight />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
              Your trusted partner for certified home appliance, electrical
              troubleshooting, and plumbing repairs across Chennai and
              Ambattur. Doorstep service with warranty protection.
            </p>

            {/* Contact information */}
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="group flex items-center gap-3 text-sm transition-colors hover:text-primary"
                aria-label={`Call ${CONTACT_NUMBER}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 text-orange" />
                </span>
                <span>{CONTACT_NUMBER}</span>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 text-sm transition-colors hover:text-primary"
                aria-label={`Email ${CONTACT_EMAIL}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Clock className="h-4 w-4 text-gray-500" />
                </span>
                <span>08:00 AM – 09:00 PM Daily</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4 text-orange" />
                </span>
                <span>Ambattur Industrial Estate, Chennai</span>
              </div>
            </div>
          </div>

          {/* Appliance services */}
          <div>
            <h2 className="font-poppins text-[15px] font-semibold text-white">
              Appliance Repair
            </h2>

            <ul className="mt-5 space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.to}>
                  <Link
                    to={service.to}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage & company */}
          <div>
            <h2 className="font-poppins text-[15px] font-semibold text-white">
              Coverage & Info
            </h2>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="font-poppins text-[15px] font-semibold text-white">
              Customer Support
            </h2>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Need help with an appliance, electrical issue, or plumbing
              problem? Our support team is ready to assist.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
            >
              Book a Service
            </Link>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 border-t border-white/5 pt-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="order-3 text-center text-xs text-gray-500 md:order-2">
              © {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
            </p>

            {/* Legal / quick links */}
            <nav
              className="order-2 flex items-center justify-center gap-5 text-xs text-gray-500 md:order-3"
              aria-label="Footer navigation"
            >
              <Link
                to="/about"
                className="transition-colors hover:text-gray-300"
              >
                Privacy & Terms
              </Link>

              <Link
                to="/contact"
                className="transition-colors hover:text-gray-300"
              >
                Doorstep Support
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
