"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]"></div>
      </div>

      {/* Animated Background Gradients */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(202, 180, 118, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(240, 28, 51, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(202, 180, 118, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      />

      {/* Floating Supplement Elements */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#CAB476] to-[#F01C33] rounded-2xl shadow-2xl flex items-center justify-center"
      >
        <span className="text-2xl">💪</span>
      </motion.div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.3,
        }}
        className="absolute top-1/4 right-20 w-16 h-16 bg-gradient-to-br from-[#F01C33] to-[#CAB476] rounded-xl shadow-xl flex items-center justify-center"
      >
        <span className="text-xl">🏋️</span>
      </motion.div>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.6,
        }}
        className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-[#CAB476]/70 to-[#F01C33]/70 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm"
      >
        <span className="text-sm">⚡</span>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-gradient-to-r from-[#F01C33] to-[#CAB476] text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-lg backdrop-blur-sm border border-white/20">
                🔥 LIMITED TIME OFFER
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-[#CAB476] to-[#CAB476]/80 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your{" "}
              <span className="bg-gradient-to-r from-[#F01C33] to-[#F01C33]/80 bg-clip-text text-transparent">
                Workout
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl text-white/90"
              >
                Unleash Your Potential
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Premium supplements engineered to maximize your gains, boost
              performance, and accelerate recovery. Fueled by science, proven by
              results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link href="/shop" className="inline-block">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#CAB476] to-[#F01C33] text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-[#CAB476]/25 transition-all duration-300 border border-white/10"
                >
                  SHOP BESTSELLERS
                </motion.button>
              </Link>
              <Link href="/deals" className="inline-block">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    backgroundColor: "rgba(202, 180, 118, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-[#CAB476] text-[#CAB476] font-bold py-4 px-8 rounded-2xl hover:bg-[#CAB476] hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
                >
                  VIEW DEALS
                </motion.button>
              </Link>
            </motion.div>

            {/* Enhanced Supplement Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {[
                { name: "Muscle Growth", icon: "💪" },
                { name: "Pre-Workout", icon: "⚡" },
                { name: "Recovery", icon: "🔄" },
                { name: "Fat Burner", icon: "🔥" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gray-800/60 backdrop-blur-sm px-4 py-3 rounded-2xl border border-[#CAB476]/30 text-sm text-[#CAB476] shadow-lg hover:border-[#CAB476]/50 transition-all duration-300 flex items-center gap-2"
                >
                  <span>{item.icon}</span>
                  {item.name}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-[#CAB476]/10 to-[#F01C33]/10 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
              <Image
                src="/c3.jpg"
                alt="Supplement Stack"
                fill
                className="object-contain p-8"
                priority
              />

              {/* Enhanced Discount Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 1, duration: 0.8 }}
                className="absolute top-4 right-4 sm:right-8 bg-gradient-to-r from-[#F01C33] to-[#F01C33]/90 text-white text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center backdrop-blur-sm border border-white/20"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2 text-lg"
                >
                  🔥
                </motion.span>
                FLASH SALE
              </motion.div>

              {/* Floating Price Tag */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-[#CAB476] to-[#CAB476]/90 text-white font-bold px-4 py-2 rounded-xl shadow-lg"
              >
                From $29.99
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-gradient-to-r from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-lg py-6 border-t border-[#CAB476]/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "Lab Tested", label: "Quality Assurance", icon: "🧪" },
              { value: "Fast Shipping", label: "Free Over $50", icon: "🚀" },
              { value: "24/7", label: "Expert Support", icon: "💬" },
              { value: "60-Day", label: "Money Back Guarantee", icon: "✅" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-[#CAB476]/10 hover:border-[#CAB476]/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-lg font-bold bg-gradient-to-r from-[#CAB476] to-[#F01C33] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
