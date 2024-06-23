import React, { useEffect, useState } from "react";

const WidthSlider = ({ editor, showing, figureType }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (showing) {
        resetValue()
    }
  }, [showing]);

  const resetValue = () =>{
    const figureAttrs = editor.getAttributes("figure");
    if(figureAttrs){
        setValue(
          parseInt(figureAttrs.width, 10) ? parseInt(figureAttrs.width, 10) : 100
        );
    }
  }

  const updateWidth = value => {
    setValue(value);
    editor.commands.updateAttributes("figure", { width: value + "%" });
  };

  return (
    <div className="flex ml-2 flex-col justify-center">
      {value && (
        <div class="flex items-center gap-2">
          <input
            class=" bg-gray-300 border-0 h-2 rounded accent-white appearance-none fill-white"
            min="25"
            max="100"
            step="25"
            type="range"
            value={value}
            // onInput={(e) => setWidth(e.target.value)}
            onChange={e => {
              updateWidth(e.target.value);
            }}
            // onChange={(e) => setValue(e.target.value)}
            // onMouseUp={e => {
            //     if (figureType === "video") {
            //         updateWidth(e.target.value);
            //     }
            // }}
          />
          <span class="text-xs font-semibold text-gray-400 select-none">
            {value}%
          </span>
        </div>
      )}
    </div>
  );
};
export default WidthSlider;


export const getImageHeight = ({src})=>{
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = `${src}`;
    img.onload = function() {
      resolve(this.height);
    }
    img.onerror = function() {
      reject(new Error('Failed to load image'));
    }
  });
}