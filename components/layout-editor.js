// import Alert from "./alert";
import dynamic from "next/dynamic";
import Meta from "./meta";
import EditorNav from "./EditorNav";


export default function Layout({
  preview,
  children,
  activeNav,
  background,
  padding,
  seo,
  navType
}) {
  return (
    <>
      <Meta seo={seo} />
      <EditorNav activeNav={activeNav}/>
      <div
        className={`min-h-screen ${padding == false ? "" : "px-3 md:px-8"}`}
        style={{ background: background ? background : "#fff" }}
      >
        {/* <Alert preview={preview} /> */}
        <main
          className="mx-auto"
          style={{ maxWidth: padding == false ? "" : "1200px" }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
