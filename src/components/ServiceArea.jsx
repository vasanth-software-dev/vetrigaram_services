import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, AlertCircle, Building2 } from 'lucide-react';

export default function ServiceArea() {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [message, setMessage] = useState('');

  const activeLocations = [
    { city: "New York", areas: "Manhattan, Brooklyn, Queens, Bronx" },
    { city: "Los Angeles", areas: "Beverly Hills, Santa Monica, Pasadena, Downtown" },
    { city: "Chicago", areas: "The Loop, Lincoln Park, Hyde Park, Wicker Park" },
    { city: "Houston", areas: "Downtown, Midtown, The Heights, River Oaks" }
  ];

  const handleCheck = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    const trimmedArea = area.trim();
    const trimmedPincode = pincode.trim();

    if (!trimmedCity && !trimmedArea && !trimmedPincode) {
      setStatus('error');
      setMessage('Please enter a City, Area, or Pincode to check availability.');
      return;
    }

    if (trimmedPincode) {
      if (!/^\d{5,6}$/.test(trimmedPincode)) {
        setStatus('error');
        setMessage('Please enter a valid 5 or 6 digit numeric pincode.');
        return;
      }
      
      // Validate pincode prefix
      // New York: 10xxx, 11xxx, 12xxx
      // Los Angeles: 90xxx, 91xxx
      // Chicago: 60xxx
      // Houston: 77xxx
      const prefix2 = trimmedPincode.substring(0, 2);
      const isValidPincode = ['10', '11', '12', '90', '91', '60', '77'].includes(prefix2);
      
      if (!isValidPincode) {
        setStatus('error');
        setMessage(`Sorry, vetikharam is not active in pincode ${trimmedPincode} yet. We are expanding rapidly!`);
        return;
      }
    }

    if (trimmedCity) {
      const cityLower = trimmedCity.toLowerCase();
      const matchedLocation = activeLocations.find(loc => loc.city.toLowerCase() === cityLower);
      if (!matchedLocation) {
        setStatus('error');
        setMessage(`Sorry, we do not service "${trimmedCity}" yet. We currently operate in New York, Los Angeles, Chicago, and Houston.`);
        return;
      }
    }

    if (trimmedArea && !trimmedCity && !trimmedPincode) {
      const areaLower = trimmedArea.toLowerCase();
      const isAreaServiced = activeLocations.some(loc => 
        loc.areas.toLowerCase().includes(areaLower)
      );
      if (!isAreaServiced) {
        setStatus('error');
        setMessage(`Sorry, we do not have technician coverage in "${trimmedArea}" yet.`);
        return;
      }
    }

    // Success simulation
    setStatus('success');
    if (trimmedPincode) {
      setMessage(`Yes! vetikharam is active in pincode ${trimmedPincode} with same-day technician availability.`);
    } else if (trimmedCity) {
      setMessage(`Great news! We have active technician teams servicing ${trimmedCity}.`);
    } else {
      setMessage(`Yes! We service ${trimmedArea} daily.`);
    }
  };

  return (
    <section className="py-20 bg-neutralBg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-primary font-bold text-sm uppercase tracking-wider font-poppins font-semibold">Service Coverage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy mt-2 tracking-tight">
            We Bring Professional Service to Your Doorstep
          </h2>
          <p className="text-navy/70 mt-4 text-base sm:text-lg">
            Enter your details below to check if our technicians are currently operating in your residential area.
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
                    placeholder="e.g. New York"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins">Area / Locality</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Brooklyn"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 10001"
                    maxLength="6"
                    className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold p-4 rounded-xl shadow-button-blue transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
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
              <div 
                key={loc.city}
                className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-premium flex items-start space-x-4"
              >
                <div className="bg-primary/5 text-primary p-3 rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy font-poppins text-base leading-none mb-2">{loc.city}</h4>
                  <p className="text-xs text-navy/60 leading-relaxed font-medium">
                    Servicing: {loc.areas}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
