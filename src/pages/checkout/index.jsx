import React from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import { CartItem } from "../../cards/cart";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useAuth();
  const total = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpay = async () => {
    // const res = await fetch("/api/razorpay/order", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount: total }), // amount in INR
    // });
    // const data = await res.json(); // Should return { id: razorpayOrderId }
const data={id: 'randomId'}
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: total * 100, // in paisa
      currency: "INR",
      name: "Furnish World",
      description: "Order Payment",
      image: "/logo.png",
      order_id: data.id,
      handler: function (response) {
        // Save to DB with response.razorpay_payment_id, order_id etc.
        fetch("/api/order/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            cartItems: cart,

          }),
        }).then(() => {
          // navigate("/order-success");
        });
      },
      // prefill: {
      //   name: user.name,
      //   email: user.email,
      //   contact: user.phone,
      // },
      theme: { color: "#7c3aed" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleConfirm = () => {
    alert("Order confirmed! 🚚");
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

        <div className="space-y-6">
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
          <>
            <div className="mt-8 border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button onClick={loadRazorpay} className="mt-6 min-w-[250px] bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
              Confirm Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
