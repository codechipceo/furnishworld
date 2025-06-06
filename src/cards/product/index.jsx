import { Link } from "react-router-dom";

function ProductCard({ imageUrl1, imageUrl2, title, price, originalPrice, id }) {
  return (
    <div className="min-w-2xs">
      <div></div>
      <div className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md">
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={imageUrl1} alt="product image" />
          <img
            className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
            src={imageUrl2}
            alt="product image hover"
          />
          {/* You can add a discount badge here dynamically if needed */}
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-primary-500">{title}</h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-black">${price}</span>
              {originalPrice && <span className="text-sm text-black line-through">${originalPrice}</span>}
            </p>
          </div>
          <Link
            to={`/products/${id}`}
            className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
