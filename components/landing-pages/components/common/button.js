import Link from "next/link";

const CTAButton = () => {
  return (
    <div>
      <Link href="https://discord.gg/Q8whPJ5U">
        <button className="p-5 px-10 w-full max-w-[250px] text-[16px] rounded-full bg-[#195DE2] text-white font-medium font-inter border border-[#9DDBFD] border-opacity-40">
          Join on Discord
        </button>
      </Link>
    </div>
  );
};

export default CTAButton;
