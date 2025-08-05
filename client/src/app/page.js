"use client";

import { useState, useEffect } from "react";

import { fetchApi } from "@/lib/utils";

import { Star, Users, Award, Shield, Truck } from "lucide-react";

import { motion } from "framer-motion";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroCarousel from "@/components/HeroCarousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Headtext from "@/components/ui/headtext";

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
        "Get your supplements delivered to your doorstep within 2-3 business days. Shop for ₹999+ and receive a scratch card with exciting rewards! across India.",
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
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 border border-gray-200 mb-6 shadow-lg">
            <Star className="w-5 h-5 text-[#b99b2f]" />
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
              <div className="bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-[#b99b2f]/10 to-[#aa2e2e]/10 text-[#aa2e2e] flex items-center justify-center mx-auto mb-6 group-hover:from-[#b99b2f]/20 group-hover:to-[#aa2e2e]/20 transition-colors duration-300 shadow-lg border border-[#b99b2f]/20">
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

// Modern Testimonials Section with API call
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetchApi("/public/testimonials");
        if (response?.data?.testimonials) {
          setTestimonials(response.data.testimonials);
        } else {
          // Fallback testimonials if API doesn't return data
          setTestimonials([
            {
              id: 1,
              name: "Yatharth S.",
              role: "Bodybuilding Gold Medalist",
              quote:
                "Genuine Nutrition products are always authentic and delivery is super quick. Highly recommended!",
              rating: 5,
              verified: true,
            },
            {
              id: 2,
              name: "Pratik G.",
              role: "Rowing Athlete",
              quote:
                "Been a customer for 2 years. Never disappointed with quality or service.",
              rating: 4.5,
              verified: true,
            },
            {
              id: 3,
              name: "Monika L.",
              role: "Fitness Influencer",
              quote:
                "Shipping is fast and the supplements are genuine. Trustworthy site!",
              rating: 5,
              verified: true,
            },
            {
              id: 4,
              name: "Amit K.",
              role: "Gym Trainer",
              quote:
                "My clients and I both use Genuine Nutrition. Great results every time.",
              rating: 5,
              verified: true,
            },
            {
              id: 5,
              name: "Sneha P.",
              role: "Yoga Coach",
              quote:
                "Clean ingredients and good offers. I always buy from here.",
              rating: 4,
              verified: true,
            },
            {
              id: 6,
              name: "Rohit S.",
              role: "Sports Nutritionist",
              quote: "Customer support is helpful and products are top-notch.",
              rating: 5,
              verified: true,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback testimonials on error
        setTestimonials([
          {
            id: 1,
            name: "Yatharth S.",
            role: "Bodybuilding Gold Medalist",
            quote:
              "Genuine Nutrition products are always authentic and delivery is super quick. Highly recommended!",
            rating: 5,
            verified: true,
          },
          {
            id: 2,
            name: "Pratik G.",
            role: "Rowing Athlete",
            quote:
              "Been a customer for 2 years. Never disappointed with quality or service.",
            rating: 4.5,
            verified: true,
          },
          {
            id: 3,
            name: "Monika L.",
            role: "Fitness Influencer",
            quote:
              "Shipping is fast and the supplements are genuine. Trustworthy site!",
            rating: 5,
            verified: true,
          },
          {
            id: 4,
            name: "Amit K.",
            role: "Gym Trainer",
            quote:
              "My clients and I both use Genuine Nutrition. Great results every time.",
            rating: 5,
            verified: true,
          },
          {
            id: 5,
            name: "Sneha P.",
            role: "Yoga Coach",
            quote: "Clean ingredients and good offers. I always buy from here.",
            rating: 4,
            verified: true,
          },
          {
            id: 6,
            name: "Rohit S.",
            role: "Sports Nutritionist",
            quote: "Customer support is helpful and products are top-notch.",
            rating: 5,
            verified: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from fitness enthusiasts who trust Galaxy Labs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 shadow-md animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 w-20"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 border border-gray-200 mb-6 shadow-lg">
            <Star className="w-5 h-5 text-[#b99b2f]" />
            <span className="text-gray-700 font-bold text-sm uppercase tracking-wider">
              Customer Reviews
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Real feedback from fitness enthusiasts who trust Galaxy Labs
          </p>
        </motion.div>

        <div className="relative">
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id || index}
                  className="md:basis-1/3 px-2"
                >
                  <div className="bg-white shadow-md p-6 flex flex-col h-full justify-between border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#aa2e2e]/80 text-white font-bold text-lg mr-3">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base text-gray-900 mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1">
                          {testimonial.role}
                        </p>
                        {testimonial.verified && (
                          <div className="flex items-center text-green-600 text-xs font-medium">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="white"
                              />
                              <path
                                d="M9 12l2 2l4-4"
                                stroke="green"
                                strokeWidth="2"
                                fill="none"
                              />
                            </svg>
                            Verified customer
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => {
                        const isHalf = testimonial.rating - i === 0.5;
                        return (
                          <span key={i}>
                            {isHalf ? (
                              <svg
                                className="w-4 h-4 text-[#b99b2f] inline"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <defs>
                                  <linearGradient id={`half${index}${i}`}>
                                    <stop offset="50%" stopColor="#b99b2f" />
                                    <stop
                                      offset="50%"
                                      stopColor="white"
                                      stopOpacity="1"
                                    />
                                  </linearGradient>
                                </defs>
                                <path
                                  fill={`url(#half${index}${i})`}
                                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
                                />
                              </svg>
                            ) : (
                              <Star
                                className={`h-4 w-4 ${
                                  i < Math.floor(testimonial.rating)
                                    ? "text-[#b99b2f] fill-[#b99b2f]"
                                    : "text-gray-300"
                                }`}
                              />
                            )}
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 shadow" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 shadow" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products by different types
    const fetchData = async () => {
      try {
        setProductsLoading(true);

        // Fetch products by different types
        const [featuredRes, latestRes, bestsellerRes, trendingRes, newRes] =
          await Promise.allSettled([
            fetchApi("/public/products?featured=true&limit=8"),
            fetchApi("/public/products?latest=true&limit=8"),
            fetchApi("/public/products?bestseller=true&limit=8"),
            fetchApi("/public/products?trending=true&limit=8"),
            fetchApi("/public/products?new=true&limit=8"),
          ]);

        // Set featured products
        if (featuredRes.status === "fulfilled") {
          setFeaturedProducts(featuredRes.value?.data?.products || []);
        }

        // Set latest products
        if (latestRes.status === "fulfilled") {
          setLatestProducts(latestRes.value?.data?.products || []);
        }

        // Set bestseller products
        if (bestsellerRes.status === "fulfilled") {
          setBestsellerProducts(bestsellerRes.value?.data?.products || []);
        }

        // Set trending products
        if (trendingRes.status === "fulfilled") {
          setTrendingProducts(trendingRes.value?.data?.products || []);
        }

        // Set new products
        if (newRes.status === "fulfilled") {
          setNewProducts(newRes.value?.data?.products || []);
        }
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
    <div>
      <HeroCarousel />

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-5 md:py-6 my-3 md:my-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Headtext text="FEATURED PRODUCTS" />
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                High-quality supplements to enhance your fitness journey
              </p>
            </div>

            <FeaturedProducts
              products={featuredProducts}
              isLoading={productsLoading}
              error={error}
            />
          </div>
        </section>
      )}

      {/* Latest Products Section */}
      {latestProducts.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Headtext text="LATEST PRODUCTS" />
              <p className="text-gray-600 my-6 max-w-2xl mx-auto">
                Discover our newest additions to the collection
              </p>
            </div>

            <FeaturedProducts
              products={latestProducts}
              isLoading={productsLoading}
              error={error}
            />
          </div>
        </section>
      )}

      {/* Bestseller Products Section */}
      {bestsellerProducts.length > 0 && (
        <section className="py-5 md:py-6 my-3 md:my-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Headtext text="BEST SELLERS" />
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Our most popular products loved by customers
              </p>
            </div>

            <FeaturedProducts
              products={bestsellerProducts}
              isLoading={productsLoading}
              error={error}
            />
          </div>
        </section>
      )}

      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <section className="py-5 md:py-6 my-3 md:my-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Headtext text="TRENDING NOW" />
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Products that are currently trending in the fitness community
              </p>
            </div>

            <FeaturedProducts
              products={trendingProducts}
              isLoading={productsLoading}
              error={error}
            />
          </div>
        </section>
      )}

      {/* New Products Section */}
      {newProducts.length > 0 && (
        <section className="py-5 md:py-6 my-3 md:my-4 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Headtext text="NEW ARRIVALS" />
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                Fresh products just added to our collection
              </p>
            </div>

            <FeaturedProducts
              products={newProducts}
              isLoading={productsLoading}
              error={error}
            />
          </div>
        </section>
      )}

      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
}
