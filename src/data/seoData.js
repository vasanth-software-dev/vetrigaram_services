/**
 * Centralized Enterprise SEO Data Registry for Vetrigaram Tech Services
 * Single source of truth for business metadata, routes, services, locations, and schemas.
 */

export const SITE_CONFIG = {
  brandName: "Vetrigaram Tech Services",
  shortName: "Vetrigaram",
  legalName: "Vetrigaram Tech Services Private Limited",
  domain: "vasanth-software-dev.github.io",
  basePath: "/vetrigaram_services",
  siteUrl: "https://vasanth-software-dev.github.io/vetrigaram_services",
  phone: "+91-6374121120",
  rawPhone: "6374121120",
  email: "support@vetikharam.com",
  defaultOgImage:
    "https://vasanth-software-dev.github.io/vetrigaram_services/logo-emblem.png",
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
    {
      name: "Parthi",
      role: "Senior Appliance Specialist",
      phone: "9171956753",
    },
    {
      name: "Boobal",
      role: "Senior AC & Refrigeration Technician",
      phone: "8122665494",
    },
    {
      name: "Vasanth",
      role: "Senior Appliance Service Technician",
      phone: "6380282430",
    },
  ],

  socialLinks: {
    facebook: "https://facebook.com/Vetrigaramservices",
    twitter: "https://twitter.com/Vetrigaram",
    instagram: "https://instagram.com/Vetrigaramservices",
    linkedin: "https://linkedin.com/company/Vetrigaram-services",
  },
};

