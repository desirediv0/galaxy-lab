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

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full px-2"
    >
      <div className="group relative h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0" />

        {/* Image with Parallax Effect */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={category.image || "/category-placeholder.jpg"}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Premium Ribbon */}
          {category.isPremium && (
            <div className="absolute -right-8 top-6 w-32 bg-primary text-white text-xs font-bold py-1 text-center transform rotate-45 shadow-lg z-10">
              PREMIUM
            </div>
          )}

          {/* Product Count Bubble */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            {category._count?.products || 0} items
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          <p className="text-gray-600 text-sm mb-5 line-clamp-2">
            {category.description || "Explore our premium collection"}
          </p>

          <Link
            href={`/category/${category.slug || ""}`}
            className="inline-block"
          >
            <motion.button
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center text-primary font-medium text-sm"
            >
              Shop now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </Link>
        </div>

        {/* Hover Effect Elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-[pulse_2s_infinite]" />
          <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-[pulse_3s_infinite]" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-primary animate-[pulse_2.5s_infinite]" />
          <div className="absolute top-0 right-0 w-1 h-full bg-primary animate-[pulse_3.5s_infinite]" />
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-5" />
        <div className="h-5 bg-gray-200 rounded w-20" />
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
      <div className="text-center py-12">
        <p className="text-gray-500">No categories available</p>
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
        <CarouselContent className="-ml-4">
          {categories.map((category, index) => (
            <CarouselItem
              key={category.id || index}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <CategoryCard category={category} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Buttons */}
        <CarouselPrevious className="hidden md:flex absolute left-0 -translate-y-1/2 top-1/2 w-12 h-12 bg-white shadow-xl border-none text-primary hover:bg-primary hover:text-white transition-all" />
        <CarouselNext className="hidden md:flex absolute right-0 -translate-y-1/2 top-1/2 w-12 h-12 bg-white shadow-xl border-none text-primary hover:bg-primary hover:text-white transition-all" />
      </Carousel>

      {/* Progress Indicator */}
      <div className="mt-8 flex justify-center">
        <div className="relative h-1 bg-gray-200 rounded-full w-full max-w-md">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            animate={{
              width: `${((currentIndex + 1) / categories.length) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent -skew-x-12 -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent skew-x-12 translate-x-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Shop By Category
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our Collections
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm text-primary font-medium"
            >
              Try again
            </button>
          </div>
        ) : (
          <FeaturedCategoriesCarousel categories={categories} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-medium flex items-center mx-auto"
            >
              Browse All Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
