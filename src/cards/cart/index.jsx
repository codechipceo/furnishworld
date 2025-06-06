import { Link } from "react-router-dom";

export const CartItem = ({ productName, price, quantity, handleRemove }) => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Link to={"/checkout"} className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">
          {productName}
        </Link>
        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">{price}</p>
      </div>

      <div className="flex items-center justify-end gap-6">
        <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{quantity}</p>

        <button
          data-tooltip-target="tooltipRemoveItem1a"
          type="button"
          onClick={handleRemove}
          className="text-red-600 hover:text-red-700 dark:text-red-500 cursor-pointer dark:hover:text-red-600"
        >
          <span className="sr-only"> Remove </span>X
        </button>
      </div>
    </div>
  );
};
