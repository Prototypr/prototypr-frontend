import "instantsearch.css/themes/algolia-min.css";
import React, { useState } from "react";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
  Configure
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Link from "next/link";

const originalSearchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_URL,
  process.env.NEXT_PUBLIC_MEILISEARCH_KEY,
//   {
//     filters: "(type:article OR type:tool)",
//   }
  );
const searchClient = {
    ...originalSearchClient,
    search(requests) {

        if (requests.every(({ params }) => !params.query)) {
            const container = document.querySelector('#meilisearch-results');
            container.classList.add('hidden')
          }else{
            const container = document.querySelector('#meilisearch-results');
            container.classList.remove('hidden')
          }

      if (requests.every(({ params }) => !params.query)) {
        
       
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0
          }))
        });
      }
  
      return originalSearchClient.search(requests);
    }
  };

const filter_options = [
    {name:'All',filter:'(type=tool OR type=article)'},
    {name:'Article', filter:'type=article'},
    {name:'Tool',filter:'type=tool'}]

const SearchBar = (props) =>{

    const [activeFilter, setActiveFilter] = useState(filter_options[0]?.filter)

    return(
    <div className="relative ml-4">
    <InstantSearch indexName="post" searchClient={searchClient}>
        <Configure
        // analytics={false}
        filters={`${activeFilter}`}
        hitsPerPage={8}
      />
      <SearchBox placeholder="Search for design tools and articles" />
      <div id="meilisearch-results" className="absolute hidden bg-white top-0 mt-[48px] h-[80vh] overflow-auto w-full md:max-w-xl w-[426px] rounded-xl shadow-xl p-4 left-0">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
            <Stats />
        </div>
      <select
        id="location"
        className="w-[100px]"
        onChange={(e)=>{
           setActiveFilter(filter_options[parseInt(e.target.value,10)]?.filter) 
        }}
    >
        {filter_options.map((i, index) => (
        <option key={'filter_'+index} value={index}>
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
    )
}

export default SearchBar

const Hit = ({ hit }) => {

    const image = getImage(hit)
    const link = getLink(hit)
    return(
        <Link href={link?link:'#'}>
            <div className="flex" key={hit.id}>
                {image?<SearchResultImage hit={hit} image={image}/>:''}
            <div className="flex flex-col hit-name">
                <Highlight className="text-base text-gray-800 line-clamp-2 font-medium" attribute="title" hit={hit} />
                <div className="mt-1.5">
                    <span className="capitalize text-xs capitalize bg-gray-100 font-inter px-3 py-0.5 border border-black border-opacity-5 text-gray-500 rounded-full">
                        {hit.type}
                    </span>
                </div>
            </div>
        </div>
        </Link>
  );
}

const SearchResultImage = ({image, hit}) =>{
    const [brokenImage, setBrokenImage] = useState(false)

    const toggleBrokenImage = () =>{
        setBrokenImage(!brokenImage)
    }
    return(
        <img onError={toggleBrokenImage} className={`${brokenImage?'hidden':''} object-cover h-14 w-14 border border-gray-100 rounded-md mr-3`} src={image} alt={hit.name} />
    )
}


  const getImage = (hit) =>{

    
    if(hit){
        if (hit.legacyMedia?.logoNew){
            return hit.legacyMedia?.logoNew
        }
        else if(hit.featuredImage){
            return hit.featuredImage
        }else if (hit.legacyFeaturedImage?.thumb){
            return hit.legacyFeaturedImage.thumb
        }else if (hit.legacyFeaturedImage?.medium){
            return hit.legacyFeaturedImage.medium
        }else if (hit.legacyFeaturedImage?.mediaItemUrl){
            return hit.legacyFeaturedImage.mediaItemUrl
        }
        else if (hit.legacyMedia?.imgUrl){
            return hit.legacyMedia?.imgUrl
        }
    }

  }

  const getLink = (hit) =>{

    if(hit.type=='article'){
        return `${process.env.NEXT_PUBLIC_HOME_URL}/post/${hit.slug}`
    }
    if(hit.type=='tool'){
        return `${process.env.NEXT_PUBLIC_HOME_URL}/toolbox/${hit.slug}`
    }
  }