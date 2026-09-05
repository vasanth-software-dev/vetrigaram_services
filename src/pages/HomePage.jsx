import React, { useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PopularServices from '../components/PopularServices';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import BookingForm from '../components/BookingForm';
import ServiceArea from '../components/ServiceArea';
import Stats from '../components/Stats';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import SeoHead from '../seo/SeoHead';
import { 
  getOrganizationSchema, 
  getLocalBusinessSchema, 
  getWebSiteSchema, 
  getFaqSchema 
} from '../seo/schemaGenerator';

const homeFaqs = [
  {
    q: "How quickly can a technician arrive at my doorstep?",
    a: "Typically, our certified technicians can arrive at your doorstep within 2 to 4 hours of booking in Chennai and 60 to 90 minutes in Ambattur, depending on your preferred time slot."
  },
  {
    q: "What is the inspection fee policy?",
    a: "We charge a standard inspection fee of ₹149 to cover technician doorstep travel and diagnostic testing. If you proceed with the repair service, this ₹149 charge is completely adjusted and waived from your final invoice."
  },
  {
    q: "Are replacement spare parts covered with a warranty?",
    a: "Yes, all genuine replacement parts (such as AC capacitors, compressors, water valves, switches, or geyser elements) carry authentic manufacturer warranties plus our 30-day Vetrigaram service guarantee."
  },
  {
    q: "Can I cancel or reschedule my service appointment?",
    a: "Yes, you can reschedule or cancel your booking at no penalty up to 2 hours before your selected slot by calling our support line at +91 6374121120."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery after the service is tested and completed to your 100% satisfaction."
  }
];

export default function HomePage({ onBookClick, onBookNow: externalBookNow, selectedCategory = '', selectedService = '', onResetSelection }) {
  const [cat, setCat] = useState(selectedCategory);
  const [serv, setServ] = useState(selectedService);

  const handleBookNow = (category, serviceName) => {
    setCat(category);
    setServ(serviceName);
    if (externalBookNow) {
      externalBookNow(category, serviceName);
    } else {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    setCat('');
    setServ('');
    if (onResetSelection) onResetSelection();
  };

  const schemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getLocalBusinessSchema(),
    getFaqSchema(homeFaqs)
  ];

  return (
    <>
      <SeoHead
        title="Vetrigaram Tech Services | Premium Appliance Repair"
        description="Vetrigaram Tech Services delivers fast, certified, and warranty-backed appliance repair, electrical troubleshooting, and plumbing services across Chennai and Ambattur. ₹149 inspection."
        canonicalPath="/"
        schemas={schemas}
      />

      <Hero onBookClick={onBookClick} />
      <Services onBookNow={handleBookNow} />
      <PopularServices onBookNow={handleBookNow} />
      <WhyChooseUs />
      <HowItWorks onBookClick={onBookClick} />
      <BookingForm 
        initialCategory={cat || selectedCategory} 
        initialService={serv || selectedService}
        onResetSelection={handleReset}
      />
      <ServiceArea />
      <Stats />
      <Reviews />
      <FAQ />
      <CTA onBookClick={onBookClick} />
    </>
  );
}
