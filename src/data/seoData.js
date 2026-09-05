/**
 * Centralized Enterprise SEO Data Registry for Vetrikharam Home Services
 * Single source of truth for business metadata, routes, services, locations, and schemas.
 */

export const SITE_CONFIG = {
  brandName: "Vetrikharam Home Services",
  shortName: "Vetrikharam",
  legalName: "Vetrikharam Home Services Private Limited",
  domain: "vasanth-software-dev.github.io",
  basePath: "/vetrikharam_services",
  siteUrl: "https://vasanth-software-dev.github.io/vetrikharam_services",
  phone: "+91-6374121120",
  rawPhone: "6374121120",
  email: "support@vetikharam.com",
  defaultOgImage: "https://vasanth-software-dev.github.io/vetrikharam_services/logo-emblem.png",
  locale: "en_IN",
  address: {
    streetAddress: "Ambattur Industrial Estate",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600053",
    addressCountry: "IN",
  },
  geo: {
    latitude: "13.0827",
    longitude: "80.2707",
  },
  priceRange: "₹₹",
  openingHours: "Mo-Su 08:00-21:00",
  inspectionFee: "₹149",
  warrantyDays: "30-Day Service Warranty",
  technicians: [
    { name: "Parthi", role: "Senior Electrical & Appliance Specialist", phone: "9171956753" },
    { name: "Boobal", role: "Senior AC & Refrigeration Technician", phone: "8122665494" },
    { name: "Vasanth", role: "Master Plumber & Systems Engineer", phone: "6380282430" },
  ],
  socialLinks: {
    facebook: "https://facebook.com/vetrikharamservices",
    twitter: "https://twitter.com/vetrikharam",
    instagram: "https://instagram.com/vetrikharamservices",
    linkedin: "https://linkedin.com/company/vetrikharam-services",
  }
};

