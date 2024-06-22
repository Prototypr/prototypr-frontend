import { getToolById } from "@/lib/api";
import EditorWrapper from "@/components/Editor/EditorWrapper";

/**
 * Edit post page
 * used to edit existing post given the slug
 *
 * uses the 'edit' version of useLoad
 * /components/Editor/editorHooks/editPost/useLoad
 * this hook loads the editor with the existing post content from the backend
 *
 * @param {*} props
 * @returns
 */
export default function EditPostPage({ tool }) {
  return (
    <>
      <div className="h-full w-full">
        {tool?.attributes?.logo?.data?.attributes?.url ? (
          <div className="mx-auto mt-[72px] -mb-16 max-w-[44rem] mx-auto text-sm px-2 py-2  bg-white border border-1 border-gray-200/70 rounded-xl">
            <div className="flex ">
              <img
                className="lg:block h-10 w-10 object-cover shadow rounded-lg border border-gray-50"
                data-gumlet="false"
                src={tool?.attributes?.logo?.data?.attributes?.url}
                alt="Prototypr Logo"
              />
              <div className="my-auto ml-3">
                <div className="text-base font-medium tracking-tight text-gray-800">
                  {tool?.attributes?.title}: Creator Story
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <EditorWrapper isInterview={true} tool={tool} />
      </div>
    </>
  );
}

export async function getStaticProps({ params, preview = null, locale }) {
  let data;
  try {
    data = await getToolById(params.id, preview);
  } catch (error) {
    console.error("Failed to get tool:", error);
    return {
      notFound: true,
    };
  }

  let tool = data?.posts?.data[0] || null;
  return {
    props: {
      tool: tool || null,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
