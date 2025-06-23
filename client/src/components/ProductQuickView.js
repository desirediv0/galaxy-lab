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
        const response = await fetchApi(`/public/products/${product.slug}`);
        if (response.data && response.data.product) {
          const productData = response.data.product;
          setProductDetails(productData);

          if (productData.images && productData.images.length > 0) {
            setImgSrc(
              productData.images[0].url ||
                productData.image ||
                "/product-placeholder.jpg"
            );
          }

          if (productData.variants && productData.variants.length > 0) {
            const combinations = productData.variants
              .filter((v) => v.isActive && v.quantity > 0)
              .map((variant) => ({
                flavorId: variant.flavorId,
                weightId: variant.weightId,
                variant: variant,
              }));

            setAvailableCombinations(combinations);

            if (productData.flavorOptions?.length > 0) {
              const firstFlavor = productData.flavorOptions[0];
              setSelectedFlavor(firstFlavor);

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

  const getAvailableWeightsForFlavor = (flavorId) => {
    const availableWeights = availableCombinations
      .filter((combo) => combo.flavorId === flavorId)
      .map((combo) => combo.weightId);
    return availableWeights;
  };

  const getAvailableFlavorsForWeight = (weightId) => {
    const availableFlavors = availableCombinations
      .filter((combo) => combo.weightId === weightId)
      .map((combo) => combo.flavorId);
    return availableFlavors;
  };

  const isCombinationAvailable = (flavorId, weightId) => {
    return availableCombinations.some(
      (combo) => combo.flavorId === flavorId && combo.weightId === weightId
    );
  };

  const handleFlavorChange = (flavor) => {
    setSelectedFlavor(flavor);
    const availableWeightIds = getAvailableWeightsForFlavor(flavor.id);

    if (
      productDetails?.weightOptions?.length > 0 &&
      availableWeightIds.length > 0
    ) {
      if (selectedWeight && availableWeightIds.includes(selectedWeight.id)) {
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.flavorId === flavor.id && combo.weightId === selectedWeight.id
        );
        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        const firstAvailableWeight = productDetails.weightOptions.find(
          (weight) => availableWeightIds.includes(weight.id)
        );
        if (firstAvailableWeight) {
          setSelectedWeight(firstAvailableWeight);
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

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    const availableFlavorIds = getAvailableFlavorsForWeight(weight.id);

    if (
      productDetails?.flavorOptions?.length > 0 &&
      availableFlavorIds.length > 0
    ) {
      if (selectedFlavor && availableFlavorIds.includes(selectedFlavor.id)) {
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.weightId === weight.id && combo.flavorId === selectedFlavor.id
        );
        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        const firstAvailableFlavor = productDetails.flavorOptions.find(
          (flavor) => availableFlavorIds.includes(flavor.id)
        );
        if (firstAvailableFlavor) {
          setSelectedFlavor(firstAvailableFlavor);
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

  const handleAddToCart = async () => {
    setAddingToCart(true);
    setError(null);
    setSuccess(false);

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

  const getPriceDisplay = () => {
    if (initialLoading || loading) {
      return <div className="h-8 w-32 bg-white/30 animate-pulse rounded"></div>;
    }

    if (selectedVariant) {
      if (selectedVariant.salePrice && selectedVariant.salePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
              {formatCurrency(selectedVariant.salePrice)}
            </span>
            <span className="text-xl text-amber-600 line-through">
              {formatCurrency(selectedVariant.price)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
          {formatCurrency(selectedVariant.price || 0)}
        </span>
      );
    }

    if (productDetails) {
      if (productDetails.hasSale && productDetails.basePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
              {formatCurrency(productDetails.basePrice)}
            </span>
            <span className="text-xl text-amber-600 line-through">
              {formatCurrency(productDetails.regularPrice || 0)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
          {formatCurrency(productDetails.basePrice || 0)}
        </span>
      );
    }

    if (product) {
      if (product.hasSale && product.basePrice > 0) {
        return (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
              {formatCurrency(product.basePrice)}
            </span>
            <span className="text-xl text-amber-600 line-through">
              {formatCurrency(product.regularPrice || 0)}
            </span>
          </div>
        );
      }
      return (
        <span className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
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
      <DialogContent className="sm:max-w-[850px] max-h-[85vh] overflow-y-auto p-0 bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl">
        {/* Glassmorphism Header Design */}
        <DialogHeader className="sticky top-0 z-10 px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-white/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-800 to-amber-700 bg-clip-text text-transparent drop-shadow-sm">
              {displayProduct.name}
              {displayProduct.hasSale && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 inline-flex items-center px-3 py-1 text-sm bg-white/30 backdrop-blur-md border border-white/40 text-amber-900 rounded-full shadow-lg"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  SALE
                </motion.span>
              )}
            </DialogTitle>
          </div>
        </DialogHeader>

        {loading && !productDetails ? (
          <div className="py-20 flex justify-center items-center">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-white/30 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="mt-4 text-sm text-amber-700">
                Loading details...
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
            {/* Glassmorphism Product Image Section */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
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

              {/* Glass Rating Display */}
              {displayProduct.avgRating > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(displayProduct.avgRating || 0)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-amber-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm font-medium text-amber-800">
                      {displayProduct.avgRating?.toFixed(1)} (
                      {displayProduct.reviewCount || 0} reviews)
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Glassmorphism Product Details Section */}
            <div className="space-y-8">
              {/* Glass Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100/50 backdrop-blur-md rounded-xl flex items-center border border-green-200/50 shadow-lg"
                >
                  <CheckCircle className="h-5 w-5 mr-3 text-green-600" />
                  <span className="font-medium text-green-700">
                    Added to cart successfully!
                  </span>
                </motion.div>
              )}

              {/* Glass Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100/50 backdrop-blur-md rounded-xl flex items-center border border-red-200/50 shadow-lg"
                >
                  <AlertCircle className="h-5 w-5 mr-3 text-red-600" />
                  <span className="font-medium text-red-700">{error}</span>
                </motion.div>
              )}

              {/* Glass Price Display */}
              <div className="p-6 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">
                {getPriceDisplay()}
              </div>

              {/* Glass Flavor Selection */}
              {productDetails?.flavorOptions &&
                productDetails.flavorOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-lg font-bold text-amber-800">
                      <Sparkles className="w-5 h-5 text-amber-700" />
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
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors border shadow-lg ${
                              selectedFlavor?.id === flavor.id
                                ? "bg-white/40 backdrop-blur-md border-white/50 text-amber-900"
                                : isAvailable
                                ? "bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50 hover:text-amber-800 text-amber-700"
                                : "bg-white/10 text-amber-400 cursor-not-allowed border-white/20"
                            }`}
                          >
                            {flavor.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Glass Weight Selection */}
              {productDetails?.weightOptions &&
                productDetails.weightOptions.length > 0 && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-lg font-bold text-amber-800">
                      <Sparkles className="w-5 h-5 text-amber-700" />
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
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors border shadow-lg ${
                              selectedWeight?.id === weight.id
                                ? "bg-white/40 backdrop-blur-md border-white/50 text-amber-900"
                                : isAvailable
                                ? "bg-white/20 backdrop-blur-md border-white/30 hover:border-white/50 hover:text-amber-800 text-amber-700"
                                : "bg-white/10 text-amber-400 cursor-not-allowed border-white/20"
                            }`}
                          >
                            {weight.value} {weight.unit}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Glass Stock Status */}
              {selectedVariant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl backdrop-blur-md border shadow-lg ${
                    selectedVariant.quantity > 0
                      ? "bg-green-100/30 border-green-200/50"
                      : "bg-red-100/30 border-red-200/50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium flex items-center gap-2 ${
                      selectedVariant.quantity > 0
                        ? "text-green-700"
                        : "text-red-700"
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

              {/* Glass Quantity Selector */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-bold text-amber-800">
                  <ShoppingCart className="w-5 h-5" />
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/30 shadow-lg">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || loading}
                      className="p-3 hover:bg-white/30 transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-5 w-5 text-amber-700" />
                    </motion.button>
                    <span className="w-20 text-center py-3 font-medium text-lg bg-white/30 border-x border-white/30 text-amber-900">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(1)}
                      disabled={
                        loading ||
                        (selectedVariant?.quantity > 0 &&
                          quantity >= selectedVariant.quantity)
                      }
                      className="p-3 hover:bg-white/30 transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-5 w-5 text-amber-700" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Glass Action Buttons */}
              <div className="flex gap-4 pt-6">
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleAddToCart}
                    disabled={
                      loading ||
                      addingToCart ||
                      (!selectedVariant &&
                        (!productDetails?.variants ||
                          productDetails.variants.length === 0)) ||
                      (selectedVariant && selectedVariant.quantity < 1)
                    }
                    className="w-full h-14 bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/40 text-amber-900 font-medium rounded-xl disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {addingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
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

                <Link
                  href={`/products/${displayProduct.slug}`}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-14 border-2 border-white/40 bg-white/20 backdrop-blur-md hover:border-white/50 text-amber-800 hover:text-amber-900 font-medium rounded-xl transition-colors shadow-lg hover:shadow-xl"
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
