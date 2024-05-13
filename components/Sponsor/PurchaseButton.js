import { useRouter } from "next/router";
import Button from "@/components/Primitives/Button";
import axios from "axios";

const PurchaseButton = ({
  postObject,
  user,
  customDiscount,
  selectedProducts,

  companyId,
  disabled,
}) => {
  const router = useRouter();

  const buyProduct = async () => {
    try {
      //anyone can buy
      // if (!user?.isLoggedIn) {
      //   router.push("/signup");
      //   return false;
      // }

      //make an array that looks liek this:
      // const weeks = {
      //   newsletters: [
      //     { productId: 1, start: 1630435200000, end: 1631040000000 },
      //   ],
      //   websites: [{ productId: 2, start: 1630435200000, end: 1631040000000 }],
      // };

      const sponsorDates = { newsletter: [], website: [] };
      selectedProducts.forEach(product => {
        if (product.dates?.length) {
          product.dates.forEach(date => {
            sponsorDates[product.type].push({
              productId: product.id,
              start: date.start.getTime(),
              end: date.end.getTime(),
            });
          });
        }
      });

      // console.log(postObject)
      // return false
      const response = await axios.post("/api/lemonsqueezy/purchaseProduct", {
        // productId: "297442",
        // productId: productId,\
        selectedProducts,
        weeks: sponsorDates,
        companyId: companyId,
        postObject: postObject,
        customDiscount: customDiscount,
      });

      console.log(response.data);

      window.open(response.data.checkoutUrl, "_self");
    } catch (err) {
      console.error(err);
      alert("Checkout failed, please try again.");
    }
  };

  return (
    <>
      <Button
        disabled={disabled}
        className="w-[fit-content] py-2 rounded-full"
        onClick={() => {
          if (!selectedProducts?.length) {
            alert("Please choose the date(s) for your sponsorship.");
            return false;
          }
          buyProduct();
        }}
        type="button"
      >
        Pay now
      </Button>
      {disabled ? (
        <div className="text-xs text-gray-500 mt-2">
          Choose all booking date(s) to purchase.
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PurchaseButton;
