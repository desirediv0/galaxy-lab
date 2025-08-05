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

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About GenuineNutrition */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="relative h-16 w-32 mb-6">
                <Image
                  src="/logo.png"
                  alt="GenuineNutrition Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
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
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <div className="text-primary">{badge.icon}</div>
                    <span className="text-sm font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social media links */}
            <div className="flex space-x-4">
              {[
                {
                  icon: <Instagram size={20} />,
                  href: "https://instagram.com/genuinenutrition",
                  label: "Instagram",
                },
                {
                  icon: <Facebook size={20} />,
                  href: "https://facebook.com/genuinenutrition",
                  label: "Facebook",
                },
                {
                  icon: <Twitter size={20} />,
                  href: "https://twitter.com/genuinenutrition",
                  label: "Twitter",
                },
                {
                  icon: <Youtube size={20} />,
                  href: "https://youtube.com/genuinenutrition",
                  label: "YouTube",
                },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Categories", href: "/categories" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "/faqs" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-900">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Track Order", href: "/account/orders" },
                { label: "My Account", href: "/account" },
                { label: "Wishlist", href: "/wishlist" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "Size Guide", href: "/size-guide" },
                { label: "Help Center", href: "/help" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              <div className="text-gray-600 text-sm">
                © 2025 GenuineNutrition | All Rights Reserved
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Return Policy", href: "/return-policy" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
