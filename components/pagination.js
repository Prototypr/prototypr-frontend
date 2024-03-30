import RcPagination from "rc-pagination";
// import 'rc-pagination/assets/index.css';

export default function NewPagination({
  pageSize = 12,
  currentPage = 0,
  total = 20,
  onPageNumChange = () => {},
}) {
  return (
    <div className={`flex justify-center items-center ${total>pageSize?'mt-8 pb-12 md:pb-4':''}`}>
      <RcPagination
        hideOnSinglePage={true}
        showPrevNextJumpers={false}
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
