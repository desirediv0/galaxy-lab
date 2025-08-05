"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Sparkles,
  Target,
  Trophy,
  Users,
  Award,
  Shield,
  Truck,
  ShoppingCart,
} from "lucide-react";

import { motion } from "framer-motion";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroCarousel from "@/components/HeroCarousel";

// Modern Featured Categories Section
const FeaturedCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchApi("/public/categories");
        setCategories(res?.data?.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const CategoryCard = ({ category, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={category.image || "/category-placeholder.jpg"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Product Count */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {category._count?.products || 0} items
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {category.name}
          </h3>
          <p className="text-gray-600 mb-6" style={{ lineHeight: 1.7 }}>
            {category.description ||
              "Premium quality supplements formulated for maximum results and optimal performance"}
          </p>

          <Link href={`/category/${category.slug || ""}`}>
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-gray-900 font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Shop Now
                </span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200 mb-6 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-bold text-sm uppercase tracking-wider">
              Galaxy Labs Categories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Premium Gym Supplements
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Explore our scientifically formulated supplement categories designed
            to support every aspect of your fitness journey
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl animate-pulse border border-gray-100"
              >
                <div className="h-64 bg-gray-200 rounded-t-3xl" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-10 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id || index}
                category={category}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Featured Products Section
const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchApi("/public/products?featured=true&limit=8");
        setProducts(res?.data?.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return <FeaturedProducts products={products} />;
};

// Modern Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      title: "Lab-Tested Quality",
      description:
        "Every Galaxy Labs supplement undergoes rigorous third-party testing for purity, potency, and safety. NSF certified for your peace of mind.",
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: "Fast & Free Shipping",
      description:
        "Get your supplements delivered to your doorstep within 2-3 business days. Free shipping on orders above ₹999 across India.",
      icon: <Truck className="w-8 h-8" />,
    },
    {
      title: "Fitness Expert Support",
      description:
        "Our certified nutritionists and fitness experts help you choose the right supplements for your specific goals and training routine.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "100% Authentic Products",
      description:
        "Guaranteed genuine supplements with batch tracking. No counterfeit products, only authentic Galaxy Labs quality.",
      icon: <Shield className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-200 mb-6 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-bold text-sm uppercase tracking-wider">
              Why Choose Galaxy Labs
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Trusted by Champions
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Join thousands of fitness enthusiasts who trust Galaxy Labs for
            their supplement needs. Quality, science, and results you can count
            on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-yellow-400/20 group-hover:to-amber-400/20 transition-colors duration-300 shadow-lg border border-yellow-400/20">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600" style={{ lineHeight: 1.7 }}>
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modern Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Arjun Singh",
      role: "Pro Bodybuilder",
      location: "Mumbai, India",
      achievement: "Mr. India Runner-up 2024",
      quote:
        "Galaxy Labs Whey Protein transformed my muscle gains. The quality is unmatched and the results speak for themselves. My go-to supplement brand!",
      rating: 5,
      image: "💪",
    },
    {
      name: "Priya Mehta",
      role: "Fitness Coach & Mom",
      location: "Delhi, India",
      achievement: "Transformed 500+ clients",
      quote:
        "As a fitness coach, I recommend Galaxy Labs to all my clients. Their pre-workout gives me the energy to train clients all day while being a mom.",
      rating: 5,
      image: "🏋️‍♀️",
    },
    {
      name: "Vikram Thakur",
      role: "Software Engineer",
      location: "Bangalore, India",
      achievement: "Lost 25kg in 8 months",
      quote:
        "Galaxy Labs BCAA helped me maintain muscle while cutting. Even with my hectic tech job, I achieved my dream physique. Highly recommended!",
      rating: 5,
      image: "💻",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200 mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-bold text-sm uppercase tracking-wider">
              Galaxy Labs Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real Results, Real Champions
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Join thousands of fitness enthusiasts who have transformed their
            lives with Galaxy Labs premium supplements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-lg border border-yellow-400/20">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-yellow-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-500 text-sm">
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex text-yellow-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" fill="currentColor" />
                  ))}
                </div>

                <blockquote
                  className="text-gray-700 mb-6 italic"
                  style={{ lineHeight: 1.7 }}
                >
                  {testimonial.quote}
                </blockquote>

                <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200 shadow-lg">
                  <span className="text-gray-700 text-sm font-bold flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    {testimonial.achievement}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedCategoriesSection />
      <FeaturedProductsSection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
}
