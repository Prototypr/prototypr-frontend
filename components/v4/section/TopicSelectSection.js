import Container from "@/components/container";
import TopicIconCard from "@/components/v4/card/TopicIconCard";

const TopicSelectSection = ({ topics }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <h2 className="text-2xl mb-6 font-bold text-gray-900">
        Browse <span className="text-gray-400">topics</span>
      </h2>
      <div className="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6">
        {topics.map((topic, index) => {
          return (
            <div key={index}>
              <TopicIconCard icon={topic.icon} title={topic.name} topic={topic} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TopicSelectSection;