export const SERVICES_CATALOG = [
  // Appliances
  {
    id: "ac-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "AC Repair & Servicing",
    shortName: "AC Repair",
    tagline:
      "Precision AC diagnostic, gas leak detection, deep cleaning, and cooling restoration.",
    desc:
      "Comprehensive doorstep air conditioner repair, servicing, filter deep-cleaning, compressor diagnostic, condenser maintenance, and genuine refrigerant gas charging by verified technicians.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",

    symptoms: [
      "AC blowing warm air or low cooling",
      "Water leakage from indoor unit",
      "Unusual humming, squeaking, or buzzing noise",
      "Frequent compressor tripping or foul odor",
      "Gas leakage or ice formation on evaporator coils",
    ],

    benefits: [
      "Certified AC mechanics with multi-brand expertise",
      "High-pressure jet pump coil washing",
      "100% genuine copper pipes and OEM spare parts",
      "Accurate gas pressure leak checks using digital manifold gauges",
      "Fixed ₹149 inspection charge, fully adjusted in final invoice",
    ],

    process: [
      {
        step: "01",
        title: "Diagnostic Inspection",
        desc:
          "Technician inspects refrigerant pressure, electrical current, compressor status, and air filters.",
      },
      {
        step: "02",
        title: "Transparent Quotation",
        desc:
          "Upfront estimate provided before any repair starts based on clear, standardized rate cards.",
      },
      {
        step: "03",
        title: "Expert Service & Testing",
        desc:
          "Repair conducted using calibrated tools, followed by 15-minute temperature differential verification.",
      },
      {
        step: "04",
        title: "30-Day Warranty Handover",
        desc:
          "Digital invoice and 30-day service warranty issued directly to your phone.",
      },
    ],

    faqs: [
      {
        q: "What is included in AC repair and servicing?",
        a:
          "Our service includes indoor and outdoor coil cleaning, filter wash, electrical connections inspection, blower motor check, drain tray sanitization, and refrigerant pressure diagnostic.",
      },
      {
        q: "How much does AC gas charging cost?",
        a:
          "Refrigerant charging depends on your AC tonnage and gas type (R32, R410A, or R22). Our technician provides an exact quote after inspecting for copper leaks.",
      },
      {
        q: "Do you offer same-day AC repair in Chennai and Ambattur?",
        a:
          "Yes, bookings made before 4:00 PM receive same-day technician dispatch, subject to technician availability.",
      },
    ],
  },

  {
    id: "refrigerator-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Refrigerator Repair",
    shortName: "Fridge Repair",
    tagline:
      "Cooling restoration, compressor diagnostics, thermostat repair, and defrost solutions.",
    desc:
      "Expert doorstep refrigerator maintenance for single-door, double-door, side-by-side, and inverter refrigerators. We fix cooling coils, relays, capillary blocks, and door gasket seals.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",

    symptoms: [
      "Freezer cold but fresh food compartment warm",
      "Excessive ice buildup on back wall",
      "Continuous compressor running without cycling off",
      "Water pooling underneath vegetable crisper",
      "Clicking noises from the starter relay",
    ],

    benefits: [
      "Inverter linear compressor certified specialists",
      "Genuine replacement thermostats and defrost timers",
      "Eco-friendly R600a/R134a refrigerant refills",
      "Same-day doorstep troubleshooting",
    ],

    process: [
      {
        step: "01",
        title: "Thermal Inspection",
        desc:
          "Digital temperature probing of evaporator and condenser loops.",
      },
      {
        step: "02",
        title: "Electrical Check",
        desc:
          "Relay, overload protector, and capacitor testing.",
      },
      {
        step: "03",
        title: "Component Replacement",
        desc:
          "Installation of genuine OEM relays, thermostats, or fans.",
      },
      {
        step: "04",
        title: "Cooling Verification",
        desc:
          "Monitoring temperature cycle before closing the job.",
      },
    ],

    faqs: [
      {
        q:
          "Why is my refrigerator not cooling despite the light being on?",
        a:
          "This is commonly caused by a failed start relay, a faulty thermostat, a defective defrost timer, or low refrigerant gas. Our technician pinpoints the exact cause.",
      },
      {
        q: "Are replacement parts authentic?",
        a:
          "Yes, all replacement relays, thermostats, fans, and compressors are authentic brand-approved components carrying manufacturer warranties.",
      },
    ],
  },

  {
    id: "washing-machine-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Washing Machine Repair",
    shortName: "Washing Machine",
    tagline:
      "Drum alignment, motor diagnostics, drain pump clearance, and electronic PCB repair.",
    desc:
      "Prompt doorstep washing machine servicing for top load, front load, semi-automatic, and fully automatic models from all major brands.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",

    symptoms: [
      "Drum not spinning or stopping mid-cycle",
      "Excessive shaking and banging during spin cycle",
      "Water not draining or error codes displayed on panel",
      "Water inlet valve leaking or not filling",
      "Burning smell or complete power loss",
    ],

    benefits: [
      "Expertise across Bosch, Samsung, LG, IFB, and Whirlpool",
      "Front-load shock absorber and suspension replacement",
      "Original inlet valves, drain pumps, and drive belts",
      "Safe PCB diagnostics and wiring restoration",
    ],

    process: [
      {
        step: "01",
        title: "Error Diagnostics",
        desc:
          "Read motherboard error codes and test mechanical drum balance.",
      },
      {
        step: "02",
        title: "Valve & Pump Inspection",
        desc:
          "Check intake solenoids and clear drain impellers.",
      },
      {
        step: "03",
        title: "Repair Execution",
        desc:
          "Fit calibrated parts and balance machine feet to eliminate vibration.",
      },
      {
        step: "04",
        title: "Rinse & Spin Test",
        desc:
          "Run a full wash cycle test with the customer present.",
      },
    ],

    faqs: [
      {
        q: "Why is my washing machine vibrating violently?",
        a:
          "Violent vibration typically indicates worn suspension rods, damaged shock absorbers, unlevel feet, or broken drum spider arms. We calibrate and replace these components on site.",
      },
    ],
  },

  {
    id: "geyser-repair",
    category: "appliances",
    categoryTitle: "Appliance Repair",
    name: "Geyser / Water Heater Repair",
    shortName: "Geyser Repair",
    tagline:
      "Heating element replacement, thermostat adjustment, leak fix, and tank descaling.",
    desc:
      "Safe doorstep water heater repair for instant and storage geysers. We resolve low heating, tank dripping, thermostat trips, and mineral scale blockages.",
    startingPrice: "₹149 Inspection",
    warranty: "30-Day Service Warranty",

    symptoms: [
      "Water not heating or taking too long to heat",
      "Geyser tripping the home MCB instantly",
      "Water dripping from inlet or pressure relief valve",
      "Rusty or foul-smelling hot water",
      "Thermostat indicator light not turning on",
    ],

    benefits: [
      "Heavy-duty copper and incoloy heating elements",
      "Pressure safety valve inspection and calibration",
      "Chemical descaling of hard water deposits",
      "High electrical safety standards and earthing verification",
    ],

    process: [
      {
        step: "01",
        title: "Power & Safety Test",
        desc:
          "Test voltage, resistance, and safety connections.",
      },
      {
        step: "02",
        title: "Tank Inspection",
        desc:
          "Check inner container integrity and pressure release valve.",
      },
      {
        step: "03",
        title: "Element / Thermostat Fit",
        desc:
          "Replace damaged elements with suitable certified parts.",
      },
      {
        step: "04",
        title: "Leak & Pressure Check",
        desc:
          "Pressurize tank to ensure water-tight seals.",
      },
    ],

    faqs: [
      {
        q: "Why is my geyser tripping the MCB switch?",
        a:
          "A tripping MCB can indicate a damaged heating element or an electrical insulation fault. Professional inspection is recommended before further use.",
      },
    ],
  },
];

