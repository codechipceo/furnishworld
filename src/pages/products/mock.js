export const mockProductData = {
  id: "683c25f354e1a5437e2eae54",
  name: "Three Chair Sofa",
  slug: "three-chair-sofa",
  description: {
    root: {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "This is a luxurious three-seater sofa, perfect for any modern living space. It combines comfort with elegant design, making it a focal point of your room. Crafted with high-quality materials for durability and long-lasting appeal.",
          type: "text",
          version: 1,
        },
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "\n\n", // Newline for paragraph break
          type: "text",
          version: 1,
        },
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Key Features:",
          type: "text",
          version: 1,
        },
        {
          format: "",
          indent: 0,
          type: "list",
          listType: "bullet",
          version: 1,
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Premium fabric upholstery",
              type: "listitem",
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Premium fabric upholstery",
                  type: "text",
                  version: 1,
                },
              ],
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Sturdy wooden frame",
              type: "listitem",
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Sturdy wooden frame",
                  type: "text",
                  version: 1,
                },
              ],
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Comfortable high-density foam cushions",
              type: "listitem",
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Comfortable high-density foam cushions",
                  type: "text",
                  version: 1,
                },
              ],
            },
          ],
        },
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "This is a dummy description of it.",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
      textFormat: 0,
      textStyle: "",
    },
  },
  categories: [
    {
      createdAt: "2025-06-02T04:07:07.664Z",
      updatedAt: "2025-06-02T04:07:07.704Z",
      categoryImage: "683d236054e1a5437e2eb394",
      title: "Chairs",
      description: "chair category",
      slug: "chairs",
      slugLock: true,
      breadcrumbs: [
        {
          doc: "683d236b54e1a5437e2eb3a5",
          url: "/chairs",
          label: "Chairs",
          id: "683d236b2781430890bcc031",
        },
      ],
      id: "683d236b54e1a5437e2eb3a5", // This is the ID of the category document itself
    },
    // Add another category example for multiple categories
    {
      createdAt: "2025-06-02T05:00:00.000Z",
      updatedAt: "2025-06-02T05:00:00.000Z",
      title: "Sofas",
      description: "sofa category",
      slug: "sofas",
      id: "683d236b54e1a5437e2eb3b0",
    },
  ],
  productImage: {
    createdAt: "2025-06-01T10:05:04.257Z",
    updatedAt: "2025-06-01T10:05:04.257Z",
    prefix: "products",
    filename: "threechairsofa.jpg",
    mimeType: "image/jpeg",
    filesize: 47034,
    width: 500,
    height: 480,
    focalX: 50,
    focalY: 50,
    id: "683c25d054e1a5437e2eae2e",
    url: "https://storage.googleapis.com/furnishworld/products/threechairsofa.jpg",
    thumbnailURL: null,
  },
  gallery: [
    {
      id: "gallery_image_1",
      url: "https://via.placeholder.com/500x480?text=Gallery+1",
      alt: "Sofa side view",
    },
    {
      id: "gallery_image_2",
      url: "https://via.placeholder.com/500x480?text=Gallery+2",
      alt: "Sofa lifestyle view",
    },
  ],
  colors: [
    {
      createdAt: "2025-04-20T11:42:09.829Z",
      updatedAt: "2025-04-20T11:42:09.829Z",
      name: "Red",
      hexCode: "#FF0000",
      id: "6804dd912333d2cc16351196",
    },
    {
      createdAt: "2025-04-20T11:42:09.829Z",
      updatedAt: "2025-04-20T11:42:09.829Z",
      name: "Blue",
      hexCode: "#0000FF",
      id: "6804dd912333d2cc16351197",
    },
  ],
  variants: [
    // Assuming variants are other related product IDs, or actual product variations.
    // For a PDP, usually you pick a color/size and that changes the *current* product's data
    // rather than showing entirely different product variants here.
    // I'll omit complex variant handling for now, focusing on single product.
    // If you need variants, these would likely be 'color' or 'size' fields on the product itself
    // and you'd select them and update product data based on that selection.
  ],
  isFeatured: false,
  seo: {},
  shipping: {
    dimensions: {},
  },
  size: {
    // Assuming 'size' is a relationship to a 'sizes' collection
    createdAt: "2025-04-20T15:21:17.552Z",
    updatedAt: "2025-04-20T15:21:17.552Z",
    size: "Large",
    id: "680510ed2333d2cc163516ab",
  },
  stock: 20,
  price: 2000,
};

