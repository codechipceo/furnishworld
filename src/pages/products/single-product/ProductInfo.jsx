import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import ProductDescription from "./ProductDescription";

// QuantityCounter component
function QuantityCounter({ quantity, setQuantity }) {
  // Initialize quantity state with 1

  // Function to handle decrementing the quantity
  const handleDecrement = () => {
    // Only decrement if quantity is greater than 1
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Function to handle incrementing the quantity
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden  max-w-40">
      {/* Minus Button */}
      <button
        onClick={handleDecrement} // Attach onClick event to handleDecrement function
        className=" py-2 px-4 bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
        aria-label="Decrement quantity"
      >
        -
      </button>

      {/* Quantity Display */}
      <span className="flex-grow-0 w-20 text-center text-gray-900 font-medium text-lg border-l border-r border-gray-300 py-2">
        {quantity} {/* Display the current quantity from state */}
      </span>

      {/* Plus Button */}
      <button
        onClick={handleIncrement} // Attach onClick event to handleIncrement function
        className=" py-2 px-4 bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
        aria-label="Increment quantity"
      >
        +
      </button>
    </div>
  );
}
const CategoriesTags = ({ categories }) => {
  if (categories.length === 0) return null;
  return (
    <div className="mb-4 text-gray-600">
      Categories:{" "}
      {categories.map((title) => (
        <span key={title} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {title}
        </span>
      ))}
    </div>
  );
};

const ProductInfo = ({ product }) => {
  console.log(product)
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, addToCart } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (product && product?.variants.length > 0) {
      setSelectedColor(product.colors[0].id);
      setVariant(product.variants[0]);
      setSelectedSize(product.variants[0].id);
    }
  }, [product?.variants?.length]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="w-full lg:w-1/2 p-4">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{product.name}</h1>
      <p className="text-2xl font-bold text-primary-600 mb-4">{formatPrice(variant?.price)}</p>
      {/* Categories */}
      {product?.categories && product?.categories.length > 0 && <CategoriesTags categories={product?.categories} />}
      {/* Colors Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Colors:</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color.id}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.id ? "border-primary-500 ring-2 ring-blue-300" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => setSelectedColor(color.id)}
                aria-label={`Select ${color.name} color`}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Size Information */}
      {product?.variants && product?.variants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Variant:</h3>
          {product?.variants.map((variant) => (
            <span
              key={variant.id}
              className={`inline-block bg-gray-100 text-gray-800 text-sm font-medium cursor-pointer px-4 py-2 rounded-lg mr-2 ${
                selectedSize === variant.id ? "bg-primary-600 text-white" : ""
              }`}
              onClick={() => {
                setSelectedSize(variant.id);
                setVariant(variant);
              }}
            >
              {variant.size}
            </span>
          ))}
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Quantity:</h3>
        <QuantityCounter quantity={quantity} setQuantity={setQuantity} />
      </div>
      {/* Stock Information */}
      <div className="mb-6 text-gray-700">
        <span className="font-semibold">Availability: </span>
        {product?.variants?.[0].stock > 0 ? (
          <span className="text-green-600">In Stock ({product?.variants[0].stock} items)</span>
        ) : (
          <span className="text-red-600">Out of Stock</span>
        )}
      </div>
      {/* Add to Cart Button */}

      <button
        onClick={async () => {
          if (isAuthenticated) {
            await addToCart({
              items: {
                product: product.id,
                variant: variant.id,
                quantity: quantity,
                color: selectedColor,
              },
            });

            // do something
          } else {
            navigate("/signin");
          }
        }}
        className="hover:border-white/40 cursor-pointer w-full font-semibold text-white flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-2.5 text-center text-sm hover:bg-primary-600  focus:outline-none "
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add To Cart
      </button>
      <div className="mt-8 border-t pt-8 border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Product Description</h3>
        <ProductDescription descriptionData={product.description} />
      </div>
    </div>
  );
};

export default ProductInfo;
