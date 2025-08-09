"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import ProductQuickView from "@/components/ProductQuickView";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";

// Helper function to format image URLs correctly
const getImageUrl = (image) => {
  if (!image) return "/images/blog-placeholder.jpg";
  if (image.startsWith("http")) return image;
  return `https://desirediv-storage.blr1.digitaloceanspaces.com/${image}`;
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  // Fetch category and products
  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      try {
        // Parse sort option into API parameters
        let sort = "createdAt";
        let order = "desc";

        switch (sortOption) {
          case "newest":
            sort = "createdAt";
            order = "desc";
            break;
          case "oldest":
            sort = "createdAt";
            order = "asc";
            break;
          case "name-asc":
            sort = "name";
            order = "asc";
            break;
          case "name-desc":
            sort = "name";
            order = "desc";
            break;
          default:
            break;
        }

        const response = await fetchApi(
          `/public/categories/${slug}/products?page=${pagination.page}&limit=${pagination.limit}&sort=${sort}&order=${order}`
        );

        setCategory(response.data.category);
        setProducts(response.data.products || []);
        setPagination(response.data.pagination || pagination);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryAndProducts();
    }
  }, [slug, pagination.page, pagination.limit, sortOption]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = async (product) => {
    try {
      if (!isAuthenticated) {
        router.push(`/login?redirect=/category/${slug}`);
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
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Category
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Category Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The category you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-8">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {category.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-gray-600">{category.description}</p>
                )}
              </div>
              {category.image && (
                <div className="hidden md:block">
                  <Image
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <p className="text-gray-600">
              Showing {products.length} of {pagination.total} products
            </p>
          </div>

          <div className="flex items-center mt-4 sm:mt-0">
            <label htmlFor="sort" className="text-sm mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              name="sort"
              className="border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              onChange={handleSortChange}
              value={sortOption}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white p-8 shadow-sm text-center border">
            <div className="text-gray-400 mb-4">
              <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-3">No products found</h2>
            <p className="text-gray-600 mb-6">
              There are no products in this category yet.
            </p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center mt-12">
            <div className="flex items-center bg-white shadow border border-gray-200 overflow-hidden rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || loading}
                className="border-0 hover:bg-primary hover:text-white px-4 py-3"
              >
                <ChevronUp className="h-4 w-4 rotate-90" />
              </Button>

              {[...Array(pagination.pages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === pagination.pages ||
                  (page >= pagination.page - 1 && page <= pagination.page + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={loading}
                      className={`px-4 py-3 text-sm font-medium border-0 ${
                        page === pagination.page
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === pagination.page - 2 ||
                  page === pagination.page + 2
                ) {
                  return (
                    <span
                      key={page}
                      className="px-2 py-3 text-gray-500 text-sm"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages || loading}
                className="border-0 hover:bg-primary hover:text-white px-4 py-3"
              >
                <ChevronUp className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Dialog */}
      <ProductQuickView
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </div>
  );
}
