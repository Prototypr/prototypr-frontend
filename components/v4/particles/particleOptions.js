
import {dummyData} from './dummyData/dummyData'
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
          area: 600,
        },
      },
      shape: {
        type: "image",
        image:dummyData        
      },
      opacity: {
        value: 0.8,
      },
      size: {
        value: { min: 14, max: 18 },
        animation: {
            enable: false,
            speed: 3,
            minimumValue: 12,
            sync: false
        },
      },
      links: {
        enable: true,
        distance: 120,
        color: "#ffffff",
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        collisions: true,
        speed: 0.6,
        direction: "random",
        random: true,
        straight: false,
        outModes: "bounce",
      },
    },
    // PARTICLES END
    interactivity: {
      events: {
        onHover: {
          enable: true,
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
            opacity: 0.8
        },
        push: {
          quantity: 1,
        },
      },
    detectRetina: true,
    },
  };