import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// const initialDuration=50
const SLOW_DURATION=350

export const MotionSlider = ({
  slides,
  gap = 14,
  width = 350,
  height = 94,
  direction = "normal",
  initialDuration = 8,
}) => {

  const controls = useAnimation();

  const [items] = useState(() =>
    [...slides, ...slides, ...slides, ...slides].map((slide) => ({
      key: Math.random().toString(36),
      slide,
    }))
  );


  const motionDiv = useRef()
  const [duration, setDuration] = useState(initialDuration)

  const startAnimation = (duration) => {
    controls.start({
      x: [0, -(width + gap) * slides.length * 4],
      transition: { duration, repeat: Infinity, ease: "linear" },
    });
  };

    // Effect to restart animation when duration changes
    useEffect(() => {
      const transform = motionDiv.current?.style.transform;
    console.log(transform); // This will log the full transform string
      // Parsing the translateX value
    const match = transform?.match(/translateX\((-?\d+\.?\d*)px\)/);
    if (match && match[1]) {
      const translateXValue = parseFloat(match[1]);
      if(translateXValue){
        // startAnimation(duration);
        controls.start({
          x: [translateXValue, -(width + gap) * slides.length * 4],
          transition: { duration, repeat: Infinity, ease: "linear" },
        });

      }
    }
    }, [duration]); // Dependency on currentDuration
  

    // Initialize the animation with the fast duration
    useEffect(() => {
      startAnimation(initialDuration);
    }, [controls]); // Re-run the effect if controls changes
  

  return (
    <div>
      <motion.div
        className="flex"
        style={{
          width: "100%",
        }}
        ref={motionDiv}
        initial={{ x: 0 }}
        animate={controls}
       >
        {items.map((item, index) => (
          <div
            key={item.key}
            style={{
              flexShrink: 0,
              flexGrow: 0,
              justifyContent: "flex-start",
              overflow: "visible",
              width: `${width + gap}px`,
            }}
            className=""
            onMouseEnter={() => setDuration(SLOW_DURATION)} // Pause animation on hover
          onMouseLeave={() => setDuration(initialDuration)} // Resume animation when not hovering
          >
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                overflow: "visible",
                marginRight: `${gap}px`,
              }}
              className="flex overflow-visible"
            >
              {item.slide}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
