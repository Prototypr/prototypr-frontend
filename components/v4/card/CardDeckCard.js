import gumletLoader from "../../new-index/gumletLoader";
import Link from "next/link";
import Image from "next/image";
const CardDeckCard = ({
  sponsored = false,
  zIndex,
  even,
  index,
  slug,
  title,
  coverImage,
  logo,
  bgColor,
}) => {
  return (
    <div
    style={{zIndex:zIndex}}
      className={`group/card hover:z-10 group-hover/cardDeck:z-back transition transition-all duration-[200ms]`}
    >
      <div
        className={`cardDeckCard rounded-3xl ${
          index > 0 ? `-ml-12 group-hover/cardDeck:-ml-11` : ""
        } ${
          even === true ? "mt-7" : ""
        } transition transition-all duration-[600ms]`}
      >
        <div className="hidden z-[1] z-[2] z-[3] z-[4] z-[5] z-[6]" />
        <div
          className={`${even} ${
            even === true ? "mt-7" : ""
          } z-${zIndex} relative w-[168px] rounded-3xl`}
        >        
             {/* fade in backdrop when pushed to back */}
            <div className={`w-full h-full overflow-hidden w-full absolute rounded-3xl group-hover/card:scale-114 ${even?'group-hover/card:-translate-y-4':'group-hover/card:translate-y-2'} ${bgColor} opacity-0 hover:scale-114  group-hover/cardDeck:opacity-100 transition transition-all duration-[500ms] z-0`}/>
            <div className={`w-full h-full overflow-hidden w-full absolute rounded-3xl group-hover/card:scale-114 ${even?'group-hover/card:-translate-y-4':'group-hover/card:translate-y-2'} bg-gradient-to-b rounded-3xl from-gray-400 to-black opacity-0 hover:scale-114  group-hover/cardDeck:opacity-60 transition transition-all duration-[500ms] z-0`}/>
            {/* this one doubles the dark bit for less transparent flash */}
            <div className={`w-full h-full overflow-hidden w-full absolute rounded-3xl bg-gradient-to-b rounded-3xl from-gray-400 to-black opacity-0  group-hover/cardDeck:opacity-50 transition transition-all duration-[1000ms] z-10`}/>
           
            {/* fade in backdrop when pushed to back */}
            <Link className="pointer-events-auto z-50 cursor-pointer" href={sponsored ? `${slug}` : `/toolbox/${slug}`}>
            <div className={`${even?'hover:-translate-y-4':'hover:translate-y-2'} cursor-pointer group-hover/cardDeck:skew-y-1 group-hover/card:skew-y-0 h-[240px] hover:scale-114  pointer-events-auto hover:scale-110 group-hover/cardDeck:opacity-20 z-10 group-hover/card:opacity-100 transition transition-all duration-[500ms] w-full relative rounded-3xl`}>
              {/* glassmorphism effect */}
              <div className={`w-full border glassmorphism border-[1px] border-opacity-0 h-full overflow-hidden w-full absolute z-10 bg-gradient-to-b rounded-3xl from-gray-800 to-black opacity-30`}/>
              {/* black gradient */}
              <div className={`w-full border border-[1px] border-opacity-0 h-full overflow-hidden w-full absolute z-10 bg-gradient-to-b rounded-3xl from-gray-500 to-black opacity-30`}/>
            
              <div
                className={`relative p-4 flex flex-col justify-between border border-[1px] border-white h-full shadow-xl w-full overflow-hidden rounded-3xl ${bgColor}`}
              >
                <div className="flex flex-col">
                <div
                  className={`border border-white bg overflow-hidden bg-white ${
                    sponsored ? "border-[3px] border-[#FFDE35]" : "border-2 border-white"
                  } z-10 rounded-2xl h-[60px] w-[60px] relative rounded-2xl shadow`}
                >
                  <Image
                    loader={gumletLoader}
                    priority={`true`}
                    data-priority={`true`}
                    layout="fill"
                    data-gmlazy={`false`}
                    className={`object-cover rounded bg-white border border-2 relative w-full h-full`}
                    src={logo || "/static/images/placeholder/letter-ad.png"}
                  />
                </div>
                {sponsored && 
                <div className="mt-2 z-10 text-sm text-[#fedc2d] font-semibold">
                  Promoted
                </div>}
                </div>
              
              {/* add a bg image: */}
            <div className="opacity-0 h-[340px] w-[500px] group-hover/card:opacity-100 absolute top-0 -mt-12 left-0 transition transition-all duration-1000">
                <Image
            loader={gumletLoader}
            priority={`true`}
            data-priority={`true`}
            layout="fill"
            data-gmlazy={`false`}
            className="scrolling-image object-cover contrast-130 h-[240px] w-full hover:mt-32 transition transition-all duration-[5000ms] relative"
            src={coverImage || "/static/images/placeholder/letter-ad.png"}
          />
          </div>
                <div className="z-10">
                  <h2 className={`${sponsored?'text-[#FFDE35]':'text-white'} clamp-2 overflow-hidden font-semibold text-sm`}>
                    {title}
                  </h2>
                </div>
              </div>
              
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CardDeckCard;
