"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchApi } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  ShoppingBag,
  Crown,
} from "lucide-react";

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full px-3"
    >
      <div className="group relative h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105">
        {/* Enhanced Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#c4ab66]/5 to-[#f01c33]/5 z-0" />

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#f01c33]/20 via-[#c4ab66]/20 to-[#f01c33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        <div className="absolute inset-0.5 rounded-3xl bg-white z-10"></div>

        {/* Image with Enhanced Effects */}
        <div className="relative h-72 overflow-hidden rounded-t-3xl z-20">
          <motion.div
            className="h-full w-full relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={category.image || "/category-placeholder.jpg"}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Enhanced Premium Ribbon */}
          {category.isPremium && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -right-10 top-8 w-40 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm font-bold py-2 text-center transform rotate-45 shadow-xl z-30"
            >
              <div className="flex items-center justify-center gap-1">
                <Crown className="w-4 h-4" />
                PREMIUM
              </div>
            </motion.div>
          )}

          {/* Enhanced Product Count Bubble */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-[#f01c33]/90 to-[#c4ab66]/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl text-white text-sm font-bold flex items-center gap-2 border border-white/20"
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            {category._count?.products || 0} items
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-[#c4ab66] to-[#f01c33] rounded-full flex items-center justify-center shadow-lg opacity-80"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-8 relative z-20 bg-gradient-to-b from-white to-gray-50/50">
          {/* Category Name with Gradient */}
          <motion.h3
            className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent group-hover:from-[#f01c33] group-hover:to-[#c4ab66] transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            {category.name}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-600 text-base mb-6 line-clamp-2 leading-relaxed">
            {category.description ||
              "Explore our premium collection of high-quality products"}
          </p>

          {/* Enhanced CTA Button */}
          <Link
            href={`/category/${category.slug || ""}`}
            className="inline-block w-full"
          >
            <motion.button
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group/btn w-full flex items-center justify-between bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>

          {/* Decorative Elements */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full animate-pulse border border-gray-100">
      <div className="h-72 bg-gradient-to-br from-gray-200 to-gray-300 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
      </div>
      <div className="p-8">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 mb-4" />
        <div className="h-5 bg-gray-200 rounded-lg w-full mb-3" />
        <div className="h-5 bg-gray-200 rounded-lg w-2/3 mb-6" />
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-full" />
      </div>
    </div>
  );
};

const FeaturedCategoriesCarousel = ({ categories }) => {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-[#f01c33]" />
        </div>
        <p className="text-gray-500 text-lg">No categories available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          slidesToScroll: "auto",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {categories.map((category, index) => (
            <CarouselItem
              key={category.id || index}
              className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CategoryCard category={category} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation Buttons */}
        <CarouselPrevious className="hidden md:flex absolute -left-6 -translate-y-1/2 top-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-[#c4ab66]/20 text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white hover:border-transparent transition-all duration-500 hover:scale-110" />
        <CarouselNext className="hidden md:flex absolute -right-6 -translate-y-1/2 top-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-[#c4ab66]/20 text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white hover:border-transparent transition-all duration-500 hover:scale-110" />
      </Carousel>

      {/* Enhanced Progress Indicator */}
      <div className="mt-12 flex justify-center">
        <div className="relative h-2 bg-gray-200 rounded-full w-full max-w-md shadow-inner">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full shadow-lg"
            animate={{
              width: `${((currentIndex + 1) / categories.length) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#f01c33]/20 to-[#c4ab66]/20 -translate-y-1/2 rounded-full"></div>
        </div>
      </div>

      {/* Progress Numbers */}
      <div className="mt-4 text-center">
        <span className="text-sm font-medium text-gray-600">
          <span className="text-[#f01c33] font-bold">{currentIndex + 1}</span>
          {" of "}
          <span className="text-[#c4ab66] font-bold">{categories.length}</span>
        </span>
      </div>
    </div>
  );
};

const FeaturedCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchApi("/public/categories");
        setCategories(res?.data?.categories || []);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/2 h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-[#c4ab66]/10 to-[#f01c33]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute top-40 right-16 w-28 h-28 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-[#c4ab66]/10 to-[#f01c33]/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#f01c33] rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#c4ab66] rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-[#f01c33] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#c4ab66] rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#c4ab66]/20 mb-6"
          >
            <Star className="w-5 h-5 text-[#f01c33]" />
            <span className="text-[#f01c33] font-bold text-sm uppercase tracking-wider">
              Shop By Category
            </span>
            <Zap className="w-5 h-5 text-[#c4ab66]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 via-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              Discover Our {}
            </span>
         
            <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              Collections
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
          >
            Explore our carefully curated categories featuring premium products
            designed to elevate your lifestyle
          </motion.p>

          {/* Enhanced Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mx-auto shadow-lg"
          />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h3>
            <p className="text-gray-600 text-lg mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Try again
            </button>
          </motion.div>
        ) : (
          <FeaturedCategoriesCarousel categories={categories} />
        )}

        {/* Enhanced Browse All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-12 py-5 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 font-bold text-lg flex items-center mx-auto border-2 border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                Browse All Categories
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
