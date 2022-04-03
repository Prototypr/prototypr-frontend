import React from "react";
import ProductItem from "@/components/new-index/ProductItem";
export default function ProductList({ posts = [] }) {
  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-14 gap-y-10">
      {posts.length
        ? posts.map((item, index) => {
            return (
              <ProductItem
                key={`product_item_${index}`}
                post={item?.attributes}
              />
            );
          })
        : null}
    </section>
  );
}
