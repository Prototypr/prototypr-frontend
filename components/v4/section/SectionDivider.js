import Container from "@/components/container";

const SectionDivider = ({transparentLine, py, color}) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <div className={`${py?py:transparentLine?'py-4':'py-8'}`}>
        <div className={` ${transparentLine?'bg-opacity-0':'bg-opacity-[0.08]'} ${color?color:'bg-black h-[1px]'} w-full`} />
      </div>
    </Container>
  );
};
export default SectionDivider;
