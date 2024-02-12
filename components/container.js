export default function Container({ children,padding, maxWidth='max-w-[1440px]' }) {
  return (
    <div
      className={`${maxWidth} ${padding==false?'':'mx-auto px-6 md:px-3'}`}
      //   style={{ maxWidth: "1200px" }}
    >
      {children}
    </div>
  );
}
