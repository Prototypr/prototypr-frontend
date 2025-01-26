import "instantsearch.css/themes/algolia-min.css";
import React, { useState } from "react";
import {
  InstantSearch,
  InfiniteHits,
  Stats,
  Highlight,
  Configure,
  connectSearchBox,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Link from "next/link";
import { MagnifyingGlass } from "../icons";

const originalSearchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  // "https://search.prototypr.io/",
  process.env.NEXT_PUBLIC_MEILISEARCH_KEY
  //   {
  //     filters: "(type:article OR type:tool)",
  //   }
);
const searchClient = {
  ...originalSearchClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      const container = document.querySelector("#meilisearch-toolbox-results");
      container.classList.add("hidden");
    } else {
      const container = document.querySelector("#meilisearch-toolbox-results");
      container.classList.remove("hidden");
    }

    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return originalSearchClient.search(requests);
  },
};

const filter_options = [{ name: "Tool", filter: "type=tool" }];

const SearchBoxToolComponent = ({
  currentRefinement,
  isSearchStalled,
  refine,
}) => {
  return (
    <form noValidate action="" role="search">
      <input
        type="search"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        style={{
          boxShadow:
            "0px 100px 80px rgba(0, 0, 0, 0.00696822), 0px 30.1471px 24.1177px rgba(0, 0, 0, 0.01), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.0130318), 0px 4.5288px 3.62304px rgba(0, 0, 0, 0.02)",
        }}
        className="max-w-[340px] rounded-full px-4 h-[50px] text-lg placeholder-lg placeholder-gray-500 md:w-[400px] border-1 border border-gray-400/70 bg-white"
        placeholder="Search 1000s of tools..."
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <MagnifyingGlass className={"my-auto"} size={22} weight="bold" />
      </span>
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBoxToolComponent);

export const SearchBarToolbox = props => {
  const [activeFilter, setActiveFilter] = useState(filter_options[0]?.filter);

  return (
    <div className="relative ml-3 sm:ml-1">
      <InstantSearch indexName="post" searchClient={searchClient}>
        <Configure
          // analytics={false}
          filters={`${activeFilter}`}
          hitsPerPage={8}
        />
        {/* <SearchBox placeholder="Search for design tools and articles" /> */}
        <CustomSearchBox />
        <div
          id="meilisearch-toolbox-results"
          className="absolute hidden bg-white z-10 w-full border border-black border-opacity-10 border-t-0 rounded-b-lg overflow-x-hidden overflow-y-scroll h-[300px] overflow-auto p-4 left-0"
        >
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <Stats />
            </div>
            <select
              id="location"
              className="w-[100px]"
              onChange={e => {
                setActiveFilter(
                  filter_options[parseInt(e.target.value, 10)]?.filter
                );
              }}
            >
              {filter_options.map((i, index) => (
                <option key={"filter_" + index} value={index}>
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <InfiniteHits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

const Hit = ({ hit }) => {
  const image = getImage(hit);
  const link = getLink(hit);
  return (
    <Link href={link ? link : "#"}>
      <div className="flex" key={hit.id}>
        {image ? <SearchResultImage hit={hit} image={image} /> : ""}
        <div className="flex flex-col hit-name">
          <Highlight
            className="text-base text-gray-800 line-clamp-2 font-medium"
            attribute="title"
            hit={hit}
          />
          <div className="mt-1.5">
            <span className="capitalize text-xs capitalize bg-gray-100  px-3 py-0.5 border border-black border-opacity-5 text-gray-500 rounded-full">
              {hit.type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const SearchResultImage = ({ image, hit }) => {
  const [brokenImage, setBrokenImage] = useState(false);

  const toggleBrokenImage = () => {
    setBrokenImage(!brokenImage);
  };
  return (
    <img
      onError={toggleBrokenImage}
      className={`${
        brokenImage ? "hidden" : ""
      } object-cover h-14 w-14 border border-gray-100 rounded-md mr-3`}
      src={image}
      alt={hit.name}
    />
  );
};

const getImage = hit => {
  if (hit) {
    if (hit.legacyMedia?.logoNew) {
      return hit.legacyMedia?.logoNew;
    } else if (hit.featuredImage) {
      return hit.featuredImage;
    } else if (hit.legacyFeaturedImage?.thumb) {
      return hit.legacyFeaturedImage.thumb;
    } else if (hit.legacyFeaturedImage?.medium) {
      return hit.legacyFeaturedImage.medium;
    } else if (hit.legacyFeaturedImage?.mediaItemUrl) {
      return hit.legacyFeaturedImage.mediaItemUrl;
    } else if (hit.legacyMedia?.imgUrl) {
      return hit.legacyMedia?.imgUrl;
    }
  }
};

const getLink = hit => {
  if (hit.type == "article") {
    return `${process.env.NEXT_PUBLIC_HOME_URL}/post/${hit.slug}`;
  }
  if (hit.type == "tool") {
    return `${process.env.NEXT_PUBLIC_HOME_URL}/toolbox/${hit.slug}`;
  }
};
