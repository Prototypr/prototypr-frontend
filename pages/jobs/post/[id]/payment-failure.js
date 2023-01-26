// import dynamic from "next/dynamic";
import Layout from "@/components/new-index/layoutForIndex";
import Container from "@/components/container";
import Button from "@/components/Primitives/Button";
import { useRouter } from "next/router";
import useUser from "@/lib/iron-session/useUser";
import { useLoad } from "@/components/Jobs/jobHooks";

export default function PaymentFailure({}) {
    
const router = useRouter()

const {user, mutateUser} = useUser({
  // redirectTo: '/',
  redirectIfFound: false,
})

const { 
  loading,
  content,
  postId,
  title,
  isOwner,
  postObject} =useLoad(user);

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
      <Container maxWidth="max-w-[1320px] mx-auto">
      <div className="max-w-2xl pt-3 mb-3">
       <h1 className="text-xl font-bold">Payment Failure</h1>
        <p>The payment has been interruped.</p>
      </div>
        <Button onClick={()=>{
          router.push(`/jobs/post/${postId}/payment`)
        }}>Try again</Button>
 
      </Container>
    </Layout>
  );
}