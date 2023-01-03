export const manualParticles = (dummyData, sponsor) => {
    var particles = []
    
    const ratio = 100/dummyData.length
    for(var x =0;x<dummyData.length;x++){
        particles.push(
            {
            position: {
                x: dummyData[x]?.position?.x,
                y: dummyData[x]?.position?.y
            },
            options: {
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