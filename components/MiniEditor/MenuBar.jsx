import { blackA, slate } from '@radix-ui/colors';
import { useCallback } from 'react'
import { styled } from '@stitches/react';

const IconButton = styled('button', {
    // all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '6px',
    height: 32,
    width: 36,
    display: 'inline-flex',
    marginRight:1,
    marginLeft:1,
    alignItems: 'center',
    justifyContent: 'center',
    // color: slate.slate6,
    // backgroundColor: 'transparent',
  //   boxShadow: `0 2px 10px ${blackA.blackA7}`,
    // '&:hover': { backgroundColor: slate.slate11 },
  //   '&:focus': { boxShadow: `0 0 0 2px black` },
  //   '&:active':{background:'white'}
  });
  

const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
    
    const setLink = useCallback((e) => {
      e.preventDefault()
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
  
      // cancelled
      if (url === null) {
        return
      }
  
      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
          .run()
  
        return
      }
  
      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    }, [editor])
  
    return (
      <div className='absolute flex justify-start tippy-content top-0 left-0 w-full bg-gray-50 rounded-t-xl p-1'>
            <IconButton
          className={`hover:bg-blue-100  mr-1 bg-gray-50 text-gray-800`} 
          onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().undo().run() 
          }}>
          <svg  className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" fill="currentColor"/></svg>
          </IconButton>
        <IconButton
          className={`hover:bg-blue-100  mr-1 bg-gray-50 text-gray-800`} 
          onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().redo().run() 
          }}>
           <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z" fill="currentColor"/></svg>
          </IconButton>
          <div style={{height:32, width:1}} className='mx-1 inline-flex bg-gray-300'></div>
     
      {/* bold */}
         <IconButton
          onClick={(e) =>{
              e.preventDefault()
               editor.chain().focus().toggleBold().run()
          }}
          className={`
          hover:bg-blue-100  mr-1
          ${editor.isActive("bold")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("bold")?'text-blue-600':'text-gray-800'}`}
          >
          <svg  className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z" fill="currentColor"/></svg>
          </IconButton>
          {/* italic */}
        <IconButton
         onClick={(e) =>{
          e.preventDefault()
          editor.chain().focus().toggleItalic().run()        
          }}
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive("italic")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("italic")?'text-blue-600':'text-gray-800'}`}
          >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" fill="currentColor"/></svg>
          </IconButton>
  
          {/* underline */}
          <IconButton
          onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().toggleUnderline().run()}}
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive("underline")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("underline")?'text-blue-600':'text-gray-800'}`}
          >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z" fill="currentColor"/></svg>
          </IconButton>
          <div style={{height:32, width:1}} className='mx-1 inline-flex bg-gray-300'></div>
      <IconButton
         onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().toggleHeading({ level: 1 }).run()        
          }}
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive('heading', { level: 1 })?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive('heading', { level: 1 })?'text-blue-600':'text-gray-800'}`}
          >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="currentColor"/></svg>
      </IconButton>
      <IconButton
      onClick={(e) =>{
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 2 }).run()        
      }}
      className={`hover:bg-blue-100  mr-1
      ${editor.isActive('heading', { level: 2 })?'bg-blue-200':'bg-gray-50'}
      ${editor.isActive('heading', { level: 2 })?'text-blue-600':'text-gray-800'}`}
      >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z" fill="currentColor"/></svg>
      </IconButton>
      <div style={{height:32, width:1}} className='mx-1 inline-flex bg-gray-300'></div>
      {/* Ordered list */}
          <IconButton
         
          onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().toggleBulletList().run()        
          }}
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive("bulletList")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("bulletList")?'text-blue-600':'text-gray-800'}`}
          >
          <svg className="h-5 w-5"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"/></svg>
          </IconButton>
          {/* unordered list */}
          {!editor.isActive('figure') &&
          <>
          <IconButton
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive("orderedList")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("orderedList")?'text-blue-600':'text-gray-800'}`} 
          onClick={(e) =>{
              e.preventDefault()
              editor.chain().focus().toggleOrderedList().run()        
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" fill="currentColor"/></svg>
          </IconButton>
          {/* <div className="bg-gray-700 hover:bg-blue-100 mx-1 my-auto" style={{height:'20px',marginRight:1, width:'1px'}}/> */}
          </>
          }
              <div style={{height:32, width:1}} className='mx-1 inline-flex bg-gray-300'></div>
  
          <IconButton
          className={`hover:bg-blue-100  mr-1
          ${editor.isActive("link")?'bg-blue-200':'bg-gray-50'}
          ${editor.isActive("link")?'text-blue-600':'text-gray-800'}`} 
          onClick={setLink}>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" fill="currentColor"/></svg>
          </IconButton>
      
      </div>
    )
  }
  

  export default MenuBar