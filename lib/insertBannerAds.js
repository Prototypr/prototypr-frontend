import { JSDOM } from "jsdom";
import { generateSrcset } from "./gumletPostContentLoader";

const insertBannerAds = (htmlString, navSponsor, sponsors) => {
  const template = `
  <div class="my-10">
    <a href="${navSponsor?.link}" target="_blank" style="text-decoration:none!important;">
    <div class="bg-white  h-full p-0 border border-gray-300/50 shadow-sm overflow-hidden group hover:shadow-lg hover:scale-[1.005] transition transition-all duration-300 rounded-2xl flex flex-col sm:flex-row  font-inter w-full ">
      <div class="lg:w-5/12 lg:h-[240px] h-[200px] border-r w-full relative  overflow-hidden border-gray-200">
        <img alt="banner ad for ${navSponsor?.title}" loading="lazy" decoding="async" data-nimg="fill" class="object-cover cursor-pointer group-hover:scale-[1.03] transition transition-all duration-700" sizes="100vw" 
        srcset="${generateSrcset(navSponsor?.cardImage ? navSponsor?.cardImage : navSponsor?.featuredImage)}"
        style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"/>
    </div>
      <div class="lg:w-7/12 px-5 py-4 w-full  flex flex-col justify-between">
        <div class="flex flex-col">
          <div class="flex text-xs mb-3">
              <div class=" bg-[#ecf0f5] text-black/80 capitalize inline-block text-xs px-2 py-0.5 font-medium rounded-full mr-2">Ad</div>
            </div>
            <h2 style="font-size:20px!important;" class="!my-0 !mt-0 !text-[16px] tracking-tight mt-1 font-bold line-clamp-4">
                ${navSponsor?.title}
            </h2>
            <div class="mt-3 text-gray-500 line-clamp-6" style="font-size:18px">
                ${navSponsor?.description}
            </div>
           
        </div>
    </div>
    </div>
    </a>
    <div class="text-gray-500 line-clamp-6 mt-3" style="font-size:13px">
    This article is supported by ${navSponsor?.title}.
    </div>
    </div>
    <hr/>
    `;

  const dom = new JSDOM(htmlString);
  const document = dom.window.document;
  // Get all image elements
  const headings = document.querySelectorAll("h1,h2,h3");

  for (let i = 0; i < headings.length; i++) {
    //if i is 1, insert an advert html string before the heading

    if (i === 1) {
      // Create a new div element
      const div = document.createElement("div");
      div.innerHTML = template;

      // Insert the div before the heading
      headings[i].parentNode.insertBefore(div, headings[i]);
    }
  }

  // Serialize the DOM back to a string and return it
  return dom.serialize();
};

export default insertBannerAds;
