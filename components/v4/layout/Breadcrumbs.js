import Link from "next/link";
import Container from "@/components/container";
import { House, CaretRight } from "phosphor-react/dist";

const Breadcrumbs = ({tagName}) =>{

    return(
        <Container padding={false} maxWidth="max-w-[1320px]">
        <div className="px-4 py-2  text-sm font-medium border border-gray-200 bg-white rounded-xl inline-flex text-gray-700">
                <Link href={`/`}>
                  <House size={20} className="my-auto"/>
                </Link>
                <CaretRight size={12} className="mx-2 my-auto"/>
                <Link href={`/topics`}>
                  <span className={`hover:underline ${!tagName?'font-semibold text-blue-700':''}`}>Topics</span>
                </Link>
               { tagName?
               <>
                <CaretRight size={12} className="mx-2 my-auto"/>
                  <Link href={`/posts/${ tagName }/page/1`}>
                    <span className="font-semibold text-blue-700 capitalize">{tagName}</span>
                  </Link>
               </>
                :''}
              </div>
        </Container>
    )
}
export default Breadcrumbs