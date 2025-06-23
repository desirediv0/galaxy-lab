"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  ChevronRight,
  Heart,
  Eye,
  Sparkles,
  Zap,
  Target,
  Trophy,
  Users,
  Rocket,
  Award,
  Shield,
  Truck,
  Clock,
  ShoppingCart,
  Play,
  ChevronDown,
  Flame,
  CloudLightningIcon as Lightning,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import FeaturedProducts from "@/components/FeaturedProducts";

// Futuristic Hero Section with White Background
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);

  const slides = [
    {
      title: "PREMIUM FITNESS",
      subtitle: "Transform Your Body With Premium Supplements",
      description:
        "High-quality ingredients backed by science to fuel your fitness journey and achieve extraordinary results",
      cta: "SHOP NOW",
      ctaLink: "/products",
      image: "/c3.jpg",
      badge: "🏆 #1 RATED",
      offer: "GET 25% OFF",
      stats: [
        {
          label: "Happy Customers",
          value: "50K+",
          icon: <Users className="h-6 w-6" />,
        },
        {
          label: "Premium Products",
          value: "100+",
          icon: <Target className="h-6 w-6" />,
        },
        {
          label: "5-Star Reviews",
          value: "25K+",
          icon: <Star className="h-6 w-6" />,
        },
      ],
    },
    {
      title: "PROTEIN POWER",
      subtitle: "Build Muscle With Advanced Protein",
      description:
        "30g pure whey protein per serving with zero sugar, complete amino acid profile for maximum muscle growth",
      cta: "EXPLORE",
      ctaLink: "/category/protein",
      image: "/c3.jpg",
      badge: "🥇 BEST SELLER",
      offer: "BUY 2 GET 1",
      stats: [
        {
          label: "Protein Per Serve",
          value: "30g",
          icon: <Zap className="h-6 w-6" />,
        },
        {
          label: "Zero Sugar",
          value: "0g",
          icon: <Shield className="h-6 w-6" />,
        },
        {
          label: "Lab Tested",
          value: "100%",
          icon: <Award className="h-6 w-6" />,
        },
      ],
    },
    {
      title: "ENERGY BOOST",
      subtitle: "Unleash Your Workout Potential",
      description:
        "Premium pre-workout formula designed to maximize energy, focus and performance for intense training sessions",
      cta: "GET ENERGIZED",
      ctaLink: "/category/pre-workout",
      image: "/c3.jpg",
      badge: "⚡ HIGH ENERGY",
      offer: "FREE SHAKER",
      stats: [
        {
          label: "Energy Boost",
          value: "300%",
          icon: <Rocket className="h-6 w-6" />,
        },
        {
          label: "Focus Time",
          value: "3hrs",
          icon: <Eye className="h-6 w-6" />,
        },
        {
          label: "Clean Formula",
          value: "100%",
          icon: <Heart className="h-6 w-6" />,
        },
      ],
    },
  ];

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 193, 7, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 193, 7, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 border-2 border-yellow-400/20 rounded-full"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-lg transform rotate-45"
        />

        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-yellow-400 rounded-full blur-sm"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-amber-400 rounded-full blur-sm"
        />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-50/30 via-transparent to-amber-50/20 pointer-events-none" />
      </div>

      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="min-h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="min-h-screen flex items-center py-16 mt-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Futuristic Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-left space-y-8 relative z-10"
                    >
                      {/* Futuristic Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-full backdrop-blur-sm"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                          {slide.badge}
                        </span>
                        <Lightning className="w-4 h-4 text-yellow-500" />
                      </motion.div>

                      {/* Main Title with Futuristic Typography */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-none">
                          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            {slide.title.split(" ")[0]}
                          </span>
                          <br />
                          <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                            {slide.title.split(" ").slice(1).join(" ")}
                          </span>
                        </h1>
                      </motion.div>

                      {/* Subtitle with Glow Effect */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 relative"
                      >
                        {slide.subtitle}
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 blur-lg -z-10 opacity-50" />
                      </motion.h2>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>

                      {/* Futuristic Offer Banner */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="inline-block"
                      >
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                          <div className="relative px-8 py-4 bg-white border border-yellow-400/30 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3">
                              <Flame className="w-5 h-5 text-yellow-500" />
                              <span className="font-bold text-gray-800 text-lg">
                                🎉 {slide.offer} - LIMITED TIME!
                              </span>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Futuristic CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-6"
                      >
                        <Link href={slide.ctaLink}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000" />
                            <Button
                              size="lg"
                              className="relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-gray-900 font-bold text-lg rounded-2xl shadow-xl transition-all duration-500"
                            >
                              <span className="flex items-center gap-3">
                                <ShoppingCart className="w-6 h-6" />
                                {slide.cta}
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                            </Button>
                          </motion.div>
                        </Link>

                        <Link href="/products">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group"
                          >
                            <Button
                              size="lg"
                              variant="outline"
                              className="px-12 py-6 border-2 border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-gray-900 hover:bg-yellow-50 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              <span className="flex items-center gap-3">
                                <Play className="w-6 h-6" />
                                VIEW ALL
                              </span>
                            </Button>
                          </motion.div>
                        </Link>
                      </motion.div>

                      {/* Futuristic Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200"
                      >
                        {slide.stats.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.9 + idx * 0.1,
                            }}
                            className="text-center group cursor-pointer"
                          >
                            <div className="flex justify-center mb-3">
                              <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-2xl blur group-hover:blur-md transition-all duration-300" />
                                <div className="relative p-3 bg-white border border-gray-200 rounded-2xl text-gray-700 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg">
                                  {stat.icon}
                                </div>
                              </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-yellow-600 group-hover:to-amber-600 transition-all duration-300">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 font-semibold mt-1">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Futuristic Product Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="relative"
                    >
                      <div className="relative w-full h-[600px] group">
                        {/* Futuristic Container */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                          {/* Animated Border */}
                          <div className="absolute inset-0 rounded-3xl">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                          </div>

                          {/* Product Image */}
                          <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            fill
                            className="object-contain p-12 relative z-10 group-hover:scale-105 transition-transform duration-700"
                            priority
                          />

                          {/* Floating Elements */}
                          <motion.div
                            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                            className="absolute top-8 right-8 z-20"
                          >
                            <div className="relative group/badge">
                              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl blur opacity-25 group-hover/badge:opacity-75 transition duration-1000" />
                              <div className="relative px-6 py-4 bg-white border border-yellow-400/30 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-yellow-500" />
                                  <div>
                                    <div className="text-xs font-bold text-gray-600">
                                      LIMITED
                                    </div>
                                    <div className="text-lg font-black text-gray-800">
                                      SALE
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Trust Badge */}
                          <motion.div
                            initial={{ scale: 0, x: -20 }}
                            animate={{ scale: 1, x: 0 }}
                            transition={{ delay: 2, duration: 0.6 }}
                            className="absolute bottom-8 left-8 z-20"
                          >
                            <div className="relative group/trust">
                              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl blur opacity-25 group-hover/trust:opacity-75 transition duration-1000" />
                              <div className="relative px-4 py-3 bg-white border border-green-400/30 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-5 h-5 text-green-500" />
                                  <span className="text-sm font-bold text-gray-800">
                                    100% AUTHENTIC
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Floating Geometric Elements */}
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="absolute bottom-20 right-20 w-8 h-8 border-2 border-yellow-400/30 rounded-full"
                          />

                          <motion.div
                            animate={{
                              y: [-5, 5, -5],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 6,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                            className="absolute top-1/2 right-12 w-4 h-4 bg-gradient-to-r from-amber-400/40 to-yellow-400/40 rounded-sm transform rotate-45"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Futuristic Navigation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-gray-200">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "scale-125" : "hover:scale-110"
                }`}
              >
                {index === currentSlide ? (
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-lg" />
                ) : (
                  <div className="w-full h-full bg-gray-300 hover:bg-gray-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Futuristic Progress Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 shadow-lg"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-8 flex flex-col items-center text-gray-400"
        >
          <span className="text-sm font-medium mb-2 rotate-90 origin-center">
            SCROLL
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </Carousel>
    </section>
  );
};

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
              "Explore our premium collection of high-quality products"}
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
              Shop By Category
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Discover Our Collections
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Explore our carefully curated categories featuring premium products
            designed to elevate your lifestyle
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
      title: "Premium Quality",
      description:
        "Lab-tested supplements made with high-quality ingredients for maximum effectiveness.",
      icon: <Award className="w-8 h-8" />,
    },
    {
      title: "Fast Delivery",
      description:
        "Get your supplements delivered to your doorstep within 2-3 business days.",
      icon: <Truck className="w-8 h-8" />,
    },
    {
      title: "Expert Support",
      description:
        "Our team of fitness experts is available to help you choose the right supplements.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence with our 100% secure payment gateway.",
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
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Excellence Delivered
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            We&apos;re committed to providing you with the best fitness
            supplements and an exceptional experience
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              number: "100%",
              label: "Quality Tested",
              icon: <Award className="w-6 h-6" />,
            },
            {
              number: "1000+",
              label: "Happy Customers",
              icon: <Users className="w-6 h-6" />,
            },
            {
              number: "50+",
              label: "Products",
              icon: <Star className="w-6 h-6" />,
            },
            {
              number: "24/7",
              label: "Customer Support",
              icon: <Clock className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-full text-yellow-600 shadow-lg border border-gray-200">
                  {stat.icon}
                </div>
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.number}
              </h4>
              <p className="text-gray-600 text-sm font-bold uppercase tracking-wider">
                {stat.label}
              </p>
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
        "Galaxy Labs didn't just change my physique, it revolutionized my entire approach to training and nutrition.",
      rating: 5,
      image: "💪",
    },
    {
      name: "Priya Mehta",
      role: "Fitness Coach & Mom",
      location: "Delhi, India",
      achievement: "Transformed 500+ clients",
      quote:
        "As a mother and entrepreneur, Galaxy Labs gave me the sustainable energy I needed to excel in both roles.",
      rating: 5,
      image: "🧘‍♀️",
    },
    {
      name: "Vikram Thakur",
      role: "Software Engineer",
      location: "Bangalore, India",
      achievement: "Lost 25kg in 8 months",
      quote:
        "Galaxy Labs proved that even with a demanding tech career, incredible transformations are possible.",
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
              Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Real People, Incredible Results
          </h2>

          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
            style={{ lineHeight: 1.7 }}
          >
            Discover how our products have transformed lives across India
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
    <>
      <HeroSection />

      <FeaturedCategoriesSection />
      <FeaturedProductsSection />
      <BenefitsSection />
      <TestimonialsSection />
    </>
  );
}
