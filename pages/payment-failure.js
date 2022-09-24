// import dynamic from "next/dynamic";
import Layout from "@/components/layout";
import Container from "@/components/container";

export default function PaymentFailure({}) {
    

  return (
    <Layout
      seo={{
        title: "Prototypr Toolbox - new design, UX and coding tools.",
        description:
          "Today's Latest Design Tools. Find illustrations, icons, UI Kits and more.",
        //   image: "",
        // canonical: "https://prototypr.io/toolbox",
        // url: "https://prototypr.io/toolbox",
      }}
      activeNav={"toolbox"}
    >
      <Container>
       <h1 className="text-xl">Payment Failure</h1>
 
      </Container>
    </Layout>
  );
}