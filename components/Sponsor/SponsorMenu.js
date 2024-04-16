const SponsorMenu = ({newsletterProducts, websiteProducts}) => {
  return (
    <ul className="space-y-4 text-gray-800 text-sm mt-3 mb-4 list-disc list-inside dark:text-gray-400">
      <li>
        <span className="font-medium">Newsletter</span>
        <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
          {newsletterProducts?.map((pk, i) => {
            if (pk?.type === "newsletter") {
              return (
                <li>
                  <a
                    className="hover:underline"
                    // href={`#${pk.productId}`}
                    href={`#${pk.uid}`}
                  >
                    {pk?.title}
                  </a>
                </li>
              );
            }
          })}
        </ol>
      </li>
      <li>
        <span className="font-medium">Website</span>
        <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
          {websiteProducts.map((pk, i) => {
            return (
              <li>
                <a className="hover:underline" href={`#${pk.uid}`}>
                  {pk?.title}
                </a>
              </li>
            );
          })}
        </ol>
      </li>
    </ul>
  );
};

export default SponsorMenu
