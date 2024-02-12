export default function PostTitle({ children }) {
  return (
    <h1 className="text-5xl md:text-6xl w-full leading-tight mx-auto text-black/90 font-inter font-bold text-center drop-shadow-sm">
      {children}
    </h1>
  );
}
