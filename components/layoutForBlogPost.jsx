import Meta from "./meta";
// import Navbar from "../Navbar/Navbar";
import Navbar, { HomePageNewNavBar } from "@/components/Navbar/Navbar";
import Footer from "./footer";

// export default function Layout({
//   preview,
//   children,
//   activeNav,
//   seo,
//   CustomHeader = undefined,
// }) {
//   return (
//     <>
//       <Meta seo={seo} />
//       <Navbar activeNav={activeNav} />
//       <div className="bg-gray-4 overflow-hidden">
//         <main className="pt-32 md:pt-46 -mt-3 mx-auto">{children}</main>
//       </div>
//     </>
//   );
// }

export default function Layout({
  preview,
  children,
  activeNav,
  background,
  padding,
  seo,
  navType,
}) {
  return (
    <>
      <Meta seo={seo} />
      {/* <Navbar activeNav={activeNav} /> */}
      <div className="fixed w-full z-50">
        <Navbar />
      </div>

      <div
        className={`min-h-screen pt-20 ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#eff4fb" }}
      >
        <main
          className="mx-auto "
          //   style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
