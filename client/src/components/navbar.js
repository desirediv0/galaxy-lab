"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  ChevronDown,
  Phone,
  MapPin,
  LogIn,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi } from "@/lib/utils";
import { ClientOnly } from "./client-only";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(null);
  const searchInputRef = useRef(null);
  const navbarRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchExpanded(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownHover = (dropdown) => {
    setIsHoveringDropdown(dropdown);
    if (dropdown) {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownLeave = () => {
    setIsHoveringDropdown(null);
    if (!navbarRef.current?.contains(document.activeElement)) {
      setActiveDropdown(null);
    }
  };

  const MobileMenu = ({
    isMenuOpen,
    setIsMenuOpen,
    categories,
    searchQuery,
    setSearchQuery,
    isAuthenticated,
    handleLogout,
  }) => {
    const mobileSearchInputRef = useRef(null);

    useEffect(() => {
      if (isMenuOpen) {
        const timer = setTimeout(() => {
          if (mobileSearchInputRef.current) {
            mobileSearchInputRef.current.focus();
          }
        }, 300);

        return () => clearTimeout(timer);
      }
    }, [isMenuOpen]);

    const handleMobileSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        setIsMenuOpen(false);
        setSearchQuery("");
      }
    };

    const handleSearchInputChange = (e) => {
      e.stopPropagation();
      setSearchQuery(e.target.value);
    };

    if (!isMenuOpen) return null;

    return (
      <div
        className="md:hidden fixed inset-0 z-50 bg-gradient-to-br from-white via-white to-[#c4ab66]/5 backdrop-blur-md overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#f01c33] via-[#f01c33] to-[#c4ab66] shadow-xl flex justify-between items-center px-6 py-5 z-10">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                  <Sparkles className="h-7 w-7 text-[#f01c33]" />
                </div>
                <div>
                  <span className="text-white font-bold text-2xl tracking-wide">
                    Brand
                  </span>
                  <div className="w-full h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                </div>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 text-white hover:text-[#c4ab66] rounded-2xl hover:bg-white/20 focus:outline-none transition-all duration-300 hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
            {/* Search Section */}
            <form onSubmit={handleMobileSearch} className="sticky top-0 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#f01c33]" />
                  <Input
                    ref={mobileSearchInputRef}
                    type="text"
                    placeholder="Search amazing products..."
                    className="w-full pl-16 pr-16 py-6 text-lg border-0 focus:ring-2 focus:ring-[#f01c33] rounded-3xl bg-transparent placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoComplete="off"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 text-[#c4ab66] hover:text-[#f01c33] transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        mobileSearchInputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-2xl bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-6">
              <Link
                href="/products"
                className="group relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c4ab66]/20 to-[#c4ab66]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c4ab66] to-[#c4ab66]/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-[#c4ab66] text-lg">
                    All Products
                  </span>
                </div>
              </Link>
              <Link
                href="/categories"
                className="group relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f01c33]/20 to-[#f01c33]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f01c33] to-[#f01c33]/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <Menu className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-[#f01c33] text-lg">
                    Categories
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#f01c33] uppercase text-sm tracking-wider px-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f01c33] rounded-full"></div>
                Navigation
              </h3>
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                {[
                  {
                    href: "/",
                    label: "Home",
                    gradient: "from-blue-500 to-purple-500",
                  },
                  {
                    href: "/about",
                    label: "About Us",
                    gradient: "from-green-500 to-teal-500",
                  },
                  {
                    href: "/blog",
                    label: "Blog",
                    gradient: "from-orange-500 to-red-500",
                  },
                  {
                    href: "/contact",
                    label: "Contact",
                    gradient: "from-pink-500 to-rose-500",
                  },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-8 py-5 hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#c4ab66]/5 transition-all duration-300 group ${
                      index !== 3 ? "border-b border-white/30" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${item.gradient} rounded-full mr-4 group-hover:scale-125 transition-transform duration-300`}
                    ></div>
                    <span className="text-gray-700 font-semibold text-lg group-hover:text-[#f01c33] transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Section */}
            {isAuthenticated ? (
              <div className="space-y-4">
                <h3 className="font-bold text-[#f01c33] uppercase text-sm tracking-wider px-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#f01c33] rounded-full"></div>
                  My Account
                </h3>
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  {[
                    {
                      href: "/account",
                      label: "Profile",
                      color: "text-blue-600",
                    },
                    {
                      href: "/account/orders",
                      label: "My Orders",
                      color: "text-green-600",
                    },
                    {
                      href: "/wishlist",
                      label: "My Wishlist",
                      color: "text-pink-600",
                    },
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-8 py-5 hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#c4ab66]/5 transition-all duration-300 group ${
                        index !== 2 ? "border-b border-white/30" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div
                        className={`w-3 h-3 bg-current rounded-full mr-4 ${item.color} group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <span className="text-gray-700 font-semibold text-lg group-hover:text-[#f01c33] transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-8 py-5 text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#f01c33]/5 transition-all duration-300 border-t border-white/30 group"
                  >
                    <div className="w-3 h-3 bg-[#f01c33] rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="font-semibold text-lg">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f01c33]/10 via-[#c4ab66]/10 to-[#f01c33]/5 blur-xl"></div>
                <div className="relative space-y-6 p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-[#f01c33] text-xl mb-2">
                      Join Our Community!
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Unlock exclusive deals and premium features
                    </p>
                  </div>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full py-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full py-4 border-2 border-[#f01c33] text-[#f01c33] hover:bg-[#f01c33] hover:text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4ab66]/20 to-[#f01c33]/10 blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <h3 className="font-bold text-[#f01c33] mb-6 text-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-xl flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#c4ab66] to-[#c4ab66]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-gray-700 text-lg">
                      +91 8800199820
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f01c33] to-[#f01c33]/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-gray-700 text-lg">
                      Store Locator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-2xl border-b border-gray-100"
      ref={navbarRef}
    >
      <Toaster position="top-center" />

      {/* Main Header */}
      <div className="bg-gradient-to-r from-white via-white to-[#c4ab66]/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-6">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-3 text-[#f01c33] hover:text-[#c4ab66] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 rounded-2xl transition-all duration-300 focus:outline-none hover:scale-110"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-7 w-7" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <Image
                  src="/logo.png"
                  alt="Brand Logo"
                  width={150}
                  height={100}
                  className="object-cover  transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-12">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#f01c33]" />
                    <Input
                      type="search"
                      placeholder="Search for products, brands, categories..."
                      className="w-full pl-16 pr-32 py-5 border-0 focus:ring-2 focus:ring-[#f01c33] rounded-3xl text-lg bg-transparent placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoComplete="off"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                      >
                        Search
                      </Button> 
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="md:hidden p-3 text-[#f01c33] hover:text-[#c4ab66] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 rounded-2xl transition-all duration-300 focus:outline-none hover:scale-110"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-4 text-[#f01c33] hover:text-[#c4ab66] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 rounded-2xl transition-all duration-300 relative group hover:scale-110"
              >
                <Heart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
              </Link>

              {/* Cart */}
              <ClientOnly>
                <Link
                  href="/cart"
                  className="p-4 text-[#f01c33] hover:text-[#c4ab66] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 rounded-2xl transition-all duration-300 relative group hover:scale-110"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cart && cart.items?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white rounded-full text-sm w-7 h-7 flex items-center justify-center font-bold shadow-lg animate-bounce">
                      {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              </ClientOnly>

              {/* Account Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownHover("account")}
                onMouseLeave={handleDropdownLeave}
              >
                <ClientOnly>
                  <button
                    className={`p-4 ${
                      activeDropdown === "account"
                        ? "text-[#c4ab66] bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10"
                        : "text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10"
                    } hover:text-[#c4ab66] transition-all duration-300 flex items-center focus:outline-none group rounded-2xl hover:scale-110`}
                    onClick={() => toggleDropdown("account")}
                    aria-expanded={activeDropdown === "account"}
                  >
                    {isAuthenticated ? (
                      <User className="h-6 w-6" />
                    ) : (
                      <LogIn className="h-6 w-6" />
                    )}
                    <ChevronDown
                      className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                        activeDropdown === "account" ? "rotate-180" : ""
                      } group-hover:rotate-180`}
                    />
                  </button>

                  {/* Account Dropdown Content */}
                  <div
                    className={`absolute right-0 top-full mt-4 w-80 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl py-4 border border-white/50 z-50 transition-all duration-300 ease-in-out transform origin-top ${
                      activeDropdown === "account"
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-t-3xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-2xl flex items-center justify-center shadow-lg">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-xl">
                                Hi, {user?.name || "User"}! 👋
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-3">
                          {[
                            {
                              href: "/account",
                              label: "My Account",
                              color: "from-blue-500 to-purple-500",
                            },
                            {
                              href: "/account/orders",
                              label: "My Orders",
                              color: "from-green-500 to-teal-500",
                            },
                            {
                              href: "/wishlist",
                              label: "My Wishlist",
                              color: "from-pink-500 to-rose-500",
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#c4ab66]/5 transition-all duration-300 group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div
                                className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full mr-4 group-hover:scale-125 transition-transform duration-300`}
                              ></div>
                              <span className="font-semibold text-gray-700 text-lg group-hover:text-[#f01c33] transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <button
                            onClick={() => {
                              handleLogout();
                              setActiveDropdown(null);
                            }}
                            className="flex items-center w-full px-8 py-4 text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#f01c33]/10 transition-all duration-300 font-semibold text-lg group"
                          >
                            <div className="w-4 h-4 bg-[#f01c33] rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-8">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Sparkles className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-bold text-[#f01c33] text-2xl mb-3">
                            Welcome!
                          </h3>
                          <p className="text-gray-600 text-base">
                            Join us for exclusive deals and premium features
                          </p>
                        </div>
                        <div className="space-y-4">
                          <Link
                            href="/login"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Button className="w-full py-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                              Login
                            </Button>
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Button
                              variant="outline"
                              className="w-full py-4 border-2 border-[#f01c33] text-[#f01c33] hover:bg-[#f01c33] hover:text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                            >
                              Register
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="hidden md:block bg-gradient-to-r h-16  from-[#f01c33] via-[#f01c33] to-[#c4ab66] text-white ">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-12 py-1">
            <Link
              href="/"
              className="font-bold text-lg hover:text-[#c4ab66] transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-110 relative group"
            >
              Home
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/about"
              className="font-bold text-lg hover:text-[#c4ab66] transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-110 relative group"
            >
              About
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/products"
              className="font-bold text-lg hover:text-[#c4ab66] transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-110 relative group"
            >
              Products
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover("products")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`font-bold text-lg ${
                  activeDropdown === "products"
                    ? "text-[#c4ab66] bg-white/20"
                    : "text-white"
                } hover:text-[#c4ab66] transition-all duration-300 flex items-center focus:outline-none group px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-110 relative`}
                onClick={() => toggleDropdown("products")}
                aria-expanded={activeDropdown === "products"}
              >
                Categories
                <ChevronDown
                  className={`ml-3 h-5 w-5 transition-transform duration-300 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  } group-hover:rotate-180`}
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full group-hover:w-full transition-all duration-300"></div>
              </button>
              <div
                className={`absolute left-0 top-full mt-4 w-96 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl py-4 border border-white/50 z-50 transition-all duration-300 ease-in-out transform origin-top ${
                  activeDropdown === "products"
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                }`}
              >
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-t-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f01c33] to-[#c4ab66] rounded-2xl flex items-center justify-center shadow-lg">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#f01c33] text-2xl">
                        Our Products
                      </h3>
                      <p className="text-base text-gray-600">
                        Discover our amazing collection
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-3">
                  {categories.map((category, index) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="flex items-center px-8 py-4 hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#c4ab66]/5 transition-all duration-300 text-gray-700 group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div
                        className={`w-4 h-4 bg-gradient-to-r ${
                          index % 3 === 0
                            ? "from-blue-500 to-purple-500"
                            : index % 3 === 1
                            ? "from-green-500 to-teal-500"
                            : "from-pink-500 to-rose-500"
                        } rounded-full mr-4 group-hover:scale-125 transition-transform duration-300`}
                      ></div>
                      <span className="font-semibold text-lg group-hover:text-[#f01c33] transition-colors">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <Link
                    href="/categories"
                    className="flex items-center px-8 py-4 text-[#f01c33] font-bold hover:bg-gradient-to-r hover:from-[#f01c33]/5 hover:to-[#f01c33]/10 transition-all duration-300 text-lg group"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="w-4 h-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                    View All Categories
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="font-bold text-lg hover:text-[#c4ab66] transition-all duration-300 px-6 py-3 rounded-2xl hover:bg-white/20 hover:scale-110 relative group"
            >
              Contact
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-white rounded-full group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={() => setIsSearchExpanded(false)}
          />
          <div className="fixed inset-x-0 top-0 z-50 w-full animate-in slide-in-from-top duration-300 p-6">
            <form
              onSubmit={handleSearch}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden max-h-[90vh] md:max-w-[700px] mx-auto"
            >
              <div className="flex items-center px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#f01c33] to-[#c4ab66]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <Search className="h-6 w-6 text-[#f01c33]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Search Products
                  </h3>
                </div>
                <button
                  type="button"
                  className="ml-auto p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:rotate-90"
                  onClick={() => setIsSearchExpanded(false)}
                  aria-label="Close search"
                >
                  <X className="h-7 w-7 text-white" />
                </button>
              </div>

              <div className="p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl"></div>
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-7 w-7 text-[#f01c33]" />
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search for products, brands, categories..."
                      className="w-full pl-16 pr-8 py-6 border-2 border-[#f01c33]/30 focus:border-[#f01c33] focus:ring-[#f01c33] rounded-3xl text-xl bg-white/80 backdrop-blur-sm placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-bold text-[#f01c33] mb-4 uppercase tracking-wider flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#f01c33] rounded-full"></div>
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "Protein Powder",
                      "Dumbbells",
                      "Resistance Bands",
                      "Pre-Workout",
                    ].map((term, index) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className={`px-6 py-3 text-base bg-gradient-to-r ${
                          index % 2 === 0
                            ? "from-[#f01c33]/10 to-[#f01c33]/5 hover:from-[#f01c33]/20 hover:to-[#f01c33]/10 text-[#f01c33] border-[#f01c33]/30"
                            : "from-[#c4ab66]/10 to-[#c4ab66]/5 hover:from-[#c4ab66]/20 hover:to-[#c4ab66]/10 text-[#c4ab66] border-[#c4ab66]/30"
                        } hover:scale-105 rounded-2xl transition-all duration-300 font-semibold border-2`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(false)}
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-bold text-lg hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white rounded-2xl hover:from-[#c4ab66] hover:to-[#f01c33] transition-all duration-300 flex items-center gap-3 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Search className="h-6 w-6" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Mobile Menu */}
      <ClientOnly>
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isAuthenticated={isAuthenticated}
          user={user}
          cart={cart}
          handleLogout={handleLogout}
        />
      </ClientOnly>
    </header>
  );
}
