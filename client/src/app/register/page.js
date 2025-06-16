"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  UserPlus,
  CheckCircle,
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AuthRedirect } from "@/components/auth-redirect";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      toast.error("Name should be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success(
        "Registration successful! Please check your email to verify your account.",
        {
          duration: 5000,
        }
      );

      localStorage.setItem("registeredEmail", formData.email);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gradient-to-br from-white via-white to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <Toaster position="top-center" />

        {/* Header with logo */}
        <div className="relative z-10  backdrop-blur-md shadow-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center justify-center">
             <Image
                src="/logo.png"
                alt="Power Fitness Logo"
                width={200}
                height={200}
                className="h-20 w-auto"
              />  
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg">
            {/* Registration Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
             

              {/* Form Section */}
              <div className="px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                      >
                        <User className="h-4 w-4 mr-2 text-[#f01c33]" />
                        Full Name <span className="text-[#f01c33] ml-1">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                      >
                        <Mail className="h-4 w-4 mr-2 text-[#f01c33]" />
                        Email Address{" "}
                        <span className="text-[#f01c33] ml-1">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                      >
                        <Phone className="h-4 w-4 mr-2 text-[#f01c33]" />
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="password"
                          className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                        >
                          <Lock className="h-4 w-4 mr-2 text-[#f01c33]" />
                          Password{" "}
                          <span className="text-[#f01c33] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create password"
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

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                        >
                          <Lock className="h-4 w-4 mr-2 text-[#f01c33]" />
                          Confirm <span className="text-[#f01c33] ml-1">*</span>
                        </label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                          className="w-full h-14 px-4 border-2 border-gray-200 rounded-xl focus:border-[#f01c33] focus:ring-[#f01c33] transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 p-5 rounded-xl border border-[#f01c33]/20 backdrop-blur-sm">
                    <p className="text-sm text-[#f01c33] font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Password Requirements:
                    </p>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#f01c33] rounded-full"></div>
                        <span>At least 8 characters long</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#c4ab66] rounded-full"></div>
                        <span>Mix of letters and numbers recommended</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full">
                    Already have an account?
                  </span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full h-14 border-2 border-[#f01c33]/30 text-[#f01c33] hover:bg-[#f01c33]/5 hover:border-[#f01c33] font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
                    >
                      Sign In Instead
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-xl p-4">
                By creating an account, you agree to our{" "}
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
