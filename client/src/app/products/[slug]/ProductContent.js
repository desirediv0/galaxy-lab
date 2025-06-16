"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Star,
  Minus,
  Plus,
  AlertCircle,
  ShoppingCart,
  Heart,
  ChevronRight,
  CheckCircle,
  Shield,
  Truck,
  Award,
  Sparkles,
  Zap,
  Crown,
  TrendingUp,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import ReviewSection from "./ReviewSection";
import { motion } from "framer-motion";

export default function ProductContent({ slug }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [selectedShade, setSelectedShade] = useState(null);
  const [availableCombinations, setAvailableCombinations] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const { addToCart } = useCart();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setInitialLoading(true);
      try {
        const response = await fetchApi(`/public/products/${slug}`);
        const productData = response.data.product;
        setProduct(productData);
        setRelatedProducts(response.data.relatedProducts || []);

        if (productData.images && productData.images.length > 0) {
          setMainImage(productData.images[0]);
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

          if (
            productData.flavorOptions &&
            productData.flavorOptions.length > 0
          ) {
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
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    if (slug) {
      fetchProductDetails();
    }
  }, [slug]);

  const isCombinationAvailable = (flavorId, weightId) => {
    return availableCombinations.some(
      (combo) => combo.flavorId === flavorId && combo.weightId === weightId
    );
  };

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

  const handleFlavorChange = (flavor) => {
    setSelectedFlavor(flavor);

    const availableWeightIds = getAvailableWeightsForFlavor(flavor.id);

    if (product?.weightOptions?.length > 0 && availableWeightIds.length > 0) {
      if (selectedWeight && availableWeightIds.includes(selectedWeight.id)) {
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.flavorId === flavor.id && combo.weightId === selectedWeight.id
        );

        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        const firstAvailableWeight = product.weightOptions.find((weight) =>
          availableWeightIds.includes(weight.id)
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

    if (product?.flavorOptions?.length > 0 && availableFlavorIds.length > 0) {
      if (selectedFlavor && availableFlavorIds.includes(selectedFlavor.id)) {
        const matchingVariant = availableCombinations.find(
          (combo) =>
            combo.weightId === weight.id && combo.flavorId === selectedFlavor.id
        );

        if (matchingVariant) {
          setSelectedVariant(matchingVariant.variant);
        }
      } else {
        const firstAvailableFlavor = product.flavorOptions.find((flavor) =>
          availableFlavorIds.includes(flavor.id)
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

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated || !product) return;

      try {
        const response = await fetchApi("/users/wishlist", {
          credentials: "include",
        });

        const wishlistItems = response.data.wishlistItems || [];
        const inWishlist = wishlistItems.some(
          (item) => item.productId === product.id
        );
        setIsInWishlist(inWishlist);
      } catch (error) {
        console.error("Failed to check wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [isAuthenticated, product]);

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
    if (!selectedVariant) {
      if (product?.variants && product.variants.length > 0) {
        setIsAddingToCart(true);
        setCartSuccess(false);

        try {
          await addToCart(product.variants[0].id, quantity);
          setCartSuccess(true);

          setTimeout(() => {
            setCartSuccess(false);
          }, 3000);
        } catch (err) {
          console.error("Error adding to cart:", err);
        } finally {
          setIsAddingToCart(false);
        }
      }
      return;
    }

    setIsAddingToCart(true);
    setCartSuccess(false);

    try {
      await addToCart(selectedVariant.id, quantity);
      setCartSuccess(true);

      setTimeout(() => {
        setCartSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderImages = () => {
    if (!product || !product.images || product.images.length === 0) {
      return (
        <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl border border-white/50">
          <Image
            src="/images/product-placeholder.jpg"
            alt={product?.name || "Product"}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      );
    }

    if (product.images.length === 1) {
      return (
        <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl border border-white/50">
          <Image
            src={getImageUrl(product.images[0].url) || "/placeholder.svg"}
            alt={product?.name || "Product"}
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl border border-white/50">
            <Image
              src={getImageUrl(mainImage?.url || product.images[0].url)}
              alt={product?.name || "Product"}
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative aspect-square w-full bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden cursor-pointer border-3 transition-all hover:shadow-lg group ${
                mainImage?.url === image.url
                  ? "border-[#f01c33] shadow-xl shadow-[#f01c33]/20"
                  : "border-transparent hover:border-[#c4ab66]/50"
              }`}
              onClick={() => setMainImage(image)}
            >
              <Image
                src={getImageUrl(image.url) || "/placeholder.svg"}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const getImageUrl = (image) => {
    if (!image) return "/images/product-placeholder.jpg";
    if (image.startsWith("http")) return image;
    return `https://desirediv-storage.blr1.digitaloceanspaces.com/${image}`;
  };

  const getPriceDisplay = () => {
    if (initialLoading) {
      return (
        <div className="h-12 w-48 bg-gray-200 animate-pulse rounded-2xl"></div>
      );
    }

    if (selectedVariant) {
      if (selectedVariant.salePrice && selectedVariant.salePrice > 0) {
        return (
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {formatCurrency(selectedVariant.salePrice)}
            </span>
            <span className="text-2xl text-gray-500 line-through">
              {formatCurrency(selectedVariant.price)}
            </span>
          </div>
        );
      }

      return (
        <span className="text-5xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
          {formatCurrency(selectedVariant.price || 0)}
        </span>
      );
    }

    if (product) {
      if (product.hasSale && product.basePrice > 0) {
        return (
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
              {formatCurrency(product.basePrice)}
            </span>
            <span className="text-2xl text-gray-500 line-through">
              {formatCurrency(product.regularPrice || 0)}
            </span>
          </div>
        );
      }

      return (
        <span className="text-5xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
          {formatCurrency(product.basePrice || 0)}
        </span>
      );
    }

    return null;
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }

    setIsAddingToWishlist(true);

    try {
      if (isInWishlist) {
        const wishlistResponse = await fetchApi("/users/wishlist", {
          credentials: "include",
        });

        const wishlistItem = wishlistResponse.data.wishlistItems.find(
          (item) => item.productId === product.id
        );

        if (wishlistItem) {
          await fetchApi(`/users/wishlist/${wishlistItem.id}`, {
            method: "DELETE",
            credentials: "include",
          });

          setIsInWishlist(false);
        }
      } else {
        await fetchApi("/users/wishlist", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ productId: product.id }),
        });

        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-[#f01c33] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-700 text-lg font-medium">
              Loading product details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-red-200 flex flex-col items-center text-center max-w-md mx-auto"
          >
            <AlertCircle className="text-red-500 h-20 w-20 mb-8" />
            <h2 className="text-3xl font-bold text-red-700 mb-6">
              Error Loading Product
            </h2>
            <p className="text-red-600 mb-10 text-lg">{error}</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <ChevronRight className="mr-2 h-5 w-5" /> Browse Other Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-yellow-200 flex flex-col items-center text-center max-w-md mx-auto"
          >
            <AlertCircle className="text-yellow-500 h-20 w-20 mb-8" />
            <h2 className="text-3xl font-bold text-yellow-700 mb-6">
              Product Not Found
            </h2>
            <p className="text-yellow-600 mb-10 text-lg">
              The product you are looking for does not exist or has been
              removed.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <ChevronRight className="mr-2 h-5 w-5" /> Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-50/30 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center text-sm mb-10 bg-white/80 backdrop-blur-sm p-6 "
        >
          <Link
            href="/"
            className="text-gray-500 hover:text-[#f01c33] transition-colors font-medium"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-3 text-gray-400" />
          <Link
            href="/products"
            className="text-gray-500 hover:text-[#f01c33] transition-colors font-medium"
          >
            Products
          </Link>
          {product?.categories?.[0] && (
            <>
              <ChevronRight className="h-4 w-4 mx-3 text-gray-400" />
              <Link
                href={`/category/${product.categories[0].slug}`}
                className="text-gray-500 hover:text-[#f01c33] transition-colors font-medium"
              >
                {product.categories[0].name}
              </Link>
            </>
          )}
          <ChevronRight className="h-4 w-4 mx-3 text-gray-400" />
          <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent font-bold">
            {product?.name}
          </span>
        </motion.div>

        {/* Enhanced Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {loading ? (
              <div className="aspect-square w-full bg-gray-200 rounded-3xl animate-pulse"></div>
            ) : error ? (
              <div className="aspect-square w-full bg-gray-100 rounded-3xl flex items-center justify-center">
                <div className="text-center p-6">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            ) : (
              renderImages()
            )}
          </motion.div>

          {/* Enhanced Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col bg-white/80 backdrop-blur-sm p-10 "
          >
            {/* Brand name if available */}
            {product.brand && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 px-4 py-2 rounded-full mb-4 w-fit">
                <Crown className="w-4 h-4 text-[#f01c33]" />
                <span className="text-[#f01c33] text-sm font-bold uppercase tracking-wider">
                  {product.brand}
                </span>
              </div>
            )}

            {/* Product name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Enhanced Rating */}
            <div className="flex items-center mb-8 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
              <div className="flex text-[#c4ab66] mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 transition-all duration-300"
                    fill={
                      i < Math.round(product.avgRating || 0)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-bold">
                {product.avgRating
                  ? `${product.avgRating} (${product.reviewCount} reviews)`
                  : "No reviews yet"}
              </span>
            </div>

            {/* Enhanced Price */}
            <div className="mb-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-3xl blur-xl"></div>
                <div className="relative p-8 bg-white/80 backdrop-blur-sm ">
                  {getPriceDisplay()}
                </div>
              </div>
            </div>

            {/* Enhanced Short Description */}
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-2xl blur-sm"></div>
              <div className="relative p-8 bg-white/80 backdrop-blur-sm">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.shortDescription ||
                    product.description?.substring(0, 150)}
                  {product.description?.length > 150 &&
                    !product.shortDescription &&
                    "..."}
                </p>
              </div>
            </div>

            {/* Enhanced Flavor Selection */}
            {product.flavorOptions && product.flavorOptions.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#f01c33]" />
                  <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    Choose Flavor
                  </span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.flavorOptions.map((flavor) => {
                    const availableWeightIds = getAvailableWeightsForFlavor(
                      flavor.id
                    );
                    const isAvailable = availableWeightIds.length > 0;

                    return (
                      <motion.button
                        key={flavor.id}
                        whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                        whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                        className={`px-6 py-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                          selectedFlavor?.id === flavor.id
                            ? "border-[#f01c33] bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white shadow-xl"
                            : isAvailable
                            ? "border-gray-300 hover:border-[#f01c33] hover:text-[#f01c33] bg-white"
                            : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                        }`}
                        onClick={() => handleFlavorChange(flavor)}
                        disabled={!isAvailable}
                      >
                        {flavor.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Enhanced Weight Selection */}
            {product.weightOptions && product.weightOptions.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#c4ab66]" />
                  <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    Choose Weight
                  </span>
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.weightOptions.map((weight) => {
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
                        whileHover={{ scale: isAvailable ? 1.05 : 1 }}
                        whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                        className={`px-6 py-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                          selectedWeight?.id === weight.id
                            ? "border-[#c4ab66] bg-gradient-to-r from-[#c4ab66] to-[#f01c33] text-white shadow-xl"
                            : isAvailable
                            ? "border-gray-300 hover:border-[#c4ab66] hover:text-[#c4ab66] bg-white"
                            : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                        }`}
                        onClick={() => handleWeightChange(weight)}
                        disabled={!isAvailable}
                      >
                        {weight.display}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Success/Error Messages */}
            {cartSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 text-green-700 text-sm rounded-2xl flex items-center border-2 border-green-200 shadow-lg"
              >
                <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" />
                <span className="font-bold text-lg">
                  Item successfully added to your cart!
                </span>
              </motion.div>
            )}

            {/* Enhanced Stock Status */}
            <div className="mb-8">
              {selectedVariant && selectedVariant.quantity > 0 && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl blur-sm"></div>
                  <div className="relative p-6 bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-2xl text-green-700 flex items-center shadow-lg">
                    <CheckCircle className="h-6 w-6 mr-4 flex-shrink-0" />
                    <span className="font-bold text-lg">
                      In Stock ({selectedVariant.quantity} available)
                    </span>
                  </div>
                </div>
              )}
              {selectedVariant && selectedVariant.quantity === 0 && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl blur-sm"></div>
                  <div className="relative p-6 bg-white/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl text-red-700 flex items-center shadow-lg">
                    <AlertCircle className="h-6 w-6 mr-4 flex-shrink-0" />
                    <span className="font-bold text-lg">Out of stock</span>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Quantity Selector */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                Quantity
              </h3>
              <div className="flex items-center">
                <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#f01c33]/10 hover:to-[#c4ab66]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || isAddingToCart}
                  >
                    <Minus className="h-6 w-6 text-[#f01c33]" />
                  </motion.button>
                  <span className="px-10 py-4 bg-white font-bold text-2xl text-gray-800 min-w-[6rem] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#c4ab66]/10 hover:to-[#f01c33]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleQuantityChange(1)}
                    disabled={
                      (selectedVariant &&
                        selectedVariant.quantity > 0 &&
                        quantity >= selectedVariant.quantity) ||
                      isAddingToCart
                    }
                  >
                    <Plus className="h-6 w-6 text-[#c4ab66]" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  className="group w-full flex items-center justify-center gap-4 py-6 text-xl bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#c4ab66] hover:to-[#f01c33] rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={
                    isAddingToCart ||
                    (selectedVariant && selectedVariant.quantity < 1) ||
                    (!selectedVariant &&
                      (!product?.variants ||
                        product.variants.length === 0 ||
                        product.variants[0].quantity < 1))
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center gap-4">
                    {isAddingToCart ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className={`rounded-2xl py-6 px-8 border-2 font-bold transition-all duration-500 shadow-lg hover:shadow-xl ${
                    isInWishlist
                      ? " border-red-600 hover:bg-red-50"
                      : "border-[#f01c33]  hover:bg-gradient-to-r hover:from-[#f01c33] hover:to-[#c4ab66]  hover:border-transparent"
                  }`}
                  size="icon"
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                >
                  <Heart
                    className={`h-6 w-6  ${isInWishlist ? "fill-current" : ""}`}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {[
                {
                  icon: Shield,
                  text: "Quality Assured",
                  color: "from-[#f01c33] to-[#c4ab66]",
                },
                {
                  icon: Truck,
                  text: "Fast Delivery",
                  color: "from-[#c4ab66] to-[#f01c33]",
                },
                {
                  icon: Award,
                  text: "Lab Tested",
                  color: "from-[#f01c33] to-[#c4ab66]",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center text-sm text-gray-600 group"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Product Metadata */}
            <div className="border-t border-gray-200 pt-8 mt-8 space-y-4 text-sm">
              {selectedVariant && selectedVariant.sku && (
                <div className="flex">
                  <span className="font-bold w-32 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    SKU:
                  </span>
                  <span className="text-gray-600 font-medium">
                    {selectedVariant.sku}
                  </span>
                </div>
              )}

              {product.category && (
                <div className="flex">
                  <span className="font-bold w-32 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    Category:
                  </span>
                  <Link
                    href={`/category/${product.category?.slug}`}
                    className="text-[#f01c33] hover:text-[#c4ab66] font-bold transition-colors duration-300"
                  >
                    {product.category?.name}
                  </Link>
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="flex">
                  <span className="font-bold w-32 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                    Tags:
                  </span>
                  <div className="text-gray-600">
                    {product.tags?.map((tag, index) => (
                      <span key={index}>
                        <Link
                          href={`/products?tag=${tag}`}
                          className="text-[#f01c33] hover:text-[#c4ab66] font-bold transition-colors duration-300"
                        >
                          {tag}
                        </Link>
                        {index < product.tags.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm  mb-20"
        >
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "description", label: "Description", icon: TrendingUp },
                {
                  id: "reviews",
                  label: `Reviews (${product.reviewCount || 0})`,
                  icon: Star,
                },
                { id: "shipping", label: "Shipping & Returns", icon: Truck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-10 py-6 font-bold text-sm uppercase transition-all duration-300 flex items-center gap-3 ${
                    activeTab === tab.id
                      ? "border-b-4 border-[#f01c33] bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 text-[#f01c33]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-10">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <div className="mb-10">
                  <p className="text-gray-700 leading-relaxed mb-10 text-xl">
                    {product.description}
                  </p>

                  {product.isSupplement && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                      {[
                        {
                          icon: CheckCircle,
                          title: "Pure Quality",
                          description:
                            "Premium ingredients with no unnecessary fillers or harmful additives",
                          gradient: "from-[#f01c33] to-[#c4ab66]",
                        },
                        {
                          icon: Shield,
                          title: "Lab Tested",
                          description:
                            "Every batch is tested for purity and potency to ensure maximum results",
                          gradient: "from-[#c4ab66] to-[#f01c33]",
                        },
                        {
                          icon: Award,
                          title: "Expert Formulated",
                          description:
                            "Developed by fitness experts to maximize your performance and results",
                          gradient: "from-[#f01c33] to-[#c4ab66]",
                        },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500">
                            <div className="flex items-center mb-6">
                              <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white flex items-center justify-center flex-shrink-0 mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                              >
                                <feature.icon className="h-8 w-8" />
                              </div>
                              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                                {feature.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {product.directions && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative mt-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-3xl blur-sm"></div>
                    <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-lg">
                      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                        Directions for Use
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-xl">
                        {product.directions}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "reviews" && <ReviewSection product={product} />}

            {activeTab === "shipping" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  {
                    title: "Shipping Information",
                    items: [
                      {
                        label: "Delivery Time",
                        value: "3-5 business days (standard shipping)",
                      },
                      {
                        label: "Free Shipping",
                        value: "Free shipping on all orders above ₹999",
                      },
                      {
                        label: "Express Delivery",
                        value: "1-2 business days (₹199 extra)",
                      },
                    ],
                    gradient: "from-[#f01c33] to-[#c4ab66]",
                  },
                  {
                    title: "Return Policy",
                    items: [
                      {
                        label: "Return Window",
                        value: "30 days from the date of delivery",
                      },
                      {
                        label: "Condition",
                        value:
                          "Product must be unused and in original packaging",
                      },
                      {
                        label: "Process",
                        value:
                          "Initiate return from your account and we'll arrange pickup",
                      },
                    ],
                    gradient: "from-[#c4ab66] to-[#f01c33]",
                  },
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/5 to-[#c4ab66]/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500">
                      <h3
                        className={`font-bold text-2xl mb-8 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}
                      >
                        {section.title}
                      </h3>
                      <ul className="space-y-6">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="pb-6 border-b border-gray-200 last:border-b-0"
                          >
                            <p className="font-bold mb-3 text-gray-900 text-lg">
                              {item.label}
                            </p>
                            <p className="text-gray-600 text-lg">
                              {item.value}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm p-10 "
          >
            <h2 className="text-4xl font-bold mb-12 relative">
              <span className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                RELATED PRODUCTS
              </span>
              <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all hover:shadow-2xl border border-white/50 group-hover:scale-105 duration-500"
                  >
                    <div className="relative h-72 w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-6 transition-transform group-hover:scale-110 duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {product.hasSale && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          SALE
                        </span>
                      )}
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex text-[#c4ab66]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4"
                              fill={
                                i < Math.round(product.avgRating || 0)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2 font-medium">
                          ({product.reviewCount || 0})
                        </span>
                      </div>

                      <h3 className="font-bold mb-4 line-clamp-2 hover:text-[#f01c33] transition-colors text-center text-gray-900 text-lg group-hover:bg-gradient-to-r group-hover:from-[#f01c33] group-hover:to-[#c4ab66] group-hover:bg-clip-text group-hover:text-transparent">
                        {product.name}
                      </h3>

                      <div className="text-center">
                        {product.hasSale ? (
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent text-xl">
                              {formatCurrency(product.basePrice)}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                              {formatCurrency(product.regularPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent text-xl">
                            {formatCurrency(product.basePrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
