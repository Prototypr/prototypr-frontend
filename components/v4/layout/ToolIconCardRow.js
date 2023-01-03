import ToolIconCard from "@/components/v4/card/ToolIconCard";
import Container from "@/components/container";

const ToolIconCardRow = ({ tools }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <h3 className="font-semibold text-lg mb-6 px-1">
        Latest tools <span className="text-gray-400">hand picked</span>
      </h3>
      <div className="grid grid-cols-5 gap-x-6 gap-y-6 px-1">
        {tools.map((tool, index) => {
          return (
            <div key={index}>
              <ToolIconCard tool={tool?.attributes} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ToolIconCardRow;
