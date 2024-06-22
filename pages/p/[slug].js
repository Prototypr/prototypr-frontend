import EditorWrapper from "@/components/Editor/EditorWrapper";

/**
 * Write
 * used to create new post
 *
 * uses the 'new post' version of useLoad
 * /components/Editor/editorHooks/newPost/useLoad
 * this hook loads the editor with any content stored in local storage
 *
 * @returns
 */
export default function EditPostPage() {
  return (
    <>
      <EditorWrapper />
    </>
  );
}
