"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ChevronRight, Heart, Eye, Sparkles, Zap, StarHalf, Pause, Play } from "lucide-react";
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
// const HeroCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [api, setApi] = useState(null);
//   const [autoplay, setAutoplay] = useState(true);

//   const slides = [
//     {
//       title: "PREMIUM SUPPLEMENTS",
//       subtitle: "Fuel your workouts with high-quality ingredients",
//       cta: "SHOP NOW",
//       ctaLink: "/products",
//     },
//     {
//       title: "ADVANCED PROTEIN FORMULA",
//       subtitle: "30g protein per serving with zero added sugar",
//       cta: "EXPLORE",
//       ctaLink: "/category/protein",
//     },
//   ];

//   // Handle autoplay functionality
//   useEffect(() => {
//     if (!api || !autoplay) return;

//     const interval = setInterval(() => {
//       api.scrollNext();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [api, autoplay]);

//   // Update current slide index when carousel changes
//   useEffect(() => {
//     if (!api) return;

//     const onSelect = () => {
//       setCurrentSlide(api.selectedScrollSnap());
//     };

//     api.on("select", onSelect);

//     return () => {
//       api.off("select", onSelect);
//     };
//   }, [api]);

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Video Background with Gradient Overlay */}
//       <div className="absolute inset-0 w-full h-full z-0">
//         <video
//           className="w-full h-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src="/bg.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
//       </div>

//       <Carousel setApi={setApi} className="h-full relative z-20">
//         <CarouselContent className="h-screen">
//           {slides.map((slide, index) => (
//             <CarouselItem key={index} className="p-0">
//               <div className="relative h-full w-full overflow-hidden flex items-center">
//                 <div className="container mx-auto px-6 lg:px-8">
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     <motion.div
//                       initial={{ opacity: 0, x: -50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.8, delay: 0.2 }}
//                       className="text-left"
//                     >
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="mb-8"
//                       >
//                         <span className="inline-block px-4 py-2 bg-[#C2A861]/10 text-[#C2A861] text-sm font-semibold rounded-full mb-4">
//                           PREMIUM QUALITY
//                         </span>
//                         <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
//                           {slide.title}
//                         </h1>
//                         <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl">
//                           {slide.subtitle}
//                         </p>
//                       </motion.div>

