// import Alert from "./alert";
import dynamic from "next/dynamic";
import Meta from "./meta";
import Navbar from "./navbar2";
const Footer = dynamic(() => import("./footer"));

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

      {children}
      <Footer />
    </>
  );
}
