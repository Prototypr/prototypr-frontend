import useUser from "@/lib/iron-session/useUser";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "tippy.js/dist/svg-arrow.css";
import "tippy.js/animations/scale-subtle.css";
import "react-datepicker/dist/react-datepicker.css";
import { typrProps } from "@/lib/editor/typrProps";

const Tiptypr = dynamic(() => import("tiptypr"), {
  ssr: false,
});
/**
 * Write
 * used to create new post
 *
 * @returns
 */
export default function Write() {
  const { user, isLoading, mutateUser } = useUser({
    redirectTo: "/onboard",
    redirectIfFound: false,
  });
  const router = useRouter();

  return (
    <>
      <Tiptypr
        {...typrProps({ user, userLoading: isLoading, mutateUser, router })}
        postId={router?.isReady && (router.query.slug || router.query.id)}
      />
    </>
  );
}
