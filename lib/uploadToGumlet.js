const axios = require("axios");

export const uploadToGumlet = async ({videoUrl, mediaId}) => {
    try {
        const res = await axios.post(`/api/post/uploadVideoToGumlet`, { videoUrl, mediaId });
        if (res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};
