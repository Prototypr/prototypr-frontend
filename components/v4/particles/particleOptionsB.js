
import {dummyData} from './dummyData/dummyDataB'
import {dummySponsor} from './dummyData/dummySponsor'
import {manualParticles} from './manualParticles'

//this will come from db eventually, so keep separate from main data

export const particleOptions = {
    fullScreen: false,
    // https://github.com/matteobruni/tsparticles/discussions/2645
   manualParticles: manualParticles(dummyData, dummySponsor),
  //  PARTICLES
    particles: {
      number: {
        value: 0,
        density: {
          enable: true,
        //   area: 1000000,
        },
      },
      shape: {
        type: "image",
        image:dummyData        
      },
      opacity: {
        value: 1,
      },
      size: {
        value: { min: 13, max: 20 },
        animation: {
            enable: true,
            speed: 3,
            minimumValue: 12,
            sync: true
        },
      },
    },
    // PARTICLES END
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: "slow",
        },
        onClick:{
            enable:false,
            mode:'repulse'
        }
        // onClick: {
        //   enable: true,
        //   mode: "bubble",
        // },
        // resize: true,
        // onClick: {
        //   enable: false,
        //   mode: "push"
        // }
      },
      modes: {
          repulse: {
            distance: 400
        },
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
        bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 1
        },
        push: {
          quantity: 1,
        },
      },
    detectRetina: true,
    },
  };