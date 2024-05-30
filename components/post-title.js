export default function PostTitle({ children }) {
  return (
    <h1 className="text-6xl tracking-tight md:text-[72px] w-full leading-tight max-w-[46rem] text-black/90  font-medium text-left drop-shadow-sm">
      {children}
    </h1>
  );
}
