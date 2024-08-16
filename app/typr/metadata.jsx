export default function Metadata({ seoTitle, seoDescription }) {
    return (
      <>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:image" content="/static/images/typr-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tiptypr Editor Preview" />
      </>
    );
  }