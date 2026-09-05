import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOCATIONS_CATALOG } from '../data/seoData';

export default function ServiceArea() {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [message, setMessage] = useState('');

  const activeLocations = LOCATIONS_CATALOG.map(loc => ({
    city: loc.name,
    id: loc.id,
    areas: loc.keyLocalities.join(', '),
    pincodes: loc.pincodes
  }));

  const handleCheck = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const trimmedArea = area.trim();
    const trimmedPincode = pincode.trim();

    if (!trimmedCity && !trimmedArea && !trimmedPincode) {
      setStatus('error');
      setMessage('Please enter an area, city, or pincode to check technician availability.');
      return;
    }

    if (trimmedPincode) {
      if (!/^\d{6}$/.test(trimmedPincode)) {
        setStatus('error');
        setMessage('Please enter a valid 6-digit postal pincode.');
        return;
      }
      
      // Validate Chennai / Ambattur pincode prefix (600xxx series)
      if (trimmedPincode.startsWith('600')) {
        setStatus('success');
        setMessage(`Great news! Vetrikharam technicians operate in pincode ${trimmedPincode} with same-day technician availability.`);
        return;
      } else {
        setStatus('error');
        setMessage(`Sorry, Vetrikharam currently operates across Chennai and Ambattur (600xxx pincodes). We are expanding to other Tamil Nadu districts soon!`);
        return;
      }
    }

    if (trimmedCity) {
      const cityLower = trimmedCity.toLowerCase();
      const matched = activeLocations.find(loc => 
        loc.city.toLowerCase().includes(cityLower) || cityLower.includes(loc.city.toLowerCase())
      );
      if (matched) {
        setStatus('success');
        setMessage(`Great news! We have active technician teams operating in ${matched.city}.`);
        return;
      } else {
        setStatus('error');
        setMessage(`We currently operate across Chennai and Ambattur. Additional service zones are opening soon.`);
        return;
      }
    }

    if (trimmedArea) {
      const areaLower = trimmedArea.toLowerCase();
      const isAreaServiced = activeLocations.some(loc => 
        loc.areas.toLowerCase().includes(areaLower)
      );
      if (isAreaServiced) {
        setStatus('success');
        setMessage(`Yes! We provide same-day doorstep service in ${trimmedArea}.`);
        return;
      } else {
        setStatus('success');
        setMessage(`Yes! Our Chennai & Ambattur mobile units cover ${trimmedArea} and adjacent sectors.`);
        return;
      }
    }
  };

  return (
    <section id="service-area" className="py-20 bg-neutralBg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins">Local Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            Doorstep Service Across Chennai & Ambattur
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Enter your locality or pincode below to check live technician availability at your address.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Availability Checker Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-premium flex flex-col justify-center">
            <h3 className="text-xl font-bold text-navy font-poppins mb-6">Check Availability in Your Area</h3>
            
            <form onSubmit={handleCheck} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Chennai"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins">Area / Locality</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Ambattur"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 600053"
                    maxLength="6"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold p-4 rounded-xl shadow-button-blue transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Check Technician Availability</span>
              </button>
            </form>

            {/* Status Messages */}
            {status && (
              <div className={`mt-6 p-4 rounded-2xl flex items-start space-x-3 border ${
                status === 'success' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                  : 'bg-red-50 border-red-100 text-red-800'
              }`}>
                {status === 'success' 
                  ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> 
                  : <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                }
                <span className="text-sm font-semibold">{message}</span>
              </div>
            )}
          </div>

          {/* Service Area Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {activeLocations.map((loc) => (
              <Link 
                key={loc.city}
                to={`/locations/${loc.id}`}
                className="bg-white hover:bg-neutralBg/50 transition-all rounded-2xl p-5 border border-gray-100/80 shadow-premium flex items-start space-x-4 group"
              >
                <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors p-3 rounded-xl shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-navy font-poppins text-base leading-none mb-1 group-hover:text-primary transition-colors">
                      {loc.city} Hub
                    </h4>
                    <span className="text-[11px] text-primary font-bold">View Hub →</span>
                  </div>
                  <p className="text-xs text-navy/60 leading-relaxed font-medium line-clamp-2 mt-1">
                    Coverage: {loc.areas}
                  </p>
                </div>
              </Link>
            ))}

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-navy/70 leading-relaxed">
                Need urgent assistance in an adjacent residential area? Our mobile units are equipped for same-day dispatch.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
