import dynamic from "next/dynamic";
import Meta from "@/components/meta";

import Hero from "@/components/landing-pages/components/network/hero";
import PitchSection from "@/components/landing-pages/components/network/pitch";
import MissionSection from "@/components/landing-pages/components/network/mission";
import NetworkCTA from "@/components/landing-pages/components/network/networkCTA";
import Header from "@/components/landing-pages/components/common/header";
import NewsContent from "@/components/landing-pages/components/network/news";
import Features from "@/components/landing-pages/components/network/features";

const Footer = dynamic(() => import("@/components/footer"));

const NetworkPage = () => {
  return (
    <div className="bg-[#CCE6FF]">
      <Header />
      <Meta seo={{}} />
      <Hero />
      <Features/>
      <PitchSection />
      <MissionSection />
      <NetworkCTA />
      <NewsContent />
      <Footer />
    </div>
  );
};

export default NetworkPage;
