import Link from "next/link";
import Container from "@/components/container";
import { House, CaretRight } from "phosphor-react/dist";

const Breadcrumbs = ({tagName, background}) =>{

    return(
        <Container padding={false} maxWidth="max-w-[1320px]">
        <div className={`text-sm font-medium ${background?'px-4 py-2 bg-white rounded-xl border border-gray-200':''} inline-flex text-gray-700`}>
                <Link className={`${!background?'inline  border border-1 border-blue-500/20 rounded-full p-1.5 px-3 bg-blue-400/20  font-normal':''}`} href={`/`}>
                  <House size={20} className="my-auto"/>
                </Link>
                <CaretRight size={12} className="mx-2 my-auto"/>
                <Link  className={`${!background?'inline  border border-1 border-blue-500/20 rounded-full p-1.5 px-3 bg-blue-400/20  font-normal':''}`} href={`/topics`}>
                  <span className={`hover:bold  ${!tagName?'font-semibold text-blue-700':''}`}>Topics</span>
                </Link>
               { tagName?
               <>
                <CaretRight size={12} className="mx-2  my-auto"/>
                  <Link  className={`${!background?'inline text-blue-800  border border-1 border-blue-500/50 rounded-full p-1.5 px-3 bg-blue-700/10 font-normal':''}`} href={`/posts/${ tagName }/page/1`}>
                    <span className="font-semibold  capitalize">{tagName}</span>
                  </Link>
               </>
                :''}
              </div>
        </Container>
    )
}
export default Breadcrumbs