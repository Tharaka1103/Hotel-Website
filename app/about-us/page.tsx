// app/about/page.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  BadgeInfo,
  Calendar,
  Users,
  Bed,
  Coffee,
  Wifi,
  Fish,
  Salad,
  Music,
  ChefHat,
  UtensilsCrossed,
} from "lucide-react";

const facilities = [
  {
    title: "Sea-View Rooms",
    icon: Bed,
    description: "Clean, cozy rooms with stunning ocean views and island charm.",
    features: [
      "Ocean Views",
      "Comfortable Beds",
      "Island Charm",
      "Daily Cleaning",
    ],
  },
  {
    title: "Beachfront Restaurant",
    icon: UtensilsCrossed,
    description: "Epic ocean views with laid-back meals and authentic Sri Lankan cuisine.",
    features: [
      "Ocean Views",
      "Fresh Seafood",
      "Local Cuisine",
      "Relaxed Atmosphere",
    ],
  },
  {
    title: "Cozy Café",
    icon: Coffee,
    description: "Perfect for pre-surf coffee or a chilled afternoon hangout.",
    features: [
      "Fresh Coffee",
      "Chill Vibes",
      "Light Snacks",
      "Free WiFi",
    ],
  },
  {
    title: "Sri Lankan Buffet",
    icon: Salad,
    description: "All-you-can-eat unlimited buffet with authentic home-cooked flavors.",
    features: [
      "Unlimited Food",
      "Live Music",
      "Home Cooking",
      "Traditional Recipes",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#fafbfc] min-h-screen pb-8 sm:pb-12">
      {/* Section 1: Legacy */}
      <section className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-text tanHeading font-bold text-center mb-3 sm:mb-4 font-display"
          style={{ letterSpacing: "-.03em" }}
        >
          A Family Legacy Since 1978
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-sm xs:text-base sm:text-lg md:text-xl text-center text-text mb-6 sm:mb-8 max-w-3xl mx-auto px-2"
        >
          We grew up with the ocean in front of us and a family legacy behind us
        </motion.p>
        <div className="grid md:grid-cols-2 rounded-2xl sm:rounded-3xl shadow-md overflow-hidden bg-white">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-48 xs:h-64 sm:h-80 md:h-full w-full relative"
          >
            <img
              src="/images/restaurent1.jpg"
              alt="Rupa's Beach Hotel"
              className="object-cover w-full h-full"
              style={{ borderRadius: "inherit" }}
            />
            <div className="absolute left-2 sm:left-4 bottom-2 sm:bottom-3 flex items-center gap-1 sm:gap-2 bg-black/70 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] xs:text-xs sm:text-sm backdrop-blur-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Est.</span> 1978 &nbsp;|&nbsp;
              <span className="font-medium">Rupa's Beach Hotel – The Beginning</span>
            </div>
          </motion.div>
          {/* Right: Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between bg-card p-3 xs:p-4 sm:p-6 md:p-8"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <HeartHandshake className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-white bg-primary rounded-full p-1" />
                <span className="text-sm xs:text-base sm:text-lg font-semibold text-text">
                  Our Beginning
                </span>
                <span className="text-[10px] xs:text-xs sm:text-sm text-text">• Four decades of hospitality</span>
              </div>
              <p className="text-xs xs:text-sm sm:text-base text-text mb-4 sm:mb-6">
                Rupas Surf Camp is part of Rupas Hotel, one of the oldest and most trusted places to stay in Arugam Bay, Sri Lanka. Started by our grandfather in 1978, our family has been welcoming guests for generations. Today, Rupas Surf Camp carries forward this warm hospitality, blending a professional surf experience with the relaxed charm of coastal living.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="flex flex-col items-center bg-gray-50 p-2 xs:p-3 sm:p-4 rounded-lg">
                <span className="flex items-center gap-1 sm:gap-2 text-primary text-base xs:text-lg sm:text-xl font-bold">
                  <BadgeInfo className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> 45+
                </span>
                <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600 font-semibold text-center">Years Experience</span>
              </div>
              <div className="flex flex-col items-center bg-gray-50 p-2 xs:p-3 sm:p-4 rounded-lg">
                <span className="flex items-center gap-1 sm:gap-2 text-primary text-base xs:text-lg sm:text-xl font-bold">
                  <Users className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> 3
                </span>
                <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600 font-semibold text-center">Generations</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Facilities */}
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-text tanHeading mb-2 font-display"
        >
          Our Facilities
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-sm xs:text-base sm:text-lg text-center text-text mb-6 sm:mb-8 px-2"
        >
          Everything you need for the perfect surf vacation, designed for comfort, connection, and good vibes
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {facilities.map((facility, idx) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * idx }}
            >
              <Card className={`rounded-xl h-full bg-card shadow-md`}>
                <CardContent className="py-4 sm:py-6 px-4 sm:px-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <facility.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#40aaa6]" />
                    <span className="font-bold text-base sm:text-lg text-text">{facility.title}</span>
                  </div>
                  <p className="text-text text-xs sm:text-sm mb-3 sm:mb-4">{facility.description}</p>
                  <ul className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 text-gray-600 text-[10px] xs:text-xs">
                    {facility.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 sm:gap-2">
                        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#60d6cb]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
