import dynamic from "next/dynamic";
// import { useState } from "react";
import DiscoverSection from "@/components/v4/section/DiscoverSectionB";
import SectionDivider from "@/components/v4/section/SectionDivider";
import ToolIconCardRow from "@/components/v4/layout/ToolIconCardRow";
// import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
// import TrendingFullWidth from "@/components/homepage/TrendingFullWidth";
import IntroBanner from "@/components/v4/hero/IntroBanner2";
/**new index components */
// import { BrowserView } from "react-device-detect";
const Footer = dynamic(() => import("@/components/footer"));
// const DesignTool = dynamic(() => import("@/components/new-index/DesignTool"));
const StickyFooterCTA = dynamic(() => import("@/components/StickyFooterCTA"), {
  ssr: false,
});
import { getAllJobs, getPopularTopics } from "@/lib/api";
import { ArrowRight, Compass, Envelope } from "phosphor-react";

// import { HomePageNewNavBar } from "@/components/Navbar/Navbar";
// import {CaretRight} from 'phosphor-react'

import {
  getCombinedPostsForHome,
  getAllToolsForHome,
  getRandomPostsForHome,
  getCommonQuery,
  getActiveSponsors,
} from "@/lib/api";
import { useIntl } from "react-intl";
import { transformPostListOld } from "@/lib/locale/transformLocale";
import { useEffect } from "react";

import TopicSectionC from "@/components/v4/section/TopicSectionC";
// import TopicSelectSection from "@/components/v4/section/TopicSelectSection";

import NewsletterSection from "@/components/v4/section/NewsletterSection";
import { makeAuthorList, shuffleArray } from "@/lib/utils/postUtils";
import useUser from "@/lib/iron-session/useUser";
import TagsNavRow from "@/components/v4/section/TagsNavRow";
// import SponsorBannerFull from "@/components/v4/banner/SponsorBannerFull";
// import TopicSpotlightSection from "@/components/v4/section/TopicSpotlightSection";
// import PopularTagsSection from "@/components/v4/section/PopularTagsSection";
import Container from "@/components/container";
import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
// import JumboTagsSection from "@/components/v4/section/JumboTagsSection";
import ToolLargeCardRow from "@/components/v4/layout/ToolLargeCardRow";
import Link from "next/link";
import Button from "@/components/Primitives/Button";
import { MotionSlider } from "@/components/toolbox/ToolboxCarouselAnimation";
import { MotionSliderToolCard } from "@/components/toolbox/ToolboxHeroWithEmailSignup";
// import GiantTag from "@/components/v4/tag/GiantTag";
// import CategoriesIconCard from "@/components/v4/card/CategoriesIconCard";
// import TopicSubscription from "@/components/Settings/topicsSubscription";
import { TAB_ITEMS, ProductListData, ProductListData2 } from "@/lib/constants";
import GiantTag from "@/components/v4/tag/GiantTag";

