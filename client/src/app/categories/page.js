"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Package,
  Star,
} from "lucide-react";

const CategoryCard = ({ category, index }) => {
  const getImageUrl = (image) => {
    if (!image) return "/placeholder.svg?height=300&width=400";
    if (image.startsWith("http")) return image;
    return `https://desirediv-storage.blr1.digitaloceanspaces.com/${image}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full"
    >
      <div className="relative h-full rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-xl">
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-[#F01C33] to-[#ff4757] px-3 py-1 rounded-full text-white text-xs font-bold shadow-md flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>PREMIUM</span>
          </div>
        </div>

        {/* Product Count Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/90 px-3 py-1 rounded-full shadow-md border border-gray-200">
            <div className="flex items-center space-x-1">
              <Package className="w-3 h-3 text-[#C2A861]" />
              <span className="text-xs font-bold text-gray-700">
                {category._count?.products || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <Image
            src={getImageUrl(category.image)}
            alt={category.name}
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description ||
              "Discover premium quality products in this carefully curated category"}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Available Now</span>
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {category._count?.products || 0} Items
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#C2A861] to-[#F01C33] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 w-full">
      <div className="h-48 sm:h-56 md:h-64 bg-gray-300" />
      <div className="p-5">
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-4 w-full" />
        <div className="h-4 bg-gray-300 rounded mb-4 w-2/3" />
        <div className="h-10 bg-gray-300 rounded-lg w-full" />
      </div>
    </div>
  );
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-[#C2A861] to-[#F01C33] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase">
              Premium Categories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Explore Our Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Discover our complete range of premium fitness supplements and
            equipment
          </motion.p>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3 h-5 w-5" />
              <div>
                <h3 className="font-medium text-red-800">
                  Error Loading Categories
                </h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C2A861] to-[#F01C33] rounded-full mb-6">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Categories Found
            </h2>
            <p className="text-gray-600 mb-6">
              Please check back later for our exciting categories.
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#C2A861] to-[#F01C33] text-white px-6 py-2 rounded-lg font-medium"
              >
                Browse All Products
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="w-full"
              >
                <CategoryCard category={category} index={index} />
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Need Help Choosing?
              </h3>
              <p className="text-gray-600 mb-6">
                Our experts are here to help you find the perfect products
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#C2A861] to-[#F01C33] text-white px-6 py-2 rounded-lg font-medium"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
