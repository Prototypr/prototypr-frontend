import ProductItem from "@/components/new-index/ProductItem";
export default function ProductList({ posts = [] }) {
  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-14 gap-y-10 mt-2 pb-12 px-3 xl:px-0">
      {posts.length
        ? posts.map((item, index) => {
            return <ProductItem key={`product_item_${index}`} post={item} />;
          })
        : null}
    </section>
  );
}
