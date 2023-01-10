import Container from "@/components/container";

const SectionDivider = ({transparentLine}) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className={`${transparentLine?'py-4':'py-8'}`}>
        <div className={`h-[1px] ${transparentLine?'bg-opacity-0':'bg-opacity-10'} bg-black w-full"`} />
      </div>
    </Container>
  );
};
export default SectionDivider;
