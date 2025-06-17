"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  LogIn,
  User,
  ChevronDown,
  ShoppingCart,
  Heart,
  Search,
  Phone,
  MapPin,
  Star,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi } from "@/lib/utils";
import { ClientOnly } from "@/components/client-only";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [navPosition, setNavPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setIsMobileMenuOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsProfileDropdownOpen(false);
      setIsCategoriesDropdownOpen(false);
      setIsSearchExpanded(false);
    };

    handleRouteChange();
  }, [pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi("/public/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setIsProfileDropdownOpen(false);
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Enhanced Floating Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed z-50 top-[10px] left-0 right-0 mx-auto w-[95%] md:w-[90%] max-w-7xl transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        {/* Top Notification Bar - Only visible when not scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-[var(--galaxy-deep-red)] via-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] text-white text-center py-2 text-sm font-medium rounded-t-2xl"
            >
              <div className="container mx-auto px-4 flex items-center justify-center gap-2">
                <Star className="h-4 w-4 animate-pulse" />
                <span className="font-['Poppins']">
                  Free shipping on orders above ₹999 | Use code: FREESHIP
                </span>
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation Container */}
        <div
          className={`flex items-center justify-between p-3 ${
            !isScrolled ? "bg-white/90 backdrop-blur-sm rounded-b-2xl" : ""
          }`}
        >
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group flex items-center"
          >
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[var(--galaxy-deep-red)]/20 to-[var(--galaxy-royal-gold)]/20 opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
            <Link href="/" className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="Galaxy Labs"
                width={isScrolled ? 65 : 100}
                height={isScrolled ? 65 : 100}
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? "scale-90" : "scale-100"
                } group-hover:scale-105 rounded-lg`}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block mx-auto">
            <ul
              className="relative flex items-center gap-1 bg-[var(--galaxy-dark-charcoal)]/80 backdrop-blur-md rounded-full  p-1"
              onMouseLeave={() => {
                setNavPosition((prev) => ({ ...prev, opacity: 0 }));
                setActiveIndex(null);
              }}
            >
              {menuItems.map((item, idx) => (
                <NavTab
                  key={item.name}
                  href={item.href}
                  setPosition={setNavPosition}
                  isActive={activeIndex === idx}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.name}
                </NavTab>
              ))}

              {/* Categories Dropdown */}
              <motion.li
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 text-primary px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300  text-lg font-galaxy-heading hover:text-[var(--galaxy-royal-gold)]"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </motion.button>

                <AnimatePresence>
                  {isCategoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl border border-[var(--galaxy-royal-gold)]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[var(--galaxy-ash-gray)] bg-gradient-to-r from-[var(--galaxy-deep-red)]/5 to-[var(--galaxy-royal-gold)]/5">
                        <h3 className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)] text-lg">
                          Our Products
                        </h3>
                        <p className="text-sm text-[var(--galaxy-dark-charcoal)]/70 font-['Lora']">
                          Premium supplements for your fitness journey
                        </p>
                      </div>
                      <div className="py-1">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-royal-gold)]/5 transition-all duration-300 group"
                          >
                            <span className="font-['Poppins'] font-medium text-[var(--galaxy-dark-charcoal)] group-hover:text-[var(--galaxy-deep-red)] transition-colors">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              <NavCursor position={navPosition} />
            </ul>
          </div>

          {/* Right Section - Search, Cart, Auth */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchExpanded(true)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-white bg-white/10 border border-white/20 hover:bg-white/20"
                  : "text-[var(--galaxy-deep-red)] bg-[var(--galaxy-royal-gold)]/10 border border-[var(--galaxy-royal-gold)]/30 hover:bg-[var(--galaxy-royal-gold)]/20"
              }`}
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-[var(--galaxy-royal-gold)]/30 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--galaxy-deep-red)] group-hover:scale-110 transition-transform duration-300" />
                  <Input
                    type="search"
                    placeholder="Search supplements..."
                    className="w-64 pl-12 pr-4 py-2 border-0 focus:ring-2 focus:ring-[var(--galaxy-deep-red)] rounded-2xl bg-transparent placeholder:text-[var(--galaxy-dark-charcoal)]/50 font-['Lora']"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden sm:flex">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-300 relative group ${
                  isScrolled
                    ? "text-white bg-white/10 border border-white/20 hover:bg-white/20"
                    : "text-[var(--galaxy-deep-red)] bg-[var(--galaxy-royal-gold)]/10 border border-[var(--galaxy-royal-gold)]/30 hover:bg-[var(--galaxy-royal-gold)]/20"
                }`}
              >
                <Heart className="h-5 w-5 group-hover:fill-current transition-all duration-300" />
              </motion.div>
            </Link>

            {/* Cart */}
            <ClientOnly>
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 relative group ${
                    isScrolled
                      ? "text-white bg-white/10 border border-white/20 hover:bg-white/20"
                      : "text-[var(--galaxy-deep-red)] bg-[var(--galaxy-royal-gold)]/10 border border-[var(--galaxy-royal-gold)]/30 hover:bg-[var(--galaxy-royal-gold)]/20"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  {cart && cart.items?.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                    >
                      {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            </ClientOnly>

            {/* Auth Section */}
            <ClientOnly>
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 text-white bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] px-4 py-2 rounded-full border border-[var(--galaxy-royal-gold)]/50 hover:shadow-[0_0_15px_rgba(185,155,47,0.3)] transition-all duration-300 font-['Poppins']"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm hidden md:inline">Profile</span>
                    <ChevronDown className="h-3 w-3" />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-[var(--galaxy-royal-gold)]/20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-[var(--galaxy-ash-gray)] bg-gradient-to-r from-[var(--galaxy-deep-red)]/5 to-[var(--galaxy-royal-gold)]/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)]">
                                {user?.name || "User"}
                              </p>
                              <p className="text-sm text-[var(--galaxy-dark-charcoal)]/70 font-['Lora'] truncate">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="py-1">
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
                              className="flex items-center px-4 py-2 hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-royal-gold)]/5 transition-all duration-300 group"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                                {item.icon}
                              </span>
                              <span className="font-['Poppins'] font-medium text-[var(--galaxy-dark-charcoal)] group-hover:text-[var(--galaxy-deep-red)] transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-[var(--galaxy-deep-red)] hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-deep-red)]/10 transition-all duration-300 font-['Poppins'] font-medium group border-t border-[var(--galaxy-ash-gray)] mt-1 pt-3"
                          >
                            <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                              🚪
                            </span>
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] text-white rounded-full shadow-[0_0_10px_rgba(170,46,46,0.3)] transition-all duration-300 border border-[var(--galaxy-royal-gold)]/50 hover:shadow-[0_0_15px_rgba(185,155,47,0.5)] font-['Poppins']"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm hidden md:inline">Login</span>
                  </motion.button>
                </Link>
              )}
            </ClientOnly>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "text-white bg-white/10 border border-white/20 hover:bg-white/20"
                  : "text-[var(--galaxy-deep-red)] bg-[var(--galaxy-royal-gold)]/10 border border-[var(--galaxy-royal-gold)]/30"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsSearchExpanded(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed inset-x-4 top-20 z-50 max-w-lg mx-auto"
            >
              <form
                onSubmit={handleSearch}
                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--galaxy-royal-gold)]/20 overflow-hidden"
              >
                <div className="flex items-center px-4 py-3 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)]">
                  <Search className="h-5 w-5 text-white mr-3" />
                  <h3 className="text-white font-['Playfair_Display'] font-bold text-lg">
                    Search Products
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsSearchExpanded(false)}
                    className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search supplements..."
                    className="w-full px-4 py-3 border-2 border-[var(--galaxy-royal-gold)]/30 focus:border-[var(--galaxy-deep-red)] rounded-xl text-lg bg-white/80 backdrop-blur-sm font-['Lora']"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="flex justify-between mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsSearchExpanded(false)}
                      className="px-6 py-2 border-[var(--galaxy-ash-gray)] text-[var(--galaxy-dark-charcoal)] hover:bg-[var(--galaxy-ash-gray)] font-['Poppins']"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] text-white hover:shadow-lg transition-all duration-300 font-['Poppins']"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-[var(--galaxy-royal-gold)]/20 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-[var(--galaxy-deep-red)]" />
                      </div>
                      <div>
                        <h2 className="text-white font-['Playfair_Display'] font-bold text-xl">
                          Galaxy Labs™
                        </h2>
                        <div className="w-full h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-white hover:bg-white/20 rounded-xl transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-6">
                  {/* Navigation Links */}
                  <div>
                    <h3 className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)] text-lg mb-4">
                      Navigation
                    </h3>
                    <div className="space-y-2">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-royal-gold)]/5 transition-all duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="font-['Poppins'] font-medium text-[var(--galaxy-dark-charcoal)] group-hover:text-[var(--galaxy-deep-red)] transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)] text-lg mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.slice(0, 5).map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-royal-gold)]/5 transition-all duration-300 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-['Poppins'] text-sm text-[var(--galaxy-dark-charcoal)] group-hover:text-[var(--galaxy-deep-red)] transition-colors">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Account Section */}
                  {isAuthenticated ? (
                    <div className="border-t border-[var(--galaxy-ash-gray)] pt-4">
                      <h3 className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)] text-lg mb-4">
                        My Account
                      </h3>
                      <div className="space-y-2">
                        {[
                          { href: "/account", label: "Profile", icon: "👤" },
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
                            className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/5 hover:to-[var(--galaxy-royal-gold)]/5 transition-all duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span className="font-['Poppins'] font-medium text-[var(--galaxy-dark-charcoal)] group-hover:text-[var(--galaxy-deep-red)] transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center p-3 text-[var(--galaxy-deep-red)] hover:bg-gradient-to-r hover:from-[var(--galaxy-deep-red)]/10 hover:to-[var(--galaxy-deep-red)]/5 transition-all duration-300 rounded-xl group"
                        >
                          <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                            🚪
                          </span>
                          <span className="font-['Poppins'] font-medium">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-[var(--galaxy-ash-gray)] pt-4">
                      <div className="text-center p-4 bg-gradient-to-br from-[var(--galaxy-deep-red)]/5 to-[var(--galaxy-royal-gold)]/5 rounded-2xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-['Playfair_Display'] font-bold text-[var(--galaxy-deep-red)] text-xl mb-2">
                          Join Galaxy Labs!
                        </h3>
                        <p className="text-[var(--galaxy-dark-charcoal)]/70 text-sm font-['Lora'] mb-4">
                          Unlock exclusive deals and premium features
                        </p>
                        <div className="space-y-3">
                          <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button className="w-full py-3 bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] text-white rounded-xl font-['Poppins'] font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                              Login
                            </Button>
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button
                              variant="outline"
                              className="w-full py-3 border-2 border-[var(--galaxy-deep-red)] text-[var(--galaxy-deep-red)] hover:bg-[var(--galaxy-deep-red)] hover:text-white rounded-xl font-['Poppins'] font-bold transition-all duration-300"
                            >
                              Register
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// NavTab Component for Desktop Navigation
const NavTab = ({ children, href, setPosition, isActive, onClick }) => {
  const ref = useRef(null);

  return (
    <motion.li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative z-10 block cursor-pointer px-4 py-2 text-lg text-white transition-colors font-galaxy-heading hover:text-[var(--galaxy-royal-gold)] ${
        isActive ? "font-medium" : "font-normal"
      }`}
    >
      <Link href={href} className="flex items-center">
        <span>{children}</span>
      </Link>
    </motion.li>
  );
};

// NavCursor Component for Hover Effect
const NavCursor = ({ position }) => {
  return (
    <motion.div
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-0 h-10 rounded-full bg-gradient-to-r from-[var(--galaxy-deep-red)] to-[var(--galaxy-royal-gold)] shadow-[0_0_10px_rgba(170,46,46,0.3)]"
    />
  );
};
