const SelectedProductsDisplay = ({ selectedProducts, totalPrice, discount, discountedPrice }) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
        <tr className="border-b">
          <th className="py-1 px-2 font-semibold">Product</th>
          <th className="py-1 px-2 font-semibold">Details</th>
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
                  <td className="py-1 px-2">{selectedProduct?.tagline}</td>
                  {/* <td className="py-1 px-2">
                    {selectedProduct?.duration}
                  </td> */}
                  <td className="py-1 px-2">${selectedProduct?.price}</td>
                </tr>
              </>
            );
          })}
        <tr className="mt-3">
          <td className="py-1 px-2 font-semibold">Total</td>
          <td className="py-1 px-2 font-semibold"></td>
          <td className={`${discount?'line-through':''} py-1 px-2 font-semibold`}>${totalPrice}</td>
        </tr>
        {discount?<tr className="bg-blue-50 border-t ">
          <td className="py-1 px-2 font-semibold">Discount</td>
          <td className="py-1 px-2 font-medium text-black/90">💫 20% off</td>
          <td className="py-1 px-2 font-semibold">–${discount}</td>
        </tr>:''}
        {discountedPrice?<tr className="border-t bg-gray-50/90">
          <td className="py-1 px-2 font-semibold">Grand Total</td>
          <td className="py-1 px-2 font-semibold"></td>
          <td className="py-1 px-2 font-semibold">${discountedPrice}</td>
        </tr>:''}
      </table>
    </div>
  );
};

export default SelectedProductsDisplay;
