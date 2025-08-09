"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Shield,
  Gift,
  Truck,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

// Helper function to format image URLs correctly
const getImageUrl = (image) => {
  if (!image) return "/placeholder.jpg";
  if (image.startsWith("http")) return image;
  return `https://desirediv-storage.blr1.digitaloceanspaces.com/${image}`;
};

// Cart item component to optimize re-renders
const CartItem = React.memo(
  ({ item, onUpdateQuantity, onRemove, isLoading }) => {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg border border-gray-100 mb-4 shadow-sm">
        <div className="md:col-span-6 flex items-center">
          <div className="relative h-24 w-24 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl overflow-hidden mr-4 flex-shrink-0 shadow-md">
            <Image
              src={getImageUrl(item.image || item.product?.image)}
              alt={item.productName || item.product?.name}
              fill
              className="object-contain p-3"
            />
          </div>
          <div className="flex-1">
            <Link
              href={`/products/${item.productSlug || item.product?.slug}`}
              className="font-semibold text-gray-900 hover:text-yellow-600 transition-colors duration-200 text-lg"
            >
              {item.productName || item.product?.name}
            </Link>
            <div className="text-sm text-gray-600 mt-2 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                {item.variantName ||
                  `${item.variant?.flavor?.name || ""} ${
                    item.variant?.weight?.value || ""
                  }${item.variant?.weight?.unit || ""}`}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
          <span className="md:hidden font-medium text-gray-700">Price:</span>
          <span className="font-bold text-lg text-gray-900">
            {formatCurrency(item.price)}
          </span>
        </div>

        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
          <span className="md:hidden font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity, -1)}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isLoading || item.quantity <= 1}
            >
              <Minus className="h-4 w-4 text-gray-600" />
            </button>
            <span className="px-4 py-2 bg-white font-semibold text-gray-900 min-w-[60px] text-center">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin inline" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity, 1)}
              className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-between md:justify-center">
          <div className="flex items-center md:block">
            <span className="md:hidden mr-2 font-medium text-gray-700">
              Subtotal:
            </span>
            <span className="font-bold text-lg text-green-600">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg ml-4 disabled:opacity-50 transition-all duration-200"
            aria-label="Remove item"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    );
  }
);
CartItem.displayName = "CartItem";

