import axios from "axios";
import { checkSessionExpired } from "../account/checkSessionExpired";

export const createPost = async ({ entry, user, type }) => {

   //check if jwt is expired
  const sessionExpired = checkSessionExpired(user?.jwt);
  if (sessionExpired) {
    alert("Your sessions has expired. Please log in again.");
    return false;
  }

  console.log('user',user)
  let createData = false;

  let newPostData = {
    type: type ? type : "article",
    status: entry.status,
    title: entry.title,
    content: entry.content,
    draft_title: entry.versioned_title,
    draft_content: entry.versioned_content,
    slug: entry.slug,
    esES: false,
    date: new Date(),
    user: user?.id,
    publishedAt: null,
    tools: entry.relation,
  };

  console.log('newPostData',newPostData)
  try {
    createData = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },

      data: {
        data: {
          ...newPostData,
        },
      },
    })
      .then(async function (response) {
        return response?.data?.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    if (createData?.id) {
      let postObject = {id:createData.id, ...createData.attributes};

      postObject.versioned_title = entry.draft_title;
      postObject.versioned_content = entry.draft_content;
      
      return postObject;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
