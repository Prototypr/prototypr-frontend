import dynamic from "next/dynamic";

import Fallback from "@/components/atom/Fallback/Fallback";
import useUser from "@/lib/iron-session/useUser";
// import axios from "axios";
import { useEffect } from "react";
// import Meta from "@/components/meta";
import axios from "axios";
import { useState } from "react";
import Layout from "@/components/layout-editor";

import Editor from "@/components/Editor/Editor";
const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
// import { useLoad } from "@/components/Editor/editorHooks/index";

// const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));

export default function Index(props) {
  const { user } = useUser({
    redirectTo: "/early-access",
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);
  const [userHasAdminPermission, setUserHasAdminPermission] = useState(false);
  const [previewModeEnabled, setPreviewModeEnabled] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  /**
   *
   * admin can preview, edit and publish
   * other users can only preview, they cant edit or publish.
   *
   */

  //   console.log(content, loading);

  useEffect(() => {
    if (user) {
      const fetchRoleData = async () => {
        let configUpload = {
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/users-permissions/users/article/role`,
          headers: {
            Authorization: `Bearer ${user?.jwt}`,
          },
          data: {
            id: user.id,
          },
        };
        const { data } = await axios(configUpload);
        if (data.status === 200) {
          console.log("isAdmin -", data.isAdmin);
          setUserHasAdminPermission(data.isAdmin);
        } else {
          console.log("no access");
          setUserHasAdminPermission(false);
        }
      };

      // call the function
      fetchRoleData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [user]);

  //   need an article preview
  // after it's submitted..more for us admins to preview it

  // don't need to expose it to users yet, but it'll be useful for them eventually
  // problem is, we can't see properly what they're submitting

  // ah no admin dashboard needed, we can see it all in strapi
  // just need a way to open the editor as an admin
  // so admins will be able to see and edit the post as a user would
  // by visitng /edit/articleid, or whatever the link is
  // use is admin, or user is the owner of the doc

  // only author of the post and admins are allowed to view the preview
  // admins are allowed to edit in preview mode.
  // authors of the post can only see the preview
  // other users have no access to the preview

  return (
    <>
      <div className="h-full w-full">
        <div id="editor-container" className="w-full h-full mx-auto  relative">
          {!user && <Fallback />}

          {user && !user?.isLoggedIn ? (
            <>
              <Layout>
                <div className="relative w-full h-full flex">
                  <div className="my-auto mx-auto">
                    <Spinner />
                  </div>
                </div>
              </Layout>
            </>
          ) : (
            user &&
            user?.isLoggedIn && (
              <div>
                <Editor
                  editorType="edit"
                  mode="admin"
                  hasEditPermission={userHasAdminPermission}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}