//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.3 }}
//                         className="flex flex-wrap gap-4"
//                       >
//                         <Link href={slide.ctaLink}>
//                           <Button
//                             size="lg"
//                             className="text-lg px-8 py-7 font-bold bg-[#C2A861] text-white hover:bg-[#CAB476] hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-[#C2A861]/20"
//                           >
//                             {slide.cta}
//                             <ChevronRight className="ml-2 h-5 w-5" />
//                           </Button>
//                         </Link>
//                         <Link href="/products">
//                           <Button
//                             size="lg"
//                             variant="outline"
//                             className="text-lg bg-black px-8 py-7 font-bold text-white border-white/20 hover:bg-white/10 hover:border-white transition-all duration-300 rounded-full backdrop-blur-sm"
//                           >
//                             VIEW ALL
//                             <ArrowRight className="ml-2 h-5 w-5" />
//                           </Button>
//                         </Link>
//                       </motion.div>

                  
//                       {/* <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.4 }}
//                         className="mt-12 grid grid-cols-3 gap-8"
//                       >
//                         {[
//                           { label: "Active Users", value: "50K+" },
//                           { label: "Products", value: "100+" },
//                           { label: "Reviews", value: "5000+" },
//                         ].map((stat, idx) => (
//                           <div key={idx} className="text-center">
//                             <div className="text-2xl font-bold text-[#C2A861]">
//                               {stat.value}
//                             </div>
//                             <div className="text-sm text-white/60">
//                               {stat.label}
//                             </div>
//                           </div>
//                         ))}
//                       </motion.div> */}
//                     </motion.div>

                    
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 1 }}
//                       className="hidden lg:block relative"
//                     >
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#C2A861]/20 to-[#F01C33]/20 blur-3xl" />
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-[#C2A861]/20 animate-spin-slow" />
//                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#F01C33]/20 animate-spin-slower" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Custom Navigation Dots */}
//         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => api?.scrollTo(index)}
//               className="group relative"
//             >
//               <div
//                 className={`w-16 h-1 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? "bg-[#C2A861]"
//                     : "bg-white/20 group-hover:bg-white/40"
//                 }`}
//               />
//               <div
//                 className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C2A861] rounded-full text-xs text-white opacity-0 transform -translate-y-2 transition-all duration-300 ${
//                   index === currentSlide ? "opacity-100 translate-y-0" : ""
//                 } group-hover:opacity-100 group-hover:translate-y-0`}
//               >
//                 {index + 1}
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Autoplay Control */}
//         <div className="absolute bottom-12 right-12 z-30">
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-12 h-12 rounded-full border-2 border-[#C2A861] bg-black/20 hover:bg-[#C2A861]/20 backdrop-blur-sm transition-all duration-300"
//             onClick={() => setAutoplay(!autoplay)}
//             aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
//           >
//             {autoplay ? (
//               <span className="w-4 h-4 bg-[#C2A861]" />
//             ) : (
//               <motion.span
//                 animate={{ scale: [1, 1.2, 1] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-[#C2A861]"
//               />
//             )}
//           </Button>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [api, setApi] = useState(null)
  const [autoplay, setAutoplay] = useState(true)

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
  ]

  // Handle autoplay functionality
  useEffect(() => {
    if (!api || !autoplay) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api, autoplay])

  // Update current slide index when carousel changes
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background with Enhanced Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        {/* Multi-layered gradient overlay for better depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#f01c33]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#c4ab66]/10 via-transparent to-transparent z-10" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-15">
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#c4ab66] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-[#f01c33] rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-[#c4ab66] rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-[#f01c33] rounded-full animate-pulse opacity-50"></div>
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
                      className="text-left relative z-30"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                      >
                        {/* Enhanced Premium Badge */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="relative inline-block mb-6"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-xl"></div>
                          <span className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 backdrop-blur-sm border border-[#c4ab66]/30 text-[#c4ab66] text-sm font-bold rounded-full shadow-lg">
                            <Sparkles className="w-4 h-4" />
                            PREMIUM QUALITY
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full animate-pulse"></div>
                          </span>
                        </motion.div>

                        {/* Enhanced Title with Gradient Text */}
                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="text-5xl md:text-7xl lg:text-5xl font-extrabold mb-6 leading-tight"
                        >
                          <span className="bg-gradient-to-r from-white via-[#c4ab66] to-white bg-clip-text text-transparent">
                            {slide.title.split(" ")[0]}
                          </span>
                          <br />
                          <span className="bg-gradient-to-r from-[#f01c33] via-[#c4ab66] to-[#f01c33] bg-clip-text text-transparent">
                            {slide.title.split(" ").slice(1).join(" ")}
                          </span>
                        </motion.h1>

                        {/* Enhanced Subtitle */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-2xl leading-relaxed"
                        >
                          {slide.subtitle}
                        </motion.p>
                      </motion.div>

                      {/* Enhanced CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 mb-12"
                      >
                        <Link href={slide.ctaLink}>
                          <Button
                            size="lg"
                            className="group relative overflow-hidden text-lg px-4 py-5 font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white transition-all duration-500 rounded-2xl shadow-2xl shadow-[#f01c33]/30 hover:shadow-[#c4ab66]/40 hover:scale-105 border-2 border-white/20"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative flex items-center gap-3">
                              <Zap className="w-5 h-5" />
                              {slide.cta}
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </Link>
                        <Link href="/products">
                          <Button
                            size="lg"
                            variant="outline"
                            className="group text-lg px-4 py-5 font-bold text-white border-2 border-white/30 hover:border-[#c4ab66] bg-black/20 hover:bg-[#c4ab66]/10 backdrop-blur-sm transition-all duration-500 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105"
                          >
                            <span className="flex items-center gap-3">
                              <StarHalf className="w-5 h-5" />
                              VIEW ALL
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </Button>
                        </Link>
                      </motion.div>

                      {/* Enhanced Stats Section */}
                      {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
                      >
                        {[
                          { label: "Active Users", value: "50K+", color: "from-[#f01c33] to-[#f01c33]/80" },
                          { label: "Products", value: "100+", color: "from-[#c4ab66] to-[#c4ab66]/80" },
                          { label: "Reviews", value: "5000+", color: "from-[#f01c33] to-[#c4ab66]" },
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                            className="text-center group"
                          >
                            <div
                              className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-white/70 font-medium mt-1">{stat.label}</div>
                          </motion.div>
                        ))}
                      </motion.div> */}
                    </motion.div>

                    {/* Enhanced Right Side Animation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="hidden lg:block relative"
                    >
                      {/* Multiple animated rings with brand colors */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#f01c33]/10 via-[#c4ab66]/15 to-[#f01c33]/10 blur-3xl animate-pulse"></div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-[#f01c33]/30 animate-spin-slow">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full shadow-lg"></div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-[#c4ab66]/40 animate-spin-slower">
                        <div className="absolute bottom-4 right-1/2 translate-x-1/2 w-3 h-3 bg-[#c4ab66] rounded-full shadow-lg animate-bounce"></div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-[#f01c33]/50 animate-spin">
                        <div className="absolute top-1/2 -right-2 w-6 h-6 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full shadow-xl"></div>
                      </div>

                      {/* Central glowing orb */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-[#f01c33] via-[#c4ab66] to-[#f01c33] rounded-full shadow-2xl animate-pulse">
                        <div className="absolute inset-2 bg-gradient-to-r from-[#c4ab66] to-[#f01c33] rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-[#f01c33] animate-pulse" />
                        </div>
                      </div>

                      {/* Floating elements */}
                      <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute top-20 right-20 w-8 h-8 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full shadow-lg opacity-80"
                      ></motion.div>

                      <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute bottom-20 left-20 w-6 h-6 bg-[#c4ab66] rounded-full shadow-lg opacity-70"
                      ></motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6">
          {slides.map((_, index) => (
            <button key={index} onClick={() => api?.scrollTo(index)} className="group relative">
              <div
                className={`w-20 h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] shadow-lg shadow-[#f01c33]/50"
                    : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
              <div
                className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-2xl text-sm text-white font-bold opacity-0 transform -translate-y-2 transition-all duration-300 shadow-xl ${
                  index === currentSlide ? "opacity-100 translate-y-0" : ""
                } group-hover:opacity-100 group-hover:translate-y-0`}
              >
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {index + 1}
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#f01c33]"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Autoplay Control */}
        <div className="absolute bottom-12 right-12 z-30">
          <Button
            variant="outline"
            size="sm"
            className="group w-16 h-16 rounded-full border-2 border-[#c4ab66] bg-black/30 hover:bg-gradient-to-r hover:from-[#f01c33]/20 hover:to-[#c4ab66]/20 backdrop-blur-sm transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-110"
            onClick={() => setAutoplay(!autoplay)}
            aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
          >
            <div className="relative">
              {autoplay ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center"
                >
                  <Pause  className="w-6 h-6 text-[#c4ab66] group-hover:text-white transition-colors duration-300" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="flex items-center justify-center"
                >
                  <Play className="w-6 h-6 text-[#f01c33] group-hover:text-white transition-colors duration-300 ml-1" />
                </motion.div>
              )}
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#f01c33] to-[#c4ab66] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#f01c33] to-[#c4ab66]"
            initial={{ width: "0%" }}
            animate={{ width: autoplay ? "100%" : "0%" }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </Carousel>
    </div>
  )
}



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

    <>
      <HeroCarousel />
      <AnnouncementBanner />

      <FeaturedCategoriesSection />
      {featuredProducts.length > 0 && (
        <section className="py-20  relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" 
             
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
          

            <FeaturedProducts
              products={featuredProducts}
              isLoading={productsLoading}
              error={error}
            />

           
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
    </>
   
  );
}
