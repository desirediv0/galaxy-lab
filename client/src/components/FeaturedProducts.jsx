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
import { Star, Eye, Heart, ShoppingCart } from "lucide-react";
import ProductQuickView from "./ProductQuickView";
import { motion } from "framer-motion";

const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-100 w-full"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="h-10 bg-gray-200 rounded-xl"></div>
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
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500">Failed to load products</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
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

        {/* Products Carousel */}
        <div className="relative px-2 md:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id || product.slug || Math.random().toString()}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group relative h-full flex flex-col border border-gray-100">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Link href={`/products/${product.slug || ""}`}>
                        <Image
                          src={product.image || "/product-placeholder.jpg"}
                          alt={product.name || "Product"}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </Link>

                      {/* Sale Badge */}
                      {product.hasSale && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          SALE
                        </span>
                      )}

                      {/* Action Icons */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-sm transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Wishlist:", product);
                          }}
                        >
                          <Heart className="h-4 w-4 text-gray-700" />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full shadow-sm transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            setQuickViewProduct(product);
                            setQuickViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-grow flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3"
                              fill={
                                i < Math.round(product.avgRating || 0)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviewCount || 0})
                        </span>
                      </div>

                      {/* Product Name */}
                      <Link
                        href={`/products/${product.slug || ""}`}
                        className="block mb-2"
                      >
                        <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name || "Product"}
                        </h3>
                      </Link>

                      {/* Price */}
                      <div className="mt-auto">
                        {product.hasSale ? (
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-primary text-lg">
                              ₹{product.basePrice || 0}
                            </span>
                            <span className="text-gray-400 line-through text-sm">
                              ₹{product.regularPrice || 0}
                            </span>
                            {product.discountPercentage && (
                              <span className="text-xs bg-red-50 text-red-500 px-1.5 py-0.5 rounded">
                                {product.discountPercentage}% OFF
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="font-bold text-primary text-lg">
                            ₹{product.basePrice || 0}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        size="sm"
                        className="w-full mt-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Add to cart:", product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary transition-all" />
            <CarouselNext className="hidden md:flex -right-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary transition-all" />
          </Carousel>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-lg transition-all"
            >
              View All Products
            </Button>
          </Link>
        </div>

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
