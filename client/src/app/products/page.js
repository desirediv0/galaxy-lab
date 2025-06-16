"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Star,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  AlertCircle,
  Search,
  Heart,
  Eye,
  ShoppingCart,
  Sparkles,
  Grid3X3,
  List,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import ProductQuickView from "@/components/ProductQuickView";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Enhanced Product Card Skeleton
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse border border-gray-100">
      <div className="h-72 w-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent"></div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto"></div>
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-2/3 mx-auto"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(1000);

  const [filters, setFilters] = useState({
    search: searchQuery,
    category: categorySlug,
    flavor: "",
    weight: "",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt",
    order: "desc",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const { addToCart } = useCart();
  const [debugMode, setDebugMode] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        queryParams.append("page", pagination.page);
        queryParams.append("limit", pagination.limit);

        const validSortFields = ["createdAt", "updatedAt", "name", "featured"];
        let sortField = filters.sort;

        if (!validSortFields.includes(sortField)) {
          sortField = "createdAt";
          console.warn(
            `Invalid sort field: ${filters.sort}, using createdAt instead`
          );
        }

        queryParams.append("sort", sortField);
        queryParams.append("order", filters.order);

        if (filters.search) queryParams.append("search", filters.search);
        if (filters.category) queryParams.append("category", filters.category);
        if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
        if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

        if (selectedFlavors.length > 0) {
          queryParams.append("flavor", selectedFlavors[0]);
        }

        if (selectedWeights.length > 0) {
          queryParams.append("weight", selectedWeights[0]);
        }

        const response = await fetchApi(
          `/public/products?${queryParams.toString()}`
        );

        let filteredProducts = response.data.products || [];

        if (
          selectedFlavors.length > 0 &&
          selectedWeights.length > 0 &&
          filteredProducts.length > 0
        ) {
          const productsWithExactMatch = [];

          for (const product of filteredProducts) {
            try {
              const detailResponse = await fetchApi(
                `/public/products/${product.slug}`
              );
              const detailedProduct = detailResponse.data.product;

              const hasMatchingVariant = detailedProduct.variants.some(
                (variant) =>
                  variant.flavor?.id === selectedFlavors[0] &&
                  variant.weight?.id === selectedWeights[0]
              );

              if (hasMatchingVariant) {
                productsWithExactMatch.push(product);
              }
            } catch (err) {
              console.error(
                `Error fetching details for product ${product.slug}:`,
                err
              );
            }
          }

          filteredProducts = productsWithExactMatch;
          setPagination({
            ...response.data.pagination,
            total: productsWithExactMatch.length,
          });
        } else {
          setPagination(response.data.pagination || {});
        }

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters,
    pagination.page,
    pagination.limit,
    selectedFlavors,
    selectedWeights,
  ]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesRes, flavorsRes, weightsRes] = await Promise.all([
          fetchApi("/public/categories"),
          fetchApi("/public/flavors"),
          fetchApi("/public/weights"),
        ]);

        setCategories(categoriesRes.data.categories || []);
        setFlavors(flavorsRes.data.flavors || []);
        setWeights(weightsRes.data.weights || []);
      } catch (err) {
        console.error("Error fetching filter options:", err);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    setPriceRange([
      filters.minPrice ? Number.parseInt(filters.minPrice) : 0,
      filters.maxPrice ? Number.parseInt(filters.maxPrice) : maxPossiblePrice,
    ]);
  }, [filters.minPrice, filters.maxPrice, maxPossiblePrice]);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const response = await fetchApi("/public/products/max-price");
        const maxPrice = response.data.maxPrice || 1000;
        setMaxPossiblePrice(Math.ceil(maxPrice / 100) * 100);
      } catch (err) {
        console.error("Error fetching max price:", err);
        setMaxPossiblePrice(1000);
      }
    };

    fetchMaxPrice();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(`Error loading products. Please try again.`);
    }
  }, [error]);

  const handleFilterChange = (name, value) => {
    if ((name === "minPrice" || name === "maxPrice") && value !== "") {
      const numValue = Number.parseFloat(value);
      if (isNaN(numValue)) {
        return;
      }
      value = numValue.toString();
    }

    setFilters((prev) => ({ ...prev, [name]: value }));

    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }

    if (
      mobileFiltersOpen &&
      window.innerWidth < 768 &&
      name !== "minPrice" &&
      name !== "maxPrice" &&
      name !== "search"
    ) {
      setMobileFiltersOpen(false);
    }
  };

  const handleFlavorChange = (flavorId) => {
    const isAlreadySelected = selectedFlavors.includes(flavorId);

    if (isAlreadySelected) {
      const updatedFlavors = selectedFlavors.filter((id) => id !== flavorId);
      setSelectedFlavors(updatedFlavors);
      handleFilterChange(
        "flavor",
        updatedFlavors.length > 0 ? updatedFlavors[0] : ""
      );
    } else {
      setSelectedFlavors([flavorId]);
      handleFilterChange("flavor", flavorId);
    }
  };

  const handleWeightChange = (weightId) => {
    const isAlreadySelected = selectedWeights.includes(weightId);

    if (isAlreadySelected) {
      const updatedWeights = selectedWeights.filter((id) => id !== weightId);
      setSelectedWeights(updatedWeights);
      handleFilterChange(
        "weight",
        updatedWeights.length > 0 ? updatedWeights[0] : ""
      );
    } else {
      setSelectedWeights([weightId]);
      handleFilterChange("weight", weightId);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      flavor: "",
      weight: "",
      minPrice: "",
      maxPrice: "",
      sort: "createdAt",
      order: "desc",
    });

    setSelectedFlavors([]);
    setSelectedWeights([]);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "newest":
        handleFilterChange("sort", "createdAt");
        handleFilterChange("order", "desc");
        break;
      case "oldest":
        handleFilterChange("sort", "createdAt");
        handleFilterChange("order", "asc");
        break;
      case "price-low":
        handleFilterChange("sort", "createdAt");
        handleFilterChange("order", "asc");
        break;
      case "price-high":
        handleFilterChange("sort", "createdAt");
        handleFilterChange("order", "desc");
        break;
      case "name-asc":
        handleFilterChange("sort", "name");
        handleFilterChange("order", "asc");
        break;
      case "name-desc":
        handleFilterChange("sort", "name");
        handleFilterChange("order", "desc");
        break;
      default:
        break;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = async (product) => {
    try {
      if (!product || !product.variants || product.variants.length === 0) {
        const response = await fetchApi(
          `/public/products/${product.id}/variants`
        );
        const variants = response.data.variants || [];

        if (variants.length === 0) {
          toast.error("This product is currently not available");
          return;
        }

        const variantId = variants[0].id;
        await addToCart(variantId, 1);
        toast.success(`${product.name} added to cart`);
      } else {
        const variantId = product.variants[0].id;
        await addToCart(variantId, 1);
        toast.success(`${product.name} added to cart`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");
    }
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#f01c33] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[400px] mb-16 rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/banner-background.jpg"
            alt="Premium Supplements"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/90 via-[#f01c33]/70 to-[#c4ab66]/60 flex flex-col justify-center px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-6">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  Premium Quality
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                PREMIUM
                <br />
                <span className="bg-gradient-to-r from-white to-[#c4ab66] bg-clip-text text-transparent">
                  SUPPLEMENTS
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Fuel your performance with premium quality supplements designed
                for champions
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile filter toggle */}
        <div className="md:hidden flex items-center justify-between mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
            Products
          </h1>
          <Button
            variant="outline"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-3 border-2 border-[#f01c33] text-[#f01c33] hover:bg-[#f01c33] hover:text-white rounded-2xl px-6 py-3 font-bold transition-all duration-300"
          >
            <Filter className="h-5 w-5" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div
            className={`lg:w-1/4 ${
              mobileFiltersOpen
                ? "block fixed inset-0 z-50 bg-white p-4 overflow-auto"
                : "hidden"
            } lg:block lg:static lg:z-auto lg:bg-transparent lg:p-0`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 sticky top-20">
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  FILTERS
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#f01c33] hover:text-[#c4ab66] font-bold transition-colors duration-300"
                  >
                    Clear all
                  </button>
                  <button
                    className="lg:hidden text-gray-500 hover:text-[#f01c33] transition-colors duration-300"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Enhanced Search Filter */}
              <div className="p-8 border-b border-gray-100">
                <h3 className="text-sm font-bold mb-4 text-[#f01c33] uppercase tracking-wider flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const searchInput = e.target.elements.search.value;
                    handleFilterChange("search", searchInput);
                  }}
                  className="relative"
                >
                  <Input
                    name="search"
                    placeholder="Search products..."
                    defaultValue={filters.search}
                    className="w-full pr-12 border-2 border-gray-200 focus:border-[#f01c33] focus:ring-[#f01c33] rounded-2xl py-3 bg-white/50 backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f01c33] hover:text-[#c4ab66] transition-colors duration-300"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              </div>

              {/* Enhanced Categories Filter */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#f01c33] uppercase tracking-wider">
                    Categories
                  </h3>
                  <ChevronDown className="h-4 w-4 text-[#c4ab66]" />
                </div>
                <div className="space-y-3">
                  <div
                    className={`cursor-pointer hover:text-[#f01c33] transition-colors duration-300 p-3 rounded-xl ${
                      filters.category === ""
                        ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => handleFilterChange("category", "")}
                  >
                    All Categories
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="ml-3">
                      <div
                        className={`cursor-pointer hover:text-[#f01c33] flex items-center transition-colors duration-300 p-3 rounded-xl ${
                          filters.category === category.slug
                            ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          handleFilterChange("category", category.slug)
                        }
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        {category.name}
                      </div>
                      {category.children && category.children.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {category.children.map((child) => (
                            <div
                              key={child.id}
                              className={`cursor-pointer hover:text-[#f01c33] text-sm transition-colors duration-300 p-2 rounded-lg ${
                                filters.category === child.slug
                                  ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                handleFilterChange("category", child.slug)
                              }
                            >
                              {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Flavors Filter */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#f01c33] uppercase tracking-wider">
                    Flavor
                  </h3>
                  <ChevronDown className="h-4 w-4 text-[#c4ab66]" />
                </div>
                <div className="space-y-3">
                  <div
                    className={`cursor-pointer hover:text-[#f01c33] transition-colors duration-300 p-3 rounded-xl ${
                      selectedFlavors.length === 0
                        ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedFlavors([]);
                      handleFilterChange("flavor", "");
                    }}
                  >
                    All Flavors
                  </div>

                  {flavors.map((flavor) => (
                    <div
                      key={flavor.id}
                      className={`cursor-pointer hover:text-[#f01c33] ml-3 flex items-center transition-colors duration-300 p-3 rounded-xl ${
                        selectedFlavors.includes(flavor.id)
                          ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => handleFlavorChange(flavor.id)}
                    >
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-lg mr-3 flex items-center justify-center">
                        {selectedFlavors.includes(flavor.id) && (
                          <div className="w-3 h-3 rounded bg-gradient-to-r from-[#f01c33] to-[#c4ab66]"></div>
                        )}
                      </div>
                      {flavor.image && (
                        <div className="w-5 h-5 rounded-full overflow-hidden mr-3">
                          <Image
                            src={flavor.image || "/placeholder.svg"}
                            alt={flavor.name}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                      {flavor.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Weights Filter */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#f01c33] uppercase tracking-wider">
                    Weight
                  </h3>
                  <ChevronDown className="h-4 w-4 text-[#c4ab66]" />
                </div>
                <div className="space-y-3">
                  <div
                    className={`cursor-pointer hover:text-[#f01c33] transition-colors duration-300 p-3 rounded-xl ${
                      selectedWeights.length === 0
                        ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedWeights([]);
                      handleFilterChange("weight", "");
                    }}
                  >
                    All Weights
                  </div>

                  {weights.map((weight) => (
                    <div
                      key={weight.id}
                      className={`cursor-pointer hover:text-[#f01c33] ml-3 flex items-center transition-colors duration-300 p-3 rounded-xl ${
                        selectedWeights.includes(weight.id)
                          ? "font-bold text-[#f01c33] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => handleWeightChange(weight.id)}
                    >
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-lg mr-3 flex items-center justify-center">
                        {selectedWeights.includes(weight.id) && (
                          <div className="w-3 h-3 rounded bg-gradient-to-r from-[#f01c33] to-[#c4ab66]"></div>
                        )}
                      </div>
                      {weight.display}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Enhanced Header with count and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50">
              <div className="text-gray-700 mb-4 sm:mb-0">
                {loading && !products.length ? (
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <div className="text-lg">
                    Showing{" "}
                    <span className="font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                      {products.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                      {pagination.total || 0}
                    </span>{" "}
                    products
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white shadow-lg"
                        : "text-gray-600 hover:text-[#f01c33]"
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white shadow-lg"
                        : "text-gray-600 hover:text-[#f01c33]"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                {loading && (
                  <div className="text-sm text-gray-500 flex items-center">
                    <div className="w-4 h-4 border-2 border-[#f01c33] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                )}

                <div className="flex items-center bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                  <span className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    SORT BY
                  </span>
                  <select
                    className="border-l-2 border-gray-200 px-6 py-3 focus:outline-none bg-white text-gray-700 font-medium"
                    onChange={handleSortChange}
                    disabled={loading}
                    value={
                      filters.sort === "createdAt" && filters.order === "desc"
                        ? "newest"
                        : filters.sort === "createdAt" &&
                          filters.order === "asc"
                        ? "oldest"
                        : filters.sort === "name" && filters.order === "asc"
                        ? "name-asc"
                        : filters.sort === "name" && filters.order === "desc"
                        ? "name-desc"
                        : "newest"
                    }
                  >
                    <option value="newest">Featured</option>
                    <option value="price-low">Price, low to high</option>
                    <option value="price-high">Price, high to low</option>
                    <option value="name-asc">Alphabetically, A-Z</option>
                    <option value="name-desc">Alphabetically, Z-A</option>
                    <option value="oldest">Date, old to new</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Enhanced Active Filters */}
            {(filters.search ||
              filters.category ||
              selectedFlavors.length > 0 ||
              selectedWeights.length > 0 ||
              filters.minPrice ||
              filters.maxPrice) && (
              <div className="flex flex-wrap items-center gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
                <span className="text-sm font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#f01c33]" />
                  Active Filters:
                </span>

                {filters.search && (
                  <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm px-4 py-2 rounded-full flex items-center shadow-lg">
                    <span>Search: {filters.search}</span>
                    <button
                      onClick={() => handleFilterChange("search", "")}
                      className="ml-2 hover:scale-110 transition-transform"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {filters.category && (
                  <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm px-4 py-2 rounded-full flex items-center shadow-lg">
                    <span>
                      Category:{" "}
                      {categories.find((c) => c.slug === filters.category)
                        ?.name || filters.category}
                    </span>
                    <button
                      onClick={() => handleFilterChange("category", "")}
                      className="ml-2 hover:scale-110 transition-transform"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {selectedFlavors.length > 0 && (
                  <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm px-4 py-2 rounded-full flex items-center shadow-lg">
                    <span>
                      Flavor:{" "}
                      {flavors.find((f) => f.id === selectedFlavors[0])?.name ||
                        selectedFlavors[0]}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedFlavors([]);
                        handleFilterChange("flavor", "");
                      }}
                      className="ml-2 hover:scale-110 transition-transform"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {selectedWeights.length > 0 && (
                  <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm px-4 py-2 rounded-full flex items-center shadow-lg">
                    <span>
                      Weight:{" "}
                      {weights.find((w) => w.id === selectedWeights[0])
                        ?.display || selectedWeights[0]}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedWeights([]);
                        handleFilterChange("weight", "");
                      }}
                      className="ml-2 hover:scale-110 transition-transform"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={clearFilters}
                  className="text-sm text-[#f01c33] hover:text-[#c4ab66] font-bold transition-colors duration-300 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}

            {/* Enhanced Products Grid */}
            {loading && products.length === 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-8`}
              >
                {[...Array(pagination.limit || 12)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-sm p-16 rounded-3xl shadow-xl text-center border border-white/50"
              >
                <div className="text-gray-400 mb-8">
                  <AlertCircle className="h-20 w-20 mx-auto" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-6">
                  No products found
                </h2>
                <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
                  We couldn&apos;t find any products matching your criteria. Try
                  adjusting your filters or search term.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
                } gap-8`}
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-white/50 group-hover:scale-105">
                      <div className="relative h-80 w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                        <Link href={`/products/${product.slug}`}>
                          <Image
                            src={product.image || "/product-placeholder.jpg"}
                            alt={product.name}
                            fill
                            className="object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Link>

                        {product.hasSale && (
                          <motion.span
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            SALE
                          </motion.span>
                        )}

                        <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-12 h-12 p-0 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white rounded-2xl shadow-lg transition-all duration-300 border border-white/50"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-12 h-12 p-0 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#c4ab66] hover:to-[#f01c33] hover:text-white rounded-2xl shadow-lg transition-all duration-300 border border-white/50"
                            onClick={(e) => {
                              e.preventDefault();
                              handleQuickView(product);
                            }}
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-8 bg-gradient-to-b from-white to-gray-50/30">
                        <div className="flex items-center justify-center mb-4">
                          <div className="flex text-[#c4ab66]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 transition-all duration-300"
                                fill={
                                  i < Math.round(product.avgRating || 0)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2 font-medium">
                            ({product.reviewCount || 0})
                          </span>
                        </div>

                        <Link
                          href={`/products/${product.slug}`}
                          className="block hover:text-[#f01c33] transition-colors duration-300"
                        >
                          <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 text-center text-xl group-hover:bg-gradient-to-r group-hover:from-[#f01c33] group-hover:to-[#c4ab66] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="text-center mb-6">
                          {product.hasSale ? (
                            <div className="flex items-center justify-center space-x-3">
                              <span className="font-bold text-2xl bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                                {formatCurrency(product.basePrice)}
                              </span>
                              <span className="text-gray-500 line-through text-lg">
                                {formatCurrency(product.regularPrice)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-2xl bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                              {formatCurrency(product.basePrice)}
                            </span>
                          )}
                        </div>

                        {product.flavors > 1 && (
                          <p className="text-sm text-gray-500 text-center mb-6 font-medium">
                            {product.flavors} variants available
                          </p>
                        )}

                        <Button
                          className="group/btn w-full bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white font-bold py-4 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
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
                ))}
              </div>
            )}

            {/* Enhanced Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center mt-16">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                    className="rounded-none border-0 hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white px-6 py-4 transition-all duration-300"
                  >
                    <ChevronUp className="h-5 w-5 rotate-90" />
                  </Button>

                  {[...Array(pagination.pages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === pagination.pages ||
                      (page >= pagination.page - 1 &&
                        page <= pagination.page + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          disabled={loading}
                          className={`px-6 py-4 font-bold transition-all duration-300 ${
                            pagination.page === page
                              ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }

                    if (
                      (page === 2 && pagination.page > 3) ||
                      (page === pagination.pages - 1 &&
                        pagination.page < pagination.pages - 2)
                    ) {
                      return (
                        <span
                          key={page}
                          className="px-6 py-4 text-gray-400 font-bold"
                        >
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages || loading}
                    className="rounded-none border-0 hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white px-6 py-4 transition-all duration-300"
                  >
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick View Dialog */}
        <ProductQuickView
          product={quickViewProduct}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#f01c33] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
