// Assuming the file is located at pages/api/someEndpoint.js
// import { fetchUser } from "@/app/actions";
import { lemonSqueezyApiInstance } from "@/lib/utils/lemonSqueezyAPI";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Only allow POST method
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log(req.body)

  return false

  try {

    // const userData = await fetchUser({ getCompany: true, getProfile: false, getSocial: false });

    if (!userData?.company?.id) {
      return res.status(400).json({ message: "companyId is required" });
    }

    if (!userData?.company?.subscription?.subscription_id) {
      return res.status(400).json({ message: "Subscription ID is required" });
    }

    const response = await lemonSqueezyApiInstance.get(`/subscriptions/${userData.company.subscription.subscription_id}`);
    const checkoutUrl = response.data.data.attributes.urls.customer_portal;

    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
