import RcPagination from "rc-pagination";
// import 'rc-pagination/assets/index.css';

export default function NewPagination({
  pageSize = 12,
  currentPage = 0,
  total = 20,
  onPageNumChange = () => {},
}) {
  return (
    <div className="flex justify-center items-center mt-8 md:mb-2">
      <RcPagination
        showPrevNextJumpers
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(pageNum) => {
          onPageNumChange(pageNum);
        }}
      />
    </div>
  );
}
