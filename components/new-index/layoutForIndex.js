import Meta from "../meta";
import Navbar from "../Navbar/Navbar";
import { HomePageNewNavBar } from "@/components/Navbar/Navbar";

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
      <div className="fixed top-4 w-full z-50">
        <HomePageNewNavBar />
      </div>

      <div
        className={`min-h-screen ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#F3F4F6" }}
      >
        <main
          className="mx-auto "
          //   style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
