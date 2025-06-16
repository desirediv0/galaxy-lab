"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ShoppingBag, Zap, Lock, Mail } from "lucide-react";
import { AuthRedirect } from "@/components/auth-redirect";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      sessionStorage.setItem("justLoggedIn", "true");
      toast.success("Login successful! Redirecting...");

      const returnUrl = searchParams.get("returnUrl");
      setTimeout(() => {
        window.location.href = returnUrl ? decodeURIComponent(returnUrl) : "/";
      }, 300);
    } catch (error) {
      const errorMessage =
        error.message || "Login failed. Please check your credentials.";

      if (
        errorMessage.toLowerCase().includes("verify") ||
        errorMessage.toLowerCase().includes("verification")
      ) {
        toast.error(
          <div>
            {errorMessage}{" "}
            <Link
              href="/resend-verification"
              className="text-white font-medium underline"
            >
              Resend verification email
            </Link>
          </div>
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gradient-to-br from-[#f01c33]/5 via-white to-[#c4ab66]/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Toaster position="top-center" />

        {/* Header with logo */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center justify-center">
             <Image
                src="/logo.png"
                alt="Power Fitness Logo"
                width={200}
                height={200}
                className="h-20  rounded-full"
              />
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Welcome Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] px-8 py-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
                    <Zap className="h-10 w-10 text-white" />
                  </div> */}
                  <h1 className="text-3xl font-bold text-white mb-3">
                    Welcome Back!
                  </h1>
                  <p className="text-white/90 text-lg">
                    Sign in to continue your fitness journey
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                      >
                        <Mail className="h-4 w-4 mr-2 text-[#f01c33]" />
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label
                          htmlFor="password"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <Lock className="h-4 w-4 mr-2 text-[#f01c33]" />
                          Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-[#f01c33] hover:text-[#c4ab66] font-medium transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#f01c33] transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full">
                    New to Power Fitness?
                  </span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="w-full h-14 border-2 border-[#f01c33]/30 text-[#f01c33] hover:bg-[#f01c33]/5 hover:border-[#f01c33] font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
                    >
                      Create New Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-xl p-4">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-[#f01c33] hover:text-[#c4ab66] font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#f01c33] hover:text-[#c4ab66] font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
}
