import SelectSponsor from "@/components/Primitives/SelectSponsor";
import SelectedProductsDisplay from "@/components/Sponsor/SelectedProductsDislay";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { SponsorPackages } from "@/lib/constants/products";

const NewsletterSponsorChoose = ({ formik , newsletterProducts}) => {
  const router = useRouter();

  const [selectedNewsletterAd, setSelectedNewsletterAd] = useState(() => {
    const id = formik.values.newsletterProductId
      ? formik.values.newsletterProductId
      : router.query.newsletter;

    // let foundObject = SponsorPackages.newsletter.find(
    //   obj => obj.uid === id
    // );
    let foundObject = newsletterProducts.find(obj => obj.uid === id);

    if (foundObject) {
      return foundObject;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (router?.query?.newsletter) {
      // let foundObject = SponsorPackages.newsletter.find(
      //   obj => obj.uid === router.query.newsletter
      // );
      let foundObject = newsletterProducts.find(
        obj => obj.uid === router.query.newsletter
      );

      if (foundObject) {
        formik.setFieldValue("newsletterProductId", foundObject?.uid);

        setSelectedNewsletterAd(foundObject);
      }else{
        setSelectedNewsletterAd(false);
      }
    }
  }, [router?.query?.newsletter]);


  return (
    <div className="mb-3">
      <h4 className="font-medium mb-1">Newsletter Sponsorship</h4>

      {router?.query?.newsletter && (
        <SelectSponsor
          items={newsletterProducts}
          defaultValue={
            router?.query?.newsletter == "false"
              ? false
              : router?.query?.newsletter
                ? router?.query?.newsletter
                : false
          }
          className="w-full text-lg bg-white h-[56px] rounded-xl py-3 border border-gray-300"
          onChange={val => {
            formik.setFieldValue("newsletterProductId", val);
          }}
        ></SelectSponsor>
      )}
      {selectedNewsletterAd ? (
        <SelectedProductsDisplay selectedProduct={selectedNewsletterAd} />
      ) : null}
    </div>
  );
};

export default NewsletterSponsorChoose;
