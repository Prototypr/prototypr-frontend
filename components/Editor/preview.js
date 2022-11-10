const PreviewDisplay = ({ content, editor }) => {
  // use editor instead of content cos content only 
  // reflects what is there on first load
  return (
    <div>
      <article>
        <div className="max-w-2xl mx-auto blog-content pb-10">
          <h2 className="text-5xl">Preview</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: editor.getHTML(),
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default PreviewDisplay;
