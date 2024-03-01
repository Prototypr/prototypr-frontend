import Header from "@/components/landing-pages/components/common/header";
const Footer = dynamic(() => import("@/components/footer"));
import dynamic from "next/dynamic";
import Meta from "@/components/meta";
import Hero from "@/components/landing-pages/components/web-mon/hero";
import WebMonetizationSection from "@/components/landing-pages/components/web-mon/MonetizationSection";
import WebStandard from "@/components/landing-pages/components/web-mon/webStandardSection";
import FooterCTA from "@/components/landing-pages/components/web-mon/footerCTA";
import PayoutSection from "@/components/landing-pages/components/web-mon/payoutSection";
import SunsetNotice from "@/components/landing-pages/components/web-mon/SunsetNotice";


const seo = {
  title: "Web Monetization on Prototypr",
  description:"Web Monetization provides an open, native, efficient, and automatic way to compensate creators through payment providers like Coil. Finally, an alternative to intrusive ads.",
  url:"https://prototypr.io/web-monetization",
  image:"https://prototypr.io/static/images/coins.png"
}

const Index = () => {
  return (
    <div className="bg-[#22AA79] overflow-hidden">
      <Meta seo={seo}/>
      <Header />
      <Hero />
      <WebMonetizationSection />
      <WebStandard />
      <FooterCTA />
      <SunsetNotice/>
      {/* <PayoutSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
