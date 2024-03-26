import { useRouter } from "next/router";
import Button from "@/components/Primitives/Button";
import axios from "axios";

const PurchaseButton = ({ selectedSlots,postObject, user,productId,companyId,lsProduct }) => {

  const router = useRouter();

  const buyProduct = async () => {
    try {
      if (!user?.isLoggedIn) {
        router.push("/signup");
        return false;
      }

      console.log(selectedSlots)
      let formattedDates = []
      if(selectedSlots?.length){
        for(var x=0;x<selectedSlots.length;x++){
            formattedDates.push({start:selectedSlots[x].start.getTime(),end:selectedSlots[x].end.getTime()})
        }
      }

      // console.log(postObject)
      // return false
      const response = await axios.post("/api/lemonsqueezy/purchaseProduct", {
        // productId: "297442",
        productId: productId,
        companyId: companyId,
        quantity: selectedSlots.length,
        bookingDate:formattedDates,
        postObject:postObject
      });

      console.log(response.data);

      window.open(response.data.checkoutUrl, "_self");
    } catch (err) {
      console.error(err);
      alert("Checkout failed, please try again.");
    }
  };

  return (
    <Button
    className="w-[fit-content] py-2 rounded-full"
      onClick={() => {
        if (!selectedSlots || !selectedSlots?.length) {
          alert("Please choose the date(s) for your sponsorship.");
          return false;
        }
        buyProduct();
      }}
      type="button"
    >
      Go to checkout
    </Button>
  );
};

export default PurchaseButton
