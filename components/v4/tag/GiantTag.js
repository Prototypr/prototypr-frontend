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
const GiantTag = ({ link, children, index, active, classes }) => {
  return (
    <Link href={`${link ? link : "/"}`}>
      <button
        className={`inline-block text-base px-3 cursor-pointer ${
          active ? "bg-gray-300/80 text-black font-medium border border-gray-800" : "bg-[#ecf0f5] hover:bg-gray-200 text-zinc-600 font-medium hover:text-zinc-900"
        } rounded-full tracking-tight h-10 transition transition-all duration-400 ${classes}`}
      >
        {children}
      </button>
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
          } border border-[#ACACAC] text-[#ACACAC] font-normal rounded-full mr-3 mb-3 font-medium`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export default GiantTag;
