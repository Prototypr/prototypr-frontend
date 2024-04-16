import { MULTI_DISCOUNT } from "../CheckoutTotal";

const { useState, useEffect } = require("react");
const { useRouter } = require("next/router");

const useTotalPrices = ({allProducts, selectedPackages}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [selectedTypes, setSelectedTypes] = useState([]);
   
    const router = useRouter();

  useEffect(() => {
    let price = 0;
    let applyDiscount = false;
    let selected_types = [];

    if ((router.query.packages && allProducts) || (selectedPackages && allProducts)) {
      let packages = router?.query?.packages?.split(",");
      if(!packages && selectedPackages?.length){
        let selectedIDs = selectedPackages.map(option => option.uid);
        packages = selectedIDs;
      }
      //get all prices and add them together
      packages?.forEach(packageId => {
        //add the selected types
        if (
          allProducts.find(product => product.uid === packageId)?.type ===
          "newsletter"
        ) {
          selected_types.push("newsletter");
        }
        if (
          allProducts.find(product => product.uid === packageId)?.type ===
          "website"
        ) {
          selected_types.push("website");
        }
        //add the price
        let product = allProducts.find(product => product.uid === packageId);
        if (product) {
          price += product.price;
        }
      });

      if (
        selected_types.includes("newsletter") &&
        selected_types.includes("website")
      ) {
        applyDiscount = true;
      }
    }
    setTotalPrice(price);
    setSelectedTypes(selected_types);

    if (applyDiscount) {
      setDiscountedPrice(price * 1- MULTI_DISCOUNT);
      setDiscountAmount(price * MULTI_DISCOUNT);
    } else {
      setDiscountedPrice(false);
      setDiscountAmount(0);
    }
  }, [router.query.packages, selectedPackages]);

  return {
    totalPrice,
    discountedPrice,
    discountAmount,
    selectedTypes,
  };
}

export default useTotalPrices;