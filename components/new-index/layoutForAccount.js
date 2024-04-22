import { NAV_OFFSET } from "@/lib/constants";
import Meta from "../meta";
import Navbar from "@/components/Navbar/Navbar";
import AccountNavigation from "../user/AccountNavigation";
import Footer from "../footer";

export default function Layout({
  children,
  sponsor,
  background,
  padding,
  seo,
  navType,
  navOffset,
  activeTab,
}) {
  return (
    <>
      <Meta
        seo={
          seo
            ? seo
            : {
                title: "Account | Prototypr",
                description: "Edit your profile on Prototypr",
                image: "",
                canonical: "https://prototypr.io/account",
                url: "https://prototypr.io/account",
              }
        }
      />
      <Navbar navType={navType} sponsor={sponsor} maxWidth={"max-w-[1320px]"} />
      <div
        className={`min-h-screen overflow-hidden ${navOffset == false ? "" : NAV_OFFSET} ${
          padding == false ? "" : "px-3 md:px-8"
        }`}
        style={{ background: background ? background : "#fbfcff" }}
      >
        <main className="mx-auto pb-20 px-2 xl:px-8 ">
          <div className="flex w-ful xl:grid xl:grid-cols-12 lg:gap-6 flex-col md:flex-row">
            <div className="col-span-3">
              <div className="md:max-w-[280px]">
                <AccountNavigation activeTab={activeTab} />
              </div>
            </div>
            <div className="w-full mx-auto px-2 sm:pr-0 col-span-7">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
