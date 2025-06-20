import useProducts from "../../hooks/useProducts";
import useTabTitle from "../../hooks/useTabTitle";
import CategorySection from "./sections/category";
import Hero from "./sections/hero";
import PolicySection from "./sections/policy";
import ProductsSection from "./sections/products";
import SpotLight from "./sections/spotlight";
import Store from "./sections/store";
const Home = () => {
  useTabTitle("Furnishworld - Home");

  const { products, categories, loading}=useProducts()

  return (
    <div>
      <Hero />
      <PolicySection />
      <CategorySection  categories={categories} loading={loading}/>
      <SpotLight />
      <ProductsSection products={products} loading={loading}/>
      <Store />
    </div>
  );
};

export default Home;
