"use client";

import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddressForm from "@/components/AddressForm";
import {
  MapPin,
  Plus,
  Edit,
  Trash2,
  Home,
  CheckCircle,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch addresses
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetchApi("/users/addresses", {
        credentials: "include",
      });

      if (response.success) {
        setAddresses(response.data.addresses || []);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load your addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Handle form success
  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingAddress(null);
    fetchAddresses();
  };

  // Handle delete address
  const handleDeleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetchApi(`/users/addresses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.success) {
        toast.success("Address deleted successfully");
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.message || "Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle set default address
  const handleSetDefaultAddress = async (id) => {
    try {
      const response = await fetchApi(`/users/addresses/${id}/default`, {
        method: "PATCH",
        credentials: "include",
      });

      if (response.success) {
        toast.success("Default address updated");
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error(error.message || "Failed to set default address");
    }
  };

  // Loading state
  if (loading && addresses.length === 0) {
    return (
      <div className="space-y-8 relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Addresses</h1>
              <p className="text-white/90">Manage your delivery addresses</p>
            </div>
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <MapPin className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#f01c33] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#c4ab66]/20 to-[#f01c33]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Addresses</h1>
            <p className="text-white/90">
              Manage your delivery addresses for faster checkout
            </p>
            <div className="flex items-center mt-3 space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-white/80 fill-current" />
              ))}
              <span className="text-white/80 text-sm ml-2">
                Secure & Fast Delivery
              </span>
            </div>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm relative">
            <MapPin className="h-8 w-8" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#c4ab66] to-white rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-[#f01c33]" />
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Button */}
      {!showAddForm && !editingAddress && (
        <div className="flex justify-end relative z-10">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="h-5 w-5 mr-3" />
            Add New Address
          </Button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
          <div className="bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 px-8 py-6 border-b border-white/20">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-4 rounded-2xl mr-4 shadow-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  Add New Address
                </h2>
                <p className="text-gray-600">
                  Fill in the details for your new address
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <AddressForm
              onSuccess={handleFormSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {editingAddress && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative z-10">
          <div className="bg-gradient-to-r from-[#f01c33]/10 to-[#c4ab66]/10 px-8 py-6 border-b border-white/20">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-4 rounded-2xl mr-4 shadow-lg">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
                  Edit Address
                </h2>
                <p className="text-gray-600">Update your address information</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <AddressForm
              existingAddress={editingAddress}
              onSuccess={handleFormSuccess}
              onCancel={() => setEditingAddress(null)}
            />
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showAddForm && !editingAddress ? (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center relative z-10">
          <div className="bg-gradient-to-br from-[#f01c33]/20 to-[#c4ab66]/20 p-8 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
            <MapPin className="h-16 w-16 text-[#f01c33]" />
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f01c33] to-[#c4ab66] bg-clip-text text-transparent">
            No Addresses Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            You haven&apos;t added any addresses yet. Add one to make checkout
            faster and easier.
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-[#f01c33] to-[#c4ab66] hover:from-[#f01c33]/90 hover:to-[#c4ab66]/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="h-5 w-5 mr-3" />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] relative group"
            >
              {/* Address Header */}
              <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 px-6 py-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-[#f01c33] to-[#c4ab66] p-3 rounded-xl mr-3 shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {address.name}
                      </h3>
                      {address.isDefault && (
                        <span className="inline-flex items-center text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full font-semibold border border-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <Home className="h-4 w-4 text-[#f01c33] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {address.street}
                      </p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-[#f01c33] mr-3" />
                    <p className="text-gray-700 font-medium">{address.phone}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  {!address.isDefault && (
                    <Button
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Set as Default
                    </Button>
                  )}

                  <Button
                    onClick={() => setEditingAddress(address)}
                    variant="outline"
                    className="border-2 border-[#c4ab66]/30 text-[#f01c33] hover:bg-[#c4ab66]/10 hover:border-[#c4ab66] px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={deletingId === address.id}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg"
                  >
                    {deletingId === address.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
