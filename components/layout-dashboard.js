// import Alert from "./alert";
import dynamic from "next/dynamic";
import Meta from "./meta";
import BusinessNav from "./BusinessNav";
const Footer = dynamic(() => import("./footer"));


export default function Layout({
  preview,
  children,
  activeNav,
  background,
  padding,
  seo,
  showWriteButton,
  showSponsorButton,
  showJobsButton,
  showFooter
}) {
  return (
    <>
      <Meta seo={seo} />
      <BusinessNav padding={padding} showJobsButton={showJobsButton} showSponsorButton={showSponsorButton} showWriteButton={showWriteButton} activeNav={activeNav}/>
      <div
        className={`min-h-screen ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#fbfcff" }}
      >
        {/* <Alert preview={preview} /> */}
        <main
          className={`${padding==false?'':'py-24  -mt-3'} mx-auto`}
          style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
      {showFooter!==false?<Footer />:''}
    </>
  );
}
