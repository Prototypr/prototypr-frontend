// import dynamic from "next/dynamic";
import Layout from "@/components/layout-dashboard";
import Container from "@/components/container";
// import axios from "axios";
import useUser from '@/lib/iron-session/useUser'
import Link from "next/link";

export default function PaymentSuccess({}) {
 
  const {user, mutateUser} = useUser({
    // redirectTo: '/',
    redirectIfFound: false,
  })

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
        <div className="max-w-2xl blog-content mt-3 mb-4 px-6">
        <h1 className="text-xl font-bold mb-3">Thanks for submitting your tool!</h1>
          <div className="text-md">
            <p>
             Your post will be reviewed within a week, and you'll receive an email when it goes live
            </p>
            <p>
              If you need any help or have any questions, we're waiting to help in the support chat.
              You can also make changes to your tool in your <Link className="text-blue-600 underline" href="/dashboard">post dashboard</Link>.
            </p>
            <p>
              
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}