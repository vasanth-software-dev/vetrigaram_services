import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Wrench } from 'lucide-react';
import SeoHead from '../seo/SeoHead';
import { SITE_CONFIG } from '../data/seoData';

export default function NotFoundPage() {
  return (
    <div className="pt-32 pb-24 bg-neutralBg min-h-screen flex items-center justify-center">
      <SeoHead
        title="Page Not Found (404) | Vetrikharam Home Services"
        description="The requested page could not be found on Vetrikharam Home Services. Please navigate back to our homepage or explore our services catalog."
        canonicalPath="/404"
        robots="noindex, follow"
      />

      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-premium">
          <span className="text-6xl sm:text-7xl font-extrabold text-primary/30 font-poppins block mb-4">
            404
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-navy font-poppins mb-3">
            Page Not Found
          </h1>

          <p className="text-navy/65 text-sm sm:text-base leading-relaxed mb-8">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let us help you get back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-button-blue transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Go to Homepage</span>
            </Link>

            <Link
              to="/services"
              className="bg-neutralBg hover:bg-gray-100 text-navy font-bold text-sm px-6 py-3.5 rounded-2xl border border-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-primary" />
              <span>Browse Services</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Need immediate technician assistance? Call our support desk at{' '}
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary font-bold hover:underline">
                {SITE_CONFIG.rawPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
