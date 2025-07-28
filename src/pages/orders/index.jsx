import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { deliveryStatusMap } from "./order_detail";

function sanitizeOrderData(order) {
  // Format date to "Month DD, YYYY"
  const formatDate = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  // Generate items label
  const itemNames = order.items.map((item) => item.product.name);
  const itemCounts = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsLabel = `${itemNames.join(", ")} (${itemCounts} item${itemCounts > 1 ? "s" : ""})`;

  return {
    id: order.id,
    date: formatDate(order.createdAt),
    total: order.total,
    items: itemsLabel,
    shipmentStatus: deliveryStatusMap[order.deliveryStatus].label,

    shipmentDetail: order.deliveryStatus === "processing" ? "Your order is being processed" : `Delivered on ${formatDate(order.updatedAt)}`,
    paymentStatus: order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1),
    paymentDetail: `Via ${order.paymentMethod.replace(/_/g, " ").toUpperCase()}`,
    actions: ["View Order Details"],
  };
}

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/orders").then((res) => {
      console.log(res.data.docs);
      const docs = res.data.docs.map((doc) => sanitizeOrderData(doc));
      console.log(docs);
      setOrders(docs);
    });
  }, []);

  // Function to get status class based on status text
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
      case "Paid":
      case "Refunded": // Refunded could also be green or grey depending on business logic
        return "text-green-500";
      case "In Transit":
        return "text-blue-500";
      case "Processing":
        return "text-yellow-500";
      case "Pending Payment":
        return "text-yellow-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div>
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center md:text-left">My Orders</h1>

        {/* Order List */}
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${order.shipmentStatus === "Cancelled" ? "opacity-75" : ""}`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <Link to={`/orders/${order.id}`}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0 cursor-pointer text-primary-500 underline">Order ID: {order.id}</h2>
                </Link>
                <span className="text-lg font-bold text-gray-800">₹{order.total.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
                <div>
                  <p>
                    <span className="font-medium">Order Date:</span> {order.date}
                  </p>
                  <p>
                    <span className="font-medium">Items:</span> {order.items}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Shipment Status:</span>{" "}
                    <span className={`${getStatusClass(order.shipmentStatus)} font-semibold`}>{order.shipmentStatus}</span>
                  </p>
                  <p className="text-sm text-gray-500">{order.shipmentDetail}</p>
                  <p>
                    <span className="font-medium">Payment Status:</span>{" "}
                    <span className={`${getStatusClass(order.paymentStatus)} font-semibold`}>{order.paymentStatus}</span>
                  </p>
                  <p className="text-sm text-gray-500">{order.paymentDetail}</p>
                </div>
              </div>
              {/* <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                {order.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(action, order.id)}
                    className={`bg-primary-500 hover:border-white/40 flex items-center justify-center rounded-md border border-transparent px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 ${
                      action === "View Order Details" && order.shipmentStatus === "Cancelled"
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                        : ""
                    } ${
                      action === "View Order Details" &&
                      order.shipmentStatus !== "Cancelled" &&
                      action !== "Complete Payment" &&
                      action !== "Track Shipment"
                        ? ""
                        : ""
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div> */}
            </div>
          ))}
        </div>

        {/* Pagination (Simple Placeholder) */}
        {/* <div className="flex justify-center mt-10">
          <nav className="flex space-x-2" aria-label="Pagination">
            <a href="#" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200">
              Previous
            </a>
            <a href="#" className="px-4 py-2 rounded-lg bg-purple-accent text-white font-medium">
              1
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200">
              2
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200">
              3
            </a>
            <a href="#" className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200">
              Next
            </a>
          </nav>
        </div> */}
      </main>
    </div>
  );
};
export default Orders;