export const SERVICES_CATALOG = [
  // Appliances
  {
    id: "ac-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "AC Repair & Servicing",
    shortName: "AC Repair",
    tagline: "Precision AC diagnostic, gas leak detection, deep cleaning, and cooling restoration.",
    desc: "Comprehensive doorstep air conditioner repair, servicing, filter deep-cleaning, compressor diagnostic, condenser maintenance, and genuine refrigerant gas charging by verified technicians.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "AC blowing warm air or low cooling",
      "Water leakage from indoor unit",
      "Unusual humming, squeaking, or buzzing noise",
      "Frequent compressor tripping or foul odor",
      "Gas leakage or ice formation on evaporator coils"
    ],
    benefits: [
      "Certified AC mechanics with multi-brand expertise",
      "High-pressure jet pump coil washing",
      "100% genuine copper pipes and OEM spare parts",
      "Accurate gas pressure leak checks using digital manifold gauges",
      "Fixed ₹149 inspection charge, fully adjusted in final invoice"
    ],
    process: [
      { step: "01", title: "Diagnostic Inspection", desc: "Technician inspects refrigerant pressure, electrical current, compressor status, and air filters." },
      { step: "02", title: "Transparent Quotation", desc: "Upfront estimate provided before any repair starts based on clear, standardized rate cards." },
      { step: "03", title: "Expert Service & Testing", desc: "Repair conducted using calibrated tools, followed by 15-minute temperature differential verification." },
      { step: "04", title: "30-Day Warranty Handover", desc: "Digital invoice and 30-day service warranty issued directly to your phone." }
    ],
    faqs: [
      {
        q: "What is included in AC repair and servicing?",
        a: "Our service includes indoor and outdoor coil cleaning, filter wash, electrical connections inspection, blower motor check, drain tray sanitization, and refrigerant pressure diagnostic."
      },
      {
        q: "How much does AC gas charging cost?",
        a: "Refrigerant charging depends on your AC tonnage and gas type (R32, R410A, or R22). Our technician provides an exact quote after inspecting for copper leaks."
      },
      {
        q: "Do you offer same-day AC repair in Chennai and Ambattur?",
        a: "Yes, bookings made before 4:00 PM receive guaranteed same-day technician dispatch with an average arrival window of 2 to 4 hours."
      }
    ]
  },
  {
    id: "refrigerator-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Refrigerator Repair",
    shortName: "Fridge Repair",
    tagline: "Cooling restoration, compressor diagnostics, thermostat repair, and defrost solutions.",
    desc: "Expert doorstep refrigerator maintenance for single-door, double-door, side-by-side, and inverter refrigerators. We fix cooling coils, relays, capillary blocks, and door gasket seals.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Freezer cold but fresh food compartment warm",
      "Excessive ice buildup on back wall",
      "Continuous compressor running without cycling off",
      "Water pooling underneath vegetable crisper",
      "Clicking noises from the starter relay"
    ],
    benefits: [
      "Inverter linear compressor certified specialists",
      "Genuine replacement thermostats and defrost timers",
      "Eco-friendly R600a/R134a refrigerant refills",
      "Same-day doorstep troubleshooting in under 2 hours"
    ],
    process: [
      { step: "01", title: "Thermal Inspection", desc: "Digital temperature probing of evaporator and condenser loops." },
      { step: "02", title: "Electrical Check", desc: "Relay, overload protector, and capacitor testing." },
      { step: "03", title: "Component Replacement", desc: "Installation of genuine OEM relays, thermostats, or fans." },
      { step: "04", title: "Cooling Verification", desc: "Monitoring temperature cycle before closing the job." }
    ],
    faqs: [
      {
        q: "Why is my refrigerator not cooling despite the light being on?",
        a: "This is commonly caused by a failed start relay, a faulty thermostat, a defective defrost timer, or low refrigerant gas. Our technician pinpoints the exact cause in minutes."
      },
      {
        q: "Are replacement parts authentic?",
        a: "Yes, all replacement relays, thermostats, fans, and compressors are authentic brand-approved components carrying manufacturer warranties."
      }
    ]
  },
  {
    id: "washing-machine-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Washing Machine Repair",
    shortName: "Washing Machine",
    tagline: "Drum alignment, motor diagnostics, drain pump clearance, and electronic PCB repair.",
    desc: "Prompt doorstep washing machine servicing for top load, front load, semi-automatic, and fully automatic models from all major brands.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Drum not spinning or stopping mid-cycle",
      "Excessive shaking and banging during spin cycle",
      "Water not draining or error codes displayed on panel",
      "Water inlet valve leaking or not filling",
      "Burning smell or complete power loss"
    ],
    benefits: [
      "Expertise across Bosch, Samsung, LG, IFB, and Whirlpool",
      "Front-load shock absorber and suspension replacement",
      "Original inlet valves, drain pumps, and drive belts",
      "Safe PCB diagnostics and wiring restoration"
    ],
    process: [
      { step: "01", title: "Error Diagnostics", desc: "Read motherboard error codes and test mechanical drum balance." },
      { step: "02", title: "Valve & Pump Inspection", desc: "Check intake solenoids and clear drain impellers." },
      { step: "03", title: "Repair Execution", desc: "Fit calibrated parts and balance machine feet to eliminate vibration." },
      { step: "04", title: "Rinse & Spin Test", desc: "Run a full wash cycle test with the customer present." }
    ],
    faqs: [
      {
        q: "Why is my washing machine vibrating violently?",
        a: "Violent vibration typically indicates worn suspension rods, damaged shock absorbers, unlevel feet, or broken drum spider arms. We calibrate and replace these components on site."
      }
    ]
  },
  {
    id: "geyser-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Geyser / Water Heater Repair",
    shortName: "Geyser Repair",
    tagline: "Heating element replacement, thermostat adjustment, leak fix, and tank descaling.",
    desc: "Safe doorstep water heater repair for instant and storage geysers. We resolve low heating, tank dripping, electrical shocks, thermostat trips, and mineral scale blockages.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Water not heating or taking too long to heat",
      "Geyser tripping the home MCB instantly",
      "Water dripping from inlet or pressure relief valve",
      "Rusty or foul-smelling hot water",
      "Thermostat indicator light not turning on"
    ],
    benefits: [
      "Heavy-duty copper and incoloy heating elements",
      "Pressure safety valve inspection and calibration",
      "Chemical descaling of hard water deposits",
      "High electrical safety standards and earthing verification"
    ],
    process: [
      { step: "01", title: "Power & Earthing Test", desc: "Test voltage, resistance, and earthing continuity for complete user safety." },
      { step: "02", title: "Tank Inspection", desc: "Check inner container integrity and pressure release valve." },
      { step: "03", title: "Element / Thermostat Fit", desc: "Replace burnt element with heavy-duty ISI-certified parts." },
      { step: "04", title: "Leak & Pressure Check", desc: "Pressurize tank to ensure water-tight seals." }
    ],
    faqs: [
      {
        q: "Why is my geyser tripping the MCB switch?",
        a: "A tripping MCB usually means the heating element's outer sheath has corroded, allowing water contact with the live coil and creating a direct earth fault. It must be replaced immediately."
      }
    ]
  },

  // Electrical
  {
    id: "electrical-repair",
    category: "electrical",
    categoryTitle: "Electrical Services",
    name: "Electrical Repair & Diagnostics",
    shortName: "Electrical Repair",
    tagline: "Safe, certified diagnostic and repair services for household electrical failures.",
    desc: "Licensed electrical technicians for short circuit tracing, distribution board rewiring, earthing testing, circuit overload fixes, and household power troubleshooting.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Frequent circuit breaker trips or blown fuses",
      "Flickering lights or intermittent power drops",
      "Sparks, burning smell, or warm switchboards",
      "Mild shock from appliances or metal fixtures",
      "Total power outage in specific rooms"
    ],
    benefits: [
      "Government-licensed wiremen and electricians",
      "Use of fire-retardant FRLS copper wires and ISI modular switches",
      "Digital insulation resistance and earth pit testing",
      "Upfront pricing with transparent inspection policy"
    ],
    process: [
      { step: "01", title: "Load & Continuity Test", desc: "Map active circuits and locate points of high resistance." },
      { step: "02", title: "Short Circuit Tracing", desc: "Trace faulty conduits and junction boxes." },
      { step: "03", title: "Rewiring / Component Fix", desc: "Replace burnt connectors, MCBs, or wiring." },
      { step: "04", title: "Earthing Safety Check", desc: "Verify voltage differential between neutral and ground." }
    ],
    faqs: [
      {
        q: "How quickly do you handle electrical emergencies in Chennai?",
        a: "Emergency electrical calls receive priority routing with technicians dispatched within 30 to 60 minutes for serious hazards like sparking boards or smoke."
      }
    ]
  },
  {
    id: "switch-socket-repair",
    category: "electrical",
    categoryTitle: "Electrical Services",
    name: "Switch & Socket Repair",
    shortName: "Switch & Socket",
    tagline: "Replacement of burnt nodes, loose modular switches, power sockets, and faceplates.",
    desc: "Professional installation and replacement of standard, 16A heavy-appliance sockets, modular switches, dimmer controls, and USB charging points.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Loose plugs sparking inside sockets",
      "Blackened or melted plastic around switch faces",
      "Switches that feel stiff, jammed, or unresponsive",
      "Heavy appliances causing switches to overheat"
    ],
    benefits: [
      "High-grade polycarbonate heat-resistant modular fittings",
      "Correct wire gauge matching for 16A AC/geyser loads",
      "Clean finishing without wall damage"
    ],
    process: [
      { step: "01", title: "Mains Isolation", desc: "Safely isolate circuit breaker before opening wall box." },
      { step: "02", title: "Terminal Inspection", desc: "Trim oxidised wire ends and check gauge suitability." },
      { step: "03", title: "Modular Fitting", desc: "Install new switch mechanism and screw tight." },
      { step: "04", title: "Load Test", desc: "Power up and test socket with full load." }
    ],
    faqs: [
      {
        q: "Can you upgrade my old non-modular switches to modern modular plates?",
        a: "Yes, our electricians can retro-fit modular gang boxes or install modern faceplates to blend seamlessly with your interior."
      }
    ]
  },
  {
    id: "fan-installation",
    category: "electrical",
    categoryTitle: "Electrical Services",
    name: "Fan Installation & Repair",
    shortName: "Fan Installation",
    tagline: "Ceiling fan mounting, BLDC fan setup, capacitor fixes, and regulator replacements.",
    desc: "Secure mounting and wiring for ceiling fans, exhaust fans, wall mount fans, and smart BLDC energy-saving fans. We eliminate wobbling and bearing screeching.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Fan running too slow even at speed 5",
      "Annoying squeaking or grinding bearing noise",
      "Fan wobbling dangerously during operation",
      "Remote control not responding on BLDC fan"
    ],
    benefits: [
      "High-tensile anchor fastener mounting for 100% safety",
      "Capacitor testing and replacement with high microfarad ratings",
      "Speed regulator calibration without heating"
    ],
    process: [
      { step: "01", title: "Ceiling Hook Check", desc: "Inspect hook weight rating and vibration absorption." },
      { step: "02", title: "Downrod Assembly", desc: "Assemble canopy, safety pin, and blade alignments." },
      { step: "03", title: "Wiring & Earthing", desc: "Connect phase, neutral, and earth cables firmly." },
      { step: "04", title: "Dynamic Balancing", desc: "Test at full speed to ensure zero wobble." }
    ],
    faqs: [
      {
        q: "Do you install modern BLDC energy-saving fans?",
        a: "Yes, we install and configure all BLDC fan brands (Atomberg, Havells, Crompton, Orient) including pairing their RF remotes."
      }
    ]
  },
  {
    id: "wiring-rewiring",
    category: "electrical",
    categoryTitle: "Electrical Services",
    name: "Wiring & Rewiring Services",
    shortName: "Home Wiring",
    tagline: "Concealed conduit wiring, house rewiring, sub-meter setup, and safety upgrades.",
    desc: "Complete residential wiring and rewiring services for new renovations, kitchen heavy-load lines, home offices, inverter line separation, and safety overhauls.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Old aluminum or cracked rubber wiring",
      "Frequent wire burns inside conduits",
      "Adding high-tonnage ACs without dedicated cabling",
      "Inverter line not separated from heavy appliances"
    ],
    benefits: [
      "ISI-certified copper wires with zero smoke halogen retardance",
      "Proper phase-balancing across 3-phase domestic meters",
      "Dedicated earthing line drawn to every socket"
    ],
    process: [
      { step: "01", title: "Load Calculation", desc: "Compute total wattage demand room by room." },
      { step: "02", title: "Conduit Pulling", desc: "Pull color-coded cables through PVC conduits." },
      { step: "03", title: "MCB Box Termination", desc: "Connect circuits to correctly rated miniature circuit breakers." },
      { step: "04", title: "Mega-Ohm Test", desc: "Validate insulation resistance with high voltage tester." }
    ],
    faqs: [
      {
        q: "How long does full house rewiring take?",
        a: "An average 2-3 BHK apartment typically requires 2 to 4 working days, planned room by room to minimize household disruption."
      }
    ]
  },

  // Plumbing
  {
    id: "plumbing-repair",
    category: "plumbing",
    categoryTitle: "Plumbing Services",
    name: "General Plumbing Repair",
    shortName: "Plumbing Repair",
    tagline: "Fast, hygienic pipe repair, water pressure fixes, and plumbing troubleshooting.",
    desc: "Experienced plumbers for residential pipe repairs, damp wall leak detection, pressure pump setup, overhead tank piping, and valve replacements.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Low water pressure across taps and showers",
      "Damp patches or peeling paint on walls due to pipe leaks",
      "Noisy pipes when taps are shut off (water hammer)",
      "Motor pump not pushing water to overhead tank"
    ],
    benefits: [
      "Acoustic and thermal dampness leak detection",
      "CPVC, UPVC, and PPR solvent weld mastery",
      "Clean, hygienic workmanship with shoe covers and floor protectors",
      "Zero hidden material markups"
    ],
    process: [
      { step: "01", title: "Pressure & Flow Check", desc: "Trace pipeline runs from overhead tank to fixture." },
      { step: "02", title: "Leak Isolation", desc: "Identify exact pinhole or damaged union fitting." },
      { step: "03", title: "Segment Replacement", desc: "Cut and solvent-weld high-grade pressure pipes." },
      { step: "04", title: "Water Quality Test", desc: "Flush lines and verify full flow rate." }
    ],
    faqs: [
      {
        q: "Can you fix dampness inside bedroom walls caused by bathroom plumbing?",
        a: "Yes, our plumbers pinpoint the concealed pipe joint failure and repair it with minimal plaster cutting, stopping water seepage at the source."
      }
    ]
  },
  {
    id: "tap-faucet-repair",
    category: "plumbing",
    categoryTitle: "Plumbing Services",
    name: "Tap & Faucet Repair",
    shortName: "Tap Repair",
    tagline: "Drip stops, ceramic spindle replacements, mixer fixes, and new tap fittings.",
    desc: "Rapid repair for leaking kitchen faucets, quarter-turn taps, bib taps, concealed diverters, and sensor taps across luxury and standard fittings.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Constant dripping water keeping you awake",
      "Tap handle spinning freely without shutting off water",
      "Low stream of water due to hard water aerator scaling",
      "Water leaking from base of faucet under the sink"
    ],
    benefits: [
      "Original brass and ceramic disc cartridges",
      "Teflon sealing and precision threading",
      "Aerator descaling to restore powerful flow"
    ],
    process: [
      { step: "01", title: "Inlet Isolation", desc: "Shut local angle stop cock." },
      { step: "02", title: "Spindle Removal", desc: "Unscrew head and extract worn cartridge." },
      { step: "03", title: "Washer/Spindle Fit", desc: "Install ceramic disc unit and lubricate threads." },
      { step: "04", title: "Seal Test", desc: "Turn on high pressure and inspect for micro-droplets." }
    ],
    faqs: [
      {
        q: "Do you supply the spare spindles or should I purchase them?",
        a: "Our technicians carry standard brass spindles, washers, and Teflon tapes. If you have designer fittings (Jaguar, Kohler, Grohe), we procure matching parts or install fixtures supplied by you."
      }
    ]
  },
  {
    id: "drain-cleaning",
    category: "plumbing",
    categoryTitle: "Plumbing Services",
    name: "Drain Cleaning & Clog Removal",
    shortName: "Drain Cleaning",
    tagline: "High-pressure clog clearance from kitchen sinks, bathroom traps, and sewer lines.",
    desc: "Fast, mess-free unblocking of slow drains, gully traps, floor nahani traps, and toilet waste pipes using mechanical drain snakes and chemical-free jetting.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Water backing up into kitchen sink or shower floor",
      "Foul sewage odor rising through drain gratings",
      "Gurgling sounds when other fixtures drain",
      "Water draining agonizingly slow"
    ],
    benefits: [
      "Heavy-duty mechanical rotary drain augers",
      "Zero corrosive acid use that ruins PVC pipes",
      "Full sanitization of drainage area post-unblocking"
    ],
    process: [
      { step: "01", title: "Blockage Identification", desc: "Locate obstruction in p-trap or main branch." },
      { step: "02", title: "Mechanical Clearance", desc: "Feed rotary spiral cable to dislodge hair, grease, or debris." },
      { step: "03", title: "High-Volume Flush", desc: "Flush system with hot water and biological cleaner." },
      { step: "04", title: "Grate Reinstallation", desc: "Reseat trap grating to prevent cockroach entry." }
    ],
    faqs: [
      {
        q: "Do you use harsh acid to clear clogs?",
        a: "No! Acids damage your PVC pipes and melt joint solvent, causing wall leaks later. We rely on mechanical steel snake augers that clear clogs safely and permanently."
      }
    ]
  },
  {
    id: "water-tank-services",
    category: "plumbing",
    categoryTitle: "Plumbing Services",
    name: "Water Tank Cleaning & Float Repair",
    shortName: "Water Tank Service",
    tagline: "Overhead tank cleaning, automatic float switch installation, and inlet repair.",
    desc: "Hygienic deep cleaning and sediment evacuation for overhead Sintex tanks and underground sumps. We also repair overflow pipes and ball valves.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",
    symptoms: [
      "Water tank overflowing continuously onto terrace",
      "Muddy or sediment-heavy water in bathroom taps",
      "Float valve stuck open or ball disconnected",
      "Algae or sludge formation inside storage tank"
    ],
    benefits: [
      "Pressure washer sludge removal and UV/chlorine sanitization",
      "Heavy-duty brass and PVC float valve replacements",
      "Automatic motor controller wiring setup"
    ],
    process: [
      { step: "01", title: "Dewatering", desc: "Pump out stagnant water and bottom silt." },
      { step: "02", title: "Scrubbing", desc: "High-pressure scrub of walls and floor." },
      { step: "03", title: "Sanitizing", desc: "Food-grade antibacterial treatment." },
      { step: "04", title: "Float Valve Calibration", desc: "Adjust float shutoff level to prevent overflow." }
    ],
    faqs: [
      {
        q: "How often should household water tanks be cleaned in Chennai?",
        a: "We recommend cleaning your overhead tank every 6 months to prevent hard water mineral scaling, algae growth, and bacterial contamination."
      }
    ]
  }
];

