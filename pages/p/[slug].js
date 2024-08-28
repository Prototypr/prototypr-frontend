import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "tippy.js/dist/svg-arrow.css";
import "tippy.js/animations/scale-subtle.css";
import "react-datepicker/dist/react-datepicker.css";
import { typrProps } from "@/lib/editor/typrProps";
import { useTypr } from "tiptypr";

const Tiptypr = dynamic(() => import("tiptypr"), {
  ssr: false,
});

/**
 *
 * Editor for slug page
 *
 * @returns
 */
export default function EditPostPage() {
  const { user, isLoading, mutateUser } = useUser({
    redirectTo: "/onboard",
    redirectIfFound: false,
  });

  const router = useRouter();
  const [postId, setPostId] = useState(-1);

  const typr = useTypr({
    ...typrProps({ user, userLoading: isLoading, mutateUser, router }),
    postId:postId
  });

  useEffect(() => {
    if (router.isReady && (router.query.slug || router.query.id)) {
      setPostId((router.query.slug || router.query.id) || -1);
    }
  }, [router.isReady, router.query.slug, router.query.id]);

  return (
    <>

      <Tiptypr typr={typr} />
    </>
  );
}