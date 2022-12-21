export default function Container({ children, maxWidth='max-w-[1440px]' }) {
  return (
    <div
      className={`${maxWidth} mx-auto px-3 xl:px-8`}
      //   style={{ maxWidth: "1200px" }}
    >
      {children}
    </div>
  );
}
