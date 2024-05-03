import { useIntl } from "react-intl";
import Link from "next/link";
const TopicIconCard = ({ title, topic, icon }) => {
  const intl = useIntl();

  const heading = intl.formatMessage({ id: title });
  return (
    <Link className="cursor-pointer" href={`/posts/${topic.slug}/page/1`}>
      <div className="relative px-5 py-4 h-[110px] rounded-xl flex flex-col justify-end bg-indigo-600 text-white text-base font-base">
        <div className="font-medium uppercase text-sm">{heading}</div>
        {/* <div>{`->`}</div> */}
        <div className="absolute opacity-80 top-0 right-0 m-3">
          {icon}
        </div>

      </div>
    </Link>
  );
};
export default TopicIconCard;