export const LOCATIONS_CATALOG = [
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600001",
    heroTitle: "Expert Doorstep Home Services in Chennai",
    metaTitle: "Home Services in Chennai | Appliance, Electrical & Plumbing Repair | Vetrikharam",
    metaDescription: "Verified doorstep appliance repair, electrical troubleshooting, and plumbing services across Chennai. Same-day service with ₹149 inspection charge and 30-day warranty.",
    headline: "Doorstep Appliance, Electrical & Plumbing Services Across Chennai",
    overview: "Vetrikharam Home Services is proud to deliver reliable, fast, and certified doorstep repair services to households and apartments throughout Chennai. From troubleshooting non-cooling ACs during humid summers to emergency short-circuit resolution, our certified local technicians arrive fully equipped at your doorstep.",
    keyLocalities: [
      "Ambattur", "Anna Nagar", "T. Nagar", "Velachery", "Adyar", 
      "Mylapore", "Tambaram", "Guindy", "Porur", "Kilpauk", 
      "Vadapalani", "Nungambakkam", "Thiruvanmiyur", "Madipakkam", "Kolathur"
    ],
    pincodes: "600001 to 600120",
    coverageDetails: "Full coverage across North, Central, and South Chennai residential clusters.",
    averageResponseTime: "2 to 4 Hours",
    serviceHighlights: [
      "Local technician base stations across prime Chennai hubs",
      "Fixed ₹149 inspection fee, waived if repair service is availed",
      "30-day post-service warranty on all labor and replacements",
      "Bilingual technicians (Tamil & English) with verified credentials"
    ],
    faqs: [
      {
        q: "How fast can an electrician or plumber reach my home in Chennai?",
        a: "Our technicians operate from decentralized hubs in Ambattur, Anna Nagar, and South Chennai, allowing us to reach most Chennai residential areas within 2 to 4 hours."
      },
      {
        q: "What are your operational hours in Chennai?",
        a: "Our doorstep service team operates daily from 8:00 AM to 9:00 PM, with emergency standby assistance for electrical and plumbing failures."
      }
    ]
  },
  {
    id: "ambattur",
    name: "Ambattur",
    state: "Tamil Nadu",
    postalCode: "600053",
    heroTitle: "Trusted Home Services in Ambattur, Chennai",
    metaTitle: "Home Services in Ambattur | AC, Electrical & Plumbing Repair | Vetrikharam",
    metaDescription: "Doorstep home repairs in Ambattur, Chennai. Certified technicians for AC servicing, refrigerator repair, electrical faults, and plumbing clogs with 30-day warranty.",
    headline: "Immediate Doorstep Repairs for Ambattur Residents & Housing Estates",
    overview: "Located right in our home corridor, Vetrikharam provides priority doorstep technician coverage for Ambattur OT, Ambattur Industrial Estate residential quarters, Mogappair, and surrounding areas. Our local technicians are stationed nearby for rapid turnaround.",
    keyLocalities: [
      "Ambattur Old Town (OT)", "Ambattur Industrial Estate Residential", 
      "Mogappair East & West", "Padi", "Mannurpet", 
      "Venkatapuram", "Korattur", "Oragadam", "Kallikuppam", "Puzhal Road"
    ],
    pincodes: "600053, 600058, 600037, 600080, 600098",
    coverageDetails: "Priority immediate-dispatch zone with dedicated technician vans.",
    averageResponseTime: "60 to 90 Minutes",
    serviceHighlights: [
      "Fastest dispatch: under 90-minute arrival across Ambattur",
      "Technicians resident in Ambattur for immediate familiarity with local building utilities",
      "Transparent pricing starting at ₹149 inspection",
      "Complete electrical, plumbing, and appliance diagnostic gear"
    ],
    faqs: [
      {
        q: "Why choose Vetrikharam for home repairs in Ambattur?",
        a: "Because our primary operations base is in Ambattur, our local technicians can arrive within 60 to 90 minutes with zero travel delays, backed by genuine parts and a 30-day warranty."
      },
      {
        q: "Do you service apartments and independent houses in Mogappair and Korattur?",
        a: "Yes, we actively service all residential colonies in Ambattur, Mogappair, Padi, and Korattur daily."
      }
    ]
  }
];