export default function Index({
  preview,
  allTools,
  topicRes,
  jobs,
  randomPosts,
  sponsors,
  heroPost,
  morePosts,
  popularTags
}) {
  const intl = useIntl();

  const titleText = intl.formatMessage({ id: "index.header.title" });
  const descriptionText = intl.formatMessage({ id: "intro.description" });

  useEffect(() => {
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:show"]);
    }
  }, []);

  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });
  // const HeroPostRandomSection = randomPosts.filter((item, i) => i === 0);
  // const OtherPostsRandomSection = randomPosts.filter((item, i) => i !== 0);
  const heroJob = jobs.filter((item, i) => i === 0);
  const jobsSidebar = jobs.filter((item, i) => i !== 0);

  const toolsList = allTools

  return (
    <>
      <Layout
        navOffset={false}
        padding={false}
        preview={preview}
        background={"#EFF4FB"}
        // background={"#f7f9fd"}
        // background={"#F7F7F8"}
        // background={"#ffffff"}
        seo={{
          title: titleText,
          description: descriptionText,
          image: "",
          canonical: "https://prototypr.io",
          url: "https://prototypr.io",
        }}
      >
        
          {(!user?.isLoggedIn)?
          <>
          <IntroBanner
            sponsor={sponsors?.length ? sponsors[0] : null}/>
          <SectionDivider py={'py-1 sm:py-2 md:py-5'} transparentLine={true} />
          </>
          :<div className="pt-[100px]"/>}
          <div className='relative z-50 -mt-2'>
            <TagsNavRow/>
          </div>
                {/* <SectionDivider py='py-9' transparentLine={true} /> */}
        <div className="z-50 relative pt-[40px] px-3">
          <div className="text-xs font-medium mb-2 text-center text-gray-500/90 uppercase">Prototypr Toolbox</div>
          <h2 className="text-3xl font-bold mb-[42px] text-center text-gray-800">Tools to shape <span className="text-underline inline-block md:inline">every idea</span></h2>
            <div className="pb-3">
              <MotionSlider
                  duration={50}
                  slides={ProductListData.map((data, i) => {
                    return (
                      <MotionSliderToolCard
                        title={data.title}
                        slug={data.slug}
                        subtext={data.description}
                        image={data.image}
                      />
                    );
                  })}
                />
            </div>
            <div className="pt- ">
              <MotionSlider
                duration={35}
                slides={ProductListData2.map((data, i) => {
                  return (
                    <MotionSliderToolCard
                      slug={data.slug}
                      title={data.title}
                      subtext={data.description}
                      image={data.image}
                    />
                  );
                })}
              />
            </div>
            <div className="w-full flex mt-3 -mb-6 justify-center relative">
            

<svg  className="w-[100px] h-[46px] absolute top-0 -mt-8 -z-10 -ml-8"  width="1012" height="642" viewBox="0 0 1012 642" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M986.725 209.847C972.687 217.253 956.708 220.12 941.476 224.062C924.063 228.571 906.859 233.708 889.416 238.068C889.147 238.187 889.117 238.277 889.296 238.277C888.729 238.367 888.131 238.456 887.504 238.546C868.837 243.204 850.08 247.445 831.233 251.238C836.072 250.82 843.24 249.685 854.291 247.355C825.17 255.299 795.332 260.973 765.524 265.871C736.731 270.649 707.79 275.517 678.698 278.115C675.532 278.652 672.277 279.19 668.931 279.757C643.365 285.491 704.773 276.174 724.486 273.993C649.756 287.283 574.908 299.885 500.029 312.457C495.34 313.264 490.65 313.861 485.961 314.428L485.035 314.548L485.931 314.817L487.783 315.384C520.369 325.119 552.507 336.258 584.555 347.696C585.75 351.25 598.025 354.326 616.274 363.315L628.251 366.838C624.219 365.674 630.999 369.347 627.953 369.018C659.254 381.083 690.675 392.819 721.439 406.228C736.761 412.917 751.964 420.025 766.808 427.76C781.354 435.345 795.243 443.886 809.34 452.218C800.41 445.319 791.181 438.839 781.683 432.687C795.482 441.228 809.31 449.799 823.109 458.34C830.218 462.909 837.177 467.687 843.479 473.361C849.064 478.378 854.829 484.649 856.501 492.234C860.175 509.107 841.359 517.857 828.187 521.381C812.745 525.532 796.527 526.398 780.608 527.115C787.447 527.772 794.556 527.174 801.366 526.726C810.505 526.129 819.645 525.054 828.545 522.934C843.21 519.38 865.372 508.301 858.473 489.338C857.338 485.724 855.486 482.499 853.246 479.453C859.279 487.486 861.907 497.072 856.83 506.33C848.347 520.515 828.456 524.517 813.372 526.846C815.045 527.354 816.18 528.249 817.464 529.384C824.842 536.522 832.309 543.48 839.985 550.289C854.292 561.965 869.225 572.596 884.338 583.198C888.012 586.124 892.254 588.275 896.345 590.574C900.318 592.605 904.738 594.785 907.546 598.398C910.951 602.758 906.71 606.222 903.394 609.059L906.261 609.507L908.143 607.656C909.935 606.103 911.608 603.624 911.399 601.116L911.22 600.22L910.861 599.384C909.577 595.86 905.813 592.963 902.737 591.052C902.02 590.574 901.363 590.186 900.736 589.768C895.718 586.752 893.777 585.468 898.167 587.17C900.258 588.723 902.349 590.186 904.439 591.679C907.665 594.158 911.309 596.875 912.474 600.996C912.743 602.639 912.295 604.311 911.518 605.864C910.891 607.298 909.577 608.462 908.322 609.806L914.654 610.762L906.321 611.867C906.023 612.195 905.724 612.464 905.425 612.763C903.424 614.943 899.929 616.884 897.211 617.899C896.913 618.048 894.971 619.153 894.583 618.914C894.583 618.914 898.406 616.257 898.705 616.077C900.318 614.823 901.931 613.599 903.454 612.255L898.078 612.972C885.234 621.154 869.285 623.364 854.56 625.872C854.889 626.35 856.531 626.679 859.936 627.067C850.289 628.739 842.702 630.024 836.639 631.069C825.857 632.323 815.343 632.711 804.531 632.622C792.495 632.502 780.398 633.697 768.392 634.384C778.099 633.577 787.805 632.95 797.512 632.174C765.614 633.697 733.924 636.145 701.995 633.01C701.995 633.01 701.936 633.07 701.936 633.099C701.876 633.099 702.055 633.159 701.816 633.04C701.756 633.04 701.697 632.98 701.637 632.95C699.934 632.771 695.962 633.189 694.678 631.905C693.304 630.561 695.992 627.634 696.768 626.709C696.768 626.709 696.828 626.619 696.858 626.619C696.858 626.589 696.918 626.559 696.948 626.5C696.948 626.35 696.948 626.201 696.948 626.022C696.888 626.022 696.828 626.022 696.768 626.022L696.679 626.022C696.709 626.261 696.768 626.47 696.798 626.679C696.5 626.858 694.498 628.202 694.498 628.202C694.558 627.933 695.126 626.798 696.888 624.857C696.798 623.633 696.798 622.946 696.888 624.439L697.246 624.439C697.784 623.902 698.411 623.274 699.158 622.528C699.875 621.99 700.562 621.423 701.458 620.885C702.294 620.408 703.1 619.87 703.996 619.392C705.729 618.377 707.7 617.421 709.791 616.525C711.911 615.719 714.211 614.972 716.69 614.853C717.676 614.853 718.691 614.853 719.647 614.972C723.948 615.271 728.219 615.54 732.52 615.838C762.448 616.555 792.226 612.822 822.064 611.419L811.132 611.777C811.132 611.777 819.436 611.001 829.023 610.075C808.265 607.238 787.716 602.49 767.376 597.711C759.341 594.785 750.74 593.113 742.436 591.082C727.921 587.528 713.375 584.004 698.859 580.48C684.851 577.046 670.963 573.134 657.223 568.714C648.502 565.937 639.392 563.279 631.149 559.218C647.158 565.28 663.227 570.267 679.774 574.538L677.265 571.581C659.583 566.594 658.896 566.773 658.448 566.982C658 567.131 657.701 567.4 641.154 561.218C646.023 560.8 651.817 563.369 656.357 564.802C662.928 566.833 669.499 568.893 676.07 570.894C688.913 574.836 701.876 578.569 714.988 581.555C702.832 577.703 690.556 574.179 678.31 570.625C686.285 572.805 694.289 574.806 702.324 576.747C692.467 574.299 682.641 571.73 672.844 568.983C674.666 569.52 676.488 570.058 678.31 570.625C659.165 565.101 640.169 559.248 621.651 551.901C622.786 552.797 621.322 552.528 620.665 552.349C617.469 551.573 614.453 550.348 611.376 549.213C602.177 545.242 588.766 542.016 585.242 531.355C581.538 520.246 592.35 512.571 601.729 510.361C613.347 506.658 626.131 506.718 638.198 506.18C652.534 503.224 667.02 503.015 681.655 502.567L646.411 502.268C680.55 498.356 679.057 502.448 704.892 501.223C696.44 502.209 696.5 502.896 666.9 503.642C663.914 504.747 686.524 504.568 697.336 504.448L690.406 504.717C691.661 504.837 692.796 504.926 693.931 505.046C708.536 504.747 723.112 504.001 737.687 503.164C752.233 502.298 766.868 501.044 780.996 497.431C781.563 497.251 782.071 497.072 782.489 496.863C779.323 497.58 776.157 498.237 772.961 498.715C776.366 498.237 779.651 497.371 782.937 496.565C790.344 495.041 809.758 489.935 803.844 478.856C799.334 470.404 788.433 465.178 780.488 460.609L781.055 461.206C779.502 460.281 778.098 459.355 776.725 458.489C766.54 452.576 755.966 447.977 745.035 443.557C748.022 445.319 746.767 445.23 733.356 439.675C737.239 442.631 742.586 444.214 747.036 446.155C753.487 448.962 760.357 451.501 766.48 454.995C776.396 460.161 786.79 465.537 795.691 472.405C788.373 466.851 780.04 462.909 771.826 458.907C771.259 458.698 770.781 458.549 770.452 458.459C769.078 458.131 769.377 458.459 772.155 460.34C774.962 462.401 780.189 465.208 787.626 469.986C781.593 467.388 775.948 463.775 770.393 460.311C760.715 454.935 750.769 450.127 740.286 446.424C743.392 447.171 739.031 444.901 739.42 444.543C737.807 444.692 735.746 443.677 734.282 443.169C730.877 442.004 727.532 440.72 724.187 439.466C716.869 436.689 709.612 433.762 702.383 430.835C695.454 428.058 688.525 425.221 681.685 422.265C679.535 421.309 677.354 420.383 675.204 419.368C674.636 419.069 672.546 418.442 672.336 417.725L705.639 431.254C707.61 430.806 692.378 424.295 683.776 420.353C628.042 399.987 571.951 380.605 515.769 361.612C493.876 354.206 471.953 346.86 450 339.723C439.935 336.468 429.66 332.287 419.266 330.286C419.266 330.316 419.266 330.316 419.266 330.345C419.505 330.644 422.462 332.585 421.596 332.794C419.893 333.212 417.414 332.436 415.742 332.167C405.975 329.868 396.895 324.492 391.848 315.593C389.279 310.098 389.309 307.321 389.667 305.977C389.936 304.663 390.593 304.603 391.071 303.827C391.071 303.827 391.071 303.767 391.101 303.737C391.22 295.555 399.613 292.389 406.184 290.12C413.92 287.432 422.074 286.088 430.168 284.953C438.023 283.878 445.878 283.012 453.704 281.758C475 278.324 496.265 274.621 517.531 270.947C563.468 262.974 609.375 254.762 655.252 246.34C655.372 245.952 653.579 245.922 649.249 246.25C675.383 241.084 663.615 244.041 660.539 245.385C673.292 243.025 686.195 240.636 699.098 238.217C700.532 237.471 701.696 236.694 688.734 238.844C710.418 234.096 713.733 234.425 716.451 234.962C740.913 230.333 765.225 225.645 788.552 221.046C793.211 219.762 797.124 218.597 800.022 217.582C821.616 213.371 833.234 211.4 840.044 210.624C853.216 207.876 865.731 205.188 877.439 202.62C871.346 203.636 867.552 203.964 868.389 202.799C897.48 198.32 925.646 191.272 953.99 183.448C945.687 181.746 936.876 181.328 928.483 180.372C910.443 178.282 892.432 176.281 874.392 174.28C836.58 170.129 798.707 166.516 760.865 162.693C681.207 154.66 601.699 145.044 522.609 132.561C443.907 120.168 365.474 105.624 287.519 89.2891C285.309 88.8113 283.129 88.3335 280.948 87.7363C270.913 85.616 260.907 83.4658 250.901 81.2858C258.577 83.6748 264.461 85.9743 272.137 88.1842C259.712 85.1979 251.946 83.1074 245.973 81.3754C242.15 80.0913 239.044 78.9863 235.907 77.8216C228.918 76.0597 220.227 73.6706 210.371 70.9232C209.086 70.8635 210.251 71.5803 209.236 71.64C201.5 69.1912 195.795 67.1903 190.837 65.3089C170.825 59.5154 148.036 52.7365 125.396 45.8978C110.164 42.1052 95.1701 36.7298 80.1466 32.1309C65.1828 27.5319 50.2191 22.9629 35.2254 18.3341C26.2651 15.5568 17.2748 12.7794 8.28455 10.0619C5.53671 9.2257 3.32649 8.68823 1.56429 6.11999C0.698119 4.86573 -0.795201 2.23776 0.518984 0.804327C2.01238 -0.868017 6.37307 0.535524 8.16515 0.86402C13.3024 1.49115 16.7969 1.8495 18.2007 1.78977C19.2162 2.4169 21.1576 3.22317 23.8159 4.1788C40.0042 7.91171 63.6596 13.8545 90.0926 20.6335L138.598 32.1608C152.188 33.0865 105.415 22.7836 84.3281 16.2137C143.765 30.9363 124.65 26.9346 169.033 39.9251C180.114 42.6726 195.018 47.0027 209.534 51.2134C234.534 57.4847 255.74 62.5616 268.583 65.0999C266.851 64.6221 265.088 64.204 263.356 63.7262C274.437 66.175 285.548 67.5188 296.838 68.5043C306.635 69.3405 316.312 71.4906 325.959 73.4616C321.628 73.0137 317.327 72.6254 312.996 72.2073C308.218 71.6996 303.14 70.5052 298.331 70.5052C316.73 73.7603 335.158 76.9556 353.617 80.0913L340.296 77.5529C362.697 81.4052 390.115 86.273 379.154 82.5102C393.251 84.959 407.767 87.1091 421.536 91.1705C434.529 93.2311 447.551 95.232 460.574 97.2029C447.999 93.6194 406.483 87.2883 445.49 91.6782L478.763 98.487C484.617 98.4273 538.021 106.222 535.691 103.922C554.508 106.879 557.375 108.431 572.667 110.85C587.123 111.597 597.906 112.164 616.125 115.778C574.101 111.448 532.256 106.759 490.411 100.996C491.875 101.623 500.566 102.847 509.168 104.012L491.367 101.802C549.759 110.373 608.24 118.167 666.96 124.169C676.398 124.349 655.222 121.123 652.295 120.018C679.355 122.198 706.027 127.454 733.147 129.067C676.339 122.646 753.786 129.605 772.573 130.023C762.298 130.919 751.845 130.471 741.54 130.023C728.548 129.515 715.555 128.709 702.563 127.604C742.586 131.337 782.698 134.562 822.811 137.638C862.177 140.624 901.632 142.983 940.669 149.105C952.228 150.897 963.936 152.749 975.256 155.645C983.559 157.766 991.922 161.528 997.955 167.8C1003.96 174.011 1007.51 183.269 1004.8 191.75C1002.08 200.231 994.252 205.995 986.696 209.967C999.36 203.307 971.433 218 986.696 209.967L986.725 209.847ZM787.746 545.54C787.417 546.884 787.835 547.332 788.761 548.228C789.568 548.915 790.344 549.602 791.121 550.289L797.99 555.992C804.532 561.637 811.849 566.743 818.898 571.701L833.055 581.824C834.041 582.541 835.027 583.228 836.012 583.915C821.048 573.253 805.905 562.592 791.957 550.587C791.001 549.87 790.076 549.154 789.12 548.407C788.732 548.049 788.194 547.75 787.865 547.272C787.537 546.795 787.596 546.108 787.746 545.54C787.626 546.048 787.596 546.108 787.746 545.54ZM847.093 591.828C847.093 591.828 847.243 591.828 847.332 591.858C847.243 591.798 847.123 591.739 847.063 591.679C847.063 591.679 847.063 591.739 847.063 591.769C847.063 591.769 847.123 591.799 847.123 591.828L847.093 591.828ZM843.599 589.26C843.21 588.961 842.822 588.693 842.434 588.424C842.792 588.693 843.181 588.962 843.569 589.23L843.599 589.23L843.599 589.26ZM789.657 531.236C776.396 532.102 763.135 533.267 749.844 533.953C746.319 534.133 742.765 534.312 739.211 534.162C736.284 534.043 730.429 534.7 728.13 532.221C727.174 531.086 727.025 530.25 717.198 529.683C701.488 530.191 685.777 530.28 669.977 530.191C655.461 530.609 641.035 529.116 626.489 530.041C633.986 533.685 641.632 536.88 649.428 539.807C676.757 547.87 704.683 553.663 732.281 560.741C734.073 559.725 701.577 551.782 698.292 549.094C734.82 559.248 791.658 574.179 799.334 578.42C808.713 580.719 817.643 582.899 826.215 584.96C823.975 583.168 821.735 581.316 819.615 579.346C818.898 578.689 817.345 577.613 817.076 576.598C816.957 576.12 818.719 577.046 818.808 577.076C821.228 578.39 823.527 579.973 825.827 581.496C822.004 578.748 818.211 575.911 814.448 573.044C813.671 572.477 808.295 569.252 808.325 568.147C808.325 568.326 810.804 569.759 811.013 569.879C814.089 572.029 817.106 574.239 820.123 576.479C824.692 579.883 829.262 583.287 833.772 586.841C835.594 587.289 837.386 587.737 839.178 588.155C822.243 576.299 805.428 564.294 789.568 551.005C788.224 549.632 785.566 547.929 786.163 545.69C786.79 543.092 788.851 540.852 790.703 539.03C794.496 535.387 799.036 532.251 803.904 530.22C799.454 532.012 795.243 534.64 791.599 537.716C788.97 539.956 784.908 543.39 784.878 547.242C784.878 548.228 784.759 548.168 784.699 548.586C784.699 548.975 784.938 549.781 786.462 552.439C789.866 556.202 793.66 559.845 797.512 563.13C793.51 559.845 789.777 556.142 785.924 552.708C784.938 551.214 783.952 549.721 782.907 548.168C781.294 543.091 787.447 537.806 790.852 535.028L792.286 533.923L793.391 533.147C796.139 531.295 799.066 529.623 802.471 528.22L798.707 527.234C751.188 530.609 805.129 528.757 789.687 531.236C805.129 528.757 762.089 533.028 789.687 531.236L789.657 531.236ZM827.112 604.968C829.531 605.386 831.562 605.655 833.354 605.894C833.414 605.894 833.474 605.894 833.533 605.894C827.709 604.819 821.885 603.714 816.091 602.549C820.541 603.594 824.155 604.401 827.112 604.968C829.531 605.386 824.125 604.371 827.112 604.968ZM782.758 595.77C792.823 598.458 802.321 600.877 810.893 603.385C822.183 605.177 820.72 604.013 814.537 602.251C798.23 598.966 781.981 595.322 765.793 591.56C771.438 592.933 777.113 594.337 782.758 595.8C792.823 598.488 777.292 594.397 782.758 595.8L782.758 595.77ZM693.244 125.364C671.172 123.124 681.894 124.946 667.528 124.05C677.533 125.065 687.539 126.051 697.515 126.977L693.244 125.334L693.244 125.364Z" fill="#3EA7F3"/>
<path d="M747.245 501.014C750.112 500.835 753.935 500.626 757.758 500.387C762.836 499.849 767.913 499.341 772.961 498.595C762.507 500.476 752.024 501.044 742.436 501.163C742.436 501.163 744.348 501.103 747.245 501.014C750.112 500.835 744.377 501.103 747.245 501.014Z" fill="#3EA7F3"/>
<path d="M740.346 446.245C739.181 445.976 737.06 445.29 733.297 443.946C735.537 444.603 737.956 445.409 740.346 446.245Z" fill="#3EA7F3"/>
<path d="M697.366 504.329L698.919 504.269C705.699 504.18 703.1 504.269 697.366 504.329Z" fill="#3EA7F3"/>
<path d="M704.922 501.134C708.477 500.656 713.285 500.417 722.723 499.641C715.495 500.596 709.791 500.835 704.922 501.134Z" fill="#3EA7F3"/>
<path d="M768.481 634.323C765.464 634.532 763.463 634.622 763.463 634.622C765.225 634.532 766.868 634.413 768.481 634.323Z" fill="#3EA7F3"/>
<path d="M889.296 238.277C890.67 238.098 891.925 237.948 892.851 237.919C890.73 238.247 889.625 238.366 889.296 238.277Z" fill="#3EA7F3"/>
<path d="M1011.58 189.451C1011.52 189.958 1011.46 190.257 1011.46 190.257C1010.2 196.17 1006.65 201.366 1002.29 205.428C999.807 207.727 997.089 209.698 994.192 211.4C993.475 211.848 988.069 213.939 987.86 214.446C988.159 214.178 988.457 213.939 988.786 213.789C1001.03 207.279 1013.46 196.14 1010.29 180.701C1010.05 178.849 1009.54 176.789 1008.77 175.057C1008.26 173.772 1007.93 172.996 1007.93 172.996C1007.93 172.996 1008.41 173.952 1009.13 175.385C1010.62 179.208 1011.78 183.179 1011.66 187.33C1011.66 188.197 1011.66 188.943 1011.58 189.451C1011.66 188.943 1011.52 189.958 1011.58 189.451Z" fill="#3EA7F3"/>
<path d="M897.48 140.475C888.221 138.533 878.872 136.861 869.554 135.159C893.149 137.01 916.208 141.639 939.654 144.954C925.616 143.222 911.548 141.759 897.48 140.475Z" fill="#3EA7F3"/>
<path d="M821.138 134.98L830.665 136.384C821.854 135.428 820.003 135.07 821.138 134.98Z" fill="#3EA7F3"/>
<path d="M821.138 134.98L800.559 131.934C805.637 132.501 815.881 133.636 819.525 133.666L803.217 130.381L857.995 136.055L836.938 134.86C836.58 135.547 823.079 134.8 821.108 134.98L821.138 134.98Z" fill="#3EA7F3"/>
<path d="M772.573 129.843C773.827 129.724 775.47 129.694 776.366 129.545C776.754 129.843 775.261 129.903 772.573 129.843Z" fill="#3EA7F3"/>
<path d="M208.727 48.5557L216.493 51.542L183.22 42.3441L208.727 48.5557Z" fill="#3EA7F3"/>
<path d="M272.167 87.9752C276.558 89.0204 280.351 89.9163 286.055 91.29C280.53 90.215 276.139 89.0801 272.167 87.9752Z" fill="#3EA7F3"/>
<path d="M301.109 94.9337L313.982 98.7861L303.946 96.3672C295.404 94.6949 292.537 93.2315 301.109 94.9337Z" fill="#3EA7F3"/>
<path d="M364.13 105.505C368.431 106.789 372.702 108.133 377.033 109.298C377.033 108.91 360.008 106.043 358.664 105.804C353.318 104.759 347.972 103.713 342.655 102.668L364.1 105.535L364.13 105.505Z" fill="#3EA7F3"/>
<path d="M614.96 399.271C584.525 389.804 557.823 378.784 528.075 368.69C555.195 376.963 590.976 389.893 614.96 399.271Z" fill="#3EA7F3"/>
<path d="M799.394 483.276C799.095 484.44 798.229 485.246 797.452 485.814C796.945 486.172 796.437 486.471 795.9 486.74C792.644 488.711 788.074 489.786 784.341 490.413C783.504 490.502 780.846 491.01 780.278 490.025C779.771 489.129 781.563 487.904 781.921 487.217C788.88 485.635 798.349 482.38 783.713 487.874C786.64 487.188 789.538 486.501 792.435 485.814C793.122 485.605 793.838 485.396 794.555 485.157L795.422 484.858C795.72 484.739 795.989 484.649 796.109 484.619C797.363 484.351 798.767 483.096 798.737 481.812C798.737 480.588 798.289 479.752 798.289 479.752C799.155 480.797 799.663 482.111 799.394 483.276C799.663 482.111 799.095 484.44 799.394 483.276Z" fill="#3EA7F3"/>
<path d="M592.111 545.331C599.698 550.02 608.389 553.454 616.483 557.157C620.396 558.919 624.279 560.801 628.132 562.652C629.386 563.279 630.701 563.877 631.895 564.563C632.612 564.952 635.24 566.534 632.881 566.504C618.962 561.129 605.492 554.888 592.081 548.348C599.071 551.483 606.06 554.828 613.228 557.605C605.642 553.723 597.816 549.602 590.678 544.973C586.616 542.046 583.45 538.224 581.687 533.505C583.689 538.552 587.482 542.524 592.111 545.302C593.366 546.078 587.601 542.614 592.111 545.302L592.111 545.331Z" fill="#3EA7F3"/>
<path d="M600.803 504.538C603.341 503.672 606.418 503.164 610.868 502.955C605.79 503.702 599.907 504.747 593.784 507.793C595.008 507.017 596.143 506.419 597.248 505.941C598.383 505.374 599.518 504.926 600.803 504.538C603.341 503.672 599.548 504.896 600.803 504.538Z" fill="#3EA7F3"/>
<path d="M581.06 531.654C581.269 532.281 581.479 532.908 581.688 533.565L581.001 531.594C580.821 530.908 580.732 530.191 580.612 529.474C580.314 528.041 580.463 526.518 580.583 525.024C581.867 517.23 586.825 511.317 593.784 507.823C592.888 508.331 591.932 508.928 590.857 509.764C590.319 510.153 589.782 510.571 589.155 510.989C588.587 511.526 587.99 512.094 587.362 512.691C584.943 515.14 581.807 518.962 580.792 525.204C580.612 526.906 580.523 528.369 580.792 529.683C580.881 530.34 580.941 531.027 581.09 531.684C581.299 532.311 580.941 531.027 581.09 531.684L581.06 531.654Z" fill="#3EA7F3"/>
<path d="M727.114 591.47C733.984 593.083 738.583 594.187 738.583 594.187L710.418 588.245C704.743 584.93 675.801 580.898 664.989 575.344C685.538 581.346 706.266 586.513 727.084 591.47C733.954 593.083 720.185 589.798 727.084 591.47L727.114 591.47Z" fill="#3EA7F3"/>
<path d="M861.34 630.441C861.967 630.202 863.222 629.874 865.372 629.396C864.118 629.755 862.744 630.113 861.34 630.441Z" fill="#3EA7F3"/>
<path d="M870.539 629.994C870.928 629.934 873.347 629.337 873.675 629.725C873.466 629.486 864.297 632.114 863.58 632.233C858.592 633.159 853.574 633.966 848.586 634.772C845.599 635.011 841.896 635.399 837.625 635.907C798.438 638.684 758.983 642.357 719.647 640.894C719.647 640.894 721.648 640.535 723.649 640.177C725.65 639.759 727.622 639.311 727.622 639.311C750.142 639.729 772.692 639.162 795.212 638.146C817.404 637.101 839.716 635.728 861.37 630.472C859.04 631.338 866.209 630.591 870.539 630.024C873.347 629.665 866.179 630.591 870.539 630.024L870.539 629.994Z" fill="#3EA7F3"/>
<path d="M676.966 531.654C685.598 532.341 694.23 532.998 702.861 533.536L691.004 534.133L676.936 531.654L676.966 531.654Z" fill="#3EA7F3"/>
<path d="M787.985 433.553C780.249 428.716 772.513 423.997 764.628 419.398C778.815 426.864 792.644 434.838 806.383 443.14C801.664 440.84 796.945 438.571 792.226 436.301C792.226 436.301 790.523 435.196 788.015 433.553C790.553 435.196 785.446 431.941 788.015 433.553L787.985 433.553Z" fill="#3EA7F3"/>
<path d="M710.478 396.492L724.336 401.808C732.998 405.242 740.644 409.961 749.007 413.933C736.253 407.9 723.381 402.166 710.448 396.492L710.478 396.492Z" fill="#3EA7F3"/>
<path d="M678.34 384.01L632.104 365.405C637.063 367.495 640.169 368.391 643.126 369.257L678.34 384.01Z" fill="#3EA7F3"/>
</svg>



              <Link href="/newsletter">
              <div variant="ghostSmallBlue" className="rounded-full mb-[48px] font-medium mt-6 text-blue-700/80">Get <span className="">'em</span> weekly 
              <Envelope className="inline -mt-[3px] ml-1" size={22} />
              </div>
              </Link>
          </div>
        </div>
        <SectionDivider py='py-4' transparentLine={true} />
        <div className="z-50 relative bg-[#EFF4FB]">
          <SectionDivider py='py-3.5' transparentLine={true} />
            <DiscoverSection
              user={user}
              heroCardPost={heroPost}
              viewablePosts={morePosts}
              jobsSidebar={jobsSidebar}
            />
        </div>

        <SectionDivider py='py-6' transparentLine={true} />
        
        <Container maxWidth="max-w-[1320px] z-30 relative">
          <div className="p-6 md:p-6 bg-white relative overflow-hidden rounded-3xl shadow-md">
              <ToolLargeCardRow tools={toolsList.slice(0,5)} />
              <SectionDivider py="py-4" transparentLine={true}  />
              <ToolIconCardRow tools={toolsList.slice(5,15)} />       

              
          {/* <div className="flex mt-10">
            <Link href="/toolbox">
              <Button className="rounded-full bg-blue-600 px-6 py-4 leading-none text-white" variant="confirmBig">
                Open toolbox
              </Button>
            </Link>
          </div>      */}
          </div>
        </Container>
        
        <SectionDivider py='py-6' transparentLine={true}  />
        <Container  maxWidth="max-w-[1320px]">
        <TwoColumnCards/> 
        </Container>
        {/* <SectionDivider />
        <div className="hidden md:block">
          <SponsorBannerFull/>
          <SectionDivider />
        </div> */}
        <SectionDivider py="py-6" transparentLine={true} />
        
        <Container padding={false} maxWidth="relative z-0">
        <div class="relative bottom-0 w-full z-0">
          <img class="w-full translate-y-[4px] z-0" src="/static/images/tilt-section2.svg"/>
          <div class="w-full h-[40px] md:h-[50px] translate-y-[2px] bg-[#dbeeff]">
            </div>
          </div>
        </Container>
        {/* <TopicSelectSection topics={TAB_ITEMS} /> */}
        <Container maxWidth="w-full bg-[#dbeeff]  relative relative z-10">
        {/* <img src="/static/images/bendy9.svg" className="absolute bottom-0 -mb-[12%] mb-12 z-20 left-0 w-full"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[200px] left-0 w-full h-[124%] object-cover"/> */}
        {/* <img src='/static/images/toolpattern.svg' style={{opacity:0.37}} className="absolute top-0 -mt-[150px] left-0 w-full h-[124%] object-cover"/> */}

          <div className="max-w-[1320px] mx-auto px-6 pb-8 ">
          <div className="flex justify-between mb-8">
              <h3 className="text-3xl text-[#0F1F40] font-semibold font-inter max-w-md leading-[32px]">
              Browse by <span className="text-underline">category</span>
              </h3>
              <div className="flex relative p-2 mb-1">
            <div className="hidden sm:inline text-md text-blue-800 font-normal font-inter">
            <Link href={`/topics/`}>See all</Link>
            </div>
            <div className="my-auto">
              <Link href={`/topics/`}>
                <div className="bg-blue-200/60 outline outline-1 outline-blue-300/80 ml-2.5 flex justify-center my-auto h-6 w-6 rounded-full">
                    <ArrowRight weight="bold" size={14} className="text-blue-900 my-auto"/>
                </div>
              </Link>
            </div>
          </div>
                {/* <div className="my-auto">
                <Link href='/topics'>
                  <div className="flex">
                    <div className="text-sm my-auto text-black opacity-60">See all <span className="hidden md:inline-block">topics</span></div>
                    <CaretRight className="opacity-60 my-auto" size={16} />
                  </div>
                </Link>
                </div> */}

            </div>
            {/* <div className="flex justify-start w-full">
              <h2 className="md:text-[28px] text-left mb-10 pt-4 text-[20px] max-w-lg leading-snug md:leading-[40px] md:leading-[48px] font-semibold font-inter text-[#0F1F40] ">
           Explore Topics 
            </h2>
            </div> */}
            <div className="pt-4 rounded-xl flex flex-wrap">
            <Link href={"/"}>
            <div
              className={`inline-block capitalize text-sm pr-4 pl-2 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-5 mb-3 text-blue-900 font-medium`}
            >
              <div className="flex">
          <Compass weight={`regular`} className="my-auto p-0" size={20} />
            <div className="ml-2 my-auto">Explore all topics</div>
          </div>
            </div>
          </Link>
         
              {popularTags.map((topic, i) => (
                <div key={`topic_${i}`}>
                      <Link href={`/posts/${topic?.slug}/page/1/`}>
                    <div  className={`inline-block capitalize text-sm px-4 py-2 cursor-pointer bg-blue-50/50 outline outline-1 outline-blue-300/60 rounded-full mr-3 mb-3 text-blue-900 font-medium`}>
                      {topic?.name}
                    </div>
                  </Link>
                </div>
                      ))}
            </div>
            {/* <JumboTagsSection popularTags={popularTags}/> */}
            {/* <PopularTagsSection popularTags={popularTags}/> */}
          </div>
        </Container>
         {/* <SectionDivider />
        <TopicSpotlightSection title={'Topic spotlight:'} tagline={'Open Web'}/> */}
        <div className="bg-[#dbeeff]">
          {/* <SectionDivider py='py-6 pt-12' transparentLine={true} /> */}
          {/* <SectionDivider /> */}
          {TAB_ITEMS?.map((topic, index) => {
            return (
              <div key={`topicsection_${index}`} className="z-40">
              <TopicSectionC
                tagline={topic.tagline}
                showSidebar={false}
                slug={topic.slug}
                icon={topic.icon}
                title={topic.name}
                HeroPostRandomSection={topicRes[topic.slug]?.posts[0]}
                OtherPostsRandomSection={topicRes[topic.slug]?.posts?.slice(1, 5)}
                heroJob={heroJob}
                sponsors={sponsors}
                toolsList={topicRes[topic.slug]?.tools.slice(0, 7)}
                authorsList={topicRes[topic.slug]?.authors}
              />
                {index!==TAB_ITEMS.length-1?
                  <>
                  {/* <SectionDivider /> */}
                  <div className="w-full pb-8"></div>
                  </>
                  :<div className="w-full pb-8"></div>
                  }
                {index==1?
                <div className="-mt-6">
                    <NewsletterSection/>
                  {/* <SectionDivider /> */}
                  <div className="w-full pb-12"></div>
                  </div>:''
              }
              </div>
            );
          })}

        <SectionDivider transparentLine={true}/>

        </div>
          {/* <BrowserView>
          <DesignTool allTools={toolsList} />
        </BrowserView> */}
      </Layout>
      {!user?.isLoggedIn && <StickyFooterCTA title="Get the latest stories"
      description="Join today to make posts and grow with us."
      />}
      <Footer />
    </>
  );
}

