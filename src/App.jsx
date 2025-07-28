import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/pageLayout";
import AboutUs from "./pages/about";
import ContactUs from "./pages/about/contact";
import SignInForm from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/Signup";
import CheckoutPage from "./pages/checkout";
import Home from "./pages/home";
import LegalPage from "./pages/legal";
import NotFoundPage from "./pages/NotFound";
import Products from "./pages/products";
import { SingleProduct } from "./pages/products/SingleProduct";
import Orders from "./pages/orders";
import OrderDetail from "./pages/orders/order_detail";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout children={<Home />} />,
    },
    {
      path: "/products",
      element: <Layout children={<Products />} />,
    },
    {
      path: "/products/:id",
      element: <Layout children={<SingleProduct />} />,
    },
    {
      path: "/about-us",
      element: <Layout children={<AboutUs />} />,
    },
    {
      path: "/contact-us",
      element: <Layout children={<ContactUs />} />,
    },
    {
      path: "/signin",
      element: <SignInForm />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },

    {
      path: "/checkout",
      element: <Layout children={<CheckoutPage />} />,
    },
    {
      path: "/terms-and-conditions",
      element: <Layout children={<LegalPage type="termsAndConditions" />} />,
    },
    {
      path: "/privacy-policy",
      element: <Layout children={<LegalPage type="privacyPolicy" />} />,
    },
    {
      path: "/return-policy",
      element: <Layout children={<LegalPage type="returnAndWarrantyPolicy" />} />,
    },
    {
      path: "/shipping-and-delivery",
      element: <Layout children={<LegalPage type="shippingAndDeliveryPolicy" />} />,
    },
    {
      path: "/orders",
      element: <Layout children={<Orders />} />,
    },
    {
      path: "/orders/:orderId",
      element: <Layout children={<OrderDetail />} />,
    },
    {
      path: "*",
      element: <Layout children={<NotFoundPage />} />,
    },
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
