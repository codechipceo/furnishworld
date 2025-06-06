import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CartItem } from "../../cards/cart";

const Navigation = () => {
  const { isAuthenticated, logout, cart, removeFromCart } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target) && !event.target.closest("#myCartDropdownButton1")) {
      setIsCartDropdownOpen(false);
    }

    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) && !event.target.closest("#userDropdownButton1")) {
      setIsUserDropdownOpen(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      !event.target.closest('[data-collapse-toggle="ecommerce-navbar-menu-1"]')
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const links = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/products",
      title: "Shop",
    },
    {
      path: "/about-us",
      title: "About Us",
    },
    {
      path: "/contact-us",
      title: "Contact Us",
    },
  ];
  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to={"/"}>
                <img className="block w-auto h-8 dark:hidden" src="img/logo.png" alt="" />
                {/* <img
                  className='block w-auto h-8 dark:hidden'
                  src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg'
                  alt=''
                />
                <img
                  className='hidden w-auto h-8 dark:block'
                  src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg'
                  alt=''
                /> */}
              </Link>
            </div>

            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              {links.map(({ path, title }) => {
                return (
                  <li>
                    <Link
                      to={path}
                      title=""
                      className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            <button
              id="myCartDropdownButton1"
              onClick={toggleCartDropdown}
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
            >
              {/* <span className="sr-only">Cart</span> */}
              My Cart {cart.length > 0 && cart.length}
            </button>

            {isCartDropdownOpen && cart.length > 0 && (
              <div
                ref={cartDropdownRef}
                id="myCartDropdown1"
                className=" z-[100] mx-auto max-w-sm space-y-4 max-h-96 overflow-scroll rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800 absolute top-full right-0 mt-2 w-72 md:w-full"
              >
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

                <a
                  href="#"
                  title=""
                  className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  role="button"
                >
                  Proceed to Checkout
                </a>
              </div>
            )}

            {isCartDropdownOpen && cart.length < 1 && (
              <div className=" z-[100] mx-auto max-w-sm space-y-4 h-20  overflow-scroll rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800 absolute top-full right-0 mt-2 w-72 md:w-full">
                Please add products to your cart
              </div>
            )}

            {isAuthenticated ? (
              <button
                id="userDropdownButton1"
                onClick={toggleUserDropdown}
                type="button"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                Account
              </button>
            ) : (
              <>
                <button
                  id="userDropdownButton1"
                  onClick={() => {
                    navigate("/signin");
                  }}
                  type="button"
                  className="cursor-pointer inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
                >
                  Sign In
                </button>
              </>
            )}

            {isUserDropdownOpen && isAuthenticated && (
              <div
                ref={userDropdownRef}
                id="userDropdown1"
                className=" z-40 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700 absolute top-full right-0 mt-2"
              >
                <>
                  <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                    <li>
                      <a
                        href="#"
                        title=""
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        My Account
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        title=""
                        className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        My Orders
                      </a>
                    </li>
                  </ul>

                  <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                    <button
                      onClick={logout}
                      className=" cursor-pointerinline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open Menu</span>
              Menu
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="ecommerce-navbar-menu-1"
            className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4"
          >
            <ul className="text-gray-900 dark:text-white text-sm font-medium dark:text-white space-y-3">
              <li>
                <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                  Gift Ideas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                  Games
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-700 dark:hover:text-primary-500">
                  Electronics
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
