import Link from "next/link";
import Container from "@/components/container";

const Breadcrumbs = ({tagName}) =>{

    return(
        <Container maxWidth="max-w-[1320px]">
        <div className="pt-5 text-md text-gray-700">
                <Link href={`/`}>
                  <span className="hover:underline">Home</span>
                </Link>{" "}
                →{" "}
                <Link href={`/topics`}>
                  <span className="hover:underline">Topics</span>
                </Link>{" "}
                →{" "}
                <Link href={`/posts/${ tagName }/page/1`}>
                  <span className="underline capitalize">{tagName}</span>
                </Link>
              </div>
        </Container>
    )
}
export default Breadcrumbs