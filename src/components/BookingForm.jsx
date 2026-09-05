import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import { servicesData } from './Services';
import { Calendar, Clock, Phone, MapPin, ClipboardList, CheckCircle2, User, HelpCircle, ArrowRight } from 'lucide-react';
import { createBooking } from '../api/api';
import { DEFAULT_TECHNICIANS } from '../utils/contacts';

const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const referenceNum = () => Math.floor(100000 + Math.random() * 900000);


export default function BookingForm({ initialCategory = '', initialService = '', onResetSelection }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    service: '',
    date: '',
    time: '',
    address: '',
    problem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [technician, setTechnician] = useState({ name: '', phone: '' });

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({
        ...prev,
        category: initialCategory,
        service: initialService || ''
      }));
    }
  }, [initialCategory, initialService]);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: cat,
      service: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? value.replace(/[^0-9\-+() ]/g, '') : value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 8) {
      tempErrors.phone = "Provide a valid phone number";
    }
    // if (!formData.category) tempErrors.category = "Please select a service category";
    // if (!formData.service) tempErrors.service = "Please select a service";
    // if (!formData.date) tempErrors.date = "Please select a preferred date";
    // if (!formData.time) tempErrors.time = "Please select a preferred time slot";
    // if (!formData.address.trim()) tempErrors.address = "Full address is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

       // Prevent multiple submissions
      if (isSubmitted) return;
      setIsSubmitted(true);

      try {
        // const bookingData = {
        //   name: formData.name,
        //   phone: formData.phone,
        //   service_category: formData.category,
        //   service: formData.service,
        //   address: formData.address,
        //   preferred_date: formData.date,
        //   preferred_time: formData.time,
        //   problem_description: formData.problem
        // };
        
        // const result = await createBooking(bookingData);

        const reference_num = "FX-"+referenceNum();

        const templateParams = {
          reference_num: reference_num,
          name: formData.name,
          phone: formData.phone,
          address: formData.address || "Not provided",

          service_category: formData.service_category || "Not provided",
          service: formData.service || "Not provided",
          preferred_date: formData.date || "Not provided",
          preferred_time: formData.time || "Not provided",

          problem_description: formData.problem_description || "Not provided",

          request_received_on: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
        };

        await emailjs.send(
            "service_0j3nlam",
            "template_fhth66j",
            templateParams,
            "7fEFpmWyNsuPUUzKF"
        );          

        setBookingRef(reference_num);

        const technicians = DEFAULT_TECHNICIANS;
        const randomTech = technicians[Math.floor(Math.random() * technicians.length)];

        setTechnician({
          name: randomTech.name,
          phone: randomTech.phone,
        });

        setIsSubmitted(true);

        form.reset();

      } catch (err) {
        
        if (err.status === 400 && Array.isArray(err.errors)) {
          const apiErrors = {};

          err.errors.forEach((e) => {
            let field = e.field;
            if (field === 'service_category') field = 'category';
            if (field === 'preferred_date') field = 'date';
            if (field === 'preferred_time') field = 'time';
            if (field === 'problem_description') field = 'problem';
            apiErrors[field] = e.message;
          });

          setErrors(apiErrors);
          return;
        }

        console.log(err);
          
      }finally {
        setIsSubmitted(false);
      }
      
      
      
      // Scroll to the booking section to see confirmation card
      const formSection = document.getElementById('booking');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      category: '',
      service: '',
      date: '',
      time: '',
      address: '',
      problem: ''
    });
    setErrors({});
    setIsSubmitted(false);
    if (onResetSelection) onResetSelection();
  };

  const timeSlots = [
    "09:00 AM - 12:00 PM (Morning)",
    "12:00 PM - 03:00 PM (Afternoon)",
    "03:00 PM - 06:00 PM (Late Afternoon)",
    "06:00 PM - 09:00 PM (Evening)"
  ];

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Get Help Now</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            {isSubmitted ? "Booking Confirmed!" : "Book a Technician Today"}
          </h2>
          <p className="text-navy/70 mt-3 text-base sm:text-lg">
            {isSubmitted 
              ? "Your request has been successfully registered. A technician is on their way." 
              : "Fill out the simple form below and we will assign a certified expert right away."}
          </p>
        </div>

        <div className="bg-neutralBg rounded-[36px] p-6 sm:p-10 border border-gray-100 shadow-premium">
          
          {!isSubmitted ? (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/20' : 'border-gray-200'} font-medium text-navy text-[15px]`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={`w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'} font-medium text-navy text-[15px]`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Category and Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Service Category (Optional)</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className={`w-full bg-white px-4 py-3.5 rounded-xl border ${errors.category ? 'border-red-500' : 'border-gray-200'} font-medium text-navy text-[15px] appearance-none`}
                    >
                      <option value="">Select Category</option>
                      <option value="appliances">Appliance Repair</option>
                      <option value="electrical">Electrical Services</option>
                      <option value="plumbing">Plumbing Services</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 205"><path d="M5.2 75.2c4.8-4.8 12.5-4.8 17.3 0L102.5 155l80-80c4.8-4.8 12.5-4.8 17.3 0 4.8 4.8 4.8 12.5 0 17.3l-88.6 88.6c-4.8 4.8-12.5 4.8-17.3 0L5.2 92.5c-4.8-4.8-4.8-12.5 0-17.3z"/></svg>
                    </div>
                  </div>
                  {errors.category && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Select Service (Optional)</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={!formData.category}
                      className={`w-full bg-white px-4 py-3.5 rounded-xl border ${errors.service ? 'border-red-500' : 'border-gray-200'} font-medium text-navy text-[15px] appearance-none disabled:bg-gray-100 disabled:text-gray-400`}
                    >
                      <option value="">Select Service</option>
                      {formData.category && 
                        servicesData[formData.category].items.map(item => (
                          <option key={item.name} value={item.name}>{item.name}</option>
                        ))
                      }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 205"><path d="M5.2 75.2c4.8-4.8 12.5-4.8 17.3 0L102.5 155l80-80c4.8-4.8 12.5-4.8 17.3 0 4.8 4.8 4.8 12.5 0 17.3l-88.6 88.6c-4.8 4.8-12.5 4.8-17.3 0L5.2 92.5c-4.8-4.8-4.8-12.5 0-17.3z"/></svg>
                    </div>
                  </div>
                  {errors.service && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.service}</p>}
                </div>
              </div>

              {/* Row 3: Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Preferred Date (Optional)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={getLocalDateString()}
                      className={`w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border ${errors.date ? 'border-red-500' : 'border-gray-200'} font-medium text-navy text-[15px]`}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Preferred Time (Optional)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border ${errors.time ? 'border-red-500' : 'border-gray-200'} font-medium text-navy text-[15px] appearance-none`}
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 205"><path d="M5.2 75.2c4.8-4.8 12.5-4.8 17.3 0L102.5 155l80-80c4.8-4.8 12.5-4.8 17.3 0 4.8 4.8 4.8 12.5 0 17.3l-88.6 88.6c-4.8 4.8-12.5 4.8-17.3 0L5.2 92.5c-4.8-4.8-4.8-12.5 0-17.3z"/></svg>
                    </div>
                  </div>
                  {errors.time && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.time}</p>}
                </div>
              </div>

              {/* Row 4: Address */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Full Address (Optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-[18px] w-5 h-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2.5"
                    placeholder="Street Address, Apartment, City, State, Pincode"
                    className={`w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} font-medium text-navy text-[15px] resize-none`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.address}</p>}
              </div>

              {/* Row 5: Problem Description */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2 font-poppins">Problem Description (Optional)</label>
                <div className="relative">
                  <ClipboardList className="absolute left-4 top-[18px] w-5 h-5 text-gray-400" />
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    rows="3.5"
                    placeholder="Please describe the issue in detail (e.g. leaking noise, faulty switch, no cooling...)"
                    className="w-full bg-white pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 font-medium text-navy text-[15px] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button disabled={isSubmitted}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold py-4 rounded-2xl shadow-button-blue transition-all duration-200 text-[16px] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                    {isSubmitted ? "Submitting..." : "Confirm Booking"}
                </button>
                <p className="text-center text-xs text-navy/60 mt-3 font-semibold font-poppins">
                  ★ Per visit (Inspection charge) ₹149 applies if no service is availed (waived off if service is taken).
                </p>
              </div>

            </form>
          ) : (
            /* Confirmation Card */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100/80 shadow-premium max-w-xl mx-auto animate-fade-in">
              <div className="flex flex-col items-center text-center">
                
                {/* Success Check Icon */}
                <div className="bg-emerald-50 text-emerald-500 p-4 rounded-full mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest font-poppins">
                  Booking Confirmed!
                </span>
                
                <h3 className="text-2xl font-bold text-navy mt-2 font-poppins">
                  Reference: {bookingRef}
                </h3>
                
                {/* Dashed line */}
                <div className="w-full border-t border-dashed border-gray-200 my-6" />

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 w-full text-left text-sm mb-6">
                  <div>
                    <span className="text-gray-400 block text-xs">Customer Name</span>
                    <span className="font-semibold text-navy mt-0.5 block">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Selected Service</span>
                    <span className="font-semibold text-navy mt-0.5 block">{formData.service}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Preferred Date</span>
                    <span className="font-semibold text-navy mt-0.5 block">{formData.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Preferred Time</span>
                    <span className="font-semibold text-navy mt-0.5 block text-xs sm:text-sm">{formData.time}</span>
                  </div>
                </div>

                {/* Technician Assignment */}
                {technician.name && (
                  <div className="w-full bg-primary/5 rounded-2xl p-4 text-left border border-primary/10 mb-6">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block font-poppins mb-1.5">
                      Technician Status
                    </span>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-navy text-[15px]">
                          {technician.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          Assigned & Dispatched
                        </p>
                      </div>

                      {technician.phone && (
                        <a
                          href={`tel:${technician.phone}`}
                          className="bg-white hover:bg-gray-50 border border-gray-100 text-navy hover:text-primary p-2.5 rounded-xl shadow-sm transition-all"
                        >
                          <Phone className="w-4 h-4 text-orange" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href="tel:+18005550199"
                    className="flex-1 flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4 text-orange" />
                    <span>Call Support</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-navy font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98]"
                  >
                    <span>Book Another</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
