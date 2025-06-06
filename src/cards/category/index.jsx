import { Link } from "react-router-dom";

const CategoryCard = ({ product }) => {
  return (
    <Link to={`products?categories=${product.id}`}>
      <div className='bg-white dark:bg-slate-800 rounded-md overflow-hidden'>
        <img
          src={product.img}
          className='max-h-28 w-full object-cover'
          alt='...'
        />
        <div className='p-4 lg:p-6 text-start lg:pb-3'>
          <h5 className='text-base font-bold leading-none mb-1'>
            {product.title}
          </h5>
          {/* <p className='text-sm leading-none opacity-70 mb-2'>
            {product.quantity}
          </p> */}
        </div>
      </div>
    </Link>
  );
};
export default CategoryCard;
