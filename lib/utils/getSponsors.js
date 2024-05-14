import { getActiveSponsors } from "@/lib/api";
import { formatAllTools } from "./formatToolContent";


const getSponsors = async() =>{
    let sponsors = await getActiveSponsors();
    sponsors = formatAllTools({ tools: sponsors.posts, tagNumber: 1 });

    const navSponsorId = '2';
    const navSponsor =
      sponsors?.find(sponsor => sponsor.productId === navSponsorId) || null;
    
      return{
        navSponsor,
        sponsors
      }
}

export default getSponsors;
