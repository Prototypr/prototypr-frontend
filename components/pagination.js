import RcPagination from "rc-pagination";
import Container from "./container";
// import 'rc-pagination/assets/index.css';

export default function NewPagination({
  pageSize = 12,
  currentPage = 0,
  align = "center",
  total = 20,
  onPageNumChange = () => {},
}) {
  return (
    <Container
      // padding={false}
      maxWidth="max-w-[1320px] mx-auto "
    >
      <div
        className={`flex ${align == "start" ? "justify-start" : align=='end'?'justify-end':"justify-center"} items-center ${total > pageSize ? "mt-8 pb-12 md:pb-4" : ""}`}
      >
        <RcPagination
          hideOnSinglePage={true}
          showPrevNextJumpers={false}
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={pageNum => {
            onPageNumChange(pageNum);
          }}
        />
      </div>
    </Container>
  );
}
