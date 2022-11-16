import React, { useState } from 'react';
import { styled } from '@stitches/react';
import { blackA} from '@radix-ui/colors';
import SidePanel from './SidePanel';

  
  // Your app...
  const Box = styled('div', {});
  
    const Button = styled('button', {
        all: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: '0 10px',
        fontSize: 14,
        lineHeight: 1,
        fontWeight: 500,
        height: 35,
        width:18,
        // marginRight:15,
        variants: {
          variant: {
            preview: {
                backgroundColor: blackA.blackA2,
                color: blackA.blackA12,
                // boxShadow: `0 2px 10px ${blackA.blackA7}`,
                // '&:hover': { backgroundColor: blackA.blackA3, color:blackA.blackA12 },
                '&:focus': { boxShadow: `0 0 0 2px ${blackA.blackA8}` },
              },
          },
        },
      
        defaultVariants: {
          variant: 'preview',
        },
      });

export const SidePanelTrigger = ({editor, postObject, user}) => {

  const [isOpen, setIsOpen] = useState(false)


  const toggleOpen = () =>{
    setIsOpen(!isOpen)
  }

  return (
    <Box>
        <Button onClick={toggleOpen} className={`${isOpen?'bg-gray-800 text-white':''} ml-3`} variant="preview">
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 my-auto`} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 0 .002-5.347A9.99 9.99 0 0 1 4.865 4.99a3 3 0 0 0 4.631-2.674 9.99 9.99 0 0 1 5.007.002 3 3 0 0 0 4.632 2.672c.579.59 1.093 1.261 1.525 2.01.433.749.757 1.53.978 2.326a3 3 0 0 0-.002 5.347 9.99 9.99 0 0 1-2.501 4.337 3 3 0 0 0-4.631 2.674 9.99 9.99 0 0 1-5.007-.002 3 3 0 0 0-4.632-2.672A10.018 10.018 0 0 1 3.34 17zm5.66.196a4.993 4.993 0 0 1 2.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0 1 15 17.197a4.993 4.993 0 0 1 3.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0 1 18 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 0 0-.75-1.298A4.993 4.993 0 0 1 15 6.804a4.993 4.993 0 0 1-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 0 1 9 6.803a4.993 4.993 0 0 1-3.525.565 7.99 7.99 0 0 0-.748 1.298A4.993 4.993 0 0 1 6 12c0 1.26-.47 2.437-1.273 3.334a8.126 8.126 0 0 0 .75 1.298A4.993 4.993 0 0 1 9 17.196zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor"/></svg>
          </Button>
          <SidePanel editor={editor} user={user} postObject={postObject} isOpen={isOpen} close={toggleOpen}/>
    </Box>
  );
};

export default SidePanelTrigger;