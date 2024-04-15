import { useEffect, useState } from "react";
import PurchaseButton from "./PurchaseButton";

export const HandHeartIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z"></path></svg>
)
export const CoinsIcon = ({ className }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
)

const BULK_DISCOUNT=0.1
const MULTI_DISCOUNT=0.1

const CheckoutTotal = ({ selectedProducts,paymentDisabled, companyId, user, postObject }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const [multiDiscountAmount, setMultiDiscountAmount] = useState(0);

  const [bulkDiscountAmount, setBulkDiscountAmount] = useState(0);

  const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);

  // create function to give total price from selected products  - use setState
  //total should be formik newsletter plus formik website
  // get the prices from rawPrice of the selected products in SponsorPackages

  const calculatePrice = () => {
    let price = 0;
    let multipackDiscount = false;
    let selected_types = [];
    let bulkDiscount = false;
    let combodiscountamount = 0;
    let bulkdiscountamount = 0;

    let totalPurchases = 0;

    //get all prices and add them together
    selectedProducts?.forEach(p => {
      // console.log(p);
      //add the selected types
      if (p?.type === "newsletter") {
        selected_types.push("newsletter");
      }
      if (p?.type === "website") {
        selected_types.push("website");
      }

      //default purchase is 1 item if no dates
      totalPurchases += p.dates?.length ? p.dates.length : 1;
      //add the price
      price += p.price * (p.dates?.length ? p.dates.length : 1);
    });

    if (
      selected_types.includes("newsletter") &&
      selected_types.includes("website")
    ) {
      multipackDiscount = true;
    }

    if (totalPurchases > 3) {
      bulkDiscount = true;
    }

    setTotalPrice(price.toFixed(2));
    
    if (multipackDiscount) {
      combodiscountamount = price * MULTI_DISCOUNT;
      setMultiDiscountAmount(combodiscountamount.toFixed(2));
    } else {
      combodiscountamount = 0;
      setMultiDiscountAmount(0);
    }

    if (bulkDiscount) {
      bulkdiscountamount = price * BULK_DISCOUNT;
      setBulkDiscountAmount(bulkdiscountamount.toFixed(2));
    } else {
      bulkdiscountamount = 0;
      setBulkDiscountAmount(0);
    }

    let totalPriceWithD = price - combodiscountamount - bulkdiscountamount;
    //format with 2 decimal places
    setTotalPriceWithDiscount(totalPriceWithD.toFixed(2));
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedProducts]);

  useEffect(() => {
    calculatePrice();
  }, []);

  return (
    <div>
      <div className="rounded-lg border border-gray-200 overflow-hidden my-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
          <tr className="border-b">
            <th className="py-1 px-2 font-semibold">Product</th>
            <th className="py-1 px-2 font-semibold">Quantity</th>
            {/* <th className="py-1 px-2 font-semibold">Duration</th> */}
            <th className="py-1 px-2 font-semibold">Price</th>
          </tr>
          {selectedProducts?.length > 0 &&
            selectedProducts.map((selectedProduct, index) => {
              return (
                <>
                  <tr
                    key={index}
                    // className="border-b odd:bg-white even:bg-gray-50"
                    className="border-b"
                  >
                    <td className="py-1 px-2">{selectedProduct?.title}</td>
                    <td className="py-1 px-2">
                      {selectedProduct?.dates?.length > 1 ? (
                        <>x{selectedProduct?.dates?.length}</>
                      ) : (
                        `x1`
                      )}
                    </td>
                    {/* <td className="py-1 px-2">
                      {selectedProduct?.duration}
                    </td> */}
                    <td className="py-1 px-2">${selectedProduct?.price}</td>
                  </tr>
                  {/* {selectedProduct?.dates?.length > 0 && 
                    selectedProduct?.dates.map((date, index) => {
                        console.log(date)
                        return (
                            <tr key={index} className="border-b">
                            <td className="py-1 px-2"></td>
                            <td className="py-1 px-2">{date.start?.toLocaleDateString()} - {date.end?.toLocaleDateString()}</td>
                            <td className="py-1 px-2"></td>
                            </tr>
                        );
                        
                    })
                    } */}
                </>
              );
            })}
          <tr className="mt-3">
            <td className="py-1 px-2 font-semibold">Total</td>
            <td className="py-1 px-2 font-semibold"></td>
            <td
              className={`${multiDiscountAmount ? "line-through" : ""} py-1 px-2 font-semibold`}
            >
              ${totalPrice}
            </td>
          </tr>
          {multiDiscountAmount ? (
            <tr className="bg-blue-50 border-t ">
              <td className="py-1 px-2 font-medium">Combo discount</td>
              <td className="py-1 px-2 font-medium text-black/90">
                💫 {MULTI_DISCOUNT*100}% off
              </td>
              <td className="py-1 px-2 font-semibold">
                –${multiDiscountAmount}
              </td>
            </tr>
          ) : (
            ""
          )}
          {bulkDiscountAmount ? (
            <tr className="bg-blue-50 border-t ">
              <td className="py-1 px-2 font-medium">Bulk discount</td>
              <td className="py-1 px-2 font-medium text-black/90">💫 {BULK_DISCOUNT * 100}% off</td>
              <td className="py-1 px-2 font-semibold">
                –${bulkDiscountAmount}
              </td>
            </tr>
          ) : (
            ""
          )}
          {totalPriceWithDiscount ? (
            <tr className="border-t bg-gray-50/90">
              <td className="py-1 px-2 font-semibold">Grand Total</td>
              <td className="py-1 px-2 font-semibold"></td>
              <td className="py-1 px-2 font-semibold">
                ${totalPriceWithDiscount}
              </td>
            </tr>
          ) : (
            ""
          )}
        </table>
      </div>
      {!bulkDiscountAmount ? (
        <div className="text-gray-700 text-sm my-4 flex bg-blue-50 p-2 rounded-lg px-3">
          <CoinsIcon className={"my- w-8 h-8"} />
          <div className="flex flex-col ml-3 justify-center">
            <h4 className="text-md font-semibold">
              Get {multiDiscountAmount ? "an extra" : ""} {BULK_DISCOUNT*100}% off
            </h4>
            <div className="my-auto text-sm">
              Book 4+ weeks for {multiDiscountAmount ? "a further " : "a "}
              <span className="font-">{BULK_DISCOUNT*100}% discount</span>.
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <PurchaseButton
        disabled={paymentDisabled}
        selectedProducts={selectedProducts}
        // newsletterDates={newsletterDates}
        // websiteDates={websiteDates}
        companyId={companyId}
        user={user}
        postObject={postObject}
      />
    </div>
  );
};

export default CheckoutTotal;
