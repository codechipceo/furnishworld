
import { Link } from "react-router-dom";
import Heading from "../../../components/Heading";
import AutoPlaySwiper from "../../../components/Slider";
import SectionHeading from "../../../components/SectionHeading";

const SpotLightCard = ({ img, redirect }) => {
  return (
    <Link to={redirect}>
      <img src={img} />
    </Link>
  );
};
const SpotLight = () => {
  const slides = [
    <SpotLightCard
      img={
        "https://images.durian.in/Durian/durian/CategoryBanner/800x800/category_banner_20250502054146.jpg"
      }
      redirect={"/products"}
    />,
    <SpotLightCard
      img={
        "https://images.durian.in/Durian/durian/CategoryBanner/800x800/category_banner_20250502054151.jpg"
      }
      redirect={"/products"}
    />,
  ];

  return (
    <div>
      <SectionHeading title={"Spot Light"} subtitle={'Our Luxurious Spots'}  />

      <AutoPlaySwiper slides={slides} config={{ delay: 5000 }} />
    </div>
  );
};

export default SpotLight;
