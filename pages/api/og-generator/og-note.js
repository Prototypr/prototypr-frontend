import { NotePencil } from "@/components/icons";
import { ImageResponse } from "@vercel/og";

const interBold = fetch(
  new URL("./InterDisplay-Bold.ttf", import.meta.url)
).then(res => res.arrayBuffer());
const interRegular = fetch(
  new URL("./InterDisplay-Regular.ttf", import.meta.url)
).then(res => res.arrayBuffer());

export const config = {
  runtime: "edge",
};

const OgImageHandler = async req => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "New note";
  const avatar =
    searchParams.get("avatar") ||
    "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const author = searchParams.get("author") || "";
  const date = searchParams.get("date") || "";

  const boldFont = await interBold;
  const regularFont = await interRegular;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "#ededf5",
          
    backgroundImage: 'radial-gradient(circle at 25px 25px, #C8C8E4 5%, transparent 0%)',
    backgroundSize: '50px 50px',
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "74px",
          }}
          src={`https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/a8771a61fb3e1990bd2b87fa29054d74.png`}
        />
        <div
          style={{
            width: "758px",
            height: "486px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "#f9fafb",
            borderRadius: "2px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* paper stack */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#f9fafb",
              transform: "translateX(-4px) translateY(2px) rotate(-3.5deg)",
              zIndex: -10,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f9fafb",
              borderLeft: "1px solid #e5e7eb",
              width: "100%",
              height: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#f7f7f7",
              transform: "translateX(-2px) translateY(2px) rotate(2deg)",
              zIndex: -20,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              borderLeft: "1px solid #e5e7eb",
              borderTop: "1px solid #e5e7eb",
              width: "100%",
              height: "100%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "translateX(-2px) rotate(4.5deg)",
              zIndex: -50,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              borderLeft: "1px solid #e5e7eb",
              backgroundColor: "#f7f7f7",
              width: "100%",
              height: "100%",
            }}
          />

          {/* Main content */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "white",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transform: "rotate(-1deg)",
              transition: "all 0.5s ease-in-out",
              border: "1px solid rgba(229, 231, 235, 0.5)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 4,
                flexDirection: "row",
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "InterRegular",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <NotePencil size={16} color="#6b7280" />
              <div
                style={{
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Prototypr Notes
              </div>
            </div>
            <h1
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                margin: "0 42px",
                fontSize: 48,
                fontWeight: 900,
                width: "auto",
                maxWidth: 550,
                textAlign: "center",
                fontFamily: "InterBold",
                marginBottom: 44,
              }}
            >
              <b>{title}</b>
            </h1>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {avatar && (
                <img
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 100,
                    objectFit: "cover",
                  }}
                  src={avatar}
                />
              )}
              {author && (
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexDirection: "column",
                    fontSize: 20,
                    fontWeight: 400,
                    fontFamily: "InterRegular",
                    justifyContent: "center",
                  }}
                >
                  <div>{author}</div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      fontFamily: "InterRegular",
                      color: "#6b7280",
                    }}
                  >
                    {date}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "InterBold",
          data: boldFont,
          style: "bold",
        },
        {
          name: "InterRegular",
          data: regularFont,
          style: "normal",
        },
      ],
    }
  );
};

export default OgImageHandler;
