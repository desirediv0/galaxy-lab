"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Heart,
  Award,
  Shield,
  Truck,
  HeadphonesIcon,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden font-galaxy-heading">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-gray-100"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(240, 28, 51, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(185, 155, 47, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(240, 28, 51, 0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--galaxy-deep-red)] via-[var(--galaxy-royal-gold)] to-[var(--galaxy-deep-red)]"></div>

      {/* Floating decoration elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-[var(--galaxy-deep-red)]/10 to-[var(--galaxy-royal-gold)]/10 rounded-full blur-xl"
      ></motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [360, 0, 360] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-[var(--galaxy-royal-gold)]/10 to-[var(--galaxy-deep-red)]/10 rounded-full blur-2xl"
      ></motion.div>

      {/* Newsletter Section */}

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Galaxy Labs */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <div className="relative h-20 w-40 mb-8">
                  <Image
                    src="/logo.png"
                    alt="Galaxy Labs Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-[var(--galaxy-dark-charcoal)]/70 mb-6 leading-relaxed text-lg font-['Lora']">
                  India&apos;s premium fitness nutrition brand, dedicated to
                  providing high-quality supplements and nutritional products to
                  help you achieve your fitness goals and unlock your true
                  potential.
                </p>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: <Award className="h-5 w-5" />,
                      text: "Premium Quality",
                    },
                    {
                      icon: <Shield className="h-5 w-5" />,
                      text: "Lab Tested",
                    },
                    {
                      icon: <Truck className="h-5 w-5" />,
                      text: "Free Shipping",
                    },
                    {
                      icon: <HeadphonesIcon className="h-5 w-5" />,
                      text: "24/7 Support",
                    },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-[var(--galaxy-dark-charcoal)]/60"
                    >
                      <div className="text-[var(--galaxy-royal-gold)]">
                        {badge.icon}
                      </div>
                      <span className="text-sm font-medium">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Social media links */}
              <div className="flex space-x-4">
                {[
                  {
                    icon: <Instagram size={20} />,
                    href: "#",
                    label: "Instagram",
                  },
                  {
                    icon: <Facebook size={20} />,
                    href: "#",
                    label: "Facebook",
                  },
                  { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
                  { icon: <Youtube size={20} />, href: "#", label: "YouTube" },
                ].map((social, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={social.href}
                      className="group relative"
                      aria-label={social.label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--galaxy-deep-red)]/20 to-[var(--galaxy-royal-gold)]/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative w-12 h-12 bg-white hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)] hover:to-[var(--galaxy-royal-gold)] flex items-center justify-center rounded-2xl text-[var(--galaxy-dark-charcoal)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100 hover:border-transparent">
                        {social.icon}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--galaxy-deep-red)] font-['Playfair_Display']">
              Quick Links
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] rounded-full mb-8"></div>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "/faqs" },
                { label: "Track Order", href: "/orders" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[var(--galaxy-dark-charcoal)]/70 hover:text-[var(--galaxy-deep-red)] transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-[var(--galaxy-royal-gold)] rounded-full mr-3 group-hover:bg-[var(--galaxy-deep-red)] transition-colors duration-300 group-hover:scale-150"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--galaxy-deep-red)] font-['Playfair_Display']">
              Categories
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] rounded-full mb-8"></div>
            <ul className="space-y-4">
              {[
                { label: "Whey Protein", href: "/category/whey-protein" },
                { label: "Mass Gainers", href: "/category/mass-gainers" },
                { label: "Pre-Workout", href: "/category/pre-workout" },
                { label: "Creatine", href: "/category/creatine" },
                { label: "Vitamins", href: "/category/vitamins" },
                { label: "Fat Burners", href: "/category/fat-burners" },
                { label: "Accessories", href: "/category/accessories" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-[var(--galaxy-dark-charcoal)]/70 hover:text-[var(--galaxy-deep-red)] transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-[var(--galaxy-royal-gold)] rounded-full mr-3 group-hover:bg-[var(--galaxy-deep-red)] transition-colors duration-300 group-hover:scale-150"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
        </div>
      </div>

      {/* Enhanced bottom section */}
      <div className="relative z-10 bg-gradient-to-r from-[var(--galaxy-deep-red)]/5 to-[var(--galaxy-royal-gold)]/5 backdrop-blur-sm border-t border-[var(--galaxy-royal-gold)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-[var(--galaxy-deep-red)] mr-2 animate-pulse" />
              <div className="text-[var(--galaxy-dark-charcoal)]/70 text-sm font-['Lora']">
                © 2025{" "}
                <a
                  href="https://desirediv.com"
                  className="text-[var(--galaxy-deep-red)] hover:text-[var(--galaxy-royal-gold)] transition-colors duration-300"
                >
                  Desire Div
                </a>{" "}
                | All Rights Reserved | Made with love for fitness enthusiasts
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Shipping Policy",
                "Return Policy",
              ].map((link) => (
                <Link
                  key={link}
                  href={`/${link
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/ /g, "-")}`}
                  className="text-sm text-[var(--galaxy-dark-charcoal)]/70 hover:text-[var(--galaxy-deep-red)] transition-colors duration-300 font-medium"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
