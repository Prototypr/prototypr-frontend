import Meta from "../meta";
import Navbar from "../navbar2";

export default function Layout({ preview, children, activeNav, seo }) {
  return (
    <>
      <Meta seo={seo} />
      <Navbar activeNav={activeNav} />
      <div className="bg-gray-4 overflow-hidden">
        <main className="pt-32 md:pt-46 -mt-3 mx-auto">{children}</main>
      </div>
    </>
  );
}
