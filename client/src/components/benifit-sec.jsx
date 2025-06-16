"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Truck,
  Users,
  Shield,
  Star,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

const BenefitsSec = () => {
  const benefits = [
    {
      title: "Premium Quality",
      description:
        "Lab-tested supplements made with high-quality ingredients for maximum effectiveness.",
      icon: <Award className="w-8 h-8" />,
      gradient: "from-[#f01c33] to-[#c4ab66]",
    },
    {
      title: "Fast Delivery",
      description:
        "Get your supplements delivered to your doorstep within 2-3 business days.",
      icon: <Truck className="w-8 h-8" />,
      gradient: "from-[#c4ab66] to-[#f01c33]",
    },
    {
      title: "Expert Support",
      description:
        "Our team of fitness experts is available to help you choose the right supplements.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-[#f01c33] to-[#c4ab66]",
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence with our 100% secure payment gateway.",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-[#c4ab66] to-[#f01c33]",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-[#c4ab66] to-[#f01c33] rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#f01c33] rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#c4ab66] rounded-full animate-pulse"></div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f01c33 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#c4ab66]/20 mb-8"
          >
            <Star className="w-5 h-5 text-[#f01c33]" />
            <span className="text-[#f01c33] font-bold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <Sparkles className="w-5 h-5 text-[#c4ab66]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=" md:text-4xl lg:text-5xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-gray-900 via-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              Excellence {}
            </span>
            
            <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              Delivered
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mx-auto mb-8 shadow-lg"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            We&apos;re committed to providing you with the best fitness
            supplements and an exceptional experience that exceeds your
            expectations
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Enhanced Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-3xl transition-all duration-500 hover:border-[#c4ab66]/50 hover:shadow-2xl hover:scale-105 group-hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Enhanced Icon */}
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${benefit.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-500`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {benefit.icon}
                    </motion.div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-[#f01c33] bg-clip-text text-transparent group-hover:from-[#f01c33] group-hover:to-[#c4ab66] transition-all duration-500">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Enhanced Image and Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative group">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/20 to-[#c4ab66]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <Image
                  width={1000}
                  height={1000}
                  src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1000"
                  alt="Fitness supplements"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                  >
                    The Highest Quality for Your{" "}
                    <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                      Fitness Journey
                    </span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-gray-200 mb-8 text-lg leading-relaxed"
                  >
                    We carefully source and formulate each product to ensure you
                    get the best results for your fitness goals.
                  </motion.p>

                  <Link href="/about">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white font-bold rounded-2xl transition-all duration-500 inline-flex items-center w-fit shadow-lg hover:shadow-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative flex items-center gap-3">
                        Learn More
                        <TrendingUp className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
              className="group relative"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-6 md:p-8 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-3xl transition-all duration-500 hover:border-[#c4ab66]/50 hover:shadow-2xl hover:scale-105 group-hover:-translate-y-2 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-2xl text-[#f01c33] group-hover:from-[#f01c33] group-hover:to-[#c4ab66] group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>

                <motion.h4
                  className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h4>

                <p className="text-gray-600 uppercase tracking-wider text-sm font-bold group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSec;
