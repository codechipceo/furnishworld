import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

export const deliveryStatusMap = {
  not_shipped: { label: "Processing" },
  processing: { label: "Processing" },
  shipped: { label: "Shipped" },
  out_for_delivery: { label: "Out for Delivery" },
  delivered: { label: "Delivered" },
  returned: { label: "Returned" },
};

// Helper function to sanitize and format order data (can be shared or similar to the one in Orders.jsx)
function sanitizeOrderDetailData(order) {
  const formatDate = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // For AM/PM
    };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return {
    id: order.id,
    originalId: order.id, // Keep the original ID for API calls if needed
    date: formatDate(order.createdAt),
    total: order.total,
    items: order.items.map((item) => ({
      ...item,
      subtotal: item.product.price * item.quantity, // Calculate subtotal for each item
    })),
    shipmentStatus: deliveryStatusMap[order.deliveryStatus].label,
    shipmentDetail: order.deliveryStatus === "processing" ? "Your order is being processed" : `Delivered on ${formatDate(order.updatedAt)}`,
    paymentStatus: order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1),
    paymentDetail: `Via ${order.paymentMethod.replace(/_/g, " ").toUpperCase()}`,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    name: order.customer.name,
    contactEmail: order.customer.email,
    contactPhone: order.customer.phone,
  };
}

const OrderDetail = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Assuming your API can fetch a single order by its *original* ID, not the custom one
    // You might need to adjust the API endpoint if it expects the custom 'FW-...' ID
    // For this example, I'll assume the API uses the original MongoDB _id
    api
      .get(`/api/orders/${orderId}?depth=1`) // Use the orderId from params for the API call
      .then((res) => {
        console.log(res.data);
        setOrder(sanitizeOrderDetailData(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details.");
        setLoading(false);
      });
  }, [orderId]);

  // Function to get status class based on status text
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
      case "Paid":
      case "Refunded":
        return "text-green-600";
      case "In Transit":
        return "text-blue-600";
      case "Processing":
      case "Pending Payment":
        return "text-yellow-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <nav className="mb-4 text-sm text-gray-600">
        <Link to="/orders" className="text-blue-600 hover:underline">
          My Orders
        </Link>{" "}
        &gt; Order {order.id}
      </nav>
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center md:text-left">Order Details: {order.id}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
            <p className="mb-1">
              <span className="font-medium">Order Date:</span> {order.date}
            </p>
            <p className="mb-1">
              <span className="font-medium">Total Amount:</span> <span className="text-lg font-bold text-gray-800">{order.total.toFixed(2)} rs</span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Status Information</h3>
            <p className="mb-1">
              <span className="font-medium">Shipment Status:</span>{" "}
              <span className={`${getStatusClass(order.shipmentStatus)} font-semibold`}>{order.shipmentStatus}</span>
            </p>
            <p className="text-sm text-gray-500 mb-1">{order.shipmentDetail}</p>
            <p className="mb-1">
              <span className="font-medium">Payment Status:</span>{" "}
              <span className={`${getStatusClass(order.paymentStatus)} font-semibold`}>{order.paymentStatus}</span>
            </p>
            <p className="text-sm text-gray-500">{order.paymentDetail}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
        <h3 className="text-xl font-semibold mb-4">Items in Your Order</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item) => (
                <tr key={item.product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.product.variants.filter((variant) => variant.id === item.variant)[0].price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div>
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          {order.shippingAddress ? (
            <>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </>
          ) : (
            <p>No shipping address provided.</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p>
            <span className="font-medium">Name:</span> {order.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order.contactEmail}
          </p>

          {order.contactPhone && (
            <p>
              <span className="font-medium">Phone:</span> {order.contactPhone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
