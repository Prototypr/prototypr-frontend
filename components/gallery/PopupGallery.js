import React, { useState, useRef, useEffect } from "react";
import SwiperGallery from "./SwiperGallery";
import Image from "next/image";

export default function PopupGallery({ item, link, img, body, rounded, arrows }) {

  const [desc, setDesc] = useState("");
//   const [bodyTxt, setBodyTxt] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [galleryComponent, setGalleryComponent] = useState(null);

  const _buildGallery = () => {
    let PHOTO_SET = [];
    if (item && item.legacyMedia) {
      if (item.legacyMedia.gallery && item.legacyMedia.gallery.length) {
        item.legacyMedia.gallery.forEach((galleryItem, index) => {
          PHOTO_SET.push({
            thumbnail:
              galleryItem.thumb.indexOf("https://") == -1
                ? "https://prototypr.gumlet.com" + galleryItem.thumb
                : galleryItem.thumb,
            original:
              galleryItem.medium.indexOf("https://") == -1
                ? "https://prototypr.gumlet.com" + galleryItem.medium
                : galleryItem.medium,
            originalAlt: "Screenshot of product",
            thumbnailAlt: "Smaller procut screenshot thumbnail",
            type: "image",
            srcSet: galleryItem.srcSet,
            sizes: galleryItem.sizes,
          });
        });
      }
      // if (item.toolbox.video) {
      //   const youtubeEmbedLink = item.toolbox.video.replace(
      //     "watch?v=",
      //     "embed/"
      //   );
      //   PHOTO_SET.unshift({
      //     thumbnail:
      //       "https://img.youtube.com/vi/" +
      //       item.toolbox.video.split("watch?v=")[1] +
      //       "/default.jpg",
      //     original:
      //       "https://img.youtube.com/vi/" +
      //       item.toolbox.video.split("watch?v=")[1] +
      //       "/default.jpg",
      //     embedUrl: youtubeEmbedLink,
      //     renderItem: this._renderVideo.bind(this),
      //     originalAlt: "YouTube product video",
      //     thumbnailAlt: "YouTube product video",
      //     type: "video",
      //   });
      // }

      return (
        <div className="mx-4">
            {
                PHOTO_SET && PHOTO_SET.length && <SwiperGallery data={PHOTO_SET} />
            }
        </div>
      );
    }
  };

  useEffect(() => {
    // let bodyTxt = "";
    // if (process.browser) {
    //   //extract product description from main stuff
    //   let temporalDivElement = document.createElement("div");
    //   // Set the HTML content with the providen
    //   temporalDivElement.innerHTML = body;
    //   let bod = temporalDivElement.getElementsByTagName("h2");
    //   if (bod[0]) {
    //     bodyTxt = bod[0].nextSibling.textContent;
    //   }
    // }
    
    if(item.legacyMedia && item.legacyMedia.gallery.length){
      const galleryComponent = _buildGallery();
      setGalleryComponent(galleryComponent);
    }

    // setBodyTxt(bodyTxt);
  }, []);

  return (
    <div className="bg-white pb-4 mb-6">
          {
              galleryComponent ? galleryComponent :
              <div className="my-auto block mx-auto flex justify-center p-6 rounded">
                <Image 
                // layout="fill"
                objectFit="cover"
                width="600"
                height="400"
                alt='Product screenshot'
                className="rounded"
                src={item.legacyFeaturedImage?item.legacyFeaturedImage.mediaItemUrl:item.ogImage?item.ogImage.opengraphImage:''}
                />
              </div>
          }  
    </div>
  )
}
