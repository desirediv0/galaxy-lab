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
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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
    <footer className="bg-[#EFE5D3] text-black">
      
      <div className="max-w- mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About PowerFuel */}
          <div>
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="PowerFuel Logo"
                width={120}
                height={140}
                className="mb-4"
              />  
            </div>
            <p className="text-gray-800 mb-6 text-sm leading-relaxed">
              PowerFuel is India&apos;s premium fitness nutrition brand,
              dedicated to providing high-quality supplements and nutritional
              products to help you achieve your fitness goals.
            </p>
            {/* Social media links */}
            <div className="flex space-x-2">
              {[
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Facebook size={16} />, href: "#" },
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Youtube size={16} />, href: "#" },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-8 h-8 bg-[#e8d3ac] hover:bg-[#E2231A] flex items-center justify-center rounded text-black transition-colors duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            {" "}
            <h3 className="text-black font-semibold text-lg mb-2">
              Product Categories
            </h3>
            <div className="w-16 h-1 bg-[#E2231A] mb-6"></div>
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
                    className="text-gray-800 hover:text-[#E2231A] transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            {" "}
            <h3 className="text-black font-semibold text-lg mb-2">
              More Products
            </h3>
            <div className="w-16 h-1 bg-[#E2231A] mb-6"></div>
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
                    className="text-gray-800 hover:text-[#E2231A] transition-colors duration-300 text-sm flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            {" "}
            <h3 className="text-black font-semibold text-lg mb-2">
              Contact Us
            </h3>
            <div className="w-12 h-1 bg-[#E2231A] mb-6"></div>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="text-[#E2231A] mr-3 mt-1 flex-shrink-0"
                />
                <span className="text-gray-800">
                  A-36, Sector 83, Noida - 201305, Uttar Pradesh (India)
                </span>
              </div>

              <div className="flex items-center">
                <Mail size={16} className="text-[#E2231A] mr-3 flex-shrink-0" />
                <span className="text-gray-800">support@powerfuel.in</span>
              </div>

              <div className="flex items-center">
                <Phone
                  size={16}
                  className="text-[#E2231A] mr-3 flex-shrink-0"
                />
                <span className="text-gray-800">+91 8800 123 456</span>
              </div>

              <div className="flex items-start">
                {" "}
                <div className="w-4 h-4 flex items-center justify-center mr-3 mt-1">
                  <div className="w-2 h-2 bg-[#E2231A] rounded-full"></div>
                </div>
                <div className="text-gray-800">
                  <div className="font-medium">Open Hours:</div>
                  <div>Mon - Sat: 9:00 AM - 8:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-gray-800 text-center text-sm">
            © PowerFuel 2025 | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
