import SelectSponsor from "@/components/Primitives/SelectSponsor";
import SelectedProductsDisplay from "@/components/Sponsor/SelectedProductsDislay";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { SponsorPackages } from "@/lib/constants/products";

const WebsiteSponsorChoose = ({ formik, websiteProducts }) => {
  const router = useRouter();

  const [selectedWebsiteAd, setSelectedWebsiteAd] = useState(() => {
    const id = formik.values.websiteProductId
      ? formik.values.websiteProductId
      : router.query.website;
    let foundObject = websiteProducts.find(obj => obj.uid === id);

    if (foundObject) {
      return foundObject;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (router?.query?.website) {
      let foundObject = websiteProducts.find(
        obj => obj.uid === router.query.website
      );
      if (foundObject) {
        formik.setFieldValue("websiteProductId", router?.query?.website);

        setSelectedWebsiteAd(foundObject);
      }else{
        setSelectedWebsiteAd(false);
      }
    }
  }, [router?.query?.website]);


  return (
    <div className="mb-3">
      <h4 className="font-medium mb-1">Website Sponsorship</h4>

      {router?.query?.website && (
        <SelectSponsor
          items={websiteProducts}
          defaultValue={
            router?.query?.website == "false"
              ? false
              : router?.query?.website
                ? router?.query?.website
                : false
          }
          className="w-full text-lg bg-white h-[56px] rounded-xl py-3 border border-gray-300"
          onChange={val => {
            formik.setFieldValue("websiteProductId", val);
          }}
        ></SelectSponsor>
      )}
      {selectedWebsiteAd ? (
        <SelectedProductsDisplay selectedProduct={selectedWebsiteAd} />
      ) : null}
    </div>
  );
};

export default WebsiteSponsorChoose;
