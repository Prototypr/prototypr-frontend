import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Container from "@/components/container";
const MoreStories = dynamic(() => import("@/components/more-stories"));
const NewPagination = dynamic(() => import("@/components/pagination"));
const FilterCategory = dynamic(() => import("@/components/FilterCategory"));
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs"));
const PAGE_SIZE = 12;
import { getPeopleByPage } from "@/lib/api";

export default function PeoplePage({

}) {
    return (
        <div>1111</div>
    )
}

export async function getStaticProps({ preview = null, params,locale }) {
    return {
        props: {
            
        }
    }
}

export async function getStaticPaths() {
    const allPosts = (await getPeopleByPage(null, PAGE_SIZE, 0)) || [];
    const pagination = allPosts.meta.pagination;
    const pageCount = pagination.pageCount;
    const pageCountArr = new Array(pageCount).fill(" ");
    return {
        paths:
          (pageCountArr &&
            pageCountArr.map((pageNo, index) => {
              return `/people/page/${index}`;
            })) ||
          [],
        fallback: true,
      };
}
