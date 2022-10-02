import FontFormatMenu from './FontFormatMenu'

import { styled } from '@stitches/react';
import { blackA, slate } from '@radix-ui/colors';

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '6px',
  height: 28,
  width: 50,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: slate.slate6,
  backgroundColor: 'transparent',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: slate.slate11 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
//   '&:active':{background:'white'}
});

const FontFormatButton = ({ editor }) => {
  // const isCursorOverLink = editor.getAttributes("link").href;
  // console.log(editor);
        // ${editor.isActive('link')?'bg-gray-800 text-white':'bg-gray-900 text-gray-400'}

  return (
    <>
    {/* insert link */}
    <FontFormatMenu 
      editor={editor} 
      button={
        <IconButton 
        data-balloon-pos="up" aria-label="Block Format"
        className={`hover:bg-gray-800 hover:text-white`}
        >
          {editor.isActive('heading', { level: 2 })? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor"/></svg>:
         editor.isActive('heading', { level: 1 })?
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor"/></svg>
        :<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"  viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z" fill="currentColor"/></svg>}
         {/* <div className="bg-gray-800 opacity-50 hover:bg-gray-900 ml-1 my-auto" style={{height:'16px', width:'1px'}}/> */}
         <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" fill="currentColor"/></svg>
        </IconButton>
      }
      // node={props.node}
      sync={()=>{console.log('sync editor')}}/>
    </>
  );
};
export default FontFormatButton;