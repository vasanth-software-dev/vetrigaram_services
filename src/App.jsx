import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LocationsPage from './pages/LocationsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import LocationServicePage from './pages/LocationServicePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { ArrowUp } from 'lucide-react';
import { CONTACT_NUMBER } from './utils/contacts';

// Route change scroll restoration helper
function RouteScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking') || document.getElementById('service-booking') || document.getElementById('local-booking');
    if (bookingSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = bookingSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookNow = (category, serviceName) => {
    console.log(category, serviceName);
    
    setSelectedCategory(category);
    setSelectedService(serviceName);
    scrollToBooking();
  };

  const handleGeneralBook = () => {
    scrollToBooking();
  };

  const handleResetSelection = () => {
    setSelectedCategory('');
    setSelectedService('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutralBg">
      <RouteScrollRestoration />

      {/* Header Sticky Navigation */}
      <Navbar onBookClick={handleGeneralBook} onBookNow={handleBookNow} />
      
      {/* Main Page Layout */}
      <main className="flex-grow pb-24 lg:pb-0">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onBookClick={handleGeneralBook} 
                onBookNow={handleBookNow}
                selectedCategory={selectedCategory}
                selectedService={selectedService}
                onResetSelection={handleResetSelection}
              />
            } 
          />
          <Route path="/services" element={<ServicesPage onBookNow={handleBookNow} />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage onBookNow={handleBookNow} />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:locationSlug" element={<LocationDetailPage onBookNow={handleBookNow} />} />
          <Route path="/:locationSlug/:serviceSlug" element={<LocationServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {/* Multi-column Footer */}
      <Footer onBookClick={handleGeneralBook} />
      
      {/* Mobile Sticky CTA Bar */}
      <MobileStickyBar onBookClick={handleGeneralBook} />

      {/* Floating Buttons */}
      <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="bg-white hover:bg-gray-50 text-navy p-3 rounded-full border border-gray-150 shadow-premium transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center pointer-events-auto"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </button>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href={
            `https://api.whatsapp.com/send?phone=+91${CONTACT_NUMBER}&text=Hello%20Vetrigaram!%20Home%20Appliance%20Repair%20and%20Service%20Company`
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-premium transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center animate-float-subtle pointer-events-auto"
        >
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#ffffff"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#ffffff"></path></g></svg>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basePath}>
      <MainLayout />
    </BrowserRouter>
  );
}
