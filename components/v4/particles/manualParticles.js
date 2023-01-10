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
                    size: { value: { min: 13, max: 16 }},//for topics make size standard
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
    // robotito
    // particles.push(
    //      {
    //         position: {
    //             x: 150,
    //             y: 50
    //         },
    //         options: {
    //             links:{
    //                 enable:false
    //             },
    //             move: {
    //                 direction: "none",
    //                 enable: true,
    //                 outMode: "bounce",
    //                 random: false,
    //                 speed: 0.1,
    //                 straight: false,
    //               },
    //             size: { value: { min: 90, max: 90 }},
    //             shape: {
    //             options: {
    //                 image:    {   
    //                     height:1302,
    //                     src:'/static/images/robotitosuelto.png',
    //                     // slug:'/people/graeme',
    //                     width:991,
    //                 },
    //             },
    //             type: "image"
    //             },
    //             }
    //         },
    // )
    
    return particles
    
}