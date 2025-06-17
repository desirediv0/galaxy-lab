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

  const displayProduct = productDetails || product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1100px] max-h-[95vh] overflow-y-auto p-0 bg-white rounded-3xl">
        {/* Clean Header Design */}
        <DialogHeader className="sticky top-0 z-10 px-8 py-6 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {displayProduct.name}
              {displayProduct.hasSale && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 inline-flex items-center px-3 py-1 text-sm bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white rounded-full"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  SALE
                </motion.span>
              )}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Heart className="h-5 w-5 text-[#f01c33]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-5 w-5 text-[#c4ab66]" />
              </motion.button>
            </div>
          </div>
        </DialogHeader>

        {loading && !productDetails ? (
          <div className="py-20 flex justify-center items-center">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-[#c4ab66]/20 border-t-[#f01c33] rounded-full animate-spin"></div>
              <div className="mt-4 text-sm text-gray-600">Loading details...</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
            {/* Clean Product Image Section */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                  <Image
                    src={imgSrc || "/placeholder.svg"}
                    alt={displayProduct.name}
                    fill
                    className="object-contain p-8 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 600px"
                    onError={() => setImgSrc("/product-placeholder.jpg")}
                  />
                </div>
              </div>

              {/* Clean Rating Display */}
              {displayProduct.avgRating > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(displayProduct.avgRating || 0)
                              ? "text-[#c4ab66] fill-[#c4ab66]"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {displayProduct.avgRating?.toFixed(1)} (
                      {displayProduct.reviewCount || 0} reviews)
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Clean Product Details Section */}
            <div className="space-y-8">
              {/* Clean Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 rounded-xl flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium text-green-600">
                    Added to cart successfully!
                  </span>
                </motion.div>
              )}

              {/* Clean Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 rounded-xl flex items-center"
                >
                  <AlertCircle className="h-5 w-5 mr-3 text-[#f01c33]" />
                  <span className="font-medium text-[#f01c33]">{error}</span>
                </motion.div>
              )}

              {/* Clean Price Display */}
              <div className="p-6 bg-gray-50 rounded-xl">
                {getPriceDisplay()}
              </div>

              {/* Clean Flavor Selection */}
              {productDetails?.flavorOptions &&
                productDetails.flavorOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-lg font-bold text-gray-800">
                      <Sparkles className="w-5 h-5 text-[#f01c33]" />
                      Select Flavor
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {productDetails.flavorOptions.map((flavor) => {
                        const availableWeightIds = getAvailableWeightsForFlavor(
                          flavor.id
                        );
                        const isAvailable = availableWeightIds.length > 0;

                        return (
                          <motion.button
                            key={flavor.id}
                            onClick={() => handleFlavorChange(flavor)}
                            disabled={!isAvailable}
                            whileHover={{ scale: isAvailable ? 1.02 : 1 }}
                            whileTap={{ scale: isAvailable ? 0.98 : 1 }}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                              selectedFlavor?.id === flavor.id
                                ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white"
                                : isAvailable
                                ? "bg-white border border-gray-200 hover:border-[#f01c33] hover:text-[#f01c33]"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {flavor.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Clean Weight Selection */}
              {productDetails?.weightOptions &&
                productDetails.weightOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-lg font-bold text-gray-800">
                      <Sparkles className="w-5 h-5 text-[#c4ab66]" />
                      Select Weight
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {productDetails.weightOptions.map((weight) => {
                        const availableFlavorIds = getAvailableFlavorsForWeight(
                          weight.id
                        );
                        const isAvailable = selectedFlavor
                          ? isCombinationAvailable(selectedFlavor.id, weight.id)
                          : availableFlavorIds.length > 0;

                        return (
                          <motion.button
                            key={weight.id}
                            onClick={() => handleWeightChange(weight)}
                            disabled={!isAvailable}
                            whileHover={{ scale: isAvailable ? 1.02 : 1 }}
                            whileTap={{ scale: isAvailable ? 0.98 : 1 }}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
                              selectedWeight?.id === weight.id
                                ? "bg-gradient-to-r from-[#c4ab66] to-[#f01c33] text-white"
                                : isAvailable
                                ? "bg-white border border-gray-200 hover:border-[#c4ab66] hover:text-[#c4ab66]"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {weight.value} {weight.unit}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Clean Stock Status */}
              {selectedVariant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    selectedVariant.quantity > 0
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium flex items-center gap-2 ${
                      selectedVariant.quantity > 0 ? "text-green-600" : "text-[#f01c33]"
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
                </motion.div>
              )}

              {/* Clean Quantity Selector */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <ShoppingCart className="w-5 h-5" />
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || loading}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-5 w-5 text-[#f01c33]" />
                    </motion.button>
                    <span className="w-20 text-center py-3 font-medium text-lg bg-white border-x border-gray-100">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      disabled={loading || (selectedVariant?.quantity > 0 && quantity >= selectedVariant.quantity)}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-5 w-5 text-[#c4ab66]" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Clean Action Buttons */}
              <div className="flex gap-4 pt-6">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleAddToCart}
                    disabled={loading || addingToCart || (!selectedVariant && (!productDetails?.variants || productDetails.variants.length === 0)) || (selectedVariant && selectedVariant.quantity < 1)}
                    className="w-full h-14 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white font-medium rounded-xl disabled:opacity-50 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {addingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                <Link href={`/products/${displayProduct.slug}`} className="flex-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full h-14 border-2 border-gray-200 hover:border-[#c4ab66] text-gray-600 hover:text-[#c4ab66] font-medium rounded-xl transition-colors"
                    >
                      View Details
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
