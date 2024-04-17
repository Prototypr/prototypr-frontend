import Meta from "./meta";
// import Navbar from "../Navbar/Navbar";
import Navbar, { HomePageNewNavBar } from "@/components/Navbar/Navbar";
import Footer from "./footer";
import { NAV_OFFSET } from "@/lib/constants";

export default function Layout({
  preview,
  children,
  activeNav,
  background,
  padding,
  seo,
  navType,
  maxWidth
}) {
  return (
    <>
      <Meta seo={seo} />
      {/* <Navbar activeNav={activeNav} /> */}
      <div className="fixed w-full z-50">
        <Navbar maxWidth={maxWidth} />
      </div>

      <div
        className={`min-h-screen ${NAV_OFFSET} ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#fbfcff" }}
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
