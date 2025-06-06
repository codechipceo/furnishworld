import { SwiperSlide } from "swiper/react";
import Slider from "../../../components/Slider";
import HeroSection from "../../../components/Hero";
import HeroCard from "../../../components/Hero";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate()

  const slidesProperties = [
    {
      heading: "Comfort In every Detail",
      subheading: "Handcrafted pieces, made for you.",
      backgroundImage: "/img/slider1.jpg",
      buttonText: "Shop Now",
      link: "products",
    },
    {
      heading: "Luxury Furniture, Crafted To Perfection",
      subheading: "Sale upto 40% off",
      backgroundImage: "/img/slider-2.jpg",
      buttonText: "Shop Now",
      link: "products",
    },
  ];

  const slides =  slidesProperties.map((item) => <HeroCard {...item} onButtonClick={() => navigate(item.link)} />)



  const swiperConfig = {
    spaceBetween: 30,
    slidesPerView: 1,
  };

  return  <div className="mb-8">

    <Slider slides={slides} config={swiperConfig} />;
  </div>
};

export default Hero;
