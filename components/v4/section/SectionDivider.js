import Container from "@/components/container";

const SectionDivider = ({transparentLine, py}) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className={`${py?py:transparentLine?'py-4':'py-8'}`}>
        <div className={`h-[1px] ${transparentLine?'bg-opacity-0':'bg-opacity-10'} bg-black w-full"`} />
      </div>
    </Container>
  );
};
export default SectionDivider;
