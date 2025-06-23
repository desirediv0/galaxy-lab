"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Star,
  Eye,
  Heart,
  ShoppingCart,
  Zap,
  Crown,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import ProductQuickView from "./ProductQuickView";
import { motion } from "framer-motion";

const ProductSkeleton = () => (
  <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden animate-pulse border border-white/30">
    <div className="aspect-square bg-gradient-to-br from-white/20 to-white/30 w-full relative">
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-white/30 rounded-full"></div>
        ))}
      </div>
      <div className="h-6 bg-gradient-to-r from-white/20 to-white/30 rounded-xl w-3/4"></div>
      <div className="h-4 bg-white/20 rounded-lg w-1/2"></div>
      <div className="h-8 bg-gradient-to-r from-white/20 to-white/30 rounded-xl w-2/3"></div>
      <div className="h-12 bg-gradient-to-r from-white/20 to-white/30 rounded-2xl"></div>
    </div>
  </div>
);

const FeaturedProducts = ({
  products = [],
  isLoading = false,
  error = null,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (!isLoading && !error && products.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/40">
              <Zap className="w-12 h-12 text-amber-700" />
            </div>
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              Oops! Something went wrong
            </h3>
            <p className="text-amber-700 text-lg">Failed to load products</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Glassmorphism Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-28 h-28 bg-white/30 backdrop-blur-md rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Glassmorphism Header Section */}
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
            className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/40 mb-6 shadow-lg"
          >
            <TrendingUp className="w-5 h-5 text-amber-800" />
            <span className="text-amber-800 font-bold text-sm uppercase tracking-wider">
              Featured Products
            </span>
            <Sparkles className="w-5 h-5 text-amber-700" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
              Premium
            </span>{" "}
            <span className="bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
              Collection
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-amber-800 text-lg max-w-2xl mx-auto mb-8 drop-shadow-sm"
          >
            Discover our handpicked selection of premium products designed to
            exceed your expectations
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full mx-auto shadow-lg"
          />
        </motion.div>

        {/* Glassmorphism Products Carousel */}
        <div className="relative px-2 md:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id || product.slug || Math.random().toString()}
                  className="pl-4 md:pl-6 basis-1/2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative h-full flex flex-col"
                  >
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-white/30 h-full flex flex-col transform group-hover:scale-105">
                      {/* Glassmorphism Product Image */}
                      <div className="relative aspect-square bg-gradient-to-br from-white/10 to-white/20 overflow-hidden">
                        <Link href={`/products/${product.slug || ""}`}>
                          <Image
                            src={product.image || "/product-placeholder.jpg"}
                            alt={product.name || "Product"}
                            fill
                            className="object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </Link>

                        {/* Glass Sale Badge */}
                        {product.hasSale && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-4 left-4 bg-white/30 backdrop-blur-md border border-white/40 text-amber-900 text-xs font-bold px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1"
                          >
                            <Zap className="w-3 h-3" />
                            SALE
                          </motion.div>
                        )}

                        {/* Glass Action Icons */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 flex items-center justify-center bg-white/40 backdrop-blur-md hover:bg-white/50 hover:text-amber-800 rounded-2xl shadow-lg transition-all duration-300 border border-white/50"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Wishlist:", product);
                            }}
                          >
                            <Heart className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 flex items-center justify-center bg-white/40 backdrop-blur-md hover:bg-white/50 hover:text-amber-800 rounded-2xl shadow-lg transition-all duration-300 border border-white/50"
                            onClick={(e) => {
                              e.preventDefault();
                              setQuickViewProduct(product);
                              setQuickViewOpen(true);
                            }}
                          >
                            <Eye className="h-5 w-5" />
                          </motion.button>
                        </div>

                        {/* Floating Glass Elements */}
                        <motion.div
                          animate={{ y: [-3, 3, -3] }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="absolute bottom-4 left-4 w-6 h-6 bg-white/30 backdrop-blur-sm rounded-full shadow-lg"
                        ></motion.div>
                      </div>

                      {/* Glassmorphism Product Info */}
                      <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white/10 to-white/20">
                        {/* Glass Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 transition-all duration-300"
                                  fill={
                                    i < Math.round(product.avgRating || 0)
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-sm text-amber-700 font-medium">
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                          {product.avgRating >= 4.5 && (
                            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30 shadow-lg">
                              <Crown className="w-3 h-3 text-amber-700" />
                              <span className="text-xs font-bold text-amber-700">
                                TOP
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Name */}
                        <Link
                          href={`/products/${product.slug || ""}`}
                          className="block mb-4"
                        >
                          <h3 className="font-bold text-amber-900 text-lg line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-amber-800 group-hover:to-amber-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 drop-shadow-sm">
                            {product.name || "Product"}
                          </h3>
                        </Link>

                        {/* Glass Price */}
                        <div className="mt-auto mb-4">
                          {product.hasSale ? (
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent text-2xl drop-shadow-sm">
                                ₹{product.basePrice || 0}
                              </span>
                              <span className="text-amber-600 line-through text-lg">
                                ₹{product.regularPrice || 0}
                              </span>
                              {product.discountPercentage && (
                                <span className="text-xs bg-white/30 backdrop-blur-sm text-amber-900 px-3 py-1 rounded-full font-bold shadow-md border border-white/40">
                                  {product.discountPercentage}% OFF
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent text-2xl drop-shadow-sm">
                              ₹{product.basePrice || 0}
                            </span>
                          )}
                        </div>

                        {/* Glass Add to Cart Button */}
                        <Button
                          size="lg"
                          className="group/btn w-full bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40 text-amber-900 rounded-2xl transition-all duration-500 font-bold py-4 shadow-lg hover:shadow-xl relative overflow-hidden"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Add to cart:", product);
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                          <span className="relative flex items-center justify-center gap-2">
                            <ShoppingCart className="h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                            Add to Cart
                          </span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Glass Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex -left-6 w-14 h-14 bg-white/30 backdrop-blur-md border-2 border-white/40 text-amber-800 hover:bg-white/40 hover:text-amber-900 hover:border-white/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-110" />
            <CarouselNext className="hidden md:flex -right-6 w-14 h-14 bg-white/30 backdrop-blur-md border-2 border-white/40 text-amber-800 hover:bg-white/40 hover:text-amber-900 hover:border-white/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-110" />
          </Carousel>
        </div>

        {/* Glass View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <Button
                variant="outline"
                className="relative border-2 border-white/40 bg-white/20 backdrop-blur-md text-amber-900 hover:bg-white/30 hover:text-amber-900 hover:border-white/50 px-12 py-6 rounded-2xl transition-all duration-500 font-bold text-lg shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  View All Products
                  <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Quick View Dialog */}
        <ProductQuickView
          product={quickViewProduct}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
