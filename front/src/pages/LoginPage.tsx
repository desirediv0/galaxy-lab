"use client";

import type React from "react";

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Loader2,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { loginbg } from "@/assets";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate inputs
    if (!email.trim()) {
      setFormError("Email is required");
      return;
    }
    if (!password) {
      setFormError("Password is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
    } catch (error: any) {
      console.error("Login error:", error);
      setFormError(error.message || "Failed to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex h-screen w-full">
        {/* Left Side - Enhanced Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
          {/* Brand Logo/Title */}
          <div className="absolute top-8 left-8 z-30">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Galaxy Labs
                </h1>
                <p className="text-sm text-gray-300 font-medium">
                  Admin Portal
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="flex-1 relative group overflow-hidden cursor-pointer">
            <img
              src={loginbg}
              alt="Galaxy Labs - Premium Supplements"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            />

            {/* Enhanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500" />

            {/* Enhanced Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-12 text-white">
              <div className="text-center max-w-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500 delay-200 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Galaxy Labs
                </h2>

                <p className="text-xl lg:text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-300 leading-relaxed font-light">
                  Premium Supplements for Your Fitness Journey
                </p>

                {/* Enhanced Decorative Line */}
                <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400 rounded-full shadow-lg shadow-orange-500/50"></div>
              </div>
            </div>

            {/* Enhanced Decorative Elements */}
            <div className="absolute top-12 right-12 w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm bg-white/10">
              <Shield className="w-10 h-10 text-white" />
            </div>

            {/* Bottom Corner Accent */}
            <div className="absolute bottom-12 left-12 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              <div className="flex items-center space-x-3 text-white/90 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Secure Admin Access</span>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Brand Header */}
            <div className="lg:hidden text-center mb-10">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Galaxy Labs
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    Admin Portal
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Login Form Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/10 border border-white/20">
              {/* Login Form Header */}
              <div className="text-center space-y-4 mb-8">
                <div className="hidden lg:flex lg:justify-center lg:mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-gray-600 font-medium">
                  Sign in to access your admin dashboard
                </p>
              </div>

              {/* Enhanced Error Display */}
              {(error || formError) && (
                <div className="rounded-2xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-4 text-center mb-6 shadow-lg">
                  <p className="text-sm text-red-700 font-semibold">
                    {formError || error}
                  </p>
                </div>
              )}

              {/* Enhanced Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@galaxylabs.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                      className="h-14 text-base pl-12 rounded-2xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      required
                      className="h-14 text-base pl-12 pr-12 rounded-2xl border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-500/20 cursor-pointer rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-3 h-5 w-5" />
                      Sign in to Dashboard
                    </>
                  )}
                </Button>
              </form>

              {/* Enhanced Footer */}
              <div className="text-center pt-8 mt-8 border-t border-gray-200/50">
                <p className="text-sm text-gray-600 font-medium">
                  © 2025 Galaxy Labs. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Secure admin access portal with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
