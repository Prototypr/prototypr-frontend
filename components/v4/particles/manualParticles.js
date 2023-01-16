export const manualParticles = (dummyData, sponsor) => {
    var particles = []
    
    const ratio = 100/dummyData.length
    for(var x =0;x<dummyData.length;x++){
        if(dummyData[x].topic){
            continue;
            particles.push(
                {
                position: {
                    x: dummyData[x]?.position?.x,
                    y: dummyData[x]?.position?.y
                },
                options: {
                    size: { value: { min: dummyData[x]?.size?.min || 13, max: dummyData[x]?.size?.min || 16 }},//for topics make size standard
                    shape: {
                    options: {
                        image: dummyData[x]
                    },
                    type: "image"
                    },
                    links: {
                        enable:dummyData[x]?.link?.enabled==false?false:true,
                        distance: 57,
                        color: "#ffffff",
                        opacity: 1,
                        width: 1,
                      },

                    move: {
                        enable: dummyData[x]?.move?.enable==false?false:true,
                        collisions: true,
                        speed: dummyData[x]?.move?.speed || 0.5,
                        direction: "random",
                        random: false,
                        straight: true,
                        outModes: "bounce",
                        // outModes: "out",
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
                    size: { value: { min: dummyData[x]?.size?.min || 18, max: dummyData[x]?.size?.max || 22 }},//for topics make size standard
                    shape: {
                    options: {
                        image: dummyData[x]
                    },
                    type: "image"
                    },
                    links: {
                        enable:dummyData[x]?.link?.enable==false?false:true,
                        distance: 57,
                        color: "#ffffff",
                        opacity: 1,
                        width: 1,
                      },

                    move: {
                        enable: dummyData[x]?.move?.enable==false?false:true,
                        collisions: true,
                        speed: dummyData[x]?.move?.speed || 0.5,
                        direction: "random",
                        random: false,
                        straight: true,
                        outModes: "bounce",
                        // outModes: "out",
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
                move: {
                    enable: dummyData[x]?.move?.enable==false?false:true,
                    collisions: true,
                    speed: dummyData[x]?.move?.speed || 0.5,
                    direction: "random",
                    random: false,
                    straight: true,
                    outModes: "bounce",
                    // outModes: "out",
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