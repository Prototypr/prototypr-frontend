import { useEffect, useState } from "react";
import useUser from "@/lib/iron-session/useUser";

import useFetchPosts from "@/components/Dashboard/useFetchPosts";
import Layout from "@/components/layout";

import dynamic from "next/dynamic";
import Link from "next/link";

const Spinner = dynamic(() => import("@/components/atom/Spinner/Spinner"));
import { fetchPlausibleData } from "@/components/stats/utils";

const ArticleStats = () => {
  const { user } = useUser({
    redirectIfFound: false,
  });

  const [postViews, setPostViews] = useState([]);

  const {
    posts: allPosts,

    loading,
  } = useFetchPosts(user);

  useEffect(() => {
    async function run() {
      const res = allPosts.map(async (post) => {
        const r = await fetchPlausibleData(post.slug, ["visits"]);
        return { views: r?.visits.value, slug: post.slug };
      });

      const allStats = await Promise.all(res);
      setPostViews(allStats);
    }
    if (!loading) {
      // fetch stats from plausible.
      run();
    }
  }, [loading]);

  return (
    <Layout>
      <div
        className="pb-20 mt-10  mx-auto px-2 sm:px-6 lg:px-8 h-full"
        style={{ maxWidth: 1200 }}
      >
        <h1 className="text-lg font-medium">Your Article Stats</h1>
        <div className="my-2">
          {!loading ? (
            <div className="flex flex-col grid gap-4">
              {allPosts.map((post, i) => {
                if (post.status === "publish") {
                  const url = `/dashboard/stats/${post.slug}`;
                  const currentPostViews = postViews.find(
                    (p) => p.slug === post.slug
                  );

                  return (
                    <Link
                      key={i}
                      href={url}
                      className="cursor-pointer"
                    >
                      <div className="w-full bg-white rounded-lg shadow-lg p-5 cursor-pointer">
                        <p>{post.title}</p>
                        <div>
                          {currentPostViews && (
                            <span className="text-sm text-gray-400">
                              {currentPostViews.views} views
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          ) : (
            <div className="w-full grid place-items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticleStats;
