import Container from "@/components/container";

const SectionDivider = () => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className="py-8">
        <div className="h-[1px] bg-opacity-10 bg-black w-full" />
      </div>
    </Container>
  );
};
export default SectionDivider;
