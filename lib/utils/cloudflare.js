import axios from "axios";
export const purgeCloudFlareCache = async url => {
  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_API_ZONE}/purge_cache`,
      { files: [`${process.env.NEXT_PUBLIC_HOME_URL}${url}`] },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return true;
      // res.status(200).json({ message: 'Cache purged successfully' });
    } else {
      console.log("Cloudflare cache purge failed", response.data);
    }
    clearWorkerCache(url);
  } catch (error) {
    console.log("Cloudflare cache purge failed", error);
  }
};

const clearWorkerCache = async path => {
  const workerURL = `${process.env.CLOUDLARE_WORKER_URL}clear-cache?path=${encodeURIComponent(path)}`;

  try {
    const response = await fetch(workerURL, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to clear cache");
    }

    const result = await response.text();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
