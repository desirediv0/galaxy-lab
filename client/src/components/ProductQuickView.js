"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Heart,
  Share2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { motion } from "framer-motion";

export default function ProductQuickView({ product, open, onOpenChange }) {
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToCart } = useCart();
  const [productDetails, setProductDetails] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [availableCombinations, setAvailableCombinations] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Reset states when product changes or dialog closes
  useEffect(() => {
    if (!open) {
      // Reset everything when dialog closes
      setSelectedFlavor(null);
      setSelectedWeight(null);
      setSelectedVariant(null);
      setQuantity(1);
      setError(null);
      setSuccess(false);
      setProductDetails(null);
      setImgSrc("");
      setAvailableCombinations([]);
      setInitialLoading(true);
      return;
    }

    if (product) {
      // Set initial image when product changes
      setImgSrc(product.image || "/product-placeholder.jpg");
    }
  }, [product, open]);

  // Fetch product details when product changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product || !open) return;

      setLoading(true);
      setInitialLoading(true);
      try {
        // Fetch detailed product info
        const response = await fetchApi(`/public/products/${product.slug}`);
        if (response.data && response.data.product) {
          const productData = response.data.product;
          setProductDetails(productData);

          // Update image if available
          if (productData.images && productData.images.length > 0) {
            setImgSrc(
              productData.images[0].url ||
                productData.image ||
                "/product-placeholder.jpg"
            );
          }

          // Extract all available combinations from variants
          if (productData.variants && productData.variants.length > 0) {
            const combinations = productData.variants
              .filter((v) => v.isActive && v.quantity > 0)
              .map((variant) => ({
                flavorId: variant.flavorId,
                weightId: variant.weightId,
                variant: variant,
              }));

            setAvailableCombinations(combinations);

            // Set default selections
            if (productData.flavorOptions?.length > 0) {
              const firstFlavor = productData.flavorOptions[0];
              setSelectedFlavor(firstFlavor);

              // Find matching weights for this flavor
              const matchingVariant = combinations.find(
                (combo) => combo.flavorId === firstFlavor.id
              );

              if (matchingVariant && productData.weightOptions) {
                const matchingWeight = productData.weightOptions.find(
                  (weight) => weight.id === matchingVariant.weightId
                );

                if (matchingWeight) {
                  setSelectedWeight(matchingWeight);
                  setSelectedVariant(matchingVariant.variant);
                }
              }
            } else if (productData.variants.length > 0) {
              // If no flavor/weight options but variants exist, use the first variant
              setSelectedVariant(productData.variants[0]);
            }
          }
        } else {
          setError("Product details not available");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchProductDetails();
  }, [product, open]);

  // Get available weights for a specific flavor
  const getAvailableWeightsForFlavor = (flavorId) => {
    const availableWeights = availableCombinations
      .filter((combo) => combo.flavorId === flavorId)
      .map((combo) => combo.weightId);

    return availableWeights;
  };

  // Get available flavors for a specific weight
  const getAvailableFlavorsForWeight = (weightId) => {
    const availableFlavors = availableCombinations
      .filter((combo) => combo.weightId === weightId)
      .map((combo) => combo.flavorId);

    return availableFlavors;
  };

  // Check if a combination is available
  const isCombinationAvailable = (flavorId, weightId) => {
    return availableCombinations.some(
      (combo) => combo.flavorId === flavorId && combo.weightId === weightId
    );
  };

  // Handle flavor change
  const handleFlavorChange = (flavor) => {
    setSelectedFlavor(flavor);

    // Find available weights for this flavor
    const availableWeightIds = getAvailableWeightsForFlavor(flavor.id);

    if (
      productDetails?.weightOptions?.length > 0 &&
      availableWeightIds.length > 0
    ) {
      // Use currently selected weight if it's compatible with the new flavor
      if (selectedWeight && availableWeightIds.includes(selectedWeight.id)) {
        // Current weight is compatible, keep it selected
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.flavorId === flavor.id && combo.weightId === selectedWeight.id
        );

        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        // Current weight is not compatible, switch to first available
        const firstAvailableWeight = productDetails.weightOptions.find(
          (weight) => availableWeightIds.includes(weight.id)
        );

        if (firstAvailableWeight) {
          setSelectedWeight(firstAvailableWeight);

          // Find the corresponding variant
          const matchingVariant = availableCombinations.find(
            (combo) =>
              combo.flavorId === flavor.id &&
              combo.weightId === firstAvailableWeight.id
          );

          if (matchingVariant) {
            setSelectedVariant(matchingVariant.variant);
          }
        }
      }
    } else {
      setSelectedWeight(null);
      setSelectedVariant(null);
    }
  };

  // Handle weight change
  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);

    // Find available flavors for this weight
    const availableFlavorIds = getAvailableFlavorsForWeight(weight.id);

    if (
      productDetails?.flavorOptions?.length > 0 &&
      availableFlavorIds.length > 0
    ) {
      // Use currently selected flavor if it's compatible with the new weight
      if (selectedFlavor && availableFlavorIds.includes(selectedFlavor.id)) {
        // Current flavor is compatible, keep it selected
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.weightId === weight.id && combo.flavorId === selectedFlavor.id
        );

        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        // Current flavor is not compatible, switch to first available
        const firstAvailableFlavor = productDetails.flavorOptions.find(
          (flavor) => availableFlavorIds.includes(flavor.id)
        );

        if (firstAvailableFlavor) {
          setSelectedFlavor(firstAvailableFlavor);

          // Find the corresponding variant
          const matchingVariant = availableCombinations.find(
            (combo) =>
              combo.weightId === weight.id &&
              combo.flavorId === firstAvailableFlavor.id
          );

          if (matchingVariant) {
            setSelectedVariant(matchingVariant.variant);
          }
        }
      }
    } else {
      setSelectedFlavor(null);
      setSelectedVariant(null);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) return;
    if (
      selectedVariant &&
      selectedVariant.quantity > 0 &&
      newQuantity > selectedVariant.quantity
    )
      return;
    setQuantity(newQuantity);
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    setAddingToCart(true);
    setError(null);
    setSuccess(false);

    // If no variant is selected but product has variants, use the first one
    let variantToAdd = selectedVariant;

    if (!variantToAdd && productDetails?.variants?.length > 0) {
      variantToAdd = productDetails.variants[0];
    }

    if (!variantToAdd) {
      setError("No product variant available");
      setAddingToCart(false);
      return;
    }

    try {
      await addToCart(variantToAdd.id, quantity);
      setSuccess(true);

      // Auto close after success notification
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  // Format price display
  const getPriceDisplay = () => {
    // Show loading state while initial data is being fetched
    if (initialLoading || loading) {
      return <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>;
    }

    // If we have a selected variant, show its price
    if (selectedVariant) {
      if (selectedVariant.salePrice && selectedVariant.salePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {formatCurrency(selectedVariant.salePrice)}
            </span>
            <span className="text-xl text-gray-500 line-through">
              {formatCurrency(selectedVariant.price)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
          {formatCurrency(selectedVariant.price || 0)}
        </span>
      );
    }

    // If no variant but product details available, show base price
    if (productDetails) {
      if (productDetails.hasSale && productDetails.basePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {formatCurrency(productDetails.basePrice)}
            </span>
            <span className="text-xl text-gray-500 line-through">
              {formatCurrency(productDetails.regularPrice || 0)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
          {formatCurrency(productDetails.basePrice || 0)}
        </span>
      );
    }

    // Fallback to product from props if no details fetched yet
    if (product) {
      if (product.hasSale && product.basePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {formatCurrency(product.basePrice)}
            </span>
            <span className="text-xl text-gray-500 line-through">
              {formatCurrency(product.regularPrice || 0)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
          {formatCurrency(product.basePrice || 0)}
        </span>
      );
    }

    return null;
  };

  if (!product) return null;

  // Use the detailed product info if available, otherwise fall back to the basic product
  const displayProduct = productDetails || product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto p-0 bg-white/95 backdrop-blur-md border-2 border-white/50 shadow-2xl rounded-3xl">
        {/* Enhanced Header */}
        <DialogHeader className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent pr-8">
              {displayProduct.name}
            </DialogTitle>
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 p-0 hover:bg-gradient-to-r hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 rounded-2xl transition-all duration-300"
                >
                  <Heart className="h-5 w-5 text-[#f01c33]" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 p-0 hover:bg-gradient-to-r hover:from-[#c4ab66]/10 hover:to-[#f01c33]/10 rounded-2xl transition-all duration-300"
                >
                  <Share2 className="h-5 w-5 text-[#c4ab66]" />
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogHeader>

        {loading && !productDetails ? (
          <div className="py-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-[#f01c33] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
            {/* Enhanced Product Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-96 lg:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white shadow-xl border border-white/50">
                <Image
                  src={imgSrc || "/placeholder.svg"}
                  alt={displayProduct.name}
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 450px"
                  onError={() => setImgSrc("/product-placeholder.jpg")}
                />
                {displayProduct.hasSale && (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-6 left-6 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    SALE
                  </motion.div>
                )}
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-r from-[#c4ab66] to-[#f01c33] rounded-full opacity-20 blur-sm"
                ></motion.div>
              </div>
            </div>

            {/* Enhanced Product Info */}
            <div className="flex flex-col space-y-8">
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 text-green-700 text-sm rounded-2xl flex items-center shadow-lg"
                >
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="font-bold">
                    Item added to cart successfully!
                  </span>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 text-sm rounded-2xl flex items-center shadow-lg"
                >
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span className="font-bold">{error}</span>
                </motion.div>
              )}

              {/* Enhanced Price */}
              <div className="border-b border-gray-100 pb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-2xl blur-xl"></div>
                  <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                    {getPriceDisplay()}
                  </div>
                </div>
              </div>

              {/* Enhanced Rating */}
              {displayProduct.avgRating > 0 && (
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 transition-all duration-300 ${
                          star <= Math.round(displayProduct.avgRating || 0)
                            ? "text-[#c4ab66] fill-[#c4ab66]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-bold">
                    {displayProduct.avgRating?.toFixed(1)} (
                    {displayProduct.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Enhanced Flavor selection */}
              {productDetails?.flavorOptions &&
                productDetails.flavorOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="block text-lg font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#f01c33]" />
                      Choose Flavor
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {productDetails.flavorOptions.map((flavor) => {
                        const availableWeightIds = getAvailableWeightsForFlavor(
                          flavor.id
                        );
                        const isAvailable = availableWeightIds.length > 0;

                        return (
                          <motion.button
                            key={flavor.id}
                            type="button"
                            onClick={() => handleFlavorChange(flavor)}
                            disabled={!isAvailable}
                            whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                            whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                            className={`px-6 py-3 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                              selectedFlavor?.id === flavor.id
                                ? "border-[#f01c33] bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white shadow-lg"
                                : isAvailable
                                ? "border-gray-300 hover:border-[#f01c33] hover:text-[#f01c33] bg-white"
                                : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                            }`}
                          >
                            {flavor.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Enhanced Weight selection */}
              {productDetails?.weightOptions &&
                productDetails.weightOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="block text-lg font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#c4ab66]" />
                      Choose Weight
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {productDetails.weightOptions.map((weight) => {
                        const availableFlavorIds = getAvailableFlavorsForWeight(
                          weight.id
                        );
                        const isAvailable = selectedFlavor
                          ? availableCombinations.some(
                              (combo) =>
                                combo.flavorId === selectedFlavor.id &&
                                combo.weightId === weight.id
                            )
                          : availableFlavorIds.length > 0;

                        return (
                          <motion.button
                            key={weight.id}
                            type="button"
                            onClick={() => handleWeightChange(weight)}
                            disabled={!isAvailable}
                            whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                            whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                            className={`px-6 py-3 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                              selectedWeight?.id === weight.id
                                ? "border-[#c4ab66] bg-gradient-to-r from-[#c4ab66] to-[#f01c33] text-white shadow-lg"
                                : isAvailable
                                ? "border-gray-300 hover:border-[#c4ab66] hover:text-[#c4ab66] bg-white"
                                : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                            }`}
                          >
                            {weight.value} {weight.unit}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Enhanced Stock Availability */}
              {selectedVariant && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl blur-sm"></div>
                  <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-lg">
                    <span
                      className={`text-sm font-bold flex items-center gap-2 ${
                        selectedVariant.quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedVariant.quantity > 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          In Stock ({selectedVariant.quantity} available)
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5" />
                          Out of Stock
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Enhanced Quantity */}
              <div className="space-y-4">
                <label className="block text-lg font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  Quantity
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1 || loading}
                    >
                      <Minus className="h-5 w-5 text-[#f01c33]" />
                    </motion.button>
                    <span className="px-8 py-4 bg-white font-bold text-xl text-gray-800 min-w-[5rem] text-center">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#c4ab66]/10 hover:to-[#f01c33]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        loading ||
                        (selectedVariant &&
                          selectedVariant.quantity > 0 &&
                          quantity >= selectedVariant.quantity)
                      }
                    >
                      <Plus className="h-5 w-5 text-[#c4ab66]" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex space-x-4 pt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleAddToCart}
                    className="group w-full py-6 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                    disabled={
                      loading ||
                      addingToCart ||
                      (!selectedVariant &&
                        (!productDetails?.variants ||
                          productDetails.variants.length === 0)) ||
                      (selectedVariant && selectedVariant.quantity < 1)
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      {addingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding to Cart...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-6 w-6" />
                          Add to Cart
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                <Link
                  href={`/products/${displayProduct.slug}`}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      className="w-full py-6 border-2 border-[#f01c33] text-[#f01c33] hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66] hover:text-white hover:border-transparent font-bold text-lg rounded-2xl transition-all duration-500 shadow-lg hover:shadow-xl"
                    >
                      View Full Details
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
