"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ChevronRight, Heart, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import GymSupplementShowcase from "@/components/showcase";
import BenefitsSec from "@/components/benifit-sec";
import FeaturedCategoriesSection from "@/components/catgry";
import Headtext from "@/components/ui/headtext";
import ProductQuickView from "@/components/ProductQuickView";
import FeaturedProducts from "@/components/FeaturedProducts";

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);
  const [autoplay, setAutoplay] = useState(true);

  const slides = [
    {
      title: "PREMIUM SUPPLEMENTS",
      subtitle: "Fuel your workouts with high-quality ingredients",
      cta: "SHOP NOW",
      ctaLink: "/products",
    },
    {
      title: "ADVANCED PROTEIN FORMULA",
      subtitle: "30g protein per serving with zero added sugar",
      cta: "EXPLORE",
      ctaLink: "/category/protein",
    },
  ];

  // Handle autoplay functionality
  useEffect(() => {
    if (!api || !autoplay) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, autoplay]);

  // Update current slide index when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      </div>

      <Carousel setApi={setApi} className="h-full relative z-20">
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="relative h-full w-full overflow-hidden flex items-center">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-left"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                      >
                        <span className="inline-block px-4 py-2 bg-[#C2A861]/10 text-[#C2A861] text-sm font-semibold rounded-full mb-4">
                          PREMIUM QUALITY
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl">
                          {slide.subtitle}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Link href={slide.ctaLink}>
                          <Button
                            size="lg"
                            className="text-lg px-8 py-7 font-bold bg-[#C2A861] text-white hover:bg-[#CAB476] hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-[#C2A861]/20"
                          >
                            {slide.cta}
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button
                            size="lg"
                            variant="outline"
                            className="text-lg bg-black px-8 py-7 font-bold text-white border-white/20 hover:bg-white/10 hover:border-white transition-all duration-300 rounded-full backdrop-blur-sm"
                          >
                            VIEW ALL
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </motion.div>

                  
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 grid grid-cols-3 gap-8"
                      >
                        {[
                          { label: "Active Users", value: "50K+" },
                          { label: "Products", value: "100+" },
                          { label: "Reviews", value: "5000+" },
                        ].map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-[#C2A861]">
                              {stat.value}
                            </div>
                            <div className="text-sm text-white/60">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>

                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      className="hidden lg:block relative"
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#C2A861]/20 to-[#F01C33]/20 blur-3xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-[#C2A861]/20 animate-spin-slow" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#F01C33]/20 animate-spin-slower" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="group relative"
            >
              <div
                className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#C2A861]"
                    : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C2A861] rounded-full text-xs text-white opacity-0 transform -translate-y-2 transition-all duration-300 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : ""
                } group-hover:opacity-100 group-hover:translate-y-0`}
              >
                {index + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Autoplay Control */}
        <div className="absolute bottom-12 right-12 z-30">
          <Button
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full border-2 border-[#C2A861] bg-black/20 hover:bg-[#C2A861]/20 backdrop-blur-sm transition-all duration-300"
            onClick={() => setAutoplay(!autoplay)}
            aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
          >
            {autoplay ? (
              <span className="w-4 h-4 bg-[#C2A861]" />
            ) : (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-[#C2A861]"
              />
            )}
          </Button>
        </div>
      </Carousel>
    </div>
  );
};

// Announcement Banner
const AnnouncementBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-black via-[#1a1a1a] to-black py-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #C2A861 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C2A861] to-[#F01C33] p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                ⚡
              </div>
            </div>
            <span className="text-sm md:text-base font-medium text-white group-hover:text-[#C2A861] transition-colors">
              FREE SHIPPING ON ORDERS ABOVE ₹999
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group hidden md:flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C2A861] to-[#F01C33] p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                🎁
              </div>
            </div>
            <span className="text-sm md:text-base font-medium text-white group-hover:text-[#C2A861] transition-colors">
              FREE SHAKER WITH PROTEIN PURCHASES
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C2A861] to-[#F01C33] p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                🔥
              </div>
            </div>
            <span className="text-sm md:text-base font-medium text-white group-hover:text-[#C2A861] transition-colors">
              USE CODE{" "}
              <strong className="text-[#F01C33] ml-1">FIT10</strong>{" "}
              <span className="bg-[#F01C33] text-white text-xs px-2 py-0.5 rounded-full ml-2">
                10% OFF
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ravi Sharma",
      role: "Fitness Enthusiast",
      avatar: "/avatar1.jpg",
      quote:
        "I've tried many supplements, but these products have truly made a difference in my training and recovery.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Yoga Instructor",
      avatar: "/avatar2.jpg",
      quote:
        "The quality of these supplements is exceptional. I recommend them to all my clients looking for clean nutrition.",
      rating: 5,
    },
    {
      name: "Arjun Singh",
      role: "Bodybuilder",
      avatar: "/avatar3.jpg",
      quote:
        "These supplements have been a game-changer for my competition prep. Pure ingredients and great results!",
      rating: 5,
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-[#1a1a1a] to-black relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #C2A861 1px, transparent 0)",
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C2A861] rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F01C33] rounded-full mix-blend-multiply filter blur-5xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#C2A861]/10 text-[#C2A861] text-sm font-semibold rounded-full mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Real experiences from people who trust our products
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
              >
                {/* Highlight effect */}
                <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-[#C2A861] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-[#F01C33] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C2A861] to-[#F01C33] p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                          {testimonial.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C2A861] rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-black fill-current" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-white text-lg group-hover:text-[#C2A861] transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#C2A861]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-[#C2A861]"
                            : "text-gray-600"
                        }`}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="mt-8 flex justify-center">
                    <motion.div
                      className="h-1 w-12 bg-gradient-to-r from-[#C2A861] to-[#F01C33] rounded-full opacity-30 group-hover:w-full transition-all duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

