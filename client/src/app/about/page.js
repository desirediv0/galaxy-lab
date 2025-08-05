"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const certifications = [
    "ISO 22000:2018 Certified",
    "FSSAI Licensed",
    "GMP Certified",
    "HACCP Compliant",
    "Organic Certified",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            🏆 India&apos;s Most Trusted Nutrition Brand
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            About GalaxyLabs
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Transforming lives through premium nutritional supplements, backed
            by science and trusted by fitness enthusiasts across India since
            2015.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Badge variant="outline" className="mb-4">
                  Our Journey
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                  From Passion to Purpose
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-primary">Founded in 2015</strong>,
                    GalaxyLabs was born from a personal struggle with finding
                    authentic, effective supplements in the Indian market. Our
                    founder, Rahul Sharma, after years of disappointment with
                    substandard products, decided to create the change he wanted
                    to see.
                  </p>
                  <p>
                    What started as a small operation in a garage has now grown
                    into
                    <strong className="text-primary">
                      {" "}
                      India&apos;s most trusted supplement brand
                    </strong>
                    , serving over 50,000 satisfied customers nationwide.
                  </p>
                  <p>
                    Today, we operate state-of-the-art manufacturing facilities,
                    maintain the highest quality standards, and continue to
                    innovate with products that are scientifically formulated
                    and rigorously tested.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4">
                    <div className="text-primary font-bold text-xl">2015</div>
                    <div className="text-sm text-gray-600">Company Founded</div>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <div className="text-primary font-bold text-xl">2018</div>
                    <div className="text-sm text-gray-600">
                      First Manufacturing Unit
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <div className="text-primary font-bold text-xl">2021</div>
                    <div className="text-sm text-gray-600">
                      Pan-India Expansion
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <div className="text-primary font-bold text-xl">2024</div>
                    <div className="text-sm text-gray-600">50K+ Customers</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="relative h-[500px] overflow-hidden shadow">
                  <Image
                    src="/images/about-story.jpg"
                    alt="GalaxyLabs founder and manufacturing facility"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating testimonial card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow max-w-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center">
                      ⭐
                    </div>
                    <div>
                      <div className="font-semibold">Trusted by Athletes</div>
                      <div className="text-sm text-gray-600">
                        Professional endorsements
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
              Our Mission & Vision
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/10 p-8 ">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Our Mission
                </h3>
                <p className="text-lg opacity-90 leading-relaxed text-gray-300">
                  To democratize access to premium nutrition by providing
                  scientifically-backed, affordable supplements that help every
                  Indian achieve their fitness goals.
                </p>
              </div>
              <div className="bg-white/10 p-8">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Our Vision
                </h3>
                <p className="text-lg opacity-90 leading-relaxed text-gray-300">
                  To become the most trusted nutrition brand globally, setting
                  new standards for quality, transparency, and customer
                  satisfaction in the wellness industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                What Drives Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every product
                we create
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 shadow hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  Uncompromising Quality
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Every batch undergoes rigorous third-party testing. We
                  maintain ISO 22000:2018 certification and follow
                  pharmaceutical-grade manufacturing processes.
                </p>
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="text-xs">
                    GMP Certified
                  </Badge>
                </div>
              </div>

              <div className="bg-white p-8 shadow hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  Complete Transparency
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Full ingredient disclosure, manufacturing details, and test
                  reports available. No hidden fillers, no proprietary blends -
                  just honest nutrition.
                </p>
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="text-xs">
                    Lab Tested
                  </Badge>
                </div>
              </div>

              <div className="bg-white p-8 shadow hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  Customer Obsession
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Your goals become our goals. Free nutrition consultations,
                  30-day money-back guarantee, and lifetime customer support for
                  every purchase.
                </p>
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="text-xs">
                    24/7 Support
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
              Certified Excellence
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm py-2 px-4"
                >
                  ✓ {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
