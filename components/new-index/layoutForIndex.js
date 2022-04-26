import Meta from "../meta";
import Navbar from "../navbar";

export default function Layout({ preview, children, activeNav, seo }) {
  return (
    <>
      <Meta seo={seo} />
      <Navbar activeNav={activeNav} />
      <div className="bg-gray-4 overflow-hidden">
        <main className="pt-20 -mt-3 mx-auto">{children}</main>
      </div>
    </>
  );
}
