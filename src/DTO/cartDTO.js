export const serialiseCartResponse = (cartResponse) => {
  if (!Array.isArray(cartResponse) || cartResponse.length < 1) return [];
  const res = cartResponse.map((cartItem) => {
    console.log(cartItem);
    const { id, items } = cartItem;
    const { variant, color, quantity, product } = items;
    const productVairant = product.variants.filter((item) => item.id === variant)[0];
    const data = {
      cartId: id,
      name: product.name,
      image: product.productImage.url,
      variant: productVairant,
      color,
      quantity,
      price: productVairant?.price,
      size: productVairant?.size?.size,
    };
    return data;
  });

  return res;
};
