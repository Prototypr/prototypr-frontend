import { useIntl } from "react-intl";
import Link from "next/link";

const TopicCard = ({ title, topic }) => {
  const intl = useIntl();

  const heading = intl.formatMessage({ id: title });
  return (
    <Link className="cursor-pointer" href={`/posts/${topic.slug}/page/1`}>
      <div className="p-6 py-8 rounded-xl text-center bg-blue-600 text-white text-base font-base">
        <div>{heading}</div>
        {/* <div>{`->`}</div> */}
      </div>
    </Link>
  );
};
export default TopicCard;
