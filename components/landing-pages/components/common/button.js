import Link from "next/link";

const CTAButton = () => {
  return (
    <div>
      <Link href="/apply/form">
        <button className="p-4 px-8 w-full max-w-[200px] text-[16px] rounded-full bg-[#195DE2] text-white font-medium font-inter border border-[#9DDBFD] border-opacity-40">
          Apply to join
        </button>
      </Link>
    </div>
  );
};

export default CTAButton;
