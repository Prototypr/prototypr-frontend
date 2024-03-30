import Link from 'next/link';
import { ChevronRightIcon } from "@radix-ui/react-icons";

const FormBreadCrumbs = () =>{
    return(
      <div className="text-sm text-gray-700 pb-4">
      <Link href={`/`}>
        <span className="hover:underline">Home</span>
      </Link>{" "}
      <ChevronRightIcon className="inline text-black/90" />{" "}
      <Link href={`/sponsor`}>
        <span className="hover:underline">Sponsor</span>
      </Link>{" "}
      <ChevronRightIcon className="inline text-black/90" />{" "}
      <Link href={`/booking`}>
        <span className="underline">Booking</span>
      </Link>
    </div>
    )
  }
export default FormBreadCrumbs;