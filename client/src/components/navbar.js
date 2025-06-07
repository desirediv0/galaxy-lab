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
  Star,
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
        className="md:hidden fixed inset-0 z-50 bg-white/98 backdrop-blur-md overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#C2A861] to-[#C2A861]/90 shadow-lg flex justify-between items-center px-6 py-4 z-10">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <Star className="h-6 w-6 text-[#C2A861]" />
                </div>
                <span className="text-white font-bold text-xl">Brand</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white hover:text-[#F01C33] rounded-xl hover:bg-white/20 focus:outline-none transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            {/* Search Section */}
            <form onSubmit={handleMobileSearch} className="sticky top-0 z-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#C2A861]" />
                <Input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-12 py-4 text-base border-2 border-[#C2A861]/30 focus:border-[#C2A861] focus:ring-[#C2A861] rounded-2xl bg-white shadow-sm"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  autoComplete="off"
                  onClick={(e) => e.stopPropagation()}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 text-[#C2A861] hover:text-[#F01C33]"
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
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-[#C2A861] text-white hover:bg-[#F01C33] transition-colors shadow-md"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/products"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#C2A861]/10 to-[#C2A861]/5 rounded-2xl hover:from-[#C2A861]/20 hover:to-[#C2A861]/10 transition-all duration-200 shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-8 w-8 text-[#C2A861] mb-2" />
                <span className="font-semibold text-[#C2A861]">
                  All Products
                </span>
              </Link>
              <Link
                href="/categories"
                className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F01C33]/10 to-[#F01C33]/5 rounded-2xl hover:from-[#F01C33]/20 hover:to-[#F01C33]/10 transition-all duration-200 shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <Menu className="h-8 w-8 text-[#F01C33] mb-2" />
                <span className="font-semibold text-[#F01C33]">Categories</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <h3 className="font-bold text-[#C2A861] uppercase text-sm tracking-wider px-2">
                Navigation
              </h3>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {[
                  { href: "/", label: "Home", icon: "🏠" },
                  { href: "/about", label: "About Us", icon: "ℹ️" },
                  { href: "/blog", label: "Blog", icon: "📝" },
                  { href: "/contact", label: "Contact", icon: "📞" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-6 py-4 hover:bg-[#C2A861]/5 transition-colors ${
                      index !== 3 ? "border-b border-gray-100" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="text-gray-700 font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Section */}
            {isAuthenticated ? (
              <div className="space-y-3">
                <h3 className="font-bold text-[#C2A861] uppercase text-sm tracking-wider px-2">
                  My Account
                </h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {[
                    { href: "/account", label: "Profile", icon: "👤" },
                    { href: "/account/orders", label: "My Orders", icon: "📦" },
                    { href: "/wishlist", label: "My Wishlist", icon: "❤️" },
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-6 py-4 hover:bg-[#C2A861]/5 transition-colors ${
                        index !== 2 ? "border-b border-gray-100" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center px-6 py-4 text-[#F01C33] hover:bg-[#F01C33]/5 transition-colors border-t border-gray-100"
                  >
                    <span className="text-xl mr-3">🚪</span>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-6 bg-gradient-to-br from-[#C2A861]/5 to-white rounded-2xl shadow-sm border border-[#C2A861]/20">
                <h3 className="font-bold text-[#C2A861] text-center mb-4">
                  Join Us Today!
                </h3>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full py-3 bg-[#C2A861] hover:bg-[#F01C33] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full py-3 border-2 border-[#C2A861] text-[#C2A861] hover:bg-[#C2A861] hover:text-white rounded-xl font-semibold transition-all duration-200"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-[#C2A861]/10 to-[#C2A861]/5 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-[#C2A861] mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C2A861] rounded-xl flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">
                    +91 8800199820
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F01C33] rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">
                    Store Locator
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg" ref={navbarRef}>
      <Toaster position="top-center" />

    

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-[#C2A861] hover:text-[#F01C33] hover:bg-[#C2A861]/10 rounded-xl transition-all duration-200 focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <Image
                  src="/logo.png"
                  alt="Brand Logo"
                  width={150}
                  height={80}
                  className="   transition-all duration-200"
                />
              
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#C2A861]" />
                  <Input
                    type="search"
                    placeholder="Search for products, brands, categories..."
                    className="w-full pl-14 pr-6 py-4 border-2 border-[#C2A861]/30 focus:border-[#C2A861] focus:ring-[#C2A861] rounded-2xl text-base bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-[#C2A861] hover:bg-[#F01C33] text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="md:hidden p-3 text-[#C2A861] hover:text-[#F01C33] hover:bg-[#C2A861]/10 rounded-xl transition-all duration-200 focus:outline-none"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-3 text-[#C2A861] hover:text-[#F01C33] hover:bg-[#C2A861]/10 rounded-xl transition-all duration-200 relative group"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F01C33] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>

              {/* Cart */}
              <ClientOnly>
                <Link
                  href="/cart"
                  className="p-3 text-[#C2A861] hover:text-[#F01C33] hover:bg-[#C2A861]/10 rounded-xl transition-all duration-200 relative group"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart && cart.items?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#F01C33] text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-md">
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
                    className={`p-3 ${
                      activeDropdown === "account"
                        ? "text-[#F01C33] bg-[#F01C33]/10"
                        : "text-[#C2A861] hover:bg-[#C2A861]/10"
                    } hover:text-[#F01C33] transition-all duration-200 flex items-center focus:outline-none group rounded-xl`}
                    onClick={() => toggleDropdown("account")}
                    aria-expanded={activeDropdown === "account"}
                  >
                    {isAuthenticated ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <LogIn className="h-5 w-5" />
                    )}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === "account" ? "rotate-180" : ""
                      } group-hover:rotate-180`}
                    />
                  </button>

                  {/* Account Dropdown Content */}
                  <div
                    className={`absolute right-0 top-full mt-2 w-72 bg-white shadow-2xl rounded-2xl py-3 border border-gray-100 z-50 transition-all duration-300 ease-in-out transform origin-top ${
                      activeDropdown === "account"
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-[#C2A861]/5 to-[#C2A861]/10 rounded-t-2xl">
                          <p className="font-bold text-gray-800 text-lg">
                            Hi, {user?.name || "User"}! 👋
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-2">
                          {[
                            {
                              href: "/account",
                              label: "My Account",
                              icon: "👤",
                            },
                            {
                              href: "/account/orders",
                              label: "My Orders",
                              icon: "📦",
                            },
                            {
                              href: "/wishlist",
                              label: "My Wishlist",
                              icon: "❤️",
                            },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center px-6 py-3 hover:bg-[#C2A861]/5 transition-all duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="text-lg mr-3">{item.icon}</span>
                              <span className="font-medium text-gray-700">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={() => {
                              handleLogout();
                              setActiveDropdown(null);
                            }}
                            className="flex items-center w-full px-6 py-3 text-[#F01C33] hover:bg-[#F01C33]/5 transition-all duration-200 font-medium"
                          >
                            <span className="text-lg mr-3">🚪</span>
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-[#C2A861] text-lg mb-2">
                            Welcome!
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Join us for exclusive deals and offers
                          </p>
                        </div>
                        <div className="space-y-3">
                          <Link
                            href="/login"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Button className="w-full py-3 bg-[#C2A861] hover:bg-[#F01C33] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                              Login
                            </Button>
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Button
                              variant="outline"
                              className="w-full py-3 border-2 border-[#C2A861] text-[#C2A861] hover:bg-[#C2A861] hover:text-white rounded-xl font-semibold transition-all duration-200"
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
      <div className="hidden md:block bg-gradient-to-r from-[#C2A861] to-[#C2A861]/95 text-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8 ">
            <Link
              href="/"
              className="font-semibold hover:text-[#F01C33] transition-all duration-200 px-4 py-1 rounded-xl hover:bg-white/10"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="font-semibold hover:text-[#F01C33] transition-all duration-200 px-4 py-1 rounded-xl hover:bg-white/10"
            >
              About
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover("products")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`font-semibold ${
                  activeDropdown === "products"
                    ? "text-[#F01C33] bg-white/10"
                    : "text-white"
                } hover:text-[#F01C33] transition-all duration-200 flex items-center focus:outline-none group px-4 py-1 rounded-xl hover:bg-white/10`}
                onClick={() => toggleDropdown("products")}
                aria-expanded={activeDropdown === "products"}
              >
                Products
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "products" ? "rotate-180" : ""
                  } group-hover:rotate-180`}
                />
              </button>
              <div
                className={`absolute left-0 top-full mt-2 w-80 bg-white shadow-2xl rounded-2xl py-3 border border-gray-100 z-50 transition-all duration-300 ease-in-out transform origin-top ${
                  activeDropdown === "products"
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="px-6 py-3 border-b border-gray-100 bg-gradient-to-r from-[#C2A861]/5 to-[#C2A861]/10">
                  <h3 className="font-bold text-[#C2A861] text-lg">
                    Our Products
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover our amazing collection
                  </p>
                </div>
                <div className="py-2">
                 
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="flex items-center px-6 py-3 hover:bg-[#C2A861]/5 transition-all duration-200 text-gray-700"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-2 h-2 bg-[#C2A861] rounded-full mr-4"></span>
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <Link
                    href="/categories"
                    className="flex items-center px-6 py-3 text-[#F01C33] font-bold hover:bg-[#F01C33]/5 transition-all duration-200"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="mr-2">🔥</span>
                    View All Categories
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="font-semibold hover:text-[#F01C33] transition-all duration-200 px-4 py-1 rounded-xl hover:bg-white/10"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setIsSearchExpanded(false)}
          />
          <div className="fixed inset-x-0 top-0 z-50 w-full animate-in slide-in-from-top duration-300 p-4">
            <form
              onSubmit={handleSearch}
              className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] md:max-w-[600px] mx-auto"
            >
              <div className="flex items-center px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#C2A861] to-[#C2A861]/90">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                    <Search className="h-5 w-5 text-[#C2A861]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Search Products
                  </h3>
                </div>
                <button
                  type="button"
                  className="ml-auto p-2 rounded-xl hover:bg-white/20 transition-all duration-200"
                  onClick={() => setIsSearchExpanded(false)}
                  aria-label="Close search"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#C2A861]" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search for products, brands, categories..."
                    className="w-full pl-14 pr-6 py-4 border-2 border-[#C2A861]/30 focus:border-[#C2A861] focus:ring-[#C2A861] rounded-2xl text-lg bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-bold text-[#C2A861] mb-3 uppercase tracking-wider">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Protein Powder",
                      "Dumbbells",
                      "Resistance Bands",
                      "Pre-Workout",
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-[#C2A861]/10 to-[#C2A861]/5 hover:from-[#C2A861]/20 hover:to-[#C2A861]/10 text-[#C2A861] hover:text-[#F01C33] rounded-xl transition-all duration-200 font-medium border border-[#C2A861]/20"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#C2A861] to-[#C2A861]/90 text-white rounded-xl hover:from-[#F01C33] hover:to-[#F01C33]/90 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
                >
                  <Search className="h-5 w-5" />
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
