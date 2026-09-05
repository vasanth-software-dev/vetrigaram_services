import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOCATIONS_CATALOG } from '../data/seoData';
import { validatePincode, validateCityOrArea } from '../utils/security';

export default function ServiceArea() {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(false);
  
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [message, setMessage] = useState('');

  const activeLocations = LOCATIONS_CATALOG.map(loc => ({
    city: loc.name,
    id: loc.id,
    areas: loc.keyLocalities.join(', '),
    pincodes: loc.pincodes
  }));

  const cleanOfficeName = (name = "") => {
    return name
      .replace(/\s+(SO|S. O|BO|HO)$/i, "")
      .trim();
  };

  const fetchByPincode = async (pin) => {
  if (pin.length !== 6) return;

  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pin}`
    );

    const result = await response.json();

    const postOffices = result?.[0]?.PostOffice || [];

    if (postOffices.length > 0) {
      const office = postOffices[0];

      setArea(cleanOfficeName(office.Name));
      setCity(office.District || "");
      setPincode(pin);

      setStatus("success");
      setMessage(`Service available in ${cleanOfficeName(office.Name)}`);
    } else {
      setArea("");
      setStatus("error");
      setMessage("Invalid pincode or location not found.");
    }
  } catch (error) {
    console.error("Pincode lookup failed:", error);
    setStatus("error");
    setMessage("Unable to verify pincode. Please try again.");
  }
};


  const fetchAreas = async (selectedCity) => {
    if (!selectedCity) {
      setAreas([]);
      setArea("");
      setPincode("");
      return;
    }

    setLoadingAreas(true);
    setAreas([]);
    setArea("");
    setPincode("");

    try {
      const response = await fetch(
        `https://api.pincodeapi.in/api/v1/district/${encodeURIComponent(
          selectedCity
        )}`
      );

      const result = await response.json();

      if (result.success) {
        const postOffices = result.data?.post_offices || [];

        // Remove duplicates
        const uniqueAreas = postOffices.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (x) =>
                x.office_name === item.office_name &&
                x.pincode === item.pincode
            )
        );

        setAreas(uniqueAreas);
      } else {
        setAreas([]);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
      setAreas([]);
    } finally {
      setLoadingAreas(false);
    }
  };


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
      const pinResult = validatePincode(trimmedPincode, { isRequired: true });
      if (!pinResult.isValid) {
        setStatus('error');
        setMessage(pinResult.error);
        return;
      }
      
      const cleanPin = pinResult.sanitized;
      // Validate Chennai / Ambattur pincode prefix (600xxx series)
      if (cleanPin.startsWith('600')) {
        setStatus('success');
        setMessage(`Great news! Vetrigaram technicians operate in pincode ${cleanPin} with same-day technician availability.`);
        return;
      } else {
        setStatus('error');
        setMessage(`Sorry, Vetrigaram currently operates across Chennai and Ambattur (600xxx pincodes). We are expanding to other Tamil Nadu districts soon!`);
        return;
      }
    }

    if (trimmedCity) {
      const cityResult = validateCityOrArea(trimmedCity, { isRequired: true, maxLength: 60 });
      if (!cityResult.isValid) {
        setStatus('error');
        setMessage(cityResult.error);
        return;
      }

      const cleanCity = cityResult.sanitized;
      const cityLower = cleanCity.toLowerCase();
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
      const areaResult = validateCityOrArea(trimmedArea, { isRequired: true, maxLength: 60 });
      if (!areaResult.isValid) {
        setStatus('error');
        setMessage(areaResult.error);
        return;
      }

      const cleanArea = areaResult.sanitized;
      const areaLower = cleanArea.toLowerCase();
      const isAreaServiced = activeLocations.some(loc => 
        loc.areas.toLowerCase().includes(areaLower)
      );
      if (isAreaServiced) {
        setStatus('success');
        setMessage(`Yes! We provide same-day doorstep service in ${cleanArea}.`);
        return;
      } else {
        setStatus('success');
        setMessage(`Yes! Our Chennai & Ambattur mobile units cover ${cleanArea} and adjacent sectors.`);
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
          <h3 className="text-xl font-bold text-navy font-poppins mb-6">
            Check Availability in Your Area
          </h3>

  <form onSubmit={handleCheck} className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      {/* City */}
      <div>
        <label
          htmlFor="service-city"
          className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins"
        >
          City
        </label>

        <select
          id="service-city"
          value={city}
          onChange={(e) => {
            const selectedCity = e.target.value;
            setCity(selectedCity);
            fetchAreas(selectedCity);
          }}
          className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none"
        >
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Thiruvallur">Thiruvallur</option>
        </select>
      </div>

      {/* Area */}
      <div>
        <label
          htmlFor="service-area"
          className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins"
        >
          Area / Locality
        </label>

        <select
          id="service-area"
          value={area}
          disabled={!city || loadingAreas}
          onChange={(e) => {
            const selectedArea = e.target.value;

            const selectedOffice = areas.find(
              (item) => item.office_name === selectedArea
            );

            setArea(selectedArea);
            setPincode(selectedOffice?.pincode || "");
          }}
          className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none disabled:opacity-60"
        >
          <option value="">
            {loadingAreas ? "Loading areas..." : "Select Area"}
          </option>

          {areas.map((item, index) => (
            <option
              key={`${item.pincode}-${item.office_name}-${index}`}
              value={item.office_name}
            >
              {cleanOfficeName(item.office_name)}
            </option>
          ))}
        </select>
      </div>

      {/* Pincode */}
      <div>
        <label
          htmlFor="service-pincode"
          className="block text-xs font-bold text-navy/70 uppercase tracking-wide mb-2 font-poppins"
        >
          Pincode
        </label>

        <input
        id="service-pincode"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        value={pincode}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 6);

          setPincode(value);

          // Clear area while typing
          if (value.length < 6) {
            setArea("");
            setStatus("");
            setMessage("");
          }

          // Lookup automatically when 6 digits are entered
          if (value.length === 6) {
            fetchByPincode(value);
          }
        }}
        placeholder="e.g. 600056"
        maxLength={6}
        className="w-full bg-neutralBg px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-navy focus:outline-none"
      />


      </div>

    </div>

    <button
      type="submit"
      disabled={!city || !area || !pincode}
      className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold p-4 rounded-xl shadow-button-blue transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
    >
      <Search className="w-4 h-4" />
      <span>Check Technician Availability</span>
    </button>
  </form>

  {/* Status Messages */}
  {status && (
    <div
      className={`mt-6 p-4 rounded-2xl flex items-start space-x-3 border ${
        status === "success"
          ? "bg-emerald-50 border-emerald-100 text-emerald-800"
          : "bg-red-50 border-red-100 text-red-800"
      }`}
    >
      {status === "success" ? (
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      )}

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
