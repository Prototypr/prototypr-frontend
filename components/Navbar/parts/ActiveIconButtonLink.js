import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import IconButton from "@/components/Primitives/IconButton";

const ActiveIconButtonLink = ({ children, href }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      <IconButton
        className={`${pathname == href ? "!bg-blue-100 !text-blue-700" : "!bg-transparent !text-gray-800"} flex flex-col text-center align-center rounded-[4px] justify-center outline-none !border-none !my-auto !cursor-pointer h-[28px] w-[28px] !shadow-none !hover:bg-gray-50 !hover:text-gray-900 !hover:shadow-none !hover:border-none !hover:outline-none`}
      >
        {children}
      </IconButton>
    </a>
  );
};
export default ActiveIconButtonLink;
