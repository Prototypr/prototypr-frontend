const UndoRedoButtons = ({editor}) =>{


    return(
        <div className="flex flex ml-5 rounded" style={{pointerEvents:'all'}}>
                <button 
                data-balloon-pos='down'
                aria-label="Undo" 
                 onClick={()=>{
                    console.log(editor)
                     if(editor){
                            editor.commands.undo()
                     }
                     
                     }} 
                 style={{height:'32px', width:'32px'}}
                className={`text-base  rounded-r-none  focus:outline-none flex justify-center rounded font-bold cursor-default 
                hover:text-royalblue-600 bg-white opacity-100 hover:bg-gray-50 tex-gray-800 border duration-200 ease-in-out border-gray-200 transition`}>
                <div className="flex my-auto mx-auto">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z" fill="currentColor"/></svg>
                </div>
            </button>
            <button 
            data-balloon-pos='down'
             aria-label="Redo" 
             onClick={()=>{
                     if(editor){
                        editor.commands.redo()
                     }
                     
                     }} 
            //  onClick={()=>canRedo && redo()} 
                 style={{height:'32px', width:'32px'}}
            className={`text-base  border-l-0 rounded-l-none   focus:outline-none flex justify-center rounded font-bold cursor-default 
                hover:text-royalblue-600 bg-white opacity-100 hover:bg-gray-50 border duration-200 ease-in-out border-gray-200 transition`}>
                <div className="flex my-auto mx-auto">
                     <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z" fill="currentColor"/></svg>
                </div>
            </button>
        </div>
    )
}
export default UndoRedoButtons