import ProductItem from "@/components/new-index/ProductItem";
export default function ProductList({ posts = [] }) {
  return (
    <section className="grid overflow-hidden grid-cols-1 gap-x-14 gap-y-3 mt-2 pb-12 rounded-xl bg-white border border-black border-opacity-10">
      {posts.length
        ? posts.map((item, index) => {
            return <ProductItem key={`product_item_${index}`} post={item} />;
          })
        : null}
    </section>
  );
}
