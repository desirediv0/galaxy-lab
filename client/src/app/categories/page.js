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
  Sparkles,
  TrendingUp,
  Award,
  Zap,
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
      {/* Floating Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#f01c33]/20 via-[#c4ab66]/20 to-[#f01c33]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

      {/* Main Card */}
      <div className="relative h-full rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:bg-white/90">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f01c33] via-transparent to-[#c4ab66]"></div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-[#c4ab66]/30 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-[#f01c33]/30 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* Premium Badge */}
        <div className="absolute top-4 left-4 z-20">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-gradient-to-r from-[#f01c33] via-[#ff2d47] to-[#c4ab66] px-4 py-2 rounded-full text-white text-xs font-bold shadow-lg flex items-center space-x-2 backdrop-blur-sm border border-white/20"
          >
            <Sparkles className="w-3 h-3 fill-current animate-pulse" />
            <span className="tracking-wider">PREMIUM</span>
          </motion.div>
        </div>

        {/* Product Count Badge */}
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/30"
          >
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-[#c4ab66]" />
              <span className="text-sm font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                {category._count?.products || 0}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Image Container */}
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
          {/* Multi-layered Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#f01c33]/20 via-transparent to-[#c4ab66]/20 z-10" />

          {/* Floating Elements */}
          <div className="absolute top-6 left-6 w-3 h-3 bg-[#c4ab66] rounded-full opacity-60 animate-pulse z-10"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-[#f01c33] rounded-full opacity-40 animate-bounce z-10"></div>
          <div className="absolute bottom-8 left-8 w-4 h-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full opacity-50 animate-pulse z-10"></div>

          <Image
            src={getImageUrl(category.image) || "/placeholder.svg"}
            alt={category.name}
            width={600}
            height={600}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 z-10"></div>
        </div>

        {/* Content */}
        <div className="relative p-6 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm">
          {/* Category Name */}
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent group-hover:from-[#c4ab66] group-hover:to-[#f01c33] transition-all duration-500">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {category.description ||
              "Discover premium quality products in this carefully curated category"}
          </p>

          {/* Status and Count */}
          <div className="flex items-center justify-between text-xs mb-6">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 font-medium">Available Now</span>
            </div>
            <div className="bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 px-3 py-1 rounded-full border border-[#f01c33]/20">
              <span className="text-[#f01c33] font-bold">
                {category._count?.products || 0} Items
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#f01c33] via-[#ff2d47] to-[#c4ab66] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>

            <TrendingUp className="w-4 h-4 animate-pulse" />
            <span className="tracking-wide">EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 w-full">
      {/* Skeleton Image */}
      <div className="h-56 sm:h-64 md:h-72 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-pulse"></div>
      </div>

      {/* Skeleton Content */}
      <div className="p-6">
        <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
        <div className="flex justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-full"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#f01c33]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-bl from-[#c4ab66]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-tr from-[#f01c33]/5 to-[#c4ab66]/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] p-[2px] rounded-full">
                <div className="bg-white px-6 py-2 rounded-full">
                  <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent text-sm font-bold tracking-wider uppercase flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#f01c33]" />
                    <span>Premium Categories</span>
                    <Sparkles className="w-4 h-4 text-[#c4ab66] animate-pulse" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative"
            >
              <span className="bg-gradient-to-r from-[#f01c33] via-[#ff2d47] to-[#c4ab66] bg-clip-text text-transparent">
                Explore Our
              </span>
              <br />
              <span className="text-gray-900">Categories</span>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-[#c4ab66] to-[#f01c33] rounded-full opacity-30 animate-pulse"></div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Discover our complete range of premium fitness supplements and
              equipment, carefully curated for your success
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center space-x-8 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  {categories.length}+
                </div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  1000+
                </div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  Premium
                </div>
                <div className="text-sm text-gray-500">Quality</div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-12 max-w-2xl mx-auto shadow-lg"
            >
              <div className="flex items-center">
                <div className="bg-red-500 p-2 rounded-full mr-4">
                  <AlertCircle className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg">
                    Error Loading Categories
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Categories Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f01c33] via-transparent to-[#c4ab66]"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-full mb-8 shadow-lg">
                  <ShoppingBag className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  No Categories Found
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Please check back later for our exciting categories.
                </p>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Browse All Products</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {/* Enhanced Bottom CTA */}
          {!loading && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-20"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-white/20 max-w-3xl mx-auto relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#f01c33] to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#c4ab66] to-transparent rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-full mb-6 shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                      Need Help Choosing?
                    </span>
                  </h3>

                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Our fitness experts are here to help you find the perfect
                    products for your goals and lifestyle
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span>Contact Our Experts</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
