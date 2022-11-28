import Link from 'next/link'
import Image from 'next/image'
import data from './writer.json';

export default function WriterGrid({buttonText = ""}) {


    return (
        <div className="mx-auto">
            <div className={`grid lg:grid-cols-4 grid-cols-4 gap-4 mx-auto`}>
                {data?.people?.map((item, index) => {
                       return ( <div key={index} className="mx-auto my-auto">
                                    <Image 
                                        width="48px"
                                        priority={false}
                                        height="48px"
                                        src={item.avatar}
                                        // dataGumlet="false" 
                                        className="bg-white rounded-full" 
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