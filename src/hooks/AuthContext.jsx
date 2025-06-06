import { createContext, useEffect, useState } from "react";
import Auth from "../api/endpoints/auth.endpoint";
import { toast } from "react-toastify";
import Cart from "../api/endpoints/cart.endpoint";
import { serialiseCartResponse } from "../DTO/cartDTO";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (loginPayload) => {
    try {
      setIsLoading(true);
      const { user, token } = await Auth.loginCustomer(loginPayload);
      updateLocalStorage(user, token);
      setUser(user);
      setToken(token);
      setIsLoading(false);
      return token;
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateLocalStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const addToCart = async (payload) => {
    try {
      setIsLoading(true);
      await Cart.addToCart(payload);
      await fetchCart();
      setIsLoading(false);
    } catch (error) {
      throw new Error("Server error", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      setIsLoading(true);
      await Cart.removeFromCart(id);
      await fetchCart();
      setIsLoading(false);
    } catch (error) {
      throw new Error("Server error", error);
    }
  };

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await Cart.getCart();
      const cartDto = serialiseCartResponse(response.docs);
      setCart(cartDto);
      setIsLoading(false);
    } catch (error) {
      throw new Error("Server error", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);
  // 5. Context Value
  const contextValue = {
    user,
    isLoading,
    token,
    logout,
    login,
    isAuthenticated: !!user,

    cart,
    addToCart,
    removeFromCart,
    fetchCart,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
