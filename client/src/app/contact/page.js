"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Send,
  MessageCircle,
  Users,
  HeadphonesIcon,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    async function fetchContactInfo() {
      setLoading(true);
      try {
        const response = await fetchApi("/content/contact");
        setContactInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await fetchApi("/content/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success(response.data.message || "Your message has been sent!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f01c33]/5 via-white to-[#c4ab66]/5 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <main className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-full mb-6 shadow-2xl relative">
                <MessageCircle className="h-10 w-10 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#c4ab66] to-[#f01c33] rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Have a question or need support? Our team is here to help you on
                your fitness journey!
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#c4ab66] fill-current"
                  />
                ))}
                <span className="text-gray-600 ml-2 font-medium">
                  Trusted by 10,000+ customers
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              {/* Contact Form - 3 columns */}
              <div className="md:col-span-3">
                <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                  {/* Glass morphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-4 rounded-2xl mr-4 shadow-lg">
                        <Send className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                          Send us a Message
                        </h2>
                        <p className="text-gray-600">
                          We&apos;ll get back to you within 24 hours
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Your Name <span className="text-[#f01c33]">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your name"
                            className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Email Address{" "}
                            <span className="text-[#f01c33]">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                            className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What is this regarding?"
                            className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Message <span className="text-[#f01c33]">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="How can we help you?"
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group"
                        disabled={formLoading}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {formLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="h-4 w-4" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Contact Information - 2 columns */}
              <div className="md:col-span-2 space-y-6">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-32 mb-4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-10 w-32 mt-6 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-4 rounded-2xl mr-4 shadow-lg">
                            <HeadphonesIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                              Contact Information
                            </h3>
                            <p className="text-gray-600">
                              Reach out to us anytime
                            </p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 p-3 rounded-xl mr-4">
                              <MapPin className="h-5 w-5 text-[#f01c33]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                Address
                              </p>
                              <p className="text-gray-600">
                                {contactInfo?.address ||
                                  "123 Supplement Street, Health City, 400001"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 p-3 rounded-xl mr-4">
                              <Phone className="h-5 w-5 text-[#f01c33]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                Phone
                              </p>
                              <p className="text-gray-600">
                                {contactInfo?.phone || "+91 98765 43210"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 p-3 rounded-xl mr-4">
                              <Mail className="h-5 w-5 text-[#f01c33]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                Email
                              </p>
                              <p className="text-gray-600">
                                {contactInfo?.email ||
                                  "support@powerfitness.com"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 p-3 rounded-xl mr-4">
                              <Clock className="h-5 w-5 text-[#f01c33]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                Business Hours
                              </p>
                              <p className="text-gray-600">
                                {contactInfo?.hours ||
                                  "Monday - Saturday: 10:00 AM - 7:00 PM"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-4 rounded-2xl mr-4 shadow-lg">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                              Follow Us
                            </h3>
                            <p className="text-gray-600">
                              Stay connected with our community
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={
                              contactInfo?.socialLinks?.facebook ||
                              "https://facebook.com/powerfitness"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                            aria-label="Facebook"
                          >
                            <Facebook className="h-5 w-5" />
                          </a>
                          <a
                            href={
                              contactInfo?.socialLinks?.instagram ||
                              "https://instagram.com/powerfitness"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
                            aria-label="Instagram"
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                          <a
                            href={
                              contactInfo?.socialLinks?.twitter ||
                              "https://twitter.com/powerfitness"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-br from-blue-400 to-blue-500 p-3 rounded-xl text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                            aria-label="Twitter"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="mt-12">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-4">
                    Find Us
                  </h3>
                  <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] mb-4 shadow-inner">
                    <iframe
                      src={`https://maps.google.com/maps?q=${
                        contactInfo?.mapCoordinates?.lat || 19.076
                      },${
                        contactInfo?.mapCoordinates?.lng || 72.8777
                      }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      title="Power Fitness Location"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <p className="text-center text-gray-600">
                    Visit our store at{" "}
                    {contactInfo?.address ||
                      "123 Supplement Street, Health City, 400001"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
