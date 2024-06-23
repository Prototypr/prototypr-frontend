import React, {useState} from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, mauve, blackA, slate } from '@radix-ui/colors';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
// import ImageLinkField from './ImageLinkField/ImageLinkField'
import LinkField from './LinkField/LinkField'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/Primitives/Collabsible';
import { useEffect } from 'react';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});
const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  padding: 20,
  width: 350,
  backgroundColor: '#23263A',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
  '&:focus': {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${violet.violet7}`,
  },
});

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: '#23263A',
});

const StyledClose = styled(PopoverPrimitive.Close, {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '4px',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: slate.slate8,
  position: 'absolute',
  top: 5,
  right: 5,

  '&:hover': { backgroundColor: mauve.mauve12 },
  '&:focus': { boxShadow: `0 0 0 2px ${mauve.mauve12}` },
});

// Exports
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = StyledContent;
export const PopoverArrow = StyledArrow;
export const PopoverClose = StyledClose;

// Your app...
const Flex = styled('div', { display: 'flex' });

const IconButton = styled('button', {
  // all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '6px',
  height: 28,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  // color: slate.slate6,
  // backgroundColor: 'transparent',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  // '&:hover': { backgroundColor: slate.slate11 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
//   '&:active':{background:'white'}
});


const Text = styled('div', {
  margin: 0,
  color: slate.slate8,
  fontSize: 15,
  lineHeight: '19px',
  variants: {
    faded: {
      true: { color: mauve.mauve10 },
    },
    bold: {
      true: { fontWeight: 500 },
    },
  },
});

const PopoverDemo = ({editor, showRemove, marginLeft, isFigure}) => {

const [open, setIsOpen] = useState(false)

useEffect(()=>{
  const toggleField = (e) =>{

    if(e.target.closest('#link-btn')){
      setIsOpen(true)
    } 
    else if(!e.target.closest('#link-form-content')){
      setIsOpen(false)
    }   else if (open){
      setIsOpen(false)
    }
  }

  document.addEventListener("click", toggleField)

  return function cleanup() {
    document.removeEventListener('click',toggleField)
  };



}, [])

const closePopup = () =>{
  setIsOpen(false)
}
const togglePopup =()=>{
  setIsOpen(!open)
}

return(
  <Collapsible open={open}>
    <CollapsibleTrigger  
    // onClick={togglePopup}
     asChild>
      {/* <IconButton className={open?'bg-gray-800':' hover:bg-gray-800 hover:text-white'} aria-label="Update link"> */}
      <IconButton id="link-btn" className={`
       ${editor.isActive("link")?'bg-gray-800':'bg-gray-900'}
       ${editor.isActive("link")?'text-blue-400':'text-gray-200'}
       hover:cursor-pointer`} aria-label="Update link">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" fill="currentColor"/></svg>
      </IconButton>
    </CollapsibleTrigger>
    <CollapsibleContent 
    css={{pointerEvents:'all',marginLeft:marginLeft?marginLeft:'', marginTop:-58, height:47}}
    id="link-form-content"
    onPointerDownOutside={()=>setIsOpen(false)} onEscapeKeyDown={()=>setIsOpen(false)} sideOffset={5} >
      <Flex css={{ justifyContent:'space-between', gap: 10, marginTop:2, }}>
        <LinkField
        isFigure={isFigure}
        showRemove={showRemove}
        editor={editor}
        closePopup={closePopup}
        />
         <Cross2Icon style={{margin:'auto 6px', cursor:'pointer'}} onClick={closePopup} />
      </Flex>
      {/* <PopoverClose  onClick={togglePopup} aria-label="Close">
       
      </PopoverClose> */}
    </CollapsibleContent>
  </Collapsible>
);}

export default PopoverDemo;