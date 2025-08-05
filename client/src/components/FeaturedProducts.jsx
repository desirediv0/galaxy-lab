"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Eye, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import ProductQuickView from "./ProductQuickView";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const ProductSkeleton = () => (
  <div className="bg-white overflow-hidden transition-all hover:shadow-lg shadow-md rounded-sm animate-pulse">
    <div className="h-48 md:h-64 w-full bg-gray-200"></div>
    <div className="p-3 md:p-4 space-y-3">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const FeaturedProducts = ({
  products = [],
  isLoading = false,
  error = null,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [api, setApi] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlistItems, setWishlistItems] = useState({});
  const [isAddingToWishlist, setIsAddingToWishlist] = useState({});
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const { addToCart } = useCart();

  // Fetch wishlist status for all products
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetchApi("/users/wishlist", {
          credentials: "include",
        });
        const items = response.data.wishlistItems.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {});
        setWishlistItems(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlistStatus();
  }, [isAuthenticated]);

  const handleAddToWishlist = async (product, e) => {
    e.preventDefault(); // Prevent navigation
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${product.slug}`);
      return;
    }

    setIsAddingToWishlist((prev) => ({ ...prev, [product.id]: true }));

    try {
      if (wishlistItems[product.id]) {
        // Get wishlist to find the item ID
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

          setWishlistItems((prev) => ({ ...prev, [product.id]: false }));
        }
      } else {
        // Add to wishlist
        await fetchApi("/users/wishlist", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ productId: product.id }),
        });

        setWishlistItems((prev) => ({ ...prev, [product.id]: true }));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsAddingToWishlist((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  // Handle add to cart click
  const handleAddToCart = async (product) => {
    setIsAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    try {
      if (!isAuthenticated) {
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }
      // If product has no variants, show error
      if (!product || !product.variants || product.variants.length === 0) {
        // Try to get default variant from backend
        const response = await fetchApi(
          `/public/products/${product.id}/variants`
        );
        const variants = response.data.variants || [];

        if (variants.length === 0) {
          toast.error("This product is currently not available");
          return;
        }

        // Use first variant as default
        const variantId = variants[0].id;
        await addToCart(variantId, 1);
        toast.success(`${product.name} added to cart`);
      } else {
        // Get the first variant (default)
        const variantId = product.variants[0].id;
        await addToCart(variantId, 1);
        toast.success(`${product.name} added to cart`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  // Handle slide change
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle opening quick view
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load products</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem
                key={product.id || product.slug || index}
                className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6 py-5 md:py-6"
              >
                <div
                  key={product.id}
                  className="bg-white overflow-hidden transition-all hover:shadow-lg shadow-md rounded-sm group"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative h-48 md:h-64 w-full overflow-hidden">
                      <Image
                        src={(() => {
                          // Find the variant with the lowest weight
                          let selectedVariant = null;
                          if (product.variants && product.variants.length > 0) {
                            selectedVariant = product.variants.reduce(
                              (min, v) => {
                                if (
                                  !v.weight ||
                                  typeof v.weight.value !== "number"
                                )
                                  return min;
                                if (
                                  !min ||
                                  (min.weight &&
                                    v.weight.value < min.weight.value)
                                )
                                  return v;
                                return min;
                              },
                              null
                            );
                            // fallback: if no variant has weight, use first variant
                            if (!selectedVariant)
                              selectedVariant = product.variants[0];
                          }
                          if (
                            selectedVariant &&
                            selectedVariant.images &&
                            selectedVariant.images.length > 0
                          ) {
                            const primaryImg = selectedVariant.images.find(
                              (img) => img.isPrimary
                            );
                            if (primaryImg && primaryImg.url)
                              return primaryImg.url;
                            if (selectedVariant.images[0].url)
                              return selectedVariant.images[0].url;
                          }
                          if (product.image)
                            return product.image.startsWith("http")
                              ? product.image
                              : `https://desirediv-storage.blr1.digitaloceanspaces.com/${product.image}`;
                          return "/placeholder.jpg";
                        })()}
                        alt={product.name}
                        fill
                        className="object-contain px-4 transition-transform md:group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.hasSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                          SALE
                        </span>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-[2px] flex justify-center py-1 md:py-3 md:bg-opacity-0 md:group-hover:bg-opacity-70 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white hover:bg-primary/80 rounded-full p-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleQuickView(product);
                          }}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-white hover:text-white hover:bg-primary/80 rounded-full p-2 mx-2 ${
                            wishlistItems[product.id] ? "text-red-500" : ""
                          }`}
                          onClick={(e) => handleAddToWishlist(product, e)}
                          disabled={isAddingToWishlist[product.id]}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              wishlistItems[product.id] ? "fill-current" : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  <div className="p-3 md:p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 md:h-4 md:w-4"
                            fill={
                              i < Math.round(product.avgRating || 0)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1 md:ml-2">
                        ({product.reviewCount || 0})
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:text-primary"
                    >
                      <h3 className="font-medium uppercase mb-2 line-clamp-2 text-xs md:text-sm">
                        {product.name}
                      </h3>
                      {/* Show lowest weight variant's flavor and weight */}
                      {(() => {
                        let selectedVariant = null;
                        if (product.variants && product.variants.length > 0) {
                          selectedVariant = product.variants.reduce(
                            (min, v) => {
                              if (
                                !v.weight ||
                                typeof v.weight.value !== "number"
                              )
                                return min;
                              if (
                                !min ||
                                (min.weight &&
                                  v.weight.value < min.weight.value)
                              )
                                return v;
                              return min;
                            },
                            null
                          );
                          if (!selectedVariant)
                            selectedVariant = product.variants[0];
                        }
                        if (!selectedVariant) return null;
                        const flavor = selectedVariant.flavor?.name;
                        const weight = selectedVariant.weight?.value;
                        const unit = selectedVariant.weight?.unit;
                        if (flavor || (weight && unit)) {
                          return (
                            <div className="text-xs text-gray-500 mb-1">
                              {flavor}
                              {flavor && weight && unit ? " • " : ""}
                              {weight && unit ? `${weight} ${unit}` : ""}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </Link>

                    <div className="flex items-center justify-center mb-2 flex-col md:flex-row">
                      {product.hasSale ? (
                        <div className="flex items-center flex-col md:flex-row">
                          <span className="font-bold text-base md:text-lg text-primary">
                            {formatCurrency(product.basePrice)}
                          </span>
                          <span className="text-gray-500 line-through text-xs md:text-sm ml-1 md:ml-2">
                            {formatCurrency(product.regularPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-base md:text-lg text-primary">
                          {formatCurrency(product.basePrice)}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="outline"
                      size="sm"
                      className="w-full p-2"
                      disabled={isAddingToCart[product.id]}
                    >
                      {isAddingToCart[product.id] ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls */}
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 bg-white/90 hover:bg-white hover:text-black border-gray-200 text-gray-700 shadow-lg" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 bg-white/90 hover:bg-white hover:text-black border-gray-200 text-gray-700 shadow-lg" />
        </Carousel>
      </div>

      <div className="text-center mt-2">
        <Link href="/products">
          <Button
            variant="outline"
            size="lg"
            className="font-medium border-primary text-primary hover:bg-primary hover:text-white group rounded-full"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      {/* Quick View Dialog */}
      <ProductQuickView
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
};

export default FeaturedProducts;
