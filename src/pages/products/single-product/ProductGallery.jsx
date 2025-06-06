import React, { useEffect, useState } from "react";

const ProductImageGallery = ({ mainImage, gallery }) => {
  const [activeImage, setActiveImage] = useState(mainImage?.url || gallery?.[0]?.url);


  useEffect(() => {
    if (mainImage?.url) {
      setActiveImage(mainImage.url);
    }
  }, [mainImage]);

  return (
    <div className="w-full lg:w-1/2 p-4">
      <div className="mb-4 aspect-square flex items-center justify-center overflow-hidden rounded-lg ">
        <img
          src={activeImage || "https://via.placeholder.com/500x480?text=No+Image"}
          alt="Product Main"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {gallery?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {gallery?.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden ${
                activeImage === img ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setActiveImage(img)}
            >
              <img
                src={img || "https://via.placeholder.com/80x80?text=Thumb"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
