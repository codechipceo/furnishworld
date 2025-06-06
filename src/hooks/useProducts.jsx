import React, { useEffect, useState } from "react";
import Products from "../api/endpoints/products.endpoint";

const serialiseProduct = (product) => {
  const { name, description, gallery, id, shortDescription, variants } = product;
  return {
    url: product.productImage.url,
    imageUrl1: product.productImage.url,
    imageUrl2: product.productImage.url,
    title: name,
    price: variants[0].price,
    description,
    gallery,
    id,
    shortDescription,
  };
};

const useProducts = (categoryIds) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  let queryString = categoryIds?.length > 0 && `?where[categories][in]=${categoryIds.join(",")}`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await Products.getProducts(queryString);
      console.log(response.docs.length, new Date().getMilliseconds());
      const updatedProduct = response.docs.map((item) => serialiseProduct(item));
      setProducts(updatedProduct);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await Products.getAllCategories();
      setCategories(response.docs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [queryString]);

  useEffect(() => {
    fetchCategories();
  }, []);
  return { categories, products, loading };
};

export default useProducts;
