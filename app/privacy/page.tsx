"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Database,
  Share2,
  Lock,
  UserCheck,
  Cookie,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  AlertTriangle,
  Settings,
  Trash2,
  Download,
  Edit,
  Camera,
  Wifi,
  CreditCard,
  MessageSquare,
  Users,
  Building,
} from "lucide-react";

const privacyData = [
  {
    id: 1,
    icon: Building,
    title: "Who We Are",
    content: [
      "Rupas Surf Camp is a registered business in Sri Lanka (Registration No: PVL/DSACC/BR/14).",
      "We are committed to protecting your privacy and personal information.",
      "This policy explains how we collect, use, and protect your data when you book with us or visit our facilities.",
    ],
    highlight: false,
  },
  {
    id: 2,
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal details: Name, email, phone number, address, nationality, and date of birth",
      "Booking information: Arrival/departure dates, room preferences, special requests",
      "Payment information: Credit card details (processed securely through our payment providers)",
      "Health & dietary information: Allergies, medical conditions, dietary restrictions (when provided)",
      "Communication records: Emails, messages, and phone conversations with our team",
      "Photos and videos: Images taken during your stay (with your consent)",
      "Website usage: IP address, browser type, pages visited, and time spent on our site",
    ],
    highlight: true,
  },
  {
    id: 3,
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "Process and manage your bookings and reservations",
      "Provide personalized services and accommodate special requests",
      "Communicate with you about your stay, updates, and important information",
      "Process payments and handle billing inquiries",
      "Ensure your safety and security during your stay",
      "Improve our services and facilities based on feedback",
      "Send marketing communications (with your consent)",
      "Comply with legal requirements and regulations",
    ],
    highlight: true,
  },
  {
    id: 4,
    icon: Share2,
    title: "Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties",
      "We may share information with trusted service providers (payment processors, booking platforms)",
      "Local authorities when required by law or for safety reasons",
      "Emergency contacts in case of medical emergencies",
      "With your explicit consent for marketing partnerships or special offers",
    ],
    highlight: false,
  },
  {
    id: 5,
    icon: Lock,
    title: "Data Security",
    content: [
      "We use industry-standard security measures to protect your information",
      "All payment transactions are encrypted and processed securely",
      "Staff access to personal information is limited and monitored",
      "Regular security audits and updates to our systems",
      "Physical security measures at our facilities to protect paper records",
    ],
    highlight: true,
  },
  {
    id: 6,
    icon: Cookie,
    title: "Cookies & Website Data",
    content: [
      "We use cookies to improve your browsing experience on our website",
      "Essential cookies for booking functionality and security",
      "Analytics cookies to understand how visitors use our site",
      "Marketing cookies for personalized content (with your consent)",
      "You can control cookie preferences through your browser settings",
    ],
    highlight: false,
  },
  {
    id: 7,
    icon: Camera,
    title: "Photos & Media",
    content: [
      "We may take photos or videos during your stay for marketing purposes",
      "We will always ask for your consent before using your image",
      "You can opt out of photography at any time during your stay",
      "Photos may be used on our website, social media, and promotional materials",
      "You can request removal of your photos from our marketing materials",
    ],
    highlight: false,
  },
  {
    id: 8,
    icon: Clock,
    title: "Data Retention",
    content: [
      "Booking and guest information: Kept for 7 years for legal and accounting purposes",
      "Marketing communications: Until you unsubscribe or request deletion",
      "Website analytics: Anonymized data kept for 2 years",
      "CCTV footage: Stored for 30 days for security purposes",
      "Financial records: Kept as required by Sri Lankan law",
    ],
    highlight: false,
  },
  {
    id: 9,
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access: Request a copy of the personal information we hold about you",
      "Correction: Update or correct any inaccurate information",
      "Deletion: Request deletion of your personal information (subject to legal requirements)",
      "Portability: Receive your data in a common format",
      "Objection: Opt out of marketing communications at any time",
      "Restriction: Limit how we use your information in certain circumstances",
    ],
    highlight: true,
  },
  {
    id: 10,
    icon: Globe,
    title: "International Transfers",
    content: [
      "Some of our service providers may be located outside Sri Lanka",
      "We ensure adequate protection when transferring your data internationally",
      "All transfers comply with applicable data protection laws",
      "We use secure methods for any international data transfers",
    ],
    highlight: false,
  },
  {
    id: 11,
    icon: Users,
    title: "Third-Party Services",
    content: [
      "Booking platforms (Booking.com, Airbnb, etc.) have their own privacy policies",
      "Payment processors (Stripe, PayPal) handle payment information securely",
      "Social media platforms if you interact with our social media content",
      "We are not responsible for third-party privacy practices",
    ],
    highlight: false,
  },
  {
    id: 12,
    icon: Settings,
    title: "Policy Updates",
    content: [
      "We may update this privacy policy from time to time",
      "Changes will be posted on our website with the effective date",
      "Significant changes will be communicated via email",
      "Continued use of our services indicates acceptance of updates",
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

const userRights = [
  {
    icon: Download,
    title: "Data Access",
    description: "Request a copy of your personal information",
  },
  {
    icon: Edit,
    title: "Data Correction",
    description: "Update or correct inaccurate information",
  },
  {
    icon: Trash2,
    title: "Data Deletion",
    description: "Request deletion of your personal data",
  },
  {
    icon: Settings,
    title: "Data Control",
    description: "Manage your privacy preferences",
  },
];

export default function PrivacyPolicyPage() {
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
            <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-text tanHeading font-display">
              Privacy Policy
            </h1>
          </div>
          <p className="text-sm xs:text-base sm:text-lg text-text max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect 
            your personal information when you stay with us or visit our website.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 sm:py-3 rounded-lg">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-text">
                Your Data is Secure
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 sm:py-3 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-text">
                Last Updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Your Rights Section */}
      <section className="max-w-5xl mx-auto px-4 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2 sm:mb-3">
            Your Data Rights
          </h2>
          <p className="text-sm sm:text-base text-text">
            You have full control over your personal information
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {userRights.map((right, idx) => (
            <motion.div
              key={right.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <Card className="rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                      <right.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text mb-1 sm:mb-2 text-sm sm:text-base">
                        {right.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {right.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="max-w-5xl mx-auto px-4 pb-8 sm:pb-12">
        <div className="grid gap-4 sm:gap-6">
          {privacyData.map((policy, idx) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
            >
              <Card className={`rounded-xl shadow-md overflow-hidden ${
                policy.highlight ? 'ring-2 ring-primary/20 bg-primary/5' : 'bg-white'
              }`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-lg ${
                      policy.highlight ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <policy.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        policy.highlight ? 'text-primary' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-text mb-2 sm:mb-3">
                        {policy.id}. {policy.title}
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {policy.content.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 sm:gap-3">
                            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-text leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
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
            Privacy Questions?
          </h2>
          <p className="text-sm sm:text-base text-text">
            Contact us about your privacy rights, data requests, or any privacy-related concerns:
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

        {/* Data Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-12"
        >
          <Card className="rounded-xl shadow-md bg-white">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h3 className="text-lg sm:text-xl font-bold text-text">
                    Data Request Form
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-text">
                  Need to access, update, or delete your personal information? Contact us with your request.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-text text-sm sm:text-base">Data Access Request</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Get a copy of your personal data</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-text text-sm sm:text-base">Data Deletion Request</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Request removal of your data</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4 sm:mt-6">
                <a
                  href="mailto:rupassurfcamp@gmail.com?subject=Data Request"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm sm:text-base font-medium"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Submit Data Request
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-12"
        >
          <Card className="rounded-xl shadow-md bg-amber-50 border-amber-200">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text mb-2 sm:mb-3">
                    Important Notice
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-sm sm:text-base text-text leading-relaxed">
                      • We will respond to all privacy-related requests within 30 days
                    </p>
                    <p className="text-sm sm:text-base text-text leading-relaxed">
                      • Some information may be retained for legal or safety reasons
                    </p>
                    <p className="text-sm sm:text-base text-text leading-relaxed">
                      • We may need to verify your identity before processing requests
                    </p>
                    <p className="text-sm sm:text-base text-text leading-relaxed">
                      • Emergency contact information may be shared with authorities when necessary
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <span className="text-base sm:text-lg font-semibold text-text">
                  Your Privacy Matters
                </span>
              </div>
              <p className="text-sm sm:text-base text-text mb-4 sm:mb-6">
                We are committed to protecting your privacy and handling your personal information 
                with care and respect. If you have any questions or concerns about our privacy 
                practices, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/50 px-3 sm:px-4 py-2 rounded-lg">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-text">
                    Secure Data Handling
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 sm:px-4 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-medium text-text">
                    GDPR Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 sm:px-4 py-2 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-text">
                    Trusted by Guests
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}

