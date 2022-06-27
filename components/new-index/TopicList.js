import dynamic from "next/dynamic";
const EditorPick2 = dynamic(() => import("@/components/new-index/EditorPick2"));
const ProductList = dynamic(() => import("@/components/new-index/ProductList"));

export default function TopicList({ currentTopics = [] }) {
  const heroTopics = currentTopics.length ? currentTopics.slice(0, 1) : [];
  const moreTopics = currentTopics.length ? currentTopics.slice(1) : [];

  return (
    <section className="flex group flex-col justify-center antialiased text-gray-900 rounded-lg">
      {heroTopics.length
        ? heroTopics.map((item, index) => {
            return <EditorPick2 lazy={false} header={""} post={item} />;
            // return <TopicTopItem key={`topic_${index}`} topic={item} />;
          })
        : null}
      {moreTopics.length && <ProductList posts={moreTopics} />}
    </section>
  );
}
