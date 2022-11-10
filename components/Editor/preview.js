const PreviewDisplay = ({ content }) => {
  return (
    <div>
      <article>
        <div className="max-w-2xl mx-auto blog-content pb-10">
          <h2 className="text-5xl">Preview</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default PreviewDisplay;
