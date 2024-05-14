import { getActiveSponsors } from "@/lib/api";
import { formatAllTools } from "./formatToolContent";

const getSponsors = async () => {
  let sponsors = await getActiveSponsors();
  sponsors = formatAllTools({ tools: sponsors.posts, tagNumber: 1 });

  const navSponsorId = "2";
  // const navSponsor =
  //   sponsors?.find(sponsor => sponsor.weeks?. === navSponsorId) || null;

  // let navSponsor = null;
  // console.log(sponsors)
  // for (let i = 0; i < sponsors.length; i++) {
  //   console.log(sponsors[i].weeks?.id, navSponsorId)
  //   if (sponsors[i].weeks?.id === navSponsorId) {
  //     navSponsor = sponsors[i];
  //     break;
  //   }
  // }

  //find the sponsor where a week's website array object is equal to the navSponsorId
  let navSponsor = null;
  for (let i = 0; i < sponsors.length; i++) {
    if (sponsors[i].weeks) {
      for (let j = 0; j < sponsors[i].weeks.website.length; j++) {
        if (sponsors[i].weeks.website[j].productId === navSponsorId) {
          navSponsor = sponsors[i];
          break;
        }
      }
    }
    if (navSponsor) break; // If navSponsor is found, break the outer loop
  }


  return {
    navSponsor,
    sponsors,
  };
};

export default getSponsors;