export default function CartPage() {
  const {
    cart,
    loading,
    cartItemsLoading,
    error,
    removeFromCart,
    updateCartItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    coupon,
    couponLoading,
    getCartTotals,
    isAuthenticated,
    mergeProgress,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const router = useRouter();

  // Use useCallback to memoize handlers
  const handleQuantityChange = useCallback(
    async (cartItemId, currentQuantity, change) => {
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) return;

      try {
        await updateCartItem(cartItemId, newQuantity);
        toast.success("Cart updated successfully");
      } catch (err) {
        console.error("Error updating quantity:", err);
        toast.error("Failed to update cart");
      }
    },
    [updateCartItem]
  );

  const handleRemoveItem = useCallback(
    async (cartItemId) => {
      try {
        await removeFromCart(cartItemId);
        toast.success("Item removed from cart");
      } catch (err) {
        console.error("Error removing item:", err);
        toast.error("Failed to remove item");
      }
    },
    [removeFromCart]
  );

  const handleClearCart = useCallback(async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await clearCart();
        toast.success("Cart has been cleared");
      } catch (err) {
        console.error("Error clearing cart:", err);
        toast.error("Failed to clear cart");
      }
    }
  }, [clearCart]);

  const handleApplyCoupon = useCallback(
    async (e) => {
      e.preventDefault();

      if (!couponCode.trim()) {
        setCouponError("Please enter a coupon code");
        return;
      }

      setCouponError("");

      try {
        const response = await applyCoupon(couponCode);
        setCouponCode("");
        toast.success("Coupon applied successfully");
      } catch (err) {
        setCouponError(err.message || "Invalid coupon code");
        toast.error(err.message || "Invalid coupon code");
      }
    },
    [couponCode, applyCoupon]
  );

  const handleRemoveCoupon = useCallback(() => {
    removeCoupon();
    setCouponCode("");
    setCouponError("");
    toast.success("Coupon removed");
  }, [removeCoupon]);

  // Memoize cart totals to prevent re-renders
  const totals = useMemo(() => getCartTotals(), [getCartTotals, cart, coupon]);

  const handleCheckout = useCallback(() => {
    // Ensure minimum amount is 1
    const calculatedAmount = totals.subtotal - totals.discount;
    if (calculatedAmount < 1) {
      toast.info("Minimum order amount is ₹1");
      return;
    }

    if (!isAuthenticated) {
      router.push("/login?redirect=checkout");
    } else {
      router.push("/checkout");
    }
  }, [isAuthenticated, router, totals]);

  // Display loading state
  if (loading && (!cart.items || cart.items.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link href="/products" className="mr-4">
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // Display empty cart - but not when there's an error
  if ((!cart.items || cart.items.length === 0) && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Link href="/products" className="mr-4">
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
          </div>
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center border border-gray-100 max-w-2xl mx-auto">
            <div className="inline-flex justify-center items-center bg-gradient-to-br from-yellow-100 to-amber-100 p-8 rounded-full mb-6">
              <ShoppingBag className="h-16 w-16 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/products" className="mr-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-yellow-300 hover:border-yellow-400 hover:bg-yellow-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Your Shopping Cart
          </h1>
        </div>

        {/* Guest cart notice */}
        {!isAuthenticated && cart.items.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-200 p-8 rounded-2xl flex items-start mb-8 shadow-lg">
            <div className="flex-shrink-0 mr-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Guest Shopping Cart
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                You&apos;re currently shopping as a guest. To complete your
                purchase and save your cart items for future visits, please log
                in to your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login?redirect=cart">
                  <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    Log In to Continue
                  </Button>
                </Link>
                <Link href="/register?redirect=cart">
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-yellow-500 text-gray-700 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Show general cart error as a banner if it exists */}
        {error && (
          <div className="bg-red-50 p-6 rounded-2xl flex items-start mb-8 border border-red-200 shadow-lg">
            <AlertCircle className="text-red-500 mr-4 mt-1 flex-shrink-0 h-6 w-6" />
            <div>
              <h2 className="text-xl font-semibold text-red-700 mb-2">
                Cart Error
              </h2>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Show merge progress */}
        {mergeProgress && (
          <div className="bg-yellow-50 p-6 rounded-2xl flex items-start mb-8 border border-yellow-200 shadow-lg">
            <Loader2 className="text-yellow-500 mr-4 mt-1 flex-shrink-0 h-6 w-6 animate-spin" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                Merging Cart
              </h2>
              <p className="text-yellow-600">{mergeProgress}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="col-span-6 font-semibold text-gray-700">
                  Product
                </div>
                <div className="col-span-2 font-semibold text-center text-gray-700">
                  Price
                </div>
                <div className="col-span-2 font-semibold text-center text-gray-700">
                  Quantity
                </div>
                <div className="col-span-2 font-semibold text-center text-gray-700">
                  Subtotal
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-6">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    isLoading={cartItemsLoading[item.id]}
                  />
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center">
                <Link href="/products">
                  <Button variant="outline" className="rounded-xl px-6 py-3">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl px-6 py-3 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Cart Summary
              </h2>

              {/* Apply Coupon */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-yellow-600" />
                  Have a coupon?
                </h3>
                {coupon ? (
                  <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div>
                      <span className="font-bold text-green-700 text-lg">
                        {coupon.code}
                      </span>
                      <p className="text-sm text-green-600 mt-1">
                        {coupon.discountType === "PERCENTAGE"
                          ? `${coupon.discountValue}% off`
                          : `₹${coupon.discountValue} off`}
                      </p>
                      {((parseFloat(coupon.discountValue) > 90 &&
                        coupon.discountType === "PERCENTAGE") ||
                        coupon.isDiscountCapped) && (
                        <p className="text-xs text-amber-600 mt-1">
                          *Maximum discount capped at 90%
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-sm text-red-500 hover:text-red-700 font-semibold"
                      disabled={couponLoading}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <form
                      onSubmit={handleApplyCoupon}
                      className="flex space-x-2"
                    >
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        className={`flex-1 rounded-xl ${
                          couponError
                            ? "border-red-300 focus-visible:ring-red-300"
                            : ""
                        }`}
                      />
                      <Button
                        type="submit"
                        disabled={couponLoading}
                        variant="outline"
                        className="rounded-xl"
                      >
                        {couponLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                      *Maximum discount limited to 90% of cart value
                    </p>
                    {couponError && (
                      <div className="mt-3 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{couponError}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Price Details */}
              <div className="border-t pt-6">
                <div className="space-y-4 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(totals.subtotal)}
                    </span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">
                        -{formatCurrency(totals.discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-green-600" />
                      Shipping
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-2xl mt-6 pt-6 border-t">
                  <span>Total</span>
                  <span className="text-green-600">
                    {formatCurrency(totals.subtotal - totals.discount)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
