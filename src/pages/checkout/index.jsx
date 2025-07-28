import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import { CartItem } from "../../cards/cart";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CheckoutPage() {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const { cart, removeFromCart } = useAuth();
  const navigate = useNavigate();
  // Shipping address state
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Load Razorpay script with enhanced debugging
  useEffect(() => {
    // Check if script is already loaded
    if (window.Razorpay) {
      return;
    }

    const loadScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.id = "razorpay-checkout-script";

        script.onload = () => {
          resolve(true);
        };

        script.onerror = (error) => {
          console.error("Failed to load Razorpay script:", error);
          console.error("Script src:", script.src);
          console.error("Script readyState:", script.readyState);
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadScript();

    // Cleanup function to remove script on unmount
    return () => {
      const script = document.getElementById("razorpay-checkout-script");
      if (script) {
        script.remove();
      }
    };
  }, []);

  const loadRazorpay = async (e) => {
    e.preventDefault();

    if (!window.Razorpay) {
      const script = document.querySelector('script[src*="razorpay"]');
      if (!script) {
        alert("Payment system is not available at the moment. Please refresh the page and try again.");
        return;
      }
    }

    // Validate shipping address
    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      alert("Please fill in all shipping address fields");
      return;
    }

    try {
      const cartPayload = cart.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        variant: item.variant?.id,
        color: item.color,
        size: item.size,
        product: item.productId,
      }));

      const payload = {
        items: cartPayload,
        total,
        shippingAddress,
      };

      const { data } = await api.post("/api/payment/place-order", payload);
      const orderId = data?.order?.razorpayOrderId;
      const docId = data?.order?.id;

      if (!orderId) {
        throw new Error("No order ID received from server");
      }

      const options = {
        key: razorpayKey, // Replace with your test key
        amount: total * 100, // in paisa
        currency: "INR",
        name: "Furnish World",
        description: "Order Payment",
        image: "/logo.png",
        order_id: orderId,
        handler: function (response) {

          api
            .post("/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: docId,
            })
            .then((res) => {
              navigate("/orders");
            })
            .catch((error) => {
              alert("Payment was successful but there was an error updating your order. Please contact support.");
            });
        },
        prefill: {
          name: shippingAddress.name,
          contact: shippingAddress.phone,
          // email: user.email, // Uncomment if you have user email
        },
        notes: {
          address: shippingAddress.address,
        },
        theme: {
          color: "#7c3aed",
        },
        modal: {
          ondismiss: function () {
            navigate("/orders");
          },
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(`Error processing payment: ${error.message || "Please try again later."}`);
    }
  };


  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Checkout", href: "/checkout" },
  ];

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <Breadcrumb items={breadcrumbItems} />
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Please add products to your cart before checking out.</p>
          <Link to="/products" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.length > 0 &&
                cart.map((item) => {
                  return (
                    <CartItem
                      key={item.cartId}
                      productName={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      handleRemove={async (e) => {
                        e.preventDefault();
                        await removeFromCart(item.cartId);
                      }}
                    />
                  );
                })}
            </div>

            {cart.length > 0 && (
              <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            )}
          </div>

          {/* Shipping Address Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your complete address"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="State"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                <input
                  type="text"
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="PIN Code"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={loadRazorpay}
              className="min-w-[250px] bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Place Order - ₹{total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
