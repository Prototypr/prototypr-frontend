import Image from "next/image";

export default function IssueItem({ post = {} }) {

    return (
        <div className="grid-cols-1 flex items-center py-5 px-6 bg-white rounded-lg">
            <div className="w-20 h-20 rounded-lg bg-gray-4 pt-3 pl-3">
                <div className="font-medium text-xs capitalize text-gray-3">
                    Issue
                </div>
                <div className="font-semibold text-xl leading-8 text-black mt-2">
                    210
                </div>
            </div>
            <div className="flex flex-col justify-between flex-1 ml-4 mr-6">
                <h5 className="font-semibold text-xl leading-8 text-gray-1 overflow-hidden text-ellipsis clamp-1">
                    A11y and Neurodiversity in Design To A11y and Neurodiversity in
                    Design To
                </h5>
                <div className="font-normal text-sm text-gray-3">
                    Accessibility has had significant focus in the design community in
                    recent years.
                </div>
            </div>
            <div className="w-10 h-10 border-2 border-solid border-accent-3 rounded-full flex items-center justify-center">
                <img src="/static/images/icons/arrow.svg" />
            </div>
        </div>
    )
}