export const LOCATIONS_CATALOG = [
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600001",

    heroTitle: "Expert Doorstep Appliance Services in Chennai",

    metaTitle:
      "Appliance Repair Services in Chennai | Vetrigaram",

    metaDescription:
      "Verified doorstep appliance repair services across Chennai. AC servicing, refrigerator repair, washing machine repair, and geyser service with ₹149 inspection and 30-day warranty.",

    headline:
      "Doorstep Appliance Repair Services Across Chennai",

    overview:
      "Vetrigaram Tech Services delivers reliable, fast, and certified doorstep appliance repair services to households and apartments throughout Chennai. Our technicians arrive equipped to diagnose and repair common appliance problems at your doorstep.",

    keyLocalities: [
      "Ambattur",
      "Anna Nagar",
      "T. Nagar",
      "Velachery",
      "Adyar",
      "Mylapore",
      "Tambaram",
      "Guindy",
      "Porur",
      "Kilpauk",
      "Vadapalani",
      "Nungambakkam",
      "Thiruvanmiyur",
      "Madipakkam",
      "Kolathur",
    ],

    pincodes: "600001 to 600120",

    coverageDetails:
      "Doorstep appliance repair coverage across North, Central, and South Chennai residential clusters.",

    averageResponseTime: "2 to 4 Hours",

    serviceHighlights: [
      "Local technician coverage across prime Chennai hubs",
      "Fixed ₹149 inspection fee, waived if repair service is availed",
      "30-day post-service warranty on labor and replacements",
      "Bilingual technicians (Tamil & English) with verified credentials",
    ],

    faqs: [
      {
        q: "How fast can an appliance technician reach my home in Chennai?",
        a:
          "Our technicians operate across Chennai residential areas, allowing convenient doorstep appliance repair appointments with typical arrival windows depending on location and technician availability.",
      },
      {
        q: "What are your operational hours in Chennai?",
        a:
          "Our doorstep appliance service team operates daily from 8:00 AM to 9:00 PM.",
      },
    ],
  },

  {
    id: "ambattur",
    name: "Ambattur",
    state: "Tamil Nadu",
    postalCode: "600053",

    heroTitle: "Trusted Appliance Repair Services in Ambattur, Chennai",

    metaTitle:
      "Appliance Repair Services in Ambattur | Vetrigaram",

    metaDescription:
      "Doorstep appliance repair in Ambattur, Chennai. Certified technicians for AC servicing, refrigerator repair, washing machine repair, and geyser service with ₹149 inspection and 30-day warranty.",

    headline:
      "Immediate Doorstep Appliance Repairs for Ambattur",

    overview:
      "Located in our primary service corridor, Vetrigaram provides doorstep appliance technician coverage for Ambattur OT, Ambattur Industrial Estate residential quarters, Mogappair, and surrounding areas.",

    keyLocalities: [
      "Ambattur Old Town (OT)",
      "Ambattur Industrial Estate Residential",
      "Mogappair East & West",
      "Padi",
      "Mannurpet",
      "Venkatapuram",
      "Korattur",
      "Oragadam",
      "Kallikuppam",
      "Puzhal Road",
    ],

    pincodes: "600053, 600058, 600037, 600080, 600098",

    coverageDetails:
      "Priority doorstep appliance service zone with dedicated technician coverage.",

    averageResponseTime: "60 to 90 Minutes",

    serviceHighlights: [
      "Fast dispatch across Ambattur",
      "Technicians familiar with local residential areas",
      "Transparent pricing starting at ₹149 inspection",
      "Complete appliance diagnostic equipment",
    ],

    faqs: [
      {
        q: "Why choose Vetrigaram for appliance repairs in Ambattur?",
        a:
          "Our primary operations base is in Ambattur, allowing convenient local technician dispatch backed by genuine parts and a 30-day warranty.",
      },
      {
        q: "Do you service apartments and independent houses in Mogappair and Korattur?",
        a:
          "Yes, we service residential colonies and homes across Ambattur, Mogappair, Padi, and Korattur.",
      },
    ],
  },
];

// Helper to look up service
export function getServiceBySlug(slug) {
  return SERVICES_CATALOG.find((s) => s.id === slug) || null;
}

// Helper to look up location
export function getLocationBySlug(slug) {
  return LOCATIONS_CATALOG.find((l) => l.id === slug) || null;
}

// All supported indexable routes for sitemap and prerendering
export const ALL_CANONICAL_ROUTES = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    title: "Vetrigaram Tech Services | Premium Appliance Repair",
  },

  {
    path: "/services",
    changefreq: "weekly",
    priority: "0.9",
    title: "All Appliance Repair Services | Vetrigaram",
  },

  {
    path: "/locations",
    changefreq: "monthly",
    priority: "0.8",
    title: "Appliance Service Locations | Vetrigaram",
  },

  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.7",
    title: "About Vetrigaram | Trusted Appliance Repairs",
  },

  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.8",
    title: "Contact Us & Book an Appliance Technician | Vetrigaram",
  },

  // Service pages
  ...SERVICES_CATALOG.map((s) => ({
    path: `/services/${s.id}`,
    changefreq: "weekly",
    priority: "0.85",
    title: `${s.name} | Doorstep Repair & Servicing | Vetrigaram`,
  })),

  // Location pages
  ...LOCATIONS_CATALOG.map((l) => ({
    path: `/locations/${l.id}`,
    changefreq: "weekly",
    priority: "0.85",
    title: l.metaTitle,
  })),

  // Location + Appliance Service combinations
  ...LOCATIONS_CATALOG.flatMap((l) =>
    SERVICES_CATALOG.map((s) => ({
      path: `/${l.id}/${s.id}`,
      changefreq: "weekly",
      priority: "0.9",
      title: `${s.shortName} in ${l.name} | Doorstep Appliance Service | Vetrigaram`,
    }))
  ),
];