import Link from "next/link";
import { topics } from "@/lib/constants";
import { useIntl } from "react-intl";

const TrendingSectionMiddle = ({ data }) => {
  const intl = useIntl();

    return (
      <div className="mb-8 px-4 lg:px-0">
        <h1 className="font-semibold mb-3">Topics to browse</h1>

        <div className="flex flex-col grid grid-cols-12 gap-4 justify-end items-end">

        {topics.map((topic, i) => (
                  <Link className="col-span-4 md:col-span-3 h-[100px] w-full bg-gray-500 rounded-xl" key={i} href={`/posts/${topic.slug}/page/1`}>
                    <div
                      className={`group cursor-pointer bg-opacity-50 flex relative ${topic.color} bg-gradient-to-br w-full p-4 rounded-lg h-[100px]`}
                    >
                      <div className="my-auto mx-auto flex justify-between">
                        <h3 className="text-sm md:text-base font-bold text-center text-white">
                          {intl.formatMessage({ id: topic.name })}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
        
        </div>
      </div>
    );
  };
export default TrendingSectionMiddle