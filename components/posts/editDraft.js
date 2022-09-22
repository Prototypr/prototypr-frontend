import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import Tiptap from "@/components/forms/tiptap";
import Link from "next/link";

var axios = require("axios");
const qs = require("qs");

const EditDraft = () => {
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState(undefined);
  const { user } = useUser({
    redirectIfFound: false,
  });
  const { slug } = router.query;

  const getCurrentPost = async () => {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: "*",
        fields: [],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    let currentPostData = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${query}`,
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    };

    const resp = await axios(currentPostData);
    const post = resp.data.data[0].attributes;
    setCurrentPost(post);
  };

  useEffect(async () => {
    await getCurrentPost();
  }, []);

  return (
    <div>
      {currentPost && (
        <div>
          <Link href="/my-posts">
            <button>←Back</button>
          </Link>
          <h1>{currentPost.title}</h1>
          <Tiptap content={currentPost.content} editorType="edit" />
          {/* <div>{currentPost.content}</div> */}
        </div>
      )}
    </div>
  );
};

export default EditDraft;
