export default function PostTitle({ children }) {
  return (
    <h1 className="text-5xl tracking-tight md:text-6.5xl w-full leading-tight max-w-[44rem] text-black/90 font-inter font-bold text-left drop-shadow-sm">
      {children}
    </h1>
  );
}
