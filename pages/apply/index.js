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

const seo = {
  title: "Writers Network for Designers",
  description:"A network for writers to share and receive feedback. We are an Open Source design platform where quality is rewarded, not clicks. Driven by humans, not algorithms. Get draft feedback. Write for meaning. Join us. ",
  url:"https://prototypr.io/apply",
  image:"https://prototypr.io/static/images/writers-card.png"
}

const NetworkPage = () => {
  return (
    <div className="bg-[#CCE6FF]">
      <Header />
      <Meta seo={seo} />
      <Hero />
      <Features />
      <PitchSection />
      <MissionSection />
      <NewsContent />

      <NetworkCTA />
      <Footer />
    </div>
  );
};

export default NetworkPage;
