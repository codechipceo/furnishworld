import Navbar from "../navbar";
import Footer from "../footer";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className="relative">{children}</div>
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4"></div>
      <Footer />
    </>
  );
};

export default Layout;
