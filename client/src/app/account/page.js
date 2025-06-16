"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchApi, formatCurrency, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingBag,
  Eye,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  CreditCard,
  Building,
  Wallet,
  Smartphone,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  RotateCcw,
  Search,
  Filter,
  Sparkles,
  Star,
} from "lucide-react";

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  // Handle page from URL
  const page = searchParams.get("page")
    ? Number.parseInt(searchParams.get("page"))
    : 1;

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;

      setLoadingOrders(true);
      setError("");

      try {
        const response = await fetchApi(
          `/payment/orders?page=${page}&limit=10`,
          {
            credentials: "include",
          }
        );

        setOrders(response.data.orders || []);
        setPagination(
          response.data.pagination || {
            total: 0,
            page: 1,
            limit: 10,
            pages: 0,
          }
        );
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, page]);

  // Get status badge color and icon
  const getStatusInfo = (status) => {
    const statusMap = {
      PENDING: {
        color:
          "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300",
        icon: Clock,
        bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      },
      PROCESSING: {
        color:
          "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300",
        icon: Package,
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      },
      SHIPPED: {
        color:
          "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300",
        icon: Truck,
        bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      },
      DELIVERED: {
        color:
          "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
        icon: CheckCircle,
        bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      },
      CANCELLED: {
        color:
          "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300",
        icon: XCircle,
        bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      },
      REFUNDED: {
        color:
          "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300",
        icon: RotateCcw,
        bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      },
    };
    return (
      statusMap[status] || {
        color:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300",
        icon: Package,
        bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      }
    );
  };

  // Get payment method icon
  const getPaymentIcon = (method) => {
    const methodIcons = {
      CARD: CreditCard,
      NETBANKING: Building,
      WALLET: Wallet,
      UPI: Smartphone,
      EMI: Calendar,
      OTHER: DollarSign,
    };
    return methodIcons[method] || DollarSign;
  };

  // Handle pagination
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    router.push(`/account/orders?page=${newPage}`);
  };

  // Filter orders by search term
  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="space-y-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Page Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10"
        variants={itemVariants}
      >
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-3 rounded-xl mr-4 shadow-lg relative">
                  <Package className="h-6 w-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#c4ab66] to-white rounded-full flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-[#f01c33]" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-2">
                    My Orders
                  </h1>
                  <p className="text-gray-500">
                    Track and manage your order history
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-[#c4ab66] fill-current"
                      />
                    ))}
                    <span className="text-gray-500 text-xs ml-2">
                      Trusted Orders
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f01c33] focus:border-transparent bg-white/50 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl p-2 bg-white/50">
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl p-2 bg-white/50">
                    <option value="">All Time</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 3 Months</option>
                    <option value="180">Last 6 Months</option>
                    <option value="365">Last Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select className="w-full border border-gray-200 rounded-xl p-2 bg-white/50">
                    <option value="date_desc">Date (Newest First)</option>
                    <option value="date_asc">Date (Oldest First)</option>
                    <option value="total_desc">Amount (High to Low)</option>
                    <option value="total_asc">Amount (Low to High)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <Button
                  variant="outline"
                  className="border-gray-200 rounded-xl"
                  onClick={() => setFilterOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 rounded-xl">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      {loadingOrders ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 flex justify-center relative z-10">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-[#f01c33] animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-6 w-6 text-[#f01c33]" />
            </div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center relative z-10"
          variants={itemVariants}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-[#f01c33]" />
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
            No Orders Found
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven&apos;t placed any orders yet. Start shopping to see your
            orders here!
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 px-8 py-3 rounded-xl shadow-lg">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      ) : (
        <>
          {/* Order Cards */}
          <motion.div
            className="space-y-4 relative z-10"
            variants={containerVariants}
          >
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const PaymentIcon = getPaymentIcon(order.paymentMethod);

              return (
                <motion.div
                  key={order.id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 cursor-pointer group"
                  variants={itemVariants}
                  onClick={() => router.push(`/account/orders/${order.id}`)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start mb-4 md:mb-0">
                        <div
                          className={`w-12 h-12 ${statusInfo.bgColor} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
                        >
                          <StatusIcon
                            className={`h-6 w-6 ${
                              statusInfo.color.includes("text")
                                ? statusInfo.color.split(" ")[1]
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-gray-800 mr-3">
                              Order #{order.orderNumber}
                            </h3>
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mt-1">
                            Placed on {formatDate(order.date)}
                          </p>
                          <div className="flex items-center mt-2">
                            <PaymentIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <p className="text-xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent mb-1">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </p>
                        <Button
                          className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 rounded-xl shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/account/orders/${order.id}`);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <motion.div
              className="flex justify-center mt-8 relative z-10"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-xl border-gray-200"
                  onClick={() => changePage(1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-xl border-gray-200"
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex space-x-2">
                  {[...Array(pagination.pages).keys()].map((i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === pagination.pages ||
                      Math.abs(pageNumber - pagination.page) <= 1 ||
                      (pagination.page <= 2 && pageNumber <= 3) ||
                      (pagination.page >= pagination.pages - 1 &&
                        pageNumber >= pagination.pages - 2)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          className={`w-10 h-10 p-0 rounded-xl ${
                            pagination.page === pageNumber
                              ? "bg-gradient-to-r from-[#f01c33] to-[#c4ab66] text-white hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => changePage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    } else if (
                      (pageNumber === 2 && pagination.page > 3) ||
                      (pageNumber === pagination.pages - 1 &&
                        pagination.page < pagination.pages - 2)
                    ) {
                      return (
                        <div
                          key={pageNumber}
                          className="w-10 h-10 flex items-center justify-center text-gray-500"
                        >
                          ...
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-xl border-gray-200"
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 rounded-xl border-gray-200"
                  onClick={() => changePage(pagination.pages)}
                  disabled={pagination.page === pagination.pages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
