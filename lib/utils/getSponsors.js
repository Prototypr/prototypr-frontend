import { getActiveSponsors } from "@/lib/api";
import { formatAllTools } from "./formatToolContent";


const getSponsors = async() =>{
    let sponsors = await getActiveSponsors();
    sponsors = formatAllTools({ tools: sponsors.posts, tagNumber: 1 });

    const navSponsorId = process.env.NEXT_PUBLIC_PRICE_WEBSITE_1;
    const navSponsor =
      sponsors?.find(sponsor => sponsor.productId === navSponsorId) || null;
    
      return{
        navSponsor,
        sponsors
      }
}

export default getSponsors;
