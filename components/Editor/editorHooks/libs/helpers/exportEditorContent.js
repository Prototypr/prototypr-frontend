export const exportEditorContent = async ({editor, slug}) => {
  const json = editor.getJSON();
  const content = json.content;
  if (content) {
    let blob = new Blob([JSON.stringify({ content: content })], {
      type: "application/json",
    });
    const filename = slug ? `${slug}.json` : `${Date.now()}.json`;
    saveAs(blob, filename);
  }
};
