import ProductCard from "../../../cards/product";
import SectionHeading from "../../../components/SectionHeading";
import AutoPlaySwiper from "../../../components/Slider";
import Customise from "./customise";

const ProductsSection = ({ products, loading }) => {
  const slides = products.map((item) => {
    return <ProductCard {...item} />;
  });

  const config = {
    slidesPerView: 1,
    delay: 3000,
  };
  const breakpoints = {
    480: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 4,
    },
  };
  return (
    <div className=''>
      <SectionHeading
        title={"Best Products"}
        subtitle={"Our best collection"}
      />

      <AutoPlaySwiper
        slides={slides}
        config={config}
        breakpoints={breakpoints}
      />
      <Customise />
      <SectionHeading
        title={"New Arrivals"}
        subtitle={"Our Latest Collection"}
      />

      <AutoPlaySwiper
        slides={slides}
        config={config}
        breakpoints={breakpoints}
      />
    </div>
  );
};

export default ProductsSection;
