import axios from "axios";
import { checkSessionExpired } from "../account/checkSessionExpired";

 //updatable fields
 const updatableFields = [
  "title",
  "content",
  "status",
  "draft_title",
  "draft_content",
  "seo",
  "slug",
  "tier",
];

export const savePost = async ({ postId, entry, user }) => {
  let updateData = false;

  //check if jwt is expired
  const sessionExpired = checkSessionExpired(user?.jwt);
  if (sessionExpired) {
    alert("Your sessions has expired. Please log in again.");
    return false;
  }


  //update the strapi draft fields to the typr versioned ones
  entry.draft_title = entry.versioned_title;
  entry.draft_content = entry.versioned_content;

  //only save fields from the updatableFields array
  let savePostData = Object.fromEntries(
    Object.entries(entry).filter(([key, value]) =>
      updatableFields.includes(key)
    )
  );

  //remove nulls and objects (wrong format for strapi)
  savePostData = flattenDataFields(savePostData);

  try {
    updateData = await axios({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
      data: {
        data: savePostData,
      },
    })
      .then(async function (response) {
        return response?.data?.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  } catch (e) {
    console.log(e);
    return false;
  }
  if (updateData.id) {
    let postObject = { id: updateData?.id, ...updateData.attributes };

    postObject.versioned_title = entry.draft_title;
    postObject.versioned_content = entry.draft_content;

    return postObject;
  } else {
    return false;
  }
};

function flattenDataFields(obj) {
  if (!obj || typeof obj !== "object") return obj;

  let fields = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (value && typeof value === "object") {
        if ("data" in value) {
          return [key, value.data];
        } else {
          return [key, flattenDataFields(value)];
        }
      }
      return [key, value];
    })
  );
  //remove null values
  fields = Object.fromEntries(
    Object.entries(fields).filter(
      ([key, value]) => value !== null && value !== undefined && !Array.isArray(value)
    )
  );

  return fields
}
