"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield,
  CreditCard,
  RefreshCw,
  Users,
  Heart,
  Camera,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Banknote,
  UserCheck,
  Activity,
  Umbrella,
  MessageCircle,
  Building,
} from "lucide-react";

const termsData = [
  {
    id: 1,
    icon: Building,
    title: "Business Details",
    content: "Rupas Surf Camp is a registered business in Sri Lanka (Registration No: PVL/DSACC/BR/14).",
    highlight: false,
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Booking & Payment",
    content: [
      "Bookings can be made via our website, phone, social media, or through agents.",
      "Full payment is required at the time of booking.",
      "We accept bank transfers, credit/debit cards, and mobile payment methods.",
      "Your booking is confirmed once we receive payment and send you a confirmation email.",
    ],
    highlight: true,
  },
  {
    id: 3,
    icon: RefreshCw,
    title: "Cancellation & Rebooking Policy",
    content: [
      "Cancel 21 days or more before arrival: Full refund.",
      "Cancel between 21–14 days before arrival: 50% refund.",
      "Cancel less than 14 days before arrival: No refund.",
      "We recommend arranging your own cancellation insurance, as we currently do not offer in-house insurance options.",
    ],
    highlight: true,
  },
  {
    id: 4,
    icon: Users,
    title: "Age & Participation",
    content: "Guests of all ages are welcome. For surfing activities, a reasonable level of physical fitness is required.",
    highlight: false,
  },
  {
    id: 5,
    icon: Heart,
    title: "Medical Information",
    content: "Please inform us of any allergies, medical conditions, or disabilities before your arrival. This ensures a safe experience for you and all guests.",
    highlight: false,
  },
  {
    id: 6,
    icon: Activity,
    title: "Surf Equipment Responsibility",
    content: [
      "Guests are responsible for surfboards and equipment during use.",
      "In case of damage or loss, we will fairly assess the situation and discuss any applicable replacement costs based on clear responsibility.",
    ],
    highlight: false,
  },
  {
    id: 7,
    icon: Banknote,
    title: "Activities & Extras",
    content: [
      "Depending on your package, extras like safaris, tuk-tuk rentals, or restaurant meals may not be included.",
      "These extras will be charged separately if not included in your package.",
    ],
    highlight: false,
  },
  {
    id: 8,
    icon: Camera,
    title: "Photo & Video Usage",
    content: [
      "We may use photos or videos taken during your stay for our website, social media, or brochures.",
      "If you prefer not to be featured, just let us know.",
    ],
    highlight: false,
  },
  {
    id: 9,
    icon: UserCheck,
    title: "Behavior & Camp Rules",
    content: [
      "We aim for a relaxed and enjoyable environment for all guests.",
      "Guests must respect staff, other guests, and local customs.",
      "If any guest behaves irresponsibly or disrupts others, we reserve the right to take appropriate action. Our team will always handle situations fairly and professionally.",
    ],
    highlight: false,
  },
  {
    id: 10,
    icon: Shield,
    title: "Liability",
    content: [
      "Guests participate in activities at their own risk.",
      "Rupas Surf Camp is not responsible for personal injury, loss, or damage to personal belongings.",
      "We strongly recommend arranging your own travel and health insurance.",
    ],
    highlight: true,
  },
  {
    id: 11,
    icon: Umbrella,
    title: "Force Majeure",
    content: "We are not liable for disruptions caused by events outside our control such as natural disasters, flight cancellations, or government regulations.",
    highlight: false,
  },
  {
    id: 12,
    icon: MessageCircle,
    title: "Complaints & Claims",
    content: [
      "Any issues or complaints should be reported to our team immediately so we can resolve them on the spot.",
      "Claims after departure should be sent via email within 14 days.",
    ],
    highlight: false,
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rupassurfcamp@gmail.com",
    link: "mailto:rupassurfcamp@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+94762332355",
    link: "tel:+94762332355",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Rupa's Surf Camp, Beach Road, Arugam Bay 32500",
    link: "#",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-[#fafbfc] min-h-screen pb-8 sm:pb-12">
      {/* Header Section */}
      <section className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
            <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-text tanHeading font-display">
              Terms & Conditions
            </p>
          </div>
          <p className="text-sm xs:text-base sm:text-lg text-text max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Welcome to Rupas Surf Camp! By booking with us, you agree to the following terms. 
            We've kept things clear and friendly, so please read through before confirming your stay.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-primary/10 px-4 py-2 sm:py-3 rounded-lg inline-flex">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-text">
              Clear, Fair & Friendly Policies
            </span>
          </div>
        </motion.div>
      </section>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-4 pb-8 sm:pb-12">
        <div className="grid gap-4 sm:gap-6">
          {termsData.map((term, idx) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
            >
              <Card className={`rounded-xl shadow-md overflow-hidden ${
                term.highlight ? 'ring-2 ring-primary/20 bg-primary/5' : 'bg-white'
              }`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-lg ${
                      term.highlight ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <term.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        term.highlight ? 'text-primary' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-text mb-2 sm:mb-3">
                        {term.id}. {term.title}
                      </h3>
                      {Array.isArray(term.content) ? (
                        <ul className="space-y-2 sm:space-y-3">
                          {term.content.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 sm:gap-3">
                              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-sm sm:text-base text-text leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm sm:text-base text-text leading-relaxed">
                          {term.content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2 sm:mb-3">
            Contact Information
          </h2>
          <p className="text-sm sm:text-base text-text">
            For any questions, changes to your booking, or special requests:
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {contactInfo.map((contact, idx) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Card className="rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                      <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text mb-1 sm:mb-2">
                        {contact.label}
                      </h4>
                      {contact.link === "#" ? (
                        <p className="text-xs sm:text-sm text-text leading-relaxed">
                          {contact.value}
                        </p>
                      ) : (
                        <a
                          href={contact.link}
                          className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors duration-200 leading-relaxed"
                        >
                          {contact.value}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <Card className="rounded-xl shadow-md bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <span className="text-base sm:text-lg font-semibold text-text">
                  Thank You!
                </span>
              </div>
              <p className="text-sm sm:text-base text-text">
                Thank you for choosing Rupas Surf Camp. We look forward to welcoming you 
                and making your stay a memorable one!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
