import Meta from "../meta";
import Navbar from "../navbar";

export default function Layout({ preview, children, activeNav }) {
  return (
    <>
      <Meta />
      <Navbar activeNav={activeNav} />
      <div className="px-3 md:px-0 bg-gray-4 overflow-hidden">
        <main className="pt-20 -mt-3">{children}</main>
      </div>
    </>
  );
}
