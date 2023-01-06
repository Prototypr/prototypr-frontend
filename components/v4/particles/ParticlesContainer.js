import { useState, useEffect } from "react";
// import { cloneDeep } from "lodash";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { loadImageShape } from "./imageShape";

// import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
// import { loadColorUpdater } from "tsparticles-updater-color";
// import { loadCircleShape } from "tsparticles-shape-circle";
// import { loadImageShape } from "tsparticles-shape-image";
// import { loadBaseMover } from "tsparticles-move-base";
// import { loadSizeUpdater } from "tsparticles-updater-size";
// import { loadOpacityUpdater } from "tsparticles-updater-opacity";
// import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
// import { loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
// import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
// import { loadExternalTrailInteraction } from "tsparticles-interaction-external-trail";
// import { loadRollUpdater } from "tsparticles-updater-roll";
// import { loadSlim } from "tsparticles-slim";
// import { loadTiltUpdater } from "tsparticles-updater-tilt";
// import { loadTwinkleUpdater } from "tsparticles-updater-twinkle";
// import { loadWobbleUpdater } from "tsparticles-updater-wobble";
import {useRouter} from 'next/router'
import {particleOptions} from './particleOptions'


const ParticlesContainer = () => {
  const router = useRouter()
  const options = particleOptions

  const particlesLoaded = useCallback(async (container) => {

    container.addClickHandler((event, particles) => {
      for (const particle of particles) {
        if (particle.customClicked) {
          continue;
        }

        particle.customClicked = true;

        // console.log(particle)
        if(particle.shapeData.sponsor){  
          window.open (particle.shapeData.slug, '_ blank');
        }else{
          router.push(particle.shapeData.slug)
        }

        setTimeout(() => {
          particle.size.max = 28;
          particle.size.value = 28;
          delete particle.customClicked;
        }, 10);
      }
    });
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // await loadColorUpdater(engine);
    // await loadCircleShape(engine);
    // await loadBaseMover(engine);
    // await loadSizeUpdater(engine);
    // await loadOpacityUpdater(engine);
    // await loadOutModesUpdater(engine);
    // await loadImageShape(engine);
    // await loadSlim(engine);
    // await loadRollUpdater(engine);
    // await loadTiltUpdater(engine);
    // await loadTwinkleUpdater(engine);
    // await loadWobbleUpdater(engine);
    // await loadExternalTrailInteraction(engine);
    // await loadAbsorbersPlugin(engine);
    // await loadEmittersPlugin(engine);
    
    await loadFull(engine)
  }, []);

  return (
    <Particles
      width="100%"
      height="100%"
      style={{
        // padding:'100px',
        position: "absolute",
        top: "0",
        left: "0",
      }}
      options={options}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesContainer;
