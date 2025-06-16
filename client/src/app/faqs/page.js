"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  Filter,
  MessageCircle,
  Mail,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    async function fetchFAQs() {
      setLoading(true);
      try {
        const response = await fetchApi("/faqs");

        // Handle various possible response formats
        let faqsData = [];
        if (response?.data?.faqs && Array.isArray(response.data.faqs)) {
          faqsData = response.data.faqs;
        } else if (Array.isArray(response?.data)) {
          faqsData = response.data;
        } else if (response?.data?.data && Array.isArray(response.data.data)) {
          faqsData = response.data.data;
        }

        setFaqs(faqsData);
        setFilteredFaqs(faqsData);

        // Fetch categories
        const categoriesResponse = await fetchApi("/faqs/categories");

        let categoriesData = [];
        if (categoriesResponse?.data?.categories) {
          categoriesData = categoriesResponse.data.categories;
        } else if (Array.isArray(categoriesResponse?.data)) {
          categoriesData = categoriesResponse.data;
        } else if (
          categoriesResponse?.data?.data &&
          Array.isArray(categoriesResponse.data.data)
        ) {
          categoriesData = categoriesResponse.data.data;
        }

        if (categoriesData.length) {
          setCategories(["all", ...categoriesData.map((cat) => cat.name)]);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  // Filter FAQs based on search query and category
  useEffect(() => {
    if (!faqs.length) return;

    let filtered = faqs;

    // Filter by category if not "all"
    if (activeCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    // Sort by order (ascending)
    filtered = [...filtered].sort((a, b) => a.order - b.order);

    setFilteredFaqs(filtered);
  }, [searchQuery, activeCategory, faqs]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f01c33]/5 via-white to-[#c4ab66]/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-10 mx-auto" />

            <Skeleton className="h-12 w-full mb-8" />

            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border rounded-md p-2">
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f01c33]/5 via-white to-[#c4ab66]/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-2xl mb-8 shadow-xl">
                <HelpCircle className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Find answers to common questions about our products, ordering,
                shipping, and more.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 h-14 rounded-2xl border-2 border-gray-200 focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="h-5 w-5 text-[#c4ab66]" />
                </div>
              </div>
            </div>

            {/* Category filters */}
            {categories.length > 1 && (
              <div className="mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-[#f01c33] mr-2" />
                      <span className="text-sm font-semibold text-gray-700">
                        Filter by category
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 shadow-lg ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white shadow-xl transform scale-105"
                          : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-white/20 hover:border-[#f01c33]/30 hover:bg-[#f01c33]/5"
                      }`}
                    >
                      {category === "all" ? "All Questions" : category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion */}
            {filteredFaqs.length > 0 ? (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id.toString()}
                      className={`${
                        index !== filteredFaqs.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <AccordionTrigger className="text-lg font-semibold py-8 px-8 hover:no-underline hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#c4ab66]/5 transition-all duration-200 text-left">
                        <span className="flex items-start">
                          <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0 shadow-lg">
                            {index + 1}
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-8 pt-2 text-gray-600 leading-relaxed">
                        <div className="ml-12 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-xl p-6 border border-[#f01c33]/10">
                          <div
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="text-center py-16 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-2xl font-bold mb-3 text-gray-800">
                  No FAQs found for &quot;{searchQuery}&quot;
                </p>
                <span className="text-gray-600 text-lg">
                  Try a different search term or{" "}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-[#f01c33] hover:text-[#c4ab66] font-semibold underline"
                  >
                    view all FAQs
                  </button>
                </span>
              </div>
            )}

            {/* Contact section */}
            <div className="mt-16 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-10 rounded-3xl text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-8 shadow-lg">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Still have questions?
                </h2>
                <p className="text-white/90 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                  Can&apos;t find the answer you&apos;re looking for? Our
                  support team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/contact">
                    <Button className="bg-white text-[#f01c33] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Us
                    </Button>
                  </a>
                  <a href="mailto:support@powerfitness.com">
                    <Button
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-[#f01c33] px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email Support
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
