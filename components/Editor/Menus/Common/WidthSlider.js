import React, { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const WidthSlider = ({editor, showing, figureType}) => {

const [value, setValue] = useState();

useEffect(() => {
    if (showing) {
        const videoAttrs = editor.getAttributes('figure');
        setValue(parseInt(videoAttrs.width,10)?parseInt(videoAttrs.width,10):100);
    }
    }, [showing]);


const updateWidth = (value) => {
    
    console.log(value);
    editor.commands.updateAttributes('figure', { width: value+'%' })
    // editor.chain().focus().updateAttributes('figure', { width: value+'%' }).run();
    setValue(value);
}
    
    
return(
  <div className='flex mr-2 flex-col justify-center'>
    {value && <Slider.Root
      onValueCommit={(value) =>updateWidth(value)}
    onLostPointerCapture={(value) =>{console.log(value)}}
      className="relative flex items-center select-none touch-none w-[60px] h-5 my-auto"
      defaultValue={[value]}
      max={100}
      min={25}
      step={25}
    >
      <Slider.Track className="bg-gray-400 relative grow rounded-full h-[2px]">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-4 h-4 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blackA5"
        aria-label="Volume"
      />
    </Slider.Root>}
  </div>
);
}
export default WidthSlider;