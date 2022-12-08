// import Alert from "./alert";
import dynamic from "next/dynamic";
import Meta from "./meta";
import Navbar from "./Navbar/Navbar";
const Footer = dynamic(() => import('./footer'))


export default function Layout({
  preview,
  children,
  activeNav,
  background,
  padding,
  seo
}) {
  return (
    <>
      <Meta seo={seo} />
      <Navbar activeNav={activeNav} />
      <div
        className={`min-h-screen ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#F3F4F6" }}
      >
        {/* <Alert preview={preview} /> */}
        <main
          className="pt-24 md:pt-24 -mt-3 mx-auto"
          style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
