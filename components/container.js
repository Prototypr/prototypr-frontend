export default function Container({ children }) {
  return (
    <div
      className="xl:container mx-auto px-3 xl:px-8"
      style={{ maxWidth: "1200px" }}
    >
      {children}
    </div>
  );
}
