"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Clock,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#f01c33]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#c4ab66]/5 rounded-full blur-3xl"></div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* About PowerFuel */}
          <div>
            <div className="mb-8">
              <div className="relative h-16 w-32 mb-6">
                <Image
                  src="/logo.png"
                  alt="PowerFuel Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                PowerFuel is India&apos;s premium fitness nutrition brand,
                dedicated to providing high-quality supplements and nutritional
                products to help you achieve your fitness goals.
              </p>
            </div>

            {/* Enhanced Social media links */}
            <div className="flex space-x-3">
              {[
                {
                  icon: <Instagram size={18} />,
                  href: "#",
                  color: "from-[#f01c33] to-[#c4ab66]",
                },
                {
                  icon: <Facebook size={18} />,
                  href: "#",
                  color: "from-[#c4ab66] to-[#f01c33]",
                },
                {
                  icon: <Twitter size={18} />,
                  href: "#",
                  color: "from-[#f01c33] to-[#c4ab66]",
                },
                {
                  icon: <Youtube size={18} />,
                  href: "#",
                  color: "from-[#c4ab66] to-[#f01c33]",
                },
              ].map((social, idx) => (
                <Link key={idx} href={social.href} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    className={`w-10 h-10 bg-white hover:bg-gradient-to-r ${social.color} flex items-center justify-center rounded-full text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-110 border border-gray-100`}
                  >
                    {social.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                Product Categories
              </span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mb-6"></div>
            <ul className="space-y-3">
              {[
                { label: "Whey Protein", href: "/category/whey-protein" },
                {
                  label: "Plant-Based Protein",
                  href: "/category/plant-protein",
                },
                { label: "Casein Protein", href: "/category/casein-protein" },
                { label: "Mass Gainers", href: "/category/mass-gainers" },
                { label: "Protein Bars", href: "/category/protein-bars" },
                { label: "Pre-Workout", href: "/category/pre-workout" },
                { label: "Post-Workout", href: "/category/post-workout" },
                { label: "BCAA & EAA", href: "/category/bcaa-eaa" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#f01c33] transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-5 h-5 mr-2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#c4ab66] rounded-full group-hover:bg-[#f01c33] transition-colors duration-300 group-hover:scale-150"></div>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                More Products
              </span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mb-6"></div>
            <ul className="space-y-3">
              {[
                { label: "Creatine & HMB", href: "/category/creatine-hmb" },
                { label: "Glutamine", href: "/category/glutamine" },
                { label: "Protein Foods", href: "/category/protein-foods" },
                { label: "Weight Loss Support", href: "/category/weight-loss" },
                { label: "Multivitamins", href: "/category/multivitamins" },
                { label: "Omega 3 Fatty Acids", href: "/category/omega-3" },
                { label: "Workout Accessories", href: "/category/accessories" },
                { label: "Gym Clothing", href: "/category/clothing" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#f01c33] transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-5 h-5 mr-2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#c4ab66] rounded-full group-hover:bg-[#f01c33] transition-colors duration-300 group-hover:scale-150"></div>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                Contact Us
              </span>
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mb-6"></div>
            <div className="space-y-5">
              <div className="flex items-start group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 group-hover:border-[#f01c33] transition-colors duration-300">
                  <MapPin size={18} className="text-[#f01c33]" />
                </div>
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  A-36, Sector 83, Noida - 201305, Uttar Pradesh (India)
                </span>
              </div>

              <div className="flex items-center group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 group-hover:border-[#f01c33] transition-colors duration-300">
                  <Mail size={18} className="text-[#f01c33]" />
                </div>
                <a
                  href="mailto:support@powerfuel.in"
                  className="text-gray-600 group-hover:text-[#f01c33] transition-colors duration-300"
                >
                  support@powerfuel.in
                </a>
              </div>

              <div className="flex items-center group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 group-hover:border-[#f01c33] transition-colors duration-300">
                  <Phone size={18} className="text-[#f01c33]" />
                </div>
                <a
                  href="tel:+918800123456"
                  className="text-gray-600 group-hover:text-[#f01c33] transition-colors duration-300"
                >
                  +91 8800 123 456
                </a>
              </div>

              <div className="flex items-start group">
                <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 group-hover:border-[#f01c33] transition-colors duration-300">
                  <Clock size={18} className="text-[#f01c33]" />
                </div>
                <div className="text-gray-600">
                  <div className="font-medium text-gray-700">Open Hours:</div>
                  <div className="group-hover:text-gray-800 transition-colors duration-300">
                    Mon - Sat: 9:00 AM - 8:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom section with payment methods */}
      <div className="relative z-10 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-[#f01c33] mr-2" />
              <p className="text-gray-600 text-sm">
                © PowerFuel 2025 | All Rights Reserved
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-[#f01c33] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-sm text-gray-600 hover:text-[#f01c33] transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/shipping-policy"
                className="text-sm text-gray-600 hover:text-[#f01c33] transition-colors duration-300"
              >
                Shipping Policy
              </Link>
              <Link
                href="/refund-policy"
                className="text-sm text-gray-600 hover:text-[#f01c33] transition-colors duration-300"
              >
                Refund Policy
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {["visa", "mastercard", "amex", "paypal", "upi"].map(
                (payment) => (
                  <div
                    key={payment}
                    className="w-10 h-6 bg-white rounded-md shadow-sm border border-gray-100 flex items-center justify-center"
                  >
                    <div className="text-xs text-gray-500 font-medium">
                      {payment.charAt(0).toUpperCase() + payment.slice(1)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
