import { 
  AirVent, 
  IceCream, 
  WashingMachine, 
  Flame, 
  Droplets, 
  BatteryCharging 
} from 'lucide-react';

export const servicesData = {
  appliances: {
    title: "Appliance Engineering",
    description: "Keep mission-critical home and facility appliances running at peak performance with precision diagnostics.",
    icon: WashingMachine,
    items: [
      {
        name: "AC Repair & Performance Servicing",
        desc: "Deep jet cleaning, gas charging, leak pressure testing, compressor diagnostics, and energy optimization.",
        icon: AirVent,
        highlight: "Same-Day Dispatch",
        category: "appliances"
      },
      {
        name: "Refrigerator Cooling Restoration",
        desc: "Thermostat calibration, compressor relay diagnostic, fan motor overhaul, and sealed system repairs.",
        icon: IceCream,
        highlight: "Genuine OEM Spares",
        category: "appliances"
      },
      {
        name: "Washing Machine Mechanical Fix",
        desc: "Drum bearing balancing, inverter motor troubleshooting, inlet valve check, and high-vibration damping.",
        icon: WashingMachine,
        highlight: "30-Day Warranty",
        category: "appliances"
      },
      {
        name: "Geyser & Water Heating Systems",
        desc: "Heavy-duty element replacement, thermostat safety inspection, corrosion flushing, and pressure valve fix.",
        icon: Flame,
        highlight: "Instant Arrival",
        category: "appliances"
      },
      {
        name: "RO Water Purification Diagnostic",
        desc: "Membrane replacement, TDS calibration, sediment filter flushing, and high-pressure booster pump repair.",
        icon: Droplets,
        highlight: "Tested Purity",
        category: "appliances"
      },
      // {
      //   name: "Inverter & Power Backup Overhaul",
      //   desc: "Battery capacity testing, circuit load balancing, charging module repair, and automated transfer switch check.",
      //   icon: BatteryCharging,
      //   highlight: "Zero Downtime",
      //   category: "appliances"
      // }
    ]
  }
};
