import { usePathname } from 'next/navigation'

const MobileActiveLink = ({ children, href }) => {
  const pathname = usePathname();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      onClick={handleClick}
      href={href}
      className={`${
        pathname === href
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-500"
      } text-sm block px-3 py-2 rounded-md  font-medium`}
      aria-current="page"
    >
      {children}
    </a>
  );
};
export default MobileActiveLink;
