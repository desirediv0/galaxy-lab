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
  Zap,
  Star,
  Phone,
  Mail,
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
  const { cart, getCartItemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] =
    useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
      setIsBottomMenuOpen(false);
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

      {/* Top Info Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" z-50 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-center py-2 text-sm font-medium shadow-lg border-b border-amber-400"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 capitalize">
            <Star className="h-4 w-4 animate-pulse" />
            <span>
              Shop for ₹999+ and receive a scratch card with exciting rewards!
            </span>
            <Zap className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="Galaxy Labs"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-amber-100 text-amber-900 shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {isCategoriesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-900 text-lg">
                          Our Products
                        </h3>
                        <p className="text-sm text-gray-600">
                          Premium supplements for your fitness journey
                        </p>
                      </div>
                      <div className="py-1 max-h-64 overflow-y-auto">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-all duration-300 group"
                          >
                            <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Section - Search, Cart, Auth */}
            <div className="flex items-center space-x-3">
              {/* Desktop Search */}
              <div className="hidden lg:block">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search supplements..."
                      className="w-64 pl-10 pr-4 py-2 border-0 bg-transparent placeholder:text-gray-500 text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchExpanded(true)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden sm:flex">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 relative group"
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
                    className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all duration-300 relative group"
                  >
                    <ShoppingCart className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {getCartItemCount()}
                      </span>
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
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
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
                          className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-xl py-2 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">
                                  {user?.name || "User"}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
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
                                className="flex items-center px-4 py-2 hover:bg-gray-50 transition-all duration-300 group"
                                onClick={() => setIsProfileDropdownOpen(false)}
                              >
                                <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                                  {item.icon}
                                </span>
                                <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium group border-t border-gray-100 mt-1 pt-3"
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
                      className="md:flex hidden items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 font-medium shadow-md"
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
                className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsSearchExpanded(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed inset-x-4 top-32 z-50 max-w-lg mx-auto"
            >
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                <div className="flex items-center px-4 py-3 bg-gray-50">
                  <Search className="h-5 w-5 text-gray-600 mr-3" />
                  <h3 className="text-gray-900 font-bold text-lg">
                    Search Products
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsSearchExpanded(false)}
                    className="ml-auto p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search supplements..."
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-amber-500 rounded-xl text-lg"
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
                      className="px-6 py-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 h-[85vh]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 right-0 h-[85vh] z-50 w-80 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
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
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.slice(0, 5).map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-sm text-gray-700 group-hover:text-amber-600 transition-colors">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {isAuthenticated ? (
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-bold text-gray-900 text-lg mb-4">
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
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-lg group"
                        >
                          <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                            🚪
                          </span>
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <div className="space-y-3">
                          <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold">
                              Login
                            </Button>
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button
                              variant="outline"
                              className="w-full py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700 mt-2 rounded-xl font-bold"
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 ${
              pathname === "/"
                ? "text-amber-600 bg-amber-50"
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>

          <Link
            href="/products"
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 ${
              pathname === "/products"
                ? "text-amber-600 bg-amber-50"
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-xs mt-1 font-medium">Products</span>
          </Link>

          <Link
            href="/cart"
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 relative ${
              pathname === "/cart"
                ? "text-amber-600 bg-amber-50"
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingCart className="h-6 w-6" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
            <span className="text-xs mt-1 font-medium">Cart</span>
          </Link>

          <button
            onClick={() => setIsBottomMenuOpen(true)}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 ${
              isBottomMenuOpen
                ? "text-amber-600 bg-amber-50"
                : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
            }`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-xs mt-1 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Bottom Menu Overlay */}
      <AnimatePresence>
        {isBottomMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsBottomMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 overflow-hidden"
              style={{ maxHeight: "80vh" }}
            >
              <div className="flex flex-col">
                {/* Top Close Button */}
                <div className="flex justify-end p-3">
                  <button
                    onClick={() => setIsBottomMenuOpen(false)}
                    className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition-colors shadow-lg"
                  >
                    <X className="h-6 w-6 text-red-600" />
                  </button>
                </div>

                {/* Handle */}
                <div className="flex justify-center pt-1 pb-3">
                  <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Close Text */}
                <div className="text-center pb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    Tap X to close menu
                  </span>
                </div>

                <div className="px-6 pb-8 space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/wishlist"
                        onClick={() => setIsBottomMenuOpen(false)}
                        className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-all duration-300 group"
                      >
                        <Heart className="h-8 w-8 text-gray-600 group-hover:text-amber-600 mb-2" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600">
                          Wishlist
                        </span>
                      </Link>

                      <Link
                        href="/categories"
                        onClick={() => setIsBottomMenuOpen(false)}
                        className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-all duration-300 group"
                      >
                        <svg
                          className="h-8 w-8 text-gray-600 group-hover:text-amber-600 mb-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600">
                          Categories
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4">
                      Navigation
                    </h3>
                    <div className="space-y-2">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsBottomMenuOpen(false)}
                          className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                        >
                          <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Account Section */}
                  {isAuthenticated ? (
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-4">
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
                            onClick={() => setIsBottomMenuOpen(false)}
                            className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                          >
                            <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span className="font-medium text-gray-700 group-hover:text-amber-600 transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsBottomMenuOpen(false);
                          }}
                          className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-xl group"
                        >
                          <span className="text-lg mr-3 group-hover:scale-125 transition-transform duration-300">
                            🚪
                          </span>
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-4">
                        Account
                      </h3>
                      <div className="space-y-3">
                        <Link
                          href="/login"
                          onClick={() => setIsBottomMenuOpen(false)}
                        >
                          <Button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold">
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsBottomMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            className="w-full py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700 rounded-xl font-bold"
                          >
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-4">
                      <a
                        href="tel:+1234567890"
                        className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Call Us</span>
                      </a>
                      <a
                        href="mailto:support@galaxylabs.com"
                        className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
