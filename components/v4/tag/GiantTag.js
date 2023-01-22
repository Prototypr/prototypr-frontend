import Link from 'next/link'
// const GiantTag = ({link, children, index, active}) =>{
//     return(
//         <Link href={`${link?link:'/'}`}>
//             <div className={`inline-block text-base px-5 py-2 cursor-pointer ${active?'bg-blue-600 text-white':'bg-[#eef1f8]'} border border-gray-200 rounded-full mr-3 mb-3`}>
//                 {children}
//             </div>
//         </Link>
//     )
// }
const GiantTag = ({ link, children, index, active }) => {
  return (
    <Link href={`${link ? link : "/"}`}>
      <div
        className={`inline-block text-base px-5 py-2 cursor-pointer ${
          active ? "bg-blue-600 text-white" : "bg-[#d8e5f8]/70"
        } rounded-full mr-3 mb-3 text-base text-black/70 text-[15px]`}
      >
        {children}
      </div>
    </Link>
  );
};

export const GiantPillTag = ({ link, children, index, active }) => {
  return (
    <div className='mb-3'>
      <Link href={`${link ? link : "/"}`}>
        <div
          className={`inline-block text-sm md:text-xl px-5 py-2 md:px-14 md:py-4 cursor-pointer ${
            active ? "bg-blue-600 text-white" : "bg-transparent "
          } border border-[#ACACAC] text-[#ACACAC] font-normal rounded-full mr-3 mb-3`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export default GiantTag;
