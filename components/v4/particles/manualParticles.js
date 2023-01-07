export const manualParticles = (dummyData, sponsor) => {
    var particles = []
    
    const ratio = 100/dummyData.length
    for(var x =0;x<dummyData.length;x++){
        if(dummyData[x].topic){
            particles.push(
                {
                position: {
                    x: dummyData[x]?.position?.x,
                    y: dummyData[x]?.position?.y
                },
                options: {
                    size: { value: { min: 15, max: 15 }},//for topics make size standard
                    shape: {
                    options: {
                        image: dummyData[x]
                    },
                    type: "image"
                    },
                    }
                },
            )

        }else{

            particles.push(
                {
                position: {
                    x: dummyData[x]?.position?.x,
                    y: dummyData[x]?.position?.y
                },
                options: {
                    // size: { value: { min: 14, max: 120 }},
                    shape: {
                    options: {
                        image: dummyData[x]
                    },
                    type: "image"
                    },
                    }
                },
            )
        }
    }
    //add sponsor
    particles.push(
         {
            position: {
                x: sponsor?.position?.x,
                y: sponsor?.position?.y
            },
            options: {
                // size: { value: { min: 14, max: 120 }},
                shape: {
                options: {
                    image: sponsor
                },
                type: "image"
                },
                }
            },
    )
    
    return particles
    
}