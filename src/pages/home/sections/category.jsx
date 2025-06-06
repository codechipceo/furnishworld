import CategoryCard from "../../../cards/category";

const Epcategory5 = ({ loading, categories }) => {
  return (
    <section className='ezy__epcategory5 light mb-8 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10'>
      <div className='container px-4 mx-auto'>
        <div className='flex items-center w-full'>
          <div className='w-2/3'>
            <h2 className='text-2xl leading-none md:text-[40px] font-bold'>
              Popular Categories
            </h2>
          </div>
          {/* button start  */}
          <div className='w-1/3 text-end'>
            <button className='text-base font-bold leading-normal hover:text-blue-600 transition'>
              See All
            </button>
          </div>
          {/* button end  */}
        </div>
        <div className='grid grid-cols-12 gap-6 mt-6 sm:mt-12'>
          {!loading &&
            categories.map((product, i) => {
              const payload = {
                title: product.title,
                img: product?.categoryImage?.url,
                id: product.id,
              };
              return (
                <div
                  className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 p-2'
                  key={i}
                >
                  <CategoryCard product={payload} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Epcategory5;
