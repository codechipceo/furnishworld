import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import TopBar from "./sections/TopBar";
import ProductCard from "../../cards/product";
import Breadcrumb from "../../components/Breadcrumbs";
import SectionHeading from "../../components/SectionHeading";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState(params.get("categories")?.split(",") || []);
  const { products, categories } = useProducts(selected);

  const toggleCategory = (id) => {
    const updated = selected.includes(id) ? selected.filter((c) => c !== id) : [...selected, id];
    params.set("categories", updated.join(","));
    setParams(params);
    setSelected(updated);
  };

  useEffect(() => {
    const categories = params.get("categories");
    if (categories) {
      setSelected(categories.split(","));
    }
  }, [params]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];
  return (
    <div className="max-w-screen-xl px-4 mx-auto">
      <SectionHeading title={"All Products"} />
      <Breadcrumb items={breadcrumbItems} />
      <TopBar selectedCategories={selected} handleCategoryChange={toggleCategory} categories={categories} />

      <div className="grid-cols-4 grid gap-4">
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
