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
  TrendingUp,
  Rocket,
  Award,
  Shield,
  Truck,
  Clock,
  ShoppingCart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import FeaturedProducts from "@/components/FeaturedProducts";

// Enhanced Modern Hero Section
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
    <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#AA2E2E]/20 to-[#B99B2F]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-[#B99B2F]/20 to-[#AA2E2E]/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
            className={`absolute w-2 h-2 ${
              i % 2 === 0 ? "bg-[#AA2E2E]" : "bg-[#B99B2F]"
            } rounded-full`}
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <Carousel setApi={setApi} className="h-full">
        <CarouselContent className="min-h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="p-0">
              <div className="min-h-screen flex items-center py-16 mt-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Enhanced Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-left space-y-8"
                    >
                     

                      {/* Main Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-none">
                          <span className="bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F] bg-clip-text text-transparent">
                            {slide.title.split(" ")[0]}
                          </span>
                          <br />
                          <span className="text-[#1C1C1C]">
                            {slide.title.split(" ").slice(1).join(" ")}
                          </span>
                        </h1>
                      </motion.div>

                      {/* Subtitle */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4"
                      >
                        {slide.subtitle}
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

                      {/* Offer Banner */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="inline-block"
                      >
                        <div className="bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F] text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl">
                          🎉 {slide.offer} - LIMITED TIME!
                        </div>
                      </motion.div>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-6"
                      >
                        <Link href={slide.ctaLink}>
                          <Button
                            size="lg"
                            className="group px-12 py-6 bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F] hover:from-[#B99B2F] hover:to-[#AA2E2E] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                          >
                            <span className="flex items-center gap-3">
                              <ShoppingCart className="w-6 h-6" />
                              {slide.cta}
                              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button
                            size="lg"
                            variant="outline"
                            className="px-12 py-6 border-2 border-[#AA2E2E] text-[#AA2E2E] hover:bg-[#AA2E2E] hover:text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <span className="flex items-center gap-3">
                              <Eye className="w-6 h-6" />
                              VIEW ALL
                            </span>
                          </Button>
                        </Link>
                      </motion.div>

                      {/* Enhanced Stats */}
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
                              <div className="p-3 bg-gradient-to-r from-[#AA2E2E]/10 to-[#B99B2F]/10 rounded-2xl text-[#AA2E2E] group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                              </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-[#AA2E2E] group-hover:scale-110 transition-transform duration-300">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 font-semibold mt-1">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Product Image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="relative"
                    >
                      <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#AA2E2E]/5 to-[#B99B2F]/5" />

                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          fill
                          className="object-contain p-12 relative z-10"
                          priority
                        />

                        {/* Floating Sale Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            delay: 1.5,
                            duration: 1,
                          }}
                          className="absolute top-8 right-8 z-20"
                        >
                          <div className="bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F] text-white text-sm font-bold px-6 py-4 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5" />
                              <div>
                                <div className="text-xs">LIMITED</div>
                                <div className="text-lg font-black">SALE</div>
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
                          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-3 rounded-xl shadow-lg">
                            <div className="flex items-center gap-2">
                              <Shield className="w-5 h-5 text-[#B99B2F]" />
                              <span className="text-sm font-bold text-[#AA2E2E]">
                                100% AUTHENTIC
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                          animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-[#B99B2F] to-[#AA2E2E] rounded-full opacity-20 blur-sm"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-gray-200">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F] scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#AA2E2E] to-[#B99B2F]"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Carousel>
    </section>
  );
};

// Announcement Banner
const AnnouncementBanner = () => {
  return (
    <div className="bg-[#1C1C1C] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-[#AA2E2E] flex items-center justify-center">
              ⚡
            </div>
            <span className="text-sm md:text-base font-medium font-['Lora']">
              FREE SHIPPING ON ORDERS ABOVE ₹999
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-3 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-[#B99B2F] flex items-center justify-center">
              🎁
            </div>
            <span className="text-sm md:text-base font-medium font-['Lora']">
              FREE SHAKER WITH PROTEIN PURCHASES
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-3 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-[#AA2E2E] flex items-center justify-center">
              🔥
            </div>
            <span className="text-sm md:text-base font-medium font-['Lora']">
              USE CODE <strong className="text-[#B99B2F] ml-1">FIT10</strong>
              <span className="bg-[#AA2E2E] text-white text-xs px-2 py-0.5 rounded-full ml-2">
                10% OFF
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Featured Categories Section
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
      <div className="bg-[#F5F5F5] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={category.image || "/category-placeholder.jpg"}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Product Count */}
          <div className="absolute bottom-4 right-4 bg-[#AA2E2E] text-white px-3 py-1 rounded-full text-sm font-bold">
            {category._count?.products || 0} items
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#AA2E2E] mb-3 font-['Playfair_Display']">
            {category.name}
          </h3>
          <p
            className="text-[#1C1C1C] mb-6 font-['Lora']"
            style={{ lineHeight: 1.7 }}
          >
            {category.description ||
              "Explore our premium collection of high-quality products"}
          </p>

          <Link href={`/category/${category.slug || ""}`}>
            <Button className="w-full bg-[#AA2E2E] hover:bg-transparent hover:border-[#B99B2F] text-white hover:text-[#AA2E2E] font-bold rounded-full border border-transparent hover:border transition-all duration-300">
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[#F5F5F5] px-6 py-3 rounded-full border border-[#B99B2F]/20 mb-6">
            <Star className="w-5 h-5 text-[#AA2E2E]" />
            <span className="text-[#AA2E2E] font-bold text-sm uppercase tracking-wider font-['Lora']">
              Shop By Category
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display'] text-[#AA2E2E]">
            Discover Our Collections
          </h2>

          <p
            className="text-[#1C1C1C] text-lg max-w-2xl mx-auto mb-8 font-['Lora']"
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
                className="bg-[#F5F5F5] rounded-lg shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-300 rounded-t-lg" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-10 bg-gray-300 rounded" />
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

// Benefits Section
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
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-[#B99B2F]/20 mb-6 shadow-lg">
            <Star className="w-5 h-5 text-[#AA2E2E]" />
            <span className="text-[#AA2E2E] font-bold text-sm uppercase tracking-wider font-['Lora']">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display'] text-[#AA2E2E]">
            Excellence Delivered
          </h2>

          <p
            className="text-[#1C1C1C] text-lg max-w-2xl mx-auto mb-8 font-['Lora']"
            style={{ lineHeight: 1.7 }}
          >
            We're committed to providing you with the best fitness supplements
            and an exceptional experience
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
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:scale-105">
                <div className="w-16 h-16 bg-[#AA2E2E] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#B99B2F] transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#AA2E2E] mb-4 font-['Playfair_Display']">
                  {benefit.title}
                </h3>
                <p
                  className="text-[#1C1C1C] font-['Lora']"
                  style={{ lineHeight: 1.7 }}
                >
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
              className="text-center bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-[#AA2E2E]/10 rounded-full text-[#AA2E2E]">
                  {stat.icon}
                </div>
              </div>
              <h4 className="text-3xl font-bold text-[#AA2E2E] mb-2 font-['Playfair_Display']">
                {stat.number}
              </h4>
              <p className="text-[#1C1C1C] text-sm font-bold uppercase tracking-wider font-['Lora']">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[#F5F5F5] px-6 py-3 rounded-full border border-[#B99B2F]/20 mb-6">
            <Sparkles className="w-5 h-5 text-[#AA2E2E]" />
            <span className="text-[#AA2E2E] font-bold text-sm uppercase tracking-wider font-['Lora']">
              Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display'] text-[#AA2E2E]">
            Real People, Incredible Results
          </h2>

          <p
            className="text-[#1C1C1C] text-lg max-w-2xl mx-auto mb-8 font-['Lora']"
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
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-[#AA2E2E] rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#AA2E2E] font-['Playfair_Display']">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#B99B2F] font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-[#1C1C1C]/70 text-sm font-['Lora']">
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex text-[#B99B2F] mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" fill="currentColor" />
                  ))}
                </div>

                <blockquote
                  className="text-[#1C1C1C] mb-6 font-['Lora'] italic"
                  style={{ lineHeight: 1.7 }}
                >
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-[#AA2E2E]/10 px-4 py-2 rounded-full">
                  <span className="text-[#AA2E2E] text-sm font-bold flex items-center gap-2">
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
      <AnnouncementBanner />
      <FeaturedCategoriesSection />
      <FeaturedProductsSection />
      <BenefitsSection />
      <TestimonialsSection />
    </>
  );
}
