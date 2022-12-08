import Meta from "../meta";
import Navbar from "../Navbar/Navbar";

export default function Layout({
  preview,
  children,
  activeNav,
  seo,
  CustomHeader = undefined,
}) {
  return (
    <>
      <Meta seo={seo} />
      <Navbar activeNav={activeNav} />
      <div className="bg-gray-4 overflow-hidden">
        <main className="pt-32 md:pt-32 -mt-3 mx-auto">{children}</main>
      </div>
    </>
  );
}
