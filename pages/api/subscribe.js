var axios = require("axios");

export default async function subscribe(req, res) {
    console.log(req.body)
  // Check for secret to confirm this is a valid request
  const {listId, email, firstName, lastName} = req.body

  console.log(listId, email, firstName, lastName)

  //get the post params: email, listId, firstName, lastName
  if (!email) {
    return res.status(401).json({ message: "no email" });
  }
  if (!listId) {
    return res.status(401).json({ message: "no listId" });
  }
//   if (!req.body.firstName) {
//     return res.status(401).json({ message: "no firstName" });
//   }
//   if (!req.body.lastName) {
//     return res.status(401).json({ message: "no lastName" });
//   }


  try {

    const urlencoded = new URLSearchParams();
    urlencoded.append("EMAIL", email);

    const response = await fetch(
        "https://send.letter.so/index.php/lists/et15895b31367/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:urlencoded,
        }
      );

      console.log(response.url)
      const html = await response.text()
      console.log(html)

      //check if html says successful
        if (html.includes("check your email address")) {
            return res.status(200).json({ message: "Subscription successful" });
        } 
        else if (html.includes("update your profile information")) {
            return res.status(204).json({ message: "Already subscribed" });
        } else if(html.includes("This email address is already registered")){
            return res.status(202).json({ message: "Check your email" });
        }
        else {
            return res.status(401).json({ message: "Subscription failed" });
        }

    //     console.log(xt)
    //   return res.status(200).json({ contact: response.data?.contact });
      return res.status(200)
  
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error subscribing");
  }
}