// Home page component
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch featured products
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetchApi(
          "/public/products?featured=true&limit=8"
        );
        setFeaturedProducts(productsRes?.data?.products || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err?.message || "Failed to fetch data");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black text-white">
      <HeroCarousel />
      <AnnouncementBanner />

      {/* Quick Links Section
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "💪",
                title: "Proteins",
                desc: "Build & Recover",
                link: "/category/protein",
                color: "from-[#C2A861]/20 to-[#C2A861]/5"
              },
              {
                icon: "⚡",
                title: "Pre-Workout",
                desc: "Energy & Focus",
                link: "/category/pre-workout",
                color: "from-[#F01C33]/20 to-[#F01C33]/5"
              },
              {
                icon: "🎯",
                title: "Weight Loss",
                desc: "Burn & Define",
                link: "/category/weight-loss",
                color: "from-[#C2A861]/20 to-[#C2A861]/5"
              },
              {
                icon: "🔄",
                title: "Recovery",
                desc: "Rest & Restore",
                link: "/category/recovery",
                color: "from-[#F01C33]/20 to-[#F01C33]/5"
              }
            ].map((item, index) => (
              <Link href={item.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-[#C2A861] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Categories with modern design */}
      <FeaturedCategoriesSection />

      {/* Featured Products Section with new styling */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-black via-[#1a1a1a] to-black relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" 
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, #C2A861 1px, transparent 0)",
                backgroundSize: "40px 40px"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#C2A861]/10 text-[#C2A861] text-sm font-semibold rounded-full mb-4">
                NEW ARRIVALS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Featured Products
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                High-quality supplements to enhance your fitness journey
              </p>
            </div>

            <FeaturedProducts
              products={featuredProducts}
              isLoading={productsLoading}
              error={error}
            />

            <div className="text-center mt-12">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[#C2A861] text-[#C2A861] hover:bg-[#C2A861] hover:text-white transition-all duration-300 rounded-full px-8 py-6 text-lg font-bold"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Supplement Showcase with parallax effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <GymSupplementShowcase />
      </motion.div>

      {/* Benefits Section with enhanced animations */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <BenefitsSec />
      </motion.div>

      {/* Enhanced Testimonials */}
      <TestimonialsSection />

    
    </div>
  );
}