// Helper to look up service
export function getServiceBySlug(slug) {
  return SERVICES_CATALOG.find(s => s.id === slug) || null;
}

// Helper to look up location
export function getLocationBySlug(slug) {
  return LOCATIONS_CATALOG.find(l => l.id === slug) || null;
}

// All supported indexable routes for sitemap and prerendering
export const ALL_CANONICAL_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0", title: "Vetrikharam Home Services | Premium Appliance, Electrical & Plumbing Repair" },
  { path: "/services", changefreq: "weekly", priority: "0.9", title: "All Home Services & Doorstep Repairs | Vetrikharam" },
  { path: "/locations", changefreq: "monthly", priority: "0.8", title: "Service Coverage Areas & Local Hubs | Vetrikharam" },
  { path: "/about", changefreq: "monthly", priority: "0.7", title: "About Vetrikharam | Trusted Doorstep Home Repairs" },
  { path: "/contact", changefreq: "monthly", priority: "0.8", title: "Contact Us & Book a Technician | Vetrikharam" },

  // Service pages
  ...SERVICES_CATALOG.map(s => ({
    path: `/services/${s.id}`,
    changefreq: "weekly",
    priority: "0.85",
    title: `${s.name} | Doorstep Repair & Servicing | Vetrikharam`
  })),

  // Location pages
  ...LOCATIONS_CATALOG.map(l => ({
    path: `/locations/${l.id}`,
    changefreq: "weekly",
    priority: "0.85",
    title: l.metaTitle
  })),

  // Location + Service combinations (legitimate high-intent coverage only)
  ...LOCATIONS_CATALOG.flatMap(l => 
    ["ac-repair", "refrigerator-repair", "washing-machine-repair", "geyser-repair", "electrical-repair", "plumbing-repair"].map(serviceId => {
      const s = getServiceBySlug(serviceId);
      return {
        path: `/${l.id}/${serviceId}`,
        changefreq: "weekly",
        priority: "0.9",
        title: `${s ? s.shortName : "Home Repair"} in ${l.name} | Doorstep Technician | Vetrikharam`
      };
    })
  )
];