export async function getStaticProps({ preview = null, locale }) {
  let sort = ["featured:desc", "tier:asc", "date:desc"];
  if (locale == "es-ES") {
    sort = ["esES:desc", "featured:desc", "tier:asc", "date:desc"];
  }

  let allPosts = (await getCombinedPostsForHome(preview, 5, 0, sort)) || [];

  let randomPosts = (await getRandomPostsForHome()) || [];
  let toolCount = 20;
  let allTools =
    (await getAllToolsForHome(preview, toolCount, 0, ["featured:desc","date:desc"])) || [];

  let jobs = (await getAllJobs(null, 5, 1)) || [];
  let sponsors = await getActiveSponsors();

  // topic sections
  let topicRes = {};
  for (let index = 0; index < TAB_ITEMS.length; index++) {
    const tag = TAB_ITEMS[index].slug;
    const res =
      (await getCommonQuery(preview, [tag], "article", 12, 0, sort)) || [];
    
    const topicToolsRes =
      (await getCommonQuery(preview, [TAB_ITEMS[index].toolSlug], "tool", 5, 0, sort)) || [];

      //extract authors from the postss while we don't have an endpoint for it
    const authors = makeAuthorList(res)
   
    //shuffle so it's different each time
    shuffleArray(res.data)
    shuffleArray(authors)
    shuffleArray(topicToolsRes.data)
     
    const topicData = {authors:authors, posts:res.data, tools:topicToolsRes.data}
    topicRes[tag] = topicData
  }

  const popularTags = (await getPopularTopics({postType:'article', pageSize:34})) || [];


  allPosts = transformPostListOld(allPosts.data, locale);
  if(locale!=='es-ES'){
    shuffleArray(allPosts)
  }
  allTools = transformPostListOld(allTools.data, locale);
  // shuffleArray(allTools)
  // await generateCombinedRSS({ allPosts, allTools });
  // otherPosts = transformPostListOld(otherPosts.data, locale);
  return {
    props: {
      heroPost: allPosts[0],
      morePosts: allPosts.slice(1),
      allTools: allTools,
      popularTags,
      // otherPosts: otherPosts,
      // interviewPosts: interviews.data,
      topicRes,
      preview,
      jobs,
      randomPosts: randomPosts.slice(0, 8),
      sponsors: sponsors?.posts?.length ? sponsors?.posts : [],
    },
    revalidate: 20,
  };
}