import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../../api/endpoints/products.endpoint";
import { mockProductData } from "./mock";
import ProductImageGallery from "./single-product/ProductGallery";
import ProductInfo from "./single-product/ProductInfo";
import SectionHeading from "../../components/SectionHeading";
import Breadcrumb from "../../components/Breadcrumbs";
export const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  const fetchById = async () => {
    const result = await Products.productById(id);
    const { categories, description, gallery, name, productImage, variants, colors } = result;
    const categoryArr = categories?.map((item) => item?.title);
    const productGallery = gallery.map((item) => item.image.url);
    const variantArray = variants.map((item) => {
      return {
        color: item.color,
        price: item.price,
        size: item.size?.size,
        stock: item.stock,
        id: item.id,
      };
    });
    const productStructure = {
      categories: categoryArr,
      description: description,
      gallery: productGallery,
      name: name,
      productImage: productImage,
      variants: variantArray,
      price: variantArray[0].price,
      colors: colors,
      id,
    };
    setProduct(productStructure);
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: id, href: "/products", active: true },
  ];
  return (
    <div>
      <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
        <SectionHeading title={"Product Details"} />
        <Breadcrumb items={breadcrumbItems} />
        <div className="max-w-7xl mx-auto bg-white  rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {product && <ProductImageGallery mainImage={product.productImage} gallery={product?.gallery} />}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};
