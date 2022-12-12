import Link from 'next/link'
import Image from 'next/image'
import data from './writer.json';

export default function WriterGrid({buttonText = "", className=''}) {


    return (
        <div className="mx-auto">
            <div className={`grid lg:grid-cols-4 grid-cols-4 gap-4 mx-auto ${className}`}>
                {data?.people?.map((item, index) => {
                       return ( <div key={index} className="mx-auto my-auto">
                                    <Image 
                                        style={{height:'48px', width:'48px'}}
                                        priority={false}
                                        src={item.avatar}
                                        width="48"
                                        height="48"
                                        // dataGumlet="false" 
                                        className="bg-white object-cover rounded-full" 
                                        alt="Writer profile picture"/>
                                </div>
                            )
                })}
            </div>
            <div  className="borderRadius-l" style={{marginTop:'-5px'}} >
                <Link href="/post/write-for-us">
                    <button aria-label={buttonText} size="small" hover="secondary">{buttonText}</button>
                </Link>
            </div>
        </div>
    );
}