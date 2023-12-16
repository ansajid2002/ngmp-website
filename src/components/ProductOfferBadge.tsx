import React from "react";

const ProductOfferBadge = () => {
  const styling = {
    backgroundImage: `url("https://aimg.kwcdn.com/upload_aimg/commodity/e4b8aee4-b205-4a0d-845e-62d36d532518.png?imageView2/2/w/800/q/70/format/webp")`,
  };

  return (
    <div className="p-1" style={styling}>
      <h2 className="text-xs text-white text-center">Limited Time Offer</h2>
    </div>
  );
};

export default ProductOfferBadge;
