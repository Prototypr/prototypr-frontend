import Header from "@/components/landing-pages/components/common/header";
const Footer = dynamic(() => import("@/components/footer"));
import dynamic from "next/dynamic";
import Meta from "@/components/meta";
import Hero from "@/components/landing-pages/components/web-mon/hero";
import WebMonetizationSection from "@/components/landing-pages/components/web-mon/MonetizationSection";
import WebStandard from "@/components/landing-pages/components/web-mon/webStandardSection";
import FooterCTA from "@/components/landing-pages/components/web-mon/footerCTA";
import PayoutSection from "@/components/landing-pages/components/web-mon/payoutSection";

const Index = () => {
  return (
    <div className="bg-[#22AA79] overflow-hidden">
      <Meta />
      <Header />
      <Hero />
      <WebMonetizationSection />
      <WebStandard />
      <FooterCTA />
      <PayoutSection />
      <Footer />
    </div>
  );
};

export default Index;
