import Container from "@/components/container";
import Layout from "@/components/layout";
// import { getAllPostsForPostsPage } from "@/lib/api";
import Head from "next/head";
import Link from "next/link";

export default function Index({ allPosts, preview }) {

  const topics = [
    {
      name: "Accessibility",
      slug: "accessibility",
      imageSrc:
        "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      imageAlt: "UX topic",
    },
    {
      name: "Code",
      slug: "code",
      imageSrc:
        "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "Coding",
    },
    // {
    //   name: "Generative Coding",
    //   slug: "generative",
    //   imageSrc:
    //     "https://images.unsplash.com/photo-1599059919177-1960faea6655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    //   imageAlt: "UX topic",
    // },
    {
      name: "UI Design",
      slug: "ui",
      imageSrc:
        "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      imageAlt: "UX topic",
    },
    {
      name: "UX Design",
      slug: "ux",
      imageSrc:
        "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
      imageAlt: "UX topic",
    },
    {
      name: "User Research",
      slug: "user-research",
      imageSrc:
        "https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      imageAlt: "UX topic",
    },
    {
        name: "VR",
        slug: "vr",
        imageSrc:
          "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dnJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        imageAlt: "UX topic",
      },
    // {
    //   name: "Web 3",
    //   slug: "web3",
    //   imageSrc:
    //     "https://images.unsplash.com/photo-1644215529308-7877e68eb0b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    //   imageAlt: "UX topic",
    // },
  ];

  return (
    <>
      <Layout activeNav={"posts"} preview={preview}>
        <Head>
          <title>Open design and tech stories for everyone to read</title>
        </Head>
        <Container>
          <div className="pt-5 text-md text-gray-700 pb-8">
            <Link href={`/`}>
              <a className="hover:underline">{"Home"}</a>
            </Link>{" "}
            →{" "}
            <Link href={`/topics`}>
              <a className="underline">{"Topics"}</a>
            </Link>
          </div>

          <section className="flex-col md:flex-row flex items-center md:justify-between mt-6 mb-16 md:mb-12">
            <h1 className="text-4xl font-bold tracking-tighter leading-tight md:pr-8">
              Topics.
            </h1>
            {/* <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Browse all topics and categories
      </h4> */}
          </section>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 pb-24">
            {topics.map((topic, i) => (
              <div key={i} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 sm:h-80 lg:aspect-none">
                  <img
                    src={topic.imageSrc}
                    alt={topic.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 mb-4 flex justify-between">
                  <div>
                    <h3 className="text-3xl text-gray-700">
                      <a href={`/posts/${topic.slug}/page/1`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {topic.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ preview = null }) {
//   const allPosts = (await getAllPostsForPostsPage(preview)) || [];

//   return {
//     props: { allPosts: allPosts.data, preview },
//   };
// }
