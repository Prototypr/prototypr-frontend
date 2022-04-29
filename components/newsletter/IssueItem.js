import Image from "next/image";
import Link from "next/link";
import { useIntl } from 'react-intl';
export default function IssueItem({ 
    post = {} 
}) {
    const intl = useIntl();
    const {
        title = "",
        slug = "",
        excerpt,
        legacyFeaturedImage = {},
        featuredImage = {},
    } = post;
    return (
        <Link href={`/newsletter/${slug}`}>
        <div className="group cursor-pointer grid-cols-1 flex items-center py-5 px-6 bg-white rounded-lg">
            <div className="w-20 h-20 rounded-lg bg-gray-4 pt-3 pl-3">
                <div className="font-medium text-xs capitalize text-gray-3">
                    {intl.formatMessage({id: "issue"})}
                </div>
                <div className="font-semibold text-xl leading-8 text-black mt-2">
                    {title.substring(title.indexOf("#")+1,title.indexOf(":"))}
                </div>
            </div>
            <div className="flex flex-col justify-between flex-1 ml-4 mr-6">
                <h5 className="group-hover:underline font-semibold text-xl leading-8 text-gray-1 overflow-hidden text-ellipsis clamp-1">
                    <a className="group-hover:underline">
                    {title.replace(title.substring(title.indexOf("Issue"),title.indexOf(":")+1),'')}
                    </a>
                </h5>
                <div className="font-normal text-sm text-gray-3 overflow-hidden text-ellipsis clamp-3"
                    dangerouslySetInnerHTML={{ __html: excerpt  }}
                >
                </div>
            </div>
            <div className="w-10 h-10 border-2 border-solid border-accent-3 rounded-full flex items-center justify-center">
                <img src="/static/images/icons/arrow.svg" />
            </div>
        </div>
        </Link>
    )
}