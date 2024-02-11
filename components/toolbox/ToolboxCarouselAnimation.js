import React, { useState } from "react";
import { motion } from "framer-motion";

export const MotionSlider = ({
  slides,
  gap = 20,
  width = 350,
  height = 105,
  direction = "normal",
  duration = 8,
}) => {
  const [items] = useState(() =>
    [...slides, ...slides, ...slides, ...slides].map((slide) => ({
      key: Math.random().toString(36),
      slide,
    }))
  );

  const isReversed = direction === "reversed";
  return (
    <div>
      <motion.div
        className="flex"
        style={{
          width: "100%",
        }}
        initial={{ x: 0 }}
        animate={{
          x: isReversed
            ? [-(width + gap) * slides.length, 0]
            : [0, -(width + gap) * slides.length],
        }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
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
